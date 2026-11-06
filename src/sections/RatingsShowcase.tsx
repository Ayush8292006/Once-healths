import React from 'react';
import { Link } from 'react-router-dom';
import { Star, BadgeCheck, ArrowUpRight } from 'lucide-react';
import { products } from '../data/products';
import { reviews, ratingStats, isDemoData, soldThisMonth, formatSold } from '../data/reviews';
import { BottleImage } from '../components/BottleImage';
import { ConcentricRings } from '../components/ConcentricRings';

const Stars: React.FC<{ value: number; className?: string }> = ({ value, className = 'w-4 h-4' }) => (
  <div className="flex text-[#F5A524]">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`${className} ${i < Math.round(value) ? 'fill-current' : 'text-line'}`} />
    ))}
  </div>
);

/**
 * Home page: overall rating + both bottles + top reviews.
 * Replaces the old "60 / 2 / 1 / 100%" counter strip.
 * TODO client: rating numbers come from data/products.ts — replace with real Amazon figures.
 */
export const RatingsShowcase: React.FC = () => {
  // Numbers come from the real reviews in data/reviews.ts — section is hidden until there are some
  const all = ratingStats();
  const total = all.count;
  const avg = all.avg;
  const breakdown = all.breakdown;
  const soldAll = products.reduce((n, p) => n + (soldThisMonth(p.name) ?? 0), 0);
  const topReviews = reviews.filter((r) => r.rating === 5).slice(0, 2);
  if (total === 0) return null;

  return (
    <section className="py-20 sm:py-24 bg-surface border-t border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
            Ratings &amp; Reviews
          </span>
          {isDemoData && (
            <span className="inline-block mb-3 px-2.5 py-1 rounded-full bg-[#FFF3CD] text-[#7A5B00] text-[11px] font-heading font-bold uppercase tracking-wider">
              Demo data — not real reviews
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight">
            Loved by daily routines.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left — overall rating */}
          <div className="lg:col-span-4 bg-bg rounded-2xl border border-line p-7 shadow-soft">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-6xl font-heading font-bold text-ink leading-none">{avg}</span>
              <span className="text-sm text-ink-muted mb-1.5">out of 5</span>
            </div>
            <Stars value={avg} className="w-5 h-5" />
            <p className="text-sm text-ink-muted mt-2 mb-6">{total.toLocaleString('en-US')} ratings · Verified buyers</p>
            <div className="space-y-2.5">
              {breakdown.map((pct, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-12 shrink-0 text-ink">{5 - i} star</span>
                  <div className="flex-1 h-3 rounded-full bg-surface border border-line overflow-hidden">
                    <div className="h-full rounded-full bg-[#F5A524]" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-9 shrink-0 text-right text-ink-muted">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center — bottles with their own ratings */}
          <div className="lg:col-span-4 relative flex items-end justify-center gap-6 sm:gap-10 py-6">
            <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
              <ConcentricRings size={420} color="#211D1D" rings={4} animateOnScroll={false} />
            </div>
            {products.map((p) => {
              const ps = ratingStats(p.name);
              return (
              <Link
                key={p.slug}
                to={`/products/${p.slug}`}
                data-cursor="View"
                className="relative z-10 flex flex-col items-center group"
              >
                <div className={p.gender === 'women' ? 'w-28 sm:w-32' : 'w-24 sm:w-28'}>
                  <BottleImage gender={p.gender} alt={p.name} interactive />
                </div>
                <div className="mt-3 flex flex-col items-center gap-1 bg-surface/90 border border-line rounded-full px-3.5 py-1.5 shadow-soft">
                  <div className="flex items-center gap-1.5">
                    <Stars value={ps.avg} className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold text-ink">{ps.count ? ps.avg : '—'}</span>
                  </div>
                </div>
                <span
                  className={`mt-2 text-[11px] font-heading font-semibold uppercase tracking-wider whitespace-nowrap ${
                    p.gender === 'women' ? 'text-women' : 'text-men'
                  }`}
                >
                  {p.name}
                </span>
                <span className="text-[11px] text-ink-muted whitespace-nowrap">{ps.count.toLocaleString('en-US')} review{ps.count === 1 ? '' : 's'}</span>
              </Link>
              );
            })}
          </div>

          {/* Right — top reviews */}
          <div className="lg:col-span-4 space-y-4">
            {/* replace with real reviews — TODO client */}
            {topReviews.map((rev) => (
              <article key={rev.id} className="bg-bg rounded-2xl border border-line p-6 shadow-soft">
                <div className="flex items-center justify-between mb-2">
                  <Stars value={rev.rating} />
                  <span
                    className={`text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 rounded-brand ${
                      rev.product === "Women's Multi" ? 'bg-women/10 text-women' : 'bg-men/10 text-men'
                    }`}
                  >
                    {rev.product}
                  </span>
                </div>
                <h4 className="text-sm font-heading font-bold text-ink mb-1.5">{rev.title}</h4>
                <p className="text-sm text-ink-muted leading-relaxed mb-3">“{rev.quote}”</p>
                <p className="flex items-center gap-1.5 text-xs">
                  <span className="font-semibold text-ink">{rev.name}</span>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[#C45500] font-medium">
                      <BadgeCheck className="w-3.5 h-3.5" /> Verified Purchase
                    </span>
                  )}
                </p>
              </article>
            ))}
            <Link
              to="/products/womens-multi#reviews"
              className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-men hover:underline underline-offset-4"
            >
              Read all reviews <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Numbers strip — one horizontal row under the reviews */}
        <div className="mt-12 grid grid-cols-3 gap-y-6 rounded-2xl border border-line bg-bg py-6 divide-x divide-line">
          {[
            { value: `${avg.toFixed(1)}★`, label: 'Average rating' },
            { value: total.toLocaleString('en-US'), label: 'Ratings & reviews' },
            { value: soldAll ? formatSold(soldAll) : '', label: 'Sold this month' },
          ]
            .filter((s) => s.value)
            .map((s) => (
              <div key={s.label} className="text-center px-4">
                <p className="text-3xl sm:text-4xl font-heading font-bold text-ink leading-none">{s.value}</p>
                <p className="mt-2 text-xs sm:text-sm text-ink-muted">{s.label}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
