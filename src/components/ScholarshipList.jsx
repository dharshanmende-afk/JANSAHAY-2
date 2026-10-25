import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  IndianRupee, 
  GraduationCap, 
  MapPin, 
  Bookmark, 
  ArrowRight, 
  Sparkles, 
  SlidersHorizontal,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  SCHOLARSHIPS_DATA, 
  SCHOLARSHIP_CATEGORIES, 
  INDIAN_STATES, 
  EDUCATION_LEVELS 
} from '../data/scholarshipsData';

export default function ScholarshipList({ 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory,
  onSelectScholarship,
  bookmarkedIds,
  toggleBookmark,
  onOpenMatcher
}) {
  const [selectedState, setSelectedState] = useState("All India");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("deadline"); // deadline, amount, name

  // Filter & Search Logic
  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS_DATA.filter(sch => {
      // Category filter
      if (activeCategory !== "All" && sch.category !== activeCategory) {
        return false;
      }

      // State filter
      if (selectedState !== "All India" && sch.applicableStates !== "All India" && sch.applicableStates !== selectedState) {
        return false;
      }

      // Level filter
      if (selectedLevel !== "All") {
        const levelKeyword = selectedLevel.split(' ')[0]; // extract base word
        const matchesLevel = sch.level.some(lvl => lvl.toLowerCase().includes(levelKeyword.toLowerCase()));
        if (!matchesLevel) return false;
      }

      // Search query (fuzzy across title, provider, category, tags, fullScope)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          sch.name.toLowerCase().includes(query) ||
          sch.provider.toLowerCase().includes(query) ||
          sch.category.toLowerCase().includes(query) ||
          sch.fullScope.toLowerCase().includes(query) ||
          sch.tags.some(tag => tag.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "deadline") {
        return a.daysLeft - b.daysLeft;
      } else if (sortBy === "amount") {
        return (b.maxAmountNumeric || 0) - (a.maxAmountNumeric || 0);
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [searchQuery, activeCategory, selectedState, selectedLevel, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Category Pills Bar (Horizontally scrollable on mobile) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none no-print">
        {SCHOLARSHIP_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition shrink-0 ${
              activeCategory === category
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter & Sort Controls Row */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input in toolbar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, courses, schemes, or eligibility..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* State Dropdown */}
        <div className="flex items-center space-x-2">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {INDIAN_STATES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Level Dropdown */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Education Levels</option>
            {EDUCATION_LEVELS.map(lvl => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="deadline">Sort: Closing Soon</option>
            <option value="amount">Sort: Max Benefit ₹</option>
            <option value="name">Sort: Scheme Name</option>
          </select>
        </div>
      </div>

      {/* Results Count & Quick Help */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <div>
          Showing <span className="font-bold text-slate-900 dark:text-white">{filteredScholarships.length}</span> scholarships
          {activeCategory !== "All" && ` under ${activeCategory}`}
        </div>
        <button
          onClick={onOpenMatcher}
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center space-x-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Not sure? Run Smart Matcher</span>
        </button>
      </div>

      {/* Grid of Scholarship Cards */}
      {filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredScholarships.map(sch => {
            const isSaved = bookmarkedIds.includes(sch.id);
            const isClosingSoon = sch.status === "Closing Soon";

            return (
              <div
                key={sch.id}
                className="group flex flex-col justify-between bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-blue-500/60 p-5 shadow-sm hover:shadow-xl transition-all duration-200 relative overflow-hidden"
              >
                {/* Top Badge Strip */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40">
                      {sch.badge}
                    </span>

                    {/* Deadline Status Badge */}
                    <div className="flex items-center space-x-1 text-xs">
                      {isClosingSoon ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold animate-soft-pulse">
                          <Clock className="w-3 h-3" />
                          <span>{sch.daysLeft}d left</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>Till {sch.deadline}</span>
                        </span>
                      )}

                      {/* Bookmark Icon Button */}
                      <button
                        onClick={() => toggleBookmark(sch.id)}
                        className={`p-1.5 rounded-lg transition ${
                          isSaved 
                            ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/60' 
                            : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        title={isSaved ? "Remove from Tracker" : "Save to Tracker"}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Title & Provider */}
                  <h3 
                    onClick={() => onSelectScholarship(sch)}
                    className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 cursor-pointer group-hover:text-blue-600 dark:group-hover:text-blue-400 transition"
                  >
                    {sch.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {sch.provider}
                  </p>

                  {/* Amount / Grant Highlight */}
                  <div className="my-3 p-2.5 rounded-xl bg-gradient-to-r from-blue-50/70 to-indigo-50/50 dark:from-slate-700/40 dark:to-slate-700/20 border border-blue-100 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Financial Benefit Scope</div>
                    <div className="text-sm font-extrabold text-blue-700 dark:text-blue-300 mt-0.5">
                      {sch.amount}
                    </div>
                  </div>

                  {/* Quick Eligibility Key Points */}
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-start space-x-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{sch.level.join(', ')}</span>
                    </div>
                    <div className="flex items-start space-x-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{sch.incomeCeilingText}</span>
                    </div>
                    <div className="flex items-start space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{sch.applicableStates}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Min Marks: <strong className="text-slate-700 dark:text-slate-200">{sch.minMarks}%</strong>
                  </span>

                  <button
                    onClick={() => onSelectScholarship(sch)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition active:scale-95"
                  >
                    <span>Full Scope & Steps</span>
                    <ArrowRight className="w-3 h-3 ml-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            No scholarships found matching criteria
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keywords, clear the state filter, or switch category tabs to view all national schemes.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
              setSelectedState('All India');
              setSelectedLevel('All');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
