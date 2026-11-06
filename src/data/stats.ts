import type { Stat } from '../components/StatCounters';

/**
 * HOME PAGE — sales / social-proof numbers.
 * TODO client: replace each `value: null` with the real number (e.g. value: 12000).
 * While a value is null the placeholder text is shown and nothing is counted up.
 * Only use figures you can back up (Amazon Seller Central / order reports) — never estimates.
 */
export const homeStats: Stat[] = [
  { value: null, suffix: '+', placeholder: '10,000+', label: 'Bottles sold', colorClass: 'text-ink' },
  { value: null, suffix: '+', placeholder: '1,000+', label: 'Happy customers', colorClass: 'text-women' },
  { value: null, suffix: '★', decimals: 1, placeholder: '4.3★', label: 'Average Amazon rating', colorClass: 'text-brand-green' },
  { value: null, suffix: '+', placeholder: 'X,000+', label: 'Verified reviews', colorClass: 'text-men' },
];

/** PRODUCT PAGE — facts straight from the label (safe to show as-is). */
export const productStats: Stat[] = [
  { value: 60, label: 'Capsules / 30-day supply', colorClass: 'text-ink' },
  { value: 20, label: 'Vitamins & minerals', colorClass: 'text-brand-green' },
  { value: 3, label: 'Targeted blends', colorClass: 'text-ink' },
  { value: 0, label: 'Gluten · Dairy', colorClass: 'text-ink' },
];
