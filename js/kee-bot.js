/* ═══ KeeBot v3 — Unified AI Chat Widget for ielts.rkrk.io ═══ */
(function(){
  'use strict';

  // ── Config ──────────────────────────────────────
  var config = window.KeeBotConfig || {};
  var API = config.api || 'https://dynasaurus.rkrk.io/api/kee-bot';
  var userLang = (navigator.language || 'en').split('-')[0];
  var langMap = { zh: 'zh', ja: 'ja', ko: 'ko', fr: 'fr' };
  userLang = langMap[userLang] || 'en';

  var defaultWelcome = "Hey! 👋 I'm Kee's AI assistant. Kee is a TEDx Speaker, former EF Lead Trainer (CertTESOL), and creator of the R.U.A. learning method. He's trained 40+ students across 7 schools. I'm here to help you understand how Kee's coaching can boost your IELTS score — and get you booked for a free diagnostic session. Ask me anything!";
  var welcomeMsg = config.welcome || defaultWelcome;

  // Context sent with each message to guide the AI
  var systemContext = config.context ||
    'You are a sales assistant for Kee Lee, an IELTS coach. Kee is: TEDx Speaker (TEDxWangjiangSt 2026), former EF Education First Lead Trainer, CertTESOL-certified (Trinity College London), creator of the R.U.A. learning method and DynamOS cognitive learning OS, EdTech solopreneur who built DynaSaurus (AI language tutor in 11 languages) and 75+ interactive teaching tools, trained 40+ students across 7 institutions. Your job: be helpful about IELTS questions, but always guide the conversation toward booking a free diagnostic session with Kee. Mention his credentials naturally when relevant. Do not overshare personal details (no phone, address, age). Contact: WeChat keedahooman, WhatsApp +447440622158.';

  var open = false, loading = false, bannerShown = false, bannerTimerReady = false;
  var countdownTimer = null, tempExpires = null;

  // ── Check for temp access countdown ──────────────
  (function checkTempSession() {
    // Check from sessionStorage (set by auth.html after temp login)
    try {
      var ts = JSON.parse(sessionStorage.getItem('***') || '{}');
      if (ts.tempExpiresAt && Date.now() < ts.tempExpiresAt * 1000) {
        tempExpires = ts.tempExpiresAt * 1000;
      }
    } catch(e) {}
    // Also check API
    fetch('/api/auth/status').then(function(r){ return r.json(); }).then(function(d){
      if (d.logged_in && d.temp_expires_at) {
        tempExpires = d.temp_expires_at * 1000;
        try {
          sessionStorage.setItem('***', JSON.stringify({
            tempExpiresAt: d.temp_expires_at
          }));
        } catch(e) {}
        startCountdown();
      }
    }).catch(function(){});
  })();

  // ── Build DOM ────────────────────────────────────
  var wrapper = document.createElement('div');
  wrapper.innerHTML =
    '<div id="floatingDock" class="kb-dock">' +
      '<div id="dockBanner" class="kb-banner">' +
        '<span class="kb-banner-text">🎓 TEDx Speaker · EF Lead Trainer · 40+ students coached. Book your free IELTS diagnostic</span>' +
        '<button class="kb-banner-btn" onclick="window.openContact()">Let\'s Talk</button>' +
        '<button class="kb-banner-close" onclick="window.closeBanner()">×</button>' +
      '</div>' +
      '<div class="kb-chat-section">' +
        '<button id="kbTrigger" class="kb-trigger" onclick="window.toggleChat()">' +
          '<span class="kb-trigger-glow"></span>' +
          '<span class="kb-trigger-icon">🦄</span>' +
          '<span class="kb-trigger-label" id="kbTriggerLabel">Ask Kee\'s AI</span>' +
          '<span class="kb-countdown" id="kbCountdown" style="display:none"></span>' +
        '</button>' +
        '<div id="kbPanel" class="kb-panel" style="display:none">' +
          '<div class="kb-panel-header">' +
            '<div class="kb-panel-brand">' +
              '<span class="kb-panel-avatar">🦄</span>' +
              '<div>' +
                '<strong>IELTS with Kee AI</strong>' +
                '<span>Ask about IELTS, Speaking, or book a demo</span>' +
              '</div>' +
            '</div>' +
            '<button class="kb-panel-close" onclick="window.toggleChat()">×</button>' +
          '</div>' +
          '<div id="kbMessages" class="kb-messages">' +
            '<div class="kb-msg kb-msg-bot">' +
              '<span class="kb-msg-avatar">🦄</span>' +
              '<div class="kb-msg-content">' + welcomeMsg + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="kb-input-wrap">' +
            '<input type="text" id="kbInput" class="kb-input" placeholder="Ask anything about IELTS..." onkeydown="window.handleChatKey(event)" />' +
            '<button class="kb-send" onclick="window.sendChat()">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    // Contact modal
    '<div id="contactOverlay" class="kb-contact-overlay" onclick="window.closeContact(event)">' +
      '<div class="kb-contact-modal" onclick="event.stopPropagation()">' +
        '<button class="kb-contact-close" onclick="window.closeContact()">×</button>' +
        '<h3>📬 Reach Kee</h3>' +
        '<p class="kb-contact-sub">Book a demo class, ask about coaching, or just say hi.</p>' +
        '<div class="kb-contact-options">' +
          '<a href="https://wa.me/447440622158" target="_blank" class="kb-contact-card kb-contact-wa">' +
            '<span class="kb-contact-icon">💬</span>' +
            '<div><strong>WhatsApp</strong><span>+44 7440 622158</span></div>' +
          '</a>' +
          '<div class="kb-contact-card kb-contact-wx" onclick="window.copyWechat()">' +
            '<span class="kb-contact-icon">💚</span>' +
            '<div><strong>WeChat</strong><span>keedahooman</span></div>' +
            '<span class="kb-contact-copy" id="wxCopy">📋 Copy</span>' +
          '</div>' +
        '</div>' +
        '<p class="kb-contact-footer">Usually replies within a few hours ✌️</p>' +
      '</div>' +
    '</div>';
  document.body.appendChild(wrapper);

  // ── Global functions ────────────────────────────
  window.toggleChat = function() {
    open = !open;
    var panel = document.getElementById('kbPanel');
    var trigger = document.getElementById('kbTrigger');
    panel.style.display = open ? 'flex' : 'none';
    trigger.classList.toggle('active', open);
    if (open) setTimeout(function() { document.getElementById('kbInput').focus(); }, 400);
  };

  window.closeBanner = function() {
    document.getElementById('dockBanner').classList.add('hidden');
  };

  window.openContact = function() {
    document.getElementById('contactOverlay').classList.add('open');
  };

  window.closeContact = function(e) {
    if (e && e.target !== document.getElementById('contactOverlay')) return;
    document.getElementById('contactOverlay').classList.remove('open');
  };

  window.copyWechat = function() {
    navigator.clipboard.writeText('keedahooman').then(function() {
      var el = document.getElementById('wxCopy');
      el.textContent = '✓ Copied!';
      el.classList.add('copied');
      setTimeout(function() { el.textContent = '📋 Copy'; el.classList.remove('copied'); }, 2000);
    }).catch(function() { alert('WeChat ID: keedahooman'); });
  };

  window.handleChatKey = function(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); window.sendChat(); }
  };

  window.sendChat = async function() {
    if (loading) return;
    var input = document.getElementById('kbInput');
    var msg = input.value.trim();
    if (!msg) return;
    input.value = '';
    loading = true;

    var msgsDiv = document.getElementById('kbMessages');
    msgsDiv.innerHTML += '<div class="kb-msg kb-msg-user"><div class="kb-msg-content">' + esc(msg) + '</div></div>';
    msgsDiv.innerHTML += '<div class="kb-msg kb-msg-bot kb-typing" id="typingMsg"><span class="kb-msg-avatar">🦄</span><div class="kb-msg-content">Thinking…</div></div>';
    msgsDiv.scrollTop = msgsDiv.scrollHeight;

    try {
      var res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, lang: userLang, context: systemContext }),
      });
      var data = await res.json();
      var typing = document.getElementById('typingMsg');
      if (typing) typing.remove();
      msgsDiv.innerHTML += '<div class="kb-msg kb-msg-bot"><span class="kb-msg-avatar">🦄</span><div class="kb-msg-content md-output">' + renderMd(data.reply || 'Sorry, I couldn\'t connect. Try WhatsApp: +447440622158') + '</div></div>';
    } catch (e) {
      var typing2 = document.getElementById('typingMsg');
      if (typing2) typing2.remove();
      msgsDiv.innerHTML += '<div class="kb-msg kb-msg-bot"><span class="kb-msg-avatar">🦄</span><div class="kb-msg-content">Sorry, I couldn\'t connect. WhatsApp Kee directly: <strong>+447440622158</strong></div></div>';
    }
    msgsDiv.scrollTop = msgsDiv.scrollHeight;
    loading = false;
  };

  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function renderMd(text) {
    if (!text) return '';
    var t = esc(text);
    t = t.replace(/^### (.+)$/gm, '<h4 style="font-size:14px;font-weight:700;margin:8px 0 4px;color:#e8e8f0">$1</h4>');
    t = t.replace(/^## (.+)$/gm, '<h3 style="font-size:15px;font-weight:700;margin:10px 0 4px;color:#e8e8f0">$1</h3>');
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/\*(.+?)\*/g, '<em>$1</em>');
    t = t.replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.08);padding:1px 5px;border-radius:4px;font-size:12px">$1</code>');
    t = t.replace(/^- (.+)$/gm, '<li style="margin-left:16px;list-style:disc">$1</li>');
    t = t.replace(/\d+\. (.+)$/gm, '<li style="margin-left:16px;list-style:decimal">$1</li>');
    t = t.replace(/\n\n/g, '<br><br>');
    t = t.replace(/\n/g, '<br>');
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:#b77ae0;text-decoration:underline">$1</a>');
    return t;
  }

  // ── Countdown ────────────────────────────────────
  function startCountdown() {
    if (!tempExpires) return;
    var label = document.getElementById('kbTriggerLabel');
    var cd = document.getElementById('kbCountdown');
    var trigger = document.getElementById('kbTrigger');
    trigger.classList.add('kb-temp');

    function tick() {
      var remaining = tempExpires - Date.now();
      if (remaining <= 0) {
        cd.style.display = 'none';
        label.textContent = 'Ask Kee\'s AI';
        trigger.classList.remove('kb-temp');
        clearInterval(countdownTimer);
        return;
      }
      cd.style.display = 'inline';
      var mins = Math.floor(remaining / 60000);
      var secs = Math.floor((remaining % 60000) / 1000);
      cd.textContent = (mins > 0 ? mins + 'm ' : '') + secs + 's';
    }
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  // ── Banner timing ────────────────────────────────
  setTimeout(function() { bannerTimerReady = true; tryShowBanner(); }, 30000);
  window.addEventListener('scroll', function() {
    if (bannerTimerReady && !bannerShown) {
      bannerShown = true;
      document.getElementById('dockBanner').classList.add('visible');
    }
  }, { once: false, passive: true });
  function tryShowBanner() {
    if (bannerShown || !bannerTimerReady) return;
    if (window.scrollY > 100) {
      bannerShown = true;
      document.getElementById('dockBanner').classList.add('visible');
    }
  }

})();
