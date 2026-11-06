import React from 'react';
import { SEO } from '../components/SEO';
import { ConcentricRings } from '../components/ConcentricRings';
import { FinalCTA } from '../sections/FinalCTA';
import { BackButton } from '../components/BackButton';
import { Heart, Eye, FlaskConical } from 'lucide-react';
import { AMAZON_STORE_URL } from '../data/amazon';

const values = [
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Every ingredient is named on the label, and every batch has a Certificate of Analysis you can look up.',
  },
  {
    icon: FlaskConical,
    title: 'Science',
    description: 'We reference peer-reviewed bioavailability research in every formulation decision. Not marketing—molecular evidence.',
  },
  {
    icon: Heart,
    title: 'Simplicity',
    description: 'One supplement. Two formulas. Taken once. We believe the best habit is the one you actually keep.',
  },
];

const About: React.FC = () => {
  return (
    <>
      <SEO
        title="Our Story — ONCE HEALTH"
        description="Why we built ONCE HEALTH. The story behind two products, one daily habit, and a commitment to bioavailable nutrition without compromise."
      />

      {/* Hero */}
      <section className="relative pt-32 pb-0 bg-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-6 sm:mb-8">
          <BackButton />
        </div>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center pb-16">
          <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-ink tracking-tightest leading-[1.06] mb-6">
            Health, simplified —<br />
            <span className="italic font-medium text-ink/70">once a day.</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto">
            ONCE began with a simple frustration: supplements that make bold claims with cheap synthetic ingredients that cells can't even use. We set out to build a cleaner standard.
          </p>
        </div>

        {/* Story Hero Image */}
        <div className="relative h-72 sm:h-96 md:h-[480px] overflow-hidden">
          <img
            src="/images/story-morning.webp"
            alt="Morning ritual — a bowl of oatmeal with coffee"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ink/15" />
          {/* Subtle pull-quote overlaid */}
          <div className="absolute bottom-8 left-8 right-8 max-w-md bg-surface/90 backdrop-blur-sm p-6 rounded-brand border border-line shadow-lift">
            <p className="text-sm sm:text-base font-heading font-semibold text-ink leading-relaxed">
              "The supplement industry profits from confusion. We profit from clarity."
            </p>
            <p className="text-xs text-ink-muted mt-2">— ONCE HEALTH Founding Vision</p>
          </div>
        </div>
      </section>

      {/* Brand Mission */}
      <section className="py-24 bg-surface border-t border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
                The Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight mb-6">
                Why we exist.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-ink-muted leading-relaxed">
                <p>
                  Most multivitamins are built to a price point. Many use vitamin forms the body has to convert first, and it is often hard to know what was actually tested.
                </p>
                <p>
                  ONCE was founded to fill a gap: a premium, label-transparent daily multivitamin engineered around bioavailability research—for both women and men—without the noise of 30-ingredient "super stacks" or celebrity partnerships.
                </p>
                <p>
                  Two precise formulas. Available where people already shop. Taken once a day. That's the entire model.
                </p>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <ConcentricRings size={440} color="#49BC39" rings={4} />
              </div>
              <div className="relative z-10 bg-bg rounded-2xl border border-line p-10 shadow-soft max-w-sm text-center">
                <div className="text-5xl font-heading font-bold text-ink mb-1">2</div>
                <div className="text-xs font-heading uppercase tracking-eyebrow text-ink-muted mb-6">Targeted formulas</div>
                <div className="text-5xl font-heading font-bold text-brand-green mb-1">1</div>
                <div className="text-xs font-heading uppercase tracking-eyebrow text-ink-muted mb-6">Daily habit</div>
                <div className="text-5xl font-heading font-bold text-women mb-1">0</div>
                <div className="text-xs font-heading uppercase tracking-eyebrow text-ink-muted">Compromises</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-bg border-t border-line">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
              Our Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight">
              What guides every decision.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-surface rounded-2xl border border-line p-8 flex flex-col gap-5 shadow-soft hover:shadow-card transition-shadow">
                  <div className="w-12 h-12 rounded-brand bg-brand-green/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-ink mb-2">{v.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{v.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Amazon Distribution note */}
      <section className="py-16 bg-surface border-t border-line text-center">
        <div className="max-w-xl mx-auto px-5 sm:px-8">
          <h3 className="text-2xl font-heading font-bold text-ink mb-3">Available exclusively on Amazon</h3>
          <p className="text-sm text-ink-muted leading-relaxed mb-6">
            We distribute through Amazon to give every customer the confidence of a trusted platform, fast delivery, and reliable customer service—without asking anyone to enter credit card details on an unknown site.
          </p>
          <a
            href={AMAZON_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-surface text-sm font-heading font-bold rounded-brand hover:bg-ink/85 transition-colors"
          >
            Shop on Amazon →
          </a>
        </div>
      </section>

      <FinalCTA />
    </>
  );
};

export default About;

