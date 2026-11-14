import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const qualitySteps = [
  {
    step: '01',
    title: 'Third Party Tested',
    description:
      'ONCE is tested by an independent third-party laboratory. Every batch has its own Certificate of Analysis — enter the batch number from your bottle on our Verify Batch page to see it.',
    image: '/images/quality-testing.webp',
    icon: CheckCircle2,
  },
  {
    step: '02',
    title: 'Globally Sourced Ingredients',
    description:
      'Methylated B12 and folate, magnesium glycinate and botanical extracts are sourced from suppliers around the world, and every ingredient is listed on the label.',
    image: '/images/quality-sourcing.webp',
    icon: Award,
  },
  {
    step: '03',
    title: 'cGMP-Certified Facility',
    description:
      'Proudly manufactured in India in a cGMP-certified facility, following current Good Manufacturing Practices from raw material to sealed bottle.',
    image: '/images/quality-manufacturing.webp',
    icon: ShieldAlert,
  },
];

export const QualityScience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Entrance animations — left/right slide-in
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia(section);

    mm.add(
      { desktop: '(min-width: 1024px)', mobile: '(max-width: 1023px)' },
      (context) => {
        const isDesktop = Boolean(
          (context.conditions as { desktop?: boolean }).desktop
        );

        // Distance / duration differ by breakpoint
        const offset = isDesktop ? 64 : 22;
        const dur = isDesktop ? 0.9 : 0.75;
        const ease = 'power3.out';

        // ---------- LEFT COLUMN: slides in from the left ----------
        if (leftColRef.current) {
          gsap.from(leftColRef.current, {
            x: -offset,
            opacity: 0,
            duration: dur,
            ease,
            scrollTrigger: {
              trigger: leftColRef.current,
              start: isDesktop ? 'top 80%' : 'top 88%',
              toggleActions: 'play none none none',
            },
          });
        }

        // ---------- CARDS: slide from right on desktop, alternating on mobile ----------
        cardsRef.current.forEach((card, i) => {
          if (!card) return;

          // Desktop: all from right. Mobile: alternate L/R for rhythm.
          const fromX = isDesktop ? offset : i % 2 === 0 ? -offset : offset;

          gsap.from(card, {
            x: fromX,
            opacity: 0,
            duration: dur,
            ease,
            delay: isDesktop ? i * 0.08 : 0, // stagger only on desktop
            scrollTrigger: {
              trigger: card,
              start: isDesktop ? 'top 82%' : 'top 90%',
              toggleActions: 'play none none none',
            },
          });
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-surface border-y border-line relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Sticky Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Sticky) — slides in from left */}
          <div ref={leftColRef} className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-brand-green block mb-3">
              Traceability &amp; Standards
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-ink tracking-tight mb-6">
              Quality you can trace.
            </h2>
            <p className="text-base text-ink-muted leading-relaxed mb-8">
              A supplement should never be an act of blind faith. Every ingredient and amount is printed on the label, and every batch can be checked against its own lab report.
            </p>
            <div className="p-6 bg-bg rounded-brand border border-line">
              <h4 className="text-sm font-heading font-bold text-ink mb-1.5">
                Check your batch
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Enter the batch number from your bottle to view its Certificate of Analysis (COA) and claim report.
              </p>
              <Link
                to="/verify"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-ink hover:text-brand-green transition-colors"
              >
                Verify your batch <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column (Scrolling Cards) — slide in */}
          <div className="lg:col-span-7 space-y-12">
            {qualitySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  className="bg-bg rounded-2xl border border-line overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300"
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-[#ECE8E1]">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3.5 py-1.5 rounded-brand border border-line text-xs font-heading font-bold text-ink">
                      Step {step.step}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2.5 mb-3 text-brand-green">
                      <Icon className="w-5 h-5 text-brand-green" />
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};