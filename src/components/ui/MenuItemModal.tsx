import React, { useEffect, useState } from 'react';
import {
  X,
  Sparkles,
  AlertCircle,
  Plus,
  Minus,
  MapPin,
  BedDouble,
  Utensils,
} from 'lucide-react';
import type { MenuItem } from '../../data/menuData';

export interface MenuItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  quantity?: number;
  onIncreaseQuantity?: (item: MenuItem) => void;
  onDecreaseQuantity?: (item: MenuItem) => void;
  serviceType?: 'room' | 'table' | null;
  onSelectServiceType?: (type: 'room' | 'table') => void;
  locationNumber?: string;
  onLocationNumberChange?: (val: string) => void;
  onPlaceOrder?: (
    item: MenuItem,
    quantity: number,
    serviceType: 'room' | 'table',
    locationNumber: string
  ) => void;
  validationError?: string;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  isOpen,
  onClose,
  serviceType = null,
  onSelectServiceType,
  locationNumber = '',
  onLocationNumberChange,
  onPlaceOrder,
  validationError = '',
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [localError, setLocalError] = useState<string>('');

  // Reset local error and initialize quantity to 1 when modal opens or item changes
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setLocalError('');
    }
  }, [isOpen, item]);

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

  // Active quantity and line total for this item
  const lineTotal = item.price * quantity;

  const handlePlaceOrderClick = () => {
    // 1. Validate quantity is at least 1
    if (quantity <= 0) {
      setLocalError('Please select a quantity of at least 1 before placing your order.');
      return;
    }

    // 2. Validate service location
    if (!serviceType) {
      setLocalError('Please choose whether you want Room Service or Table Service.');
      return;
    }

    if (!locationNumber || !locationNumber.trim()) {
      setLocalError(
        serviceType === 'room'
          ? 'Please enter your room or suite number to proceed.'
          : 'Please enter your dining table or cabana number to proceed.'
      );
      return;
    }

    setLocalError('');
    if (onPlaceOrder) {
      onPlaceOrder(item, quantity, serviceType, locationNumber.trim());
    }
  };

  const activeError = localError || validationError;

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
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-gray-100 shrink-0">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

          {/* Category & Price Pill */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              {item.categoryLabel}
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-normal text-[#DFCA9B]">
              ETB {item.price}
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
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                {item.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#EAF2FF] text-[#062B45] px-2.5 py-0.5 rounded-full border border-[#D8E0EA]"
                  >
                    <Sparkles className="w-3 h-3 text-[#C7A66B]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Full Detailed Description */}
            <p className="text-xs sm:text-sm text-[#18324A] leading-relaxed">
              {item.fullDescription || item.description}
            </p>
          </div>

          {/* 1. QUANTITY SELECTOR (When ordering is active) */}
          {onPlaceOrder && (
            <div className="p-4 rounded-xl bg-gray-50 border border-[#D8E0EA] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#062B45] block">
                  Item Quantity
                </span>
                <span className="text-[11px] text-[#60758B]">
                  ETB {item.price} each • Subtotal:{' '}
                  <strong className="text-[#062B45] font-semibold">ETB {lineTotal}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg bg-white border border-[#D8E0EA] text-[#062B45] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors cursor-pointer shadow-2xs"
                  title="Decrease quantity"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-sm font-bold text-[#062B45]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-[#062B45] text-white flex items-center justify-center hover:bg-[#0A3D60] transition-colors cursor-pointer shadow-2xs"
                  title="Increase quantity"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C7A66B]" />
                </button>
              </div>
            </div>
          )}

          {/* 2. SERVICE LOCATION REQUIREMENT (When ordering is active) */}
          {onPlaceOrder && (
            <div className="p-4 rounded-xl bg-[#EAF2FF]/30 border border-[#D8E0EA] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#062B45] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C7A66B]" />
                  <span>Service Destination</span>
                  <span className="text-red-500 font-bold">*</span>
                </span>
                <span className="text-[10px] text-[#60758B]">Select where to serve</span>
              </div>

              {/* Room Service vs Table Service Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setLocalError('');
                    if (onSelectServiceType) onSelectServiceType('room');
                  }}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    serviceType === 'room'
                      ? 'bg-white border-[#062B45] text-[#062B45] ring-2 ring-[#062B45]/20 shadow-xs'
                      : 'bg-white/80 border-[#D8E0EA] text-[#60758B] hover:border-[#062B45]/50'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg mt-0.5 ${serviceType === 'room' ? 'bg-[#062B45] text-white' : 'bg-[#EAF2FF] text-[#062B45]'}`}>
                    <BedDouble className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className={`text-xs block ${serviceType === 'room' ? 'text-[#062B45]' : 'text-[#18324A]'}`}>
                      Room Service
                    </strong>
                    <span className="text-[11px] text-[#60758B] block leading-tight">
                      Delivered to your suite
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLocalError('');
                    if (onSelectServiceType) onSelectServiceType('table');
                  }}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    serviceType === 'table'
                      ? 'bg-white border-[#062B45] text-[#062B45] ring-2 ring-[#062B45]/20 shadow-xs'
                      : 'bg-white/80 border-[#D8E0EA] text-[#60758B] hover:border-[#062B45]/50'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg mt-0.5 ${serviceType === 'table' ? 'bg-[#062B45] text-white' : 'bg-[#EAF2FF] text-[#062B45]'}`}>
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className={`text-xs block ${serviceType === 'table' ? 'text-[#062B45]' : 'text-[#18324A]'}`}>
                      Table Service
                    </strong>
                    <span className="text-[11px] text-[#60758B] block leading-tight">
                      Served at your dining table
                    </span>
                  </div>
                </button>
              </div>

              {/* Conditionally rendered Room Number field */}
              {serviceType === 'room' && (
                <div className="pt-2 animate-fadeIn">
                  <label
                    htmlFor="modal-room-input"
                    className="block text-[11px] font-bold uppercase tracking-wider text-[#062B45] mb-1"
                  >
                    Room or Suite Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-room-input"
                    type="text"
                    placeholder="e.g. Room 204, Ocean Suite 301, Villa 4"
                    value={locationNumber}
                    onChange={(e) => {
                      setLocalError('');
                      if (onLocationNumberChange) onLocationNumberChange(e.target.value);
                    }}
                    className="w-full bg-white border border-[#D8E0EA] rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium text-[#18324A] placeholder:text-[#60758B]/60 outline-none focus:border-[#062B45] transition-all"
                  />
                </div>
              )}

              {/* Conditionally rendered Table Number field */}
              {serviceType === 'table' && (
                <div className="pt-2 animate-fadeIn">
                  <label
                    htmlFor="modal-table-input"
                    className="block text-[11px] font-bold uppercase tracking-wider text-[#062B45] mb-1"
                  >
                    Table or Cabana Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-table-input"
                    type="text"
                    placeholder="e.g. Table 12, Seaside Terrace 4, Cabana 2"
                    value={locationNumber}
                    onChange={(e) => {
                      setLocalError('');
                      if (onLocationNumberChange) onLocationNumberChange(e.target.value);
                    }}
                    className="w-full bg-white border border-[#D8E0EA] rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium text-[#18324A] placeholder:text-[#60758B]/60 outline-none focus:border-[#062B45] transition-all"
                  />
                </div>
              )}

              {/* Inline validation error display */}
              {activeError && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{activeError}</span>
                </div>
              )}
            </div>
          )}

          {/* Allergen & Kitchen Note */}
          <div className="p-3.5 rounded-xl bg-gray-50 border border-[#D8E0EA] flex items-start gap-2.5 text-xs text-[#60758B]">
            <AlertCircle className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
            <span className="leading-snug">
              {item.allergens && item.allergens.length > 0
                ? `Contains: ${item.allergens.join(', ')}. `
                : 'No common allergens flagged. '}
              Prepared fresh to order by the Skyview culinary team.
            </span>
          </div>

          {/* 3. PLACE ORDER ACTION */}
          <div className="flex items-center justify-between pt-4 border-t border-[#D8E0EA] gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-[#D8E0EA] text-[#60758B] hover:text-[#062B45] hover:bg-gray-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              {onPlaceOrder ? 'Cancel' : 'Close Details'}
            </button>

            {onPlaceOrder && (
              <button
                type="button"
                onClick={handlePlaceOrderClick}
                className="bg-[#062B45] hover:bg-[#0A3D60] active:bg-[#041D2F] text-white text-xs font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
              >
                <Sparkles className="w-4 h-4 text-[#C7A66B]" />
                <span>Place Order</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
