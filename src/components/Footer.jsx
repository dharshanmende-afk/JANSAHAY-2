import React from 'react';
import { GraduationCap, Heart, ShieldCheck, ExternalLink, AlertCircle } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Footer({ setActiveTab }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Important Official Disclaimer Notice */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-800 dark:text-slate-200">Official Disclaimer & Public Service Notice:</strong> JANSAAHAY is an independent scholarship discovery, eligibility evaluation, and application-guidance platform for Indian students. We never charge any fee from applicants, nor do we accept scholarship applications or disburse grants directly. All eligibility checks are personalized simulations based on published government gazettes and trust guidelines. Applicants must always verify deadlines, eligibility rules, and submission procedures on the respective official government and organization portals before final submission.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                JANSAAHAY
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Transparent, democratized scholarship discovery and personalized eligibility platform empowering every Indian student to claim their rightful educational grants.
            </p>
            <div className="text-xs font-mono text-slate-500">
              Maintained by <strong className="text-emerald-600 dark:text-emerald-400">dharshanmende-afk</strong>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('browse')} className="hover:text-emerald-600 transition">
                  Explore Verified Scholarships
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('checker')} className="hover:text-emerald-600 transition">
                  Smart Eligibility Matcher
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('validator')} className="hover:text-emerald-600 transition">
                  PFMS Name Mismatch Check
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('bonafide')} className="hover:text-emerald-600 transition">
                  Bonafide Certificate Generator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('docs')} className="hover:text-emerald-600 transition">
                  Document Readiness Audit
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracker')} className="hover:text-emerald-600 transition">
                  Application Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Official Portals
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center space-x-1">
                  <span>National Scholarship Portal (NSP)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.aicte-india.org" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center space-x-1">
                  <span>AICTE Schemes Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pfms.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center space-x-1">
                  <span>PFMS Direct Benefit Transfer (DBT)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://resident.uidai.gov.in/bank-mapper" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 flex items-center space-x-1">
                  <span>UIDAI Aadhaar-Bank Mapper</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimer & GitHub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Open Source & Public Service
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              JANSAAHAY is an informational public welfare platform. All schemes, deadlines, and grants are compiled from official gazette notifications and official state/central scholarship portals.
            </p>
            <a
              href="https://github.com/dharshanmende-afk/JANSAHAY-2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 text-xs font-medium transition"
            >
              <GithubIcon className="w-4 h-4" />
              <span>github.com/dharshanmende-afk/JANSAHAY-2</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            © {new Date().getFullYear()} <strong>JANSAAHAY 2.0</strong> (जनसहाय). Built with care for Indian students.
          </div>
          <div className="flex items-center space-x-1">
            <span>Designed & Engineered by</span>
            <a 
              href="https://github.com/dharshanmende-afk/JANSAHAY-2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              @dharshanmende-afk
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
