import React from 'react';

// Claims below are taken from the packaging label only
const marqueeItems = [
  'Methylated B12 & Folate',
  'Magnesium Glycinate',
  'Third Party Tested',
  'cGMP Certified Facility',
  '60 Capsules',
  '0 Gluten · 0 Dairy',
  'Advanced Bioactive Formula',
  'Batch-Verified COA',
];

export const TrustMarquee: React.FC = () => {
  return (
    <div className="relative border-y border-line bg-surface/50 py-4 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Render twice for continuous loop */}
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <div key={index} className="flex items-center mx-6 sm:mx-8">
            <span className="text-xs sm:text-sm font-heading font-medium tracking-wider uppercase text-ink-muted">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green/60 ml-6 sm:ml-8" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
          will-change: transform;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

