import React, { useState } from 'react';
import {
  PlusCircle,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import type { AdminExperienceItem } from '../../store/hotelStore';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { AdminModal } from '../../components/admin/AdminModal';
import { Button } from '../../components/ui/Button';

const EXPERIENCE_SECTIONS: { id: AdminExperienceItem['section']; label: string }[] = [
  { id: 'wellness', label: 'Relaxation & Wellness' },
  { id: 'dining', label: 'Dining Experiences' },
  { id: 'culture', label: 'Local Culture & Cuisine' },
  { id: 'sightseeing', label: 'Nearby Sightseeing' },
  { id: 'family', label: 'Family-Friendly Activities' },
  { id: 'romance', label: 'Romantic Stays & Special Occasions' },
];

export const AdminExperiences: React.FC = () => {
  const {
    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    togglePublishExperience,
  } = useHotelStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState<AdminExperienceItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<AdminExperienceItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    section: 'wellness' as AdminExperienceItem['section'],
    tag: 'Mindfulness',
    description: '',
    highlightsText: '',
    imageUrl: '',
    ctaLabel: 'Enquire via Concierge',
    ctaLink: '/contact',
    displayOrder: 1,
    published: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const openAddForm = () => {
    setIsEditing(false);
    setSelectedExp(null);
    setFormData({
      title: '',
      section: 'wellness',
      tag: 'Mindfulness',
      description: '',
      highlightsText: 'Certified instructor\nComplimentary equipment\nSuitable for all skill levels',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80',
      ctaLabel: 'Enquire via Concierge',
      ctaLink: '/contact',
      displayOrder: experiences.length + 1,
      published: true,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditForm = (exp: AdminExperienceItem) => {
    setIsEditing(true);
    setSelectedExp(exp);
    setFormData({
      title: exp.title,
      section: exp.section,
      tag: exp.tag || 'Experience',
      description: exp.description,
      highlightsText: (exp.highlights || []).join('\n'),
      imageUrl: exp.imageUrl,
      ctaLabel: exp.ctaLabel || 'Enquire via Concierge',
      ctaLink: exp.ctaLink || '/contact',
      displayOrder: exp.displayOrder || 1,
      published: exp.published,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = 'Title is required.';
    if (!formData.description.trim()) errs.description = 'Description is required.';
    if (!formData.imageUrl.trim()) errs.imageUrl = 'Image URL is required.';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedSec = EXPERIENCE_SECTIONS.find((s) => s.id === formData.section);
    const sectionLabel = matchedSec ? matchedSec.label : 'Curated';

    const parsedHighlights = formData.highlightsText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (isEditing && selectedExp) {
      updateExperience(selectedExp.id, {
        title: formData.title.trim(),
        section: formData.section,
        sectionLabel,
        tag: formData.tag.trim(),
        description: formData.description.trim(),
        highlights: parsedHighlights,
        imageUrl: formData.imageUrl.trim(),
        ctaLabel: formData.ctaLabel.trim(),
        ctaLink: formData.ctaLink.trim(),
        displayOrder: Number(formData.displayOrder),
        published: formData.published,
      });
    } else {
      const slug = formData.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addExperience({
        id: slug || `exp-${Date.now()}`,
        title: formData.title.trim(),
        section: formData.section,
        sectionLabel,
        tag: formData.tag.trim(),
        description: formData.description.trim(),
        highlights: parsedHighlights,
        imageUrl: formData.imageUrl.trim(),
        iconName: 'Compass',
        ctaLabel: formData.ctaLabel.trim(),
        ctaLink: formData.ctaLink.trim(),
        displayOrder: Number(formData.displayOrder),
        published: formData.published,
      });
    }

    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      deleteExperience(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  const sortedExperiences = [...experiences].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            CURATED ACTIVITIES & TOURS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45]">
            Experiences Management
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Manage resort excursions, wellness rituals, and dining tours displayed on the public Experiences page.
          </p>
        </div>

        <Button
          onClick={openAddForm}
          variant="gold"
          size="sm"
          icon={<PlusCircle className="w-4 h-4" />}
          iconPosition="left"
        >
          Add Experience
        </Button>
      </div>

      {/* Experiences Table (Direct list, no search/filter panels as required) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 w-12 text-center">Order</th>
                <th className="py-3.5 px-4">Experience & Visual</th>
                <th className="py-3.5 px-4">Section Category</th>
                <th className="py-3.5 px-4">Highlights</th>
                <th className="py-3.5 px-4">Action Destination</th>
                <th className="py-3.5 px-4 text-center">Publication</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedExperiences.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No experiences found. Click "Add Experience" to add one.
                  </td>
                </tr>
              ) : (
                sortedExperiences.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                      {exp.displayOrder}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={exp.imageUrl}
                          alt={exp.title}
                          className="w-14 h-11 object-cover rounded-md border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div className="max-w-xs">
                          <p className="font-semibold text-[#062B45] leading-snug">
                            {exp.title}
                          </p>
                          <span className="text-[10px] text-[#C7A66B] font-semibold uppercase tracking-wider block mt-0.5">
                            {exp.tag}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-[#EAF2FF] text-[#062B45]">
                        {exp.sectionLabel || exp.section}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="text-[11px] text-slate-500">
                        {exp.highlights ? exp.highlights.length : 0} highlight(s)
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="text-xs font-mono text-[#0A3D60]">
                        {exp.ctaLink || '/contact'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => togglePublishExperience(exp.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          exp.published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle publication"
                      >
                        {exp.published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditForm(exp)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#C7A66B] hover:bg-amber-50 transition-colors"
                          title="Edit Experience"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(exp)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Experience"
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
        title={isEditing ? 'Edit Experience' : 'Add New Experience'}
        subtitle="Manage curated resort excursions and itineraries"
        maxWidth="lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Catamaran Sunset Sailing Charter"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {formErrors.title && (
                <p className="text-[11px] text-rose-600 mt-1">{formErrors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Category Section *
              </label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value as AdminExperienceItem['section'] })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B] bg-white"
              >
                {EXPERIENCE_SECTIONS.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Tag Label
              </label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g., Mindfulness, Gastronomy"
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

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                CTA Button Label
              </label>
              <input
                type="text"
                value={formData.ctaLabel}
                onChange={(e) => setFormData({ ...formData, ctaLabel: e.target.value })}
                placeholder="e.g., Enquire via Concierge"
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

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Description *
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Narrative description of the experience..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {formErrors.description && (
              <p className="text-[11px] text-rose-600 mt-1">{formErrors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Key Highlights (one per line)
            </label>
            <textarea
              rows={3}
              value={formData.highlightsText}
              onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
              placeholder="Highlight 1&#10;Highlight 2&#10;Highlight 3"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Internal Link Destination
            </label>
            <input
              type="text"
              value={formData.ctaLink}
              onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
              placeholder="/contact or /location or /dining"
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
              {isEditing ? 'Save Changes' : 'Create Experience'}
            </Button>
          </div>
        </form>
      </AdminModal>

      {/* DELETE CONFIRMATION DIALOG */}
      <AdminConfirmModal
        isOpen={Boolean(deleteCandidate)}
        title="Delete Experience"
        message={`Are you sure you want to delete "${deleteCandidate?.title}"? It will be removed immediately from the public Experiences page.`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
};
