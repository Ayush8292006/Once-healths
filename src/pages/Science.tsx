import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ConcentricRings } from '../components/ConcentricRings';
import { FinalCTA } from '../sections/FinalCTA';
import { BackButton } from '../components/BackButton';
import { BottleImage } from '../components/BottleImage';
import { products } from '../data/products';
import { FlaskConical, ShieldCheck, Microscope, Wheat, ArrowRight } from 'lucide-react';

const scienceTimeline = [
  {
    num: '01',
    title: 'Globally Sourced Ingredients',
    detail: 'Vitamins, minerals and botanical extracts are sourced from suppliers around the world, and every ingredient is listed on the label.',
  },
  {
    num: '02',
    title: 'Formulated With Active Forms',
    detail: 'Methylated B12 (methylcobalamin), methylated folate (calcium 5-MTHF) and magnesium glycinate, plus targeted support, immune and antioxidant blends.',
  },
  {
    num: '03',
    title: 'cGMP-Certified Facility',
    detail: 'Proudly manufactured in India in a cGMP-certified facility, following current Good Manufacturing Practices.',
  },
  {
    num: '04',
    title: 'Third Party Tested',
    detail: 'Each batch is third party tested and gets its own Certificate of Analysis — look it up with the batch number on your bottle.',
  },
];

/** Mineral forms exactly as printed on the label (both formulas use the same mineral base) */
const mineralForms = [
  { mineral: 'Magnesium', form: 'Magnesium Glycinate', amount: '50 mg', highlight: true },
  { mineral: 'Zinc', form: 'Zinc Oxide', amount: '15 mg' },
  { mineral: 'Selenium', form: 'Selenium Amino Acid Chelate', amount: '30 mcg' },
  { mineral: 'Copper', form: 'Copper Gluconate', amount: '2 mg' },
  { mineral: 'Manganese', form: 'Manganese Amino Acid Chelate', amount: '2 mg' },
  { mineral: 'Chromium', form: 'Chromium Picolinate', amount: '120 mcg' },
  { mineral: 'Molybdenum', form: 'Molybdenum Amino Acid Chelate', amount: '75 mcg' },
  { mineral: 'Calcium', form: 'Calcium Carbonate', amount: '50 mg' },
];

/** Small "FIG." caption used under images */
const Fig: React.FC<{ n: string; children: React.ReactNode; dark?: boolean }> = ({ n, children, dark = false }) => (
  <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider ${dark ? 'text-surface/60' : 'text-ink-muted'}`}>
    <span className={dark ? 'text-brand-green' : 'text-ink'}>FIG. {n}</span>
    <span className={`h-px flex-1 ${dark ? 'bg-white/15' : 'bg-line'}`} />
    <span>{children}</span>
  </div>
);

// Per-serving numbers straight from the label (same in both formulas)
const heroStats = [
  { value: '27 mcg', label: 'Vitamin B12 as methylcobalamin' },
  { value: '667 mcg', label: 'Folate (DFE) as calcium 5-MTHF' },
  { value: '50 mg', label: 'Magnesium as magnesium glycinate' },
  { value: '20', label: 'Vitamins & minerals per serving' },
];

/** Per-formula science — same lab-report theme, switchable Women's / Men's */
const FORMULA_FOCUS: Record<'women' | 'men', { focus: string; note: string }> = {
  women: {
    focus: 'Energy · Vitality · Daily balance',
    note: 'Methylated B12 & folate and magnesium glycinate, plus a Female Support Blend with wild yam, red clover and cranberry.*'
  },
  men: {
    focus: 'Daily vitality · Energy',
    note: 'Methylated B12 & folate and magnesium glycinate, plus a Male Support Blend with stinging nettle root and saw palmetto.*'
  },
};

const FormulaScience: React.FC = () => {
  const [active, setActive] = useState<'women' | 'men'>('women');
  const p = products.find((x) => x.gender === active)!;
  const f = FORMULA_FOCUS[active];
  const accent = active === 'women' ? '#C9649E' : '#5FA2C8';

  return (
    <section id="formulas" className="relative py-20 lg:py-24 bg-ink overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, #000 25%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse at 50% 40%, #000 25%, transparent 75%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-green block mb-4">
              Formula science — two specimens
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-surface tracking-tight leading-[1.08]">
              One principle.{' '}
              <span className="italic font-medium text-surface/60">Two different formulas.</span>
            </h2>
          </div>
          {/* Switch */}
          <div role="tablist" aria-label="Choose formula" className="inline-flex p-1 rounded-full border border-white/15 bg-white/[0.04] w-fit">
            {products.map((x) => {
              const on = x.gender === active;
              return (
                <button
                  key={x.slug}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(x.gender)}
                  className={`px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                    on ? 'bg-surface text-ink' : 'text-surface/60 hover:text-surface'
                  }`}
                >
                  {x.name}
                </button>
              );
            })}
          </div>
        </div>

        <div key={active} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 animate-[fadeIn_0.45s_ease]">
          {/* Specimen card */}
          <div className="lg:col-span-5 rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-7">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-surface/50 mb-5">
              <span>Specimen · {active === 'women' ? 'ONCE-W60' : 'ONCE-M60'}</span>
              <span style={{ color: accent }}>{p.name}</span>
            </div>
            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none">
                <ConcentricRings size={240} color={accent} rings={4} animateOnScroll={false} />
              </div>
              <div className="relative w-28 sm:w-32">
                <BottleImage gender={p.gender} alt={p.name} withShadow={false} />
              </div>
            </div>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: accent }}>
              {f.focus}
            </p>
            <p className="mt-2 text-sm text-surface/65 leading-relaxed">{f.note}</p>
            <dl className="mt-5 space-y-2 font-mono text-xs">
              {p.ingredientSpotlights.map((ing) => (
                <div key={ing.name} className="flex items-center justify-between gap-4 border-t border-white/10 pt-2">
                  <dt className="uppercase tracking-wider text-surface/45">{ing.source}</dt>
                  <dd className="text-surface text-right">{ing.name}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Findings */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {p.detailedBenefits.map((b, i) => (
              <div key={b.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <span className="font-mono text-xs font-bold" style={{ color: accent }}>
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-heading font-bold text-surface leading-snug">{b.title}</h3>
                <p className="mt-2 text-sm text-surface/60 leading-relaxed">{b.description}</p>
              </div>
            ))}
            <Link
              to={`/products/${p.slug}`}
              className="sm:col-span-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-surface/70 hover:text-brand-green transition-colors mt-2"
            >
              View {p.name} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Science: React.FC = () => {
  return (
    <>
      <SEO
        title="The Science — Why Bioavailability Matters"
        description="Why ONCE HEALTH uses methylated B12 & folate and magnesium glycinate — and how every batch is third party tested."
      />

      {/* ───────── HERO · lab report ───────── */}
      <section className="relative pt-32 bg-ink overflow-hidden">
        {/* graph-paper grid, faded towards the edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            WebkitMaskImage: 'radial-gradient(ellipse at 60% 40%, #000 25%, transparent 75%)',
            maskImage: 'radial-gradient(ellipse at 60% 40%, #000 25%, transparent 75%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <BackButton variant="dark" className="mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center pb-16 lg:pb-20">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-green mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                Lab report · Bioavailability
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-surface tracking-tightest leading-[1.04] mb-6">
                The science of{' '}
                <span className="text-brand-green italic font-medium">bioavailability.</span>
              </h1>
              <p className="text-base sm:text-lg text-surface/70 leading-relaxed max-w-xl">
                Some vitamins have to be converted by the body before it can use them. ONCE uses the active, methylated forms of B12 and folate — and lists every form and amount on the label.
              </p>
            </div>

            {/* Specimen card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-white/15 bg-white/[0.03] backdrop-blur-sm p-6 overflow-hidden">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-surface/50 mb-4">
                  <span>Specimen · ONCE-60</span>
                  <span>60 capsules</span>
                </div>
                <div className="relative flex items-center justify-center py-2">
                  <ConcentricRings size={250} color="#49BC39" rings={5} opacity={0.7} />
                </div>
                <dl className="mt-4 space-y-2 font-mono text-xs">
                  {[
                    ['Folate', 'Calcium 5-MTHF'],
                    ['B12', 'Methylcobalamin'],
                    ['Mineral', 'Magnesium glycinate'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4 border-t border-white/10 pt-2">
                      <dt className="uppercase tracking-wider text-surface/45">{k}</dt>
                      <dd className="text-surface text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Key numbers */}
        <div className="relative z-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4">
            {heroStats.map((st, i) => (
              <div
                key={st.value}
                className={`py-7 lg:py-9 pr-4 ${i > 0 ? 'lg:pl-8 lg:border-l lg:border-white/10' : ''} ${
                  i % 2 === 1 ? 'pl-4 border-l border-white/10 lg:pl-8' : ''
                } ${i >= 2 ? 'border-t border-white/10 lg:border-t-0' : ''}`}
              >
                <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-surface tabular-nums">{st.value}</div>
                <div className="mt-2 text-xs text-surface/55 leading-snug max-w-[14rem]">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FIG. 01 ───────── */}
      <section className="py-14 bg-bg">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-[#ECE8E1] h-64 sm:h-80 md:h-[26rem]">
            <img
              src="/images/science-capsules.webp"
              alt="ONCE capsule science"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-ink/10" />
            {/* viewfinder corners */}
            {['top-4 left-4 border-t-2 border-l-2', 'top-4 right-4 border-t-2 border-r-2', 'bottom-4 left-4 border-b-2 border-l-2', 'bottom-4 right-4 border-b-2 border-r-2'].map((c) => (
              <span key={c} aria-hidden="true" className={`absolute w-6 h-6 border-surface/80 ${c}`} />
            ))}
          </div>
          <div className="mt-4">
            <Fig n="01">ONCE capsules, macro view</Fig>
          </div>
        </div>
      </section>

      {/* ───────── Formula science · Women's / Men's ───────── */}
      <FormulaScience />

      {/* ───────── 01 · Methylated forms ───────── */}
      <section className="py-20 lg:py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted block mb-4">
              Section 01 — Active forms
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-ink tracking-tight leading-[1.08]">
              Why methylated forms{' '}
              <span className="italic font-medium text-ink/60">change everything.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Standard */}
            <div className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Standard supplements</span>
                <span className="px-2.5 py-1 rounded-full bg-ink/5 text-[11px] font-heading font-semibold text-ink/70">Conversion needed</span>
              </div>
              <ol className="space-y-3 mb-6">
                {['Often folic acid & cyanocobalamin', 'Must be converted by the body before use', 'How well that works varies from person to person'].map((t, i) => (
                  <li key={t} className="flex gap-4 items-start">
                    <span className="font-mono text-xs text-ink-muted mt-0.5">0{i + 1}</span>
                    <span className="text-sm sm:text-base text-ink/80 leading-snug">{t}</span>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-ink-muted leading-relaxed border-t border-line pt-5">
                Folic acid and cyanocobalamin are not the forms the body uses directly — they have to be converted first.
              </p>
            </div>

            {/* ONCE */}
            <div className="rounded-2xl bg-ink p-7 sm:p-9 relative overflow-hidden">
              <div className="absolute -right-16 -bottom-16 opacity-20 pointer-events-none">
                <ConcentricRings size={320} color="#49BC39" rings={4} animateOnScroll={false} />
              </div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-surface/55">The ONCE solution</span>
                  <span className="px-2.5 py-1 rounded-full bg-brand-green/15 text-[11px] font-heading font-semibold text-brand-green">Ready to use</span>
                </div>
                <ol className="space-y-3 mb-6">
                  {['Calcium 5-MTHF & methylcobalamin', 'The active, methylated forms', 'No conversion step needed'].map((t, i) => (
                    <li key={t} className="flex gap-4 items-start">
                      <span className="font-mono text-xs text-brand-green mt-0.5">0{i + 1}</span>
                      <span className="text-sm sm:text-base text-surface/90 leading-snug">{t}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-sm text-surface/60 leading-relaxed border-t border-white/10 pt-5">
                  667 mcg DFE of folate and 27 mcg of vitamin B12 per serving, in the forms your body uses directly.*
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 bg-[#ECE8E1]">
              <img
                src="/images/science-lab.webp"
                alt="Lab science process"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-4">
              <Fig n="02">Formulation and analysis in the lab</Fig>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 02 · Magnesium ───────── */}
      <section className="py-20 lg:py-24 bg-surface border-y border-line" id="bioavailability">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted block mb-4">
                Section 02 — Mineral bioavailability
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight leading-[1.1] mb-6">
                Why magnesium glycinate.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-ink-muted leading-relaxed">
                <p>
                  Magnesium glycinate is magnesium bound to the amino acid glycine. It is a form widely chosen because it is known for being gentle — which is why both ONCE formulas use it.*
                </p>
                <p>
                  Here is every mineral in ONCE, with the exact form and amount printed on the label.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-line bg-bg p-6 sm:p-8">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted pb-4 border-b border-line">
                  <span>Mineral · form on label</span>
                  <span>Per serving</span>
                </div>
                <ul className="divide-y divide-line">
                  {mineralForms.map((m) => (
                    <li key={m.mineral} className="py-4 flex items-center justify-between gap-4">
                      <div>
                        <span className={`text-sm font-heading font-bold ${m.highlight ? 'text-ink' : 'text-ink/80'}`}>
                          {m.mineral}
                        </span>
                        <span className="block text-xs text-ink-muted mt-0.5">as {m.form}</span>
                      </div>
                      <span
                        className={`font-mono text-lg sm:text-xl font-bold tabular-nums ${
                          m.highlight ? 'text-brand-green' : 'text-ink/70'
                        }`}
                      >
                        {m.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 03 · Quality pipeline ───────── */}
      <section id="testing" className="py-20 lg:py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted block mb-4">
              Section 03 — From source to shelf
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-ink tracking-tight leading-[1.08]">
              Our quality process, step by step.
            </h2>
          </div>

          <div data-reveal-children className="relative">
            {/* connecting line (desktop) */}
            <div aria-hidden="true" className="hidden lg:block absolute top-5 left-0 right-0 border-t border-dashed border-ink/25" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {scienceTimeline.map((item) => (
                <div key={item.num} className="relative">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-ink text-surface flex items-center justify-center font-mono text-xs font-bold mb-6 ring-8 ring-bg">
                    {item.num}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-ink mb-3 leading-snug">{item.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Certifications ───────── */}
      <section className="py-14 bg-ink">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Microscope, label: 'Third Party Tested' },
              { icon: ShieldCheck, label: 'cGMP-Certified Facility' },
              { icon: Wheat, label: '0 Gluten · 0 Dairy' },
              { icon: FlaskConical, label: 'COA for every batch' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <span className="w-11 h-11 rounded-full bg-brand-green/15 text-brand-green flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <p className="text-sm font-heading font-semibold text-surface leading-snug">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                to="/verify"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-green hover:text-surface transition-colors"
              >
                Verify your batch <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-surface/70 hover:text-brand-green transition-colors"
              >
                See the formulas <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
};

export default Science;
