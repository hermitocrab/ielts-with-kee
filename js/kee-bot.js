/* ═══ KeeBot — AI Chat Widget for ielts.rkrk.io ═══ */
(function(){
  'use strict';

  var SUPABASE_URL = 'https://areedjmpngwzocqpoaur.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZWVkam1wbmd3em9jcXBvYXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5ODAwMTgsImV4cCI6MjA5MjU1NjAxOH0.CSHpruDqBm4mbKseySbbOlZk2-uBG2Oxe4DvqwTVFJ8';

  var PAGE = location.pathname.replace(/^\//,'').replace(/\.html$/,'') || 'home';
  var SESSION = localStorage.getItem('keebot_session') || 'kb_' + Date.now() + '_' + Math.random().toString(36).slice(2,8);
  localStorage.setItem('keebot_session', SESSION);

  var open = false;
  var messages = [];
  var pollingTimer = null;
  var lastMsgId = null;

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
          '<p>Hi! Ask me anything about IELTS speaking, writing, grammar, or these practice pages.</p>' +
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

  // ═══ TOGGLE ═══
  fab.addEventListener('click', function(){
    open = !open;
    fab.classList.toggle('open', open);
    panel.classList.toggle('open', open);
    if (open) { input.focus(); loadHistory(); }
  });

  // ═══ SEND MESSAGE ═══
  function sendMessage(){
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage('user', text);
    saveMessage('user', text, false);
    showTyping();
    input.disabled = true;
    sendBtn.disabled = true;
    lastMsgId = null;

    // Check for bug report keywords
    var isBug = /\bbug\b|\bissue\b|\berror\b|\bbroken\b|\bdoesn'?t work\b|\bnot working\b|\bglitch\b/i.test(text);

    // Store and poll
    storeMessage(text).then(function(id){
      lastMsgId = id;
      pollForResponse(id, 0);
    }).catch(function(){
      hideTyping();
      addMessage('system', '⚠️ Connection issue. Try again.');
      input.disabled = false;
      sendBtn.disabled = false;
    });
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function(e){ if (e.key==='Enter') sendMessage(); });

  // ═══ SUPABASE STORE ═══
  function storeMessage(text){
    return fetch(SUPABASE_URL + '/rest/v1/keebot_messages', {
      method: 'POST',
      headers: { 'apikey':SUPABASE_KEY, 'Authorization':'Bearer '+SUPABASE_KEY, 'Content-Type':'application/json', 'Prefer':'return=representation' },
      body: JSON.stringify({ session_id:SESSION, page:PAGE, role:'user', content:text, status:'pending' })
    }).then(function(r){ return r.json(); }).then(function(data){
      return data && data[0] ? data[0].id : null;
    });
  }

  function pollForResponse(id, attempts){
    if (attempts > 60) { hideTyping(); input.disabled=false; sendBtn.disabled=false; return; }
    pollingTimer = setTimeout(function(){
      fetch(SUPABASE_URL+'/rest/v1/keebot_messages?id=eq.'+id+'&select=id,status,content',{
        headers:{ 'apikey':SUPABASE_KEY, 'Authorization':'Bearer '+SUPABASE_KEY }
      }).then(function(r){ return r.json(); }).then(function(data){
        if (data && data.length && data[0].status === 'done') {
          hideTyping();
          addMessage('assistant', data[0].content);
          saveMessage('assistant', data[0].content, false);
          input.disabled = false;
          sendBtn.disabled = false;
        } else {
          pollForResponse(id, attempts+1);
        }
      }).catch(function(){
        pollForResponse(id, attempts+1);
      });
    }, 1000);
  }

  // ═══ LOAD HISTORY ═══
  function loadHistory(){
    if (messages.length > 0) return; // already loaded
    fetch(SUPABASE_URL+'/rest/v1/keebot_messages?session_id=eq.'+SESSION+'&order=created_at.asc&limit=30',{
      headers:{ 'apikey':SUPABASE_KEY, 'Authorization':'Bearer '+SUPABASE_KEY }
    }).then(function(r){ return r.json(); }).then(function(data){
      if (!data || !data.length) return;
      msgEl.querySelector('.kb-welcome') && msgEl.querySelector('.kb-welcome').remove();
      data.forEach(function(m){
        if (m.status === 'done' || m.role === 'user') {
          addMessage(m.role, m.content);
          messages.push({ role:m.role, content:m.content });
        }
      });
      msgEl.scrollTop = msgEl.scrollHeight;
    });
  }

  // ═══ SAVE MESSAGE (local) ═══
  function saveMessage(role, content, isBug){
    messages.push({ role:role, content:content });
    if (isBug) {
      fetch(SUPABASE_URL+'/rest/v1/keebot_bugs',{
        method:'POST',
        headers:{ 'apikey':SUPABASE_KEY, 'Authorization':'Bearer '+SUPABASE_KEY, 'Content-Type':'application/json', 'Prefer':'return=minimal' },
        body:JSON.stringify({ session_id:SESSION, page:PAGE, description:content, status:'new' })
      });
    }
  }

  // ═══ UI HELPERS ═══
  function addMessage(role, text){
    var welcome = msgEl.querySelector('.kb-welcome');
    if (welcome) welcome.remove();
    var div = document.createElement('div');
    div.className = 'kb-msg kb-msg-'+role;
    div.textContent = text;
    msgEl.appendChild(div);
    msgEl.scrollTop = msgEl.scrollHeight;
  }

  function showTyping(){
    var existing = msgEl.querySelector('.kb-typing');
    if (existing) return;
    var div = document.createElement('div');
    div.className = 'kb-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgEl.appendChild(div);
    msgEl.scrollTop = msgEl.scrollHeight;
  }

  function hideTyping(){
    var el = msgEl.querySelector('.kb-typing');
    if (el) el.remove();
  }

  // ═══ BUG REPORT ═══
  bugBtn.addEventListener('click', function(e){
    e.stopPropagation();
    bugModal.classList.add('open');
    bugText.focus();
  });

  document.getElementById('kbBugCancel').addEventListener('click', function(){
    bugModal.classList.remove('open');
    bugText.value = '';
  });

  document.getElementById('kbBugSubmit').addEventListener('click', function(){
    var desc = bugText.value.trim();
    if (!desc) return;
    // Store bug
    fetch(SUPABASE_URL+'/rest/v1/keebot_bugs',{
      method:'POST',
      headers:{ 'apikey':SUPABASE_KEY, 'Authorization':'Bearer '+SUPABASE_KEY, 'Content-Type':'application/json', 'Prefer':'return=minimal' },
      body:JSON.stringify({ session_id:SESSION, page:PAGE, description:desc, status:'new' })
    }).then(function(){
      addMessage('system', '✅ Bug reported. Kee will look into it.');
      saveMessage('system', 'Bug reported: '+desc, true);
      bugModal.classList.remove('open');
      bugText.value = '';
      showToast('🐛 Bug reported — thank you!');
    }).catch(function(){
      showToast('❌ Failed to send. Try again.');
    });
  });

  bugModal.addEventListener('click', function(e){
    if (e.target === bugModal) { bugModal.classList.remove('open'); bugText.value = ''; }
  });

  // ═══ CLEAR ═══
  clearBtn.addEventListener('click', function(){
    messages = [];
    msgEl.innerHTML = '<div class="kb-welcome"><div class="kb-w-icon">🦄</div><p>Chat cleared. Ask me anything!</p></div>';
    SESSION = 'kb_' + Date.now() + '_' + Math.random().toString(36).slice(2,8);
    localStorage.setItem('keebot_session', SESSION);
  });

  // ═══ TOAST ═══
  function showToast(msg){
    var t = document.createElement('div');
    t.className = 'kb-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function(){ t.remove(); }, 3000);
  }

  // ═══ CLEANUP ═══
  window.addEventListener('beforeunload', function(){
    if (pollingTimer) clearTimeout(pollingTimer);
  });

})();
