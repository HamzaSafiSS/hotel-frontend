import React from 'react';
import { ArrowRight, Utensils } from 'lucide-react';
import { ContentContainer } from '../ui/ContentContainer';
import { Button } from '../ui/Button';
import { useHotelStore } from '../../store/hotelStore';

export const HeroSection: React.FC = () => {
  const { content } = useHotelStore();

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center py-20 lg:py-28 overflow-hidden">
      {/* Background Image with High-End Resort Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2400&q=85"
          alt="Luxury Resort Infinity Pool and Coastal Horizon"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
          loading="eager"
        />
        {/* Refined Luxury Gradient Overlays: reveals rich photographic detail while preserving typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#062B45] via-[#062B45]/45 to-[#041D2F]/40" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto w-full">
        <ContentContainer size="7xl">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Eyebrow */}
            <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-3 sm:mb-4 drop-shadow-xs">
              {content.heroEyebrow || 'LUXURY STAYS. UNFORGETTABLE JOURNEYS.'}
            </span>

            {/* Main Heading */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-white drop-shadow-md">
              {content.heroHeading || 'Your Perfect Getaway Awaits.'}
            </h1>

            {/* Description */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-100 max-w-2xl leading-relaxed font-light drop-shadow-xs">
              {content.heroDescription || 'Discover exceptional comfort, thoughtful hospitality, and memorable experiences at Skyview Hotels & Resorts.'}
            </p>

            {/* Hero Buttons: Centered horizontally as a group, side-by-side on desktop, stacked on mobile */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                to="/rooms"
                variant="gold"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                className="w-full sm:w-auto shadow-lg hover:shadow-xl font-medium tracking-wide group"
              >
                {content.heroButtonRoomsLabel || 'Explore Available Rooms'}
              </Button>

              <Button
                to="/menu"
                variant="secondary"
                size="lg"
                icon={<Utensils className="w-4 h-4 text-[#062B45]" />}
                iconPosition="left"
                className="w-full sm:w-auto bg-white/95 hover:bg-white text-[#062B45] border-white/80 shadow-lg font-medium"
              >
                {content.heroButtonMenuLabel || 'Browse Restaurant & Menu'}
              </Button>
            </div>
          </div>
        </ContentContainer>
      </div>
    </section>
  );
};
