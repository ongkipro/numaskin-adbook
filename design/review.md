Reviewer: claude via visual-review.py
Review-Context: separate ai-ask invocation
Model: unavailable: ai-ask does not report the resolved model/provider
Screenshots: design/renders/ux-empty-1440.png, design/renders/ux-empty-390.png, design/renders/ux-home-1440.png, design/renders/ux-home-390.png, design/renders/ux-pdp-1440.png, design/renders/ux-pdp-390.png, design/renders/ux-pdp-single-1440.png, design/renders/ux-pdp-single-390.png, design/renders/ux-produk-1440.png, design/renders/ux-produk-390.png
References: design/refs/current-home/1440.png, design/refs/current-home/390.png, design/refs/current-produk/1440.png, design/refs/current-produk/390.png, design/refs/numaskin-collection/1440.png, design/refs/numaskin-collection/390.png, design/refs/numaskin-home/1440.png, design/refs/numaskin-home/390.png, design/refs/numaskin-pdp/1440.png, design/refs/numaskin-pdp/390.png
Prompt-SHA: 4ae0ce2195b477c4
Context-SHA: c8a886b563e935b7
Images-SHA: 9e629f67690345d1
Output-SHA: 7a0f703a2748d026

**Inspected:** all 66 images opened and read. They cover the empty state, home, bundle PDP, single PDP and `/produk` at 1440 and 390, plus the reference sets: merchant home `346ae…`/`2592…`, merchant PDP `8ad6…`/`a760…`, merchant collection `599f…`/`2055…`, and the old store `ff7d…`/`e7d9…`/`7171…`/`71cb…`. No image was unreadable.

The 1440 renders show a 480 px column on a flat #E6F0F3 field. That is the owner's compact-model constraint, so I did not count it as a defect.

## Per section

Top band + wordmark | authored | merchant's marine band + centred `NUMA·SKIN` + katakana (ref `2592…-01`) | none. The old unsourced "Official Store" is gone, and "COD tersedia untuk sebagian besar wilayah" matches the PDP line.

Hero (home) | authored | merchant water-splash poster (ref `346ae…-01`) | none. The tube and ripples crop cleanly in the 5:4 frame at 390 and 1440. Headline, subline and a single "Lihat Paket Hemat" sit below the image instead of over it. That is the right transfer for a 480 px column, because the reference's overlay text depends on a wide canvas. There is no outcome claim and no stat row.

Search + chips | authored | merchant's rounded chips; mono kept off | none. The active chip is filled marine. "Face S" / "Hydrating Ton" are cut at the right edge, so the row visibly scrolls. The row is the same on `/produk` and the empty state.

Ritual ("Rutinitas 4 Langkah") | authored | merchant 4-step ritual, minus the water texture | add a faint water texture or tint to the section only if it can be done without dimming the cards. Currently it is flat aqua, so it loses the atmosphere that makes the reference ritual memorable. The numbers are justified because it is a real sequence. The 2×2 white boxes group step label and card, the type line is dropped, and prices and pills align across each row.

Perawatan Tambahan (3 singles + see-all tile) | authored | merchant card (aqua well, mono type line, uppercase name, marine price) | none. The 2×2 packshot collage on the tile reads as a link card, not a missing image. Its serif uppercase "SEMUA PRODUK" is the same face as the section titles, which slightly muddies the heading hierarchy. At 390, "OXYDEW SUNSCREEN LUCEANE SPF 50+ PA++++" runs to three lines, but the subgrid keeps the prices on one baseline.

Paket Hemat (home preview) | authored layout, mixed imagery | merchant bundle cards with "HEMAT" pill, here a rupiah saving | give bundles a single packshot in the same inset well as singles. Today they are a lifestyle photo, three marketing posters and one product-group shot, all edge-to-edge in the square while singles float inset on a gradient. The poster text (for example "Routine 150ml" and "Official Store") is unreadable at about 218 px. The strike prices (Rp147.998, "HEMAT RP14.998") look machine-derived, but the direction records that they are the exact sums of single prices. The bundle type line, name and contents line are clear, and no two adjacent cards share a collage (`spreadSameImages` works; the old store `717…-02` stacked them).

Footer | generic but appropriate | merchant footer, reduced | none. A centred wordmark, tracked uppercase links and a copyright line fit a compact store. No unsourced "resmi" or "terpercaya" claims appear, and the merchant's trust block is deliberately omitted.

`/produk` | authored | merchant collection grid, collapsed to two columns | none. The page has a serif title with cyan rule, then search and chips, then "49 produk", then the grid, then "Menampilkan 10 dari 49" with a load-more button. Held-image bundles sit at the end. The old store's black badges, left-ruled heading and square black button are all gone.

PDP, bundle | authored | merchant PDP (ref `8ad6…`) | none that is new. The order is poster, a "Foto ilustrasi" caption, serif title, one marine price, a saving line, "Pilih ukuran toner" pills, an "Isi:" line, the COD line, details and the form. Two weak points. The caption sits under a poster that says "150ml" while 50 ml is preselected; it is mitigated but is a residual of the poster approach. The COD line is 12 px grey and easy to miss. Reference fidelity differs by owner decision: the merchant has a buy button directly under the sizes and a thumbnail gallery, and this page has neither. The form starts roughly 1.5 screens down at 390, and the page now has no gallery slot for usage or texture photos.

PDP, single | authored | same | none. The packshot sits in the aqua well at 480 px, the title, subtitle, price and "HEMAT 30%" pill are tight, and the BPOM number in the description is a visible source. There is no size picker for a one-size product.

Empty state | authored | none (no reference) | none. It reads as "0 hasil untuk "zzzz"", a clear message, "Hapus pencarian", then "Rutinitas Dasar" with four packshots, which recovers the dead end. The blank 390×43 slice `…-03` is the footer's bottom padding, not a break.

## Template signals
- **Repeated card:** the same card is used for products and, with a different type line, for bundles. That is justified because both are products, and the type line plus pill differentiate them.
- **Mono and `·`:** mono appears only on the card category line, as numaskin.id does. `CLEANSER · 100 ML` and `1. Bersihkan` carry real data.
- **Absent signals:** no dark hero with grid, no accent-word headline, no eyebrow over headings, no icon-tile card rows, no placeholder stats, no `→` on every button.
- **Swap test:** the page would not fit another business. The palette, water imagery, ritual and packshots are numaskin's.

## Hierarchy, rhythm, density vs references
The merchant home runs hero → collection → ritual → science → bundles → campaign, with a lot of claim-heavy content. This page keeps only hero → find → ritual → singles → bundles. That is a deliberate cut: the science, "Teruji klinis", the 14-day campaign and the BPOM / Halal badges (ref `346ae…-03`) are not copied. That is correct for the claim rule and for the compact column. Palette, serif titles with cyan rule, aqua wells and card anatomy match the references. The two losses are the water-texture ritual background and the PDP gallery and inline buy button.

Research and transfer rationale is present in `DESIGN.md`: the reference captures are cited, the tokens are taken from merchant CSS, and the "Do not substitute" list is explicit. No missing-rationale finding.

## Not defects, but owner content still open
- Bundle imagery is posters, infographics and lifestyle shots standing in for packshots. The layout has the right square well, so this is owner content, not a layout failure.
- The gallery and per-size photos are also owner content.

Most important change: replace the bundle posters and infographics with one packshot per bundle in the same inset well singles use, which is owner-supplied content that would fix the visible rhythm break and the illegible poster text.
Verdict: PASS