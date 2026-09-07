import React from 'react';
import { X, Printer, Wrench } from 'lucide-react';

export default function InvoiceModal({ isOpen, payment, onClose }) {
  if (!isOpen || !payment) return null;

  const basePrice = Math.round(payment.amount / 1.18);
  const gst = payment.amount - basePrice;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-charcoal-800 bg-slate-50 dark:bg-charcoal-850">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tax Invoice & Receipt</h3>
              <p className="text-[11px] text-slate-400">Official GST Compliance Copy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Body */}
        <div className="p-6 space-y-5 text-slate-800 dark:text-slate-200">
          {/* Company & Customer Info */}
          <div className="flex justify-between items-start text-xs border-b border-slate-100 dark:border-charcoal-800 pb-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">SevaPulse Bharat Pvt. Ltd.</h4>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">BKC, Bandra East, Mumbai - 400051</p>
              <p className="text-slate-500 dark:text-slate-400">GSTIN: 27AABCS1429B1Z4</p>
            </div>
            <div className="text-right">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                {payment.status.toUpperCase()}
              </span>
              <p className="font-mono font-bold text-slate-900 dark:text-white mt-1 text-xs">{payment.id}</p>
              <p className="text-[11px] text-slate-400">Date: {payment.date}</p>
            </div>
          </div>

          <div className="text-xs">
            <span className="text-[11px] font-bold uppercase text-slate-400">Billed To:</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{payment.customerName}</p>
            <p className="text-slate-500 dark:text-slate-400">Booking Ref: {payment.bookingId || 'BK-IND-801'}</p>
            <p className="text-slate-500 dark:text-slate-400">Mode: {payment.method}</p>
          </div>

          {/* Line items */}
          <div className="border border-slate-200 dark:border-charcoal-700 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-charcoal-850 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-charcoal-700">
                <tr>
                  <th className="py-2.5 px-3">Service Description</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-charcoal-800">
                <tr>
                  <td className="py-2.5 px-3">
                    <p className="font-semibold text-slate-900 dark:text-white">{payment.service}</p>
                    <span className="text-[10px] text-slate-400">Doorstep technician visitation and labor</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold">
                    ₹{basePrice.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-500">Integrated GST (IGST 18%)</td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                    ₹{gst.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr className="bg-slate-50/50 dark:bg-charcoal-850 font-bold">
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white">Total Amount Paid</td>
                  <td className="py-2.5 px-3 text-right font-mono text-blue-600 dark:text-blue-400 text-sm">
                    ₹{payment.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[10px] text-center text-slate-400 italic">
            This is a computer-generated tax invoice. Authorized by SevaPulse Bharat Financial Operations.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-100 dark:border-charcoal-800 bg-slate-50 dark:bg-charcoal-850">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
}
