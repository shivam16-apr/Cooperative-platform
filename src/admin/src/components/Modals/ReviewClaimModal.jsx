import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  AlertCircle,
  IndianRupee,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Send
} from 'lucide-react';

export default function ReviewClaimModal({ isOpen, claim, onClose, onApprove, onReject }) {
  if (!isOpen || !claim) return null;

  const [approvedAmount, setApprovedAmount] = useState(claim.amountClaimed || 0);
  const [adminNotes, setAdminNotes] = useState(
    'Verified with hospital discharge counter & geo-timestamp. Eligible for instant welfare fund disbursement.'
  );
  const [rejectReason, setRejectReason] = useState('');
  const [mode, setMode] = useState('review'); // 'review' | 'rejecting'

  const handleApprove = () => {
    onApprove(claim.id, Number(approvedAmount), adminNotes);
    onClose();
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejecting the insurance claim.');
      return;
    }
    onReject(claim.id, rejectReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-charcoal-800 bg-slate-50/50 dark:bg-charcoal-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Welfare Claim Adjudication
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">
                  {claim.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                FixMate Worker Welfare & Emergency Social Security Board
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">

          {/* Worker Snapshot Banner */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-charcoal-850 border border-slate-200 dark:border-charcoal-750">
            <div className="flex items-center gap-3.5">
              
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {claim.workerName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {claim.workerRole} • ID: <span className="font-mono">{claim.workerId}</span>
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                  Direct Benefit Transfer: <span className="font-mono font-semibold">{claim.upiId}</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                {claim.status}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Filed on: {claim.date}
              </p>
            </div>
          </div>

          {/* Claim Incident & Hospitalization Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-charcoal-800 bg-white dark:bg-charcoal-900/40">
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                Nature of Incident
              </span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                {claim.type}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {claim.description}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-charcoal-800 bg-white dark:bg-charcoal-900/40">
              <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">
                Hospital / Medical Center
              </span>
              <div className="flex items-center gap-2 mt-1">
                <Building2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {claim.hospital}
                </p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Covered Policy: <span className="text-blue-600 dark:text-blue-400 font-medium">{claim.policy}</span>
              </p>
            </div>
          </div>

          {/* Attached Supporting Documents */}
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
              Attached Medical Proofs & Receipts ({claim.documents?.length || 0})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {claim.documents?.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-charcoal-800 bg-slate-50/70 dark:bg-charcoal-800/60 hover:border-blue-500 transition-colors cursor-pointer group"
                >
                  <FileText className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate" title={doc}>
                    {doc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Amount Requested vs Adjudication */}
          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Total Claimed by Technician:
                </span>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                  ₹{claim.amountClaimed?.toLocaleString('en-IN')}
                </p>
              </div>

              {mode === 'review' && (
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Approved Payout (INR):
                  </label>
                  <div className="relative w-36">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={approvedAmount}
                      onChange={(e) => setApprovedAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 rounded-lg border border-slate-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 text-slate-900 dark:text-white text-sm font-bold focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {mode === 'review' ? (
              <div className="mt-3">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                  Adjudication Remarks / Auditor Note:
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div className="mt-3">
                <label className="text-xs font-bold text-rose-600 dark:text-rose-400 block mb-1">
                  Reason for Rejecting Claim (Communicated to Worker via SMS/App):
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Missing official hospital GST bill or incident occurred off-shift..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-rose-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-charcoal-800 bg-slate-50/50 dark:bg-charcoal-950/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {mode === 'review' ? (
              <>
                <button
                  type="button"
                  onClick={() => setMode('rejecting')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 border border-rose-200 dark:border-rose-800/40 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Claim
                </button>

                <button
                  type="button"
                  onClick={handleApprove}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/20 transition-all hover:scale-102"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve & Disburse ₹{Number(approvedAmount || 0).toLocaleString('en-IN')} (UPI)
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setMode('review')}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-charcoal-800"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-600/20 transition-all"
                >
                  <XCircle className="w-4 h-4" />
                  Confirm Rejection
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
