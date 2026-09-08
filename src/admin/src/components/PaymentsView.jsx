import React, { useState } from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  RotateCcw,
  QrCode,
  Download,
  Receipt
} from 'lucide-react';

export default function PaymentsView({
  payments,
  onShowReceipt,
  onExportCSV,
  globalSearch
}) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  const activeQuery = (globalSearch || localSearch).toLowerCase().trim();

  const totalCollected = payments
    .filter((p) => p.status === 'Paid')
    .reduce((acc, p) => acc + p.amount, 0) + 420000;

  const totalPending = payments
    .filter((p) => p.status === 'Pending')
    .reduce((acc, p) => acc + p.amount, 0) + 17000;

  const totalRefunded = payments
    .filter((p) => p.status === 'Refunded')
    .reduce((acc, p) => acc + p.amount, 0) + 3000;

  const filteredPayments = payments.filter((p) => {
    const matchQuery =
      !activeQuery ||
      p.id.toLowerCase().includes(activeQuery) ||
      p.customerName.toLowerCase().includes(activeQuery) ||
      p.service.toLowerCase().includes(activeQuery) ||
      p.method.toLowerCase().includes(activeQuery);

    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchMethod = methodFilter === 'All' || p.method.includes(methodFilter);

    return matchQuery && matchStatus && matchMethod;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Payments & UPI Settlements
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track settlements via UPI (GPay/PhonePe), Net Banking, Cards, and Cash on Delivery.
          </p>
        </div>
        <button
          onClick={() => onExportCSV('payment')}
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-charcoal-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-charcoal-700 hover:bg-slate-50 dark:hover:bg-charcoal-800 rounded-xl font-semibold text-xs sm:text-sm shadow-sm active:scale-95 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Transactions (CSV)</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Collected
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{totalCollected.toLocaleString('en-IN')}
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Settled via UPI / Bank</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pending Invoices
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{totalPending.toLocaleString('en-IN')}
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Awaiting UPI payment</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Refunds / Adjustments
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <RotateCcw className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{totalRefunded.toLocaleString('en-IN')}
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Processed to customer VPA</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search transaction ID, customer, or UPI..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 md:flex-none text-xs sm:text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>

          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="flex-1 md:flex-none text-xs sm:text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Modes</option>
            <option value="UPI">UPI (GPay / PhonePe)</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Debit Card">Debit / Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-charcoal-850 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold border-b border-slate-100 dark:border-charcoal-800">
              <tr>
                <th className="py-3.5 px-4">Transaction ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Service Description</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Amount (₹)</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-charcoal-800">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    <Receipt className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                    <p className="font-bold text-sm text-slate-700 dark:text-slate-300">No transactions recorded</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => {
                  let statusBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-500/30';
                  if (p.status === 'Pending') {
                    statusBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-500/30';
                  } else if (p.status === 'Refunded') {
                    statusBadge = 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-500/30';
                  }

                  return (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-charcoal-850 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {p.id}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {p.customerName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {p.service}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-xs">
                        {p.date}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-blue-600 dark:text-blue-400">
                        ₹{p.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <QrCode className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{p.method}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onShowReceipt(p)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-charcoal-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" /> Invoice
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
