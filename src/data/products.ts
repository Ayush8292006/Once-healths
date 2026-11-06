import { ASIN, amazonProductUrl, amazonCartUrl } from './amazon';

export interface SupplementFactRow {
  nutrient: string;
  amount: string;
  dailyValue: string;
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
  price?: string;    // optional, hidden if empty
  capsules: number;
  supplyDays: number;
  rating: number;
  reviewCount: number;
  benefits: string[];
  detailedBenefits: {
    title: string;
    description: string;
  }[];
  ingredientSpotlights: IngredientSpotlight[];
  // Supplement Facts label placeholder rows
  // TODO client: client to supply exact supplement facts — do not invent dosages
  supplementFacts: SupplementFactRow[];
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
  /** Round benefit badges shown on the right of the main product image */
  badges: string[];
  /** "✦ Main Benefits / Is Good For / …" accordion under the buy buttons */
  infoSections: {
    title: string;
    items?: string[];      // rendered as bullets ("Title — text" bolds the title part)
    paragraphs?: string[]; // rendered as plain paragraphs
  }[];
  /** % of reviews per star (5★ → 1★). TODO client: replace with real Amazon breakdown */
  ratingBreakdown: [number, number, number, number, number];
}

export const products: Product[] = [
  {
    slug: 'womens-multi',
    name: "Women's Multi",
    gender: 'women',
    eyebrow: "WOMEN'S MULTI",
    tagline: 'Advanced Bioactive Formula',
    description: 'A targeted daily multivitamin engineered for female cellular vitality, metabolic energy, and hormonal balance. Made with bioidentical methylated vitamins and gentle chelated magnesium.',
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
    rating: 4.9,
    reviewCount: 148, // TODO client
    ratingBreakdown: [88, 8, 3, 1, 0], // TODO client
    badges: ['Energy & Vitality*', 'Hair, Skin & Nails*', 'Methylated B12 & Folate', 'Iron-Free & Gentle'],
    infoSections: [
      {
        title: 'Main Benefits',
        items: [
          'Methylated Multivitamin for Women — Features bioavailable B vitamins: Folate as 5-MTHF, Vitamin B12 as methylcobalamin, and Vitamin B6 as P5P. Forms that your body can use directly, without having to convert them first.*',
          'Stomach-Friendly Formula — Formulated without iron. Designed to be gentle when taken with food. If your stomach is sensitive, start with one capsule.*',
          'Hair, Skin & Nails Support — With Biotin, Zinc, and Selenium — nutrients often included in beauty-focused formulas.*',
          'Helps Fill Everyday Nutrient Gaps — A broad-spectrum blend of essential vitamins and minerals helps complement what smaller or less varied meals may miss.*',
          'Year-Round Immune Resilience — Vitamin C, D3, Zinc and Selenium support your natural immune defences.*',
        ],
      },
      {
        title: 'Is Good For',
        items: [
          'Women looking for a once-daily foundation multivitamin',
          'Busy routines where meals are smaller or less varied',
          'Anyone who prefers methylated (active) B vitamins',
          'Those who want an iron-free, gentle-on-the-stomach formula',
        ],
      },
      {
        title: 'How to Take',
        paragraphs: [
          'Take 2 capsules daily with your first meal of the day and a glass of water.',
          'Fat-soluble nutrients (Vitamins A, D3, E, K2) absorb best alongside healthy fats such as avocado, yogurt, eggs or olive oil. If your stomach is sensitive, start with one capsule.',
        ],
      },
      {
        title: 'Ingredients',
        paragraphs: [
          'Vitamin A, Vitamin C, Vitamin D3, Vitamin E, Vitamin K2 (MK-7), Thiamin (B1), Riboflavin (B2), Niacin, Vitamin B6 (P5P), Folate (5-MTHF), Vitamin B12 (methylcobalamin), Biotin, Pantothenic Acid, Magnesium (bisglycinate), Zinc (bisglycinate), Selenium (L-selenomethionine).',
          'Other ingredients: Vegetarian capsule (hypromellose), microcrystalline cellulose.',
        ],
      },
      {
        title: 'More Information',
        items: [
          '60 vegetarian capsules — 30-day supply',
          'No artificial colours, flavours or fillers',
          'Coming soon on Amazon — Subscribe & Save at launch',
        ],
      },
      {
        title: 'Safety',
        paragraphs: [
          'Do not exceed the recommended dose. Consult your healthcare professional before use if pregnant, nursing, taking medication, or having a known medical condition.',
          'Keep out of reach of children. Store in a cool, dry place away from direct sunlight. Do not use if the seal is broken.',
        ],
      },
    ],
    benefits: [
      'Supports Energy, Vitality & Daily Balance*',
      'Methylated B12 & Folate for optimal cellular absorption',
      'Gentle Magnesium Glycinate for calm & muscle recovery',
    ],
    detailedBenefits: [
      {
        title: 'Cellular Energy & Vitality',
        description: 'Bioavailable B-complex in enzymatic coenzyme forms supports mitochondrial ATP synthesis without artificial stimulants or afternoon crashes.',
      },
      {
        title: 'Active Methylated B12 & Folate',
        description: 'Utilizes pure L-methylfolate (5-MTHF) and methylcobalamin, bypassing MTHFR gene conversion hurdles so your body can immediately assimilate essential nutrients.',
      },
      {
        title: 'Chelated Magnesium Glycinate',
        description: 'Bound to glycine amino acids for high gastrointestinal tolerance and superior bioavailability — promoting calm focus, sound sleep, and muscle ease.',
      },
      {
        title: 'Bone & Immune Defense',
        description: 'Plant-sourced vegan Vitamin D3 combined with bioactive K2 (MK-7) to guide calcium directly to bone matrix and bolster immune vigilance.',
      },
    ],
    ingredientSpotlights: [
      {
        name: 'L-Methylfolate (5-MTHF)',
        source: 'Bioactive Folate',
        benefit: 'Active, body-ready folate supporting DNA synthesis and neurotransmitter harmony.',
        image: '/images/card-b12-folate.webp',
      },
      {
        name: 'Methylcobalamin (B12)',
        source: 'Coenzyme Form',
        benefit: 'Enzyme-ready B12 for nerve sheath integrity and red blood cell production.',
        image: '/images/card-energy.webp',
      },
      {
        name: 'Magnesium Bisglycinate',
        source: 'Chelated Mineral',
        benefit: 'Gentle on digestion, supporting neuromuscular tension release and restorative rest.',
        image: '/images/card-magnesium.webp',
      },
      {
        name: 'Plant Vitamin D3 & K2 (MK-7)',
        source: 'Wildcrafted Lichen & Natto',
        benefit: 'Synergistic arterial and bone health support with clinically documented absorption.',
        image: '/images/card-clean.webp',
      },
    ],
    // TODO client: client to supply exact supplement facts — do not invent dosages
    supplementFacts: [
      { nutrient: 'Vitamin A (as beta-carotene)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin C (as L-ascorbic acid)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin D3 (as cholecalciferol from lichen)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin E (as d-alpha tocopherol)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin K2 (as menaquinone-7)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Thiamin (Vitamin B1 as thiamin HCl)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Riboflavin (Vitamin B2 as riboflavin-5-phosphate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Niacin (as niacinamide)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin B6 (as pyridoxal-5-phosphate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Folate (as L-5-methyltetrahydrofolate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin B12 (as methylcobalamin)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Biotin', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Pantothenic Acid (as d-calcium pantothenate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Magnesium (as magnesium bisglycinate chelate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Zinc (as zinc bisglycinate chelate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Selenium (as L-selenomethionine)', amount: 'TBC', dailyValue: 'TBC' },
    ],
    howToTake: {
      servingSize: '2 vegan capsules daily',
      timing: 'Best taken in the morning with a meal and water',
      instructions: 'Take 2 capsules together with your first meal of the day. Fat-soluble nutrients (Vitamins A, D3, E, K2) absorb optimally when paired with healthy fats (avocado, yogurt, eggs, olive oil).',
      storage: 'Store in a cool, dry place away from direct sunlight. No refrigeration required. Keep tightly capped.',
    },
    faqs: [
      {
        question: "Why does ONCE use methylated B12 and folate?",
        answer: "Up to 40% of the population has an MTHFR gene variation that hinders the conversion of synthetic folic acid and cyanocobalamin into usable forms. ONCE uses pure methylcobalamin and L-methylfolate (5-MTHF)—the bioidentical, enzymatic forms your cells recognize immediately.",
      },
      {
        question: "Is Women's Multi gentle on an empty stomach?",
        answer: "We formulate exclusively with chelated magnesium glycinate and bioactive vitamin complexes designed for maximum gastric tolerance. While gentle, we recommend taking it with a meal for peak fat-soluble vitamin absorption.",
      },
      {
        question: "How do I purchase on Amazon?",
        answer: "Women's Multi is coming soon on Amazon. Once the listing is live, the Amazon button on this page will take you straight to it, where you can order with Prime delivery or set up monthly Subscribe & Save.",
      },
      {
        question: "Are the capsules vegan and allergen-free?",
        answer: "Yes. ONCE capsules are 100% plant-based, gluten-free, dairy-free, soy-free, and non-GMO, formulated without artificial fillers, colorings, or synthetic binders.",
      },
    ],
  },
  {
    slug: 'mens-multi',
    name: "Men's Multi",
    gender: 'men',
    eyebrow: "MEN'S MULTI",
    tagline: 'Advanced Bioactive Formula',
    description: "An uncompromising daily foundation tuned for male metabolic demands, physical stamina, and cognitive focus. Formulated without iron, highlighting active coenzyme B-vitamins and chelated magnesium.",
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
    rating: 4.9,
    reviewCount: 124, // TODO client
    ratingBreakdown: [86, 9, 3, 1, 1], // TODO client
    badges: ['Daily Energy & Stamina*', 'Muscle & Recovery*', 'Methylated B12 & Folate', 'Zinc & Magnesium'],
    infoSections: [
      {
        title: 'Main Benefits',
        items: [
          "Methylated Multivitamin for Men — Folate as 5-MTHF and Vitamin B12 as methylcobalamin. Active forms your body can use directly, without having to convert them first.*",
          'Calibrated Without Iron — Most adult men do not need added iron, so the formula leaves it out while keeping antioxidant support.*',
          'Energy & Stamina Support — A full B-complex helps support normal energy metabolism through the day, without stimulants.*',
          'Muscle & Recovery — Chelated Magnesium Glycinate and Zinc Bisglycinate support normal muscle function and recovery.*',
          'Year-Round Immune Resilience — Vitamin C, D3, Zinc and Selenium support your natural immune defences.*',
        ],
      },
      {
        title: 'Is Good For',
        items: [
          'Men looking for a once-daily foundation multivitamin',
          'Active lifestyles, training days and long workdays',
          'Anyone who prefers methylated (active) B vitamins',
          'Those who want an iron-free formula',
        ],
      },
      {
        title: 'How to Take',
        paragraphs: [
          'Take 2 capsules daily with a meal and a glass of water — breakfast or your pre-workout meal works well.',
          'Consistent daily intake works best. Pairs well with protein powders, creatine and electrolytes.',
        ],
      },
      {
        title: 'Ingredients',
        paragraphs: [
          'Vitamin A, Vitamin C, Vitamin D3, Vitamin E, Vitamin K2 (MK-7), Thiamin (B1), Riboflavin (B2), Niacin, Vitamin B6 (P5P), Folate (5-MTHF), Vitamin B12 (methylcobalamin), Biotin, Pantothenic Acid, Magnesium (bisglycinate), Zinc (bisglycinate), Selenium (L-selenomethionine).',
          'Other ingredients: Vegetarian capsule (hypromellose), microcrystalline cellulose.',
        ],
      },
      {
        title: 'More Information',
        items: [
          '60 vegetarian capsules — 30-day supply',
          'No artificial colours, flavours or fillers',
          'Coming soon on Amazon — Subscribe & Save at launch',
        ],
      },
      {
        title: 'Safety',
        paragraphs: [
          'Do not exceed the recommended dose. Consult your healthcare professional before use if taking medication or having a known medical condition.',
          'Keep out of reach of children. Store in a cool, dry place away from heat and moisture. Do not use if the seal is broken.',
        ],
      },
    ],
    benefits: [
      "Supports Men's Daily Vitality & Energy*",
      'Methylated B12 & Folate for endurance & mental clarity',
      'With Magnesium Glycinate & Zinc Chelate',
    ],
    detailedBenefits: [
      {
        title: "Men's Daily Vitality & Endurance",
        description: 'High-potency B-complex fuels daily metabolic pathways and muscle stamina without nervous jitters or synthetic caffeine.',
      },
      {
        title: 'Methylated Folate & B12 (Active Enzymatic Forms)',
        description: 'Delivers active methyl groups directly to the methylation cycle, optimizing cellular repair, homocysteine regulation, and neurotransmitter balance.',
      },
      {
        title: 'Magnesium Glycinate + Zinc Bisglycinate',
        description: 'Crucial for testosterone synthesis, cardiovascular health, protein synthesis, and restful neuromuscular recovery after strenuous days.',
      },
      {
        title: 'Zero Iron — Calibrated for Men',
        description: 'Men typically do not lose iron monthly and excess iron can induce oxidative stress. Our formula consciously omits iron while maximizing antioxidant defenses.',
      },
    ],
    ingredientSpotlights: [
      {
        name: 'Magnesium Bisglycinate',
        source: 'Chelated Mineral',
        benefit: 'Supports healthy testosterone levels, muscle recovery, and deep sleep architecture.',
        image: '/images/card-magnesium.webp',
      },
      {
        name: 'Methylcobalamin (B12)',
        source: 'Enzymatic Coenzyme',
        benefit: 'Sustains cellular respiration, stamina, and red blood cell oxygenation.',
        image: '/images/card-energy.webp',
      },
      {
        name: 'Zinc Bisglycinate Chelate',
        source: 'Albion Chelated Zinc',
        benefit: 'Optimal prostate function, reproductive health, and immune cell signaling.',
        image: '/images/card-clean.webp',
      },
      {
        name: 'L-Methylfolate (5-MTHF)',
        source: 'Bioidentical Folate',
        benefit: 'Cardiovascular homocysteine regulation and sharp cognitive focus.',
        image: '/images/card-b12-folate.webp',
      },
    ],
    // TODO client: client to supply exact supplement facts — do not invent dosages
    supplementFacts: [
      { nutrient: 'Vitamin A (as beta-carotene)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin C (as L-ascorbic acid)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin D3 (as cholecalciferol from lichen)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin E (as d-alpha tocopherol)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin K2 (as menaquinone-7)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Thiamin (Vitamin B1 as thiamin HCl)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Riboflavin (Vitamin B2 as riboflavin-5-phosphate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Niacin (as niacinamide)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin B6 (as pyridoxal-5-phosphate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Folate (as L-5-methyltetrahydrofolate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Vitamin B12 (as methylcobalamin)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Biotin', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Pantothenic Acid (as d-calcium pantothenate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Magnesium (as magnesium bisglycinate chelate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Zinc (as zinc bisglycinate chelate)', amount: 'TBC', dailyValue: 'TBC' },
      { nutrient: 'Selenium (as L-selenomethionine)', amount: 'TBC', dailyValue: 'TBC' },
    ],
    howToTake: {
      servingSize: '2 vegan capsules daily',
      timing: 'Best taken in the morning with breakfast or pre-workout meal',
      instructions: 'Take 2 capsules daily with a wholesome meal and 8 oz of water. Consistent daily intake builds cellular reserves within 3–4 weeks.',
      storage: 'Keep in a cool, dry place away from heat and moisture. Store sealed in original UV-resistant packaging.',
    },
    faqs: [
      {
        question: "Why is there no iron in Men's Multi?",
        answer: "Unlike women, adult men rarely experience iron depletion through physiological loss. Unnecessary iron supplementation can cause oxidative stress and organ accumulation. We intentionally exclude iron to ensure optimal long-term male wellness.",
      },
      {
        question: "What makes magnesium glycinate superior for men?",
        answer: "Traditional multivitamins use cheap magnesium oxide, which has ~4% absorption and acts as a laxative. Magnesium glycinate is chelated with glycine, reaching muscles and the nervous system directly for genuine recovery.",
      },
      {
        question: "How do I order through Amazon?",
        answer: "Men's Multi is coming soon on Amazon. Once the listing is live, the Amazon button on this page will open it, where you can buy once or set up a Subscribe & Save delivery every 30 days.",
      },
      {
        question: "Can I take this alongside protein powders or electrolytes?",
        answer: "Yes, ONCE Men's Multi is designed to sit cleanly as your foundational micronutrient base. It pairs effortlessly with whey/plant protein, creatine, and daily hydration regimens.",
      },
    ],
  },
];

export const comparisonData = [
  {
    feature: 'Primary Focus',
    womens: 'Cellular vitality, daily balance & hormonal equilibrium',
    mens: 'Physical stamina, metabolic energy & cognitive endurance',
  },
  {
    feature: 'Serving Size',
    womens: '2 capsules daily (30-day supply)',
    mens: '2 capsules daily (30-day supply)',
  },
  {
    feature: 'Bioactive Methylated B12 & Folate',
    womens: 'Yes (Methylcobalamin + 5-MTHF)',
    mens: 'Yes (Methylcobalamin + 5-MTHF)',
  },
  {
    feature: 'Gentle Magnesium Glycinate',
    womens: 'Yes (chelated bisglycinate)',
    mens: 'Yes (chelated bisglycinate)',
  },
  {
    feature: 'Iron Content',
    womens: 'Zero added iron (digestive comfort)',
    mens: 'Zero iron (calibrated for male physiology)',
  },
  {
    feature: 'Zinc Bioavailability',
    womens: 'Zinc bisglycinate chelate',
    mens: 'Zinc bisglycinate chelate (immune & male health support)',
  },
  {
    feature: 'Plant Vitamin D3 + K2 (MK-7)',
    womens: 'Yes (Wild lichen D3 + natto K2)',
    mens: 'Yes (Wild lichen D3 + natto K2)',
  },
  {
    feature: 'Testing & Purity',
    womens: '100% Third-party tested, ISO accredited',
    mens: '100% Third-party tested, ISO accredited',
  },
  {
    feature: 'Capsule Formulation',
    womens: 'Vegan cellulose, non-GMO, zero fillers',
    mens: 'Vegan cellulose, non-GMO, zero fillers',
  },
];


export const LABEL_CLAIMS = {
  freeFrom: ['Gluten', 'Dairy'],
  quality: ['Third party Tested', 'cGMP-Certified Facility'],
  madeIn: 'Proudly manufactured in India using globally sourced ingredients.',
} as const;

export const DISTRIBUTOR = {
  name: 'Once Health LLC',
  address: ['30 N Gould St Ste R', 'Sheridan, WY 82801'],
  email: 'support@oncehealth.co',
} as const;
