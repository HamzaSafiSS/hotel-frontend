import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Car,
  Plane,
  Train,
  ChevronRight,
  ArrowRight,
  Info,
  Phone,
  Mail,
  Clock,
  Compass,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { Button } from '../components/ui/Button';
import { HOTEL_CONTACT } from '../data/siteData';

export const Location: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#062B45] text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
            alt="Skyview Hotels & Resorts Coastal Headlands"
            className="w-full h-full object-cover object-center opacity-30"
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
            <span className="text-white font-medium">Location & Directions</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-3">
              ARRIVING AT SKYVIEW
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-6 leading-tight">
              A Picturesque Coastal Haven Along Scenic Horizons
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed mb-8">
              Perched along the oceanfront bluffs of Azure Haven, Skyview is accessible via picturesque coastal highways, regional rail, and private airport transfers.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                to="/contact"
                variant="gold"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Inquire About Transfers
              </Button>
              <Button
                to="/booking"
                variant="secondary"
                size="md"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Book Your Stay
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 2. CRITICAL PLACEHOLDER NOTICE (MANDATORY REQUIREMENT) */}
      <section className="bg-amber-50/90 border-b border-amber-200 py-4 px-4">
        <ContentContainer size="7xl">
          <div className="flex items-start sm:items-center gap-3 text-xs text-amber-900 leading-relaxed">
            <Info className="w-5 h-5 text-[#C7A66B] shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <strong className="font-bold">Important Notice:</strong> The hotel address, travel routes, and distances provided below represent sample placeholder information for demonstration purposes. This content must be replaced with verified commercial coordinates and directions before live deployment.
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 3. ADDRESS & TRAVEL OVERVIEW */}
      <section className="py-16 sm:py-20 bg-white">
        <ContentContainer size="7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Address Box & Landmark Guide */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66B] mb-2 block">
                  RESORT ADDRESS
                </span>
                <h2 className="font-serif text-3xl font-normal text-[#062B45] tracking-tight mb-4">
                  Where to Find Us
                </h2>
                <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed">
                  Located along the scenic bluffline overlooking the ocean, our property offers serene seclusion while remaining within convenient reach of regional transport hubs.
                </p>
              </div>

              {/* Address Details Card */}
              <div className="p-6 rounded-2xl bg-[#EAF2FF]/40 border border-[#D8E0EA] space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C7A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#062B45] block font-semibold">Resort Location:</strong>
                    <span className="text-[#18324A]">{HOTEL_CONTACT.address}</span>
                    <span className="text-[11px] text-[#60758B] block mt-0.5">
                      (Sample demonstration address)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#D8E0EA]">
                  <Phone className="w-5 h-5 text-[#C7A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#062B45] block font-semibold">Concierge & Front Desk:</strong>
                    <span className="text-[#18324A]">{HOTEL_CONTACT.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#D8E0EA]">
                  <Mail className="w-5 h-5 text-[#C7A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#062B45] block font-semibold">Reservations Inquiries:</strong>
                    <span className="text-[#18324A]">{HOTEL_CONTACT.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#D8E0EA]">
                  <Clock className="w-5 h-5 text-[#C7A66B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#062B45] block font-semibold">Reception Hours:</strong>
                    <span className="text-[#18324A]">{HOTEL_CONTACT.receptionHours}</span>
                  </div>
                </div>
              </div>

              {/* Nearby Illustrative Landmarks */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-[#D8E0EA]">
                <h3 className="font-serif text-base font-semibold text-[#062B45] mb-3 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C7A66B]" />
                  <span>Illustrative Nearby Points of Interest</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-[#18324A]">
                  <li className="flex items-center justify-between">
                    <span>Azure Haven Lighthouse & Bluffs</span>
                    <span className="text-[#60758B] font-mono">~3.2 km</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Seaside Marina & Sailing Club</span>
                    <span className="text-[#60758B] font-mono">~4.8 km</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Historic Coastal Village Center</span>
                    <span className="text-[#60758B] font-mono">~6.5 km</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Regional Nature Sanctuary</span>
                    <span className="text-[#60758B] font-mono">~12 km</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Map Placeholder Component */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#D8E0EA] bg-[#062B45] text-white overflow-hidden shadow-xl relative flex flex-col justify-between min-h-[440px]">
                {/* Background Map Graphic Illustration */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  </svg>
                </div>

                {/* Top Bar */}
                <div className="p-6 relative z-10 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-xs">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DFCA9B]">
                    <Navigation className="w-4 h-4 text-[#C7A66B]" />
                    <span>Stylized Location Overview</span>
                  </div>
                  <span className="text-[10px] bg-white/15 px-2.5 py-1 rounded text-white/90">
                    Sample Map Placeholder
                  </span>
                </div>

                {/* Center Pin & Mock Geography */}
                <div className="p-8 sm:p-12 relative z-10 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-5">
                    <div className="w-16 h-16 rounded-full bg-[#C7A66B]/20 animate-ping absolute inset-0" />
                    <div className="w-16 h-16 rounded-full bg-[#C7A66B] text-[#062B45] flex items-center justify-center relative shadow-lg">
                      <MapPin className="w-8 h-8 text-[#062B45]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-white mb-2">
                    Skyview Hotels & Resorts
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md leading-relaxed mb-6">
                    {HOTEL_CONTACT.address}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[11px] text-[#DFCA9B] border border-white/15">
                    <Info className="w-3.5 h-3.5" />
                    <span>Interactive Map Embed will be integrated upon verified coordinates</span>
                  </div>
                </div>

                {/* Bottom Coordinates & Fast Actions */}
                <div className="p-5 relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-gray-300">
                    Illustrative Coastal Coordinates: 34.0259° N, 118.7798° W
                  </span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 font-semibold text-[#DFCA9B] hover:text-white transition-colors"
                  >
                    <span>Request Custom Travel Directions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 4. GETTING HERE: CAR, TRANSIT, AIRPORT */}
      <section className="py-16 sm:py-24 bg-[#EAF2FF]/20 border-t border-[#D8E0EA]">
        <ContentContainer size="7xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66B] mb-2 block">
              TRANSPORTATION MODES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#062B45] tracking-tight">
              Getting to Skyview
            </h2>
            <p className="text-sm sm:text-base text-[#60758B] mt-3 leading-relaxed">
              Detailed transportation suggestions to guide your arrival by personal vehicle, regional transit, or private flight transfer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. By Car */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-[#D8E0EA] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#062B45] text-[#C7A66B] flex items-center justify-center mb-6 shadow-2xs">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#062B45] mb-3">
                  Arriving by Car
                </h3>
                <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-6">
                  Follow the scenic coastal highway directly toward Azure Haven. Well-marked resort signage guides you to our private entry gates.
                </p>

                <ul className="space-y-2.5 text-xs text-[#18324A]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
                    <span>Complimentary valet parking for registered guests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
                    <span>Dedicated on-site Level 2 EV charging stations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
                    <span>Secure covered parking bays available</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Public Transit & Rail */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-[#D8E0EA] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#062B45] text-[#C7A66B] flex items-center justify-center mb-6 shadow-2xs">
                  <Train className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#062B45] mb-3">
                  Regional Rail & Transit
                </h3>
                <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-6">
                  Regional express passenger trains connect major metropolitan centers to the Azure Haven coastal transit terminal.
                </p>

                <ul className="space-y-2.5 text-xs text-[#18324A]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
                    <span>Taxi & rideshare bays available at train terminal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
                    <span>Short scenic connection along the coastal road</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
                    <span>Luggage assistance provided upon arrival</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. Airport Transfer */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-[#D8E0EA] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#062B45] text-[#C7A66B] flex items-center justify-center mb-6 shadow-2xs">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[#062B45] mb-3">
                  Airport Transfers
                </h3>
                <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-6">
                  Convenient access from regional and international airports. Private chauffeured transfers can be reserved directly with our concierge.
                </p>

                <ul className="space-y-2.5 text-xs text-[#18324A]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
                    <span>Chauffeured luxury SUV & sedan pickups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
                    <span>Flight arrival monitoring to adjust for delays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
                    <span>Inquire 48 hours prior to scheduled flight</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16 bg-[#062B45] text-white">
        <ContentContainer size="7xl">
          <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-8 sm:p-12 border border-white/15 backdrop-blur-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] block mb-2">
                PLAN YOUR DEPARTURE & ARRIVAL
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-3">
                Ready to Experience Skyview?
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                Contact our concierge to schedule an airport transfer, or reserve your oceanfront suite today.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                to="/contact"
                variant="gold"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Inquire With Concierge
              </Button>
              <Button
                to="/booking"
                variant="secondary"
                size="md"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Reserve Your Stay
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};
