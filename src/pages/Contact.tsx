import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Info,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { ContentContainer } from '../components/ui/ContentContainer';
import { HOTEL_CONTACT } from '../data/siteData';
import { useHotelStore } from '../store/hotelStore';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const { addEnquiry, settings } = useHotelStore();

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  const subjectOptions = [
    { value: '', label: 'Select Inquiry Subject...' },
    { value: 'Room Reservations', label: 'Room Reservations & Availability' },
    { value: 'Dining & Private Events', label: 'Dining, Restaurant & Private Celebrations' },
    { value: 'Concierge & Experiences', label: 'Concierge, Transfers & Experiences' },
    { value: 'Spa & Wellness', label: 'Spa Treatments & Wellness Appointments' },
    { value: 'General Inquiry', label: 'General Hotel Questions' },
  ];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., name@example.com).';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please choose an inquiry subject.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message or question.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message with at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      // Persist to shared store so it appears in the admin dashboard immediately
      addEnquiry({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: formData.subject,
        message: formData.message.trim(),
      });

      setSubmittedData({ ...formData });
      setIsSubmitted(true);
      setErrors({});
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#062B45] text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2000&q=80"
            alt="Skyview Concierge & Guest Services Arrival"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#041D2F]/90 via-[#062B45]/65 to-[#041D2F]/40" />
        </div>

        <ContentContainer size="7xl" className="relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-300 mb-6">
            <Link to="/" className="hover:text-[#DFCA9B] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C7A66B]" />
            <span className="text-white font-medium">Contact Us</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#DFCA9B] mb-3">
              GUEST RELATIONS & INQUIRIES
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-6 leading-tight">
              Connect With the Skyview Concierge
            </h1>
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed mb-8">
              We look forward to welcoming you. Whether inquiring about custom suite arrangements, dining reservations, or airport transfers, our team is at your disposal.
            </p>
          </div>
        </ContentContainer>
      </section>

      {/* 2. ILLUSTRATIVE NOTICE */}
      <section className="bg-amber-50/80 border-b border-amber-200/80 py-3.5 px-4">
        <ContentContainer size="7xl">
          <div className="flex items-center gap-2.5 text-xs text-amber-900 leading-snug">
            <Info className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
            <span>
              <strong>Demonstration Notice:</strong> The contact details, address, and business hours below are illustrative placeholders. This form operates locally as a frontend demonstration — no actual emails or messages are transmitted.
            </span>
          </div>
        </ContentContainer>
      </section>

      {/* 3. CONTACT FORM & CONCIERGE INFORMATION */}
      <section className="py-16 sm:py-24 bg-[#EAF2FF]/15 flex-1">
        <ContentContainer size="7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info & Reception Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66B] mb-2 block">
                  HOTEL COMMUNICATIONS
                </span>
                <h2 className="font-serif text-3xl font-normal text-[#062B45] tracking-tight mb-3">
                  Always Within Reach
                </h2>
                <p className="text-xs sm:text-sm text-[#60758B] leading-relaxed">
                  Our dedicated guest relations desk operates around the clock to ensure every stay is tailored to perfection.
                </p>
              </div>

              {/* Contact Information Cards */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D8E0EA] shadow-xs space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#EAF2FF] text-[#062B45] shrink-0">
                    <MapPin className="w-5 h-5 text-[#C7A66B]" />
                  </div>
                  <div>
                    <strong className="text-[#062B45] block font-semibold">Resort Address:</strong>
                    <span className="text-[#18324A]">{settings.address || HOTEL_CONTACT.address}</span>
                    <span className="text-[11px] text-[#60758B] block mt-0.5">
                      (Illustrative sample address)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-4 border-t border-[#D8E0EA]">
                  <div className="p-2.5 rounded-xl bg-[#EAF2FF] text-[#062B45] shrink-0">
                    <Phone className="w-5 h-5 text-[#C7A66B]" />
                  </div>
                  <div>
                    <strong className="text-[#062B45] block font-semibold">Telephone Inquiries:</strong>
                    <span className="text-[#18324A]">{settings.contactPhone || HOTEL_CONTACT.phone}</span>
                    <span className="text-[11px] text-[#60758B] block mt-0.5">
                      (Toll-free demonstration line)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-4 border-t border-[#D8E0EA]">
                  <div className="p-2.5 rounded-xl bg-[#EAF2FF] text-[#062B45] shrink-0">
                    <Mail className="w-5 h-5 text-[#C7A66B]" />
                  </div>
                  <div>
                    <strong className="text-[#062B45] block font-semibold">Email Reservations:</strong>
                    <span className="text-[#18324A]">{settings.contactEmail || HOTEL_CONTACT.email}</span>
                    <span className="text-[11px] text-[#60758B] block mt-0.5">
                      (General guest communications)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-4 border-t border-[#D8E0EA]">
                  <div className="p-2.5 rounded-xl bg-[#EAF2FF] text-[#062B45] shrink-0">
                    <Clock className="w-5 h-5 text-[#C7A66B]" />
                  </div>
                  <div>
                    <strong className="text-[#062B45] block font-semibold">Desk Operating Hours:</strong>
                    <span className="text-[#18324A]">{settings.receptionHours || HOTEL_CONTACT.receptionHours}</span>
                    <span className="text-[11px] text-[#60758B] block mt-0.5">
                      (Illustrative unverified service hours)
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Booking Privilege Note */}
              <div className="p-4 rounded-xl bg-[#EAF2FF]/50 border border-[#D8E0EA] flex items-start gap-3 text-xs text-[#062B45]">
                <ShieldCheck className="w-4 h-4 text-[#C7A66B] shrink-0 mt-0.5" />
                <span>
                  <strong>Official Website Guarantee:</strong> Direct inquiries and bookings made through this platform are entitled to our Best Available Rate assurance.
                </span>
              </div>
            </div>

            {/* Right: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-[#D8E0EA] shadow-xl">
              {isSubmitted && submittedData ? (
                /* SUCCESS DEMONSTRATION VIEW */
                <div className="py-8 text-center space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>

                  <div>
                    <span className="inline-block text-[11px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                      Frontend Demonstration Verified
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#062B45]">
                      Form Validated Successfully
                    </h3>
                    <p className="text-xs sm:text-sm text-[#60758B] max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you, <strong className="text-[#062B45]">{submittedData.fullName}</strong>. Your inquiry has passed all local frontend validations.
                    </p>
                  </div>

                  {/* Summary Box with Clear Demonstration Notice */}
                  <div className="bg-gray-50 border border-[#D8E0EA] rounded-xl p-5 text-left text-xs space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between border-b border-[#D8E0EA] pb-2">
                      <span className="text-[#60758B]">Subject:</span>
                      <strong className="text-[#062B45]">{submittedData.subject}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#D8E0EA] pb-2">
                      <span className="text-[#60758B]">Email:</span>
                      <span className="text-[#18324A]">{submittedData.email}</span>
                    </div>
                    {submittedData.phone && (
                      <div className="flex justify-between border-b border-[#D8E0EA] pb-2">
                        <span className="text-[#60758B]">Phone:</span>
                        <span className="text-[#18324A]">{submittedData.phone}</span>
                      </div>
                    )}
                    <div className="pt-1">
                      <span className="text-[#60758B] block mb-1">Message Preview:</span>
                      <p className="text-[#18324A] italic bg-white p-2.5 rounded border border-[#D8E0EA]">
                        "{submittedData.message}"
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto leading-relaxed">
                    <strong>Notice:</strong> As this is a portfolio demonstration project, no real message or email has been transmitted to a backend server.
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#062B45] hover:bg-[#0A3D60] text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* CONTACT FORM VIEW */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#062B45] mb-1">
                      Send a Message to Concierge
                    </h3>
                    <p className="text-xs text-[#60758B]">
                      Please complete the fields below. Required items are indicated with an asterisk (*).
                    </p>
                  </div>

                  {/* Full Name Field */}
                  <div>
                    <label
                      htmlFor="contact-fullName"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#062B45] mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-fullName"
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#18324A] placeholder:text-[#60758B]/60 outline-none transition-all ${
                        errors.fullName
                          ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-[#D8E0EA] hover:border-[#062B45]/40 focus:border-[#062B45] focus:ring-2 focus:ring-[#C7A66B]/20'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1 animate-fadeIn">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </span>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#062B45] mb-1.5"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="e.g. eleanor@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#18324A] placeholder:text-[#60758B]/60 outline-none transition-all ${
                          errors.email
                            ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                            : 'border-[#D8E0EA] hover:border-[#062B45]/40 focus:border-[#062B45] focus:ring-2 focus:ring-[#C7A66B]/20'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1 animate-fadeIn">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </span>
                      )}
                    </div>

                    {/* Phone Field (Optional) */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#062B45] mb-1.5"
                      >
                        Phone Number <span className="text-xs text-[#60758B] normal-case font-normal">(Optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="e.g. +1 (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-[#D8E0EA] hover:border-[#062B45]/40 focus:border-[#062B45] focus:ring-2 focus:ring-[#C7A66B]/20 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#18324A] placeholder:text-[#60758B]/60 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#062B45] mb-1.5"
                    >
                      Inquiry Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: undefined });
                      }}
                      className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#18324A] outline-none transition-all ${
                        errors.subject
                          ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-[#D8E0EA] hover:border-[#062B45]/40 focus:border-[#062B45] focus:ring-2 focus:ring-[#C7A66B]/20'
                      }`}
                    >
                      {subjectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <span className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1 animate-fadeIn">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#062B45] mb-1.5"
                    >
                      Your Message or Special Request <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Please describe your questions, suite requests, dining preferences, or travel timing..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      className={`w-full bg-white border rounded-lg p-3.5 text-xs sm:text-sm font-medium text-[#18324A] placeholder:text-[#60758B]/60 outline-none transition-all resize-y ${
                        errors.message
                          ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                          : 'border-[#D8E0EA] hover:border-[#062B45]/40 focus:border-[#062B45] focus:ring-2 focus:ring-[#C7A66B]/20'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-xs text-red-600 font-medium flex items-center gap-1 mt-1 animate-fadeIn">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#062B45] hover:bg-[#0A3D60] active:bg-[#041D2F] text-white text-xs sm:text-sm font-semibold px-8 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A66B]"
                    >
                      <Send className="w-4 h-4 text-[#C7A66B]" />
                      <span>Submit Inquiry (Frontend Demo)</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </ContentContainer>
      </section>
    </div>
  );
};
