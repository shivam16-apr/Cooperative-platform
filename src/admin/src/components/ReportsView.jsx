import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {
  BarChart3,
  Star,
  Download,
  Smile,
  Zap,
  Clock
} from 'lucide-react';

export default function ReportsView({ theme, onExportCSV }) {
  const revCostChartRef = useRef(null);
  const perfChartRef = useRef(null);
  const revCostChartInstance = useRef(null);
  const perfChartInstance = useRef(null);

  useEffect(() => {
    const isDark = theme === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(9, 19, 34, 0.06)';
    const textColor = isDark ? '#94a3b8' : '#475569';
    const primaryColor = isDark ? '#3b82f6' : '#1e40af';
    const navyColor = isDark ? '#60a5fa' : '#0f1c32';

    // 1. Revenue vs Cost Chart
    if (revCostChartRef.current) {
      if (revCostChartInstance.current) revCostChartInstance.current.destroy();

      revCostChartInstance.current = new Chart(revCostChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          datasets: [
            {
              label: 'Gross Earnings (₹)',
              data: [250000, 280000, 320000, 340000, 390000, 410000, 440000, 482500],
              backgroundColor: primaryColor,
              borderRadius: 6
            },
            {
              label: 'Worker Payouts & Fuel (₹)',
              data: [160000, 180000, 200000, 210000, 240000, 250000, 270000, 290000],
              backgroundColor: navyColor,
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }
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

    // 2. Performance Chart
    if (perfChartRef.current) {
      if (perfChartInstance.current) perfChartInstance.current.destroy();

      perfChartInstance.current = new Chart(perfChartRef.current, {
        type: 'bar',
        data: {
          labels: [
            'Manoj Sharma (Mech)',
            'Ramesh Kumar (Elec)',
            'Vinod Nair (Elec)',
            'Anita Devi (Appliance)',
            'Suresh Yadav (Plumber)',
            'Rajesh Patil (Painter)',
            'Imran Khan (Plumber)'
          ],
          datasets: [{
            label: 'Customer Rating (Out of 5.0)',
            data: [5.0, 4.9, 4.9, 4.9, 4.8, 4.7, 4.8],
            backgroundColor: primaryColor,
            borderRadius: 6
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              min: 4.0,
              max: 5.0,
              grid: { color: gridColor },
              ticks: { color: textColor, font: { family: 'Plus Jakarta Sans' } }
            },
            y: {
              grid: { display: false },
              ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } }
            }
          }
        }
      });
    }

    return () => {
      if (revCostChartInstance.current) revCostChartInstance.current.destroy();
      if (perfChartInstance.current) perfChartInstance.current.destroy();
    };
  }, [theme]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Analytics & Business Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Detailed breakdown of monthly earnings, technician ratings, and customer satisfaction.
          </p>
        </div>
        <button
          onClick={() => onExportCSV('payment')}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download Report (CSV)</span>
        </button>
      </div>

      {/* Top Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Monthly Revenue vs Operational Costs (₹ in Lakhs)
            </h3>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <canvas ref={revCostChartRef}></canvas>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Worker Performance Ratings (Out of 5.0)
            </h3>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <canvas ref={perfChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Bottom Row Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Customer Satisfaction Index */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Smile className="w-4 h-4 text-emerald-500" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Indian Customer Satisfaction Index
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400">
                96.2%
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Overall Positive Service Reviews
              </p>
              <div className="flex items-center justify-center gap-1 text-amber-500 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
            </div>

            <div className="flex-1 w-full max-w-xs space-y-2.5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  <span>5 Stars (Bahut Badhiya)</span>
                  <span className="font-bold">81%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-charcoal-800 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '81%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  <span>4 Stars (Good)</span>
                  <span className="font-bold">15%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-charcoal-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  <span>1-3 Stars (Issues)</span>
                  <span className="font-bold">4%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-charcoal-800 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '4%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Avg Technician Arrival Time */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Avg Technician Arrival Time
            </h3>
          </div>

          <div className="text-center py-6">
            <div className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400">
              22 mins
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2">
              Dispatch to Doorstep Arrival
            </p>
            <span className="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" /> 18% Faster than metro city average
            </span>
          </div>

          <p className="text-[11px] text-center text-slate-400 border-t border-slate-100 dark:border-charcoal-800 pt-3">
            Real-time GPS dispatching powered by city sector hubs in Mumbai, Bengaluru & NCR.
          </p>
        </div>
      </div>
    </div>
  );
}
