Reviewer: claude via visual-review.py
Review-Context: separate ai-ask invocation
Model: unavailable: ai-ask does not report the resolved model/provider
Screenshots: design/renders/ux-home-1440.png, design/renders/ux-home-390.png, design/renders/ux-pdp-1440.png, design/renders/ux-pdp-390.png, design/renders/ux-produk-1440.png, design/renders/ux-produk-390.png
References: design/refs/current-home/1440.png, design/refs/current-home/390.png, design/refs/current-produk/1440.png, design/refs/current-produk/390.png, design/refs/numaskin-collection/1440.png, design/refs/numaskin-collection/390.png, design/refs/numaskin-home/1440.png, design/refs/numaskin-home/390.png, design/refs/numaskin-pdp/1440.png, design/refs/numaskin-pdp/390.png
Prompt-SHA: 4ae0ce2195b477c4
Context-SHA: 29c55f49abbe72aa
Images-SHA: 49a48e213a7f2d2e
Output-SHA: 91622c4368694091

Paduka Ongki, saya sudah buka dan baca ke-58 slice. Ringkasnya: arahnya sudah benar dan mirip numaskin.id, tapi masih ada tiga cacat yang terlihat di render. Verdict: **REVISE**.

## Per section

**Home**
- Top band + header | authored | numaskin.id utility bar + centred `NUMA·SKIN` / katakana | The band text is mono, tracked and uppercase; the merchant's bar (346ae…-1440-01) is Inter. Set it in Inter 500. Mono should stay on category labels only.
- Hero | authored | merchant water-splash hero, serif h1, same headline | The subline "skin barrier yang lebih kuat" promises an outcome with no source. That is the same kind of clause that was stripped from all 42 bundles. Make it describe the product ("dengan Ulleung Deep Sea Water") instead.
- Search + chips | authored | merchant filter, compressed | The fade on "Face Serum" shows the row scrolls, which works. No change needed.
- Ritual | authored | merchant "THE 4-STEP RITUAL" | Numbered 2×2 steps are justified by the sequence. The 4-in-1 bar closes the ritual but contains no step 1 (Facial Wash). It is labelled honestly, so it can stay until the owner confirms the contents.
- Produk Satuan | authored | merchant "Koleksi unggulan" card | Seven products leave the sunscreen card alone with an empty cell, at both widths. Acceptable; no fix required.
- Paket Hemat preview | authored layout, owner imagery | **Finding:** the "Paket Sunscreen & Gloss Gel" image prints "Brightening, Hydrating & UV Protection" (390-06, 1440-03). The hold rule only matches the Indonesian "cerah", so this English brightening claim got onto the home page. Add "brightening/whitening" to the rule.
- Landing row | authored | small label + one row | The BPOM number is a real source, which is good. "meredakan kemerahan" is an outcome claim; it goes on the owner list.
- Footer | generic but fitting | No change.

**PDP (Paket Glow Up)**
- Image | owner content | **Finding:** the image says "Routine 150ml" but the preselected pill is "Toner 50ml". The photo contradicts the price shown. Either preselect the variant the image shows, or have the owner supply a separate image per variant.
- Title / price / pills / CTA | authored | merchant PDP (8ad6…-1440-01): serif title, large marine price, HEMAT pill, pills, then the buy button | Matches the reference well. The `PILIHAN UKURAN / VARIAN` label uses the `A / B` pattern; change it to "Ukuran toner".
- Description / accordion / chips | authored | **Finding:** the "Mencerahkan" chip and "kulit glowing" claim brightening on the PDP, while home holds images for exactly that claim. Pick one policy: remove the chip or source it.
- Order form | product code | The variant radios repeat the pills right above them, and the mono 3-up row ("HARGA TERVALIDASI" + icons) is a template signal. This was deferred with a stated reason, but it is still a visible weakness.
- "Beli Satuan" rail | authored | At 390 there is an empty aqua band of about 120 px under the rail (pb-20 clearance for the sticky bar). The sticky bar does not appear in this render, so here it reads as dead space.

**/produk**
- Intro | authored | merchant collection (599f…): eyebrow, serif title, cyan rule | No change.
- Grid | authored card | **Finding:** Paket Daily Care Adenosine and Paket Daily Glow Duo use the same collage and sit directly on top of each other in the right column (1440-02, 390-02/03). The cause is `spreadSameImages` (`src/components/storefront/numaskin/catalog-order.ts:71`), which only compares each card with the one before it. In a 2-column grid the card directly above is two positions back. Its test (`src/lib/numaskin-catalog-order.test.ts:46`) expects `["a","x","b","x","c","x"]`, which puts every x in the same column, so the test encodes the bug.
- Load more | authored | No change.

## Comparison with the references
- **Merchant home and collection** (346ae…, 2592…, 599f…, 2055…): the hierarchy carried over faithfully. Serif uppercase titles with a short cyan rule, mono teal category line, centred uppercase names, marine price with grey strike, the HEMAT pill, numbered ritual steps.
- **Imagery:** packshots in aqua wells match the merchant's cards.
- **Density:** fits the 480 column, which is an accepted constraint.
- **Claims:** the rebuild correctly drops the merchant's unsourced trust claims ("BPOM & Halal Terverifikasi", "Teruji Klinis", "Kerutan & Flek Berkurang Nyata dalam 14 Hari", the dermatology badges).
- **Before state** (ff7d…, e7d9…, 7171…, 71cb…): the black square badges, Cinzel-style monogram, left-ruled heading and verified tick are all gone, as the "Do not substitute" list requires.
- **Research and rationale:** documented, with the transfer rationale written down. Nothing missing.
- **Remaining mismatch with the references:** these are content and logic problems (claim imagery, image/variant mismatch, duplicate collages), not composition.

Most important change: hold the "Brightening" bundle image off the home preview (widen the claim hold rule), and make `spreadSameImages` compare against the card two positions back as well so identical collages never stack in one column.

Verdict: REVISE

This is visual acceptance only; I made no edits and ran no tests or interaction checks. The fix plan is in `/home/ongki/.claude/plans/you-review-a-web-jazzy-spark.md`.