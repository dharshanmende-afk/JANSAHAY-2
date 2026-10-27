// API Service for JANSAAHAY Platform
// Handles authentication, JWT tokens, automatic refresh, and fallback to mock data if backend is offline

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.accessToken = localStorage.getItem('jansaahay_token') || null;
    this.refreshToken = localStorage.getItem('jansaahay_refresh_token') || null;
    this.currentUser = null;
    try {
      const savedUser = localStorage.getItem('jansaahay_user');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    } catch (e) {}
  }

  setSession(authData) {
    if (authData && authData.accessToken) {
      this.accessToken = authData.accessToken;
      localStorage.setItem('jansaahay_token', authData.accessToken);
      if (authData.refreshToken) {
        this.refreshToken = authData.refreshToken;
        localStorage.setItem('jansaahay_refresh_token', authData.refreshToken);
      }
      if (authData.user) {
        this.currentUser = authData.user;
        localStorage.setItem('jansaahay_user', JSON.stringify(authData.user));
      }
    }
  }

  clearSession() {
    this.accessToken = null;
    this.refreshToken = null;
    this.currentUser = null;
    localStorage.removeItem('jansaahay_token');
    localStorage.removeItem('jansaahay_refresh_token');
    localStorage.removeItem('jansaahay_user');
  }

  getAuthHeader() {
    return this.accessToken ? { Authorization: `Bearer ${this.accessToken}` } : {};
  }

  async fetchWithAuth(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...this.getAuthHeader(),
      ...(options.headers || {}),
    };

    try {
      let response = await fetch(url, { ...options, headers });

      // Handle token expiration & auto refresh
      if (response.status === 401 && this.refreshToken && !endpoint.includes('/auth/')) {
        const refreshed = await this.tryRefreshToken();
        if (refreshed) {
          headers.Authorization = `Bearer ${this.accessToken}`;
          response = await fetch(url, { ...options, headers });
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      throw err;
    }
  }

  async tryRefreshToken() {
    try {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });
      if (res.ok) {
        const data = await res.json();
        this.setSession(data);
        return true;
      }
    } catch (e) {}
    this.clearSession();
    return false;
  }

  // --- Auth APIs ---
  async login(email, password) {
    const data = await this.fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setSession(data);
    return data;
  }

  async register(name, email, password) {
    const data = await this.fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    this.setSession(data);
    return data;
  }

  logout() {
    this.clearSession();
  }

  // --- Scholarship APIs ---
  async getScholarships(query = '', category = '') {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (category && category !== 'All') params.append('category', category);
    return await this.fetchWithAuth(`/scholarships?${params.toString()}`);
  }

  async getScholarshipById(id) {
    return await this.fetchWithAuth(`/scholarships/${id}`);
  }

  async checkEligibility(criteria) {
    return await this.fetchWithAuth('/scholarships/check-eligibility', {
      method: 'POST',
      body: JSON.stringify(criteria),
    });
  }

  // --- RAG Chat API ---
  async askAssistant(query, history = []) {
    return await this.fetchWithAuth('/chat', {
      method: 'POST',
      body: JSON.stringify({ query, history }),
    });
  }

  // --- Admin APIs (Admin Only) ---
  async adminListUsers(query = '') {
    const q = query ? `?query=${encodeURIComponent(query)}` : '';
    return await this.fetchWithAuth(`/admin/users${q}`);
  }

  async adminChangeRole(userId, role) {
    return await this.fetchWithAuth(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async adminToggleBlock(userId, blocked) {
    return await this.fetchWithAuth(`/admin/users/${userId}/block`, {
      method: 'PUT',
      body: JSON.stringify({ blocked }),
    });
  }

  async adminDeleteUser(userId) {
    return await this.fetchWithAuth(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async adminCreateScholarship(scholarship) {
    return await this.fetchWithAuth('/admin/scholarships', {
      method: 'POST',
      body: JSON.stringify(scholarship),
    });
  }

  async adminUpdateScholarship(id, scholarship) {
    return await this.fetchWithAuth(`/admin/scholarships/${id}`, {
      method: 'PUT',
      body: JSON.stringify(scholarship),
    });
  }

  async adminDeleteScholarship(id) {
    return await this.fetchWithAuth(`/admin/scholarships/${id}`, {
      method: 'DELETE',
    });
  }

  async adminGetAnalytics() {
    return await this.fetchWithAuth('/admin/analytics');
  }

  async adminGetAuditLogs() {
    return await this.fetchWithAuth('/admin/audit-logs');
  }

  // --- Health Check ---
  async checkHealth() {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      return await res.json();
    } catch (e) {
      return { status: 'DOWN', error: e.message };
    }
  }
}

export const api = new ApiService();
export default api;
