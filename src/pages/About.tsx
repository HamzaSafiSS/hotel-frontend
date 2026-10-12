import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Compass,
  Shield,
  Eye,
  CheckCircle2,
  ArrowRight,
  BedDouble,
  Utensils,
  Waves,
  Sun,
  ChevronRight,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { Button } from '../components/ui/Button';

export const About: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#062B45] text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
            alt="Skyview Hotels & Resorts Coastal Architecture"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041D2F] via-[#062B45]/90 to-[#041D2F]/80" />
        </div>

        <ContentContainer size="7xl" className="relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-300 mb-6">
            <Link to="/" className="hover:text-[#DFCA9B] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span className="text-white font-medium">About Us</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-3">
              OUR HERITAGE & HOSPITALITY
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-6 leading-tight">
              A Sanctuary of Coastal Serenity and Thoughtful Luxury
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed mb-8">
              Welcome to Skyview Hotels & Resorts — where the rhythmic calm of coastal horizons meets authentic warmth, refined comfort, and moments designed to linger in memory.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                to="/rooms"
                variant="gold"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Rooms & Suites
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                size="md"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Connect With Concierge
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 2. INTRODUCTION & STORY */}
      <section className="py-16 sm:py-24 bg-white">
        <ContentContainer size="7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story Images Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#D8E0EA]">
                <img
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
                  alt="Skyview Resort Grounds and Pool"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-3/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Suite Balcony Overlooking Sea"
                  className="w-full h-48 object-cover"
                />
              </div>
              {/* Highlight Badge */}
              <div className="absolute top-6 left-6 bg-[#062B45]/90 backdrop-blur-md text-white p-4 rounded-xl border border-white/20 max-w-xs shadow-lg">
                <p className="font-serif text-lg text-[#DFCA9B]">Crafted for Stillness</p>
                <p className="text-xs text-gray-200 mt-1">
                  Thoughtfully designed spaces that celebrate ocean horizons and effortless living.
                </p>
              </div>
            </div>

            {/* Story Text Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66B] mb-2">
                THE SKYVIEW STORY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#062B45] tracking-tight mb-6 leading-tight">
                Born From a Passion for Timeless Coastal Hospitality
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#60758B] leading-relaxed">
                <p>
                  Skyview Hotels & Resorts was conceived as a coastal refuge where modern sophistication seamlessly blends with nature's tranquility. Positioned along picturesque bluffs, the property draws continuous inspiration from the shifting tides, coastal breezes, and panoramic sunsets that frame our grounds.
                </p>
                <p>
                  Our hospitality philosophy centers on unobtrusive elegance and genuine human warmth. We believe that true luxury is neither hurried nor pretentious — it is found in the stillness of a morning espresso on a sunlit terrace, the tailored comfort of an acoustic-insulated suite, and the intuitive attentiveness of a host who remembers your personal preferences.
                </p>
                <p>
                  Whether visiting for a weekend escape, a celebratory family gathering, or a restorative solo retreat, every touchpoint at Skyview is intentionally shaped to help you unwind and reconnect.
                </p>
              </div>

              {/* Pillars at a Glance */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#D8E0EA]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#EAF2FF] text-[#062B45] shrink-0">
                    <Sun className="w-5 h-5 text-[#C7A66B]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#062B45]">Coastal Living</h4>
                    <p className="text-xs text-[#60758B] mt-0.5">Balconies, terraces, and sea breezes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#EAF2FF] text-[#062B45] shrink-0">
                    <Heart className="w-5 h-5 text-[#C7A66B]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#062B45]">Heartfelt Care</h4>
                    <p className="text-xs text-[#60758B] mt-0.5">Personalized concierge support 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-16 sm:py-20 bg-[#EAF2FF]/30 border-y border-[#D8E0EA]/70">
        <ContentContainer size="7xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66B] mb-2 block">
              OUR GUIDING PURPOSE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#062B45] tracking-tight">
              Mission & Vision
            </h2>
            <p className="text-sm sm:text-base text-[#60758B] mt-3 leading-relaxed">
              Our guiding principles shape every interaction, design decision, and hospitality standard we uphold.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Box */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#D8E0EA] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAF2FF] rounded-bl-full opacity-40 pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#062B45] text-[#C7A66B] flex items-center justify-center mb-6 shadow-xs">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C7A66B] block mb-2">
                  OUR MISSION
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#062B45] mb-4">
                  Crafting Restorative Stays With Meaningful Attention
                </h3>
                <p className="text-sm text-[#60758B] leading-relaxed mb-6">
                  To provide guests with an exceptional hospitality experience rooted in attentive care, serene architectural design, and pristine coastal comfort. We are committed to making every stay effortless, memorable, and revitalizing for travelers from near and far.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-[#18324A] pt-4 border-t border-[#D8E0EA]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C7A66B] shrink-0" />
                  <span>Prioritizing guest tranquility, safety, and acoustic comfort</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C7A66B] shrink-0" />
                  <span>Offering sincere, intuitive assistance at all times</span>
                </li>
              </ul>
            </div>

            {/* Vision Box */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#D8E0EA] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAF2FF] rounded-bl-full opacity-40 pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#062B45] text-[#C7A66B] flex items-center justify-center mb-6 shadow-xs">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C7A66B] block mb-2">
                  OUR VISION
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#062B45] mb-4">
                  Setting the Benchmark for Mindful Luxury
                </h3>
                <p className="text-sm text-[#60758B] leading-relaxed mb-6">
                  To be celebrated as an exemplary coastal hotel where thoughtful luxury harmonizes with warm human connection. We strive to pioneer hospitality practices that respect our natural coastal surroundings while delivering unmatched service excellence.
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-[#18324A] pt-4 border-t border-[#D8E0EA]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C7A66B] shrink-0" />
                  <span>Sustainable property stewardship and mindful coastal living</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C7A66B] shrink-0" />
                  <span>Continuous evolution in culinary craft and wellness amenities</span>
                </li>
              </ul>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 4. CORE VALUES */}
      <section className="py-16 sm:py-24 bg-white">
        <ContentContainer size="7xl">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66B] mb-2 block">
              OUR PILLARS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#062B45] tracking-tight">
              Core Values That Define Skyview
            </h2>
            <p className="text-sm sm:text-base text-[#60758B] mt-3 leading-relaxed">
              Every detail across our resort is governed by four core commitments to our guests and team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Value 1 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gray-50 border border-[#D8E0EA] hover:border-[#062B45]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#062B45] text-[#C7A66B] flex items-center justify-center mb-5 shadow-2xs">
                  <BedDouble className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#062B45] mb-2.5">
                  Comfort & Serenity
                </h3>
                <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed">
                  We design our rooms, suites, and common verandas to be sanctuaries of deep calm, utilizing fine cottons, natural lighting, and soundproof acoustics.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gray-50 border border-[#D8E0EA] hover:border-[#062B45]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#062B45] text-[#C7A66B] flex items-center justify-center mb-5 shadow-2xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#062B45] mb-2.5">
                  Exceptional Service
                </h3>
                <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed">
                  Our team takes pride in proactive hospitality — anticipating needs before they are spoken and greeting every guest with warm professionalism.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gray-50 border border-[#D8E0EA] hover:border-[#062B45]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#062B45] text-[#C7A66B] flex items-center justify-center mb-5 shadow-2xs">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#062B45] mb-2.5">
                  Uncompromising Quality
                </h3>
                <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed">
                  From seasonal culinary ingredients to wellness botanicals, we curate the highest standards of materials, hygiene, and execution across the resort.
                </p>
              </div>
            </div>

            {/* Value 4 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gray-50 border border-[#D8E0EA] hover:border-[#062B45]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-lg bg-[#062B45] text-[#C7A66B] flex items-center justify-center mb-5 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#062B45] mb-2.5">
                  Attention to Detail
                </h3>
                <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed">
                  We believe excellence lives in subtle touches — from ambient evening turndown to customized pillow selections and effortless check-in.
                </p>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 5. THE GUEST EXPERIENCE HIGHLIGHT */}
      <section className="py-16 sm:py-24 bg-[#062B45] text-white">
        <ContentContainer size="7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DFCA9B] mb-2 block">
                THE SKYVIEW EXPERIENCE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight mb-6">
                Curated Around Every Aspect of Your Stay
              </h2>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-8">
                Your journey with us extends beyond a luxurious suite. Experience artisanal dining, holistic spa rituals, secluded infinity pools, and tailored itineraries arranged by our concierge.
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Waves className="w-4 h-4 text-[#C7A66B] shrink-0" />
                  <span>Heated oceanfront infinity pool with panoramic horizon vistas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Utensils className="w-4 h-4 text-[#C7A66B] shrink-0" />
                  <span>Seaside culinary pavilion serving fresh regional seafood & wines</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#C7A66B] shrink-0" />
                  <span>Revitalizing botanical spa therapies and private treatment suites</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                <Button
                  to="/facilities"
                  variant="gold"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore All Amenities
                </Button>
              </div>
            </div>

            {/* 3 Experience Snapshot Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="rounded-xl overflow-hidden bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
                <img
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=600&q=80"
                  alt="Oceanfront relaxation"
                  className="w-full h-36 rounded-lg object-cover mb-4"
                />
                <div>
                  <h4 className="font-serif text-base text-white mb-1">Rest & Unwind</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Private cabanas, plush daybeds, and serene ocean views.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
                <img
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80"
                  alt="Spa and wellness therapies"
                  className="w-full h-36 rounded-lg object-cover mb-4"
                />
                <div>
                  <h4 className="font-serif text-base text-white mb-1">Holistic Wellness</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Custom massage therapies designed for restoration.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
                  alt="Coastal gourmet dining"
                  className="w-full h-36 rounded-lg object-cover mb-4"
                />
                <div>
                  <h4 className="font-serif text-base text-white mb-1">Gourmet Dining</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Fresh coastal ingredients prepared by master chefs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <ContentContainer size="7xl">
          <div className="bg-gradient-to-r from-[#062B45] to-[#0A3D60] rounded-3xl p-8 sm:p-14 text-white text-center shadow-xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] block mb-3">
                BEGIN YOUR JOURNEY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight mb-4">
                Experience the Warmth of Skyview Firsthand
              </h2>
              <p className="text-sm sm:text-base text-gray-200 mb-8 font-light leading-relaxed">
                Explore our collection of deluxe rooms, ocean view suites, and private villas to discover your ideal coastal retreat.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  to="/rooms"
                  variant="gold"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="shadow-md"
                >
                  View Rooms & Suites
                </Button>
                <Button
                  to="/booking"
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
                >
                  Reserve Your Stay
                </Button>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};
