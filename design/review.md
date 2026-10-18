Reviewer: claude via visual-review.py
Review-Context: separate ai-ask invocation
Model: unavailable: ai-ask does not report the resolved model/provider
Screenshots: design/renders/ux-empty-1440.png, design/renders/ux-empty-390.png, design/renders/ux-home-1440.png, design/renders/ux-home-390.png, design/renders/ux-pdp-1440.png, design/renders/ux-pdp-390.png, design/renders/ux-pdp-single-1440.png, design/renders/ux-pdp-single-390.png, design/renders/ux-produk-1440.png, design/renders/ux-produk-390.png
References: design/refs/current-home/1440.png, design/refs/current-home/390.png, design/refs/current-produk/1440.png, design/refs/current-produk/390.png, design/refs/numaskin-collection/1440.png, design/refs/numaskin-collection/390.png, design/refs/numaskin-home/1440.png, design/refs/numaskin-home/390.png, design/refs/numaskin-pdp/1440.png, design/refs/numaskin-pdp/390.png
Prompt-SHA: 4ae0ce2195b477c4
Context-SHA: f9e0708e8bcc1a50
Images-SHA: a604512ccf1ad76a
Output-SHA: 8915616412ad2c96

## Render review: numaskin storefront (install skin, cycle 8 renders)

All 63 images opened and read. No blocker. The last slice of the 1440 PDP (`d393c002372d11b8-ux-pdp-1440-03.png`) is a 13 px remainder strip with nothing in it.

Reading the set:
- **Built pages:** `ux-home`, `ux-pdp` (bundle), `ux-pdp-single`, `ux-produk` and `ux-empty`, each at 390 and 1440.
- **Merchant references:** `346ae…`/`2592db…` (home), `8ad616…`/`a76024…` (PDP), `599f0d…`/`2055b6…` (collection).
- **Pre-change store:** `ff7ddb…`/`e7d9ab…` (home) and `717125…`/`71cbde…` (/produk), with black badges, Cinzel monogram and a left-ruled heading.

### Per section, top to bottom

**Home**

- Top band + wordmark | authored | numaskin.id wordmark and katakana, marine band (`7d096ae…-1440-01`, `48feb52…-390-01`) | None. The band now states a fact the PDP repeats ("COD tersedia…") instead of the unsourced "Official Store" the reference carries.
- Hero | authored | merchant's water-splash poster, serif h1, one pill CTA (`48feb52…-390-01`) | None. The tube stays whole in the 5:4 crop and the CTA is on the first screen. The CTA jumps to `#paket`, below the ritual and singles, so a label like "Lihat Paket Hemat ↓" would set the expectation.
- Search + chips | authored | reference chip row, active chip filled marine | None. The chip cut off at the right edge ("Fac…") reads as scrollable at 390 and 1440.
- Ritual (2×2) | authored | reference's numbered steps and serif uppercase title over a cyan rule | None. The step label is sentence case teal, and all four steps are visible without a scroller. These are real sequence numbers, not template chrome.
- Lengkapi Rutinitas + see-all tile | authored | reference grid card (aqua well, mono teal type line, uppercase centred name, marine price, grey strike) | None. The tile closes the odd cell with a 2×2 of real packshots and matches the card's height. Ritual cards omit the type line while these show it. That is deliberate, but it is the one visible seam between the two grids.
- Paket Hemat | authored layout, owner-supplied imagery | reference bundle cards with a "HEMAT" pill | Supply a packshot per bundle. The posters, collage and model photo (`7d096ae…-1440-02/03`) switch image register from the clean packshots above. The Fresh & Hydrate, NAD+ and Glow Up posters print "OFFICIAL STORE", which the page's own top band no longer claims. The layout already has square image wells for these.
- Footer | authored | reference wordmark, simplified | None. "Halaman Penawaran" and "Hak cipta dilindungi." read cleanly.

**/produk**

- Intro, search, chips | authored | none beyond the shared system | None. The title and cyan rule are the whole heading, with no eyebrow or intro sentence.
- Grid + load-more | authored | reference collection grid, minus its claims | Sunscreen shows "HEMAT 55%" and Gloss Gel "HEMAT 50%" against Rp175.000 and Rp159.000. The Owner list records that the Rp79.000 sunscreen is a promo and that bundles elsewhere price it at Rp109.000. The pill is a discount claim with no visible source, so confirm those compare-at figures before they stay on the page.
- Empty state | authored | none | The white block between the message card and the footer is about 340 px at 1440 (`6299f63…-1440-01`) and about 170 px at 390. This is the documented min-height. A one-line "Lihat semua produk" link under the reset button would use that space.

**PDP**

- Bundle PDP, image + caption | authored layout, owner imagery | reference buy box | The poster says "Routine 150ml" while the 50 ml size is preselected and the summary reads "Toner 50ml". The caption "Foto ilustrasi. Isi paket mengikuti ukuran yang dipilih." covers it honestly. A per-size image is owner content.
- Title, price, saving, size pills, COD line | authored | reference filled-marine size pill, serif title, large price | None. "Rp11.498 lebih hemat dibanding beli satuan" and "Pilih ukuran toner / 50ml · 150ml" are specific and consistent with the summary.
- Description + accordions | authored | reference accordion | None. Both accordions start closed, so the form follows within about 1.5 screens at 390. There is no button under the sizes by owner decision, which makes this scroll the only route.
- Form + summary | authored | none (product checkout code) | None. The disabled "Lengkapi nama terlebih dahulu" pill is pale but legible and says what it needs. The summary gives the label its own line and the prices sit right-aligned.
- Beli satuan / Lengkapi rutinitas | authored | none | None. The bundle PDP lists exactly the bundle's own products plus the see-all tile, and the single PDP lists four others in an even 2×2.
- Single PDP | authored | reference PDP minus gallery and trust strips | None. The packshot fills the 480 px column, the "HEMAT 30%" pill sits beside the price, and the BPOM number is printed in the description as its own source. It has no thumbnail gallery, which is correct since the merchant's thumbnails are claim infographics.

### Template signals

None of the listed signals appears in the built pages: no dark hero with texture, no accent-word headline, no eyebrow over headings, no icon-tile card rows, no `→` on buttons, no checkmark lists, no stat figures. The mono category line on each card is the reference's own `.nm-mono`, and the only other mono-style labels are the "· 30 GR" size parts of that line. The merchant refs still carry these signals (`346ae…-1440-02/03`: the "DERMATOLOGICAL SCIENCE" eyebrow, icon-tile cards, the "Kerutan & Flek Berkurang Nyata dalam 14 Hari" campaign), and the build left them out. Swapping the brand name would not leave this page unexplained: the palette, wordmark, packshots and ritual are numaskin.id's.

### Reference fidelity and transfer

- **Transferred, and visible:**
  - Colour: marine, teal and aqua wells.
  - Type: DM Serif uppercase section titles over a short cyan rule.
  - Card anatomy: aqua well, mono teal category, uppercase centred name, marine price, grey strike, and a rounded HEMAT pill.
  - Water hero and wordmark.
  - Filled-marine size pill on the PDP.
- **Dropped, with a stated reason in the direction file:**
  - Trust strip ("BPOM RI Resmi", "Uji Dermatologi") and the "Kerutan & Flek Berkurang Nyata dalam 14 Hari" campaign. Neither has a visible source.
  - The 4-in-1 bundle bar. Its contents conflict between numaskin.id's ritual bar and its product page.
  - Desktop gallery and buy box. The owner kept the 480 px column.
- **Mismatch against the reference that is explained, not hidden:** at 1440 the build is a centred 480 px column with about 480 px of aqua canvas each side, while the merchant's page is full-width. The brief records this as the owner's constraint (2026-10-15), and the canvas was deepened a step so the column reads.
- **Versus the pre-change store:** the black square badges, left-ruled heading and Cinzel monogram are gone, which is the stated purpose of the skin.
- **Research:** the direction file names the reference captures, token sources, transfer rationale and per-round dispositions. Nothing is missing there.

Remaining items are owner content or recorded decisions, not layout defects: bundle packshots, the posters' printed "OFFICIAL STORE", the per-size poster, and the compare-at figures.

Most important change: Replace the Paket Hemat posters and collages with one packshot per bundle, and confirm the Rp175.000 and Rp159.000 compare-at prices behind the 55% and 50% pills.
Verdict: PASS