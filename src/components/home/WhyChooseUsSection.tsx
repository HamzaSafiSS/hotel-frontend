import React from 'react';
import { Award, ShieldCheck, CheckCircle2, HeartHandshake } from 'lucide-react';
import { ContentContainer } from '../ui/ContentContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { WHY_CHOOSE_US_BENEFITS } from '../../data/siteData';

export const WhyChooseUsSection: React.FC = () => {
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-5 h-5 text-[#C7A66B]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#C7A66B]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-[#C7A66B]" />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake className="w-5 h-5 text-[#C7A66B]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#D8E0EA]">
      <ContentContainer size="7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Introduction and 4 Benefit Cards in 2x2 grid (7 columns) */}
          <div className="lg:col-span-7 flex flex-col">
            <SectionHeading
              eyebrow="WHY CHOOSE US"
              title="The Skyview Advantage"
              description="From attentive service to breathtaking coastal locations, we ensure your stay is restorative, effortless, and nothing short of extraordinary."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
              {WHY_CHOOSE_US_BENEFITS.map((benefit) => (
                <div
                  key={benefit.id}
                  className="p-5 rounded-xl bg-[#EAF2FF]/40 border border-[#D8E0EA] hover:border-[#C7A66B]/60 transition-all duration-300 hover:shadow-md group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#D8E0EA] shadow-2xs flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
                      {getBenefitIcon(benefit.iconName)}
                    </div>
                    <h3 className="font-serif text-base font-semibold text-[#062B45] mb-1.5 group-hover:text-[#C7A66B] transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-[#60758B] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Large Luxury Hotel Photograph with Signature Accent (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 sm:aspect-1/1 lg:aspect-4/5 w-full rounded-2xl overflow-hidden shadow-2xl border border-[#D8E0EA]">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
                alt="Skyview Luxury Hotel Villa and Sunset Horizon"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062B45]/70 via-transparent to-transparent" />

              {/* Script Accent Floating Tag */}
              <div className="absolute bottom-6 left-6 right-6 text-center bg-white/90 backdrop-blur-md border border-white/60 rounded-xl p-3.5 shadow-lg">
                <span className="font-serif italic text-sm text-[#062B45] block">
                  "Where comfort meets adventure ♡"
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66B] font-semibold mt-0.5 block">
                  Skyview Hospitality Promise
                </span>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
};
