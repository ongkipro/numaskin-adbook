Reviewer: claude via visual-review.py
Review-Context: separate ai-ask invocation
Model: unavailable: ai-ask does not report the resolved model/provider
Screenshots: design/renders/ux-home-1440.png, design/renders/ux-home-390.png, design/renders/ux-pdp-1440.png, design/renders/ux-pdp-390.png, design/renders/ux-produk-1440.png, design/renders/ux-produk-390.png
References: design/refs/current-home/1440.png, design/refs/current-home/390.png, design/refs/current-produk/1440.png, design/refs/current-produk/390.png, design/refs/numaskin-collection/1440.png, design/refs/numaskin-collection/390.png, design/refs/numaskin-home/1440.png, design/refs/numaskin-home/390.png, design/refs/numaskin-pdp/1440.png, design/refs/numaskin-pdp/390.png
Prompt-SHA: 4ae0ce2195b477c4
Context-SHA: d89ed9950614ef18
Images-SHA: 34c43073d42a7275
Output-SHA: dfb857a42c7d39c6

Review of the storefront renders against the direction doc. I opened all 55 images. 24 are renders of the new build (home, PDP and `/produk` at 1440 and 390). 31 are baselines and references: the old monochrome store in `ff7ddb43…`, `e7d9abde…`, `717125b7…` and `71cbde06…`, and numaskin.id's home, collection and PDP in `346ae103…`, `2592db7c…`, `599f0d28…`, `2055b62e…`, `8ad616f6…` and `a76024c4…`. Nothing was uninspectable.

## Home (`7d096ae0…` at 1440, `48feb52a…` at 390)

- **Top band + wordmark** | authored | matched (marine band, centred `NUMA·SKIN` + katakana) | "Official Store Numa Skin" has no visible source on the page. The tick is already gone, but the words alone still make the claim. Keep it only if the owner accepts the brand's own domain as the source, otherwise use "Numa Skin".
- **Hero** | authored | matched (water poster, serif headline, cropped 5:4) | At 390 the headline and the single full-width marine "Lihat Paket Hemat" button fit before the search row, so the task is clear. At 1440 the same 480 px column floats on about 960 px of empty pale canvas (owner-mandated compact model). Nothing is wrong inside the column.
- **Search + chips** | authored | matched (rounded search, pill chips) | The cut-off chip ("Fac…" at 1440, "Hydrating" at 390) shows the row scrolls. No change needed.
- **Ritual (4 steps)** | authored | partly (reference uses 4-up with water texture; here 2×2 by design) | The numbering is a real sequence, so the equal cards are justified. The toner image is pale on a pale well and almost vanishes at 1440 (`7d096ae0…-01`). Add a slightly stronger well tint or scale for slim bottles.
- **Lengkapi Rutinitas + "Semua produk" tile** | authored | none | At 1440 the tile is a serif title floating on a blank gradient above a white half. It reads as an empty image well beside a real product card. Put a product collage or the category count in the top half instead of an empty gradient.
- **Paket Hemat** | authored | matched (inline saving pill) | The caption "Sebagian dari 42 paket; semuanya ada di katalog." wraps to two centred lines and reads like an apology. The tile below already says "42 paket hemat". Cut the caption.
- **Footer** | authored | partly | It is clean, but it has no CS/WhatsApp route while the reference footer does. For a COD buyer the only path is a "Kontak" text link. Add a WhatsApp link if the number is configured.

## PDP (`d393c002…` at 1440, `f28f7bb1…` at 390)

- **Breadcrumb + poster** | authored | matched | The full-width Glow Up poster works as the hero image. It prints "Routine 150ml" while 50ml is preselected. This is already logged as owner content.
- **Title / price / saving / size pills** | authored | matched (serif title, large marine price, filled-marine pill) | The hierarchy is good. "Rp11.498 lebih hemat dibanding beli satuan" is a checkable claim next to the price, and "Pilih ukuran toner" is specific. The COD line is the last thing above the fold at 390 and gets clipped.
- **Description + accordions** | authored | partial | There is no action between the pills and the form, which is the owner's decision. The consequence is visible at 390: about 350 px of description and accordions sit between the sizes and the first form field, so the buy path is a long scroll. The reference puts the buy button right under the sizes. I flag this as a conversion risk and not a defect.
- **Order form + summary** | authored | none | The summary reads well: product name, contents label, then price. The disabled "Lengkapi nama terlebih dahulu" pill correctly looks inert.
- **Beli satuan** | authored | matched | The bundle's own products come first, and the 2×2 grid has no hole.

## Catalogue (`cb026733…` at 1440, `d16117a2…` at 390)

- **Header + search + chips** | authored | matched (cyan rule, filled active chip, count line) | No issue.
- **Grid** | authored | matched | Singles come first and the held-image bundles are pushed to the end. Subgrid leaves a visible gap between the contents line and the price when a neighbour's name wraps (Fresh & Hydrate vs NAD+ Youth Boost, `cb026733…-02`, about 30 px). Mixing poster images with studio packshots is owner content.
- **Type line at 390** | authored | matched (mono category line, as on numaskin.id) | **Defect:** the line breaks so a dot starts the second row ("SKINCARE SET / · 2 PRODUK", "FACIAL CLEANSER / · 100 ML"). It shows in `48feb52a…-04`, `f28f7bb1…-03` and `d16117a2…-01` to `-03`. The direction doc says a size line never starts with "·", but it does at 390 on all three pages. At 10 px mono teal it is also the smallest text on the page.
- **Load more + footer** | authored | matched | No issue.

## Reference comparison

- **Transferred well:** palette, DM Serif titles with the cyan rule, wordmark, the water hero, aqua wells, centred uppercase names, the "HEMAT" pill and the ritual numbering. The direction doc records the research and the transfer rationale (the reference captures it lists, then "Transfer rationale"). Swapping the brand name would not leave the page unexplained.
- **Deliberately not transferred:**
  - the trust strip, BPOM and Halal badges, and the "Kampanye 14 hari" outcome block, none of which have a visible source;
  - the PDP buy button under the sizes (owner decision);
  - the thumbnail gallery.
- **Template signals checked:**
  - There is no dark grid hero, no stat placeholders, no eyebrow over titles, no accent-word headline and no arrow on every button.
  - Mono appears only on the category line.
  - The repeated "HEMAT x%" pill on every single card is the one place the page leans generic. It is reference-faithful, but it carries little information when every card has one.
- **Responsive:** I saw no clipping or horizontal overflow in any slice.

Most important change: stop the "·" from leading the wrapped card type line at 390, by moving the separator to the end of the first line or shortening the labels, since this repeats on every card on all three pages.

Verdict: REVISE