import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScholarshipList from './components/ScholarshipList';
import EligibilityChecker from './components/EligibilityChecker';
import NameMismatchValidator from './components/NameMismatchValidator';
import BonafideGenerator from './components/BonafideGenerator';
import DocumentReadinessTool from './components/DocumentReadinessTool';
import ApplicationTracker from './components/ApplicationTracker';
import PortalGuides from './components/PortalGuides';
import FaqSection from './components/FaqSection';
import ScholarshipDetailModal from './components/ScholarshipDetailModal';
import ScholarshipCompareModal from './components/ScholarshipCompareModal';
import AdminDashboard from './components/AdminDashboard';
import NotFoundPage from './components/NotFoundPage';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import api from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Current authenticated user state
  const [currentUser, setCurrentUser] = useState(() => api.currentUser);

  // Language state persisted in localStorage
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('jansaahay_lang');
      return saved || 'en';
    } catch (e) {
      return 'en';
    }
  });

  // Bookmarks / Saved scholarships state persisted in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('jansaahay_bookmarks');
      return saved ? JSON.parse(saved) : ['nsp-pm-usp-central-sector', 'aicte-pragati-girls'];
    } catch (e) {
      return ['nsp-pm-usp-central-sector', 'aicte-pragati-girls'];
    }
  });

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('jansaahay_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jansaahay_lang', language);
    } catch (e) {}
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem('jansaahay_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {}
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('jansaahay_theme', darkMode ? 'dark' : 'light');
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  }, [darkMode]);

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    if (user.role === 'ROLE_ADMIN') {
      setActiveTab('admin');
    }
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    if (activeTab === 'admin') {
      setActiveTab('browse');
    }
  };

  const validTabs = ['browse', 'checker', 'validator', 'bonafide', 'docs', 'tracker', 'guides', 'faq', 'admin'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarksCount={bookmarkedIds.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenMatcher={() => setActiveTab('checker')}
        onOpenCompare={() => setIsCompareOpen(true)}
        language={language}
        setLanguage={setLanguage}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Hero section on Browse tab */}
      {activeTab === 'browse' && (
        <Hero
          onStartEligibility={() => setActiveTab('checker')}
          onExplore={() => setActiveTab('browse')}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAuditDocs={() => setActiveTab('docs')}
          onOpenValidator={() => setActiveTab('validator')}
          onOpenBonafide={() => setActiveTab('bonafide')}
          onOpenCompare={() => setIsCompareOpen(true)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          language={language}
        />
      )}

      {/* Main Dynamic Content Area */}
      <main className="flex-1">
        {activeTab === 'browse' && (
          <ScholarshipList
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onSelectScholarship={setSelectedScholarship}
            bookmarkedIds={bookmarkedIds}
            toggleBookmark={toggleBookmark}
            onOpenMatcher={() => setActiveTab('checker')}
          />
        )}

        {activeTab === 'checker' && (
          <EligibilityChecker
            onSelectScholarship={setSelectedScholarship}
            bookmarkedIds={bookmarkedIds}
            toggleBookmark={toggleBookmark}
          />
        )}

        {activeTab === 'validator' && (
          <NameMismatchValidator />
        )}

        {activeTab === 'bonafide' && (
          <BonafideGenerator />
        )}

        {activeTab === 'docs' && (
          <DocumentReadinessTool />
        )}

        {activeTab === 'tracker' && (
          <ApplicationTracker
            bookmarkedIds={bookmarkedIds}
            toggleBookmark={toggleBookmark}
            onSelectScholarship={setSelectedScholarship}
            onExplore={() => setActiveTab('browse')}
          />
        )}

        {activeTab === 'guides' && (
          <PortalGuides />
        )}

        {activeTab === 'faq' && (
          <FaqSection />
        )}

        {/* Protected Admin Dashboard */}
        {activeTab === 'admin' && (
          currentUser && currentUser.role === 'ROLE_ADMIN' ? (
            <AdminDashboard
              currentUser={currentUser}
              onSelectScholarship={setSelectedScholarship}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 text-center bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-red-200 dark:border-red-900 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xl">
                ✕
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Admin Access Restricted</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You must sign in with an account having administrator privileges (ROLE_ADMIN) to view the JanSaahay management console.
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow"
              >
                Sign In as Admin
              </button>
            </div>
          )
        )}

        {/* 404 View for Invalid / Unrecognized Routes */}
        {!validTabs.includes(activeTab) && (
          <NotFoundPage
            onGoHome={() => setActiveTab('browse')}
            onGoBrowse={() => setActiveTab('browse')}
          />
        )}
      </main>

      {/* Scholarship Detail Modal */}
      {selectedScholarship && (
        <ScholarshipDetailModal
          scholarship={selectedScholarship}
          onClose={() => setSelectedScholarship(null)}
          isBookmarked={bookmarkedIds.includes(selectedScholarship.id)}
          toggleBookmark={toggleBookmark}
        />
      )}

      {/* Scholarship Side-by-Side Compare Modal */}
      <ScholarshipCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelectScholarship={(sch) => {
          setIsCompareOpen(false);
          setSelectedScholarship(sch);
        }}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
