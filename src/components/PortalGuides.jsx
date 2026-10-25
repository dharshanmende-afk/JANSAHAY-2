import React, { useState } from 'react';
import { 
  BookOpen, 
  KeyRound, 
  CreditCard, 
  AlertTriangle, 
  ExternalLink, 
  CheckCircle2, 
  Building2, 
  MapPin,
  ArrowRight
} from 'lucide-react';
import { PORTAL_GUIDES, STATE_PORTALS_MAP } from '../data/portalGuides';

export default function PortalGuides() {
  const [activeGuideId, setActiveGuideId] = useState("nsp-otr");

  const activeGuide = PORTAL_GUIDES.find(g => g.id === activeGuideId) || PORTAL_GUIDES[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Official Workflow Walkthroughs</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Portal Guides & State Directories
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Clear visual procedures to guide you through NSP One-Time Registration, Aadhaar NPCI seeding, and state scholarship portals.
        </p>
      </div>

      {/* Guide Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PORTAL_GUIDES.map(guide => {
          const isSelected = activeGuideId === guide.id;
          return (
            <button
              key={guide.id}
              onClick={() => setActiveGuideId(guide.id)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  Guide
                </span>
              </div>
              <h3 className={`text-sm sm:text-base font-bold ${
                isSelected ? 'text-blue-900 dark:text-blue-200' : 'text-slate-800 dark:text-slate-200'
              }`}>
                {guide.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {guide.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Guide Details */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {activeGuide.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {activeGuide.subtitle}
          </p>
        </div>

        {/* Steps roadmap */}
        <div className="space-y-6 border-l-2 border-blue-500 ml-3 pl-5">
          {activeGuide.steps.map((st, i) => (
            <div key={i} className="relative">
              {/* Step indicator circle */}
              <div className="absolute -left-[29px] top-0.5 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-800">
                {st.step}
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {st.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {st.desc}
                </p>
                {st.alert && (
                  <div className="mt-2 text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-800/40">
                    <strong>Notice:</strong> {st.alert}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State Portals Directory Section */}
      <div className="space-y-4 pt-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>State Scholarship Portals Directory (Direct Official Links)</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            If your state operates its own designated e-Pass / Post-Matric portal, apply directly through the authorized state portal below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {STATE_PORTALS_MAP.map((st, i) => (
            <a
              key={i}
              href={st.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition group flex flex-col justify-between shadow-sm hover:shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {st.state}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 transition">
                  {st.portalName}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Dept: {st.dept}
                </p>
              </div>

              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-3 flex items-center space-x-1">
                <span>Visit Official Portal</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
