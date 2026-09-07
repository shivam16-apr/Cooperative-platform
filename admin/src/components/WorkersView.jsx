import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  Star,
  Phone,
  RotateCw,
  Trash2,
  ThumbsUp,
  MessageSquare,
  Languages,
  Heart,
  ShieldCheck,
  UserX
} from 'lucide-react';

export default function WorkersView({
  workers,
  onToggleStatus,
  onDeleteWorker,
  onSendPraise,
  onViewWorkerWelfare,
  globalSearch
}) {
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  const activeQuery = (globalSearch || localSearch).toLowerCase().trim();

  const filteredWorkers = workers.filter((w) => {
    const matchQuery =
      !activeQuery ||
      w.name.toLowerCase().includes(activeQuery) ||
      w.role.toLowerCase().includes(activeQuery) ||
      w.email.toLowerCase().includes(activeQuery) ||
      (w.languages && w.languages.toLowerCase().includes(activeQuery)) ||
      w.phone.includes(activeQuery);

    const matchRole = roleFilter === 'All' || w.role === roleFilter;
    const matchStatus = statusFilter === 'All' || w.status === statusFilter;

    return matchQuery && matchRole && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Workers Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage verified field technicians, hourly rates (₹199 - ₹699/hr), skills, and availability.
          </p>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by name, skill (Plumber, Electrician...), or phone..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="flex-1 md:flex-none text-xs sm:text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Mechanic">Mechanic</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Painter">Painter</option>
            <option value="Appliance Tech">Appliance Tech</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 md:flex-none text-xs sm:text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Duty">On Duty</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-charcoal-850 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold border-b border-slate-100 dark:border-charcoal-800">
              <tr>
                <th className="py-3.5 px-4">Worker Profile</th>
                <th className="py-3.5 px-4">Category / Trade</th>
                <th className="py-3.5 px-4">Contact Details</th>
                <th className="py-3.5 px-4">Hourly Rate</th>
                <th className="py-3.5 px-4">Ratings & Reviews</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-charcoal-800">
              {filteredWorkers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    <UserX className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                    <p className="font-bold text-sm text-slate-700 dark:text-slate-300">No technicians found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              ) : (
                filteredWorkers.map((w) => {


                  let statusBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-500/30';
                  if (w.status === 'On Duty') {
                    statusBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950/40  dark:text-amber-400 border border-amber-500/30';
                  } else if (w.status === 'Offline') {
                    statusBadge = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-500/30';
                  }

                  return (
                    <tr key={w.id} className="hover:bg-slate-50 dark:hover:bg-charcoal-850 transition-colors">
                      {/* Profile */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-3">
                          <img
                            src={w.avatar}
                            alt={w.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-charcoal-700 flex-shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{w.name}</span>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">


                            </div>
                            {w.bio && (
                              <p className="text-[11px] text-slate-400 mt-1 max-w-xs line-clamp-1">{w.bio}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                          {w.role}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                          <Languages className="w-3 h-3 text-slate-400" />
                          <span>{w.languages || 'Hindi, English'}</span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4">
                        <span className="text-xs text-slate-700 dark:text-slate-300 block">{w.email}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" /> {w.phone}
                        </span>

                      </td>

                      {/* Hourly Rate */}
                      <td className="py-3.5 px-4">
                        <strong className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                          ₹{w.hourlyRate}/hr
                        </strong>
                      </td>

                      {/* Ratings */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span className="font-bold text-xs text-slate-900 dark:text-white">{w.rating}</span>
                          <span className="text-[11px] text-slate-400">({w.reviews} jobs)</span>
                        </div>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                          ✓ 100% Polite Rating
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 w-[9%]">
                        <span className={`flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge}`}>

                          {w.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {onViewWorkerWelfare && (
                            <button
                              onClick={() => onViewWorkerWelfare(w)}
                              className="p-1.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-lg transition-colors"
                              title="View Welfare & Insurance Passport"
                            >
                              <ShieldCheck className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => onSendPraise(w.id)}
                            className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors"
                            title="Send Shabaashi (+₹100 tip)"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onToggleStatus(w.id)}
                            className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-charcoal-800 rounded-lg transition-colors"
                            title="Cycle Status (Active/On Duty/Offline)"
                          >
                            <RotateCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteWorker(w.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                            title="Remove Worker"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
