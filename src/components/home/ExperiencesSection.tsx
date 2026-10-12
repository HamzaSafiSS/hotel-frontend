import React from 'react';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { ContentContainer } from '../ui/ContentContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { HOTEL_EXPERIENCES } from '../../data/siteData';

export const ExperiencesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#EAF2FF]/20 border-t border-[#D8E0EA]">
      <ContentContainer size="7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <SectionHeading
            align="center"
            eyebrow="MEMORABLE JOURNEYS"
            title="Hotel Experiences & Destination"
            description="More than a stay — a journey of unforgettable moments, scenic exploration, and restorative leisure."
          />
        </div>

        {/* Top Destination Feature Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#D8E0EA] mb-12 bg-[#062B45] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Destination Text Content (Left 5 columns) */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between z-10 bg-gradient-to-r from-[#062B45] via-[#062B45]/90 to-transparent">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DFCA9B] block mb-2">
                  TOP DESTINATION
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight text-white mb-4">
                  Experience Paradise at Our Beach Resort
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light mb-6">
                  Wake up to panoramic ocean views, stroll private golden sands, and indulge in secluded coastal serenity tucked between dramatic cliffs and crystalline waters.
                </p>

                {/* Clearly Labeled Placeholder Destination */}
                <div className="inline-flex items-center gap-2 p-2.5 rounded-lg bg-white/10 border border-white/15 text-xs text-gray-200 mb-6">
                  <MapPin className="w-4 h-4 text-[#C7A66B] shrink-0" />
                  <span>
                    <strong>[Sample Destination]</strong> Azure Bay Sanctuary • Scenic Coastline
                  </span>
                </div>
              </div>

              <div>
                <Button
                  to="/location"
                  variant="gold"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                  className="group"
                >
                  Discover Our Location
                </Button>
              </div>
            </div>

            {/* Landscape Destination Image (Right 7 columns) */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85"
                alt="Skyview Coastal Destination Landscape"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#062B45] via-transparent to-transparent lg:w-32" />
            </div>
          </div>
        </div>

        {/* 4 Image-Led Experience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOTEL_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="group bg-white border border-[#D8E0EA] rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
                <img
                  src={exp.imageUrl}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#062B45]/85 backdrop-blur-xs text-white text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded">
                  {exp.tag}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#062B45] group-hover:text-[#C7A66B] transition-colors">
                    {exp.title}
                  </h4>
                  <span className="text-xs font-medium text-[#C7A66B] block mt-1">
                    {exp.subtitle}
                  </span>
                  <p className="mt-2 text-xs text-[#60758B] leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D8E0EA]/70 flex items-center justify-between text-xs text-[#062B45] font-semibold">
                  <span className="group-hover:text-[#C7A66B] transition-colors">Curated Experience</span>
                  <Compass className="w-4 h-4 text-[#C7A66B] transition-transform group-hover:rotate-45" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};
