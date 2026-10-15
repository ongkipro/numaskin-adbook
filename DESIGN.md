# Numa Skin storefront — design direction

Install-owned. The product's system is `DESIGN-SYSTEM.md`; this file records
only how this install (`page.numaskin.id`) skins it to match the merchant's
own Shopify Hydrogen store, `numaskin.id`.

## Brief

- **Audience:** Indonesian skincare buyers arriving from ads or search on a
  phone, often after seeing numaskin.id or its marketplace stores.
- **Task:** recognise the brand they already know, find a product or a bundle,
  compare price and discount, and reach the COD/online checkout.
- **Constraint (owner, 2026-10-15):** keep the compact model — the 480 px
  mobile column, the compact-market template, its sections and order. Only the
  skin changes. Checkout behaviour, tracking, URLs, and the form are untouched.
- **Direction:** the numaskin.id visual language — marine ink, aqua-tinted
  surfaces, a serif display for headings, small tracked monospace labels,
  centred product cards — inside the existing compact composition.

## Reference evidence

Captured with `ui-ref.mjs` at 390 and 1440 px; the 390 px screenshots were
opened and read.

- `design/refs/numaskin-home/` — merchant home. Centred header wordmark
  `NUMA·SKIN` (Inter, tracked 0.16em) over katakana `ヌマスキン` in teal;
  aqua water imagery; mono pill eyebrow; serif uppercase section titles
  ("KOLEKSI UNGGULAN") with a short cyan rule; two-column product grid with a
  pale aqua image well, a teal mono category line, an uppercase centred name,
  marine price and a struck-through grey compare price.
- `design/refs/numaskin-pdp/` — merchant product page. Serif product title,
  large marine price, a mono "HEMAT 37%" pill, variant choices as pills (selected
  = filled marine), marine full-width buy button, accordion details.
- `design/refs/numaskin-collection/` — merchant collection grid, same card.
- `design/refs/current-home/`, `design/refs/current-produk/` — this store
  before the change: monochrome black, Cinzel-style monogram wordmark,
  left-ruled heading, black square discount badges, left-aligned cards.

Transfer rationale: the buyer should feel they are on the same brand as
numaskin.id. Brand recognition comes from colour, type, wordmark, and card
treatment — all transferable without changing the compact layout.

## Decisions

Tokens (from numaskin.id's own CSS custom properties, `app-*.css`):

| Role | Value | Use |
| --- | --- | --- |
| ink / primary | `#002B49` marine | headings, prices, primary buttons, header text |
| primary hover | `#081B2B` | button hover |
| accent text | `#0B6E7D` deep teal | labels, links (5.9:1 on white) |
| accent decorative | `#269BA8` cyan | rules, dots, focus ring only — 3.2:1, never body text |
| surface | `#F4F9FA` / `#EBF5F8` | image wells, section bands |
| border | `#E2EDF0` | card and input borders |
| muted text | `#5A6E7F` | secondary copy (5.4:1) |

Type: Inter (already shipped by the product, 400/600/700 only) for body;
**DM Serif Display 400** for h1/h2 and section titles; **JetBrains Mono 500**
for small tracked labels (category, eyebrow, discount). Both added fonts are
OFL, self-hosted latin subsets from `@fontsource/*@5.2.8` in `public/fonts/`
(no dependency, so a product merge never fights over `package-lock.json`).
Katakana falls back to the system CJK face, as on numaskin.id.

Composition contract:

- C1 Keep the 480 px column, section order, hero slider, search, load-more.
- C2 Header: centred `NUMA·SKIN` wordmark with katakana subline replaces the
  monogram; the official-store strip stays, recoloured marine.
- C3 Section headings: mono teal eyebrow → serif uppercase marine title →
  short cyan rule, centred (numaskin.id's "KOLEKSI UNGGULAN" pattern) — not
  the black left rule.
- C4 Product card: pale aqua image well, rounded 12 px; mono teal category;
  uppercase centred marine name; marine price + grey strike; discount as a
  mono pill "HEMAT n%" in place of the black "-n%" square.
- C5 Primary actions marine, rounded; focus ring cyan.
- C6 Product page: serif title, marine price, "HEMAT" pill, variant pills.

Do not substitute: generic black/white monochrome, Cinzel monogram, square
black badges, Tailwind blue focus ring.

## Not changed / owner list

- Hero slides, product photos and copy come from the catalogue as imported.
- numaskin.id shows trust claims ("Sertifikasi Halal", "Uji Dermatologi");
  they are not added here — only BPOM numbers already on product pages are
  shown. If the owner wants them, supply the certificate references.

## Render critique

Author: Claude Code (claude-opus-5-5), the builder.

Rendered locally (`wrangler dev --local`, a copy of the live D1 and R2) after
the refinement pass. Screenshots, opened and read:

- `design/renders/final-home-390.png`, `design/renders/final-home-1440.png`
- `design/renders/final-produk-390.png`, `design/renders/final-produk-1440.png`
- `design/renders/final-pdp-390.png`, `design/renders/final-pdp-1440.png`

Macro pass (renders since replaced): composition held — header wordmark,
centred serif section titles, aqua card wells, marine buttons and footer all
read as numaskin.id inside the unchanged compact column. Two findings, fixed:

1. Card and body text rendered in the system stack, not Inter: Tailwind's
   `font-sans` resolves to the product's system list. `--font-sans` now names
   Inter (`numaskin.css`). Verified by computed style on the card `h2`.
2. On a wide screen the column sat on plain white, so the brand stopped at
   the column edge. `--bg-canvas` is now the aqua surface `#F4F9FA`.

Independent review round 1 (REVISE) — findings and what changed:

1. Hero caption over the slide's own artwork text → the caption now sits on
   white under the slide; dots are marine on white.
2. Card names bold and truncated ("CALMING BARRIER GLOSS GEL…") → regular
   weight, tracked, up to three lines; full names now render.
3. "HEMAT" in two treatments, on the image → one mono pill under the price on
   cards and beside the price on the PDP; removed from images.
4. PDP showed Rp227.000 while the form pre-selected Rp257.000 → the form now
   starts on the variant the headline shows (`selectedVariantId` = cheapest).
5. C6 not met (variant list + radios) → the list is replaced by size pills
   under the price (selected = filled marine). Pills and the form's radios are
   one choice, synchronised both ways. The form keeps its radio block: it is
   the product's checkout control the order is submitted from (intended
   deviation from the reference, which has no inline form).
6. Mixed label systems and filler rows → all PDP section labels use the mono
   label; the Kategori / Fokus Produk / Ketersediaan rows are removed.
7. Checkout unskinned → form ink is marine, section bullets cyan, empty fields
   aqua with an aqua border, totals marine; sticky "Pesan Sekarang" is marine.
   My round-1 critique claimed C6 and the checkout skin before they existed;
   that was wrong.

Behaviour checked in the browser (`paket-glow-up-adenosine`): initial
headline Rp227.000 = form "Toner 50ml" = total Rp227.000; tapping the
"Toner 150ml" pill → headline Rp257.000, form radio 150ml, total Rp257.000;
choosing "Toner 50ml" in the form → headline and pills follow. No console
errors.

Per section (C1–C6):

- Header (C2): `NUMA·SKIN` + `ヌマスキン` centred, marine/teal, official-store
  strip on the aqua surface. Matches the reference header.
- Hero (C1): unchanged slider; the caption (mono pill + marine line) sits
  under the slide so the merchant artwork stays legible.
- Catalogue heading (C3): mono teal eyebrow → serif uppercase marine title →
  cyan rule, centred, as "KOLEKSI UNGGULAN" on numaskin.id. Not a generic
  left-ruled heading any more.
- Cards (C4): aqua well, teal category, regular tracked uppercase centred
  name (up to three lines), marine price + grey strike, "HEMAT n%" pill under
  the price.
- Landing list and footer: aqua band, white rounded list, marine wordmark.
- PDP (C6): serif title, 28 px marine price with one "HEMAT" pill, size pills
  synchronised with the form, one mono label system, skinned checkout form.

Measured: no horizontal scroll at 390 or 1440; zero console errors on all six
renders; keyboard Tab reaches the wordmark, hero dots, search and each card
with a visible 2 px cyan focus ring. Contrast (`contrast.py`): teal on white
5.93:1, teal on aqua 5.35–5.58:1, muted 4.97–5.28:1, white on marine 14.56:1;
cyan 3.31:1 is used only for non-text marks (rules, dots, focus ring).
