import { type Product } from "../data/products.ts";
import { getRuntimeEnv } from "./env.ts";
import {
  mergeStorefrontCatalog,
  type CatalogProductRow,
  type CatalogVariantRow,
} from "./catalog-data.ts";
import {
  loadPublishedProductContent,
  mergeRuntimeProductContent,
} from "./storefront-content.ts";
import { catalogProductIdOrNull } from "./catalog-feed.ts";

async function loadCatalogRows(database: D1Database) {
  const [products, variants] = await database.batch([
    database.prepare(`
      SELECT id, title, slug, category, brand, description, image_url, is_active, created_at
      FROM products
      ORDER BY created_at DESC, id DESC
    `),
    database.prepare(`
      SELECT id, product_id, sku, title, price, compare_price, stock
      FROM product_variants
      ORDER BY product_id ASC, id ASC
    `),
  ]);

  return {
    products: (products.results ?? []) as CatalogProductRow[],
    variants: (variants.results ?? []) as CatalogVariantRow[],
  };
}

async function loadLocalDevCatalogRows() {
  try {
    const { DatabaseSync } = await import("node:sqlite");
    const { globSync } = await import("fs");
    const files = globSync(".wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite");
    const dbPath = files.find((f) => !f.endsWith("-shm") && !f.endsWith("-wal") && !f.includes("metadata"));
    if (!dbPath) return { products: [], variants: [] };
    const db = new DatabaseSync(dbPath);
    const products = db.prepare(`
      SELECT id, title, slug, category, brand, description, image_url, is_active, created_at
      FROM products
      ORDER BY created_at DESC, id DESC
    `).all() as unknown as CatalogProductRow[];
    const variants = db.prepare(`
      SELECT id, product_id, sku, title, price, compare_price, stock
      FROM product_variants
      ORDER BY product_id ASC, id ASC
    `).all() as unknown as CatalogVariantRow[];
    return { products, variants };
  } catch {
    return { products: [], variants: [] };
  }
}

const catalogRequestCache = new WeakMap<object, Promise<Product[]>>();

async function loadStorefrontProductsUncached(
  locals?: App.Locals,
): Promise<Product[]> {
  const database = getRuntimeEnv(locals)?.OMS_DB as D1Database | undefined;

  try {
    const [rows, runtimeContent] =
      database && typeof database === "object"
        ? await Promise.all([
            loadCatalogRows(database),
            loadPublishedProductContent(database),
          ])
        : [await loadLocalDevCatalogRows(), new Map()];

    const presentations = mergeRuntimeProductContent(
      rows.products,
      runtimeContent,
    );
    return mergeStorefrontCatalog(rows.products, rows.variants, presentations);
  } catch (error) {
    console.error("storefront-catalog-load", error);
    return [];
  }
}

export async function getStorefrontProducts(
  locals?: App.Locals,
): Promise<Product[]> {
  if (!locals || typeof locals !== "object") {
    return loadStorefrontProductsUncached(locals);
  }
  const cached = catalogRequestCache.get(locals);
  if (cached) return cached;
  const pending = loadStorefrontProductsUncached(locals);
  catalogRequestCache.set(locals, pending);
  return pending;
}

/**
 * Resolve one storefront product by slug, Product ID, or catalogue id.
 *
 * The catalogue id is read through `catalogProductIdOrNull`, and that is not a
 * style preference. The strict `catalogProductId` throws on a row that predates
 * the five-digit scheme, and this predicate runs against **every** product
 * until one matches — so a single legacy row sorted ahead of the match threw
 * before the match was ever reached. Nothing here catches it, so it surfaced as
 * a 500 on the product page, the landing page, every form page, `/api/form-config`
 * and `/api/v1/products/<slug>`. One bad row took the whole storefront down,
 * not the row's own page.
 *
 * Failing closed is right for an ads payload, which is why the strict function
 * exists and keeps its callers. It is wrong for a lookup: a row that cannot
 * carry a catalogue identity simply never matches on one.
 */
export async function getStorefrontProduct(locals: App.Locals, key: string) {
  const products = await getStorefrontProducts(locals);

  return products.find(
    (product) =>
      product.slug === key ||
      product.productId === key ||
      String(product.catalogId) === key ||
      // `/api/v1/products` hands a caller the numeric Product ID as its
      // `content_id`. Accepting it back is the difference between a documented
      // list/detail round trip and a 404 on the value the API just returned.
      catalogProductIdOrNull(product.productId) === key,
  );
}
