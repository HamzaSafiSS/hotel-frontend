import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, BedDouble, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const QuickSearchPanel: React.FC = () => {
  const navigate = useNavigate();

  // Helper to get formatted date string (YYYY-MM-DD)
  const getFutureDate = (daysAhead: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState<string>(() => getFutureDate(1));
  const [checkOut, setCheckOut] = useState<string>(() => getFutureDate(4));
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);

    if (newCheckIn && checkOut && new Date(newCheckIn) >= new Date(checkOut)) {
      setErrorMessage('Check-out date must be after check-in date.');
    } else {
      setErrorMessage('');
    }
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOut = e.target.value;
    setCheckOut(newCheckOut);

    if (checkIn && newCheckOut && new Date(checkIn) >= new Date(newCheckOut)) {
      setErrorMessage('Check-out date must be after check-in date.');
    } else {
      setErrorMessage('');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      setErrorMessage('Please select both check-in and check-out dates.');
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      setErrorMessage('Check-out date must be after check-in date.');
      return;
    }

    setErrorMessage('');

    // Build URL query parameters
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString(),
    });

    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-7 shadow-2xl border border-white/60 text-[#18324A] relative">
        <form onSubmit={handleSearch} className="flex flex-col gap-4">
          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 items-end">
            {/* 1. Check-In Date */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="check-in-date"
                className="text-[11px] font-bold uppercase tracking-wider text-[#062B45] flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C7A66B]" />
                <span>Check In</span>
              </label>
              <input
                id="check-in-date"
                type="date"
                value={checkIn}
                onChange={handleCheckInChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-[#EAF2FF]/40 border border-[#D8E0EA] hover:border-[#062B45]/40 focus:border-[#062B45] focus:ring-2 focus:ring-[#C7A66B]/30 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium text-[#18324A] outline-none transition-all cursor-pointer"
                required
              />
            </div>

            {/* 2. Check-Out Date */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="check-out-date"
                className="text-[11px] font-bold uppercase tracking-wider text-[#062B45] flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C7A66B]" />
                <span>Check Out</span>
              </label>
              <input
                id="check-out-date"
                type="date"
                value={checkOut}
                onChange={handleCheckOutChange}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="w-full bg-[#EAF2FF]/40 border border-[#D8E0EA] hover:border-[#062B45]/40 focus:border-[#062B45] focus:ring-2 focus:ring-[#C7A66B]/30 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium text-[#18324A] outline-none transition-all cursor-pointer"
                required
              />
            </div>

            {/* 3. Adults */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="search-adults"
                className="text-[11px] font-bold uppercase tracking-wider text-[#062B45] flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-[#C7A66B]" />
                <span>Adults</span>
              </label>
              <select
                id="search-adults"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full bg-[#EAF2FF]/40 border border-[#D8E0EA] hover:border-[#062B45]/40 focus:border-[#062B45] focus:ring-2 focus:ring-[#C7A66B]/30 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium text-[#18324A] outline-none transition-all cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Children */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="search-children"
                className="text-[11px] font-bold uppercase tracking-wider text-[#062B45] flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-[#C7A66B]" />
                <span>Children</span>
              </label>
              <select
                id="search-children"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full bg-[#EAF2FF]/40 border border-[#D8E0EA] hover:border-[#062B45]/40 focus:border-[#062B45] focus:ring-2 focus:ring-[#C7A66B]/30 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium text-[#18324A] outline-none transition-all cursor-pointer"
              >
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Rooms */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="search-rooms"
                className="text-[11px] font-bold uppercase tracking-wider text-[#062B45] flex items-center gap-1.5"
              >
                <BedDouble className="w-3.5 h-3.5 text-[#C7A66B]" />
                <span>Rooms</span>
              </label>
              <select
                id="search-rooms"
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="w-full bg-[#EAF2FF]/40 border border-[#D8E0EA] hover:border-[#062B45]/40 focus:border-[#062B45] focus:ring-2 focus:ring-[#C7A66B]/30 rounded-lg px-3 py-2.5 text-xs sm:text-sm font-medium text-[#18324A] outline-none transition-all cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Room' : 'Rooms'}
                  </option>
                ))}
              </select>
            </div>

            {/* 6. Search Submit Button */}
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="w-full h-[42px] bg-[#062B45] hover:bg-[#0A3D60] active:bg-[#041D2F] text-white font-medium text-xs sm:text-sm rounded-lg px-4 flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B] focus-visible:ring-offset-2"
              >
                <span>Search Rooms</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Validation Error Message */}
          {errorMessage && (
            <div
              role="alert"
              className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-fadeIn"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Subtitle / Portfolio Note */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#60758B] pt-2 border-t border-[#D8E0EA]/70 gap-2">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A66B]" />
              <span>Demonstration Search — Navigates to Rooms & Suites with specified filters</span>
            </span>
            <span className="italic text-[#062B45]/80 font-serif">
              "More than a stay — it's an unforgettable experience"
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
