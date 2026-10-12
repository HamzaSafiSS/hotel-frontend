import React from 'react';
import { Users, Bed, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface RoomCardProps {
  id?: string;
  title: string;
  category?: string;
  description?: string;
  guests: number | string;
  bedType: string;
  pricePerNight: number;
  imageUrl: string;
  detailsUrl?: string;
  className?: string;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  title,
  category,
  description,
  guests,
  bedType,
  pricePerNight,
  imageUrl,
  detailsUrl = '/rooms',
  className = '',
}) => {
  return (
    <article
      className={`group flex flex-col bg-white border border-[#D8E0EA] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full ${className}`}
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
          <span className="absolute top-3 left-3 bg-[#062B45]/85 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded shadow-xs">
            {category}
          </span>
        )}
      </div>

      {/* Room Details */}
      <div className="flex flex-col flex-1 p-5 justify-between">
        <div>
          <Link to={detailsUrl} className="group-hover:text-[#C7A66B] transition-colors">
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
        </div>

        {/* Pricing & View Details Action */}
        <div className="flex items-center justify-between pt-4 mt-5 border-t border-[#D8E0EA]">
          <div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-[#18324A] font-sans">
                ${pricePerNight}
              </span>
              <span className="text-xs text-[#60758B] ml-1">/ night</span>
            </div>
            <span className="text-[10px] text-[#60758B]/70 block">Sample portfolio rate</span>
          </div>

          <Link
            to={detailsUrl}
            aria-label={`View Details for ${title}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] transition-colors py-1.5 px-3 rounded-md hover:bg-[#EAF2FF]/50 group/link"
          >
            <span>View Details</span>
            <div className="w-7 h-7 rounded-full bg-[#EAF2FF] group-hover/link:bg-[#062B45] group-hover/link:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};
