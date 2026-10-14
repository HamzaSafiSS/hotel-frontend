import React, { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  UtensilsCrossed,
  Sparkles,
  Image as ImageIcon,
  Compass,
  MessageSquareQuote,
  HelpCircle,
  Inbox,
  FileText,
  Settings,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { useHotelStore } from '../store/hotelStore';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badgeCount?: number;
}

export const AdminLayout: React.FC = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const location = useLocation();
  const { enquiries, bookings, settings } = useHotelStore();

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  // Compute pending counts
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;
  const pendingBookingsCount = bookings.filter(
    (b) => b.status === 'Pending' || b.status === 'Pending Confirmation'
  ).length;

  const navigation: NavItem[] = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-4 h-4 shrink-0" /> },
    { name: 'Rooms', path: '/admin/rooms', icon: <BedDouble className="w-4 h-4 shrink-0" /> },
    {
      name: 'Bookings',
      path: '/admin/bookings',
      icon: <CalendarCheck className="w-4 h-4 shrink-0" />,
      badgeCount: pendingBookingsCount,
    },
    { name: 'Dining & Menu', path: '/admin/dining', icon: <UtensilsCrossed className="w-4 h-4 shrink-0" /> },
    { name: 'Facilities & Amenities', path: '/admin/facilities', icon: <Sparkles className="w-4 h-4 shrink-0" /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <ImageIcon className="w-4 h-4 shrink-0" /> },
    { name: 'Experiences', path: '/admin/experiences', icon: <Compass className="w-4 h-4 shrink-0" /> },
    { name: 'Guest Reviews', path: '/admin/reviews', icon: <MessageSquareQuote className="w-4 h-4 shrink-0" /> },
    { name: 'FAQs', path: '/admin/faqs', icon: <HelpCircle className="w-4 h-4 shrink-0" /> },
    {
      name: 'Contact Enquiries',
      path: '/admin/enquiries',
      icon: <Inbox className="w-4 h-4 shrink-0" />,
      badgeCount: newEnquiriesCount,
    },
    { name: 'Website Content', path: '/admin/content', icon: <FileText className="w-4 h-4 shrink-0" /> },
    { name: 'Hotel Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4 shrink-0" /> },
  ];

  // Determine current active section title for the top header
  const currentNav = navigation.find((item) =>
    item.path === '/admin'
      ? location.pathname === '/admin' || location.pathname === '/admin/'
      : location.pathname.startsWith(item.path)
  ) || { name: 'Admin Console' };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col font-sans text-[#18324A]">
      {/* 1. TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#062B45] text-white border-b border-[#0A3D60] shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Left: Mobile hamburger & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Admin Monogram & Title */}
            <Link to="/admin" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#C7A66B] text-[#062B45] flex items-center justify-center font-bold text-sm shadow-xs">
                S
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-base font-semibold tracking-wide text-white block leading-tight">
                  {settings.hotelName || 'Skyview Hotels & Resorts'}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#DFCA9B] font-medium block">
                  Management Console
                </span>
              </div>
            </Link>

            {/* Breadcrumb separator on desktop */}
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-400 ml-4 pl-4 border-l border-white/15">
              <span>Admin</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
              <span className="text-white font-medium">{currentNav.name}</span>
            </div>
          </div>

          {/* Right: Public Website Link & Administrator Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* View Website Button */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-200 bg-white/10 hover:bg-white/15 hover:text-white border border-white/10 transition-colors shadow-xs"
              title="Open public website in a new tab"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C7A66B]" />
            </Link>

            {/* Demo Administrator Profile */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/15">
              <div className="w-8 h-8 rounded-full bg-[#0A3D60] border border-[#C7A66B]/50 flex items-center justify-center text-[#DFCA9B]">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-white leading-tight">Demo Administrator</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <p className="text-[10px] text-gray-300 uppercase tracking-wider">Hospitality Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN LAYOUT: SIDEBAR + CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        {/* DESKTOP SIDEBAR (Persistent) */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-[#D8E0EA] shrink-0">
          <div className="p-4 border-b border-[#EAF2FF] bg-[#F8FAFC]">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#60758B]">
              Hospitality Navigation
            </p>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isDashboard = item.path === '/admin';
              const isActive = isDashboard
                ? location.pathname === '/admin' || location.pathname === '/admin/'
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={isDashboard}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#062B45] text-white shadow-xs'
                      : 'text-[#60758B] hover:text-[#062B45] hover:bg-[#EAF2FF]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#C7A66B]' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>

                  {Boolean(item.badgeCount && item.badgeCount > 0) && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#C7A66B] text-[#062B45]'
                          : 'bg-[#C7A66B]/20 text-[#846830]'
                      }`}
                    >
                      {item.badgeCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Sidebar Footer info */}
          <div className="p-4 border-t border-[#D8E0EA] bg-[#F8FAFC]">
            <div className="flex items-center gap-2 text-[11px] text-[#60758B]">
              <ShieldCheck className="w-4 h-4 text-[#C7A66B] shrink-0" />
              <span className="leading-tight">Frontend Demo Mode • Local Persistence</span>
            </div>
          </div>
        </aside>

        {/* MOBILE DRAWER (Collapsible) */}
        {mobileDrawerOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setMobileDrawerOpen(false)}
          >
            <div
              className="w-72 bg-white h-full shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 bg-[#062B45] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#C7A66B] text-[#062B45] flex items-center justify-center font-bold text-xs">
                    S
                  </div>
                  <div>
                    <p className="font-serif text-sm font-semibold text-white">Skyview Admin</p>
                    <p className="text-[10px] text-gray-300">Demo Management Console</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded text-gray-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                  const isDashboard = item.path === '/admin';
                  const isActive = isDashboard
                    ? location.pathname === '/admin' || location.pathname === '/admin/'
                    : location.pathname.startsWith(item.path);

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={isDashboard}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium ${
                        isActive
                          ? 'bg-[#062B45] text-white'
                          : 'text-[#60758B] hover:text-[#062B45] hover:bg-[#EAF2FF]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? 'text-[#C7A66B]' : 'text-slate-400'}>
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </div>
                      {Boolean(item.badgeCount && item.badgeCount > 0) && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#C7A66B] text-[#062B45]">
                          {item.badgeCount}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-[#D8E0EA] bg-[#F8FAFC]">
                <Link
                  to="/"
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[#062B45] bg-[#EAF2FF] hover:bg-[#D8E5F8]"
                >
                  <span>View Public Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
