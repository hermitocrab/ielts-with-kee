/* ===== IELTS Research Report — Interactive Logic v2 ===== */
/* Accordion Part 1 + Full Cue Card Part 2 */

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
    document.getElementById('panel-' + tabName).classList.add('active');

    if (tabName === 'database') {
      renderSearchableDatabase();
    }
  };

  // ===== Accordion Toggle =====
  window.toggleAccordion = function (header) {
    const item = header.closest('.rpt-accordion-item');
    if (!item) return;
    item.classList.toggle('open');
  };

  // ===== 1. LATEST SEASON =====
  function renderLatestSeason() {
    const ls = reportData.latestSeason;
    const panel = document.getElementById('panel-latest');

    // Part 1 Accordions
    let html = '<div class="rpt-cat-section">';
    html += '<h3>🗣️ Part 1 Topics <span class="rpt-cat-count">' + ls.part1.length + ' topics</span></h3>';
    html += '<p style="font-family:Inter,sans-serif;font-size:0.82rem;color:var(--rpt-text-light);margin-bottom:16px;">New & confirmed topics for ' + ls.label + '. Click any topic to expand and see real sample questions. Core topics (Work/Study, Home, Hometown) are always present and excluded.</p>';
    html += '<div class="rpt-accordion">';
    ls.part1.forEach(t => {
      const cat = t.category.toLowerCase();
      const icon = cat === 'place' ? '📍' : cat === 'event' ? '🎬' : '📦';
      html += '<div class="rpt-accordion-item">';
      html += '<div class="rpt-accordion-header" onclick="toggleAccordion(this)" role="button" tabindex="0" aria-expanded="false" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleAccordion(this)}">';
      html += '<div class="rpt-accordion-icon ' + cat + '">' + icon + '</div>';
      html += '<div class="rpt-accordion-title">' + esc(t.topic) + '</div>';
      html += '<div class="rpt-accordion-badges">';
      html += '<span class="rpt-accordion-tag ' + cat + '">' + t.category + '</span>';
      if (t.frequency > 0) {
        html += '<span class="rpt-accordion-freq">' + t.frequency + '/7 seasons</span>';
      }
      if (t.isNew) {
        html += '<span class="rpt-accordion-new-badge">NEW</span>';
      }
      html += '</div>';
      html += '<div class="rpt-accordion-arrow">▼</div>';
      html += '</div>';
      html += '<div class="rpt-accordion-body"><div class="rpt-accordion-content">';
      if (t.questions && t.questions.length > 0) {
        t.questions.forEach((q, i) => {
          html += '<div class="rpt-accordion-question"><span class="rpt-accordion-qnum">' + (i + 1) + '</span>' + esc(q) + '</div>';
        });
      }
      if (t.source) {
        html += '<div class="rpt-accordion-source">📄 Source: ' + esc(t.source) + '</div>';
      }
      html += '</div></div>';
      html += '</div>';
    });
    html += '</div></div>';

    // Part 2 Full Cue Cards — grouped by category
    html += '<div class="rpt-cat-section">';
    html += '<h3>📋 Part 2 Cue Cards <span class="rpt-cat-count">' + ls.part2.length + ' topics</span></h3>';
    html += '<p style="font-family:Inter,sans-serif;font-size:0.82rem;color:var(--rpt-text-light);margin-bottom:16px;">Full cue cards with authentic "You should say" bullets. 🆕 = brand new topics for this season.</p>';

    const categories = ['People', 'Events', 'Places', 'Objects'];
    const catIcons = { 'People': '👥', 'Events': '🎬', 'Places': '📍', 'Objects': '📦' };
    const catKeys = { 'People': 'people', 'Events': 'events', 'Places': 'places', 'Objects': 'objects' };

    categories.forEach(cat => {
      const items = ls.part2.filter(t => t.category === cat);
      if (items.length === 0) return;
      html += '<div class="rpt-p2-cat-heading">' + catIcons[cat] + ' ' + cat + ' <span class="rpt-cat-count">' + items.length + '</span></div>';
      html += '<div class="rpt-cuecard-grid">';
      items.forEach(t => {
        const ck = catKeys[cat];
        html += renderCueCard(t, ck, catIcons[cat]);
      });
      html += '</div>';
    });

    html += '</div>';
    panel.innerHTML = html;
  }

  // ===== Render a single cue card =====
  function renderCueCard(t, ck, icon, showSource) {
    let html = '<div class="rpt-cuecard">';
    html += '<div class="rpt-cuecard-header">';
    html += '<div class="rpt-cuecard-header-top">';
    html += '<div class="rpt-cuecard-icon ' + ck + '">' + (icon || '📋') + '</div>';
    html += '<div class="rpt-cuecard-topic">' + esc(t.topic) + '</div>';
    html += '</div>';
    if (t.cueCard && t.cueCard.describe) {
      html += '<div class="rpt-cuecard-describe">' + esc(t.cueCard.describe) + '</div>';
    }
    html += '</div>';
    html += '<div class="rpt-cuecard-body">';
    if (t.cueCard && t.cueCard.bullets && t.cueCard.bullets.length > 0) {
      html += '<ul class="rpt-cuecard-bullets">';
      t.cueCard.bullets.forEach(b => {
        html += '<li class="rpt-cuecard-bullet">' + esc(b) + '</li>';
      });
      html += '</ul>';
    }
    if (t.cueCard && t.cueCard.explain) {
      html += '<div class="rpt-cuecard-explain">' + esc(t.cueCard.explain) + '</div>';
    }
    html += '</div>';
    html += '<div class="rpt-cuecard-footer">';
    html += '<span class="rpt-cuecard-tag ' + ck + '">' + t.category + '</span>';
    if (t.isNew) {
      html += '<span class="rpt-cuecard-new-badge">🆕 New</span>';
    }
    if (showSource && t.source) {
      html += '<span style="font-size:0.65rem;color:var(--rpt-text-muted);margin-left:auto;">' + esc(t.source) + '</span>';
    }
    html += '</div>';
    html += '</div>';
    return html;
  }

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

    // Build flat database from Part 1 and Part 2
    const allCards = ls.part2.map(c => ({
      topic: c.topic,
      category: c.category,
      isNew: c.isNew,
      currentSeason: true,
      type: 'part2',
      cueCard: c.cueCard,
      source: c.source
    }));

    const allP1 = ls.part1.map(c => ({
      topic: c.topic,
      category: c.category,
      isNew: c.isNew,
      currentSeason: true,
      type: 'part1',
      questions: c.questions,
      frequency: c.frequency,
      source: c.source
    }));

    let html = '<div class="rpt-search-bar">';
    html += '<div class="rpt-search-row">';
    html += '<input type="text" class="rpt-search-input" id="db-search" placeholder="🔍 Search all 154 topics (P1 + P2)…" oninput="window.filterDatabase()">';
    html += '<select class="rpt-filter-select" id="db-category" onchange="window.filterDatabase()">';
    html += '<option value="all">All Categories</option>';
    html += '<option value="People">👥 People</option>';
    html += '<option value="Places">📍 Places</option>';
    html += '<option value="Events">🎬 Events</option>';
    html += '<option value="Objects">📦 Objects</option>';
    html += '</select>';
    html += '<select class="rpt-filter-select" id="db-type" onchange="window.filterDatabase()">';
    html += '<option value="all">All Types</option>';
    html += '<option value="part1">Part 1 Topics</option>';
    html += '<option value="part2">Part 2 Cue Cards</option>';
    html += '</select>';
    html += '</div>';
    html += '<div class="rpt-filter-row" style="margin-top:10px;">';
    html += '<label style="font-family:Inter,sans-serif;font-size:0.8rem;font-weight:600;color:var(--rpt-text-light);">View:</label>';
    html += '<div class="rpt-view-toggle" id="db-view-toggle">';
    html += '<button class="rpt-view-btn active" onclick="window.setDatabaseView(\'cards\', this)">Cards</button>';
    html += '<button class="rpt-view-btn" onclick="window.setDatabaseView(\'cuecards\', this)">Full Cue Cards</button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    html += '<div class="rpt-results-count" id="db-count"><strong>' + (allCards.length + allP1.length) + '</strong> topics found</div>';
    html += '<div id="db-grid"></div>';

    panel.innerHTML = html;
    window._dbP1 = allP1;
    window._dbP2 = allCards;
    window._dbView = 'cards';
    renderDatabase();
  }

  function renderDatabase() {
    const grid = document.getElementById('db-grid');
    if (!grid) return;
    const view = window._dbView || 'cards';
    const all = [...(window._filteredP1 || window._dbP1), ...(window._filteredP2 || window._dbP2)];
    const countEl = document.getElementById('db-count');
    if (countEl) {
      countEl.innerHTML = '<strong>' + all.length + '</strong> topics found';
    }

    if (all.length === 0) {
      grid.innerHTML = '<div style="text-align:center;padding:40px;font-family:Inter,sans-serif;color:var(--rpt-text-light);">No topics match your filters. Try adjusting your search.</div>';
      return;
    }

    if (view === 'cuecards') {
      // Full cue card view for Part 2, accordion for Part 1
      let html = '';
      const p2Items = all.filter(t => t.type === 'part2');
      const p1Items = all.filter(t => t.type === 'part1');

      if (p1Items.length > 0) {
        html += '<h4 style="font-family:Inter,sans-serif;font-size:0.9rem;font-weight:700;margin:12px 0 8px;">🗣️ Part 1 Topics</h4>';
        html += '<div class="rpt-accordion">';
        p1Items.forEach(t => {
          const cat = t.category.toLowerCase();
          const icon = cat === 'place' ? '📍' : cat === 'event' ? '🎬' : '📦';
          html += '<div class="rpt-accordion-item">';
          html += '<div class="rpt-accordion-header" onclick="toggleAccordion(this)" role="button" tabindex="0" aria-expanded="false" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleAccordion(this)}">';
          html += '<div class="rpt-accordion-icon ' + cat + '">' + icon + '</div>';
          html += '<div class="rpt-accordion-title">' + esc(t.topic) + '</div>';
          html += '<div class="rpt-accordion-badges">';
          html += '<span class="rpt-accordion-tag ' + cat + '">' + t.category + '</span>';
          if (t.isNew) html += '<span class="rpt-accordion-new-badge">NEW</span>';
          html += '</div>';
          html += '<div class="rpt-accordion-arrow">▼</div>';
          html += '</div>';
          html += '<div class="rpt-accordion-body"><div class="rpt-accordion-content">';
          if (t.questions && t.questions.length > 0) {
            t.questions.forEach((q, i) => {
              html += '<div class="rpt-accordion-question"><span class="rpt-accordion-qnum">' + (i + 1) + '</span>' + esc(q) + '</div>';
            });
          }
          if (t.source) html += '<div class="rpt-accordion-source">📄 Source: ' + esc(t.source) + '</div>';
          html += '</div></div></div>';
        });
        html += '</div>';
      }

      if (p2Items.length > 0) {
        html += '<h4 style="font-family:Inter,sans-serif;font-size:0.9rem;font-weight:700;margin:20px 0 8px;">📋 Part 2 Cue Cards</h4>';
        html += '<div class="rpt-cuecard-grid">';
        const catKeys = { 'People': 'people', 'Events': 'events', 'Places': 'places', 'Objects': 'objects' };
        const catIcons = { 'People': '👥', 'Events': '🎬', 'Places': '📍', 'Objects': '📦' };
        p2Items.forEach(t => {
          const ck = catKeys[t.category] || 'objects';
          html += renderCueCard(t, ck, catIcons[t.category], true);
        });
        html += '</div>';
      }
      grid.innerHTML = html;
    } else {
      // Simple card view
      const catIcons = { 'People': '👥', 'Events': '🎬', 'Places': '📍', 'Objects': '📦' };
      const catKeys = { 'People': 'people', 'Events': 'events', 'Places': 'places', 'Objects': 'objects' };
      let html = '<div class="rpt-grid">';
      all.forEach(c => {
        const ck = catKeys[c.category] || 'objects';
        const icon = catIcons[c.category] || '📦';
        const typeLabel = c.type === 'part1' ? 'P1' : 'P2';
        html += '<div class="rpt-card rpt-db-card">';
        html += '<div class="rpt-card-badge ' + ck + '">' + icon + '</div>';
        html += '<div class="rpt-card-content">';
        html += '<div class="rpt-card-title">' + esc(c.topic) + '</div>';
        html += '<div class="rpt-card-meta">';
        html += '<span class="rpt-card-tag ' + ck + '">' + c.category + '</span>';
        html += '<span class="rpt-season-tag current">2026 May–Aug</span>';
        html += '<span style="font-size:0.65rem;font-weight:600;color:var(--rpt-purple);">' + typeLabel + '</span>';
        if (c.isNew) html += '<span class="rpt-card-new-badge">🆕 New</span>';
        html += '</div></div></div>';
      });
      html += '</div>';
      grid.innerHTML = html;
    }
  }

  window.setDatabaseView = function (view, btn) {
    window._dbView = view;
    document.querySelectorAll('#db-view-toggle .rpt-view-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDatabase();
  };

  window.filterDatabase = function () {
    const searchTerm = (document.getElementById('db-search')?.value || '').toLowerCase().trim();
    const categoryFilter = document.getElementById('db-category')?.value || 'all';
    const typeFilter = document.getElementById('db-type')?.value || 'all';

    let filteredP1 = window._dbP1 || [];
    let filteredP2 = window._dbP2 || [];

    if (typeFilter === 'part1') filteredP2 = [];
    if (typeFilter === 'part2') filteredP1 = [];

    if (searchTerm) {
      filteredP1 = filteredP1.filter(c => c.topic.toLowerCase().includes(searchTerm));
      filteredP2 = filteredP2.filter(c => c.topic.toLowerCase().includes(searchTerm));
    }

    if (categoryFilter !== 'all') {
      filteredP1 = filteredP1.filter(c => c.category === categoryFilter);
      filteredP2 = filteredP2.filter(c => c.category === categoryFilter);
    }

    window._filteredP1 = filteredP1;
    window._filteredP2 = filteredP2;
    renderDatabase();
  };

  // ===== 4. INSIGHTS =====
  function renderInsights() {
    const panel = document.getElementById('panel-insights');
    if (!panel) return;
    const insights = reportData.keyInsights;
    const recos = reportData.recommendations;

    let html = '<div class="rpt-insights">';
    insights.forEach((ins, i) => {
      html += '<div class="rpt-insight-card">';
      html += '<div class="insight-num">Insight ' + (i + 1) + '</div>';
      html += '<div class="insight-title">' + esc(ins.title) + '</div>';
      html += '<div class="insight-detail">' + esc(ins.detail) + '</div>';
      html += '</div>';
    });
    html += '</div>';

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
