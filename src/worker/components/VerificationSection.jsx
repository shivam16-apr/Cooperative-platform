import React from 'react';
import { 
  ShieldCheck, FileCheck, Award, HeartPulse, CheckCircle2, 
  UploadCloud, AlertCircle, ExternalLink, Lock
} from 'lucide-react';
import { VERIFICATION_DATA } from '../data/mockData';

export default function VerificationSection({ worker }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* High-Level Verification Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/60 via-purple-900/30 to-slate-900 border border-purple-500/40 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-inner flex-shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-500 text-white shadow">
                {VERIFICATION_DATA.levelName}
              </span>
              <span className="text-xs text-purple-300 font-semibold">100% Cleared</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              High Level Verification Tier
            </h2>
            <p className="text-xs text-purple-200/80 mt-0.5 max-w-lg">
              Level 3 Pros receive 40% higher dispatch priority, access to high-value commercial jobs, and instant bank cashout privileges.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-950/80 border border-purple-500/30 text-center w-full md:w-auto">
          <div className="text-xs font-semibold text-purple-300">Trust Index Score</div>
          <div className="text-3xl font-extrabold text-white">99 / 100</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-0.5">Top 1% Skilled Worker</div>
        </div>
      </div>

      {/* Verification Documents Checklist */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-500" />
              <span>Verified Identity & Background Checks</span>
            </h3>
            <p className="text-xs text-slate-400">All certificates are re-validated annually by the platform trust officer</p>
          </div>
          <button 
            type="button"
            onClick={() => alert('Verification renewal portal opening...')}
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition-all flex items-center gap-1.5"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload New Document</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VERIFICATION_DATA.documents.map((doc) => (
            <div 
              key={doc.id} 
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{doc.name}</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Issuer: <strong>{doc.issuer}</strong>
                </div>
                <div className="text-[11px] text-slate-400">
                  {doc.verifiedDate}
                </div>
              </div>

              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
