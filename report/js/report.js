/* ===== IELTS Research Report — Interactive Logic v2 ===== */
/* Part 1: Accordion sections | Part 2: Full cue cards */

(function () {
  'use strict';

  let reportData = null;

  // ===== Data Loading =====
  async function loadData() {
    try {
      const res = await fetch('data.json');
      reportData = await res.json();
      initUI();
    } catch (e) {
      console.error('Failed to load report data:', e);
    }
  }

  // ===== UI Initialization =====
  function initUI() {
    renderLatestSeason();
    renderAllTimeRankings();
    renderSearchableDatabase();
    renderInsights();
    renderMethodology();
  }

  // ===== Tab Switching =====
  window.switchReportTab = function (tabName, btn) {
    document.querySelectorAll('.rpt-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.rpt-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById('panel-' + tabName);
    if (panel) panel.classList.add('active');

    // Re-render database if switching to it (ensure fresh state)
    if (tabName === 'database') {
      renderSearchableDatabase();
    }
  };

  // ===== 1. LATEST SEASON =====
  function renderLatestSeason() {
    const ls = reportData.latestSeason;
    const panel = document.getElementById('panel-latest');

    // Part 1 — Accordion
    let html = '<div class="rpt-cat-section">';
    html += '<div class="rpt-section-intro">';
    html += '<h3>🗣️ Part 1 Topics <span class="rpt-cat-count">' + ls.part1.length + ' topics</span></h3>';
    html += '<p class="rpt-section-note">Click any topic to expand and view sample questions. Core topics (Work/Study, Home, Hometown) are always present and excluded from this list.</p>';
    html += '</div>';

    html += '<div class="rpt-accordion">';
    ls.part1.forEach((t, idx) => {
      const cat = t.category.toLowerCase();
      const icon = cat === 'place' ? '📍' : cat === 'event' ? '🎬' : '📦';
      html += '<div class="rpt-accordion-item">';
      html += '<button class="rpt-accordion-header" onclick="window.toggleAccordion(this)" aria-expanded="false">';
      html += '<span class="rpt-acc-icon">' + icon + '</span>';
      html += '<span class="rpt-acc-title">' + esc(t.topic) + '</span>';
      html += '<span class="rpt-acc-meta">';
      html += '<span class="rpt-card-tag ' + cat + '">' + t.category + '</span>';
      if (t.frequency > 0) {
        html += '<span class="rpt-card-freq">' + t.frequency + '/7 seasons</span>';
      }
      if (t.isNew) {
        html += '<span class="rpt-card-new-badge">🆕 New</span>';
      }
      html += '</span>';
      html += '<span class="rpt-acc-chevron">▸</span>';
      html += '</button>';

      html += '<div class="rpt-accordion-body">';
      html += '<div class="rpt-accordion-content">';
      const questions = t.questions || [];
      if (questions.length > 0) {
        html += '<ul class="rpt-question-list">';
        questions.forEach(q => {
          html += '<li>' + esc(q) + '</li>';
        });
        html += '</ul>';
      } else {
        html += '<p class="rpt-no-questions">Sample questions coming soon. This is a newly confirmed topic for the current season.</p>';
      }
      html += '</div></div></div>';
    });
    html += '</div></div>'; // close accordion, cat-section

    // Part 2 — Cue Cards grouped by category
    html += '<div class="rpt-cat-section" style="margin-top: 48px;">';
    html += '<div class="rpt-section-intro">';
    html += '<h3>📋 Part 2 Cue Cards <span class="rpt-cat-count">' + ls.part2.length + ' topics</span></h3>';
    html += '<p class="rpt-section-note">Full cue cards with bullet points and "explain why" lines. 🆕 marks truly new topics not seen in any previous season.</p>';
    html += '</div>';

    const categories = ['People', 'Events', 'Places', 'Objects'];
    const catIcons = { 'People': '👥', 'Events': '🎬', 'Places': '📍', 'Objects': '📦' };
    const catKeys = { 'People': 'people', 'Events': 'events', 'Places': 'places', 'Objects': 'objects' };

    categories.forEach(cat => {
      const items = ls.part2.filter(t => t.category === cat);
      if (items.length === 0) return;
      html += '<h4 class="rpt-part2-cat-header">' + catIcons[cat] + ' ' + cat + ' <span class="rpt-cat-count">' + items.length + '</span></h4>';

      items.forEach(t => {
        const cc = t.cueCard;
        html += '<div class="rpt-cue-card">';
        html += '<div class="rpt-cue-card-header">';
        html += '<span class="rpt-cc-icon">' + catIcons[cat] + '</span>';
        html += '<div class="rpt-cc-title-wrap">';
        html += '<div class="rpt-cc-topic">' + esc(t.topic) + '</div>';
        html += '<div class="rpt-cc-meta">';
        html += '<span class="rpt-card-tag ' + catKeys[cat] + '">' + cat + '</span>';
        if (t.isNew) {
          html += '<span class="rpt-card-new-badge">🆕 New</span>';
        }
        html += '</div></div></div>';

        if (cc && cc.bullets && cc.bullets.length > 0) {
          html += '<div class="rpt-cc-body">';
          html += '<p class="rpt-cc-prompt">' + esc(cc.prompt) + '</p>';
          html += '<p class="rpt-cc-say">You should say:</p>';
          html += '<ul class="rpt-cc-bullets">';
          cc.bullets.forEach(b => {
            html += '<li>' + esc(b) + '</li>';
          });
          html += '</ul>';
          html += '<p class="rpt-cc-explain">' + esc(cc.explain) + '</p>';
          html += '</div>';
        } else {
          html += '<div class="rpt-cc-body rpt-cc-empty">';
          html += '<p class="rpt-no-questions">Full cue card details being compiled. This is a newly confirmed topic.</p>';
          html += '</div>';
        }

        html += '</div>'; // close cue-card
      });
    });

    html += '</div>'; // close cat-section
    panel.innerHTML = html;
  }

  // ===== Accordion Toggle =====
  window.toggleAccordion = function (btn) {
    const item = btn.parentElement;
    const body = item.querySelector('.rpt-accordion-body');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all others in the same accordion
    const parent = item.parentElement;
    if (parent) {
      parent.querySelectorAll('.rpt-accordion-item').forEach(sibling => {
        if (sibling !== item) {
          const sibBtn = sibling.querySelector('.rpt-accordion-header');
          const sibBody = sibling.querySelector('.rpt-accordion-body');
          if (sibBtn) sibBtn.setAttribute('aria-expanded', 'false');
          if (sibBody) sibBody.classList.remove('open');
        }
      });
    }

    if (isOpen) {
      btn.setAttribute('aria-expanded', 'false');
      body.classList.remove('open');
    } else {
      btn.setAttribute('aria-expanded', 'true');
      body.classList.add('open');
    }
  };

  // ===== 2. ALL-TIME RANKINGS =====
  function renderAllTimeRankings() {
    const at = reportData.allTime;
    const panel = document.getElementById('panel-rankings');

    let html = '';

    // Part 1 Table
    html += '<div class="rpt-section-header"><h2>🗣️ Part 1 — Top 20 Most Frequent</h2>';
    html += '<p>Ranked by number of season appearances (2024–2026). Core mandatory topics excluded.</p></div>';
    html += '<div class="rpt-table-wrap"><table class="rpt-table"><thead><tr>';
    html += '<th>#</th><th></th><th>Topic</th><th>Appearances</th><th>Type</th></tr></thead><tbody>';
    at.part1.forEach(row => {
      html += '<tr>';
      html += '<td class="rank-col">' + row.rank + '</td>';
      html += '<td class="medal-col">' + row.medal + '</td>';
      html += '<td class="topic-col">' + esc(row.topic) + '</td>';
      html += '<td class="seasons-col">' + row.seasons + '</td>';
      html += '<td><span class="type-tag ' + row.type.toLowerCase() + '">' + row.type + '</span></td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';

    // Part 2 Table
    html += '<div class="rpt-section-header" style="margin-top:48px;"><h2>📋 Part 2 — Top 20 Most Frequent Cue Cards</h2>';
    html += '<p>Deduplicated across all 7 seasons. The most evergreen topics in IELTS history.</p></div>';
    html += '<div class="rpt-table-wrap"><table class="rpt-table"><thead><tr>';
    html += '<th>#</th><th></th><th>Cue Card Topic</th><th>Appearances</th></tr></thead><tbody>';
    at.part2.forEach(row => {
      html += '<tr>';
      html += '<td class="rank-col">' + row.rank + '</td>';
      html += '<td class="medal-col">' + row.medal + '</td>';
      html += '<td class="topic-col">' + esc(row.topic) + '</td>';
      html += '<td class="seasons-col">' + row.seasons + '</td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';

    panel.innerHTML = html;
  }

  // ===== 3. SEARCHABLE DATABASE =====
  function renderSearchableDatabase() {
    const panel = document.getElementById('panel-database');
    const ls = reportData.latestSeason;

    // Build database from Part 1 + Part 2
    const p1Cards = ls.part1.map(c => ({
      type: 'part1',
      topic: c.topic,
      category: c.category,
      isNew: c.isNew,
      frequency: c.frequency,
      questions: c.questions || [],
      currentSeason: true
    }));

    const p2Cards = ls.part2.map(c => ({
      type: 'part2',
      topic: c.topic,
      category: c.category,
      isNew: c.isNew,
      cueCard: c.cueCard || null,
      currentSeason: true
    }));

    const allCards = [...p1Cards, ...p2Cards];

    // Search bar
    let html = '<div class="rpt-search-bar">';
    html += '<div class="rpt-search-row">';
    html += '<input type="text" class="rpt-search-input" id="db-search" placeholder="🔍 Search all topics and cue cards…" oninput="window.filterDatabase()">';
    html += '<select class="rpt-filter-select" id="db-type" onchange="window.filterDatabase()">';
    html += '<option value="all">All Types</option>';
    html += '<option value="part1">🗣️ Part 1</option>';
    html += '<option value="part2">📋 Part 2</option>';
    html += '</select>';
    html += '<select class="rpt-filter-select" id="db-category" onchange="window.filterDatabase()">';
    html += '<option value="all">All Categories</option>';
    html += '<option value="People">👥 People</option>';
    html += '<option value="Places">📍 Places</option>';
    html += '<option value="Events">🎬 Events</option>';
    html += '<option value="Objects">📦 Objects</option>';
    html += '<option value="Place">📍 Place (P1)</option>';
    html += '<option value="Event">🎬 Event (P1)</option>';
    html += '<option value="Object">📦 Object (P1)</option>';
    html += '</select>';
    html += '</div></div>';

    html += '<div class="rpt-results-count" id="db-count"><strong>' + allCards.length + '</strong> results found</div>';
    html += '<div class="rpt-db-list" id="db-list"></div>';

    panel.innerHTML = html;
    window._dbCards = allCards;
    renderDatabaseResults(allCards, '');
  }

  function renderDatabaseResults(cards, searchTerm) {
    const list = document.getElementById('db-list');
    if (!list) return;
    const countEl = document.getElementById('db-count');
    if (countEl) {
      countEl.innerHTML = '<strong>' + cards.length + '</strong> results found';
    }

    const catIcons = { 'People': '👥', 'Events': '🎬', 'Places': '📍', 'Objects': '📦', 'Place': '📍', 'Event': '🎬', 'Object': '📦' };
    const catKeys = { 'People': 'people', 'Events': 'events', 'Places': 'places', 'Objects': 'objects', 'Place': 'places', 'Event': 'events', 'Object': 'objects' };

    let html = '';

    // Group: Part 1 first, then Part 2
    const p1 = cards.filter(c => c.type === 'part1');
    const p2 = cards.filter(c => c.type === 'part2');

    if (p1.length > 0) {
      html += '<div class="rpt-db-section-label">🗣️ Part 1 Topics</div>';
      html += '<div class="rpt-accordion">';
      p1.forEach(card => {
        const cat = card.category || 'Object';
        const ck = catKeys[cat] || 'objects';
        const icon = catIcons[cat] || '📦';
        const questions = card.questions || [];

        html += '<div class="rpt-accordion-item">';
        html += '<button class="rpt-accordion-header" onclick="window.toggleAccordion(this)" aria-expanded="false">';
        html += '<span class="rpt-acc-icon">' + icon + '</span>';
        html += '<span class="rpt-acc-title">' + esc(card.topic) + '</span>';
        html += '<span class="rpt-acc-meta">';
        html += '<span class="rpt-card-tag ' + ck + '">' + cat + '</span>';
        if (card.frequency > 0) {
          html += '<span class="rpt-card-freq">' + card.frequency + '/7</span>';
        }
        if (card.isNew) {
          html += '<span class="rpt-card-new-badge">🆕 New</span>';
        }
        html += '</span>';
        html += '<span class="rpt-acc-chevron">▸</span>';
        html += '</button>';
        html += '<div class="rpt-accordion-body">';
        html += '<div class="rpt-accordion-content">';
        if (questions.length > 0) {
          html += '<ul class="rpt-question-list">';
          questions.forEach(q => {
            html += '<li>' + esc(q) + '</li>';
          });
          html += '</ul>';
        } else {
          html += '<p class="rpt-no-questions">Sample questions coming soon.</p>';
        }
        html += '</div></div></div>';
      });
      html += '</div>';
    }

    if (p2.length > 0) {
      html += '<div class="rpt-db-section-label" style="margin-top:32px;">📋 Part 2 Cue Cards</div>';
      p2.forEach(card => {
        const cat = card.category || 'Objects';
        const ck = catKeys[cat] || 'objects';
        const icon = catIcons[cat] || '📦';
        const cc = card.cueCard;

        html += '<div class="rpt-cue-card rpt-db-cue-card">';
        html += '<div class="rpt-cue-card-header">';
        html += '<span class="rpt-cc-icon">' + icon + '</span>';
        html += '<div class="rpt-cc-title-wrap">';
        html += '<div class="rpt-cc-topic">' + esc(card.topic) + '</div>';
        html += '<div class="rpt-cc-meta">';
        html += '<span class="rpt-card-tag ' + ck + '">' + cat + '</span>';
        if (card.isNew) {
          html += '<span class="rpt-card-new-badge">🆕 New</span>';
        }
        html += '</div></div></div>';

        if (cc && cc.bullets && cc.bullets.length > 0) {
          html += '<div class="rpt-cc-body">';
          html += '<p class="rpt-cc-prompt">' + esc(cc.prompt) + '</p>';
          html += '<p class="rpt-cc-say">You should say:</p>';
          html += '<ul class="rpt-cc-bullets">';
          cc.bullets.forEach(b => {
            html += '<li>' + esc(b) + '</li>';
          });
          html += '</ul>';
          html += '<p class="rpt-cc-explain">' + esc(cc.explain) + '</p>';
          html += '</div>';
        } else {
          html += '<div class="rpt-cc-body rpt-cc-empty">';
          html += '<p class="rpt-no-questions">Full cue card details being compiled.</p>';
          html += '</div>';
        }

        html += '</div>';
      });
    }

    if (cards.length === 0) {
      html = '<div class="rpt-empty-state">No results match your filters. Try adjusting your search or category.</div>';
    }

    list.innerHTML = html;
  }

  window.filterDatabase = function () {
    if (!window._dbCards) return;
    const searchTerm = (document.getElementById('db-search')?.value || '').toLowerCase().trim();
    const typeFilter = document.getElementById('db-type')?.value || 'all';
    const categoryFilter = document.getElementById('db-category')?.value || 'all';

    let filtered = window._dbCards;

    if (searchTerm) {
      filtered = filtered.filter(c => c.topic.toLowerCase().includes(searchTerm));
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(c => c.type === typeFilter);
    }

    if (categoryFilter !== 'all') {
      // Handle P1 categories vs P2 categories
      if (['Place', 'Event', 'Object'].includes(categoryFilter)) {
        filtered = filtered.filter(c => c.type === 'part1' && c.category === categoryFilter);
      } else {
        filtered = filtered.filter(c => c.type === 'part2' && c.category === categoryFilter);
      }
    }

    renderDatabaseResults(filtered, searchTerm);
  };

  // ===== 4. INSIGHTS =====
  function renderInsights() {
    const panel = document.getElementById('panel-insights');
    if (!panel) return;
    const insights = reportData.keyInsights;
    const recos = reportData.recommendations;

    // Insights grid
    let html = '<div class="rpt-insights">';
    insights.forEach((ins, i) => {
      html += '<div class="rpt-insight-card">';
      html += '<div class="insight-num">Insight ' + (i + 1) + '</div>';
      html += '<div class="insight-title">' + esc(ins.title) + '</div>';
      html += '<div class="insight-detail">' + esc(ins.detail) + '</div>';
      html += '</div>';
    });
    html += '</div>';

    // Recommendations
    html += '<div class="rpt-recos">';
    html += '<h3>📝 Recommendations for Teaching</h3><ul>';
    recos.forEach((r, i) => {
      html += '<li><span class="reco-num">' + (i + 1) + '</span> ' + esc(r) + '</li>';
    });
    html += '</ul></div>';

    panel.innerHTML = html;
  }

  // ===== 5. METHODOLOGY =====
  function renderMethodology() {
    const panel = document.getElementById('panel-methodology');
    if (!panel) return;
    const m = reportData.methodology;

    panel.innerHTML =
      '<div class="rpt-methodology">' +
      '<h4>📊 Methodology</h4>' +
      '<div class="rpt-methodology-grid">' +
      '<div class="rpt-method-item"><strong>PDFs processed</strong>' + m.pdfsProcessed + ' (1 failed — scanned PDF)</div>' +
      '<div class="rpt-method-item"><strong>Web sources</strong>' + m.webSources + ' cross-referenced</div>' +
      '<div class="rpt-method-item"><strong>Languages</strong>' + m.normalizedLanguages.join(' + ') + ' sources</div>' +
      '<div class="rpt-method-item"><strong>Deduplication</strong>' + m.deduplication + '</div>' +
      '<div class="rpt-method-item"><strong>Seasons analyzed</strong>' + m.seasonCount + '</div>' +
      '</div></div>' +
      '<div class="rpt-footer">Built with ⚡ RUA energy · IELTS with Kee · Research Report · ' + reportData.meta.generated + '</div>';
  }

  // ===== Utility =====
  function esc(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ===== Initialize =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadData);
  } else {
    loadData();
  }
})();
