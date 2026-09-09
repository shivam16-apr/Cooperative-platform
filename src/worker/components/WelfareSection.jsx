import React, { useState } from 'react';
import { 
  HeartPulse, Shield, IndianRupee, Tag, Gift, PhoneCall, CheckCircle2, Award, ArrowRight
} from 'lucide-react';
import { WELFARE_DATA } from '../data/mockData';

export default function WelfareSection({ worker }) {
  const [claimedVouchers, setClaimedVouchers] = useState({});
  const [loanAmount, setLoanAmount] = useState(10000);
  const [loanApplied, setLoanApplied] = useState(false);

  const handleClaimVoucher = (vId) => {
    setClaimedVouchers(prev => ({
      ...prev,
      [vId]: true
    }));
  };

  const handleApplyLoan = (e) => {
    e.preventDefault();
    setLoanApplied(true);
    setTimeout(() => setLoanApplied(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Hero Banner: Insurance Coverage */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-900/60 via-slate-900 to-slate-900 border border-rose-500/40 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 shadow-inner flex-shrink-0">
            <HeartPulse className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-rose-600 text-white shadow">
                FixMate CARE FUND
              </span>
              <span className="text-xs text-rose-300 font-semibold">Active Coverage</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              ₹5,00,000 Health & Accident Protection Policy
            </h2>
            <p className="text-xs text-rose-200/80 mt-0.5 max-w-lg">
              Policy ID: <strong>{WELFARE_DATA.insurancePolicyNumber}</strong> • Includes ₹1,00,000 hospitalization, ₹4,00,000 accidental cover, and family health benefits.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert(`Opening insurance claim portal for policy: ${WELFARE_DATA.insurancePolicyNumber}`)}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
        >
          <Shield className="w-4 h-4" />
          <span>File Claim / View Card</span>
        </button>
      </div>

      {/* Grid: Micro-loans + Health Checkup Vouchers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Micro-loan & Tool Advance */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                0% Interest Micro-Loan & Tool Advance
              </h3>
              <p className="text-xs text-slate-400">
                Pre-approved based on your 4.9★ rating & Level 3 verification
              </p>
            </div>
          </div>

          {loanApplied ? (
            <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold text-center">
              ✓ Micro-loan request for ₹{loanAmount.toLocaleString('en-IN')} submitted! Funds will reflect in wallet in 10 mins.
            </div>
          ) : (
            <form onSubmit={handleApplyLoan} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 flex justify-between mb-1">
                  <span>Loan Amount</span>
                  <span className="text-amber-500 font-extrabold">₹{loanAmount.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="25000"
                  step="500"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Interest Rate:</span>
                  <span className="font-bold text-emerald-400">0% for 30 Days</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Repayment:</span>
                  <span className="font-bold text-slate-200">Deducted from future job earnings</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold text-xs shadow transition-all"
              >
                Apply Instant Advance of ₹{loanAmount.toLocaleString('en-IN')}
              </button>
            </form>
          )}
        </div>

        {/* Free Health Vouchers */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Free Health & Vision Vouchers
              </h3>
              <p className="text-xs text-slate-400">Complimentary wellness perks for active workers</p>
            </div>
          </div>

          <div className="space-y-3">
            {WELFARE_DATA.healthVouchers.map((v) => (
              <div 
                key={v.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{v.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Code: {v.code}</div>
                </div>

                {claimedVouchers[v.id] ? (
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Claimed
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleClaimVoucher(v.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow"
                  >
                    Claim Voucher
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Equipment & Tool Store Discounts */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Tag className="w-5 h-5 text-amber-500" />
          <span>Exclusive Equipment & Tool Discounts</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {WELFARE_DATA.toolDiscounts.map((t, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{t.brand}</span>
                <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-amber-500 text-slate-900">{t.discount}</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 bg-slate-200 dark:bg-slate-800 p-1.5 rounded text-center">
                Use Coupon: <strong>{t.code}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
