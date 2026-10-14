import React, { useState } from 'react';
import {
  Save,
  RotateCcw,
  CheckCircle,
  Building,
  Mail,
  AlertTriangle,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { Button } from '../../components/ui/Button';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, resetAllDemoData } = useHotelStore();

  const [formData, setFormData] = useState({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.hotelName.trim()) errs.hotelName = 'Hotel display name is required.';
    if (!formData.contactEmail.trim()) errs.contactEmail = 'Contact email is required.';
    if (!formData.contactPhone.trim()) errs.contactPhone = 'Contact phone is required.';
    if (!formData.address.trim()) errs.address = 'Hotel address is required.';
    if (!formData.currencySymbol.trim()) errs.currencySymbol = 'Currency symbol is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetData = () => {
    resetAllDemoData();
    // Re-sync local form with reset values
    setFormData({
      hotelName: 'Skyview Hotels & Resorts',
      logoUrl: '',
      contactEmail: 'reservations@skyviewhotels.com',
      contactPhone: '+1 (800) 555-7598',
      address: '124 Scenic Coastal Boulevard, Azure Haven, CA 90210',
      receptionHours: '24/7 Front Desk & Dedicated Concierge',
      currencySymbol: '$',
      defaultCheckInTime: '3:00 PM',
      defaultCheckOutTime: '11:00 AM',
      copyrightText: '© 2026 Skyview Hotels & Resorts. All rights reserved.',
    });
    setIsResetConfirmOpen(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 4000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            HOTEL PROFILE & DEMO CONTROLS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45]">
            Hotel Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Configure hotel metadata, currency formatting, contact details, and local demonstration state.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Settings Updated!</span>
          </div>
        )}

        {resetSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold animate-in fade-in">
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span>Demonstration Data Reset to Defaults!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Hotel Identity */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#C7A66B]" />
            <h2 className="font-serif text-base font-semibold text-[#062B45]">
              Hotel Identity & Currency
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Hotel Display Name *
              </label>
              <input
                type="text"
                value={formData.hotelName}
                onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {errors.hotelName && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.hotelName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Currency Symbol *
              </label>
              <input
                type="text"
                value={formData.currencySymbol}
                onChange={(e) => setFormData({ ...formData, currencySymbol: e.target.value })}
                placeholder="$, €, £"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {errors.currencySymbol && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.currencySymbol}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Default Check-In Time
              </label>
              <input
                type="text"
                value={formData.defaultCheckInTime}
                onChange={(e) => setFormData({ ...formData, defaultCheckInTime: e.target.value })}
                placeholder="3:00 PM"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Default Check-Out Time
              </label>
              <input
                type="text"
                value={formData.defaultCheckOutTime}
                onChange={(e) => setFormData({ ...formData, defaultCheckOutTime: e.target.value })}
                placeholder="11:00 AM"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#C7A66B]" />
            <h2 className="font-serif text-base font-semibold text-[#062B45]">
              Contact Details (Displayed in Public Footer & Contact Page)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Contact Email *
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {errors.contactEmail && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.contactEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Contact Phone *
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {errors.contactPhone && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.contactPhone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Displayed Address *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
            {errors.address && (
              <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Reception & Concierge Hours
            </label>
            <input
              type="text"
              value={formData.receptionHours}
              onChange={(e) => setFormData({ ...formData, receptionHours: e.target.value })}
              placeholder="24/7 Front Desk & Dedicated Concierge"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#062B45] mb-1">
              Footer Copyright Text
            </label>
            <input
              type="text"
              value={formData.copyrightText}
              onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end">
          <Button type="submit" variant="gold" size="md" icon={<Save className="w-4 h-4" />}>
            Save Hotel Settings
          </Button>
        </div>
      </form>

      {/* DANGER ZONE: RESET DEMONSTRATION DATA */}
      <div className="mt-12 bg-rose-50/60 border border-rose-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-base font-semibold text-rose-950">
              Reset Local Demonstration Data
            </h3>
            <p className="text-xs text-rose-800 leading-relaxed mt-1">
              Restore the original hotel catalog, sample bookings, dining items, facilities, gallery photos, reviews, FAQs, inquiries, and settings to their factory demonstration state. This action only affects demonstration records stored locally in your current browser.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Demo Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM RESET MODAL */}
      <AdminConfirmModal
        isOpen={isResetConfirmOpen}
        title="Reset All Demonstration Data?"
        message="Are you sure you want to restore the default sample dataset? Any rooms, menu items, or demo bookings you created will be reset to initial state. This affects only your local browser storage."
        confirmLabel="Reset All Data"
        confirmVariant="danger"
        onConfirm={handleResetData}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};
