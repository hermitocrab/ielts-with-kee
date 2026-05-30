/**
 * IELTS Discourse Markers & Logic Chains — Interactive Reference
 * Features: real-time search, category expand/collapse, clipboard copy, logic chain viz
 */

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────
  const state = {
    activeTab: 'discourse',
    searchQuery: '',
    expandedCategories: new Set(),
    activeCategoryFilter: null,
  };

  // ── DOM Refs ─────────────────────────────────────────────
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  // ── Initialization ───────────────────────────────────────
  function init() {
    bindTabs();
    bindSearch();
    bindCategoryCards();
    bindCategoryPills();
    bindCopyButtons();
    bindChainMarkerTags();

    // Expand first category by default
    const firstCard = $('.category-card');
    if (firstCard) expandCategory(firstCard);
  }

  // ── Tabs ─────────────────────────────────────────────────
  function bindTabs() {
    $$('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeTab = btn.dataset.tab;
        $$('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        $$('.tab-panel').forEach(p => p.classList.remove('active'));
        const panel = $(`.tab-panel[data-tab="${state.activeTab}"]`);
        if (panel) panel.classList.add('active');

        // Update URL hash
        history.replaceState(null, '', `#${state.activeTab}`);

        // Re-filter on tab switch
        if (state.activeTab === 'discourse') {
          filterDiscourse();
        }
      });
    });

    // Check URL hash on load
    const hash = window.location.hash.replace('#', '');
    if (hash === 'chains' || hash === 'logic-chains') {
      const chainsTab = $('.tab-btn[data-tab="logic-chains"]');
      if (chainsTab) chainsTab.click();
    }
  }

  // ── Search ───────────────────────────────────────────────
  function bindSearch() {
    const input = $('.search-input');
    const clearBtn = $('.search-clear');
    const stats = $('.search-stats');

    if (!input) return;

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchQuery = input.value.trim().toLowerCase();
        if (clearBtn) {
          clearBtn.classList.toggle('visible', state.searchQuery.length > 0);
        }
        filterDiscourse();
      }, 150);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        state.searchQuery = '';
        clearBtn.classList.remove('visible');
        filterDiscourse();
        input.focus();
      });
    }

    // Keyboard shortcut: / to focus search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
      }
      if (e.key === 'Escape' && document.activeElement === input) {
        input.blur();
      }
    });
  }

  function filterDiscourse() {
    const query = state.searchQuery;
    const panel = $('.tab-panel[data-tab="discourse"]');
    if (!panel) return;

    const cards = $$('.category-card', panel);
    let visibleCards = 0;
    let visiblePhrases = 0;
    let totalPhrases = 0;

    cards.forEach(card => {
      const phrases = $$('.phrase-item', card);
      totalPhrases += phrases.length;
      let cardHasMatch = false;

      // Always show if no search and no category filter
      const hasFilter = query || state.activeCategoryFilter;

      if (!hasFilter) {
        card.style.display = '';
        card.querySelector('.category-header')?.classList.remove('search-match-header');

        // Reset highlights
        phrases.forEach(p => {
          const textEl = $('.phrase-text', p);
          if (textEl) resetHighlight(textEl);
        });

        visibleCards++;
        visiblePhrases += phrases.length;
        return;
      }

      // Check category title/function
      const title = card.dataset.title || '';
      const func = card.dataset.function || '';
      const catName = (title + ' ' + func).toLowerCase();
      const categoryMatches = query && catName.includes(query);
      const catFilterPasses = !state.activeCategoryFilter ||
        card.dataset.categoryId === state.activeCategoryFilter;

      if (categoryMatches && catFilterPasses) {
        card.style.display = '';
        card.querySelector('.category-header')?.classList.add('search-match-header');
        phrases.forEach(p => {
          p.style.display = '';
          const textEl = $('.phrase-text', p);
          if (textEl && query) highlightText(textEl, query);
          else if (textEl) resetHighlight(textEl);
        });
        visibleCards++;
        cardHasMatch = true;
        visiblePhrases += phrases.length;
      } else {
        card.querySelector('.category-header')?.classList.remove('search-match-header');
      }

      // Check individual phrases
      if (!categoryMatches && catFilterPasses) {
        phrases.forEach(p => {
          const phrase = p.dataset.phrase || '';
          const example = p.dataset.example || '';
          const context = p.dataset.context || '';
          const searchable = (phrase + ' ' + example + ' ' + context).toLowerCase();
          const phraseMatches = query ? searchable.includes(query) : true;

          if (phraseMatches) {
            p.style.display = '';
            const textEl = $('.phrase-text', p);
            if (textEl && query) highlightText(textEl, query);
            else if (textEl) resetHighlight(textEl);
            visiblePhrases++;
            cardHasMatch = true;
          } else {
            p.style.display = 'none';
          }
        });

        card.style.display = cardHasMatch ? '' : 'none';
        if (cardHasMatch) visibleCards++;
      } else if (!catFilterPasses) {
        card.style.display = 'none';
      }
    });

    // Update stats
    const statsEl = $('.search-stats');
    if (statsEl) {
      if (hasFilter && visiblePhrases > 0) {
        statsEl.textContent = `Showing ${visiblePhrases} results across ${visibleCards} categories`;
      } else if (hasFilter && visiblePhrases === 0) {
        statsEl.textContent = 'No results found — try different keywords';
      } else {
        statsEl.textContent = '';
      }
    }

    // Show/hide empty state
    const emptyState = $('.empty-state', panel);
    if (emptyState) {
      emptyState.style.display = visibleCards === 0 ? '' : 'none';
    }
  }

  function highlightText(el, query) {
    const original = el.dataset.originalText || el.textContent;
    if (!el.dataset.originalText) el.dataset.originalText = original;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    el.innerHTML = original.replace(regex, '<mark>$1</mark>');
  }

  function resetHighlight(el) {
    if (el.dataset.originalText) {
      el.textContent = el.dataset.originalText;
      el.innerHTML = el.textContent;
    }
  }

  // ── Category Cards ───────────────────────────────────────
  function bindCategoryCards() {
    $$('.category-header').forEach(header => {
      header.addEventListener('click', (e) => {
        // Don't toggle if clicking on a copy button or phrase
        if (e.target.closest('.phrase-item') || e.target.closest('.phrase-copy')) return;
        const card = header.closest('.category-card');
        if (!card) return;
        toggleCategory(card);
      });
    });
  }

  function toggleCategory(card) {
    if (card.classList.contains('expanded')) {
      collapseCategory(card);
    } else {
      expandCategory(card);
    }
  }

  function expandCategory(card) {
    card.classList.add('expanded');
    const id = card.dataset.categoryId;
    if (id) state.expandedCategories.add(id);
  }

  function collapseCategory(card) {
    card.classList.remove('expanded');
    const id = card.dataset.categoryId;
    if (id) state.expandedCategories.delete(id);
  }

  // ── Category Pills ───────────────────────────────────────
  function bindCategoryPills() {
    $$('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const catId = pill.dataset.categoryFilter;

        if (state.activeCategoryFilter === catId) {
          // Deselect
          state.activeCategoryFilter = null;
          $$('.category-pill').forEach(p => p.classList.remove('active'));
        } else {
          state.activeCategoryFilter = catId;
          $$('.category-pill').forEach(p => {
            p.classList.toggle('active', p.dataset.categoryFilter === catId);
          });
        }

        // Scroll to matching cards
        if (state.activeCategoryFilter) {
          const targetCard = $(`.category-card[data-category-id="${state.activeCategoryFilter}"]`);
          if (targetCard) {
            expandCategory(targetCard);
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }

        filterDiscourse();
      });
    });
  }

  // ── Copy to Clipboard ────────────────────────────────────
  function bindCopyButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.phrase-copy');
      if (!btn) return;

      const phrase = btn.dataset.copy || '';
      copyToClipboard(phrase, btn);
    });
  }

  async function copyToClipboard(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
      btn.classList.add('copied');
      showToast('Copied!');

      setTimeout(() => {
        btn.classList.remove('copied');
      }, 1500);
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      btn.classList.add('copied');
      showToast('Copied!');
      setTimeout(() => btn.classList.remove('copied'), 1500);
    }
  }

  function showToast(message) {
    let toast = $('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // ── Chain Marker Tags ────────────────────────────────────
  function bindChainMarkerTags() {
    document.addEventListener('click', (e) => {
      const tag = e.target.closest('.chain-marker-tag');
      if (!tag) return;

      const phrase = tag.textContent.trim();
      if (!phrase) return;

      // Switch to discourse tab and search for this phrase
      const discTab = $('.tab-btn[data-tab="discourse"]');
      if (discTab) discTab.click();

      const searchInput = $('.search-input');
      if (searchInput) {
        searchInput.value = phrase;
        state.searchQuery = phrase.toLowerCase();
        $('.search-clear')?.classList.add('visible');
        filterDiscourse();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ── Expand All / Collapse All ────────────────────────────
  function bindExpandAll() {
    const expandAllBtn = $('#expand-all');
    const collapseAllBtn = $('#collapse-all');

    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', () => {
        $$('.category-card').forEach(card => expandCategory(card));
      });
    }

    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', () => {
        $$('.category-card').forEach(card => collapseCategory(card));
      });
    }
  }

  // ── Boot ─────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for potential external use
  window.__discourseApp = { state, filterDiscourse, toggleCategory };

})();
