import React from 'react';
import { Link } from 'react-router-dom';
import {
  BedDouble,
  CalendarCheck,
  UtensilsCrossed,
  Inbox,
  PlusCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Info,
  TrendingUp,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import { AdminBadge } from '../../components/admin/AdminBadge';
import { Button } from '../../components/ui/Button';

export const AdminDashboard: React.FC = () => {
  const { rooms, bookings, menuItems, enquiries, settings } = useHotelStore();

  // Dynamic calculations from current local demo store
  const totalRooms = rooms.length;
  const publishedRooms = rooms.filter((r) => r.published && r.active).length;
  // Illustrative occupied rooms based on confirmed demo bookings
  const confirmedBookingsCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const occupiedRooms = Math.min(publishedRooms, confirmedBookingsCount || 1);
  const availableRooms = Math.max(0, publishedRooms - occupiedRooms);

  const pendingBookings = bookings.filter(
    (b) => b.status === 'Pending' || b.status === 'Pending Confirmation'
  );
  const totalMenuItems = menuItems.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'New');

  const recentBookings = bookings.slice(0, 5);
  const recentEnquiries = enquiries.slice(0, 4);
  const featuredMenuItems = menuItems.filter((m) => m.featured).slice(0, 4);

  // Room category inventory
  const roomsByCategory = rooms.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* 1. WELCOME & QUICK ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            OVERVIEW & INSIGHTS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45] tracking-tight">
            Hotel Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Live local snapshot for {settings.hotelName}. Monitor bookings, guest inquiries, room inventory, and dining catalog.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            to="/admin/rooms"
            variant="gold"
            size="sm"
            icon={<PlusCircle className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            Add Room
          </Button>
          <Button
            to="/admin/dining"
            variant="secondary"
            size="sm"
            icon={<PlusCircle className="w-3.5 h-3.5 text-[#062B45]" />}
            iconPosition="left"
          >
            Add Menu Item
          </Button>
          <Button
            to="/admin/bookings"
            variant="primary"
            size="sm"
            icon={<CalendarCheck className="w-3.5 h-3.5" />}
            iconPosition="left"
          >
            View Bookings
          </Button>
        </div>
      </div>

      {/* 2. DEMO NOTICE BANNER */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900 leading-relaxed shadow-xs">
        <Info className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-950">Hospitality Portfolio Demonstration</p>
          <p className="text-amber-800 mt-0.5">
            Room occupancy, rates, and booking statistics reflect interactive local demonstration records stored in your browser. All updates made here synchronize seamlessly across public website pages.
          </p>
        </div>
      </div>

      {/* 3. CALCULATED SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Rooms */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Total Rooms</span>
            <BedDouble className="w-4 h-4 text-[#062B45]" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#062B45]">{totalRooms}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">In catalog</span>
          </div>
        </div>

        {/* Available Rooms */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Available</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-700">{availableRooms}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Ready for booking</span>
          </div>
        </div>

        {/* Occupied Rooms */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Occupied</span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#062B45]">{occupiedRooms}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Illustrative stays</span>
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Pending Bookings</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-amber-700">{pendingBookings.length}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Awaiting review</span>
          </div>
        </div>

        {/* Total Menu Items */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Menu Items</span>
            <UtensilsCrossed className="w-4 h-4 text-[#C7A66B]" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#062B45]">{totalMenuItems}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Active dishes</span>
          </div>
        </div>

        {/* New Inquiries */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">New Enquiries</span>
            <Inbox className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-indigo-700">{newEnquiries.length}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">Unread messages</span>
          </div>
        </div>
      </div>

      {/* 4. TWO-COLUMN OPERATIONAL SUMMARY: RECENT BOOKINGS & RECENT ENQUIRIES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Demo Bookings (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="font-serif text-base font-semibold text-[#062B45]">
                Recent Demo Bookings
              </h2>
              <p className="text-xs text-[#60758B]">Latest reservation records captured from the booking flow</p>
            </div>
            <Link
              to="/admin/bookings"
              className="text-xs font-semibold text-[#C7A66B] hover:text-[#9A7B44] flex items-center gap-1 transition-colors"
            >
              <span>Manage all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 flex-1">
            {recentBookings.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No demo bookings yet. Try booking a room on the public booking page!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentBookings.map((b) => {
                  let badgeVariant: 'warning' | 'success' | 'danger' | 'info' = 'warning';
                  if (b.status === 'Confirmed') badgeVariant = 'success';
                  if (b.status === 'Cancelled') badgeVariant = 'danger';
                  if (b.status === 'Completed') badgeVariant = 'info';

                  return (
                    <div key={b.bookingReference} className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/60 rounded-lg px-2 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#EAF2FF] text-[#062B45] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          <BedDouble className="w-4 h-4 text-[#C7A66B]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#062B45]">
                              {b.guestName}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ({b.bookingReference})
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            {b.roomTitle} • {b.nights} nights ({b.checkIn} → {b.checkOut})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pl-12 sm:pl-0">
                        <span className="text-xs font-semibold text-[#062B45]">
                          {settings.currencySymbol} {b.totalEstimatedPrice}
                        </span>
                        <AdminBadge label={b.status} variant={badgeVariant} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Contact Enquiries (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="font-serif text-base font-semibold text-[#062B45]">
                Recent Guest Inquiries
              </h2>
              <p className="text-xs text-[#60758B]">Submissions from the public Contact Us form</p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-semibold text-[#C7A66B] hover:text-[#9A7B44] flex items-center gap-1 transition-colors"
            >
              <span>Manage all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4 flex-1">
            {recentEnquiries.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No contact enquiries received yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentEnquiries.map((enq) => {
                  let badgeVariant: 'warning' | 'info' | 'success' | 'neutral' = 'neutral';
                  if (enq.status === 'New') badgeVariant = 'warning';
                  if (enq.status === 'In Progress') badgeVariant = 'info';
                  if (enq.status === 'Resolved') badgeVariant = 'success';

                  return (
                    <div key={enq.id} className="py-3 flex items-start justify-between gap-3 hover:bg-slate-50/60 rounded-lg px-2 transition-colors">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-[#062B45] truncate">
                            {enq.fullName}
                          </p>
                          <AdminBadge label={enq.status} variant={badgeVariant} />
                        </div>
                        <p className="text-xs text-[#0A3D60] font-medium truncate mt-0.5">
                          {enq.subject}
                        </p>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {enq.message}
                        </p>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          {enq.createdAt}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. ROOM INVENTORY OVERVIEW & POPULAR MENU ITEMS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Room Inventory by Category (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-serif text-base font-semibold text-[#062B45]">
                Room Inventory by Category
              </h3>
              <p className="text-xs text-[#60758B]">Distribution of suites and publication health</p>
            </div>
            <Link
              to="/admin/rooms"
              className="text-xs font-semibold text-[#C7A66B] hover:text-[#9A7B44]"
            >
              Rooms list
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {Object.entries(roomsByCategory).map(([cat, count]) => {
              const percentage = Math.round((count / totalRooms) * 100) || 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#062B45]">{cat}</span>
                    <span className="text-slate-500">
                      {count} rooms ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#062B45]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="bg-[#EAF2FF]/50 p-3 rounded-lg border border-[#D8E0EA]/60">
              <span className="text-slate-500 block text-[11px]">Published on Website:</span>
              <span className="text-base font-bold text-[#062B45]">{publishedRooms} rooms</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-slate-500 block text-[11px]">Unpublished / Inactive:</span>
              <span className="text-base font-bold text-slate-700">{totalRooms - publishedRooms} rooms</span>
            </div>
          </div>
        </div>

        {/* Featured / Signature Culinary Dishes (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-serif text-base font-semibold text-[#062B45]">
                Featured Dishes & Dining Highlights
              </h3>
              <p className="text-xs text-[#60758B]">Dishes showcased on the public Dining and Menu pages</p>
            </div>
            <Link
              to="/admin/dining"
              className="text-xs font-semibold text-[#C7A66B] hover:text-[#9A7B44]"
            >
              Dining menu
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featuredMenuItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 hover:border-[#C7A66B]/50 transition-colors bg-white shadow-2xs"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-[#062B45] truncate">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 capitalize">{item.categoryLabel}</p>
                  <span className="text-xs font-bold text-[#C7A66B]">
                    {settings.currencySymbol} {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
