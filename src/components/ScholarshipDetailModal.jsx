import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  Phone, 
  Mail, 
  FileCheck, 
  Share2, 
  Clock, 
  ArrowRight,
  Info,
  Calendar,
  IndianRupee,
  ShieldCheck,
  Download
} from 'lucide-react';

export default function ScholarshipDetailModal({ 
  scholarship, 
  onClose, 
  isBookmarked, 
  toggleBookmark 
}) {
  const [activeTab, setActiveTab] = useState('scope'); // 'scope', 'eligibility', 'documents', 'steps'
  const [checkedDocs, setCheckedDocs] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

  if (!scholarship) return null;

  const handleDocToggle = (docName) => {
    setCheckedDocs(prev => ({
      ...prev,
      [docName]: !prev[docName]
    }));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const totalMandatoryDocs = scholarship.requiredDocuments.filter(d => d.mandatory).length;
  const readyMandatoryDocs = scholarship.requiredDocuments.filter(d => d.mandatory && checkedDocs[d.name]).length;
  const docReadinessPct = totalMandatoryDocs > 0 ? Math.round((readyMandatoryDocs / totalMandatoryDocs) * 100) : 100;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-6 shrink-0 relative">
          {/* Action Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30 font-semibold">
                {scholarship.badge}
              </span>
              <span className="text-xs text-slate-300">
                Category: <strong>{scholarship.category}</strong>
              </span>
            </div>

            <div className="flex items-center space-x-1.5 no-print">
              <button
                onClick={handlePrint}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition text-xs flex items-center space-x-1"
                title="Print this scholarship guide"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition text-xs flex items-center space-x-1"
                title="Share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={() => toggleBookmark(scholarship.id)}
                className={`p-2 rounded-xl border text-xs flex items-center space-x-1 transition ${
                  isBookmarked
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{isBookmarked ? 'Tracked' : 'Save'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scheme Title */}
          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
            {scholarship.name}
          </h2>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Offered by {scholarship.provider}
          </p>

          {/* Key Quick Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-4 border-t border-white/10">
            <div className="bg-white/10 rounded-xl p-2.5">
              <div className="text-[10px] text-blue-200 uppercase font-semibold">Grant Benefit</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5 truncate">{scholarship.amount}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5">
              <div className="text-[10px] text-blue-200 uppercase font-semibold">Income Ceiling</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{scholarship.incomeCeilingText}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5">
              <div className="text-[10px] text-blue-200 uppercase font-semibold">Min Qualifying Marks</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5 truncate">{scholarship.minMarks}% in prior exam</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5">
              <div className="text-[10px] text-blue-200 uppercase font-semibold">Portal Deadline</div>
              <div className="text-xs sm:text-sm font-bold text-amber-300 mt-0.5 truncate">{scholarship.deadline} ({scholarship.daysLeft}d left)</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-6 overflow-x-auto no-print">
          {[
            { id: 'scope', label: '1. Full Scope & Benefits' },
            { id: 'eligibility', label: '2. Eligibility Criteria' },
            { id: 'documents', label: `3. Documents Checklist (${readyMandatoryDocs}/${totalMandatoryDocs})` },
            { id: 'steps', label: '4. Step-by-Step Application' },
            { id: 'support', label: '5. Official Desk & FAQ' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          
          {/* Tab 1: Full Scope & Benefits */}
          {activeTab === 'scope' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-1.5">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>Full Scope & Purpose of the Scheme</span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-blue-50/50 dark:bg-slate-800/60 p-4 rounded-2xl border border-blue-100 dark:border-slate-700">
                  {scholarship.fullScope}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-1.5">
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                  <span>Detailed Financial & Academic Benefits</span>
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {scholarship.benefits.map((b, i) => (
                    <div key={i} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50">
                <div className="flex items-start space-x-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 dark:text-amber-200">
                    <strong className="block text-sm font-semibold">Direct Benefit Transfer (DBT) Assured</strong>
                    Scholarship grants under this scheme are credited straight into the student's personal Aadhaar-seeded bank account via PFMS/DBT. No middleman, agent, or college clerk has the authority to deduct charges.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Eligibility Criteria */}
          {activeTab === 'eligibility' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  Mandatory Eligibility Check
                </h3>
                <div className="space-y-2.5">
                  {scholarship.eligibilityCriteria.map((crit, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                        {crit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matrix of Demographics */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Target Demographic Scope
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Eligible Genders:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{scholarship.gender}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Eligible Castes:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{scholarship.casteEligibility.join(', ')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Domicile State:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{scholarship.applicableStates}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Course Levels:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{scholarship.level.join(', ')}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Documents Checklist */}
          {activeTab === 'documents' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
                <div>
                  <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200">
                    Interactive Readiness Checklist
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Check off documents you have in hand before initiating application on the portal.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-blue-800 dark:text-blue-300">
                    {readyMandatoryDocs} of {totalMandatoryDocs} Ready ({docReadinessPct}%)
                  </span>
                  <div className="w-28 h-2 bg-blue-200 dark:bg-blue-800 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${docReadinessPct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {scholarship.requiredDocuments.map((doc, idx) => {
                  const isChecked = !!checkedDocs[doc.name];
                  return (
                    <div 
                      key={idx}
                      onClick={() => handleDocToggle(doc.name)}
                      className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start space-x-3 ${
                        isChecked
                          ? 'border-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent onClick
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 mt-0.5 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-bold ${isChecked ? 'text-emerald-900 dark:text-emerald-200 line-through' : 'text-slate-900 dark:text-white'}`}>
                            {doc.name}
                          </span>
                          {doc.mandatory ? (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                              Mandatory
                            </span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">
                              Optional
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <strong>Important Document Specifications:</strong>
                <p>• Scanned copies should be in PDF or JPG format under 200 KB each.</p>
                <p>• Make sure documents are self-attested (signed with date) unless digitally signed via DigiLocker.</p>
              </div>
            </div>
          )}

          {/* Tab 4: Step-by-Step Application */}
          {activeTab === 'steps' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-l-2 border-blue-600 ml-3 pl-4 space-y-6">
                {scholarship.applicationSteps.map((s, idx) => (
                  <div key={idx} className="relative">
                    {/* Step indicator node */}
                    <div className="absolute -left-[25px] top-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-900">
                      {s.stepNumber}
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {s.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {s.description}
                      </p>
                      {s.tip && (
                        <div className="mt-2 text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 p-2.5 rounded-lg border border-amber-200/60 dark:border-amber-800/40 flex items-start space-x-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                          <span><strong>Pro Tip:</strong> {s.tip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Portal Link Block */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                <div>
                  <span className="text-xs text-blue-200 font-semibold uppercase">Official Registration Link</span>
                  <h4 className="text-base font-bold">{scholarship.portalName}</h4>
                </div>
                <a
                  href={scholarship.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm flex items-center space-x-1.5 shadow transition active:scale-95 shrink-0"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Tab 5: Helpline & FAQ */}
          {activeTab === 'support' && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Official Scheme Helpdesk & Inquiries
                </h4>
                <div className="flex flex-col sm:flex-row gap-3 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>Helpline: <strong>{scholarship.helpline}</strong></span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Frequently Asked Questions
                </h4>
                <div className="space-y-3">
                  {scholarship.faqs.map((faq, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        Q: {faq.q}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 pl-3 border-l-2 border-blue-500">
                        A: {faq.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Portal: <span className="font-semibold text-slate-700 dark:text-slate-200">{scholarship.portalName}</span> • Verified for 2026-27 Academic Cycle
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Close
            </button>
            <a
              href={scholarship.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md shadow-blue-500/20 transition active:scale-95"
            >
              <span>Visit Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
