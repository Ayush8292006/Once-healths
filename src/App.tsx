import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider, useSetPreloaderFinished } from './context/AppContext';

// Layout
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { PageTransition } from './components/PageTransition';
import { CustomCursor } from './components/CustomCursor';

// Pages
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Shop from './pages/Shop';
import Science from './pages/Science';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import LegalPage from './pages/LegalPage';
import Verify from './pages/Verify';

import './styles/index.css';

gsap.registerPlugin(ScrollTrigger);

const AppInner: React.FC<{ lenisInstance: Lenis | null }> = ({ lenisInstance }) => {
  const setPreloaderFinished = useSetPreloaderFinished();

  return (
    <>
      <Preloader onComplete={setPreloaderFinished} />
      <CustomCursor />
      <Header />
      <main className="pt-0">
        <PageTransition lenisInstance={lenisInstance}>
          {(displayLocation) => (
          <Routes location={displayLocation}>
            <Route path="/" element={<Home />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/science" element={<Science />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/privacy" element={<LegalPage type="privacy" />} />
            <Route path="/terms" element={<LegalPage type="terms" />} />
            <Route path="/disclaimer" element={<LegalPage type="disclaimer" />} />
            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          )}
        </PageTransition>
      </main>
      <Footer />
    </>
  );
};

const NotFound: React.FC = () => (
  <section className="min-h-screen flex items-center justify-center bg-bg">
    <div className="text-center max-w-md px-5">
      <div className="text-8xl font-heading font-bold text-ink/10 mb-4">404</div>
      <h1 className="text-3xl font-heading font-bold text-ink mb-3">Page Not Found</h1>
      <p className="text-sm text-ink-muted mb-8">
        The page you're looking for doesn't exist. Try our home page or explore our formulas.
      </p>
      <Link to="/" className="inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-surface text-sm font-heading font-bold rounded-brand hover:bg-ink/85 transition-colors">
        ← Back to Home
      </Link>
    </div>
  </section>
);

const App: React.FC = () => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Phones/tablets already have the smoothest scroll there is: the native, compositor-driven one.
    // Re-implementing it in JS (Lenis) adds lag and jitter on touch, so smoothing is desktop-only.
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;

    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    if (!isTouch) {
      lenis = new Lenis({
        lerp: 0.12,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
      });
      const instance = lenis;
      // Sync Lenis with GSAP ScrollTrigger
      instance.on('scroll', ScrollTrigger.update);
      // keep a reference so cleanup removes the SAME function
      raf = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // address-bar show/hide on phones must not re-trigger layout calculations mid-scroll
    ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

    setLenisInstance(lenis);

    // Recalculate trigger positions once all images/fonts have loaded
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener('load', refresh);
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <AppProvider>
        <BrowserRouter>
          <AppInner lenisInstance={lenisInstance} />
        </BrowserRouter>
      </AppProvider>
    </HelmetProvider>
  );
};

export default App;
