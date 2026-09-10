import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Moon,
  Sun,
  Bell,
  Plus,
  AlertTriangle,
  IndianRupee,
  CalendarPlus,
  Check
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  theme,
  toggleTheme,
  notifications,
  markAllNotificationsRead,
  onNewBookingClick,
  globalSearch,
  setGlobalSearch,
  backendStatus = 'fallback',
  onRefreshData,
  adminUser
}) {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const notifRef = useRef(null);

  const handleRefresh = async () => {
    if (onRefreshData) {
      setIsRefreshing(true);
      try {
        await onRefreshData();
      } finally {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur-md border-b border-slate-200 dark:border-charcoal-800 px-4 lg:px-6 flex items-center justify-between transition-colors">
      {/* Left side: Hamburger + Global Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-charcoal-800 lg:hidden transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Brand Logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-white p-0.5 border border-slate-200 dark:border-charcoal-700 shadow-sm flex items-center justify-center shrink-0">
            <img src="/logo-icon.png" alt="FixMate Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">FixMate</span>
        </div>

        {/* Backend Connectivity Status Pill */}
        <div className="hidden sm:flex items-center gap-2">
          {backendStatus === 'connected' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Backend API
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" title="Running in offline mock mode. Start backend on port 5000 to sync real PostgreSQL data.">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Mock Fallback Mode
            </span>
          )}

          {onRefreshData && (
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
              title="Sync with Backend"
            >
              <span className={`inline-block text-xs ${isRefreshing ? 'animate-spin' : ''}`}>🔄</span>
            </button>
          )}
        </div>
      </div>

      {/* Right side: Theme + Notifications + Quick Action */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-charcoal-800 border border-slate-200/80 dark:border-charcoal-700 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-charcoal-800 border border-slate-200/80 dark:border-charcoal-700 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-charcoal-900">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-700 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-charcoal-800 bg-slate-50 dark:bg-charcoal-850">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Recent Alerts</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <Check className="w-3.5 h-3.5" /> Mark read
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-charcoal-800">
                {notifications.map((n) => {
                  let iconBg = 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
                  let Icon = CalendarPlus;
                  if (n.type === 'danger') {
                    iconBg = 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400';
                    Icon = AlertTriangle;
                  } else if (n.type === 'success') {
                    iconBg = 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
                    Icon = IndianRupee;
                  }

                  return (
                    <div
                      key={n.id}
                      className={`p-3.5 flex gap-3 hover:bg-slate-50 dark:hover:bg-charcoal-800 transition-colors ${n.unread ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{n.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{n.desc}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 border-t border-slate-100 dark:border-charcoal-800 text-center bg-slate-50 dark:bg-charcoal-850">
                <button
                  onClick={() => {
                    navigate('/bookings');
                    setNotifOpen(false);
                  }}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  View All Service Requests &rarr;
                </button>
              </div>
            </div>
          )}
        </div>


      </div>
    </header>
  );
}
