import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { SAMPLE_ROOMS } from '../data/siteData';
import { MENU_ITEMS } from '../data/menuData';

// --- DATA TYPES ---

export interface AdminRoomItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  fullDescription: string;
  guests: number;
  bedType: string;
  size: string;
  pricePerNight: number;
  imageUrl: string;
  galleryImages: string[];
  keyAmenities: string[];
  amenities: string[];
  highlights: string[];
  cancellationPolicy: string;
  featured?: boolean;
  published: boolean;
  active: boolean;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'Pending Confirmation';

export interface AdminBookingRecord {
  bookingReference: string;
  roomId: string;
  roomTitle: string;
  roomCategory: string;
  pricePerNight: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomsCount: number;
  adults: number;
  children: number;
  totalEstimatedPrice: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  specialRequests?: string;
  paymentScreenshot?: string;
  createdAt: string;
  status: BookingStatus;
}

export interface AdminMenuItem {
  id: string;
  name: string;
  category: 'breakfast' | 'starters' | 'mains' | 'local' | 'desserts' | 'hot-drinks' | 'cold-drinks';
  categoryLabel: string;
  description: string;
  fullDescription: string;
  price: number;
  imageUrl: string;
  dietary?: string[];
  allergens?: string[];
  isAvailable?: boolean;
  featured?: boolean;
  published: boolean;
}

export interface AdminFacilityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  imageUrl: string;
  iconName: string;
  displayOrder: number;
  published: boolean;
  actionLinkLabel?: string;
  actionLinkTo?: string;
}

export interface AdminGalleryItem {
  id: string;
  title: string;
  category: 'rooms' | 'dining' | 'facilities' | 'experiences' | 'property';
  categoryLabel: string;
  caption: string;
  imageUrl: string;
  altText: string;
  displayOrder: number;
  published: boolean;
}

export interface AdminExperienceItem {
  id: string;
  title: string;
  section: 'wellness' | 'dining' | 'culture' | 'sightseeing' | 'family' | 'romance';
  sectionLabel: string;
  tag: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  iconName: string;
  ctaLabel?: string;
  ctaLink?: string;
  displayOrder: number;
  published: boolean;
}

export interface AdminReviewItem {
  id: string;
  guestName: string;
  location: string;
  roomType: string;
  stayDate: string;
  rating: number;
  title: string;
  comment: string;
  highlights: string[];
  displayOrder: number;
  published: boolean;
}

export interface AdminFAQItem {
  id: string;
  category: 'checkin' | 'reservations' | 'family' | 'dining' | 'facilities' | 'general';
  categoryLabel: string;
  question: string;
  answer: string;
  displayOrder: number;
  published: boolean;
}

export type EnquiryStatus = 'New' | 'Read' | 'In Progress' | 'Resolved';

export interface AdminEnquiryItem {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: EnquiryStatus;
}

export interface WebsiteContent {
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  heroButtonRoomsLabel: string;
  heroButtonMenuLabel: string;
  promoEyebrow: string;
  promoHeading: string;
  promoDescription: string;
  promoButtonLabel: string;
  aboutIntroHeading: string;
  aboutIntroText: string;
  aboutStoryP1: string;
  aboutStoryP2: string;
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
}

export interface HotelSettings {
  hotelName: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  receptionHours: string;
  currencySymbol: string;
  defaultCheckInTime: string;
  defaultCheckOutTime: string;
  copyrightText: string;
}

// --- INITIAL DEFAULT DATA ---

export const INITIAL_ROOMS: AdminRoomItem[] = SAMPLE_ROOMS.map((room) => ({
  ...room,
  published: true,
  active: true,
}));

export const INITIAL_MENU_ITEMS: AdminMenuItem[] = MENU_ITEMS.map((item) => ({
  ...item,
  published: true,
}));

export const INITIAL_BOOKINGS: AdminBookingRecord[] = [
  {
    bookingReference: 'SKY-2026-8812',
    roomId: 'ocean-view-suite',
    roomTitle: 'Ocean View Suite',
    roomCategory: 'Suite',
    pricePerNight: 180,
    checkIn: '2026-10-20',
    checkOut: '2026-10-24',
    nights: 4,
    roomsCount: 1,
    adults: 2,
    children: 0,
    totalEstimatedPrice: 720,
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@example.com',
    guestPhone: '+1 (555) 234-5678',
    specialRequests: 'Quiet high floor requested with sunset horizon view.',
    createdAt: 'Oct 12, 2026',
    status: 'Confirmed',
  },
  {
    bookingReference: 'SKY-2026-9430',
    roomId: 'private-pool-villa',
    roomTitle: 'Private Pool Villa',
    roomCategory: 'Villa',
    pricePerNight: 320,
    checkIn: '2026-10-25',
    checkOut: '2026-10-28',
    nights: 3,
    roomsCount: 1,
    adults: 2,
    children: 1,
    totalEstimatedPrice: 960,
    guestName: 'Julian Sterling',
    guestEmail: 'jsterling@example.com',
    guestPhone: '+1 (555) 456-7890',
    specialRequests: 'Anniversary celebration setup and late check-in.',
    createdAt: 'Oct 13, 2026',
    status: 'Pending Confirmation',
  },
  {
    bookingReference: 'SKY-2026-6104',
    roomId: 'deluxe-room',
    roomTitle: 'Deluxe Room',
    roomCategory: 'Deluxe',
    pricePerNight: 120,
    checkIn: '2026-10-15',
    checkOut: '2026-10-17',
    nights: 2,
    roomsCount: 1,
    adults: 1,
    children: 0,
    totalEstimatedPrice: 240,
    guestName: 'Marcus Wright',
    guestEmail: 'mwright@example.com',
    guestPhone: '+1 (555) 789-0123',
    specialRequests: 'Early check-in around 1:00 PM if available.',
    createdAt: 'Oct 10, 2026',
    status: 'Completed',
  },
  {
    bookingReference: 'SKY-2026-7249',
    roomId: 'family-suite',
    roomTitle: 'Family Suite',
    roomCategory: 'Suite',
    pricePerNight: 250,
    checkIn: '2026-11-01',
    checkOut: '2026-11-05',
    nights: 4,
    roomsCount: 1,
    adults: 2,
    children: 2,
    totalEstimatedPrice: 1000,
    guestName: 'Sophia Montgomery',
    guestEmail: 'smontgomery@example.com',
    guestPhone: '+1 (555) 901-2345',
    specialRequests: 'Baby crib requested in secondary bedroom.',
    createdAt: 'Oct 11, 2026',
    status: 'Confirmed',
  },
];

export const INITIAL_FACILITIES: AdminFacilityItem[] = [
  {
    id: 'swimming-pool',
    title: 'Oceanfront Infinity Pool & Cabanas',
    category: 'Aquatics & Leisure',
    description: 'Immerse yourself in our temperature-regulated oceanfront infinity pool, flanked by plush cushioned daybeds and private shaded cabanas overlooking the coastal horizon.',
    features: [
      'Heated oceanfront infinity pool',
      'Complimentary poolside towels and fruit-infused waters',
      'Private shaded cabanas available on reservation',
      'Poolside beverage and light refreshment service',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Waves',
    displayOrder: 1,
    published: true,
    actionLinkLabel: 'Explore Rooms with Views',
    actionLinkTo: '/rooms',
  },
  {
    id: 'fitness-center',
    title: '24/7 Wellness & Fitness Studio',
    category: 'Fitness & Motion',
    description: 'Stay energized with expansive panoramic views of the coastal cliffs. Features cutting-edge cardio equipment, free weights, resistance machines, and an open-air yoga terrace.',
    features: [
      'Modern treadmills, ellipticals, and stationary cycles',
      'Complete dumbbell set, kettlebells, and bench press',
      'Yoga mats, foam rollers, and stretching zone',
      'Complimentary bottled water, chilled towels, and headphones',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Dumbbell',
    displayOrder: 2,
    published: true,
    actionLinkLabel: 'Contact Concierge',
    actionLinkTo: '/contact',
  },
  {
    id: 'spa-wellness',
    title: 'Holistic Spa & Thermal Suites',
    category: 'Rejuvenation',
    description: 'Escape to a tranquil oasis offering tailored botanical massages, hydrotherapy steam chambers, organic facial therapies, and restorative relaxation verandas.',
    features: [
      'Private single and couples treatment suites',
      'Eucalyptus steam room and dry cedar sauna',
      'Signature coastal botanical oils and therapies',
      'Quiet terrace with organic herbal tea infusions',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Sparkles',
    displayOrder: 3,
    published: true,
    actionLinkLabel: 'Enquire via Concierge',
    actionLinkTo: '/contact',
  },
  {
    id: 'dining-lounge',
    title: 'Seaside Restaurant & Cocktail Lounge',
    category: 'Gastronomy',
    description: 'Experience artisanal coastal cuisine crafted with market-fresh local ingredients, complemented by a curated sommelier wine list and sunset signature cocktails.',
    features: [
      'Indoor and breezy open-air terrace dining',
      'Locally caught seafood and chef tasting menus',
      'Artisanal cocktail bar with sommelier pairings',
      'Sunset acoustic lounge evenings',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    iconName: 'UtensilsCrossed',
    displayOrder: 4,
    published: true,
    actionLinkLabel: 'View Dining & Menus',
    actionLinkTo: '/dining',
  },
  {
    id: 'event-spaces',
    title: 'Conference & Event Pavilions',
    category: 'Meetings & Celebrations',
    description: 'Host board meetings, intimate retreats, or scenic celebrations in our audio-visually equipped conference rooms and manicured ocean-facing banquet lawns.',
    features: [
      'High-definition displays and modern conference audio',
      'Flexible seating arrangements for 10 to 120 guests',
      'Bespoke catering menus and coffee breaks',
      'Outdoor sunset reception terrace',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Users',
    displayOrder: 5,
    published: true,
    actionLinkLabel: 'Event Inquiries',
    actionLinkTo: '/contact',
  },
  {
    id: 'wifi',
    title: 'High-Speed Fiber-Optic Wi-Fi',
    category: 'Connectivity',
    description: 'Stay connected effortlessly with complimentary high-speed fiber internet coverage accessible throughout all guestrooms, villas, pools, and garden pavilions.',
    features: [
      'High-speed bandwidth suitable for video conferencing & streaming',
      'Seamless property-wide roaming across suites and terraces',
      'Secure encrypted guest network access',
      'Dedicated technical support via guest services',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Wifi',
    displayOrder: 6,
    published: true,
    actionLinkLabel: 'View Guest FAQs',
    actionLinkTo: '/faqs',
  },
  {
    id: 'room-service',
    title: 'In-Room Dining & Room Service',
    category: 'Convenience',
    description: 'Enjoy thoughtfully prepared dishes and beverages delivered promptly to your room or private terrace, from breakfast spreads to late-night artisanal dining.',
    features: [
      'Digital menu ordering with live room delivery updates',
      'Full breakfast, lunch, and dinner selections',
      'Late-night artisanal snack and beverage menu',
      'Careful table or balcony tray setup by our dining team',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Clock',
    displayOrder: 7,
    published: true,
    actionLinkLabel: 'Explore Digital Menu',
    actionLinkTo: '/menu',
  },
  {
    id: 'airport-transfer',
    title: 'Airport Transfer & Chauffeured Mobility',
    category: 'Travel & Concierge',
    description: 'Begin and end your getaway in complete comfort with optional chauffeured airport transfers, on-site valet parking, and EV charging stations.',
    features: [
      'Private luxury vehicle pickup from regional airports upon advance request',
      'Complimentary on-site valet parking for hotel guests',
      'Level 2 EV vehicle charging bays on property',
      'Bespoke local sightseeing transport coordination',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Car',
    displayOrder: 8,
    published: true,
    actionLinkLabel: 'Location & Travel Details',
    actionLinkTo: '/location',
  },
];

export const INITIAL_GALLERY: AdminGalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Ocean View Suite Master Quarters',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Expansive king bed with panoramic horizon windows and bespoke Egyptian linens.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
    altText: 'Sunlit luxury suite master bedroom with king bed and ocean vistas',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'gal-2',
    title: 'Infinity Pool at Sunset',
    category: 'facilities',
    categoryLabel: 'Facilities',
    caption: 'Temperature-controlled infinity pool reflecting golden sunset skies over the sea.',
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1600&q=80',
    altText: 'Resort infinity pool overlooking coastal sunset horizon',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'gal-3',
    title: 'Seaside Pavilion Artisanal Dining',
    category: 'dining',
    categoryLabel: 'Dining',
    caption: 'Fresh coastal catch paired with fine vintage wines on our open-air dining terrace.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    altText: 'Elegantly set dinner table overlooking coastal ocean breezes',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'gal-4',
    title: 'Private Pool Villa Sun Deck',
    category: 'rooms',
    categoryLabel: 'Rooms & Suites',
    caption: 'Secluded tropical garden courtyard with a private plunge pool and cushioned cabanas.',
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80',
    altText: 'Private villa plunge pool bordered by tropical flora and teak sun deck',
    displayOrder: 4,
    published: true,
  },
  {
    id: 'gal-5',
    title: 'Sunset Coastal Cliffside Horizons',
    category: 'property',
    categoryLabel: 'Property & Surroundings',
    caption: 'Aerial panorama of the tranquil coastal headlands framing Skyview resort grounds.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    altText: 'Scenic coastline with turquoise ocean waves and pristine sandy shores',
    displayOrder: 5,
    published: true,
  },
  {
    id: 'gal-6',
    title: 'Botanical Wellness & Spa Pavilion',
    category: 'facilities',
    categoryLabel: 'Facilities',
    caption: 'Holistic massage suites equipped with essential oils and restorative sound therapy.',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80',
    altText: 'Serene spa treatment suite with aromatherapy setup and soft illumination',
    displayOrder: 6,
    published: true,
  },
  {
    id: 'gal-7',
    title: 'Chef Curated Seafood Creation',
    category: 'dining',
    categoryLabel: 'Dining',
    caption: 'Freshly prepared Atlantic salmon with saffron asparagus and reduction glaze.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80',
    altText: 'Gourmet grilled seafood dish presented with microgreens',
    displayOrder: 7,
    published: true,
  },
  {
    id: 'gal-8',
    title: 'Coastal Sunset Sailing Excursion',
    category: 'experiences',
    categoryLabel: 'Experiences',
    caption: 'Private catamaran charter along the Azure Haven coast during golden hour.',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
    altText: 'Sailboat gliding through golden sunset waters along scenic headlands',
    displayOrder: 8,
    published: true,
  },
];

export const INITIAL_EXPERIENCES: AdminExperienceItem[] = [
  {
    id: 'exp-wellness-1',
    title: 'Cliffside Sunrise Yoga & Sound Therapy',
    section: 'wellness',
    sectionLabel: 'Relaxation & Wellness',
    tag: 'Mindfulness',
    description: 'Greet the morning sea breeze with restorative guided vinyasa yoga and Tibetan singing bowl sound meditation on our panoramic ocean bluff deck.',
    highlights: ['Guided by certified mindfulness instructors', 'Complimentary mats and herbal elixirs', 'Suitable for all experience levels'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Sun',
    displayOrder: 1,
    published: true,
    ctaLabel: 'Enquire via Concierge',
    ctaLink: '/contact',
  },
  {
    id: 'exp-wellness-2',
    title: 'Thermal Hydrotherapy & Botanical Spa Circuit',
    section: 'wellness',
    sectionLabel: 'Relaxation & Wellness',
    tag: 'Spa Therapies',
    description: 'Experience thermal hot plunge pools, eucalyptus herbal steam chambers, and private relaxation cabanas designed to soothe body and spirit.',
    highlights: ['Organic regional botanical oils', 'Private indoor/outdoor thermal circuit', 'Dedicated spa lounge refreshments'],
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Sparkles',
    displayOrder: 2,
    published: true,
    ctaLabel: 'Enquire via Concierge',
    ctaLink: '/contact',
  },
  {
    id: 'exp-dining-1',
    title: 'Sunset Sommelier Wine & Coastal Tasting',
    section: 'dining',
    sectionLabel: 'Dining Experiences',
    tag: 'Gastronomy',
    description: 'Indulge in a curated flight of regional boutique wines paired with artisanal cheeses and coastal bites as dusk illuminates the horizon.',
    highlights: ['Hosted by resort master sommelier', 'Pairing with artisan regional cheeses', 'Sunset veranda seating'],
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
    iconName: 'UtensilsCrossed',
    displayOrder: 3,
    published: true,
    ctaLabel: 'Explore Dining',
    ctaLink: '/dining',
  },
  {
    id: 'exp-dining-2',
    title: 'Private Beachside Chef Table',
    section: 'dining',
    sectionLabel: 'Dining Experiences',
    tag: 'Exclusive Dining',
    description: 'An intimate five-course tasting menu crafted exclusively for your party, served beneath lanterns right along the water’s edge.',
    highlights: ['Customized multi-course tasting menu', 'Dedicated personal chef & server', 'Lantern and candlelit seaside setup'],
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    iconName: 'UtensilsCrossed',
    displayOrder: 4,
    published: true,
    ctaLabel: 'Reserve with Concierge',
    ctaLink: '/contact',
  },
  {
    id: 'exp-culture-1',
    title: 'Historic Coastal Village & Artisan Walk',
    section: 'culture',
    sectionLabel: 'Local Culture & Cuisine',
    tag: 'Cultural Heritage',
    description: 'Stroll through charming seaside cobblestone alleys, visit local ceramic workshops, and discover traditional coastal architecture and stories.',
    highlights: ['Suggested itinerary of regional artisan studios', 'Historic waterfront landmarks', 'Local craft boutique recommendations'],
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Compass',
    displayOrder: 5,
    published: true,
    ctaLabel: 'View Concierge Guide',
    ctaLink: '/location',
  },
  {
    id: 'exp-sightseeing-1',
    title: 'Coastal Headland Cliff Walk & Marine Views',
    section: 'sightseeing',
    sectionLabel: 'Nearby Sightseeing',
    tag: 'Nature Walk',
    description: 'Explore winding blufftop trails offering breathtaking vistas of offshore sea stacks, soaring coastal birds, and quiet hidden coves.',
    highlights: ['Scenic walking trail accessible from resort', 'Panoramic coastal lookout spots', 'Curated trail map provided by concierge'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Compass',
    displayOrder: 6,
    published: true,
    ctaLabel: 'Get Trail Details',
    ctaLink: '/location',
  },
];

export const INITIAL_REVIEWS: AdminReviewItem[] = [
  {
    id: 'rev-1',
    guestName: 'Sarah M.',
    location: 'San Francisco, CA',
    roomType: 'Ocean View Suite',
    stayDate: 'Recent Autumn Stay',
    rating: 5,
    title: 'An Unforgettable Coastal Horizon',
    comment: 'The panoramic ocean views from the suite balcony were breathtaking from sunrise to dusk. The room design felt exceptionally thoughtful, from the plush bed linens to the acoustic serenity. The staff greeted us with genuine warmth every time we stepped into the lobby.',
    highlights: ['Sunset balcony views', 'Acoustic comfort', 'Warm staff hospitality'],
    displayOrder: 1,
    published: true,
  },
  {
    id: 'rev-2',
    guestName: 'David & Elena R.',
    location: 'Milan, Italy',
    roomType: 'Private Pool Villa',
    stayDate: 'Anniversary Stay',
    rating: 5,
    title: 'Total Seclusion and Restorative Luxury',
    comment: 'We celebrated our tenth anniversary in the Private Pool Villa. Having our own temperature-controlled plunge pool surrounded by tropical greenery was extraordinary. The candlelit terrace dinner arranged by the concierge was the highlight of our trip.',
    highlights: ['Private plunge pool', 'Bespoke terrace dinner', 'Total privacy'],
    displayOrder: 2,
    published: true,
  },
  {
    id: 'rev-3',
    guestName: 'Marcus V.',
    location: 'London, UK',
    roomType: 'Deluxe Room',
    stayDate: 'Solo Coastal Retreat',
    rating: 5,
    title: 'Peaceful Ambiance and First-Class Amenities',
    comment: 'As a remote professional needing calm, the room’s ergonomic desk and ultra-fast Wi-Fi were top tier. Taking morning walks along the coastal bluffs followed by an espresso in the seaside pavilion made this stay restorative and seamless.',
    highlights: ['High-speed Wi-Fi', 'Ergonomic workspace', 'Morning seaside dining'],
    displayOrder: 3,
    published: true,
  },
  {
    id: 'rev-4',
    guestName: 'Helena & Julian T.',
    location: 'Zurich, Switzerland',
    roomType: 'Family Suite',
    stayDate: 'Family Vacation',
    rating: 5,
    title: 'Effortless Family Comfort and Spacious Design',
    comment: 'Traveling with two young children is rarely restful, but the Family Suite made everything effortless. The dual bathrooms eliminated morning delays, and the children loved the starlight lawn cinema evening while we enjoyed wine on the veranda.',
    highlights: ['Dual bathrooms', 'Spacious central living room', 'Family lawn cinema'],
    displayOrder: 4,
    published: true,
  },
  {
    id: 'rev-5',
    guestName: 'Chloe S.',
    location: 'New York, NY',
    roomType: 'Ocean View Suite',
    stayDate: 'Weekend Getaway',
    rating: 5,
    title: 'Every Detail Handled With Precision',
    comment: 'From the smooth digital check-in to the aromatic botanical spa ritual, Skyview exceeded our expectations. The dinner at the seaside restaurant was fresh, vibrant, and paired with stellar local wines. We cannot wait to return.',
    highlights: ['Botanical wellness spa', 'Digital dining service', 'Master sommelier wine pairing'],
    displayOrder: 5,
    published: true,
  },
];

export const INITIAL_FAQS: AdminFAQItem[] = [
  {
    id: 'faq-1',
    category: 'checkin',
    categoryLabel: 'Check-in & Arrival',
    question: 'What are the standard check-in and check-out times?',
    answer: 'Standard guest check-in begins at 3:00 PM, and check-out is at 11:00 AM. Early arrivals and late departures are accommodated whenever availability permits; please contact our front desk ahead of time to coordinate your arrival timing.',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'faq-2',
    category: 'checkin',
    categoryLabel: 'Check-in & Arrival',
    question: 'Can I request an early check-in or late check-out?',
    answer: 'Early check-in and extended check-out may be requested through our concierge or during your booking process. While subject to room availability, our team will gladly hold your luggage and grant access to resort pools and dining areas while your suite is readied.',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'faq-4',
    category: 'reservations',
    categoryLabel: 'Reservations & Policies',
    question: 'How do I modify or cancel a room reservation?',
    answer: 'Reservations made directly through our website can be managed by contacting our concierge desk with your booking reference. Illustrative policies typically permit cancellation up to 48 hours prior to scheduled arrival without penalty (final terms must be verified prior to actual booking confirmation).',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'faq-5',
    category: 'reservations',
    categoryLabel: 'Reservations & Policies',
    question: 'Are sample portfolio rates and room bookings live?',
    answer: 'Please note that this website is a portfolio presentation. All room rates, sample booking confirmations, and lookup tools are frontend demonstrations. No real credit card transactions or live room holds occur.',
    displayOrder: 4,
    published: true,
  },
  {
    id: 'faq-6',
    category: 'family',
    categoryLabel: 'Family Stays',
    question: 'Is Skyview Hotels & Resorts family-friendly?',
    answer: 'Yes, families are warmly welcomed. Our Family Suites feature dual bathrooms, separate sleeping quarters, and optional baby cribs or rollaway beds. We also offer child-friendly dining menus and family activities such as starlight lawn screenings.',
    displayOrder: 5,
    published: true,
  },
  {
    id: 'faq-8',
    category: 'dining',
    categoryLabel: 'Dining & Room Service',
    question: 'What are the operating hours for the restaurant and bar?',
    answer: 'Sample dining schedules are: Breakfast from 7:00 AM – 10:30 AM; Lunch from 12:00 PM – 2:30 PM; Dinner from 6:00 PM – 10:00 PM. The Seaside Bar & Sunset Lounge serves cocktails and light refreshments until 11:30 PM. Operating hours are illustrative and subject to seasonal confirmation.',
    displayOrder: 6,
    published: true,
  },
  {
    id: 'faq-11',
    category: 'facilities',
    categoryLabel: 'Facilities & Wi-Fi',
    question: 'What are the swimming pool and fitness studio hours?',
    answer: 'The oceanfront infinity pool is open daily from 7:00 AM until 9:00 PM. Our wellness fitness studio is accessible 24 hours a day with room keycard access for registered guests.',
    displayOrder: 7,
    published: true,
  },
  {
    id: 'faq-12',
    category: 'facilities',
    categoryLabel: 'Facilities & Wi-Fi',
    question: 'Is high-speed Wi-Fi complimentary throughout the resort?',
    answer: 'Yes, complimentary high-speed fiber-optic Wi-Fi is available across all guest suites, private villas, dining pavilions, pool terraces, and landscaped courtyards.',
    displayOrder: 8,
    published: true,
  },
];

export const INITIAL_ENQUIRIES: AdminEnquiryItem[] = [
  {
    id: 'enq-101',
    fullName: 'Caroline Henderson',
    email: 'c.henderson@example.com',
    phone: '+1 (555) 321-7654',
    subject: 'Suite Reservations & Availability',
    message: 'Hello, we are planning a 5-night stay in late November and would love to confirm if interconnected suites are available for our family party. Thank you!',
    createdAt: 'Oct 12, 2026, 02:45 PM',
    status: 'New',
  },
  {
    id: 'enq-102',
    fullName: 'Liam Kensington',
    email: 'liam.k@example.com',
    phone: '+1 (555) 654-9870',
    subject: 'Dining & Private Events',
    message: 'Inquiring about hosting an intimate sunset dinner party on the pavilion terrace for 12 guests next month. Do you offer set tasting menus?',
    createdAt: 'Oct 11, 2026, 11:20 AM',
    status: 'Read',
  },
  {
    id: 'enq-103',
    fullName: 'Victoria Chen',
    email: 'vchen@example.com',
    subject: 'Concierge & Experiences',
    message: 'Could you please advise if airport transfer can be scheduled for arrival at 11:30 PM, and whether luggage assistance is available upon arrival?',
    createdAt: 'Oct 10, 2026, 04:10 PM',
    status: 'In Progress',
  },
];

export const INITIAL_WEBSITE_CONTENT: WebsiteContent = {
  heroEyebrow: 'LUXURY STAYS. UNFORGETTABLE JOURNEYS.',
  heroHeading: 'Your Perfect Getaway Awaits.',
  heroDescription: 'Discover exceptional comfort, thoughtful hospitality, and memorable experiences at Skyview Hotels & Resorts.',
  heroButtonRoomsLabel: 'Explore Available Rooms',
  heroButtonMenuLabel: 'Browse Restaurant & Menu',
  promoEyebrow: 'MAKE YOUR NEXT STAY SPECIAL',
  promoHeading: 'Your Next Escape Starts Here',
  promoDescription: 'Explore our curated suites and discover an oceanfront retreat designed around sublime comfort and relaxation.',
  promoButtonLabel: 'Explore Available Rooms',
  aboutIntroHeading: 'A Sanctuary of Coastal Serenity and Thoughtful Luxury',
  aboutIntroText: 'Welcome to Skyview Hotels & Resorts — where the rhythmic calm of coastal horizons meets authentic warmth, refined comfort, and moments designed to linger in memory.',
  aboutStoryP1: 'Skyview Hotels & Resorts was conceived as a coastal refuge where modern sophistication seamlessly blends with nature\'s tranquility. Positioned along picturesque bluffs, the property draws continuous inspiration from the shifting tides, coastal breezes, and panoramic sunsets that frame our grounds.',
  aboutStoryP2: 'Our hospitality philosophy centers on unobtrusive elegance and genuine human warmth. We believe that true luxury is neither hurried nor pretentious — it is found in the stillness of a morning espresso on a sunlit terrace, the tailored comfort of an acoustic-insulated suite, and the intuitive attentiveness of a host who remembers your personal preferences.',
  missionTitle: 'Crafting Restorative Stays With Meaningful Attention',
  missionDescription: 'To provide guests with an exceptional hospitality experience rooted in attentive care, serene architectural design, and pristine coastal comfort. We are committed to making every stay effortless, memorable, and revitalizing for travelers from near and far.',
  visionTitle: 'The Preeminent Benchmark in Mindful Coastal Hospitality',
  visionDescription: 'To become a globally recognized haven where thoughtful architecture, environmental stewardship, and warm personalized service converge into lifelong memories.',
};

export const INITIAL_SETTINGS: HotelSettings = {
  hotelName: 'Skyview Hotels & Resorts',
  logoUrl: '',
  contactEmail: 'reservations@skyviewhotels.com',
  contactPhone: '+1 (800) 555-7598',
  address: '124 Scenic Coastal Boulevard, Azure Haven, CA 90210',
  receptionHours: '24/7 Front Desk & Dedicated Concierge',
  currencySymbol: 'ETB',
  defaultCheckInTime: '3:00 PM',
  defaultCheckOutTime: '11:00 AM',
  copyrightText: '© 2026 Skyview Hotels & Resorts. All rights reserved.',
};

// --- STORAGE HELPER ---

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed !== null && parsed !== undefined) {
      if ((key === 'skyview_admin_settings' || key === 'skyview_hotel_settings') && (parsed.currencySymbol === '$' || !parsed.currencySymbol)) {
        parsed.currencySymbol = 'ETB';
      }
      return parsed;
    }
    return fallback;
  } catch (e) {
    console.warn(`Failed to parse ${key} from localStorage, using fallback:`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.warn(`Failed to write ${key} to localStorage:`, e);
  }
}

// Storage keys
const STORAGE_KEYS = {
  ROOMS: 'skyview_admin_rooms',
  BOOKINGS: 'skyview_demo_bookings',
  MENU: 'skyview_admin_menu',
  FACILITIES: 'skyview_admin_facilities',
  GALLERY: 'skyview_admin_gallery',
  EXPERIENCES: 'skyview_admin_experiences',
  REVIEWS: 'skyview_admin_reviews',
  FAQS: 'skyview_admin_faqs',
  ENQUIRIES: 'skyview_admin_enquiries',
  CONTENT: 'skyview_admin_content',
  SETTINGS: 'skyview_admin_settings',
};

// --- CONTEXT INTERFACE ---

interface HotelStoreContextType {
  // Rooms
  rooms: AdminRoomItem[];
  addRoom: (room: Omit<AdminRoomItem, 'id'> & { id?: string }) => void;
  updateRoom: (id: string, updates: Partial<AdminRoomItem>) => void;
  deleteRoom: (id: string) => void;
  togglePublishRoom: (id: string) => void;
  toggleActiveRoom: (id: string) => void;

  // Bookings
  bookings: AdminBookingRecord[];
  addBooking: (booking: AdminBookingRecord) => void;
  updateBooking: (reference: string, updates: Partial<AdminBookingRecord>) => void;
  updateBookingStatus: (reference: string, status: BookingStatus) => void;
  deleteBooking: (reference: string) => void;

  // Menu items
  menuItems: AdminMenuItem[];
  addMenuItem: (item: Omit<AdminMenuItem, 'id'> & { id?: string }) => void;
  updateMenuItem: (id: string, updates: Partial<AdminMenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  togglePublishMenuItem: (id: string) => void;
  toggleFeaturedMenuItem: (id: string) => void;

  // Facilities
  facilities: AdminFacilityItem[];
  addFacility: (facility: Omit<AdminFacilityItem, 'id'> & { id?: string }) => void;
  updateFacility: (id: string, updates: Partial<AdminFacilityItem>) => void;
  deleteFacility: (id: string) => void;
  togglePublishFacility: (id: string) => void;

  // Gallery
  gallery: AdminGalleryItem[];
  addGalleryItem: (item: Omit<AdminGalleryItem, 'id'> & { id?: string }) => void;
  updateGalleryItem: (id: string, updates: Partial<AdminGalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  togglePublishGalleryItem: (id: string) => void;

  // Experiences
  experiences: AdminExperienceItem[];
  addExperience: (exp: Omit<AdminExperienceItem, 'id'> & { id?: string }) => void;
  updateExperience: (id: string, updates: Partial<AdminExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  togglePublishExperience: (id: string) => void;

  // Reviews
  reviews: AdminReviewItem[];
  addReview: (review: Omit<AdminReviewItem, 'id'> & { id?: string }) => void;
  updateReview: (id: string, updates: Partial<AdminReviewItem>) => void;
  deleteReview: (id: string) => void;
  togglePublishReview: (id: string) => void;

  // FAQs
  faqs: AdminFAQItem[];
  addFAQ: (faq: Omit<AdminFAQItem, 'id'> & { id?: string }) => void;
  updateFAQ: (id: string, updates: Partial<AdminFAQItem>) => void;
  deleteFAQ: (id: string) => void;
  togglePublishFAQ: (id: string) => void;

  // Enquiries
  enquiries: AdminEnquiryItem[];
  addEnquiry: (enquiry: Omit<AdminEnquiryItem, 'id' | 'createdAt' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  deleteEnquiry: (id: string) => void;

  // Content & Settings
  content: WebsiteContent;
  updateContent: (updates: Partial<WebsiteContent>) => void;
  settings: HotelSettings;
  updateSettings: (updates: Partial<HotelSettings>) => void;

  // Reset all
  resetAllDemoData: () => void;
}

const HotelStoreContext = createContext<HotelStoreContextType | null>(null);

export const HotelStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Rooms State
  const [rooms, setRooms] = useState<AdminRoomItem[]>(() =>
    loadFromStorage<AdminRoomItem[]>(STORAGE_KEYS.ROOMS, INITIAL_ROOMS)
  );

  // 2. Bookings State (reusing 'skyview_demo_bookings' storage key)
  const [bookings, setBookings] = useState<AdminBookingRecord[]>(() =>
    loadFromStorage<AdminBookingRecord[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS)
  );

  // 3. Menu Items State
  const [menuItems, setMenuItems] = useState<AdminMenuItem[]>(() =>
    loadFromStorage<AdminMenuItem[]>(STORAGE_KEYS.MENU, INITIAL_MENU_ITEMS)
  );

  // 4. Facilities State
  const [facilities, setFacilities] = useState<AdminFacilityItem[]>(() =>
    loadFromStorage<AdminFacilityItem[]>(STORAGE_KEYS.FACILITIES, INITIAL_FACILITIES)
  );

  // 5. Gallery State
  const [gallery, setGallery] = useState<AdminGalleryItem[]>(() =>
    loadFromStorage<AdminGalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY)
  );

  // 6. Experiences State
  const [experiences, setExperiences] = useState<AdminExperienceItem[]>(() =>
    loadFromStorage<AdminExperienceItem[]>(STORAGE_KEYS.EXPERIENCES, INITIAL_EXPERIENCES)
  );

  // 7. Reviews State
  const [reviews, setReviews] = useState<AdminReviewItem[]>(() =>
    loadFromStorage<AdminReviewItem[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS)
  );

  // 8. FAQs State
  const [faqs, setFaqs] = useState<AdminFAQItem[]>(() =>
    loadFromStorage<AdminFAQItem[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS)
  );

  // 9. Enquiries State
  const [enquiries, setEnquiries] = useState<AdminEnquiryItem[]>(() =>
    loadFromStorage<AdminEnquiryItem[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES)
  );

  // 10. Website Content State
  const [content, setContent] = useState<WebsiteContent>(() =>
    loadFromStorage<WebsiteContent>(STORAGE_KEYS.CONTENT, INITIAL_WEBSITE_CONTENT)
  );

  // 11. Hotel Settings State
  const [settings, setSettings] = useState<HotelSettings>(() =>
    loadFromStorage<HotelSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS)
  );

  // Persist handlers on change
  useEffect(() => { saveToStorage(STORAGE_KEYS.ROOMS, rooms); }, [rooms]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.BOOKINGS, bookings); }, [bookings]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.MENU, menuItems); }, [menuItems]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.FACILITIES, facilities); }, [facilities]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.GALLERY, gallery); }, [gallery]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.EXPERIENCES, experiences); }, [experiences]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.REVIEWS, reviews); }, [reviews]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.FAQS, faqs); }, [faqs]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.ENQUIRIES, enquiries); }, [enquiries]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.CONTENT, content); }, [content]);
  useEffect(() => { saveToStorage(STORAGE_KEYS.SETTINGS, settings); }, [settings]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.newValue) return;
      try {
        const val = JSON.parse(e.newValue);
        if (e.key === STORAGE_KEYS.ROOMS) setRooms(val);
        if (e.key === STORAGE_KEYS.BOOKINGS) setBookings(val);
        if (e.key === STORAGE_KEYS.MENU) setMenuItems(val);
        if (e.key === STORAGE_KEYS.FACILITIES) setFacilities(val);
        if (e.key === STORAGE_KEYS.GALLERY) setGallery(val);
        if (e.key === STORAGE_KEYS.EXPERIENCES) setExperiences(val);
        if (e.key === STORAGE_KEYS.REVIEWS) setReviews(val);
        if (e.key === STORAGE_KEYS.FAQS) setFaqs(val);
        if (e.key === STORAGE_KEYS.ENQUIRIES) setEnquiries(val);
        if (e.key === STORAGE_KEYS.CONTENT) setContent(val);
        if (e.key === STORAGE_KEYS.SETTINGS) setSettings(val);
      } catch {
        // ignore parse errors
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // --- ACTIONS: ROOMS ---
  const addRoom = useCallback((roomData: Omit<AdminRoomItem, 'id'> & { id?: string }) => {
    const newId = roomData.id?.trim() || `room-${Date.now()}`;
    const newRoom: AdminRoomItem = {
      ...roomData,
      id: newId,
      published: roomData.published ?? true,
      active: roomData.active ?? true,
    };
    setRooms((prev) => [newRoom, ...prev]);
  }, []);

  const updateRoom = useCallback((id: string, updates: Partial<AdminRoomItem>) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  }, []);

  const deleteRoom = useCallback((id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const togglePublishRoom = useCallback((id: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, published: !r.published } : r))
    );
  }, []);

  const toggleActiveRoom = useCallback((id: string) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  }, []);

  // --- ACTIONS: BOOKINGS ---
  const addBooking = useCallback((booking: AdminBookingRecord) => {
    setBookings((prev) => [booking, ...prev]);
  }, []);

  const updateBooking = useCallback((reference: string, updates: Partial<AdminBookingRecord>) => {
    setBookings((prev) =>
      prev.map((b) => (b.bookingReference === reference ? { ...b, ...updates } : b))
    );
  }, []);

  const updateBookingStatus = useCallback((reference: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.bookingReference === reference ? { ...b, status } : b))
    );
  }, []);

  const deleteBooking = useCallback((reference: string) => {
    setBookings((prev) => prev.filter((b) => b.bookingReference !== reference));
  }, []);

  // --- ACTIONS: MENU ---
  const addMenuItem = useCallback((itemData: Omit<AdminMenuItem, 'id'> & { id?: string }) => {
    const newId = itemData.id?.trim() || `menu-${Date.now()}`;
    const newItem: AdminMenuItem = {
      ...itemData,
      id: newId,
      published: itemData.published ?? true,
    };
    setMenuItems((prev) => [newItem, ...prev]);
  }, []);

  const updateMenuItem = useCallback((id: string, updates: Partial<AdminMenuItem>) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  }, []);

  const deleteMenuItem = useCallback((id: string) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const togglePublishMenuItem = useCallback((id: string) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, published: !m.published } : m))
    );
  }, []);

  const toggleFeaturedMenuItem = useCallback((id: string) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, featured: !m.featured } : m))
    );
  }, []);

  // --- ACTIONS: FACILITIES ---
  const addFacility = useCallback((facilityData: Omit<AdminFacilityItem, 'id'> & { id?: string }) => {
    const newId = facilityData.id?.trim() || `fac-${Date.now()}`;
    const newFac: AdminFacilityItem = {
      ...facilityData,
      id: newId,
      published: facilityData.published ?? true,
    };
    setFacilities((prev) => [...prev, newFac]);
  }, []);

  const updateFacility = useCallback((id: string, updates: Partial<AdminFacilityItem>) => {
    setFacilities((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  }, []);

  const deleteFacility = useCallback((id: string) => {
    setFacilities((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const togglePublishFacility = useCallback((id: string) => {
    setFacilities((prev) =>
      prev.map((f) => (f.id === id ? { ...f, published: !f.published } : f))
    );
  }, []);

  // --- ACTIONS: GALLERY ---
  const addGalleryItem = useCallback((itemData: Omit<AdminGalleryItem, 'id'> & { id?: string }) => {
    const newId = itemData.id?.trim() || `gal-${Date.now()}`;
    const newItem: AdminGalleryItem = {
      ...itemData,
      id: newId,
      published: itemData.published ?? true,
    };
    setGallery((prev) => [...prev, newItem]);
  }, []);

  const updateGalleryItem = useCallback((id: string, updates: Partial<AdminGalleryItem>) => {
    setGallery((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
    );
  }, []);

  const deleteGalleryItem = useCallback((id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const togglePublishGalleryItem = useCallback((id: string) => {
    setGallery((prev) =>
      prev.map((g) => (g.id === id ? { ...g, published: !g.published } : g))
    );
  }, []);

  // --- ACTIONS: EXPERIENCES ---
  const addExperience = useCallback((expData: Omit<AdminExperienceItem, 'id'> & { id?: string }) => {
    const newId = expData.id?.trim() || `exp-${Date.now()}`;
    const newExp: AdminExperienceItem = {
      ...expData,
      id: newId,
      published: expData.published ?? true,
    };
    setExperiences((prev) => [...prev, newExp]);
  }, []);

  const updateExperience = useCallback((id: string, updates: Partial<AdminExperienceItem>) => {
    setExperiences((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  }, []);

  const deleteExperience = useCallback((id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const togglePublishExperience = useCallback((id: string) => {
    setExperiences((prev) =>
      prev.map((e) => (e.id === id ? { ...e, published: !e.published } : e))
    );
  }, []);

  // --- ACTIONS: REVIEWS ---
  const addReview = useCallback((reviewData: Omit<AdminReviewItem, 'id'> & { id?: string }) => {
    const newId = reviewData.id?.trim() || `rev-${Date.now()}`;
    const newRev: AdminReviewItem = {
      ...reviewData,
      id: newId,
      published: reviewData.published ?? true,
    };
    setReviews((prev) => [newRev, ...prev]);
  }, []);

  const updateReview = useCallback((id: string, updates: Partial<AdminReviewItem>) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  }, []);

  const deleteReview = useCallback((id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const togglePublishReview = useCallback((id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, published: !r.published } : r))
    );
  }, []);

  // --- ACTIONS: FAQS ---
  const addFAQ = useCallback((faqData: Omit<AdminFAQItem, 'id'> & { id?: string }) => {
    const newId = faqData.id?.trim() || `faq-${Date.now()}`;
    const newFaq: AdminFAQItem = {
      ...faqData,
      id: newId,
      published: faqData.published ?? true,
    };
    setFaqs((prev) => [...prev, newFaq]);
  }, []);

  const updateFAQ = useCallback((id: string, updates: Partial<AdminFAQItem>) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  }, []);

  const deleteFAQ = useCallback((id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const togglePublishFAQ = useCallback((id: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, published: !f.published } : f))
    );
  }, []);

  // --- ACTIONS: ENQUIRIES ---
  const addEnquiry = useCallback((enquiryData: Omit<AdminEnquiryItem, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: AdminEnquiryItem = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'New',
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
  }, []);

  const updateEnquiryStatus = useCallback((id: string, status: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  }, []);

  const deleteEnquiry = useCallback((id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // --- ACTIONS: CONTENT & SETTINGS ---
  const updateContent = useCallback((updates: Partial<WebsiteContent>) => {
    setContent((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateSettings = useCallback((updates: Partial<HotelSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  // --- RESET ALL DATA ---
  const resetAllDemoData = useCallback(() => {
    setRooms(INITIAL_ROOMS);
    setBookings(INITIAL_BOOKINGS);
    setMenuItems(INITIAL_MENU_ITEMS);
    setFacilities(INITIAL_FACILITIES);
    setGallery(INITIAL_GALLERY);
    setExperiences(INITIAL_EXPERIENCES);
    setReviews(INITIAL_REVIEWS);
    setFaqs(INITIAL_FAQS);
    setEnquiries(INITIAL_ENQUIRIES);
    setContent(INITIAL_WEBSITE_CONTENT);
    setSettings(INITIAL_SETTINGS);

    saveToStorage(STORAGE_KEYS.ROOMS, INITIAL_ROOMS);
    saveToStorage(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
    saveToStorage(STORAGE_KEYS.MENU, INITIAL_MENU_ITEMS);
    saveToStorage(STORAGE_KEYS.FACILITIES, INITIAL_FACILITIES);
    saveToStorage(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
    saveToStorage(STORAGE_KEYS.EXPERIENCES, INITIAL_EXPERIENCES);
    saveToStorage(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    saveToStorage(STORAGE_KEYS.FAQS, INITIAL_FAQS);
    saveToStorage(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
    saveToStorage(STORAGE_KEYS.CONTENT, INITIAL_WEBSITE_CONTENT);
    saveToStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }, []);

  const contextValue = useMemo<HotelStoreContextType>(() => ({
    rooms,
    addRoom,
    updateRoom,
    deleteRoom,
    togglePublishRoom,
    toggleActiveRoom,

    bookings,
    addBooking,
    updateBooking,
    updateBookingStatus,
    deleteBooking,

    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    togglePublishMenuItem,
    toggleFeaturedMenuItem,

    facilities,
    addFacility,
    updateFacility,
    deleteFacility,
    togglePublishFacility,

    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    togglePublishGalleryItem,

    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    togglePublishExperience,

    reviews,
    addReview,
    updateReview,
    deleteReview,
    togglePublishReview,

    faqs,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    togglePublishFAQ,

    enquiries,
    addEnquiry,
    updateEnquiryStatus,
    deleteEnquiry,

    content,
    updateContent,
    settings,
    updateSettings,

    resetAllDemoData,
  }), [
    rooms, addRoom, updateRoom, deleteRoom, togglePublishRoom, toggleActiveRoom,
    bookings, addBooking, updateBooking, updateBookingStatus, deleteBooking,
    menuItems, addMenuItem, updateMenuItem, deleteMenuItem, togglePublishMenuItem, toggleFeaturedMenuItem,
    facilities, addFacility, updateFacility, deleteFacility, togglePublishFacility,
    gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, togglePublishGalleryItem,
    experiences, addExperience, updateExperience, deleteExperience, togglePublishExperience,
    reviews, addReview, updateReview, deleteReview, togglePublishReview,
    faqs, addFAQ, updateFAQ, deleteFAQ, togglePublishFAQ,
    enquiries, addEnquiry, updateEnquiryStatus, deleteEnquiry,
    content, updateContent,
    settings, updateSettings,
    resetAllDemoData,
  ]);

  return (
    <HotelStoreContext.Provider value={contextValue}>
      {children}
    </HotelStoreContext.Provider>
  );
};

export const useHotelStore = (): HotelStoreContextType => {
  const ctx = useContext(HotelStoreContext);
  if (!ctx) {
    throw new Error('useHotelStore must be used within a HotelStoreProvider');
  }
  return ctx;
};
