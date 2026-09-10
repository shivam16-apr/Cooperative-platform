import React from 'react';
import {
  X,
  ShieldCheck,
  Award,
  CheckCircle,
  AlertTriangle,
  FileBadge,
  HeartHandshake,
  Download,
  IndianRupee,
  Phone,
  MapPin,
  Check
} from 'lucide-react';

export default function WorkerWelfareModal({ isOpen, worker, onClose, onToggleWelfareEnrollment }) {
  if (!isOpen || !worker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-charcoal-800 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-300 font-bold">
              <FileBadge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight text-white">
                  Karmik Social Security Passport
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Verified
                </span>
              </div>
              <p className="text-xs text-blue-200">
                FixMate Worker Welfare & Social Protection Directorate
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">

          {/* Worker Bio Card */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-charcoal-850 border border-slate-200 dark:border-charcoal-750">
            <div className="flex items-center gap-3.5">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {worker.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {worker.role} • ID: <span className="font-mono font-semibold">{worker.id}</span>
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    {worker.zone || 'Delhi NCR'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {worker.phone}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                worker.insuranceStatus === 'Active'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
              }`}>
                {worker.insuranceStatus || 'Active'}
              </span>
              <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                Rating: ⭐ {worker.rating} / 5.0
              </p>
            </div>
          </div>

          {/* Insurance Card Section */}
          <div className="p-4 rounded-xl border border-blue-200/70 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                  Active Insurance Coverage
                </h5>
              </div>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded">
                100% Subsidized
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white dark:bg-charcoal-900 p-2.5 rounded-lg border border-slate-200/80 dark:border-charcoal-800">
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  Primary Policy
                </span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                  {worker.insurancePolicy || 'Basic Worker Protection'}
                </p>
              </div>

              <div className="bg-white dark:bg-charcoal-900 p-2.5 rounded-lg border border-slate-200/80 dark:border-charcoal-800">
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  Covered Sum
                </span>
                <p className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">
                  ₹{(worker.insuranceCoverage || 200000).toLocaleString('en-IN')}
                </p>
              </div>

              <div className="bg-white dark:bg-charcoal-900 p-2.5 rounded-lg border border-slate-200/80 dark:border-charcoal-800">
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  Ayushman ABHA ID
                </span>
                <p className="font-mono text-[11px] font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {worker.abhaId || 'ABHA-91-8841-0021'}
                </p>
              </div>

              <div className="bg-white dark:bg-charcoal-900 p-2.5 rounded-lg border border-slate-200/80 dark:border-charcoal-800">
                <span className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  PMSBY Scheme
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  Govt. Subsidized
                </p>
              </div>
            </div>
          </div>

          {/* Welfare Status Checklist */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
              Welfare Status & Social Security Checklist
            </h5>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-charcoal-800 bg-slate-50 dark:bg-charcoal-850">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Eligible</p>
                  <p className="text-[10px] text-slate-400">KYC & Hours met</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-charcoal-800 bg-slate-50 dark:bg-charcoal-850">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  worker.welfareEnrolled
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {worker.welfareEnrolled ? 'Enrolled' : 'Pending'}
                  </p>
                  <p className="text-[10px] text-slate-400">Board Registry</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-charcoal-800 bg-slate-50 dark:bg-charcoal-850">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  worker.benefitsActive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-500/10 text-slate-400'
                }`}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Benefits</p>
                  <p className="text-[10px] text-slate-400">Active & Ready</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Subsidies List */}
          <div className="space-y-2">
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Active Welfare Grants Claimable
            </h5>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg border border-slate-100 dark:border-charcoal-800 bg-white dark:bg-charcoal-900">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  🎓 Karmik Shiksha Grant (Children Education)
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">₹5,000 / yr</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg border border-slate-100 dark:border-charcoal-800 bg-white dark:bg-charcoal-900">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  🌧️ Monsoon & Winter Safety Kit (Jacket, Boots, Bag)
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">Disbursed (Aug 2026)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg border border-slate-100 dark:border-charcoal-800 bg-white dark:bg-charcoal-900">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  🩺 24x7 Doctor Teleconsultation & OPD Medicines
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Active (Free)</span>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-charcoal-850 border border-slate-200 dark:border-charcoal-800 text-xs">
            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider block mb-0.5">
              Emergency Nominee & Kin:
            </span>
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              {worker.emergencyContact || 'Sunita Kumar (Wife): +91 98201 99124'}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-charcoal-800 bg-slate-50/50 dark:bg-charcoal-950/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {onToggleWelfareEnrollment && (
              <button
                type="button"
                onClick={() => onToggleWelfareEnrollment(worker.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  worker.welfareEnrolled
                    ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md'
                }`}
              >
                {worker.welfareEnrolled ? 'Revoke Enrollment' : 'Enroll in Welfare Board'}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                alert(`Downloaded Welfare Security Identity Card for ${worker.name}`);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Download ID Card
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
