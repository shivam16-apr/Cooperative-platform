import React, { useState } from 'react';
import { 
  Zap, Phone, MessageSquare, MapPin, Navigation, Clock, CheckCircle2, 
  ShieldCheck, AlertCircle, FileText, CheckCircle, ArrowRight, Play, Wrench
} from 'lucide-react';

export default function ActiveJobs({ activeJobs, onCompleteJob }) {
  const [jobStage, setJobStage] = useState('started'); // 'started' | 'completing'
  const [completionNotes, setCompletionNotes] = useState('');

  if (activeJobs.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <Zap className="w-12 h-12 mx-auto text-amber-500 mb-3" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No active jobs right now</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
          Accept a job from the Available Jobs queue to start tracking ongoing work here.
        </p>
      </div>
    );
  }

  const currentJob = activeJobs[0];

  const handleFinishJob = () => {
    onCompleteJob({
      ...currentJob,
      completionNotes: completionNotes || 'Job completed safely according to customer specifications.',
      rating: 5,
      review: 'Customer verified work and signed completion summary.'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded bg-amber-500 text-slate-900 animate-pulse">
                ⚡ IN PROGRESS
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {currentJob.id}</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {currentJob.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Customer: <strong>{currentJob.customerName}</strong> • {currentJob.address}
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400">Total Agreed Payout</div>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              ₹{currentJob.payout}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Quick Actions & Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href={`tel:${currentJob.customerPhone}`}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all"
        >
          <Phone className="w-4 h-4" />
          <span>Call Customer ({currentJob.customerPhone})</span>
        </a>

        <button
          type="button"
          onClick={() => alert(`Opening direct chat with ${currentJob.customerName}...`)}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all"
        >
          <MessageSquare className="w-4 h-4 text-blue-400" />
          <span>Chat Messages</span>
        </button>

        <button
          type="button"
          onClick={() => alert(`Launching GPS navigation to: ${currentJob.address}`)}
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow transition-all"
        >
          <Navigation className="w-4 h-4" />
          <span>Open GPS Maps</span>
        </button>
      </div>

      {/* Execution Tracker */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Job Execution Status
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Work authorized upon accept. Proceed directly with on-site service.
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Accepted & Active</span>
          </span>
        </div>

        {/* Job Details Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Wrench className="w-4 h-4 text-blue-500" />
            <span>Service Instructions & Requirements</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {currentJob.description}
          </p>
          {currentJob.notes && (
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-700 dark:text-amber-400">
              <strong>Note:</strong> {currentJob.notes}
            </div>
          )}
        </div>

        {/* Notes & Complete Action */}
        <div className="space-y-4">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Work Completion Summary Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={completionNotes}
            onChange={(e) => setCompletionNotes(e.target.value)}
            placeholder="e.g. Completed maintenance, checked connections, verified voltage and cleaned workspace."
            className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            type="button"
            onClick={handleFinishJob}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Mark Job Complete & Collect ₹{currentJob.payout}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
