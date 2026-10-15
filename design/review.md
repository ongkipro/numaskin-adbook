Reviewer: claude via visual-review.py
Review-Context: separate ai-ask invocation
Model: unavailable: ai-ask does not report the resolved model/provider
Screenshots: design/renders/ux-home-1440.png, design/renders/ux-home-390.png, design/renders/ux-pdp-1440.png, design/renders/ux-pdp-390.png, design/renders/ux-produk-1440.png, design/renders/ux-produk-390.png
References: design/refs/current-home/1440.png, design/refs/current-home/390.png, design/refs/current-produk/1440.png, design/refs/current-produk/390.png, design/refs/numaskin-collection/1440.png, design/refs/numaskin-collection/390.png, design/refs/numaskin-home/1440.png, design/refs/numaskin-home/390.png, design/refs/numaskin-pdp/1440.png, design/refs/numaskin-pdp/390.png
Prompt-SHA: 4ae0ce2195b477c4
Context-SHA: a070995c38cca86c
Images-SHA: c23532c8d2232b55
Output-SHA: a733c50205243ae5

I opened all 56 slices. No files were edited (plan mode). The review is below in English as technical output. The short version: the layout is fine, but there's one serious content problem: the "hemat" (savings) claim is contradicted by prices on the same page.

**Image key** (from content, since the slices aren't labelled): `ux-*` = the current build. `ff7ddb…`/`e7d9ab…` = current-home before the change. `717125…`/`71cbde…` = current-produk before. `599f0d…`/`2055b6…` = numaskin.id collection. `346ae1…`/`2592db…` = numaskin.id home. `8ad616…`/`a76024…` = numaskin.id PDP.

## Per section

**Home**
- **Top band + wordmark** | authored | numaskin.id header (centred `NUMA·SKIN` + katakana, marine band) | none needed. The verification tick from current-home (`ff7ddb…-01`) is gone, which is correct.
- **Hero** | authored | numaskin.id hero (`346ae1…-01`): same Adenosine packshot in water and a serif headline, moved below the image to fit the 480 column | rename the only action "Lihat Paket Hemat" and drop "paket hemat" from the subline (see the main finding).
- **Search + chips** | authored | numaskin.id filter row, reduced | none needed. At 390 "Face S…" is cut and fades (`48feb5…-01`), so the row clearly scrolls.
- **Rutinitas 4 Langkah** | authored | numaskin.id "THE 4-STEP RITUAL" (`346ae1…-02/03`), without the eyebrow, "DETAIL →" links and ingredient mono lines | none material. The numbers are earned: it is a real sequence.
- **Lengkapi Rutinitas** | authored | numaskin.id grid card (aqua well, teal mono type line, uppercase centred name) | minor: the "SEMUA PRODUK" tile at 1440 (`7d096a…-02`) is a 310 px card holding mostly empty space and a small "LIHAT" pill, a third button size on the page. Make the whole tile the link and drop the pill.
- **Paket Hemat** | authored layout, contradicted copy | numaskin.id bundle cards with the inline HEMAT pill | **the main finding below**. Secondary: the "Fresh & Hydrate" and "Glow Up Routine" posters use the same template and sit in the same column at 390 (`48feb5…-04`). `bundleLine` catches same-name duplicates, not same-template ones. Owner content, but worth one more spread rule or an owner note.
- **Footer** | authored, restrained | numaskin.id footer without BPOM/Halal/"Teruji Dermatologi" claims | none needed.

**PDP**
- **Breadcrumb + image** | authored | numaskin.id PDP gallery, single image | the image says "Routine 150ml" while 50ml is preselected (`f28f7b…-01`). This is already on the Owner list; not a design defect.
- **Title, price, size pills, COD line** | authored | numaskin.id PDP (`8ad616…-01`): serif title, marine price + HEMAT pill, filled marine selected pill | the HEMAT 27% pill has the same contradiction as home (Glow Up Rp227.000 vs its three singles Rp226.998, listed lower on this same page under "Beli Satuan").
- **Tentang / Manfaat / Urutan** | authored, native `<details>` | numaskin.id accordion without the icon tiles | none needed.
- **Form Pemesanan** | authored skin over the product form | — | none material. The disabled submit reads as disabled. The summary row "Toner 50ml" names the chosen size.
- **Beli Satuan** | authored | shared grid card | none needed. The bundle's own three products lead.

**/produk**
- **Title + search + chips + count** | authored | numaskin.id collection header, without the claim copy ("resmi… berkualitas tinggi") and the mono counter | none needed. The left-aligned title is a page title, distinct from the centred section titles.
- **Grid + load-more** | authored | numaskin.id collection card (`599f0d…-01`) | none material. Prices share a baseline in every row, including Gloss Gel's three-line name at 390 (`d16117…-02`).

## Main finding

The design's own copy makes a savings claim that the page's own prices disprove. The hero's single action is "Lihat Paket Hemat", the subline says "dalam paket hemat", the section title is "PAKET HEMAT", and every bundle carries a "HEMAT x%" pill. Yet the singles shown a screen earlier on the same page (ritual and Lengkapi Rutinitas) cost the same or less:

| Bundle | Bundle price | Sum of its singles | Pill shown |
|---|---|---|---|
| Daily Care Adenosine | Rp148.000 | Rp147.998 | HEMAT 30% |
| Fresh & Hydrate Duo | Rp148.000 | Rp147.999 | HEMAT 26% |
| NAD+ Youth Boost | Rp188.000 | Rp187.998 | HEMAT 36% |
| Glow Up Adenosine | Rp227.000 | Rp226.998 | HEMAT 27% |
| Lengkap 6-in-1 | Rp524.500 | Rp494.496 | HEMAT 23% |

So the 6-in-1 costs about Rp30.000 *more* than buying its six products singly. The percentages are only against compare-at. A buyer on this page can do the sum, which hurts trust and task clarity. The Owner list records the pricing but treats it as the owner's call. The headline, CTA and pill wording, though, are template copy this install controls.

## Reference fidelity

The build carries over numaskin.id's palette, serif plus cyan-rule headings, card anatomy, 4-step ritual and HEMAT pill. It removes the reference's template signals: mono eyebrows over every heading (`346ae1…-02/03`), the 4-up icon-tile "Sains" cards, "→" on buttons, and the unsourced BPOM, Halal, "Teruji Klinis" and "14 Hari" claims. Compared with current-home and current-produk (black square badges, Cinzel "N NUMA SKIN", left-ruled heading, "1 VARIAN" lines), every forbidden item on the "Do not substitute" list is gone. Density fits the 480 column: two-up grids, no rails, no clipped rendering at 390 or 1440.

The research and transfer rationale in the direction are sufficient. Swapping the name would not leave the page generic, because the imagery, ritual and palette are the merchant's own.

**Most important change:** Stop the template asserting savings it can't back up. Rename the hero CTA, hero subline and section to "Paket" / "Paket Rutinitas", and show a saving pill only when the bundle is cheaper than the sum of its singles (computable from `bundleContents` + D1 prices, with a test). Leave the D1 category name "Paket Hemat" on the Owner list.

**Verdict: REVISE**