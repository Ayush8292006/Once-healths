/// <reference types="vite/client" />
/**
 * CUSTOMER REVIEWS — one file controls every rating / review number on the site.
 *
 * TODO client: paste REAL data only (from Amazon / your review app). Nothing fake is ever shown:
 * every block below stays hidden while its data is empty / null.
 *
 * 1) RATING_SUMMARY  → header rating on the product page ("4.7 ★★★★★ (453 reviews)")
 * 2) SOLD_THIS_MONTH → "1,200+ sold this month" next to the rating (Amazon Seller Central → Business Reports)
 * 3) reviews[]       → the review cards in the "Product Reviews" section (paste as many as you like)
 *
 */
export type ProductName = "Women's Multi" | "Men's Multi";

export interface Review {
  id: string;
  name: string;
  verified: boolean;
  rating: number;
  product: ProductName;
  title: string;
  quote: string;
  /** Shown top-right of the card, e.g. '21 Apr 2026' */
  date: string;
  /** Optional, e.g. 'Silver Spring, MD' */
  location?: string;
  /** Optional photo URLs (powers the "Picture Reviews" filter) */
  pictures?: string[];
  /** Optional "helpful" vote count (powers "Most Helpful" sort) */
  helpful?: number;
}

/**
 * Real totals from Amazon, per product. `counts` (optional) = number of 5★,4★,3★,2★,1★ ratings.
 * Example: "Men's Multi": { avg: 4.7, count: 453 }
 */
export const RATING_SUMMARY: Record<ProductName, { avg: number; count: number; counts?: [number, number, number, number, number] } | null> = {
  "Women's Multi": null,
  "Men's Multi": null,
};

/** Units sold in the last 30 days, per product. Example: "Men's Multi": 1200. null = hidden */
export const SOLD_THIS_MONTH: Record<ProductName, number | null> = {
  "Women's Multi": null,
  "Men's Multi": null,
};

/** Optional site-wide line used by the home-page carousel. null = hidden */
export const REVIEWS_SUMMARY: { rating: string; source: string } | null = null;

const realReviews: Review[] = [
  /*
  {
    id: '1',
    name: 'Rahul S.',
    verified: true,
    rating: 5,
    product: "Men's Multi",
    title: 'Great energy through the day',
    quote: '…exact words from the real review…',
    date: '21 Apr 2026',
    location: 'Austin, TX',
  },
  */
];

/* ---------------------------------------------------------------------------
 * DEMO MODE — dummy reviews / ratings / sales so the design can be seen filled in.
 * These are NOT real customers. A "Demo data" badge is shown wherever they appear.
 * TODO client: before launch set DEMO_MODE = false (and paste real data above).
 * Never publish demo reviews as genuine — fake reviews are illegal in many countries (FTC, Amazon policy).
 * ------------------------------------------------------------------------- */
export const DEMO_MODE = true;
const demoActive = DEMO_MODE && realReviews.length === 0;
export const isDemoData = demoActive;

const DEMO_SUMMARY: Record<ProductName, { avg: number; count: number; counts: [number, number, number, number, number] }> = {
  "Women's Multi": { avg: 4.6, count: 312, counts: [228, 52, 19, 8, 5] },
  "Men's Multi": { avg: 4.7, count: 453, counts: [348, 66, 22, 10, 7] },
};
const DEMO_SOLD: Record<ProductName, number> = { "Women's Multi": 900, "Men's Multi": 1200 };

const DEMO_TEXT: [number, string, string][] = [
  [5, 'Noticeable energy by week two', 'Been taking one with breakfast for a few weeks now. Easy on the stomach, no weird aftertaste, and my afternoons feel steadier. Will reorder.'],
  [5, 'Finally a multi I can stick with', 'Capsules are small and easy to swallow. I like that the label is clear about what is inside. Good value for a 30-day supply.'],
  [4, 'Good formula, small capsules', 'Does what it says. Took a few days to get used to taking it daily but now it is part of my morning routine. Packaging is neat too.'],
  [5, 'Great quality for the price', 'Compared a few brands before picking this one. The ingredient list is what sold me. No stomach upset even on an empty stomach for me.'],
  [3, 'Decent, still testing', 'Nothing dramatic so far after two weeks, but no side effects either. Giving it a full month before I decide.'],
  [5, 'Part of my daily routine now', 'Simple, clean, and I actually remember to take it. Delivery was quick and the bottle felt well sealed.'],
  [4, 'Would recommend', 'Happy with it overall. Slight vitamin smell when you open the bottle, but that is normal. Feeling good.'],
  [5, 'Better than what I used before', 'Switched from a gummy and prefer this a lot. Less sugar, more of what I need. Five stars.'],
];
const DEMO_NAMES: Record<ProductName, [string, string][]> = {
  "Women's Multi": [['Priya S.', 'Austin, TX'], ['Emily R.', 'Denver, CO'], ['Ananya K.', 'Edison, NJ'], ['Sarah M.', ''], ['Neha P.', 'Seattle, WA'], ['Jessica L.', 'Chicago, IL'], ['Maya D.', ''], ['Olivia T.', 'Miami, FL']],
  "Men's Multi": [['Rahul S.', 'Dallas, TX'], ['Mike B.', 'Phoenix, AZ'], ['Arjun V.', 'San Jose, CA'], ['Chris D.', ''], ['Kevin W.', 'Boston, MA'], ['Daniel R.', 'Atlanta, GA'], ['Sam H.', ''], ['Tyler J.', 'Portland, OR']],
};
const MONTHS = ['Oct', 'Oct', 'Sep', 'Sep', 'Aug', 'Aug', 'Jul', 'Jun'];

const demo = (product: ProductName): Review[] =>
  DEMO_TEXT.map(([rating, title, quote], i) => ({
    id: `demo-${product}-${i}`,
    name: DEMO_NAMES[product][i][0],
    location: DEMO_NAMES[product][i][1] || undefined,
    verified: i !== 4,
    rating,
    product,
    title,
    quote,
    date: `${[28, 14, 30, 11, 22, 5, 19, 9][i]} ${MONTHS[i]} 2026`,
    helpful: [4, 2, 0, 3, 1, 0, 2, 5][i],
  }));

export const reviews: Review[] = demoActive ? [...demo("Women's Multi"), ...demo("Men's Multi")] : realReviews;

const summaryFor = (name: ProductName) => RATING_SUMMARY[name] ?? (demoActive ? DEMO_SUMMARY[name] : null);

export const soldThisMonth = (name: string): number | null =>
  SOLD_THIS_MONTH[name as ProductName] ?? (demoActive ? DEMO_SOLD[name as ProductName] ?? null : null);

export const formatSold = (n: number): string =>
  n >= 10000 ? `${Math.floor(n / 1000)}K+` : n >= 1000 ? `${n.toLocaleString('en-US')}+` : `${n}+`;

/**
 * Rating numbers: the real Amazon totals (RATING_SUMMARY) win; otherwise they're calculated
 * from the reviews list above. Nothing is displayed until real data exists.
 */
export const ratingStats = (productName?: string) => {
  const list = productName ? reviews.filter((r) => r.product === productName) : reviews;
  const summary = productName
    ? summaryFor(productName as ProductName)
    : (() => {
        const all = (['Women\'s Multi', 'Men\'s Multi'] as ProductName[]).map(summaryFor);
        if (all.some((x) => !x)) return null;
        const t = all as NonNullable<(typeof all)[number]>[];
        const count = t.reduce((n, x) => n + x.count, 0);
        const counts = t[0].counts && t[1].counts ? (t[0].counts.map((c, i) => c + t[1].counts![i]) as [number, number, number, number, number]) : undefined;
        return { avg: Math.round((t.reduce((n, x) => n + x.avg * x.count, 0) / count) * 10) / 10, count, counts };
      })();

  const listCounts = [5, 4, 3, 2, 1].map((star) => list.filter((r) => Math.round(r.rating) === star).length);
  const counts: number[] = summary?.counts ?? listCounts;
  const total = summary?.counts ? summary.counts.reduce((a, b) => a + b, 0) : list.length;

  const count = summary?.count ?? list.length;
  const avg = summary
    ? summary.avg
    : list.length
      ? Math.round((list.reduce((n, r) => n + r.rating, 0) / list.length) * 10) / 10
      : 0;
  const breakdown = counts.map((c) => (total ? Math.round((c / total) * 100) : 0));
  return { count, avg, breakdown, counts };
};
