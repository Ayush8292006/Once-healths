export interface FAQItem {
  id: string;
  category: 'Products' | 'Usage' | 'Ordering via Amazon' | 'Quality';
  question: string;
  answer: string;
}

// Every answer here matches the final packaging label. Do not add claims that are not on the label.
export const generalFaqs: FAQItem[] = [
  {
    id: 'p1',
    category: 'Products',
    question: 'What makes ONCE different from a regular multivitamin?',
    answer:
      'Both formulas use methylated B12 (methylcobalamin) and methylated folate (calcium 5-MTHF), magnesium as magnesium glycinate, 20 vitamins and minerals, and targeted botanical blends — with every ingredient and amount printed on the label.',
  },
  {
    id: 'p2',
    category: 'Products',
    question: "What is the difference between Women's Multi and Men's Multi?",
    answer:
      "Both share the same B-complex, methylated B12 & folate and mineral base. Women's Multi has more vitamin A and E and a Female Support Blend (wild yam, red clover, cranberry, lutein, alpha lipoic acid, lycopene). Men's Multi has a Male Support Blend (stinging nettle root, saw palmetto, lutein, lycopene) and an immune blend with beta-glucans.",
  },
  {
    id: 'p3',
    category: 'Products',
    question: 'Are the capsules gluten-free and dairy-free?',
    answer:
      'Yes — the label states 0 gluten and 0 dairy. Other ingredients are hypromellose, stearic acid, L-leucine, rice flour and silica. Please read the full label if you have any other allergies.',
  },
  {
    id: 'u1',
    category: 'Usage',
    question: 'When and how should I take ONCE?',
    answer:
      'Adults: take two (2) capsules daily with a meal, or as recommended by a healthcare professional. If you are sensitive, start with one (1) capsule daily with food.',
  },
  {
    id: 'u2',
    category: 'Usage',
    question: 'Who should talk to a doctor before taking ONCE?',
    answer:
      'Consult a healthcare professional before use if you are under 18, pregnant or breastfeeding, taking medication, or have a medical condition. Do not exceed the recommended dose, and stop use if any adverse reaction occurs.',
  },
  {
    id: 'u3',
    category: 'Usage',
    question: 'Can a multivitamin replace a healthy diet?',
    answer:
      'No. Dietary supplements should not be used as a substitute for a varied, balanced diet and healthy lifestyle — ONCE is designed to complement it.',
  },
  {
    id: 'o1',
    category: 'Ordering via Amazon',
    question: 'Where do I buy ONCE products?',
    answer:
      "All orders will be placed through Amazon. Our Amazon listing is coming soon — once it's live, the Amazon buttons across this website will take you straight to it.",
  },
  {
    id: 'o2',
    category: 'Ordering via Amazon',
    question: 'Is Subscribe & Save available?',
    answer:
      "Once our Amazon listing is live, you'll be able to choose 'Subscribe & Save' to set up recurring deliveries.",
  },
  {
    id: 'o3',
    category: 'Ordering via Amazon',
    question: 'What is the return policy?',
    answer:
      "Purchases will be processed by Amazon, so returns will follow Amazon's return policy for the product. For anything else, email us at support@oncehealth.co.",
  },
  {
    id: 'q1',
    category: 'Quality',
    question: 'Are ONCE products third-party tested?',
    answer:
      'Yes. ONCE is third party tested, and each batch has its own Certificate of Analysis (COA). Enter the batch number printed on your bottle on our Verify Batch page to view the COA and claim report.',
  },
  {
    id: 'q2',
    category: 'Quality',
    question: 'Where are your supplements manufactured?',
    answer:
      'ONCE is proudly manufactured in India using globally sourced ingredients, in a cGMP-certified facility. It is distributed by Once Health LLC, 30 N Gould St Ste R, Sheridan, WY 82801.',
  },
  {
    id: 'q3',
    category: 'Quality',
    question: 'Why magnesium glycinate?',
    answer:
      'Magnesium glycinate is magnesium bound to the amino acid glycine. It is a form commonly chosen because it is known for being gentle. Each serving provides 50 mg of magnesium as magnesium glycinate.',
  },
];
