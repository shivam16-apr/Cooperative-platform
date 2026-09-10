import React, { useState } from 'react';
import { X, HeartHandshake, CheckCircle } from 'lucide-react';

export default function ResolveComplaintModal({
  isOpen,
  ticket,
  onClose,
  onResolve
}) {
  const [compensation, setCompensation] = useState('voucher');
  const [resolutionNotes, setResolutionNotes] = useState('');

  if (!isOpen || !ticket) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onResolve(ticket.id, compensation, resolutionNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-charcoal-800 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Care & Solve — {ticket.id}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Empathetic grievance redressal for {ticket.customerName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-charcoal-850 border border-slate-200/80 dark:border-charcoal-750">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold">{ticket.category}</span>
              <span>{ticket.date}</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{ticket.subject}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{ticket.description}</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Customer Goodwill Compensation
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-charcoal-700 hover:bg-slate-50 dark:hover:bg-charcoal-850 cursor-pointer transition-colors text-xs">
                <input
                  type="radio"
                  name="compensation"
                  value="voucher"
                  checked={compensation === 'voucher'}
                  onChange={() => setCompensation('voucher')}
                  className="text-blue-600"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ₹200 FixMate Apology Voucher (SMS to customer)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-charcoal-700 hover:bg-slate-50 dark:hover:bg-charcoal-850 cursor-pointer transition-colors text-xs">
                <input
                  type="radio"
                  name="compensation"
                  value="revisit"
                  checked={compensation === 'revisit'}
                  onChange={() => setCompensation('revisit')}
                  className="text-blue-600"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Free Senior Supervisor Revisit Guarantee (30 Days)
                </span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-charcoal-700 hover:bg-slate-50 dark:hover:bg-charcoal-850 cursor-pointer transition-colors text-xs">
                <input
                  type="radio"
                  name="compensation"
                  value="refund"
                  checked={compensation === 'refund'}
                  onChange={() => setCompensation('refund')}
                  className="text-blue-600"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Full / Partial UPI Refund to Customer VPA
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Admin Apology & Closing Note
            </label>
            <textarea
              rows="2"
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="Spoke with customer over phone. Explained rain traffic delay and credited apology voucher..."
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-charcoal-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark Solved & Send Apology</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
