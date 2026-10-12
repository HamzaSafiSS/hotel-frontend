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

// Initial foundations for future sample data (Rooms, Amenities, Experiences)
export interface RoomFoundation {
  id: string;
  title: string;
  tagline: string;
  category: string;
  guests: number;
  bedType: string;
  pricePerNight: number;
  imageUrl: string;
  featured?: boolean;
}

export const SAMPLE_ROOM_FOUNDATIONS: RoomFoundation[] = [
  {
    id: 'deluxe-room',
    title: 'Deluxe Room',
    tagline: 'Panoramic views and contemporary sophistication',
    category: 'Deluxe',
    guests: 2,
    bedType: '1 King Bed',
    pricePerNight: 120,
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'ocean-view-suite',
    title: 'Ocean View Suite',
    tagline: 'Direct sunset horizons with private balcony lounge',
    category: 'Suite',
    guests: 3,
    bedType: '1 King Bed',
    pricePerNight: 180,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'private-pool-villa',
    title: 'Private Pool Villa',
    tagline: 'Secluded tropical sanctuary with infinity plunge pool',
    category: 'Villa',
    guests: 4,
    bedType: '2 King Beds',
    pricePerNight: 320,
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'family-suite',
    title: 'Family Suite',
    tagline: 'Expansive interconnected quarters crafted for family comfort',
    category: 'Suite',
    guests: 5,
    bedType: '2 King Beds',
    pricePerNight: 250,
    imageUrl: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
];
