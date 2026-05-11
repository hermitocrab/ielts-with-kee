/* ===== IELTS Research Report — v3 Redesign Logic ===== */
/* Principles: progressive disclosure · one thing per card · zero redundancy */
/* Redundancy fix: topic name appears ONCE per card. Full cue card in overlay on click. */

(function () {
  'use strict';

  let reportData = null;
  let detailStore = {};  // key → card data for safe overlay dispatch
  let detailSeq = 0;

  // Category config
  const CAT_CONFIG = {
    People:  { key: 'people',  icon: '👥', emoji: '👥' },
    Places:  { key: 'places',  icon: '📍', emoji: '📍' },
    Events:  { key: 'events',  icon: '🎬', emoji: '🎬' },
    Objects: { key: 'objects', icon: '📦', emoji: '📦' }
  };

  // ===== DATA LOADING =====
  async function loadData() {
    try {
      const res = await fetch('data.json?' + Date.now());
      reportData = await res.json();
      initUI();
    } catch (e) {
      console.error('Failed to load report data:', e);
    }
  }

  // ===== UI INIT =====
  function initUI() {
    detailStore = {};
    detailSeq = 0;
    renderLatestSeason();
    renderAllTimeRankings();
    initSearchDatabase();
    renderInsightsAndMethodology();
  }

  // Store card data and return a safe key for onclick
  function storeCard(data) {
    var key = 'd' + (++detailSeq);
    detailStore[key] = data;
    return key;
  }

  // ===== TAB SWITCHING =====
  window.switchReportTab = function (tabName, el) {
    document.querySelectorAll('.rpt-tab').forEach(function (t) { t.classList.remove('active'); });
    document.querySelectorAll('.rpt-panel').forEach(function (p) { p.classList.remove('active'); });
    if (el && el.classList.contains('rpt-tab')) el.classList.add('active');
    else {
      var tabs = document.querySelectorAll('.rpt-tab');
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].textContent.toLowerCase().indexOf(tabName) !== -1) {
          tabs[i].classList.add('active');
          break;
        }
      }
    }
    var panel = document.getElementById('panel-' + tabName);
    if (panel) panel.classList.add('active');

    document.querySelectorAll('.rpt-sidebar-item').forEach(function (item) { item.classList.remove('active'); });
    var sidebarItem = document.querySelector('.rpt-sidebar-item[data-panel="' + tabName + '"]');
    if (sidebarItem) sidebarItem.classList.add('active');

    if (window.innerWidth <= 900 && panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ===== ACCORDION TOGGLE =====
  window.toggleAccordion = function (header) {
    var item = header.closest('.rpt-accordion-item');
    if (!item) return;
    item.classList.toggle('open');
  };

  // ===== CARD DETAIL OVERLAY =====
  window.openDetailByKey = function (key) {
    var cardData = detailStore[key];
    if (!cardData) return;

    var overlay = document.getElementById('rpt-overlay');
    var content = document.getElementById('rpt-overlay-content');
    if (!overlay || !content) return;

    var cat = cardData.category || 'Objects';
    var ck = (CAT_CONFIG[cat] && CAT_CONFIG[cat].key) || 'objects';
    var cc = cardData.cueCard || {};

    var html = '<div class="rpt-detail-header">';
    html += '<div class="rpt-detail-category ' + ck + '">' + esc(cat) + '</div>';
    html += '<div class="rpt-detail-topic">' + esc(cardData.topic) + '</div>';
    if (cardData.source) {
      html += '<div class="rpt-detail-source">Source: ' + esc(cardData.source) + '</div>';
    }
    html += '</div>';

    if (cc.describe || (cc.bullets && cc.bullets.length > 0) || cc.explain) {
      html += '<div class="rpt-detail-prompt ' + ck + '">';
      if (cc.describe) {
        html += '<div class="rpt-detail-describe">' + esc(cc.describe) + '</div>';
      }
      if (cc.bullets && cc.bullets.length > 0) {
        html += '<div class="rpt-detail-label">You should say:</div>';
        html += '<ul class="rpt-detail-bullets">';
        cc.bullets.forEach(function (b) {
          html += '<li class="rpt-detail-bullet"><span class="rpt-detail-bullet-dot">•</span> ' + esc(b) + '</li>';
        });
        html += '</ul>';
      }
      if (cc.explain) {
        html += '<div class="rpt-detail-explain">' + esc(cc.explain) + '</div>';
      }
      html += '</div>';
    }

    html += '<div class="rpt-detail-badges">';
    if (cardData.isNew) {
      html += '<span class="rpt-detail-badge new">🆕 New This Season</span>';
    }
    if (cardData.frequency) {
      html += '<span class="rpt-detail-badge" style="background:var(--rpt-highfreq-bg);color:var(--rpt-highfreq)">📊 ' + cardData.frequency + '/7 seasons</span>';
    }
    html += '</div>';

    content.innerHTML = html;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeDetail = function (e) {
    if (e && e.target !== document.getElementById('rpt-overlay')) return;
    var overlay = document.getElementById('rpt-overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var overlay = document.getElementById('rpt-overlay');
      if (overlay && overlay.classList.contains('open')) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  // ================================
  //  1. LATEST SEASON
  // ================================
  function renderLatestSeason() {
    var ls = reportData.latestSeason;
    var panel = document.getElementById('panel-latest');
    if (!panel) return;

    var html = '';

    // Part 1 Accordions
    html += '<div class="rpt-section-header"><h2>🗣️ Part 1 Topics</h2>';
    html += '<p>' + ls.part1.length + ' confirmed topics for ' + ls.label + '. Tap to see real sample questions.</p></div>';
    html += '<div class="rpt-accordion">';
    ls.part1.forEach(function (t) {
      html += renderP1Accordion(t);
    });
    html += '</div>';

    // Part 2 Cue Cards — grouped by category
    html += '<div class="rpt-section-header" style="margin-top:var(--rpt-space-xl)"><h2>📋 Part 2 Cue Cards</h2>';
    html += '<p>' + ls.part2.length + ' full cue cards for ' + ls.label + '. Tap any card to see the complete prompt with bullets and explain lines.</p></div>';

    Object.keys(CAT_CONFIG).forEach(function (cat) {
      var items = ls.part2.filter(function (t) { return t.category === cat; });
      if (items.length === 0) return;
      var cfg = CAT_CONFIG[cat];
      html += '<div class="rpt-cat-heading">' + cfg.emoji + ' ' + cat + ' <span class="rpt-cat-count">' + items.length + '</span></div>';
      html += '<div class="rpt-cuecard-grid">';
      items.forEach(function (t) {
        html += renderCueCardSummary(t, cfg);
      });
      html += '</div>';
    });

    panel.innerHTML = html;
  }

  function renderP1Accordion(t) {
    var cat = (t.category || 'object').toLowerCase();
    var icon = cat === 'place' ? '📍' : cat === 'event' ? '🎬' : cat === 'people' ? '👥' : '📦';
    var html = '<div class="rpt-accordion-item">';
    html += '<div class="rpt-accordion-header" onclick="toggleAccordion(this)" role="button" tabindex="0" aria-expanded="false" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleAccordion(this)}">';
    html += '<div class="rpt-accordion-icon ' + cat + '">' + icon + '</div>';
    html += '<div class="rpt-accordion-title">' + esc(t.topic) + '</div>';
    html += '<div class="rpt-accordion-badges">';
    html += '<span class="rpt-accordion-tag ' + cat + '">' + (t.category || 'Object') + '</span>';
    if (t.frequency > 0) {
      html += '<span class="rpt-accordion-freq">' + t.frequency + '/7</span>';
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
      });
    }
    html += '</div></div></div>';
    return html;
  }

  // Card SUMMARY — topic appears ONCE. Click opens detail overlay.
  function renderCueCardSummary(t, cfg) {
    var ck = cfg.key;
    var key = storeCard({
      topic: t.topic,
      category: t.category,
      isNew: t.isNew,
      frequency: t.frequency,
      source: t.source,
      cueCard: t.cueCard
    });

    var hint = '';
    if (t.cueCard && t.cueCard.describe) {
      hint = t.cueCard.describe;
    }

    var html = '<div class="rpt-cuecard cat-' + ck + '" onclick="openDetailByKey(\'' + key + '\')" role="button" tabindex="0" aria-label="View details" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openDetailByKey(\'' + key + '\')}">';

    html += '<div class="rpt-cuecard-body">';
    html += '<div class="rpt-cuecard-topic">' + esc(t.topic) + '</div>';
    if (hint) {
      html += '<div class="rpt-cuecard-hint">' + esc(hint) + '</div>';
    }
    html += '</div>';

    html += '<div class="rpt-cuecard-footer">';
    html += '<span class="rpt-cuecard-tag ' + ck + '">' + (t.category || '') + '</span>';
    if (t.isNew) {
      html += '<span class="rpt-cuecard-new-badge">🆕 New</span>';
    }
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

    html += '<div class="rpt-section-header"><h2>🗣️ Part 1 — Top 20 Most Frequent</h2>';
    html += '<p>Ranked by number of season appearances (2024–2026).</p></div>';
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

    html += '<div class="rpt-section-header" style="margin-top:var(--rpt-space-2xl)"><h2>📋 Part 2 — Top 20 Most Frequent Cue Cards</h2>';
    html += '<p>Deduplicated across all 7 seasons.</p></div>';
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
  //  3. SEARCHABLE DATABASE
  // ================================
  function initSearchDatabase() {
    var panel = document.getElementById('panel-database');
    if (!panel) return;
    var ls = reportData.latestSeason;

    window._dbP1 = ls.part1.map(function (c) {
      return {
        topic: c.topic,
        category: c.category,
        isNew: c.isNew,
        frequency: c.frequency,
        type: 'part1',
        questions: c.questions,
        source: c.source
      };
    });

    window._dbP2 = ls.part2.map(function (c) {
      return {
        topic: c.topic,
        category: c.category,
        isNew: c.isNew,
        frequency: c.frequency,
        type: 'part2',
        cueCard: c.cueCard,
        source: c.source
      };
    });

    window._dbFilters = { search: '', category: 'all', type: 'all' };

    var html = '';
    html += '<div class="rpt-section-header"><h2>🔍 Search All Topics</h2>';
    html += '<p>Search across ' + (window._dbP1.length + window._dbP2.length) + ' topics. Tap any Part 2 card for the full cue card prompt.</p></div>';

    html += '<div class="rpt-search-wrap">';
    html += '<div class="rpt-search-row">';
    html += '<input type="text" class="rpt-search-input" id="db-search" placeholder="Search by topic name…" oninput="window.applyDbFilters()">';
    html += '<select class="rpt-filter-select" id="db-type" onchange="window.applyDbFilters()">';
    html += '<option value="all">All Types</option>';
    html += '<option value="part1">Part 1 Topics</option>';
    html += '<option value="part2">Part 2 Cue Cards</option>';
    html += '</select>';
    html += '</div>';
    html += '<div class="rpt-filter-chips" id="db-chips">';
    html += '<button class="rpt-filter-chip active" data-cat="all" onclick="window.setCategoryFilter(\'all\',this)">All</button>';
    html += '<button class="rpt-filter-chip" data-cat="People" onclick="window.setCategoryFilter(\'People\',this)">👥 People</button>';
    html += '<button class="rpt-filter-chip" data-cat="Places" onclick="window.setCategoryFilter(\'Places\',this)">📍 Places</button>';
    html += '<button class="rpt-filter-chip" data-cat="Events" onclick="window.setCategoryFilter(\'Events\',this)">🎬 Events</button>';
    html += '<button class="rpt-filter-chip" data-cat="Objects" onclick="window.setCategoryFilter(\'Objects\',this)">📦 Objects</button>';
    html += '</div>';
    html += '</div>';

    html += '<div class="rpt-results-count" id="db-count"><strong>' + (window._dbP1.length + window._dbP2.length) + '</strong> topics found</div>';
    html += '<div id="db-results"></div>';

    panel.innerHTML = html;
    renderDatabase();
  }

  window.setCategoryFilter = function (cat, el) {
    document.querySelectorAll('#db-chips .rpt-filter-chip').forEach(function (c) { c.classList.remove('active'); });
    if (el) el.classList.add('active');
    window._dbFilters.category = cat;
    window.applyDbFilters();
  };

  window.applyDbFilters = function () {
    var searchEl = document.getElementById('db-search');
    var typeEl = document.getElementById('db-type');
    window._dbFilters.search = (searchEl && searchEl.value || '').toLowerCase().trim();
    window._dbFilters.type = (typeEl && typeEl.value) || 'all';
    renderDatabase();
  };

  function renderDatabase() {
    var results = document.getElementById('db-results');
    var countEl = document.getElementById('db-count');
    if (!results) return;

    var f = window._dbFilters;
    var p1 = (window._dbP1 || []).slice();
    var p2 = (window._dbP2 || []).slice();

    if (f.type === 'part1') p2 = [];
    if (f.type === 'part2') p1 = [];

    if (f.search) {
      p1 = p1.filter(function (c) { return c.topic.toLowerCase().indexOf(f.search) !== -1; });
      p2 = p2.filter(function (c) { return c.topic.toLowerCase().indexOf(f.search) !== -1; });
    }

    if (f.category !== 'all') {
      p1 = p1.filter(function (c) { return c.category === f.category; });
      p2 = p2.filter(function (c) { return c.category === f.category; });
    }

    var total = p1.length + p2.length;
    if (countEl) {
      countEl.innerHTML = '<strong>' + total + '</strong> topic' + (total !== 1 ? 's' : '') + ' found';
    }

    if (total === 0) {
      results.innerHTML = '<div class="rpt-empty-search">No topics match your filters. Try different search terms or clear filters.</div>';
      return;
    }

    var html = '';

    if (p1.length > 0) {
      html += '<div class="rpt-cat-heading">🗣️ Part 1 Topics <span class="rpt-cat-count">' + p1.length + '</span></div>';
      html += '<div class="rpt-accordion">';
      p1.forEach(function (t) {
        html += renderP1Accordion(t);
      });
      html += '</div>';
    }

    if (p2.length > 0) {
      html += '<div class="rpt-cat-heading" style="margin-top:var(--rpt-space-lg)">📋 Part 2 Cue Cards <span class="rpt-cat-count">' + p2.length + '</span></div>';
      html += '<div class="rpt-cuecard-grid">';
      p2.forEach(function (t) {
        var cat = t.category || 'Objects';
        var cfg = CAT_CONFIG[cat] || CAT_CONFIG.Objects;
        html += renderCueCardSummary(t, cfg);
      });
      html += '</div>';
    }

    results.innerHTML = html;
  }

  // ================================
  //  4. INSIGHTS & METHODOLOGY
  // ================================
  function renderInsightsAndMethodology() {
    var section = document.getElementById('rpt-insights-section');
    if (!section) return;

    var insights = reportData.keyInsights;
    var recos = reportData.recommendations;
    var m = reportData.methodology;

    var html = '';

    html += '<div class="rpt-section-header" style="margin-top:var(--rpt-space-2xl)"><h2>💡 Key Insights</h2>';
    html += '<p>What the data reveals about IELTS Speaking question patterns across 7 seasons.</p></div>';
    html += '<div class="rpt-insights">';
    insights.forEach(function (ins, i) {
      html += '<div class="rpt-insight-card">';
      html += '<div class="rpt-insight-num">Insight ' + (i + 1) + '</div>';
      html += '<div class="rpt-insight-title">' + esc(ins.title) + '</div>';
      html += '<div class="rpt-insight-detail">' + esc(ins.detail) + '</div>';
      html += '</div>';
    });
    html += '</div>';

    html += '<div class="rpt-recos">';
    html += '<h3>📝 Recommendations for Teaching</h3><ul>';
    recos.forEach(function (r, i) {
      html += '<li><span class="rpt-reco-num">' + (i + 1) + '</span> ' + esc(r) + '</li>';
    });
    html += '</ul></div>';

    html += '<div class="rpt-methodology">';
    html += '<h4>📊 Methodology</h4>';
    html += '<div class="rpt-methodology-grid">';
    html += '<div class="rpt-method-item"><strong>PDFs processed</strong>' + m.pdfsProcessed + ' (1 failed)</div>';
    html += '<div class="rpt-method-item"><strong>Web sources</strong>' + m.webSources + ' cross-referenced</div>';
    html += '<div class="rpt-method-item"><strong>Languages</strong>' + (m.normalizedLanguages || []).join(' + ') + ' sources</div>';
    html += '<div class="rpt-method-item"><strong>Deduplication</strong>' + m.deduplication + '</div>';
    html += '<div class="rpt-method-item"><strong>Seasons analyzed</strong>' + m.seasonCount + '</div>';
    html += '</div></div>';

    html += '<div class="rpt-footer">Built with ⚡ RUA energy · IELTS with Kee · Research Report · ' + reportData.meta.generated + '</div>';

    section.innerHTML = html;
  }

  // ===== UTILITY =====
  function esc(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ===== INIT =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadData);
  } else {
    loadData();
  }
})();
