import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextOptions {
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerStart?: string;
}

export function useRevealText<T extends HTMLElement = HTMLHeadingElement>(
  options: RevealTextOptions = {}
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const {
      delay = 0,
      duration = 0.9,
      stagger = 0.08,
      triggerStart = 'top 85%',
    } = options;

    const ctx = gsap.context(() => {
      // If element has .reveal-line children, animate those, else animate the element itself
      const lines = el.querySelectorAll('.reveal-line');
      const targets = lines.length > 0 ? lines : [el];

      gsap.fromTo(
        targets,
        {
          yPercent: 100,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: triggerStart,
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options.delay, options.duration, options.stagger, options.triggerStart]);

  return elementRef;
}

