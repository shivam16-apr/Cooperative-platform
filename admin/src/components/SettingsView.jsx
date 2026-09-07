import React, { useState } from 'react';
import {
  User,
  Palette,
  Bell,
  Shield,
  Save,
  CheckCircle,
  Smartphone,
  Moon,
  Sun
} from 'lucide-react';

export default function SettingsView({
  adminName,
  setAdminName,
  theme,
  setTheme,
  onSaveSettings,
  onRevokeSessions
}) {
  const [activeSubTab, setActiveSubTab] = useState('profile');
  const [email, setEmail] = useState('rajeshwar.rao@sevapulse.in');
  const [phone, setPhone] = useState('+91 98200 88123');
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [complaintAlerts, setComplaintAlerts] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const subTabs = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'appearance', label: 'Appearance & Theme', icon: Palette },
    { id: 'alerts', label: 'Alerts & WhatsApp', icon: Bell },
    { id: 'security', label: 'Security & 2FA', icon: Shield },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    onSaveSettings(adminName);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Preferences & Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure admin credentials, Indian regional parameters, SMS/WhatsApp gateways, and theme preferences.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-charcoal-800 gap-2 overflow-x-auto">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="p-6 rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200/80 dark:border-charcoal-800 shadow-sm">
        {/* 1. Admin Profile */}
        {activeSubTab === 'profile' && (
          <form onSubmit={handleSave} className="space-y-5">
            <div className="flex items-center gap-4 pb-5 border-b border-slate-100 dark:border-charcoal-800">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600"
              />
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">{adminName}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Head of Operations • SevaPulse India HQ</p>
                <span className="inline-block mt-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  Role: Super Administrator
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Display Full Name
                </label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Work Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Mobile (OTP Verified)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Default Currency & Locale
                </label>
                <input
                  type="text"
                  disabled
                  value="INR (₹) - Indian Rupee [en-IN]"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-charcoal-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-charcoal-700 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 active:scale-95 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* 2. Appearance & Theme */}
        {activeSubTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Visual Palette & Dark Mode</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Switch between high-contrast Deep Navy Dark Mode and crisp Light Mode.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setTheme('light')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  theme === 'light'
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20'
                    : 'border-slate-200 dark:border-charcoal-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Light Mode</span>
                  </div>
                  {theme === 'light' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-xs text-slate-500">Crisp slate styling with white cards & deep blue accents.</p>
              </div>

              <div
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20'
                    : 'border-slate-200 dark:border-charcoal-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    <Moon className="w-4 h-4 text-blue-400" />
                    <span>Deep Navy Dark Mode</span>
                  </div>
                  {theme === 'dark' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-xs text-slate-500">Dark Charcoal Black & Deep Navy Blue high-contrast theme.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-charcoal-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Compact Table Densities</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Render more rows per page on large monitors.</p>
              </div>
              <input
                type="checkbox"
                checked={compactMode}
                onChange={(e) => setCompactMode(e.target.checked)}
                className="w-5 h-5 rounded text-blue-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* 3. Alerts & WhatsApp */}
        {activeSubTab === 'alerts' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Notification & Messaging Channels</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Manage automated Indian SMS & WhatsApp notifications for customers and workers.
              </p>
            </div>

            <div className="space-y-4 divide-y divide-slate-100 dark:divide-charcoal-800">
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      WhatsApp Gateway Broadcasts
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Send automatic booking confirmations and technician arrival live links to customer WhatsApp.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappAlerts}
                  onChange={(e) => setWhatsappAlerts(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Urgent Grievance Escalate Bell
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Notify admin dashboard instantly when high priority complaints are filed by customers.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={complaintAlerts}
                  onChange={(e) => setComplaintAlerts(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. Security & 2FA */}
        {activeSubTab === 'security' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Security & Access Management</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Maintain strict access control for Indian customer data and financial records.
              </p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-charcoal-850 border border-slate-200 dark:border-charcoal-700">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Two-Factor Authentication (OTP via Indian SIM)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Requires 6-digit SMS OTP on +91 98200 88123 on login.</p>
              </div>
              <input
                type="checkbox"
                checked={twoFactorAuth}
                onChange={(e) => setTwoFactorAuth(e.target.checked)}
                className="w-5 h-5 rounded text-blue-600 cursor-pointer"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-charcoal-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Active Login Sessions</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Logged in from Chrome on Windows • Mumbai HQ (Current session)
                </p>
              </div>
              <button
                type="button"
                onClick={onRevokeSessions}
                className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 font-bold text-xs hover:bg-rose-100 transition-colors"
              >
                Revoke All Other Sessions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
