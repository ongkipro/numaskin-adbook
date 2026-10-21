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
    title: 'PDRN Alpha Arbutin Tone-Up Day Cream',
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
    title: 'Oxydew Sunscreen Luceane SPF 50+ PA++++',
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
  {
    slug: 'paket-ultimate-anti-aging-150ml',
    title: 'Paket Ultimate Anti-Aging (150ml)',
    productSlug: 'paket-ultimate-anti-aging-150ml',
    description:
      'Paket bundling 5-in-1 Numa Skin: Treatment Lotion 150ml + NAD+ Serum 20ml + PDRN Day Cream 30gr + Adenosine Moisturizer 30gr + Oxydew Sunscreen SPF 50+ 30ml (5 BPOM Resmi).',
    image:
      '/images/landing/paket-ultimate-anti-aging-150ml/hero-paket-ultimate-150ml.webp',
  },
  {
    slug: 'paket-rejuvenating-trio-150ml',
    title: 'Paket Rejuvenating Trio (150ml)',
    productSlug: 'paket-rejuvenating-trio-150ml',
    description:
      'Trio regenerasi intensif 3-in-1: Deep Sea Water Treatment Lotion 150ml + NAD+ Booster Serum 20ml + Adenosine Moisturizer 30gr untuk merawat elastisitas & garis senyum (3 BPOM Resmi).',
    image:
      '/images/landing/paket-rejuvenating-trio-150ml/hero-paket-rejuvenating-150ml.webp',
  },
  {
    slug: 'paket-age-defense-trio',
    title: 'Paket Age Defense Trio',
    productSlug: 'paket-age-defense-trio',
    description:
      'Trio pelindung & pencerah 24 jam: PDRN Tone-Up Day Cream 30gr (Warm Beige) + Adenosine Moisturizer 30gr + Oxydew Sunscreen SPF 50+ PA++++ 30ml untuk menyamarkan flek hitam (3 BPOM Resmi).',
    image:
      '/images/landing/paket-age-defense-trio/hero-paket-age-defense-trio.webp',
  },
  {
    slug: 'paket-age-repair-trio-150ml',
    title: 'Paket Age Repair Trio (150ml)',
    productSlug: 'paket-age-repair-trio-150ml',
    description:
      'Trio perbaikan tekstur & warna kulit: Deep Sea Water Treatment Lotion 150ml + PDRN Tone-Up Day Cream 30gr + Adenosine Moisturizer 30gr untuk kulit cerah merata bebas dempul (3 BPOM Resmi).',
    image:
      '/images/landing/paket-age-repair-trio-150ml/hero-paket-age-repair-150ml.webp',
  },
  {
    slug: 'paket-glow-up-adenosine',
    title: 'Paket Glow Up Adenosine',
    productSlug: 'paket-glow-up-adenosine',
    description:
      'Rangkaian dasar 3 langkah kulit cerah & kenyal: Facial Wash Gel 100ml + Treatment Lotion Toner (50ml/150ml) + Adenosine Moisturizer 30gr (3 BPOM Resmi).',
    image:
      '/images/landing/paket-glow-up-adenosine/hero-paket-glow-up-adenosine.webp',
  },
  {
    slug: 'paket-glow-up-gloss-gel',
    title: 'Paket Glow Up Gloss Gel',
    productSlug: 'paket-glow-up-gloss-gel',
    description:
      'Rangkaian dasar 3 langkah penenang skin barrier: Facial Wash Gel 100ml + Treatment Lotion Toner (50ml/150ml) + Calming Barrier Gloss Gel Moisturizer 30ml untuk kulit kemerahan & bruntusan (3 BPOM Resmi).',
    image:
      '/images/landing/paket-glow-up-gloss-gel/hero-paket-glow-up-gloss-gel.webp',
  },
  {
    slug: 'paket-triple-protection-3-in-1',
    title: 'Paket Triple Protection 3-in-1',
    productSlug: 'paket-triple-protection-3-in-1',
    description:
      'Rangkaian esensial 3 langkah harian: Deep Sea Water Facial Wash Gel 100ml + Adenosine Moisturizer 30gr + Oxydew Sunscreen SPF 50+ PA++++ 30ml untuk cuci, lembapkan, dan lindungi kulit (3 BPOM Resmi).',
    image:
      '/images/landing/paket-triple-protection-3-in-1/hero-paket-triple-protection.webp',
  },
  {
    slug: 'paket-clean-and-glow',
    title: 'Paket Clean & Glow Duo',
    productSlug: 'paket-clean-and-glow',
    description:
      'Duo pembersih pori & booster pengencang: Deep Sea Water Facial Wash Gel 100ml (5% Niacinamide) + NAD+ Booster Anti-Aging Serum 20ml (2% RejuveNAD + 6X Peptide) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-clean-and-glow/hero-paket-clean-and-glow.webp',
  },
  {
    slug: 'paket-hydra-glow-duo',
    title: 'Paket Hydra Glow Duo',
    productSlug: 'paket-hydra-glow-duo',
    description:
      'Duet krim siang & malam anti-flek: PDRN + Alpha-Arbutin Tone-Up Day Cream 30gr (Warm Beige) + Adenosine Deep Sea Water Moisturizer 30gr (11X Hyaluronic Acid) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-hydra-glow-duo/hero-paket-hydra-glow-duo.webp',
  },
  {
    slug: 'paket-timeless-skin-set',
    title: 'Paket Timeless Skin Set',
    productSlug: 'paket-timeless-skin-set',
    description:
      'Duo anti-aging ramah kulit sensitif: NAD+ Booster Anti-Aging Serum 20ml (2% RejuveNAD + 6X Peptide) + Calming Barrier Gloss Gel Moisturizer 30ml (Meadowestolide + Ceramide NP) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-timeless-skin-set/hero-paket-timeless-skin-set.webp',
  },
  {
    slug: 'paket-adenosine-dan-toner-150ml',
    title: 'Paket Adenosine & Toner (150ml)',
    productSlug: 'paket-adenosine-dan-toner-150ml',
    description:
      'Duet hidrasi ukuran besar & pengunci elastisitas: Deep Sea Water Treatment Lotion 150ml + Adenosine Deep Sea Water Moisturizer 30gr (11X Hyaluronic Acid + Jania Rubens) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-adenosine-dan-toner-150ml/hero-paket-adenosine-toner-150ml.webp',
  },
  {
    slug: 'paket-skin-recharge-duo-150ml',
    title: 'Paket Skin Recharge Duo (150ml)',
    productSlug: 'paket-skin-recharge-duo-150ml',
    description:
      'Duet booster energi sel & hidrasi ukuran besar: Deep Sea Water Treatment Lotion 150ml + NAD+ Booster Anti-Aging Serum 20ml (2% RejuveNAD + 6X Peptide) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-skin-recharge-duo-150ml/hero-paket-skin-recharge-150ml.webp',
  },
  {
    slug: 'paket-youth-glow-duo-150ml',
    title: 'Paket Youth Glow Duo (150ml)',
    productSlug: 'paket-youth-glow-duo-150ml',
    description:
      'Duet persiapan hidrasi ukuran besar & pencerah pagi: Deep Sea Water Treatment Lotion 150ml + PDRN + Alpha-Arbutin Tone-Up Day Cream 30gr (Warm Beige) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-youth-glow-duo-150ml/hero-paket-youth-glow-150ml.webp',
  },
  {
    slug: 'paket-skin-protection-duo',
    title: 'Paket Skin Protection Duo',
    productSlug: 'paket-skin-protection-duo',
    description:
      'Duet serum pengencang & perisai sinar UV anti-aging: NAD+ Booster Anti-Aging Serum 20ml + Oxydew Sunscreen Luceane SPF 50+ PA++++ 30ml (Zero Whitecast) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-skin-protection-duo/hero-paket-skin-protection-duo.webp',
  },
  {
    slug: 'paket-sunscreen-dan-gloss-gel',
    title: 'Paket Sunscreen & Gloss Gel',
    productSlug: 'paket-sunscreen-dan-gloss-gel',
    description:
      'Duet penenang barrier & proteksi UV ringan bebas lengket: Calming Barrier Gloss Gel Moisturizer 30ml + Oxydew Sunscreen Luceane SPF 50+ PA++++ 30ml (2 BPOM Resmi).',
    image:
      '/images/landing/paket-sunscreen-dan-gloss-gel/hero-paket-sunscreen-gloss-gel.webp',
  },
  {
    slug: 'paket-daily-care-gloss-gel',
    title: 'Paket Daily Care Gloss Gel',
    productSlug: 'paket-daily-care-gloss-gel',
    description:
      'Rangkaian 2 tahap dasar penenang kemerahan & bruntusan: Deep Sea Water Facial Wash Gel 100ml + Calming Barrier Gloss Gel Moisturizer 30ml (2 BPOM Resmi).',
    image:
      '/images/landing/paket-daily-care-gloss-gel/hero-paket-daily-care-gloss-gel.webp',
  },
  {
    slug: 'paket-daily-protection',
    title: 'Paket Daily Protection Duo',
    productSlug: 'paket-daily-protection',
    description:
      'Rangkaian 2 tahap pembersih lembut & proteksi UV harian: Deep Sea Water Facial Wash Gel 100ml + Oxydew Sunscreen Luceane SPF 50+ PA++++ 30ml (2 BPOM Resmi).',
    image:
      '/images/landing/paket-daily-protection/hero-paket-daily-protection.webp',
  },
  {
    slug: 'paket-daily-glow',
    title: 'Paket Daily Glow Duo',
    productSlug: 'paket-daily-glow',
    description:
      'Rangkaian 2 langkah pagi cerah alami tanpa dempul: Deep Sea Water Facial Wash Gel 100ml + PDRN + Alpha-Arbutin Tone-Up Day Cream 30gr (Warm Beige) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-daily-glow/hero-paket-daily-glow.webp',
  },
  {
    slug: 'paket-moist-glow-duo',
    title: 'Paket Moist Glow Duo',
    productSlug: 'paket-moist-glow-duo',
    description:
      'Pasangan krim pencerah pagi & water-jelly penenang malam: PDRN + Alpha-Arbutin Tone-Up Day Cream 30gr + Calming Barrier Gloss Gel Moisturizer 30ml (2 BPOM Resmi).',
    image:
      '/images/landing/paket-moist-glow-duo/hero-paket-moist-glow-duo.webp',
  },
  {
    slug: 'paket-sunscreen-adenosine-toner-150ml',
    title: 'Paket Sunscreen, Adenosine & Toner (150ml)',
    productSlug: 'paket-sunscreen-adenosine-toner-150ml',
    description:
      'Trio anti-aging & proteksi sinar UV ukuran besar: Deep Sea Water Treatment Lotion 150ml + Adenosine Moisturizer 30gr + Oxydew Sunscreen SPF 50+ PA++++ 30ml (3 BPOM Resmi).',
    image:
      '/images/landing/paket-sunscreen-adenosine-toner-150ml/hero-paket-sunscreen-adenosine-toner-150ml.webp',
  },
  {
    slug: 'paket-exclusive-lotion-gloss-gel',
    title: 'Paket Exclusive Lotion & Gloss Gel',
    productSlug: 'paket-exclusive-lotion-gloss-gel',
    description:
      'Paket eksklusif Numa Skin dalam Gift Box & Pouch: Deep Sea Water Treatment Lotion 150ml + Travel Size 50ml + Calming Barrier Gloss Gel 30ml (2 BPOM Resmi).',
    image:
      '/images/landing/paket-exclusive-lotion-gloss-gel/hero-paket-exclusive-lotion-gloss-gel.webp',
  },
  {
    slug: 'paket-ultimate-anti-aging-50ml',
    title: 'Paket Ultimate Anti-Aging (50ml)',
    productSlug: 'paket-ultimate-anti-aging-50ml',
    description:
      'Rangkaian 5-in-1 anti-aging lengkap ukuran praktis: Treatment Lotion 50ml + NAD+ Serum 20ml + PDRN Day Cream 30gr + Adenosine Moisturizer 30gr + Oxydew Sunscreen 30ml (5 BPOM Resmi).',
    image:
      '/images/landing/paket-ultimate-anti-aging-50ml/hero-paket-ultimate-50ml.webp',
  },
  {
    slug: 'paket-skin-recharge-duo-50ml',
    title: 'Paket Skin Recharge Duo (50ml)',
    productSlug: 'paket-skin-recharge-duo-50ml',
    description:
      'Duet pembuka hidrasi & booster energi seluler praktis: Deep Sea Water Treatment Lotion 50ml + NAD+ Booster Anti-Aging Serum 20ml (2% RejuveNAD + 6X Peptide) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-skin-recharge-duo-50ml/hero-paket-skin-recharge-50ml.webp',
  },
  {
    slug: 'paket-duo-toner-150ml-50ml',
    title: 'Paket Duo Toner (150ml+50ml)',
    productSlug: 'paket-duo-toner-150ml-50ml',
    description:
      'Paket 2 ukuran Deep Sea Water Treatment Lotion (Total 200ml): Botol Full-Size 150ml untuk di rumah + Botol Travel Pump 50ml untuk dibawa bepergian (BPOM NA18220101400).',
    image:
      '/images/landing/paket-duo-toner-150ml-50ml/hero-paket-duo-toner-150ml-50ml.webp',
  },
  {
    slug: 'paket-complete-routine-4-in-1-50ml',
    title: 'Paket Complete Routine 4-in-1 (50ml)',
    productSlug: 'paket-complete-routine-4-in-1-50ml',
    description:
      'Rangkaian 4 langkah anti-aging & proteksi UV praktis: Treatment Lotion 50ml + NAD+ Booster Serum 20ml + Adenosine Moisturizer 30gr + Oxydew Sunscreen SPF 50+ 30ml (4 BPOM Resmi).',
    image:
      '/images/landing/paket-complete-routine-4-in-1-50ml/hero-paket-complete-4in1-50ml.webp',
  },
  {
    slug: 'paket-sunscreen-dan-toner-50ml',
    title: 'Paket Sunscreen & Toner (50ml)',
    productSlug: 'paket-sunscreen-dan-toner-50ml',
    description:
      'Duet hidrasi pagi & perisai UV praktis bebas whitecast: Deep Sea Water Treatment Lotion 50ml + Oxydew Sunscreen Luceane SPF 50+ PA++++ 30ml (2 BPOM Resmi).',
    image:
      '/images/landing/paket-sunscreen-dan-toner-50ml/hero-paket-sunscreen-toner-50ml.webp',
  },
  {
    slug: 'paket-twin-pack-toner-2x150ml',
    title: 'Paket Twin Pack Toner (2x150ml)',
    productSlug: 'paket-twin-pack-toner-2x150ml',
    description:
      'Stok super hemat 2 botol besar (2 x 150ml = 300ml) Deep Sea Water Treatment Lotion dengan 76% Ulleungdo Deep Sea Water, Galactomyces, dan 5X Ceramide (BPOM NA18220101400).',
    image:
      '/images/landing/paket-twin-pack-toner-2x150ml/hero-paket-twin-pack-toner-2x150ml.webp',
  },
  {
    slug: 'paket-toner-150ml-dan-gloss-gel',
    title: 'Paket Toner 150ml & Gloss Gel',
    productSlug: 'paket-toner-150ml-dan-gloss-gel',
    description:
      'Duet penenang skin barrier ukuran besar: Deep Sea Water Treatment Lotion 150ml + Calming Barrier Gloss Gel Moisturizer 30ml (Meadowestolide + Astragalus) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-toner-150ml-dan-gloss-gel/hero-paket-toner-150ml-gloss-gel.webp',
  },
  {
    slug: 'paket-rejuvenating-trio-50ml',
    title: 'Paket Rejuvenating Trio (50ml)',
    productSlug: 'paket-rejuvenating-trio-50ml',
    description:
      'Trio regenerasi malam ukuran praktis: Deep Sea Water Treatment Lotion 50ml + NAD+ Booster Serum 20ml + Adenosine Deep Sea Water Moisturizer 30gr (3 BPOM Resmi).',
    image:
      '/images/landing/paket-rejuvenating-trio-50ml/hero-paket-rejuvenating-50ml.webp',
  },
  {
    slug: 'paket-sunscreen-dan-toner-150ml',
    title: 'Paket Sunscreen & Toner (150ml)',
    productSlug: 'paket-sunscreen-dan-toner-150ml',
    description:
      'Duet hidrasi ukuran besar & perisai UV harian bebas whitecast: Deep Sea Water Treatment Lotion 150ml + Oxydew Sunscreen Luceane SPF 50+ PA++++ 30ml (2 BPOM Resmi).',
    image:
      '/images/landing/paket-sunscreen-dan-toner-150ml/hero-paket-sunscreen-toner-150ml.webp',
  },
  {
    slug: 'paket-toner-50ml-dan-gloss-gel',
    title: 'Paket Toner 50ml & Gloss Gel',
    productSlug: 'paket-toner-50ml-dan-gloss-gel',
    description:
      'Starter set penenang kulit rewel & kemerahan: Deep Sea Water Treatment Lotion 50ml + Calming Barrier Gloss Gel Moisturizer 30ml (2 BPOM Resmi).',
    image:
      '/images/landing/paket-toner-50ml-dan-gloss-gel/hero-paket-toner-50ml-gloss-gel.webp',
  },
  {
    slug: 'paket-youth-glow-duo-50ml',
    title: 'Paket Youth Glow Duo (50ml)',
    productSlug: 'paket-youth-glow-duo-50ml',
    description:
      'Duet persiapan hidrasi praktis & pencerah pagi bebas dempul: Deep Sea Water Treatment Lotion 50ml + PDRN + Alpha-Arbutin Tone-Up Day Cream 30gr (Warm Beige) (2 BPOM Resmi).',
    image:
      '/images/landing/paket-youth-glow-duo-50ml/hero-paket-youth-glow-50ml.webp',
  },
  {
    slug: 'paket-sunscreen-adenosine-toner-50ml',
    title: 'Paket Sunscreen, Adenosine & Toner (50ml)',
    productSlug: 'paket-sunscreen-adenosine-toner-50ml',
    description:
      'Trio anti-aging & proteksi sinar UV praktis: Deep Sea Water Treatment Lotion 50ml + Adenosine Moisturizer 30gr + Oxydew Sunscreen SPF 50+ PA++++ 30ml (3 BPOM Resmi).',
    image:
      '/images/landing/paket-sunscreen-adenosine-toner-50ml/hero-paket-sunscreen-adenosine-toner-50ml.webp',
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
