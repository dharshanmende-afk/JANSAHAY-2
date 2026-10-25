import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  IndianRupee, 
  GraduationCap, 
  User, 
  Percent, 
  MapPin, 
  Bookmark, 
  ExternalLink,
  Sliders,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SCHOLARSHIPS_DATA, INDIAN_STATES } from '../data/scholarshipsData';

export default function EligibilityChecker({ 
  onSelectScholarship, 
  bookmarkedIds, 
  toggleBookmark 
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    level: "Undergraduate",
    caste: "General",
    gender: "Female",
    state: "All India",
    income: 300000,
    marks: 75,
    isDifferentlyAbled: false,
    isSingleGirlChild: false,
    isOrphan: false,
    isSportsNational: false
  });

  const [resultsCalculated, setResultsCalculated] = useState(false);
  const [matchedResults, setMatchedResults] = useState([]);

  // Calculate Match Score for each scholarship
  const calculateMatches = () => {
    const results = SCHOLARSHIPS_DATA.map(sch => {
      let score = 0;
      let reasons = [];
      let missing = [];

      // 1. Education Level Check (Weight: 25%)
      const levelMatches = sch.level.some(lvl => {
        if (formData.level === "Undergraduate" && lvl === "Undergraduate") return true;
        if (formData.level === "Postgraduate" && lvl === "Postgraduate") return true;
        if (formData.level === "School (Class 1-10)" && lvl === "School") return true;
        if (formData.level === "10+2" && lvl === "10+2") return true;
        if (formData.level === "Diploma/ITI" && lvl === "Diploma/ITI") return true;
        if (formData.level === "PhD" && lvl === "PhD") return true;
        if (formData.level === "Abroad" && lvl === "Postgraduate" && sch.category === "Study Abroad") return true;
        return false;
      });

      if (levelMatches) {
        score += 25;
        reasons.push("Education level qualifies");
      } else {
        missing.push(`Requires ${sch.level.join(' / ')}`);
      }

      // 2. Gender Check (Weight: 20%)
      if (sch.gender === "All") {
        score += 20;
        reasons.push("Open to all genders");
      } else if (sch.gender === formData.gender) {
        score += 20;
        reasons.push(`Designated for ${formData.gender} applicants`);
      } else {
        missing.push(`Restricted to ${sch.gender} students only`);
      }

      // 3. Caste / Category Check (Weight: 20%)
      if (sch.casteEligibility.includes(formData.caste)) {
        score += 20;
        reasons.push(`Category '${formData.caste}' is eligible`);
      } else {
        missing.push(`Requires ${sch.casteEligibility.join(', ')}`);
      }

      // 4. Income Check (Weight: 20%)
      if (!sch.incomeCeiling) {
        score += 20;
        reasons.push("No family income ceiling");
      } else if (formData.income <= sch.incomeCeiling) {
        score += 20;
        reasons.push(`Income ₹${(formData.income/100000).toFixed(1)}L is below limit ₹${(sch.incomeCeiling/100000).toFixed(1)}L`);
      } else {
        missing.push(`Exceeds income limit of ₹${(sch.incomeCeiling/100000).toFixed(1)} Lakh/yr`);
      }

      // 5. Minimum Marks Check (Weight: 15%)
      if (formData.marks >= sch.minMarks) {
        score += 15;
        reasons.push(`Marks ${formData.marks}% meets requirement (${sch.minMarks}%)`);
      } else {
        missing.push(`Requires minimum ${sch.minMarks}% (you entered ${formData.marks}%)`);
      }

      // Special priority boosts
      if (formData.isDifferentlyAbled && sch.category === "Differently Abled") {
        score = Math.min(100, score + 15);
        reasons.push("PwD category priority matched!");
      }
      if (formData.gender === "Female" && sch.category === "Girls Only") {
        reasons.push("Girls-specific scheme matched!");
      }

      // State check
      if (sch.applicableStates !== "All India" && formData.state !== "All India" && sch.applicableStates !== formData.state) {
        score = Math.max(0, score - 30);
        missing.push(`Requires domicile of ${sch.applicableStates}`);
      } else if (sch.applicableStates === formData.state) {
        reasons.push(`State domicile (${formData.state}) matched!`);
      }

      return {
        ...sch,
        matchScore: Math.min(100, score),
        reasons,
        missing,
        isFullyEligible: score >= 90
      };
    });

    results.sort((a, b) => b.matchScore - a.matchScore);
    setMatchedResults(results);
    setResultsCalculated(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleReset = () => {
    setStep(1);
    setResultsCalculated(false);
  };

  const totalPotentialFunds = matchedResults
    .filter(r => r.isFullyEligible)
    .reduce((acc, curr) => acc + (curr.maxAmountNumeric || 0), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Wizard Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Automated 5-Factor Evaluation Matrix</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Smart Eligibility Matcher
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mt-1">
          Tell us about your studies, income bracket, and category to calculate which scholarships you are 100% eligible to apply for today.
        </p>
      </div>

      {!resultsCalculated ? (
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1.5 bg-slate-100 dark:bg-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="p-6 sm:p-8">
            {/* Step 1: Education & State */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 1 of 3</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    Your Education Level & Domicile
                  </h3>
                </div>

                {/* Level Grid */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Current Study / Education Level:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: "Undergraduate", label: "Undergraduate (B.Tech, MBBS, B.Sc, B.Com, BA, etc.)" },
                      { id: "10+2", label: "Higher Secondary (Class 11 or 12 / Intermediate / PU)" },
                      { id: "Postgraduate", label: "Postgraduate (M.Tech, M.Sc, MA, MBA, MD, etc.)" },
                      { id: "Diploma/ITI", label: "Diploma / Polytechnic / ITI Course" },
                      { id: "School (Class 1-10)", label: "School Level (Class 1 to Class 10)" },
                      { id: "Abroad", label: "Planning Overseas Master's / PhD Abroad" }
                    ].map(lvl => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, level: lvl.id })}
                        className={`text-left p-3.5 rounded-xl border text-sm font-medium transition flex items-center justify-between ${
                          formData.level === lvl.id
                            ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 shadow-sm'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{lvl.label}</span>
                        {formData.level === lvl.id && (
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 ml-2">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* State Domicile */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                    State of Domicile / Permanent Residence:
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {INDIAN_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <p className="text-xs text-slate-400 mt-1">Select 'All India' if you want to consider national schemes irrespective of state.</p>
                </div>
              </div>
            )}

            {/* Step 2: Demographics & Category */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 2 of 3</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    Category, Gender & Special Quotas
                  </h3>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Gender:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Female", "Male", "Other"].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: g })}
                        className={`py-2.5 px-4 rounded-xl border text-sm font-medium text-center transition ${
                          formData.gender === g
                            ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Caste / Category */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Caste / Social Reservation Category:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "General", label: "General / Open" },
                      { id: "OBC", label: "OBC (Other Backward)" },
                      { id: "SC", label: "SC (Scheduled Caste)" },
                      { id: "ST", label: "ST (Scheduled Tribe)" },
                      { id: "EWS", label: "EWS (Economically Weaker)" },
                      { id: "Minority", label: "Minority (Muslim, Christian, Sikh, Jain, Buddhist)" }
                    ].map(c => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, caste: c.id })}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-medium transition text-left ${
                          formData.caste === c.id
                            ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Checkboxes */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Special Inclusions (Check all that apply):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <label className="flex items-center space-x-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <input
                        type="checkbox"
                        checked={formData.isDifferentlyAbled}
                        onChange={(e) => setFormData({ ...formData, isDifferentlyAbled: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">Specially-Abled / PwD (&gt;= 40%)</span>
                    </label>

                    <label className="flex items-center space-x-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <input
                        type="checkbox"
                        checked={formData.isSingleGirlChild}
                        onChange={(e) => setFormData({ ...formData, isSingleGirlChild: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">Single Girl Child in Family</span>
                    </label>

                    <label className="flex items-center space-x-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <input
                        type="checkbox"
                        checked={formData.isOrphan}
                        onChange={(e) => setFormData({ ...formData, isOrphan: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">Orphan / Lost Parent / COVID Affected</span>
                    </label>

                    <label className="flex items-center space-x-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <input
                        type="checkbox"
                        checked={formData.isSportsNational}
                        onChange={(e) => setFormData({ ...formData, isSportsNational: e.target.checked })}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">State / National Sports Medalist</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Income & Marks */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 3 of 3</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    Family Annual Income & Academic Merit
                  </h3>
                </div>

                {/* Income Slider & Preset */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Total Family Annual Income (all sources):
                    </label>
                    <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-lg">
                      ₹{(formData.income / 100000).toFixed(1)} Lakh / year
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="1600000"
                    step="50000"
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: Number(e.target.value) })}
                    className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>₹50,000 (BPL)</span>
                    <span>₹2.5 Lakh (Govt Limit)</span>
                    <span>₹8 Lakh (EWS Limit)</span>
                    <span>₹15 Lakh+</span>
                  </div>

                  {/* Fast selection presets */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {[
                      { label: "< ₹1.5L (BPL)", val: 120000 },
                      { label: "₹2.5L (Post-Matric limit)", val: 240000 },
                      { label: "₹4.5L (Central Sector)", val: 450000 },
                      { label: "₹6.0L (CSR/Trusts)", val: 600000 },
                      { label: "₹8.0L (AICTE/EWS)", val: 800000 },
                    ].map(preset => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, income: preset.val })}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                          formData.income === preset.val
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Marks Percentage */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Previous Exam Aggregate Marks Percentage:
                    </label>
                    <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-lg">
                      {formData.marks}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="1"
                    value={formData.marks}
                    onChange={(e) => setFormData({ ...formData, marks: Number(e.target.value) })}
                    className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>40% (Pass)</span>
                    <span>60% (First Class)</span>
                    <span>75% (Distinction)</span>
                    <span>85%+ (Top Merit)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700 mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center space-x-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center space-x-1.5 shadow-md shadow-blue-500/20"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={calculateMatches}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold flex items-center space-x-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Calculate Matching Scholarships</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 animate-fade-in">
          {/* Summary Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-blue-300">
                  Eligibility Evaluation Result
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Found {matchedResults.filter(r => r.isFullyEligible).length} Guaranteed Eligible Scholarships!
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 mt-1">
                  Based on: {formData.level} • {formData.caste} • {formData.gender} • ₹{(formData.income/100000).toFixed(1)}L Income • {formData.marks}% Marks
                </p>
              </div>

              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10">
                <div>
                  <div className="text-[11px] text-blue-200">Potential Annual Aid</div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">
                    ₹{totalPotentialFunds.toLocaleString('en-IN')}
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition ml-2"
                  title="Modify Profile & Recalculate"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Scholarship Result Cards */}
          <div className="space-y-4">
            {matchedResults.map(sch => {
              const isSaved = bookmarkedIds.includes(sch.id);
              return (
                <div 
                  key={sch.id}
                  className={`p-5 rounded-2xl bg-white dark:bg-slate-800 border transition-all hover:shadow-md ${
                    sch.isFullyEligible 
                      ? 'border-emerald-300 dark:border-emerald-700/60 ring-1 ring-emerald-500/10' 
                      : 'border-slate-200 dark:border-slate-700 opacity-90'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {sch.isFullyEligible ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>100% Eligible</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{sch.matchScore}% Match</span>
                          </span>
                        )}
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                          {sch.badge}
                        </span>
                        <span className="text-xs text-slate-400">
                          Deadline: {sch.deadline}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-1">
                        {sch.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Offered by {sch.provider}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-xs text-slate-400 font-medium">Award Benefit</div>
                      <div className="text-sm sm:text-base font-extrabold text-blue-600 dark:text-blue-400">
                        {sch.amount}
                      </div>
                    </div>
                  </div>

                  {/* Why you qualify / Missing conditions */}
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="space-y-1">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Why you qualify:</span>
                      </span>
                      <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 pl-1 space-y-0.5">
                        {sch.reasons.slice(0, 3).map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>

                    {sch.missing.length > 0 && (
                      <div className="space-y-1">
                        <span className="font-semibold text-amber-700 dark:text-amber-400 flex items-center space-x-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Conditions to check:</span>
                        </span>
                        <ul className="list-disc list-inside text-slate-500 dark:text-slate-400 pl-1 space-y-0.5">
                          {sch.missing.map((m, i) => (
                            <li key={i}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <button
                      onClick={() => toggleBookmark(sch.id)}
                      className={`p-2 rounded-lg border text-xs font-medium flex items-center space-x-1 transition ${
                        isSaved 
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' 
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current text-blue-600' : ''}`} />
                      <span>{isSaved ? 'Saved in Tracker' : 'Save for Later'}</span>
                    </button>

                    <button
                      onClick={() => onSelectScholarship(sch)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
                    >
                      <span>View Full Scope & Apply Steps</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              ← Test another qualification profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
