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

test("bundles with a held image go last, with every bundle sharing that image", async () => {
  const { heldLast } = await import("../components/storefront/numaskin/catalog-order.ts");
  const order = heldLast([
    { slug: "paket-twin-pack-toner-2x150ml", image: "gift" },
    { slug: "a", image: "clean" },
    { slug: "b", image: "gift" },
    { slug: "c", image: "other" },
  ]).map((p) => p.slug);
  assert.deepEqual(order, ["a", "c", "paket-twin-pack-toner-2x150ml", "b"]);
});

test("bundle line is the name's first two words after 'Paket'", async () => {
  const { bundleLine } = await import("../components/storefront/numaskin/catalog-order.ts");
  assert.equal(bundleLine("Paket Glow Up Adenosine"), bundleLine("Paket Glow Up Gloss Gel"));
  assert.notEqual(bundleLine("Paket Moist Glow Duo"), bundleLine("Paket Glow Up Adenosine"));
});

test("sizes are taken out of a multi-size product's description", async () => {
  const { withoutSizes } = await import("../components/storefront/numaskin/catalog-order.ts");
  assert.equal(
    withoutSizes("Rangkaian pembersih facial wash, hydrating lotion 150ml, dan pelembap Adenosine."),
    "Rangkaian pembersih facial wash, hydrating lotion, dan pelembap Adenosine.",
  );
  assert.equal(withoutSizes("Treatment Lotion (150 ml) dan Gloss Gel"), "Treatment Lotion dan Gloss Gel");
});
