import React from 'react';
import { Sparkles, Eye, Plus } from 'lucide-react';
import type { MenuItem } from '../../data/menuData';

export interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  quantity?: number;
  onIncreaseQuantity?: (item: MenuItem) => void;
  onDecreaseQuantity?: (item: MenuItem) => void;
  onAddToTray?: (item: MenuItem) => void; // backwards compat
  isInTray?: boolean; // backwards compat
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onSelect,
}) => {

  return (
    <div
      onClick={() => onSelect(item)}
      className="group bg-white rounded-2xl border border-[#D8E0EA] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer focus-within:ring-2 focus-within:ring-[#C7A66B]"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
      aria-label={`View details for ${item.name}`}
    >
      {/* Food Photograph Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#062B45] px-2.5 py-1 rounded-md shadow-2xs">
            {item.categoryLabel}
          </span>
        </div>

        {/* Price Tag Pill */}
        <div className="absolute bottom-3 right-3">
          <span className="font-serif text-lg font-bold text-white drop-shadow-md bg-[#062B45]/85 backdrop-blur-xs px-2.5 py-0.5 rounded-lg border border-white/20">
            ${item.price}
          </span>
        </div>

        {/* Hover View Hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#062B45] text-xs font-semibold shadow-md">
            <Eye className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span>View Dish Details</span>
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Item Name */}
          <h3 className="font-serif text-lg font-medium text-[#062B45] group-hover:text-[#C7A66B] transition-colors leading-snug mb-1.5">
            {item.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#60758B] leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
        </div>

        {/* Bottom Metadata & Actions */}
        <div className="pt-3 border-t border-[#D8E0EA]/70 flex items-center justify-between gap-2 mt-auto">
          {/* Dietary Badge */}
          <div className="flex items-center gap-1 overflow-hidden">
            {item.dietary && item.dietary.length > 0 ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#062B45] bg-[#EAF2FF] px-2 py-0.5 rounded-md truncate">
                <Sparkles className="w-2.5 h-2.5 text-[#C7A66B]" />
                <span className="truncate">{item.dietary[0]}</span>
              </span>
            ) : (
              <span className="text-[10px] text-[#60758B]">Skyview Kitchen</span>
            )}
          </div>

          {/* Card Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              className="inline-flex items-center gap-1.5 bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-medium py-1.5 px-3 rounded-lg transition-colors shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C7A66B]"
              aria-label={`Select ${item.name}`}
            >
              <Plus className="w-3.5 h-3.5 text-[#C7A66B]" />
              <span>Select</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
              className="text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] transition-colors py-1 px-2 rounded hover:bg-[#EAF2FF]/50"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
