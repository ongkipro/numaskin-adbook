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

// The products a bundle contains, read from its description in the order they
// are named there ("Facial Wash (100ml) + Treatment Lotion (150ml)" →
// "Facial Wash + Toner"), as numaskin.id's bundle cards list them.
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
  return CONTENT_KEYS
    .map(([re, label]) => ({ label, at: description.search(re) }))
    .filter(({ at }) => at >= 0)
    .sort((a, b) => a.at - b.at)
    .map(({ label }) => label);
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
