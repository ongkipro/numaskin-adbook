# Native Direct-Response Landing Page Standard

> Verified against disk: 2026-10-19 @ `72adba2` (`src/pages/deep-sea-water-treatment-lotion.astro`)

This document is the implementation standard for native Astro direct-response product landing pages in this repository (`page.numaskin.id`). [docs/LANDING-PAGES.md](./LANDING-PAGES.md) remains the canonical owner of CMS/native routing, registry reconciliation, product-page takeover, and canonical-URL mechanics.

Reference implementation on disk:
- Route: [src/pages/deep-sea-water-treatment-lotion.astro](../src/pages/deep-sea-water-treatment-lotion.astro)
- Stylesheet: [src/styles/landing-pages/deep-sea-water-treatment-lotion.css](../src/styles/landing-pages/deep-sea-water-treatment-lotion.css)
- Assets: `public/images/landing/deep-sea-water-treatment-lotion/`

---

## 1. Scope, Single-LP Ownership, and URL Contract

1. **One canonical LP per product:** A native landing page sells one active D1 product, lives at `src/pages/<slug>.astro`, and is registered in [src/data/native-landing-pages.ts](../src/data/native-landing-pages.ts).
2. **Delete duplicate CMS LPs:** When a native landing page claims a product page (`is_product_page = 1`, answering at `/produk/<product-slug>` and redirecting `/<slug>` -> `/produk/<product-slug>`), delete any legacy CMS landing page for that same product from D1 (`landing_pages` and `landing_sections`) so `/admin/landing` and `sitemap.xml` never carry competing pages.
3. **No top header or footer chrome:** Pass `hideHeader={true}` and `hideFooter={true}` to `BaseLayout`, and do not render an internal top navigation bar above the hero. Ad traffic must land directly on the Hero headline and visual hook above the fold.
4. **Canonical checkout & tracking:** Delegate order capture to `<GeoIpResolvedForm mode="hybrid" ... />` and tracking to `BaseLayout` + `MetaLandingTracker`. Never hard-code prices, variant IDs, or Pixel credentials in markup.

---

## 2. Pre-Build Market & Positioning Research (Mandatory)

Before writing copy or generating any image for a landing page, perform external market research and record findings in the research notes:

1. **External sources required:** Google Search, beauty/category forums (Female Daily, Reddit), marketplace buyer reviews (Shopee, Tokopedia), and social media comments/hooks (TikTok, Instagram, YouTube).
2. **Extract verbatim Indonesian buyer psychology:**
   - Immediate physical pain points (e.g., *"wajah terasa kering & ketarik setiap habis cuci muka"*, *"perih dan kemerahan di ruang AC"*).
   - Frustration with existing solutions (e.g., *"sudah pakai krim/serum mahal tapi cuma menumpuk di permukaan kulit kering tanpa meresap"*).
   - Practical usage habits in Indonesia (e.g., 10-second bare-hand tap-tap after washing vs. 3-minute cotton pad compress / CSM).
   - Price-to-size positioning (entry/trial size vs. daily routine size).

---

## 3. Visual-First Direct-Response Rules (Anti AI-Slop)

1. **Structural benchmark + brand skin:** Follow the visual-first mobile conversion flow of top Indonesian direct-response pages (such as `petanisejahtera.com`) while strictly applying `numaskin.id`'s J-Beauty Clinical Marine palette:
   - Deep Marine ink/CTA: `#002B49` (hover `#081B2B`)
   - Deep Teal accent: `#0B6E7D`
   - Aqua/Cyan decorative highlight: `#269BA8` / `#CFF2F6`
   - Ice-Aqua surfaces: `#F4F9FA` and `#EBF5F8`
   - Dark Marine contrast section: `#08333E`
   - Pain/Warning contrast: `#BE123C` on `#FFF8F6` / `#FECDD3`
2. **70% Visual / 30% Text ratio:**
   - Every section must be driven by photography first.
   - Maximum **1 short headline** + **1 single-sentence subtitle** per section.
   - Maximum **3 bullet or step rows** per list, with **1 concise sentence per row** and inline bold/highlight spans (`.dsw-hl-aqua`, `.dsw-hl-tilt`, `.dsw-hl-rose`, `.dsw-underline-teal`, `.dsw-underline-warn`) so mobile readers can scan the entire page in seconds.
3. **Zero AI-Slop:**
   - **No English/technical eyebrow pills** (`"STEP 01"`, `"KEY INGREDIENTS"`, `"CLINICAL PROOF"`, `"WHY IT WORKS"`).
   - **No 3D CGI cubes or synthetic medical diagrams** (such as 3D epidermal cube renders). Use realistic camera photography only (real Indonesian skin texture, macro application shots, studio botanical/lab flat-lays, and authentic bottle packshots).
   - **No AI-rendered banner text inside images:** Never ask an image generator to render marketing headlines or badges inside the image file (prevents garbled AI typography). Render all pills, badges (`Sebelum` / `Sesudah Rutin`), and callout cards in HTML/CSS.

---

## 4. Hero Image Standard ("Brutal Soft Overclaim")

The Hero image (`hero-<slug>.webp`) is the primary conversion lever and LCP element. It must follow the **Brutal Pain vs. Soft Overclaim Transformation** concept derived from market research:

1. **Single-subject split or direct macro contrast:** Show a relatable Indonesian woman (`kuning langsat` skin tone, natural features) in a single centered composition split by a clean water stream or light transition:
   - **Left side (Brutal Pain):** Visibly parched, tight, flaky skin with mild barrier redness, fine dehydration lines, and unabsorbed white cream sitting cakey on the surface.
   - **Right side (Soft Overclaim Transformation):** Ultra-plump, bouncy, translucent J-Beauty glass/mochi skin drenched in fresh micro-droplets with the authentic Numa Skin bottle held beside her glowing cheek.
2. **HTML/CSS framing around the Hero image:**
   - Top floating pill badge (`.dsw-hero-top-pill`) naming the hero ingredient/origin.
   - Bottom overlapping white/rose callout card (`.dsw-hero-overlap`) agitating why existing creams/serums fail without this product.
   - 3-column compact trust bar (`.dsw-trust-row`) immediately below: `BPOM Resmi`, `Halal RI`, and `Bisa COD`.

---

## 5. Canonical 10-Section Direct-Response Architecture

Use the 10-section flow implemented in [src/pages/deep-sea-water-treatment-lotion.astro](../src/pages/deep-sea-water-treatment-lotion.astro):

1. **Section 1 — Hero (`#hero-section .dsw-hero`):** Problem H1 with tilted yellow highlight + 10-second promise subheadline + *Brutal Soft Overclaim* Hero image (`720×480`) + overlapping callout card + 3 trust badges.
2. **Section 2 — Instant Solution (`.dsw-section`):** Benefit H2 + 1-column macro skin absorption photo (`648×432`) + 3 icon-list rows.
3. **Section 3 — Pain Agitation Grid (`.dsw-section--warn`):** Warning H2 + 2-column photo grid (`315×210` each) showing real dehydration symptoms + 3 warning triangle rows.
4. **Section 4 — Visual Before vs. After Routine (`.dsw-section`):** 2 stacked 1-column comparison cards (`648×432`) with `.dsw-photo-badge--before` (`Sebelum`) and `.dsw-photo-badge--after` (`Sesudah Rutin`) overlays.
5. **Section 5 — Dark Marine Practical Usage (`.dsw-section--dark`):** Deep marine background (`#08333e`) + 2 stacked usage photos (`648×432`, daily 10-second tap vs. 3-minute CSM cotton compress) + 3 numbered steps.
6. **Section 6 — Customer Reviews (`.dsw-section`):** 3 scannable customer reviews with verified badge, city + usage context, 5-star rating, and highlighted 2-sentence quote.
7. **Section 7 — Visual Proof Gallery (`.dsw-section--tint`):** 2×2 visual grid (`315×210` each) showing tropical skin finish, watery texture on hand, daily/hijab comfort, and vanity bottle setup.
8. **Section 8 — Product Knowledge Full-Bleed Figures (`.dsw-section--knowledge`):** 3 full-bleed `<figure>` blocks (`720×480` each) with `<figcaption>` covering origin/source, active ingredients flat-lay, and bottle size comparison (`50 ml` vs `150 ml`).
9. **Section 9 — 100% Official Guarantee (`.dsw-section`):** Shield icon + `GARANSI RESMI 100%` + 3 guarantee cards (`100% Produk Asli Tersegel`, `Bisa Bayar di Tempat (COD)`, `Garansi Ganti Baru`).
10. **Section 10 — Embedded Checkout Form + Floating Pill CTA (`#form-pemesanan`):**
    - `<GeoIpResolvedForm mode="hybrid" productSlug={product.slug} embedded={true} selectedVariantId={String(defaultVariant.id)} codDisabledProvinceCodes={codDisabledProvinceCodes} />`
    - Compact floating pill CTA (`#floating-cta .dsw-float-wrap`) toggled via `IntersectionObserver` so it appears only while scrolling between the Hero and Checkout Form.

---

## 6. Google PageSpeed Insights & Core Web Vitals Standard (95–100 Target)

Every native landing page must achieve **95–100 Performance** and **100 Accessibility, 100 Best Practices, 100 SEO** on Google PageSpeed Insights / Lighthouse.

### 6.1 Three-Tier Exact Mobile DPR Image Sizing (0 Wasted Bytes)

All route images live in `public/images/landing/<slug>/` as `.webp` files (`quality 80–82`, `method 6`) in a uniform **`3:2` aspect ratio**, sized to the exact device-pixel dimensions of a `412px` mobile viewport at `1.75x` DPR:

| Tier | Layout Container | CSS Display Size (`412px` viewport) | Required WebP Dimensions (`width` × `height`) | Target File Size |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | Hero & Section 8 Full-Bleed Figures (`.dsw-hero-img`, `.dsw-figure-img`) | `412 × 275 px` | **`720 × 480`** | `11–24 KB` |
| **Tier 2** | Single-Column Photo Cards (`.dsw-photo-stack .dsw-photo-img`) | `370 × 247 px` | **`648 × 432`** | `12–19 KB` |
| **Tier 3** | Two-Column Grid Cards (`.dsw-photo-grid-2 .dsw-photo-img`) | `179 × 119 px` | **`315 × 210`** | `4–8 KB` |

- **Total image budget:** Keep all 15 images combined under **`180 KB`**.
- **Explicit dimensions:** Every `<img>` tag must declare `width` and `height` matching its exact Tier dimensions (`720`/`480`, `648`/`432`, or `315`/`210`) so `unsized-images` and `image-delivery-insight` both score `100` (`CLS = 0`).

### 6.2 Preload & Fetch Priority Discipline

- **Hero image (`HERO_IMAGE`):** Pass `preloadImages={HERO_IMAGE}` to `BaseLayout` and set `fetchpriority="high" loading="eager" decoding="async"` on the hero `<img>`.
- **All below-the-fold images:** Set `loading="lazy" fetchpriority="low" decoding="async"` on every non-hero `<img>`. Chrome's native lazy-load margin on mobile 4G (`2500px`) triggers early; `fetchpriority="low"` prevents below-the-fold images from competing with the Hero image and primary font.

### 6.3 Zero Unused Fonts & Stylesheets

- Do **not** import `src/styles/numaskin.css` inside a landing page that uses `Inter` only; `numaskin.css` declares `@font-face` rules for `DM Serif Display` and `JetBrains Mono` plus storefront grid classes that are unused on direct-response landing pages.
- Place the scoped `[data-hybrid-form-root]` and `[data-middle-form-root]` marine checkout theme overrides directly inside `src/styles/landing-pages/<slug>.css`.

### 6.4 Server TTFB & D1 Query Parallelization

Because Cloudflare D1 round-trips add network latency when executed sequentially, every native landing page frontmatter must:

1. **Skip redundant canonical D1 lookups on rewrites:** Read `Astro.request.headers.get('x-adsbook-product-page')` first; only call `nativeLandingCanonicalPath(Astro.locals, LANDING_SLUG)` when the header is absent.
2. **Parallelize all frontmatter D1 reads with `Promise.all`:**
   ```ts
   const database = getRuntimeEnv(Astro.locals)?.OMS_DB as D1Database | undefined;
   const claimedProductSlug = Astro.request.headers.get('x-adsbook-product-page');
   const [product, canonicalPath, codDisabledProvinceCodes] = await Promise.all([
     getStorefrontProduct(Astro.locals, PRODUCT_SLUG),
     claimedProductSlug
       ? Promise.resolve(`/produk/${claimedProductSlug}`)
       : nativeLandingCanonicalPath(Astro.locals, LANDING_SLUG),
     loadStoreCodDisabledProvinceCodes(database),
     getStoreAdsConfig(Astro.locals),
   ]);
   ```
3. **Pass preloaded `codDisabledProvinceCodes` into `<GeoIpResolvedForm>`** and rely on per-request `WeakMap` memoization on `Astro.locals` ([src/lib/catalog.ts](../src/lib/catalog.ts) and [src/lib/store-ads.ts](../src/lib/store-ads.ts)) so child components (`BaseLayout`, `GtmBase`, `GoogleAdsBase`, `MetaPixelBase`, `FormMiddleContent`, `FormHybridContent`) resolve in `0ms` without additional D1 round-trips.

---

## 7. Pre-Release Verification Checklist

Before committing, pushing, and deploying a landing page:

```bash
npm run route-map
npm run check
npm test
npm run docs:check
```

Then verify on local dev (`390px` / `412px` mobile viewport) and on live production after `npm run deploy`:
- Legacy duplicate CMS LP for the same product is removed (`404`).
- Zero horizontal overflow (`scrollWidth === clientWidth`), zero console errors, and smooth scroll to `#form-pemesanan`.
- Live Lighthouse audit (`npx lighthouse https://page.numaskin.id/produk/<slug>`) achieves **>=95 Mobile Performance, >=98 Desktop Performance, 100 Accessibility, 100 Best Practices, 100 SEO, and 0 CLS**.

