import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ContentContainer } from '../ui/ContentContainer';
import { Button } from '../ui/Button';

export const PromotionalBanner: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#062B45] text-white">
      {/* Wide Resort Backdrop Photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2200&q=85"
          alt="Skyview Luxury Resort Sunset Panorama"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {/* Dark Luxury Gradient for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041D2F] via-[#062B45]/90 to-[#041D2F]/80" />
      </div>

      <ContentContainer size="7xl" className="relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span>MAKE YOUR NEXT STAY SPECIAL</span>
          </span>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-tight text-white mb-4">
            Your Next Escape Starts Here
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-light mb-8 max-w-2xl">
            Explore our curated suites and discover an oceanfront retreat designed around sublime comfort and relaxation.
          </p>

          {/* CTA Button */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              to="/rooms"
              variant="gold"
              size="lg"
              icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              className="group shadow-lg hover:shadow-xl font-medium"
            >
              Explore Available Rooms
            </Button>
            <span className="text-xs text-[#DFCA9B] font-medium tracking-wide">
              Seasonal packages & special member privileges
            </span>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};
