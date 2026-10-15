// Install-owned (numaskin-adbook). The merchant's routine order — cleanse,
// hydrate, treat, protect, moisturise — used to order category chips and pick
// the home routine. Categories not listed keep their catalogue order, after
// the known ones; bundles always come last.

export const BUNDLE_CATEGORY = 'Paket Hemat';

const ROUTINE: readonly string[] = [
  'Facial Cleanser',
  'Hydrating Toner',
  'Face Serum',
  'Day Cream',
  'Moisturizer',
  'Sunscreen',
];

export function orderCategories(categories: readonly string[]): string[] {
  const unique = [...new Set(categories.filter(Boolean))];
  const rank = (c: string) =>
    c === BUNDLE_CATEGORY ? Number.MAX_SAFE_INTEGER : ROUTINE.includes(c) ? ROUTINE.indexOf(c) : ROUTINE.length;
  return unique
    .map((c, i) => ({ c, i }))
    .sort((a, b) => rank(a.c) - rank(b.c) || a.i - b.i)
    .map(({ c }) => c);
}

/** The four-step ritual numaskin.id presents: one product per step, the first
 *  catalogue product of that category. A step whose category is missing is
 *  dropped rather than filled with something else. */
export const RITUAL_STEPS: ReadonlyArray<{ step: string; category: string }> = [
  { step: 'Bersihkan', category: 'Facial Cleanser' },
  { step: 'Hidrasi', category: 'Hydrating Toner' },
  { step: 'Nutrisi', category: 'Face Serum' },
  { step: 'Kunci kelembapan', category: 'Moisturizer' },
];

export function pickRitual<T extends { category: string }>(products: readonly T[]) {
  return RITUAL_STEPS.flatMap(({ step, category }) => {
    const product = products.find((p) => p.category === category);
    return product ? [{ step, product }] : [];
  });
}

// The products a bundle contains, read from its description and listed in
// routine order (wash, toner, serum, day cream, moisturisers, sunscreen), so
// the card, the variant label and the routine read the same way.
// lazy: keyword match over merchant copy; a description that mentions a
// product it does not contain would list it. Upgrade path: a contents column.
const CONTENT_KEYS: ReadonlyArray<[RegExp, string]> = [
  [/facial wash|wash gel|pembersih/i, 'Facial Wash'],
  [/treatment lotion|toner|hydrating lotion/i, 'Toner'],
  [/nad\+?|serum/i, 'NAD+ Serum'],
  [/day cream|tone-up|pdrn/i, 'Day Cream'],
  [/adenosine/i, 'Adenosine'],
  [/gloss gel|calming/i, 'Gloss Gel'],
  [/sunscreen|oxydew/i, 'Sunscreen'],
];

export function bundleContents(description: string): string[] {
  return CONTENT_KEYS.filter(([re]) => re.test(description)).map(([, label]) => label);
}

/** Reorders a list so no product shares an image with any of the `window`
 *  products before it, when a later product can take its place — the merchant
 *  reuses one collage across many bundles. With the two-column grid, a window
 *  of 2 keeps identical tiles out of the same row and the same column.
 *  Order is otherwise kept; a clash that cannot be resolved is left. */
export function spreadSameImages<T extends { image: string }>(items: readonly T[], window = 2): T[] {
  const out = [...items];
  const clashes = (item: T, at: number) =>
    out.slice(Math.max(0, at - window), at).some((prev) => prev.image === item.image);
  for (let i = 1; i < out.length; i += 1) {
    if (!clashes(out[i], i)) continue;
    const j = out.findIndex((item, k) => k > i && !clashes(item, i));
    if (j < 0) continue;
    const [moved] = out.splice(j, 1);
    out.splice(i, 0, moved);
  }
  return out;
}

// Bundle images held back until the owner replaces them (DESIGN.md owner
// list): kept off the home preview and listed last on /produk, together with
// every bundle sharing the same image. Twin Pack's promises a gift the store
// does not give; the others print outcome promises ("Dalam 14 Hari Flek Mulai
// Hilang", "Garis halus tersamarkan", "sejak pemakaian pertama", "efek
// instan", "menyamarkan flek hitam", "kulit tampak lebih cerah",
// "brightening"), or a product the bundle lacks (Moist Glow Duo's "UV" tile;
// Exclusive's "Travel Size … & Pouch" gift box, not in its contents).
const HELD_IMAGES_OF = new Set([
  'paket-exclusive-lotion-gloss-gel',
  'paket-moist-glow-duo',
  'paket-twin-pack-toner-2x150ml',
  'paket-adenosine-dan-toner-150ml',
  'paket-duo-toner-150ml-50ml',
  'paket-toner-50ml-dan-gloss-gel',
  'paket-toner-150ml-dan-gloss-gel',
  'paket-youth-glow-duo-50ml',
  'paket-adenosine-dan-sunscreen',
  'paket-sunscreen-dan-toner-50ml',
  'paket-sunscreen-dan-toner-150ml',
  'paket-sunscreen-adenosine-toner-50ml',
  'paket-sunscreen-adenosine-toner-150ml',
  'paket-sunscreen-dan-gloss-gel',
]);

export function heldImagesOf(products: ReadonlyArray<{ slug: string; image: string }>): Set<string> {
  return new Set(products.filter((p) => HELD_IMAGES_OF.has(p.slug)).map((p) => p.image));
}

/** Stable: products with a held image move to the end, order otherwise kept. */
export function heldLast<T extends { slug: string; image: string }>(products: readonly T[]): T[] {
  const held = heldImagesOf(products);
  return [...products.filter((p) => !held.has(p.image)), ...products.filter((p) => held.has(p.image))];
}

// The merchant names a bundle line by its first two words ("Paket Glow Up
// Adenosine", "Paket Glow Up Gloss Gel") and gives the line near-identical
// posters in different files, so the home preview shows one bundle per line.
// lazy: name-based; a line named differently is not grouped. Upgrade path: a
// line column on the product.
export function bundleLine(name: string): string {
  return name.replace(/^paket\s+/i, '').toLowerCase().split(/\s+/).slice(0, 2).join(' ');
}

// A product sold in several sizes states its size with the size pills; a size
// in the merchant's shared description ("hydrating lotion 150ml") contradicts
// the 50 ml default, so it is left out of the rendered copy.
// lazy: render-time; the published description keeps it. Upgrade path: edit
// the description in the admin.
export function withoutSizes(text: string): string {
  return text.replace(/\s*\(?\b\d+\s?ml\b\)?/gi, '');
}

// The single product each bundleContents() label stands for, by name.
const SINGLE_FOR: Readonly<Record<string, RegExp>> = {
  'Facial Wash': /facial wash/i,
  Toner: /treatment lotion/i,
  'NAD+ Serum': /nad\+/i,
  'Day Cream': /day cream/i,
  Adenosine: /adenosine/i,
  'Gloss Gel': /gloss gel/i,
  Sunscreen: /sunscreen/i,
};

/** A bundle page's "buy singly" list: the bundle's own products first, then
 *  other singles (already in routine order) to an even count, so the 2×2 grid
 *  has no hole: at least `max`, more when the bundle holds more. */
export function singlesForBundle<T extends { productName: string }>(
  contents: readonly string[],
  singles: readonly T[],
  max = 4,
): T[] {
  const own = contents.flatMap((label) => {
    const re = SINGLE_FOR[label];
    const hit = re ? singles.find((p) => re.test(p.productName)) : undefined;
    return hit ? [hit] : [];
  });
  const picked = [...new Set(own)];
  const rest = singles.filter((p) => !picked.includes(p));
  const target = Math.max(max, picked.length + (picked.length % 2));
  return [...picked, ...rest].slice(0, target);
}
