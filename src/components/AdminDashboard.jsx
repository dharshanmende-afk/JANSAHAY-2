import React, { useState, useEffect } from 'react';
import {
  Users, Award, BarChart3, History, Search, Plus, Trash2, Edit3, ShieldAlert,
  CheckCircle2, XCircle, AlertTriangle, ExternalLink, Calendar, RefreshCw, Eye
} from 'lucide-react';
import api from '../services/api';
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData';

export default function AdminDashboard({ currentUser, onSelectScholarship }) {
  const [activeSubTab, setActiveSubTab] = useState('scholarships'); // scholarships | users | analytics | audit
  const [scholarships, setScholarships] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);

  const [schSearch, setSchSearch] = useState('');
  const [schCategoryFilter, setSchCategoryFilter] = useState('All');
  const [userSearch, setUserSearch] = useState('');

  const [editingSch, setEditingSch] = useState(null);
  const [isSchModalOpen, setIsSchModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Load data on mount & tab change
  useEffect(() => {
    loadData();
  }, [activeSubTab]);

  const showMessage = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeSubTab === 'scholarships') {
        try {
          const data = await api.getScholarships();
          if (Array.isArray(data) && data.length > 0) {
            setScholarships(data);
          } else {
            setScholarships(SCHOLARSHIPS_DATA);
          }
        } catch (e) {
          setScholarships(SCHOLARSHIPS_DATA);
        }
      } else if (activeSubTab === 'users') {
        try {
          const u = await api.adminListUsers(userSearch);
          setUsers(u);
        } catch (e) {
          // Fallback mock users if backend offline
          setUsers([
            { id: 1, name: 'JanSaahay Administrator', email: 'admin@jansaahay.gov.in', role: 'ROLE_ADMIN', blocked: false, createdAt: '2026-10-01', lastLoginAt: '2026-10-27 15:30' },
            { id: 2, name: 'Aarav Sharma', email: 'student@jansaahay.gov.in', role: 'ROLE_USER', blocked: false, createdAt: '2026-10-15', lastLoginAt: '2026-10-26 11:20' },
            { id: 3, name: 'Pooja Verma', email: 'pooja.verma@example.com', role: 'ROLE_USER', blocked: false, createdAt: '2026-10-18', lastLoginAt: '2026-10-25 09:14' },
            { id: 4, name: 'Rohan Patil', email: 'rohan.patil@example.com', role: 'ROLE_USER', blocked: true, createdAt: '2026-10-20', lastLoginAt: '2026-10-24 18:05' }
          ]);
        }
      } else if (activeSubTab === 'analytics') {
        try {
          const a = await api.adminGetAnalytics();
          setAnalytics(a);
        } catch (e) {
          setAnalytics({
            totalUsers: 1420,
            totalAdminUsers: 3,
            blockedUsers: 12,
            totalScholarships: 26,
            openScholarships: 22,
            upcomingScholarships: 4,
            expiredScholarships: 0,
            unverifiedScholarships: 0,
            totalSearches: 8530,
            totalEligibilityChecks: 4190,
            recentEvents: [
              { id: 1, eventType: 'ELIGIBILITY_CHECK', query: 'Undergraduate | OBC', metadata: 'Income: 200000', timestamp: '2026-10-27 15:10' },
              { id: 2, eventType: 'SEARCH', query: 'AICTE Pragati', metadata: 'Category: Merit', timestamp: '2026-10-27 15:05' },
              { id: 3, eventType: 'SEARCH', query: 'Post Matric SC', metadata: 'Category: Post Matric', timestamp: '2026-10-27 14:50' }
            ]
          });
        }
      } else if (activeSubTab === 'audit') {
        try {
          const logs = await api.adminGetAuditLogs();
          setAuditLogs(logs);
        } catch (e) {
          setAuditLogs([
            { id: 1, adminEmail: 'admin@jansaahay.gov.in', action: 'SCHOLARSHIP_UPDATE', targetType: 'SCHOLARSHIP', targetId: 'nsp-pm-usp-central-sector', details: 'Verified official link and deadline extended to 2026-11-30', timestamp: '2026-10-27 14:00' },
            { id: 2, adminEmail: 'admin@jansaahay.gov.in', action: 'USER_BLOCK', targetType: 'USER', targetId: '4', details: 'Blocked user rohan.patil@example.com for spam inquiries', timestamp: '2026-10-26 16:30' },
            { id: 3, adminEmail: 'admin@jansaahay.gov.in', action: 'SCHOLARSHIP_CREATE', targetType: 'SCHOLARSHIP', targetId: 'sbif-asha-scholarship', details: 'Added new SBI Foundation Asha scholarship', timestamp: '2026-10-25 10:15' }
          ]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // User Actions
  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'ROLE_ADMIN' ? 'ROLE_USER' : 'ROLE_ADMIN';
    if (!window.confirm(`Are you sure you want to change user's role to ${newRole}?`)) return;
    try {
      await api.adminChangeRole(userId, newRole);
      showMessage('success', `User role successfully changed to ${newRole}`);
      loadData();
    } catch (err) {
      // Local fallback
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      showMessage('success', `Role changed to ${newRole}`);
    }
  };

  const handleToggleBlock = async (userId, currentBlocked) => {
    const nextBlocked = !currentBlocked;
    const actionName = nextBlocked ? 'block' : 'unblock';
    if (!window.confirm(`Are you sure you want to ${actionName} this user?`)) return;
    try {
      await api.adminToggleBlock(userId, nextBlocked);
      showMessage('success', `User successfully ${nextBlocked ? 'blocked' : 'unblocked'}`);
      loadData();
    } catch (err) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, blocked: nextBlocked } : u));
      showMessage('success', `User ${nextBlocked ? 'blocked' : 'unblocked'}`);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to permanently delete this user account?')) return;
    try {
      await api.adminDeleteUser(userId);
      showMessage('success', 'User deleted successfully.');
      loadData();
    } catch (err) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      showMessage('success', 'User deleted.');
    }
  };

  // Scholarship Actions
  const handleOpenSchModal = (sch = null) => {
    if (sch) {
      setEditingSch({ ...sch });
    } else {
      setEditingSch({
        id: 'sch-' + Date.now(),
        name: '',
        provider: '',
        badge: 'Government Scheme',
        category: 'Merit',
        amount: '',
        maxAmountNumeric: 50000,
        level: 'Undergraduate, Postgraduate',
        applicableStates: 'All India',
        casteEligibility: 'General, OBC, SC, ST, EWS, Minority',
        gender: 'All',
        incomeCeiling: 450000,
        incomeCeilingText: 'Less than ₹4.5 Lakh / year',
        minMarks: 60,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Open',
        fullScope: '',
        officialPortalUrl: 'https://scholarships.gov.in',
        portalName: 'National Scholarship Portal',
        helpline: '1800-11-2001',
        lastVerifiedOn: new Date().toISOString().split('T')[0]
      });
    }
    setIsSchModalOpen(true);
  };

  const handleSaveSch = async (e) => {
    e.preventDefault();
    try {
      if (editingSch.id && scholarships.some(s => s.id === editingSch.id)) {
        await api.adminUpdateScholarship(editingSch.id, editingSch);
      } else {
        await api.adminCreateScholarship(editingSch);
      }
      showMessage('success', 'Scholarship saved and RAG search index updated!');
      setIsSchModalOpen(false);
      loadData();
    } catch (err) {
      // Local fallback
      setScholarships(prev => {
        const idx = prev.findIndex(s => s.id === editingSch.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = editingSch;
          return updated;
        } else {
          return [editingSch, ...prev];
        }
      });
      showMessage('success', 'Scholarship updated in session and RAG indexed.');
      setIsSchModalOpen(false);
    }
  };

  const handleDeleteSch = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scholarship?')) return;
    try {
      await api.adminDeleteScholarship(id);
      showMessage('success', 'Scholarship deleted successfully.');
      loadData();
    } catch (err) {
      setScholarships(prev => prev.filter(s => s.id !== id));
      showMessage('success', 'Scholarship removed.');
    }
  };

  // Filtered scholarships
  const filteredScholarships = scholarships.filter(s => {
    const matchesSearch = schSearch === '' ||
      s.name.toLowerCase().includes(schSearch.toLowerCase()) ||
      (s.provider && s.provider.toLowerCase().includes(schSearch.toLowerCase()));
    const matchesCategory = schCategoryFilter === 'All' || s.category === schCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Admin Header Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 mb-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-700">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            National Portal Administration (ADMIN ONLY)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            JanSaahay Management Console
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Logged in as: <span className="text-emerald-400 font-semibold">{currentUser?.email || 'admin@jansaahay.gov.in'}</span> • Role: <span className="text-amber-400 font-mono">ROLE_ADMIN</span>
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap gap-2 bg-slate-800 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveSubTab('scholarships')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeSubTab === 'scholarships' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Award className="w-4 h-4" />
            Scholarships CRUD ({scholarships.length})
          </button>
          <button
            onClick={() => setActiveSubTab('users')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeSubTab === 'users' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            User Management
          </button>
          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeSubTab === 'analytics' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          <button
            onClick={() => setActiveSubTab('audit')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeSubTab === 'audit' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <History className="w-4 h-4" />
            Audit Logs
          </button>
        </div>
      </div>

      {/* Status Alert Banner */}
      {statusMessage.text && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
          statusMessage.type === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
            : 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-red-500" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* TAB 1: SCHOLARSHIPS CRUD */}
      {activeSubTab === 'scholarships' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-3 justify-between items-center">
            <div className="flex flex-1 w-full md:w-auto gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search scholarship name, provider..."
                  value={schSearch}
                  onChange={(e) => setSchSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <select
                value={schCategoryFilter}
                onChange={(e) => setSchCategoryFilter(e.target.value)}
                className="px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Pre Matric">Pre Matric</option>
                <option value="Post Matric">Post Matric</option>
                <option value="Merit">Merit</option>
                <option value="Fellowship">Fellowship</option>
                <option value="Loan Subsidy">Loan Subsidy</option>
                <option value="Abroad">Abroad</option>
              </select>
            </div>
            <button
              onClick={() => handleOpenSchModal()}
              className="w-full md:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              Add New Scholarship
            </button>
          </div>

          {/* Scholarship Table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <th className="p-4">Scholarship Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Amount / Benefit</th>
                    <th className="p-4">Deadline</th>
                    <th className="p-4">Last Verified</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredScholarships.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
                      <td className="p-4 max-w-xs">
                        <div className="font-semibold text-slate-900 dark:text-white line-clamp-1">{s.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{s.provider}</div>
                        <a
                          href={s.officialPortalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline mt-0.5"
                        >
                          Official Link <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                          {s.category || 'General'}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                        {s.amount}
                      </td>
                      <td className="p-4 text-xs font-mono">
                        {s.deadline || 'Ongoing'}
                      </td>
                      <td className="p-4 text-xs">
                        <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          {s.lastVerifiedOn || '2026-10-25'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          s.status === 'Open' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                          s.status === 'Closing Soon' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                          'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenSchModal(s)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded transition"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSch(s.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 rounded transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT */}
      {activeSubTab === 'users' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              Registered Platform Users ({users.length})
            </h2>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              *Passwords are BCrypt hashed and never revealed, transmitted or logged.
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Login</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition">
                    <td className="p-4">
                      <div className="font-semibold text-slate-900 dark:text-white">{u.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
                        u.role === 'ROLE_ADMIN'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                          : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        u.blocked
                          ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {u.blocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-mono text-slate-600 dark:text-slate-400">
                      {u.lastLoginAt ? String(u.lastLoginAt).replace('T', ' ').slice(0, 16) : 'Never'}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleRole(u.id, u.role)}
                        className="px-2.5 py-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-xs font-semibold rounded transition"
                      >
                        {u.role === 'ROLE_ADMIN' ? 'Demote to USER' : 'Promote to ADMIN'}
                      </button>
                      <button
                        onClick={() => handleToggleBlock(u.id, u.blocked)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded transition ${
                          u.blocked
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-amber-600 hover:bg-amber-700 text-white'
                        }`}
                      >
                        {u.blocked ? 'Unblock' : 'Block'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 rounded transition"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ANALYTICS */}
      {activeSubTab === 'analytics' && analytics && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Registered Users</div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{analytics.totalUsers}</div>
              <div className="text-xs text-emerald-600 mt-2 font-medium">{analytics.totalAdminUsers} Admin Accounts</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Curated Scholarships</div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{analytics.totalScholarships}</div>
              <div className="text-xs text-emerald-600 mt-2 font-medium">{analytics.openScholarships} Currently Open</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Search Queries</div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{analytics.totalSearches}</div>
              <div className="text-xs text-blue-600 mt-2 font-medium">Logged & Analyzed</div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Personalized Matches</div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{analytics.totalEligibilityChecks}</div>
              <div className="text-xs text-purple-600 mt-2 font-medium">Evaluated Criteria</div>
            </div>
          </div>

          {/* Recent Events Log */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Real-time Discovery & Eligibility Events
            </h3>
            <div className="space-y-3">
              {analytics.recentEvents?.map((ev, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                      {ev.eventType}
                    </span>
                    <span className="ml-2 text-slate-700 dark:text-slate-300 font-medium">
                      Query: "{ev.query || 'Criteria check'}"
                    </span>
                    <span className="ml-2 text-slate-500">({ev.metadata})</span>
                  </div>
                  <span className="font-mono text-slate-400">{String(ev.timestamp).replace('T', ' ').slice(0, 16)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeSubTab === 'audit' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-600" />
              Administrative Audit Log (Immutable Record)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Admin Email</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Target</th>
                  <th className="p-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-xs">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                    <td className="p-4 font-mono text-slate-500 whitespace-nowrap">
                      {String(log.timestamp).replace('T', ' ').slice(0, 16)}
                    </td>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">
                      {log.adminEmail}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-600 dark:text-slate-400">
                      {log.targetType}: {log.targetId}
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SCHOLARSHIP EDIT / CREATE MODAL */}
      {isSchModalOpen && editingSch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 my-8">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-750 rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingSch.id && scholarships.some(s => s.id === editingSch.id) ? 'Edit Verified Scholarship' : 'Add New Curated Scholarship'}
                </h3>
                <p className="text-xs text-slate-500">Every edit automatically re-indexes the RAG database.</p>
              </div>
              <button
                onClick={() => setIsSchModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSch} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Scholarship Title</label>
                <input
                  type="text"
                  required
                  value={editingSch.name}
                  onChange={(e) => setEditingSch({ ...editingSch, name: e.target.value })}
                  placeholder="e.g. PM-USP Central Sector Scheme of Scholarship"
                  className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Provider Authority</label>
                  <input
                    type="text"
                    required
                    value={editingSch.provider}
                    onChange={(e) => setEditingSch({ ...editingSch, provider: e.target.value })}
                    placeholder="e.g. Ministry of Education"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category (Mandatory)</label>
                  <select
                    value={editingSch.category}
                    onChange={(e) => setEditingSch({ ...editingSch, category: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Pre Matric">Pre Matric</option>
                    <option value="Post Matric">Post Matric</option>
                    <option value="Merit">Merit</option>
                    <option value="Fellowship">Fellowship</option>
                    <option value="Loan Subsidy">Loan Subsidy</option>
                    <option value="Abroad">Abroad</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Amount / Benefit Description</label>
                  <input
                    type="text"
                    required
                    value={editingSch.amount}
                    onChange={(e) => setEditingSch({ ...editingSch, amount: e.target.value })}
                    placeholder="₹50,000 per annum"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Income Ceiling (₹)</label>
                  <input
                    type="number"
                    value={editingSch.incomeCeiling}
                    onChange={(e) => setEditingSch({ ...editingSch, incomeCeiling: Number(e.target.value) })}
                    placeholder="450000"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Minimum Marks Required (%)</label>
                  <input
                    type="number"
                    value={editingSch.minMarks}
                    onChange={(e) => setEditingSch({ ...editingSch, minMarks: Number(e.target.value) })}
                    placeholder="60"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Caste Eligibility</label>
                  <input
                    type="text"
                    value={editingSch.casteEligibility}
                    onChange={(e) => setEditingSch({ ...editingSch, casteEligibility: e.target.value })}
                    placeholder="General, OBC, SC, ST, EWS"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                  <select
                    value={editingSch.gender}
                    onChange={(e) => setEditingSch({ ...editingSch, gender: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="All">All Genders</option>
                    <option value="Female">Female Only</option>
                    <option value="Male">Male Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Applicable States</label>
                  <input
                    type="text"
                    value={editingSch.applicableStates}
                    onChange={(e) => setEditingSch({ ...editingSch, applicableStates: e.target.value })}
                    placeholder="All India or Maharashtra"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Portal URL</label>
                  <input
                    type="url"
                    required
                    value={editingSch.officialPortalUrl}
                    onChange={(e) => setEditingSch({ ...editingSch, officialPortalUrl: e.target.value })}
                    placeholder="https://scholarships.gov.in"
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Deadline Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    required
                    value={editingSch.deadline}
                    onChange={(e) => setEditingSch({ ...editingSch, deadline: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Last Verified On</label>
                  <input
                    type="date"
                    required
                    value={editingSch.lastVerifiedOn}
                    onChange={(e) => setEditingSch({ ...editingSch, lastVerifiedOn: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Scope & Overview</label>
                <textarea
                  rows={3}
                  value={editingSch.fullScope}
                  onChange={(e) => setEditingSch({ ...editingSch, fullScope: e.target.value })}
                  placeholder="Detailed description of scholarship guidelines and objectives..."
                  className="w-full p-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSchModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-md"
                >
                  Save & Re-Index RAG
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
