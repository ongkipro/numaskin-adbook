Reviewer: claude via visual-review.py
Review-Context: separate ai-ask invocation
Model: unavailable: ai-ask does not report the resolved model/provider
Screenshots: design/renders/ux-home-1440.png, design/renders/ux-home-390.png, design/renders/ux-pdp-1440.png, design/renders/ux-pdp-390.png, design/renders/ux-produk-1440.png, design/renders/ux-produk-390.png
References: design/refs/current-home/1440.png, design/refs/current-home/390.png, design/refs/current-produk/1440.png, design/refs/current-produk/390.png, design/refs/numaskin-collection/1440.png, design/refs/numaskin-collection/390.png, design/refs/numaskin-home/1440.png, design/refs/numaskin-home/390.png, design/refs/numaskin-pdp/1440.png, design/refs/numaskin-pdp/390.png
Prompt-SHA: 4ae0ce2195b477c4
Context-SHA: 1ed71865b4661588
Images-SHA: a738cda8671339d2
Output-SHA: f6eef71f7c5c1c2f

Saya sudah membuka dan memeriksa ke-56 gambar. Sesi ini dalam plan mode, jadi tidak ada file repo yang diubah. Satu-satunya file yang ditulis adalah catatan review di file plan.

## Per section (renders: home, /produk, PDP; 390 and 1440)

**Home**
- Top band + wordmark | authored | numaskin.id's marine band and `NUMA·SKIN` + katakana wordmark (`346ae…-1440-01`, `2592…-390-01`) | Fine as built. "Official Store" here is the brand speaking on its own domain, not a platform badge, and the verification tick is gone.
- Hero | authored | numaskin.id's water-splash Adenosine poster and serif headline, cut down to one action | No change. The h1 "Skincare dengan Air Laut Dalam Ulleung" makes no outcome claim, and at 390 (`48feb…-01`) the image, headline and "Lihat Paket Hemat" all fit on the first screen.
- Search + chips | authored | numaskin.id's category order | No change. "Face Serum" fades at the right edge, which shows the row scrolls. No chip is marked active on home.
- Rutinitas 4 Langkah | authored | numaskin.id's "4-Step Ritual" (`2592…-390-04`), minus its ingredient lines and its "Awet Muda" claim | No change. It is a 2×2 grid with all four steps visible. The numbers are a real sequence, and prices sit on one line across each row.
- Lengkapi Rutinitas | generic-leaning | merchant collection card | Optional: the "Semua Produk" tile (`7d096…-1440-02`) is a bordered white card next to borderless cards. It reads as a link, but its serif title and pill button are a third style on the page. Consider dropping the button so the whole tile is the link.
- Paket Hemat | authored layout, owner-limited imagery | merchant bundle cards with the inline "HEMAT" pill | Owner: supply packshots. At 170 px the Fresh & Hydrate, Glow Up and Daily Care posters are unreadable text plus faces (`48feb…-04`). The layout already gives packshots a square well, so this is owner content, not a design defect.
- Footer | authored | merchant wordmark footer, without its BPOM, Halal or dermatology claims | No change.

**/produk**
- Title + search + chips + count | authored | merchant collection header (`599f…-1440-01`), without the stock photo or the "resmi … berkualitas tinggi" copy | No change. The serif title with a cyan rule replaced the old "Semua Produk" pill (`717125…-1440-01`).
- Grid + load-more | authored | merchant card | No change. Singles come first, then bundles. Prices share a baseline in each row (`d1611…-02`). "Menampilkan 10 dari 49" sits above a marine pill that replaced the old black block. The type line "HYDRATING TONER" has no size, which matches numaskin.id for a product with two sizes.

**PDP (bundle: Paket Glow Up Adenosine)**
- Breadcrumb + image | authored | merchant PDP | Owner: the poster prints "Routine 150ml" and "Complete Anti-aging Ritual", but 50 ml is preselected. This is already on the owner list.
- Title / price / sizes / COD | authored | merchant PDP (`8ad6…-1440-01`) without the trust strip, the "Garansi Resmi" card and the cart controls | No change. It reads title → large marine price + HEMAT → size pills → one honest COD line.
- Description + accordions | authored | merchant accordion | Owner: "untuk kulit glowing" is still in the description.
- Form Pemesanan | authored inside product checkout code | none | Not this install's scope: "Total Pembayaran Rp227.000" sits beside "Ongkir & admin dikonfirmasi via CS", so the "total" leaves out shipping. "Subtotal produk" would be accurate. That has to change in the product's checkout code.
- Beli Satuan | authored | merchant "Rekomendasi Terkait" (`a7602…-03`) | No change. It leads with the bundle's own three products and adds NAD+ to make an even 2×2.
- `d393…-1440-03` is an empty strip of page background below the footer. Nothing is clipped.

## Evidence and transfer

What carried over from the references:
- **Hierarchy:** serif uppercase titles over a short cyan rule, centred.
- **Cards:** an aqua image well, the teal mono type line and the uppercase centred name.
- **Ritual:** the numbered steps.
- **Bundles:** the inline HEMAT pill.

All of these are taken from `346ae…`, `599f…` and `8ad6…`, and they replace the monochrome before-state (`ff7dd…`, `e7d9…`, `717125…`, `71cbd…`): Cinzel "N NUMA SKIN", black "-30%" badges, a left-ruled eyebrow heading and a black load-more block.

What was deliberately dropped from the references: the stat and claim strips ("BPOM RI Resmi", "Uji Dermatologi", "Teruji klinis", "Berkurang Nyata dalam 14 Hari"), the arrow on every button, and the mono eyebrows. None of these had a visible source.

Density fits the 480 px column: one product type per section, and no row of equal icon cards. The direction document records the references and the reasoning for what was transferred.

No broken or clipped rendering at 390 or 1440. None of the template signals listed in the brief is present without a reason: mono appears only on the card's type line, which is the one place numaskin.id uses it.

Most important change: the owner should supply one packshot per bundle (and per bundle variant). Those images now take up half of the home page and the catalogue, are unreadable at card width, and are the only thing between this page and the reference's visual quality.

Verdict: PASS

The follow-ups that don't block this verdict are recorded in `/home/ongki/.claude/plans/you-review-a-web-glowing-hickey.md`.