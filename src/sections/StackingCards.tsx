import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StackingCardData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
  image: string;
  accent: string;
}

const cardsData: StackingCardData[] = [
  {
    number: '01',
    title: 'Methylated B12 & Folate',
    subtitle: 'Active forms your body can use',
    description: 'Vitamin B12 as methylcobalamin (27 mcg) and folate as calcium 5-MTHF (667 mcg DFE) — the active, methylated forms, so your body does not need to convert them first.*',
    keywords: ['Bioactive', 'Absorbable', 'Daily'],
    image: '/images/card-b12-folate.webp',
    accent: '#49BC39',
  },
  {
    number: '02',
    title: 'Magnesium Glycinate',
    subtitle: 'A gentle, well-tolerated form',
    description: 'Magnesium bound to the amino acid glycine — a form known for being gentle. Each serving gives 50 mg, alongside zinc, selenium, copper, manganese, chromium and molybdenum.*',
    keywords: ['Calm', 'Balance', 'Gentle'],
    image: '/images/card-magnesium.webp',
    accent: '#9C3D73',
  },
  {
    number: '03',
    title: 'Energy & Vitality',
    subtitle: 'A full B-complex',
    description: 'B1, B2, niacin, B6, B12, biotin and pantothenic acid to support normal energy metabolism, plus vitamins A, C, D and E — for energy, vitality and daily balance.*',
    keywords: ['Daily', 'Focus', 'Support'],
    image: '/images/card-energy.webp',
    accent: '#2F6B8C',
  },
  {
    number: '04',
    title: 'Clean & Tested',
    subtitle: '0 gluten · 0 dairy · third party tested',
    description: '0 gluten and 0 dairy, made in a cGMP-certified facility and third party tested. Every batch has its own Certificate of Analysis you can check with the batch number on your bottle.',
    keywords: ['0 Gluten', '0 Dairy', 'Third party tested'],
    image: '/images/card-clean.webp',
    accent: '#49BC39',
  },
  {
    number: '05',
    title: 'Made for Him. Made for Her.',
    subtitle: 'Targeted support blends',
    description: 'Women’s Multi adds a Female Support Blend (wild yam, red clover, cranberry). Men’s Multi adds a Male Support Blend (stinging nettle root, saw palmetto). Both include immune and antioxidant fruit blends.*',
    keywords: ['Targeted', 'Two formulas', 'One habit'],
    image: '/images/card-him-her.webp',
    accent: '#211D1D',
  },
];

// Responsive top offset: tighter stack on phones, roomier on desktop
const topFor = (i: number, isDesktop: boolean) =>
  isDesktop ? 104 + i * 18 : 76 + i * 12;

export const StackingCards: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dimRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia(container);

    // Same stacking behaviour on every screen size — only the `top` offsets differ.
    mm.add(
      { desktop: '(min-width: 1024px)', mobile: '(max-width: 1023px)' },
      (context) => {
        const isDesktop = Boolean(
          (context.conditions as { desktop?: boolean }).desktop
        );

        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          // Apply responsive top offset (was in inline style before, now per-breakpoint)
          card.style.top = `${topFor(index, isDesktop)}px`;

          // Sync left progress list with the card currently on top
          ScrollTrigger.create({
            trigger: card,
            start: isDesktop ? 'top 62%' : 'top 72%',
            onEnter: () => setActive(index),
            onLeaveBack: () => setActive(Math.max(0, index - 1)),
          });

          const nextCard = cardsRef.current[index + 1];
          if (!nextCard) return;

          const trigger = {
            trigger: nextCard,
            start: 'top bottom',
            end: () => `top ${topFor(index + 1, isDesktop)}px`,
            scrub: true,
            invalidateOnRefresh: true,
          };

          // Slightly stronger shrink on mobile (smaller cards need a bigger cue)
          gsap.to(card, {
            scale: isDesktop ? 0.95 : 0.94,
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: trigger,
          });

          const dim = dimRefs.current[index];
          if (dim) gsap.to(dim, { opacity: 0.1, ease: 'none', scrollTrigger: trigger });
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-bg relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: intro + progress */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
              What's Inside
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-ink tracking-tight leading-[1.08]">
              Every ingredient has a reason.
            </h2>
            <p className="text-base text-ink-muted mt-4 max-w-md">
              Every vitamin, mineral and blend is listed on the label, with its amount.
            </p>

            {/* Progress list — full on desktop, compact dot rail on mobile */}
            <ol className="hidden lg:block mt-10 space-y-1">
              {cardsData.map((card, i) => (
                <li
                  key={card.number}
                  className={`flex items-center gap-4 py-2.5 border-l-2 pl-4 transition-all duration-500 ${
                    active === i ? 'border-ink opacity-100' : 'border-line opacity-45'
                  }`}
                  style={active === i ? { borderColor: card.accent } : undefined}
                >
                  <span className="text-xs font-heading font-bold tabular-nums text-ink-muted">
                    {card.number}
                  </span>
                  <span className="text-sm font-heading font-semibold text-ink">
                    {card.title}
                  </span>
                </li>
              ))}
            </ol>

            {/* Mobile: compact dot indicator */}
            <div className="lg:hidden mt-5 flex items-center gap-2">
              {cardsData.map((card, i) => (
                <span
                  key={card.number}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? 'w-6' : 'w-1.5'
                  }`}
                  style={{
                    backgroundColor: active === i ? card.accent : 'rgba(33,29,29,0.18)',
                  }}
                />
              ))}
            </div>

            <Link
              to="/science"
              className="hidden lg:inline-flex items-center gap-2 mt-8 text-sm font-heading font-semibold text-ink hover:text-brand-green transition-colors"
            >
              Read the science <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Right: the stack — same on mobile and desktop now */}
          <div data-no-reveal className="lg:col-span-8 pb-4 lg:pb-24">
            {cardsData.map((card, i) => (
              <div
                key={card.number}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                style={{
                  // top set per-breakpoint from JS
                  backgroundColor: '#FFFFFF',
                  backgroundImage: `linear-gradient(135deg, ${card.accent}14 0%, rgba(255,255,255,0) 55%)`,
                }}
                className="relative sticky bg-surface rounded-2xl border border-line shadow-card overflow-hidden mb-4 lg:mb-10 will-change-transform min-h-[440px]"
              >
                {/* Dims the card while the next one slides over it */}
                <div
                  ref={(el) => {
                    dimRefs.current[i] = el;
                  }}
                  className="absolute inset-0 bg-ink opacity-0 pointer-events-none z-20"
                />

                <div className="grid grid-cols-1 md:grid-cols-12 h-full">
                  {/* Text */}
                  <div className="md:col-span-7 p-7 sm:p-10 flex flex-col justify-between order-2 md:order-1">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="inline-flex items-center gap-2 text-[11px] font-heading font-semibold uppercase tracking-wider text-ink-muted">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: card.accent }}
                          />
                          {card.subtitle}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink tracking-tight mb-4">
                        {card.title}
                      </h3>
                      <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-8">
                      {card.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-3 py-1 bg-surface/80 text-ink text-xs font-heading font-medium tracking-wide rounded-full border"
                          style={{ borderColor: `${card.accent}55` }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="md:col-span-5 p-3 sm:p-4 order-1 md:order-2">
                    <div className="relative h-56 sm:h-64 md:h-full md:min-h-[280px] rounded-xl overflow-hidden bg-[#EFECE6]">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover lg:transition-transform lg:duration-700 lg:hover:scale-105"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(to top, ${card.accent}40 0%, transparent 45%)`,
                        }}
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-sm text-[11px] font-heading font-bold text-ink tabular-nums">
                        {card.number} / {String(cardsData.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};