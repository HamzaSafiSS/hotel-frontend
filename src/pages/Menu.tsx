import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  X,
  ChevronRight,
  Sparkles,
  RotateCcw,
  ShoppingBag,
  CheckCircle,
  BedDouble,
  Utensils,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { MenuItemCard } from '../components/ui/MenuItemCard';
import { MenuItemModal } from '../components/ui/MenuItemModal';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import type { MenuItem } from '../data/menuData';

export interface PlacedOrderItem {
  item: MenuItem;
  quantity: number;
}

export interface PlacedOrderRecord {
  orderReference: string;
  items: PlacedOrderItem[];
  totalPrice: number;
  totalQuantity: number;
  serviceType: 'room' | 'table';
  serviceTypeLabel: string;
  locationNumber: string;
  placedAt: string;
  status: string;
}

export const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected Category State (prefilled from URL query if present)
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => searchParams.get('category') || 'all'
  );

  // Search Query State
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Item for Order Form Modal
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // List of all Placed Orders during this session
  const [ordersList, setOrdersList] = useState<PlacedOrderRecord[]>([]);

  // Selected order reference to display in the Details View
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Drawer open state & view mode ('list' | 'details')
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(false);
  const [drawerViewMode, setDrawerViewMode] = useState<'list' | 'details'>('list');

  // Service Location Preferences (persists for user convenience across orders)
  const [serviceType, setServiceType] = useState<'room' | 'table' | null>(null);
  const [locationNumber, setLocationNumber] = useState<string>('');

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

  // Filter items based on active category & search query
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MENU_ITEMS.filter((item) => {
      // 1. Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Search query match in name, description, category or dietary tags
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

  // Handle Placing an Order from the Order Form Modal
  const handlePlaceOrder = (
    item: MenuItem,
    quantity: number,
    orderServiceType: 'room' | 'table',
    orderLocationNumber: string
  ) => {
    // Save service location preference
    setServiceType(orderServiceType);
    setLocationNumber(orderLocationNumber);

    const calculatedTotal = item.price * quantity;
    const randomCode = Math.floor(1000 + Math.random() * 9000);

    const newOrder: PlacedOrderRecord = {
      orderReference: `SKY-ORD-${randomCode}`,
      items: [{ item, quantity }],
      totalPrice: calculatedTotal,
      totalQuantity: quantity,
      serviceType: orderServiceType,
      serviceTypeLabel: orderServiceType === 'room' ? 'Room Service' : 'Table Service',
      locationNumber: orderLocationNumber,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Order Placed — Kitchen Preparing',
    };

    // Prepend to orders list
    setOrdersList((prev) => [newOrder, ...prev]);
    // Specifically select this new order for details view
    setSelectedOrderId(newOrder.orderReference);
    setDrawerViewMode('details');
    // Close the order form modal
    setSelectedItem(null);
    // Open drawer to show the placed order confirmation
    setIsTrayOpen(true);
  };

  // Handle Clicking a Specific Order in the "Your Order" List
  const handleSelectOrder = (orderRef: string) => {
    setSelectedOrderId(orderRef);
    setDrawerViewMode('details');
  };

  // Look up the exact order currently selected for the Details View
  const activeViewedOrder = useMemo(() => {
    if (selectedOrderId) {
      const found = ordersList.find((o) => o.orderReference === selectedOrderId);
      if (found) return found;
    }
    return ordersList[0] || null;
  }, [ordersList, selectedOrderId]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* PAGE HEADER */}
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
            Browse our selection of dishes, local specialties, desserts, and refreshing beverages. Click "Select" on any item to customize and place your order.
          </p>
        </ContentContainer>
      </section>

      {/* CATEGORY NAVIGATION & SEARCH CONTROLS */}
      <section className="sticky top-16 sm:top-20 z-20 bg-white/95 backdrop-blur-md border-b border-[#D8E0EA] py-4 shadow-xs">
        <ContentContainer size="7xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Menu Category Tabs / Pills (Scrollable on Mobile) */}
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

            {/* Menu Search Input & "Your Order" Drawer Trigger */}
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

              {/* "Your Order" / Placed Orders Drawer Toggle */}
              {ordersList.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (ordersList.length > 1) {
                      setDrawerViewMode('list');
                    } else {
                      setSelectedOrderId(ordersList[0].orderReference);
                      setDrawerViewMode('details');
                    }
                    setIsTrayOpen(true);
                  }}
                  className="bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-medium px-3.5 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0 animate-fadeIn"
                  title="View your orders"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C7A66B]" />
                  <span>
                    {ordersList.length === 1 ? 'Your Order (1)' : `Your Orders (${ordersList.length})`}
                  </span>
                </button>
              )}
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* MENU ITEMS GRID */}
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

          {/* Menu Items Grid: Clicking "Select" opens the Order Form Modal */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onSelect={(selected) => setSelectedItem(selected)}
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

      {/* 1. ORDER FORM MODAL: Displayed when user clicks "Select" */}
      <MenuItemModal
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        serviceType={serviceType}
        onSelectServiceType={setServiceType}
        locationNumber={locationNumber}
        onLocationNumberChange={setLocationNumber}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* 2. "YOUR ORDER" DRAWER: List & Specific Order Details Views */}
      {isTrayOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-drawer-title"
          className="fixed inset-0 z-50 flex justify-end bg-[#041D2F]/65 backdrop-blur-xs animate-fadeIn"
          onClick={() => setIsTrayOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-[#D8E0EA] animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#D8E0EA] flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#C7A66B]" />
                <h3 id="order-drawer-title" className="font-serif text-lg font-medium text-[#062B45]">
                  {drawerViewMode === 'details' ? 'Order Details' : 'Your Order List'}
                </h3>
                {ordersList.length > 0 && (
                  <span className="text-[11px] font-semibold bg-[#EAF2FF] text-[#062B45] px-2.5 py-0.5 rounded-full border border-[#D8E0EA]">
                    {ordersList.length} {ordersList.length === 1 ? 'Order' : 'Orders'}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setIsTrayOpen(false)}
                aria-label="Close order drawer"
                className="w-8 h-8 rounded-full hover:bg-gray-200 text-[#60758B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content */}
            {drawerViewMode === 'details' && activeViewedOrder ? (
              /* A. SPECIFIC ORDER DETAILS VIEW */
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Back to Order List Navigation */}
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#D8E0EA]/70">
                  {ordersList.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => setDrawerViewMode('list')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] transition-colors py-1.5 px-3 rounded-lg bg-[#EAF2FF] hover:bg-[#EAF2FF]/80 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to All Orders ({ordersList.length})</span>
                    </button>
                  ) : (
                    <span className="text-xs font-medium text-[#60758B]">Your Placed Order</span>
                  )}

                  <span className="text-[11px] font-mono font-bold text-[#062B45] bg-gray-100 px-2 py-0.5 rounded border border-[#D8E0EA]">
                    {activeViewedOrder.orderReference}
                  </span>
                </div>

                {/* Direct Order Switcher Tabs (when user has multiple orders) */}
                {ordersList.length > 1 && (
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#60758B] block mb-1.5">
                      Switch Order:
                    </span>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {ordersList.map((ord) => {
                        const isCur = ord.orderReference === activeViewedOrder.orderReference;
                        return (
                          <button
                            key={ord.orderReference}
                            type="button"
                            onClick={() => setSelectedOrderId(ord.orderReference)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
                              isCur
                                ? 'bg-[#062B45] text-white shadow-xs'
                                : 'bg-gray-100 hover:bg-gray-200 text-[#60758B]'
                            }`}
                          >
                            {ord.orderReference} (${ord.totalPrice})
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Order Confirmation Banner */}
                <div className="text-center pt-1">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                    <CheckCircle className="w-7 h-7 text-emerald-600" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{activeViewedOrder.status}</span>
                  </span>
                  <h4 className="font-serif text-2xl font-normal text-[#062B45]">
                    Order Placed Successfully!
                  </h4>
                  <p className="text-xs text-[#60758B] mt-1">
                    Your request has been received by the Skyview culinary team.
                  </p>
                </div>

                {/* Reference & Service Details Box for THIS specific order */}
                <div className="bg-[#EAF2FF]/60 border border-[#D8E0EA] rounded-xl p-4 text-xs space-y-2.5">
                  <div className="flex items-center justify-between border-b border-[#D8E0EA] pb-2">
                    <span className="text-[#60758B]">Order Reference:</span>
                    <strong className="font-mono text-sm text-[#062B45]">
                      {activeViewedOrder.orderReference}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#60758B]">Service Option:</span>
                    <strong className="text-[#062B45]">{activeViewedOrder.serviceTypeLabel}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#60758B]">
                      {activeViewedOrder.serviceType === 'room' ? 'Room / Suite Number:' : 'Table Number:'}
                    </span>
                    <strong className="text-[#062B45]">{activeViewedOrder.locationNumber}</strong>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#D8E0EA] pt-2">
                    <span className="text-[#60758B]">Order Placed At:</span>
                    <span className="text-[#18324A]">{activeViewedOrder.placedAt}</span>
                  </div>
                </div>

                {/* Itemized Order Summary for THIS specific order */}
                <div className="bg-gray-50 border border-[#D8E0EA] rounded-xl p-4 text-xs">
                  <h5 className="font-semibold text-[#062B45] mb-3 pb-2 border-b border-[#D8E0EA]">
                    Ordered Items ({activeViewedOrder.totalQuantity})
                  </h5>
                  <div className="space-y-3">
                    {activeViewedOrder.items.map(({ item, quantity }) => (
                      <div key={item.id} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover object-center shrink-0"
                          />
                          <div className="min-w-0">
                            <strong className="text-[#18324A] block truncate">{item.name}</strong>
                            <span className="text-[11px] text-[#60758B]">
                              {quantity} × ${item.price}
                            </span>
                          </div>
                        </div>
                        <span className="font-semibold text-[#062B45] shrink-0">
                          ${item.price * quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#D8E0EA] flex items-center justify-between text-sm font-bold text-[#062B45]">
                    <span>Total Order Price</span>
                    <span className="font-serif text-lg text-[#062B45]">${activeViewedOrder.totalPrice}</span>
                  </div>
                </div>

                {/* Service Notice */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
                  <span>
                    Estimated preparation & delivery time is <strong>20–30 minutes</strong>. For modifications or immediate inquiries, dial extension <strong>104</strong>.
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col gap-2">
                  {ordersList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setDrawerViewMode('list')}
                      className="w-full bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer text-center"
                    >
                      View All Orders ({ordersList.length})
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsTrayOpen(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-[#18324A] text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                  >
                    Close & Continue Browsing
                  </button>
                </div>
              </div>
            ) : (
              /* B. "YOUR ORDER" LIST VIEW: Displayed when clicking "Your Orders" or returning from details */
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#D8E0EA]">
                  <div>
                    <h4 className="text-sm font-semibold text-[#062B45]">
                      Your Order History
                    </h4>
                    <p className="text-[11px] text-[#60758B]">
                      Click any order below to view its specific details.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#062B45] bg-[#EAF2FF] px-2.5 py-1 rounded-lg">
                    {ordersList.length} {ordersList.length === 1 ? 'Order' : 'Orders'}
                  </span>
                </div>

                {ordersList.length > 0 ? (
                  <div className="space-y-3">
                    {ordersList.map((order) => {
                      const isSelected = order.orderReference === selectedOrderId;
                      return (
                        <div
                          key={order.orderReference}
                          onClick={() => handleSelectOrder(order.orderReference)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSelectOrder(order.orderReference);
                            }
                          }}
                          className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md ${
                            isSelected
                              ? 'bg-[#EAF2FF]/40 border-[#062B45] ring-2 ring-[#062B45]/20'
                              : 'bg-white border-[#D8E0EA] hover:border-[#C7A66B]'
                          }`}
                        >
                          {/* Top Row: Ref, Time & Status */}
                          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#D8E0EA]/70">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#062B45]">
                                {order.orderReference}
                              </span>
                              <span className="text-[10px] text-[#60758B]">
                                • {order.placedAt}
                              </span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>Preparing</span>
                            </span>
                          </div>

                          {/* Location Row */}
                          <div className="flex items-center gap-1.5 text-xs text-[#18324A] font-medium mb-2.5">
                            {order.serviceType === 'room' ? (
                              <BedDouble className="w-3.5 h-3.5 text-[#C7A66B]" />
                            ) : (
                              <Utensils className="w-3.5 h-3.5 text-[#C7A66B]" />
                            )}
                            <span>
                              {order.serviceTypeLabel} — {order.locationNumber}
                            </span>
                          </div>

                          {/* Items Summary */}
                          <div className="space-y-1 mb-3 bg-gray-50/70 p-2.5 rounded-lg border border-[#D8E0EA]/50">
                            {order.items.map(({ item, quantity }) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between text-xs text-[#60758B]"
                              >
                                <span className="truncate pr-2">
                                  {quantity}× {item.name}
                                </span>
                                <span className="font-medium text-[#062B45] shrink-0">
                                  ${item.price * quantity}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Footer Row: Total & "View Details →" */}
                          <div className="pt-1 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] uppercase tracking-wider text-[#60758B] block">
                                Total
                              </span>
                              <span className="font-serif text-base font-bold text-[#062B45]">
                                ${order.totalPrice}
                              </span>
                            </div>

                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] transition-colors py-1 px-2.5 rounded-lg bg-[#EAF2FF]/50 hover:bg-[#EAF2FF]">
                              <span>View Details</span>
                              <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="text-center py-12 text-[#60758B] text-xs">
                    <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="font-medium text-[#062B45] mb-1">No Orders Placed Yet</p>
                    <p className="max-w-xs mx-auto">
                      Browse our digital menu and click "Select" on any item to place an order.
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-[#D8E0EA]">
                  <button
                    type="button"
                    onClick={() => setIsTrayOpen(false)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-[#18324A] text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                  >
                    Close Drawer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
