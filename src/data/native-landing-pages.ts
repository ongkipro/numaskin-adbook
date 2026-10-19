/**
 * The register of native Astro landing pages.
 *
 * A native landing page is a real route file — `src/pages/<slug>.astro` — built
 * and deployed with the Worker. Adding an entry here is what makes the CMS
 * aware of it: the admin can see it, copy its link, and hand it a product page.
 * Without an entry the route still answers on its URL, but the operator has no
 * way to know it exists.
 *
 * **This is a manifest, not discovery.** Cloudflare Workers bundles routes and
 * cannot enumerate `src/pages/` at runtime, so the list is written down and
 * compiled in. `validateNativeLandingPages` fails the build on a duplicate or
 * an incomplete entry rather than shipping a register that misrepresents the
 * site.
 *
 * To add one:
 *   1. create `src/pages/<slug>.astro` (see `docs/LANDING-PAGES.md`);
 *   2. add its entry below, with `slug` matching the filename exactly;
 *   3. deploy. The CMS picks it up on the next landing-page list load, or
 *      within the hour from the scheduled re-sync — the sitemap with it.
 *
 * To remove one: delete both. Removing only the file leaves a register entry
 * pointing at a 404; removing only the entry leaves an unlisted live URL.
 */
export type NativeLandingPage = {
  /** Must equal the route filename, and is the public path: `/<slug>`. */
  slug: string;
  /** Shown in the CMS list. */
  title: string;
  /** The product this page sells, by product slug. */
  productSlug: string;
  /** Shown in the CMS list beneath the title. */
  description: string;
  /** Optional list thumbnail (root-relative or https). Without it the lists
   *  show the product's photo. */
  image?: string;
  /** A page can be registered before it is ready to be linked. */
  isActive?: boolean;
};

export const nativeLandingPages: NativeLandingPage[] = [
  {
    slug: 'deep-sea-water-treatment-lotion',
    title: 'Deep Sea Water Treatment Lotion',
    productSlug: 'deep-sea-water-treatment-lotion',
    description:
      '2-in-1 Hydrating Toner & First Essence dengan Ulleung Island Deep Sea Water, Galactomyces, Ceramide, dan Hyaluronic Acid (BPOM NA18220101400).',
    image:
      '/images/landing/deep-sea-water-treatment-lotion/hero-treatment-lotion.webp',
  },
  {
    slug: 'adenosine-deep-sea-water-moisturizer',
    title: 'Adenosine Deep Sea Water Moisturizer',
    productSlug: 'adenosine-deep-sea-water-moisturizer',
    description:
      'Skin Communicator Anti-Aging Gel-Cream dengan Ulleung Island Deep Sea Water, Adenosine, Actiporine 8G, 11X Hyaluronic Acid, dan Alpha-Arbutin (BPOM NA18250109281).',
    image:
      '/images/landing/adenosine-deep-sea-water-moisturizer/hero-adenosine-moisturizer.webp',
  },
  {
    slug: 'pdrn-alpha-arbutin-tone-up-day-cream',
    title: 'PDRN + Alpha-Arbutin Tone-Up Day Cream',
    productSlug: 'pdrn-alpha-arbutin-tone-up-day-cream',
    description:
      'Natural Beige Tone-Up Day Cream dengan 1% Encapsulated PDRN, Alpha-Arbutin, Niacinamide, dan 4X UV Defense tanpa efek abu-abu di kulit sawo matang (BPOM NA18262000246).',
    image:
      '/images/landing/pdrn-alpha-arbutin-tone-up-day-cream/hero-pdrn-day-cream.webp',
  },
  {
    slug: 'nad-booster-anti-aging-serum',
    title: 'NAD+ Booster Anti-Aging Serum',
    productSlug: 'nad-booster-anti-aging-serum',
    description:
      'Cellular Energy Anti-Aging Serum dengan RejuveNAD™ (Swiss Mibelle Biochemistry), 6X Biomimetic Peptide, Niacinamide, dan Cica Complex (BPOM NA18262000245).',
    image:
      '/images/landing/nad-booster-anti-aging-serum/hero-nad-booster-serum.webp',
  },
  {
    slug: 'oxydew-sunscreen-luceane-spf50-pa',
    title: 'Oxydew Anti-Aging Sunscreen SPF 50+ PA++++',
    productSlug: 'oxydew-sunscreen-luceane-spf50-pa',
    description:
      'Breathable Cellular Sunscreen SPF 50+ PA++++ dengan 3% Luceane™ (Sederma France), Galactomyces, Niacinamide, dan 4X UV Filter tanpa whitecast (BPOM NA18251703709).',
    image:
      '/images/landing/oxydew-sunscreen-luceane-spf50-pa/hero-oxydew-sunscreen.webp',
  },
  {
    slug: 'calming-barrier-gloss-gel-moisturizer',
    title: 'Calming Barrier Gloss Gel Moisturizer',
    productSlug: 'calming-barrier-gloss-gel-moisturizer',
    description:
      'Cooling Water-Jelly Barrier Moisturizer dengan Meadowestolide®, Astragalus Extract, Ceramide NP, dan 3X Probiotic Ferment untuk kulit kemerahan & bruntusan (BPOM NA18230107056).',
    image:
      '/images/landing/calming-barrier-gloss-gel-moisturizer/hero-calming-gloss-gel.webp',
  },
  {
    slug: 'deep-sea-water-facial-wash-gel',
    title: 'Deep Sea Water Facial Wash Gel',
    productSlug: 'deep-sea-water-facial-wash-gel',
    description:
      'Pembersih wajah gel non-stripping dengan Ulleung Island Deep Sea Water, 5% Niacinamide, Vitamin E, dan Glycerin untuk pori bersih tanpa rasa ketarik (BPOM NA18261203408).',
    image:
      '/images/landing/deep-sea-water-facial-wash-gel/hero-facial-wash-gel.webp',
  },
  {
    slug: 'paket-adenosine-dan-sunscreen',
    title: 'Paket Adenosine & Sunscreen',
    productSlug: 'paket-adenosine-dan-sunscreen',
    description:
      'Paket bundling #1 terlaris: Adenosine Deep Sea Water Moisturizer 30g + Oxydew Sunscreen 3% Luceane SPF 50+ PA++++ 30ml untuk merawat flek hitam 24 jam (BPOM Resmi).',
    image:
      '/images/landing/paket-adenosine-dan-sunscreen/hero-paket-adenosine-sunscreen.webp',
  },
  {
    slug: 'paket-nad-youth-boost-set',
    title: 'Paket NAD+ Youth Boost Set',
    productSlug: 'paket-nad-youth-boost-set',
    description:
      'Duo intensif anti-kerutan: NAD+ Booster Serum (2% RejuveNAD + 6X Peptide) & Adenosine Moisturizer 30g (11X Hyaluronic Acid) untuk mengencangkan kontur pipi (BPOM Resmi).',
    image:
      '/images/landing/paket-nad-youth-boost-set/hero-paket-nad-youth-boost.webp',
  },
  {
    slug: 'paket-protection-duo-pdrn',
    title: 'Paket Protection Duo PDRN',
    productSlug: 'paket-protection-duo-pdrn',
    description:
      'Duo glowing pagi tanpa dempul: PDRN + Alpha Arbutin Tone-Up Day Cream 30g (1% Encapsulated PDRN) & Oxydew Sunscreen SPF 50+ PA++++ 30ml bebas whitecast (BPOM Resmi).',
    image:
      '/images/landing/paket-protection-duo-pdrn/hero-paket-protection-pdrn.webp',
  },
  {
    slug: 'paket-complete-routine-4-in-1-150ml',
    title: 'Paket Complete Routine 4-in-1 (150ml)',
    productSlug: 'paket-complete-routine-4-in-1-150ml',
    description:
      'Rangkaian lengkap 4-in-1 ukuran penuh: Treatment Lotion 150ml, NAD+ Booster Serum, Adenosine Moisturizer 30g, dan Oxydew Sunscreen SPF 50+ PA++++ 30ml (4 BPOM Resmi).',
    image:
      '/images/landing/paket-complete-routine-4-in-1-150ml/hero-paket-complete-4in1.webp',
  },
  {
    slug: 'paket-anti-aging-trio',
    title: 'Paket Anti-Aging Trio',
    productSlug: 'paket-anti-aging-trio',
    description:
      'Trio anti-aging terlaris 3-in-1: NAD+ Booster Serum 20ml, Adenosine Moisturizer 30g, dan Oxydew Sunscreen SPF 50+ PA++++ 30ml untuk perawatan kerutan & flek 24 jam (3 BPOM Resmi).',
    image:
      '/images/landing/paket-anti-aging-trio/hero-paket-anti-aging-trio.webp',
  },
  {
    slug: 'paket-fresh-and-hydrate',
    title: 'Paket Fresh & Hydrate Duo',
    productSlug: 'paket-fresh-and-hydrate',
    description:
      'Duo fondasi kulit sehat: Deep Sea Water Facial Wash Gel 100ml + Treatment Lotion Toner (50ml / 150ml) untuk pori bersih segar tanpa rasa ketarik (2 BPOM Resmi).',
    image:
      '/images/landing/paket-fresh-and-hydrate/hero-paket-fresh-hydrate.webp',
  },
  {
    slug: 'paket-daily-care-adenosine',
    title: 'Paket Daily Care Adenosine',
    productSlug: 'paket-daily-care-adenosine',
    description:
      'Ritual simpel 2 langkah: Deep Sea Water Facial Wash Gel 100ml (5% Niacinamide) + Adenosine Moisturizer 30g (Skin Communicator + 11X HA) untuk wajah bersih & kenyal (2 BPOM Resmi).',
    image:
      '/images/landing/paket-daily-care-adenosine/hero-paket-daily-care-adenosine.webp',
  },
  {
    slug: 'paket-luminous-duo',
    title: 'Paket Luminous Duo',
    productSlug: 'paket-luminous-duo',
    description:
      'Duet aktif sultan: NAD+ Booster Serum 20ml (2% RejuveNAD + 6X Peptide) + PDRN Tone-Up Day Cream 30g (10.000 PPM Salmon DNA, Warm Beige bebas abu-abu) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-luminous-duo/hero-paket-luminous-duo.webp',
  },
  {
    slug: 'paket-lengkap-6-in-1-routine',
    title: 'Paket Lengkap 6-in-1 Routine',
    productSlug: 'paket-lengkap-6-in-1-routine',
    description:
      'Koleksi VIP terlengkap 6-in-1 Numa Skin: Facial Wash 100ml, Toner (50ml/150ml), NAD+ Serum 20ml, PDRN Day Cream 30g, Adenosine Moisturizer 30g, dan Oxydew Sunscreen 30ml (6 BPOM Resmi).',
    image:
      '/images/landing/paket-lengkap-6-in-1-routine/hero-paket-lengkap-6in1.webp',
  },
];

/**
 * Other top-level route files this install serves that are not landing pages —
 * a legacy slug that 301s to a renamed page, say. A CMS landing page on one of
 * these slugs would save and never be reachable, because the route file
 * answers first, so the CMS refuses them. Every entry in `nativeLandingPages`
 * is refused the same way without being repeated here.
 */
export const installRouteSlugs: string[] = [];
