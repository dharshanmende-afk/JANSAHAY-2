import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  FileText, 
  Printer, 
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';

export default function NameMismatchValidator() {
  const [inputs, setInputs] = useState({
    marksheetName: "Dharshan Mende",
    aadhaarName: "Mende Dharshan",
    bankName: "Dharshan M",
    dobMarksheet: "2005-08-14",
    dobAadhaar: "2005-08-14"
  });

  const [analyzed, setAnalyzed] = useState(false);
  const [result, setResult] = useState(null);

  // Normalize string for comparison
  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();

  const analyzeMismatch = () => {
    const s1 = normalize(inputs.marksheetName);
    const s2 = normalize(inputs.aadhaarName);
    const s3 = normalize(inputs.bankName);

    const tokens1 = s1.split(' ');
    const tokens2 = s2.split(' ');
    const tokens3 = s3.split(' ');

    let score = 100;
    let issues = [];
    let recommendations = [];

    // Check DOB
    const dobMatch = inputs.dobMarksheet === inputs.dobAadhaar;
    if (!dobMatch) {
      score -= 35;
      issues.push("Date of Birth (DOB) on Class 10 marksheet does NOT match Aadhaar Card.");
      recommendations.push("Update DOB at the nearest Aadhaar Seva Kendra with your 10th Board Certificate as proof.");
    }

    // Check 10th vs Aadhaar name
    if (s1 === s2) {
      // Perfect match
    } else {
      // Check token permutation (e.g. Mende Dharshan vs Dharshan Mende)
      const sorted1 = [...tokens1].sort().join(' ');
      const sorted2 = [...tokens2].sort().join(' ');

      if (sorted1 === sorted2) {
        score -= 10;
        issues.push("Name inversion detected: First name and Surname order are reversed between 10th Marksheet and Aadhaar.");
        recommendations.push("Most state portals accept inverted order if all words match, but NSP FaceRD may prompt verification. Ensure college nodal officer attests both.");
      } else {
        // Check initials (e.g. Dharshan M vs Dharshan Mende)
        const hasInitials = tokens1.some(t => t.length === 1) || tokens2.some(t => t.length === 1);
        if (hasInitials) {
          score -= 20;
          issues.push("Initials mismatch: One document contains a single letter initial while the other has the full surname.");
          recommendations.push("Aadhaar should preferably have your full expanded name as printed on your 10th Certificate.");
        } else {
          score -= 30;
          issues.push("Spelling difference or missing surname/middle name between 10th Certificate and Aadhaar.");
          recommendations.push("Submit an Aadhaar Update request online at myaadhaar.uidai.gov.in using your Class 10 certificate.");
        }
      }
    }

    // Check Bank Name
    if (s2 === s3 || s1 === s3) {
      // fine
    } else {
      score -= 15;
      issues.push("Bank Account Name differs from Aadhaar / 10th Certificate.");
      recommendations.push("Visit your bank branch with your Aadhaar Card and submit a 'Re-KYC / Name Regularization Request' so PFMS DBT can match your account.");
    }

    const finalScore = Math.max(10, Math.min(100, score));
    let status = "LOW RISK (SAFE)";
    let statusColor = "emerald";

    if (finalScore < 60) {
      status = "HIGH RISK OF PFMS REJECTION";
      statusColor = "rose";
    } else if (finalScore < 85) {
      status = "MODERATE RISK (ATTENTION NEEDED)";
      statusColor = "amber";
    }

    setResult({
      score: finalScore,
      status,
      statusColor,
      dobMatch,
      issues,
      recommendations
    });
    setAnalyzed(true);
  };

  const handleReset = () => {
    setAnalyzed(false);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>PFMS / Direct Benefit Transfer (DBT) Safeguard</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Aadhaar & Bank Name Mismatch Detector
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Over 45% of scholarship disbursements are stopped by the Public Financial Management System (PFMS) due to spelling, initials, or DOB discrepancies. Audit your identity documents before applying.
        </p>
      </div>

      {/* Input Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Marksheet Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
              1. Name on Class 10 / Secondary Certificate:
            </label>
            <input
              type="text"
              value={inputs.marksheetName}
              onChange={(e) => setInputs({ ...inputs, marksheetName: e.target.value })}
              placeholder="e.g., Dharshan Mende"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-400">Master demographic record used by Govt</span>
          </div>

          {/* Aadhaar Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
              2. Name Printed on Aadhaar Card:
            </label>
            <input
              type="text"
              value={inputs.aadhaarName}
              onChange={(e) => setInputs({ ...inputs, aadhaarName: e.target.value })}
              placeholder="e.g., Mende Dharshan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-400">Used by UIDAI biometric & FaceRD API</span>
          </div>

          {/* Bank Passbook Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
              3. Name as in Bank Passbook / Statement:
            </label>
            <input
              type="text"
              value={inputs.bankName}
              onChange={(e) => setInputs({ ...inputs, bankName: e.target.value })}
              placeholder="e.g., Dharshan M"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-400">Account seeded with NPCI mapper</span>
          </div>

          {/* Dates of Birth */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
              4. Date of Birth (Marksheet vs Aadhaar):
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={inputs.dobMarksheet}
                onChange={(e) => setInputs({ ...inputs, dobMarksheet: e.target.value })}
                className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                title="DOB on Marksheet"
              />
              <input
                type="date"
                value={inputs.dobAadhaar}
                onChange={(e) => setInputs({ ...inputs, dobAadhaar: e.target.value })}
                className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                title="DOB on Aadhaar"
              />
            </div>
            <span className="text-[11px] text-slate-400">Left: Marksheet • Right: Aadhaar</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={analyzeMismatch}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center space-x-2 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze PFMS Rejection Risk</span>
          </button>
        </div>
      </div>

      {/* Analysis Output Result */}
      {analyzed && result && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6 animate-fade-in">
          {/* Risk Banner */}
          <div className={`p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            result.score >= 85 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
              : result.score >= 60 
              ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="flex items-center space-x-3">
              {result.score >= 85 ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : result.score >= 60 ? (
                <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-600 shrink-0" />
              )}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">Risk Assessment Result</span>
                <h3 className="text-lg sm:text-xl font-extrabold">{result.status}</h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-medium block">Match Confidence Index</span>
              <span className="text-2xl font-black">{result.score}%</span>
            </div>
          </div>

          {/* Issues Detected */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Discrepancies Detected:
            </h4>
            {result.issues.length > 0 ? (
              <div className="space-y-2">
                {result.issues.map((issue, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero discrepancies detected! Names and DOB match 100% across all records.</span>
              </div>
            )}
          </div>

          {/* Actionable Recommendations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Exact Rectification Roadmap:
            </h4>
            <div className="space-y-2.5">
              {result.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm text-blue-900 dark:text-blue-200">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Government Links for Fixes */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-2 text-xs">
            <a
              href="https://myaadhaar.uidai.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-100 font-semibold flex items-center space-x-1.5 transition"
            >
              <span>Update Aadhaar on myAadhaar (UIDAI)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://resident.uidai.gov.in/bank-mapper"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-100 font-semibold flex items-center space-x-1.5 transition"
            >
              <span>Check Bank NPCI Seeding Status</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
