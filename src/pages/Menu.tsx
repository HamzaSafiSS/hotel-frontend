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
  AlertCircle,
  MapPin,
  BedDouble,
  Utensils,
  Clock,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { MenuItemCard } from '../components/ui/MenuItemCard';
import { MenuItemModal } from '../components/ui/MenuItemModal';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import type { MenuItem } from '../data/menuData';

interface OrderItem {
  item: MenuItem;
  quantity: number;
}

interface PlacedOrderRecord {
  orderReference: string;
  items: OrderItem[];
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

  // Active Item for Details Modal
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Selected Food & Drinks Items State
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(false);

  // Mandatory Service Location State
  const [serviceType, setServiceType] = useState<'room' | 'table' | null>(null);
  const [locationNumber, setLocationNumber] = useState<string>('');

  // Validation & Completed Order State
  const [orderValidationError, setOrderValidationError] = useState<string>('');
  const [placedOrder, setPlacedOrder] = useState<PlacedOrderRecord | null>(null);

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

  // 1. SELECT FOOD & DRINKS: INCREASE QUANTITY
  const handleIncreaseQuantity = (item: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((t) => t.item.id === item.id);
      if (existing) {
        return prev.map((t) =>
          t.item.id === item.id ? { ...t, quantity: t.quantity + 1 } : t
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setOrderValidationError('');
  };

  // 1. SELECT FOOD & DRINKS: DECREASE QUANTITY & REMOVE IF ZERO
  const handleDecreaseQuantity = (item: MenuItem) => {
    setOrderItems((prev) =>
      prev
        .map((t) => {
          if (t.item.id === item.id) {
            const nextQty = t.quantity - 1;
            return nextQty > 0 ? { ...t, quantity: nextQty } : null;
          }
          return t;
        })
        .filter((t): t is OrderItem => t !== null)
    );
  };

  // Remove Item Completely
  const handleRemoveItem = (itemId: string) => {
    setOrderItems((prev) => prev.filter((t) => t.item.id !== itemId));
  };

  // Reset / Clear Order
  const handleClearOrder = () => {
    setOrderItems([]);
    setPlacedOrder(null);
    setOrderValidationError('');
  };

  // Map of item IDs to their selected quantities
  const itemQuantitiesMap = useMemo(() => {
    const map = new Map<string, number>();
    orderItems.forEach((t) => map.set(t.item.id, t.quantity));
    return map;
  }, [orderItems]);

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

  // Order Calculations: Automatically updates whenever any item quantity changes
  const totalItemCount = useMemo(() => {
    return orderItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [orderItems]);

  const totalOrderPrice = useMemo(() => {
    return orderItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  }, [orderItems]);

  // 3. PLACE ORDER VALIDATION & SUBMISSION
  const handlePlaceOrder = (directItem?: MenuItem) => {
    // Determine active items list
    let activeItems = [...orderItems];

    // If placed from a single item modal and it's not yet in the list, add it
    if (directItem && !activeItems.some((i) => i.item.id === directItem.id)) {
      activeItems = [...activeItems, { item: directItem, quantity: 1 }];
      setOrderItems(activeItems);
    }

    // Validation 1: At least one menu item selected with valid quantities
    if (activeItems.length === 0 || activeItems.every((i) => i.quantity <= 0)) {
      setOrderValidationError('Please select at least one menu item before placing your order.');
      return;
    }

    // Validation 2: Service type must be selected
    if (!serviceType) {
      setOrderValidationError('Please select where you want your order delivered (Room Service or Table Service).');
      return;
    }

    // Validation 3: Corresponding room or table number must be provided
    if (!locationNumber || !locationNumber.trim()) {
      setOrderValidationError(
        serviceType === 'room'
          ? 'Please enter your room or suite number.'
          : 'Please enter your table or cabana number.'
      );
      return;
    }

    // Calculate total price
    const calculatedTotal = activeItems.reduce(
      (acc, curr) => acc + curr.item.price * curr.quantity,
      0
    );
    const calculatedQty = activeItems.reduce((acc, curr) => acc + curr.quantity, 0);

    // Generate safe demo order reference (e.g. SKY-ORD-8492)
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const orderRecord: PlacedOrderRecord = {
      orderReference: `SKY-ORD-${randomCode}`,
      items: activeItems,
      totalPrice: calculatedTotal,
      totalQuantity: calculatedQty,
      serviceType,
      serviceTypeLabel: serviceType === 'room' ? 'Room Service' : 'Table Service',
      locationNumber: locationNumber.trim(),
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Order Placed — Kitchen Preparing',
    };

    setPlacedOrder(orderRecord);
    setOrderValidationError('');
    setSelectedItem(null); // Close modal if open
    setIsTrayOpen(true); // Open drawer showing complete confirmation
  };

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

            {/* 3.C Menu Search Input & Order Drawer Trigger */}
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

              {/* Order Selection Drawer Toggle */}
              {totalItemCount > 0 && (
                <button
                  type="button"
                  onClick={() => setIsTrayOpen(true)}
                  className="bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-medium px-3.5 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0 animate-fadeIn"
                  title="View your dining order"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C7A66B]" />
                  <span>
                    Your Order ({totalItemCount}) • ${totalOrderPrice}
                  </span>
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

          {/* Menu Items Grid with Quantity Controls */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch">
              {filteredItems.map((item) => {
                const currentQty = itemQuantitiesMap.get(item.id) || 0;
                return (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    quantity={currentQty}
                    onSelect={(selected) => setSelectedItem(selected)}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                );
              })}
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

      {/* 3.F MENU ITEM DETAILS MODAL WITH "PLACE ORDER" BUTTON */}
      <MenuItemModal
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        quantity={selectedItem ? itemQuantitiesMap.get(selectedItem.id) || 0 : 0}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        serviceType={serviceType}
        onSelectServiceType={setServiceType}
        locationNumber={locationNumber}
        onLocationNumberChange={setLocationNumber}
        onPlaceOrder={handlePlaceOrder}
        validationError={orderValidationError}
      />

      {/* 3.G SELECTED-ORDER SECTION / DRAWER */}
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
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C7A66B]" />
                <h3 id="order-drawer-title" className="font-serif text-lg font-medium text-[#062B45]">
                  {placedOrder ? 'Order Confirmation' : 'Selected Order'}
                </h3>
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

            {/* Drawer Body: Shows Placed Order Confirmation OR Selected Items List */}
            {placedOrder ? (
              /* A. COMPLETED ORDER CONFIRMATION VIEW */
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                    <CheckCircle className="w-7 h-7 text-emerald-600" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{placedOrder.status}</span>
                  </span>
                  <h4 className="font-serif text-2xl font-normal text-[#062B45]">
                    Order Successfully Placed!
                  </h4>
                  <p className="text-xs text-[#60758B] mt-1">
                    Your order has been transmitted directly to the Skyview Kitchen.
                  </p>
                </div>

                {/* Reference & Service Details Box */}
                <div className="bg-[#EAF2FF]/60 border border-[#D8E0EA] rounded-xl p-4 text-xs space-y-2.5">
                  <div className="flex items-center justify-between border-b border-[#D8E0EA] pb-2">
                    <span className="text-[#60758B]">Order Reference:</span>
                    <strong className="font-mono text-sm text-[#062B45]">
                      {placedOrder.orderReference}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#60758B]">Service Option:</span>
                    <strong className="text-[#062B45]">{placedOrder.serviceTypeLabel}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#60758B]">
                      {placedOrder.serviceType === 'room' ? 'Room / Suite Number:' : 'Table Number:'}
                    </span>
                    <strong className="text-[#062B45]">{placedOrder.locationNumber}</strong>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#D8E0EA] pt-2">
                    <span className="text-[#60758B]">Order Time:</span>
                    <span className="text-[#18324A]">{placedOrder.placedAt}</span>
                  </div>
                </div>

                {/* Itemized Order Summary */}
                <div className="bg-gray-50 border border-[#D8E0EA] rounded-xl p-4 text-xs">
                  <h5 className="font-semibold text-[#062B45] mb-3 pb-2 border-b border-[#D8E0EA]">
                    Ordered Items ({placedOrder.totalQuantity})
                  </h5>
                  <div className="space-y-3">
                    {placedOrder.items.map(({ item, quantity }) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <strong className="text-[#18324A] block">{item.name}</strong>
                          <span className="text-[11px] text-[#60758B]">
                            {quantity} × ${item.price}
                          </span>
                        </div>
                        <span className="font-semibold text-[#062B45]">
                          ${item.price * quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#D8E0EA] flex items-center justify-between text-sm font-bold text-[#062B45]">
                    <span>Total Order Price</span>
                    <span className="font-serif text-lg">${placedOrder.totalPrice}</span>
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
                  <button
                    type="button"
                    onClick={handleClearOrder}
                    className="w-full bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
                  >
                    Start a New Order
                  </button>
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
              /* B. ACTIVE SELECTED ITEMS & LOCATION FLOW */
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {orderItems.length > 0 ? (
                    orderItems.map(({ item, quantity }) => (
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

                        {/* Plus and Minus Quantity Controls */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleDecreaseQuantity(item)}
                            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-[#062B45] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            title="Decrease quantity"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold w-5 text-center text-[#18324A]">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleIncreaseQuantity(item)}
                            className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-[#062B45] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            title="Increase quantity"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="w-6 h-6 rounded hover:bg-red-50 text-red-600 flex items-center justify-center transition-colors cursor-pointer ml-1"
                            title="Remove item"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-[#60758B] text-xs">
                      <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <span>No dishes added to your selection yet.</span>
                    </div>
                  )}
                </div>

                {/* Footer: Service Location + Total + Place Order Button */}
                {orderItems.length > 0 && (
                  <div className="p-5 border-t border-[#D8E0EA] bg-gray-50 flex flex-col gap-4 overflow-y-auto max-h-[50vh]">
                    {/* 2. SELECT SERVICE LOCATION (MANDATORY) */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#D8E0EA] flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#062B45] flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C7A66B]" />
                          <span>Service Location</span>
                          <span className="text-red-500 font-bold">*</span>
                        </span>
                        <span className="text-[10px] text-[#60758B]">Mandatory</span>
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setServiceType('room');
                            setOrderValidationError('');
                          }}
                          className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                            serviceType === 'room'
                              ? 'bg-[#EAF2FF] border-[#062B45] text-[#062B45] font-semibold ring-1 ring-[#062B45]/20'
                              : 'bg-white border-[#D8E0EA] text-[#60758B] hover:border-[#062B45]/40'
                          }`}
                        >
                          <BedDouble className={`w-3.5 h-3.5 ${serviceType === 'room' ? 'text-[#062B45]' : 'text-[#C7A66B]'}`} />
                          <span className="text-xs">Room Service</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setServiceType('table');
                            setOrderValidationError('');
                          }}
                          className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                            serviceType === 'table'
                              ? 'bg-[#EAF2FF] border-[#062B45] text-[#062B45] font-semibold ring-1 ring-[#062B45]/20'
                              : 'bg-white border-[#D8E0EA] text-[#60758B] hover:border-[#062B45]/40'
                          }`}
                        >
                          <Utensils className={`w-3.5 h-3.5 ${serviceType === 'table' ? 'text-[#062B45]' : 'text-[#C7A66B]'}`} />
                          <span className="text-xs">Table Service</span>
                        </button>
                      </div>

                      {/* Only show relevant field after selecting the corresponding option */}
                      {serviceType === 'room' && (
                        <div className="animate-fadeIn">
                          <label
                            htmlFor="drawer-room-input"
                            className="block text-[11px] font-bold uppercase tracking-wider text-[#062B45] mb-1"
                          >
                            Room or Suite Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="drawer-room-input"
                            type="text"
                            placeholder="e.g. Room 204, Ocean Suite 301, Villa 4"
                            value={locationNumber}
                            onChange={(e) => {
                              setLocationNumber(e.target.value);
                              setOrderValidationError('');
                            }}
                            className="w-full bg-[#EAF2FF]/30 border border-[#D8E0EA] rounded-lg px-3 py-2 text-xs font-medium text-[#18324A] placeholder:text-[#60758B]/60 outline-none focus:border-[#062B45] focus:bg-white transition-all"
                          />
                        </div>
                      )}

                      {serviceType === 'table' && (
                        <div className="animate-fadeIn">
                          <label
                            htmlFor="drawer-table-input"
                            className="block text-[11px] font-bold uppercase tracking-wider text-[#062B45] mb-1"
                          >
                            Table or Cabana Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="drawer-table-input"
                            type="text"
                            placeholder="e.g. Table 12, Seaside Terrace 4, Cabana 2"
                            value={locationNumber}
                            onChange={(e) => {
                              setLocationNumber(e.target.value);
                              setOrderValidationError('');
                            }}
                            className="w-full bg-[#EAF2FF]/30 border border-[#D8E0EA] rounded-lg px-3 py-2 text-xs font-medium text-[#18324A] placeholder:text-[#60758B]/60 outline-none focus:border-[#062B45] focus:bg-white transition-all"
                          />
                        </div>
                      )}
                    </div>

                    {/* Validation Error Message */}
                    {orderValidationError && (
                      <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                        <span>{orderValidationError}</span>
                      </div>
                    )}

                    {/* Subtotal & Auto-updating Total Price */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-[#60758B]">
                        <span>Selected Items</span>
                        <span>{totalItemCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-base font-bold text-[#062B45]">
                        <span>Total Price</span>
                        <span className="text-xl font-serif text-[#062B45]">${totalOrderPrice}</span>
                      </div>
                    </div>

                    {/* 3. PLACE ORDER BUTTON */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handlePlaceOrder()}
                        className="flex-1 bg-[#062B45] hover:bg-[#0A3D60] active:bg-[#041D2F] text-white text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
                      >
                        <Sparkles className="w-4 h-4 text-[#C7A66B]" />
                        <span>Place Order</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleClearOrder}
                        className="p-3 rounded-xl border border-[#D8E0EA] text-[#60758B] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Clear all items"
                        aria-label="Clear order selection"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
