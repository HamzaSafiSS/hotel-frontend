import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { RoomCard } from '../components/ui/RoomCard';
import { SAMPLE_ROOMS } from '../data/siteData';
import type { RoomItem } from '../data/siteData';

export const Rooms: React.FC = () => {
  // Filter & Sorting State (Category, Max Price, Minimum Capacity, Sort)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [minCapacity, setMinCapacity] = useState<number>(1);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(350);
    setMinCapacity(1);
    setSortBy('recommended');
  };

  // Filtered and Sorted Rooms Calculation
  const filteredRooms = useMemo(() => {
    return SAMPLE_ROOMS.filter((room: RoomItem) => {
      // 1. Capacity filter
      if (room.guests < minCapacity) {
        return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'all' && room.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // 3. Price filter
      if (room.pricePerNight > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.pricePerNight - b.pricePerNight;
      }
      if (sortBy === 'price-desc') {
        return b.pricePerNight - a.pricePerNight;
      }
      return 0; // recommended
    });
  }, [minCapacity, selectedCategory, maxPrice, sortBy]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* A. Page Header Banner */}
      <section className="relative bg-[#062B45] text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=80"
            alt="Skyview Rooms & Suites Header"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041D2F]/90 via-[#062B45]/65 to-[#041D2F]/40" />
        </div>

        <ContentContainer size="7xl" className="relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-300 mb-4">
            <Link to="/" className="hover:text-[#DFCA9B] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span className="text-white font-medium">Rooms & Suites</span>
          </nav>

          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-2">
              YOUR STAY, YOUR WAY
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white mb-3">
              Rooms & Suites
            </h1>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
              Discover thoughtfully designed spaces where comfort, style, and relaxation come together.
            </p>
          </div>
        </ContentContainer>
      </section>

      {/* B. Catalog Filter Controls */}
      <section className="bg-[#EAF2FF]/40 border-b border-[#D8E0EA] py-6">
        <ContentContainer size="7xl">
          {/* Filter Bar: Category, Max Price, Capacity, Sort & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#D8E0EA] rounded-xl p-3 sm:p-4 shadow-xs">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#60758B] mr-1 hidden sm:inline-flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C7A66B]" />
                <span>Category:</span>
              </span>
              {[
                { label: 'All Rooms', value: 'all' },
                { label: 'Deluxe', value: 'deluxe' },
                { label: 'Suites', value: 'suite' },
                { label: 'Villas', value: 'villa' },
              ].map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-[#062B45] text-white shadow-xs'
                      : 'bg-gray-100 hover:bg-[#EAF2FF] text-[#18324A]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Price Slider, Capacity, Sort, & Reset */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 ml-auto">
              {/* Max Price Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#60758B]">Max Price:</span>
                <input
                  type="range"
                  min="120"
                  max="350"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-20 sm:w-24 accent-[#062B45] cursor-pointer"
                  aria-label="Filter maximum price per night"
                />
                <span className="font-semibold text-[#062B45] min-w-[42px]">${maxPrice}</span>
              </div>

              {/* Guest Capacity Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#60758B] hidden sm:inline">Capacity:</span>
                <select
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(Number(e.target.value))}
                  className="bg-gray-100 border border-[#D8E0EA] rounded-md px-2.5 py-1.5 text-xs font-medium text-[#18324A] outline-none cursor-pointer"
                  aria-label="Filter by minimum guest capacity"
                >
                  <option value={1}>Any Guests</option>
                  <option value={2}>2+ Guests</option>
                  <option value={3}>3+ Guests</option>
                  <option value={4}>4+ Guests</option>
                  <option value={5}>5+ Guests</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#60758B] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'recommended' | 'price-asc' | 'price-desc')
                  }
                  className="bg-gray-100 border border-[#D8E0EA] rounded-md px-2.5 py-1.5 text-xs font-medium text-[#18324A] outline-none cursor-pointer"
                  aria-label="Sort rooms"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Clear All Filters */}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-medium text-[#60758B] hover:text-[#062B45] flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* C. Room Listings Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <ContentContainer size="7xl">
          {/* Active Results Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-[#D8E0EA] gap-2">
            <div>
              <h2 className="font-serif text-2xl font-medium text-[#062B45]">
                Available Accommodations ({filteredRooms.length})
              </h2>
              <p className="text-xs text-[#60758B] mt-1">
                Showing luxury rooms, suites, and private villas crafted for ultimate comfort
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs text-[#60758B] bg-gray-50 border border-[#D8E0EA] px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A66B]" />
              <span>Best Available Rates Guaranteed</span>
            </span>
          </div>

          {/* Room Cards Grid (Balanced 3-column / 2-column / 1-column layout) */}
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  id={room.id}
                  title={room.title}
                  category={room.category}
                  description={room.description}
                  guests={room.guests}
                  bedType={room.bedType}
                  size={room.size}
                  keyAmenities={room.keyAmenities}
                  pricePerNight={room.pricePerNight}
                  imageUrl={room.imageUrl}
                  detailsUrl={`/rooms/${room.id}`}
                  bookUrl={`/booking?roomId=${room.id}`}
                />
              ))}
            </div>
          ) : (
            /* Empty State when no rooms match criteria */
            <div className="text-center py-16 px-4 bg-gray-50 border border-dashed border-[#D8E0EA] rounded-2xl max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#EAF2FF] text-[#062B45] flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="w-6 h-6 text-[#C7A66B]" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#062B45] mb-2">
                No Rooms Match Your Criteria
              </h3>
              <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-6">
                None of our suites or villas match your active filters.
                Try adjusting your category, guest capacity, maximum price range, or clearing current filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </ContentContainer>
      </section>
    </div>
  );
};
