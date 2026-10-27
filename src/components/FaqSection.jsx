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
  ExternalLink,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { FAQS_DATA, GRIEVANCE_DIRECTORIES } from '../data/faqs';
import api from '../services/api';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);
  const [customQuery, setCustomQuery] = useState("");
  const [isLoadingBot, setIsLoadingBot] = useState(false);
  const [botChatHistory, setBotChatHistory] = useState([
    {
      sender: "bot",
      text: "Namaste! I am Saahay Mitra (सहाय मित्र), your verified scholarship advisor. I answer strictly from our verified database. Ask me about scholarship eligibility, amounts, deadlines, or official portal links.",
      sources: []
    }
  ]);

  const presetQueries = [
    {
      q: "Can I receive two scholarships together?",
      a: "Government rules strictly forbid claiming two Central/State Government maintenance or fee scholarships for the same academic year. However, you CAN pair a Government scholarship with a Private/Corporate CSR scholarship (such as Reliance Foundation or Kotak Kanya) provided the private entity allows external aid."
    },
    {
      q: "What is the deadline and amount for PM-USP Central Sector?",
      qKey: "pm-usp"
    },
    {
      q: "What are the rules for AICTE Pragati for girls?",
      qKey: "pragati"
    },
    {
      q: "How to confirm if my Bank account is DBT/NPCI active?",
      a: "Visit the UIDAI resident portal at resident.uidai.gov.in/bank-mapper or login to myAadhaar. Enter your 12-digit Aadhaar and OTP, then click 'Bank Seeding Status'. It will show your bank name and status as 'ACTIVE'."
    }
  ];

  const handleAskPreset = (item) => {
    if (item.a) {
      setBotChatHistory(prev => [
        ...prev,
        { sender: "user", text: item.q },
        { sender: "bot", text: item.a, sources: [] }
      ]);
    } else {
      performQuery(item.q);
    }
  };

  const performQuery = async (queryText) => {
    setBotChatHistory(prev => [
      ...prev,
      { sender: "user", text: queryText }
    ]);
    setIsLoadingBot(true);

    try {
      // 1. Try Live RAG endpoint from Spring Boot backend
      const res = await api.askAssistant(queryText, botChatHistory);
      if (res && res.answer) {
        setBotChatHistory(prev => [
          ...prev,
          { 
            sender: "bot", 
            text: res.answer, 
            sources: res.sources || [],
            confident: res.confident 
          }
        ]);
        setIsLoadingBot(false);
        return;
      }
    } catch (e) {
      // Backend offline fallback: perform strict in-memory RAG over verified SCHOLARSHIPS_DATA
    }

    // Client-side strict RAG fallback (never invent facts/amounts/deadlines)
    const lower = queryText.toLowerCase().trim();
    const queryTokens = lower.split(/[^a-zA-Z0-9]+/).filter(t => t.length > 2);
    
    // Find best match in SCHOLARSHIPS_DATA
    let bestMatch = null;
    let highestScore = 0;

    for (const sch of SCHOLARSHIPS_DATA) {
      let score = 0;
      const targetText = `${sch.name} ${sch.provider} ${sch.category} ${sch.level.join(' ')} ${sch.tags.join(' ')}`.toLowerCase();
      
      for (const token of queryTokens) {
        if (targetText.includes(token)) score += 1;
        if (sch.name.toLowerCase().includes(token)) score += 2;
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = sch;
      }
    }

    let reply = "";
    let sources = [];

    if (highestScore >= 2 && bestMatch) {
      reply = `Based on verified JanSaahay records:\n\n**${bestMatch.name}**\n• Provider: ${bestMatch.provider}\n• Verified Benefit: ${bestMatch.amount}\n• Published Deadline: ${bestMatch.deadline} (Status: ${bestMatch.status})\n• Eligibility: ${bestMatch.incomeCeilingText || 'See portal'}, Min Marks: ${bestMatch.minMarks}%.\n\nPlease verify details on the official portal before applying.`;
      sources = [{
        scholarshipName: bestMatch.name,
        officialUrl: bestMatch.officialPortalUrl,
        portalName: bestMatch.portalName || "Official Portal"
      }];
    } else {
      reply = "I could not find this in the verified scholarship database. Please verify on the official portal (https://scholarships.gov.in).";
      sources = [{
        scholarshipName: "National Scholarship Portal",
        officialUrl: "https://scholarships.gov.in",
        portalName: "scholarships.gov.in"
      }];
    }

    setBotChatHistory(prev => [
      ...prev,
      { sender: "bot", text: reply, sources }
    ]);
    setIsLoadingBot(false);
  };

  const handleSendCustom = (e) => {
    e.preventDefault();
    if (!customQuery.trim() || isLoadingBot) return;
    const q = customQuery.trim();
    setCustomQuery("");
    performQuery(q);
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

        {/* Right Column: Grounded Saahay Mitra Counselor Widget */}
        <div className="lg:col-span-5 flex flex-col h-[580px] rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
          {/* Bot Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-700 to-blue-700 text-white flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
              ज
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-bold">Saahay Mitra • RAG Assistant</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-emerald-100">Answers strictly from verified official database</p>
            </div>
          </div>

          {/* Preset Prompts Pill Bar */}
          <div className="p-2.5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 flex items-center space-x-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <span className="text-slate-400 shrink-0 font-medium">Quick Qs:</span>
            {presetQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleAskPreset(item)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 whitespace-nowrap text-slate-700 dark:text-slate-300 font-medium transition"
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
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ज
                  </div>
                )}
                <div 
                  className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 dark:bg-slate-700/70 text-slate-800 dark:text-slate-100 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Render Verified Sources / Official Links */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-600 text-[11px] space-y-1">
                      <div className="font-semibold text-slate-500 dark:text-slate-400">Official Source Reference:</div>
                      {msg.sources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                        >
                          <span>{src.scholarshipName || src.portalName}</span>
                          <ExternalLink className="w-3 h-3 inline" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoadingBot && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs italic">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                <span>Searching verified database...</span>
              </div>
            )}
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
              placeholder="Ask about verified eligibility, deadlines, amounts..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={isLoadingBot}
              className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50"
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
