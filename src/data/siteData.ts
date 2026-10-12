export interface NavItem {
  label: string;
  path: string;
}

export interface FooterLinkItem {
  label: string;
  path: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

export interface HotelContactInfo {
  address: string;
  phone: string;
  email: string;
  receptionHours: string;
  disclaimer: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Facilities', path: '/facilities' },
  { label: 'Dining', path: '/dining' },
  { label: 'Experiences', path: '/experiences' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Experiences', path: '/experiences' },
      { label: 'Gallery', path: '/gallery' },
    ],
  },
  {
    title: 'Rooms',
    links: [
      { label: 'Rooms & Suites', path: '/rooms' },
      { label: 'Facilities & Amenities', path: '/facilities' },
      { label: 'Book a Room', path: '/booking' },
    ],
  },
  {
    title: 'Dining',
    links: [
      { label: 'Restaurant', path: '/dining' },
      { label: 'Digital Menu', path: '/menu' },
    ],
  },
  {
    title: 'Guest Support',
    links: [
      { label: 'FAQs', path: '/faqs' },
      { label: 'Location & Directions', path: '/location' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
];

export const HOTEL_CONTACT: HotelContactInfo = {
  address: '[Hotel Address] 124 Scenic Coastal Boulevard, Azure Haven, CA 90210',
  phone: '[Hotel Phone Number] +1 (800) 555-SKYVIEW / +1 (800) 555-7598',
  email: '[Hotel Email Address] reservations@skyviewhotels.com',
  receptionHours: '[Reception Hours] 24/7 Front Desk & Dedicated Concierge',
  disclaimer: 'Note: These contact details are sample placeholders for portfolio demonstration purposes and do not represent verified real-world operational contacts.',
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
  { name: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' },
  { name: 'X', url: 'https://x.com', icon: 'Twitter' },
  { name: 'YouTube', url: 'https://youtube.com', icon: 'Youtube' },
  { name: 'Pinterest', url: 'https://pinterest.com', icon: 'Share2' },
];

// Room foundations and catalog
export interface RoomItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  guests: number;
  bedType: string;
  pricePerNight: number;
  imageUrl: string;
  featured?: boolean;
}

export const SAMPLE_ROOMS: RoomItem[] = [
  {
    id: 'deluxe-room',
    title: 'Deluxe Room',
    category: 'Deluxe',
    tagline: 'Refined comfort with scenic garden and courtyard views',
    description: 'A comfortable and elegant room with premium bedding, a workspace, and modern amenities.',
    guests: 2,
    bedType: '1 King Bed',
    pricePerNight: 120,
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'ocean-view-suite',
    title: 'Ocean View Suite',
    category: 'Suite',
    tagline: 'Panoramic sunset horizons with a private sun-drenched balcony',
    description: 'A spacious suite featuring scenic views, a comfortable sitting area, and a private balcony.',
    guests: 3,
    bedType: '1 King Bed',
    pricePerNight: 180,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'private-pool-villa',
    title: 'Private Pool Villa',
    category: 'Villa',
    tagline: 'Secluded tropical sanctuary with a private outdoor plunge pool',
    description: 'A private retreat with an outdoor plunge pool, a relaxing lounge, and generous living space.',
    guests: 4,
    bedType: '2 Beds',
    pricePerNight: 320,
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'family-suite',
    title: 'Family Suite',
    category: 'Suite',
    tagline: 'Expansive interconnected quarters designed for family harmony',
    description: 'A spacious family-friendly suite with flexible sleeping arrangements and a comfortable sitting area.',
    guests: 5,
    bedType: '2 Beds',
    pricePerNight: 250,
    imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
];

// Compatibility alias
export type RoomFoundation = RoomItem;
export const SAMPLE_ROOM_FOUNDATIONS = SAMPLE_ROOMS;

// Hotel Highlights strip
export interface HotelHighlight {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const HOTEL_HIGHLIGHTS: HotelHighlight[] = [
  {
    id: 'rooms',
    title: 'Luxury Rooms & Suites',
    description: 'Elegant spaces for every traveler.',
    iconName: 'Bed',
  },
  {
    id: 'amenities',
    title: 'World-Class Amenities',
    description: 'Pool, spa, fitness, and more.',
    iconName: 'Sparkles',
  },
  {
    id: 'dining',
    title: 'Exceptional Dining',
    description: 'Memorable meals and refreshing drinks.',
    iconName: 'UtensilsCrossed',
  },
  {
    id: 'location',
    title: 'Prime Location',
    description: 'Convenient access to local attractions.',
    iconName: 'MapPin',
  },
  {
    id: 'service',
    title: 'Guest Comfort & Care',
    description: 'Thoughtful service throughout your stay.',
    iconName: 'ShieldCheck',
  },
];

// Facilities & Amenities
export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const HOTEL_FACILITIES: FacilityItem[] = [
  {
    id: 'pool',
    title: 'Swimming Pool',
    description: 'Heated infinity pool overlooking the ocean with private shaded cabanas.',
    iconName: 'Waves',
  },
  {
    id: 'spa',
    title: 'Spa & Wellness',
    description: 'Full-service revitalizing therapies, steam rooms, and botanical treatments.',
    iconName: 'Sparkles',
  },
  {
    id: 'fitness',
    title: 'Fitness Center',
    description: '24/7 studio equipped with modern cardio machines, free weights, and yoga mats.',
    iconName: 'Dumbbell',
  },
  {
    id: 'dining',
    title: 'Restaurant & Bar',
    description: 'Artisanal seaside dining paired with signature craft cocktails and fine wines.',
    iconName: 'Utensils',
  },
  {
    id: 'wifi',
    title: 'Complimentary Wi-Fi',
    description: 'High-speed fiber internet coverage across all suites, terraces, and resort grounds.',
    iconName: 'Wifi',
  },
  {
    id: 'parking',
    title: 'Parking',
    description: 'Complimentary valet parking and secure on-site vehicle charging bays.',
    iconName: 'Car',
  },
  {
    id: 'room-service',
    title: 'Room Service',
    description: 'Freshly prepared meals and late-night snacks delivered promptly to your room.',
    iconName: 'Clock',
  },
  {
    id: 'events',
    title: 'Meeting & Event Spaces',
    description: 'Elegant boardrooms and scenic banquet lawns suited for weddings and retreats.',
    iconName: 'Users',
  },
];

// Experiences
export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  tag: string;
}

export const HOTEL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'spa-wellness',
    title: 'Spa & Wellness',
    subtitle: 'Relax. Rejuvenate. Restore.',
    description: 'Indulge in holistic massages, thermal plunge pools, and sound-bath wellness sessions.',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=700&q=80',
    tag: 'Wellness',
  },
  {
    id: 'culinary-journey',
    title: 'Culinary Experiences',
    subtitle: 'Taste the world in style.',
    description: 'Private chef tastings, coastal wine pairings, and hands-on regional cooking masterclasses.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80',
    tag: 'Gastronomy',
  },
  {
    id: 'adventure-tours',
    title: 'Local Adventures',
    subtitle: 'Explore scenic horizons.',
    description: 'Sunset sailing charters, guided coastal cliff hikes, and marine snorkeling excursions.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
    tag: 'Adventures',
  },
  {
    id: 'local-culture',
    title: 'Cultural Discoveries',
    subtitle: 'Feel the vibrant culture.',
    description: 'Historic landmark tours, traditional music evenings, and local artisan village excursions.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80',
    tag: 'Culture',
  },
];

// Why Choose Us
export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const WHY_CHOOSE_US_BENEFITS: BenefitItem[] = [
  {
    id: 'hospitality',
    title: 'Attentive Hospitality',
    description: 'Our personalized concierge and host team cater to your every request with discreet precision.',
    iconName: 'Award',
  },
  {
    id: 'accommodations',
    title: 'Comfortable Accommodations',
    description: 'Generously proportioned suites built with organic linens, acoustic serenity, and ocean breezes.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'amenities',
    title: 'Thoughtful Amenities',
    description: 'Every amenity from poolside mixology to private balconies has been designed for sheer unwinding.',
    iconName: 'CheckCircle2',
  },
  {
    id: 'service',
    title: 'Guest-Focused Service',
    description: '24/7 dedicated reception and personalized itineraries that guarantee a seamless, restful stay.',
    iconName: 'HeartHandshake',
  },
];

// Guest Testimonials
export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatarUrl: string;
}

export const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    location: 'United States',
    rating: 5,
    comment:
      'Skyview Hotel gave us the most beautiful vacation experience! The staff was amazing, the views were breathtaking, and everything was simply perfect.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 'david-rossi',
    name: 'David & Elena Rossi',
    location: 'Italy',
    rating: 5,
    comment:
      'From our private villa plunge pool to the serene wellness spa, every minute was pure relaxation. The attention to detail and atmosphere made our anniversary stay truly unforgettable.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    location: 'United Kingdom',
    rating: 5,
    comment:
      'Superb location, peaceful ambiance, and five-star hospitality throughout. The rooms are spacious, impeccably clean, and the restaurant dining is top notch.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
  },
];

