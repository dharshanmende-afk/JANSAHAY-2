import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Sparkles, 
  Building2, 
  CheckCircle2,
  Info
} from 'lucide-react';

export default function BonafideGenerator() {
  const [formData, setFormData] = useState({
    studentName: "DHARSHAN MENDE",
    fatherName: "RAMESH MENDE",
    collegeName: "GOVERNMENT ENGINEERING COLLEGE",
    aisheCode: "C-12345",
    courseName: "BACHELOR OF TECHNOLOGY (COMPUTER SCIENCE)",
    currentYear: "1st Year / Semester I",
    admissionYear: "2026",
    rollNumber: "26CS0148",
    feePaid: "65,000",
    isHosteller: "Day Scholar",
    refNumber: "NSP/BONAFIDE/2026/0481"
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header (hidden in print) */}
      <div className="text-center space-y-2 no-print">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Standardized Format for NSP / AICTE / State Portals</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Official Bonafide Student Certificate Generator
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Generate a standardized, verified Bonafide Student Certificate compliant with National Scholarship Portal (NSP) and State welfare norms. Fill details and click Print to take it to your college Principal for signature and seal.
        </p>
      </div>

      {/* Editor Controls (hidden in print) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md space-y-4 no-print">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
          <span>Enter Student & Institutional Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="font-semibold block mb-1">Student Full Name:</label>
            <input
              type="text"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Father's / Guardian's Name:</label>
            <input
              type="text"
              value={formData.fatherName}
              onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">College Roll / Reg No:</label>
            <input
              type="text"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">College / University Name:</label>
            <input
              type="text"
              value={formData.collegeName}
              onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">College AISHE / DISE Code:</label>
            <input
              type="text"
              value={formData.aisheCode}
              onChange={(e) => setFormData({ ...formData, aisheCode: e.target.value })}
              placeholder="e.g. C-12345"
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Course & Department:</label>
            <input
              type="text"
              value={formData.courseName}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Current Year / Semester:</label>
            <input
              type="text"
              value={formData.currentYear}
              onChange={(e) => setFormData({ ...formData, currentYear: e.target.value })}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Annual Fee Paid (₹):</label>
            <input
              type="text"
              value={formData.feePaid}
              onChange={(e) => setFormData({ ...formData, feePaid: e.target.value })}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Residential Status:</label>
            <select
              value={formData.isHosteller}
              onChange={(e) => setFormData({ ...formData, isHosteller: e.target.value })}
              className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
            >
              <option value="Day Scholar">Day Scholar</option>
              <option value="Hosteller (College Hostel)">Hosteller (College Hostel)</option>
              <option value="Hosteller (Govt / Private PG)">Hosteller (Govt / Private PG)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-blue-500/25 transition active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print Bonafide Certificate (PDF)</span>
          </button>
        </div>
      </div>

      {/* Live Certificate Paper Preview (Formatted for Standard A4 Paper) */}
      <div className="bg-white text-black p-8 sm:p-12 rounded-3xl shadow-2xl border-4 border-double border-slate-300 relative overflow-hidden font-serif">
        {/* Top Watermark / Header */}
        <div className="text-center border-b-2 border-slate-800 pb-5 space-y-1">
          <div className="text-xs uppercase tracking-widest font-sans font-bold text-slate-500">
            Standard Format for Central / State Scholarship Portals
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900">
            {formData.collegeName || "NAME OF THE COLLEGE / INSTITUTION"}
          </h1>
          <p className="text-xs font-sans text-slate-600">
            (Affiliated to Recognized University / AICTE Approved • AISHE Code: <strong>{formData.aisheCode}</strong>)
          </p>
          <div className="pt-2 flex justify-between items-center text-xs font-sans text-slate-600 border-t border-slate-200 mt-2">
            <span>Ref No: <strong>{formData.refNumber}</strong></span>
            <span>Date: <strong>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</strong></span>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="text-center my-6">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider underline decoration-2 underline-offset-4">
            BONAFIDE STUDENT CERTIFICATE
          </h2>
          <p className="text-xs font-sans text-slate-500 mt-0.5">(To be issued on Institution Letterhead for Scholarship Application)</p>
        </div>

        {/* Certificate Body Text */}
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-justify">
          <p>
            This is to certify that Mr./Ms. <strong className="underline decoration-slate-400 font-bold">{formData.studentName || "____________________"}</strong>, 
            Son / Daughter of <strong className="underline decoration-slate-400 font-bold">{formData.fatherName || "____________________"}</strong>, 
            bearing College / University Roll / Registration No: <strong className="underline decoration-slate-400 font-bold">{formData.rollNumber || "___________"}</strong>, 
            is a regular, full-time bonafide student of this Institute.
          </p>

          <p>
            He / She is currently admitted to and studying in <strong className="font-bold underline decoration-slate-400">{formData.courseName || "____________________"}</strong>, 
            in the <strong className="font-bold">{formData.currentYear}</strong> during the Academic Session <strong>{new Date().getFullYear()} – {new Date().getFullYear() + 1}</strong>.
          </p>

          <p>
            As per our official institutional records:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4 text-sm font-sans">
            <li>Residential Status: <strong>{formData.isHosteller}</strong></li>
            <li>Total Compulsory Non-Refundable Tuition Fee for the year: <strong>₹{formData.feePaid}</strong></li>
            <li>Student Conduct and Character during the academic period: <strong>GOOD</strong></li>
            <li>AISHE / DISE Registration Status of Institute: <strong>VERIFIED ACTIVE (AISHE: {formData.aisheCode})</strong></li>
          </ul>

          <p className="text-sm">
            This certificate is officially issued to the student upon their request to facilitate their application for National / State / Corporate Scholarship schemes through electronic Direct Benefit Transfer (DBT).
          </p>
        </div>

        {/* Signatures & Seal Area */}
        <div className="mt-14 pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 items-end font-sans">
          <div className="text-center space-y-2">
            <div className="w-28 h-28 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-xs text-slate-400 mx-auto">
              [ Official Round Seal of College ]
            </div>
            <div className="text-xs text-slate-600 font-semibold">Institute Seal</div>
          </div>

          <div className="text-center space-y-2">
            <div className="h-16 flex items-end justify-center">
              <span className="text-xs text-slate-400 italic">Signature of Dean / Principal / Head of Institution</span>
            </div>
            <div className="border-t border-slate-800 pt-1 text-xs font-bold text-slate-900">
              Principal / Head of Institution
            </div>
            <div className="text-[10px] text-slate-500">Name & Designation Stamp</div>
          </div>
        </div>

        {/* Watermark notice */}
        <div className="mt-6 text-center text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-2">
          Verified Template • JANSAAHAY Public Scholarship Ecosystem (by dharshanmende-afk)
        </div>
      </div>
    </div>
  );
}
