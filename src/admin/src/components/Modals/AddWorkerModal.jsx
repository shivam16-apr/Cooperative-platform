import React, { useState } from 'react';
import { X, UserPlus, Info } from 'lucide-react';

export default function AddWorkerModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Plumber');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [hourlyRate, setHourlyRate] = useState(299);
  const [languages, setLanguages] = useState('Hindi, English');
  const [bio, setBio] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onAdd({
      id: `WK-IND-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      role,
      email: email.trim(),
      phone: phone.trim(),
      hourlyRate: Number(hourlyRate),
      rating: 5.0,
      reviews: 1,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      languages: languages.trim(),
      badge: 'Background Checked 🛡️',
      tips: 0,
      bio: bio.trim() || 'New technician onboarded to SevaPulse family'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-700 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-charcoal-800 bg-slate-50 dark:bg-charcoal-850">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                Add Field Technician (Karmik)
              </h3>
              <p className="text-xs text-slate-400">Register verified worker with hourly wage caps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikram Shinde"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Skill / Category *
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
              >
                <option value="Plumber">Plumber (Plumbing & Leakages)</option>
                <option value="Electrician">Electrician (Wiring & Fans)</option>
                <option value="Mechanic">Mechanic (Two/Four Wheeler)</option>
                <option value="Carpenter">Carpenter (Furniture & Fitting)</option>
                <option value="Painter">Painter (Walls & Polish)</option>
                <option value="Appliance Tech">Appliance Tech (AC & Fridge)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vikram.shinde@sevapulse.in"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number (+91) *
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98200 12345"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Hourly Rate (₹199 - ₹699) *
              </label>
              <input
                type="number"
                min="199"
                max="699"
                required
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none font-bold text-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Spoken Languages
              </label>
              <input
                type="text"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                placeholder="Hindi, Marathi, English"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Short Bio & Background
            </label>
            <textarea
              rows="2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. 7 years experience in Mumbai high-rise plumbing..."
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-charcoal-850 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-charcoal-700 focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-[11px] text-blue-900 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40">
            <Info className="w-4 h-4 flex-shrink-0 text-blue-600" />
            <span>Worker will be instantly placed on Active status and ready for job assignment.</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-charcoal-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all"
            >
              Add Technician
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
