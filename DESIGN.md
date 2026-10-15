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
h1/h2; **JetBrains Mono 500** only for the product card's category line
(`.nm-mono`), the one place numaskin.id uses it. Every other small label
(`.nm-label`: field labels, discount pill, checkout step titles) is Inter 600,
lightly tracked. Sections carry no eyebrow over their serif title; the title
and cyan rule are the whole heading (polish pass 2026-10-15: a mono eyebrow over
every heading read as template chrome). Both added fonts are
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
- Twin Pack: compare-at Rp529.000 (numaskin.id) is above 2 × Rp239.000; the
  "2× 150ml" size on the Treatment Lotion page uses Rp478.000.
- Bundle prices now differ from numaskin.id (owner decision 2026-10-16,
  below): mirror them in Shopify, or the two stores disagree.
- Paket Exclusive keeps its numaskin.id price (Rp301.650): its contents
  (travel size, pouch) are unconfirmed, so no saving is computed or shown.
- Age Defense Trio and Sunscreen + Adenosine + Toner were priced Rp30.000 /
  Rp10.000 above their listed contents on numaskin.id; repriced from the
  listed contents — confirm nothing else is in the box.
- Six bundle images print outcome promises or a gift (held from the home
  preview, still on /produk): Twin Pack, Adenosine & Toner 150ml, Duo Toner,
  Toner 50ml & Gloss Gel, Toner 150ml & Gloss Gel, and the "Why PDRN"
  infographic (Youth Glow and the bundles sharing it).
- "Cocok untuk" chips ("Anti-aging", "Mencerahkan", "Memperkuat skin
  barrier") are hidden on the PDP until sourced; descriptions still say
  "kulit glowing". Source the claims or rewrite them in the product data.
- Bundle images show one size (Paket Glow Up's says "Routine 150ml") while the
  PDP preselects the cheapest variant (50 ml). Supply an image per variant.
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
  differ → since cycle 2 round 3 the ritual no longer ends with it (it does not hold the four steps); it stays in the catalogue and bundle list.
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

### Polish pass (2026-10-15, owner: "sempurnakan ui ux, hindari ai slop")

New review cycle; the previous log is archived as
`design/review-rounds-2026-10-15-ux.log`. Re-rendered locally; screenshots
opened and read: `design/renders/ux-home-390.png`,
`design/renders/ux-home-1440.png`, `design/renders/ux-produk-390.png`,
`design/renders/ux-produk-1440.png`, `design/renders/ux-pdp-390.png`,
`design/renders/ux-pdp-1440.png`.

- Owner removed the PDP's inline "Pesan Sekarang": the form follows the
  details. Checked: on this catalogue the sticky bar never shows (the photo or
  the form is always on screen), so scrolling is the one route — the owner's
  intent. The COD line stays, left-aligned under the size pills.
- Template chrome cut: no eyebrow over any home section title (hero "Deep Sea
  Mineral Science", "Rutinitas harian", "7 produk", "Lebih hemat…" removed);
  mono is the card category line only; top band, field labels, checkout step
  titles and the process row are Inter; the submit button's trailing arrow is
  hidden. `A · B` step labels → "1. Bersihkan"; "Pilihan ukuran / varian" →
  "Pilih ukuran".
- Hero subline no longer promises an outcome ("skin barrier yang lebih kuat")
  → it says what the range is.
- Render judgement: home reads hero → search/chips → ritual → singles →
  bundles with one heading system (serif title + cyan rule); the PDP reads
  photo → title → price → sizes → COD rule → details → form without a
  competing button. Swapping the brand name would not leave this page
  unexplained: palette, ritual and imagery are numaskin.id's.
- Still open, owner content: PDP brightening chips vs held images; per-variant
  bundle images (Owner list).

Polish review round 1 (REVISE) — findings and changes, re-rendered and the
same six screenshots re-opened:

- Hero h1 and ritual title promised an outcome ("Kulit Awet Muda", copied from
  numaskin.id) → "Skincare dengan Air Laut Dalam Ulleung" and "Rutinitas 4
  Langkah"; the subline names the range, not a result.
- `/produk` "KATALOG" eyebrow → removed (`PageIntro` shows no eyebrow; the
  breadcrumb names the page).
- Twin Pack and the other held-image bundles were in the first ten cards →
  `heldLast` puts them at the end of /produk (one held list in
  `catalog-order.ts`, shared with the home preview; test added).
- PDP `pb-20` sticky-bar clearance read as a dead band → removed.
- Not changed, with reason: the landing row's text is that page's
  meta description in D1 ("meredakan kemerahan, memperkuat skin barrier");
  editing it is a live content change for the owner (Owner list). The rail's
  two-line type line ("FACIAL / CLEANSER · 100 ML") is the 44% rail width.

Polish review round 2 (REVISE) — findings and changes, re-rendered and the
six screenshots re-opened:

- The singles grid opened with the four products the ritual had just shown →
  it opens with the ones the ritual does not show (Day Cream, Gloss Gel,
  Sunscreen), reusing `pickRitual`.
- "Beli satuan" rail cards stacked the struck price, unlike every other card →
  inline, as in the grids: rail cells 48 % (a third card still peeks), price
  gap 6 px. A card narrower than 148 px (a rail at 360 px) stacks both prices
  through a container query on a wrapper, so one row never mixes layouts
  (measured at 360/390/1440). Containment on the subgridded `<article>`
  itself broke the card's subgrid — caught in the render, moved to a wrapper.

Polish review round 3 (REVISE) — findings and changes, re-rendered and the
six screenshots re-opened:

- The claim rule held images but not text → the PDP's "Cocok untuk" chips
  ("Anti-aging", "Mencerahkan", "Memperkuat skin barrier") are not rendered,
  and the home landing row shows the page title only (its meta description
  claimed "meredakan kemerahan"). Both return when the owner sources them.
- Not changed, with reason: the bundle photo shows the 150 ml routine while the
  cheapest (50 ml) variant is preselected — a per-variant image is owner
  content, and preselecting by image text would guess; the form's variant
  radios beside the pills and its three-up process row are the product's
  checkout code (out of this install's scope; open, not resolved); the
  description's "kulit glowing" is merchant copy (Owner list).

Polish review round 4 (REVISE) — findings and changes, re-rendered and the
six screenshots re-opened:

- The PDP asked for the size twice (pills, then the form's radios) → while
  the pill sync runs, the form's variant step gets `nm-variant-synced` and is
  hidden; the radios stay the submit control and the order summary names the
  chosen size. Without script the step shows as before (checked both ways).
- The ritual's four singles repeated in the singles grid → that section is
  "Lengkapi Rutinitas" with the three the ritual does not show, and a "Lihat
  semua produk" button; the hero's "Lihat Produk" lands on the ritual.
- "Form Pemesanan" lacked the cyan rule → added; checkout step titles drop
  their dot marker.
- Not changed, with reason: Moist Glow Duo's collage (its own file, not
  shared) has a "UV" tile — owner content; the three-up process row is
  product checkout code.

Polish review round 5 (REVISE; the cycle's last allowed round) — changes made
after it, rendered and the six screenshots re-opened, not re-reviewed:

- Two near-identical "Glow Up Routine" posters (different files) sat side by
  side in the bundle preview → one bundle per line (`bundleLine`, the name's
  first two words; test added). The preview now shows six distinct lines.
- "Lengkapi Rutinitas" left a hole beside its third card → it is the shared
  `ProductRail`; "Lihat semua produk" follows it.
- Hero "Lihat Produk" landed on the ritual → "Lihat Semua Produk" to /produk.
- The 4-in-1 row's label repeated its name → "Keempat langkah, satu paket".
- The checkout submit was a grey block outside the button system → a marine
  pill (aqua pill with muted text while incomplete); the three-up process row
  (repeated the notice; "Harga tervalidasi" read as a claim) is not shown.
- Checked, not changed: the NAD+ Youth Boost poster says "membantu … melawan
  tanda-tanda penuaan" — a hedged cosmetic function claim, not a measurable
  outcome promise; left for the owner's claim review.

### Polish cycle 2 (2026-10-15, owner: "lanjut sempurnakan")

New review cycle; the previous log is archived as
`design/review-rounds-2026-10-15-polish.log`. Starts from the renders above
(`design/renders/ux-home-390.png`, `design/renders/ux-home-1440.png`,
`design/renders/ux-produk-390.png`, `design/renders/ux-produk-1440.png`,
`design/renders/ux-pdp-390.png`, `design/renders/ux-pdp-1440.png`), which
include the round-5 changes.

Cycle 2 round 1 (REVISE) — findings and changes, re-rendered and the six
screenshots re-opened:

- The 4-in-1 label "Keempat langkah, satu paket" claimed the bundle holds the
  four steps; its contents line shows it does not → "Hemat dalam satu paket".
- Home marked the "Semua" chip active (`aria-current`) though home is not the
  catalogue → `active={null}` marks no chip there.
- Bundle type line said only "SKINCARE SET" → with no size in the name it
  says how many products the bundle holds ("SKINCARE SET · 2 PRODUK").
- Moist Glow Duo's collage has a "UV" tile for a bundle without sunscreen →
  held, like the "UV Protection" image; Paket Lengkap 6-in-1 takes its slot.
- PDP breadcrumb said "Katalog" where /produk says "Produk" → "Produk".
- Form fields sat 4 px inside the page gutter → the form section's side
  padding is 4 px; measured 20/20 at 390 and 500/500 at 1440.

Cycle 2 round 2 (REVISE) — findings and changes, re-rendered and the six
screenshots re-opened:

- Card names broke at hyphens ("6-IN-" / "1 ROUTINE", "TONE-/UP",
  "ANTI-/AGING") → the shared card uses non-breaking hyphens, as the ritual
  row already did. Measured: no name breaks after a hyphen and no overflow at
  360, 390 and 1440 on home and the full catalogue.
- Not changed, with reason: the blank band above prices in a rail is the
  subgrid reserving the tallest name in the row (Oxydew's three lines, on the
  peeking card); it is what keeps prices on one line across the row.

Cycle 2 round 3 (REVISE) — findings and changes, re-rendered and the six
screenshots re-opened:

- "Pilihan paket dengan harga terendah" was false: the preview skips held
  images, repeated images and repeated lines → "Sebagian dari 42 paket;
  semuanya ada di katalog."
- The 4-in-1 row under the four steps read as "the four steps in one pack",
  though it holds Toner, Adenosine, Sunscreen and NAD+ Serum → the ritual
  ends with its four steps; the bundle stays in the catalogue. Its contents
  conflict on numaskin.id remains on the Owner list.

Cycle 2 round 4 (REVISE) — findings and changes, re-rendered and the six
screenshots re-opened:

- On a multi-size bundle the description named one size ("hydrating lotion
  150ml") while 50 ml is preselected → the PDP renders the description
  without sizes when the product has more than one variant (`withoutSizes`,
  test added); the published content is unchanged (a live write is the
  owner's call), so the structured data keeps the original text.
- Not changed, with reason: the bundle preview opens with the Daily Care
  collage because it is the cheapest clean line; reordering by image type
  would need an image classification the data does not have (Owner list:
  packshot per bundle).

Cycle 2 round 5 (REVISE; last round of the cycle) — changes made after it,
rendered and the six screenshots re-opened, not re-reviewed:

- Rails showed the third card as a 5 px hairline (48 % cells) → 42 % cells:
  the third card shows 47–66 px at 360/390/1440 (measured). At 390 and below
  every rail card stacks its prices (the container query), uniformly per row;
  at 1440 they sit inline.
- The bundle subline orphaned a word → `text-wrap: balance`.

### Polish cycle 3 (2026-10-15, owner: "ya lanjutkan")

Deployed as `e32f5c7` (Version 03098636). New review cycle; the previous log
is archived as `design/review-rounds-2026-10-15-polish2.log`. Starts from the
renders above (`design/renders/ux-home-390.png`,
`design/renders/ux-home-1440.png`, `design/renders/ux-produk-390.png`,
`design/renders/ux-produk-1440.png`, `design/renders/ux-pdp-390.png`,
`design/renders/ux-pdp-1440.png`), which include the cycle-2 round-5 changes.

Cycle 3 round 1 (REVISE) — findings and changes, re-rendered and the six
screenshots re-opened:

- Rails of three or four items clipped their last card mid-glyph → no rails:
  home "Lengkapi Rutinitas" is a 2×2 grid whose odd cell is a "Semua produk"
  tile (49 produk dan paket); the PDP shows four singles in a 2×2 grid.
  `ProductRail` and the card's `stackPrice` prop are removed (unused).
- Hero "Lihat Semua Produk" was a third route to /produk within two screens →
  one action, "Lihat Paket Hemat" (#paket); search and chips follow.
- The Exclusive bundle's image shows "Travel Size … & Pouch" in a gift box,
  beyond its listed contents → held like Twin Pack.
- Footer "Halaman" did not say where it goes → "Halaman Penawaran".

Cycle 3 round 2 (REVISE) — findings and changes, re-rendered and the six
screenshots re-opened:

- Holding the Exclusive image left five bundles and an empty cell, followed
  by a second "see all" style (the pill) → `SeeAllTile` closes any odd home
  grid ("Semua paket · 42 paket hemat"; "Semua produk · 49 produk dan
  paket"); an even preview keeps the button, so a full row is never broken.
- Not changed, with reason: the landing row's title equals the product name
  (operator retitles it in the landing editor; Owner list); "Total
  Pembayaran" vs CS-confirmed shipping is product checkout copy.

Cycle 3 round 3: PASS (gate green), deployed as `69cbfe8`. Further polish
after it (owner: "yang bisa kau sempurnakan, sempurnakan saja"), re-rendered
and the six screenshots re-opened:

- Live content (D1 `storefront_content`, draft and published, guarded by
  version; backup kept outside the repo): "Teruji klinis resmi/berizin BPOM
  RI" in 36 SEO descriptions → "Terdaftar BPOM RI" (BPOM registers, it does
  not run clinical tests); "samarkan kerutan secara klinis" → "samarkan
  kerutan"; Adenosine's "teruji klinis … stimulasi kolagen" → "untuk merawat
  elastisitas kulit"; Gloss Gel's "meredakan iritasi … seketika" → "membantu
  menenangkan". Cosmetic function claims (anti-aging, mencerahkan, tone-up)
  are the brand's own and stay.
- Home no longer lists a landing page that redirects to its product page (the
  Treatment Lotion one): it repeated ritual step 2 as an "offer".
- Order summary: the product name takes the full row; size left and price
  right on the line below (was "Paket Glow / Up Adenosine" in a 52 % column).

Cycle 3 round 4: PASS. Its one suggestion applied after it, re-rendered and
the six screenshots re-opened: the see-all tile was an aqua slab like an
empty image well at 1440 → a white card with the border hairline (teal on
hover), so it reads as a link card.

Cycle 3 round 5 (REVISE) — change made after it, re-rendered and the six
screenshots re-opened: "Beli satuan" on a bundle PDP showed the first four
singles of the catalogue → it leads with the bundle's own products
(`singlesForBundle`, from `bundleContents`; test added), padded with other
routine singles to an even count (Glow Up: Facial Wash, Toner, Adenosine +
NAD+ Serum; 6-in-1: all six).

### Polish cycle 4 (2026-10-15)

New review cycle; the previous log is archived as
`design/review-rounds-2026-10-15-polish3.log`. Starts from the renders above
(`design/renders/ux-home-390.png`, `design/renders/ux-home-1440.png`,
`design/renders/ux-produk-390.png`, `design/renders/ux-produk-1440.png`,
`design/renders/ux-pdp-390.png`, `design/renders/ux-pdp-1440.png`).

### Prices and variants against numaskin.id (2026-10-16)

- Prices: all 49 products and every variant re-fetched from numaskin.id
  (Shopify, 2026-10-16) match D1 exactly, price and compare-at (0 diffs).
- Variant labels (live D1): 37 single-variant bundles said only "Paket" →
  their contents with sizes in routine order ("Facial Wash 100ml + Adenosine
  30gr"; Twin Pack "2× Toner 150ml"). Exclusive keeps "Paket" (its image adds
  a travel size and pouch the data does not confirm). `bundleContents` now
  lists in routine order, so card, label and ritual read alike.
- PDP: a single-variant bundle states "Isi paket" with that label instead of
  a pill; the form's one-option variant step is hidden (radio stays checked).
- "Beli 2": the merchant's only real multi-buy price is Twin Pack (2× Toner
  150ml, Rp151.600 vs 2 × Rp109.000). It is offered on the Treatment Lotion
  page as a third size, "2× 150ml" (compare-at 2 × Rp239.000), and the landing
  copy names it. No other "beli 2" price exists, so none is invented.

Cycle 4 round 2 (REVISE) — findings and changes, re-rendered and the six
screenshots re-opened:

- At 390 the chip row ended exactly between chips, so nothing said it
  scrolls → chip padding 10 px, gap 6 px, fade dims to 30 % instead of
  vanishing: a chip is cut at the edge at every common width (measured
  peek 19/34/49/73 px at 360/375/390/414, 37 px in the 480 column).
- "Pilih ukuran" over "Toner 50ml / Toner 150ml" left a bundle buyer unsure
  whether the other items change → when every option names the same product,
  the label says "Pilih ukuran toner" and the pills show "50ml / 150ml".

### Bundle repricing (owner decision 2026-10-16: "Turunkan harga paket")

Found: on numaskin.id most bundles cost the same as their singles (±Rp2), and
bundles holding Sunscreen or Gloss Gel cost Rp30.000 more per item (those
singles are on promo at Rp79.000; bundles price them at the Rp109.000 list
price). Only Twin Pack saved. Applied (live D1, guarded by old price; backup
outside the repo): each bundle variant = today's singles total × 0.95, rounded
down to Rp500, never above its old price (Twin Pack unchanged); 44 variants.
Compare-at prices stay numaskin.id's. Fixed on the way: `bundleContents`
missed "tabir surya" (Ultimate Anti-Aging 50ml holds Sunscreen; its label now
lists five items, matching numaskin.id's price exactly).

The PDP now states the saving a buyer can check — "RpX lebih hemat dibanding
beli satuan" (`singlesTotal`, test added), updated with the size pills, hidden
when an item cannot be priced (Exclusive). Range today: Rp7.498 – Rp66.400.

Cycle 4 round 4 (REVISE): "HEMAT 30%" (against numaskin.id's compare-at)
contradicted "Rp11.498 lebih hemat dibanding beli satuan" on the same page.
Owner decision 2026-10-16 ("Total beli satuan"): a bundle's compare-at is its
singles total at today's prices (live D1, 45 variants; Exclusive keeps
numaskin.id's). Card strike, "Hemat x%", the PDP line and the checkout summary
now share one basis; the card's screen-reader label says "Harga beli satuan"
on bundles. Singles keep numaskin.id's compare-at. If a single's price
changes, recompute bundle prices and compare-at together.

Cycle 4 round 5: PASS. Its suggestion applied after it, re-rendered and the
six screenshots re-opened: the order summary showed a two-size bundle's
variant as "Toner 50ml", readable as the item bought → those 8 variants (Glow
Up ×2, Fresh & Hydrate, Lengkap 6-in-1) are labelled with full contents in
live D1; the PDP still asks "Pilih ukuran toner: 50ml / 150ml"
(`sizeChoice`, test added); the summary gives the label its own line, price
figures under it on the right.

### Polish cycle 5 (2026-10-16)

New review cycle; the previous log is archived as
`design/review-rounds-2026-10-16-prices.log`. Starts from the renders above
(`design/renders/ux-home-390.png`, `design/renders/ux-home-1440.png`,
`design/renders/ux-produk-390.png`, `design/renders/ux-produk-1440.png`,
`design/renders/ux-pdp-390.png`, `design/renders/ux-pdp-1440.png`).

Cycle 5 round 1 (REVISE) — findings and changes, re-rendered and the six
screenshots re-opened:

- Every bundle card said the same "HEMAT 5%" → the card pill states that
  bundle's rupiah saving (compare-at, the singles total, minus price); the
  bundle PDP states its saving once, on the "lebih hemat dibanding beli
  satuan" line (the % pill stays for singles).
- Paket Exclusive still carried numaskin.id's compare-at (Rp525.000), which
  would have read as a Rp223.350 saving on another basis → its compare-at is
  cleared in live D1 (no strike, no saving claimed until its contents are
  confirmed).

Cycle 5 round 2 (REVISE) — changes, re-rendered and the six screenshots
re-opened:

- "Paket Hemat" chip was off-screen at 390 → bundles are the second chip,
  after "Semua" (`orderCategories`, test updated); chip peek re-measured
  32–95 px at 360–480.
- Ritual step labels centred over their centred cards, at the label size.
- See-all tile was a tall bordered slab → square, as tall as a card image.
- Bundle saving pill 9 px → the label size (11 px).
- "Tentang produk ini" label → screen-reader heading only.
- CS-confirmed order form: "Total Pembayaran" (shipping not included) →
  "Subtotal"; the hybrid form, which prices shipping, keeps its label.
- Not changed, owner decision: no button or anchor to the form under the
  size pills ("hapus aja kan sudah ada form di bawah", 2026-10-15). Also kept:
  "Official Store" (the brand's own domain); the PDP poster (owner content).

Cycle 5 round 3 (REVISE) — changes, re-rendered and the six screenshots
re-opened:

- See-all tile left a hole beside a full card → it fills the row with a
  card's anatomy: an aqua square holding the title, then note and action.
- Singles showed a strike with no saving → "Hemat x%" pill against
  numaskin.id's normal price, as the merchant shows it (bundles keep the
  rupiah saving against singles).
- Card type line 9 → 10 px; ritual step labels 13 px sentence case (not
  tracked caps); 1440 canvas a step deeper (#E6F0F3) so the column reads.
- Footer "All Rights Reserved" → "Hak cipta dilindungi."
- Not changed, with reason: the hold rule covers marketing promises printed
  on images (results in N days, gifts, instant effects); "Anti-Aging & Extra
  Whitening" on the Glow Up poster is the facial wash's on-pack product name,
  the same wording the singles' packshots carry, so it is not held.

Cycle 5 round 4 (REVISE) — change, re-rendered and the six screenshots
re-opened: the card type line broke mid-label at 10 px ("SKINCARE / SET",
"FACIAL / CLEANSER") → each part is non-breaking and the line may only break
at " · " (the separating space sits outside both parts; inside one, it made
the whole line unbreakable and widened cards to 186 px at 360 — caught by
measurement). Measured: no mid-label break, no overflow at 360/390/1440.

Cycle 5 round 5 (REVISE) — change, re-rendered: a wrapped type line started
with "·" → the separator ends the first part ("FACIAL CLEANSER ·" / "100 ML");
re-measured, no break inside a part, no overflow at 360/390/1440.

### Polish cycle 6 (2026-10-16)

New review cycle; the previous log is archived as
`design/review-rounds-2026-10-16-polish5.log`. Starts from the renders above
(`design/renders/ux-home-390.png`, `design/renders/ux-home-1440.png`,
`design/renders/ux-produk-390.png`, `design/renders/ux-produk-1440.png`,
`design/renders/ux-pdp-390.png`, `design/renders/ux-pdp-1440.png`).
