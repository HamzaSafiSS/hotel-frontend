import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, ArrowRight, Phone, Mail } from 'lucide-react';
import { ContentContainer } from './ContentContainer';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';
import { HOTEL_CONTACT } from '../../data/siteData';

export interface PagePlaceholderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  description?: string;
  upcomingPhase?: string; // Kept for backwards compatibility
  suggestedLinks?: { label: string; path: string }[];
}

export const PagePlaceholder: React.FC<PagePlaceholderProps> = ({
  title,
  subtitle = 'SKYVIEW HOTELS & RESORTS',
  eyebrow = 'LUXURY HOSPITALITY',
  description = 'Experience the serenity and refined coastal luxury of Skyview Hotels & Resorts. For immediate accommodations or bespoke itineraries, our concierge is at your service.',
  suggestedLinks = [
    { label: 'Rooms & Suites', path: '/rooms' },
    { label: 'Reserve Your Stay', path: '/booking' },
    { label: 'Guest Experiences', path: '/experiences' },
    { label: 'Dining & Menus', path: '/menu' },
  ],
}) => {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-[#EAF2FF]/40 to-white flex-1 flex flex-col justify-center">
      <ContentContainer size="lg">
        <div className="bg-white border border-[#D8E0EA] rounded-2xl p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
          {/* Subtle decorative background pattern */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#EAF2FF] rounded-full blur-2xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#C7A66B]/10 rounded-full blur-2xl opacity-60 pointer-events-none" />

          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF2FF] border border-[#D8E0EA] text-xs font-semibold uppercase tracking-wider text-[#062B45] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span>{eyebrow}</span>
          </div>

          {/* Heading */}
          <SectionHeading
            align="center"
            title={title}
            eyebrow={subtitle}
            description={description}
            className="mb-8"
          />

          {/* Concierge Contact Badge */}
          <div className="max-w-md mx-auto mb-10 p-4 rounded-xl bg-gray-50 border border-[#D8E0EA] flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#60758B]">
            <div className="flex items-center gap-1.5 text-[#062B45] font-medium">
              <Phone className="w-3.5 h-3.5 text-[#C7A66B]" />
              <span>{HOTEL_CONTACT.phone}</span>
            </div>
            <span className="hidden sm:inline text-gray-300">•</span>
            <div className="flex items-center gap-1.5 text-[#062B45] font-medium">
              <Mail className="w-3.5 h-3.5 text-[#C7A66B]" />
              <span>{HOTEL_CONTACT.email}</span>
            </div>
          </div>

          {/* Action and Navigation Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[#D8E0EA]">
            <Button to="/" variant="secondary" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
              Return Home
            </Button>
            <Button to="/rooms" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              Explore Rooms & Suites
            </Button>
          </div>

          {/* Quick Route Links */}
          {suggestedLinks && suggestedLinks.length > 0 && (
            <div className="mt-8 pt-6 border-t border-dashed border-[#D8E0EA]/80">
              <span className="text-xs uppercase tracking-widest text-[#60758B] block mb-3 font-medium">
                Quick Navigation
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
                {suggestedLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-3 py-1.5 rounded-md bg-[#EAF2FF]/50 text-[#062B45] hover:bg-[#062B45] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </ContentContainer>
    </div>
  );
};
