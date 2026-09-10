import React from 'react';
import { 
  LayoutDashboard, Briefcase, User, Zap, CheckCircle2, IndianRupee, 
  ShieldCheck, Star, HeartPulse, Settings, LogOut, Award, AlertCircle
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, activeJobsCount, availableJobsCount, onLogout, worker }) {
  const menuItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'available',
      label: 'Available Jobs',
      icon: Briefcase,
      badge: availableJobsCount > 0 ? availableJobsCount : null,
      badgeColor: 'bg-blue-600 text-white'
    },
    {
      id: 'active',
      label: 'Active Jobs',
      icon: Zap,
      badge: activeJobsCount > 0 ? activeJobsCount : null,
      badgeColor: 'bg-amber-500 text-slate-900 font-extrabold animate-pulse'
    },
    {
      id: 'completed',
      label: 'Completed Jobs',
      icon: CheckCircle2,
      badge: null
    },
    {
      id: 'earnings',
      label: 'Total Earnings',
      icon: IndianRupee,
      badge: `₹${(worker.walletBalance || 0).toLocaleString('en-IN')}`,
      badgeColor: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
    },
    {
      id: 'verification',
      label: 'High Verification',
      icon: ShieldCheck,
      badge: 'Level 3 Pro',
      badgeColor: 'bg-purple-500/20 text-purple-600 dark:text-purple-300'
    },
    {
      id: 'ratings',
      label: 'Ratings & Reviews',
      icon: Star,
      badge: `${worker.rating}★`,
      badgeColor: 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
    },
    {
      id: 'welfare',
      label: 'Welfare & Benefits',
      icon: HeartPulse,
      badge: '₹5L Insured',
      badgeColor: 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
    },
    {
      id: 'settings',
      label: 'Settings & Profile',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-full lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0 flex flex-col justify-between py-4 px-3">
      <div className="space-y-1">
        {/* Mobile horizontal scrolling nav fallback or grid, Desktop sidebar */}
        <div className="hidden lg:block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Main Operations
        </div>

        <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap lg:whitespace-normal ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 border border-blue-500/40 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{worker.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{worker.expertiseTitle}</div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
