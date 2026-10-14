import React, { useState } from 'react';
import {
  PlusCircle,
  Edit2,
  Trash2,
  Star,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import type { AdminMenuItem } from '../../store/hotelStore';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { AdminModal } from '../../components/admin/AdminModal';
import { Button } from '../../components/ui/Button';

const CATEGORY_OPTIONS: { id: AdminMenuItem['category']; label: string }[] = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Main Courses' },
  { id: 'local', label: 'Local Cuisine' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'hot-drinks', label: 'Hot Drinks' },
  { id: 'cold-drinks', label: 'Cold Drinks' },
];

export const AdminDining: React.FC = () => {
  const {
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    togglePublishMenuItem,
    toggleFeaturedMenuItem,
    settings,
  } = useHotelStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdminMenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<AdminMenuItem | null>(null);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'mains' as AdminMenuItem['category'],
    description: '',
    fullDescription: '',
    price: 18,
    imageUrl: '',
    dietaryText: '',
    allergensText: '',
    featured: false,
    published: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const openAddForm = () => {
    setIsEditing(false);
    setSelectedItem(null);
    setFormData({
      id: '',
      name: '',
      category: 'mains',
      description: '',
      fullDescription: '',
      price: 18,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      dietaryText: 'Signature, Freshly Prepared',
      allergensText: 'None',
      featured: false,
      published: true,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const openEditForm = (item: AdminMenuItem) => {
    setIsEditing(true);
    setSelectedItem(item);
    setFormData({
      id: item.id,
      name: item.name,
      category: item.category,
      description: item.description,
      fullDescription: item.fullDescription || item.description,
      price: item.price,
      imageUrl: item.imageUrl,
      dietaryText: (item.dietary || []).join(', '),
      allergensText: (item.allergens || []).join(', '),
      featured: !!item.featured,
      published: item.published,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Item name is required.';
    if (!formData.description.trim()) errs.description = 'Short description is required.';
    if (Number(formData.price) <= 0 || isNaN(Number(formData.price))) {
      errs.price = 'Price must be a positive number.';
    }
    if (!formData.imageUrl.trim()) errs.imageUrl = 'Image URL is required.';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedCategory = CATEGORY_OPTIONS.find((c) => c.id === formData.category);
    const categoryLabel = matchedCategory ? matchedCategory.label : 'Specialty';

    const parsedDietary = formData.dietaryText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const parsedAllergens = formData.allergensText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (isEditing && selectedItem) {
      updateMenuItem(selectedItem.id, {
        name: formData.name.trim(),
        category: formData.category,
        categoryLabel,
        description: formData.description.trim(),
        fullDescription: formData.fullDescription.trim() || formData.description.trim(),
        price: Number(formData.price),
        imageUrl: formData.imageUrl.trim(),
        dietary: parsedDietary,
        allergens: parsedAllergens,
        featured: formData.featured,
        published: formData.published,
      });
    } else {
      const slug = formData.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
      addMenuItem({
        id: slug || `item-${Date.now()}`,
        name: formData.name.trim(),
        category: formData.category,
        categoryLabel,
        description: formData.description.trim(),
        fullDescription: formData.fullDescription.trim() || formData.description.trim(),
        price: Number(formData.price),
        imageUrl: formData.imageUrl.trim(),
        dietary: parsedDietary,
        allergens: parsedAllergens,
        featured: formData.featured,
        published: formData.published,
        isAvailable: true,
      });
    }

    setIsFormOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      deleteMenuItem(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            CULINARY & RESTAURANT
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45]">
            Dining & Digital Menu Management
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Single shared source of truth for the public Restaurant page and the Digital Menu.
          </p>
        </div>

        <Button
          onClick={openAddForm}
          variant="gold"
          size="sm"
          icon={<PlusCircle className="w-4 h-4" />}
          iconPosition="left"
        >
          Add Menu Item
        </Button>
      </div>

      {/* Menu Table (Direct list, no search/filter panels as required) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Dish & Presentation</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Dietary Labels</th>
                <th className="py-3.5 px-4 text-center">Featured Dish</th>
                <th className="py-3.5 px-4 text-center">Publication</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {menuItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No menu items in catalog. Click "Add Menu Item" to create one.
                  </td>
                </tr>
              ) : (
                menuItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Visual & Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div className="max-w-xs">
                          <p className="font-semibold text-[#062B45] leading-snug">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-[#EAF2FF] text-[#062B45]">
                        {item.categoryLabel || item.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold text-[#062B45]">
                      {settings.currencySymbol} {item.price}
                    </td>

                    {/* Dietary */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {item.dietary && item.dietary.length > 0 ? (
                          item.dietary.map((d, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200"
                            >
                              {d}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
                      </div>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleFeaturedMenuItem(item.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          item.featured
                            ? 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                            : 'bg-slate-100 text-slate-400 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle featured spotlight on Dining page"
                      >
                        <Star className={`w-3 h-3 ${item.featured ? 'fill-amber-500 text-amber-500' : ''}`} />
                        <span>{item.featured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>

                    {/* Publication Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => togglePublishMenuItem(item.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          item.published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle publication"
                      >
                        {item.published ? 'Published' : 'Unpublished'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditForm(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#C7A66B] hover:bg-amber-50 transition-colors"
                          title="Edit Item"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(item)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Item"
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
        title={isEditing ? 'Edit Culinary Item' : 'Add New Menu Item'}
        subtitle="Changes appear synchronously on Dining & Digital Menu pages"
        maxWidth="lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Item Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Pan-Seared Chilean Seabass"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {formErrors.name && (
                <p className="text-[11px] text-rose-600 mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as AdminMenuItem['category'] })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B] bg-white"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Price ({settings.currencySymbol}) *
              </label>
              <input
                type="number"
                min="1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {formErrors.price && (
                <p className="text-[11px] text-rose-600 mt-1">{formErrors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Image URL *
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
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Short Description *
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Card summary describing ingredients and taste..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {formErrors.description && (
              <p className="text-[11px] text-rose-600 mt-1">{formErrors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Detailed Culinary Narrative
            </label>
            <textarea
              rows={2}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Detailed culinary breakdown displayed in the modal..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Dietary Labels (comma-separated)
              </label>
              <input
                type="text"
                value={formData.dietaryText}
                onChange={(e) => setFormData({ ...formData, dietaryText: e.target.value })}
                placeholder="Gluten-Free, Chef Signature, Vegan"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Allergens (comma-separated)
              </label>
              <input
                type="text"
                value={formData.allergensText}
                onChange={(e) => setFormData({ ...formData, allergensText: e.target.value })}
                placeholder="Dairy, Nuts, Shellfish"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 rounded text-[#062B45] focus:ring-[#C7A66B]"
              />
              <span>Feature on Dining Landing Page</span>
            </label>

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
              {isEditing ? 'Save Changes' : 'Create Item'}
            </Button>
          </div>
        </form>
      </AdminModal>

      {/* DELETE CONFIRMATION DIALOG */}
      <AdminConfirmModal
        isOpen={Boolean(deleteCandidate)}
        title="Delete Menu Item"
        message={`Are you sure you want to delete "${deleteCandidate?.name}"? It will be removed immediately from both the Dining and Digital Menu pages.`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
};
