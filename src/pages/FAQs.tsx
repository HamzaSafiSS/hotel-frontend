import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Search,
  X,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Info,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { Button } from '../components/ui/Button';

interface FAQItem {
  id: string;
  category: 'checkin' | 'reservations' | 'family' | 'dining' | 'facilities' | 'general';
  categoryLabel: string;
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  // 1. Check-in and Check-out
  {
    id: 'faq-1',
    category: 'checkin',
    categoryLabel: 'Check-in & Arrival',
    question: 'What are the standard check-in and check-out times?',
    answer:
      'Standard guest check-in begins at 3:00 PM, and check-out is at 11:00 AM. Early arrivals and late departures are accommodated whenever availability permits; please contact our front desk ahead of time to coordinate your arrival timing.',
  },
  {
    id: 'faq-2',
    category: 'checkin',
    categoryLabel: 'Check-in & Arrival',
    question: 'Can I request an early check-in or late check-out?',
    answer:
      'Early check-in and extended check-out may be requested through our concierge or during your booking process. While subject to room availability, our team will gladly hold your luggage and grant access to resort pools and dining areas while your suite is readied.',
  },
  {
    id: 'faq-3',
    category: 'checkin',
    categoryLabel: 'Check-in & Arrival',
    question: 'What documents are required upon arrival?',
    answer:
      'Guests are asked to present a valid government-issued photo ID (passport, national ID, or driver’s license) alongside a payment card for room incidentals at reception.',
  },

  // 2. Room Reservations & Cancellations
  {
    id: 'faq-4',
    category: 'reservations',
    categoryLabel: 'Reservations & Policies',
    question: 'How do I modify or cancel a room reservation?',
    answer:
      'Reservations made directly through our website can be managed by contacting our concierge desk with your booking reference. Illustrative policies typically permit cancellation up to 48 hours prior to scheduled arrival without penalty (final terms must be verified prior to actual booking confirmation).',
  },
  {
    id: 'faq-5',
    category: 'reservations',
    categoryLabel: 'Reservations & Policies',
    question: 'Are sample portfolio rates and room bookings live?',
    answer:
      'Please note that this website is a portfolio presentation. All room rates, sample booking confirmations, and lookup tools are frontend demonstrations. No real credit card transactions or live room holds occur.',
  },

  // 3. Children & Family Stays
  {
    id: 'faq-6',
    category: 'family',
    categoryLabel: 'Family Stays',
    question: 'Is Skyview Hotels & Resorts family-friendly?',
    answer:
      'Yes, families are warmly welcomed. Our Family Suites feature dual bathrooms, separate sleeping quarters, and optional baby cribs or rollaway beds. We also offer child-friendly dining menus and family activities such as starlight lawn screenings.',
  },
  {
    id: 'faq-7',
    category: 'family',
    categoryLabel: 'Family Stays',
    question: 'Do you provide baby cribs and child safety accommodations?',
    answer:
      'Complimentary baby cribs, high chairs, and child-safe corner cushions can be requested during reservation or arranged directly with housekeeping upon check-in.',
  },

  // 4. Dining & Restaurant Hours
  {
    id: 'faq-8',
    category: 'dining',
    categoryLabel: 'Dining & Room Service',
    question: 'What are the operating hours for the restaurant and bar?',
    answer:
      'Sample dining schedules are: Breakfast from 7:00 AM – 10:30 AM; Lunch from 12:00 PM – 2:30 PM; Dinner from 6:00 PM – 10:00 PM. The Seaside Bar & Sunset Lounge serves cocktails and light refreshments until 11:30 PM. Operating hours are illustrative and subject to seasonal confirmation.',
  },
  {
    id: 'faq-9',
    category: 'dining',
    categoryLabel: 'Dining & Room Service',
    question: 'Is room service available round-the-clock?',
    answer:
      'In-room dining operates with a full menu throughout the day, and an artisanal night menu of savory dishes, snacks, and beverages is accessible 24 hours a day by dialing extension 104 from your suite.',
  },
  {
    id: 'faq-10',
    category: 'dining',
    categoryLabel: 'Dining & Room Service',
    question: 'Can dietary restrictions and allergies be accommodated?',
    answer:
      'Our culinary team regularly accommodates vegetarian, vegan, gluten-sensitive, dairy-free, and nut-allergy requests. Please inform our servers or note dietary requirements when making dining reservations.',
  },

  // 5. Facilities & Amenities
  {
    id: 'faq-11',
    category: 'facilities',
    categoryLabel: 'Facilities & Wi-Fi',
    question: 'What are the swimming pool and fitness studio hours?',
    answer:
      'The oceanfront infinity pool is open daily from 7:00 AM until 9:00 PM. Our wellness fitness studio is accessible 24 hours a day with room keycard access for registered guests.',
  },
  {
    id: 'faq-12',
    category: 'facilities',
    categoryLabel: 'Facilities & Wi-Fi',
    question: 'Is high-speed Wi-Fi complimentary throughout the resort?',
    answer:
      'Yes, complimentary high-speed fiber-optic Wi-Fi is available across all guest suites, private villas, dining pavilions, pool terraces, and landscaped courtyards.',
  },
  {
    id: 'faq-13',
    category: 'facilities',
    categoryLabel: 'Facilities & Wi-Fi',
    question: 'Do you offer airport transfer services and valet parking?',
    answer:
      'Chauffeured luxury airport transfers can be scheduled with our concierge team in advance. On-site valet parking and EV charging bays are complimentary for registered hotel guests.',
  },

  // 6. Accessibility & General
  {
    id: 'faq-14',
    category: 'general',
    categoryLabel: 'Accessibility & Support',
    question: 'Are there wheelchair-accessible rooms and resort facilities?',
    answer:
      'Skyview features wheelchair-accessible suites equipped with roll-in rain showers, wider entryways, and lowered counters. Elevator access and graded ramps connect all main lobby, dining, and pool areas.',
  },
  {
    id: 'faq-15',
    category: 'general',
    categoryLabel: 'Accessibility & Support',
    question: 'How can I contact the hotel concierge team?',
    answer:
      'Our dedicated guest relations desk is available 24 hours a day via telephone (+1 800 555-7598), email (reservations@skyviewhotels.com), or through our website contact form.',
  },
];

const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'checkin', label: 'Check-in & Arrival' },
  { id: 'reservations', label: 'Reservations & Policies' },
  { id: 'family', label: 'Family Stays' },
  { id: 'dining', label: 'Dining & Room Service' },
  { id: 'facilities', label: 'Facilities & Wi-Fi' },
  { id: 'general', label: 'Accessibility & Support' },
];

export const FAQs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItemIds, setOpenItemIds] = useState<Set<string>>(
    new Set(['faq-1', 'faq-4', 'faq-8'])
  );

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenItemIds(new Set(FAQS_DATA.map((f) => f.id)));
  };

  const collapseAll = () => {
    setOpenItemIds(new Set());
  };

  // Filter FAQs based on active category and search input
  const filteredFAQs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return FAQS_DATA.filter((item) => {
      // 1. Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Search match
      if (query) {
        const inQuestion = item.question.toLowerCase().includes(query);
        const inAnswer = item.answer.toLowerCase().includes(query);
        const inCategory = item.categoryLabel.toLowerCase().includes(query);
        if (!inQuestion && !inAnswer && !inCategory) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#062B45] text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=2000&q=80"
            alt="Skyview Guest Concierge Lounge & Frequently Asked Questions"
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
            <span className="text-white font-medium">FAQs</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-3">
              HELP & GUEST ASSISTANCE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-6 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed mb-8">
              Find quick answers regarding check-in procedures, suite reservations, dining hours, resort amenities, and guest privileges.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                to="/contact"
                variant="gold"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Contact Concierge Desk
              </Button>
              <Button
                to="/location"
                variant="secondary"
                size="md"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Directions & Travel
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 2. ILLUSTRATIVE NOTICE BANNER */}
      <section className="bg-amber-50/80 border-b border-amber-200/80 py-3.5 px-4">
        <ContentContainer size="7xl">
          <div className="flex items-center gap-2.5 text-xs text-amber-900 leading-snug">
            <Info className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
            <span>
              <strong>Illustrative Information:</strong> Hotel policies, check-in hours, and service guidelines described below are illustrative representations. Definite terms and live reservation policies require confirmation before a real commercial launch.
            </span>
          </div>
        </ContentContainer>
      </section>

      {/* 3. SEARCH & CATEGORY FILTER BAR */}
      <section className="sticky top-16 sm:top-20 z-20 bg-white/95 backdrop-blur-md border-b border-[#D8E0EA] py-4 shadow-xs">
        <ContentContainer size="7xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {FAQ_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B] ${
                      isActive
                        ? 'bg-[#062B45] text-white shadow-2xs'
                        : 'bg-gray-100 hover:bg-[#EAF2FF] text-[#18324A]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-[#60758B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search question keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#EAF2FF]/30 border border-[#D8E0EA] rounded-lg pl-9 pr-8 py-2 text-xs font-medium text-[#18324A] placeholder:text-[#60758B]/60 outline-none focus:border-[#062B45] focus:bg-white transition-all"
                aria-label="Search FAQs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#60758B] hover:text-[#062B45] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 4. ACCORDION QUESTIONS LIST */}
      <section className="py-12 sm:py-20 bg-[#EAF2FF]/15 flex-1">
        <ContentContainer size="7xl">
          {/* Header Controls: Count & Expand/Collapse */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D8E0EA]">
            <div>
              <h2 className="text-base font-semibold text-[#062B45]">
                {selectedCategory === 'all'
                  ? 'All Guest Questions'
                  : FAQ_CATEGORIES.find((c) => c.id === selectedCategory)?.label}{' '}
                <span className="text-xs font-normal text-[#60758B]">
                  ({filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'})
                </span>
              </h2>
              {searchQuery && (
                <p className="text-xs text-[#60758B] mt-0.5">
                  Filtered by keyword: <strong className="text-[#062B45]">"{searchQuery}"</strong>
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs">
              <button
                type="button"
                onClick={expandAll}
                className="text-[#062B45] hover:text-[#C7A66B] font-medium transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={collapseAll}
                className="text-[#60758B] hover:text-[#062B45] font-medium transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Accordion Items */}
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4 max-w-4xl mx-auto">
              {filteredFAQs.map((faq) => {
                const isOpen = openItemIds.has(faq.id);
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-[#D8E0EA] shadow-xs overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      id={`faq-btn-${faq.id}`}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-gray-50/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="w-6 h-6 rounded-full bg-[#EAF2FF] text-[#062B45] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          Q
                        </span>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#C7A66B] block mb-1">
                            {faq.categoryLabel}
                          </span>
                          <span className="font-serif text-base sm:text-lg font-medium text-[#062B45] leading-snug">
                            {faq.question}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full bg-[#EAF2FF] flex items-center justify-center text-[#062B45] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-[#062B45] text-white' : ''
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Collapsible Answer */}
                    {isOpen && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-btn-${faq.id}`}
                        className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#60758B] leading-relaxed border-t border-[#D8E0EA]/50 animate-fadeIn"
                      >
                        <div className="pl-9.5">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-white border border-dashed border-[#D8E0EA] rounded-2xl max-w-md mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-[#EAF2FF] text-[#062B45] flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-[#C7A66B]" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#062B45] mb-2">
                No Questions Found
              </h3>
              <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-6">
                We couldn't find any questions matching "{searchQuery}". Try a different keyword or reset your filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-2 bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                <span>View All FAQs</span>
              </button>
            </div>
          )}
        </ContentContainer>
      </section>

      {/* 5. NEED MORE ASSISTANCE */}
      <section className="py-16 bg-[#062B45] text-white">
        <ContentContainer size="7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] block mb-2">
                STILL HAVE QUESTIONS?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mb-2">
                Speak Directly With Our Concierge
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
                Our front desk and reservations staff are pleased to clarify special requests, accessibility needs, or upcoming stay details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
              <Button
                to="/contact"
                variant="gold"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="justify-center"
              >
                Send an Inquiry
              </Button>
              <Button
                to="/booking"
                variant="secondary"
                size="md"
                className="justify-center bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Book a Room Online
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};
