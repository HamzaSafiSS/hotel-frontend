import React, { useState } from 'react';
import {
  PlusCircle,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import type { AdminGalleryItem } from '../../store/hotelStore';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { AdminModal } from '../../components/admin/AdminModal';
import { Button } from '../../components/ui/Button';

const GALLERY_CATEGORIES: { id: AdminGalleryItem['category']; label: string }[] = [
  { id: 'rooms', label: 'Rooms & Suites' },
  { id: 'dining', label: 'Dining' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'property', label: 'Property & Surroundings' },
];

export const AdminGallery: React.FC = () => {
  const {
    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    togglePublishGalleryItem,
  } = useHotelStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<AdminGalleryItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<AdminGalleryItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'property' as AdminGalleryItem['category'],
    caption: '',
    imageUrl: '',
    altText: '',
    displayOrder: 1,
    published: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const openAddForm = () => {
    setIsEditing(false);
    setSelectedImage(null);
    setFormData({
      title: '',
      category: 'property',
      caption: '',
      imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80',
      altText: '',
      displayOrder: gallery.length + 1,
      published: true,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditForm = (item: AdminGalleryItem) => {
    setIsEditing(true);
    setSelectedImage(item);
    setFormData({
      title: item.title,
      category: item.category,
      caption: item.caption,
      imageUrl: item.imageUrl,
      altText: item.altText,
      displayOrder: item.displayOrder || 1,
      published: item.published,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = 'Title is required.';
    if (!formData.imageUrl.trim()) errs.imageUrl = 'Image URL is required.';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedCat = GALLERY_CATEGORIES.find((c) => c.id === formData.category);
    const categoryLabel = matchedCat ? matchedCat.label : 'Property';

    if (isEditing && selectedImage) {
      updateGalleryItem(selectedImage.id, {
        title: formData.title.trim(),
        category: formData.category,
        categoryLabel,
        caption: formData.caption.trim(),
        imageUrl: formData.imageUrl.trim(),
        altText: formData.altText.trim() || formData.title.trim(),
        displayOrder: Number(formData.displayOrder),
        published: formData.published,
      });
    } else {
      addGalleryItem({
        id: `gal-${Date.now()}`,
        title: formData.title.trim(),
        category: formData.category,
        categoryLabel,
        caption: formData.caption.trim(),
        imageUrl: formData.imageUrl.trim(),
        altText: formData.altText.trim() || formData.title.trim(),
        displayOrder: Number(formData.displayOrder),
        published: formData.published,
      });
    }

    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      deleteGalleryItem(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  const sortedGallery = [...gallery].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            VISUAL MEDIA & PHOTOGRAPHY
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45]">
            Gallery Management
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Curate photos displayed in the public Gallery showcase and lightbox.
          </p>
        </div>

        <Button
          onClick={openAddForm}
          variant="gold"
          size="sm"
          icon={<PlusCircle className="w-4 h-4" />}
          iconPosition="left"
        >
          Add Photo
        </Button>
      </div>

      {/* Gallery Table (Direct list, no search/filter panels as required) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 w-12 text-center">Order</th>
                <th className="py-3.5 px-4">Photo Preview</th>
                <th className="py-3.5 px-4">Title & Caption</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-center">Publication</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedGallery.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No photos found in gallery. Click "Add Photo" to add one.
                  </td>
                </tr>
              ) : (
                sortedGallery.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                      {item.displayOrder}
                    </td>

                    <td className="py-3.5 px-4">
                      <img
                        src={item.imageUrl}
                        alt={item.altText || item.title}
                        className="w-16 h-12 object-cover rounded-md border border-slate-200 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#062B45] leading-snug">
                        {item.title}
                      </p>
                      {item.caption && (
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 max-w-md">
                          {item.caption}
                        </p>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-[#EAF2FF] text-[#062B45]">
                        {item.categoryLabel || item.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => togglePublishGalleryItem(item.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          item.published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle publication"
                      >
                        {item.published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditForm(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#C7A66B] hover:bg-amber-50 transition-colors"
                          title="Edit Photo"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Photo"
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

      {/* ADD / EDIT MODAL */}
      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={isEditing ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
        subtitle="Manage image metadata and public category categorization"
        maxWidth="md"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Photo Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Sunset Terrace Ocean View"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {formErrors.title && (
              <p className="text-[11px] text-rose-600 mt-1">{formErrors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as AdminGalleryItem['category'] })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B] bg-white"
              >
                {GALLERY_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Display Order
              </label>
              <input
                type="number"
                min="1"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Image URL *
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {formErrors.imageUrl && (
              <p className="text-[11px] text-rose-600 mt-1">{formErrors.imageUrl}</p>
            )}
          </div>

          {/* Graceful image preview */}
          {formData.imageUrl && (
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                Image Preview
              </span>
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="h-28 w-full object-cover rounded-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Caption
            </label>
            <textarea
              rows={2}
              value={formData.caption}
              onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              placeholder="Descriptive sentence displayed in photo lightbox..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Accessible Alt Text
            </label>
            <input
              type="text"
              value={formData.altText}
              onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
              placeholder="Concise description for screen readers"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded text-[#062B45] focus:ring-[#C7A66B]"
              />
              <span>Published in Public Gallery</span>
            </label>
          </div>

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
              {isEditing ? 'Save Changes' : 'Add Photo'}
            </Button>
          </div>
        </form>
      </AdminModal>

      {/* DELETE CONFIRMATION DIALOG */}
      <AdminConfirmModal
        isOpen={Boolean(deleteCandidate)}
        title="Delete Gallery Photo"
        message={`Are you sure you want to delete "${deleteCandidate?.title}"? It will be removed immediately from the public gallery.`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
};
