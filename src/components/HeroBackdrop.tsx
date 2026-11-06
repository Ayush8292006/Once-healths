import React from 'react';

/**
 * Background for the opening hero: a soft, static colour wash and paper grain.
 * (No floating capsules – everything here sits still.)
 */
export const HeroBackdrop: React.FC = () => (
  <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="hb-wash absolute -inset-[10%]" />
    <div className="hb-grain absolute inset-0" />
  </div>
);
