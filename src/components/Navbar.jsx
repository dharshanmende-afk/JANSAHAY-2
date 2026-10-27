import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  CheckCircle2, 
  FileCheck, 
  Bookmark, 
  BookOpen, 
  HelpCircle, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Sparkles,
  ShieldAlert,
  FileText,
  Scale,
  Languages,
  User,
  LogOut,
  ShieldCheck,
  LogIn
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  bookmarksCount, 
  darkMode, 
  setDarkMode,
  onOpenMatcher,
  onOpenCompare,
  language = "en",
  setLanguage,
  currentUser,
  onOpenAuthModal,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const navItems = [
    { id: 'browse', label: t.explore, icon: Search },
    { id: 'checker', label: t.matcher, icon: CheckCircle2, badge: 'Smart' },
    { id: 'validator', label: t.validator, icon: ShieldAlert, badge: 'PFMS' },
    { id: 'bonafide', label: t.bonafide, icon: FileText, badge: 'New' },
    { id: 'docs', label: t.docs, icon: FileCheck },
    { id: 'tracker', label: t.tracker, icon: Bookmark, count: bookmarksCount },
    { id: 'guides', label: t.guides, icon: BookOpen },
    { id: 'faq', label: t.faq, icon: HelpCircle },
  ];

  // If user is admin, add Admin Console to tabs
  if (currentUser && currentUser.role === 'ROLE_ADMIN') {
    navItems.push({
      id: 'admin',
      label: 'Admin Portal',
      icon: ShieldCheck,
      badge: 'ADMIN',
      isAdmin: true
    });
  }

  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी" },
    { code: "te", label: "తెలుగు" },
    { code: "ta", label: "தமிழ்" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "mr", label: "मराठी" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      {/* Top micro-bar with Indian Tricolor Accent */}
      <div className="bg-gradient-to-r from-orange-500 via-blue-600 to-emerald-600 h-1.5 w-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('browse')} 
            className="flex items-center space-x-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                  JANSAAHAY
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                  जनसहाय
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block truncate max-w-xs">
                {t.brandTag}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    item.isAdmin
                      ? isActive
                        ? 'bg-purple-600 text-white font-bold shadow-sm'
                        : 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 hover:bg-purple-200'
                      : isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-bold shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.isAdmin ? (isActive ? 'text-white' : 'text-purple-600') : isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ml-0.5 ${
                      item.isAdmin
                        ? 'bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-100'
                        : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-600 text-white ml-0.5">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action buttons on right */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* Compare Tool Shortcut */}
            <button
              onClick={onOpenCompare}
              className="p-2 rounded-lg text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center space-x-1 text-xs font-semibold"
              title="Compare Scholarships"
            >
              <Scale className="w-4 h-4 text-indigo-500" />
              <span className="hidden md:inline">Compare</span>
            </button>

            {/* Language Switcher */}
            <div className="relative flex items-center">
              <Languages className="w-3.5 h-3.5 absolute left-2 text-slate-400 pointer-events-none" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="pl-7 pr-2 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                title="Select Language"
              >
                {languageOptions.map(opt => (
                  <option key={opt.code} value={opt.code}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth Button / Profile Indicator */}
            {currentUser ? (
              <div className="flex items-center space-x-1.5 pl-1 border-l border-slate-200 dark:border-slate-700">
                <div 
                  onClick={() => {
                    if (currentUser.role === 'ROLE_ADMIN') {
                      setActiveTab('admin');
                    }
                  }}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    currentUser.role === 'ROLE_ADMIN' 
                      ? 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                      : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  }`}
                  title={currentUser.role === 'ROLE_ADMIN' ? 'Go to Admin Console' : 'Logged in student'}
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-bold truncate max-w-[100px]">{currentUser.name?.split(' ')[0]}</span>
                  <span className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase ${
                    currentUser.role === 'ROLE_ADMIN' ? 'bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-100' : 'bg-emerald-200 text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100'
                  }`}>
                    {currentUser.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    item.isAdmin
                      ? isActive
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                      : isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? (item.isAdmin ? 'text-white' : 'text-blue-600 dark:text-blue-400') : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && item.count > 0 && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                        {item.count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-2">
            {!currentUser ? (
              <button
                onClick={() => {
                  onOpenAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Register</span>
              </button>
            ) : (
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {currentUser.name} ({currentUser.role === 'ROLE_ADMIN' ? 'Admin' : 'Student'})
                </span>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            )}

            <button
              onClick={() => {
                onOpenMatcher();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm shadow"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Eligibility Matcher</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
