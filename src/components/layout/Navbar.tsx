import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Compass } from 'lucide-react';
import { NAV_LINKS } from '../../data/siteData';
import { Button } from '../ui/Button';
import { useHotelStore } from '../../store/hotelStore';

export const Navbar: React.FC = () => {
  const { settings } = useHotelStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Track scroll state for subtle elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const brandFirstWord = settings?.hotelName ? settings.hotelName.split(' ')[0] : 'Skyview';
  const brandRest = settings?.hotelName && settings.hotelName.includes(' ')
    ? settings.hotelName.substring(settings.hotelName.indexOf(' ') + 1)
    : 'Hotels & Resorts';

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#D8E0EA]'
          : 'bg-white/90 backdrop-blur-sm border-b border-[#D8E0EA]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B] rounded-md py-1"
            aria-label={`${settings?.hotelName || 'Skyview Hotels & Resorts'} Home`}
          >
            {/* Geometric Mountain/Peak Monogram Icon or configured Logo */}
            {settings?.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt={settings.hotelName}
                className="w-10 h-10 rounded-lg object-cover border border-[#D8E0EA]"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-[#062B45] text-[#C7A66B] flex items-center justify-center shadow-xs group-hover:bg-[#0A3D60] transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-105"
                >
                  <path d="M12 3L2 19h20L12 3zm0 4.2L18.1 17H5.9L12 7.2z" />
                  <path d="M12 11.5l3.5 5.5H8.5l3.5-5.5z" opacity="0.8" />
                </svg>
              </div>
            )}

            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#062B45] leading-none group-hover:text-[#0A3D60] transition-colors">
                {brandFirstWord}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#C7A66B] font-semibold mt-0.5">
                {brandRest}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium tracking-wide transition-colors rounded-md duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B] ${
                    isActive
                      ? 'text-[#062B45] font-semibold'
                      : 'text-[#60758B] hover:text-[#062B45] hover:bg-[#EAF2FF]/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#C7A66B] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action: Book a Room button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              to="/booking"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              className="group shadow-sm hover:shadow"
            >
              Book a Room
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/booking"
              className="text-xs font-medium bg-[#062B45] text-white px-3.5 py-2 rounded-md hover:bg-[#0A3D60] transition-colors mr-1 sm:hidden focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
            >
              Book
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#062B45] hover:bg-[#EAF2FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Collapsible Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm ml-auto bg-white h-[calc(100vh-5rem)] shadow-2xl flex flex-col justify-between border-l border-[#D8E0EA] p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D8E0EA]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C7A66B]">
                  <Compass className="w-4 h-4" />
                  <span>Navigation Menu</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded text-[#60758B] hover:text-[#062B45]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
                {NAV_LINKS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#EAF2FF] text-[#062B45] font-semibold border-l-4 border-[#C7A66B]'
                          : 'text-[#18324A] hover:bg-gray-50 hover:text-[#062B45]'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="pt-6 mt-6 border-t border-[#D8E0EA] flex flex-col gap-3">
              <Button
                to="/booking"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book a Room
              </Button>

              <p className="text-center text-xs text-[#60758B]">
                Skyview Luxury Experience Concierge
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
