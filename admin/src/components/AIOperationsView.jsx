import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {
  BrainCircuit,
  TrendingUp,
  Users,
  AlertTriangle,
  Zap,
  ArrowRight,
  CheckCircle2,
  MapPin,
  RefreshCw,
  Sparkles,
  Layers,
  Send,
  Download,
  Flame,
  CloudRain,
  Sun,
  ShieldAlert
} from 'lucide-react';

export default function AIOperationsView({
  demandData,
  onApplyRebalance,
  onSimulateSurge,
  theme,
  initialTab = 'demand-forecast'
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedTimeframe, setSelectedTimeframe] = useState('Today');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [selectedScenario, setSelectedScenario] = useState('Normal Operations');
  const [isSimulating, setIsSimulating] = useState(false);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Switch tab if prop changes
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  // Chart setup
  useEffect(() => {
    if (!chartRef.current || activeTab !== 'demand-forecast') return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const isDark = theme === 'dark';
    const ctx = chartRef.current.getContext('2d');

    const labels = demandData.hourlyCurve.map((h) => h.hour);
    const demandPoints = demandData.hourlyCurve.map((h) => h.demand);
    const capacityPoints = demandData.hourlyCurve.map((h) => h.capacity);

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'AI Forecasted Demand (Bookings)',
            data: demandPoints,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#3b82f6',
          },
          {
            label: 'Current Active Worker Capacity',
            data: capacityPoints,
            borderColor: '#10b981',
            borderDash: [5, 5],
            backgroundColor: 'transparent',
            tension: 0.2,
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#10b981',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: isDark ? '#cbd5e1' : '#475569',
              font: { size: 12, weight: '600' },
              usePointStyle: true,
              boxWidth: 8
            }
          },
          tooltip: {
            backgroundColor: isDark ? '#0f172a' : '#1e293b',
            titleColor: '#fff',
            bodyColor: '#cbd5e1',
            padding: 12,
            cornerRadius: 10
          }
        },
        scales: {
          x: {
            grid: { color: isDark ? '#1e293b' : '#e2e8f0' },
            ticks: { color: isDark ? '#94a3b8' : '#64748b' }
          },
          y: {
            grid: { color: isDark ? '#1e293b' : '#e2e8f0' },
            ticks: { color: isDark ? '#94a3b8' : '#64748b' }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [activeTab, theme, demandData]);

  // Trigger surge simulation
  const handleTriggerScenario = (scenario) => {
    setIsSimulating(true);
    setSelectedScenario(scenario);
    if (onSimulateSurge) {
      onSimulateSurge(scenario);
    }
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  const filteredZones =
    selectedZone === 'All Zones'
      ? demandData.zones
      : demandData.zones.filter((z) => z.name.includes(selectedZone));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 rounded-2xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              AI Demand Forecasting & Workforce Allocation
            </h1>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Live Model v3.4
            </span>
          </div>
          <p className="text-xs sm:text-sm text-blue-200/90 max-w-2xl">
            Predictive spatio-temporal AI model balancing service demand curves against available municipal workforce in real time.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 flex border border-white/10">
            <button
              onClick={() => setActiveTab('demand-forecast')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'demand-forecast'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Demand Forecast
            </button>
            <button
              onClick={() => setActiveTab('workforce-allocation')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'workforce-allocation'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Workforce Allocation
            </button>
          </div>
        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Forecasted Demand */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Forecasted Demand</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {demandData.metadata.totalForecastedDemand}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
            +28% higher than 7-day average
          </p>
        </div>

        {/* Available Technicians */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Available Workforce</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {demandData.metadata.totalAvailableWorkers}
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            202 On-duty & active roster
          </p>
        </div>

        {/* Shortage / Deficit */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Net Worker Gap</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400">
            {demandData.metadata.netShortage} Deficit
          </p>
          <p className="text-xs text-rose-600/90 dark:text-rose-400/80 font-medium mt-1">
            Peak expected at 11:00 AM - 01:00 PM
          </p>
        </div>

        {/* AI Confidence */}
        <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Model Confidence</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {demandData.metadata.overallConfidence}%
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Trained on 42,000+ Delhi NCR jobs
          </p>
        </div>
      </div>

      {/* TAB 1: DEMAND FORECAST VIEW */}
      {activeTab === 'demand-forecast' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Controls Bar: Timeframe & Simulation Triggers */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-charcoal-900 rounded-2xl border border-slate-200 dark:border-charcoal-800">
            
            {/* Timeframes */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-charcoal-800 p-1 rounded-xl">
              {['Today', 'Tomorrow', 'Weekend', '7-Day Trend'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                    selectedTimeframe === tf
                      ? 'bg-white dark:bg-charcoal-900 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Hackathon Surge Simulation Sandbox */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                Simulate Surge:
              </span>

              <button
                onClick={() => handleTriggerScenario('Delhi 42°C Heatwave')}
                disabled={isSimulating}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  selectedScenario === 'Delhi 42°C Heatwave'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                Heatwave (AC Spike)
              </button>

              <button
                onClick={() => handleTriggerScenario('Monsoon Waterlogging')}
                disabled={isSimulating}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  selectedScenario === 'Monsoon Waterlogging'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5" />
                Monsoon (Plumbing Spike)
              </button>

              <button
                onClick={() => handleTriggerScenario('Normal Operations')}
                disabled={isSimulating}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  selectedScenario === 'Normal Operations'
                    ? 'bg-slate-800 dark:bg-slate-700 text-white'
                    : 'bg-slate-100 dark:bg-charcoal-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                Reset
              </button>
            </div>
          </div>

          {/* Hourly Demand vs Capacity Curve */}
          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Intraday Demand vs. Workforce Capacity Curve
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Forecasted customer booking surge windows vs available technician shifts.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Peak Deficit Window: 11:00 AM & 05:00 PM
                </span>
              </div>
            </div>
            <div className="h-72 w-full">
              <canvas ref={chartRef} />
            </div>
          </div>

          {/* Skill & Trade Demand Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Trade Analysis */}
            <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Demand Forecast by Skill & Trade
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Predicted orders compared with currently available technicians.
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {demandData.skillsForecast.map((sf, idx) => {
                  const percent = Math.min(100, Math.round((sf.available / sf.demand) * 100));
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-100 dark:border-charcoal-800 bg-slate-50/50 dark:bg-charcoal-850/50 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">
                            {sf.skill}
                          </span>
                          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                            {sf.trend}
                          </span>
                        </div>

                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            sf.shortage < -10
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                              : sf.shortage < 0
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {sf.shortage < 0 ? `${sf.shortage} Deficit` : `+${sf.shortage} Surplus`}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 dark:bg-charcoal-700 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            percent < 70 ? 'bg-rose-500' : percent < 90 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span>Demand: <strong className="text-slate-700 dark:text-slate-300">{sf.demand}</strong></span>
                        <span>Available: <strong className="text-slate-700 dark:text-slate-300">{sf.available}</strong></span>
                        <span>Coverage: <strong className="text-slate-700 dark:text-slate-300">{percent}%</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Zone Demand Breakdown */}
            <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Zone-wise Surge & Weather Alerts
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Real-time local triggers driving elevated request volumes.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {demandData.zones.map((zone) => (
                  <div
                    key={zone.id}
                    className="p-3.5 rounded-xl border border-slate-100 dark:border-charcoal-800 bg-slate-50/50 dark:bg-charcoal-850/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {zone.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        Surge: {zone.surgeFactor}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {zone.weatherAlert}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/50 dark:border-charcoal-750">
                      <span className="text-slate-500">
                        Peak Skill: <strong className="text-slate-700 dark:text-slate-300">{zone.topDemandSkill}</strong>
                      </span>
                      <span className={`font-bold ${zone.gap < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        {zone.gap < 0 ? `${zone.gap} Workers Gap` : `+${zone.gap} Workers Surplus`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: WORKFORCE ALLOCATION VIEW */}
      {activeTab === 'workforce-allocation' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* AI Automated Rebalancing Proposals */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-blue-950/20 to-slate-900/40 border border-blue-500/30 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    AI Reallocation Engine Recommendations
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Optimal cross-zone technician redistributions to eliminate high wait times.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onApplyRebalance('ALL')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/30 transition-all hover:scale-102"
              >
                <CheckCircle2 className="w-4 h-4" />
                Apply All AI Reallocations
              </button>
            </div>

            {/* Reallocation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {demandData.recommendedReallocations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-4 rounded-xl border transition-all ${
                    rec.applied
                      ? 'bg-emerald-500/10 border-emerald-500/40'
                      : 'bg-white dark:bg-charcoal-900 border-slate-200 dark:border-charcoal-800 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-slate-400">{rec.id}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      ETA: {rec.estimatedETA}
                    </span>
                  </div>

                  <div className="space-y-1 my-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <span className="truncate">{rec.fromZone.split('&')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                      <span className="truncate text-blue-600 dark:text-blue-400">{rec.toZone.split('&')[0]}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Shift <strong>{rec.count} {rec.skill}</strong>
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-charcoal-800/60 text-[11px] space-y-1 mb-3">
                    <p className="text-slate-600 dark:text-slate-300">{rec.projectedImpact}</p>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                      Incentive: {rec.transitIncentive}
                    </p>
                  </div>

                  <button
                    onClick={() => onApplyRebalance(rec.id)}
                    disabled={rec.applied}
                    className={`w-full py-1.5 rounded-lg text-xs font-bold transition-all ${
                      rec.applied
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 cursor-default'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                    }`}
                  >
                    {rec.applied ? '✓ Rebalanced' : 'Deploy Reallocation'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Zone Allocation Table */}
          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Zone-wise Workforce Deployment Matrix
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Current headcount vs predicted demand across municipal clusters.
                </p>
              </div>

              {/* Zone Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-slate-800 dark:text-slate-200"
                >
                  <option value="All Zones">All Municipal Zones</option>
                  <option value="South Delhi">South Delhi</option>
                  <option value="Gurgaon">Gurgaon Cyber City</option>
                  <option value="Noida">Noida Sector 62</option>
                  <option value="West Delhi">West Delhi</option>
                  <option value="Central Delhi">Central Delhi</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-charcoal-800 text-slate-400 uppercase font-bold tracking-wider">
                    <th className="pb-3">Zone / Cluster</th>
                    <th className="pb-3">Demand</th>
                    <th className="pb-3">Active Staff</th>
                    <th className="pb-3">Shortage / Surplus</th>
                    <th className="pb-3">Surge Factor</th>
                    <th className="pb-3">Recommended AI Allocation</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-charcoal-800 text-slate-700 dark:text-slate-300">
                  {filteredZones.map((zone) => (
                    <tr key={zone.id} className="hover:bg-slate-50 dark:hover:bg-charcoal-850/50 transition-colors">
                      <td className="py-3.5">
                        <p className="font-bold text-slate-900 dark:text-white">{zone.name}</p>
                        <p className="text-[11px] text-slate-400">{zone.city}</p>
                      </td>
                      <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                        {zone.currentDemand} jobs
                      </td>
                      <td className="py-3.5 font-semibold">
                        {zone.availableWorkers} technicians
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            zone.gap < -15
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                              : zone.gap < 0
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {zone.gap < 0 ? `${zone.gap} Deficit` : `+${zone.gap} Surplus`}
                        </span>
                      </td>
                      <td className="py-3.5 font-mono font-semibold text-blue-600 dark:text-blue-400">
                        {zone.surgeFactor}
                      </td>
                      <td className="py-3.5 max-w-xs text-xs text-slate-600 dark:text-slate-300">
                        {zone.recommendedAction}
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => alert(`Triggered WhatsApp dispatch notification for ${zone.name}`)}
                          className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
                        >
                          Dispatch Alert
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

    </div>
  );
}
