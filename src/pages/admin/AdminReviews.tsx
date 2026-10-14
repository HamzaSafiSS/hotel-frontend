import React, { useState } from 'react';
import {
  PlusCircle,
  Edit2,
  Trash2,
  Star,
  Info,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import type { AdminReviewItem } from '../../store/hotelStore';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { AdminModal } from '../../components/admin/AdminModal';
import { Button } from '../../components/ui/Button';

export const AdminReviews: React.FC = () => {
  const {
    reviews,
    addReview,
    updateReview,
    deleteReview,
    togglePublishReview,
  } = useHotelStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<AdminReviewItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<AdminReviewItem | null>(null);

  const [formData, setFormData] = useState({
    guestName: '',
    location: '',
    roomType: 'Ocean View Suite',
    stayDate: 'Recent Stay',
    rating: 5,
    title: '',
    comment: '',
    highlightsText: '',
    displayOrder: 1,
    published: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const openAddForm = () => {
    setIsEditing(false);
    setSelectedReview(null);
    setFormData({
      guestName: '',
      location: 'New York, NY',
      roomType: 'Ocean View Suite',
      stayDate: 'Autumn Stay',
      rating: 5,
      title: '',
      comment: '',
      highlightsText: 'Warm hospitality\nScenic ocean balcony\nAcoustic comfort',
      displayOrder: reviews.length + 1,
      published: true,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditForm = (review: AdminReviewItem) => {
    setIsEditing(true);
    setSelectedReview(review);
    setFormData({
      guestName: review.guestName,
      location: review.location || '',
      roomType: review.roomType || 'Deluxe Room',
      stayDate: review.stayDate || 'Recent Stay',
      rating: review.rating || 5,
      title: review.title || '',
      comment: review.comment,
      highlightsText: (review.highlights || []).join('\n'),
      displayOrder: review.displayOrder || 1,
      published: review.published,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.guestName.trim()) errs.guestName = 'Guest name is required.';
    if (!formData.comment.trim()) errs.comment = 'Review commentary is required.';
    if (!formData.title.trim()) errs.title = 'Review headline is required.';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedHighlights = formData.highlightsText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (isEditing && selectedReview) {
      updateReview(selectedReview.id, {
        guestName: formData.guestName.trim(),
        location: formData.location.trim(),
        roomType: formData.roomType.trim(),
        stayDate: formData.stayDate.trim(),
        rating: Number(formData.rating),
        title: formData.title.trim(),
        comment: formData.comment.trim(),
        highlights: parsedHighlights,
        displayOrder: Number(formData.displayOrder),
        published: formData.published,
      });
    } else {
      addReview({
        id: `rev-${Date.now()}`,
        guestName: formData.guestName.trim(),
        location: formData.location.trim(),
        roomType: formData.roomType.trim(),
        stayDate: formData.stayDate.trim(),
        rating: Number(formData.rating),
        title: formData.title.trim(),
        comment: formData.comment.trim(),
        highlights: parsedHighlights,
        displayOrder: Number(formData.displayOrder),
        published: formData.published,
      });
    }

    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      deleteReview(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            TESTIMONIALS & GUEST STORIES
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45]">
            Guest Reviews Management
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Curate sample guest stories displayed on the homepage and Guest Reviews page.
          </p>
        </div>

        <Button
          onClick={openAddForm}
          variant="gold"
          size="sm"
          icon={<PlusCircle className="w-4 h-4" />}
          iconPosition="left"
        >
          Add Testimonial
        </Button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-amber-900">
        <Info className="w-4 h-4 text-[#C7A66B] shrink-0" />
        <span>Demonstration Content: Testimonials represent sample showcase items for portfolio illustration.</span>
      </div>

      {/* Reviews Table (Direct list, no search/filter panels as required) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 w-12 text-center">Order</th>
                <th className="py-3.5 px-4">Guest & Origin</th>
                <th className="py-3.5 px-4">Room & Stay</th>
                <th className="py-3.5 px-4">Rating & Headline</th>
                <th className="py-3.5 px-4">Commentary Preview</th>
                <th className="py-3.5 px-4 text-center">Publication</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedReviews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No testimonials found. Click "Add Testimonial" to create one.
                  </td>
                </tr>
              ) : (
                sortedReviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                      {rev.displayOrder}
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#062B45]">{rev.guestName}</p>
                      <p className="text-[11px] text-slate-500">{rev.location}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-[#EAF2FF] text-[#062B45]">
                        {rev.roomType}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{rev.stayDate}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-[#062B45] mt-0.5 truncate max-w-[180px]">
                        {rev.title}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                      <p className="line-clamp-2 text-[11px] leading-relaxed">
                        {rev.comment}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => togglePublishReview(rev.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          rev.published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle publication"
                      >
                        {rev.published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditForm(rev)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#C7A66B] hover:bg-amber-50 transition-colors"
                          title="Edit Testimonial"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(rev)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Testimonial"
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
        title={isEditing ? 'Edit Sample Testimonial' : 'Add Sample Testimonial'}
        subtitle="Manage guest story and rating for the reviews page"
        maxWidth="md"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Guest Name *
              </label>
              <input
                type="text"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="e.g., Sarah & John Mitchell"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {formErrors.guestName && (
                <p className="text-[11px] text-rose-600 mt-1">{formErrors.guestName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Guest Location / City
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., San Francisco, CA"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Room Type
              </label>
              <input
                type="text"
                value={formData.roomType}
                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                placeholder="Ocean View Suite"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Stay Period
              </label>
              <input
                type="text"
                value={formData.stayDate}
                onChange={(e) => setFormData({ ...formData, stayDate: e.target.value })}
                placeholder="Recent Stay"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Rating (1 to 5)
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B] bg-white"
              >
                <option value="5">5 Stars (Exceptional)</option>
                <option value="4">4 Stars (Great)</option>
                <option value="3">3 Stars (Average)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Headline Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., An Unforgettable Coastal Horizon"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {formErrors.title && (
              <p className="text-[11px] text-rose-600 mt-1">{formErrors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Review Content *
            </label>
            <textarea
              rows={3}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Detailed testimonial text..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {formErrors.comment && (
              <p className="text-[11px] text-rose-600 mt-1">{formErrors.comment}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Highlights (one per line)
              </label>
              <textarea
                rows={2}
                value={formData.highlightsText}
                onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
                placeholder="Highlight 1&#10;Highlight 2"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
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

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4 rounded text-[#062B45] focus:ring-[#C7A66B]"
              />
              <span>Published on Website</span>
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
              {isEditing ? 'Save Changes' : 'Add Testimonial'}
            </Button>
          </div>
        </form>
      </AdminModal>

      {/* DELETE CONFIRMATION DIALOG */}
      <AdminConfirmModal
        isOpen={Boolean(deleteCandidate)}
        title="Delete Testimonial"
        message={`Are you sure you want to delete testimonial by "${deleteCandidate?.guestName}"?`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
};
