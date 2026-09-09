import React, { useState } from 'react';
import { 
  CheckCircle2, Star, Calendar, FileText, Download, ShieldCheck, IndianRupee, Search
} from 'lucide-react';

export default function CompletedJobs({ completedJobs, worker }) {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = completedJobs.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (j.invoiceNo && j.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalEarnedHistory = completedJobs.reduce((acc, curr) => acc + (curr.payout || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Completed Jobs History</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
              {completedJobs.length} Jobs Finished
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Historical record of all completed bookings, payouts & customer ratings
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
            Total Earned: ₹{totalEarnedHistory.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Filter by customer, job title, invoice #..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* History Table / Cards */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-400 text-xs">
          No completed job records matching search.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((job) => (
            <div 
              key={job.id} 
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{job.date || 'Sep 08, 2026'}</span>
                  <span>•</span>
                  <span className="font-mono text-slate-500">{job.invoiceNo || `INV-${job.id}`}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {job.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Customer: <strong>{job.customerName}</strong>
                </p>

                {job.review && (
                  <div className="mt-2 text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 italic">
                    "{job.review}"
                  </div>
                )}
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1">
                  {[...Array(job.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                  +₹{job.payout}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedInvoice(job)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 font-semibold text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-500" />
                  <span>View Invoice</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Tax Invoice / Receipt</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedInvoice.invoiceNo || 'INV-FixMate Worker-99'}</p>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/60">
                <span className="text-slate-500">Service Provider:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{worker.name} ({worker.expertiseTitle})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/60">
                <span className="text-slate-500">Customer Name:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedInvoice.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/60">
                <span className="text-slate-500">Job Description:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedInvoice.title}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-700/60">
                <span className="text-slate-500">Total Paid Amount:</span>
                <span className="font-bold text-emerald-500 text-sm">₹{selectedInvoice.payout}</span>
              </div>
            </div>

            <div className="pt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  alert('Printing / Downloading official PDF receipt...');
                  setSelectedInvoice(null);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
