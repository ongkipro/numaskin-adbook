Reviewer: claude via visual-review.py
Review-Context: separate ai-ask invocation
Model: unavailable: ai-ask does not report the resolved model/provider
Screenshots: design/renders/ux-empty-1440.png, design/renders/ux-empty-390.png, design/renders/ux-home-1440.png, design/renders/ux-home-390.png, design/renders/ux-pdp-1440.png, design/renders/ux-pdp-390.png, design/renders/ux-pdp-single-1440.png, design/renders/ux-pdp-single-390.png, design/renders/ux-produk-1440.png, design/renders/ux-produk-390.png
References: design/refs/current-home/1440.png, design/refs/current-home/390.png, design/refs/current-produk/1440.png, design/refs/current-produk/390.png, design/refs/numaskin-collection/1440.png, design/refs/numaskin-collection/390.png, design/refs/numaskin-home/1440.png, design/refs/numaskin-home/390.png, design/refs/numaskin-pdp/1440.png, design/refs/numaskin-pdp/390.png
Prompt-SHA: 4ae0ce2195b477c4
Context-SHA: aa9b87b3dc2d2acf
Images-SHA: c02af30dc1bef5f8
Output-SHA: 86a8abdbd404f544

## Section by section (top to bottom)

**Home (`ux-home-1440-01..03`, `ux-home-390-01..05`)**
- Top band + wordmark | authored | numaskin.id header (centred `NUMA·SKIN` and katakana) | none. "COD tersedia untuk sebagian besar wilayah" is a checkable fact, not the badge that was there before.
- Hero | authored | numaskin.id water-splash Adenosine poster | none needed. The headline is a plain statement with no outcome promise, there is one action ("Lihat Paket Hemat"), and the poster crop at 390 leaves the CTA above the fold.
- Search + chips | authored | merchant routine order, Paket Hemat second | none. The "Fac…" / "Hydrating" chip is cut at the edge at both widths, so the row shows it scrolls. No chip is marked active on home.
- Rutinitas 4 Langkah | authored | numaskin.id "4-step ritual" without its mono eyebrow and outcome title | none. The numbers mark a real sequence. All four steps sit in a 2×2 grid and prices line up across each row.
- Lengkapi Rutinitas | authored, but the "Semua produk" tile is a familiar pattern | merchant collection card | the tile's 2×2 holds real packshots and matches the image well's height, which justifies it.
- Paket Hemat | authored | merchant bundle cards with a rupiah HEMAT pill | the mono line "2 PRODUK" sits directly above "Facial Wash + Adenosine", so the card states the count twice. Cycle 6 round 3 dropped it for this reason and cycle 7 restored it. Pick one; I'd keep the contents line and only show the size, when there is one, in mono.
- Footer | generic but appropriate | merchant footer without its unsourced trust row | none.

**Catalogue `/produk` (`ux-produk-1440-01..02`, `ux-produk-390-01..03`)**
- Page intro | authored | merchant "Semua Produk" serif and cyan rule without its claim paragraph | none.
- Grid | authored | merchant card anatomy | the Treatment Lotion card reads "HYDRATING TONER" with no size, while every other single shows "· 100 ML", "· 30 GR" and so on. On `/produk` row 1 and in every "Lengkapi/Beli satuan" grid, that card is the odd one out. It is a multi-size product, so the line should say "· 50/150 ML" rather than nothing.
- Load more | authored | merchant count line plus a button, without the mono progress bar | none.

**PDP bundle (`ux-pdp-1440-01..03`, `ux-pdp-390-01..04`)**
- Breadcrumb | minor | — | the PDP starts at "Produk /" but `/produk` starts at "Beranda /". Use one root.
- Photo + caption | owner content | merchant poster | "Foto ilustrasi…" now reads clearly at 13 px marine. The poster itself is still on the Owner list.
- Title/price/saving/size | authored | merchant PDP (serif title, large marine price, pills) | none. "Rp11.498 lebih hemat dibanding beli satuan" matches the strike and the order summary. "Pilih ukuran toner" plus 50ml/150ml says exactly which item changes.
- Details accordions | authored | merchant accordion, without the icon tiles | none.
- Form Pemesanan + summary | authored | — | none. The contents label gets its own line, the struck and final prices sit right, and "Subtotal" carries a "via CS" note.
- Beli satuan | authored | — | lists exactly the bundle's three items and closes with the see-all tile. None.

**PDP single (`ux-pdp-single-1440-01..02`, `ux-pdp-single-390-01..04`)**
- Single product | authored | merchant PDP | none. One price, "Hemat 30%", no size picker, no "Isi paket". The BPOM number in the description is a sourced claim.

**Empty search (`ux-empty-1440-01`, `ux-empty-390-01..02`)**
- Empty state | authored | — | about 340 px of blank column before the footer at 1440. This is recorded as kept (column min height), and I'm not reopening it.

## Comparison with the references

These slices are the merchant references: `599f0d2846f33112` / `2055b62e4f4a29ea` (collection), `346ae10365c6bf1f` / `2592db7c80fb8114` (home), `8ad616f6fc58b4ea` / `a76024c45f13f54c` (PDP). These are the store before the rebuild: `ff7ddb436fdd0d5d` / `e7d9abdedbaea39e` and `717125b768ff5ac2` / `71cbde06cd7989f2`.

**What transferred correctly:**
- marine/teal/aqua palette
- uppercase serif title over a short cyan rule
- centred uppercase Inter card names
- teal mono category line on cards only
- aqua image wells
- inline marine price with grey strike
- numbered ritual
- size pills with the selected one filled

**What was dropped from the merchant, correctly:** these are the template signals the brief rejects, and none of them came back:
- tracked mono eyebrows over every heading ("THE 4-STEP RITUAL", "DERMATOLOGICAL SCIENCE")
- the four icon-tile trust row and "BPOM RI · TERUJI KLINIS" card footers
- "Kerutan & Flek Berkurang Nyata dalam 14 Hari" with checkmark bullets
- `→` on every button
- claim-printing bundle posters at the top of the collection

The before-state's black square badges, Cinzel "N NUMA SKIN" and left-ruled "PRODUK KAMI" eyebrow are fully gone.

**Where the rebuild differs from the merchant, deliberately:** the 480 px column instead of a 4-up grid, and no gallery thumbnails on the PDP. Both follow from the owner's compact-model constraint. No mismatch goes unexplained.

**Research and rationale:** captured and explained for each section in DESIGN.md. Nothing is missing.

**Breakage:** nothing broken or clipped at either width. The only cut is the chip row, and that cut is intentional.

**Most important change:** show a size range on a multi-size single's type line ("HYDRATING TONER · 50/150 ML") so it matches every other card in the grids and rails.

**Verdict: PASS**

The bundle-card count repeat and the breadcrumb root are minor and not blocking. This is visual acceptance only; I didn't test interaction or accessibility.