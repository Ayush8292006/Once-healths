import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { BottleImage } from '../components/BottleImage';
import { ConcentricRings } from '../components/ConcentricRings';
import { AmazonButton } from '../components/AmazonButton';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FormulaChooser: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const womenCardRef = useRef<HTMLDivElement>(null);
  const menCardRef = useRef<HTMLDivElement>(null);

  const womensProduct = products.find((p) => p.gender === 'women') || products[0];
  const mensProduct = products.find((p) => p.gender === 'men') || products[1];

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

        const offset = isDesktop ? 40 : 20;
        const dur = isDesktop ? 0.8 : 0.6;

        // Only cards animate. Header stays — confidence, not performance.
        if (womenCardRef.current) {
          gsap.fromTo(
            womenCardRef.current,
            { x: -offset, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: dur,
              ease: 'power2.out',
              immediateRender: false,
              scrollTrigger: {
                trigger: womenCardRef.current,
                start: isDesktop ? 'top 82%' : 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (menCardRef.current) {
          gsap.fromTo(
            menCardRef.current,
            { x: offset, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: dur,
              ease: 'power2.out',
              immediateRender: false,
              scrollTrigger: {
                trigger: menCardRef.current,
                start: isDesktop ? 'top 78%' : 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        ScrollTrigger.refresh();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header — static, no animation */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
            Choose Your Formula
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-ink tracking-tight">
            Pick the one that fits.
          </h2>
          <p className="text-base text-ink-muted mt-4">
            Same core. Different ratios. Find the formula built for your physiology.
          </p>
        </div>

        {/* Split Cards Grid — intentionally not identical */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Women's Multi Card — slightly taller padding, rose tone */}
          <div
            ref={womenCardRef}
            className="group relative rounded-2xl border border-line p-8 sm:p-12 lg:p-14 overflow-hidden transition-all duration-500 ease-out flex flex-col justify-between will-change-transform"
            style={{ backgroundColor: 'rgba(156, 61, 115, 0.06)' }}
          >
            <div className="absolute inset-0 bg-[#9C3D73]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-8 items-center mb-8">
              <div className="sm:col-span-7">
                {/* Pill badge — women's style */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-women/10 text-women text-[11px] font-heading font-semibold tracking-wider uppercase rounded-full mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-women" />
                  For Her
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-2">
                  Women's Multi
                </h3>
                <p className="text-xs sm:text-sm font-heading text-women font-medium mb-5">
                  60 capsules · 30-day supply
                </p>

                <ul className="space-y-3 mb-6">
                  {womensProduct.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-muted">
                      <span className="w-4 h-4 rounded-full bg-women/15 flex items-center justify-center shrink-0 mt-0.5 text-women">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:col-span-5 flex justify-center">
                <div className="w-44 sm:w-52 transition-transform duration-500 ease-out group-hover:-translate-y-3">
                  <BottleImage gender="women" alt="ONCE Women's Multi" withShadow />
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-line/70 flex flex-wrap items-center gap-4">
              <Link
                to={`/products/${womensProduct.slug}`}
                data-cursor="View"
                className="btn-roll px-5 py-3 bg-women text-surface rounded-brand text-xs sm:text-sm font-heading font-semibold tracking-wide transition-all hover:brightness-105"
              >
                <div className="relative overflow-hidden h-4 inline-flex items-center">
                  <div className="btn-roll-inner">
                    <span className="btn-roll-text h-4">Shop Women's Multi</span>
                    <span className="btn-roll-text h-4">Shop Women's Multi</span>
                  </div>
                </div>
              </Link>
              <AmazonButton
                url={womensProduct.amazonUrl}
                variant="women"
                size="md"
                label="Buy on Amazon"
              />
            </div>
          </div>

          {/* Men's Multi Card — different badge style, has rings (asymmetry) */}
          <div
            ref={menCardRef}
            className="group relative rounded-2xl border border-line p-8 sm:p-12 overflow-hidden transition-all duration-500 ease-out flex flex-col justify-between will-change-transform"
            style={{ backgroundColor: 'rgba(47, 107, 140, 0.06)' }}
          >
            <div className="absolute inset-0 bg-[#2F6B8C]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Rings only on men's card — intentional asymmetry */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 translate-x-12 opacity-35 transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none">
              <ConcentricRings size={360} color="#2F6B8C" animateOnScroll={false} />
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-8 items-center mb-8">
              <div className="sm:col-span-7">
                {/* Underline badge — men's style, different from women's pill */}
                <span className="inline-block text-[11px] font-heading font-semibold tracking-wider uppercase text-men mb-5 pb-1 border-b border-men/40">
                  For Him
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-2">
                  Men's Multi
                </h3>
                <p className="text-xs sm:text-sm font-heading text-men font-medium mb-5">
                  60 capsules · 30-day supply
                </p>

                <ul className="space-y-3 mb-6">
                  {mensProduct.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-muted">
                      <span className="w-4 h-4 rounded-full bg-men/15 flex items-center justify-center shrink-0 mt-0.5 text-men">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sm:col-span-5 flex justify-center">
                <div className="w-44 sm:w-52 transition-transform duration-500 ease-out group-hover:-translate-y-3">
                  <BottleImage gender="men" alt="ONCE Men's Multi" withShadow />
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-line/70 flex flex-wrap items-center gap-4">
              <Link
                to={`/products/${mensProduct.slug}`}
                data-cursor="View"
                className="btn-roll px-5 py-3 bg-men text-surface rounded-brand text-xs sm:text-sm font-heading font-semibold tracking-wide transition-all hover:brightness-105"
              >
                <div className="relative overflow-hidden h-4 inline-flex items-center">
                  <div className="btn-roll-inner">
                    <span className="btn-roll-text h-4">Shop Men's Multi</span>
                    <span className="btn-roll-text h-4">Shop Men's Multi</span>
                  </div>
                </div>
              </Link>
              <AmazonButton
                url={mensProduct.amazonUrl}
                variant="men"
                size="md"
                label="Buy on Amazon"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};