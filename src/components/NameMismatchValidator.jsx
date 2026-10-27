import React, { useState, useEffect } from 'react';
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
  Info,
  Check,
  Building2,
  Copy
} from 'lucide-react';

export default function NameMismatchValidator() {
  const [inputs, setInputs] = useState({
    marksheetName: "Dharshan Mende",
    aadhaarName: "Mende Dharshan",
    bankName: "Dharshan M",
    dobMarksheet: "2005-08-14",
    dobAadhaar: "2005-08-14",
    bankAccountNo: "XXXX-XXXX-4819",
    bankNameBank: "State Bank of India"
  });

  const [copiedLetter, setCopiedLetter] = useState(false);

  // Normalize string for comparison
  const cleanTokens = (str) => {
    return (str || '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  };

  // Preset scenarios so user can test various real-world situations
  const applyPreset = (type) => {
    if (type === 'inverted') {
      setInputs({
        marksheetName: "Dharshan Mende",
        aadhaarName: "Mende Dharshan",
        bankName: "Dharshan Mende",
        dobMarksheet: "2005-08-14",
        dobAadhaar: "2005-08-14",
        bankAccountNo: "XXXX-XXXX-4819",
        bankNameBank: "State Bank of India"
      });
    } else if (type === 'initial') {
      setInputs({
        marksheetName: "Dharshan Mende",
        aadhaarName: "Dharshan M",
        bankName: "M Dharshan",
        dobMarksheet: "2005-08-14",
        dobAadhaar: "2005-08-14",
        bankAccountNo: "XXXX-XXXX-5521",
        bankNameBank: "Canara Bank"
      });
    } else if (type === 'typo') {
      setInputs({
        marksheetName: "Dharshan Mende",
        aadhaarName: "Darshan Mende",
        bankName: "Darshan Mende",
        dobMarksheet: "2005-08-14",
        dobAadhaar: "2005-08-14",
        bankAccountNo: "XXXX-XXXX-1029",
        bankNameBank: "Punjab National Bank"
      });
    } else if (type === 'dob') {
      setInputs({
        marksheetName: "Dharshan Mende",
        aadhaarName: "Dharshan Mende",
        bankName: "Dharshan Mende",
        dobMarksheet: "2005-08-14",
        dobAadhaar: "2005-09-14",
        bankAccountNo: "XXXX-XXXX-9901",
        bankNameBank: "Union Bank of India"
      });
    } else if (type === 'perfect') {
      setInputs({
        marksheetName: "Dharshan Mende",
        aadhaarName: "Dharshan Mende",
        bankName: "Dharshan Mende",
        dobMarksheet: "2005-08-14",
        dobAadhaar: "2005-08-14",
        bankAccountNo: "XXXX-XXXX-7788",
        bankNameBank: "State Bank of India"
      });
    }
  };

  // Perform algorithmic analysis
  const t1 = cleanTokens(inputs.marksheetName);
  const t2 = cleanTokens(inputs.aadhaarName);
  const t3 = cleanTokens(inputs.bankName);

  const str1 = t1.join(' ');
  const str2 = t2.join(' ');
  const str3 = t3.join(' ');

  let score = 100;
  let issues = [];
  let recommendations = [];

  // 1. DOB Check
  const dobMatch = inputs.dobMarksheet === inputs.dobAadhaar;
  if (!dobMatch) {
    score -= 35;
    issues.push({
      severity: "critical",
      title: "Date of Birth Mismatch",
      desc: `10th Marksheet shows ${inputs.dobMarksheet}, but Aadhaar shows ${inputs.dobAadhaar}. PFMS automatic KYC will reject this application instantly.`
    });
    recommendations.push("Book an Aadhaar correction slot at myaadhaar.uidai.gov.in. Take your 10th marksheet as valid proof of birth to update Aadhaar DOB within 48-72 hours.");
  }

  // 2. Marksheet vs Aadhaar Token Check
  if (str1 && str2) {
    if (str1 === str2) {
      // 100% identical
    } else {
      const sorted1 = [...t1].sort().join(' ');
      const sorted2 = [...t2].sort().join(' ');

      if (sorted1 === sorted2) {
        // Inverted First & Last Name
        score -= 10;
        issues.push({
          severity: "warning",
          title: "Inverted Name Order (First Name vs Surname)",
          desc: `Words are identical (${t1.join(', ')}), but written in reversed order between Marksheet ("${inputs.marksheetName}") and Aadhaar ("${inputs.aadhaarName}").`
        });
        recommendations.push("Most state portals (like SSP & MahaDBT) allow inverted order, but NSP FaceRD may require biometric override. Have your college scholarship officer keep both xerox copies signed.");
      } else {
        // Check for single character initials vs full words
        const hasInitials1 = t1.some(w => w.length === 1);
        const hasInitials2 = t2.some(w => w.length === 1);

        if (hasInitials1 || hasInitials2) {
          score -= 20;
          issues.push({
            severity: "warning",
            title: "Initials vs Expanded Surname Mismatch",
            desc: `One document uses a single-letter initial (e.g., "${hasInitials1 ? t1.find(w => w.length === 1) : t2.find(w => w.length === 1)}") while the other has the full expanded surname.`
          });
          recommendations.push("For Central Schemes (NSP), your Aadhaar card should ideally feature your FULL name without abbreviations to pass automated bank-mapper checks.");
        } else {
          // Spelling differences
          score -= 25;
          issues.push({
            severity: "critical",
            title: "Spelling Discrepancy",
            desc: `Spelling differs between Marksheet ("${inputs.marksheetName}") and Aadhaar ("${inputs.aadhaarName}"). Even a single character difference causes PFMS Direct Benefit Transfer failure.`
          });
          recommendations.push("Update your Aadhaar name at an authorized Aadhaar Seva Kendra to match the exact spelling on your Class 10 certificate.");
        }
      }
    }
  }

  // 3. Bank Account Name Check
  if (str3) {
    if (str3 === str1 || str3 === str2) {
      // Matches either marksheet or aadhaar
    } else {
      score -= 15;
      issues.push({
        severity: "warning",
        title: "Bank Passbook Name Discrepancy",
        desc: `Bank account name ("${inputs.bankName}") does not match Aadhaar ("${inputs.aadhaarName}").`
      });
      recommendations.push("Submit the ready 'Bank Name Regularization & KYC Request Letter' below to your branch manager to align your bank name with Aadhaar.");
    }
  }

  const finalScore = Math.max(10, Math.min(100, score));

  let statusLabel = "LOW RISK (SAFE FOR DBT DISBURSAL)";
  let statusBadgeColor = "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300";

  if (finalScore < 60) {
    statusLabel = "HIGH RISK OF PFMS REJECTION";
    statusBadgeColor = "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300";
  } else if (finalScore < 85) {
    statusLabel = "MODERATE RISK (CORRECTION RECOMMENDED)";
    statusBadgeColor = "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300";
  }

  const handleCopyLetter = () => {
    const text = document.getElementById('bank-kyc-letter-text')?.innerText;
    if (text && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLetter(true);
      setTimeout(() => setCopiedLetter(false), 2500);
    }
  };

  const handlePrintLetter = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div className="text-center space-y-2 no-print">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>PFMS / Direct Benefit Transfer (DBT) Safeguard</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Aadhaar & Bank Name Mismatch Detector
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Over 45% of scholarship disbursements are blocked by the Public Financial Management System (PFMS) due to spelling, initials, or DOB discrepancies. Check your documents in real-time below:
        </p>
      </div>

      {/* Preset Test Buttons */}
      <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center gap-2 text-xs no-print">
        <span className="font-bold text-slate-500">Test Preset Scenarios:</span>
        <button
          onClick={() => applyPreset('perfect')}
          className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold hover:bg-emerald-200 transition"
        >
          ✓ Exact Match
        </button>
        <button
          onClick={() => applyPreset('inverted')}
          className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-semibold hover:bg-blue-200 transition"
        >
          Surname Inverted (Mende Dharshan)
        </button>
        <button
          onClick={() => applyPreset('initial')}
          className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold hover:bg-amber-200 transition"
        >
          Single Initial (Dharshan M)
        </button>
        <button
          onClick={() => applyPreset('typo')}
          className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-semibold hover:bg-rose-200 transition"
        >
          Spelling Typo (Darshan vs Dharshan)
        </button>
        <button
          onClick={() => applyPreset('dob')}
          className="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-semibold hover:bg-purple-200 transition"
        >
          DOB Month Mismatch
        </button>
      </div>

      {/* Live Input Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl space-y-4 no-print">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Marksheet Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
              1. Name on Class 10 / Secondary Certificate:
            </label>
            <input
              type="text"
              value={inputs.marksheetName}
              onChange={(e) => setInputs({ ...inputs, marksheetName: e.target.value })}
              placeholder="e.g., Dharshan Mende"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex flex-wrap gap-1 mt-1.5">
              {t1.map((w, idx) => (
                <span key={idx} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {w}
                </span>
              ))}
            </div>
          </div>

          {/* Aadhaar Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
              2. Name Printed on Aadhaar Card:
            </label>
            <input
              type="text"
              value={inputs.aadhaarName}
              onChange={(e) => setInputs({ ...inputs, aadhaarName: e.target.value })}
              placeholder="e.g., Mende Dharshan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex flex-wrap gap-1 mt-1.5">
              {t2.map((w, idx) => (
                <span key={idx} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {w}
                </span>
              ))}
            </div>
          </div>

          {/* Bank Passbook Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
              3. Name in Bank Passbook / Statement:
            </label>
            <input
              type="text"
              value={inputs.bankName}
              onChange={(e) => setInputs({ ...inputs, bankName: e.target.value })}
              placeholder="e.g., Dharshan M"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex flex-wrap gap-1 mt-1.5">
              {t3.map((w, idx) => (
                <span key={idx} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {w}
                </span>
              ))}
            </div>
          </div>

          {/* Dates of Birth */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">
              4. Date of Birth Comparison:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">10th Marksheet:</span>
                <input
                  type="date"
                  value={inputs.dobMarksheet}
                  onChange={(e) => setInputs({ ...inputs, dobMarksheet: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Aadhaar Card:</span>
                <input
                  type="date"
                  value={inputs.dobAadhaar}
                  onChange={(e) => setInputs({ ...inputs, dobAadhaar: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Real-Time Analysis Report Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
        
        {/* Risk Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
          <div className="flex items-center space-x-3.5">
            {finalScore >= 85 ? (
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
            ) : finalScore >= 60 ? (
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <AlertTriangle className="w-7 h-7" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                <XCircle className="w-7 h-7" />
              </div>
            )}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                PFMS Direct Benefit Transfer Audit
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold">{statusLabel}</h3>
              <p className="text-xs text-slate-300">
                {issues.length === 0 ? "All names and dates match with high precision." : `${issues.length} potential roadblock(s) detected.`}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-xs text-slate-400 block font-medium">Confidence Index</span>
            <span className="text-3xl font-black text-emerald-400">{finalScore}%</span>
          </div>
        </div>

        {/* Detailed Issues Detected */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Detailed Diagnostic Findings:
          </h4>
          {issues.length > 0 ? (
            <div className="space-y-2.5">
              {issues.map((issue, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 flex items-start space-x-3">
                  {issue.severity === "critical" ? (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block">
                      {issue.title}
                    </strong>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {issue.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center space-x-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Perfect Demographic Alignment!</strong> Name spellings and Date of Birth match seamlessly across your 10th certificate, Aadhaar, and Bank records. Your demographic data aligns with published portal criteria.
              </span>
            </div>
          )}
        </div>

        {/* Actionable Rectification Steps */}
        {recommendations.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Recommended Rectification Action Plan:
            </h4>
            <div className="space-y-2">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm text-blue-900 dark:text-blue-200">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generated Bank KYC Correction Request Letter */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Downloadable Bank Name Correction Request Letter</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Print this letter and submit it to your bank branch along with your Aadhaar copy to resolve bank name mismatch within 24 hours.
              </p>
            </div>

            <div className="flex items-center space-x-2 no-print">
              <button
                onClick={handleCopyLetter}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1 hover:bg-slate-50"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedLetter ? "Copied!" : "Copy Text"}</span>
              </button>
              <button
                onClick={handlePrintLetter}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Letter</span>
              </button>
            </div>
          </div>

          {/* Letter Body Preview */}
          <div id="bank-kyc-letter-text" className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono leading-relaxed text-slate-800 dark:text-slate-200 space-y-3">
            <div>
              To,<br />
              The Branch Manager,<br />
              {inputs.bankNameBank || "State Bank of India"},<br />
              Branch Office.
            </div>

            <div>
              <strong>Date:</strong> {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}<br />
              <strong>Subject:</strong> Urgent Request for Updating Name in Bank Account as per Aadhaar for DBT Scholarship Credit
            </div>

            <p>Respected Sir / Madam,</p>

            <p>
              I hold a Savings Bank Account bearing Account Number <strong>{inputs.bankAccountNo}</strong> in your branch. My name is currently registered in your bank records as <strong>"{inputs.bankName}"</strong>, whereas my official legal name printed on my Aadhaar Card and Class 10 Certificate is <strong>"{inputs.aadhaarName}"</strong>.
            </p>

            <p>
              Due to this name difference, my Direct Benefit Transfer (DBT) scholarship payments processed through the National Scholarship Portal (NSP) / PFMS payment bridge are being rejected.
            </p>

            <p>
              I kindly request you to update my name in your core banking system to <strong>"{inputs.aadhaarName}"</strong> as per my attached Aadhaar Card, and ensure my account is actively seeded with the <strong>NPCI DBT Mapper</strong>.
            </p>

            <div className="pt-2">
              Thanking you,<br /><br />
              Yours faithfully,<br />
              <strong>{inputs.aadhaarName}</strong><br />
              Mobile: Linked with Aadhaar<br />
              Enclosures: Self-attested copy of Aadhaar Card and Bank Passbook.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


