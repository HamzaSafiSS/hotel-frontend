import React from 'react';
import { ArrowRight, Utensils, Wine, Coffee, Fish } from 'lucide-react';
import { ContentContainer } from '../ui/ContentContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';

export const DiningSection: React.FC = () => {
  const cuisineHighlights = [
    {
      icon: <Fish className="w-4 h-4 text-[#C7A66B]" />,
      title: 'Fresh Coastal Seafood',
      desc: 'Wild-caught catch prepared with Mediterranean aromatics and coastal herbs.',
    },
    {
      icon: <Wine className="w-4 h-4 text-[#C7A66B]" />,
      title: 'Curated Cellar Wines',
      desc: 'Sommelier-selected vintages and artisanal vineyard labels from worldwide regions.',
    },
    {
      icon: <Utensils className="w-4 h-4 text-[#C7A66B]" />,
      title: 'Sunset Terrace Dining',
      desc: 'Al fresco oceanfront tables framed by golden twilight and gentle ocean breezes.',
    },
    {
      icon: <Coffee className="w-4 h-4 text-[#C7A66B]" />,
      title: 'Artisanal Bakery & Roast',
      desc: 'Handcrafted morning pastries, single-origin espresso, and wholesome breakfast bowls.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <ContentContainer size="7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase: Large Restaurant Photograph with Floating Badge */}
          <div className="relative">
            <div className="relative aspect-4/3 sm:aspect-16/11 w-full rounded-2xl overflow-hidden shadow-xl border border-[#D8E0EA]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                alt="Skyview Luxury Restaurant and Fine Dining Atmosphere"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062B45]/60 via-transparent to-transparent" />
            </div>

            {/* Floating Atmosphere Accent Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white/95 backdrop-blur-md border border-[#D8E0EA] rounded-xl p-4 sm:p-5 shadow-xl max-w-xs">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C7A66B] block mb-1">
                Atmosphere & Ambiance
              </span>
              <p className="text-xs text-[#18324A] font-serif leading-relaxed">
                "Panoramic sunset views meets culinary craft in an intimate coastal setting."
              </p>
            </div>
          </div>

          {/* Text Block & Content */}
          <div className="flex flex-col">
            <SectionHeading
              eyebrow="EXCEPTIONAL DINING"
              title="Good Food. Memorable Moments."
              description="Discover thoughtfully prepared dishes, refreshing beverages, and inviting dining experiences designed to complement your stay."
            />

            <p className="mt-4 text-sm sm:text-base text-[#60758B] leading-relaxed">
              Our culinary philosophy centers on seasonal ingredients, artistic presentation, and attentive table service. Whether enjoying a leisurely champagne breakfast or a multi-course tasting menu under the stars, every dining moment at Skyview is crafted to enchant.
            </p>

            {/* Sample Cuisine Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              {cuisineHighlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#EAF2FF]/40 border border-[#D8E0EA]/70 flex items-start gap-3"
                >
                  <div className="p-2 rounded bg-white shadow-2xs shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#062B45]">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-[#60758B] mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons: Browse Menu (Primary) & Explore Dining (Secondary) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                to="/menu"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                className="group"
              >
                Browse Restaurant & Menu
              </Button>

              <Button to="/dining" variant="secondary" size="md">
                Explore Dining
              </Button>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};
