import React, { useState } from 'react';
import {
  Eye,
  Trash2,
  Mail,
  Phone,
  User,
  Info,
} from 'lucide-react';
import { useHotelStore } from '../../store/hotelStore';
import type { AdminEnquiryItem, EnquiryStatus } from '../../store/hotelStore';
import { AdminBadge } from '../../components/admin/AdminBadge';
import { AdminConfirmModal } from '../../components/admin/AdminConfirmModal';
import { AdminModal } from '../../components/admin/AdminModal';
import { Button } from '../../components/ui/Button';

export const AdminEnquiries: React.FC = () => {
  const {
    enquiries,
    updateEnquiryStatus,
    deleteEnquiry,
  } = useHotelStore();

  const [selectedEnquiry, setSelectedEnquiry] = useState<AdminEnquiryItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<AdminEnquiryItem | null>(null);

  const openDetail = (enq: AdminEnquiryItem) => {
    setSelectedEnquiry(enq);
    // If it was 'New', automatically transition to 'Read' when opened
    if (enq.status === 'New') {
      updateEnquiryStatus(enq.id, 'Read');
      setSelectedEnquiry({ ...enq, status: 'Read' });
    }
    setIsDetailOpen(true);
  };

  const handleStatusChange = (id: string, status: EnquiryStatus) => {
    updateEnquiryStatus(id, status);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteCandidate) {
      deleteEnquiry(deleteCandidate.id);
      setDeleteCandidate(null);
    }
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return <AdminBadge label="New" variant="warning" />;
      case 'Read':
        return <AdminBadge label="Read" variant="neutral" />;
      case 'In Progress':
        return <AdminBadge label="In Progress" variant="info" />;
      case 'Resolved':
        return <AdminBadge label="Resolved" variant="success" />;
      default:
        return <AdminBadge label={status} variant="neutral" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C7A66B]">
            GUEST INBOX & SUBMISSIONS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#062B45]">
            Contact Enquiries Management
          </h1>
          <p className="text-xs sm:text-sm text-[#60758B] mt-1">
            Review and track messages submitted by guests via the public Contact Us form.
          </p>
        </div>

        <div className="bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 text-[#C7A66B] shrink-0" />
          <span>Local simulation: submissions are stored in browser memory.</span>
        </div>
      </div>

      {/* Enquiries Table (Direct list, no search/filter panels as required) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Sender & Contact</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Message Preview</th>
                <th className="py-3.5 px-4">Submitted At</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No contact enquiries received yet. Submissions from the Contact Us form will appear here.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      enq.status === 'New' ? 'bg-[#EAF2FF]/30 font-medium' : ''
                    }`}
                  >
                    {/* Sender */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#062B45]">{enq.fullName}</p>
                      <p className="text-[11px] text-slate-500">{enq.email}</p>
                      {enq.phone && (
                        <p className="text-[10px] text-slate-400">{enq.phone}</p>
                      )}
                    </td>

                    {/* Subject */}
                    <td className="py-3.5 px-4 text-[#062B45] font-medium">
                      {enq.subject}
                    </td>

                    {/* Preview */}
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                      <p className="line-clamp-2 text-[11px] leading-relaxed">
                        {enq.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {enq.createdAt}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      {getStatusBadge(enq.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openDetail(enq)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#062B45] hover:bg-slate-100 transition-colors"
                          title="View Full Enquiry"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(enq)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Enquiry"
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

      {/* DETAIL MODAL */}
      {selectedEnquiry && (
        <AdminModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          title={selectedEnquiry.subject}
          subtitle={`Submitted by ${selectedEnquiry.fullName} • ${selectedEnquiry.createdAt}`}
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Current Status</span>
                <div className="mt-0.5">{getStatusBadge(selectedEnquiry.status)}</div>
              </div>
              <div className="flex items-center gap-1">
                {(['New', 'Read', 'In Progress', 'Resolved'] as EnquiryStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                    className={`text-[11px] px-2.5 py-1 rounded font-medium transition-colors ${
                      selectedEnquiry.status === st
                        ? 'bg-[#062B45] text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <User className="w-4 h-4 text-[#C7A66B]" />
                <span><strong>Sender:</strong> {selectedEnquiry.fullName}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-[#C7A66B]" />
                <span><strong>Email:</strong> {selectedEnquiry.email}</span>
              </div>
              {selectedEnquiry.phone && (
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-[#C7A66B]" />
                  <span><strong>Phone:</strong> {selectedEnquiry.phone}</span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Message Content
              </h4>
              <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 italic">
                Demonstration enquiry. No emails are transmitted.
              </span>
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
        title="Delete Enquiry"
        message={`Are you sure you want to delete inquiry "${deleteCandidate?.subject}" from ${deleteCandidate?.fullName}?`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteCandidate(null)}
      />
    </div>
  );
};
