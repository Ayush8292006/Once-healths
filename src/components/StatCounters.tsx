import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface Stat {
  /** Number to count up to. `null` = not supplied yet → `placeholder` is shown instead (no animation). */
  value: number | null;
  /** Shown after the number, e.g. "+", "%", "★" */
  suffix?: string;
  /** Shown before the number */
  prefix?: string;
  /** Decimal places for the count-up (e.g. 1 for 4.8) */
  decimals?: number;
  /** Text shown while `value` is null */
  placeholder?: string;
  label: string;
  /** Tailwind text colour class for the number */
  colorClass?: string;
}

const format = (n: number, decimals: number) =>
  decimals > 0
    ? n.toFixed(decimals)
    : Math.round(n).toLocaleString('en-US');

/** Row of numbers that count up once when scrolled into view. */
export const StatCounters: React.FC<{ stats: Stat[]; className?: string }> = ({ stats, className = '' }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      row.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const target = parseFloat(el.dataset.count || '0');
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        if (reduce) {
          el.textContent = format(target, decimals);
          return;
        }
        const obj = { v: 0 };
        el.textContent = format(0, decimals);
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none none' },
          onUpdate: () => {
            el.textContent = format(obj.v, decimals);
          },
        });
      });
    }, row);

    return () => ctx.revert();
  }, [stats]);

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-center md:text-left ${className}`}
    >
      {stats.map((s) => (
        <div key={s.label}>
          <div className={`text-4xl sm:text-5xl font-heading font-bold mb-2 tabular-nums ${s.colorClass ?? 'text-ink'}`}>
            {s.value === null ? (
              <span>{s.placeholder ?? '—'}</span>
            ) : (
              <>
                {s.prefix}
                <span data-count={s.value} data-decimals={s.decimals ?? 0}>
                  {format(s.value, s.decimals ?? 0)}
                </span>
                {s.suffix}
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm font-heading font-medium tracking-wide uppercase text-ink-muted">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
};
