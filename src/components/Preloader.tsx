
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [showPreloader, setShowPreloader] = useState<boolean>(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const panelRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPreloader) {
      onComplete();
      return;
    }

    const root = document.documentElement;
    root.style.overflow = 'hidden';

    let released = false;

    const release = () => {
      if (released) return;
      released = true;
      root.style.overflow = '';
      onComplete();
    };

    const finish = () => {
      release();
      setShowPreloader(false);
    };

    const failsafe = window.setTimeout(finish, 4500);

    const ctx = gsap.context(() => {
      const progress = { v: 0 };

      gsap.set(logoWrapRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        y: 24
      });

      gsap.set(metaRef.current, { opacity: 0 });
      gsap.set(barRef.current, {
        scaleX: 0,
        transformOrigin: 'left center'
      });

      const tl = gsap.timeline({ onComplete: finish });

      tl.to(logoWrapRef.current, {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 0.9,
        ease: 'power3.out'
      })
      .to(metaRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power1.out'
      }, '-=0.6')
      .to(progress, {
        v: 100,
        duration: 1.1,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent =
              String(Math.round(progress.v)).padStart(3, '0');
          }
        }
      }, '-=0.5')
      .to(barRef.current, {
        scaleX: 1,
        duration: 1.1,
        ease: 'power1.inOut'
      }, '<')
      .to([logoWrapRef.current, metaRef.current], {
        opacity: 0,
        y: -12,
        duration: 0.3,
        ease: 'power2.in'
      }, '+=0.1')
      .call(release, [], '-=0.05')
      .to(panelRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'expo.inOut'
      }, '<');
    }, panelRef);

    return () => {
      window.clearTimeout(failsafe);
      root.style.overflow = '';
      ctx.revert();
    };
  }, [showPreloader, onComplete]);

  if (!showPreloader) return null;

  return (
    <div
      ref={panelRef}
      className="pre-bg fixed inset-0 z-[60] flex flex-col items-center justify-center select-none"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center w-full px-8">
        <div ref={logoWrapRef} className="w-44 sm:w-56 md:w-64">
          <img
            src="/images/once-health-logo.svg"
            alt=""
            className="w-full h-auto"
            draggable={false}
          />
        </div>

        <div ref={metaRef} className="mt-10 w-44 sm:w-56 md:w-64">
          <div className="h-px w-full bg-ink/10 overflow-hidden">
            <div ref={barRef} className="h-full w-full bg-brand-green" />
          </div>

          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
            <span>Daily Supplement</span>
            <span ref={counterRef} className="tabular-nums text-ink">
              000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
