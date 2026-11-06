import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { BackButton } from '../components/BackButton';
import { BottleImage } from '../components/BottleImage';
import { ConcentricRings } from '../components/ConcentricRings';
import { products, DISTRIBUTOR } from '../data/products';
import { findBatch, formatMonth, isExpired, type BatchRecord } from '../data/batches';
import { CheckCircle2, AlertTriangle, FileText, Download, Search, FlaskConical, ScanLine, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

type Status = 'idle' | 'found' | 'not-found';

const Verify: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('batch') ?? '');
  const [status, setStatus] = useState<Status>('idle');
  const [record, setRecord] = useState<BatchRecord | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runLookup = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    const hit = findBatch(trimmed);
    setRecord(hit ?? null);
    setStatus(hit ? 'found' : 'not-found');
    setSearchParams(hit ? { batch: hit.batch } : { batch: trimmed }, { replace: true });
  };

  // Deep link: /verify?batch=XXXX (e.g. from a QR code on the bottle) checks automatically
  useEffect(() => {
    const fromUrl = searchParams.get('batch');
    if (fromUrl) runLookup(fromUrl);
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate each new result in
  useEffect(() => {
    if (status === 'idle' || !resultRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(
      resultRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );
    return () => {
      tween.kill();
    };
  }, [status, record]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runLookup(query);
  };

  const product = record ? products.find((p) => p.slug === record.product) : undefined;
  const expired = record ? isExpired(record.expDate) : false;
  const accentClass = product?.gender === 'men' ? 'text-men' : 'text-women';

  return (
    <>
      <SEO
        title="Verify Your Batch — COA & Claim Reports"
        description="Enter the batch number from your ONCE HEALTH bottle to view its Certificate of Analysis (COA) and claim test report."
      />

      {/* ───────── Hero + lookup ───────── */}
      <section className="relative pt-32 pb-20 bg-bg overflow-hidden">
        <div className="absolute -right-40 -top-24 opacity-20 pointer-events-none" aria-hidden="true">
          <ConcentricRings size={620} color="#49BC39" rings={5} animateOnScroll={false} />
        </div>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">
          <BackButton className="mb-10" />

          <span className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-eyebrow text-brand-green mb-4">
            <ShieldCheck className="w-4 h-4" />
            Batch verification
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-ink tracking-tightest leading-[1.05] mb-5">
            Check what’s in <span className="italic font-medium text-ink/70">your</span> bottle.
          </h1>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-xl mb-10">
            Every batch of ONCE is third party tested. Enter the batch number printed on your bottle to
            view its Certificate of Analysis (COA) and claim report.
          </p>

          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3" role="search">
            <label htmlFor="batch-input" className="sr-only">
              Batch number
            </label>
            <div className="relative flex-1">
              <ScanLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted pointer-events-none" />
              <input
                id="batch-input"
                ref={inputRef}
                type="text"
                inputMode="text"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="Enter batch number, e.g. DEMO-W-001"
                className="w-full pl-12 pr-4 py-4 text-base font-mono uppercase tracking-wider bg-surface border border-line rounded-brand focus:outline-none focus:border-ink transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:font-body placeholder:text-ink-muted/60"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-ink text-surface font-heading font-semibold text-sm rounded-brand hover:bg-ink/85 transition-colors active:scale-[0.99]"
            >
              <Search className="w-4 h-4" />
              Verify batch
            </button>
          </form>
          <p className="mt-3 text-xs text-ink-muted">
            {/* TODO client: confirm exactly where the batch number is printed on the bottle */}
            You’ll find the batch (lot) number printed on your bottle, usually next to the expiry date.
          </p>

          {/* ───────── Result ───────── */}
          <div data-no-reveal aria-live="polite">
            {status === 'found' && record && product && (
              <div
                ref={resultRef}
                className="mt-10 rounded-2xl border border-line bg-surface shadow-card overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 sm:px-8 py-4 bg-brand-green/10 border-b border-line">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  <p className="text-sm font-heading font-semibold text-ink">Batch verified — this is a genuine ONCE batch.</p>
                </div>

                {record.demo && (
                  <div className="px-6 sm:px-8 py-2.5 bg-ink/5 border-b border-line text-[11px] font-mono uppercase tracking-wider text-ink-muted">
                    Demo record for testing — not a real production batch
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-8 p-6 sm:p-8">
                  <div className="w-24 sm:w-28 mx-auto sm:mx-0">
                    <BottleImage gender={product.gender} alt={product.name} withShadow={false} />
                  </div>

                  <div>
                    <span className={`text-xs font-heading font-semibold uppercase tracking-eyebrow ${accentClass}`}>
                      {product.eyebrow}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ink mt-1 mb-5">{product.name}</h2>

                    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                      <div>
                        <dt className="text-[11px] font-heading font-semibold uppercase tracking-wider text-ink-muted">Batch no.</dt>
                        <dd className="font-mono text-ink mt-0.5">{record.batch}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-heading font-semibold uppercase tracking-wider text-ink-muted">Pack size</dt>
                        <dd className="text-ink mt-0.5">{product.capsules} capsules</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-heading font-semibold uppercase tracking-wider text-ink-muted">Manufactured</dt>
                        <dd className="text-ink mt-0.5">{formatMonth(record.mfgDate)}</dd>
                      </div>
                      <div>
                        <dt className="text-[11px] font-heading font-semibold uppercase tracking-wider text-ink-muted">Best before</dt>
                        <dd className={`mt-0.5 ${expired ? 'text-red-700 font-semibold' : 'text-ink'}`}>
                          {formatMonth(record.expDate)}
                        </dd>
                      </div>
                      {record.testedBy && (
                        <div>
                          <dt className="text-[11px] font-heading font-semibold uppercase tracking-wider text-ink-muted">Tested by</dt>
                          <dd className="text-ink mt-0.5">{record.testedBy}</dd>
                        </div>
                      )}
                      {record.reportDate && (
                        <div>
                          <dt className="text-[11px] font-heading font-semibold uppercase tracking-wider text-ink-muted">Report date</dt>
                          <dd className="text-ink mt-0.5">{record.reportDate}</dd>
                        </div>
                      )}
                    </dl>

                    {expired && (
                      <p className="mt-5 flex items-start gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-brand p-3">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        This batch is past its best-before date. Please do not use it, and contact {DISTRIBUTOR.email}.
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-6 sm:px-8 pb-6 sm:pb-8">
                  {[
                    { label: 'Certificate of Analysis', short: 'COA', url: record.coaUrl },
                    { label: 'Claim Report', short: 'Claims', url: record.claimReportUrl },
                  ].map((doc) => (
                    <div key={doc.short} className="flex items-center gap-3 rounded-brand border border-line bg-bg p-4">
                      <span className="w-10 h-10 rounded-brand bg-surface border border-line flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-ink" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-heading font-semibold text-ink truncate">{doc.label}</p>
                        <p className="text-[11px] text-ink-muted">PDF · Batch {record.batch}</p>
                      </div>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-xs font-heading font-semibold bg-ink text-surface rounded-brand hover:bg-ink/85 transition-colors"
                      >
                        View
                      </a>
                      <a
                        href={doc.url}
                        download
                        aria-label={`Download ${doc.label}`}
                        className="p-2 text-ink-muted hover:text-ink transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>

                <div className="px-6 sm:px-8 py-4 border-t border-line bg-bg/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-ink-muted">Want another bottle of {product.name}?</span>
                  <Link to={`/products/${product.slug}`} className="font-heading font-semibold text-ink hover:text-brand-green transition-colors">
                    View product →
                  </Link>
                </div>
              </div>
            )}

            {status === 'not-found' && (
              <div
                ref={resultRef}
                className="mt-10 rounded-2xl border border-red-200 bg-red-50/70 p-6 sm:p-8 flex items-start gap-4"
              >
                <AlertTriangle className="w-6 h-6 text-red-700 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-heading font-bold text-ink mb-1">We couldn’t find that batch.</h2>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    Please check the number on your bottle and try again — letters and numbers must match.
                    Still not found? Email{' '}
                    <a href={`mailto:${DISTRIBUTOR.email}?subject=Batch%20verification`} className="underline text-ink hover:text-brand-green">
                      {DISTRIBUTOR.email}
                    </a>{' '}
                    with a photo of the batch number and we’ll help.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── What the reports mean ───────── */}
      <section className="py-20 bg-surface border-t border-line">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="max-w-xl mb-12">
            <span className="text-xs font-heading font-semibold uppercase tracking-eyebrow text-ink-muted block mb-3">
              What you’ll see
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink tracking-tight">
              Two reports for every batch.
            </h2>
          </div>
          <div data-reveal-children className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: ScanLine,
                title: '1. Enter your batch number',
                text: 'Type the batch (lot) number from your bottle, or scan the QR code on the pack if it has one.',
              },
              {
                icon: FlaskConical,
                title: '2. Certificate of Analysis',
                text: 'The COA is the third-party lab’s test result for that exact batch.',
              },
              {
                icon: FileText,
                title: '3. Claim Report',
                text: 'Shows the claims on the label — like the vitamin and mineral amounts — checked against the batch.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-line bg-bg p-7">
                <span className="w-11 h-11 rounded-full bg-brand-green/15 text-brand-green flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-heading font-bold text-ink mb-2">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Verify;
