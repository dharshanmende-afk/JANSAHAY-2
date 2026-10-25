import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  Save, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';

const STAGES = [
  { id: 'saved', label: '1. Saved / Considering', color: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300' },
  { id: 'docs', label: '2. Gathering Documents', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' },
  { id: 'submitted', label: '3. Submitted on Portal', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300' },
  { id: 'verified', label: '4. College Verified', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300' },
  { id: 'disbursed', label: '5. Sanctioned & Disbursed', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' },
];

export default function ApplicationTracker({ 
  bookmarkedIds, 
  toggleBookmark, 
  onSelectScholarship,
  onExplore 
}) {
  const [trackerData, setTrackerData] = useState(() => {
    try {
      const saved = localStorage.getItem('jansaahay_tracker');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [activeNotesId, setActiveNotesId] = useState(null);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem('jansaahay_tracker', JSON.stringify(trackerData));
    } catch (e) {}
  }, [trackerData]);

  const savedScholarships = SCHOLARSHIPS_DATA.filter(sch => bookmarkedIds.includes(sch.id));

  const handleStageChange = (schId, newStage) => {
    setTrackerData(prev => ({
      ...prev,
      [schId]: {
        ...prev[schId],
        stage: newStage
      }
    }));
  };

  const handleSaveNotes = (schId) => {
    setTrackerData(prev => ({
      ...prev,
      [schId]: {
        ...prev[schId],
        notes: noteText
      }
    }));
    setActiveNotesId(null);
  };

  const openNotesEditor = (schId, currentNotes = "") => {
    setActiveNotesId(schId);
    setNoteText(currentNotes);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
            <Bookmark className="w-6 h-6 text-blue-600 fill-current" />
            <span>My Scholarship Tracker</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track application milestones, deadline alerts, reference IDs, and college verification stages.
          </p>
        </div>

        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
          {savedScholarships.length} Saved Scheme(s)
        </div>
      </div>

      {savedScholarships.length > 0 ? (
        <div className="space-y-4">
          {savedScholarships.map(sch => {
            const schTracker = trackerData[sch.id] || { stage: 'saved', notes: '' };
            const currentStageObj = STAGES.find(s => s.id === schTracker.stage) || STAGES[0];

            return (
              <div
                key={sch.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                        {sch.badge}
                      </span>
                      <span className="text-xs text-slate-400">
                        Deadline: {sch.deadline} ({sch.daysLeft} days remaining)
                      </span>
                    </div>

                    <h3 
                      onClick={() => onSelectScholarship(sch)}
                      className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer mt-1"
                    >
                      {sch.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {sch.provider} • Grant: <strong className="text-blue-600 dark:text-blue-400">{sch.amount}</strong>
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => toggleBookmark(sch.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition text-xs flex items-center space-x-1"
                      title="Remove from Tracker"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                    <button
                      onClick={() => onSelectScholarship(sch)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1"
                    >
                      <span>Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Stage Tracker Selector */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                    Current Application Progress:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                    {STAGES.map(s => {
                      const isSelected = schTracker.stage === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => handleStageChange(sch.id, s.id)}
                          className={`p-2 rounded-xl text-[11px] font-semibold text-center border transition ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 shadow-sm'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                          }`}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Personal Application Notes */}
                <div className="pt-2">
                  {activeNotesId === sch.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Save Application Ref No., College Nodal Officer contact, or notes..."
                        rows={2}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setActiveNotesId(null)}
                          className="px-3 py-1 text-xs text-slate-500 hover:text-slate-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNotes(sch.id)}
                          className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center space-x-1"
                        >
                          <Save className="w-3 h-3" />
                          <span>Save Note</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 dark:bg-slate-700/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="flex items-center space-x-2 truncate">
                        <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">
                          {schTracker.notes || "No notes added yet (e.g. Application ID, College contact)"}
                        </span>
                      </div>
                      <button
                        onClick={() => openNotesEditor(sch.id, schTracker.notes)}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold shrink-0 ml-2"
                      >
                        {schTracker.notes ? "Edit Note" : "+ Add Note"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            No scholarships saved in your tracker yet
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Browse through scholarships or run the Smart Eligibility Matcher and tap "Save for Later" to track deadlines and application progress here.
          </p>
          <button
            onClick={onExplore}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
          >
            Explore Scholarships
          </button>
        </div>
      )}
    </div>
  );
}
