import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ritualSteps = [
  {
    step: '01',
    title: 'Take 2 Capsules',
    subtitle: 'Morning Foundation',
    description: 'Two capsules give you the full daily serving: 20 vitamins and minerals plus three targeted blends. Sensitive? Start with one.',
    image: '/images/ritual-capsules.webp',
  },
  {
    step: '02',
    title: 'With a Meal',
    subtitle: 'Maximized Assimilation',
    description: 'Take your capsules with a meal — the label recommends taking ONCE with food.',
    image: '/images/ritual-meal.webp',
  },
  {
    step: '03',
    title: 'Every Single Day',
    subtitle: 'Compound Longevity',
    description: 'Consistency is the active ingredient. Daily replenishment sustains cellular equilibrium, ATP energy, and calm.',
    image: '/images/ritual-everyday.webp',
  },
];

export const DailyRitual: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia(section);

    mm.add(
      { desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' },
      (context) => {
        const isDesktop = Boolean(
          (context.conditions as { desktop?: boolean }).desktop
        );

        // ---------- Header: fade-up + stagger ----------
        if (headerRef.current) {
          const children = Array.from(headerRef.current.children);
          gsap.fromTo(
            children,
            { y: isDesktop ? 26 : 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: isDesktop ? 0.8 : 0.6,
              ease: 'power3.out',
              stagger: 0.1,
              immediateRender: false,
              scrollTrigger: {
                trigger: headerRef.current,
                start: isDesktop ? 'top 85%' : 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // ---------- Cards ----------
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

        if (isDesktop) {
          // Desktop: all three rise from below together, staggered
          gsap.fromTo(
            cards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.12,
              immediateRender: false,
              scrollTrigger: {
                trigger: cards[0],
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          );
        } else {
          // Mobile: alternate left/right, each card triggers on its own scroll
          const offset = 26;
          cards.forEach((card, i) => {
            const fromX = i % 2 === 0 ? -offset : offset;
            gsap.fromTo(
              card,
              { x: fromX, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                immediateRender: false,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                },
              }
            );
          });
        }

        // Recalculate trigger positions after lazy images load
        ScrollTrigger.refresh();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
            The Daily Ritual
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-ink tracking-tight">
            Effortless. Exact. Once.
          </h2>
          <p className="text-base text-ink-muted mt-3">
            How to incorporate ONCE into your morning routine for peak absorption.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ritualSteps.map((step, i) => (
            <div
              key={step.step}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group bg-surface rounded-2xl border border-line p-6 flex flex-col justify-between shadow-soft hover:shadow-card transition-all duration-300 will-change-transform"
            >
              <div>
                {/* Step Image */}
                <div className="relative h-60 w-full rounded-brand overflow-hidden mb-6 bg-[#ECE8E1]">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-ink/10 pointer-events-none" />
                  <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-brand text-xs font-heading font-bold text-ink border border-line">
                    Step {step.step}
                  </div>
                </div>

                <span className="text-xs font-heading font-semibold uppercase tracking-wider text-brand-green block mb-2">
                  {step.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-line/60 flex items-center justify-between text-xs text-ink-muted">
                <span>ONCE Protocol</span>
                <span className="font-medium text-ink">30-second habit</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};