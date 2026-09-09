import React, { useEffect, useRef } from 'react';
import { Bell, Check, Zap, IndianRupee, Star, HeartPulse, X, CheckCheck } from 'lucide-react';

const notificationIcons = {
  job: <Zap className="w-4 h-4 text-blue-500" />,
  payout: <IndianRupee className="w-4 h-4 text-emerald-500" />,
  review: <Star className="w-4 h-4 text-amber-500 fill-amber-500" />,
  welfare: <HeartPulse className="w-4 h-4 text-rose-500" />
};

export default function NotificationsModal({ notifications, onClose, onMarkAllRead }) {
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex justify-end p-3 sm:p-5 sm:pt-16">
      <div 
        ref={dropdownRef}
        className="pointer-events-auto w-full max-w-sm sm:max-w-md bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-3.5 animate-in fade-in slide-in-from-top-3 duration-200"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-600 text-white">
                    {unreadCount} new
                  </span>
                )}
              </h3>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllRead}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
            <button 
              onClick={onClose} 
              aria-label="Close notifications panel"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No notifications yet.
            </div>
          ) : (
            notifications.map((n) => (
              <div 
                key={n.id}
                className={`p-3 rounded-xl border text-xs transition-all flex items-start gap-3 ${
                  !n.read 
                    ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40 text-slate-900 dark:text-white' 
                    : 'bg-slate-50/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                <div className="mt-0.5 p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 flex-shrink-0">
                  {notificationIcons[n.type] || <Bell className="w-4 h-4 text-blue-500" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className={`font-bold truncate ${!n.read ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}`}>
                      {n.title}
                    </span>
                    <span className="text-[10px] text-slate-400 flex-shrink-0 font-medium">{n.time}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">{n.message}</p>
                </div>

                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
