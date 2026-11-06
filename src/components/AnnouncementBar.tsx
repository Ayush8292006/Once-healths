import React, { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { AMAZON_STORE_URL, AMAZON_LIVE } from '../data/amazon';

export const AnnouncementBar: React.FC = () => {
  // Remember dismissal for the session (the bar unmounts/remounts as the header changes on scroll)
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('once_announcement_dismissed') === '1';
    } catch {
      return false;
    }
  });

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('once_announcement_dismissed', '1');
    } catch {
      /* storage unavailable — ignore */
    }
  };

  if (dismissed) return null;

  return (
    <div className="relative bg-ink text-surface py-2.5 px-4 text-xs md:text-sm tracking-wide font-medium flex items-center justify-center transition-all duration-300">
      <div className="flex items-center gap-2 text-center pr-6 md:pr-0">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse inline-block" />
        {AMAZON_LIVE ? (
          <>
            <span>Now available on Amazon — Subscribe &amp; Save on your first order</span>
            <a
              href={AMAZON_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-brand-green transition-colors inline-flex items-center gap-0.5 ml-1 font-semibold"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </>
        ) : (
          <span>Coming soon on Amazon — Women&rsquo;s &amp; Men&rsquo;s Multi launching shortly</span>
        )}
      </div>
      <button
        onClick={dismiss}
        className="absolute right-3.5 text-surface/60 hover:text-surface transition-colors p-1"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

