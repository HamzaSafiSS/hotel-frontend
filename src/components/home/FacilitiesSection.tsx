import React from 'react';
import {
  Waves,
  Sparkles,
  Dumbbell,
  Utensils,
  Wifi,
  Car,
  Clock,
  Users,
  ArrowRight,
} from 'lucide-react';
import { ContentContainer } from '../ui/ContentContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { HOTEL_FACILITIES } from '../../data/siteData';

export const FacilitiesSection: React.FC = () => {
  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-5 h-5 text-[#C7A66B]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#C7A66B]" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-[#C7A66B]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#C7A66B]" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-[#C7A66B]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#C7A66B]" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-[#C7A66B]" />;
      case 'Users':
      default:
        return <Users className="w-5 h-5 text-[#C7A66B]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#EAF2FF]/30 border-y border-[#D8E0EA]">
      <ContentContainer size="7xl">
        {/* Section Heading with Centered Layout */}
        <div className="flex flex-col items-center text-center mb-14">
          <SectionHeading
            align="center"
            eyebrow="RESORT AMENITIES"
            title="World-Class Facilities & Amenities"
            description="Designed for supreme comfort, wellness, and leisurely living. Discover the curated amenities that elevate your stay."
          />
        </div>

        {/* 8 Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOTEL_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="bg-white border border-[#D8E0EA] rounded-xl p-6 shadow-xs hover:shadow-md hover:border-[#C7A66B]/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#EAF2FF] group-hover:bg-[#062B45] text-[#062B45] group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-300">
                  {getFacilityIcon(facility.iconName)}
                </div>
                <h3 className="font-serif text-lg font-medium text-[#062B45] mb-2 group-hover:text-[#C7A66B] transition-colors">
                  {facility.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Facilities Action Button */}
        <div className="mt-12 text-center">
          <Button
            to="/facilities"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            className="group shadow-sm hover:shadow"
          >
            Explore Facilities
          </Button>
        </div>
      </ContentContainer>
    </section>
  );
};
