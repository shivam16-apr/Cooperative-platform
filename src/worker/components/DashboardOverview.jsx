import React from 'react';
import { 
  DollarSign, Briefcase, Zap, Star, ShieldCheck, ArrowUpRight, TrendingUp,  
  Clock, MapPin, CheckCircle, HeartPulse, Sparkles, ChevronRight, AlertCircle, Calendar, XCircle
} from 'lucide-react';
import { EXPERTISE_BRANCHES } from '../data/mockData';
import { IndianRupee } from "lucide-react";

export default function DashboardOverview({ 
  worker, 
  availableJobs, 
  activeJobs, 
  completedJobs, 
  setActiveTab, 
  onAcceptJob,
  onRejectJob,
  onOpenJobDetails 
}) {
  const branchObj = EXPERTISE_BRANCHES.find(b => b.id === worker.expertiseId);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner: Online / Offline Alert */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        worker.isOnline 
          ? 'bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/30' 
          : 'bg-gradient-to-r from-slate-500/10 via-slate-500/5 to-transparent border-slate-700'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
              worker.isOnline ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-700 text-slate-300'
            }`}>
              {worker.isOnline ? '⚡' : '💤'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Welcome back, {worker.name}!
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  {worker.expertiseTitle}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {worker.isOnline 
                  ? `You are ONLINE within ${worker.serviceRadiusKm} km of ${worker.city}. Receiving live dispatch requests!` 
                  : 'You are currently OFFLINE. Toggle online status above to start accepting job requests.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {worker.isOnline ? (
              <button
                type="button"
                onClick={() => setActiveTab('available')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all"
              >
                <span>Browse {availableJobs.length} Available Jobs</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all"
              >
                <span>Service Settings</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Earnings */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Earnings</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              ₹{worker.totalEarnings.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% this week</span>
              <span className="text-slate-400 font-normal ml-auto">Wallet: ₹{worker.walletBalance.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Jobs */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              {activeJobs.length} <span className="text-xs font-normal text-slate-400">In Progress</span>
            </div>
            <div className="mt-1 text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeJobs.length > 0 ? `${activeJobs[0].title.slice(0, 22)}...` : 'No active jobs right now'}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Rating & Reviews */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Worker Rating</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-baseline gap-1.5">
              {worker.rating} <span className="text-xs font-semibold text-slate-400">/ 5.0</span>
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              Based on {worker.totalReviews} customer reviews
            </div>
          </div>
        </div>

        {/* Card 4: Verification Level */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Verification Level</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 truncate">
              {worker.verificationStatus}
            </div>
            <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>100% Background Cleared</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Live Jobs Feed + Quick Welfare/Stats Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 cols): Available & Active Jobs Highlights */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Job Alert if any */}
          {activeJobs.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 animate-bounce" /> Current Ongoing Job
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Ready to Execute
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {activeJobs[0].title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Customer: <strong>{activeJobs[0].customerName}</strong> • {activeJobs[0].address}
              </p>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-amber-500/20">
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  Payout: ₹{activeJobs[0].payout}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('active')}
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs shadow transition-all"
                >
                  Manage Active Job →
                </button>
              </div>
            </div>
          )}

          {/* Nearby Available Jobs Feed */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Urgent Job Opportunities</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">
                    {availableJobs.length} nearby
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Filtered for {worker.expertiseTitle} within {worker.serviceRadiusKm} km
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('available')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {availableJobs.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                <Briefcase className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">No available jobs in your queue right now</div>
                <div className="text-xs text-slate-400 mt-1">Make sure you are ONLINE or expand your service radius in Settings.</div>
              </div>
            ) : (
              <div className="space-y-3">
                {availableJobs.slice(0, 3).map((job) => (
                  <div 
                    key={job.id} 
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/70 hover:border-blue-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                          {job.urgency}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.distanceKm} km away
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {job.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {job.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
                      <div className="text-right">
                        <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">₹{job.payout}</div>
                        <div className="text-[10px] text-slate-400">{job.estimatedDuration}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onRejectJob && onRejectJob(job.id)}
                          className="px-2.5 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition-all"
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          disabled={!worker.isOnline}
                          onClick={() => onAcceptJob(job)}
                          title={!worker.isOnline ? "Go ONLINE in top header to accept jobs" : "Accept Job"}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            worker.isOnline
                              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow cursor-pointer'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
                          }`}
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column (1 col): Welfare & Quick Actions */}
        <div className="space-y-6">
          
          {/* FixMate Worker Welfare Highlights Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/30 text-white shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <HeartPulse className="w-5 h-5 text-rose-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white">Worker Welfare & Protection</h3>
            </div>
            <p className="text-xs text-purple-200/80">
              Active FixMate Worker policy status: <strong>₹5,00,000 Medical Cover</strong>
            </p>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                <span>Free Health Voucher</span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                <span>Tool Purchase Advance</span>
                <span className="text-amber-400 font-bold">₹25,000 Eligible</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('welfare')}
              className="mt-4 w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow"
            >
              Access Welfare Portal
            </button>
          </div>

          {/* Quick Actions Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Quick Worker Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('earnings')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left hover:border-emerald-500/50 transition-all group"
              >
                <DollarSign className="w-5 h-5 text-emerald-500 mb-1" />
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Withdraw Cash</div>
                <div className="text-[10px] text-slate-400">Instant payout</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('verification')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left hover:border-purple-500/50 transition-all group"
              >
                <ShieldCheck className="w-5 h-5 text-purple-500 mb-1" />
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Badges & ID</div>
                <div className="text-[10px] text-slate-400">Level 3 Pro</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ratings')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left hover:border-amber-500/50 transition-all group"
              >
                <Star className="w-5 h-5 text-amber-500 mb-1" />
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">View Reviews</div>
                <div className="text-[10px] text-slate-400">{worker.rating}★ Rating</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left hover:border-blue-500/50 transition-all group"
              >
                <Sparkles className="w-5 h-5 text-blue-500 mb-1" />
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Edit Profile</div>
                <div className="text-[10px] text-slate-400">Rate & branch</div>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
