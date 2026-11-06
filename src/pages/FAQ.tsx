import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { generalFaqs } from '../data/faq';
import { ChevronDown } from 'lucide-react';
import { FinalCTA } from '../sections/FinalCTA';

type FAQCategory = 'Products' | 'Usage' | 'Ordering via Amazon' | 'Quality' | 'All';

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('All');
  const [openId, setOpenId] = useState<string | null>('p1');

  const categories: FAQCategory[] = ['All', 'Products', 'Usage', 'Ordering via Amazon', 'Quality'];
  const filtered = activeCategory === 'All' ? generalFaqs : generalFaqs.filter((f) => f.category === activeCategory);

  return (
    <>
      <SEO
        title="FAQ — Common Questions About ONCE HEALTH"
        description="Answers about ingredients, bioavailability, how to take, ordering on Amazon, and quality testing at ONCE HEALTH."
      />

      <section className="pt-32 pb-20 bg-bg text-center">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
            Frequently Asked Questions
          </span>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-ink tracking-tightest mb-5">
            Clear answers.
          </h1>
          <p className="text-base text-ink-muted leading-relaxed">
            Find responses about our formulas, bioavailability science, how to take ONCE, and ordering through Amazon.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-bg">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-heading font-semibold rounded-brand transition-all border ${
                  activeCategory === cat
                    ? 'bg-ink text-surface border-ink'
                    : 'bg-surface text-ink-muted border-line hover:border-ink hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion Items grouped by category */}
          {categories.filter(c => c !== 'All').map((cat) => {
            const catItems = filtered.filter((f) => f.category === cat);
            if (catItems.length === 0) return null;
            return (
              <div key={cat} className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-brand-green">{cat}</span>
                  <div className="flex-1 h-px bg-line" />
                </div>
                <div className="space-y-3">
                  {catItems.map((faq) => {
                    const isOpen = openId === faq.id;
                    return (
                      <div key={faq.id} className="rounded-brand border border-line bg-surface overflow-hidden">
                        <button
                          onClick={() => setOpenId(isOpen ? null : faq.id)}
                          className="w-full py-5 px-6 flex items-center justify-between text-left font-heading font-semibold text-ink text-sm sm:text-base hover:text-ink/80 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span className="pr-4">{faq.question}</span>
                          <ChevronDown className={`w-5 h-5 text-ink-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6 pt-1 text-sm text-ink-muted leading-relaxed border-t border-line/40">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="mt-12 p-6 bg-surface border border-line rounded-2xl text-center">
            <p className="text-sm text-ink-muted mb-3">Can't find what you're looking for?</p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-ink underline hover:text-brand-green transition-colors">
              Contact us directly →
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
};

export default FAQ;

