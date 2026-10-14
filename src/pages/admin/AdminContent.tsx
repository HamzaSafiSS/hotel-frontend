import React, { useState } from 'react';
import {
  Save,
  CheckCircle,
  Sparkles,
  Home,
  Info,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import { Button } from '../../components/ui/Button';

export const AdminContent: React.FC = () => {
  const { content, updateContent } = useHotelStore();

  const [formData, setFormData] = useState({ ...content });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.heroHeading.trim()) errs.heroHeading = 'Hero heading is required.';
    if (!formData.heroDescription.trim()) errs.heroDescription = 'Hero description is required.';
    if (!formData.promoHeading.trim()) errs.promoHeading = 'Promotional heading is required.';
    if (!formData.aboutIntroHeading.trim()) errs.aboutIntroHeading = 'About intro heading is required.';
    if (!formData.missionTitle.trim()) errs.missionTitle = 'Mission title is required.';
    if (!formData.visionTitle.trim()) errs.visionTitle = 'Vision title is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    updateContent(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            COPYWRITING & HEADINGS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45]">
            Website Content Management
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Update marketing headlines, hero copy, and brand narratives across the public website.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Content Saved & Synchronized!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* SECTION 1: HOMEPAGE HERO */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Home className="w-4 h-4 text-[#C7A66B]" />
            <h2 className="font-serif text-base font-semibold text-[#062B45]">
              Homepage Hero Section
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Hero Eyebrow / Tagline
              </label>
              <input
                type="text"
                value={formData.heroEyebrow}
                onChange={(e) => setFormData({ ...formData, heroEyebrow: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Hero Main Heading *
              </label>
              <input
                type="text"
                value={formData.heroHeading}
                onChange={(e) => setFormData({ ...formData, heroHeading: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {errors.heroHeading && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.heroHeading}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Hero Description *
              </label>
              <textarea
                rows={2}
                value={formData.heroDescription}
                onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {errors.heroDescription && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.heroDescription}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#062B45] mb-1">
                  Primary Button Label (Links to /rooms)
                </label>
                <input
                  type="text"
                  value={formData.heroButtonRoomsLabel}
                  onChange={(e) => setFormData({ ...formData, heroButtonRoomsLabel: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#062B45] mb-1">
                  Secondary Button Label (Links to /menu)
                </label>
                <input
                  type="text"
                  value={formData.heroButtonMenuLabel}
                  onChange={(e) => setFormData({ ...formData, heroButtonMenuLabel: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: HOMEPAGE PROMOTIONAL BANNER */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C7A66B]" />
            <h2 className="font-serif text-base font-semibold text-[#062B45]">
              Homepage Promotional Banner
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Banner Eyebrow
              </label>
              <input
                type="text"
                value={formData.promoEyebrow}
                onChange={(e) => setFormData({ ...formData, promoEyebrow: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Banner Heading *
              </label>
              <input
                type="text"
                value={formData.promoHeading}
                onChange={(e) => setFormData({ ...formData, promoHeading: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {errors.promoHeading && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.promoHeading}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Banner Description
              </label>
              <textarea
                rows={2}
                value={formData.promoDescription}
                onChange={(e) => setFormData({ ...formData, promoDescription: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Banner Button Label
              </label>
              <input
                type="text"
                value={formData.promoButtonLabel}
                onChange={(e) => setFormData({ ...formData, promoButtonLabel: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: ABOUT US & STORY */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-[#C7A66B]" />
            <h2 className="font-serif text-base font-semibold text-[#062B45]">
              About Us Introduction & Brand Story
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                About Hero Headline *
              </label>
              <input
                type="text"
                value={formData.aboutIntroHeading}
                onChange={(e) => setFormData({ ...formData, aboutIntroHeading: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
              {errors.aboutIntroHeading && (
                <p className="text-[11px] text-rose-600 mt-1">{errors.aboutIntroHeading}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                About Hero Subheading / Welcome Text
              </label>
              <textarea
                rows={2}
                value={formData.aboutIntroText}
                onChange={(e) => setFormData({ ...formData, aboutIntroText: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Brand Story (Paragraph 1)
              </label>
              <textarea
                rows={3}
                value={formData.aboutStoryP1}
                onChange={(e) => setFormData({ ...formData, aboutStoryP1: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#062B45] mb-1">
                Hospitality Philosophy (Paragraph 2)
              </label>
              <textarea
                rows={3}
                value={formData.aboutStoryP2}
                onChange={(e) => setFormData({ ...formData, aboutStoryP2: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: MISSION & VISION */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-serif text-base font-semibold text-[#062B45]">
              Hotel Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#062B45] mb-1">
                  Mission Statement Title *
                </label>
                <input
                  type="text"
                  value={formData.missionTitle}
                  onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
                />
                {errors.missionTitle && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.missionTitle}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#062B45] mb-1">
                  Mission Description
                </label>
                <textarea
                  rows={4}
                  value={formData.missionDescription}
                  onChange={(e) => setFormData({ ...formData, missionDescription: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#062B45] mb-1">
                  Vision Statement Title *
                </label>
                <input
                  type="text"
                  value={formData.visionTitle}
                  onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
                />
                {errors.visionTitle && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.visionTitle}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#062B45] mb-1">
                  Vision Description
                </label>
                <textarea
                  rows={4}
                  value={formData.visionDescription}
                  onChange={(e) => setFormData({ ...formData, visionDescription: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C7A66B]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <Button type="submit" variant="gold" size="md" icon={<Save className="w-4 h-4" />}>
            Save All Content Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
