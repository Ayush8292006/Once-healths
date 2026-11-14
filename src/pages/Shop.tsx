import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { products, comparisonData } from '../data/products';
import { BottleImage } from '../components/BottleImage';
import { AmazonButton } from '../components/AmazonButton';
import { Check } from 'lucide-react';
import { AMAZON_STORE_URL } from '../data/amazon';
import { HowToBuy } from '../sections/VsTypicalMultis';

const Shop: React.FC = () => {
  const womens = products.find((p) => p.gender === 'women')!;
  const mens = products.find((p) => p.gender === 'men')!;

  return (
    <>
      <SEO
        title="Shop — Compare Women's & Men's Multi"
        description="Compare ONCE HEALTH Women's Multi and Men's Multi side by side. Find the right bioactive multivitamin formula for your biology."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-bg text-center">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
            ONCE HEALTH — Shop
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-ink tracking-tightest mb-5">
            Find your formula.
          </h1>
          <p className="text-base text-ink-muted leading-relaxed max-w-xl mx-auto">
            Two targeted formulas. One clean daily habit. Compare side by side and choose the bioactive foundation built for your biology.
          </p>
        </div>
      </section>

      {/* Product Cards */}
      <section className="pb-24 bg-bg">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((p) => (
              <div
                key={p.slug}
                className="relative rounded-2xl border border-line p-8 sm:p-10 flex flex-col justify-between overflow-hidden hover:shadow-card transition-shadow duration-300"
                style={{ backgroundColor: p.gender === 'women' ? 'rgba(156,61,115,0.05)' : 'rgba(47,107,140,0.05)' }}
              >
                {/* Top accent */}
                <div className="h-1 rounded-full mb-8" style={{ backgroundColor: p.gender === 'women' ? '#9C3D73' : '#2F6B8C' }} />

                <div className="flex flex-col sm:flex-row gap-8 items-center mb-8">
                  {/* Bottle */}
                  <div className="w-40 shrink-0">
                    <BottleImage gender={p.gender} alt={p.name} withShadow interactive />
                  </div>

                  <div>
                    <span className={`text-xs font-heading font-semibold uppercase tracking-eyebrow ${p.gender === 'women' ? 'text-women' : 'text-men'} block mb-2`}>
                      {p.gender === 'women' ? 'For Her' : 'For Him'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-1">{p.name}</h2>
                    <p className="text-sm text-ink-muted mb-4">{p.tagline}</p>
                    <ul className="space-y-2">
                      {p.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-ink-muted">
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${p.gender === 'women' ? 'text-women' : 'text-men'}`} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 items-center pt-5 border-t border-line">
                  <Link
                    to={`/products/${p.slug}`}
                    className="px-5 py-3 bg-surface border border-line text-ink text-sm font-heading font-semibold rounded-brand hover:border-ink transition-colors"
                  >
                    View Full Details
                  </Link>
                  <AmazonButton
                    url={p.amazonUrl}
                    variant={p.gender === 'women' ? 'women' : 'men'}
                    label="Buy on Amazon"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-surface border-t border-line">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
              Head to Head
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight">
              Formula comparison
            </h2>
          </div>

          <div className="rounded-2xl border border-line overflow-hidden shadow-soft">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-bg border-b border-line">
              <div className="px-6 py-5 text-sm font-heading font-semibold text-ink-muted uppercase tracking-eyebrow" />
              <div className="px-6 py-5 text-center border-l border-line">
                <span className="text-[11px] font-heading font-semibold uppercase tracking-eyebrow text-women block mb-1">For Her</span>
                <span className="text-base font-heading font-bold text-ink">{womens.name}</span>
              </div>
              <div className="px-6 py-5 text-center border-l border-line">
                <span className="text-[11px] font-heading font-semibold uppercase tracking-eyebrow text-men block mb-1">For Him</span>
                <span className="text-base font-heading font-bold text-ink">{mens.name}</span>
              </div>
            </div>

            {/* Rows */}
            {comparisonData.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-b border-line/60 ${i % 2 === 0 ? 'bg-white' : 'bg-bg/50'}`}
              >
                <div className="px-6 py-4 text-xs font-heading font-semibold text-ink uppercase tracking-wide">
                  {row.feature}
                </div>
                <div className="px-6 py-4 text-xs text-ink-muted border-l border-line/60 leading-relaxed">
                  {row.womens}
                </div>
                <div className="px-6 py-4 text-xs text-ink-muted border-l border-line/60 leading-relaxed">
                  {row.mens}
                </div>
              </div>
            ))}

            {/* CTA row */}
            <div className="grid grid-cols-3 bg-bg">
              <div className="px-6 py-5" />
              <div className="px-6 py-5 border-l border-line flex flex-col items-center gap-2">
                <AmazonButton url={womens.amazonUrl} variant="women" size="sm" />
                <Link to={`/products/${womens.slug}`} className="text-xs text-ink-muted hover:text-ink underline">
                  Learn More →
                </Link>
              </div>
              <div className="px-6 py-5 border-l border-line flex flex-col items-center gap-2">
                <AmazonButton url={mens.amazonUrl} variant="men" size="sm" />
                <Link to={`/products/${mens.slug}`} className="text-xs text-ink-muted hover:text-ink underline">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowToBuy />

      {/* Ordering Note */}
      <section className="py-16 bg-ink text-surface text-center">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <h3 className="text-2xl font-heading font-bold mb-4 text-surface">
            Coming soon on Amazon
          </h3>
          <p className="text-surface/70 text-sm mb-6 leading-relaxed">
            Every order will be handled through Amazon — with secure Amazon checkout, Subscribe &amp; Save, and Amazon's delivery and return policies. We're launching very soon.
          </p>
          <AmazonButton url={AMAZON_STORE_URL} label="Visit Amazon Storefront" size="lg" />
        </div>
      </section>
    </>
  );
};

export default Shop;
