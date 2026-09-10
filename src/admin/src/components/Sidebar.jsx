import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  PieChart,
  HardHat,
  Users,
  CalendarCheck,
  IndianRupee,
  AlertTriangle,
  TrendingUp,
  Sliders,
  LogOut,
  X,
  Settings as SettingsIcon,
  BrainCircuit,
  Layers,
  ShieldCheck,
  Award,
  HeartHandshake
} from 'lucide-react';

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  counts,
  adminName,
  onLogoutClick
}) {
  const navItems = [
    {
      category: 'Core Operations',
      items: [
        { path: '/', label: 'Overview', icon: PieChart, end: true },
        { path: '/workers', label: 'Workers', icon: HardHat, badge: counts.workers, badgeVariant: 'primary' },
        { path: '/customers', label: 'Customers', icon: Users, badge: counts.customers, badgeVariant: 'primary' },
        { path: '/bookings', label: 'Bookings', icon: CalendarCheck, badge: `${counts.pendingBookings} New`, badgeVariant: 'primary' },
        { path: '/payments', label: 'Payments', icon: IndianRupee },
        { path: '/complaints', label: 'Complaints', icon: AlertTriangle, badge: counts.openComplaints, badgeVariant: 'danger' },
      ]
    },
    {
      category: 'AI & Operations',
      items: [
        { path: '/operations/demand-forecast', label: 'Demand Forecast', icon: BrainCircuit, badge: 'Live AI', badgeVariant: 'primary' },
        { path: '/operations/workforce-allocation', label: 'Workforce Allocation', icon: Layers },
      ]
    },
    {
      category: '`Worker Welfare',
      items: [
        { path: '/welfare/insurance', label: 'Insurance & Policies', icon: ShieldCheck },
        { path: '/welfare/benefits', label: 'Welfare Benefits', icon: Award },
        {
          path: '/welfare/claims',
          label: 'Claims Tracker',
          icon: HeartHandshake,
          badge: counts.pendingClaims ? `${counts.pendingClaims} Pending` : undefined,
          badgeVariant: 'danger'
        },
      ]
    },
    {
      category: 'Analytics & System',
      items: [
        { path: '/reports', label: 'Reports & Analytics', icon: TrendingUp },
        { path: '/settings', label: 'Settings', icon: Sliders },
        { id: 'logout', label: 'Logout', icon: LogOut, isAction: true },
      ]
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-navy-950 dark:bg-charcoal-900 border-r border-navy-850 dark:border-charcoal-800 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-18 px-5 border-b border-navy-900 dark:border-charcoal-800 py-4">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform overflow-hidden shrink-0 border border-slate-200/20">
              <img src="/logo-icon.png" alt="FixMate Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white">FixMate</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-400/30">
                  Admin
                </span>
              </div>

            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-900 lg:hidden transition-colors"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {group.category}
              </div>
              {group.items.map((item, iIdx) => {
                const Icon = item.icon;

                if (item.isAction) {
                  return (
                    <button
                      key={item.id || iIdx}
                      onClick={() => {
                        if (item.id === 'logout') onLogoutClick();
                        setSidebarOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all group text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 transition-transform group-hover:scale-110 text-rose-400" />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                }

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all group ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                          : 'text-slate-300 hover:text-white hover:bg-navy-900 dark:hover:bg-charcoal-800'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                              isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge !== undefined && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                              item.badgeVariant === 'danger'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer - Admin Profile */}
        <div className="p-3 border-t border-navy-900 dark:border-charcoal-800 bg-navy-950/80 dark:bg-charcoal-950/80">
          <div className="flex items-center justify-between p-2 rounded-xl bg-navy-900/80 dark:bg-charcoal-800/80 border border-navy-800 dark:border-charcoal-700">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">
                  {adminName}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  Operations Lead
                </p>
              </div>
            </div>
            <Link
              to="/settings"
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-navy-800 dark:hover:bg-charcoal-700 transition-colors"
              title="Manage Settings"
            >
              <SettingsIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
