import React, { useState } from 'react';
import {
  PlusCircle,
  Edit2,
  Trash2,
  Eye,
  ExternalLink,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import type { AdminRoomItem } from '../../store/hotelStore';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { AdminModal } from '../../components/admin/AdminModal';
import { Button } from '../../components/ui/Button';

export const AdminRooms: React.FC = () => {
  const {
    rooms,
    addRoom,
    updateRoom,
    deleteRoom,
    togglePublishRoom,
    toggleActiveRoom,
    settings,
  } = useHotelStore();

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<AdminRoomItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<AdminRoomItem | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'Suite',
    tagline: '',
    description: '',
    fullDescription: '',
    pricePerNight: 150,
    guests: 2,
    bedType: '1 King Bed',
    size: '40 m²',
    imageUrl: '',
    galleryImagesText: '',
    amenitiesText: '',
    published: true,
    active: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const openAddForm = () => {
    setIsEditing(false);
    setSelectedRoom(null);
    setFormData({
      id: '',
      title: '',
      category: 'Suite',
      tagline: '',
      description: '',
      fullDescription: '',
      pricePerNight: 150,
      guests: 2,
      bedType: '1 King Bed',
      size: '40 m²',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      galleryImagesText: '',
      amenitiesText: 'High-Speed Wi-Fi, King Bed, Marble Bath, Ocean Balcony, Climate Control',
      published: true,
      active: true,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditForm = (room: AdminRoomItem) => {
    setIsEditing(true);
    setSelectedRoom(room);
    setFormData({
      id: room.id,
      title: room.title,
      category: room.category,
      tagline: room.tagline || '',
      description: room.description,
      fullDescription: room.fullDescription || room.description,
      pricePerNight: room.pricePerNight,
      guests: room.guests,
      bedType: room.bedType,
      size: room.size,
      imageUrl: room.imageUrl,
      galleryImagesText: (room.galleryImages || []).join('\n'),
      amenitiesText: (room.amenities || []).join(', '),
      published: room.published,
      active: room.active,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openDetailView = (room: AdminRoomItem) => {
    setSelectedRoom(room);
    setIsDetailOpen(true);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.title.trim()) {
      errs.title = 'Room title is required.';
    }

    if (!isEditing) {
      if (!formData.id.trim()) {
        errs.id = 'Unique identifier (slug) is required.';
      } else if (!/^[a-z0-9-]+$/.test(formData.id.trim())) {
        errs.id = 'Slug must contain only lowercase letters, numbers, and hyphens (e.g., luxury-penthouse).';
      } else if (rooms.some((r) => r.id === formData.id.trim())) {
        errs.id = 'This identifier already exists. Please choose a unique slug.';
      }
    }

    if (!formData.description.trim()) {
      errs.description = 'Short description is required.';
    }

    if (Number(formData.pricePerNight) <= 0 || isNaN(Number(formData.pricePerNight))) {
      errs.pricePerNight = 'Price must be a positive number.';
    }

    if (Number(formData.guests) < 1 || isNaN(Number(formData.guests))) {
      errs.guests = 'Maximum guests must be at least 1.';
    }

    if (!formData.imageUrl.trim()) {
      errs.imageUrl = 'Main image URL is required.';
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedGallery = formData.galleryImagesText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const parsedAmenities = formData.amenitiesText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (isEditing && selectedRoom) {
      updateRoom(selectedRoom.id, {
        title: formData.title.trim(),
        category: formData.category,
        tagline: formData.tagline.trim(),
        description: formData.description.trim(),
        fullDescription: formData.fullDescription.trim() || formData.description.trim(),
        pricePerNight: Number(formData.pricePerNight),
        guests: Number(formData.guests),
        bedType: formData.bedType.trim(),
        size: formData.size.trim(),
        imageUrl: formData.imageUrl.trim(),
        galleryImages: parsedGallery.length > 0 ? parsedGallery : [formData.imageUrl.trim()],
        amenities: parsedAmenities,
        published: formData.published,
        active: formData.active,
      });
    } else {
      addRoom({
        id: formData.id.trim(),
        title: formData.title.trim(),
        category: formData.category,
        tagline: formData.tagline.trim(),
        description: formData.description.trim(),
        fullDescription: formData.fullDescription.trim() || formData.description.trim(),
        pricePerNight: Number(formData.pricePerNight),
        guests: Number(formData.guests),
        bedType: formData.bedType.trim(),
        size: formData.size.trim(),
        imageUrl: formData.imageUrl.trim(),
        galleryImages: parsedGallery.length > 0 ? parsedGallery : [formData.imageUrl.trim()],
        keyAmenities: parsedAmenities.slice(0, 4),
        amenities: parsedAmenities,
        highlights: ['Scenic views', 'Luxury linen', 'Dedicated hospitality'],
        cancellationPolicy: 'Complimentary cancellation up to 48 hours prior to arrival.',
        published: formData.published,
        active: formData.active,
      });
    }

    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      deleteRoom(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            INVENTORY & ACCOMMODATIONS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45]">
            Rooms & Suites Management
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Manage accommodations displayed on the public website. Unpublished rooms will not appear in the catalog or booking flow.
          </p>
        </div>

        <Button
          onClick={openAddForm}
          variant="gold"
          size="sm"
          icon={<PlusCircle className="w-4 h-4" />}
          iconPosition="left"
        >
          Add New Room
        </Button>
      </div>

      {/* Rooms Table (Direct list, no search/filter panels as required) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Room & Visual</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price / Night</th>
                <th className="py-3.5 px-4">Capacity & Bed</th>
                <th className="py-3.5 px-4">Room Size</th>
                <th className="py-3.5 px-4 text-center">Publication</th>
                <th className="py-3.5 px-4 text-center">Active Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No rooms available in the catalog. Click "Add New Room" to create one.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Visual & Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={room.imageUrl}
                          alt={room.title}
                          className="w-14 h-11 object-cover rounded-md border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <div>
                          <p className="font-semibold text-[#062B45] leading-snug">
                            {room.title}
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            /{room.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-[#EAF2FF] text-[#062B45]">
                        {room.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-semibold text-[#062B45]">
                      {settings.currencySymbol} {room.pricePerNight}
                    </td>

                    {/* Capacity & Bed */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{room.guests} Guests</div>
                      <div className="text-[11px] text-slate-400">{room.bedType}</div>
                    </td>

                    {/* Size */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {room.size}
                    </td>

                    {/* Publication Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => togglePublishRoom(room.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          room.published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle publication status"
                      >
                        {room.published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    {/* Active Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleActiveRoom(room.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          room.active
                            ? 'bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                        }`}
                        title="Click to toggle active status"
                      >
                        {room.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openDetailView(room)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#062B45] hover:bg-slate-100 transition-colors"
                          title="View Room Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditForm(room)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#C7A66B] hover:bg-amber-50 transition-colors"
                          title="Edit Room"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(room)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Room"
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

      {/* ADD / EDIT ROOM MODAL */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={isEditing ? 'Edit Accommodation' : 'Add New Accommodation'}
        subtitle="Manage room details displayed on the public catalog and booking choices"
        maxWidth="xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Room Name *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Presidential Ocean Penthouse"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {formErrors.title && (
                <p className="text-[11px] text-rose-600 mt-1">{formErrors.title}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Identifier / URL Slug *
              </label>
              <input
                type="text"
                disabled={isEditing}
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="e.g., ocean-penthouse"
                className={`w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B] ${
                  isEditing ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''
                }`}
              />
              {formErrors.id && (
                <p className="text-[11px] text-rose-600 mt-1">{formErrors.id}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B] bg-white"
              >
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
                <option value="Villa">Villa</option>
                <option value="Family">Family</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Price per Night ({settings.currencySymbol}) *
              </label>
              <input
                type="number"
                min="1"
                value={formData.pricePerNight}
                onChange={(e) => setFormData({ ...formData, pricePerNight: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {formErrors.pricePerNight && (
                <p className="text-[11px] text-rose-600 mt-1">{formErrors.pricePerNight}</p>
              )}
            </div>

            {/* Guests */}
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Max Guests *
              </label>
              <input
                type="number"
                min="1"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {formErrors.guests && (
                <p className="text-[11px] text-rose-600 mt-1">{formErrors.guests}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bed Type */}
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Bed Configuration
              </label>
              <input
                type="text"
                value={formData.bedType}
                onChange={(e) => setFormData({ ...formData, bedType: e.target.value })}
                placeholder="e.g., 1 King Bed or 2 Queen Beds"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>

            {/* Room Size */}
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Room Size
              </label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                placeholder="e.g., 45 m²"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Short Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g., Panoramic sunset horizons with a private sun-drenched balcony"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Short Description *
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief summary displayed on room cards..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {formErrors.description && (
              <p className="text-[11px] text-rose-600 mt-1">{formErrors.description}</p>
            )}
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Detailed Description
            </label>
            <textarea
              rows={3}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Comprehensive room narrative displayed on the individual room detail page..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
          </div>

          {/* Main Image URL */}
          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Main Image URL *
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {formErrors.imageUrl && (
              <p className="text-[11px] text-rose-600 mt-1">{formErrors.imageUrl}</p>
            )}
          </div>

          {/* Gallery Images (one per line) */}
          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Additional Gallery Images (one URL per line)
            </label>
            <textarea
              rows={2}
              value={formData.galleryImagesText}
              onChange={(e) => setFormData({ ...formData, galleryImagesText: e.target.value })}
              placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B] font-mono"
            />
          </div>

          {/* Amenities (comma separated) */}
          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Amenities (comma-separated)
            </label>
            <input
              type="text"
              value={formData.amenitiesText}
              onChange={(e) => setFormData({ ...formData, amenitiesText: e.target.value })}
              placeholder="Complimentary Wi-Fi, 1 King Bed, Marble Bath, Espresso Machine"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
          </div>

          {/* Publication and Active toggles */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded text-[#062B45] focus:ring-[#C7A66B]"
              />
              <span>Published on Website</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 rounded text-[#062B45] focus:ring-[#C7A66B]"
              />
              <span>Active in Demonstration</span>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsFormOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gold" size="sm">
              {isEditing ? 'Save Changes' : 'Create Room'}
            </Button>
          </div>
        </form>
      </AdminModal>

      {/* DETAIL MODAL */}
      {selectedRoom && (
        <AdminModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={selectedRoom.title}
          subtitle={`Category: ${selectedRoom.category} • ID: ${selectedRoom.id}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <img
              src={selectedRoom.imageUrl}
              alt={selectedRoom.title}
              className="w-full h-52 object-cover rounded-xl border border-slate-200"
            />

            <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Rate</span>
                <span className="font-bold text-[#062B45] text-sm">
                  {settings.currencySymbol} {selectedRoom.pricePerNight} / night
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Capacity</span>
                <span className="font-semibold text-slate-700">{selectedRoom.guests} Guests</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Size</span>
                <span className="font-semibold text-slate-700">{selectedRoom.size}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Description
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedRoom.fullDescription || selectedRoom.description}
              </p>
            </div>

            {selectedRoom.amenities && selectedRoom.amenities.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Amenities
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRoom.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[11px] bg-[#EAF2FF] text-[#062B45] border border-[#D8E0EA]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <a
                href={`/rooms/${selectedRoom.id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#062B45] hover:text-[#C7A66B] font-medium"
              >
                <span>View Public Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

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

      {/* DELETE CONFIRMATION DIALOG */}
      <AdminConfirmModal
        isOpen={Boolean(deleteCandidate)}
        title="Delete Room Record"
        message={`Are you sure you want to delete "${deleteCandidate?.title}" (${deleteCandidate?.id})? This will immediately remove it from public room listings and booking availability.`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
};
