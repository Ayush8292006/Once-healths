import React from 'react';
import { ArrowUpRight, ShoppingCart } from 'lucide-react';
import { AMAZON_STORE_URL, AMAZON_LIVE } from '../data/amazon';

interface AmazonButtonProps {
  url?: string;
  /**
   * Every "Buy on Amazon" button renders as the premium blue Amazon-style pill.
   * Only 'amazonCart' switches to the light "Add to Cart" look.
   * The older variant names are still accepted so existing call sites keep working.
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'women' | 'men' | 'amazon' | 'amazonCart';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
  showIcon?: boolean;
  /** Text shown while AMAZON_LIVE is false. Defaults to "Coming Soon on Amazon". */
  comingSoonLabel?: string;
}

export const AmazonButton: React.FC<AmazonButtonProps> = ({
  url = AMAZON_STORE_URL,
  variant = 'amazon',
  size = 'md',
  label = 'Buy on Amazon',
  className = '',
  showIcon = true,
  comingSoonLabel = 'Coming Soon on Amazon',
}) => {
  const isCart = variant === 'amazonCart';

  const pillSize = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-[15px] px-8 py-[15px] gap-2.5',
  }[size];

  // Pre-launch: same premium pill, not clickable. Cart buttons are hidden entirely.
  if (!AMAZON_LIVE) {
    if (isCart) return null;
    return (
      <span
        role="button"
        aria-disabled="true"
        title="Launching soon on Amazon"
        className={`amz-btn amz-btn--buy amz-btn--soon relative inline-flex items-center justify-center rounded-full font-heading font-semibold tracking-wide whitespace-nowrap select-none cursor-default ${pillSize} ${className}`}
      >
        <span className="amz-soon-dot" aria-hidden="true" />
        <span className="relative inline-flex flex-col items-center leading-none">
          <span>{comingSoonLabel}</span>
          <svg aria-hidden="true" viewBox="0 0 100 14" className="amz-smile mt-[3px] w-[62%] h-[6px]" fill="none">
            <path d="M3 3 C 30 13, 70 13, 92 4" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <path d="M83 2 L 95 3 L 91 13" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Buy"
      className={`amz-btn ${isCart ? 'amz-btn--cart' : 'amz-btn--buy'} group relative inline-flex items-center justify-center rounded-full font-heading font-semibold tracking-wide whitespace-nowrap select-none ${pillSize} ${className}`}
    >
      {isCart && <ShoppingCart className="w-[1.1em] h-[1.1em] shrink-0" strokeWidth={2.2} />}
      <span className="relative inline-flex flex-col items-center leading-none">
        <span>{label}</span>
        {!isCart && (
          /* Amazon-style smile arrow under the label */
          <svg
            aria-hidden="true"
            viewBox="0 0 100 14"
            className="amz-smile mt-[3px] w-[62%] h-[6px] transition-transform duration-300 group-hover:scale-x-110"
            fill="none"
          >
            <path d="M3 3 C 30 13, 70 13, 92 4" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            <path d="M83 2 L 95 3 L 91 13" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {showIcon && !isCart && (
        <ArrowUpRight className="w-[1.05em] h-[1.05em] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </a>
  );
};
