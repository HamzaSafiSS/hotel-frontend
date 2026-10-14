import React, { useState } from 'react';
import {
  PlusCircle,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import type { AdminFAQItem } from '../../store/hotelStore';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { AdminModal } from '../../components/admin/AdminModal';
import { Button } from '../../components/ui/Button';

const FAQ_CATEGORIES: { id: AdminFAQItem['category']; label: string }[] = [
  { id: 'checkin', label: 'Check-in & Arrival' },
  { id: 'reservations', label: 'Reservations & Policies' },
  { id: 'family', label: 'Family Stays' },
  { id: 'dining', label: 'Dining & Room Service' },
  { id: 'facilities', label: 'Facilities & Wi-Fi' },
  { id: 'general', label: 'Accessibility & Support' },
];

export const AdminFAQs: React.FC = () => {
  const {
    faqs,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    togglePublishFAQ,
  } = useHotelStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<AdminFAQItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<AdminFAQItem | null>(null);

  const [formData, setFormData] = useState({
    category: 'general' as AdminFAQItem['category'],
    question: '',
    answer: '',
    displayOrder: 1,
    published: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const openAddForm = () => {
    setIsEditing(false);
    setSelectedFAQ(null);
    setFormData({
      category: 'general',
      question: '',
      answer: '',
      displayOrder: faqs.length + 1,
      published: true,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditForm = (faq: AdminFAQItem) => {
    setIsEditing(true);
    setSelectedFAQ(faq);
    setFormData({
      category: faq.category,
      question: faq.question,
      answer: faq.answer,
      displayOrder: faq.displayOrder || 1,
      published: faq.published,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.question.trim()) errs.question = 'Question text is required.';
    if (!formData.answer.trim()) errs.answer = 'Answer text is required.';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedCat = FAQ_CATEGORIES.find((c) => c.id === formData.category);
    const categoryLabel = matchedCat ? matchedCat.label : 'General';

    if (isEditing && selectedFAQ) {
      updateFAQ(selectedFAQ.id, {
        category: formData.category,
        categoryLabel,
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        displayOrder: Number(formData.displayOrder),
        published: formData.published,
      });
    } else {
      addFAQ({
        id: `faq-${Date.now()}`,
        category: formData.category,
        categoryLabel,
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        displayOrder: Number(formData.displayOrder),
        published: formData.published,
      });
    }

    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      deleteFAQ(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  const sortedFAQs = [...faqs].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            GUEST INQUIRIES & POLICIES
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45]">
            FAQs Management
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Manage frequently asked questions displayed in the public accordion on the FAQs page.
          </p>
        </div>

        <Button
          onClick={openAddForm}
          variant="gold"
          size="sm"
          icon={<PlusCircle className="w-4 h-4" />}
          iconPosition="left"
        >
          Add FAQ
        </Button>
      </div>

      {/* FAQs Table (Direct list, no search/filter panels as required) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 w-12 text-center">Order</th>
                <th className="py-3.5 px-4">Question</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Answer Preview</th>
                <th className="py-3.5 px-4 text-center">Publication</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedFAQs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No FAQs found. Click "Add FAQ" to create one.
                  </td>
                </tr>
              ) : (
                sortedFAQs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                      {faq.displayOrder}
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#062B45] leading-snug max-w-sm">
                        {faq.question}
                      </p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-[#EAF2FF] text-[#062B45]">
                        {faq.categoryLabel || faq.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-md">
                      <p className="line-clamp-2 text-[11px] leading-relaxed">
                        {faq.answer}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => togglePublishFAQ(faq.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          faq.published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle publication"
                      >
                        {faq.published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditForm(faq)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#C7A66B] hover:bg-amber-50 transition-colors"
                          title="Edit FAQ"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(faq)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete FAQ"
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
        title={isEditing ? 'Edit FAQ Item' : 'Add New FAQ Item'}
        subtitle="Changes appear in the public accordion on the FAQs page"
        maxWidth="md"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as AdminFAQItem['category'] })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B] bg-white"
              >
                {FAQ_CATEGORIES.map((cat) => (
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
              Question *
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g., What are the check-in and check-out times?"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {formErrors.question && (
              <p className="text-[11px] text-rose-600 mt-1">{formErrors.question}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Answer *
            </label>
            <textarea
              rows={4}
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Informative response explaining policy or amenities..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {formErrors.answer && (
              <p className="text-[11px] text-rose-600 mt-1">{formErrors.answer}</p>
            )}
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
              {isEditing ? 'Save Changes' : 'Create FAQ'}
            </Button>
          </div>
        </form>
      </AdminModal>

      {/* DELETE CONFIRMATION DIALOG */}
      <AdminConfirmModal
        isOpen={Boolean(deleteCandidate)}
        title="Delete FAQ Item"
        message={`Are you sure you want to delete "${deleteCandidate?.question}"?`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
};
