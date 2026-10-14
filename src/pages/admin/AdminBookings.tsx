import React, { useState } from 'react';
import {
  Eye,
  Edit2,
  Trash2,
  XCircle,
  Info,
  User,
  BedDouble,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import type { AdminBookingRecord, BookingStatus } from '../../store/hotelStore';
import { AdminBadge } from '../../components/admin/AdminBadge';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { AdminModal } from '../../components/admin/AdminModal';
import { Button } from '../../components/ui/Button';

export const AdminBookings: React.FC = () => {
  const {
    bookings,
    updateBooking,
    updateBookingStatus,
    deleteBooking,
    settings,
  } = useHotelStore();

  const [selectedBooking, setSelectedBooking] = useState<AdminBookingRecord | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<AdminBookingRecord | null>(null);

  // Edit form state
  const [editData, setEditData] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    roomsCount: 1,
    status: 'Pending' as BookingStatus,
    specialRequests: '',
  });
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});

  const openDetailView = (booking: AdminBookingRecord) => {
    setSelectedBooking(booking);
    setIsDetailOpen(true);
  };

  const openEditModal = (booking: AdminBookingRecord) => {
    setSelectedBooking(booking);
    setEditData({
      guestName: booking.guestName,
      guestEmail: booking.guestEmail,
      guestPhone: booking.guestPhone || '',
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      adults: booking.adults,
      children: booking.children,
      roomsCount: booking.roomsCount,
      status: booking.status,
      specialRequests: booking.specialRequests || '',
    });
    setEditErrors({});
    setIsEditOpen(true);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!editData.guestName.trim()) {
      errs.guestName = 'Guest name is required.';
    }

    if (!editData.guestEmail.trim()) {
      errs.guestEmail = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.guestEmail.trim())) {
      errs.guestEmail = 'Please provide a valid email format.';
    }

    if (!editData.checkIn) {
      errs.checkIn = 'Check-in date is required.';
    }

    if (!editData.checkOut) {
      errs.checkOut = 'Check-out date is required.';
    } else if (editData.checkIn && editData.checkOut <= editData.checkIn) {
      errs.checkOut = 'Check-out date must be strictly after check-in date.';
    }

    setEditErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !selectedBooking) return;

    // Recalculate nights
    const start = new Date(editData.checkIn);
    const end = new Date(editData.checkOut);
    const diffDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    const totalEst = diffDays * selectedBooking.pricePerNight * editData.roomsCount;

    updateBooking(selectedBooking.bookingReference, {
      guestName: editData.guestName.trim(),
      guestEmail: editData.guestEmail.trim(),
      guestPhone: editData.guestPhone.trim() || undefined,
      checkIn: editData.checkIn,
      checkOut: editData.checkOut,
      nights: diffDays,
      adults: Number(editData.adults),
      children: Number(editData.children),
      roomsCount: Number(editData.roomsCount),
      totalEstimatedPrice: totalEst,
      status: editData.status,
      specialRequests: editData.specialRequests.trim() || undefined,
    });

    setIsEditOpen(false);
  };

  const handleCancelBooking = (reference: string) => {
    updateBookingStatus(reference, 'Cancelled');
    if (selectedBooking && selectedBooking.bookingReference === reference) {
      setSelectedBooking({ ...selectedBooking, status: 'Cancelled' });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      deleteBooking(deleteCandidate.bookingReference);
      setDeleteCandidate(null);
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed':
        return <AdminBadge label="Confirmed" variant="success" />;
      case 'Cancelled':
        return <AdminBadge label="Cancelled" variant="danger" />;
      case 'Completed':
        return <AdminBadge label="Completed" variant="info" />;
      case 'Pending Confirmation':
      case 'Pending':
      default:
        return <AdminBadge label="Pending" variant="warning" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            RESERVATIONS & GUEST STAYS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45]">
            Demo Booking Management
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Review and manage demonstration reservations created across the website booking flow.
          </p>
        </div>

        <div className="bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 text-[#C7A66B] shrink-0" />
          <span>Interactive local simulation only.</span>
        </div>
      </div>

      {/* Bookings Table (Direct list, no search/filter panels as required) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Reference</th>
                <th className="py-3.5 px-4">Guest Details</th>
                <th className="py-3.5 px-4">Room & Nights</th>
                <th className="py-3.5 px-4">Stay Dates</th>
                <th className="py-3.5 px-4">Guests</th>
                <th className="py-3.5 px-4">Total Rate</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No booking records found. You can submit one on the public booking page.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.bookingReference} className="hover:bg-slate-50/70 transition-colors">
                    {/* Reference */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-semibold text-[#062B45] block">
                        {b.bookingReference}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {b.createdAt}
                      </span>
                    </td>

                    {/* Guest details */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#062B45]">{b.guestName}</p>
                      <p className="text-[11px] text-slate-500">{b.guestEmail}</p>
                    </td>

                    {/* Room */}
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-[#062B45]">{b.roomTitle}</p>
                      <p className="text-[11px] text-slate-500">
                        {b.nights} {b.nights === 1 ? 'night' : 'nights'} • {b.roomsCount} room(s)
                      </p>
                    </td>

                    {/* Dates */}
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="block">{b.checkIn}</span>
                      <span className="text-[11px] text-slate-400">to {b.checkOut}</span>
                    </td>

                    {/* Guests */}
                    <td className="py-3.5 px-4 text-slate-700">
                      <span>{b.adults} Adults</span>
                      {b.children > 0 && (
                        <span className="text-slate-400 text-[11px] block">{b.children} Children</span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold text-[#062B45]">
                      {settings.currencySymbol}{b.totalEstimatedPrice}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      {getStatusBadge(b.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openDetailView(b)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#062B45] hover:bg-slate-100 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(b)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#C7A66B] hover:bg-amber-50 transition-colors"
                          title="Edit Booking"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleCancelBooking(b.bookingReference)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                            title="Cancel Booking"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setDeleteCandidate(b)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Booking Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedBooking && (
        <AdminModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={`Booking ${selectedBooking.bookingReference}`}
          subtitle={`Placed: ${selectedBooking.createdAt} • Demonstration Record`}
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Status</span>
                <div className="mt-0.5">{getStatusBadge(selectedBooking.status)}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Est. Price</span>
                <span className="text-base font-bold text-[#062B45]">
                  {settings.currencySymbol}{selectedBooking.totalEstimatedPrice}
                </span>
              </div>
            </div>

            {/* Quick status updater */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-[#EAF2FF]/50 border border-[#D8E0EA]">
              <span className="text-xs text-[#062B45] font-semibold">Change status:</span>
              <div className="flex items-center gap-1">
                {(['Pending', 'Confirmed', 'Completed', 'Cancelled'] as BookingStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      updateBookingStatus(selectedBooking.bookingReference, st);
                      setSelectedBooking({ ...selectedBooking, status: st });
                    }}
                    className={`text-[11px] px-2 py-0.5 rounded font-medium transition-colors ${
                      selectedBooking.status === st
                        ? 'bg-[#062B45] text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-[#062B45] mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C7A66B]" />
                  <span>Guest Information</span>
                </h4>
                <p><strong>Name:</strong> {selectedBooking.guestName}</p>
                <p><strong>Email:</strong> {selectedBooking.guestEmail}</p>
                {selectedBooking.guestPhone && <p><strong>Phone:</strong> {selectedBooking.guestPhone}</p>}
              </div>

              <div className="p-3 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-[#062B45] mb-2 flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5 text-[#C7A66B]" />
                  <span>Stay Details</span>
                </h4>
                <p><strong>Room:</strong> {selectedBooking.roomTitle} ({selectedBooking.roomCategory})</p>
                <p><strong>Check-In:</strong> {selectedBooking.checkIn}</p>
                <p><strong>Check-Out:</strong> {selectedBooking.checkOut}</p>
                <p><strong>Duration:</strong> {selectedBooking.nights} night(s)</p>
                <p><strong>Guests:</strong> {selectedBooking.adults} Adults, {selectedBooking.children} Children</p>
                {selectedBooking.specialRequests && (
                  <p className="mt-2 text-slate-600 italic">
                    <strong>Special Requests:</strong> "{selectedBooking.specialRequests}"
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsDetailOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </AdminModal>
      )}

      {/* EDIT MODAL */}
      <AdminModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Demo Booking"
        subtitle={selectedBooking ? `Reference: ${selectedBooking.bookingReference}` : ''}
        maxWidth="md"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Guest Name *
            </label>
            <input
              type="text"
              value={editData.guestName}
              onChange={(e) => setEditData({ ...editData, guestName: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {editErrors.guestName && (
              <p className="text-[11px] text-rose-600 mt-1">{editErrors.guestName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Guest Email *
              </label>
              <input
                type="email"
                value={editData.guestEmail}
                onChange={(e) => setEditData({ ...editData, guestEmail: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {editErrors.guestEmail && (
                <p className="text-[11px] text-rose-600 mt-1">{editErrors.guestEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Guest Phone
              </label>
              <input
                type="tel"
                value={editData.guestPhone}
                onChange={(e) => setEditData({ ...editData, guestPhone: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Check-In Date *
              </label>
              <input
                type="date"
                value={editData.checkIn}
                onChange={(e) => setEditData({ ...editData, checkIn: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {editErrors.checkIn && (
                <p className="text-[11px] text-rose-600 mt-1">{editErrors.checkIn}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Check-Out Date *
              </label>
              <input
                type="date"
                value={editData.checkOut}
                onChange={(e) => setEditData({ ...editData, checkOut: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {editErrors.checkOut && (
                <p className="text-[11px] text-rose-600 mt-1">{editErrors.checkOut}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Adults
              </label>
              <input
                type="number"
                min="1"
                value={editData.adults}
                onChange={(e) => setEditData({ ...editData, adults: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Children
              </label>
              <input
                type="number"
                min="0"
                value={editData.children}
                onChange={(e) => setEditData({ ...editData, children: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Status
              </label>
              <select
                value={editData.status}
                onChange={(e) => setEditData({ ...editData, status: e.target.value as BookingStatus })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B] bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Special Requests
            </label>
            <textarea
              rows={2}
              value={editData.specialRequests}
              onChange={(e) => setEditData({ ...editData, specialRequests: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsEditOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gold" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </AdminModal>

      {/* DELETE CONFIRMATION DIALOG */}
      <AdminConfirmModal
        isOpen={Boolean(deleteCandidate)}
        title="Delete Booking Record"
        message={`Are you sure you want to delete reservation record "${deleteCandidate?.bookingReference}" for ${deleteCandidate?.guestName}?`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
};
