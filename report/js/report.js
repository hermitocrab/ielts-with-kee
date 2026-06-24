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
    renderBikaoPanel();
    renderInsightsAndMethodology();
  }

  // Store card data and return a safe key for onclick
  function storeCard(data) {
    var key = 'd' + (++detailSeq);
    detailStore[key] = data;
    return key;
  }

  // Convert frequency (0-7) to Chinese tag
  function freqTag(freq) {
    if (freq >= 7) return '<span class="rpt-freq-extreme">极高</span>';
    if (freq >= 5) return '<span class="rpt-freq-high">高</span>';
    return '';
  }
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
      var ft = freqTag(cardData.frequency);
      if (ft) html += ft;
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

    // Sort helpers
    function topicRank(t) {
      if (t.isNew) return 1;           // NEW first
      var f = t.frequency || 0;
      if (f >= 7) return 2;           // 极高
      if (f >= 5) return 3;           // 高
      return 4;                       // rest
    }

    // Filter chips
    html += '<div class="rpt-filter-chips" style="margin-bottom:var(--rpt-space-lg)" id="latest-filters">';
    html += '<button class="rpt-filter-chip active" data-freq="all" onclick="latestFilter(\'all\',this)">All</button>';
    html += '<button class="rpt-filter-chip" data-freq="new" onclick="latestFilter(\'new\',this)">🆕 New</button>';
    html += '<button class="rpt-filter-chip" data-freq="jigao" onclick="latestFilter(\'jigao\',this)">🔥 极高</button>';
    html += '<button class="rpt-filter-chip" data-freq="gao" onclick="latestFilter(\'gao\',this)">📈 高</button>';
    html += '</div>';

    // Sort both arrays by rank
    var p1Sorted = ls.part1.slice().sort(function(a,b){ return topicRank(a)-topicRank(b); });
    var p2Sorted = ls.part2.slice().sort(function(a,b){ return topicRank(a)-topicRank(b); });

    // Store for filter access
    window._latestP1 = p1Sorted;
    window._latestP2 = p2Sorted;

    // Part 1 Accordions
    html += '<div class="rpt-section-header"><h2>🗣️ Part 1 Topics</h2>';
    html += '<p>' + ls.part1.length + ' confirmed topics for ' + ls.label + '. Tap to see real sample questions.</p></div>';
    html += '<div class="rpt-accordion" id="latest-p1-accordion">';
    p1Sorted.forEach(function (t) {
      html += renderP1Accordion(t);
    });
    html += '</div>';

    // Part 2 Cue Cards — grouped by category
    html += '<div class="rpt-section-header" style="margin-top:var(--rpt-space-xl)"><h2>📋 Part 2 Cue Cards</h2>';
    html += '<p>' + ls.part2.length + ' full cue cards for ' + ls.label + '. Tap any card to see the complete prompt with bullets and explain lines.</p></div>';

    Object.keys(CAT_CONFIG).forEach(function (cat) {
      var items = p2Sorted.filter(function (t) { return t.category === cat; });
      if (items.length === 0) return;
      var cfg = CAT_CONFIG[cat];
      html += '<div class="rpt-cat-heading" id="latest-cat-' + cfg.key + '">' + cfg.emoji + ' ' + cat + ' <span class="rpt-cat-count">' + items.length + '</span></div>';
      html += '<div class="rpt-cuecard-grid" id="latest-grid-' + cfg.key + '">';
      items.forEach(function (t) {
        html += renderCueCardSummary(t, cfg, '');
      });
      html += '</div>';
    });

    panel.innerHTML = html;

    // Wire up the filter function
    window.latestFilter = function(freq, el) {
      document.querySelectorAll('#latest-filters .rpt-filter-chip').forEach(function(c){c.classList.remove('active');});
      if (el) el.classList.add('active');

      document.querySelectorAll('.rpt-accordion-item').forEach(function(item){
        var tFreq = parseInt(item.getAttribute('data-freq')||'0');
        var tNew = item.getAttribute('data-new') === '1';
        if (freq === 'all') { item.style.display = ''; }
        else if (freq === 'new') { item.style.display = tNew ? '' : 'none'; }
        else if (freq === 'jigao') { item.style.display = (!tNew && tFreq >= 7) ? '' : 'none'; }
        else if (freq === 'gao') { item.style.display = (!tNew && tFreq >= 5 && tFreq < 7) ? '' : 'none'; }
      });
      document.querySelectorAll('.rpt-cuecard').forEach(function(card){
        var tFreq = parseInt(card.getAttribute('data-freq')||'0');
        var tNew = card.getAttribute('data-new') === '1';
        if (freq === 'all') { card.style.display = ''; }
        else if (freq === 'new') { card.style.display = tNew ? '' : 'none'; }
        else if (freq === 'jigao') { card.style.display = (!tNew && tFreq >= 7) ? '' : 'none'; }
        else if (freq === 'gao') { card.style.display = (!tNew && tFreq >= 5 && tFreq < 7) ? '' : 'none'; }
      });
    };
  }

  // Highlight search terms — highlight raw text, then escape around marks
  function hl(text, query) {
    if (!query || !text) return esc(text);
    var q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var re = new RegExp(q, 'gi');
    var matches = [];
    var m;
    while ((m = re.exec(text)) !== null) {
      matches.push({ idx: m.index, len: m[0].length });
    }
    if (matches.length === 0) return esc(text);
    var out = '';
    var prev = 0;
    for (var i = 0; i < matches.length; i++) {
      out += esc(text.slice(prev, matches[i].idx));
      out += '<mark class="rpt-hl">' + esc(text.slice(matches[i].idx, matches[i].idx + matches[i].len)) + '</mark>';
      prev = matches[i].idx + matches[i].len;
    }
    out += esc(text.slice(prev));
    return out;
  }

  function renderP1Accordion(t, query) {
    var cat = (t.category || 'object').toLowerCase();
    var icon = cat === 'place' ? '📍' : cat === 'event' ? '🎬' : cat === 'people' ? '👥' : '📦';
    var html = '<div class="rpt-accordion-item" data-freq="' + (t.frequency||0) + '" data-new="' + (t.isNew?'1':'0') + '">';
    html += '<div class="rpt-accordion-header" onclick="toggleAccordion(this)" role="button" tabindex="0" aria-expanded="false" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleAccordion(this)}">';
    html += '<div class="rpt-accordion-icon ' + cat + '">' + icon + '</div>';
    html += '<div class="rpt-accordion-title">' + hl(t.topic, query||'') + '</div>';
    html += '<div class="rpt-accordion-badges">';
    html += '<span class="rpt-accordion-tag ' + cat + '">' + (t.category || 'Object') + '</span>';
    if (t.frequency > 0) {
      var ft = freqTag(t.frequency);
      if (ft) html += ft;
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
        html += '<div class="rpt-accordion-question"><span class="rpt-accordion-qnum">' + (i + 1) + '</span><span>' + hl(q, query||'') + '</span></div>';
      });
    }
    html += '</div></div></div>';
    return html;
  }

  // Card SUMMARY — topic appears ONCE. Click opens detail overlay.
  function renderCueCardSummary(t, cfg, query) {
    var ck = cfg.key;
    var key = storeCard({
      topic: t.topic,
      category: t.category,
      isNew: t.isNew,
      frequency: t.frequency,
      cueCard: t.cueCard
    });

    var hint = '';
    if (t.cueCard && t.cueCard.describe) {
      hint = t.cueCard.describe;
    }

    var html = '<div class="rpt-cuecard cat-' + ck + '" data-freq="' + (t.frequency||0) + '" data-new="' + (t.isNew?'1':'0') + '" onclick="openDetailByKey(\'' + key + '\')" role="button" tabindex="0" aria-label="View details" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();openDetailByKey(\'' + key + '\')}">';

    html += '<div class="rpt-cuecard-body">';
    html += '<div class="rpt-cuecard-topic">' + hl(t.topic, query||'') + '</div>';
    if (hint) {
      html += '<div class="rpt-cuecard-hint">' + hl(hint, query||'') + '</div>';
    }
    html += '</div>';

    html += '<div class="rpt-cuecard-footer">';
    html += '<span class="rpt-cuecard-tag ' + ck + '">' + (t.category || '') + '</span>';
    if (t.isNew) {
      html += '<span class="rpt-cuecard-new-badge">🆕 New</span>';
    }
    if (t.frequency > 0) {
      var ft = freqTag(t.frequency);
      if (ft) html += ft;
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
    var ls = reportData.latestSeason;

    html += '<div class="rpt-section-header"><h2>🗣️ Part 1 — Top 20 Most Frequent</h2>';
    html += '<p>Ranked by number of season appearances (2024–2026). Tap any row to see questions.</p></div>';
    html += '<div class="rpt-accordion">';
    at.part1.forEach(function (row) {
      // Find questions: check allTime row first, then fall back to latestSeason
      var questions = row.questions || [];
      if (questions.length === 0) {
        var match = ls.part1.find(function (p) { return p.topic === row.topic; });
        questions = match && match.questions ? match.questions : [];
      }
      html += '<div class="rpt-accordion-item">';
      html += '<div class="rpt-accordion-header rpt-rank-header" onclick="toggleAccordion(this)" role="button" tabindex="0" aria-expanded="false" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleAccordion(this)}">';
      html += '<div class="rpt-rank-row">';
      html += '<span class="rpt-rank-topic">' + esc(row.topic) + '</span>';
      html += '<span class="rpt-rank-type"><span class="type-tag ' + row.type.toLowerCase() + '">' + row.type + '</span></span>';
      html += '<span class="rpt-accordion-arrow">▼</span>';
      html += '</div>';
      html += '</div>';
      html += '<div class="rpt-accordion-body"><div class="rpt-accordion-content">';
      if (questions.length > 0) {
        questions.forEach(function (q, i) {
          html += '<div class="rpt-accordion-question"><span class="rpt-accordion-qnum">' + (i + 1) + '</span><span>' + esc(q) + '</span></div>';
        });
      } else {
        html += '<div class="rpt-accordion-question" style="color:var(--rpt-text-muted);font-style:italic">No sample questions available yet.</div>';
      }
      html += '</div></div></div>';
    });
    html += '</div>';

    html += '<div class="rpt-section-header" style="margin-top:var(--rpt-space-2xl)"><h2>📋 Part 2 — Top 20 Most Frequent Cue Cards</h2>';
    html += '<p>Deduplicated across all 7 seasons. Tap any row to see cue card details.</p></div>';
    html += '<div class="rpt-accordion">';
    at.part2.forEach(function (row) {
      var cueCard = row.cueCard || null;
      if (!cueCard) {
        var match = ls.part2.find(function (p) { return p.topic === row.topic; });
        cueCard = match && match.cueCard ? match.cueCard : null;
      }
      html += '<div class="rpt-accordion-item">';
      html += '<div class="rpt-accordion-header rpt-rank-header" onclick="toggleAccordion(this)" role="button" tabindex="0" aria-expanded="false" onkeydown="if(event.key===\'Enter\'||event.key===\' \'){event.preventDefault();toggleAccordion(this)}">';
      html += '<div class="rpt-rank-row">';
      html += '<span class="rpt-rank-topic">' + esc(row.topic) + '</span>';
      html += '<span class="rpt-accordion-arrow">▼</span>';
      html += '</div>';
      html += '</div>';
      html += '<div class="rpt-accordion-body"><div class="rpt-accordion-content">';
      if (cueCard) {
        html += '<div style="margin-bottom:8px;font-weight:600">' + esc(cueCard.describe || '') + '</div>';
        if (cueCard.bullets && cueCard.bullets.length > 0) {
          cueCard.bullets.forEach(function (b) {
            html += '<div class="rpt-accordion-question">• ' + esc(b) + '</div>';
          });
        }
        if (cueCard.explain) {
          html += '<div class="rpt-accordion-question" style="color:var(--rpt-text-muted);margin-top:8px">💡 ' + esc(cueCard.explain) + '</div>';
        }
      } else {
        html += '<div class="rpt-accordion-question" style="color:var(--rpt-text-muted);font-style:italic">Full cue card not yet available. Tap on the Latest Season tab to find it.</div>';
      }
      html += '</div></div></div>';
    });
    html += '</div>';

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
      p1 = p1.filter(function (c) {
        if (c.topic.toLowerCase().indexOf(f.search) !== -1) return true;
        // Also search within questions
        var qs = c.questions || [];
        for (var i = 0; i < qs.length; i++) {
          if (qs[i].toLowerCase().indexOf(f.search) !== -1) return true;
        }
        return false;
      });
      p2 = p2.filter(function (c) {
        if (c.topic.toLowerCase().indexOf(f.search) !== -1) return true;
        // Also search within cue card content
        var cc = c.cueCard;
        if (cc) {
          if (cc.describe && cc.describe.toLowerCase().indexOf(f.search) !== -1) return true;
          var bullets = cc.bullets || [];
          for (var j = 0; j < bullets.length; j++) {
            if (bullets[j].toLowerCase().indexOf(f.search) !== -1) return true;
          }
        }
        return false;
      });
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
    var query = f.search;

    if (p1.length > 0) {
      html += '<div class="rpt-cat-heading">🗣️ Part 1 Topics <span class="rpt-cat-count">' + p1.length + '</span></div>';
      html += '<div class="rpt-accordion">';
      p1.forEach(function (t) {
        html += renderP1Accordion(t, query);
      });
      html += '</div>';
    }

    if (p2.length > 0) {
      html += '<div class="rpt-cat-heading" style="margin-top:var(--rpt-space-lg)">📋 Part 2 Cue Cards <span class="rpt-cat-count">' + p2.length + '</span></div>';
      html += '<div class="rpt-cuecard-grid">';
      p2.forEach(function (t) {
        var cat = t.category || 'Objects';
        var cfg = CAT_CONFIG[cat] || CAT_CONFIG.Objects;
        html += renderCueCardSummary(t, cfg, query);
      });
      html += '</div>';
    }

    results.innerHTML = html;
  }

  // ================================
  //  4. 必考题 PANEL
  // ================================
  function renderBikaoPanel() {
    var panel = document.getElementById('panel-bikao');
    if (!panel) return;
    var bk = reportData.bikao;
    if (!bk || !bk.length) return;

    var html = '';
    html += '<div class="rpt-hero" style="background:linear-gradient(135deg,rgba(229,57,53,0.12),rgba(255,107,107,0.06));border-left:4px solid #E53935;">';
    html += '<h1>🔥 Part 1 必考题</h1>';
    html += '<p class="rpt-hero-desc">These 4 topics appear in <strong>every single IELTS Speaking test.</strong> Master them first — they are your foundation. Hometown, Work/Study, Home, and Your Local Area. Predictable. Essential. Non-negotiable.</p>';
    html += '<div class="rpt-hero-stats">';
    html += '<div class="rpt-hero-stat"><div class="rpt-hero-stat-num">4</div><div class="rpt-hero-stat-label">Core Topics</div></div>';
    html += '<div class="rpt-hero-stat"><div class="rpt-hero-stat-num">100%</div><div class="rpt-hero-stat-label">Appearance Rate</div></div>';
    html += '<div class="rpt-hero-stat"><div class="rpt-hero-stat-num">16</div><div class="rpt-hero-stat-label">Common Questions</div></div>';
    html += '</div></div>';

    bk.forEach(function(t, idx) {
      html += '<div class="rpt-section-header" style="margin-top:var(--rpt-space-xl)"><h2>' + esc(t.topic) + '</h2>';
      html += '<p><span class="rpt-cat-count" style="background:#E53935;color:#fff;">' + esc(t.frequency) + '</span> ' + esc(t.category) + '</p></div>';

      // Questions
      html += '<div style="margin-bottom:20px;"><strong style="color:var(--rpt-accent);">📋 Common Questions:</strong><ul style="list-style:none;padding:0;margin:10px 0;">';
      t.questions.forEach(function(q) {
        html += '<li style="padding:8px 12px;margin:6px 0;background:var(--rpt-card-bg);border-radius:8px;border-left:3px solid #E53935;">' + esc(q) + '</li>';
      });
      html += '</ul></div>';

      // Key Vocab
      html += '<div style="margin-bottom:20px;"><strong style="color:var(--rpt-accent);">📝 Key Vocabulary:</strong>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;">';
      t.keyVocab.forEach(function(v) {
        html += '<span style="background:rgba(229,57,53,0.1);color:#E53935;padding:4px 12px;border-radius:20px;font-size:0.85rem;font-weight:500;">' + esc(v) + '</span>';
      });
      html += '</div></div>';

      // Model Answers
      if (t.modelAnswers && t.modelAnswers.length) {
        html += '<div><strong style="color:var(--rpt-accent);">🗣️ Model Answers:</strong>';
        t.modelAnswers.forEach(function(ma) {
          html += '<div style="margin:12px 0;padding:16px;background:var(--rpt-card-bg);border-radius:12px;border:1px solid var(--rpt-border);">';
          html += '<div style="font-weight:700;color:var(--rpt-accent);margin-bottom:6px;">Q: ' + esc(ma.q) + '</div>';
          html += '<div style="color:var(--rpt-text);line-height:1.7;">' + esc(ma.a) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }
    });

    panel.innerHTML = html;
  }
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
    html += '<div class="rpt-method-item"><strong>Seasons analysed</strong>' + m.seasonCount + '</div>';
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

// ═══ SIDEBAR JUMP ═══
window.jumpToPart = function(part) {
  var panel = document.querySelector('.rpt-panel.active');
  if (!panel) panel = document.getElementById('panel-latest');
  if (!panel) return;
  var target = panel.querySelector(part === 'p1' ? '.rpt-section-header' : '.rpt-cat-heading');
  if (!target && part === 'p2') target = panel.querySelector('.rpt-cuecard-grid');
  if (!target && part === 'p2') target = panel.querySelector('.rpt-accordion');
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.copyWechat = function() {
  var wechatId = 'keedahooman';
  navigator.clipboard.writeText(wechatId).then(function() {
    showCopyToast('✅ Copied: ' + wechatId);
  }).catch(function() {
    showCopyToast('📋 WeChat ID: ' + wechatId);
  });
};


// ═══ SIDEBAR: Switch tab + scroll to top ═══
window.switchAndScroll = function(tabName, el) {
  switchReportTab(tabName, el);
  // Scroll to top of the panel
  var panel = document.getElementById('panel-' + tabName);
  if (panel) {
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
window.openWhatsApp = function() {
  window.open('https://wa.me/447440622158', '_blank');
};

function showCopyToast(msg) {
  var t = document.createElement('div');
  t.className = 'rpt-copy-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function() { t.remove(); }, 2500);
}
