import React from 'react';
import { Bed, Sparkles, UtensilsCrossed, MapPin, ShieldCheck } from 'lucide-react';
import { ContentContainer } from '../ui/ContentContainer';
import { HOTEL_HIGHLIGHTS } from '../../data/siteData';

export const HighlightsStrip: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bed':
        return <Bed className="w-5 h-5 text-[#C7A66B]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#C7A66B]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-[#C7A66B]" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-[#C7A66B]" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-5 h-5 text-[#C7A66B]" />;
    }
  };

  return (
    <section className="bg-[#EAF2FF]/50 border-y border-[#D8E0EA] py-8 sm:py-10">
      <ContentContainer size="7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-[#D8E0EA]/70">
          {HOTEL_HIGHLIGHTS.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col items-center text-center px-4 ${
                index > 0 ? 'pt-4 sm:pt-0' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#D8E0EA] shadow-xs flex items-center justify-center mb-3 transition-transform duration-300 hover:scale-105">
                {getIcon(item.iconName)}
              </div>
              <h3 className="font-serif text-base font-medium text-[#062B45] mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};
