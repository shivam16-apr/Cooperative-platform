import React, { useState } from 'react';
import { 
  Zap, Droplets, Hammer, Sparkles, Paintbrush, Wrench, Sprout, Wind,
  User, Mail, Phone, MapPin, Briefcase, ShieldCheck, Lock, 
  ArrowRight, ArrowLeft, Check, IndianRupee, CheckCircle2
} from 'lucide-react';
import { EXPERTISE_BRANCHES, DEMO_WORKERS } from '../data/mockData';
import fixmateLogo from '../assets/fixmate-logo.jpg';

const iconMap = {
  Zap,
  Droplets,
  Hammer,
  Sparkles,
  Paintbrush,
  Wrench,
  Sprout,
  Wind
};

const INDIAN_CITIES = [
  'Noida / Greater Noida (Delhi NCR)',
  'New Delhi (Delhi NCR)',
  'Gurugram (Delhi NCR)',
  'Bengaluru (Karnataka)',
  'Mumbai / Navi Mumbai (Maharashtra)',
  'Pune (Maharashtra)',
  'Hyderabad (Telangana)',
  'Chennai (Tamil Nadu)',
  'Kolkata (West Bengal)',
  'Ahmedabad (Gujarat)',
  'Jaipur (Rajasthan)',
  'Chandigarh (Punjab/Haryana)'
];

const EXPERIENCE_LEVELS = [
  '1 - 2 Years (Junior Associate)',
  '3 - 5 Years (Certified Specialist)',
  '5 - 8 Years (Senior Craftsman)',
  '8+ Years (Master Technician / Pro)'
];

export default function LoginPage({ onLogin }) {
  // Mode: Register vs Login
  const [isRegistering, setIsRegistering] = useState(true);
  
  // Registration Stepper: 1, 2, 3, 4
  const [regStep, setRegStep] = useState(1);

  // Form State
  const [selectedBranch, setSelectedBranch] = useState('electrician');
  const [fullName, setFullName] = useState('Ramesh Kumar');
  const [email, setEmail] = useState('ramesh.kumar@fixmate.in');
  const [phone, setPhone] = useState('9876543210');
  const [selectedCity, setSelectedCity] = useState('Noida / Greater Noida (Delhi NCR)');
  const [experience, setExperience] = useState('5 - 8 Years (Senior Craftsman)');
  const [hourlyRate, setHourlyRate] = useState(450);
  const [serviceRadius, setServiceRadius] = useState(15);
  const [aadhaarNumber, setAadhaarNumber] = useState('5421 8934 1092');
  const [securityPin, setSecurityPin] = useState('1234');
  const [confirmPin, setConfirmPin] = useState('1234');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Login Mode State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPin, setLoginPin] = useState('');

  const handleBranchSelect = (branchId) => {
    setSelectedBranch(branchId);
    const branchInfo = EXPERTISE_BRANCHES.find(b => b.id === branchId);
    if (branchInfo) {
      const numericRate = parseInt(branchInfo.avgRate.replace(/[^0-9]/g, '')) || 400;
      setHourlyRate(numericRate);
    }
  };

  const handleQuickDemoLogin = (presetKey) => {
    const worker = DEMO_WORKERS[presetKey] || DEMO_WORKERS.electrician;
    onLogin({
      ...worker,
      isOnline: true
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const branchObj = EXPERTISE_BRANCHES.find(b => b.id === selectedBranch) || EXPERTISE_BRANCHES[0];
    
    const newWorker = {
      id: 'w_' + Math.floor(1000 + Math.random() * 9000),
      name: fullName.trim() || 'Verified Indian Worker',
      phone: phone.startsWith('+91') ? phone : `+91 ${phone.replace(/[^0-9]/g, '').slice(-10)}`,
      email: email.trim() || 'worker@fixmate.in',
      expertiseId: selectedBranch,
      expertiseTitle: `Master ${branchObj.name}`,
      rating: 5.0,
      totalReviews: 1,
      completedJobsCount: 0,
      totalEarnings: 0,
      walletBalance: 500,
      serviceRadiusKm: serviceRadius,
      hourlyRate: hourlyRate,
      city: selectedCity,
      avatar: selectedBranch === 'electrician'
        ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      verificationLevel: 3,
      verificationStatus: 'Level 3 - Gold Verified Pro (Aadhaar & PAN Linked)',
      isOnline: true,
      badges: ['Skill India Certified', 'Aadhaar Verified', 'Fast Responder']
    };

    onLogin(newWorker);
  };

  const handleLoginSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginIdentifier,
        password: loginPin,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Save JWT token
    localStorage.setItem("token", data.token);

    // Make sure this is a worker account
    if (data.user.role !== "WORKER") {
      alert("This account is not a worker account.");
      return;
    }

    // Send logged-in user to the dashboard
    onLogin({
    ...DEMO_WORKERS.electrician,
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    isOnline: true,
  });

  } catch (error) {
    console.error("Login error:", error);
    alert("Cannot connect to server. Make sure the backend is running.");
  }
};

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center py-8 px-4 sm:px-6">
      {/* Brand Card */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col items-center text-center pt-8 pb-4 px-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center p-2 mb-3 shadow-sm">
            <img 
              src={fixmateLogo}
              alt="FixMate Logo" 
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isRegistering ? 'Create Account' : 'Worker Login'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {isRegistering 
              ? 'Join our cooperative services platform' 
              : 'Access your daily job dispatch and direct ₹ earnings'}
          </p>
        </div>

        {/* 4-Step Stepper (Only in Registration Mode) */}
        {isRegistering && (
          <div className="px-6 sm:px-10 py-3 bg-slate-50 border-y border-slate-200 flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNum) => {
              const isCompleted = regStep > stepNum;
              const isCurrent = regStep === stepNum;
              return (
                <React.Fragment key={stepNum}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : isCurrent 
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-sm' 
                          : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
                    </div>
                    <span className={`hidden sm:inline text-xs font-semibold ${
                      isCurrent ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                    }`}>
                      {stepNum === 1 && 'Profession'}
                      {stepNum === 2 && 'Personal'}
                      {stepNum === 3 && 'Service'}
                      {stepNum === 4 && 'Verification'}
                    </span>
                  </div>
                  {stepNum < 4 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                      regStep > stepNum ? 'bg-emerald-500' : 'bg-slate-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* Card Body */}
        <div className="p-6 sm:p-8">
          {isRegistering ? (
            <div>
              {/* STEP 1: Select Your Profession */}
              {regStep === 1 && (
                <div>
                  <div className="text-center sm:text-left mb-5">
                    <h3 className="text-lg font-bold text-slate-900">Select Your Profession</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Choose your primary trade or service area</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                    {EXPERTISE_BRANCHES.map((branch) => {
                      const Icon = iconMap[branch.icon] || Zap;
                      const isSelected = selectedBranch === branch.id;
                      return (
                        <button
                          type="button"
                          key={branch.id}
                          onClick={() => handleBranchSelect(branch.id)}
                          className={`p-3.5 sm:p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                            isSelected
                              ? 'border-2 border-blue-600 bg-blue-50/80 text-blue-950 font-semibold ring-2 ring-blue-500/20 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold truncate">{branch.name}</div>
                            <div className="text-xs text-slate-500 font-medium">{branch.avgRate}</div>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Step 1 Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      disabled
                      className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-400 text-sm font-medium cursor-not-allowed"
                    >
                      &lt; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegStep(2)}
                      className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                    >
                      Next &gt;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Personal Information */}
              {regStep === 2 && (
                <div>
                  <div className="text-center sm:text-left mb-5">
                    <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Tell us about yourself</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. ramesh.kumar@fixmate.in"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone Number (with +91)
                      </label>
                      <div className="relative flex">
                        <span className="inline-flex items-center px-3.5 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-sm font-semibold">
                          +91
                        </span>
                        <div className="relative flex-1">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="98765 43210"
                            className="w-full pl-10 pr-4 py-2.5 rounded-r-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setRegStep(1)}
                      className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-all"
                    >
                      &lt; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegStep(3)}
                      className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                    >
                      Next &gt;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Service Details & Location (with ₹ and Indian touch) */}
              {regStep === 3 && (
                <div>
                  <div className="text-center sm:text-left mb-5">
                    <h3 className="text-lg font-bold text-slate-900">Service Details & Location</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Set your operating city and standard service rate</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Operating City / Indian Hub
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white"
                        >
                          {INDIAN_CITIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Experience Level
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white"
                        >
                          {EXPERIENCE_LEVELS.map((exp) => (
                            <option key={exp} value={exp}>{exp}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Standard Hourly / Callout Rate (₹)
                        </label>
                        <span className="text-xs font-bold text-blue-600">₹{hourlyRate}/hour</span>
                      </div>
                      <div className="relative">
                        <span className="text-slate-500 font-bold text-base absolute left-3.5 top-1/2 -translate-y-1/2">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="150"
                          max="2500"
                          step="50"
                          value={hourlyRate}
                          onChange={(e) => setHourlyRate(Number(e.target.value))}
                          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 font-semibold bg-white"
                        />
                      </div>
                      <div className="flex gap-2 mt-2">
                        {[300, 400, 450, 600].map((rate) => (
                          <button
                            type="button"
                            key={rate}
                            onClick={() => setHourlyRate(rate)}
                            className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-all ${
                              hourlyRate === rate
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            ₹{rate}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Maximum Service Radius
                        </label>
                        <span className="text-xs font-bold text-slate-700">{serviceRadius} km coverage</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="35"
                        step="1"
                        value={serviceRadius}
                        onChange={(e) => setServiceRadius(Number(e.target.value))}
                        className="w-full accent-blue-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Step 3 Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setRegStep(2)}
                      className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-all"
                    >
                      &lt; Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegStep(4)}
                      className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                    >
                      Next &gt;
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Verification & Security (UIDAI Aadhaar / PIN) */}
              {regStep === 4 && (
                <form onSubmit={handleRegisterSubmit}>
                  <div className="text-center sm:text-left mb-5">
                    <h3 className="text-lg font-bold text-slate-900">Verification & Security</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Secure your worker account with government ID & PIN</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        UIDAI Aadhaar Number / Government ID
                      </label>
                      <div className="relative">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={aadhaarNumber}
                          onChange={(e) => setAadhaarNumber(e.target.value)}
                          placeholder="e.g. 5421 8934 1092"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white"
                        />
                      </div>
                      <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 inline" />
                        UIDAI e-KYC instant bank escrow verification enabled
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Create 4-Digit PIN
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="password"
                            maxLength={6}
                            required
                            value={securityPin}
                            onChange={(e) => setSecurityPin(e.target.value)}
                            placeholder="••••"
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white text-center font-mono tracking-widest"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Confirm PIN
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="password"
                            maxLength={6}
                            required
                            value={confirmPin}
                            onChange={(e) => setConfirmPin(e.target.value)}
                            placeholder="••••"
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white text-center font-mono tracking-widest"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          required
                          className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>
                          I confirm my trade certifications, accept the FixMate Cooperative Fair Wages agreement, and agree to direct UPI daily settlements.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Step 4 Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setRegStep(3)}
                      className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-all"
                    >
                      &lt; Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                    >
                      Complete Registration &gt;
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* LOGIN MODE */
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={loginPin}
                      onChange={(e) => setLoginPin(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-slate-900 bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <span>Login to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Demo Switcher */}
              <div className="pt-4 border-t border-slate-200">
                <div className="text-center text-xs font-semibold text-slate-500 mb-2.5">
                  1-Click Instant Demo Login:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('electrician')}
                    className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/60 hover:bg-blue-100 text-blue-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>⚡ Ramesh (Electrician)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('plumber')}
                    className="p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>🔧 Suresh (Plumber)</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Bottom Switcher Link */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            {isRegistering ? (
              <p className="text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all"
                >
                  Login
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(true);
                    setRegStep(1);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all"
                >
                  Create Account
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
