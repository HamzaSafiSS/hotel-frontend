import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  X,
  ChevronRight,
  Sparkles,
  RotateCcw,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { MenuItemCard } from '../components/ui/MenuItemCard';
import { MenuItemModal } from '../components/ui/MenuItemModal';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import type { MenuItem } from '../data/menuData';

interface TrayItem {
  item: MenuItem;
  quantity: number;
}

export const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected Category State (prefilled from URL query if present)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => searchParams.get('category') || 'all'
  );

  // Search Query State
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Item for Details Modal
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Optional Curated Dining Selection / Tasting Tray State
  const [trayItems, setTrayItems] = useState<TrayItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(false);
  const [orderSentMessage, setOrderSentMessage] = useState<boolean>(false);

  // Synchronize category state when searchParams changes
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [searchParams]);

  // Handle category pill click
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('category');
      setSearchParams(nextParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  // Clear all filters (search + category)
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('category');
    setSearchParams(nextParams);
  };

  // Add / Increment Item in Dining Selection
  const handleAddToTray = (item: MenuItem) => {
    setTrayItems((prev) => {
      const existing = prev.find((t) => t.item.id === item.id);
      if (existing) {
        return prev.map((t) =>
          t.item.id === item.id ? { ...t, quantity: t.quantity + 1 } : t
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  // Decrement or Remove Item
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setTrayItems((prev) =>
      prev
        .map((t) => {
          if (t.item.id === itemId) {
            const nextQty = t.quantity + delta;
            return nextQty > 0 ? { ...t, quantity: nextQty } : null;
          }
          return t;
        })
        .filter((t): t is TrayItem => t !== null)
    );
  };

  // Remove Item Completely
  const handleRemoveItem = (itemId: string) => {
    setTrayItems((prev) => prev.filter((t) => t.item.id !== itemId));
  };

  // Filter items based on active category & search query
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MENU_ITEMS.filter((item) => {
      // 1. Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Search query match in name or description
      if (query) {
        const inName = item.name.toLowerCase().includes(query);
        const inDesc = item.description.toLowerCase().includes(query);
        const inCat = item.categoryLabel.toLowerCase().includes(query);
        const inDiet = item.dietary?.some((d) => d.toLowerCase().includes(query)) || false;
        if (!inName && !inDesc && !inCat && !inDiet) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Tray calculations
  const totalTrayCount = useMemo(() => {
    return trayItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [trayItems]);

  const totalTrayPrice = useMemo(() => {
    return trayItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  }, [trayItems]);

  // Set of item IDs currently in the tray for quick lookup
  const trayItemIds = useMemo(() => {
    return new Set(trayItems.map((t) => t.item.id));
  }, [trayItems]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 3.A COMPACT REFINED PAGE HEADER */}
      <section className="relative bg-[#062B45] text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80"
            alt="Skyview Digital Menu Culinary Selection"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041D2F] via-[#062B45]/90 to-[#041D2F]/80" />
        </div>

        <ContentContainer size="7xl" className="relative z-10">
          {/* Breadcrumb Bar */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-300 mb-4">
            <Link to="/" className="hover:text-[#DFCA9B] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
            <Link to="/dining" className="hover:text-[#DFCA9B] transition-colors">
              Dining
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span className="text-white font-medium">Digital Menu</span>
          </nav>

          {/* Eyebrow */}
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-2">
            FRESH FLAVORS, THOUGHTFULLY PREPARED
          </span>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight mb-3">
            Explore Our Menu
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-200 max-w-2xl font-light leading-relaxed">
            Browse our selection of dishes, local specialties, desserts, and refreshing beverages.
          </p>
        </ContentContainer>
      </section>

      {/* 3.B & 3.C CATEGORY NAVIGATION & SEARCH CONTROLS */}
      <section className="sticky top-16 sm:top-20 z-20 bg-white/95 backdrop-blur-md border-b border-[#D8E0EA] py-4 shadow-xs">
        <ContentContainer size="7xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* 3.B Menu Category Tabs / Pills (Scrollable on Mobile) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {MENU_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B] ${
                      isActive
                        ? 'bg-[#062B45] text-white shadow-xs'
                        : 'bg-gray-100 hover:bg-[#EAF2FF] text-[#18324A]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* 3.C Menu Search Input & Tray Trigger */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-[#60758B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search dishes, drinks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#EAF2FF]/30 border border-[#D8E0EA] rounded-lg pl-9 pr-8 py-2 text-xs font-medium text-[#18324A] placeholder:text-[#60758B]/60 outline-none focus:border-[#062B45] focus:bg-white transition-all"
                  aria-label="Search menu items"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#60758B] hover:text-[#062B45] cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Curated Dining Tray Button */}
              {totalTrayCount > 0 && (
                <button
                  type="button"
                  onClick={() => setIsTrayOpen(true)}
                  className="bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-medium px-3.5 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0 animate-fadeIn"
                  title="View your dining selection"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C7A66B]" />
                  <span>Selection ({totalTrayCount})</span>
                </button>
              )}
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* 3.D MENU ITEMS GRID */}
      <section className="py-10 sm:py-16 bg-[#EAF2FF]/15 flex-1">
        <ContentContainer size="7xl">
          {/* Active Filter Status & Count */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#D8E0EA]/70">
            <div>
              <h2 className="text-sm font-semibold text-[#062B45]">
                {selectedCategory === 'all'
                  ? 'All Menu Selections'
                  : MENU_CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'Selections'}{' '}
                <span className="text-xs font-normal text-[#60758B]">
                  ({filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'})
                </span>
              </h2>
              {searchQuery && (
                <p className="text-xs text-[#60758B] mt-0.5">
                  Showing results matching: <strong className="text-[#062B45]">"{searchQuery}"</strong>
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {(selectedCategory !== 'all' || searchQuery) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-medium text-[#60758B] hover:text-[#062B45] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#60758B] bg-white border border-[#D8E0EA] px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-[#C7A66B]" />
                <span>Prepared Fresh to Order</span>
              </span>
            </div>
          </div>

          {/* Menu Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onSelect={(selected) => setSelectedItem(selected)}
                  onAddToTray={handleAddToTray}
                  isInTray={trayItemIds.has(item.id)}
                />
              ))}
            </div>
          ) : (
            /* Friendly Empty State */
            <div className="text-center py-16 px-4 bg-white border border-dashed border-[#D8E0EA] rounded-2xl max-w-md mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-[#EAF2FF] text-[#062B45] flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-[#C7A66B]" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#062B45] mb-2">
                No Dishes Match Your Search
              </h3>
              <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed mb-6">
                We couldn't find any dishes matching "{searchQuery}". Try searching for another ingredient, or clear your filters to view the full culinary selection.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>View Full Menu</span>
              </button>
            </div>
          )}
        </ContentContainer>
      </section>

      {/* 3.F MENU ITEM DETAILS MODAL */}
      <MenuItemModal
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        onAddToTray={handleAddToTray}
        isInTray={selectedItem ? trayItemIds.has(selectedItem.id) : false}
      />

      {/* 3.G LIGHTWEIGHT CURATED DINING SELECTION DRAWER */}
      {isTrayOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tray-drawer-title"
          className="fixed inset-0 z-50 flex justify-end bg-[#041D2F]/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setIsTrayOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-[#D8E0EA] animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#D8E0EA] flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C7A66B]" />
                <h3 id="tray-drawer-title" className="font-serif text-lg font-medium text-[#062B45]">
                  Curated Dining Selection
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTrayOpen(false)}
                aria-label="Close dining selection"
                className="w-8 h-8 rounded-full hover:bg-gray-200 text-[#60758B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {trayItems.length > 0 ? (
                trayItems.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-[#D8E0EA] bg-white flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover object-center shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#062B45] truncate">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-[#60758B] block">
                        ${item.price} each • {item.categoryLabel}
                      </span>
                      <strong className="text-xs text-[#062B45]">
                        ${item.price * quantity}
                      </strong>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-[#062B45] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold w-5 text-center text-[#18324A]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-[#062B45] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                        title="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="w-6 h-6 rounded hover:bg-red-50 text-red-600 flex items-center justify-center transition-colors cursor-pointer ml-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-[#60758B] text-xs">
                  <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <span>No items added to your selection yet.</span>
                </div>
              )}
            </div>

            {/* Drawer Footer & Subtotal */}
            {trayItems.length > 0 && (
              <div className="p-5 border-t border-[#D8E0EA] bg-gray-50 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-[#60758B]">
                  <span>Total Items</span>
                  <span>{totalTrayCount}</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-[#062B45]">
                  <span>Estimated Total</span>
                  <span className="text-xl font-serif text-[#062B45]">${totalTrayPrice}</span>
                </div>

                <div className="p-3 rounded-lg bg-[#EAF2FF] border border-[#D8E0EA] text-[11px] text-[#18324A] leading-relaxed">
                  <p className="font-medium text-[#062B45] mb-0.5">How to order:</p>
                  <span>
                    Present this selection directly to your restaurant server or call in-room dining from your suite at extension <strong>104</strong>.
                  </span>
                </div>

                {orderSentMessage ? (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Selection registered for in-room dining service.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderSentMessage(true)}
                      className="flex-1 bg-[#062B45] hover:bg-[#0A3D60] active:bg-[#041D2F] text-white text-xs font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C7A66B]" />
                      <span>Confirm Table Selection</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTrayItems([]);
                        setOrderSentMessage(false);
                      }}
                      className="p-3 rounded-xl border border-[#D8E0EA] text-[#60758B] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Clear all items"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
