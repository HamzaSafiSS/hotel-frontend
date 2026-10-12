import React from 'react';
import { Users, Bed, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface RoomCardProps {
  id?: string;
  title: string;
  category?: string;
  guests: number | string;
  bedType: string;
  pricePerNight: number;
  imageUrl: string;
  bookingUrl?: string;
  className?: string;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  title,
  category,
  guests,
  bedType,
  pricePerNight,
  imageUrl,
  bookingUrl = '/booking',
  className = '',
}) => {
  return (
    <article
      className={`group flex flex-col bg-white border border-[#D8E0EA] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Room Image Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {category && (
          <span className="absolute top-3 left-3 bg-[#062B45]/85 backdrop-blur-xs text-white text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded">
            {category}
          </span>
        )}
      </div>

      {/* Room Details */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-lg font-medium text-[#062B45] group-hover:text-[#C7A66B] transition-colors">
          {title}
        </h3>

        {/* Room Specifications */}
        <div className="flex items-center gap-4 mt-3 text-xs text-[#60758B]">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span>{typeof guests === 'number' ? `${guests} Guests` : guests}</span>
          </div>
          <span className="text-[#D8E0EA]">•</span>
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span>{bedType}</span>
          </div>
        </div>

        {/* Pricing & Booking Action */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#D8E0EA]">
          <div>
            <span className="text-lg font-bold text-[#18324A] font-sans">
              ${pricePerNight}
            </span>
            <span className="text-xs text-[#60758B] ml-1">/ night</span>
          </div>

          <Link
            to={bookingUrl}
            aria-label={`Book ${title}`}
            className="w-9 h-9 rounded-full bg-[#EAF2FF] text-[#062B45] flex items-center justify-center hover:bg-[#062B45] hover:text-white transition-all duration-200 group-hover:bg-[#062B45] group-hover:text-white focus-visible:ring-2 focus-visible:ring-[#C7A66B] focus-visible:outline-none"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
