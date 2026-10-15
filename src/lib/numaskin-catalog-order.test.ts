// Install-owned (numaskin-adbook): the storefront's category order and ritual
// pick live in src/components/storefront/numaskin/catalog-order.ts.
import assert from "node:assert/strict";
import test from "node:test";
import {
  orderCategories,
  pickRitual,
} from "../components/storefront/numaskin/catalog-order.ts";

test("bundles first, then the routine; unknown ones keep catalogue order", () => {
  assert.deepEqual(
    orderCategories(["Paket Hemat", "Sunscreen", "Toner Mist", "Facial Cleanser", "Body Lotion", "Sunscreen", ""]),
    ["Paket Hemat", "Facial Cleanser", "Sunscreen", "Toner Mist", "Body Lotion"],
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

test("bundle contents are listed in routine order and ignore unnamed products", async () => {
  const { bundleContents } = await import("../components/storefront/numaskin/catalog-order.ts");
  assert.deepEqual(
    bundleContents("Rangkaian pembersih facial wash, hydrating lotion 150ml, dan pelembap Adenosine Numa Skin."),
    ["Facial Wash", "Toner", "Adenosine"],
  );
  assert.deepEqual(
    bundleContents("Kombinasi Treatment Lotion 150ml, Adenosine Moisturizer, dan PDRN Tone-Up Day Cream."),
    ["Toner", "Day Cream", "Adenosine"],
  );
  assert.deepEqual(
    bundleContents("Treatment Lotion 50ml, pelembap Adenosine, Day Cream PDRN, tabir surya SPF 50+, dan serum NAD+."),
    ["Toner", "NAD+ Serum", "Day Cream", "Adenosine", "Sunscreen"],
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

test("a bundle's buy-singly list leads with its own products, padded to even", async () => {
  const { singlesForBundle } = await import("../components/storefront/numaskin/catalog-order.ts");
  const singles = ["Deep Sea Water Facial Wash Gel", "Deep Sea Water Treatment Lotion", "NAD+ Booster Serum", "PDRN Tone-Up Day Cream", "Adenosine Moisturizer", "Oxydew Sunscreen"].map((productName) => ({ productName }));
  const names = (labels: string[]) => singlesForBundle(labels, singles).map((p) => p.productName);
  assert.deepEqual(names(["Facial Wash", "Toner", "Adenosine"]), ["Deep Sea Water Facial Wash Gel", "Deep Sea Water Treatment Lotion", "Adenosine Moisturizer", "NAD+ Booster Serum"]);
  assert.deepEqual(names(["NAD+ Serum", "Adenosine"]).slice(0, 2), ["NAD+ Booster Serum", "Adenosine Moisturizer"]);
  assert.equal(names(["Facial Wash", "Toner", "Adenosine", "Day Cream", "NAD+ Serum", "Sunscreen"]).length, 6);
  assert.equal(names([]).length, 4);
});

test("a bundle variant's singles total prices toner by size and fails closed", async () => {
  const { singlesTotal } = await import("../components/storefront/numaskin/catalog-order.ts");
  const singles = [
    { productName: "Deep Sea Water Facial Wash Gel", variants: [{ label: "100 ml", price: 68999 }] },
    { productName: "Deep Sea Water Treatment Lotion", variants: [{ label: "50ml", price: 79000 }, { label: "150ml", price: 109000 }, { label: "2× 150ml", price: 151600 }] },
    { productName: "Adenosine Deep Sea Water Moisturizer", variants: [{ label: "30 gr", price: 78999 }] },
    { productName: "NAD+ Booster Anti-Aging Serum", variants: [{ label: "20 ml", price: 108999 }] },
  ];
  assert.equal(singlesTotal("Toner 50ml + NAD+ Serum 20ml + Adenosine 30gr", [], singles), 266998);
  assert.equal(singlesTotal("Facial Wash 100ml + Adenosine 30gr", [], singles), 147998);
  assert.equal(singlesTotal("2× Toner 150ml", ["Toner"], singles), 218000);
  assert.equal(singlesTotal("Toner 150ml + Toner 50ml", ["Toner"], singles), 188000);
  assert.equal(singlesTotal("Toner 50ml", ["Facial Wash", "Toner", "Adenosine"], singles), 226998);
  assert.equal(singlesTotal("Toner 50ml + Sunscreen 30ml", [], singles), 0);
  assert.equal(singlesTotal("Paket", ["Toner"], singles), 0);
});

test("a size choice is found when labels differ in one item's size only", async () => {
  const { sizeChoice } = await import("../components/storefront/numaskin/catalog-order.ts");
  assert.deepEqual(sizeChoice(["Facial Wash 100ml + Toner 50ml + Adenosine 30gr", "Facial Wash 100ml + Toner 150ml + Adenosine 30gr"]), { part: "Toner", sizes: ["50ml", "150ml"] });
  assert.deepEqual(sizeChoice(["Toner 50ml", "Toner 150ml"]), { part: "Toner", sizes: ["50ml", "150ml"] });
  assert.equal(sizeChoice(["50ml", "150ml", "2× 150ml"]), null);
  assert.equal(sizeChoice(["Toner 50ml + Sunscreen 30ml", "Toner 150ml + Gloss Gel 30ml"]), null);
  assert.equal(sizeChoice(["Paket"]), null);
});
