import React, { useState } from 'react';
import { 
  User, Phone, Mail, IndianRupee, MapPin, Bell, Shield, Lock, 
  LogOut, Save, CheckCircle2, Zap, Sliders
} from 'lucide-react';
import { EXPERTISE_BRANCHES } from '../data/mockData';

export default function SettingsSection({ worker, onUpdateWorker, onLogout }) {
  const [name, setName] = useState(worker.name);
  const [phone, setPhone] = useState(worker.phone);
  const [email, setEmail] = useState(worker.email);
  const [hourlyRate, setHourlyRate] = useState(worker.hourlyRate || 450);
  const [expertiseId, setExpertiseId] = useState(worker.expertiseId);
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const branchObj = EXPERTISE_BRANCHES.find(b => b.id === expertiseId);
    onUpdateWorker({
      ...worker,
      name,
      phone,
      email,
      hourlyRate,
      expertiseId,
      expertiseTitle: branchObj ? `Master ${branchObj.name}` : worker.expertiseTitle
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Worker Profile & Account Settings
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Update your personal info, trade expertise branch, hourly rates & security preferences.
          </p>
        </div>

        {saved && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Profile Updated!
          </div>
        )}
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4 text-blue-500" />
            <span>Personal Information</span>
          </h3>

          <div className="flex items-center gap-4 py-2">
            <img src={worker.avatar} alt={worker.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500 shadow-md" />
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{worker.name}</div>
              <div className="text-xs text-slate-400">{worker.expertiseTitle}</div>
              <button 
                type="button" 
                onClick={() => alert('Photo change feature...')}
                className="mt-1 text-xs text-blue-500 hover:underline font-semibold"
              >
                Change Avatar Photo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Mobile Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Standard Callout Rate (₹/hr)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Primary Trade Branch Switcher */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Primary Trade Branch / Expertise</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {EXPERTISE_BRANCHES.map((b) => {
              const isSelected = expertiseId === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setExpertiseId(b.id)}
                  className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold ring-2 ring-blue-500/30'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400'
                  }`}
                >
                  {b.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>

      </form>

      {/* Logout Box */}
      <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">Sign Out of Worker Account</div>
          <div className="text-xs text-slate-400">Safely log out of your worker session on this browser.</div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow transition-all flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Now</span>
        </button>
      </div>

    </div>
  );
}
