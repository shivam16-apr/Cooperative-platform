import React, { useState } from 'react';
import { 
  Briefcase, MapPin, Clock, IndianRupee, Filter, Search, ShieldCheck, 
  CheckCircle, ArrowRight, AlertTriangle, Zap, SlidersHorizontal, XCircle
} from 'lucide-react';
import { EXPERTISE_BRANCHES } from '../data/mockData';

export default function AvailableJobs({ worker, availableJobs, onAcceptJob, onRejectJob, onOpenJobDetails }) {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = availableJobs.filter(job => {
    // Search query filter
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    // Category / Urgency filter
    if (filterType === 'urgent') return matchesSearch && job.urgency.toLowerCase().includes('urgent');
    if (filterType === 'high_payout') return matchesSearch && job.payout >= 700;
    if (filterType === 'nearest') return matchesSearch && job.distanceKm <= 3;
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              Available Jobs Queue
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">
              {filteredJobs.length} Available
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Jobs matching your trade branch <strong>({worker.expertiseTitle})</strong> within {worker.serviceRadiusKm} km radius
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search job title, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filterType === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterType('urgent')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filterType === 'urgent' ? 'bg-amber-500 text-slate-900 shadow-sm' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Urgent
            </button>
            <button
              type="button"
              onClick={() => setFilterType('high_payout')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filterType === 'high_payout' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              High Payout (₹700+)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('nearest')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filterType === 'nearest' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Nearest (&lt;3km)
            </button>
          </div>
        </div>
      </div>

      {!worker.isOnline && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>You are currently OFFLINE. Toggle online status to accept job dispatches!</span>
          </div>
        </div>
      )}

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
          <Briefcase className="w-12 h-12 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No matching jobs found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or switching filters to see more job dispatches.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div 
              key={job.id} 
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {job.urgency}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Posted {job.postedTime}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1">
                  {job.title}
                </h3>
                
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2">
                  {job.description}
                </p>

                {/* Requirements tag pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.requirements.map((req, idx) => (
                    <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                      • {req}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location & Payout Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>{job.address}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-3">
                    <span>{job.distanceKm} km away</span>
                    <span>• Est. {job.estimatedDuration}</span>
                  </div>
                </div>

                <div className="text-right pl-3 flex-shrink-0">
                  <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                    ₹{job.payout}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onRejectJob && onRejectJob(job.id)}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold text-xs transition-all flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      type="button"
                      disabled={!worker.isOnline}
                      onClick={() => onAcceptJob(job)}
                      title={!worker.isOnline ? "Go ONLINE in top header to accept jobs" : "Accept Job"}
                      className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 ${
                        worker.isOnline
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 cursor-pointer'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
                      }`}
                    >
                      <span>Accept</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
