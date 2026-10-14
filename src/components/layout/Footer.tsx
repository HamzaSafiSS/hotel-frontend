import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { FOOTER_COLUMNS, HOTEL_CONTACT } from '../../data/siteData';
import { FooterLink } from '../ui/FooterLink';
import { useHotelStore } from '../../store/hotelStore';

export const Footer: React.FC = () => {
  const { settings } = useHotelStore();

  const hotelName = settings?.hotelName || 'Skyview Hotels & Resorts';
  const address = settings?.address || HOTEL_CONTACT.address;
  const phone = settings?.contactPhone || HOTEL_CONTACT.phone;
  const email = settings?.contactEmail || HOTEL_CONTACT.email;
  const receptionHours = settings?.receptionHours || HOTEL_CONTACT.receptionHours;
  const copyrightText = settings?.copyrightText || '© 2026 Skyview Hotels & Resorts. All rights reserved.';

  return (
    <footer className="bg-[#062B45] text-white pt-16 pb-8 border-t border-[#0A3D60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand & Overview Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-12 border-b border-white/10 gap-6">
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B] rounded-md"
            aria-label={`${hotelName} Home`}
          >
            <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 text-[#C7A66B] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 3L2 19h20L12 3zm0 4.2L18.1 17H5.9L12 7.2z" />
                <path d="M12 11.5l3.5 5.5H8.5l3.5-5.5z" opacity="0.8" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                Skyview
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C7A66B] font-semibold mt-0.5 block">
                Hotels & Resorts
              </span>
            </div>
          </Link>

          {/* Social Media Placeholders */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#DFCA9B] font-medium mr-2 hidden sm:inline-block">
              Follow Our Journey
            </span>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C7A66B] hover:border-[#C7A66B] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C7A66B] hover:border-[#C7A66B] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* X */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C7A66B] hover:border-[#C7A66B] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C7A66B] hover:border-[#C7A66B] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#C7A66B] hover:border-[#C7A66B] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.97 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Multi-column Navigation and Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12">
          {/* Columns 1-4: Company, Rooms, Dining, Guest Support */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col">
              <h3 className="font-serif text-base font-semibold tracking-wide text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66B]" />
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <FooterLink to={link.path}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Contact Information */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <h3 className="font-serif text-base font-semibold tracking-wide text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66B]" />
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
                <span className="leading-snug">{address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
                <span className="leading-snug">{phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
                <span className="leading-snug">{email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
                <span className="leading-snug">{receptionHours}</span>
              </li>
            </ul>

            {/* Direct Booking Assurance badge */}
            <div className="mt-4 p-2.5 rounded bg-white/5 border border-white/10 flex items-start gap-2 text-[11px] text-gray-300 leading-tight">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C7A66B] shrink-0 mt-0.5" />
              <span>Official Hotel Website • Best Rates Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Privacy & Terms */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>{copyrightText}</p>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/privacy"
              className="hover:text-[#C7A66B] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A66B]"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to="/terms"
              className="hover:text-[#C7A66B] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A66B]"
            >
              Terms & Conditions
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              to="/admin"
              className="hover:text-[#C7A66B] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A66B] flex items-center gap-1.5 text-gray-300 hover:text-white"
            >
              <Lock className="w-3 h-3 text-[#C7A66B]" />
              <span>Admin Console</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
