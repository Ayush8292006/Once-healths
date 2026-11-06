import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, type Location } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';
import { usePreloaderFinished, useSetPageReady } from '../context/AppContext';
import { intro } from '../animations/intro';
import { prepareReveal, startReveal, type PreparedReveal } from '../animations/pageReveal';

interface PageTransitionProps {
  /** Receives the location that should currently be rendered. */
  children: (displayLocation: Location) => React.ReactNode;
  lenisInstance: Lenis | null;
}

/**
 * Route handling.
 *  - Opening the site: preloader → first page animates in (hero + scroll reveals).
 *  - Navigating afterwards: the new page opens instantly at the top, with no wipe and no
 *    entrance animation. Only scroll-reveals further down the page still play as you scroll.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children, lenisInstance }) => {
  const location = useLocation();
  const setPageReady = useSetPageReady();
  const preloaderFinished = usePreloaderFinished();

  const [displayLocation, setDisplayLocation] = useState<Location>(location);
  const pageRef = useRef<HTMLDivElement>(null);

  const lenisRef = useRef<Lenis | null>(lenisInstance);
  lenisRef.current = lenisInstance;
  const preloaderDoneRef = useRef(preloaderFinished);
  preloaderDoneRef.current = preloaderFinished;
  const pendingStartRef = useRef<(() => void) | null>(null);
  const firstPageRef = useRef(true);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  const scrollToTarget = (hash: string, immediate: boolean) => {
    const lenis = lenisRef.current;
    let target: HTMLElement | null = null;
    if (hash) {
      try {
        target = document.querySelector<HTMLElement>(hash);
      } catch {
        target = null;
      }
    }
    if (target) {
      if (lenis) lenis.scrollTo(target, { immediate, offset: -90, force: true });
      else {
        const top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
      }
    } else if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  /* Route changed → swap the page straight away */
  useEffect(() => {
    if (location.key === displayLocation.key) return;

    intro.played = true; // from now on pages open instantly

    if (location.pathname === displayLocation.pathname) {
      // hash change / same page
      setDisplayLocation(location);
      scrollToTarget(location.hash, false);
      return;
    }
    setDisplayLocation(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  /* New page mounted → top of page, prepare scroll reveals */
  useLayoutEffect(() => {
    const isFirstPage = firstPageRef.current;
    firstPageRef.current = false;

    if (!isFirstPage) {
      scrollToTarget(displayLocation.hash, true);
      ScrollTrigger.refresh();
    } else if (displayLocation.hash) {
      requestAnimationFrame(() => scrollToTarget(displayLocation.hash, true));
    }

    const prepared: PreparedReveal = prepareReveal(pageRef.current);
    let stop: (() => void) | null = null;

    const begin = () => {
      setPageReady(true);
      // Only the very first page animates in on open; later pages show what is already on screen instantly
      stop = startReveal(prepared, { instantInView: !isFirstPage });
    };

    if (!isFirstPage || preloaderDoneRef.current) begin();
    else pendingStartRef.current = begin; // wait for the preloader

    return () => {
      pendingStartRef.current = null;
      if (stop) stop();
      else startReveal(prepared)(); // torn down before starting → just make everything visible
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayLocation.pathname]);

  /* Preloader finished → first page may animate in */
  useEffect(() => {
    if (preloaderFinished && pendingStartRef.current) {
      const run = pendingStartRef.current;
      pendingStartRef.current = null;
      run();
    }
  }, [preloaderFinished]);

  return (
    <div key={displayLocation.pathname} ref={pageRef}>
      {children(displayLocation)}
    </div>
  );
};
