import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, LABEL_CLAIMS, LABEL_CAUTION } from '../data/products';
import { productStats } from '../data/stats';
import { StatCounters } from '../components/StatCounters';
import { SEO } from '../components/SEO';
import { AmazonButton } from '../components/AmazonButton';
import { ConcentricRings } from '../components/ConcentricRings';
import { BottleImage } from '../components/BottleImage';
import { FinalCTA } from '../sections/FinalCTA';
import { ProductReviews } from '../sections/ProductReviews';
import { ratingStats, soldThisMonth, formatSold } from '../data/reviews';
import {
  Star, CheckCircle2, ChevronDown, Flame,
  Package, FileText
} from 'lucide-react';


/* Thin-stroke, minimal icons for the trust row */
const iconProps = {
  width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
};
const GlutenDairyFreeIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M12 21V8" />
    <path d="M12 8c0-2 1.2-3.6 3-4-.1 2-1.2 3.5-3 4Z" />
    <path d="M12 8c0-2-1.2-3.6-3-4 .1 2 1.2 3.5 3 4Z" />
    <path d="M12 13c0-1.8 1.2-3.2 3-3.6-.1 1.8-1.2 3.2-3 3.6Z" />
    <path d="M12 13c0-1.8-1.2-3.2-3-3.6.1 1.8 1.2 3.2 3 3.6Z" />
    <path d="M4.5 4.5l15 15" />
  </svg>
);
const CertifiedIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M12 3l2.1 1.5 2.6-.1.8 2.4 2.1 1.6-.8 2.5.8 2.5-2.1 1.6-.8 2.4-2.6-.1L12 19.5l-2.1-1.5-2.6.1-.8-2.4-2.1-1.6.8-2.5-.8-2.5 2.1-1.6.8-2.4 2.6.1Z" />
    <path d="M9.2 11.4l1.9 1.9 3.7-3.8" />
  </svg>
);
const LabTestedIcon = () => (
  <svg {...iconProps} aria-hidden="true">
    <path d="M9.5 3.5h5" />
    <path d="M10.5 3.5v5.2L5.6 17.4A2 2 0 0 0 7.4 20.5h9.2a2 2 0 0 0 1.8-3.1l-4.9-8.7V3.5" />
    <path d="M7.6 14.5h8.8" />
  </svg>
);
const TRUST_ITEMS = [
  { Icon: GlutenDairyFreeIcon, label: '0 Gluten · 0 Dairy' },
  { Icon: CertifiedIcon, label: 'cGMP Certified' },
  { Icon: LabTestedIcon, label: '3rd Party Lab Tested' },
];

const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const otherProduct = products.find((p) => p.slug !== slug);

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [openInfo, setOpenInfo] = useState<number | null>(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const ingredientScrollRef = useRef<HTMLDivElement>(null);

  // Reset gallery when switching between products (scroll reset is handled by PageTransition)
  useEffect(() => {
    setGalleryIndex(0);
    setOpenInfo(0);
  }, [slug]);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-ink mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-brand-green underline">Browse all products</Link>
        </div>
      </div>
    );
  }

  const accentClass = product.gender === 'women' ? 'text-women' : 'text-men';
  const bgAccentClass = product.gender === 'women' ? 'bg-women/10' : 'bg-men/10';
  const stats = ratingStats(product.name);
  const sold = soldThisMonth(product.name);

  return (
    <>
      <SEO
        title={`${product.name} | ONCE HEALTH`}
        description={product.description}
        ogImage={product.image}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="pt-28 pb-20 bg-bg">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Gallery Left — main image with thumbnails on its right */}
            <div className="flex flex-row gap-3 sm:gap-4 lg:sticky lg:top-28">
              {/* Main Image */}
              <div className="relative flex-1 min-w-0 rounded-2xl overflow-hidden bg-[#EFECE6] flex items-center justify-center min-h-[440px] sm:min-h-[560px] border border-line group">
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                  <ConcentricRings size={560} color={product.accentHex} animateOnScroll={false} />
                </div>
                {galleryIndex === 0 ? (
                  <div className="relative z-10 w-full h-full flex items-center justify-center px-6 py-10">
                    {/* Bottle */}
                    <div className="w-[42%] max-w-[200px] -translate-x-[12%] transition-transform duration-500 group-hover:scale-[1.03]">
                      <BottleImage gender={product.gender} alt={product.name} withShadow />
                    </div>
                    {/* Single minimal benefit badge — top right */}
                    {product.badges[0] && (
                      <div
                        className="pdp-seal absolute z-20 bottom-[22%] right-5 sm:right-8"
                        style={{ ['--seal' as string]: product.accentHex } as React.CSSProperties}
                        aria-label={product.badges[0]}
                      >
                        <span className="pdp-seal__star" aria-hidden="true">✳</span>
                        <span className="pdp-seal__text">{product.badges[0]}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <img
                    src={product.gallery[galleryIndex]}
                    alt={`${product.name} gallery ${galleryIndex}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              {/* Thumbnails — vertical strip on the right */}
              <div className="flex flex-col gap-2.5 sm:gap-3 shrink-0 max-h-[440px] sm:max-h-[560px] overflow-y-auto no-scrollbar">
                {product.gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-brand overflow-hidden border-2 transition-all ${
                      galleryIndex === i ? 'border-ink' : 'border-line hover:border-ink/40'
                    } bg-[#EFECE6]`}
                  >
                    {i === 0 ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <img src={product.image} alt="bottle thumb" className="h-[80%] object-contain" />
                      </div>
                    ) : (
                      <img src={src} alt={`thumb ${i}`} className="w-full h-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Right */}
            <div className="flex flex-col gap-6">
              {/* Eyebrow */}
              <div>
                <span className={`text-xs font-heading font-semibold uppercase tracking-eyebrow ${accentClass}`}>
                  {product.eyebrow}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-ink tracking-tightest leading-tight mb-2">
                  {product.name}
                </h1>
                <p className={`text-base font-heading font-medium ${accentClass}`}>
                  {product.tagline}
                </p>
              </div>

              {/* Rating + sold this month — one horizontal row; each part hidden until real data exists (data/reviews.ts) */}
              {(stats.count > 0 || sold) && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {stats.count > 0 && (
                    <a href="#reviews" className="flex items-center gap-2 w-fit hover:opacity-80 transition-opacity" aria-label={`${stats.avg} out of 5 stars, ${stats.count} reviews`}>
                      <span className="text-sm font-heading font-semibold text-ink">{stats.avg.toFixed(1)}</span>
                      <div className="flex text-[#F5A524]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.round(stats.avg) ? 'fill-current' : 'text-line'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-ink-muted underline underline-offset-4 decoration-line">
                        {stats.count.toLocaleString('en-US')} reviews
                      </span>
                    </a>
                  )}
                  {stats.count > 0 && sold && <span className="hidden sm:block h-4 w-px bg-line" aria-hidden="true" />}
                  {sold && (
                    <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
                      <Flame className="w-4 h-4 text-[#E8590C]" />
                      <span><span className="font-semibold text-ink">{formatSold(sold)}</span> sold this month</span>
                    </span>
                  )}
                </div>
              )}

              {/* Capsules info */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 ${bgAccentClass} rounded-brand w-fit`}>
                <Package className={`w-4 h-4 ${accentClass}`} />
                <span className="text-sm font-heading font-semibold text-ink">
                  {product.capsules} Capsules — {product.supplyDays}-Day Supply
                </span>
              </div>

              {/* Description */}
              <p className="text-base text-ink-muted leading-relaxed">{product.description}</p>

              {/* Benefit Chips */}
              <ul data-reveal-children className="space-y-3">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink">
                    <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${accentClass}`} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Price (optional) */}
              {product.price && (
                <div className="text-2xl font-heading font-bold text-ink">{product.price}</div>
              )}

              {/* PRIMARY CTA — Amazon */}
              <div className="space-y-3">
                <AmazonButton
                  url={product.amazonUrl}
                  variant="amazon"
                  size="lg"
                  label="Buy on Amazon"
                  className="w-full"
                />
                <AmazonButton
                  url={product.amazonCartUrl}
                  variant="amazonCart"
                  size="md"
                  label="Add to Amazon Cart"
                  className="w-full"
                />
                <p className="text-xs text-ink-muted text-center tracking-wide">
                  Launching soon on Amazon · Subscribe &amp; Save at launch
                </p>
                <Link
                  to="/verify"
                  className="flex items-center justify-center gap-1.5 text-xs font-heading font-semibold text-ink hover:text-brand-green transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Already have a bottle? Verify your batch &amp; view the COA
                </Link>
              </div>

              {/* Info accordion */}
              <div className="border-t border-line">
                {product.infoSections.map((sec, i) => {
                  const isOpen = openInfo === i;
                  return (
                    <div key={sec.title} className="border-b border-line">
                      <button
                        onClick={() => setOpenInfo(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between py-4 text-left text-[17px] text-ink tracking-wide hover:text-ink/75 transition-colors"
                      >
                        <span>{sec.title}</span>
                        <ChevronDown className={`w-4 h-4 text-ink/70 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                          <div className="pb-5 text-[15px] leading-[1.75] text-ink/80 tracking-wide">
                            {sec.items && (
                              <ul className="list-disc pl-6 space-y-2 marker:text-ink/60">
                                {sec.items.map((item) => {
                                  const [head, ...rest] = item.split(' — ');
                                  return (
                                    <li key={item}>
                                      {rest.length ? (
                                        <><strong className="font-semibold text-ink">{head}</strong> — {rest.join(' — ')}</>
                                      ) : item}
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                            {sec.paragraphs?.map((para) => (
                              <p key={para} className="mb-2 last:mb-0">{para}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trust Row — minimal line icons */}
              <div className="pt-2 grid grid-cols-3 gap-3">
                {TRUST_ITEMS.map(({ Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <span className="w-11 h-11 rounded-full border border-line bg-surface flex items-center justify-center text-ink/80">
                      <Icon />
                    </span>
                    <span className="text-[11px] tracking-wide text-ink-muted leading-tight">{label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY BUY BAR ─────────────────────────── */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-surface/95 md:backdrop-blur-md border-t border-line shadow-lift transition-transform duration-500 ease-out ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={product.image} alt={product.name} className="h-12 w-auto object-contain" />
            <div>
              <p className="text-sm font-heading font-bold text-ink">{product.name}</p>
              <p className="text-xs text-ink-muted">{product.capsules} Capsules · 30-Day Supply</p>
            </div>
          </div>
          <AmazonButton url={product.amazonUrl} variant="amazon" label="Buy on Amazon" />
        </div>
      </div>

      {/* ── AT A GLANCE (label facts, moved here from the home page) ── */}
      <section className="py-16 bg-bg border-t border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-8 text-center md:text-left">
            {product.name} at a glance
          </span>
          <StatCounters stats={productStats} />
        </div>
      </section>

      {/* ── MAIN BENEFITS ────────────────────────────── */}
      <section className="py-20 bg-surface border-t border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
                What This Formula Does
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight mb-10">
                Built for your biology.
              </h2>
              <div className="space-y-8">
                {product.detailedBenefits.map((b, i) => (
                  <div key={i} className="flex gap-5">
                    <div className={`w-8 h-8 rounded-brand ${bgAccentClass} flex items-center justify-center shrink-0 mt-1`}>
                      <span className={`text-xs font-heading font-bold ${accentClass}`}>0{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-ink mb-1">{b.title}</h3>
                      <p className="text-sm text-ink-muted leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <ConcentricRings size={500} color={product.accentHex} rings={4} />
              </div>
              <div className="relative z-10 w-64 sm:w-80">
                <BottleImage gender={product.gender} alt={product.name} withShadow />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INGREDIENT SPOTLIGHT ─────────────────────── */}
      <section className="py-20 bg-bg border-t border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
              Ingredient Spotlight
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight">
              What's inside, and how much.
            </h2>
          </div>

          <div ref={ingredientScrollRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.ingredientSpotlights.map((ing, i) => (
              <div key={i} className="bg-surface rounded-2xl border border-line overflow-hidden shadow-soft hover:shadow-card transition-shadow group">
                <div className="h-44 overflow-hidden bg-[#EFECE6]">
                  <img
                    src={ing.image}
                    alt={ing.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className={`text-[11px] font-heading font-semibold uppercase tracking-wider ${accentClass} block mb-1`}>
                    {ing.source}
                  </span>
                  <h4 className="text-base font-heading font-bold text-ink mb-2">{ing.name}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">{ing.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPLEMENT FACTS ─────────────────────────── */}
      <section className="py-20 bg-surface border-t border-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="mb-10">
            <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
              Label Transparency
            </span>
            <h2 className="text-3xl font-heading font-bold text-ink tracking-tight mb-2">
              Supplement Facts
            </h2>
            <p className="text-sm text-ink-muted">
              Exactly as printed on the {product.name} label.
            </p>
          </div>
          <div className="rounded-2xl border border-line overflow-hidden shadow-soft">
            {/* Label Header */}
            <div className="bg-ink p-5 text-center">
              <h3 className="text-xl font-heading font-bold text-surface tracking-wider">Supplement Facts</h3>
              <p className="text-surface/70 text-xs mt-1">
                Serving Size: {product.servingSize} · Servings Per Container: {product.servingsPerContainer}
              </p>
            </div>
            {/* Table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-ink bg-bg">
                  <th className="text-left px-5 py-3 font-heading font-semibold text-ink text-xs">Nutrient</th>
                  <th className="text-right px-5 py-3 font-heading font-semibold text-ink text-xs">Amount Per Serving</th>
                  <th className="text-right px-5 py-3 font-heading font-semibold text-ink text-xs">% Daily Value</th>
                </tr>
              </thead>
              <tbody>
                {product.supplementFacts.map((row, i) => (
                  <tr key={i} className={`border-b border-line/50 ${i % 2 === 0 ? 'bg-white' : 'bg-bg/50'}`}>
                    <td className="px-5 py-3 text-ink text-xs">{row.nutrient}</td>
                    <td className="px-5 py-3 text-right text-ink-muted text-xs">{row.amount}</td>
                    <td className="px-5 py-3 text-right font-medium text-ink text-xs">{row.dailyValue}</td>
                  </tr>
                ))}
                {product.proprietaryBlends.map((blend) => (
                  <tr key={blend.name} className="border-t-2 border-ink/70 align-top">
                    <td className="px-5 py-3 text-xs text-ink-muted leading-relaxed">
                      <span className="font-heading font-semibold text-ink">{blend.name}:</span>{' '}
                      {blend.ingredients}
                    </td>
                    <td className="px-5 py-3 text-right text-ink-muted text-xs whitespace-nowrap">{blend.amount}</td>
                    <td className="px-5 py-3 text-right font-medium text-ink text-xs">†</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-bg p-5 text-xs text-ink-muted border-t border-line space-y-2">
              <p>† Daily Value (DV) Not Established.</p>
              <p>
                <span className="font-semibold text-ink">Other Ingredients:</span> {product.otherIngredients}
              </p>
              <p className="pt-2 border-t border-line/60">
                <span className="font-semibold text-ink">0</span> Gluten · <span className="font-semibold text-ink">0</span> Dairy ·{' '}
                {LABEL_CLAIMS.quality.join(' · ')}
              </p>
              <p className="italic">“{LABEL_CLAIMS.madeIn}”</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO TAKE ─────────────────────────────── */}
      <section className="py-20 bg-bg border-t border-line">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
                Directions
              </span>
              <h2 className="text-3xl font-heading font-bold text-ink tracking-tight mb-6">
                How to take your ONCE.
              </h2>
              <div className="space-y-5">
                <div className="p-5 bg-surface rounded-brand border border-line">
                  <h4 className="text-sm font-heading font-semibold text-ink mb-1">Serving Size</h4>
                  <p className="text-sm text-ink-muted">{product.howToTake.servingSize}</p>
                </div>
                <div className="p-5 bg-surface rounded-brand border border-line">
                  <h4 className="text-sm font-heading font-semibold text-ink mb-1">When</h4>
                  <p className="text-sm text-ink-muted">{product.howToTake.timing}</p>
                </div>
                <div className="p-5 bg-surface rounded-brand border border-line">
                  <h4 className="text-sm font-heading font-semibold text-ink mb-1">Suggested Use</h4>
                  <p className="text-sm text-ink-muted">{product.howToTake.instructions}</p>
                </div>
                <div className="p-5 bg-surface rounded-brand border border-line">
                  <h4 className="text-sm font-heading font-semibold text-ink mb-1">Storage &amp; Safety</h4>
                  <p className="text-sm text-ink-muted">{product.howToTake.storage}</p>
                </div>
                <div className="p-5 bg-surface rounded-brand border border-line">
                  <h4 className="text-sm font-heading font-semibold text-ink mb-1">Caution</h4>
                  <p className="text-sm text-ink-muted">{LABEL_CAUTION}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img src="/images/ritual-capsules.webp" alt="Take 2 capsules" className="rounded-2xl object-cover w-full max-w-sm h-80 shadow-card" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ (Product-specific) ──────────────────── */}
      <section className="py-20 bg-surface border-t border-line">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h2 className="text-3xl font-heading font-bold text-ink tracking-tight mb-10">
            Product Questions
          </h2>
          <div className="space-y-4">
            {product.faqs.map((faq, i) => {
              const id = `faq-${i}`;
              const isOpen = openFAQ === id;
              return (
                <div key={id} className="rounded-brand border border-line bg-bg overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(isOpen ? null : id)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left font-heading font-semibold text-ink text-sm sm:text-base hover:text-ink/80 transition-colors"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-ink-muted shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-ink-muted leading-relaxed border-t border-line/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CROSS-SELL ──────────────────────────────── */}
      {otherProduct && (
        <section className="py-20 bg-bg border-t border-line">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <p className="text-sm text-ink-muted mb-2">
              {product.gender === 'women' ? 'Shopping for him?' : 'Shopping for her?'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-8">
              Also from ONCE: {otherProduct.name}
            </h2>
            <div className="inline-flex flex-col sm:flex-row items-center gap-5 bg-surface rounded-2xl border border-line p-8 shadow-soft">
              <div className="w-36 sm:w-44">
                <BottleImage gender={otherProduct.gender} alt={otherProduct.name} withShadow />
              </div>
              <div className="text-left max-w-xs">
                <span className={`text-xs uppercase tracking-wider font-semibold ${otherProduct.gender === 'women' ? 'text-women' : 'text-men'}`}>
                  {otherProduct.gender === 'women' ? 'For Her' : 'For Him'}
                </span>
                <h3 className="text-xl font-heading font-bold text-ink mt-1 mb-3">{otherProduct.name}</h3>
                <div className="flex gap-3">
                  <Link to={`/products/${otherProduct.slug}`} className="px-4 py-2.5 bg-ink text-surface text-xs font-heading font-semibold rounded-brand hover:bg-ink/85 transition-colors">
                    View Product
                  </Link>
                  <AmazonButton url={otherProduct.amazonUrl} size="sm" variant="amazon" showIcon={false} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <div className="bg-surface border-t border-line px-5 sm:px-8 py-8 max-w-7xl mx-auto text-xs text-ink-muted leading-relaxed">
        * These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. {LABEL_CAUTION}
      </div>

      <ProductReviews product={product} />

      <FinalCTA />
    </>
  );
};

export default ProductPage;
