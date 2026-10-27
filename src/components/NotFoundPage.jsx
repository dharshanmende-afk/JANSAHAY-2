import React from 'react';
import { Compass, ArrowLeft, Home, Search, ShieldAlert } from 'lucide-react';

export default function NotFoundPage({ onGoHome, onGoBrowse }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative mx-auto w-24 h-24 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
          <Compass className="w-12 h-12 animate-pulse" />
          <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
            404
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Page or Scholarship Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            The scholarship guideline or page you were seeking has either expired, moved, or is not in our verified registry.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={onGoHome}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-md transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
          <button
            onClick={onGoBrowse}
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm flex items-center justify-center space-x-2 transition"
          >
            <Search className="w-4 h-4" />
            <span>Browse All Scholarships</span>
          </button>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
          <span>JanSaahay National Portal • Single Sign-On Enabled</span>
        </div>
      </div>
    </div>
  );
}
