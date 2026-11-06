import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { DISTRIBUTOR } from '../data/products';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { AMAZON_SUPPORT_URL } from '../data/amazon';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only — no backend
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Contact — ONCE HEALTH"
        description="Get in touch with ONCE HEALTH. Questions about our formulas, ingredients, or ordering on Amazon."
      />

      <section className="pt-32 pb-24 bg-bg">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Info */}
            <div>
              <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
                Get in Touch
              </span>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-ink tracking-tightest mb-6">
                We read everything.
              </h1>
              <p className="text-base text-ink-muted leading-relaxed mb-8 max-w-md">
                Have a question about our ingredients, formulation rationale, or ordering on Amazon? Reach out and a real person will reply.
              </p>

              <div className="space-y-5">
                <div className="p-5 bg-surface rounded-brand border border-line">
                  <h3 className="text-sm font-heading font-bold text-ink mb-1">Order Questions</h3>
                  <p className="text-xs text-ink-muted mb-2">
                    For shipping, returns, or order status—all orders are fulfilled by Amazon and can be managed through your Amazon account.
                  </p>
                  <a
                    href={AMAZON_SUPPORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-ink inline-flex items-center gap-1 underline hover:text-brand-green transition-colors"
                  >
                    Amazon Customer Service <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="p-5 bg-surface rounded-brand border border-line">
                  <h3 className="text-sm font-heading font-bold text-ink mb-1">Email Support</h3>
                  <a
                    href={`mailto:${DISTRIBUTOR.email}`}
                    className="text-sm font-medium text-ink underline hover:text-brand-green transition-colors"
                  >
                    {DISTRIBUTOR.email}
                  </a>
                  <p className="text-xs text-ink-muted mt-3 leading-relaxed">
                    {DISTRIBUTOR.name}
                    <br />
                    {DISTRIBUTOR.address.join(', ')}
                  </p>
                </div>
                <div className="p-5 bg-surface rounded-brand border border-line">
                  <h3 className="text-sm font-heading font-bold text-ink mb-1">Press Inquiries</h3>
                  <p className="text-xs text-ink-muted">Use the form below and select "Media" as the subject.</p>
                </div>
                <div className="p-5 bg-surface rounded-brand border border-line">
                  <h3 className="text-sm font-heading font-bold text-ink mb-1">Response Time</h3>
                  <p className="text-xs text-ink-muted">Typical response within 1-2 business days.</p>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20 bg-surface rounded-2xl border border-line shadow-soft px-8">
                  <CheckCircle2 className="w-14 h-14 text-brand-green mb-5" />
                  <h2 className="text-2xl font-heading font-bold text-ink mb-3">Message Received</h2>
                  <p className="text-sm text-ink-muted leading-relaxed max-w-sm">
                    Thank you for reaching out. We'll review your message and reply within 1-2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-line shadow-soft p-8 space-y-5">
                  <div>
                    <label className="text-xs font-heading font-semibold uppercase tracking-wide text-ink-muted block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm bg-bg border border-line rounded-brand focus:outline-none focus:border-ink transition-colors placeholder:text-ink-muted/50"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-heading font-semibold uppercase tracking-wide text-ink-muted block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm bg-bg border border-line rounded-brand focus:outline-none focus:border-ink transition-colors placeholder:text-ink-muted/50"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-heading font-semibold uppercase tracking-wide text-ink-muted block mb-1.5">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm bg-bg border border-line rounded-brand focus:outline-none focus:border-ink transition-colors text-ink"
                    >
                      <option value="">Select a topic</option>
                      <option value="ingredients">Ingredients / Formula</option>
                      <option value="amazon">Amazon Orders</option>
                      <option value="media">Media / Press</option>
                      <option value="wholesale">Wholesale / Partnerships</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-heading font-semibold uppercase tracking-wide text-ink-muted block mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 text-sm bg-bg border border-line rounded-brand focus:outline-none focus:border-ink transition-colors resize-none placeholder:text-ink-muted/50"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-ink text-surface font-heading font-bold text-sm rounded-brand hover:bg-ink/85 transition-colors active:scale-[0.99]"
                  >
                    Send Message
                  </button>
                  <p className="text-xs text-ink-muted text-center">
                    We respect your privacy. No third-party sharing.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

