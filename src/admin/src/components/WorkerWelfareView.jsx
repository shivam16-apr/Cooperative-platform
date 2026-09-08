import React, { useState } from 'react';
import {
  ShieldCheck,
  HeartHandshake,
  FileText,
  Users,
  Award,
  IndianRupee,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Search,
  Download,
  Filter,
  Eye,
  ExternalLink,
  Building2,
  Umbrella
} from 'lucide-react';

export default function WorkerWelfareView({
  workers,
  claims,
  welfareOverview,
  insurancePolicies,
  welfareBenefits,
  onReviewClaim,
  onViewWorkerWelfare,
  onToggleEnrollment,
  globalSearch = '',
  initialTab = 'insurance'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [claimStatusFilter, setClaimStatusFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  const activeSearch = (globalSearch || localSearch).toLowerCase().trim();

  // Filtered claims
  const filteredClaims = claims.filter((claim) => {
    const matchesStatus =
      claimStatusFilter === 'All' ? true : claim.status === claimStatusFilter;
    const matchesQuery =
      !activeSearch ||
      claim.workerName.toLowerCase().includes(activeSearch) ||
      claim.id.toLowerCase().includes(activeSearch) ||
      claim.type.toLowerCase().includes(activeSearch) ||
      claim.hospital.toLowerCase().includes(activeSearch);
    return matchesStatus && matchesQuery;
  });

  // Filtered workers
  const filteredWorkers = workers.filter((w) => {
    return (
      !activeSearch ||
      w.name.toLowerCase().includes(activeSearch) ||
      w.role.toLowerCase().includes(activeSearch) ||
      (w.zone && w.zone.toLowerCase().includes(activeSearch)) ||
      (w.insurancePolicy && w.insurancePolicy.toLowerCase().includes(activeSearch))
    );
  });

  const pendingClaimsCount = claims.filter((c) => c.status === 'Pending').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Executive Hero Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 p-6 rounded-2xl text-white shadow-xl border border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Worker Insurance, Social Security & Welfare
            </h1>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Bharat Gig Protection
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
            Active tracking of technician healthcare, accidental coverage (PMSBY & Ayushman Bharat), social welfare grants, and rapid grievance claim settlements.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 flex border border-white/10">
          <button
            onClick={() => setActiveTab('insurance')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'insurance'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            Insurance & Policies
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'benefits'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            Welfare Benefits
          </button>
          <button
            onClick={() => setActiveTab('claims')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'claims'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            Claims Tracker
            {pendingClaimsCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
                {pendingClaimsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3 Major Operational Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Insurance Coverage */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Insurance Coverage
            </span>
            <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {welfareOverview.insurance.coveredPercentage}% Protected
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {welfareOverview.insurance.totalCovered}{' '}
                <span className="text-base text-slate-400 font-normal">/ {welfareOverview.insurance.totalActiveWorkers}</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Technicians with active policies
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="text-amber-500 font-bold block">
                {welfareOverview.insurance.totalPending} In-Progress
              </span>
              <span className="text-slate-400 text-[11px]">KYC verification</span>
            </div>
          </div>

          {/* Progress split */}
          <div className="w-full bg-slate-100 dark:bg-charcoal-800 h-2.5 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all"
              style={{ width: `${welfareOverview.insurance.coveredPercentage}%` }}
              title={`Covered: ${welfareOverview.insurance.coveredPercentage}%`}
            />
            <div
              className="bg-amber-400 h-full transition-all"
              style={{ width: `${welfareOverview.insurance.notCoveredPercentage}%` }}
              title={`Not Covered / In-Progress: ${welfareOverview.insurance.notCoveredPercentage}%`}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-charcoal-800">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Covered: {welfareOverview.insurance.coveredPercentage}%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Not Covered: {welfareOverview.insurance.notCoveredPercentage}%
            </span>
          </div>
        </div>

        {/* Welfare Benefits */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Welfare Benefits Roster
            </span>
            <Award className="w-4 h-4 text-blue-500" />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-charcoal-800">
              <p className="text-xs text-slate-400 font-medium">Active</p>
              <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                {welfareOverview.welfareBenefits.activeWorkers}
              </p>
            </div>
            <div className="p-2 rounded-xl bg-blue-50/60 dark:bg-blue-950/30">
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Eligible</p>
              <p className="text-lg font-extrabold text-blue-700 dark:text-blue-300 mt-0.5">
                {welfareOverview.welfareBenefits.eligible}
              </p>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30">
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Enrolled</p>
              <p className="text-lg font-extrabold text-emerald-700 dark:text-emerald-300 mt-0.5">
                {welfareOverview.welfareBenefits.enrolled}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-charcoal-800">
            <span>Benefits Disbursed (YTD):</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
              ₹{welfareOverview.welfareBenefits.fundsDisbursedYTD.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Claims Tracker */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Insurance Claims Adjudication
            </span>
            <HeartHandshake className="w-4 h-4 text-rose-500" />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/30">
              <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">Pending</p>
              <p className="text-lg font-extrabold text-amber-800 dark:text-amber-300 mt-0.5">
                {welfareOverview.claims.pending}
              </p>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30">
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Approved</p>
              <p className="text-lg font-extrabold text-emerald-800 dark:text-emerald-300 mt-0.5">
                {welfareOverview.claims.approved}
              </p>
            </div>
            <div className="p-2 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/50 dark:border-rose-800/30">
              <p className="text-xs text-rose-700 dark:text-rose-400 font-bold">Rejected</p>
              <p className="text-lg font-extrabold text-rose-800 dark:text-rose-300 mt-0.5">
                {welfareOverview.claims.rejected}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-charcoal-800">
            <span>Settled This Month:</span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              ₹{welfareOverview.claims.totalDisbursedMonth.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

      </div>

      {/* TAB 1: INSURANCE & POLICIES */}
      {activeTab === 'insurance' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Active Partner Policies Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Underwritten Policies & National Social Security Schemes
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                100% platform-subsidized for verified workers
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insurancePolicies.map((pol) => (
                <div
                  key={pol.id}
                  className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm space-y-3 hover:border-emerald-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-slate-400">{pol.id}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {pol.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                      {pol.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {pol.type}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-charcoal-800/60 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Coverage Sum:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 text-sm">
                        {pol.coverage}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Underwriter:</span>
                      <span className="text-slate-700 dark:text-slate-300 truncate max-w-[140px] text-right font-medium">
                        {pol.underwriter}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Enrolled:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {pol.beneficiaries} technicians
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {pol.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technicians Insurance Roster Table */}
          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Individual Technician Insurance Roster
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Search and inspect each worker's active coverage, ABHA Health ID, and claimable limit.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search worker or role..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-charcoal-700 bg-slate-50 dark:bg-charcoal-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-charcoal-800 text-slate-400 uppercase font-bold tracking-wider">
                    <th className="pb-3">Worker Details</th>
                    <th className="pb-3">Cluster / Zone</th>
                    <th className="pb-3">Primary Policy</th>
                    <th className="pb-3">Covered Amount</th>
                    <th className="pb-3">Insurance Status</th>
                    <th className="pb-3">Welfare State</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-charcoal-800 text-slate-700 dark:text-slate-300">
                  {filteredWorkers.map((worker) => (
                    <tr key={worker.id} className="hover:bg-slate-50 dark:hover:bg-charcoal-850/50 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={worker.avatar}
                            alt={worker.name}
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-charcoal-700"
                          />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white text-xs">
                              {worker.name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {worker.role} • <span className="font-mono">{worker.id}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 text-slate-600 dark:text-slate-300 font-medium">
                        {worker.zone || 'Delhi NCR'}
                      </td>

                      <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">
                        {worker.insurancePolicy || 'Basic Worker Protection'}
                      </td>

                      <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">
                        ₹{(worker.insuranceCoverage || 200000).toLocaleString('en-IN')}
                      </td>

                      <td className="py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            worker.insuranceStatus === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {worker.insuranceStatus || 'Active'}
                        </span>
                      </td>

                      <td className="py-3">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <span className={`w-2 h-2 rounded-full ${worker.welfareEnrolled ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          <span className={worker.welfareEnrolled ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400'}>
                            {worker.welfareEnrolled ? 'Enrolled' : 'Not Enrolled'}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 text-right">
                        <button
                          onClick={() => onViewWorkerWelfare(worker)}
                          className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                        >
                          Welfare Passport
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: WELFARE BENEFITS */}
      {activeTab === 'benefits' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Active Welfare Benefits Schemes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {welfareBenefits.map((ben) => (
              <div
                key={ben.id}
                className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">{ben.id}</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {ben.category}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {ben.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {ben.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-charcoal-800/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Grant Amount</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                      {ben.benefitValue}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Recipients</span>
                    <strong className="text-slate-900 dark:text-white font-bold">
                      {ben.enrolledCount} workers
                    </strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-charcoal-800">
                  <span className="text-slate-500">Criteria: {ben.eligibility}</span>
                  <button
                    onClick={() => alert(`Disbursement ledger opened for ${ben.title}`)}
                    className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                  >
                    Disburse Grants →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: CLAIMS TRACKER */}
      {activeTab === 'claims' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm space-y-4">
            
            {/* Header & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Worker Medical & Injury Claims Pipeline
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct Benefit Transfer (DBT) adjudication with hospital verification & UPI settlement.
                </p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-charcoal-800 p-1 rounded-xl">
                {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setClaimStatusFilter(status)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                      claimStatusFilter === status
                        ? 'bg-white dark:bg-charcoal-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Claims Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-charcoal-800 text-slate-400 uppercase font-bold tracking-wider">
                    <th className="pb-3">Claim ID</th>
                    <th className="pb-3">Technician</th>
                    <th className="pb-3">Incident / Hospital</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Claimed Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Adjudication</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-charcoal-800 text-slate-700 dark:text-slate-300">
                  {filteredClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-slate-50 dark:hover:bg-charcoal-850/50 transition-colors">
                      <td className="py-3.5 font-mono font-bold text-slate-900 dark:text-white">
                        {claim.id}
                      </td>

                      <td className="py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={claim.workerAvatar}
                            alt={claim.workerName}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white text-xs">
                              {claim.workerName}
                            </p>
                            <p className="text-[11px] text-slate-400">{claim.workerRole}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 max-w-xs">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {claim.type}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-blue-500" />
                          {claim.hospital}
                        </p>
                      </td>

                      <td className="py-3.5 text-slate-500 font-medium">
                        {claim.date}
                      </td>

                      <td className="py-3.5 font-extrabold text-slate-900 dark:text-white text-sm">
                        ₹{claim.amountClaimed.toLocaleString('en-IN')}
                      </td>

                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            claim.status === 'Approved'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : claim.status === 'Pending'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {claim.status}
                        </span>
                      </td>

                      <td className="py-3.5 text-right">
                        {claim.status === 'Pending' ? (
                          <button
                            onClick={() => onReviewClaim(claim)}
                            className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-sm transition-all"
                          >
                            Review & Disburse
                          </button>
                        ) : (
                          <button
                            onClick={() => onReviewClaim(claim)}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                          >
                            View Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
