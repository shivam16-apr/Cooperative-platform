import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  CheckCircle2,
  Flame,
  HeartHandshake
} from 'lucide-react';

export default function ComplaintsView({
  complaints,
  onResolveTicket,
  globalSearch
}) {
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  const activeQuery = (globalSearch || localSearch).toLowerCase().trim();

  const filteredComplaints = complaints.filter((c) => {
    const matchQuery =
      !activeQuery ||
      c.id.toLowerCase().includes(activeQuery) ||
      c.subject.toLowerCase().includes(activeQuery) ||
      c.customerName.toLowerCase().includes(activeQuery);

    const matchPriority = priorityFilter === 'All' || c.priority === priorityFilter;
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;

    return matchQuery && matchPriority && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Customer Complaints & Escalations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Resolve repair dissatisfaction, delay tickets, and service quality reports with cultural empathy.
          </p>
        </div>
        <button
          onClick={() => setPriorityFilter(priorityFilter === 'High' ? 'All' : 'High')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all self-start sm:self-auto ${
            priorityFilter === 'High'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
              : 'bg-white dark:bg-charcoal-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-charcoal-700 hover:bg-slate-50 dark:hover:bg-charcoal-800'
          }`}
        >
          <Flame className="w-4 h-4 text-rose-500" />
          <span>{priorityFilter === 'High' ? 'Showing High Priority' : 'High Priority Only'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search ticket #, subject, or customer..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="flex-1 md:flex-none text-xs sm:text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 md:flex-none text-xs sm:text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-charcoal-850 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold border-b border-slate-100 dark:border-charcoal-800">
              <tr>
                <th className="py-3.5 px-4">Ticket ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Subject & Details</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Date Filed</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-charcoal-800">
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-500" />
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                      All customer grievances resolved with care!
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Sabhi parivaaron ko samadhan mil gaya hai. Zero pending escalations.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((c) => {
                  let priorityBadge = 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400';
                  if (c.priority === 'High') priorityBadge = 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400';
                  if (c.priority === 'Medium') priorityBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400';

                  let statusBadge = 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400';
                  if (c.status === 'In Progress') statusBadge = 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400';
                  if (c.status === 'Resolved') statusBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400';

                  return (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-charcoal-850 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {c.id}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {c.customerName}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                          {c.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-semibold text-slate-900 dark:text-white truncate">
                          {c.subject}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {c.description}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${priorityBadge}`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-xs">
                        {c.date}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {c.status !== 'Resolved' ? (
                          <button
                            onClick={() => onResolveTicket(c)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
                          >
                            <HeartHandshake className="w-3.5 h-3.5" /> Care & Solve
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Solved with Care
                          </span>
                        )}
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
