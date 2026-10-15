// Install-owned (numaskin-adbook): the storefront's category order and ritual
// pick live in src/components/storefront/numaskin/catalog-order.ts.
import assert from "node:assert/strict";
import test from "node:test";
import {
  orderCategories,
  pickRitual,
} from "../components/storefront/numaskin/catalog-order.ts";

test("categories follow the routine, unknown ones keep catalogue order, bundles last", () => {
  assert.deepEqual(
    orderCategories(["Paket Hemat", "Sunscreen", "Toner Mist", "Facial Cleanser", "Body Lotion", "Sunscreen", ""]),
    ["Facial Cleanser", "Sunscreen", "Toner Mist", "Body Lotion", "Paket Hemat"],
  );
});

test("the ritual takes the first product per step and drops a missing step", () => {
  const ritual = pickRitual([
    { slug: "a", category: "Moisturizer" },
    { slug: "b", category: "Facial Cleanser" },
    { slug: "c", category: "Moisturizer" },
    { slug: "d", category: "Paket Hemat" },
  ]);
  assert.deepEqual(
    ritual.map((r) => [r.step, r.product.slug]),
    [["Bersihkan", "b"], ["Kunci kelembapan", "a"]],
  );
});

test("bundle contents follow the description's order and ignore unnamed products", async () => {
  const { bundleContents } = await import("../components/storefront/numaskin/catalog-order.ts");
  assert.deepEqual(
    bundleContents("Rangkaian pembersih facial wash, hydrating lotion 150ml, dan pelembap Adenosine Numa Skin."),
    ["Facial Wash", "Toner", "Adenosine"],
  );
  assert.deepEqual(
    bundleContents("Kombinasi Treatment Lotion 150ml, Adenosine Moisturizer, dan PDRN Tone-Up Day Cream."),
    ["Toner", "Adenosine", "Day Cream"],
  );
  assert.deepEqual(bundleContents("Paket hemat untuk kulit."), []);
});

test("identical images are moved apart, keeping order otherwise", async () => {
  const { spreadSameImages } = await import("../components/storefront/numaskin/catalog-order.ts");
  const items = ["a", "x", "x", "b", "x", "c"].map((image, i) => ({ image, i }));
  assert.deepEqual(spreadSameImages(items, 1).map((p) => p.image), ["a", "x", "b", "x", "c", "x"]);
  // Window 2 (two columns): a repeat never lands next to or directly under itself.
  const grid = spreadSameImages(["x", "a", "x", "b", "c", "d", "x"].map((image) => ({ image })));
  grid.forEach((p, i) => assert.ok(grid.slice(Math.max(0, i - 2), i).every((q) => q.image !== p.image)));
  assert.deepEqual(spreadSameImages([{ image: "x" }, { image: "x" }]).map((p) => p.image), ["x", "x"]);
});
