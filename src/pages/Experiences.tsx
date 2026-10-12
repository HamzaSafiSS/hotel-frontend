import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Compass,
  UtensilsCrossed,
  Waves,
  Sun,
  Smile,
  ChevronRight,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { Button } from '../components/ui/Button';

interface ExperienceDetail {
  id: string;
  title: string;
  section: 'wellness' | 'dining' | 'culture' | 'sightseeing' | 'family' | 'romance';
  sectionLabel: string;
  tag: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  icon: React.ReactNode;
}

const EXPERIENCES_DATA: ExperienceDetail[] = [
  // 1. Relaxation & Wellness
  {
    id: 'exp-wellness-1',
    title: 'Cliffside Sunrise Yoga & Sound Therapy',
    section: 'wellness',
    sectionLabel: 'Relaxation & Wellness',
    tag: 'Mindfulness',
    description:
      'Greet the morning sea breeze with restorative guided vinyasa yoga and Tibetan singing bowl sound meditation on our panoramic ocean bluff deck.',
    highlights: ['Guided by certified mindfulness instructors', 'Complimentary mats and herbal elixirs', 'Suitable for all experience levels'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
    icon: <Sun className="w-4 h-4 text-[#C7A66B]" />,
  },
  {
    id: 'exp-wellness-2',
    title: 'Thermal Hydrotherapy & Botanical Spa Circuit',
    section: 'wellness',
    sectionLabel: 'Relaxation & Wellness',
    tag: 'Spa Therapies',
    description:
      'Experience thermal hot plunge pools, eucalyptus herbal steam chambers, and private relaxation cabanas designed to soothe body and spirit.',
    highlights: ['Organic regional botanical oils', 'Private indoor/outdoor thermal circuit', 'Dedicated spa lounge refreshments'],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80',
    icon: <Sparkles className="w-4 h-4 text-[#C7A66B]" />,
  },

  // 2. Dining Experiences
  {
    id: 'exp-dining-1',
    title: 'Sunset Sommelier Wine & Coastal Tasting',
    section: 'dining',
    sectionLabel: 'Dining Experiences',
    tag: 'Gastronomy',
    description:
      'Indulge in a curated flight of regional boutique wines paired with artisanal cheeses and coastal bites as dusk illuminates the horizon.',
    highlights: ['Hosted by resort master sommelier', 'Pairing with artisan regional cheeses', 'Sunset veranda seating'],
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
    icon: <UtensilsCrossed className="w-4 h-4 text-[#C7A66B]" />,
  },
  {
    id: 'exp-dining-2',
    title: 'Private Beachside Chef Table',
    section: 'dining',
    sectionLabel: 'Dining Experiences',
    tag: 'Exclusive Dining',
    description:
      'An intimate five-course tasting menu crafted exclusively for your party, served beneath lanterns right along the water’s edge.',
    highlights: ['Customized multi-course tasting menu', 'Dedicated personal chef & server', 'Lantern and candlelit seaside setup'],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    icon: <UtensilsCrossed className="w-4 h-4 text-[#C7A66B]" />,
  },

  // 3. Local Culture & Cuisine
  {
    id: 'exp-culture-1',
    title: 'Historic Coastal Village & Artisan Walk',
    section: 'culture',
    sectionLabel: 'Local Culture & Cuisine',
    tag: 'Cultural Heritage',
    description:
      'Stroll through charming seaside cobblestone alleys, visit local ceramic workshops, and discover traditional coastal architecture and stories.',
    highlights: ['Suggested itinerary of regional artisan studios', 'Historic waterfront landmarks', 'Local craft boutique recommendations'],
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    icon: <Compass className="w-4 h-4 text-[#C7A66B]" />,
  },
  {
    id: 'exp-culture-2',
    title: 'Coastal Cooking & Seafood Masterclass',
    section: 'culture',
    sectionLabel: 'Local Culture & Cuisine',
    tag: 'Culinary Workshop',
    description:
      'Join our culinary team for a hands-on workshop learning the techniques of preparing fresh regional seafood, handmade sauces, and signature appetizers.',
    highlights: ['Hands-on culinary workstation', 'Recipe keepsakes and wine pairing', 'Interactive small-group setting'],
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    icon: <Sparkles className="w-4 h-4 text-[#C7A66B]" />,
  },

  // 4. Nearby Sightseeing
  {
    id: 'exp-sightseeing-1',
    title: 'Coastal Headland Cliff Walk & Marine Views',
    section: 'sightseeing',
    sectionLabel: 'Nearby Sightseeing',
    tag: 'Nature Walk',
    description:
      'Explore winding blufftop trails offering breathtaking vistas of offshore sea stacks, soaring coastal birds, and quiet hidden coves.',
    highlights: ['Scenic walking trail accessible from resort', 'Panoramic coastal lookout spots', 'Curated trail map provided by concierge'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    icon: <Compass className="w-4 h-4 text-[#C7A66B]" />,
  },
  {
    id: 'exp-sightseeing-2',
    title: 'Sunset Sailing & Marine Cove Exploration',
    section: 'sightseeing',
    sectionLabel: 'Nearby Sightseeing',
    tag: 'Sailing Excursion',
    description:
      'Embark on a leisurely catamaran cruise along scenic coastal waters to admire dramatic sandstone cliffs and evening maritime horizons.',
    highlights: ['Independent sailing suggestions available', 'Sunset golden hour viewing', 'Seasonal marine life spotting opportunities'],
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    icon: <Waves className="w-4 h-4 text-[#C7A66B]" />,
  },

  // 5. Family-Friendly Activities
  {
    id: 'exp-family-1',
    title: 'Tide Pool Marine Discovery & Coastal Ecology',
    section: 'family',
    sectionLabel: 'Family-Friendly Activities',
    tag: 'Family Adventure',
    description:
      'A fun, educational coastal discovery experience for families exploring natural shoreline tide pools and fascinating marine life.',
    highlights: ['Family-friendly shoreline adventure', 'Educational marine field guide provided', 'Safe and gentle exploration for all ages'],
    imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80',
    icon: <Smile className="w-4 h-4 text-[#C7A66B]" />,
  },
  {
    id: 'exp-family-2',
    title: 'Twilight Starlight Lawn Cinema & Games',
    section: 'family',
    sectionLabel: 'Family-Friendly Activities',
    tag: 'Evening Fun',
    description:
      'Gather on our sheltered lawn beneath coastal stars for family favorite movies, artisanal warm popcorn, and lawn board games.',
    highlights: ['Comfortable beanbags and plush blankets', 'Fresh artisan popcorn and hot chocolates', 'Classic family film screenings'],
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=80',
    icon: <Smile className="w-4 h-4 text-[#C7A66B]" />,
  },

  // 6. Romantic Stays & Special Occasions
  {
    id: 'exp-romance-1',
    title: 'Private Villa Candlelit Terrace Celebration',
    section: 'romance',
    sectionLabel: 'Romantic Stays & Special Occasions',
    tag: 'Romance & Anniversaries',
    description:
      'Transform your private suite terrace into an enchanting candlelit haven with fresh floral arrangements, chilled champagne, and bespoke dining.',
    highlights: ['Tailored for anniversaries, birthdays, and proposals', 'Fine champagne and floral styling', 'Complete privacy with dedicated service'],
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    icon: <Heart className="w-4 h-4 text-[#C7A66B]" />,
  },
  {
    id: 'exp-romance-2',
    title: 'Couples Rejuvenation Spa & Plunge Pool Ritual',
    section: 'romance',
    sectionLabel: 'Romantic Stays & Special Occasions',
    tag: 'Couples Wellness',
    description:
      'A shared restorative spa journey featuring synchronized botanical massage, private thermal plunge access, and relaxation on a shaded daybed.',
    highlights: ['Side-by-side bespoke aromatherapy massage', 'Private thermal plunge suite access', 'Glass of sparkling wine with artisanal truffles'],
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    icon: <Heart className="w-4 h-4 text-[#C7A66B]" />,
  },
];

export const Experiences: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredExperiences = selectedFilter === 'all'
    ? EXPERIENCES_DATA
    : EXPERIENCES_DATA.filter((e) => e.section === selectedFilter);

  const sections = [
    { id: 'all', label: 'All Experiences' },
    { id: 'wellness', label: 'Wellness & Spa' },
    { id: 'dining', label: 'Dining Moments' },
    { id: 'culture', label: 'Local Culture' },
    { id: 'sightseeing', label: 'Sightseeing' },
    { id: 'family', label: 'Family Stays' },
    { id: 'romance', label: 'Romantic Stays' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#062B45] text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=80"
            alt="Skyview Guest Experiences and Adventures"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041D2F]/90 via-[#062B45]/65 to-[#041D2F]/40" />
        </div>

        <ContentContainer size="7xl" className="relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-300 mb-6">
            <Link to="/" className="hover:text-[#DFCA9B] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span className="text-white font-medium">Experiences</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-3">
              MEMORABLE MOMENTS
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-6 leading-tight">
              Curated Experiences for Rest, Discovery & Celebration
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed mb-8">
              Whether you yearn for tranquil wellness rituals, sunset sommelier tastings, or coastal adventures, discover sample experiences crafted to make your stay extraordinary.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                to="/contact"
                variant="gold"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Inquire With Concierge
              </Button>
              <Button
                to="/reviews"
                variant="secondary"
                size="md"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Read Guest Reviews
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 2. ILLUSTRATIVE NOTICE BANNER */}
      <section className="bg-[#EAF2FF] border-b border-[#D8E0EA] py-3.5 px-4">
        <ContentContainer size="7xl">
          <div className="flex items-center justify-between gap-3 text-xs text-[#062B45]">
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-[#C7A66B] shrink-0" />
              <span>
                <strong>Illustrative Suggestions:</strong> The activities and excursions described on this page are sample offerings to illustrate guest possibilities. Schedules, third-party coordination, and availability are subject to seasonal arrangement and concierge confirmation.
              </span>
            </div>
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-1 font-semibold text-[#062B45] hover:text-[#C7A66B] shrink-0 underline decoration-[#C7A66B]"
            >
              <span>Connect With Concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ContentContainer>
      </section>

      {/* 3. CATEGORY FILTER TABS */}
      <section className="sticky top-16 sm:top-20 z-20 bg-white/95 backdrop-blur-md border-b border-[#D8E0EA] py-4 shadow-xs">
        <ContentContainer size="7xl">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {sections.map((sec) => {
              const isActive = selectedFilter === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setSelectedFilter(sec.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B] ${
                    isActive
                      ? 'bg-[#062B45] text-white shadow-xs'
                      : 'bg-gray-100 hover:bg-[#EAF2FF] text-[#18324A]'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>
        </ContentContainer>
      </section>

      {/* 4. EXPERIENCES GRID */}
      <section className="py-16 sm:py-24 bg-[#EAF2FF]/15 flex-1">
        <ContentContainer size="7xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66B] mb-2 block">
              ILLUSTRATIVE EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#062B45] tracking-tight">
              Sample Activities & Coastal Moments
            </h2>
            <p className="text-sm sm:text-base text-[#60758B] mt-3 leading-relaxed">
              Every offering is tailored to inspire rest, recreation, and connection. Reach out to our concierge desk to arrange custom itineraries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredExperiences.map((exp) => (
              <div
                key={exp.id}
                className="group bg-white rounded-2xl border border-[#D8E0EA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={exp.imageUrl}
                    alt={exp.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider bg-white/95 text-[#062B45] px-3 py-1 rounded-full shadow-2xs flex items-center gap-1.5">
                      {exp.icon}
                      <span>{exp.tag}</span>
                    </span>
                  </div>

                  {/* Section Label */}
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#DFCA9B]">
                      {exp.sectionLabel}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#062B45] group-hover:text-[#C7A66B] transition-colors mb-2.5 leading-snug">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    <ul className="space-y-1.5 mb-6">
                      {exp.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#18324A]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Enquiry Action */}
                  <div className="pt-4 border-t border-[#D8E0EA] flex items-center justify-between">
                    <span className="text-[11px] text-[#60758B]">
                      Illustrative offering
                    </span>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] transition-colors group/link"
                    >
                      <span>Inquire With Concierge</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16 bg-[#062B45] text-white">
        <ContentContainer size="7xl">
          <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-8 sm:p-12 border border-white/15 backdrop-blur-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] block mb-2">
                BESPOKE ITINERARIES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-3">
                Need Help Crafting Your Stay?
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                Contact our concierge desk ahead of your arrival. We are pleased to provide local recommendations, coordinate private dining setups, or answer any questions about your upcoming visit.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                to="/contact"
                variant="gold"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Contact Concierge Desk
              </Button>
              <Button
                to="/booking"
                variant="secondary"
                size="md"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Book a Room
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};
