/**
 * IELTS with Kee — Auth Module v2
 * Server-side validation via Flask API. Passcodes never exposed.
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'ielts_kee_auth';
  const SESSION_HOURS = 24;

  window.KeeAuth = {
    /**
     * Fast check: does localStorage think we're logged in?
     * Full authority is the server session cookie.
     */
    isLoggedIn() {
      try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!data || !data.tier) return false;
        const elapsed = Date.now() - data.timestamp;
        const maxMs = (data.remember ? 30 : SESSION_HOURS) * 60 * 60 * 1000;
        return elapsed < maxMs;
      } catch(e) {
        return false;
      }
    },

    /**
     * Server-side login via API.
     * Returns Promise<{ok, tier?, error?}>
     */
    async login(code, remember) {
      code = (code || '').trim().toLowerCase();
      try {
        const resp = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: code, remember: !!remember })
        });
        const data = await resp.json();
        if (data.ok) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            tier: data.tier,
            timestamp: Date.now(),
            remember: !!remember
          }));
        }
        return data;
      } catch(e) {
        return { ok: false, error: 'Cannot reach server. Check your connection.' };
      }
    },

    /**
     * Logout — clear local + server session.
     */
    async logout() {
      localStorage.removeItem(STORAGE_KEY);
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch(e) { /* server unreachable, local is cleared anyway */ }
    },

    /**
     * Get cached user info.
     */
    getUser() {
      try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return { tier: data.tier || '', label: data.tier === 'Teacher' ? 'Teacher' : 'Student' };
      } catch(e) {
        return { tier: '', label: '' };
      }
    },

    /**
     * Server-side auth check + redirect if not logged in.
     * Call on every protected page at load time.
     */
    async requireAuth() {
      // Fast path: localStorage says yes
      if (this.isLoggedIn()) return true;

      // Verify with server
      try {
        const resp = await fetch('/api/auth/status');
        const data = await resp.json();
        if (data.logged_in) {
          // Server says yes, sync localStorage
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            tier: data.tier,
            timestamp: Date.now(),
            remember: false
          }));
          return true;
        }
      } catch(e) { /* fall through to redirect */ }

      // Not authenticated — redirect to login
      const redirect = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = '/auth.html?redirect=' + redirect;
      return false;
    }
  };
})();
