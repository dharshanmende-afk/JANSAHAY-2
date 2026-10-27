import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import api from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      let data;
      if (mode === 'login') {
        data = await api.login(email, password);
        setSuccessMsg(`Welcome back, ${data.user.name}!`);
      } else {
        data = await api.register(name, email, password);
        setSuccessMsg('Account created successfully! Logged in.');
      }

      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(data.user);
        onClose();
      }, 700);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickAdmin = () => {
    setEmail('admin@jansaahay.gov.in');
    setPassword('Admin@JanSaahay2026');
    setMode('login');
  };

  const fillQuickStudent = () => {
    setEmail('student@jansaahay.gov.in');
    setPassword('Student@JanSaahay2026');
    setMode('login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">
              ज
            </div>
            <span className="text-xl font-bold tracking-tight">जनसहाय • JANSAAHAY</span>
          </div>
          <p className="text-sm text-emerald-100">
            {mode === 'login' ? 'Sign in to access personalized eligibility & tracking' : 'Create an account to discover verified scholarships'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Demo Credentials */}
          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-200">
            <div className="font-semibold mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Demo Accounts (One-Click Auto-Fill):
            </div>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={fillQuickAdmin}
                className="px-2.5 py-1 bg-amber-200 dark:bg-amber-800/80 hover:bg-amber-300 text-amber-900 dark:text-amber-100 rounded font-medium transition"
              >
                Admin (ROLE_ADMIN)
              </button>
              <button
                type="button"
                onClick={fillQuickStudent}
                className="px-2.5 py-1 bg-emerald-200 dark:bg-emerald-800/80 hover:bg-emerald-300 text-emerald-900 dark:text-emerald-100 rounded font-medium transition"
              >
                Student (ROLE_USER)
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dharshan Mende"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com or admin@jansaahay.gov.in"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium rounded-lg text-sm transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In Securely' : 'Create Student Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Login / Register */}
          <div className="mt-5 text-center text-xs text-slate-500 dark:text-slate-400">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setError(''); }}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(''); }}
                  className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
