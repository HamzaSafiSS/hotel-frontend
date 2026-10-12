import React from 'react';
import { ArrowRight, Bed, ShieldCheck, UtensilsCrossed, Waves } from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { RoomCard } from '../components/ui/RoomCard';
import { SAMPLE_ROOM_FOUNDATIONS } from '../data/siteData';

export const Home: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Hero Foundation Section */}
      <section className="relative bg-[#062B45] text-white py-20 lg:py-28 overflow-hidden">
        {/* Subtle Luxury Gradient / Glow Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041D2F] via-[#062B45] to-[#0A3D60] opacity-95" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C7A66B]/15 rounded-full blur-3xl pointer-events-none" />

        <ContentContainer className="relative z-10 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-4">
            Luxury Stays, Unforgettable Journeys
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white max-w-4xl mx-auto">
            Your Perfect Getaway Awaits
          </h1>
          <p className="mt-5 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-sans font-light">
            Discover world-class comfort, breathtaking views, and personalized experiences at Skyview Hotels & Resorts.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button to="/booking" variant="gold" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Book a Room
            </Button>
            <Button to="/rooms" variant="secondary" size="lg">
              Explore Rooms & Suites
            </Button>
          </div>

          {/* Phase 1 Status Banner */}
          <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs text-xs text-gray-200">
            <span className="w-2 h-2 rounded-full bg-[#C7A66B] animate-pulse" />
            <span>Phase 1 Initialized — Full homepage experience will be developed in Phase 2.</span>
          </div>
        </ContentContainer>
      </section>

      {/* Highlights Foundation Bar */}
      <section className="border-b border-[#D8E0EA] bg-[#EAF2FF]/40 py-8">
        <ContentContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D8E0EA] flex items-center justify-center text-[#062B45] mb-2 shadow-xs">
                <Bed className="w-5 h-5 text-[#C7A66B]" />
              </div>
              <span className="font-serif font-medium text-sm text-[#062B45]">Luxury Rooms & Suites</span>
              <span className="text-xs text-[#60758B] mt-0.5">Elegant spaces for every traveler</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D8E0EA] flex items-center justify-center text-[#062B45] mb-2 shadow-xs">
                <Waves className="w-5 h-5 text-[#C7A66B]" />
              </div>
              <span className="font-serif font-medium text-sm text-[#062B45]">World-Class Amenities</span>
              <span className="text-xs text-[#60758B] mt-0.5">Pool, spa, fitness & more</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D8E0EA] flex items-center justify-center text-[#062B45] mb-2 shadow-xs">
                <UtensilsCrossed className="w-5 h-5 text-[#C7A66B]" />
              </div>
              <span className="font-serif font-medium text-sm text-[#062B45]">Fine Dining</span>
              <span className="text-xs text-[#60758B] mt-0.5">Global flavors, local ingredients</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white border border-[#D8E0EA] flex items-center justify-center text-[#062B45] mb-2 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#C7A66B]" />
              </div>
              <span className="font-serif font-medium text-sm text-[#062B45]">Trusted & Safe</span>
              <span className="text-xs text-[#60758B] mt-0.5">Your comfort, our priority</span>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* Design System & Component Foundation Showcase */}
      <section className="py-16 sm:py-20 bg-white">
        <ContentContainer>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              eyebrow="FEATURED STAYS"
              title="Exquisite Rooms & Suites"
              description="Thoughtfully designed for your comfort, our rooms blend modern luxury with natural beauty."
            />
            <Button to="/rooms" variant="secondary" icon={<ArrowRight className="w-4 h-4" />}>
              View All Rooms
            </Button>
          </div>

          {/* Sample Foundation Cards (Demonstrating RoomCard component) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_ROOM_FOUNDATIONS.map((room) => (
              <RoomCard
                key={room.id}
                title={room.title}
                category={room.category}
                guests={room.guests}
                bedType={room.bedType}
                pricePerNight={room.pricePerNight}
                imageUrl={room.imageUrl}
              />
            ))}
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};
