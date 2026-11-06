import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageReady } from '../context/AppContext';

gsap.registerPlugin(ScrollTrigger);

interface ConcentricRingsProps {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  rings?: number;
  animateOnScroll?: boolean;
  opacity?: number;
}

export const ConcentricRings: React.FC<ConcentricRingsProps> = ({
  className = '',
  size = 400,
  color = 'currentColor',
  strokeWidth = 1,
  rings = 5,
  animateOnScroll = true,
  opacity = 0.35,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Rings only start drawing once the page has been uncovered (see PageTransition),
  // otherwise they would finish behind the transition panel.
  const pageReady = usePageReady();

  useLayoutEffect(() => {
    if (!animateOnScroll || !svgRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const circles = svgRef.current.querySelectorAll('circle');
    const ctx = gsap.context(() => {
      circles.forEach((circle, i) => {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        gsap.set(circle, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
        });

        if (!pageReady) return;

        gsap.to(circle, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, [animateOnScroll, pageReady]);

  // Generate radii dynamically based on rings count
  const baseRadii = [35, 70, 110, 155, 195, 235];
  const activeRadii = baseRadii.slice(0, rings);

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-none select-none ${className}`}
      width={size}
      height={size}
      viewBox="-250 -250 500 500"
      fill="none"
      style={{ opacity }}
    >
      {activeRadii.map((r, index) => (
        <circle
          key={index}
          cx="0"
          cy="0"
          r={r}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeOpacity={1 - index * 0.12}
        />
      ))}
      {/* Center pinpoint */}
      <circle cx="0" cy="0" r="3" fill={color} fillOpacity={0.6} />
    </svg>
  );
};

