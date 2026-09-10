import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Server,
  Sparkles,
  Loader2
} from 'lucide-react';
import { authApi } from '../../api/adminApi';
import { setToken, setUser, isAuthenticated } from '../../api/client';

export default function LoginPage() {



  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'checking' | 'online' | 'offline'

  // If already authenticated, go directly to dashboard
  useEffect(() => {
    if (isAuthenticated()) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  // Ping backend health
  useEffect(() => {
    let isMounted = true;
    async function checkServer() {
      try {
        await authApi.checkHealth();
        if (isMounted) setBackendStatus('online');
      } catch (err) {
        if (isMounted) setBackendStatus('offline');
      }
    }
    checkServer();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleQuickFill = () => {
    setEmail('admin@FixMate.in');
    setPassword('admin123');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email address and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. POST /api/auth/login
      const data = await authApi.login({ email, password });

      // 2. Extract JWT token and user info
      const token = data.token;
      const user = data.user || {
        name: email.split('@')[0],
        email,
        role: 'ADMIN'
      };

      if (!token) {
        throw new Error('Authentication succeeded but server returned no JWT token.');
      }

      // 3. Store in localStorage
      setToken(token);
      setUser(user);
      if (user.name) {
        localStorage.setItem('FixMate_admin_name', user.name);
      }

      // 4. Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      let errorMsg = err.message || 'Login failed. Please verify your credentials.';
      
      if (err.isNetworkError) {
        errorMsg = 'Backend server is not reachable at http://localhost:5000. Start backend with `node server.js` or use demo mode.';
      } else if (err.status === 401) {
        errorMsg = 'Invalid email or password. Please check your admin credentials.';
      } else if (err.status === 403) {
        errorMsg = 'Access Denied: This account does not possess Administrator privileges.';
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Demo offline login fallback if backend isn't running yet and user clicks Demo Bypass
  const handleDemoBypass = () => {
    const mockJwt = 'mock_jwt_' + Math.random().toString(36).substring(2) + Date.now();
    const mockAdminUser = {
      id: 'USR-ADMIN-001',
      name: 'Rajeshwar Rao',
      email: email || 'admin@FixMate.in',
      role: 'ADMIN'
    };
    setToken(mockJwt);
    setUser(mockAdminUser);
    localStorage.setItem('FixMate_admin_name', mockAdminUser.name);
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand Card Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white shadow-2xl shadow-blue-500/25 mb-4 ring-4 ring-white/10 overflow-hidden hover:scale-105 transition-transform duration-300">
            <img
              src="/logo.png"
              alt="FixMate Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              FixMate 
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Centralized Cooperative &amp; Urban Facility Management Console
          </p>

          {/* Backend Status Pill */}
         
        </div>

        {/* Login Form Box */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Administrator Login</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter your credentials to access live field telemetry & worker management.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{error}</span>
                {backendStatus === 'offline' && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={handleDemoBypass}
                      className="text-blue-400 underline font-semibold hover:text-blue-300"
                    >
                      Click here to enter with Demo Admin session
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@FixMate.in"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-slate-500 hover:text-blue-400 cursor-pointer">
                  Forgot PIN?
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/60 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember & Token Notice */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500/30"
                />
                <span className="text-xs text-slate-400">Remember session (7 days)</span>
              </label>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating Admin...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          
        </div>

      </div>
    </div>
  );
}
