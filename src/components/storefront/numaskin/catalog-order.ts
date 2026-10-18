// Install-owned (numaskin-adbook). The merchant's routine order — cleanse,
// hydrate, treat, protect, moisturise — used to order category chips and pick
// the home routine. Categories not listed keep their catalogue order, after
// the known ones; bundles come first, ahead of the routine — the offer most
// ad visitors arrive for, and the chip that would otherwise sit off-screen.

export const BUNDLE_CATEGORY = 'Paket Hemat';

const ROUTINE: readonly string[] = [
  'Facial Cleanser',
  'Hydrating Toner',
  'Face Serum',
  'Day Cream',
  'Moisturizer',
  'Sunscreen',
];

/** A category as chips, headings and cards show it. "Facial Cleanser · 100 ml"
 *  is the one card line wider than a 360 px column, so the label is
 *  "Cleanser" everywhere; the filter value stays the merchant's category. */
export const categoryLabel = (category: string) => category.replace(/^Facial Cleanser$/, 'Cleanser');

export function orderCategories(categories: readonly string[]): string[] {
  const unique = [...new Set(categories.filter(Boolean))];
  const rank = (c: string) =>
    c === BUNDLE_CATEGORY ? -1 : ROUTINE.includes(c) ? ROUTINE.indexOf(c) : ROUTINE.length;
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
  [/sunscreen|oxydew|tabir surya/i, 'Sunscreen'],
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

// A bundle sold in two sizes has one packshot per size; the product row holds
// the cheapest one. The PDP swaps to the chosen size's photo.
// lazy: keyed by variant id in code, since variants have no image column.
// Upgrade path: an image_url column on product_variants.
export const VARIANT_IMAGES: Readonly<Record<number, string>> = {
  22: '/assets/uploads/2026-10-19/bd974e4f-70e7-459f-be0f-5816c6a09ee3.webp',
  23: '/assets/uploads/2026-10-19/225e8322-d184-495c-b45c-d9615f27a852.webp',
  24: '/assets/uploads/2026-10-19/f5e76689-5116-4247-952d-ff6b805a588c.webp',
  25: '/assets/uploads/2026-10-19/22e5a513-af64-4ac2-aab7-b2c26e880829.webp',
  26: '/assets/uploads/2026-10-19/da1c3c56-862b-4e58-a1e2-e3e0f3c0d2a8.webp',
  27: '/assets/uploads/2026-10-19/9a7029ee-6398-4241-b375-8d8a423bff76.webp',
  29: '/assets/uploads/2026-10-19/4913fbd0-236b-4d04-96c9-1288ef95187a.webp',
  30: '/assets/uploads/2026-10-19/aa451e1f-5903-4a76-bdb3-f50786de2a91.webp',
};

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

/** A bundle page's "buy singly" list: exactly the bundle's own products,
 *  in its contents order. Empty when none can be matched (the caller then
 *  falls back to other singles under another title). */
export function singlesForBundle<T extends { productName: string }>(
  contents: readonly string[],
  singles: readonly T[],
): T[] {
  const own = contents.flatMap((label) => {
    const re = SINGLE_FOR[label];
    const hit = re ? singles.find((p) => re.test(p.productName)) : undefined;
    return hit ? [hit] : [];
  });
  return [...new Set(own)];
}

interface PricedSingle {
  productName: string;
  variants: ReadonlyArray<{ label: string; price: number }>;
}

/** A card's contents line from a variant label that lists the items, sizes
 *  dropped and repeats counted ("Toner 150ml + Toner 50ml + Gloss Gel 30ml +
 *  Pouch" → "2× Toner", "Gloss Gel", "Pouch"), so it agrees with the card's
 *  item count. Empty when the label lists nothing (then the description's
 *  `bundleContents` is used). */
export function labelContents(label: string): string[] {
  const l = label.trim();
  if (!l.includes(' + ') && !/^\d+×/.test(l)) return [];
  const counts = new Map<string, number>();
  for (const part of l.split(' + ')) {
    const m = part.trim().match(/^(?:(\d+)×\s*)?(.+?)(?:\s+\d+\s?(?:ml|gr|g))?$/i);
    if (!m) continue;
    counts.set(m[2], (counts.get(m[2]) ?? 0) + Number(m[1] ?? 1));
  }
  return [...counts].map(([name, n]) => (n > 1 ? `${n}× ${name}` : name));
}

/** A part of a bundle label that comes free with it ("Pouch"): not a product,
 *  so it is neither priced nor counted. */
export const isGift = (part: string) => /^pouch$/i.test(part.trim());

/** What a bundle variant's items cost bought singly, or 0 when any item cannot
 *  be priced (then no saving is claimed). Items come from the variant label
 *  when it lists them ("Facial Wash 100ml + Adenosine 30gr", "2× Toner
 *  150ml"); a label that only names the toner size ("Toner 50ml") is combined
 *  with the bundle's contents. Toner is priced by its size. */
export function singlesTotal(variantLabel: string, contents: readonly string[], singles: readonly PricedSingle[]): number {
  const label = variantLabel.trim();
  // Items are joined by " + "; a bare "+" belongs to a name ("NAD+ Serum").
  const listed = label.includes(' + ') || /^\d+×/.test(label);
  const tonerOnly = label.match(/^Toner (\d+)\s?ml$/i);
  const items: Array<{ name: string; ml?: string; n: number }> = listed
    ? label.split(' + ').map((part) => {
        const m = part.trim().match(/^(?:(\d+)×\s*)?(.+?)\s+(\d+)\s?(?:ml|gr|g)$/i);
        return m ? { name: m[2], ml: m[3], n: Number(m[1] ?? 1) } : { name: part.trim(), n: 1 };
      })
    : contents.map((name) => ({ name, ml: name === 'Toner' ? tonerOnly?.[1] : undefined, n: 1 }));
  let total = 0;
  for (const item of items) {
    if (isGift(item.name)) continue;
    const re = SINGLE_FOR[item.name];
    const single = re ? singles.find((p) => re.test(p.productName)) : undefined;
    if (!single) return 0;
    const variant =
      single.variants.length === 1
        ? single.variants[0]
        : single.variants.find((v) => item.ml && new RegExp(`^${item.ml}\\s?ml$`, 'i').test(v.label.trim()));
    if (!variant) return 0;
    total += variant.price * item.n;
  }
  return total;
}

/** When variant labels differ in one item's size only ("Facial Wash 100ml +
 *  Toner 50ml" / "… + Toner 150ml", or just "Toner 50ml" / "Toner 150ml"),
 *  that item's name and each label's size, so the picker can say "Pilih
 *  ukuran toner" over "50ml / 150ml". Null otherwise. */
export function sizeChoice(labels: readonly string[]): { part: string; sizes: string[] } | null {
  if (labels.length < 2) return null;
  const split = labels.map((l) => l.trim().split(' + '));
  if (split.some((parts) => parts.length !== split[0].length)) return null;
  const differing = split[0].map((_, i) => i).filter((i) => split.some((parts) => parts[i] !== split[0][i]));
  if (differing.length !== 1) return null;
  const sized = split.map((parts) => parts[differing[0]].match(/^(.+?)\s+(\d+\s?(?:ml|gr|g))$/i));
  if (sized.some((m) => !m || m[1] !== sized[0]![1])) return null;
  return { part: sized[0]![1], sizes: sized.map((m) => m![2]) };
}
