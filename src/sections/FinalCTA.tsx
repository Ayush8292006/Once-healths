import React from 'react';
import { Link } from 'react-router-dom';
import { ConcentricRings } from '../components/ConcentricRings';

/** Closing section on every page — copy + one link to the Shop page (no bottles, no Amazon buttons). */
export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-28 bg-ink overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute -left-24 -top-24 opacity-10 pointer-events-none">
        <ConcentricRings size={500} color="#FFFFFF" animateOnScroll rings={4} />
      </div>
      <div className="absolute -right-24 -bottom-24 opacity-10 pointer-events-none">
        <ConcentricRings size={420} color="#49BC39" animateOnScroll rings={4} />
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10 text-center">
        <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-brand-green block mb-4">
          Your Daily Ritual Starts Here
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-surface tracking-tightest leading-[1.06] mb-6">
          Start your daily{' '}
          <span className="text-brand-green italic font-medium">ONCE.</span>
        </h2>
        <p className="text-base text-surface/70 leading-relaxed mb-10 max-w-lg mx-auto">
          Two formulas, one daily habit. Methylated B12 &amp; folate, magnesium glycinate and 20
          vitamins and minerals — two capsules with a meal.*
        </p>
        <Link
          to="/shop"
          className="btn-roll inline-flex items-center px-7 py-4 bg-surface text-ink font-heading font-medium text-sm rounded-brand hover:bg-surface/90 transition-colors"
        >
          <div className="relative overflow-hidden h-5 inline-flex items-center">
            <div className="btn-roll-inner">
              <span className="btn-roll-text h-5">Find your formula →</span>
              <span className="btn-roll-text h-5">Find your formula →</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};
