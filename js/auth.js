/**
 * IELTS with Kee — Shared Auth Module
 * Uses localStorage passcode + Supabase hybrid
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'ielts_with_kee_auth';
  const VALID_CODES = ['masterkee2024', 'ielts55', 'ielts65'];
  const SESSION_HOURS = 24;

  // Supabase config (kept for future progress tracking)
  const SUPABASE_URL = 'https://areedjmpngwzocqpoaur.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZWVkam1wbmd3em9jcXBvYXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5ODAwMTgsImV4cCI6MjA5MjU1NjAxOH0.CSHpruDqBm4mbKseySbbOlZk2-uBG2Oxe4DvqwTVFJ8';

  window.KeeAuth = {
    /**
     * Check if user is authenticated (passcode check)
     */
    isLoggedIn() {
      try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!data || !data.code) return false;
        const elapsed = Date.now() - data.timestamp;
        const maxMs = (data.remember ? 30 : SESSION_HOURS) * 60 * 60 * 1000;
        return VALID_CODES.includes(data.code) && elapsed < maxMs;
      } catch(e) {
        return false;
      }
    },

    /**
     * Authenticate with passcode
     */
    login(code, remember) {
      code = (code || '').trim().toLowerCase();
      if (!VALID_CODES.includes(code)) {
        return { ok: false, error: 'Invalid passcode. Contact your teacher.' };
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        code: code,
        timestamp: Date.now(),
        remember: !!remember
      }));
      return { ok: true };
    },

    /**
     * Log out
     */
    logout() {
      localStorage.removeItem(STORAGE_KEY);
    },

    /**
     * Get user display info
     */
    getUser() {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        tier: data.code === 'masterkee2024' ? 'Teacher' : 'Student',
        code: data.code || ''
      };
    },

    /**
     * Check auth, redirect to auth.html if not logged in
     * Call this on protected pages
     */
    requireAuth() {
      if (!this.isLoggedIn()) {
        const current = encodeURIComponent(window.location.href);
        window.location.href = 'auth.html?redirect=' + current;
        return false;
      }
      return true;
    }
  };
})();
