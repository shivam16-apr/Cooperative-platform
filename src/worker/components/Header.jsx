import React, { useState } from 'react';
import { 
  Bell, Sun, Moon, ShieldAlert, Zap, Power, CheckCircle, AlertTriangle, User, LogOut, ChevronDown, Award
} from 'lucide-react';
import { EXPERTISE_BRANCHES } from '../data/mockData';
import fixmateLogo from '../assets/fixmate-logo.jpg';

export default function Header({ 
  worker, 
  onToggleOnlineStatus, 
  unreadNotificationCount, 
  onOpenNotifications, 
  isDarkMode, 
  onToggleDarkMode, 
  onLogout 
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const branchObj = EXPERTISE_BRANCHES.find(b => b.id === worker.expertiseId);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 transition-colors duration-200">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Mobile Title / Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <img 
              src={fixmateLogo}
              alt="FixMate Logo" 
              className="w-9 h-9 object-contain drop-shadow-sm rounded-lg"
            />
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                FixMate <span className="text-blue-600 dark:text-blue-400">Worker</span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">Portal</span>
              </h1>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <span>{worker.expertiseTitle}</span>
                <span>•</span>
                <span className="text-amber-500 font-semibold flex items-center gap-0.5">
                  ★ {worker.rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Online / Offline Toggle Switch */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-3 px-3.5 py-1.5 rounded-full border transition-all ${
            worker.isOnline 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 shadow-sm shadow-emerald-500/10' 
              : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400'
          }`}>
            {/* Status pulsing dot */}
            <div className="relative flex items-center justify-center">
              <span className={`w-3 h-3 rounded-full ${
                worker.isOnline ? 'bg-emerald-500 pulse-online' : 'bg-slate-400'
              }`} />
            </div>

            <div className="text-xs font-semibold select-none flex items-center gap-1.5">
              <span>{worker.isOnline ? 'ONLINE (Receiving Jobs)' : 'OFFLINE (Paused)'}</span>
            </div>

            {/* Toggle slider */}
            <button
              type="button"
              onClick={onToggleOnlineStatus}
              aria-label="Toggle Online Availability"
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                worker.isOnline ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-600'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  worker.isOnline ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            title="Toggle theme mode"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Notifications Bell */}
          <button
            type="button"
            onClick={onOpenNotifications}
            title="Notifications"
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 border border-blue-500/40 flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="hidden md:inline text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                {worker.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setShowProfileMenu(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700/60">
                  <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{worker.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{worker.email}</div>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Award className="w-3 h-3" /> Level {worker.verificationLevel} Verified
                  </div>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout & Switch Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
