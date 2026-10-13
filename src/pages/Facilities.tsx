import React from 'react';
import { Link } from 'react-router-dom';
import {
  Waves,
  Dumbbell,
  Sparkles,
  UtensilsCrossed,
  Users,
  Wifi,
  Clock,
  Car,
  ChevronRight,
  ArrowRight,
  Info,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { Button } from '../components/ui/Button';

interface FacilityDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  imageUrl: string;
  icon: React.ReactNode;
  actionLink?: { label: string; to: string };
}

const FACILITIES_DATA: FacilityDetail[] = [
  {
    id: 'swimming-pool',
    title: 'Oceanfront Infinity Pool & Cabanas',
    category: 'Aquatics & Leisure',
    description:
      'Immerse yourself in our temperature-regulated oceanfront infinity pool, flanked by plush cushioned daybeds and private shaded cabanas overlooking the coastal horizon.',
    features: [
      'Heated oceanfront infinity pool',
      'Complimentary poolside towels and fruit-infused waters',
      'Private shaded cabanas available on reservation',
      'Poolside beverage and light refreshment service',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
    icon: <Waves className="w-5 h-5 text-[#C7A66B]" />,
    actionLink: { label: 'Explore Rooms with Views', to: '/rooms' },
  },
  {
    id: 'fitness-center',
    title: '24/7 Wellness & Fitness Studio',
    category: 'Fitness & Motion',
    description:
      'Stay energized with expansive panoramic views of the coastal cliffs. Features cutting-edge cardio equipment, free weights, resistance machines, and an open-air yoga terrace.',
    features: [
      'Modern treadmills, ellipticals, and stationary cycles',
      'Complete dumbbell set, kettlebells, and bench press',
      'Yoga mats, foam rollers, and stretching zone',
      'Complimentary bottled water, chilled towels, and headphones',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    icon: <Dumbbell className="w-5 h-5 text-[#C7A66B]" />,
    actionLink: { label: 'Contact Concierge', to: '/contact' },
  },
  {
    id: 'spa-wellness',
    title: 'Holistic Spa & Thermal Suites',
    category: 'Rejuvenation',
    description:
      'Escape to a tranquil oasis offering tailored botanical massages, hydrotherapy steam chambers, organic facial therapies, and restorative relaxation verandas.',
    features: [
      'Private single and couples treatment suites',
      'Eucalyptus steam room and dry cedar sauna',
      'Signature coastal botanical oils and therapies',
      'Quiet terrace with organic herbal tea infusions',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80',
    icon: <Sparkles className="w-5 h-5 text-[#C7A66B]" />,
    actionLink: { label: 'Enquire via Concierge', to: '/contact' },
  },
  {
    id: 'dining-lounge',
    title: 'Seaside Restaurant & Cocktail Lounge',
    category: 'Gastronomy',
    description:
      'Experience artisanal coastal cuisine crafted with market-fresh local ingredients, complemented by a curated sommelier wine list and sunset signature cocktails.',
    features: [
      'Indoor and breezy open-air terrace dining',
      'Locally caught seafood and chef tasting menus',
      'Artisanal cocktail bar with sommelier pairings',
      'Sunset acoustic lounge evenings',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    icon: <UtensilsCrossed className="w-5 h-5 text-[#C7A66B]" />,
    actionLink: { label: 'View Dining & Menus', to: '/dining' },
  },
  {
    id: 'event-spaces',
    title: 'Conference & Event Pavilions',
    category: 'Meetings & Celebrations',
    description:
      'Host board meetings, intimate retreats, or scenic celebrations in our audio-visually equipped conference rooms and manicured ocean-facing banquet lawns.',
    features: [
      'High-definition displays and modern conference audio',
      'Flexible seating arrangements for 10 to 120 guests',
      'Bespoke catering menus and coffee breaks',
      'Outdoor sunset reception terrace',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    icon: <Users className="w-5 h-5 text-[#C7A66B]" />,
    actionLink: { label: 'Event Inquiries', to: '/contact' },
  },
  {
    id: 'wifi',
    title: 'High-Speed Fiber-Optic Wi-Fi',
    category: 'Connectivity',
    description:
      'Stay connected effortlessly with complimentary high-speed fiber internet coverage accessible throughout all guestrooms, villas, pools, and garden pavilions.',
    features: [
      'High-speed bandwidth suitable for video conferencing & streaming',
      'Seamless property-wide roaming across suites and terraces',
      'Secure encrypted guest network access',
      'Dedicated technical support via guest services',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    icon: <Wifi className="w-5 h-5 text-[#C7A66B]" />,
    actionLink: { label: 'View Guest FAQs', to: '/faqs' },
  },
  {
    id: 'room-service',
    title: 'In-Room Dining & Room Service',
    category: 'Convenience',
    description:
      'Enjoy thoughtfully prepared dishes and beverages delivered promptly to your room or private terrace, from breakfast spreads to late-night artisanal dining.',
    features: [
      'Digital menu ordering with live room delivery updates',
      'Full breakfast, lunch, and dinner selections',
      'Late-night artisanal snack and beverage menu',
      'Careful table or balcony tray setup by our dining team',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    icon: <Clock className="w-5 h-5 text-[#C7A66B]" />,
    actionLink: { label: 'Explore Digital Menu', to: '/menu' },
  },
  {
    id: 'airport-transfer',
    title: 'Airport Transfer & Chauffeured Mobility',
    category: 'Travel & Concierge',
    description:
      'Begin and end your getaway in complete comfort with optional chauffeured airport transfers, on-site valet parking, and EV charging stations.',
    features: [
      'Private luxury vehicle pickup from regional airports upon advance request',
      'Complimentary on-site valet parking for hotel guests',
      'Level 2 EV vehicle charging bays on property',
      'Bespoke local sightseeing transport coordination',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    icon: <Car className="w-5 h-5 text-[#C7A66B]" />,
    actionLink: { label: 'Location & Travel Details', to: '/location' },
  },
];

export const Facilities: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#062B45] text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=2000&q=80"
            alt="Skyview Hotels & Resorts Resort Amenities"
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
            <span className="text-white font-medium">Facilities & Amenities</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-3">
              RESORT PRIVILEGES
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-6 leading-tight">
              Curated Facilities Designed for Unwinding and Comfort
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed mb-8">
              From our oceanfront infinity pool and wellness spa to complimentary fiber Wi-Fi and 24/7 in-room dining, explore the thoughtfully appointed amenities that enrich your stay at Skyview.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                to="/booking"
                variant="gold"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Book Your Stay
              </Button>
              <Button
                to="/dining"
                variant="secondary"
                size="md"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Explore Restaurant & Bar
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
                <strong>Guest Notice:</strong> All facility listings and services shown below are illustrative representations of the Skyview experience. Operating schedules and seasonal availability require confirmation with our guest desk prior to arrival.
              </span>
            </div>
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-1 font-semibold text-[#062B45] hover:text-[#C7A66B] shrink-0 underline decoration-[#C7A66B]"
            >
              <span>Contact Concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ContentContainer>
      </section>

      {/* 3. FACILITIES GRID */}
      <section className="py-16 sm:py-24 bg-white">
        <ContentContainer size="7xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66B] mb-2 block">
              WORLD-CLASS AMENITIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#062B45] tracking-tight">
              Hotel Facilities & Guest Services
            </h2>
            <p className="text-sm sm:text-base text-[#60758B] mt-3 leading-relaxed">
              Every facility has been designed to complement your coastal escape, whether you are seeking revitalizing fitness, serene relaxation, or seamless connectivity.
            </p>
          </div>

          {/* 8 Facilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
            {FACILITIES_DATA.map((facility) => (
              <div
                key={facility.id}
                className="group bg-white rounded-2xl border border-[#D8E0EA] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-gray-100">
                  <img
                    src={facility.imageUrl}
                    alt={facility.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#062B45] px-3 py-1 rounded-full shadow-2xs flex items-center gap-1.5">
                      {facility.icon}
                      <span>{facility.category}</span>
                    </span>
                  </div>

                  {/* Illustrative Tag */}
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-medium bg-[#062B45]/80 text-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                      Illustrative Offering
                    </span>
                  </div>

                  {/* Overlay Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-medium leading-snug text-[#DFCA9B]">
                      {facility.title}
                    </h3>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-5">
                      {facility.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {facility.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#18324A]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link Footer */}
                  {facility.actionLink && (
                    <div className="pt-4 border-t border-[#D8E0EA] flex items-center justify-between">
                      <span className="text-[11px] text-[#60758B]">
                        Subject to availability
                      </span>
                      <Link
                        to={facility.actionLink.to}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] transition-colors group/link"
                      >
                        <span>{facility.actionLink.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* 4. CONCIERGE ASSISTANCE STRIP */}
      <section className="py-16 bg-[#062B45] text-white">
        <ContentContainer size="7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] block mb-2">
                HAVE SPECIFIC AMENITY QUESTIONS?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-3">
                Our Concierge Team is at Your Service
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Whether you need to arrange private airport transportation, reserve an oceanfront cabana, or inquire about dietary accommodations, our front desk is prepared to assist you 24 hours a day.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap items-center lg:justify-end gap-3">
              <Button
                to="/contact"
                variant="gold"
                size="md"
                icon={<Phone className="w-4 h-4" />}
              >
                Inquire With Concierge
              </Button>
              <Button
                to="/faqs"
                variant="secondary"
                size="md"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Read FAQs
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};
