import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, ArrowRight, Construction } from 'lucide-react';
import { ContentContainer } from './ContentContainer';
import { SectionHeading } from './SectionHeading';
import { Button } from './Button';

export interface PagePlaceholderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  description?: string;
  upcomingPhase?: string;
  suggestedLinks?: { label: string; path: string }[];
}

export const PagePlaceholder: React.FC<PagePlaceholderProps> = ({
  title,
  subtitle = 'Skyview Hotels & Resorts Portfolio Experience',
  eyebrow = 'Phase 1 Foundation',
  description = 'This page has been structured and routed in Phase 1. Complete interactive content, curated visual showcases, and detailed functional modules will be developed in an upcoming phase.',
  upcomingPhase = 'Upcoming Phase',
  suggestedLinks = [
    { label: 'Explore Rooms', path: '/rooms' },
    { label: 'Facilities & Amenities', path: '/facilities' },
    { label: 'Guest Experiences', path: '/experiences' },
    { label: 'Contact Us', path: '/contact' },
  ],
}) => {
  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-[#EAF2FF]/40 to-white flex-1 flex flex-col justify-center">
      <ContentContainer size="lg">
        <div className="bg-white border border-[#D8E0EA] rounded-2xl p-8 sm:p-12 shadow-xs text-center relative overflow-hidden">
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

          {/* Phase Badge */}
          <div className="max-w-md mx-auto mb-10 p-4 rounded-xl bg-gray-50 border border-[#D8E0EA] flex items-center justify-center gap-3 text-xs text-[#60758B]">
            <Construction className="w-4 h-4 text-[#C7A66B] shrink-0" />
            <span>
              Scheduled for development in <strong className="text-[#062B45]">{upcomingPhase}</strong>.
            </span>
          </div>

          {/* Action and Navigation Shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-[#D8E0EA]">
            <Button to="/" variant="secondary" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
              Return Home
            </Button>
            <Button to="/booking" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              Book a Room
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
