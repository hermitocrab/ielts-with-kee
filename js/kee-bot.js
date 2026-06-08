/* ═══ KeeBot v2 — Lightweight Chat Widget for ielts.rkrk.io ═══ */
(function(){
  'use strict';

  var API = '/api/keebot';
  var open = false;
  var history = [];

  // Detect user's system language
  var userLang = (navigator.language || 'en').split('-')[0];
  var langMap = { zh: 'zh', ja: 'ja', ko: 'ko', fr: 'fr' };
  userLang = langMap[userLang] || 'en';

  // Localized welcome messages
  var welcomeMsg = {
    en: "Hi! I'm KeeBot — Kee's AI teaching assistant. Ask me anything about IELTS, and if you ever need personal coaching, Kee's just a message away. 👋",
    zh: "你好！我是KeeBot，Kee的AI教学助手。雅思相关的问题随时问我，需要一对一辅导的话，Kee就在微信等你。👋",
    ja: "こんにちは！KeeBotです。KeeのAIアシスタントです。IELTSについて何でも聞いてください。パーソナルコーチングが必要なら、Keeに直接メッセージを。👋",
    ko: "안녕하세요! KeeBot입니다 — Kee의 AI 어시스턴트예요. IELTS에 대해 무엇이든 물어보세요. 개인 코칭이 필요하시면 Kee에게 직접 연락하세요. 👋",
    fr: "Salut ! Je suis KeeBot, l'assistant IA de Kee. Demande-moi ce que tu veux sur l'IELTS, et si tu as besoin de coaching personnalisé, Kee est à portée de message. 👋"
  };

  // ═══ BUILD DOM ═══
  var wrapper = document.createElement('div');
  wrapper.id = 'kee-bot';
  wrapper.innerHTML =
    '<button class="kb-fab" id="kbFab"><span class="kb-chat-icon">💬</span><span class="kb-close-icon">✕</span></button>' +
    '<div class="kb-panel" id="kbPanel">' +
      '<div class="kb-header">' +
        '<h3>🦄 KeeBot</h3>' +
        '<div class="kb-header-actions">' +
          '<button class="kb-btn kb-btn-bug" id="kbBugBtn">🐛 Bug</button>' +
          '<button class="kb-btn kb-btn-clear" id="kbClearBtn">Clear</button>' +
        '</div>' +
      '</div>' +
      '<div class="kb-messages" id="kbMessages">' +
        '<div class="kb-welcome">' +
          '<div class="kb-w-icon">🦄</div>' +
          '<p>' + (welcomeMsg[userLang] || welcomeMsg.en) + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="kb-input-wrap">' +
        '<input type="text" id="kbInput" placeholder="Ask KeeBot..." maxlength="500">' +
        '<button id="kbSend">➤</button>' +
      '</div>' +
      '<div class="kb-bug-modal" id="kbBugModal">' +
        '<div class="kb-bug-form">' +
          '<h4>🐛 Report a Bug</h4>' +
          '<p>What went wrong? Kee will get notified.</p>' +
          '<textarea id="kbBugText" placeholder="Describe the issue..."></textarea>' +
          '<div class="kb-bug-actions">' +
            '<button class="kb-btn-cancel" id="kbBugCancel">Cancel</button>' +
            '<button class="kb-btn-submit" id="kbBugSubmit">Send Report</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(wrapper);

  // ═══ REFS ═══
  var fab = document.getElementById('kbFab');
  var panel = document.getElementById('kbPanel');
  var msgEl = document.getElementById('kbMessages');
  var input = document.getElementById('kbInput');
  var sendBtn = document.getElementById('kbSend');
  var bugBtn = document.getElementById('kbBugBtn');
  var bugModal = document.getElementById('kbBugModal');
  var bugText = document.getElementById('kbBugText');
  var clearBtn = document.getElementById('kbClearBtn');

  // Load history from localStorage
  try {
    var saved = localStorage.getItem('keebot_v2_history');
    if (saved) history = JSON.parse(saved);
  } catch(e) {}

  // ═══ TOGGLE ═══
  fab.addEventListener('click', function(){
    open = !open;
    fab.classList.toggle('open', open);
    panel.classList.toggle('open', open);
    if (open) {
      input.focus();
      if (history.length > 0) renderHistory();
    }
  });

  function renderHistory() {
    var welcome = msgEl.querySelector('.kb-welcome');
    if (welcome) welcome.remove();
    msgEl.innerHTML = '';
    history.forEach(function(m) { addMessage(m.role, m.content); });
  }

  // ═══ SEND MESSAGE ═══
  function sendMessage(){
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage('user', text);
    history.push({ role: 'user', content: text });
    saveHistory();
    showTyping();
    input.disabled = true;
    sendBtn.disabled = true;

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: history.slice(0, -1), lang: userLang })
    }).then(function(r) { return r.json(); }).then(function(data) {
      hideTyping();
      var reply = data.reply || 'Hmm, I had some trouble. Try again?';
      addMessage('assistant', reply);
      history.push({ role: 'assistant', content: reply });
      saveHistory();
      // Log to Supabase (best-effort)
      logToSupabase('assistant', reply);
      input.disabled = false;
      sendBtn.disabled = false;
    }).catch(function() {
      hideTyping();
      addMessage('assistant', '⚠️ Connection hiccup. Try again?');
      input.disabled = false;
      sendBtn.disabled = false;
    });
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function(e){ if (e.key==='Enter') sendMessage(); });

  // ═══ SAVE HISTORY ═══
  function saveHistory() {
    if (history.length > 20) history = history.slice(-20);
    try { localStorage.setItem('keebot_v2_history', JSON.stringify(history)); } catch(e) {}
  }

  // ═══ UI ═══
  function addMessage(role, text) {
    var welcome = msgEl.querySelector('.kb-welcome');
    if (welcome) welcome.remove();
    var div = document.createElement('div');
    div.className = 'kb-msg kb-msg-' + role;
    div.textContent = text;
    msgEl.appendChild(div);
    msgEl.scrollTop = msgEl.scrollHeight;
  }

  function showTyping() {
    var existing = msgEl.querySelector('.kb-typing');
    if (existing) return;
    var div = document.createElement('div');
    div.className = 'kb-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgEl.appendChild(div);
    msgEl.scrollTop = msgEl.scrollHeight;
  }

  function hideTyping() {
    var el = msgEl.querySelector('.kb-typing');
    if (el) el.remove();
  }

  // ═══ BUG REPORT ═══
  bugBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    bugModal.classList.add('open');
    bugText.focus();
  });

  document.getElementById('kbBugCancel').addEventListener('click', function() {
    bugModal.classList.remove('open');
    bugText.value = '';
  });

  document.getElementById('kbBugSubmit').addEventListener('click', function() {
    var desc = bugText.value.trim();
    if (!desc) return;
    addMessage('system', '✅ Bug reported: "' + desc + '". Kee will look into it. Thanks!');
    bugModal.classList.remove('open');
    bugText.value = '';
    showToast('🐛 Bug reported — thank you!');
  });

  bugModal.addEventListener('click', function(e) {
    if (e.target === bugModal) { bugModal.classList.remove('open'); bugText.value = ''; }
  });

  // ═══ CLEAR ═══
  clearBtn.addEventListener('click', function() {
    history = [];
    try { localStorage.removeItem('keebot_v2_history'); } catch(e) {}
    var clearMsg = { en: 'Chat cleared. Ask me anything!', zh: '聊天已清空，继续问我吧！', ja: 'チャットをクリアしました。何でも聞いてください！', ko: '채팅이 지워졌어요. 무엇이든 물어보세요!', fr: 'Chat effacé. Demande-moi ce que tu veux !' };
    msgEl.innerHTML = '<div class="kb-welcome"><div class="kb-w-icon">🦄</div><p>' + (clearMsg[userLang] || clearMsg.en) + '</p></div>';
  });

  // ═══ TOAST ═══
  function showToast(msg) {
    var t = document.createElement('div');
    t.className = 'kb-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function() { t.remove(); }, 3000);
  }

  // ═══ SUPABASE LOGGING (analytics) ═══
  var SUPABASE_URL = 'https://qflaflwkzdxuhqekhxos.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmbGFmbHdremR4dWhxZWtoeG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMTE5NjQsImV4cCI6MjA5NDU4Nzk2NH0.55PLTeZofzb6Yyyw3mhZDDnOs14NILMTr352rOWvBGk';
  var SUPABASE_ENABLED = false; // auto-detected

  function logToSupabase(role, content) {
    if (!SUPABASE_ENABLED) return;
    var page = location.pathname.replace(/^\//,'').replace(/\.html$/,'') || 'home';
    fetch(SUPABASE_URL + '/rest/v1/keebot_messages', {
      method: 'POST',
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ session_id: 'kb2_' + Date.now(), page: page, role: role, content: content, status: 'done' })
    }).catch(function(){});
  }

  // Detect if Supabase is reachable
  fetch(SUPABASE_URL + '/rest/v1/', { method: 'HEAD', headers: { 'apikey': SUPABASE_KEY } })
    .then(function(r){ if (r.ok) { SUPABASE_ENABLED = true; console.log('KeeBot: Supabase logging enabled'); } })
    .catch(function(){});

})();