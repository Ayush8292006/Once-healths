import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Instagram, Twitter, Facebook } from 'lucide-react';
import { ConcentricRings } from './ConcentricRings';
import { AMAZON_STORE_URL, AMAZON_LIVE } from '../data/amazon';
import { DISTRIBUTOR, LABEL_CLAIMS } from '../data/products';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#ECEAE5] text-ink overflow-hidden pt-20 pb-12 border-t border-line">
      {/* Background Decorative Rings */}
      <div className="absolute -right-32 -bottom-32 opacity-20 pointer-events-none">
        <ConcentricRings size={600} color="#211D1D" animateOnScroll={false} />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 pb-16 border-b border-line">
          {/* Brand Col (2 cols wide) — sits on the right */}
          <div className="lg:col-span-2 lg:order-last md:col-span-2 flex flex-col justify-between items-end text-right">
            <div>
              <Link to="/" className="inline-block mb-6">
                <img
                  src="/images/once-health-logo.svg"
                  alt="ONCE HEALTH"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-ink-muted text-sm leading-relaxed max-w-sm mb-6 ml-auto">
                One daily habit. Built for how you live. Advanced bioactive multivitamins for Women and Men.
              </p>
              <div className="flex items-center gap-3 justify-end">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center text-ink hover:text-brand-green hover:border-brand-green transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center text-ink hover:text-brand-green hover:border-brand-green transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center text-ink hover:text-brand-green hover:border-brand-green transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Nav Col 1: Shop */}
          <div>
            <h4 className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink mb-5">
              Shop
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/products/womens-multi" className="text-ink-muted hover:text-ink transition-colors">
                  Women's Multi
                </Link>
              </li>
              <li>
                <Link to="/products/mens-multi" className="text-ink-muted hover:text-ink transition-colors">
                  Men's Multi
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-ink-muted hover:text-ink transition-colors">
                  Compare Formulas
                </Link>
              </li>
              <li>
                {AMAZON_LIVE ? (
                  <a
                    href={AMAZON_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted hover:text-ink transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    <span>Amazon Storefront</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-ink-muted inline-flex items-center gap-1.5 font-medium">
                    Amazon Storefront
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface border border-line">Soon</span>
                  </span>
                )}
              </li>
            </ul>
          </div>

          {/* Nav Col 2: Learn */}
          <div>
            <h4 className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink mb-5">
              Learn
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/science" className="text-ink-muted hover:text-ink transition-colors">
                  The Science
                </Link>
              </li>
              <li>
                <Link to="/science#bioavailability" className="text-ink-muted hover:text-ink transition-colors">
                  Bioactive Forms
                </Link>
              </li>
              <li>
                <Link to="/science#testing" className="text-ink-muted hover:text-ink transition-colors">
                  Quality &amp; Testing
                </Link>
              </li>
              <li>
                <Link to="/verify" className="text-ink-muted hover:text-ink transition-colors">
                  Verify Batch / COA
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-ink-muted hover:text-ink transition-colors">
                  Common Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Col 3: Company */}
          <div>
            <h4 className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-ink-muted hover:text-ink transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ink-muted hover:text-ink transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-ink-muted hover:text-ink transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-ink-muted hover:text-ink transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Col 4: Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink mb-3">
              Stay Informed
            </h4>
            <p className="text-xs text-ink-muted mb-4 leading-relaxed">
              Substack-style insights on cellular longevity and micronutrient research. No spam.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-medium text-brand-green bg-surface p-2.5 rounded-brand border border-line">
                <Check className="w-4 h-4 text-brand-green" />
                <span>You're on the list. Thank you.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full text-xs px-3 py-2.5 bg-surface border border-line rounded-brand focus:outline-none focus:border-ink transition-colors placeholder:text-ink-muted/60"
                />
                <button
                  type="submit"
                  className="w-full text-xs font-heading font-semibold bg-ink text-surface py-2.5 rounded-brand hover:bg-ink/85 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal & FDA Mandated Disclaimers */}
        <div className="pt-10 pb-6 text-xs text-ink-muted leading-relaxed space-y-4">
          <p className="p-4 bg-surface/60 rounded-brand border border-line/60">
            * <strong className="text-ink">FDA Disclaimer:</strong> These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <p className="text-ink-muted/80">
            Consult a healthcare professional before use if you are under 18, pregnant or breastfeeding, taking medication, or have a medical condition. Keep out of reach of children. Do not use if safety seal is damaged or missing. Store in a cool, dry place.
          </p>
          <p className="text-ink-muted/80">
            “{LABEL_CLAIMS.madeIn}” Distributed by {DISTRIBUTOR.name}, {DISTRIBUTOR.address.join(', ')} ·{' '}
            <a href={`mailto:${DISTRIBUTOR.email}`} className="underline hover:text-ink transition-colors">
              {DISTRIBUTOR.email}
            </a>
          </p>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-4">
          <p>© {new Date().getFullYear()} {DISTRIBUTOR.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/disclaimer" className="hover:text-ink transition-colors">
              Health Disclaimer
            </Link>
            <Link to="/privacy" className="hover:text-ink transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-ink transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};