import React from 'react';
import { Check, X } from 'lucide-react';

/**
 * ONCE vs. typical drugstore multivitamins.
 * Generic category comparison (no competitor brand names, so no trademark / claim risk).
 */
const rows = [
  { feature: 'Folate form', once: 'Calcium 5-MTHF (methylated folate)', typical: 'Often synthetic folic acid' },
  { feature: 'Vitamin B12 form', once: 'Methylcobalamin', typical: 'Cyanocobalamin' },
  { feature: 'Magnesium', once: 'Magnesium glycinate', typical: 'Often magnesium oxide' },
  { feature: 'Botanical blends', once: 'Support, immune & antioxidant fruit blends', typical: 'Vitamins and minerals only' },
  { feature: 'Formulated for', once: 'Separate Women’s and Men’s formulas', typical: 'One-size-fits-all or age-banded' },
  { feature: 'Free from', once: '0 Gluten · 0 Dairy', typical: 'Varies by brand' },
  { feature: 'Testing', once: 'Third party tested, COA for every batch', typical: 'Varies by brand' },
];

export const VsTypicalMultis: React.FC = () => (
  <section className="py-20 lg:py-24 bg-surface border-t border-line">
    <div className="max-w-5xl mx-auto px-5 sm:px-8">
      <div className="text-center mb-12">
        <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
          Why ONCE
        </span>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight">
          ONCE vs. a typical drugstore multi
        </h2>
        <p className="mt-4 text-sm text-ink-muted max-w-xl mx-auto leading-relaxed">
          Most multivitamins are built to hit a price. ONCE is built around active, methylated forms — with every amount on the label.
        </p>
      </div>

      <div className="rounded-2xl border border-line overflow-hidden shadow-soft">
        <div className="grid grid-cols-[1.1fr_1.4fr_1.4fr] bg-bg border-b border-line text-[11px] font-heading font-semibold uppercase tracking-eyebrow">
          <div className="px-4 sm:px-6 py-4 text-ink-muted" />
          <div className="px-4 sm:px-6 py-4 border-l border-line text-ink">ONCE HEALTH</div>
          <div className="px-4 sm:px-6 py-4 border-l border-line text-ink-muted">Typical multivitamin</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.feature}
            className={`grid grid-cols-[1.1fr_1.4fr_1.4fr] border-b border-line/60 last:border-b-0 ${
              i % 2 === 0 ? 'bg-white' : 'bg-bg/50'
            }`}
          >
            <div className="px-4 sm:px-6 py-4 text-xs font-heading font-semibold text-ink uppercase tracking-wide">
              {r.feature}
            </div>
            <div className="px-4 sm:px-6 py-4 text-xs text-ink border-l border-line/60 flex items-start gap-2 leading-relaxed">
              <Check className="w-4 h-4 mt-0.5 shrink-0 text-brand-green" />
              <span>{r.once}</span>
            </div>
            <div className="px-4 sm:px-6 py-4 text-xs text-ink-muted border-l border-line/60 flex items-start gap-2 leading-relaxed">
              <X className="w-4 h-4 mt-0.5 shrink-0 text-ink/30" />
              <span>{r.typical}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-ink-muted text-center">
        Comparison reflects common formulations in the category. *These statements have not been evaluated by the Food and Drug Administration.
      </p>
    </div>
  </section>
);

/** 3-step "how buying works" – the client's checkout flow is Amazon only. */
export const HowToBuy: React.FC = () => {
  const steps = [
    { n: '01', title: 'Pick your formula', text: 'Choose Women’s or Men’s Multi. Both are a 30-day supply of 60 capsules.' },
    { n: '02', title: 'Find us on Amazon', text: 'Our official Amazon listing is coming soon — one tap from any product page once it’s live.' },
    { n: '03', title: 'Check out with Amazon', text: 'Pay with your Amazon account. Subscribe & Save will be available at launch, and Amazon’s delivery and return policies apply.' },
  ];
  return (
    <section className="py-20 bg-bg border-t border-line">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
            How ordering works
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight">
            Three steps, coming soon on Amazon
          </h2>
        </div>
        <ol data-reveal-children className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-line bg-surface p-7">
              <span className="font-mono text-xs text-brand-green font-bold">{s.n}</span>
              <h3 className="mt-3 text-lg font-heading font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
