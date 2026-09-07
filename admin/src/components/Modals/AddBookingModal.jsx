import React, { useState } from 'react';
import { X, CalendarPlus, Check } from 'lucide-react';

export default function AddBookingModal({
  isOpen,
  onClose,
  onAdd,
  workers,
  customers
}) {
  const [customerName, setCustomerName] = useState(customers[0]?.name || 'Priya Patel');
  const [service, setService] = useState('Switchboard & Wiring Repair');
  const [workerName, setWorkerName] = useState(workers[0]?.name || 'Ramesh Kumar');
  const [slot, setSlot] = useState('Tomorrow, 10:30 AM');
  const [amount, setAmount] = useState(649);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !workerName) return;

    onAdd({
      id: `BK-IND-${Math.floor(810 + Math.random() * 180)}`,
      customerName,
      service,
      workerName,
      date: slot,
      amount: Number(amount),
      status: 'Confirmed'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-700 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-charcoal-800 bg-slate-50 dark:bg-charcoal-850">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 flex items-center justify-center">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Dispatch New Service Booking
              </h3>
              <p className="text-xs text-slate-400">Schedule repair and assign dedicated technician</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Registered Customer *
            </label>
            <select
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.location})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Service Request Category *
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
            >
              <option value="Split AC Gas Refill & Deep Cleaning">Split AC Gas Refill & Deep Cleaning</option>
              <option value="Switchboard & Wiring Repair">Switchboard & Wiring Repair</option>
              <option value="Bathroom Pipe Fitting & Leak Fix">Bathroom Pipe Fitting & Leak Fix</option>
              <option value="Two-Wheeler Brake & Carburetor Tune-up">Two-Wheeler Brake & Carburetor Tune-up</option>
              <option value="Modular Kitchen Woodwork & Hinges">Modular Kitchen Woodwork & Hinges</option>
              <option value="Wall Primer & Texture Painting">Wall Primer & Texture Painting</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Assign Karmik / Technician *
              </label>
              <select
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
              >
                {workers.map((w) => (
                  <option key={w.id} value={w.name}>
                    {w.name} ({w.role} - ₹{w.hourlyRate}/hr)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Service Fee Amount (₹ INR) *
              </label>
              <input
                type="number"
                min="199"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none font-bold text-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Time Slot & Day
            </label>
            <input
              type="text"
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              placeholder="e.g. Today, 04:30 PM"
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
            />
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
              className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Dispatch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
