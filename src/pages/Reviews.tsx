import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  ChevronRight,
  ArrowRight,
  Info,
  BedDouble,
  CheckCircle2,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { Button } from '../components/ui/Button';

interface SampleReviewItem {
  id: string;
  guestName: string;
  location: string;
  roomType: string;
  stayDate: string;
  rating: number;
  title: string;
  comment: string;
  highlights: string[];
}

const SAMPLE_REVIEWS_DATA: SampleReviewItem[] = [
  {
    id: 'rev-1',
    guestName: 'Sarah M.',
    location: 'San Francisco, CA',
    roomType: 'Ocean View Suite',
    stayDate: 'Recent Autumn Stay',
    rating: 5,
    title: 'An Unforgettable Coastal Horizon',
    comment:
      'The panoramic ocean views from the suite balcony were breathtaking from sunrise to dusk. The room design felt exceptionally thoughtful, from the plush bed linens to the acoustic serenity. The staff greeted us with genuine warmth every time we stepped into the lobby.',
    highlights: ['Sunset balcony views', 'Acoustic comfort', 'Warm staff hospitality'],
  },
  {
    id: 'rev-2',
    guestName: 'David & Elena R.',
    location: 'Milan, Italy',
    roomType: 'Private Pool Villa',
    stayDate: 'Anniversary Stay',
    rating: 5,
    title: 'Total Seclusion and Restorative Luxury',
    comment:
      'We celebrated our tenth anniversary in the Private Pool Villa. Having our own temperature-controlled plunge pool surrounded by tropical greenery was extraordinary. The candlelit terrace dinner arranged by the concierge was the highlight of our trip.',
    highlights: ['Private plunge pool', 'Bespoke terrace dinner', 'Total privacy'],
  },
  {
    id: 'rev-3',
    guestName: 'Marcus V.',
    location: 'London, UK',
    roomType: 'Deluxe Room',
    stayDate: 'Solo Coastal Retreat',
    rating: 5,
    title: 'Peaceful Ambiance and First-Class Amenities',
    comment:
      'As a remote professional needing calm, the room’s ergonomic desk and ultra-fast Wi-Fi were top tier. Taking morning walks along the coastal bluffs followed by an espresso in the seaside pavilion made this stay restorative and seamless.',
    highlights: ['High-speed Wi-Fi', 'Ergonomic workspace', 'Morning seaside dining'],
  },
  {
    id: 'rev-4',
    guestName: 'Helena & Julian T.',
    location: 'Zurich, Switzerland',
    roomType: 'Family Suite',
    stayDate: 'Family Vacation',
    rating: 5,
    title: 'Effortless Family Comfort and Spacious Design',
    comment:
      'Traveling with two young children is rarely restful, but the Family Suite made everything effortless. The dual bathrooms eliminated morning delays, and the children loved the starlight lawn cinema evening while we enjoyed wine on the veranda.',
    highlights: ['Dual bathrooms', 'Spacious central living room', 'Family lawn cinema'],
  },
  {
    id: 'rev-5',
    guestName: 'Chloe S.',
    location: 'New York, NY',
    roomType: 'Ocean View Suite',
    stayDate: 'Weekend Getaway',
    rating: 5,
    title: 'Every Detail Handled With Precision',
    comment:
      'From the smooth digital check-in to the aromatic botanical spa ritual, Skyview exceeded our expectations. The dinner at the seaside restaurant was fresh, vibrant, and paired with stellar local wines. We cannot wait to return.',
    highlights: ['Botanical wellness spa', 'Digital dining service', 'Master sommelier wine pairing'],
  },
  {
    id: 'rev-6',
    guestName: 'Jonathan P.',
    location: 'Sydney, Australia',
    roomType: 'Private Pool Villa',
    stayDate: 'Restorative Holiday',
    rating: 5,
    title: 'The Perfect Coastal Escape',
    comment:
      'Impeccable cleanliness, soothing natural lighting, and attentive concierge service without feeling intrusive. The infinity pool overlooking the ocean felt like a private sanctuary. A masterclass in luxury hotel hospitality.',
    highlights: ['Infinity pool horizons', 'Attentive discreet care', 'Architectural elegance'],
  },
];

export const Reviews: React.FC = () => {
  const [selectedRoomFilter, setSelectedRoomFilter] = useState<string>('all');

  const roomFilters = [
    { id: 'all', label: 'All Reviews' },
    { id: 'Ocean View Suite', label: 'Ocean View Suite' },
    { id: 'Private Pool Villa', label: 'Private Pool Villa' },
    { id: 'Family Suite', label: 'Family Suite' },
    { id: 'Deluxe Room', label: 'Deluxe Room' },
  ];

  const filteredReviews = selectedRoomFilter === 'all'
    ? SAMPLE_REVIEWS_DATA
    : SAMPLE_REVIEWS_DATA.filter((r) => r.roomType === selectedRoomFilter);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#062B45] text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2000&q=80"
            alt="Skyview Guest Testimonials & Sunset Terrace"
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
            <span className="text-white font-medium">Guest Reviews</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-3">
              GUEST EXPERIENCES & STORIES
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-6 leading-tight">
              Sample Guest Stories & Hospitality Impressions
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed mb-8">
              Read sample guest testimonials reflecting the attentive care, peaceful atmosphere, and refined coastal living awaiting you at Skyview Hotels & Resorts.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                to="/booking"
                variant="gold"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Plan Your Stay
              </Button>
              <Button
                to="/rooms"
                variant="secondary"
                size="md"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                View Rooms & Suites
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 2. DEMONSTRATION DISCLAIMER STRIP (IMPORTANT REQUIREMENT) */}
      <section className="bg-amber-50/80 border-b border-amber-200/80 py-3.5 px-4">
        <ContentContainer size="7xl">
          <div className="flex items-center gap-2.5 text-xs text-amber-900 leading-snug">
            <Info className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
            <span>
              <strong>Demonstration Notice:</strong> Sample testimonials shown for demonstration purposes. These entries illustrate guest perspectives and anticipated service standards for this presentation. Verified guest ratings and live reviews will be integrated prior to commercial launch.
            </span>
          </div>
        </ContentContainer>
      </section>

      {/* 3. REVIEWS GRID & FILTER */}
      <section className="py-16 sm:py-24 bg-[#EAF2FF]/15 flex-1">
        <ContentContainer size="7xl">
          {/* Section Header & Room Type Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66B] mb-2 block">
                WHAT GUESTS APPRECIATE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#062B45] tracking-tight">
                Guest Reflections by Room Category
              </h2>
              <p className="text-xs sm:text-sm text-[#60758B] mt-1 max-w-xl">
                Explore illustrative impressions shared across our diverse suite and villa collection.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {roomFilters.map((flt) => {
                const isActive = selectedRoomFilter === flt.id;
                return (
                  <button
                    key={flt.id}
                    type="button"
                    onClick={() => setSelectedRoomFilter(flt.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B] ${
                      isActive
                        ? 'bg-[#062B45] text-white shadow-2xs'
                        : 'bg-white border border-[#D8E0EA] hover:bg-[#EAF2FF] text-[#18324A]'
                    }`}
                  >
                    {flt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-[#D8E0EA] p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top: Star Rating & Room Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#C7A66B]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-[#C7A66B]" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#EAF2FF] text-[#062B45] px-2.5 py-1 rounded-md border border-[#D8E0EA]">
                      <BedDouble className="w-3 h-3 text-[#C7A66B]" />
                      <span>{rev.roomType}</span>
                    </span>
                  </div>

                  {/* Review Title & Quote */}
                  <h3 className="font-serif text-lg font-medium text-[#062B45] mb-3 leading-snug">
                    "{rev.title}"
                  </h3>
                  <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-6 italic">
                    "{rev.comment}"
                  </p>

                  {/* Highlight Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-6">
                    {rev.highlights.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[10px] bg-gray-100 text-[#18324A] px-2 py-0.5 rounded-md"
                      >
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#C7A66B]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Guest Name & Stay Context */}
                <div className="pt-4 border-t border-[#D8E0EA] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#062B45]">{rev.guestName}</h4>
                    <span className="text-[11px] text-[#60758B]">{rev.location}</span>
                  </div>
                  <span className="text-[10px] text-[#60758B] bg-gray-50 border border-[#D8E0EA] px-2 py-1 rounded">
                    {rev.stayDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* 4. CALL TO ACTION STRIP */}
      <section className="py-16 bg-[#062B45] text-white">
        <ContentContainer size="7xl">
          <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-8 sm:p-12 border border-white/15 backdrop-blur-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] block mb-2">
                YOUR COASTAL STORY AWAITS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-3">
                Experience Skyview for Yourself
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                Discover the tranquility and comfort that define every stay. Reserve directly through our official website to enjoy our best available rates and personalized concierge assistance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                to="/booking"
                variant="gold"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Reserve Your Stay
              </Button>
              <Button
                to="/experiences"
                variant="secondary"
                size="md"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Explore Experiences
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};
