import React from 'react';
import { Users, Bed, Maximize2, ArrowRight, CalendarCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface RoomCardProps {
  id?: string;
  title: string;
  category?: string;
  description?: string;
  guests: number | string;
  bedType: string;
  size?: string;
  keyAmenities?: string[];
  pricePerNight: number;
  imageUrl: string;
  detailsUrl?: string;
  bookUrl?: string;
  className?: string;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  id,
  title,
  category,
  description,
  guests,
  bedType,
  size,
  keyAmenities = [],
  pricePerNight,
  imageUrl,
  detailsUrl,
  bookUrl,
  className = '',
}) => {
  const resolvedDetailsUrl = detailsUrl || (id ? `/rooms/${id}` : '/rooms');
  const resolvedBookUrl = bookUrl || (id ? `/booking?roomId=${id}` : '/booking');

  return (
    <article
      className={`group flex flex-col bg-white border border-[#D8E0EA] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full ${className}`}
    >
      {/* Room Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
        <Link to={resolvedDetailsUrl} tabIndex={-1} aria-hidden="true">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        {category && (
          <span className="absolute top-3 left-3 bg-[#062B45]/85 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded shadow-xs">
            {category}
          </span>
        )}
      </div>

      {/* Room Details */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          <Link to={resolvedDetailsUrl} className="group-hover:text-[#C7A66B] transition-colors">
            <h3 className="font-serif text-xl font-medium text-[#062B45] leading-snug">
              {title}
            </h3>
          </Link>

          {/* Description */}
          {description && (
            <p className="mt-2 text-xs text-[#60758B] leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          {/* Room Specifications: Guests, Bed Type, Room Size */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3.5 text-xs text-[#60758B]">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#C7A66B]" />
              <span>{typeof guests === 'number' ? `${guests} Guests` : guests}</span>
            </div>
            <span className="text-[#D8E0EA]">•</span>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#C7A66B]" />
              <span>{bedType}</span>
            </div>
            {size && (
              <>
                <span className="text-[#D8E0EA]">•</span>
                <div className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C7A66B]" />
                  <span>{size}</span>
                </div>
              </>
            )}
          </div>

          {/* Key Amenities Badges (2-3 items) */}
          {keyAmenities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#D8E0EA]/60">
              {keyAmenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-[#EAF2FF]/50 border border-[#D8E0EA]/70 text-[11px] text-[#062B45] font-medium"
                >
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Double Action: View Details + Book This Room */}
        <div className="pt-4 mt-5 border-t border-[#D8E0EA]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-[#18324A] font-sans">
                  ETB {pricePerNight}
                </span>
                <span className="text-xs text-[#60758B] ml-1">/ night</span>
              </div>
              <span className="text-[10px] text-[#60758B]/70 block">Best available rate</span>
            </div>

            <Link
              to={resolvedDetailsUrl}
              className="text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] inline-flex items-center gap-1 transition-colors group/view"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/view:translate-x-1" />
            </Link>
          </div>

          <Link
            to={resolvedBookUrl}
            className="w-full bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-medium py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-xs hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span>Book This Room</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
