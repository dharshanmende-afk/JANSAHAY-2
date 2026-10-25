import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  ShieldAlert, 
  Sparkles, 
  Send, 
  Bot, 
  User,
  ExternalLink 
} from 'lucide-react';
import { FAQS_DATA, GRIEVANCE_DIRECTORIES } from '../data/faqs';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);
  const [selectedBotQuery, setSelectedBotQuery] = useState(null);
  const [customQuery, setCustomQuery] = useState("");
  const [botChatHistory, setBotChatHistory] = useState([
    {
      sender: "bot",
      text: "Namaste! I am Saahay Mitra (सहाय मित्र), your scholarship advisor. Ask me anything about NSP OTR, eligibility criteria, income thresholds, or choose a common dilemma below."
    }
  ]);

  const presetQueries = [
    {
      q: "Can I receive two scholarships together?",
      a: "Government rules strictly forbid claiming two Central/State Government maintenance or fee scholarships for the same academic year. However, you CAN pair a Government scholarship with a Private/Corporate CSR scholarship (such as Reliance Foundation or Kotak Kanya) provided the private entity allows external aid."
    },
    {
      q: "My college is not listed on NSP. What should I do?",
      a: "Every college or university must have an active AISHE (All India Survey on Higher Education) or DISE code. Meet your college Principal or Academic Registrar and request them to register their institution on the AISHE portal (aishe.gov.in). Once approved, it reflects on NSP within 48 hours."
    },
    {
      q: "My application status says 'Defective'. What does this mean?",
      a: "Do not panic! 'Defective' does NOT mean rejected. It means the verification officer spotted a clearable mistake (e.g. blurry income certificate or unreadable bonafide). Log in to your portal immediately, replace the defective document with a clear scan, and re-submit before the defect rectification cutoff."
    },
    {
      q: "How to confirm if my Bank account is DBT/NPCI active?",
      a: "Visit the UIDAI resident portal at resident.uidai.gov.in/bank-mapper or login to myAadhaar. Enter your 12-digit Aadhaar and OTP, then click 'Bank Seeding Status'. It will show your bank name and status as 'ACTIVE'."
    }
  ];

  const handleAskPreset = (item) => {
    setBotChatHistory(prev => [
      ...prev,
      { sender: "user", text: item.q },
      { sender: "bot", text: item.a }
    ]);
  };

  const handleSendCustom = (e) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    const userText = customQuery.trim();
    setBotChatHistory(prev => [
      ...prev,
      { sender: "user", text: userText }
    ]);
    setCustomQuery("");

    // Automated smart matcher response
    setTimeout(() => {
      let reply = "Thank you for asking! For specific scheme rules, please check the 'Full Scope & Requirements' tab under that scholarship card or run our 'Smart Eligibility Matcher'. For official escalations, you can call the NSP National Desk at 0120-6619540.";
      const lower = userText.toLowerCase();

      if (lower.includes("npci") || lower.includes("dbt") || lower.includes("bank")) {
        reply = "To receive DBT scholarship payments, ensure your Aadhaar is seeded with NPCI. Check your live status on resident.uidai.gov.in/bank-mapper and submit the DBT Mandate form to your bank manager if not active.";
      } else if (lower.includes("income") || lower.includes("itr") || lower.includes("tehsildar")) {
        reply = "Central and State government schemes mandate an official Income Certificate issued by the Revenue Department (Tehsildar/SDM) for the current financial year. Salary slips or Form 16 are generally accepted by private CSR trusts.";
      } else if (lower.includes("backlog") || lower.includes("fail") || lower.includes("marks")) {
        reply = "To renew merit scholarships (like PM-USP Central Sector or AICTE Pragati), you must clear all semester exams without active backlogs and maintain minimum 50% to 60% aggregate marks.";
      } else if (lower.includes("girls") || lower.includes("female") || lower.includes("pragati") || lower.includes("kotak")) {
        reply = "For female scholars, AICTE Pragati offers ₹50,000/yr for B.Tech/Diploma, Kotak Kanya provides ₹1,50,000/yr for professional degrees, and Begum Hazrat Mahal provides ₹12,000/yr for school education!";
      }

      setBotChatHistory(prev => [
        ...prev,
        { sender: "bot", text: reply }
      ]);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Student Resolution Center</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Frequently Asked Questions & Support
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Clear answers to common student dilemmas and direct contact directories for government scholarship grievances.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive FAQs */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <span>Essential Scholarship Q&A</span>
          </h3>

          <div className="space-y-3">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden transition shadow-sm"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-750 transition"
                  >
                    <span className="text-sm sm:text-base font-bold">
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-800/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grievance Escalation Directory */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Official Grievance & Escalation Desks</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GRIEVANCE_DIRECTORIES.map((g, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">{g.authority}</div>
                  <div className="text-blue-600 dark:text-blue-400 flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{g.contact}</span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                    <Mail className="w-3 h-3" />
                    <span>{g.email}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{g.workingHours}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Saahay Mitra Counselor Widget */}
        <div className="lg:col-span-5 flex flex-col h-[560px] rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
          {/* Bot Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-bold">Saahay Mitra (सहाय मित्र)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-blue-100">AI Scholarship Advisory Counselor</p>
            </div>
          </div>

          {/* Preset Prompts Pill Bar */}
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 flex items-center space-x-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <span className="text-slate-400 shrink-0 font-medium">Quick Qs:</span>
            {presetQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleAskPreset(item)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 whitespace-nowrap text-slate-700 dark:text-slate-300 font-medium transition"
              >
                {item.q.slice(0, 24)}...
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3 text-xs">
            {botChatHistory.map((msg, i) => (
              <div 
                key={i}
                className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div 
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form 
            onSubmit={handleSendCustom}
            className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Ask about guidelines, income limits, or portals..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              title="Send"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
