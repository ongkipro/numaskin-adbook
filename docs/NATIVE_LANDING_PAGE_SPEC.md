# Native Direct-Response Landing Page Standard

> Verified against disk: 2026-10-19 @ `97f527f` (`src/pages/deep-sea-water-treatment-lotion.astro`)

This document is the implementation standard for native Astro direct-response product landing pages in this repository (`page.numaskin.id`). [docs/LANDING-PAGES.md](./LANDING-PAGES.md) remains the canonical owner of CMS/native routing, registry reconciliation, product-page takeover, and canonical-URL mechanics.

Reference implementation on disk:
- Route: [src/pages/deep-sea-water-treatment-lotion.astro](../src/pages/deep-sea-water-treatment-lotion.astro)
- Stylesheet: [src/styles/landing-pages/deep-sea-water-treatment-lotion.css](../src/styles/landing-pages/deep-sea-water-treatment-lotion.css)
- Assets: `public/images/landing/deep-sea-water-treatment-lotion/`
- Brand, Market & Buyer Persona Research: [docs/NUMASKIN-MARKET-PERSONA-RESEARCH.md](./NUMASKIN-MARKET-PERSONA-RESEARCH.md)

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

## 4. "Brutal Soft Overclaim" Visual & Copywriting Standard

Every native direct-response landing page must apply the **Brutal Pain vs. Soft Overclaim Transformation** framework across **both the Hero and the supporting body sections** (grounded in market & buyer persona research while staying within BPOM cosmetic claim boundaries — zero medical/drug cure claims):

### 4.1 Hero Image Standard (`hero-<slug>.webp`)
The Hero image is the primary conversion lever and LCP element:
1. **Single-subject split or direct macro contrast:** Show a relatable Indonesian woman (`kuning langsat` skin tone, natural features) in a single centered composition split by a clean water stream or light transition:
   - **Left side (Brutal Pain):** Visibly parched, tight, flaky skin with barrier redness, fine dehydration lines, and unabsorbed white cream sitting cakey on the surface.
   - **Right side (Soft Overclaim Transformation):** Ultra-plump, bouncy, translucent J-Beauty glass/mochi skin drenched in fresh micro-droplets with the authentic Numa Skin bottle held beside her glowing cheek.
2. **HTML/CSS framing around the Hero image:**
   - Top floating pill badge (`.dsw-hero-top-pill`) naming the hero ingredient/origin.
   - Bottom overlapping white/rose callout card (`.dsw-hero-overlap`) agitating why existing expensive creams/serums fail (`90% krim mahal gagal meresap`) without this hydration opener.
   - 3-column compact trust bar (`.dsw-trust-row`) immediately below: `BPOM Resmi`, `Halal RI`, and `Bisa COD`.

### 4.2 Supporting Pain & Transformation Macro Photography (Sections 3 & 4)
Supporting images must never use polite/distant stock-style portraits where skin texture is invisible on a `390px` mobile screen:
1. **Section 3 Pain Grid (`315×210` each):** Use extreme dermatological macro close-ups of real skin pain — e.g., post-wash peeling white dead-skin flakes with stinging red barrier irritation (`masalah-kulit-kering.webp`), and cakey/cracked foundation or cream pilling inside deep dehydration lines (`masalah-kulit-kusam.webp`).
2. **Section 4 Before vs. After Stack (`648×432` each):**
   - **Before (`Tanpa Treatment Lotion`):** High-contrast macro shot of rough, scaly, reddened skin with thick white moisturizer sitting unabsorbed on top of dry flakes (`kondisi-kulit-dehidrasi-kasar.webp`).
   - **After (`Sesudah Rutin Pakai`):** High-contrast J-Beauty macro shot of the same warm Indonesian skin tone transformed into ultra-plump, poreless, translucent *glass-mochi skin* with delicate micro-mineral droplets (`kondisi-kulit-lembap-seimbang.webp`).

### 4.3 Direct-Response Copywriting Rules ("Brutal Soft Overclaim")
1. **Agitate the wasted-money pain:** Open by calling out why the buyer's current expensive routine is failing (*"Percuma Beli Skincare Mahal Kalau Kulit Masih Kering & Ketarik!"* / *"90% krim mahal gagal meresap dan hanya menggumpal di permukaan pori"*).
2. **Concrete sensory & time-bound hooks:** Use specific, tactile Indonesian phrasing (*"Tepuk 10 detik — langsung kenyal, halus, & lembap!"*, *"serum & krim langsung meresap masuk ke pori"*, *"kompres kapas 3 menit agar langsung adem"*).
3. **BPOM-compliant cosmetic framing:** Frame all dramatic claims around hydration, skin barrier comfort, smooth/supple appearance, and skincare absorption — never claim to cure medical skin diseases (eczema, psoriasis, cystic acne infection).

### 4.4 Indonesian Local-Market Language Discipline (No Malay Phrasing, No Confusing Jargon)
All landing page copy must read like natural, everyday Indonesian ecommerce/skincare speech tailored to Indonesian buyers:
1. **Use familiar Indonesian market phrasing:** Use words Indonesian buyers actually say in reviews and comments (*kering & ketarik*, *mengelupas*, *krim numpuk*, *bedak retak*, *langsung adem*, *tidak lengket*, *tidak gerah*, *cepat meresap*, *halus dan mulus*).
2. **Strictly NO Bahasa Melayu (Malaysia) or stiff machine-translated vocabulary:** Never use Malay terms or awkward literal translations such as *kesan / berkesan*, *sapukan*, *pencuci muka*, *pelembap yang sesuai*, *air suling*, *bersisik*, *menganga*, or *sensasi*.
3. **Strictly NO confusing technical jargon, niche beauty acronyms, or narrow regional slang:**
   - Avoid unexplained acronyms or foreign beauty buzzwords that confuse mass-market Indonesian buyers (e.g., use *"Kompres Kapas (3 Menit)"* instead of *"CSM"*, use *"kenyal, halus, & lembap"* instead of *"plumping"* or *"glass-mochi skin"*, use *"partikel mineral alami lebih kecil dari air biasa"* instead of *"molekul ion mineral mikro / TEWL / epidermis"*).
   - Avoid narrow regional slang (e.g., use *"tidak gerah"* instead of Javanese-only *"bebas sumuk"*).

---

## 5. Canonical 10-Section Direct-Response Architecture

Use the 10-section flow implemented in [src/pages/deep-sea-water-treatment-lotion.astro](../src/pages/deep-sea-water-treatment-lotion.astro):

1. **Section 1 — Hero (`#hero-section .dsw-hero`):** Brutal wasted-skincare H1 with tilted yellow highlight + 10-second supple/hydrated promise subheadline + *Brutal Soft Overclaim* Hero image (`720×480`) + overlapping callout card + 3 trust badges.
2. **Section 2 — Instant Absorption Mechanism (`.dsw-section`):** *"Sekali tepuk 10 detik, serum & krim langsung meresap masuk ke pori"* H2 + 1-column macro skin absorption photo (`648×432`) + 3 icon-list rows.
3. **Section 3 — Brutal Pain Agitation Grid (`.dsw-section--warn`):** *"Awas! Ini tanda skin barrier rusak & menolak semua skincare Anda"* H2 + 2-column macro pain grid (`315×210` each: peeling flakes & cakey cracked cream) + 3 warning triangle rows.
4. **Section 4 — Visual Before vs. After Transformation (`.dsw-section`):** 2 stacked 1-column macro comparison cards (`648×432`) with `.dsw-photo-badge--before` (`Tanpa Treatment Lotion`) and `.dsw-photo-badge--after` (`Sesudah Rutin Pakai`) overlays.
5. **Section 5 — Dark Marine Practical Usage (`.dsw-section--dark`):** Deep marine background (`#08333e`) + 2 stacked usage photos (`648×432`, daily 10-second tap vs. 3-minute cotton pad compress) + 3 numbered steps.
6. **Section 6 — Customer Reviews (`.dsw-section`):** 3 scannable customer reviews with verified badge, city + skin/repeat-order context, 5-star rating, and highlighted 2-sentence transformation quote.
7. **Section 7 — Tropical Proof Gallery (`.dsw-section--tint`):** 2×2 visual grid (`315×210` each) showing tropical skin finish, watery texture on hand, daily/hijab comfort, and vanity bottle setup.
8. **Section 8 — Product Knowledge Full-Bleed Figures (`.dsw-section--knowledge`):** 3 full-bleed `<figure>` blocks (`720×480` each) with `<figcaption>` covering 200m Ulleung deep-sea micro-minerals, 6 active ingredients flat-lay, and bottle size comparison (`50 ml` trial vs `150 ml` value size).
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
| **Tier 1** | Hero & Section 8 Full-Bleed Figures (`.dsw-hero-img`, `.dsw-figure-img`) | `412 × 275 px` | **`720 × 480`** | `11–25 KB` |
| **Tier 2** | Single-Column Photo Cards (`.dsw-photo-stack .dsw-photo-img`) | `370 × 247 px` | **`648 × 432`** | `12–43 KB` |
| **Tier 3** | Two-Column Grid Cards (`.dsw-photo-grid-2 .dsw-photo-img`) | `179 × 119 px` | **`315 × 210`** | `4–14 KB` |

- **Total image budget:** Keep all 15 images combined under **`240 KB`**.
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

