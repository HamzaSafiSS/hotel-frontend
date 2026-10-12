import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils,
  Clock,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Wine,
  Leaf,
  Compass,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { MenuItemCard } from '../components/ui/MenuItemCard';
import { MenuItemModal } from '../components/ui/MenuItemModal';
import {
  DINING_CATEGORIES,
  RESTAURANT_OPERATING_HOURS,
  getFeaturedDishes,
} from '../data/menuData';
import type { MenuItem } from '../data/menuData';
import { HOTEL_CONTACT } from '../data/siteData';

export const Dining: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const featuredDishes = getFeaturedDishes();

  const handleScrollToIntro = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('restaurant-intro');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 2.A HERO SECTION */}
      <section className="relative min-h-[75vh] lg:min-h-[82vh] flex flex-col justify-between pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
        {/* Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=85"
            alt="Skyview Restaurant Atmosphere & Oceanfront Seating"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Deep Navy Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#062B45] via-[#062B45]/70 to-[#041D2F]/80" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#062B45]/40 to-[#041D2F]/85" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 my-auto">
          <ContentContainer size="7xl">
            {/* Breadcrumb Bar */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-300 mb-6">
              <Link to="/" className="hover:text-[#DFCA9B] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
              <span className="text-white font-medium">Dining</span>
            </nav>

            <div className="max-w-3xl">
              {/* Eyebrow */}
              <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-3 sm:mb-4 drop-shadow-xs">
                AN EXCEPTIONAL DINING EXPERIENCE
              </span>

              {/* Heading */}
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight text-white drop-shadow-md mb-4 sm:mb-6">
                Good Food. Memorable Moments.
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-light mb-8 max-w-2xl drop-shadow-xs">
                Discover thoughtfully prepared dishes, refreshing beverages, and welcoming spaces designed to make every meal special.
              </p>

              {/* Dual Hero Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                <Button
                  to="/menu"
                  variant="gold"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                  className="group shadow-lg hover:shadow-xl font-medium"
                >
                  Explore Our Menu
                </Button>

                <button
                  type="button"
                  onClick={handleScrollToIntro}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/15 hover:bg-white/25 active:bg-white/30 text-white border border-white/30 backdrop-blur-md text-sm font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
                >
                  <Utensils className="w-4 h-4 text-[#DFCA9B]" />
                  <span>Discover Our Restaurant</span>
                </button>
              </div>
            </div>
          </ContentContainer>
        </div>
      </section>

      {/* 2.B RESTAURANT INTRODUCTION SECTION */}
      <section id="restaurant-intro" className="py-16 sm:py-24 bg-white scroll-mt-12">
        <ContentContainer size="7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Image Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 border border-[#D8E0EA]">
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
                  alt="Skyview Restaurant Intimate Atmosphere"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#DFCA9B] block mb-1">
                    SEASIDE TERRACE
                  </span>
                  <p className="font-serif text-lg font-light italic">
                    "Where panoramic coastal horizons meet culinary excellence."
                  </p>
                </div>
              </div>

              {/* Floating Decorative Badge */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-[#062B45] text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-[#0A3D60] hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C7A66B]/20 text-[#DFCA9B] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#DFCA9B] font-semibold block">
                    Chef-Curated
                  </span>
                  <span className="text-xs text-gray-200">
                    Artisanal Seasonal Menus
                  </span>
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66B] block mb-2">
                RESTAURANT SPOTLIGHT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#062B45] tracking-tight mb-4">
                Skyview Restaurant
              </h2>

              <p className="text-sm sm:text-base text-[#18324A] leading-relaxed mb-4">
                At Skyview Restaurant, dining is elevated into an immersive celebration of taste, texture, and coastal ambiance. Set against breathtaking views of the water, our sunlit dining room and open-air seaside terrace welcome resort guests and visitors alike.
              </p>

              <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-8">
                Led by our executive culinary artisans, our seasonal menus celebrate fresh local produce, prime coastal seafood, and classic regional recipes reinterpreted with refined modern technique.
              </p>

              {/* Restaurant Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-3.5 rounded-xl bg-[#EAF2FF]/50 border border-[#D8E0EA] flex flex-col gap-1.5">
                  <Leaf className="w-5 h-5 text-[#C7A66B]" />
                  <strong className="text-xs font-semibold text-[#062B45]">Farm-to-Table</strong>
                  <span className="text-[11px] text-[#60758B]">Locally sourced organic harvests & herbs</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#EAF2FF]/50 border border-[#D8E0EA] flex flex-col gap-1.5">
                  <Wine className="w-5 h-5 text-[#C7A66B]" />
                  <strong className="text-xs font-semibold text-[#062B45]">Sommelier Cellar</strong>
                  <span className="text-[11px] text-[#60758B]">Curated pairings & artisan cocktails</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#EAF2FF]/50 border border-[#D8E0EA] flex flex-col gap-1.5">
                  <Compass className="w-5 h-5 text-[#C7A66B]" />
                  <strong className="text-xs font-semibold text-[#062B45]">Ocean Terrace</strong>
                  <span className="text-[11px] text-[#60758B]">Open-air seaside sunset seating</span>
                </div>
              </div>

              {/* Browse Menu CTA */}
              <Button
                to="/menu"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                className="group"
              >
                Browse Digital Menu
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 2.C DINING CATEGORIES SECTION */}
      <section className="py-16 sm:py-20 bg-[#EAF2FF]/30 border-y border-[#D8E0EA]/70">
        <ContentContainer size="7xl">
          <div className="flex flex-col items-center text-center mb-12">
            <SectionHeading
              align="center"
              eyebrow="CULINARY DIVERSITY"
              title="Explore Our Dining Experiences"
              description="From energizing sunrise breakfasts to late-night artisanal desserts, discover thoughtful dishes for every hour of your stay."
            />
          </div>

          {/* 5 Dining Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {DINING_CATEGORIES.map((cat, idx) => (
              <div
                key={cat.id}
                className={`group bg-white rounded-2xl border border-[#D8E0EA] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  idx === 0 ? 'lg:col-span-1' : ''
                }`}
              >
                {/* Category Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-[11px] font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                    <Clock className="w-3 h-3 text-[#DFCA9B]" />
                    <span>{cat.hours}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#062B45] group-hover:text-[#C7A66B] transition-colors mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-6">
                      {cat.description}
                    </p>
                  </div>

                  <Link
                    to={`/menu?category=${cat.categoryQuery}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#062B45] group-hover:text-[#C7A66B] transition-colors group/link pt-3 border-t border-[#D8E0EA]"
                  >
                    <span>Explore {cat.title.split('&')[0].trim()} Menu</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </ContentContainer>
      </section>

      {/* 2.D FEATURED DISHES SECTION */}
      <section className="py-16 sm:py-24 bg-white">
        <ContentContainer size="7xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66B] block mb-2">
                CHEF SIGNATURES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#062B45] tracking-tight">
                Featured Culinary Highlights
              </h2>
              <p className="text-xs sm:text-sm text-[#60758B] mt-1 max-w-xl">
                A preview of our guests' most requested dishes, thoughtfully prepared by our master kitchen.
              </p>
            </div>

            <Button
              to="/menu"
              variant="secondary"
              size="md"
              icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              className="group shrink-0"
            >
              View Full Menu
            </Button>
          </div>

          {/* 4 Featured Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch mb-12">
            {featuredDishes.map((dish) => (
              <MenuItemCard
                key={dish.id}
                item={dish}
                onSelect={(item) => setSelectedItem(item)}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              to="/menu"
              variant="gold"
              size="lg"
              icon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
              className="group shadow-md hover:shadow-lg font-medium"
            >
              Explore Complete Digital Menu
            </Button>
          </div>
        </ContentContainer>
      </section>

      {/* 2.E DINING INFORMATION & RESERVATION DETAILS */}
      <section className="py-16 bg-[#062B45] text-white">
        <ContentContainer size="7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hours Grid (Left 7 cols) */}
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] block mb-2">
                HOURS & LOCATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-6">
                Dining Hours & Location
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {RESTAURANT_OPERATING_HOURS.map((slot) => (
                  <div
                    key={slot.meal}
                    className="p-5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#DFCA9B] font-semibold block mb-1">
                        {slot.meal}
                      </span>
                      <strong className="text-base text-white block mb-2">
                        {slot.hours}
                      </strong>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug">
                      {slot.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Location Badge */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-5 h-5 text-[#C7A66B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm text-white block">
                    Skyview Restaurant & Seaside Pavilion
                  </strong>
                  <span className="text-xs text-gray-300">
                    Ground Level, Seaside Wing • 124 Scenic Coastal Boulevard, Azure Haven
                  </span>
                </div>
              </div>
            </div>

            {/* Inquiries & Table Reservations Card (Right 5 cols) */}
            <div className="lg:col-span-5 bg-white text-[#18324A] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#D8E0EA]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C7A66B] block mb-1">
                GUEST SERVICES
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#062B45] mb-3">
                Table Reservations & Inquiries
              </h3>
              <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-6">
                Walk-in guests are always warmly welcomed. For sunset terrace requests, private dining cabanas, or dietary arrangements, our concierge is at your service.
              </p>

              <div className="space-y-3 mb-6 text-xs text-[#18324A]">
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-[#D8E0EA]">
                  <Phone className="w-4 h-4 text-[#C7A66B] shrink-0" />
                  <span>{HOTEL_CONTACT.phone}</span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gray-50 border border-[#D8E0EA]">
                  <Mail className="w-4 h-4 text-[#C7A66B] shrink-0" />
                  <span>{HOTEL_CONTACT.email}</span>
                </div>
              </div>

              <Button
                to="/contact"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full justify-center"
              >
                Contact Concierge Desk
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* Modal for Item Details */}
      <MenuItemModal
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
