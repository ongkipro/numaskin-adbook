Reviewer: claude via visual-review.py
Review-Context: separate ai-ask invocation
Model: unavailable: ai-ask does not report the resolved model/provider
Screenshots: design/renders/ux-empty-1440.png, design/renders/ux-empty-390.png, design/renders/ux-home-1440.png, design/renders/ux-home-390.png, design/renders/ux-pdp-1440.png, design/renders/ux-pdp-390.png, design/renders/ux-pdp-single-1440.png, design/renders/ux-pdp-single-390.png, design/renders/ux-produk-1440.png, design/renders/ux-produk-390.png
References: design/refs/current-home/1440.png, design/refs/current-home/390.png, design/refs/current-produk/1440.png, design/refs/current-produk/390.png, design/refs/numaskin-collection/1440.png, design/refs/numaskin-collection/390.png, design/refs/numaskin-home/1440.png, design/refs/numaskin-home/390.png, design/refs/numaskin-pdp/1440.png, design/refs/numaskin-pdp/390.png
Prompt-SHA: 4ae0ce2195b477c4
Context-SHA: 09b0daf3abeb85de
Images-SHA: 44c46594dd1033f6
Output-SHA: 1c422d4765f9dc74

All 61 images opened and read: 8 renders of the work, 11 earlier "current-*" renders (the plain monochrome version), and the numaskin.id reference captures. The reference captures are the home 1440/390 slices `599f…`/`2055…`, the collection slices `346a…`/`2592…`, and the PDP slices `8ad6…`/`a760…`. Nothing was UNVERIFIED. `…-pdp-1440-03.png` is a 13 px empty strip, and the "PAKET HEMAT" heading is cut at a slice seam in `…home-390-03.png`. Those are slice artifacts, not defects.

## Per section

- **Top band + wordmark** | authored | numaskin.id header, marine band plus centred NUMA·SKIN and katakana | The band says "Official Store Numa Skin" with no tick, which is fine. Nothing on the page backs "Official" except the brand's own posters, so either keep the claim only where the posters carry it or soften the wording.
- **Hero (home)** | authored | water-splash poster from the reference, cropped to the column | At 1440 the headline and button sit on pale aqua under the image, and the reference puts them over the water. At 390 the stacking works: image, serif h1, one action. The fix is optional: put the h1 on a soft scrim over the lower third of the image to recover the reference's depth.
- **Search + chips** | authored | the reference has no equivalent, but the filled-marine active state is clear | The chip row is cut at the edge ("Fac…", "Hydrating…") and fades, so it reads as scrollable. There is no change to make here.
- **Ritual (2×2)** | authored | the reference's numbered ritual, adapted | Step labels are teal sentence case, cards are white on aqua, and prices and "HEMAT" pills align across each row. The cards have no type line, while "Lengkapi Rutinitas" below uses the mono type line and no white card. That makes two card treatments within one scroll, so give both grids one card container.
- **Lengkapi Rutinitas + "Semua produk" tile** | authored | the reference grid, with a 2×2 packshot see-all tile | The tile fills the odd cell with real packshots and reads as a link card. It is correct.
- **Paket Hemat preview** | authored, with weak imagery | the reference's bundle cards, with the rupiah saving as the pill | The images are infographic posters and collages with unreadable text at 170 px, so they don't match the clean packshots above. That is owner content, already on the Owner list. A visible defect remains: "Paket Fresh & Hydrate Duo" has a blank band between the contents line and the price (`…home-1440-02`, `…produk-1440-02`). The subgrid is reserving a second contents line that this card doesn't use, so make the reserved row `min-content` where no sibling in the row needs it.
- **Card anatomy** | authored | the reference's teal mono category, uppercase centred name, marine price, grey strike | The type line is 10 px mono with wide tracking in teal on white, which is the weakest-legibility text on the page at 390. Struck prices are about 11 px mid-grey. Raise the type line to 11 px, or drop the letter-spacing, and darken the strike a step.
- **Catalogue `/produk`** | authored | the reference collection grid | The status line "49 produk", ten cards and then "Lihat Produk Lainnya" with "Menampilkan 10 dari 49" is clear. Held-image bundles are pushed down the list, so the first screen shows only clean packshots.
- **Empty state** | authored | none, original | The message and "Hapus pencarian" button are right and say what to do next. At 1440 about 340 px of white sits between the card and the footer. Give the page a min-height of the card plus a few suggestions, or let the footer follow the card.
- **PDP, bundle** | authored | the reference's serif title, large price, pills | Hierarchy is photo, title, price, saving line, size pills, COD line, accordions, form. The poster says "Routine 150ml" while 50 ml is preselected, and the caption "Foto ilustrasi…" is correct but 12 px grey. Nothing needs changing beyond the owner's per-size photos.
- **PDP, single** | authored | the reference PDP minus its buy button, by owner decision | The subtitle "Anti-Aging & Mencerahkan" prints a brightening claim. The same page set hides the "Mencerahkan" chips and holds "cerah" images, so the claim rule is applied inconsistently. Either state the rule as "function claims from the merchant stay", or trim the subtitle to what the label says.
- **Order form + summary** | authored | the product's checkout, skinned | The summary is clean: name, size on its own line, price right, Subtotal row. The disabled submit is pale aqua with grey text, so it is quiet but its disabled state is clear. I can't confirm from stills whether the field labels persist after typing.
- **Beli satuan / Lengkapi rutinitas (PDP)** | authored | the shared card | The 2×2 plus see-all tile works and the page ends cleanly on the aqua base.
- **Footer** | authored | none | Links are plain and trust badges are omitted because no certificate source exists. That is the right call, and the page is thinner than the reference's footer for that reason.

## Template-signal check

- **Dark hero with dot grid or terminal panel:** absent.
- **Gradient or accent word in the headline:** absent.
- **Eyebrows over headings:** none on any section. The reference has them, and they were removed deliberately.
- **Equal-card rows with an icon tile:** absent. The repeated card is a product card, which is what a catalogue needs.
- **Mono and the `A · B` pattern:** mono is confined to the category line, as in the reference. The only `·` use is the "type · size" line inside the card.
- **Arrows on buttons, checkmark bullets, big unsourced stats:** absent.
- **Name-swap test:** the page would not survive a name swap. The wordmark, the water imagery, the ritual and the packshots are numaskin.id's.

## Reference comparison

- **Colour, type and card (390):** matches the reference home and collection in marine, teal mono, serif uppercase headings with a cyan rule, aqua image wells, and a strike price beside a saving pill. These come from numaskin.id's own CSS tokens.
- **Hierarchy and density:** the references are full-width editorial pages with a trust strip, a hero with text over the image, and a gallery PDP. This build compresses them into the 480 px column the owner required. At 1440 about two-thirds of the viewport is empty canvas, which follows from that constraint and not from a design choice.
- **Deliberate gaps from the reference, all documented:**
  - no trust strip and no "Halal/BPOM" badges, for lack of a source;
  - no buy button under the size pills, by owner decision;
  - the 4-in-1 ritual bundle is dropped because its contents conflict between pages.
- **Research:** the Direction file records references, a transfer rationale, tokens and review history, so the direction is supported. What it can't show is how the page behaves at 1440 beyond the column.

Most important change: raise the 10 px tracked mono type line and the grey struck prices to a legible size and contrast on the 390 card, since they carry the choice between a single and a bundle.

Verdict: REVISE