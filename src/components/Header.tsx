import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AmazonButton } from './AmazonButton';
import { AnnouncementBar } from './AnnouncementBar';
import gsap from 'gsap';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  // Pages that open with a dark hero (Science): the transparent navbar must switch to light text
  const DARK_HERO_PATHS = ['/science'];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll detection: transparent -> solid at 80px, hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 6) {
          setIsVisible(false); // scrolling down
        } else if (currentScrollY < lastScrollY.current && lastScrollY.current - currentScrollY > 6) {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate mobile menu links
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const links = mobileMenuRef.current.querySelectorAll('.mobile-nav-link');
      gsap.fromTo(
        links,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const onDarkHero = DARK_HERO_PATHS.includes(location.pathname) && !isScrolled;

  const navItems = [
    { label: 'Shop', path: '/shop' },
    { label: "Women's", path: '/products/womens-multi' },
    { label: "Men's", path: '/products/mens-multi' },
    { label: 'The Science', path: '/science' },
    { label: 'Our Story', path: '/about' },
    { label: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-bg/95 md:backdrop-blur-md border-b border-line shadow-sm'
            : 'bg-transparent'
        }`}
      >
        {/* Announcement bar lives inside the fixed header so it never overlaps the nav */}
        {!isScrolled && <AnnouncementBar />}
        <div
          className={`max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6 transition-all duration-300 ${
            isScrolled ? 'py-3.5' : 'py-5'
          }`}
        >
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 -ml-2 transition-colors ${
              onDarkHero ? 'text-surface hover:text-surface/70' : 'text-ink hover:text-ink/70'
            }`}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Nav Left (Desktop) */}
          <nav ref={navLinksRef} className="hidden lg:flex items-center gap-7 xl:gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm tracking-wide font-medium transition-colors duration-200 relative py-1 ${
                    onDarkHero
                      ? isActive
                        ? 'text-surface font-semibold'
                        : 'text-surface/75 hover:text-surface'
                      : isActive
                        ? 'text-ink font-semibold'
                        : 'text-ink/75 hover:text-ink'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-green rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Buy on Amazon button (Desktop) + Logo */}
          <div className="flex items-center gap-4 sm:gap-5 ml-auto">
            <div className="hidden sm:block">
              <AmazonButton size="sm" variant={onDarkHero ? 'secondary' : 'primary'} />
            </div>

            {/* Logo Right */}
            <Link to="/" className="flex items-center gap-2 group" aria-label="ONCE HEALTH Home">
              <img
                src="/images/once-health-logo.svg"
                alt="ONCE HEALTH"
                className={`h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                  onDarkHero ? 'brightness-0 invert' : ''
                }`}
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-50 bg-bg transition-opacity duration-300 flex flex-col justify-between p-8 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Header bar inside mobile menu */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 -ml-2 text-ink hover:text-ink/70"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/images/once-health-logo.svg" alt="ONCE HEALTH" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-6 my-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-link text-3xl font-heading font-semibold text-ink hover:text-brand-green transition-colors tracking-tight"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-nav-link text-2xl font-heading text-ink/70 hover:text-ink transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile footer CTA */}
        <div className="pt-6 border-t border-line flex flex-col gap-4">
          <AmazonButton size="lg" className="w-full text-center" />
          <p className="text-xs text-ink/60 text-center tracking-wide">
            Prime 1-2 day delivery &amp; Subscribe &amp; Save available.
          </p>
        </div>
      </div>
    </>
  );
};

