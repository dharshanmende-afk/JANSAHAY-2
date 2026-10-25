import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScholarshipList from './components/ScholarshipList';
import EligibilityChecker from './components/EligibilityChecker';
import DocumentReadinessTool from './components/DocumentReadinessTool';
import ApplicationTracker from './components/ApplicationTracker';
import PortalGuides from './components/PortalGuides';
import FaqSection from './components/FaqSection';
import ScholarshipDetailModal from './components/ScholarshipDetailModal';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedScholarship, setSelectedScholarship] = useState(null);

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
      />

      {/* Hero section on Browse tab */}
      {activeTab === 'browse' && (
        <Hero
          onStartEligibility={() => setActiveTab('checker')}
          onExplore={() => setActiveTab('browse')}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAuditDocs={() => setActiveTab('docs')}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
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

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
