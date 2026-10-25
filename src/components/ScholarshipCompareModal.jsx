import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  Check, 
  Minus, 
  ExternalLink, 
  IndianRupee, 
  Scale, 
  Plus, 
  Trash2 
} from 'lucide-react';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';

export default function ScholarshipCompareModal({ 
  isOpen, 
  onClose, 
  onSelectScholarship 
}) {
  const [selectedIds, setSelectedIds] = useState([
    'nsp-pm-usp-central-sector',
    'aicte-pragati-girls',
    'reliance-foundation-ug-pg'
  ]);

  if (!isOpen) return null;

  const selectedScholarships = SCHOLARSHIPS_DATA.filter(s => selectedIds.includes(s.id));

  const handleAddScheme = (id) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveScheme = (id) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    }
  };

  const availableToAdd = SCHOLARSHIPS_DATA.filter(s => !selectedIds.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-6xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-6 shrink-0 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-white">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black">
                Scholarship Comparison Matrix
              </h2>
              <p className="text-xs sm:text-sm text-blue-200">
                Compare benefits, eligibility cutoffs, and document obligations side-by-side
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Scheme Selector Bar */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="text-slate-600 dark:text-slate-300 font-medium">
            Comparing <strong>{selectedScholarships.length} of 3</strong> schemes
          </div>

          {selectedIds.length < 3 && availableToAdd.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-semibold">Add to compare:</span>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddScheme(e.target.value);
                    e.target.value = "";
                  }
                }}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                defaultValue=""
              >
                <option value="" disabled>Choose scheme...</option>
                {availableToAdd.map(s => (
                  <option key={s.id} value={s.id}>{s.name.slice(0, 45)}...</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Side-by-side Table */}
        <div className="overflow-x-auto p-6 flex-1 text-slate-800 dark:text-slate-200">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="p-3 font-bold text-slate-400 uppercase tracking-wider w-1/4">Evaluation Parameter</th>
                {selectedScholarships.map(sch => (
                  <th key={sch.id} className="p-3 font-bold text-slate-900 dark:text-white w-1/4 align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                          {sch.badge}
                        </span>
                        <h4 className="text-sm font-extrabold mt-1 leading-snug">{sch.name}</h4>
                      </div>
                      {selectedIds.length > 1 && (
                        <button
                          onClick={() => handleRemoveScheme(sch.id)}
                          className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Financial Grant */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-600 dark:text-slate-400">Financial Benefit Scope</td>
                {selectedScholarships.map(s => (
                  <td key={s.id} className="p-3 font-extrabold text-blue-600 dark:text-blue-400">
                    {s.amount}
                  </td>
                ))}
              </tr>

              {/* Family Income Limit */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-600 dark:text-slate-400">Annual Family Income Bar</td>
                {selectedScholarships.map(s => (
                  <td key={s.id} className="p-3">
                    {s.incomeCeilingText}
                  </td>
                ))}
              </tr>

              {/* Min Qualifying Marks */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-600 dark:text-slate-400">Min Qualifying Marks</td>
                {selectedScholarships.map(s => (
                  <td key={s.id} className="p-3 font-semibold">
                    {s.minMarks}% in previous exam
                  </td>
                ))}
              </tr>

              {/* Gender Scope */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-600 dark:text-slate-400">Target Gender</td>
                {selectedScholarships.map(s => (
                  <td key={s.id} className="p-3">
                    {s.gender === "Female" ? (
                      <span className="text-pink-600 font-bold">Girls Only</span>
                    ) : (
                      <span>All Genders</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Eligible Castes */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-600 dark:text-slate-400">Eligible Categories</td>
                {selectedScholarships.map(s => (
                  <td key={s.id} className="p-3">
                    {s.casteEligibility.join(', ')}
                  </td>
                ))}
              </tr>

              {/* Eligible Course Levels */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-600 dark:text-slate-400">Eligible Education Level</td>
                {selectedScholarships.map(s => (
                  <td key={s.id} className="p-3">
                    {s.level.join(' • ')}
                  </td>
                ))}
              </tr>

              {/* State Scope */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-600 dark:text-slate-400">Domicile Requirement</td>
                {selectedScholarships.map(s => (
                  <td key={s.id} className="p-3">
                    {s.applicableStates}
                  </td>
                ))}
              </tr>

              {/* Portal Deadline */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-600 dark:text-slate-400">Application Deadline</td>
                {selectedScholarships.map(s => (
                  <td key={s.id} className="p-3 font-semibold text-amber-600">
                    {s.deadline} ({s.daysLeft}d left)
                  </td>
                ))}
              </tr>

              {/* Key Benefit Highlight */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-bold text-slate-600 dark:text-slate-400">Key Distinguishing Benefit</td>
                {selectedScholarships.map(s => (
                  <td key={s.id} className="p-3 text-xs text-slate-600 dark:text-slate-300">
                    {s.benefits[0]}
                  </td>
                ))}
              </tr>

              {/* Action Buttons */}
              <tr>
                <td className="p-3 font-bold text-slate-600 dark:text-slate-400">Action</td>
                {selectedScholarships.map(s => (
                  <td key={s.id} className="p-3">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectScholarship(s);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1"
                    >
                      <span>Full Scope</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
