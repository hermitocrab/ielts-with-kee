/* ===== IELTS Research Report — Interactive Logic ===== */

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

    // Re-render database if switching to it (ensure fresh state)
    if (tabName === 'database') {
      renderSearchableDatabase();
    }
  };

  // ===== 1. LATEST SEASON =====
  function renderLatestSeason() {
    const ls = reportData.latestSeason;
    const panel = document.getElementById('panel-latest');

    // Part 1
    let html = '<div class="rpt-cat-section">';
    html += '<h3>🗣️ Part 1 Topics <span class="rpt-cat-count">' + ls.part1.length + ' topics</span></h3>';
    html += '<p style="font-family:Inter,sans-serif;font-size:0.82rem;color:var(--rpt-text-light);margin-bottom:16px;">New & confirmed topics for ' + ls.label + '. Core topics (Work/Study, Home, Hometown) are always present and excluded from this list.</p>';
    html += '<div class="rpt-grid">';
    ls.part1.forEach(t => {
      const cat = t.category.toLowerCase();
      const icon = cat === 'place' ? '📍' : cat === 'event' ? '🎬' : '📦';
      html += '<div class="rpt-card">';
      html += '<div class="rpt-card-badge ' + cat + '">' + icon + '</div>';
      html += '<div class="rpt-card-content">';
      html += '<div class="rpt-card-title">' + esc(t.topic) + '</div>';
      html += '<div class="rpt-card-meta">';
      html += '<span class="rpt-card-tag ' + cat + '">' + t.category + '</span>';
      if (t.frequency > 0) {
        html += '<span class="rpt-card-freq">' + t.frequency + '/7 seasons</span>';
      }
      if (t.isNew) {
        html += '<span class="rpt-card-new-badge">🆕 New</span>';
      }
      html += '</div></div></div>';
    });
    html += '</div></div>';

    // Part 2 — grouped by category
    html += '<div class="rpt-cat-section">';
    html += '<h3>📋 Part 2 Cue Cards <span class="rpt-cat-count">' + ls.part2.length + ' topics</span></h3>';
    html += '<p style="font-family:Inter,sans-serif;font-size:0.82rem;color:var(--rpt-text-light);margin-bottom:16px;">Compiled from multiple web sources. 🆕 marks truly new topics not seen in any previous season.</p>';

    const categories = ['People', 'Events', 'Places', 'Objects'];
    const catIcons = { 'People': '👥', 'Events': '🎬', 'Places': '📍', 'Objects': '📦' };
    const catKeys = { 'People': 'people', 'Events': 'events', 'Places': 'places', 'Objects': 'objects' };

    categories.forEach(cat => {
      const items = ls.part2.filter(t => t.category === cat);
      html += '<h4 style="font-family:Inter,sans-serif;font-size:0.9rem;font-weight:700;color:var(--rpt-text);margin:20px 0 10px;">' + catIcons[cat] + ' ' + cat + ' <span class="rpt-cat-count">' + items.length + '</span></h4>';
      html += '<div class="rpt-grid">';
      items.forEach(t => {
        const ck = catKeys[cat];
        html += '<div class="rpt-card">';
        html += '<div class="rpt-card-badge ' + ck + '">' + catIcons[cat] + '</div>';
        html += '<div class="rpt-card-content">';
        html += '<div class="rpt-card-title">' + esc(t.topic) + '</div>';
        html += '<div class="rpt-card-meta">';
        html += '<span class="rpt-card-tag ' + ck + '">' + cat + '</span>';
        if (t.isNew) {
          html += '<span class="rpt-card-new-badge">🆕 New</span>';
        }
        html += '</div></div></div>';
      });
      html += '</div>';
    });

    html += '</div>';
    panel.innerHTML = html;
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

    // Build a database from the Part 2 cue cards
    // For a richer database, we'll mark which season(s) each card belongs to
    // based on the cross-reference data in the report
    const allCards = ls.part2.map(c => ({
      topic: c.topic,
      category: c.category,
      isNew: c.isNew,
      currentSeason: true
    }));

    let html = '<div class="rpt-search-bar">';
    html += '<div class="rpt-search-row">';
    html += '<input type="text" class="rpt-search-input" id="db-search" placeholder="🔍 Search 134 cue cards…" oninput="window.filterDatabase()">';
    html += '<select class="rpt-filter-select" id="db-season" onchange="window.filterDatabase()">';
    html += '<option value="all">All Seasons</option>';
    html += '<option value="2026-may-aug">2026 May–Aug 🆕</option>';
    html += '<option value="2026-jan-apr">2026 Jan–Apr</option>';
    html += '<option value="2025-sep-dec">2025 Sep–Dec</option>';
    html += '<option value="2025-may-aug">2025 May–Aug</option>';
    html += '<option value="2025-jan-apr">2025 Jan–Apr</option>';
    html += '<option value="2024-sep-dec">2024 Sep–Dec</option>';
    html += '<option value="2024-may-aug">2024 May–Aug</option>';
    html += '</select>';
    html += '<select class="rpt-filter-select" id="db-category" onchange="window.filterDatabase()">';
    html += '<option value="all">All Categories</option>';
    html += '<option value="People">👥 People</option>';
    html += '<option value="Places">📍 Places</option>';
    html += '<option value="Events">🎬 Events</option>';
    html += '<option value="Objects">📦 Objects</option>';
    html += '</select>';
    html += '</div></div>';

    html += '<div class="rpt-results-count" id="db-count"><strong>' + allCards.length + '</strong> cue cards found</div>';
    html += '<div class="rpt-grid" id="db-grid"></div>';

    panel.innerHTML = html;
    window._dbCards = allCards;
    renderDatabaseCards(allCards);
  }

  function renderDatabaseCards(cards) {
    const grid = document.getElementById('db-grid');
    if (!grid) return;
    const countEl = document.getElementById('db-count');
    if (countEl) {
      countEl.innerHTML = '<strong>' + cards.length + '</strong> cue cards found';
    }

    const catIcons = { 'People': '👥', 'Events': '🎬', 'Places': '📍', 'Objects': '📦' };
    const catKeys = { 'People': 'people', 'Events': 'events', 'Places': 'places', 'Objects': 'objects' };

    let html = '';
    cards.forEach(c => {
      const ck = catKeys[c.category] || 'objects';
      const icon = catIcons[c.category] || '📦';
      html += '<div class="rpt-card rpt-db-card">';
      html += '<div class="rpt-card-badge ' + ck + '">' + icon + '</div>';
      html += '<div class="rpt-card-content">';
      html += '<div class="rpt-card-title">' + esc(c.topic) + '</div>';
      html += '<div class="rpt-card-meta">';
      html += '<span class="rpt-card-tag ' + ck + '">' + c.category + '</span>';
      if (c.currentSeason) {
        html += '<span class="rpt-season-tag current">2026 May–Aug</span>';
      }
      if (c.isNew) {
        html += '<span class="rpt-card-new-badge">🆕 New</span>';
      }
      html += '</div></div></div>';
    });

    if (cards.length === 0) {
      html = '<div style="grid-column:1/-1;text-align:center;padding:40px;font-family:Inter,sans-serif;color:var(--rpt-text-light);">No cue cards match your filters. Try adjusting your search.</div>';
    }

    grid.innerHTML = html;
  }

  window.filterDatabase = function () {
    if (!window._dbCards) return;
    const searchTerm = (document.getElementById('db-search')?.value || '').toLowerCase().trim();
    const seasonFilter = document.getElementById('db-season')?.value || 'all';
    const categoryFilter = document.getElementById('db-category')?.value || 'all';

    let filtered = window._dbCards;

    if (searchTerm) {
      filtered = filtered.filter(c => c.topic.toLowerCase().includes(searchTerm));
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(c => c.category === categoryFilter);
    }

    // Season filter: all cards in our DB are current season for now
    // In a fuller DB, we'd filter by season tags
    if (seasonFilter !== 'all' && seasonFilter !== '2026-may-aug') {
      filtered = [];
    }

    renderDatabaseCards(filtered);
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
