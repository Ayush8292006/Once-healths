import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generalFaqs } from '../data/faq';
import { ChevronDown, ArrowRight } from 'lucide-react';

export const FAQPreview: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('p1');

  // Show first 4 FAQs
  const previewItems = generalFaqs.slice(0, 4);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-surface border-t border-line">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
            Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-ink-muted mt-3">
            Clear answers about bioavailable forms, daily dosage, and ordering.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 mb-12">
          {previewItems.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-brand border border-line bg-bg/50 transition-colors duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left text-base sm:text-lg font-heading font-semibold text-ink hover:text-ink/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-ink-muted transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-ink-muted leading-relaxed border-t border-line/40 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Link to full FAQ page */}
        <div className="text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-ink hover:text-brand-green transition-colors pb-1 border-b border-ink/30 hover:border-brand-green"
          >
            <span>View all questions &amp; answers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

