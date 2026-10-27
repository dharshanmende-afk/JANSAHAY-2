import React, { useState } from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DocumentReadinessTool() {
  const [checklist, setChecklist] = useState({
    aadhaarMobile: true,
    npciBank: false,
    incomeCert: false,
    casteCert: true,
    bonafideCert: false,
    marksheetsReady: true,
    feeReceipt: true
  });

  const [expandedTip, setExpandedTip] = useState(null);

  const items = [
    {
      id: "aadhaarMobile",
      title: "Aadhaar Linked with Active Mobile Number",
      importance: "Critical for OTP",
      description: "NSP OTR and state portals send mandatory OTPs for login and verification.",
      howToGet: "If mobile is outdated or unlinked, visit your nearest Aadhaar Seva Kendra or Post Office with biometric update machine."
    },
    {
      id: "npciBank",
      title: "Bank Account Seeded with NPCI / DBT Mapper",
      importance: "Critical for Fund Transfer",
      description: "Direct Benefit Transfer (DBT) sends money via Aadhaar payment bridge, NOT normal IFSC transfer.",
      howToGet: "Check status on resident.uidai.gov.in/bank-mapper. If inactive, visit bank branch and submit Aadhaar DBT Mandate form."
    },
    {
      id: "incomeCert",
      title: "Valid Income Certificate (Current Financial Year)",
      importance: "Required for EWS/MCM",
      description: "Must be issued by Tehsildar, Sub-Divisional Magistrate, or authorized Revenue Officer.",
      howToGet: "Apply at MeeSeva / CSC / Nadakacheri / MahaOnline portal with parent's salary slip or village patwari report."
    },
    {
      id: "casteCert",
      title: "Digital Caste / Community Certificate (SC/ST/OBC/EWS)",
      importance: "Required for Reservation Schemes",
      description: "Must feature a verifiable bar code / QR code. For Maharashtra, Caste Validity is also required for professional courses.",
      howToGet: "Obtain digital certificate from state revenue department e-District portal."
    },
    {
      id: "bonafideCert",
      title: "College Bonafide / Study Certificate with AISHE Code",
      importance: "Mandatory Enrollment Proof",
      description: "Signed & officially stamped by your College Principal or Dean with institution AISHE code.",
      howToGet: "Request your college student section or administrative office for the standardized NSP/State format bonafide."
    },
    {
      id: "marksheetsReady",
      title: "Previous Qualifying Exam Marksheets (Self-Attested)",
      importance: "Academic Verification",
      description: "Class 10th, 12th, or last passed semester marksheet with clear photo and marks visible.",
      howToGet: "DigiLocker verified digital copy or signed xerox copies scanned under 200 KB in PDF format."
    },
    {
      id: "feeReceipt",
      title: "Current Academic Session Paid Fee Receipt",
      importance: "Tuition Fee Reimbursement",
      description: "Detailed breakdown of tuition, library, lab, and institutional development fees.",
      howToGet: "Download from college student ERP portal or get receipt from accounts counter."
    }
  ];

  const handleToggle = (id) => {
    const updated = {
      ...checklist,
      [id]: !checklist[id]
    };
    setChecklist(updated);

    // If reaching 100%, trigger confetti
    const allChecked = Object.values(updated).every(Boolean);
    if (allChecked) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const totalItems = items.length;
  const completedItems = Object.values(checklist).filter(Boolean).length;
  const readinessPct = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-xs font-semibold">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Pre-Application Audit Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Document Readiness & DBT Audit
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Over 65% of scholarship rejections happen due to minor document mistakes. Audit your checklist now to ensure smooth first-attempt verification and submission.
        </p>
      </div>

      {/* Readiness Score Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-blue-300 tracking-wider">
            Your Document Audit Score
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
            {readinessPct}% Application Ready
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            {readinessPct === 100 
              ? "All critical documents are prepared! You can apply with zero friction." 
              : `${totalItems - completedItems} document action(s) remaining before application.`}
          </p>
        </div>

        <div className="w-full sm:w-48 text-right">
          <div className="text-xs text-blue-200 font-semibold mb-1">
            {completedItems} of {totalItems} verified
          </div>
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                readinessPct >= 80 ? 'bg-emerald-400' : readinessPct >= 50 ? 'bg-amber-400' : 'bg-rose-400'
              }`}
              style={{ width: `${readinessPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {items.map((item) => {
          const isReady = !!checklist[item.id];
          const isExpanded = expandedTip === item.id;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                isReady
                  ? 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div 
                  className="flex items-start space-x-3 cursor-pointer flex-1"
                  onClick={() => handleToggle(item.id)}
                >
                  <input
                    type="checkbox"
                    checked={isReady}
                    onChange={() => {}} // parent onClick
                    className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 shrink-0"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-sm font-bold ${isReady ? 'text-emerald-950 dark:text-emerald-200' : 'text-slate-900 dark:text-white'}`}>
                        {item.title}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {item.importance}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedTip(isExpanded ? null : item.id)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 shrink-0 p-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isExpanded ? 'Hide Guide' : 'How to get?'}</span>
                </button>
              </div>

              {/* Collapsible How-To Box */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs bg-slate-50 dark:bg-slate-700/40 p-3 rounded-xl animate-fade-in text-slate-700 dark:text-slate-200">
                  <strong className="block text-blue-600 dark:text-blue-400 mb-1">Step-by-step resolution:</strong>
                  {item.howToGet}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Helpful DigiLocker notice */}
      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-start space-x-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 dark:text-slate-300">
          <strong className="font-semibold text-slate-900 dark:text-white block mb-0.5">
            DigiLocker Integration Recommendation
          </strong>
          Central and state scholarship portals seamlessly fetch verified 10th marksheets, CBSE certificates, and Caste/Income documents directly from DigiLocker without needing manual notarization or stamps.
        </div>
      </div>
    </div>
  );
}

