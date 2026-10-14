import React, { useState } from 'react';
import {
  PlusCircle,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import type { AdminFacilityItem } from '../../store/hotelStore';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { AdminModal } from '../../components/admin/AdminModal';
import { Button } from '../../components/ui/Button';

export const AdminFacilities: React.FC = () => {
  const {
    facilities,
    addFacility,
    updateFacility,
    deleteFacility,
    togglePublishFacility,
  } = useHotelStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<AdminFacilityItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<AdminFacilityItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Aquatics & Leisure',
    description: '',
    featuresText: '',
    imageUrl: '',
    iconName: 'Waves',
    displayOrder: 1,
    actionLinkLabel: 'Explore Details',
    actionLinkTo: '/contact',
    published: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const openAddForm = () => {
    setIsEditing(false);
    setSelectedFacility(null);
    setFormData({
      title: '',
      category: 'Aquatics & Leisure',
      description: '',
      featuresText: 'High-end service\nComplimentary amenities\nDedicated host support',
      imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
      iconName: 'Waves',
      displayOrder: facilities.length + 1,
      actionLinkLabel: 'Explore Details',
      actionLinkTo: '/contact',
      published: true,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditForm = (fac: AdminFacilityItem) => {
    setIsEditing(true);
    setSelectedFacility(fac);
    setFormData({
      title: fac.title,
      category: fac.category,
      description: fac.description,
      featuresText: (fac.features || []).join('\n'),
      imageUrl: fac.imageUrl,
      iconName: fac.iconName || 'Sparkles',
      displayOrder: fac.displayOrder || 1,
      actionLinkLabel: fac.actionLinkLabel || 'Explore Details',
      actionLinkTo: fac.actionLinkTo || '/contact',
      published: fac.published,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = 'Facility name is required.';
    if (!formData.description.trim()) errs.description = 'Description is required.';
    if (!formData.imageUrl.trim()) errs.imageUrl = 'Image URL is required.';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedFeatures = formData.featuresText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (isEditing && selectedFacility) {
      updateFacility(selectedFacility.id, {
        title: formData.title.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
        features: parsedFeatures,
        imageUrl: formData.imageUrl.trim(),
        iconName: formData.iconName,
        displayOrder: Number(formData.displayOrder),
        actionLinkLabel: formData.actionLinkLabel.trim(),
        actionLinkTo: formData.actionLinkTo.trim(),
        published: formData.published,
      });
    } else {
      const slug = formData.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addFacility({
        id: slug || `fac-${Date.now()}`,
        title: formData.title.trim(),
        category: formData.category.trim(),
        description: formData.description.trim(),
        features: parsedFeatures,
        imageUrl: formData.imageUrl.trim(),
        iconName: formData.iconName,
        displayOrder: Number(formData.displayOrder),
        actionLinkLabel: formData.actionLinkLabel.trim(),
        actionLinkTo: formData.actionLinkTo.trim(),
        published: formData.published,
      });
    }

    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      deleteFacility(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  // Sort facilities by displayOrder
  const sortedFacilities = [...facilities].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            HOTEL AMENITIES & LEISURE
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45]">
            Facilities & Amenities Management
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Manage resort features and wellness services displayed on the public Facilities & Amenities page.
          </p>
        </div>

        <Button
          onClick={openAddForm}
          variant="gold"
          size="sm"
          icon={<PlusCircle className="w-4 h-4" />}
          iconPosition="left"
        >
          Add Facility
        </Button>
      </div>

      {/* Facilities Table (Direct list, no search/filter panels as required) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 w-12 text-center">Order</th>
                <th className="py-3.5 px-4">Facility & Presentation</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Key Features</th>
                <th className="py-3.5 px-4 text-center">Publication</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedFacilities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No facilities found. Click "Add Facility" to create one.
                  </td>
                </tr>
              ) : (
                sortedFacilities.map((fac) => (
                  <tr key={fac.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                      {fac.displayOrder}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={fac.imageUrl}
                          alt={fac.title}
                          className="w-14 h-11 object-cover rounded-md border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div className="max-w-xs">
                          <p className="font-semibold text-[#062B45] leading-snug">
                            {fac.title}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {fac.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-[#EAF2FF] text-[#062B45]">
                        {fac.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="text-[11px] text-slate-500">
                        {fac.features ? fac.features.length : 0} feature bullet(s)
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => togglePublishFacility(fac.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          fac.published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle publication"
                      >
                        {fac.published ? 'Published' : 'Unpublished'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditForm(fac)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#C7A66B] hover:bg-amber-50 transition-colors"
                          title="Edit Facility"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(fac)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Facility"
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
        title={isEditing ? 'Edit Facility' : 'Add New Facility'}
        subtitle="Changes appear immediately on the public Facilities page"
        maxWidth="lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Facility Name *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Rooftop Sunset Lounge & Observatory"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {formErrors.title && (
                <p className="text-[11px] text-rose-600 mt-1">{formErrors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Aquatics & Leisure, Wellness, Dining"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              Description *
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descriptive overview of this resort facility..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {formErrors.description && (
              <p className="text-[11px] text-rose-600 mt-1">{formErrors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Feature Bullets (one per line)
            </label>
            <textarea
              rows={3}
              value={formData.featuresText}
              onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Button Label (Optional)
              </label>
              <input
                type="text"
                value={formData.actionLinkLabel}
                onChange={(e) => setFormData({ ...formData, actionLinkLabel: e.target.value })}
                placeholder="e.g., Contact Concierge"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Button Link Destination (Optional)
              </label>
              <input
                type="text"
                value={formData.actionLinkTo}
                onChange={(e) => setFormData({ ...formData, actionLinkTo: e.target.value })}
                placeholder="e.g., /contact or /dining"
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
              {isEditing ? 'Save Changes' : 'Create Facility'}
            </Button>
          </div>
        </form>
      </AdminModal>

      {/* DELETE CONFIRMATION DIALOG */}
      <AdminConfirmModal
        isOpen={Boolean(deleteCandidate)}
        title="Delete Facility"
        message={`Are you sure you want to delete "${deleteCandidate?.title}"? It will be removed immediately from the public Facilities page.`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
};
