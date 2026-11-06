import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealOptions {
  duration?: number;
  delay?: number;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export function useImageReveal<T extends HTMLElement = HTMLDivElement>(
  options: ImageRevealOptions = {}
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' });
      return;
    }

    const {
      duration = 1.1,
      delay = 0,
      parallax = true,
      parallaxSpeed = 0.15,
    } = options;

    const ctx = gsap.context(() => {
      const img = el.querySelector('img') || el;

      // 1. Clip path reveal
      gsap.fromTo(
        el,
        {
          clipPath: 'inset(100% 0% 0% 0%)',
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Inner scale settling from 1.15 -> 1
      if (img) {
        gsap.fromTo(
          img,
          {
            scale: 1.15,
          },
          {
            scale: 1,
            duration: duration * 1.2,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // 3. Parallax scrub
        if (parallax) {
          gsap.to(img, {
            yPercent: parallaxSpeed * 100,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }
    }, el);

    return () => ctx.revert();
  }, [options.duration, options.delay, options.parallax, options.parallaxSpeed]);

  return containerRef;
}

