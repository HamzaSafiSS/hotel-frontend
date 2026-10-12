import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ContentContainer } from '../ui/ContentContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { RoomCard } from '../ui/RoomCard';
import { SAMPLE_ROOMS } from '../../data/siteData';

export const FeaturedRoomsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <ContentContainer size="7xl">
        {/* Section Header: Text Intro on one side and View All Rooms on the other */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow="FEATURED STAYS"
            title="Find Your Perfect Stay"
            description="Thoughtfully designed rooms and suites combine comfort, style, and the little details that make every stay special."
          />
          <div className="shrink-0">
            <Button
              to="/rooms"
              variant="secondary"
              size="md"
              icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              className="group"
            >
              View All Rooms
            </Button>
          </div>
        </div>

        {/* 4 Room Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
          {SAMPLE_ROOMS.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              title={room.title}
              category={room.category}
              description={room.description}
              guests={room.guests}
              bedType={room.bedType}
              pricePerNight={room.pricePerNight}
              imageUrl={room.imageUrl}
              detailsUrl="/rooms"
            />
          ))}
        </div>

        {/* Portfolio Pricing Disclaimer */}
        <div className="mt-8 text-center">
          <p className="inline-flex items-center gap-1.5 text-xs text-[#60758B] bg-gray-50 border border-[#D8E0EA] px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span>Sample portfolio rates shown. Live room bookings and dynamic availability will be implemented in future phases.</span>
          </p>
        </div>
      </ContentContainer>
    </section>
  );
};
