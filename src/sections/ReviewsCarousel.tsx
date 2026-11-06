import React, { useRef } from 'react';
import { reviews, REVIEWS_SUMMARY } from '../data/reviews';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const ReviewsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const offset = direction === 'left' ? -380 : 380;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Section stays hidden until real customer reviews are added in data/reviews.ts
  if (reviews.length === 0) return null;

  return (
    <section className="py-24 bg-bg border-t border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
              Customer Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight">
              Real results from real routines.
            </h2>
            {REVIEWS_SUMMARY && (
              <div className="flex items-center gap-2 mt-3 text-sm text-ink-muted">
                <div className="flex text-brand-green">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-brand-green" />
                  ))}
                </div>
                <span className="font-semibold text-ink">{REVIEWS_SUMMARY.rating} / 5.0</span>
                <span>•</span>
                <span>{REVIEWS_SUMMARY.source}</span>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-brand bg-surface border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-surface transition-colors active:scale-95 shadow-soft"
              aria-label="Scroll reviews left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-brand bg-surface border border-line flex items-center justify-center text-ink hover:bg-ink hover:text-surface transition-colors active:scale-95 shadow-soft"
              aria-label="Scroll reviews right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        {/* replace with real reviews — TODO client */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 select-none"
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="shrink-0 w-[320px] sm:w-[380px] bg-surface rounded-2xl border border-line p-7 flex flex-col justify-between shadow-soft hover:shadow-card transition-shadow duration-300"
            >
              <div>
                {/* Product Tag & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[11px] font-heading font-semibold uppercase tracking-wider px-2.5 py-1 rounded-brand ${
                      rev.product === "Women's Multi"
                        ? 'bg-women/10 text-women'
                        : 'bg-men/10 text-men'
                    }`}
                  >
                    {rev.product}
                  </span>
                  <div className="flex text-brand-green">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Review Title & Quote */}
                <h3 className="text-base font-heading font-bold text-ink mb-2">
                  "{rev.title}"
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs">
                <span className="font-heading font-semibold text-ink">{rev.name}</span>
                <span className="flex items-center gap-1 text-brand-green font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{rev.date}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

