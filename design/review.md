Reviewer: claude via visual-review.py
Review-Context: separate ai-ask invocation
Model: unavailable: ai-ask does not report the resolved model/provider
Screenshots: design/renders/ux-home-1440.png, design/renders/ux-home-390.png, design/renders/ux-pdp-1440.png, design/renders/ux-pdp-390.png, design/renders/ux-produk-1440.png, design/renders/ux-produk-390.png
References: design/refs/current-home/1440.png, design/refs/current-home/390.png, design/refs/current-produk/1440.png, design/refs/current-produk/390.png, design/refs/numaskin-collection/1440.png, design/refs/numaskin-collection/390.png, design/refs/numaskin-home/1440.png, design/refs/numaskin-home/390.png, design/refs/numaskin-pdp/1440.png, design/refs/numaskin-pdp/390.png
Prompt-SHA: 4ae0ce2195b477c4
Context-SHA: 3033aa4987079182
Images-SHA: 4442f95d61bd0edd
Output-SHA: 05db42d106d52903

Paduka Ongki, saya sudah buka ke-55 gambar. Verdict-nya **REVISE**, tapi temuannya kecil. Review di bawah dalam bahasa Inggris, karena ini artefak teknis.

**Which slice set is which:**
- **Candidate (the rebuild):** `7d096…` and `48feb…` (home), `cb026…` and `d1611…` (/produk), `d393c…` and `f28f7…` (PDP).
- **numaskin.id references:** `346ae…` and `2592d…` (home), `599f0…` and `2055b…` (collection), `8ad61…` and `a7602…` (PDP).
- **The store before the change:** `ff7dd…` and `e7d9a…` (home), `71712…` and `71cbd…` (/produk).

## Per section (candidate, top to bottom)

**Home**
- **Top band + wordmark** | authored | numaskin.id `NUMA·SKIN` + katakana lockup | none. "Official Store" with no tick is the brand naming itself on its own subdomain, not a certification claim.
- **Hero** | authored | numaskin.id water-splash poster + serif h1 | none. At 390 the first screen holds the photo, the h1 "Skincare dengan Air Laut Dalam Ulleung", the subline, both actions and the search box. Unlike the reference, there is no "Awet Muda" or "83% / klinis" claim.
- **Search + chips** | authored | reference chip row (`2055b…-01`) | none. The chips sit on one line with a right-edge fade. On home no chip is marked active, which is correct.
- **Rutinitas 4 Langkah** | authored | reference "THE 4-STEP RITUAL" (`2592d…-04/05`) | none. It is a 2×2 grid with all four steps visible. The step label is left-aligned and the name centred, as in the reference. The ingredient mono line and the "DETAIL →" arrows are dropped.
- **Lengkapi Rutinitas** | authored, with a defect | reference product card | widen the peek.
  - At 1440 (`7d096…-02`, x≈955) and 390 (`48feb…-03`, right edge), the third card shows as a ~5 px hairline. That reads as clipping, not as "scroll for more".
  - The section has only three products, so a third of it is effectively hidden. On desktop it is worst: a mouse cannot scroll sideways.
  - Fix: make the cell ~42–44% so a recognisable part of the third packshot shows, or add prev/next controls at ≥1024 px.
- **Paket Hemat** | authored | reference bundle card with an inline HEMAT pill | fix the orphan word.
  - The intro "Sebagian dari 42 paket; semuanya ada di katalog." leaves "katalog." alone on its own line at both widths (`7d096…-02`, `48feb…-03`).
  - Fix: `text-wrap: balance` on section intros, or shorter copy.
  - The cards themselves work: "SKINCARE SET · 2 PRODUK", then the full name, then the contents line ("Facial Wash + Toner"). Prices share one baseline per row.
  - The infographic posters in the bundle images are owner content, and the image wells are sized for real packshots.
- **Halaman penawaran** | authored | none | none. A small label and one row, title only, with no claim-bearing meta description.
- **Footer** | authored | a simplified version of the reference footer | none. The reference's unsourced "BPOM / Halal / Teruji Dermatologi" lines are correctly left out.

**/produk**
- **Intro** | authored | reference "Semua Produk" serif title | none. Breadcrumb, then the serif title with a cyan rule. No eyebrow and no instruction sentence (the old store had both: the pill and the paragraph in `71712…-01`).
- **Search, chips, count** | authored | reference filter bar, simplified for the column | none. The "Semua" chip is filled marine and "49 produk" is a plain status line.
- **Grid + load more** | authored | reference collection grid | none.
  - Names are never truncated. Compare the old store's "Luceane SPF 50+…" in `e7d9a…-03`.
  - The claim-printing posters that open the reference collection (`599f0…-01`: "GARIS HALUS TERSAMARKAN", "Dalam 14 Hari Flek Mulai Hilang", "Free Ice Water Globe") are pushed out of the first ten.
  - "Menampilkan 10 dari 49 produk" sits above a marine pill with no arrow.

**PDP** (Paket Glow Up Adenosine)
- **Breadcrumb + image** | authored | reference PDP | owner content. The poster says "Routine 150ml" while 50 ml is preselected. This is already on the Owner list, so it is not a design failure.
- **Title, price, sizes, COD line** | authored | reference PDP price block (`8ad61…-01`) | none. Serif title, large marine price, strike, HEMAT pill. The "Toner 50ml" pill is filled marine. The COD line is stated as it really is.
- **Details + accordion** | authored | reference accordion | none. The "glowing" in the description is merchant copy (Owner list).
- **Form Pemesanan** | authored | none (this is the product's own checkout) | none.
  - Serif title + rule, three fields, and a summary that names "Toner 50ml".
  - The disabled submit is an aqua pill that says what is missing.
  - There is no `→` and no three-up process row.
- **Beli satuan rail** | authored | reference "Rekomendasi Terkait" | same peek fix as home. At 390 (`f28f7…-03`) there is also a ~35 px gap between name and price, from the off-screen card's longer name. It was accepted in an earlier round, so it is minor.

## Reference transfer
- **Hierarchy matches:** the serif uppercase title over a short cyan rule, the card stack (aqua well, teal mono type line, uppercase centred name, marine price, grey strike), the numbered ritual, and the PDP price + pill + size pills.
- **Rhythm adapts to the 480 px column:** one centred column instead of the reference's 4-up grid, with alternating white and aqua bands in place of the textured water band.
- **Imagery is the merchant's own photos.** The candidate also avoids the reference's empty image wells in "Paket Bahan Aktif" (`346ae…-03`, `2592d…-07`).
- **Template signals in the reference that the candidate drops:**
  - mono eyebrows over every heading and on every label
  - `→` on every button
  - checkmark claim lists
  - unsourced "BPOM RI · Teruji Klinis" lines
  - "Kerutan & Flek Berkurang Nyata dalam 14 Hari"
- **One deliberate departure:** the reference puts "Beli Sekarang" directly under the sizes, and the candidate has no CTA above the form. The direction records this as the owner's decision, and its sticky-bar reasoning is consistent with the 390 slices. I did not count it against the design.
- **Research and rationale are present:** captured refs, tokens taken from numaskin.id's own CSS, and a transfer rationale. This page would not fit another merchant if the name were swapped.

**Most important change:** Make the third card in both rails (home "Lengkapi Rutinitas" and PDP "Beli satuan") visibly partial (~42–44% cells, or desktop prev/next controls), so the ~5 px hairline no longer hides one of the three products.

**Verdict: REVISE**

The proposed fixes and a re-render checklist (360/390/1440, no page overflow, intro without an orphan word, `npm test` + `npm run check`) are in `/home/ongki/.claude/plans/you-review-a-web-lively-brooks.md`. I made no code changes, because plan mode was on. This is a visual review, not interaction or accessibility testing.