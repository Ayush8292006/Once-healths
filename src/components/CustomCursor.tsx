import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on fine pointer / desktop
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3' });

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);

      // Check if target or parent has data-cursor attribute
      const target = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement;
      if (target) {
        const text = target.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovering(true);
      } else {
        setCursorText('');
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color,border-radius,opacity] duration-300 ease-out flex items-center justify-center font-heading text-[10px] tracking-wider uppercase font-semibold text-surface select-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${
        isHovering
          ? 'w-16 h-16 bg-ink shadow-lift backdrop-blur-sm'
          : 'w-3 h-3 bg-ink/75'
      }`}
      style={{ willChange: 'transform' }}
    >
      {isHovering && <span className="animate-fade-in">{cursorText}</span>}
    </div>
  );
};

