import gsap from 'gsap';

/**
 * Automatic scroll-reveal for every page.
 *
 * Instead of hand-wiring ScrollTrigger tweens into each section (which break when a page is
 * swapped in behind the transition panel), a page is scanned once after it mounts:
 *   1. prepareReveal()  – finds the "units" (headings, paragraphs, cards …) and hides them
 *                         before the first paint, while the page is still covered
 *   2. startReveal()    – an IntersectionObserver plays each unit in as it scrolls into view
 *
 * IntersectionObserver reads real layout positions, so late-loading images or fonts can never
 * leave content stuck invisible the way stale ScrollTrigger positions could.
 *
 * Opt-outs / controls (HTML attributes):
 *   data-no-reveal         – leave this element (and its subtree) alone, e.g. pinned sections
 *   data-reveal            – force this element to be a unit
 *   data-reveal-children   – make every direct child its own staggered unit
 */

/** Phones: shorter travel + slightly quicker, so reveals keep up with a flick of the thumb */
const isTouch = () => window.matchMedia('(pointer: coarse)').matches;

const VISUAL_RE = /(^|\s)(rounded|border|bg-|shadow|overflow-hidden|backdrop)/;
const MAX_DEPTH = 4;

interface Unit {
  el: HTMLElement;
  /** position among its siblings – drives the stagger */
  index: number;
}

const isLayoutWrapper = (el: HTMLElement): boolean => {
  if (el.hasAttribute('data-reveal')) return false;
  if (el.hasAttribute('data-reveal-children')) return true;
  const tag = el.tagName;
  if (tag === 'SECTION') return true;
  if (tag !== 'DIV') return false;
  const cls = el.className && typeof el.className === 'string' ? el.className : '';
  if (VISUAL_RE.test(cls)) return false;
  const tokens = cls.split(/\s+/);
  const hasGrid = tokens.some((t) => t === 'grid' || t === 'lg:grid' || t === 'md:grid');
  const hasMaxW = tokens.some((t) => t.startsWith('max-w-'));
  const isFlexCol = tokens.includes('flex') && tokens.includes('flex-col');
  const onlyChild = el.children.length === 1;
  return hasGrid || hasMaxW || isFlexCol || onlyChild;
};

const shouldSkip = (el: HTMLElement): boolean => {
  if (el.hasAttribute('data-no-reveal')) return true;
  const tag = el.tagName;
  if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return true;
  const cs = window.getComputedStyle(el);
  if (cs.display === 'none') return true;
  // decorative / overlay / sticky layers must never be moved around
  if (cs.position === 'absolute' || cs.position === 'fixed' || cs.position === 'sticky') return true;
  return false;
};

const collect = (parent: HTMLElement, depth: number, out: Unit[]) => {
  let index = 0;
  Array.from(parent.children).forEach((child) => {
    if (!(child instanceof HTMLElement)) return;
    if (shouldSkip(child)) return;

    if (depth < MAX_DEPTH && child.children.length > 0 && isLayoutWrapper(child)) {
      collect(child, depth + 1, out);
      return;
    }
    out.push({ el: child, index: index++ });
  });
};

export interface PreparedReveal {
  units: Unit[];
}

/** Hide everything that will animate in. Call before paint (useLayoutEffect). */
export function prepareReveal(root: HTMLElement | null): PreparedReveal {
  const prepared: PreparedReveal = { units: [] };
  if (!root) return prepared;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return prepared;

  collect(root, 0, prepared.units);

  prepared.units.forEach(({ el }) => {
    // Tailwind's `transition-*` classes would smooth every GSAP frame a second time → laggy.
    el.style.transition = 'none';
    gsap.set(el, { opacity: 0, y: isTouch() ? 22 : 36, willChange: 'transform, opacity' });
  });
  return prepared;
}

const restore = (el: HTMLElement) => {
  gsap.set(el, { clearProps: 'opacity,transform,willChange' });
  el.style.transition = '';
};

/**
 * Begin playing units in as they scroll into view.
 * Returns a cleanup that stops everything and leaves all units fully visible.
 */
export function startReveal(
  prepared: PreparedReveal,
  options: { instantInView?: boolean } = {}
): () => void {
  const { units } = prepared;
  if (units.length === 0) return () => {};

  const byEl = new Map<Element, Unit>();
  units.forEach((u) => byEl.set(u.el, u));
  const shown = new Set<Element>();
  // first observer callback = whatever is already on screen when the page opens
  let firstBatch = options.instantInView === true;

  const play = (entries: IntersectionObserverEntry[]) => {
    const due = entries
      .filter((e) => (e.isIntersecting || e.boundingClientRect.top < 0) && !shown.has(e.target))
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);

    const instantBatch = firstBatch;
    firstBatch = false;

    due.forEach((entry, i) => {
      const el = entry.target as HTMLElement;
      shown.add(el);
      io.unobserve(el);
      // elements already above the viewport (anchor jumps) appear instantly
      const instant = instantBatch || entry.boundingClientRect.bottom < 0;
      if (instant) {
        restore(el);
        return;
      }
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: isTouch() ? 0.7 : 0.9,
        delay: Math.min(i * (isTouch() ? 0.06 : 0.09), isTouch() ? 0.3 : 0.45),
        ease: 'power3.out',
        force3D: true,
        overwrite: 'auto',
        onComplete: () => restore(el),
      });
    });
  };

  const io = new IntersectionObserver(play, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
  units.forEach(({ el }) => {
    // Pages that open without an entrance: whatever is already on screen is shown synchronously,
    // so there is not even a one-frame flash of hidden content.
    if (options.instantInView && el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      shown.add(el);
      restore(el);
      return;
    }
    io.observe(el);
  });

  return () => {
    io.disconnect();
    units.forEach(({ el }) => {
      gsap.killTweensOf(el);
      restore(el);
    });
    byEl.clear();
  };
}
