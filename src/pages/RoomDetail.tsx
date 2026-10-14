import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Bed,
  Maximize2,
  Check,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  AlertCircle,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { Button } from '../components/ui/Button';
import { getRoomById, SAMPLE_ROOMS } from '../data/siteData';
import { useHotelStore } from '../store/hotelStore';

export const RoomDetail: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { rooms } = useHotelStore();

  const room = useMemo(() => {
    return rooms.find((r) => r.id === roomId) || getRoomById(roomId);
  }, [rooms, roomId]);

  // Helper for dates
  const getFutureDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  // State for gallery active image
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Booking summary form state (prefilled from URL query params)
  const [checkIn, setCheckIn] = useState<string>(
    () => searchParams.get('checkIn') || getFutureDate(1)
  );
  const [checkOut, setCheckOut] = useState<string>(
    () => searchParams.get('checkOut') || getFutureDate(4)
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
  const [dateError, setDateError] = useState<string>('');

  // Calculate nights and estimated subtotal
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  }, [checkIn, checkOut]);

  const estimatedTotal = useMemo(() => {
    if (!room) return 0;
    return room.pricePerNight * nights * roomsCount;
  }, [room, nights, roomsCount]);

  // Other room suggestions
  const otherRooms = useMemo(() => {
    return SAMPLE_ROOMS.filter((r) => r.id !== roomId).slice(0, 3);
  }, [roomId]);

  // Handle proceed to booking
  const handleProceedToBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(checkOut) <= new Date(checkIn)) {
      setDateError('Check-out date must be after check-in date.');
      return;
    }

    setDateError('');

    const params = new URLSearchParams({
      roomId: room?.id || '',
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      rooms: roomsCount.toString(),
    });

    navigate(`/booking?${params.toString()}`);
  };

  // If Room is not found
  if (!room) {
    return (
      <div className="py-20 bg-gray-50 flex-1 flex flex-col justify-center items-center text-center px-4">
        <ContentContainer size="md">
          <div className="bg-white border border-[#D8E0EA] rounded-2xl p-10 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-3xl font-medium text-[#062B45] mb-3">
              Room Not Found
            </h1>
            <p className="text-sm text-[#60758B] max-w-md mx-auto mb-8">
              We couldn't find the requested accommodation suite. It may have been updated or is currently unavailable.
            </p>
            <Button to="/rooms" variant="primary" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left">
              Return to Rooms & Suites
            </Button>
          </div>
        </ContentContainer>
      </div>
    );
  }

  const galleryImages = room.galleryImages && room.galleryImages.length > 0 ? room.galleryImages : [room.imageUrl];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Breadcrumb Header Bar */}
      <section className="bg-[#EAF2FF]/40 border-b border-[#D8E0EA] py-3.5">
        <ContentContainer size="7xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#60758B]">
            <Link to="/" className="hover:text-[#062B45] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
            <Link to="/rooms" className="hover:text-[#062B45] transition-colors">
              Rooms & Suites
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span className="text-[#062B45] font-semibold">{room.title}</span>
          </nav>
        </ContentContainer>
      </section>

      {/* Main Room Details Content Area */}
      <section className="py-10 sm:py-16">
        <ContentContainer size="7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Title, Gallery, Specs, Full Description, Highlights & Amenities (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Category & Title Header */}
              <div className="mb-6">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#C7A66B] mb-2">
                  {room.category} Collection
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#062B45] leading-tight">
                  {room.title}
                </h1>
                <p className="text-sm sm:text-base text-[#60758B] mt-2">
                  {room.tagline}
                </p>
              </div>

              {/* Gallery: Active Big Image + Thumbnail Strip */}
              <div className="flex flex-col gap-3 mb-8">
                <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden border border-[#D8E0EA] bg-gray-100 shadow-sm">
                  <img
                    src={galleryImages[activeImageIndex]}
                    alt={`${room.title} - View ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-[#062B45]/85 backdrop-blur-xs text-white text-xs font-semibold uppercase px-3 py-1 rounded shadow-xs">
                    {room.category}
                  </span>
                </div>

                {/* Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative aspect-16/10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? 'border-[#062B45] shadow-xs'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Specs Strip: Guests, Beds, Size */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#EAF2FF]/50 border border-[#D8E0EA] mb-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C7A66B] mb-1 shadow-2xs">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] text-[#60758B] uppercase tracking-wider">Capacity</span>
                  <span className="font-semibold text-xs sm:text-sm text-[#062B45]">
                    {room.guests} Guests
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C7A66B] mb-1 shadow-2xs">
                    <Bed className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] text-[#60758B] uppercase tracking-wider">Bed Type</span>
                  <span className="font-semibold text-xs sm:text-sm text-[#062B45]">
                    {room.bedType}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C7A66B] mb-1 shadow-2xs">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] text-[#60758B] uppercase tracking-wider">Room Area</span>
                  <span className="font-semibold text-xs sm:text-sm text-[#062B45]">
                    {room.size}
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-10">
                <h2 className="font-serif text-2xl font-medium text-[#062B45] mb-3">
                  Room Overview
                </h2>
                <p className="text-sm sm:text-base text-[#18324A] leading-relaxed font-light">
                  {room.fullDescription}
                </p>
              </div>

              {/* Room Highlights Cards */}
              <div className="mb-10">
                <h3 className="font-serif text-xl font-medium text-[#062B45] mb-4">
                  Key Suite Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {room.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-gray-50 border border-[#D8E0EA] flex items-center gap-2.5 text-xs sm:text-sm text-[#18324A]"
                    >
                      <Sparkles className="w-4 h-4 text-[#C7A66B] shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comprehensive Amenities List */}
              <div className="mb-10">
                <h3 className="font-serif text-xl font-medium text-[#062B45] mb-4">
                  Complimentary Amenities & Comforts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {room.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-[#60758B]"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#EAF2FF] text-[#062B45] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#C7A66B]" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Cancellation Policy */}
              <div className="p-4 rounded-xl bg-gray-50 border border-[#D8E0EA] flex items-start gap-3 text-xs text-[#60758B] leading-relaxed">
                <ShieldCheck className="w-5 h-5 text-[#C7A66B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#062B45] block mb-0.5">Cancellation Policy</strong>
                  <span>{room.cancellationPolicy}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Booking Summary Panel (5 cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-white border border-[#D8E0EA] rounded-2xl p-6 sm:p-7 shadow-xl">
                {/* Price Display */}
                <div className="flex items-baseline justify-between pb-5 border-b border-[#D8E0EA]">
                  <div>
                    <span className="text-3xl font-bold font-sans text-[#18324A]">
                      ETB {room.pricePerNight}
                    </span>
                    <span className="text-sm text-[#60758B] ml-1">/ night</span>
                  </div>
                  <span className="text-xs text-[#C7A66B] font-semibold uppercase tracking-wider">
                    Best Rate Guarantee
                  </span>
                </div>

                {/* Reservation Form */}
                <form onSubmit={handleProceedToBooking} className="mt-6 flex flex-col gap-4">
                  {/* Check-In / Check-Out Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="detail-check-in"
                        className="text-[11px] font-bold uppercase tracking-wider text-[#062B45]"
                      >
                        Check In
                      </label>
                      <input
                        id="detail-check-in"
                        type="date"
                        value={checkIn}
                        onChange={(e) => {
                          setCheckIn(e.target.value);
                          if (new Date(e.target.value) >= new Date(checkOut)) {
                            setDateError('Check-out date must be after check-in date.');
                          } else {
                            setDateError('');
                          }
                        }}
                        className="w-full bg-[#EAF2FF]/30 border border-[#D8E0EA] rounded-lg p-2.5 text-xs font-medium text-[#18324A] outline-none focus:border-[#062B45]"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="detail-check-out"
                        className="text-[11px] font-bold uppercase tracking-wider text-[#062B45]"
                      >
                        Check Out
                      </label>
                      <input
                        id="detail-check-out"
                        type="date"
                        value={checkOut}
                        onChange={(e) => {
                          setCheckOut(e.target.value);
                          if (new Date(checkIn) >= new Date(e.target.value)) {
                            setDateError('Check-out date must be after check-in date.');
                          } else {
                            setDateError('');
                          }
                        }}
                        className="w-full bg-[#EAF2FF]/30 border border-[#D8E0EA] rounded-lg p-2.5 text-xs font-medium text-[#18324A] outline-none focus:border-[#062B45]"
                        required
                      />
                    </div>
                  </div>

                  {/* Adults & Children */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="detail-adults"
                        className="text-[11px] font-bold uppercase tracking-wider text-[#062B45]"
                      >
                        Adults
                      </label>
                      <select
                        id="detail-adults"
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full bg-[#EAF2FF]/30 border border-[#D8E0EA] rounded-lg p-2.5 text-xs font-medium text-[#18324A] outline-none focus:border-[#062B45]"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Adult' : 'Adults'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="detail-children"
                        className="text-[11px] font-bold uppercase tracking-wider text-[#062B45]"
                      >
                        Children
                      </label>
                      <select
                        id="detail-children"
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                        className="w-full bg-[#EAF2FF]/30 border border-[#D8E0EA] rounded-lg p-2.5 text-xs font-medium text-[#18324A] outline-none focus:border-[#062B45]"
                      >
                        {[0, 1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Child' : 'Children'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Rooms Count */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="detail-rooms"
                      className="text-[11px] font-bold uppercase tracking-wider text-[#062B45]"
                    >
                      Rooms
                    </label>
                    <select
                      id="detail-rooms"
                      value={roomsCount}
                      onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="w-full bg-[#EAF2FF]/30 border border-[#D8E0EA] rounded-lg p-2.5 text-xs font-medium text-[#18324A] outline-none focus:border-[#062B45]"
                    >
                      {[1, 2, 3].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Room' : 'Rooms'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Error Warning */}
                  {dateError && (
                    <div
                      role="alert"
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{dateError}</span>
                    </div>
                  )}

                  {/* Price Breakdown Calculation */}
                  <div className="mt-3 pt-4 border-t border-[#D8E0EA] flex flex-col gap-2 text-xs">
                    <div className="flex items-center justify-between text-[#60758B]">
                      <span>
                        ETB {room.pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'}
                        {roomsCount > 1 ? ` × ${roomsCount} rooms` : ''}
                      </span>
                      <span>ETB {estimatedTotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#60758B]">
                      <span>Taxes & Resort Fees</span>
                      <span className="text-[#60758B] font-medium">Calculated at Check-in</span>
                    </div>
                    <div className="flex items-center justify-between text-base font-bold text-[#18324A] pt-2 border-t border-[#D8E0EA]">
                      <span>Estimated Total</span>
                      <span className="text-xl text-[#062B45] font-sans">ETB {estimatedTotal}</span>
                    </div>
                  </div>

                  {/* Action Button: Book This Room */}
                  <button
                    type="submit"
                    className="w-full mt-3 bg-[#062B45] hover:bg-[#0A3D60] active:bg-[#041D2F] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#C7A66B]" />
                    <span>Reserve Accommodation</span>
                  </button>

                  <p className="text-center text-[11px] text-[#60758B] mt-1">
                    Best Rate Guarantee • Instant Booking Confirmation
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Links to Other Available Rooms */}
          <div className="mt-20 pt-12 border-t border-[#D8E0EA]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C7A66B] block mb-1">
                  MORE EXPERIENCES
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#062B45]">
                  Explore Other Suites
                </h3>
              </div>
              <Link
                to="/rooms"
                className="text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] inline-flex items-center gap-1 transition-colors"
              >
                <span>View Full Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherRooms.map((other) => (
                <div
                  key={other.id}
                  className="group bg-white border border-[#D8E0EA] rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                    <img
                      src={other.imageUrl}
                      alt={other.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#062B45]/85 text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded">
                      {other.category}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-serif text-base font-medium text-[#062B45] group-hover:text-[#C7A66B] transition-colors">
                        {other.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-[#60758B] mt-1.5">
                        <span>{other.guests} Guests</span>
                        <span>•</span>
                        <span>{other.size}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#D8E0EA]">
                      <span className="font-bold text-sm text-[#18324A] font-sans">
                        ETB {other.pricePerNight} <span className="text-xs font-normal text-[#60758B]">/ night</span>
                      </span>
                      <Link
                        to={`/rooms/${other.id}`}
                        className="text-xs font-semibold text-[#062B45] hover:text-[#C7A66B] flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};
