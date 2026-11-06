import React, { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BottleImage } from '../components/BottleImage';
import { ConcentricRings } from '../components/ConcentricRings';
import { Zap, Activity, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const callouts = [
  {
    icon: Zap,
    iconClass: 'text-brand-green',
    title: '01 — Energy & Vitality',
    body: 'A full B-complex — B1, B2, niacin, B6, B12, biotin and pantothenic acid — to support normal energy metabolism.*',
    side: 'left' as const,
  },
  {
    icon: Activity,
    iconClass: 'text-women',
    title: '02 — Methylated Forms',
    body: 'Folate as calcium 5-MTHF and B12 as methylcobalamin — the active forms, ready for your body to use.*',
    side: 'right' as const,
  },
  {
    icon: Heart,
    iconClass: 'text-men',
    title: '03 — Magnesium Glycinate',
    body: 'Magnesium bound to glycine, a gentle form — alongside zinc, selenium, chromium and more.*',
    side: 'left' as const,
  },
];

const Connector: React.FC<{ side: 'left' | 'right'; setRef: (el: HTMLSpanElement | null) => void }> = ({
  side,
  setRef,
}) => (
  <span
    ref={setRef}
    aria-hidden="true"
    className={`hidden md:block absolute top-1/2 h-px w-12 lg:w-20 bg-ink/35 ${
      side === 'left' ? 'left-full origin-left' : 'right-full origin-right'
    }`}
  >
    <span
      className={`absolute -top-[2.5px] w-1.5 h-1.5 rounded-full bg-ink/60 ${
        side === 'left' ? 'right-0' : 'left-0'
      }`}
    />
  </span>
);

export const PinnedBottleStory: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pinContentRef = useRef<HTMLDivElement>(null);
  const bottleWrapRef = useRef<HTMLDivElement>(null);
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([]);
  const connectorRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    const pinContent = pinContentRef.current;
    if (!container || !pinContent || reduced) return;

    const mm = gsap.matchMedia(container);

    mm.add(
      { desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' },
      (context) => {
        const isDesktop = Boolean(
          (context.conditions as { desktop?: boolean }).desktop
        );
        const cards = calloutRefs.current.filter(Boolean) as HTMLDivElement[];
        const lines = connectorRefs.current.filter(Boolean) as HTMLSpanElement[];

        gsap.set(bottleWrapRef.current, { transformPerspective: 900 });
        gsap.set(lines, { scaleX: 0 });

        // ---------------- DESKTOP (unchanged) ----------------
        if (isDesktop) {
          gsap.set(cards, { autoAlpha: 0, y: 28 });

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(
            bottleWrapRef.current,
            { y: 18, scale: 0.97, rotateY: -6 },
            { y: -10, scale: 1.04, rotateY: 8, duration: 3 },
            0
          );

          cards.forEach((card, i) => {
            const at = i * 1;
            tl.to(card, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, at);
            if (lines[i]) {
              tl.to(
                lines[i],
                { scaleX: 1, duration: 0.4, ease: 'power2.out' },
                at + 0.05
              );
            }
          });

          return;
        }

        // ---------------- MOBILE (smooth scroll, same layout) ----------------
        // Cards stay stacked in the same bottom slot.
        // Fix: bigger y-travel, cross-fade between cards (no blank frame),
        // smooth scrub (0.8 instead of true), bottle drift only y+scale.
        gsap.set(cards, { autoAlpha: 0, y: 44, scale: 0.96 });
        gsap.set(bottleWrapRef.current, { y: 12, scale: 0.98 });

        const mobileHeader = pinContent.querySelector('[data-mobile-header]');
        if (mobileHeader) gsap.set(mobileHeader, { autoAlpha: 0.55, y: 0 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8, // touch pe smooth catch-up, no 1:1 jitter
            invalidateOnRefresh: true,
          },
        });

        // Bottle: gentle drift, no rotateY on mobile
        tl.to(
          bottleWrapRef.current,
          { y: -16, scale: 1.03, duration: 3, ease: 'power1.inOut' },
          0
        );

        // Header: light drift-in cue so scroll feels alive from the first pixel
        if (mobileHeader) {
          tl.to(
            mobileHeader,
            { y: -18, autoAlpha: 1, duration: 0.4, ease: 'power2.out' },
            0
          );
        }

        // Cards: staggered, cross-fading (no blank gap between them)
        const step = 0.9;
        cards.forEach((card, i) => {
          const inAt = i * step;
          const outAt = inAt + 0.62;

          tl.to(
            card,
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: 'power3.out' },
            inAt
          );

          if (i < cards.length - 1) {
            tl.to(
              card,
              { autoAlpha: 0, y: -32, scale: 0.98, duration: 0.36, ease: 'power3.in' },
              outAt
            );
          }
        });
      }
    );

    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      ref={containerRef}
      data-no-reveal
      className={`relative bg-bg ${reduced ? '' : 'h-[360svh] md:h-[340svh]'}`}
    >
      <div
        ref={pinContentRef}
        className={`w-full flex flex-col items-center justify-center relative px-4 ${
          reduced
            ? 'min-h-screen py-24'
            : 'sticky top-0 h-[100svh] pt-24 sm:pt-28 pb-6 overflow-hidden'
        }`}
      >
        {/* Section header */}
        <div
          data-mobile-header
          className="text-center max-w-xl mx-auto mb-3 md:mb-6 z-10 shrink-0"
        >
          <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-brand-green block mb-2">
            Engineered Down to the Molecule
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-ink tracking-tight">
            Anatomy of Bioavailability
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-2">
            Scroll to inspect the micronutrient synergy inside each capsule.
          </p>
        </div>

        {/* Arena — same structure as before */}
        <div
          className={`relative w-full max-w-5xl flex flex-col items-center md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-16 lg:gap-x-24 ${
            reduced ? '' : 'h-[min(540px,62svh)] min-h-0'
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
            <ConcentricRings size={480} color="#211D1D" animateOnScroll={false} />
          </div>

          <div className="contents md:flex md:flex-col md:justify-between md:self-stretch md:py-4 md:items-end">
            {[0, 2].map((i) => {
              const c = callouts[i];
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    calloutRefs.current[i] = el;
                  }}
                  className={`z-30 w-full md:w-72 md:relative md:inset-auto bg-surface md:bg-surface/95 md:backdrop-blur-sm p-4 md:p-5 rounded-brand border border-line shadow-card ${
                    reduced ? 'relative mt-3 md:mt-0' : 'absolute inset-x-0 bottom-0'
                  }`}
                >
                  <div className={`flex items-center gap-2 mb-2 ${c.iconClass}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-ink">
                      {c.title}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{c.body}</p>
                  <Connector
                    side={c.side}
                    setRef={(el) => {
                      connectorRefs.current[i] = el;
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div
            ref={bottleWrapRef}
            className="relative z-20 order-first md:order-none aspect-[519/1200] h-[min(300px,34svh)] md:h-[min(430px,50svh)] mb-4 md:mb-0"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <BottleImage gender="women" alt="ONCE Capsule Anatomy" fit="height" withShadow={false} />
          </div>

          <div className="contents md:flex md:flex-col md:justify-center md:self-stretch md:items-start">
            {[1].map((i) => {
              const c = callouts[i];
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    calloutRefs.current[i] = el;
                  }}
                  className={`z-30 w-full md:w-72 md:relative md:inset-auto bg-surface md:bg-surface/95 md:backdrop-blur-sm p-4 md:p-5 rounded-brand border border-line shadow-card ${
                    reduced ? 'relative mt-3 md:mt-0' : 'absolute inset-x-0 bottom-0'
                  }`}
                >
                  <div className={`flex items-center gap-2 mb-2 ${c.iconClass}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-ink">
                      {c.title}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{c.body}</p>
                  <Connector
                    side={c.side}
                    setRef={(el) => {
                      connectorRefs.current[i] = el;
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};