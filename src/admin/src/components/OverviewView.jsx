import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import {
  IndianRupee,
  CalendarCheck,
  HardHat,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  PieChart as PieIcon,
  Clock,
  Sparkles,
  Heart,
  Send,
  Download,
  Calendar,
  BrainCircuit,
  ShieldCheck,
  Layers,
  ArrowRight,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { customerReviews } from '../data/mockData';

export default function OverviewView({
  workers,
  bookings,
  complaints,
  payments,
  claims = [],
  welfareOverview,
  aiDemandData,
  theme,
  onSendTeamMotivation,
  onSendMithaiBonus,
  onExportCSV
}) {
  const navigate = useNavigate();
  const [chartRange, setChartRange] = useState('6m');
  const revenueChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const revenueChartInstance = useRef(null);
  const doughnutChartInstance = useRef(null);

  const activeBookingsCount = bookings.filter(b => b.status !== 'Completed' && b.status !== 'Cancelled').length;
  const openComplaintsCount = complaints.filter(c => c.status !== 'Resolved').length;
  const totalRevenue = payments
    .filter(p => p.status === 'Paid')
    .reduce((acc, p) => acc + p.amount, 0) + 475000;

  // Chart Rendering
  useEffect(() => {
    const isDark = theme === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(9, 19, 34, 0.06)';
    const textColor = isDark ? '#94a3b8' : '#475569';
    const primaryColor = isDark ? '#3b82f6' : '#1e40af';
    const primaryLight = isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(30, 64, 175, 0.12)';

    // 1. Line chart
    if (revenueChartRef.current) {
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy();
      }

      const labels = chartRange === '12m'
        ? ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        : ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

      const dataPoints = chartRange === '12m'
        ? [210000, 240000, 260000, 250000, 280000, 320000, 340000, 380000, 360000, 420000, 460000, 482500]
        : [320000, 380000, 360000, 420000, 460000, 482500];

      revenueChartInstance.current = new Chart(revenueChartRef.current, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Gross Revenue (₹)',
              data: dataPoints,
              borderColor: primaryColor,
              backgroundColor: primaryLight,
              fill: true,
              tension: 0.4,
              borderWidth: 3,
              pointBackgroundColor: primaryColor,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
            {
              label: 'Budget Target (₹)',
              data: chartRange === '12m'
                ? [200000, 220000, 250000, 260000, 290000, 310000, 300000, 340000, 350000, 390000, 430000, 450000]
                : [300000, 340000, 350000, 390000, 430000, 450000],
              borderColor: '#10b981',
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12 } }
            },
            tooltip: {
              callbacks: {
                label: (ctx) => `₹${ctx.raw.toLocaleString('en-IN')}`
              }
            }
          },
          scales: {
            x: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { family: 'Plus Jakarta Sans' } }
            },
            y: {
              grid: { color: gridColor },
              ticks: {
                color: textColor,
                font: { family: 'Plus Jakarta Sans' },
                callback: (val) => `₹${(val / 100000).toFixed(1)}L`
              }
            }
          }
        }
      });
    }

    // 2. Doughnut chart
    if (doughnutChartRef.current) {
      if (doughnutChartInstance.current) {
        doughnutChartInstance.current.destroy();
      }

      doughnutChartInstance.current = new Chart(doughnutChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Electrician', 'Plumber', 'Mechanic', 'Carpenter', 'Painter', 'Appliance Tech'],
          datasets: [{
            data: [28, 24, 18, 14, 10, 6],
            backgroundColor: ['#1e40af', '#0284c7', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'],
            borderWidth: isDark ? 2 : 1,
            borderColor: isDark ? '#11151e' : '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: textColor,
                boxWidth: 10,
                font: { family: 'Plus Jakarta Sans', size: 11 }
              }
            }
          },
          cutout: '70%'
        }
      });
    }

    return () => {
      if (revenueChartInstance.current) revenueChartInstance.current.destroy();
      if (doughnutChartInstance.current) doughnutChartInstance.current.destroy();
    };
  }, [theme, chartRange]);

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header with Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            National Operations Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Live metrics across urban hubs: Mumbai, Bengaluru, Delhi NCR, Hyderabad & Pune.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onExportCSV('overview')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white dark:bg-charcoal-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-charcoal-700 hover:bg-slate-50 dark:hover:bg-charcoal-800 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export KPI (CSV)</span>
          </button>
          <button
            onClick={() => navigate('/bookings')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Manage Bookings</span>
          </button>
        </div>
      </div>





      {/* 3. 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Monthly Revenue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Revenue (Monthly)
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
              <span>+16.4% this month</span>
            </div>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Bookings
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {activeBookingsCount}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
              <span>+12% vs last week</span>
            </div>
          </div>
        </div>

        {/* Verified Workers */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Verified Workers
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <HardHat className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {workers.length}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>{workers.filter(w => w.status === 'On Duty').length + 18} on active duty</span>
            </div>
          </div>
        </div>

        {/* Open Complaints */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Open Complaints
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {openComplaintsCount}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ArrowDownRight className="w-4 h-4" />
              <span>-3 resolved today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Spotlight Pillars (AI Operations & Worker Welfare) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* 🤖 AI Demand & Workforce Allocation Spotlight Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/10 via-indigo-900/10 to-slate-900/10 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-charcoal-900 border border-blue-500/20 dark:border-blue-500/30 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  AI Demand Forecasting & Allocation
                </h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-400/30">
                Surge Detected
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5">
              Heatwave in <strong className="text-slate-900 dark:text-white">South Delhi</strong> has triggered a <strong className="text-rose-600 dark:text-rose-400">-26 AC Tech Deficit</strong>. Demand curve projects peak booking surge at 11:00 AM.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-xl bg-white/70 dark:bg-charcoal-850/70 border border-slate-200/60 dark:border-charcoal-750 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Forecasted Demand</span>
                <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">385 Jobs</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Active Workforce</span>
                <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">246 Staff</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">AI Recommendation</span>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">Rebalance 12 staff</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-blue-500/10 dark:border-charcoal-800">
            <button
              onClick={() => navigate('/operations/demand-forecast')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View Hourly Forecast <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/operations/workforce-allocation')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              Rebalance Workforce
            </button>
          </div>
        </div>

        {/* 🛡️ Worker Welfare & Insurance Snapshot Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900/10 via-teal-900/10 to-slate-900/10 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-charcoal-900 border border-emerald-500/20 dark:border-emerald-500/30 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Worker Welfare & Social Security
                </h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-400/30">
                82% Covered
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5">
              <strong className="text-slate-900 dark:text-white">202 of 246</strong> gig technicians covered under PMSBY & Ayushman Bharat schemes. <strong className="text-amber-600 dark:text-amber-400">4 injury claims</strong> currently pending verification.
            </p>

            <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-xl bg-white/70 dark:bg-charcoal-850/70 border border-slate-200/60 dark:border-charcoal-750 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Welfare Enrolled</span>
                <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">193 Workers</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Pending Claims</span>
                <p className="text-base font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">4 Tickets</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Monthly Payouts</span>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">₹1,84,500 DBT</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-emerald-500/10 dark:border-charcoal-800">
            <button
              onClick={() => navigate('/welfare/insurance')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              Welfare Roster <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/welfare/claims')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              Adjudicate Claims (4)
            </button>
          </div>
        </div>

      </div>

      {/* 4. Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue Trend Line Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Revenue & Workload Trend (INR ₹)
              </h3>
            </div>
            <select
              value={chartRange}
              onChange={(e) => setChartRange(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-charcoal-800 text-slate-700 dark:text-slate-200 border-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="6m">Last 6 Months</option>
              <option value="12m">This Year</option>
            </select>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <canvas ref={revenueChartRef}></canvas>
          </div>
        </div>

        {/* Worker Trades Distribution Doughnut */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <PieIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Worker Trades Distribution
            </h3>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <canvas ref={doughnutChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* 5. Recent Active Service Orders */}
      <div className="rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 dark:border-charcoal-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Recent Active Service Orders
            </h3>
          </div>
          <button
            onClick={() => navigate('/bookings')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-charcoal-850 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold border-b border-slate-100 dark:border-charcoal-800">
              <tr>
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Service Category</th>
                <th className="py-3 px-4">Assigned Worker</th>
                <th className="py-3 px-4">Scheduled Slot</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-charcoal-800">
              {recentBookings.map((b) => {
                let statusBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400';
                if (b.status === 'Confirmed') statusBadge = 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400';
                if (b.status === 'In Progress') statusBadge = 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400';
                if (b.status === 'Completed') statusBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400';
                if (b.status === 'Cancelled') statusBadge = 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400';

                return (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-charcoal-850 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-white">
                      {b.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {b.customerName}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {b.service}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">
                      {b.workerName}
                    </td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-xs">
                      {b.date}
                    </td>
                    <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">
                      ₹{b.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. "Dil Se Service" - Customer Feedback Stream */}
      <div className="rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Dil Se Service — Live Customer Feedback & Praise
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
            100% Real Experiences
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {customerReviews.map((r) => (
            <div
              key={r.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-charcoal-850 border border-slate-200/70 dark:border-charcoal-750 flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic mb-4">
                "{r.comment}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200/50 dark:border-charcoal-700">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{r.name}</h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{r.locality}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
