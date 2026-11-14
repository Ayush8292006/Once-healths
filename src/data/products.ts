import { ASIN, amazonProductUrl, amazonCartUrl } from './amazon';

/**
 * PRODUCT DATA — taken word-for-word from the final packaging label (final_1.2.pdf).
 * If the label changes, update this file only; every page reads from here.
 */

export interface SupplementFactRow {
  nutrient: string;
  amount: string;
  dailyValue: string;
}

export interface ProprietaryBlend {
  name: string;
  ingredients: string;
  amount: string;
}

export interface IngredientSpotlight {
  name: string;
  source: string;
  benefit: string;
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  gender: 'women' | 'men';
  tagline: string;
  eyebrow: string;
  description: string;
  accent: string;
  accentHex: string;
  image: string;
  gallery: string[];
  amazonUrl: string; // product page on Amazon (set ASIN in data/amazon.ts)
  amazonCartUrl: string; // adds the product to the Amazon cart → checkout
  price?: string; // optional, hidden if empty
  capsules: number;
  supplyDays: number;
  /** TODO client: real Amazon rating + review count. Stars are hidden while reviewCount is 0. */
  rating: number;
  reviewCount: number;
  /** The three bullets printed on the front of the bottle */
  benefits: string[];
  detailedBenefits: {
    title: string;
    description: string;
  }[];
  ingredientSpotlights: IngredientSpotlight[];
  servingSize: string;
  servingsPerContainer: number;
  supplementFacts: SupplementFactRow[];
  proprietaryBlends: ProprietaryBlend[];
  otherIngredients: string;
  howToTake: {
    servingSize: string;
    timing: string;
    instructions: string;
    storage: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  /** Round benefit badge shown on the main product image (first item is used) */
  badges: string[];
  /** "Main Benefits / Is Good For / How to Take / …" accordion under the buy buttons */
  infoSections: {
    title: string;
    items?: string[]; // rendered as bullets ("Title — text" bolds the title part)
    paragraphs?: string[]; // rendered as plain paragraphs
  }[];
}

/** Claims printed on the label — the ONLY quality / free-from claims used on the site */
export const LABEL_CLAIMS = {
  freeFrom: ['Gluten', 'Dairy'],
  quality: ['Third party Tested', 'cGMP-Certified Facility'],
  madeIn: 'Proudly manufactured in India using globally sourced ingredients.',
} as const;

export const LABEL_CAUTION =
  'Do not exceed the recommended dose. Consult a healthcare professional before use if you are under 18, pregnant or breastfeeding, taking medication, or have a medical condition. Discontinue use and consult a healthcare professional if any adverse reaction occurs. Dietary supplements should not be used as a substitute for a varied, balanced diet and healthy lifestyle.';

export const LABEL_STORAGE =
  'Keep out of reach of children. Do not use if safety seal is damaged or missing. Store in a cool, dry place.';

export const LABEL_SUGGESTED_USE =
  'Adults: Take two (2) capsules daily with a meal, or as recommended by a healthcare professional. If you are sensitive, start with one (1) capsule daily with food.';

export const DISTRIBUTOR = {
  name: 'Once Health LLC',
  address: ['30 N Gould St Ste R', 'Sheridan, WY 82801'],
  email: 'support@oncehealth.co',
} as const;

// Shared blend (identical on both labels)
const ANTIOXIDANT_BLEND: ProprietaryBlend = {
  name: 'Antioxidant Fruit and Energy Proprietary Blend',
  ingredients:
    'Green Tea Extract (Camellia sinensis, Leaf), Hawthorn (Crataegus oxyacantha, Fruit), Cinnamon (Cinnamomum spp., Bark), Bilberry 4:1 Extract (Vaccinium myrtillus, Fruit), Grape Seed Extract (Vitis vinifera, Seed), Black Currant (Ribes nigrum, Fruit), Pomegranate 4:1 Extract (Punica granatum, Fruit)',
  amount: '187 mg',
};

const howToTake = {
  servingSize: '2 capsules daily',
  timing: 'With a meal',
  instructions: LABEL_SUGGESTED_USE,
  storage: LABEL_STORAGE,
};

type BaseProduct = Omit<Product, 'badges' | 'infoSections'>;

const baseProducts: BaseProduct[] = [
  {
    slug: 'womens-multi',
    name: "Women's Multi",
    gender: 'women',
    eyebrow: "WOMEN'S MULTI",
    tagline: 'Advanced Bioactive Formula',
    description:
      "A daily multivitamin for women with 20 vitamins and minerals, methylated B12 and folate, magnesium glycinate, and a female support blend with wild yam, red clover and cranberry. Two capsules a day with a meal.",
    accent: 'var(--women)',
    accentHex: '#9C3D73',
    image: '/images/womens-multi.webp',
    gallery: [
      '/images/womens-multi.webp',
      '/images/lifestyle-women.webp',
      '/images/ritual-capsules.webp',
      '/images/card-b12-folate.webp',
      '/images/card-magnesium.webp',
    ],
    amazonUrl: amazonProductUrl(ASIN.womensMulti),
    amazonCartUrl: amazonCartUrl(ASIN.womensMulti),
    price: '', // optional, hidden if empty
    capsules: 60,
    supplyDays: 30,
    rating: 0, // TODO client
    reviewCount: 0, // TODO client
    benefits: [
      'Supports Energy, Vitality & Daily Balance*',
      'Methylated B12 & Folate',
      'With Magnesium Glycinate',
    ],
    detailedBenefits: [
      {
        title: 'Energy, Vitality & Daily Balance*',
        description:
          'A full B-complex (B1, B2, niacin, B6, B12, biotin and pantothenic acid) that supports normal energy metabolism, alongside vitamins A, C, D and E.*',
      },
      {
        title: 'Methylated B12 & Folate',
        description:
          'Vitamin B12 as methylcobalamin and folate as calcium 5-MTHF — the active forms, so your body does not need to convert them first.*',
      },
      {
        title: 'With Magnesium Glycinate',
        description:
          'Magnesium in the gentle glycinate form, plus zinc, selenium, copper, manganese, chromium, molybdenum and calcium.*',
      },
      {
        title: 'Female Support Blend',
        description:
          'Wild yam, red clover, cranberry, lutein, alpha lipoic acid and lycopene — together with an antioxidant fruit blend and an immune blend of echinacea, spirulina and garlic.*',
      },
    ],
    ingredientSpotlights: [
      {
        name: 'Folate (Calcium 5-MTHF)',
        source: 'Methylated Folate',
        benefit: '667 mcg DFE of folate in its active, methylated form.*',
        image: '/images/card-b12-folate.webp',
      },
      {
        name: 'Vitamin B12 (Methylcobalamin)',
        source: 'Methylated B12',
        benefit: '27 mcg of B12 as methylcobalamin, to support normal energy metabolism.*',
        image: '/images/card-energy.webp',
      },
      {
        name: 'Magnesium Glycinate',
        source: 'Gentle Mineral Form',
        benefit: '50 mg of magnesium as magnesium glycinate, a form known for being gentle.*',
        image: '/images/card-magnesium.webp',
      },
      {
        name: 'Female Support Blend',
        source: '192 mg Botanical Blend',
        benefit: 'Wild yam, red clover, lutein, cranberry, alpha lipoic acid and lycopene.*',
        image: '/images/card-clean.webp',
      },
    ],
    servingSize: '2 Capsules',
    servingsPerContainer: 30,
    supplementFacts: [
      { nutrient: 'Vitamin A (as Beta-Carotene)', amount: '1200 mcg', dailyValue: '133%' },
      { nutrient: 'Vitamin C (Ascorbic Acid)', amount: '150 mg', dailyValue: '167%' },
      { nutrient: 'Vitamin D (as Cholecalciferol)', amount: '10 mcg', dailyValue: '50%' },
      { nutrient: 'Vitamin E (as d-alpha-tocopherol succinate)', amount: '30 mg', dailyValue: '200%' },
      { nutrient: 'Vitamin B1 (as Thiamine Mononitrate)', amount: '7 mg', dailyValue: '583%' },
      { nutrient: 'Vitamin B2 (Riboflavin)', amount: '7.5 mg', dailyValue: '577%' },
      { nutrient: 'Niacin (as Niacin Hexanicotinate)', amount: '30 mg', dailyValue: '188%' },
      { nutrient: 'Vitamin B6 (as Pyridoxal 5-Phosphate)', amount: '7.5 mg', dailyValue: '441%' },
      { nutrient: 'Folate (as Calcium 5-MTHF)', amount: '667 mcg DFE', dailyValue: '167%' },
      { nutrient: 'Vitamin B12 (as Methylcobalamin)', amount: '27 mcg', dailyValue: '1125%' },
      { nutrient: 'Biotin', amount: '300 mcg', dailyValue: '1000%' },
      { nutrient: 'Pantothenic Acid (as d-Calcium Pantothenate)', amount: '10 mg', dailyValue: '200%' },
      { nutrient: 'Calcium (as Calcium Carbonate)', amount: '50 mg', dailyValue: '4%' },
      { nutrient: 'Magnesium (as Magnesium Glycinate)', amount: '50 mg', dailyValue: '12%' },
      { nutrient: 'Zinc (as Zinc Oxide)', amount: '15 mg', dailyValue: '136%' },
      { nutrient: 'Selenium (as Selenium Amino Acid Chelate)', amount: '30 mcg', dailyValue: '55%' },
      { nutrient: 'Copper (as Copper Gluconate)', amount: '2 mg', dailyValue: '222%' },
      { nutrient: 'Manganese (as Manganese Amino Acid Chelate)', amount: '2 mg', dailyValue: '87%' },
      { nutrient: 'Chromium (as Chromium Picolinate)', amount: '120 mcg', dailyValue: '343%' },
      { nutrient: 'Molybdenum (as Molybdenum Amino Acid Chelate)', amount: '75 mcg', dailyValue: '167%' },
    ],
    proprietaryBlends: [
      {
        name: 'Female Support Proprietary Blend',
        ingredients:
          'Wild Yam 4:1 Extract (Dioscorea villosa, Root), Red Clover 4:1 Extract (Trifolium pratense, Aerial Parts), Lutein (from Tagetes erecta Flower Extract), Cranberry Extract (Vaccinium macrocarpon, Fruit), Alpha Lipoic Acid, Lycopene',
        amount: '192 mg',
      },
      ANTIOXIDANT_BLEND,
      {
        name: 'Immune Proprietary Blend',
        ingredients:
          'Echinacea 4:1 Extract (Echinacea purpurea, Whole Plant), Spirulina (Arthrospira platensis, Algae), Garlic (Allium sativum, Bulb)',
        amount: '115 mg',
      },
    ],
    otherIngredients: 'Hypromellose, Stearic Acid, L-Leucine, Rice Flour, Silica',
    howToTake,
    faqs: [
      {
        question: 'Why does ONCE use methylated B12 and folate?',
        answer:
          'Women’s Multi uses methylcobalamin (B12) and calcium 5-MTHF (folate). These are the active, methylated forms of the two vitamins, so your body can use them without converting them first.',
      },
      {
        question: 'How should I take Women’s Multi?',
        answer:
          'Take two capsules daily with a meal, or as recommended by a healthcare professional. If you are sensitive, start with one capsule daily with food.',
      },
      {
        question: 'Is it gluten-free and dairy-free?',
        answer:
          'Yes. The label states 0 gluten and 0 dairy. The full list of other ingredients is: hypromellose, stearic acid, L-leucine, rice flour and silica.',
      },
      {
        question: 'Can I check the test report for my bottle?',
        answer:
          'Yes. Enter the batch number printed on your bottle on our Verify Batch page to see the Certificate of Analysis (COA) and claim report for that batch.',
      },
      {
        question: 'How do I purchase on Amazon?',
        answer:
          "ONCE is launching soon on Amazon. Once the listing is live, the Amazon button on this page will take you straight to it, where you can order or set up Subscribe & Save.",
      },
    ],
  },
  {
    slug: 'mens-multi',
    name: "Men's Multi",
    gender: 'men',
    eyebrow: "MEN'S MULTI",
    tagline: 'Advanced Bioactive Formula',
    description:
      "A daily multivitamin for men with 20 vitamins and minerals, methylated B12 and folate, magnesium glycinate, and a male support blend with stinging nettle root and saw palmetto. Two capsules a day with a meal.",
    accent: 'var(--men)',
    accentHex: '#2F6B8C',
    image: '/images/mens-multi.webp',
    gallery: [
      '/images/mens-multi.webp',
      '/images/lifestyle-men.webp',
      '/images/ritual-capsules.webp',
      '/images/card-energy.webp',
      '/images/card-magnesium.webp',
    ],
    amazonUrl: amazonProductUrl(ASIN.mensMulti),
    amazonCartUrl: amazonCartUrl(ASIN.mensMulti),
    price: '', // optional, hidden if empty
    capsules: 60,
    supplyDays: 30,
    rating: 0, // TODO client
    reviewCount: 0, // TODO client
    benefits: [
      "Supports Men's Daily Vitality & Energy*",
      'Methylated B12 & Folate',
      'With Magnesium Glycinate',
    ],
    detailedBenefits: [
      {
        title: "Men's Daily Vitality & Energy*",
        description:
          'A full B-complex (B1, B2, niacin, B6, B12, biotin and pantothenic acid) that supports normal energy metabolism, alongside vitamins A, C, D and E.*',
      },
      {
        title: 'Methylated B12 & Folate',
        description:
          'Vitamin B12 as methylcobalamin and folate as calcium 5-MTHF — the active forms, so your body does not need to convert them first.*',
      },
      {
        title: 'With Magnesium Glycinate',
        description:
          'Magnesium in the gentle glycinate form, plus zinc, selenium, copper, manganese, chromium, molybdenum and calcium.*',
      },
      {
        title: 'Male Support Blend',
        description:
          'Stinging nettle root, saw palmetto, lutein and lycopene — together with an antioxidant fruit blend and an immune blend of garlic, spirulina, echinacea and beta-glucans.*',
      },
    ],
    ingredientSpotlights: [
      {
        name: 'Vitamin B12 (Methylcobalamin)',
        source: 'Methylated B12',
        benefit: '27 mcg of B12 as methylcobalamin, to support normal energy metabolism.*',
        image: '/images/card-energy.webp',
      },
      {
        name: 'Folate (Calcium 5-MTHF)',
        source: 'Methylated Folate',
        benefit: '667 mcg DFE of folate in its active, methylated form.*',
        image: '/images/card-b12-folate.webp',
      },
      {
        name: 'Magnesium Glycinate',
        source: 'Gentle Mineral Form',
        benefit: '50 mg of magnesium as magnesium glycinate, a form known for being gentle.*',
        image: '/images/card-magnesium.webp',
      },
      {
        name: 'Male Support Blend',
        source: '170 mg Botanical Blend',
        benefit: 'Stinging nettle root, saw palmetto, lutein and lycopene.*',
        image: '/images/card-clean.webp',
      },
    ],
    servingSize: '2 Capsules',
    servingsPerContainer: 30,
    supplementFacts: [
      { nutrient: 'Vitamin A (as Beta-Carotene)', amount: '600 mcg', dailyValue: '67%' },
      { nutrient: 'Vitamin C (as Ascorbic Acid)', amount: '150 mg', dailyValue: '167%' },
      { nutrient: 'Vitamin D (as Cholecalciferol)', amount: '10 mcg', dailyValue: '50%' },
      { nutrient: 'Vitamin E (as d-Alpha-Tocopheryl Succinate)', amount: '13.5 mg', dailyValue: '90%' },
      { nutrient: 'Thiamin (Vitamin B1) (as Thiamin Mononitrate)', amount: '7 mg', dailyValue: '583%' },
      { nutrient: 'Riboflavin (Vitamin B2)', amount: '7.5 mg', dailyValue: '577%' },
      { nutrient: 'Niacin (as Inositol Hexanicotinate)', amount: '30 mg', dailyValue: '188%' },
      { nutrient: 'Vitamin B6 (as Pyridoxal 5-Phosphate)', amount: '7.5 mg', dailyValue: '441%' },
      { nutrient: 'Folate (as Calcium 5-MTHF)', amount: '667 mcg DFE', dailyValue: '167%' },
      { nutrient: 'Vitamin B12 (as Methylcobalamin)', amount: '27 mcg', dailyValue: '1125%' },
      { nutrient: 'Biotin', amount: '300 mcg', dailyValue: '1000%' },
      { nutrient: 'Pantothenic Acid (as d-Calcium Pantothenate)', amount: '10 mg', dailyValue: '200%' },
      { nutrient: 'Calcium (as Calcium Carbonate)', amount: '50 mg', dailyValue: '4%' },
      { nutrient: 'Magnesium (as Magnesium Glycinate)', amount: '50 mg', dailyValue: '12%' },
      { nutrient: 'Zinc (as Zinc Oxide)', amount: '15 mg', dailyValue: '136%' },
      { nutrient: 'Selenium (as Selenium Amino Acid Chelate)', amount: '30 mcg', dailyValue: '55%' },
      { nutrient: 'Copper (as Copper Gluconate)', amount: '2 mg', dailyValue: '222%' },
      { nutrient: 'Manganese (as Manganese Amino Acid Chelate)', amount: '2 mg', dailyValue: '87%' },
      { nutrient: 'Chromium (as Chromium Picolinate)', amount: '120 mcg', dailyValue: '343%' },
      { nutrient: 'Molybdenum (as Molybdenum Amino Acid Chelate)', amount: '75 mcg', dailyValue: '167%' },
    ],
    proprietaryBlends: [
      {
        name: 'Male Support Proprietary Blend',
        ingredients:
          'Stinging Nettle 4:1 Extract (Urtica dioica, Root), Saw Palmetto (Serenoa repens, Fruit), Lutein (from Tagetes erecta Flower Extract), Lycopene',
        amount: '170 mg',
      },
      {
        name: 'Immune Support Proprietary Blend',
        ingredients:
          'Garlic (Allium sativum, Bulb), Spirulina (Arthrospira platensis, Algae), Echinacea Extract (4% Polyphenols) (Echinacea purpurea, Whole Plant), Beta-Glucans',
        amount: '110 mg',
      },
      ANTIOXIDANT_BLEND,
    ],
    otherIngredients: 'Hypromellose, Rice Flour, Stearic Acid, L-Leucine, Silica',
    howToTake,
    faqs: [
      {
        question: 'Why does ONCE use methylated B12 and folate?',
        answer:
          'Men’s Multi uses methylcobalamin (B12) and calcium 5-MTHF (folate). These are the active, methylated forms of the two vitamins, so your body can use them without converting them first.',
      },
      {
        question: 'How should I take Men’s Multi?',
        answer:
          'Take two capsules daily with a meal, or as recommended by a healthcare professional. If you are sensitive, start with one capsule daily with food.',
      },
      {
        question: 'Is it gluten-free and dairy-free?',
        answer:
          'Yes. The label states 0 gluten and 0 dairy. The full list of other ingredients is: hypromellose, rice flour, stearic acid, L-leucine and silica.',
      },
      {
        question: 'Can I check the test report for my bottle?',
        answer:
          'Yes. Enter the batch number printed on your bottle on our Verify Batch page to see the Certificate of Analysis (COA) and claim report for that batch.',
      },
      {
        question: 'How do I order through Amazon?',
        answer:
          "ONCE is launching soon on Amazon. Once the listing is live, the Amazon button on this page will take you straight to it — buy once or set up Subscribe & Save.",
      },
    ],
  },
];

/* ── Accordion + badge content (built from the label data above, so it can never disagree with it) ── */

const BADGES: Record<string, string[]> = {
  'womens-multi': ['Energy & Vitality*', 'Methylated B12 & Folate', '0 Gluten · 0 Dairy', 'Third Party Tested'],
  'mens-multi': ["Daily Vitality & Energy*", 'Methylated B12 & Folate', '0 Gluten · 0 Dairy', 'Third Party Tested'],
};

const MAIN_BENEFITS: Record<string, string[]> = {
  'womens-multi': [
    'Methylated B12 & Folate — Vitamin B12 as methylcobalamin (27 mcg) and folate as calcium 5-MTHF (667 mcg DFE): the active forms your body can use without converting them first.*',
    'Energy, Vitality & Daily Balance — A full B-complex (B1, B2, niacin, B6, B12, biotin and pantothenic acid) supports normal energy metabolism.*',
    'With Magnesium Glycinate — 50 mg of magnesium in the gentle glycinate form, plus zinc, selenium, copper, manganese, chromium and molybdenum.*',
    'Female Support Blend — Wild yam, red clover, cranberry, lutein, alpha lipoic acid and lycopene (192 mg).*',
    'Immune & Antioxidant Blends — Echinacea, spirulina and garlic, plus green tea, hawthorn, bilberry, grape seed, black currant and pomegranate.*',
  ],
  'mens-multi': [
    'Methylated B12 & Folate — Vitamin B12 as methylcobalamin (27 mcg) and folate as calcium 5-MTHF (667 mcg DFE): the active forms your body can use without converting them first.*',
    "Men's Daily Vitality & Energy — A full B-complex (B1, B2, niacin, B6, B12, biotin and pantothenic acid) supports normal energy metabolism.*",
    'With Magnesium Glycinate — 50 mg of magnesium in the gentle glycinate form, plus zinc, selenium, copper, manganese, chromium and molybdenum.*',
    'Male Support Blend — Stinging nettle root, saw palmetto, lutein and lycopene (170 mg).*',
    'Immune & Antioxidant Blends — Garlic, spirulina, echinacea and beta-glucans, plus green tea, hawthorn, bilberry, grape seed, black currant and pomegranate.*',
  ],
};

const GOOD_FOR: Record<string, string[]> = {
  'womens-multi': [
    'Women looking for a once-daily foundation multivitamin',
    'Busy routines where meals are smaller or less varied',
    'Anyone who prefers methylated (active) B12 and folate',
    'Those who want a gluten-free and dairy-free formula',
  ],
  'mens-multi': [
    'Men looking for a once-daily foundation multivitamin',
    'Active lifestyles, training days and long workdays',
    'Anyone who prefers methylated (active) B12 and folate',
    'Those who want a gluten-free and dairy-free formula',
  ],
};

const buildInfoSections = (p: BaseProduct): Product['infoSections'] => [
  { title: 'Main Benefits', items: MAIN_BENEFITS[p.slug] },
  { title: 'Is Good For', items: GOOD_FOR[p.slug] },
  {
    title: 'How to Take',
    paragraphs: [LABEL_SUGGESTED_USE],
  },
  {
    title: 'Ingredients',
    paragraphs: [
      p.supplementFacts.map((f) => `${f.nutrient} ${f.amount}`).join(', ') + '.',
      ...p.proprietaryBlends.map((b) => `${b.name} (${b.amount}): ${b.ingredients}.`),
      `Other ingredients: ${p.otherIngredients}.`,
    ],
  },
  {
    title: 'More Information',
    items: [
      `${p.capsules} capsules — ${p.supplyDays}-day supply (${p.servingSize} per serving)`,
      '0 Gluten · 0 Dairy',
      'Third party tested · cGMP-certified facility',
      LABEL_CLAIMS.madeIn,
      `Distributed by ${DISTRIBUTOR.name}, ${DISTRIBUTOR.address.join(', ')}`,
      'Coming soon on Amazon — Subscribe & Save at launch',
    ],
  },
  {
    title: 'Safety',
    paragraphs: [
      LABEL_CAUTION,
      LABEL_STORAGE,
      '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
    ],
  },
];

export const products: Product[] = baseProducts.map((p) => ({
  ...p,
  badges: BADGES[p.slug] ?? [],
  infoSections: buildInfoSections(p),
}));

export const comparisonData = [
  {
    feature: 'Formula focus',
    womens: 'Energy, vitality & daily balance*',
    mens: "Men's daily vitality & energy*",
  },
  {
    feature: 'Serving',
    womens: '2 capsules daily with a meal (30 servings)',
    mens: '2 capsules daily with a meal (30 servings)',
  },
  {
    feature: 'Methylated B12 & Folate',
    womens: 'Methylcobalamin 27 mcg · Calcium 5-MTHF 667 mcg DFE',
    mens: 'Methylcobalamin 27 mcg · Calcium 5-MTHF 667 mcg DFE',
  },
  {
    feature: 'Magnesium Glycinate',
    womens: '50 mg',
    mens: '50 mg',
  },
  {
    feature: 'Vitamin A · Vitamin E',
    womens: '1200 mcg · 30 mg',
    mens: '600 mcg · 13.5 mg',
  },
  {
    feature: 'Support blend',
    womens: 'Female Support Blend, 192 mg (wild yam, red clover, cranberry…)',
    mens: 'Male Support Blend, 170 mg (stinging nettle root, saw palmetto…)',
  },
  {
    feature: 'Immune blend',
    womens: '115 mg — echinacea, spirulina, garlic',
    mens: '110 mg — garlic, spirulina, echinacea, beta-glucans',
  },
  {
    feature: 'Antioxidant Fruit & Energy blend',
    womens: '187 mg',
    mens: '187 mg',
  },
  {
    feature: 'Free from',
    womens: '0 Gluten · 0 Dairy',
    mens: '0 Gluten · 0 Dairy',
  },
  {
    feature: 'Quality',
    womens: 'Third party tested · cGMP-certified facility',
    mens: 'Third party tested · cGMP-certified facility',
  },
];
