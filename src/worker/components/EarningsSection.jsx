import React, { useState } from 'react';
import { 
  IndianRupee, TrendingUp, CreditCard, ArrowUpRight, CheckCircle2, 
  Building2, Landmark, ShieldCheck, Download, RefreshCw
} from 'lucide-react';

export default function EarningsSection({ worker, onWithdraw }) {
  const [showCashoutModal, setShowCashoutModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(worker.walletBalance || 500);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const handleCashoutSubmit = (e) => {
    e.preventDefault();
    if (withdrawAmount > 0 && withdrawAmount <= worker.walletBalance) {
      onWithdraw(withdrawAmount);
      setTransferSuccess(true);
      setTimeout(() => {
        setTransferSuccess(false);
        setShowCashoutModal(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Balance Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Wallet Balance Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between opacity-80 text-xs font-semibold uppercase tracking-wider">
              <span>Available Wallet Balance</span>
              <IndianRupee className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold mt-2">
              ₹{worker.walletBalance.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-400/30 flex items-center justify-between">
            <span className="text-xs text-emerald-100">Ready for instant payout</span>
            <button
              type="button"
              onClick={() => setShowCashoutModal(true)}
              className="px-4 py-1.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold text-xs shadow-md transition-all"
            >
              Instant Cashout
            </button>
          </div>
        </div>

        {/* Total Lifetime Earnings */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Lifetime Earnings
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              ₹{worker.totalEarnings.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>+24.5% compared to last month</span>
          </div>
        </div>

        {/* Linked Bank Account */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span>Payout Method</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">ACTIVE</span>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Linked Bank Account</div>
                <div className="text-xs text-slate-400 font-mono">•••• 4092 (Direct NEFT/IMPS)</div>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-400">
            0% transfer fee on instant and automated payouts
          </div>
        </div>

      </div>

      {/* Earnings Breakdown Schedule Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
          Recent Payout & Earnings Activity
        </h3>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                ↓
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Job Completion Payout - JOB-8799</div>
                <div className="text-slate-400">Sep 08, 2026 • 3-Phase Sub-panel Wiring</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">+₹1,600.00</div>
              <div className="text-[10px] text-slate-400">Completed</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                ↑
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Instant Cashout to Bank Account</div>
                <div className="text-slate-400">Sep 06, 2026 • Transferred via Instant NEFT</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-extrabold text-slate-700 dark:text-slate-300 text-sm">-₹4,800.00</div>
              <div className="text-[10px] text-slate-400">Transferred</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cashout Modal */}
      {showCashoutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-500" />
                <span>Instant Bank Withdrawal</span>
              </h3>
              <button onClick={() => setShowCashoutModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            {transferSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  Payout Sent Successfully!
                </div>
                <p className="text-xs text-slate-400">
                  ₹{withdrawAmount.toLocaleString('en-IN')} has been initiated to your linked bank account ending in 4092.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCashoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Select Payout Amount (Max: ₹{worker.walletBalance.toLocaleString('en-IN')})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-extrabold text-slate-400">₹</span>
                    <input
                      type="number"
                      max={worker.walletBalance}
                      min={10}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Destination Bank:</span>
                    <span className="font-bold text-slate-200">Linked Bank Account (•••• 4092)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Transfer Speed:</span>
                    <span className="font-bold text-emerald-400">Instant (Within 15 mins)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Processing Fee:</span>
                    <span className="font-bold text-emerald-400">₹0.00 (Free)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={worker.walletBalance <= 0}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg transition-all"
                >
                  Confirm Withdrawal of ₹{withdrawAmount.toLocaleString('en-IN')}
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
