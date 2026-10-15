import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  BedDouble,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Sparkles,
  Check,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { Button } from '../components/ui/Button';
import { SAMPLE_ROOMS } from '../data/siteData';
import type { DemoBooking } from '../data/siteData';
import { useHotelStore } from '../store/hotelStore';

export const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { rooms, addBooking, settings } = useHotelStore();

  // Only published and active rooms are bookable in the demo flow
  const activeRooms = useMemo(() => {
    const pub = rooms.filter((r) => r.published && r.active);
    return pub.length > 0 ? pub : SAMPLE_ROOMS;
  }, [rooms]);

  // Helper for dates
  const getFutureDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  // Step state: 1 = Stay Details, 2 = Guest Details, 3 = Review & Submit, 4 = Success
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Stay Details State
  const initialRoomId = searchParams.get('roomId') || activeRooms[0]?.id || 'deluxe-room';
  const [selectedRoomId, setSelectedRoomId] = useState<string>(initialRoomId);
  const [checkIn, setCheckIn] = useState<string>(
    () => searchParams.get('from') || searchParams.get('checkIn') || getFutureDate(1)
  );
  const [checkOut, setCheckOut] = useState<string>(
    () => searchParams.get('to') || searchParams.get('checkOut') || getFutureDate(4)
  );
  const [adults, setAdults] = useState<number>(() =>
    Number(searchParams.get('adults')) || 2
  );
  const [children, setChildren] = useState<number>(() =>
    Number(searchParams.get('children')) || 0
  );
  const [roomsCount, setRoomsCount] = useState<number>(() =>
    Number(searchParams.get('rooms')) || 1
  );
  const [step1Error, setStep1Error] = useState<string>('');

  // Step 2: Guest Details State
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
  const [step2Errors, setStep2Errors] = useState<{ [key: string]: string }>({});

  // Completed Demo Booking Record
  const [confirmedBooking, setConfirmedBooking] = useState<DemoBooking | null>(null);

  // Lookup demo booking state
  const [lookupQuery, setLookupQuery] = useState<string>('');
  const [lookedUpBooking, setLookedUpBooking] = useState<DemoBooking | null>(null);
  const [lookupError, setLookupError] = useState<string>('');

  // Currently Selected Room
  const selectedRoom = useMemo(() => {
    return (
      activeRooms.find((r) => r.id === selectedRoomId) ||
      activeRooms[0] ||
      SAMPLE_ROOMS[0]
    );
  }, [activeRooms, selectedRoomId]);

  // Calculate duration in days (inclusive of both From and To dates)
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    return days >= 0 ? days + 1 : 1;
  }, [checkIn, checkOut]);

  // Calculate total price: nightly rate * nights * rooms
  const estimatedTotal = useMemo(() => {
    return selectedRoom.pricePerNight * nights * roomsCount;
  }, [selectedRoom, nights, roomsCount]);

  // Validate Step 1
  const handleValidateStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      setStep1Error('Please choose both "From" and "To" dates.');
      return;
    }
    if (new Date(checkOut) < new Date(checkIn)) {
      setStep1Error('"To" date cannot be before "From" date.');
      return;
    }
    if (adults + children > selectedRoom.guests * roomsCount) {
      setStep1Error(
        `Selected room capacity (${selectedRoom.guests * roomsCount} max) cannot accommodate ${
          adults + children
        } guests. Please choose a larger suite or add rooms.`
      );
      return;
    }

    setStep1Error('');
    setCurrentStep(2);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Validate Step 2
  const handleValidateStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full name is required.';
    }
    if (!email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!termsAgreed) {
      errors.terms = 'Please accept the hotel booking policies to complete your reservation.';
    }

    if (Object.keys(errors).length > 0) {
      setStep2Errors(errors);
      return;
    }

    setStep2Errors({});
    setCurrentStep(3);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Submit Final Demo Booking
  const handleSubmitBooking = () => {
    // Generate safe demo booking reference
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const reference = `SKY-${randomSuffix}`;

    const newBooking: DemoBooking = {
      bookingReference: reference,
      roomId: selectedRoom.id,
      roomTitle: selectedRoom.title,
      roomCategory: selectedRoom.category,
      pricePerNight: selectedRoom.pricePerNight,
      checkIn,
      checkOut,
      nights,
      roomsCount,
      adults,
      children,
      totalEstimatedPrice: estimatedTotal,
      guestName: fullName,
      guestEmail: email,
      guestPhone: phone || undefined,
      specialRequests: specialRequests || undefined,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      status: 'Pending Confirmation',
    };

    // Save in local state and reactive store for admin dashboard
    setConfirmedBooking(newBooking);
    addBooking(newBooking as any);

    setCurrentStep(4);
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  // Handle lookup existing booking by reference
  const handleLookupBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRef = lookupQuery.trim().toUpperCase();

    if (!cleanRef) {
      setLookupError('Please enter your reservation reference code.');
      return;
    }

    try {
      const stored = localStorage.getItem('skyview_demo_bookings');
      const list: DemoBooking[] = stored ? JSON.parse(stored) : [];
      const match = list.find((b) => b.bookingReference === cleanRef);

      if (match) {
        setLookedUpBooking(match);
        setLookupError('');
      } else {
        setLookupError(`No reservation found matching reference "${cleanRef}". Please verify and try again.`);
        setLookedUpBooking(null);
      }
    } catch {
      setLookupError('Could not access local storage.');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header Banner */}
      <section className="bg-[#062B45] text-white py-12 sm:py-14 border-b border-[#0A3D60]">
        <ContentContainer size="7xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-300 mb-3">
            <Link to="/" className="hover:text-[#DFCA9B] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
            <Link to="/rooms" className="hover:text-[#DFCA9B] transition-colors">
              Rooms & Suites
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span className="text-white font-medium">Reserve Your Stay</span>
          </nav>

          <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-2">
            SKYVIEW RESERVATIONS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
            Reserve Your Stay
          </h1>
          <p className="text-sm text-gray-200 mt-2 font-light">
            Complete your reservation details below to secure your luxury retreat at Skyview Hotels & Resorts.
          </p>
        </ContentContainer>
      </section>

      {/* Main Booking Container */}
      <section className="py-10 sm:py-16 bg-[#EAF2FF]/20 flex-1">
        <ContentContainer size="7xl">
          {/* Top Step Progress Bar (when not in success screen) */}
          {currentStep < 4 && (
            <div className="max-w-3xl mx-auto mb-10">
              <div className="flex items-center justify-between relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#D8E0EA] -translate-y-1/2 z-0" />

                {/* Step 1 */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      currentStep >= 1
                        ? 'bg-[#062B45] text-white ring-4 ring-[#EAF2FF]'
                        : 'bg-white text-[#60758B] border border-[#D8E0EA]'
                    }`}
                  >
                    1
                  </div>
                  <span className="text-xs font-semibold text-[#062B45] mt-2">
                    Stay Details
                  </span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      currentStep >= 2
                        ? 'bg-[#062B45] text-white ring-4 ring-[#EAF2FF]'
                        : 'bg-white text-[#60758B] border border-[#D8E0EA]'
                    }`}
                  >
                    2
                  </div>
                  <span
                    className={`text-xs font-semibold mt-2 ${
                      currentStep >= 2 ? 'text-[#062B45]' : 'text-[#60758B]'
                    }`}
                  >
                    Guest Details
                  </span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      currentStep >= 3
                        ? 'bg-[#062B45] text-white ring-4 ring-[#EAF2FF]'
                        : 'bg-white text-[#60758B] border border-[#D8E0EA]'
                    }`}
                  >
                    3
                  </div>
                  <span
                    className={`text-xs font-semibold mt-2 ${
                      currentStep >= 3 ? 'text-[#062B45]' : 'text-[#60758B]'
                    }`}
                  >
                    Review & Submit
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: STAY DETAILS */}
          {currentStep === 1 && (
            <div className="max-w-4xl mx-auto bg-white border border-[#D8E0EA] rounded-2xl p-6 sm:p-10 shadow-sm">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D8E0EA]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C7A66B]">
                    Step 1 of 3
                  </span>
                  <h2 className="font-serif text-2xl font-medium text-[#062B45]">
                    Select Room & Stay Dates
                  </h2>
                </div>
                <Link
                  to="/rooms"
                  className="text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] flex items-center gap-1"
                >
                  <span>Explore Rooms Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <form onSubmit={handleValidateStep1} className="flex flex-col gap-6">
                {/* 1. Room Picker */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#062B45] block mb-3">
                    Choose Your Room or Suite
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeRooms.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRoomId(r.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                          selectedRoomId === r.id
                            ? 'border-[#062B45] bg-[#EAF2FF]/40 shadow-xs'
                            : 'border-[#D8E0EA] hover:border-[#062B45]/40 bg-white'
                        }`}
                      >
                        <img
                          src={r.imageUrl}
                          alt={r.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif font-medium text-sm text-[#062B45]">
                              {r.title}
                            </h4>
                            {selectedRoomId === r.id && (
                              <Check className="w-4 h-4 text-[#062B45]" />
                            )}
                          </div>
                          <span className="text-xs text-[#60758B] block mt-0.5">
                            {r.guests} Guests max • {r.size}
                          </span>
                          <span className="font-bold text-xs text-[#18324A] font-sans block mt-1">
                            {settings.currencySymbol || 'ETB'} {r.pricePerNight} <span className="font-normal text-[#60758B]">/ night</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Dates & Occupancy Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-[#D8E0EA]">
                  {/* Check In */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="booking-checkin"
                      className="text-[11px] font-bold uppercase tracking-wider text-[#062B45] flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#C7A66B]" />
                      <span>Check In</span>
                    </label>
                    <input
                      id="booking-checkin"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="bg-white border border-[#D8E0EA] rounded-lg p-2.5 text-xs sm:text-sm font-medium text-[#18324A] outline-none focus:border-[#062B45]"
                      required
                    />
                  </div>

                  {/* Check Out */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="booking-checkout"
                      className="text-[11px] font-bold uppercase tracking-wider text-[#062B45] flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#C7A66B]" />
                      <span>Check Out</span>
                    </label>
                    <input
                      id="booking-checkout"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="bg-white border border-[#D8E0EA] rounded-lg p-2.5 text-xs sm:text-sm font-medium text-[#18324A] outline-none focus:border-[#062B45]"
                      required
                    />
                  </div>

                  {/* Adults */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="booking-adults"
                      className="text-[11px] font-bold uppercase tracking-wider text-[#062B45] flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5 text-[#C7A66B]" />
                      <span>Adults</span>
                    </label>
                    <select
                      id="booking-adults"
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="bg-white border border-[#D8E0EA] rounded-lg p-2.5 text-xs sm:text-sm font-medium text-[#18324A] outline-none focus:border-[#062B45]"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Adult' : 'Adults'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Children */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="booking-children"
                      className="text-[11px] font-bold uppercase tracking-wider text-[#062B45] flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5 text-[#C7A66B]" />
                      <span>Children</span>
                    </label>
                    <select
                      id="booking-children"
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="bg-white border border-[#D8E0EA] rounded-lg p-2.5 text-xs sm:text-sm font-medium text-[#18324A] outline-none focus:border-[#062B45]"
                    >
                      {[0, 1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Child' : 'Children'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rooms Count */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="booking-rooms"
                      className="text-[11px] font-bold uppercase tracking-wider text-[#062B45] flex items-center gap-1.5"
                    >
                      <BedDouble className="w-3.5 h-3.5 text-[#C7A66B]" />
                      <span>Rooms</span>
                    </label>
                    <select
                      id="booking-rooms"
                      value={roomsCount}
                      onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="bg-white border border-[#D8E0EA] rounded-lg p-2.5 text-xs sm:text-sm font-medium text-[#18324A] outline-none focus:border-[#062B45]"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Room' : 'Rooms'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Validation Error Banner */}
                {step1Error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{step1Error}</span>
                  </div>
                )}

                {/* Stay Price Preview Box */}
                <div className="p-4 rounded-xl bg-[#EAF2FF]/50 border border-[#D8E0EA] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#60758B] block">Stay Calculation</span>
                    <strong className="text-sm text-[#062B45]">
                      {nights} {nights === 1 ? 'Night' : 'Nights'} • {selectedRoom.title} (
                      {roomsCount} {roomsCount === 1 ? 'room' : 'rooms'})
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#60758B] block">Estimated Subtotal</span>
                    <span className="text-2xl font-bold font-sans text-[#062B45]">
                      ETB {estimatedTotal}
                    </span>
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end pt-4 border-t border-[#D8E0EA]">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Continue to Guest Details
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: GUEST DETAILS */}
          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto bg-white border border-[#D8E0EA] rounded-2xl p-6 sm:p-10 shadow-sm">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D8E0EA]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C7A66B]">
                    Step 2 of 3
                  </span>
                  <h2 className="font-serif text-2xl font-medium text-[#062B45]">
                    Primary Guest Information
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Stay Details</span>
                </button>
              </div>

              <form onSubmit={handleValidateStep2} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="guest-fullname"
                      className="text-xs font-bold uppercase tracking-wider text-[#062B45]"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="guest-fullname"
                      type="text"
                      placeholder="e.g. Johnathan Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`border rounded-lg p-2.5 text-xs sm:text-sm text-[#18324A] outline-none ${
                        step2Errors.fullName
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-[#D8E0EA] focus:border-[#062B45]'
                      }`}
                      required
                    />
                    {step2Errors.fullName && (
                      <span className="text-xs text-red-600 font-medium">
                        {step2Errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="guest-email"
                      className="text-xs font-bold uppercase tracking-wider text-[#062B45]"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="guest-email"
                      type="email"
                      placeholder="e.g. jdoe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`border rounded-lg p-2.5 text-xs sm:text-sm text-[#18324A] outline-none ${
                        step2Errors.email
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-[#D8E0EA] focus:border-[#062B45]'
                      }`}
                      required
                    />
                    {step2Errors.email && (
                      <span className="text-xs text-red-600 font-medium">
                        {step2Errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="guest-phone"
                    className="text-xs font-bold uppercase tracking-wider text-[#062B45]"
                  >
                    Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="guest-phone"
                    type="tel"
                    placeholder="e.g. +1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-[#D8E0EA] rounded-lg p-2.5 text-xs sm:text-sm text-[#18324A] outline-none focus:border-[#062B45]"
                  />
                </div>

                {/* Special Requests */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="guest-requests"
                    className="text-xs font-bold uppercase tracking-wider text-[#062B45]"
                  >
                    Special Requests & Preferences{' '}
                    <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="guest-requests"
                    rows={3}
                    placeholder="e.g. High floor preference, airport transfer inquiry, extra feather pillows, anniversary celebration..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="border border-[#D8E0EA] rounded-lg p-2.5 text-xs sm:text-sm text-[#18324A] outline-none focus:border-[#062B45] resize-y"
                  />
                </div>

                {/* Terms Acknowledgment */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#062B45] focus:ring-[#C7A66B] accent-[#062B45] cursor-pointer"
                    />
                    <span className="text-xs text-[#60758B] leading-relaxed">
                      I have read and agree to the <strong>Hotel Booking Policy</strong>, including arrival check-in protocols and the cancellation guidelines for this accommodation.
                    </span>
                  </label>
                  {step2Errors.terms && (
                    <span className="text-xs text-red-600 font-medium block mt-1">
                      {step2Errors.terms}
                    </span>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-[#D8E0EA] mt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setCurrentStep(1)}
                    icon={<ArrowLeft className="w-4 h-4" />}
                    iconPosition="left"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Review Reservation
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: REVIEW AND SUBMIT */}
          {currentStep === 3 && (
            <div className="max-w-4xl mx-auto bg-white border border-[#D8E0EA] rounded-2xl p-6 sm:p-10 shadow-sm">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D8E0EA]">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C7A66B]">
                    Step 3 of 3
                  </span>
                  <h2 className="font-serif text-2xl font-medium text-[#062B45]">
                    Review Your Reservation Details
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Guest Details</span>
                </button>
              </div>

              {/* Review Breakdown Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                {/* Left: Summary Items (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {/* Selected Room Card Preview */}
                  <div className="p-4 rounded-xl bg-[#EAF2FF]/40 border border-[#D8E0EA] flex items-center gap-4">
                    <img
                      src={selectedRoom.imageUrl}
                      alt={selectedRoom.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C7A66B]">
                        {selectedRoom.category}
                      </span>
                      <h3 className="font-serif text-lg font-medium text-[#062B45]">
                        {selectedRoom.title}
                      </h3>
                      <p className="text-xs text-[#60758B]">
                        {selectedRoom.bedType} • {selectedRoom.size}
                      </p>
                      <span className="text-xs font-bold text-[#18324A] font-sans">
                        ETB {selectedRoom.pricePerNight} / night
                      </span>
                    </div>
                  </div>

                  {/* Dates & Guests Summary */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-lg border border-[#D8E0EA] bg-white">
                      <span className="text-[10px] uppercase font-bold text-[#60758B] block mb-1">
                        Dates of Stay
                      </span>
                      <strong className="text-xs sm:text-sm text-[#062B45] block">
                        {checkIn} to {checkOut}
                      </strong>
                      <span className="text-[11px] text-[#60758B] mt-0.5 block">
                        {nights} {nights === 1 ? 'Night' : 'Nights'}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-lg border border-[#D8E0EA] bg-white">
                      <span className="text-[10px] uppercase font-bold text-[#60758B] block mb-1">
                        Guests & Rooms
                      </span>
                      <strong className="text-xs sm:text-sm text-[#062B45] block">
                        {adults} Adults {children > 0 ? `, ${children} Children` : ''}
                      </strong>
                      <span className="text-[11px] text-[#60758B] mt-0.5 block">
                        {roomsCount} {roomsCount === 1 ? 'Room' : 'Rooms'}
                      </span>
                    </div>
                  </div>

                  {/* Guest Info */}
                  <div className="p-3.5 rounded-lg border border-[#D8E0EA] bg-white text-xs">
                    <span className="text-[10px] uppercase font-bold text-[#60758B] block mb-1.5">
                      Guest Contact
                    </span>
                    <div className="flex flex-col gap-0.5 text-[#18324A]">
                      <strong>{fullName}</strong>
                      <span className="text-[#60758B]">{email}</span>
                      {phone && <span className="text-[#60758B]">{phone}</span>}
                    </div>
                    {specialRequests && (
                      <div className="mt-2 pt-2 border-t border-[#D8E0EA]/70 text-[#60758B]">
                        <strong>Special Request:</strong> "{specialRequests}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Price Calculation Panel (5 cols) */}
                <div className="lg:col-span-5 bg-gray-50 border border-[#D8E0EA] rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-medium text-[#062B45] pb-3 mb-4 border-b border-[#D8E0EA]">
                      Cost Summary
                    </h4>

                    <div className="flex flex-col gap-2.5 text-xs text-[#60758B]">
                      <div className="flex items-center justify-between">
                        <span>
                          ETB {selectedRoom.pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'}
                        </span>
                        <span>ETB {selectedRoom.pricePerNight * nights}</span>
                      </div>
                      {roomsCount > 1 && (
                        <div className="flex items-center justify-between">
                          <span>Number of Rooms</span>
                          <span>× {roomsCount}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span>Resort Services & Amenities</span>
                        <span className="text-emerald-700 font-medium">Included</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Taxes & Processing Fees</span>
                        <span className="text-[#60758B]">Calculated at Check-in</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-[#D8E0EA]">
                    <div className="flex items-center justify-between text-base font-bold text-[#18324A] mb-2">
                      <span>Estimated Subtotal</span>
                      <span className="text-2xl text-[#062B45] font-sans">ETB {estimatedTotal}</span>
                    </div>
                    <span className="text-[11px] text-[#60758B] block">
                      All prices in ETB. Nightly rate subject to local taxes at check-in.
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="p-4 rounded-xl bg-[#EAF2FF]/60 border border-[#D8E0EA] flex items-start gap-3 text-xs text-[#18324A] mb-6">
                <ShieldCheck className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
                <span>
                  By clicking <strong>"Complete Reservation"</strong>, your booking request will be submitted directly to our reservations desk with status <em>Pending Confirmation</em>. You will immediately receive a confirmation reference code.
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#D8E0EA]">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentStep(2)}
                  icon={<ArrowLeft className="w-4 h-4" />}
                  iconPosition="left"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="gold"
                  size="lg"
                  onClick={handleSubmitBooking}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  Complete Reservation
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS & RESERVATION CONFIRMATION SCREEN */}
          {currentStep === 4 && confirmedBooking && (
            <div className="max-w-3xl mx-auto bg-white border border-[#D8E0EA] rounded-2xl p-6 sm:p-10 shadow-lg text-center">
              {/* Status Header Badge */}
              <div className="w-16 h-16 rounded-full bg-amber-100/80 border border-amber-200 text-[#062B45] flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#C7A66B]" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#C7A66B] animate-pulse" />
                <span>Status: {confirmedBooking.status}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#062B45] mb-2">
                Reservation Request Received
              </h2>

              <p className="text-xs sm:text-sm text-[#60758B] max-w-md mx-auto mb-6">
                Thank you for choosing Skyview Hotels & Resorts. Your reservation request has been received and is currently being processed by our front desk team.
              </p>

              {/* Reference Number Card */}
              <div className="bg-[#EAF2FF]/60 border border-[#D8E0EA] rounded-xl p-4 max-w-md mx-auto mb-8">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#60758B] block mb-1">
                  Booking Reference Number
                </span>
                <span className="font-mono text-2xl font-bold text-[#062B45] tracking-wider select-all">
                  {confirmedBooking.bookingReference}
                </span>
                <span className="text-[10px] text-[#60758B] block mt-1">
                  Please retain this reference code for your records and check-in assistance.
                </span>
              </div>

              {/* Summary Details Card */}
              <div className="bg-gray-50 border border-[#D8E0EA] rounded-xl p-5 text-left text-xs mb-8">
                <h4 className="font-serif text-base font-semibold text-[#062B45] mb-3 pb-2 border-b border-[#D8E0EA]">
                  Reservation Summary
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#18324A]">
                  <div>
                    <span className="text-[#60758B] block text-[11px]">Selected Accommodation</span>
                    <strong>{confirmedBooking.roomTitle}</strong> ({confirmedBooking.roomCategory})
                  </div>
                  <div>
                    <span className="text-[#60758B] block text-[11px]">Dates & Duration</span>
                    <strong>{confirmedBooking.checkIn}</strong> to <strong>{confirmedBooking.checkOut}</strong> ({confirmedBooking.nights} nights)
                  </div>
                  <div>
                    <span className="text-[#60758B] block text-[11px]">Guests & Rooms</span>
                    <strong>{confirmedBooking.adults} Adults</strong>
                    {confirmedBooking.children > 0 && `, ${confirmedBooking.children} Children`} • {confirmedBooking.roomsCount} Room(s)
                  </div>
                  <div>
                    <span className="text-[#60758B] block text-[11px]">Estimated Stay Subtotal</span>
                    <strong className="text-[#062B45] text-sm">ETB {confirmedBooking.totalEstimatedPrice}</strong>
                  </div>
                  <div>
                    <span className="text-[#60758B] block text-[11px]">Guest Name</span>
                    <strong>{confirmedBooking.guestName}</strong>
                  </div>
                  <div>
                    <span className="text-[#60758B] block text-[11px]">Email</span>
                    <strong>{confirmedBooking.guestEmail}</strong>
                  </div>
                </div>
              </div>

              {/* Guest Assistance Notice */}
              <div className="p-4 rounded-xl bg-[#EAF2FF]/50 border border-[#D8E0EA] text-xs text-[#18324A] text-left flex items-start gap-3 mb-8">
                <ShieldCheck className="w-5 h-5 text-[#C7A66B] shrink-0 mt-0.5" />
                <div>
                  <strong className="block mb-0.5 text-[#062B45]">What Happens Next?</strong>
                  <span className="text-[#60758B]">
                    Our reservation concierge is reviewing your stay details. You will receive an arrival email with check-in instructions 48 hours prior to your scheduled stay. For immediate assistance or special requests, please contact our 24/7 reception desk.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  to="/rooms"
                  variant="primary"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore More Rooms
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setCurrentStep(1);
                    setConfirmedBooking(null);
                  }}
                >
                  Make Another Reservation
                </Button>
                <Button to="/" variant="ghost">
                  Return to Homepage
                </Button>
              </div>
            </div>
          )}

          {/* Section: Reservation Status Lookup */}
          <div className="max-w-2xl mx-auto mt-16 pt-10 border-t border-[#D8E0EA]">
            <div className="text-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C7A66B] block mb-1">
                RESERVATION PORTAL
              </span>
              <h3 className="font-serif text-xl font-medium text-[#062B45]">
                Check Your Reservation Status
              </h3>
              <p className="text-xs text-[#60758B] mt-1">
                Enter your booking confirmation reference to view your reservation details and current status.
              </p>
            </div>

            <form onSubmit={handleLookupBooking} className="flex gap-2 max-w-md mx-auto mb-4">
              <input
                type="text"
                placeholder="e.g. SKY-849201"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                className="flex-1 bg-white border border-[#D8E0EA] rounded-lg px-3.5 py-2 text-xs sm:text-sm font-mono text-[#18324A] outline-none focus:border-[#062B45]"
              />
              <button
                type="submit"
                className="bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Lookup
              </button>
            </form>

            {lookupError && (
              <p className="text-center text-xs text-red-600 font-medium">{lookupError}</p>
            )}

            {lookedUpBooking && (
              <div className="mt-4 p-4 rounded-xl bg-white border border-[#D8E0EA] shadow-xs text-xs text-left">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D8E0EA]">
                  <span className="font-mono font-bold text-[#062B45]">
                    {lookedUpBooking.bookingReference}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold text-[10px] border border-amber-200">
                    {lookedUpBooking.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[#18324A]">
                  <div>
                    <span className="text-[#60758B] block text-[10px]">Room:</span>
                    <strong>{lookedUpBooking.roomTitle}</strong>
                  </div>
                  <div>
                    <span className="text-[#60758B] block text-[10px]">Dates:</span>
                    <strong>{lookedUpBooking.checkIn} to {lookedUpBooking.checkOut}</strong>
                  </div>
                  <div>
                    <span className="text-[#60758B] block text-[10px]">Guest:</span>
                    <strong>{lookedUpBooking.guestName}</strong>
                  </div>
                  <div>
                    <span className="text-[#60758B] block text-[10px]">Estimated Total:</span>
                    <strong>ETB {lookedUpBooking.totalEstimatedPrice}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};
