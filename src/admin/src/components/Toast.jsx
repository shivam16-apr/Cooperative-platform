import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => {
        let bgClass = 'bg-blue-900/90 text-blue-100 border-blue-700';
        let Icon = Info;

        if (toast.type === 'success') {
          bgClass = 'bg-emerald-950/95 text-emerald-100 border-emerald-700 shadow-emerald-950/50';
          Icon = CheckCircle2;
        } else if (toast.type === 'warning') {
          bgClass = 'bg-amber-950/95 text-amber-100 border-amber-700 shadow-amber-950/50';
          Icon = AlertTriangle;
        } else if (toast.type === 'error') {
          bgClass = 'bg-rose-950/95 text-rose-100 border-rose-700 shadow-rose-950/50';
          Icon = XCircle;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${bgClass}`}
          >
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
              {toast.message}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="opacity-70 hover:opacity-100 text-xs font-bold px-1 transition-opacity"
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
}
