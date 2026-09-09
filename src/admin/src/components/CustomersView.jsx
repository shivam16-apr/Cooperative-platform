import React, { useEffect, useState } from 'react';
import {
  UserPlus,
  Search,
  MapPin,
  MessageSquare,
  Home,
  Eye,
  Users
} from 'lucide-react';

export default function CustomersView({
  customers,
  onAddCustomerClick,
  onViewCustomer,
  globalSearch
}) {







  const [tierFilter, setTierFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');

  const activeQuery = (globalSearch || localSearch).toLowerCase().trim();






  const filteredCustomers = customers.filter((c) => {
    const matchQuery =
      !activeQuery ||
      c.name.toLowerCase().includes(activeQuery) ||
      c.email.toLowerCase().includes(activeQuery) ||
      c.location.toLowerCase().includes(activeQuery) ||
      (c.houseNotes && c.houseNotes.toLowerCase().includes(activeQuery)) ||
      c.phone.includes(activeQuery);

    const matchTier = tierFilter === 'All' || c.tier === tierFilter;

    return matchQuery && matchTier;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Customer Management 
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            View registered households across India, addresses, cultural preferences, and lifetime spend.
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
            placeholder="Search customer by name, locality (Indiranagar, Andheri...), or phone..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="w-full md:w-auto">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="w-full md:w-auto text-xs sm:text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Tiers</option>
            <option value="VIP">VIP Club</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-charcoal-850 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold border-b border-slate-100 dark:border-charcoal-800">
              <tr>
                <th className="py-3.5 px-4">Customer Profile</th>
                <th className="py-3.5 px-4">Contact Details</th>
                <th className="py-3.5 px-4">Location / City</th>
                <th className="py-3.5 px-4">Total Bookings</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-4">Tier</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-charcoal-800">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                    <p className="font-bold text-sm text-slate-700 dark:text-slate-300">No customers found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => {
                  const cleanPhone = c.phone.replace(/[^0-9]/g, '');

                  let tierBadge = 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-500/30';
                  if (c.tier === 'Active') {
                    tierBadge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-500/30';
                  } else if (c.tier === 'Inactive') {
                    tierBadge = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-500/30';
                  }

                  return (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-charcoal-850 transition-colors">
                      {/* Customer Profile */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-3">
                          <img
                            src={c.avatar}
                            alt={c.name}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-charcoal-700 flex-shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{c.name}</span>
                            <span className="text-[11px] text-slate-400 block">Joined {c.joined}</span>
                            {c.houseNotes && (
                              <div className="mt-1 flex items-start gap-1 p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-300 max-w-xs leading-tight">
                                <Home className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                <span>{c.houseNotes}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4">
                        <span className="text-xs text-slate-700 dark:text-slate-300 block">{c.email}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">{c.phone}</span>

                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          <span>{c.location}</span>
                        </div>
                      </td>

                      {/* Total Bookings */}
                      <td className="py-3.5 px-4">
                        <strong className="text-sm text-slate-800 dark:text-slate-200">{c.totalBookings}</strong>{' '}
                        <span className="text-xs text-slate-500">orders</span>
                      </td>

                      {/* Lifetime Spend */}
                      <td className="py-3.5 px-4">
                        <strong className="text-sm font-bold text-slate-900 dark:text-white">
                          ₹{c.spend.toLocaleString('en-IN')}
                        </strong>
                      </td>

                      {/* Tier */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${tierBadge}`}>
                          {c.tier}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onViewCustomer(c)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-charcoal-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Profile
                        </button>
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
