import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HighlightsStrip } from '../components/home/HighlightsStrip';
import { FeaturedRoomsSection } from '../components/home/FeaturedRoomsSection';
import { FacilitiesSection } from '../components/home/FacilitiesSection';
import { DiningSection } from '../components/home/DiningSection';
import { ExperiencesSection } from '../components/home/ExperiencesSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PromotionalBanner } from '../components/home/PromotionalBanner';

export const Home: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 1. Striking Luxury Hero with Centered CTAs and Quick Search Panel */}
      <HeroSection />

      {/* 2. Hotel Highlights Strip */}
      <HighlightsStrip />

      {/* 3. Featured Rooms & Suites Collection */}
      <FeaturedRoomsSection />

      {/* 4. Facilities & Resort Amenities */}
      <FacilitiesSection />

      {/* 5. Dining & Digital Culinary Menu Preview */}
      <DiningSection />

      {/* 6. Curated Experiences & Scenic Destination */}
      <ExperiencesSection />

      {/* 7. Why Choose Skyview (The Skyview Advantage) */}
      <WhyChooseUsSection />

      {/* 8. Guest Stories & Testimonials */}
      <TestimonialsSection />

      {/* 9. Promotional Resort Banner */}
      <PromotionalBanner />
    </div>
  );
};

export default Home;
