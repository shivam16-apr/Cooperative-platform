import React, { useState } from 'react';
import { Lock, ArrowRight, LogOut } from 'lucide-react';
import { logoutSession } from '../../api/client';
import { useNavigate } from 'react-router-dom';

export default function ReloginOverlay({ isOpen, adminName, onRelogin }) {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUnlock = (e) => {
    e.preventDefault();
    onRelogin();
    setPin('');
  };

  const handleFullLogout = () => {
    logoutSession();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/95 dark:bg-charcoal-950/98 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-700 shadow-2xl p-8 text-center">
        {/* Brand */}
        <div className="w-16 h-16 rounded-2xl bg-white p-1.5 flex items-center justify-center mx-auto shadow-xl shadow-blue-600/20 mb-4 border border-slate-100 dark:border-charcoal-700">
          <img src="/logo-icon.png" alt="FixMate Logo" className="w-full h-full object-contain" />
        </div>

        <h2 className="font-extrabold text-xl text-slate-900 dark:text-white">FixMate India</h2>
        <p className="text-xs text-slate-400 mt-1">Session Locked for Security</p>

        <div className="my-6 p-3.5 rounded-2xl bg-slate-50 dark:bg-charcoal-850 border border-slate-100 dark:border-charcoal-800 flex items-center gap-3">
          
          <div className="text-left">
            <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{adminName}</h4>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              ● Active Session Paused
            </span>
          </div>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              placeholder="Enter Admin Password / PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full pl-4 pr-10 py-3 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-charcoal-800 text-slate-900 dark:text-slate-100 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-charcoal-850 focus:outline-none text-center tracking-widest font-mono"
            />
            <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
          >
            <span>Resume Operations Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-charcoal-800">
          <button
            type="button"
            onClick={handleFullLogout}
            className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 font-medium inline-flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Switch Account / Full Logout
          </button>
        </div>
      </div>
    </div>
  );
}
