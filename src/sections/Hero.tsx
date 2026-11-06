import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ConcentricRings } from '../components/ConcentricRings';
import { BottleImage } from '../components/BottleImage';
import { HeroBackdrop } from '../components/HeroBackdrop';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { intro } from '../animations/intro';

interface HeroProps {
  isPreloaderFinished: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isPreloaderFinished }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const trustBadgeRef = useRef<HTMLDivElement>(null);
  const bottleGroupRef = useRef<HTMLDivElement>(null);
  const bottleWomenRef = useRef<HTMLDivElement>(null);
  const bottleMenRef = useRef<HTMLDivElement>(null);
  const womenHitRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // The two bottles overlap, so the Women's bottle used to swallow taps meant for Men's.
  // Decide by where the tap lands: anything left of the Women's bottle body opens Men's.
  const handleBottleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const womenEl = womenHitRef.current;
    if (!womenEl) return;
    e.preventDefault();
    const r = womenEl.getBoundingClientRect();
    const toMen = e.clientX < r.left + r.width * 0.06;
    navigate(toMen ? '/products/mens-multi' : '/products/womens-multi');
  };

  useLayoutEffect(() => {
    if (isPreloaderFinished || intro.played) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = [
      ...(headlineRef.current?.querySelectorAll('.hero-line') ?? []),
      subtextRef.current,
      buttonsRef.current,
      trustBadgeRef.current,
      bottleMenRef.current,
      bottleWomenRef.current,
    ].filter(Boolean);
    gsap.set(targets, { opacity: 0 });

    const root = heroRef.current;
    if (root) {
      gsap.set(root.querySelector('[data-hp="arch"]'), { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(root.querySelectorAll('[data-hp="sun"], [data-hp="badge-in"]'), {
        opacity: 0,
        scale: 0.4,
      });
    }
  }, [isPreloaderFinished]);

  useEffect(() => {
    if (!isPreloaderFinished) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const playIntro = !intro.played;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const arch = heroRef.current?.querySelector('[data-hp="arch"]');
      if (playIntro && arch) {
        gsap.to(arch, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'expo.out',
          onComplete: () => gsap.set(arch, { clearProps: 'clipPath' }),
        });
        gsap.to('[data-hp="sun"], [data-hp="badge-in"]', {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          delay: 0.35,
          stagger: 0.09,
          ease: 'back.out(1.6)',
        });
      }

      const lines = headlineRef.current?.querySelectorAll('.hero-line');
      if (playIntro && lines) {
        tl.fromTo(
          lines,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
        );
      }

      if (playIntro && subtextRef.current && buttonsRef.current && trustBadgeRef.current) {
        tl.fromTo(
          [subtextRef.current, buttonsRef.current, trustBadgeRef.current],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
          '-=0.5'
        );
      }

      if (playIntro && bottleWomenRef.current && bottleMenRef.current) {
        tl.fromTo(
          [bottleMenRef.current, bottleWomenRef.current],
          { y: 60, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1, stagger: 0.15, ease: 'expo.out' },
          '-=0.8'
        );
      }

      const touch = window.matchMedia('(pointer: coarse)').matches;
      const base = {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: touch ? true : 0.5,
        invalidateOnRefresh: true,
      };
      const q = gsap.utils.selector(heroRef);
      gsap.to(q('[data-hp="copy"]'), { y: -64, opacity: 0.1, ease: 'none', scrollTrigger: base });
      gsap.to(q('[data-hp="stage"]'), { y: -36, ease: 'none', scrollTrigger: base });
      gsap.to(q('[data-hp="arch"]'), { yPercent: -4, scale: 1.05, ease: 'none', scrollTrigger: base });
      gsap.to(q('[data-hp="sun"]'), { y: -110, ease: 'none', scrollTrigger: base });
      gsap.to(q('[data-hp="badge"]'), { rotation: 260, ease: 'none', scrollTrigger: base });
    }, heroRef);

    const handleMouseMove = (e: MouseEvent) => {
      if (!bottleGroupRef.current || window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth - 0.5) * 2;
      const yPercent = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(bottleGroupRef.current, {
        x: xPercent * 12,
        y: yPercent * 8,
        rotateY: xPercent * 5,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, [isPreloaderFinished]);

  return (
    <section
      ref={heroRef}
      data-no-reveal
      className="relative isolate min-h-[92svh] flex items-center pt-32 pb-16 lg:pt-36 lg:pb-20 overflow-hidden"
    >
      <HeroBackdrop />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left — copy */}
          <div data-hp="copy" className="lg:col-span-7 flex flex-col justify-center z-10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted/80 font-medium mb-5">
              Once Daily · Est. 2024
            </p>

            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-heading font-bold text-ink leading-[1.08] tracking-tightest mb-6"
            >
              <span className="block overflow-hidden">
                <span className="hero-line block">Two formulas.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block text-ink">Nothing you</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block text-ink/85 italic font-medium">
                  don't need.
                </span>
              </span>
            </h1>

            <p
              ref={subtextRef}
              className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-md mb-8 font-normal"
            >
              Methylated B12, chelated magnesium, and folate your body can actually
              absorb. One tablet, every morning — not a shelf of bottles.
            </p>

            <div ref={buttonsRef} className="mb-10">
              <Link
                to="/shop"
                className="btn-roll inline-flex items-center px-7 py-4 bg-ink text-surface font-heading font-medium text-sm rounded-brand shadow-soft hover:brightness-110 transition-all"
              >
                <div className="relative overflow-hidden h-5 inline-flex items-center">
                  <div className="btn-roll-inner">
                    <span className="btn-roll-text h-5">Find your formula</span>
                    <span className="btn-roll-text h-5">Find your formula</span>
                  </div>
                </div>
              </Link>
              <p className="mt-3 text-xs text-ink-muted">
                Free shipping · 30-day returns · No subscription required
              </p>
            </div>

            <div
              ref={trustBadgeRef}
              className="pt-6 border-t border-line/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-wider text-ink-muted/90 font-medium"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" strokeWidth={2.2} />
                Third-party tested
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green" strokeWidth={2.2} />
                Non-GMO
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-green" strokeWidth={2.2} />
                Vegan
              </span>
            </div>
          </div>

          {/* Right — bottles + backdrop */}
          <div data-hp="stage" className="lg:col-span-5 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div data-hp="arch" className="hb-arch relative w-[84%] max-w-[440px] h-[114%]">
                <div
                  className="absolute inset-[10px] pointer-events-none"
                  style={{ borderRadius: '999px', border: '1px solid rgba(33,29,29,0.12)' }}
                />
                <div className="hb-grain absolute inset-0 rounded-[inherit] opacity-30" />
                <span
                  data-hp="sun"
                  className="absolute top-[13%] right-[17%] w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-brand-green"
                  style={{ boxShadow: 'inset -4px -5px 8px rgba(0,0,0,0.12), 0 0 0 8px rgba(73,188,57,0.16)' }}
                />
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0">
              <ConcentricRings
                size={520}
                color="#211D1D"
                strokeWidth={1}
                rings={5}
                opacity={0.14}
              />
            </div>

            <div
              ref={bottleGroupRef}
              className="relative z-10 flex items-center justify-center w-full max-w-md lg:max-w-none pt-4"
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              {/* no floating wrapper — bottles sit still. One tap handler routes to the right product. */}
              <div
                className="flex items-center justify-center w-full cursor-pointer"
                onClickCapture={handleBottleTap}
                data-cursor="View"
              >
                <div
                  ref={bottleMenRef}
                  className="w-[6.5rem] sm:w-36 lg:w-36 xl:w-40 -mr-8 sm:-mr-11 z-0 translate-x-3"
                >
                  <Link to="/products/mens-multi" data-cursor="View" className="block" aria-label="View Men's Multi">
                    <BottleImage gender="men" alt="ONCE Men's Multi Bottle" interactive />
                    <div className="text-left mt-2 -ml-2 sm:-ml-4">
                      <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-men whitespace-nowrap">
                        Men's Multi
                      </span>
                    </div>
                  </Link>
                </div>

                <div
                  ref={bottleWomenRef}
                  className="w-[7.5rem] sm:w-[10.5rem] lg:w-[10.5rem] xl:w-48 z-10 -translate-x-3"
                >
                  <Link to="/products/womens-multi" data-cursor="View" className="block" aria-label="View Women's Multi">
                    <div ref={womenHitRef}>
                      <BottleImage gender="women" alt="ONCE Women's Multi Bottle" interactive />
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-women">
                        Women's Multi
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};