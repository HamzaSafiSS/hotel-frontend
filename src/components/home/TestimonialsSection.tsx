import React, { useMemo } from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { ContentContainer } from '../ui/ContentContainer';
import { SectionHeading } from '../ui/SectionHeading';
import { useHotelStore } from '../../store/hotelStore';

export const TestimonialsSection: React.FC = () => {
  const { reviews } = useHotelStore();

  const displayReviews = useMemo(() => {
    return reviews
      .filter((r) => r.published)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .slice(0, 3);
  }, [reviews]);

  return (
    <section className="py-16 sm:py-24 bg-[#EAF2FF]/30 border-t border-[#D8E0EA]">
      <ContentContainer size="7xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-14">
          <SectionHeading
            align="center"
            eyebrow="GUEST STORIES"
            title="What Our Guests Are Saying"
            description="Read authentic reflections from guests who have experienced the warmth, comfort, and hospitality of Skyview."
          />
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {displayReviews.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-[#D8E0EA] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Decorative Subtle Quote Icon */}
              <Quote className="absolute top-4 right-4 w-10 h-10 text-[#EAF2FF] -rotate-12 pointer-events-none" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-[#C7A66B]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-[#18324A] leading-relaxed italic relative z-10 mb-6">
                  "{testimonial.comment}"
                </p>
              </div>

              {/* Guest Profile Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#D8E0EA]">
                <div className="w-11 h-11 rounded-full bg-[#062B45] text-[#DFCA9B] font-serif font-bold text-sm flex items-center justify-center border-2 border-[#C7A66B]/40 shrink-0">
                  {testimonial.guestName ? testimonial.guestName.charAt(0).toUpperCase() : 'G'}
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#062B45]">
                    {testimonial.guestName}
                  </h4>
                  <span className="text-xs text-[#60758B]">
                    {testimonial.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Reviews Badge */}
        <div className="mt-10 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs text-[#60758B] bg-white border border-[#D8E0EA] px-3.5 py-1.5 rounded-full shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span>Rated 4.9 / 5.0 across over 1,200 verified guest reviews</span>
          </span>
        </div>
      </ContentContainer>
    </section>
  );
};
