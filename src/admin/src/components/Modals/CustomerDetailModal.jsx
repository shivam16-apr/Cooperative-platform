import React from 'react';
import { X, MapPin, Phone, Mail, Home, ShieldCheck, IndianRupee, CalendarCheck } from 'lucide-react';

export default function CustomerDetailModal({ isOpen, customer, onClose }) {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-700 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative h-24 bg-gradient-to-r from-blue-700 to-blue-500 p-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Avatar & Info */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="-mt-12 mb-3 flex justify-between items-end">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
              {customer.tier} Tier
            </span>
          </div>

          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{customer.name}</h3>
          <p className="text-xs text-slate-400">Customer ID: {customer.id} • Joined {customer.joined}</p>

          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-charcoal-850 border border-slate-100 dark:border-charcoal-800">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-semibold">
                <CalendarCheck className="w-3.5 h-3.5 text-blue-600" /> Bookings
              </span>
              <p className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                {customer.totalBookings} orders
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-charcoal-850 border border-slate-100 dark:border-charcoal-800">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-semibold">
                <IndianRupee className="w-3.5 h-3.5 text-blue-600" /> Total Spend
              </span>
              <p className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-1">
                ₹{customer.spend.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{customer.location}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{customer.email}</span>
            </div>
          </div>

          {customer.houseNotes && (
            <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Home className="w-3.5 h-3.5 text-amber-600" />
                <span>Household Instructions:</span>
              </div>
              <p className="italic">{customer.houseNotes}</p>
            </div>
          )}

          <div className="mt-5">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-100 dark:bg-charcoal-800 hover:bg-slate-200 dark:hover:bg-charcoal-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
