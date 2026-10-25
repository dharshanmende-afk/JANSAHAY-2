import React from 'react';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  GraduationCap, 
  IndianRupee, 
  FileCheck2 
} from 'lucide-react';

export default function Hero({ 
  onStartEligibility, 
  onExplore, 
  searchQuery, 
  setSearchQuery,
  onAuditDocs,
  activeCategory,
  setActiveCategory
}) {
  const quickPills = [
    { label: "All Schemes", category: "All" },
    { label: "Central Govt (NSP)", category: "Government Central" },
    { label: "Girls Only", category: "Girls Only" },
    { label: "State Portals", category: "State Government" },
    { label: "CSR & Trusts", category: "Corporate & CSR" },
    { label: "Specially-Abled (PwD)", category: "Differently Abled" },
    { label: "Global Study Abroad", category: "Study Abroad" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 py-12 md:py-16">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-gradient-to-tr from-blue-400/10 via-indigo-400/15 to-emerald-400/10 blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-700/50 shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>JANSAAHAY • India's Transparent Student Financial Aid Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-none">
            Know the <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">Full Scope</span> of Every Scholarship
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Never miss out on financial support again. Check your <strong>100% eligibility</strong>, view complete benefit scopes, download required document checklists, and follow verified <strong>step-by-step application walkthroughs</strong>.
          </p>

          {/* Search Box */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-lg shadow-blue-500/5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
              <div className="pl-3 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by scholarship name, degree (B.Tech, MBBS), caste, state, or provider..."
                className="w-full px-3 py-2.5 text-sm sm:text-base bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onExplore}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shrink-0 transition shadow-sm"
              >
                Search
              </button>
            </div>

            {/* Quick Filter Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
              <span className="text-xs text-slate-400 mr-1">Trending:</span>
              {quickPills.map((pill) => (
                <button
                  key={pill.category}
                  onClick={() => {
                    setActiveCategory(pill.category);
                    onExplore();
                  }}
                  className={`text-xs px-2.5 py-1 rounded-full transition font-medium ${
                    activeCategory === pill.category
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={onStartEligibility}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center space-x-2 transition active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Smart Eligibility Matcher</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={onAuditDocs}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center space-x-2 transition"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Document Readiness Tool</span>
            </button>
          </div>

          {/* Stat Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 mt-8">
            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400">45+ Schemes</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Central, State & CSR</div>
            </div>
            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">₹1,500+ Cr</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Annual Fund Outlay</div>
            </div>
            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">100% Verified</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Steps & Direct Links</div>
            </div>
            <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400">DBT Enabled</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Aadhaar Seeding Guide</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
