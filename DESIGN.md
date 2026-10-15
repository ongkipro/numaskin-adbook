# Numa Skin storefront — design direction

Install-owned. The product's system is `DESIGN-SYSTEM.md`; this file records
how this install (`page.numaskin.id`) skins and restructures the public
storefront to match the merchant's own Shopify Hydrogen store, `numaskin.id`.

## Brief

- **Audience:** Indonesian skincare buyers arriving on a phone from ads,
  search or the merchant's marketplace stores, often after seeing numaskin.id.
- **Jobs:** recognise the brand; decide between a single product and a bundle;
  find a product by type or name; compare price and saving; choose a size;
  reach the COD order form.
- **Constraints:** the compact model stays — the 480 px column and its order
  form (owner, 2026-10-15). The owner then authorised a full UX rebuild of the
  public storefront only (same day). Checkout behaviour, pricing authority,
  tracking, URLs and the admin are untouched.

## Reference evidence

Captured with `ui-ref.mjs` at 390 and 1440 px; the 390 px screenshots were
opened and read.

- `design/refs/numaskin-home/` — merchant home: centred `NUMA·SKIN` + katakana
  wordmark; water-splash hero with serif headline; serif uppercase section
  titles over a short cyan rule; two-column cards (aqua well, teal mono
  category, uppercase centred name, marine price, grey strike); "THE 4-STEP
  RITUAL" with numbered steps; bundle cards with an inline "HEMAT" pill.
- `design/refs/numaskin-pdp/` — merchant product page: serif title, large marine
  price + "HEMAT" pill, size pills (selected = filled marine), full-width buy
  button directly under the sizes, accordion details.
- `design/refs/numaskin-collection/` — merchant collection grid.
- `design/refs/current-home/`, `design/refs/current-produk/` — this store before
  any change: monochrome, Cinzel monogram, left-ruled heading, black badges.

Transfer rationale: the buyer should feel on the same brand as numaskin.id
(colour, type, wordmark, card, ritual), inside the compact column.

## Tokens and type

From numaskin.id's own CSS custom properties (`app-*.css`):

| Role | Value | Use |
| --- | --- | --- |
| ink / primary | `#002B49` marine | headings, prices, primary buttons, top band |
| primary hover | `#081B2B` | button hover |
| accent text | `#0B6E7D` deep teal | labels, links (5.9:1 on white) |
| accent decorative | `#269BA8` cyan | rules, dots, focus ring only (3.3:1, non-text) |
| surface | `#F4F9FA` / `#EBF5F8` | image wells, section bands, page canvas |
| border | `#E2EDF0` | dividers, inputs |
| muted text | `#5A6E7F` | secondary copy (≥4.97:1) |

Inter (the product's, 400/600/700) for body; **DM Serif Display 400** for
h1/h2; **JetBrains Mono 500** for small tracked labels. Both added fonts are
OFL latin subsets from `@fontsource/*@5.2.8`, self-hosted in `public/fonts/`.
Prices and struck prices are Inter (mono's dotted zero misread 99.000 as
99.888). Katakana falls back to the system CJK face, as on numaskin.id.

## UX structure (the rebuild)

Journey: entry (ad / search / home) → find (category, search, ritual) →
evaluate (card: type, size, price, saving) → PDP (size pills, one price) →
"Pesan Sekarang" → order form → thanks. Every filter and search is a URL.

**Home** (`templates/CompactMarketHome.astro`, install-owned):

1. Marine top band "Official Store Numa Skin" (no verification tick: nothing
   on the page backs a platform check); centred wordmark.
2. Brand hero (`numaskin/NumaHero.astro`): the merchant's water-splash poster
   cropped to the column, serif h1 "Kemurnian Laut Dalam untuk Kulit Awet
   Muda", one-line positioning, "Lihat Produk" and "Paket Hemat" jumps.
   Operator-published slides, when they exist, replace it with the slider.
3. Search (GET `/produk?q=`) and category chips (links to `/produk?kategori=`),
   in the merchant's routine order (`numaskin/catalog-order.ts`).
4. Ritual (`numaskin/RitualSection.astro`): four numbered steps shown two by
   two (all visible at once, as numaskin.id does), one product per step from
   the live catalogue — a real sequence, hence the numbers.
   Each step shows the shared card without its type line (the step names the
   role). It ends with the merchant's 4-in-1 bundle (Paket Complete Routine
   4-in-1 150ml, the bundle numaskin.id's ritual offers), labelled "Paket hemat
   4-in-1" — not as the four steps — with its contents read from its own
   description — numaskin.id's
   ritual bar lists a different set for it than its product page, so the
   product page wins. Shown only while D1 carries it.
5. Produk Satuan grid, then Paket Hemat: the six cheapest bundles with an
   image not already shown and not held, and a link to all 42 on
   `/produk?kategori=Paket Hemat`. Held images (and every bundle sharing
   them): Twin Pack (a gift the store does not give), and ten that print
   outcome promises ("Dalam 14 Hari Flek Mulai Hilang", "Garis halus
   tersamarkan", "sejak pemakaian pertama", "efek instan", "menyamarkan flek
   hitam", "kulit tampak lebih cerah"). Nine clean images remain.
6. Landing pages: a small label and one row while there is one page, the full
   section heading only for several; footer.

**Catalogue** `/produk`: server-side `?kategori=` and `?q=` (name, type, tags,
description), result count in a status line, empty state with a reset link,
bundles sharing one collage kept apart (`spreadSameImages`, tested), ten
cards then "Lihat Produk Lainnya" (reveals in place and moves focus; links
to `?semua=1` without script). Canonical stays `/produk`; search pages are
`noindex`.

**Card** (`shared/ProductListItem.astro` + `numaskin/ProductGrid.astro`): four
subgrid rows — image, type · size, full name, price — so each row of cards
shares baselines without reserving empty lines (rails use the same card in a
horizontal subgrid). Names are not clamped: the
distinguishing word ("Moisturizer", "PA++++", "(150ml)") is usually last, and
a truncated name was a round-1 review finding; subgrid removes the dead band
that full names used to cost. The type line wraps rather than truncating. A
bundle's line says what it is ("SKINCARE SET · 150ML"), not the section it
sits in, and its contents follow the name ("Facial Wash + Toner"), read from
the bundle's description (`bundleContents`, tested). The saving pill appears only on bundle cards, in the price block; in
a 170 px column it wraps under the two prices.

**PDP**: serif title; one marine price with "HEMAT" pill; size pills in price
order, synchronised both ways with the form's radios; "Pesan Sekarang"
directly under the sizes with the COD rule stated as it is ("Bisa bayar di
tempat (COD) untuk sebagian besar wilayah" — COD is disabled for some
provinces, online payment is not configured); description; Manfaat and Bahan
aktif / Urutan pemakaian as native `<details>`; "Cocok untuk" chips; skinned
order form; a rail of single products ("Lengkapi rutinitas", or "Beli satuan"
on a bundle page). The page makes no shipping-cost statement of its own: the
form that renders (full quote, or confirmed by CS, by province) states its
rule, and the product's fixed "ongkir dihitung otomatis" card was removed
because it was false for the CS-confirmed form.

States covered: empty catalogue, no search match (reset), filtered,
show-all, no script (links), operator slides vs brand hero, single vs
multi-size product, bundle vs single.

Do not substitute: monochrome black, Cinzel monogram, square black badges,
Tailwind blue focus ring, a card grid that reserves blank lines.

## Owner list

- "Paket Twin Pack Toner" image (from numaskin.id) advertises "Free Ice Water
  Globe", which this store does not offer — replace the image or add the gift.
- "Paket Daily Care Adenosine" and "Paket Daily Glow Duo" share one collage;
  several bundle images are infographics rather than packshots.
- Paket Glow Up's "Urutan pemakaian" (from numaskin.id) names products outside
  the bundle.
- 26 of the 42 bundles use one of only four images (byte-identical files from
  numaskin.id): e.g. Daily Care / Daily Glow / Clean & Glow share a collage;
  Hydra Glow / Youth Glow / Luminous share the "Why PDRN" infographic.
  Identical files now point at one URL in D1 (cache, and so the home preview
  can show distinct images); supply a packshot per bundle.
- Twin Pack: compare-at Rp529.000 against Rp151.600 shows "HEMAT 71%"; the
  single 150 ml toner's compare-at is Rp239.000, so verify the figure.
- Six bundle images print outcome promises or a gift (held from the home
  preview, still on /produk): Twin Pack, Adenosine & Toner 150ml, Duo Toner,
  Toner 50ml & Gloss Gel, Toner 150ml & Gloss Gel, and the "Why PDRN"
  infographic (Youth Glow and the bundles sharing it).
- numaskin.id's ritual bar says the 4-in-1 holds Facial Wash, Toner, NAD+
  Serum and Moisturizer; its product page says Toner, Adenosine, Sunscreen and
  NAD+ Serum. Confirm which is true.
- Edited merchant copy in published content (all 42 bundles): removed the
  "Nilai Lebih Hemat" benefit (sales copy) and the outcome clause "untuk hasil
  yang lebih cepat dan optimal" (now "dalam satu rutinitas").
- Trust claims on numaskin.id (Halal, Uji Dermatologi) are not shown; supply
  certificate references to add them.

## Render critique

Author: Claude Code (claude-opus-5-5), the builder.

History: the skin went through five independent review rounds earlier the
same day (log archived as `design/review-rounds-2026-10-15-skin.log`); their
findings are folded into the decisions above. This critique covers the UX
rebuild, a new review cycle.

Rendered locally (`wrangler dev --local`, a copy of the live D1 and R2).
Screenshots, opened and read:

- `design/renders/ux-home-390.png`, `design/renders/ux-home-1440.png`
- `design/renders/ux-produk-390.png`, `design/renders/ux-produk-1440.png`
- `design/renders/ux-pdp-390.png`, `design/renders/ux-pdp-1440.png`

Macro pass findings, fixed before these renders: category chips wrapped to two
lines ("Facial / Cleanser") → nowrap in a scroll row; ritual step labels
wrapped → shortened to "1 · Bersihkan"; white gap above the PDP footer → the
page base is the aqua surface; the checkout's process row was grey → teal mono.

Review round 1 of the rebuild (REVISE) — findings and changes:

- Three contradictory shipping statements on the PDP (one false) → the PDP's
  own claims are removed; the rendered form states its rule.
- Ritual and related rows were a second and third card style (left-aligned,
  clamped names) → both are `ProductRail`, the shared card in a horizontal
  subgrid; prices align across each rail.
- "Koleksi unggulan" over all seven products → "7 produk · rangkaian lengkap".
- "PAKET HEMAT" on every bundle card repeated the section title → the line
  shows "SKINCARE SET · size".
- A full section heading framing one landing link → a small label and the row.
- `/produk` load-more touched the footer rule → bottom padding restored.
- The ritual had no route to a bundle → it ends with the merchant's own 4-in-1
  bundle, present in D1.
- Found while fixing: the rail's sr-only "Harga normal" text escaped the
  scroller and widened the PDP to 897 px (absolute child of a static
  scroller); the rail list is now `relative`. Rails also got scroll padding so
  the first card keeps its inset after snapping.

Review round 2 of the rebuild (REVISE) — findings and changes:

- Bundle preview surfaced duplicate imagery and the false-gift image → the
  preview skips an image already shown and holds Twin Pack; identical image
  files were found by content hash (26 bundles on 4 images) and re-pointed to
  one URL each so the rule can see them.
- Ritual hid step 4 in a scroller → 2×2 grid; the bundle row lists its
  contents; "4‑in‑1" no longer breaks.
- Hero pushed "Paket Hemat" below the fold → the poster is cropped 5:4.
- Verification tick removed from the top band; chips fade at the right edge.
- Rail cards: struck price always stacked; "· size" never starts a line;
  desktop PDP no longer keeps the mobile sticky-bar clearance.
- PDP: the image badge repeated the breadcrumb → removed; the form section has
  a "Form Pemesanan" title the CTA lands on; the bundle benefit "Nilai Lebih
  Hemat — penawaran bundling…" (sales copy, not a benefit) was removed from
  all 42 bundles' published content.
- `/produk` intro sentence (instructions only) removed; landing row
  description may take two lines; eyebrow is a plain count.
- Not changed, with reason: the form keeps its own variant radios (it is the
  product's submit control; pills and radios are synchronised); collapsing
  them would change product checkout code.

Review round 3 of the rebuild (REVISE) — findings and changes:

- Claim-bearing bundle images on the home preview → held by image (every
  bundle sharing a held image is held with it); chosen by inspecting a
  contact sheet of all 20 distinct bundle images.
- Bundle cards did not say what is inside → a contents line under the name.
  Found while doing it: the 4-in-1 row's contents had been copied from
  numaskin.id's ritual bar and were wrong for this product; the row now reads
  the product's own description and no longer claims "semua langkah".
- Ritual cards repeated the grid card → the type line is dropped (the step
  label names the role) and prices are inline.
- Names wrap with `pretty`, not `balance`.
- The accordion's "untuk hasil yang lebih cepat dan optimal" (an unsourced
  outcome claim) removed from the published content of all 42 bundles.
- Not changed, with reason: the aqua band under the PDP rail at 390 is the
  mobile sticky bar's clearance (`pb-20`, removed at `lg`).

Review round 4 of the rebuild (REVISE) — findings and changes:

- Two preview images still printed brightening / flek claims → the hold rule
  now covers every "cerah / flek / tersamarkan / sejak pemakaian pertama /
  14 hari / instan" image; the preview shows six of the nine clean ones.
- The 4-in-1 row read as "these four steps in one pack" while its contents
  differ → labelled "Paket hemat 4-in-1"; contents shown as they are.
- Identical collages adjacent on `/produk` → spread apart.
- Not changed, with reason: the checkout's three-up process row (product
  code, out of scope) and the mobile sticky-bar clearance under the PDP rail.

Review round 5 of the rebuild (REVISE, the cycle's last) — two findings,
both fixed after it and therefore not independently re-reviewed:

- The "Brightening, Hydrating & UV Protection" image (Paket Sunscreen & Gloss
  Gel) → held with the others; eight clean images remain.
- Identical collages could stack in one grid column → `spreadSameImages` now
  keeps a repeat out of the two previous positions (same row and same
  column). Measured: 0 clashes across all 49 and all 42 bundle cards.

Per section:

- Top band + header: marine band carries the official-store line; the
  wordmark sits on white below it.
- Hero: packshot in water fills the first screen at 390, headline and both
  actions follow without overlapping the image.
- Search + chips: one row of chips scrolls sideways; the active chip is filled
  marine and carries `aria-current="page"`.
- Ritual: numbered, the third card peeks to show the row scrolls.
- Grids: names render in full; each row's prices share a line (measured 0 px
  offset on every row of `/produk`); bundles show the saving inline.
- PDP: price, sizes and "Pesan Sekarang" sit together under the image;
  details collapse; related row closes the page on the aqua base.

Measured: no horizontal scroll at 390 or 1440, zero console errors on all six
renders. Flows (Playwright, local): chip → `?kategori=Paket Hemat` (42) and
back to `/`; home search "serum" → 16 results; load-more 10 → 20 with focus in
the grid and a polite status; size pill by keyboard → price Rp257.000 and
`aria-pressed`; "Pesan Sekarang" scrolls the form into view; accordion opens.
Keyboard Tab shows a 2 px cyan ring on every control after its transition.
Contrast as in the token table.
