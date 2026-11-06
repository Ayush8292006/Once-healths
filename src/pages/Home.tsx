import React from 'react';
import { usePageReady } from '../context/AppContext';
import { SEO } from '../components/SEO';
import { Hero } from '../sections/Hero';
import { TrustMarquee } from '../sections/TrustMarquee';
import { PinnedBottleStory } from '../sections/PinnedBottleStory';
import { FormulaChooser } from '../sections/FormulaChooser';
import { StackingCards } from '../sections/StackingCards';
import { QualityScience } from '../sections/QualityScience';
import { RatingsShowcase } from '../sections/RatingsShowcase';
import { DailyRitual } from '../sections/DailyRitual';
import { ReviewsCarousel } from '../sections/ReviewsCarousel';
import { FAQPreview } from '../sections/FAQPreview';
import { FinalCTA } from '../sections/FinalCTA';
import { VsTypicalMultis, HowToBuy } from '../sections/VsTypicalMultis';

const Home: React.FC = () => {
  const isPageReady = usePageReady();

  return (
    <>
      <SEO
        title="ONCE HEALTH — One Daily Habit. Built for How You Live."
        description="Premium bioavailable multivitamins for Women and Men. Methylated B12 & Folate, Magnesium Glycinate. Coming soon on Amazon."
      />
      <Hero isPreloaderFinished={isPageReady} />
      <TrustMarquee />
      <PinnedBottleStory />
      <FormulaChooser />
      <StackingCards />
      <VsTypicalMultis />
      <RatingsShowcase />
      <QualityScience />
      <DailyRitual />
      <HowToBuy />
      <ReviewsCarousel />
      <FAQPreview />
      <FinalCTA />
    </>
  );
};

export default Home;
