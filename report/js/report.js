/* ===== IELTS Research Report — Interactive Logic v3 ===== */
/* P2-style tabs · Source citations per question · Search always full cue cards */

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
    initSearchDatabase();
    renderInsightsAndMethodology();
  }

  // ===== Tab Switching =====
  window.switchReportTab = function (tabName, btn) {
    document.querySelectorAll('.rpt-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.rpt-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    var panel = document.getElementById('panel-' + tabName);
    if (panel) panel.classList.add('active');

    if (tabName === 'database') {
      initSearchDatabase();
    }
  };

  // ===== Accordion Toggle =====
  window.toggleAccordion = function (header) {
    var item = header.closest('.rpt-accordion-item');
    if (!item) return;
    item.classList.toggle('open');
  };

  // ================================
  //  1. LATEST SEASON
  // ================================
  function renderLatestSeason() {
    var ls = reportData.latestSeason;
    var panel = document.getElementById('panel-latest');
    if (!panel) return;

    var html = '';

    // Part 1 Accordions with source per question
    html += '<div class="rpt-section-header"><h2>🗣️ Part 1 Topics</h2>';
    html += '<p>' + ls.part1.length + ' confirmed topics for ' + ls.label + '. Click to expand and see real sample questions with sources.</p></div>';
    html += '<div class="rpt-accordion">';
    ls.part1.forEach(function (t) {
      var cat = t.category.toLowerCase();
      var icon = cat === 'place' ? '📍' : cat === 'event' ? '🎬' : '📦';
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
        t.questions.forEach(function (q, i) {
          html += '<div class="rpt-accordion-question"><span class="rpt-accordion-qnum">' + (i + 1) + '</span><span>' + esc(q) + '</span></div>';
          // Source under each question
          html += '<div class="rpt-accordion-source rpt-q-source">Source: ' + esc(t.source || 'Unknown') + '</div>';
        });
      }
      if (!t.questions || t.questions.length === 0) {
        if (t.source) {
          html += '<div class="rpt-accordion-source">Source: ' + esc(t.source) + '</div>';
        }
      }
      html += '</div></div>';
      html += '</div>';
    });
    html += '</div>';

    // Part 2 Full Cue Cards — grouped by category
    html += '<div class="rpt-section-header" style="margin-top:40px;"><h2>📋 Part 2 Cue Cards</h2>';
    html += '<p>' + ls.part2.length + ' full cue cards with authentic prompts, bullets, and explain lines. 🆕 = new for ' + ls.label + '.</p></div>';

    var categories = ['People', 'Events', 'Places', 'Objects'];
    var catIcons = { 'People': '👥', 'Events': '🎬', 'Places': '📍', 'Objects': '📦' };
    var catKeys = { 'People': 'people', 'Events': 'events', 'Places': 'places', 'Objects': 'objects' };

    categories.forEach(function (cat) {
      var items = ls.part2.filter(function (t) { return t.category === cat; });
      if (items.length === 0) return;
      html += '<div class="rpt-p2-cat-heading">' + catIcons[cat] + ' ' + cat + ' <span class="rpt-cat-count">' + items.length + '</span></div>';
      html += '<div class="rpt-cuecard-grid">';
      items.forEach(function (t) {
        html += renderCueCard(t, catKeys[cat], catIcons[cat]);
      });
      html += '</div>';
    });

    panel.innerHTML = html;
  }

  // ===== Render a single cue card (used by Latest Season + Search) =====
  function renderCueCard(t, ck, icon) {
    var html = '<div class="rpt-cuecard cat-' + ck + '">';
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
      html += '<div class="rpt-cuecard-body-label">You should say:</div>';
      html += '<ul class="rpt-cuecard-bullets">';
      t.cueCard.bullets.forEach(function (b) {
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
    // Source tag in footer
    html += '<span class="rpt-cuecard-source">Source: ' + esc(t.source || 'Unknown') + '</span>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  // ================================
  //  2. ALL-TIME RANKINGS
  // ================================
  function renderAllTimeRankings() {
    var at = reportData.allTime;
    var panel = document.getElementById('panel-rankings');
    if (!panel) return;

    var html = '';

    // Part 1 Table
    html += '<div class="rpt-section-header"><h2>🗣️ Part 1 — Top 20 Most Frequent</h2>';
    html += '<p>Ranked by number of season appearances (2024–2026). Core mandatory topics excluded.</p></div>';
    html += '<div class="rpt-table-wrap"><table class="rpt-table"><thead><tr>';
    html += '<th>#</th><th></th><th>Topic</th><th>Appearances</th><th>Type</th></tr></thead><tbody>';
    at.part1.forEach(function (row) {
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
    at.part2.forEach(function (row) {
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

  // ================================
  //  3. SEARCH DATABASE (always full cue cards)
  // ================================
  function initSearchDatabase() {
    var panel = document.getElementById('panel-database');
    if (!panel) return;
    var ls = reportData.latestSeason;

    // Build flat database
    var allCards = ls.part2.map(function (c) {
      return {
        topic: c.topic,
        category: c.category,
        isNew: c.isNew,
        currentSeason: true,
        type: 'part2',
        cueCard: c.cueCard,
        source: c.source
      };
    });

    var allP1 = ls.part1.map(function (c) {
      return {
        topic: c.topic,
        category: c.category,
        isNew: c.isNew,
        currentSeason: true,
        type: 'part1',
        questions: c.questions,
        frequency: c.frequency,
        source: c.source
      };
    });

    var html = '';
    html += '<div class="rpt-section-header"><h2>🔍 Search All Topics</h2>';
    html += '<p>Search across all ' + (allCards.length + allP1.length) + ' topics. Results show complete cue cards with prompts, bullets, explain lines, and sources.</p></div>';

    html += '<div class="rpt-search-bar">';
    html += '<div class="rpt-search-row">';
    html += '<input type="text" class="rpt-search-input" id="db-search" placeholder="Search by topic name…" oninput="window.filterDatabase()">';
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
    html += '</div>';

    html += '<div class="rpt-results-count" id="db-count"><strong>' + (allCards.length + allP1.length) + '</strong> topics found</div>';
    html += '<div id="db-grid"></div>';

    panel.innerHTML = html;
    window._dbP1 = allP1;
    window._dbP2 = allCards;
    renderDatabase();
  }

  // Always render full content — Part 1 as accordions, Part 2 as full cue cards
  function renderDatabase() {
    var grid = document.getElementById('db-grid');
    if (!grid) return;

    var all = (window._filteredP1 || window._dbP1).concat(window._filteredP2 || window._dbP2);
    var countEl = document.getElementById('db-count');
    if (countEl) {
      countEl.innerHTML = '<strong>' + all.length + '</strong> topic' + (all.length !== 1 ? 's' : '') + ' found';
    }

    if (all.length === 0) {
      grid.innerHTML = '<div class="rpt-empty-search">No topics match your filters. Try adjusting your search terms.</div>';
      return;
    }

    var html = '';

    // Part 1 results as accordions
    var p1Items = all.filter(function (t) { return t.type === 'part1'; });
    if (p1Items.length > 0) {
      html += '<div class="rpt-p2-cat-heading">🗣️ Part 1 Topics <span class="rpt-cat-count">' + p1Items.length + '</span></div>';
      html += '<div class="rpt-accordion">';
      p1Items.forEach(function (t) {
        var cat = t.category.toLowerCase();
        var icon = cat === 'place' ? '📍' : cat === 'event' ? '🎬' : '📦';
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
          t.questions.forEach(function (q, i) {
            html += '<div class="rpt-accordion-question"><span class="rpt-accordion-qnum">' + (i + 1) + '</span><span>' + esc(q) + '</span></div>';
            html += '<div class="rpt-accordion-source rpt-q-source">Source: ' + esc(t.source || 'Unknown') + '</div>';
          });
        }
        if (!t.questions || t.questions.length === 0) {
          if (t.source) html += '<div class="rpt-accordion-source">Source: ' + esc(t.source) + '</div>';
        }
        html += '</div></div></div>';
      });
      html += '</div>';
    }

    // Part 2 results as full cue cards
    var p2Items = all.filter(function (t) { return t.type === 'part2'; });
    if (p2Items.length > 0) {
      html += '<div class="rpt-p2-cat-heading" style="margin-top:24px;">📋 Part 2 Cue Cards <span class="rpt-cat-count">' + p2Items.length + '</span></div>';
      html += '<div class="rpt-cuecard-grid">';
      var catKeys = { 'People': 'people', 'Events': 'events', 'Places': 'places', 'Objects': 'objects' };
      var catIcons = { 'People': '👥', 'Events': '🎬', 'Places': '📍', 'Objects': '📦' };
      p2Items.forEach(function (t) {
        var ck = catKeys[t.category] || 'objects';
        html += renderCueCard(t, ck, catIcons[t.category]);
      });
      html += '</div>';
    }

    grid.innerHTML = html;
  }

  window.filterDatabase = function () {
    var searchTerm = (document.getElementById('db-search') && document.getElementById('db-search').value || '').toLowerCase().trim();
    var categoryFilter = (document.getElementById('db-category') && document.getElementById('db-category').value) || 'all';
    var typeFilter = (document.getElementById('db-type') && document.getElementById('db-type').value) || 'all';

    var filteredP1 = (window._dbP1 || []).slice();
    var filteredP2 = (window._dbP2 || []).slice();

    if (typeFilter === 'part1') filteredP2 = [];
    if (typeFilter === 'part2') filteredP1 = [];

    if (searchTerm) {
      filteredP1 = filteredP1.filter(function (c) { return c.topic.toLowerCase().indexOf(searchTerm) !== -1; });
      filteredP2 = filteredP2.filter(function (c) { return c.topic.toLowerCase().indexOf(searchTerm) !== -1; });
    }

    if (categoryFilter !== 'all') {
      filteredP1 = filteredP1.filter(function (c) { return c.category === categoryFilter; });
      filteredP2 = filteredP2.filter(function (c) { return c.category === categoryFilter; });
    }

    window._filteredP1 = filteredP1;
    window._filteredP2 = filteredP2;
    renderDatabase();
  };

  // ================================
  //  4. INSIGHTS & METHODOLOGY (always visible)
  // ================================
  function renderInsightsAndMethodology() {
    var section = document.getElementById('rpt-insights-section');
    if (!section) return;

    var insights = reportData.keyInsights;
    var recos = reportData.recommendations;
    var m = reportData.methodology;

    var html = '';

    // Insights section
    html += '<div class="rpt-section-header" style="margin-top:48px;"><h2>💡 Key Insights</h2>';
    html += '<p>What the data reveals about IELTS Speaking question patterns across 7 seasons.</p></div>';
    html += '<div class="rpt-insights">';
    insights.forEach(function (ins, i) {
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
    recos.forEach(function (r, i) {
      html += '<li><span class="reco-num">' + (i + 1) + '</span> ' + esc(r) + '</li>';
    });
    html += '</ul></div>';

    // Methodology
    html += '<div class="rpt-methodology">';
    html += '<h4>📊 Methodology</h4>';
    html += '<div class="rpt-methodology-grid">';
    html += '<div class="rpt-method-item"><strong>PDFs processed</strong>' + m.pdfsProcessed + ' (1 failed — scanned PDF)</div>';
    html += '<div class="rpt-method-item"><strong>Web sources</strong>' + m.webSources + ' cross-referenced</div>';
    html += '<div class="rpt-method-item"><strong>Languages</strong>' + m.normalizedLanguages.join(' + ') + ' sources</div>';
    html += '<div class="rpt-method-item"><strong>Deduplication</strong>' + m.deduplication + '</div>';
    html += '<div class="rpt-method-item"><strong>Seasons analyzed</strong>' + m.seasonCount + '</div>';
    html += '</div></div>';

    html += '<div class="rpt-footer">Built with ⚡ RUA energy · IELTS with Kee · Research Report · ' + reportData.meta.generated + '</div>';

    section.innerHTML = html;
  }

  // ===== Utility =====
  function esc(str) {
    if (!str) return '';
    var div = document.createElement('div');
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
