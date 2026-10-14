import React, { useState, useMemo } from 'react';
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
import { useHotelStore } from '../store/hotelStore';

export const Reviews: React.FC = () => {
  const { reviews } = useHotelStore();
  const [selectedRoomFilter, setSelectedRoomFilter] = useState<string>('all');

  const publishedReviews = useMemo(() => {
    return reviews
      .filter((r) => r.published)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [reviews]);

  const roomFilters = [
    { id: 'all', label: 'All Reviews' },
    { id: 'Ocean View Suite', label: 'Ocean View Suite' },
    { id: 'Private Pool Villa', label: 'Private Pool Villa' },
    { id: 'Family Suite', label: 'Family Suite' },
    { id: 'Deluxe Room', label: 'Deluxe Room' },
  ];

  const filteredReviews = useMemo(() => {
    if (selectedRoomFilter === 'all') return publishedReviews;
    return publishedReviews.filter((r) => r.roomType === selectedRoomFilter);
  }, [selectedRoomFilter, publishedReviews]);

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
            {filteredReviews.length === 0 ? (
              <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-[#D8E0EA] p-8">
                <p className="text-sm text-[#60758B]">No published guest reviews available for this category.</p>
              </div>
            ) : (
              filteredReviews.map((rev) => (
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
            )))}
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
