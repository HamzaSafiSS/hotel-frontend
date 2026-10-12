import React, { useEffect } from 'react';
import { X, Sparkles, AlertCircle, Plus, Check } from 'lucide-react';
import type { MenuItem } from '../../data/menuData';

export interface MenuItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToTray?: (item: MenuItem) => void;
  isInTray?: boolean;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToTray,
  isInTray = false,
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#041D2F]/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D8E0EA] flex flex-col relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category & Price Pill */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              {item.categoryLabel}
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-normal text-[#DFCA9B]">
              ${item.price}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          <div>
            <h3 id="modal-item-title" className="font-serif text-2xl sm:text-3xl font-medium text-[#062B45] mb-2">
              {item.name}
            </h3>

            {/* Dietary Tags */}
            {item.dietary && item.dietary.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                {item.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#EAF2FF] text-[#062B45] px-2.5 py-1 rounded-full border border-[#D8E0EA]"
                  >
                    <Sparkles className="w-3 h-3 text-[#C7A66B]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Full Detailed Description */}
            <p className="text-sm sm:text-base text-[#18324A] leading-relaxed">
              {item.fullDescription || item.description}
            </p>
          </div>

          {/* Allergens & Preparation Notice */}
          <div className="p-4 rounded-xl bg-gray-50 border border-[#D8E0EA] flex items-start gap-3 text-xs text-[#60758B]">
            <AlertCircle className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#062B45] block mb-0.5">Allergen & Preparation Note</strong>
              <span>
                {item.allergens && item.allergens.length > 0
                  ? `Contains: ${item.allergens.join(', ')}. `
                  : 'No common allergens flagged in this preparation. '}
                Please inform our dining staff of any severe allergies or specific dietary requests.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#D8E0EA] gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-[#D8E0EA] text-[#60758B] hover:text-[#062B45] hover:bg-gray-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              Close Details
            </button>

            {onAddToTray && (
              <button
                type="button"
                onClick={() => {
                  onAddToTray(item);
                }}
                className="bg-[#062B45] hover:bg-[#0A3D60] active:bg-[#041D2F] text-white text-xs font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
              >
                {isInTray ? (
                  <>
                    <Check className="w-4 h-4 text-[#C7A66B]" />
                    <span>In Your Selection (Add More)</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-[#C7A66B]" />
                    <span>Add to Order Selection (${item.price})</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
