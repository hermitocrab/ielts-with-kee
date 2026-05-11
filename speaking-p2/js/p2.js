/* ===== P2 Shared JavaScript ===== */

/* Flip handler — distinguishes tap from swipe, prevents accidental flips */
(function() {
  var lastFlip = 0;
  var touchStartX = 0, touchStartY = 0;
  
  // Track touch start to detect swipe vs tap
  document.addEventListener('touchstart', function(e) {
    var t = e.touches[0];
    if (t) { touchStartX = t.clientX; touchStartY = t.clientY; }
  }, {passive: true});
  
  function movedTooMuch(e) {
    if (e.type === 'click') return false; // desktop clicks always pass
    var t = e.changedTouches && e.changedTouches[0];
    if (!t) return false;
    var dx = t.clientX - touchStartX;
    var dy = t.clientY - touchStartY;
    return (dx*dx + dy*dy) > 64; // >8px movement = swipe, not tap
  }

  function handleFlip(e) {
    if (movedTooMuch(e)) return;
    var card = e.target.closest('.p2-card');
    if (!card) return;
    if (e.target.closest('.used-btn')) return;
    var now = Date.now();
    if (now - lastFlip < 300) return; // dedupe click+touchend
    lastFlip = now;
    if (e.cancelable) e.preventDefault();
    card.classList.toggle('flipped');
  }
  document.addEventListener('touchend', handleFlip, {passive: false});
  document.addEventListener('click', handleFlip);

  function handleStructFlip(e) {
    if (movedTooMuch(e)) return;
    var struct = e.target.closest('.struct-item');
    if (!struct) return;
    var now = Date.now();
    if (now - lastFlip < 300) return;
    lastFlip = now;
    if (e.cancelable) e.preventDefault();
    struct.classList.toggle('flipped');
  }
  document.addEventListener('touchend', handleStructFlip, {passive: false});
  document.addEventListener('click', handleStructFlip);
})();

function switchTab(angleId, el) {
  document.querySelectorAll('.p2-tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.p2-angle-bg').forEach(function(b) { b.style.display = 'none'; });
  el.classList.add('active');
  var bg = document.getElementById('bg-' + angleId);
  if (bg) bg.style.display = 'block';
  // Full-page gradient
  var angles = ['appearance','personality','relationship','lifestyle','achievement'];
  angles.forEach(function(a) { document.body.classList.remove('angle-' + a); });
  document.body.classList.add('angle-' + angleId);
}

/* Inject structure example data after page load */
document.addEventListener('DOMContentLoaded', function() {
  var structData = {
    appearance: [
      {ex:"At first glance, you'd notice her athletic build — it's the first thing that catches your eye.",zh:"第一眼你就会注意到她的运动员身材——这是最先吸引你目光的地方。"},
      {ex:"He has this well-groomed look about him, as if he just walked out of a magazine.",zh:"他看起来总是打扮得体，仿佛刚从杂志里走出来。"},
      {ex:"What strikes me most about his appearance is how he towers over everyone in the room.",zh:"他外表最让我印象深刻的是他在房间里比所有人都高出一截。"},
      {ex:"She's got that slender kind of build — you can tell she takes care of herself.",zh:"她有着那种苗条的身材——你能看出来她很注重保养。"},
      {ex:"There's something about the way she carries herself with confidence that makes her stand out.",zh:"她那种自信的举止方式让她在人群中格外引人注目。"},
      {ex:"He looks like someone who gives off a positive vibe — it's written all over his face.",zh:"他看起来就是那种会散发正能量的人——全都写在脸上了。"},
      {ex:"I'd describe him as sharp-featured, with expressive eyes and a warm smile.",zh:"我会形容他五官分明，有一双会说话的眼睛和温暖的笑容。"},
      {ex:"She always dresses in a way that shows off her distinctive style — it really reflects her personality.",zh:"她总是穿得很有独特风格——这真的反映了她的个性。"},
      {ex:"You wouldn't guess from looking at him that he's an Olympic athlete — he doesn't look the type.",zh:"你光看他的外表猜不到他是奥运选手——他看起来不像那一类人。"},
      {ex:"The overall impression she gives off is one of elegance and approachability.",zh:"她给人的整体印象是优雅而又平易近人。"}
    ],
    personality: [
      {ex:"She's the kind of person who would go out of her way to help a complete stranger without a second thought.",zh:"她是那种会不假思索地去帮助一个完全陌生的人的人。"},
      {ex:"What really defines him is his easy-going nature — I've never met anyone so comfortable in their own skin.",zh:"真正定义他的是他随和的性格——我从没见过谁像他那样自在做自己。"},
      {ex:"If I had to sum up her personality in one word, it'd be down-to-earth.",zh:"如果要用一个词概括她的性格，那就是接地气。"},
      {ex:"One thing you notice straight away about him is how quick-witted he is.",zh:"你马上就会注意到他反应有多快，有多机智。"},
      {ex:"He's got this way of leading by example that makes people feel inspired rather than pressured.",zh:"他那种以身作则的方式让人感到鼓舞，而不是感到压力。"},
      {ex:"Beneath the fierce determination, she's actually incredibly warm-hearted.",zh:"在那坚强的意志之下，她其实非常有爱心。"},
      {ex:"The thing about him is that he never sugar-coats things — which is rare these days.",zh:"关于他的一点是，他从不会粉饰太平——这年头很少见了。"},
      {ex:"She's not the type to show off; instead, she'd rather let her work speak for itself.",zh:"她不是那种炫耀的人；相反，她更愿意用作品说话。"},
      {ex:"I think what makes him so magnetic is that he genuinely listens to everyone.",zh:"我觉得他这么有魅力的原因是他真的会认真听每个人说话。"},
      {ex:"You can tell she's fiercely determined just by the way she tackles every challenge.",zh:"光看她应对每个挑战的方式，你就能看出她意志有多坚定。"}
    ],
    relationship: [
      {ex:"We first met through a mutual friend — it wasn't anything dramatic, just bumped into each other at a dinner party.",zh:"我们是通过一个共同朋友认识的——没什么戏剧性，就是在一次晚餐聚会上碰到的。"},
      {ex:"I can't really remember a time when I didn't know her — she's just always been there like a sister.",zh:"我真的不记得没有她的日子——她就像姐姐一样一直在我身边。"},
      {ex:"Over the years, he's become more of a mentor figure than just a friend to me.",zh:"这些年来，他对我来说已经不仅仅是一个朋友，更是导师般的存在。"},
      {ex:"We've had our ups and downs, but what's kept us close is that we genuinely bring out the best in each other.",zh:"我们有起有落，但让我们一直亲密的是我们真的会激发彼此最好的一面。"},
      {ex:"She's the person I turn to when I need a shoulder to cry on — I don't even have to explain why.",zh:"当我需要一个可以倾诉的人时，我会找她——我甚至不需要解释为什么。"},
      {ex:"Our friendship is built on trust — we share that silent understanding that doesn't need words.",zh:"我们的友谊建立在信任之上——我们有那种不需要语言的默契。"},
      {ex:"Despite losing touch for a while after university, we've managed to stay close because the bond was always there.",zh:"尽管大学后一度失去联系，我们依然能保持亲密，因为那份连结一直都在。"},
      {ex:"He came into my life at a time when I really needed someone to look up to, and honestly, he shaped who I am.",zh:"他出现在我生命中最需要榜样的时刻，说实话，他塑造了今天的我。"},
      {ex:"I wouldn't say we're inseparable — we're more like two people who just clicked from day one.",zh:"我不会说我们形影不离——我们更像是从第一天起就一拍即合的两个人。"},
      {ex:"If I hadn't met her, I honestly think I would've turned out very differently.",zh:"如果我没有遇见她，我真的觉得我会变成完全不一样的人。"}
    ],
    lifestyle: [
      {ex:"Her day usually starts with a morning workout and ends with reading — it's that consistent.",zh:"她的一天通常以晨练开始，以阅读结束——就是这么雷打不动。"},
      {ex:"You'd be surprised how much she squeezes into a single day — from training to studying to modelling.",zh:"你会惊讶于她一天里能塞进多少事——从训练到学习再到模特工作。"},
      {ex:"He's not the type to sit still — there's always some new project on the go.",zh:"他不是那种能坐得住的人——总有新项目在进行中。"},
      {ex:"What I admire is that she makes time for the things that matter no matter how busy she gets.",zh:"让我钦佩的是，不管她多忙，她都能为重要的事情腾出时间。"},
      {ex:"He follows this routine where every morning he practices guitar — it's almost like clockwork.",zh:"他遵循着每天早上练吉他的作息——几乎像钟表一样精准。"},
      {ex:"When he's not working, you'll usually find him surrounded by friends at some live music venue.",zh:"他不工作的时候，你通常会发现他和朋友们在某个现场音乐演出场地。"},
      {ex:"She's got this balance between her career and personal life that I find really impressive.",zh:"她在事业和个人生活之间找到的平衡让我印象非常深刻。"},
      {ex:"The way he lives is very disciplined — the word that captures it best is intentional.",zh:"他的生活方式非常自律——最能概括的词是有目的性。"},
      {ex:"She swears by her morning routine — says it's the secret to her productivity.",zh:"她坚信她的晨间流程——说这是她高效率的秘诀。"},
      {ex:"On a typical weekend, he's probably hiking or deep in a book — there's no in-between.",zh:"在典型的周末，他要么在徒步，要么埋头读书——没有中间状态。"}
    ],
    achievement: [
      {ex:"What she's achieved is remarkable considering she overcame the odds — most people would have given up.",zh:"考虑到她克服了那么多困难，她的成就令人惊叹——大多数人早就放弃了。"},
      {ex:"He didn't just succeed; he actually raised the bar for everyone — a whole different level.",zh:"他不仅仅是成功了；他实际上为所有人提高了标准——完全不同的境界。"},
      {ex:"What sets her achievements apart is that she put in the hours while everyone else was making excuses.",zh:"她的成就之所以与众不同，是因为当别人都在找借口时，她一直在默默付出。"},
      {ex:"He's proof that you don't need connections to make history — just talent and an insane work ethic.",zh:"他证明了创造历史不需要关系——只需要天赋和疯狂的努力。"},
      {ex:"When she broke records at just 18, it wasn't just a personal victory — it inspired a whole generation.",zh:"她在18岁就打破了纪录，这不仅仅是个人胜利——它激励了整整一代人。"},
      {ex:"He worked his way up from nothing to the pinnacle of his field — and did it without ever compromising his values.",zh:"他从一无所有一路走到了行业的顶峰——而且从未在原则上妥协。"},
      {ex:"The most impressive thing isn't the gold medals themselves, but the fact that she made history in a sport nobody from her country had ever won before.",zh:"最令人印象深刻的不是金牌本身，而是她在一个她的国家从未赢过的项目上创造了历史。"},
      {ex:"He's the first person to ever leave a lasting legacy in both business and education.",zh:"他是第一个在商界和教育界都留下深远影响的人。"},
      {ex:"Looking at her track record, you see a pattern of excellence — she consistently turns dreams into reality.",zh:"看她的履历，你会看到一个卓越的模式——她持续把梦想变成现实。"},
      {ex:"His greatest achievement isn't the awards — it's the countless lives he's changed along the way.",zh:"他最伟大的成就不是那些奖项——而是一路上他改变了无数人的生命。"}
    ]
  };

  // Inject back sides into structure items — uses data-angle for correct matching
  document.querySelectorAll('.p2-structures').forEach(function(structSection) {
    var angle = structSection.getAttribute('data-angle');
    if (!angle || !structData[angle]) return;
    var items = structSection.querySelectorAll('.struct-item');
    items.forEach(function(item, i) {
      var data = structData[angle][i];
      if (!data) return;
      var front = item.innerHTML;
      item.innerHTML = '<div class="struct-inner"><div class="struct-front">' + front + '</div><div class="struct-back"><div class="example-sentence">"' + data.ex + '"</div><div class="example-translation">' + data.zh + '</div></div></div>';
    });
  });
  randomPrompt();
});

/* All People Part 2 Prompts */
var peoplePrompts = [
  {zh:'鼓励你保护自然的人',en:'Describe a person who encouraged you to protect the nature',bullets:['Who he/she is','How he/she encouraged you','What he/she encouraged you to do'],explain:'And explain how you feel about this person',hot:true},
  {zh:'乐于助人的人',en:'Describe a person who often helps others',bullets:['Who this person is','How often he/she helps others','How/why he/she helps others'],explain:'And explain how you feel about this person',hot:true},
  {zh:'机智解决问题的人',en:'Describe a person who solved a problem in a smart way',bullets:['Who this person is','What the problem was','How he/she solved it'],explain:'And explain why you think he/she did it in a smart way',hot:true},
  {zh:'学习新知识的朋友',en:'Describe a friend who learned something new (not from a teacher)',bullets:['Who he/she is','What he/she learned','Why he/she learned this'],explain:'And explain whether it would be easier to learn from a teacher',hot:true},
  {zh:'想见的名人',en:'Describe a famous person you would like to meet',bullets:['Who he/she is','How you knew him/her','How/where you would like to meet him/her'],explain:'And explain why you would like to meet him/her',hot:true},
  {zh:'喜欢画画的朋友',en:'Describe a friend of yours who loves drawing/painting',bullets:['Who he/she is','How you knew him/her','How often he/she draws/paints'],explain:'And explain why you think he/she loves drawing/painting',hot:true},
  {zh:'常做计划的人',en:'Describe a person who makes plans a lot',bullets:['Who he/she is','How you knew him/her','What plans he/she makes'],explain:'And explain how you feel about this person',hot:true},
  {zh:'钦佩的运动员',en:'Describe a successful sportsperson you admire',bullets:['Who he/she is','What he/she has achieved','How you knew about him/her'],explain:'And explain why you admire him/her',hot:true},
  {zh:'钦佩的创作者',en:'Describe a creative person you admire',bullets:['Who this person is','How you knew about him/her','What creative work he/she has done'],explain:'And explain why you admire his/her creativity',hot:true},
  {zh:'在家族企业工作的人',en:'Describe a person who enjoys working for a family business',bullets:['Who this person is','What the family business is','What he/she does in the business'],explain:'And explain why he/she enjoys working there',hot:true},
  {zh:'最重要的好朋友',en:'Describe a good friend who is important to you',bullets:['Who this friend is','How you became friends','What you do together'],explain:'And explain why this friend is important to you',hot:true},
  {zh:'擅长音乐的朋友',en:'Describe a friend who is good at music/singing',bullets:['Who this friend is','How you knew him/her','What kind of music he/she is good at'],explain:'And explain how you feel about his/her musical talent',hot:true},
  {zh:'受欢迎的人',en:'Describe a popular person',bullets:['Who this person is','How you knew this person','What makes this person popular'],explain:'And explain how you feel about this person',hot:true},
  {zh:'喜欢的老师',en:'Describe a teacher who had an influence on you',bullets:['Who this teacher was','What subject he/she taught','What was special about him/her'],explain:'And explain how this teacher influenced you',hot:false},
  {zh:'有趣的老人',en:'Describe an interesting old person you know',bullets:['Who this person is','How you met him/her','What makes him/her interesting'],explain:'And explain why you enjoy spending time with this person',hot:false},
  {zh:'社交媒体上关注的人',en:'Describe a person you follow on social media',bullets:['Who this person is','How you discovered him/her','What kind of content he/she shares'],explain:'And explain why you follow this person',hot:false},
  {zh:'有趣的邻居',en:'Describe an interesting neighbour',bullets:['Who this neighbour is','How you met him/her','What makes him/her interesting'],explain:'And explain how you feel about living near this person',hot:false},
  {zh:'儿时的榜样',en:'Describe a person you admired when you were a child',bullets:['Who this person was','How you knew about him/her','What you admired'],explain:'And explain why this person was important to you as a child',hot:false},
  {zh:'喜欢的家庭成员',en:'Describe a family member you admire',bullets:['Who this family member is','What he/she is like','What you do together'],explain:'And explain why you admire this family member',hot:false},
  {zh:'好的领导者',en:'Describe a good leader or boss you know',bullets:['Who this person is','How you knew him/her','What makes him/her a good leader'],explain:'And explain how this person has influenced you',hot:false},
  {zh:'经常旅行的人',en:'Describe a person who travels a lot',bullets:['Who this person is','How you knew him/her','Where he/she has travelled'],explain:'And explain why you think he/she enjoys travelling',hot:false},
  {zh:'健康生活的人',en:'Describe a person who keeps fit and healthy',bullets:['Who this person is','What he/she does to stay healthy','How you knew about his/her lifestyle'],explain:'And explain whether you would like to follow his/her example',hot:false},
  {zh:'冒险的人',en:'Describe an adventurous person you know',bullets:['Who this person is','How you knew him/her','What adventurous things he/she has done'],explain:'And explain how you feel about this person',hot:false},
  {zh:'擅长外语的人',en:'Describe someone who speaks a foreign language well',bullets:['Who this person is','What language he/she speaks','How he/she learned it'],explain:'And explain why you think learning a foreign language is important',hot:false},
  {zh:'志愿者',en:'Describe a person who does volunteer or charity work',bullets:['Who this person is','What kind of volunteer work he/she does','Why he/she started doing it'],explain:'And explain how you feel about what he/she does',hot:false},
  {zh:'开心的人',en:'Describe a happy person you know',bullets:['Who this person is','How you knew him/her','What makes him/her happy'],explain:'And explain why you think he/she is so happy',hot:false},
  {zh:'爱读书的人',en:'Describe a person who loves reading',bullets:['Who this person is','How you knew him/her','What kinds of books he/she reads'],explain:'And explain why you think reading is important to him/her',hot:false},
  {zh:'穿着时尚的人',en:'Describe a person who dresses well',bullets:['Who this person is','How you knew him/her','What his/her style is like'],explain:'And explain why you think he/she dresses well',hot:false},
  {zh:'有想法的人',en:'Describe a person with interesting ideas',bullets:['Who this person is','How you knew him/her','What interesting ideas he/she has'],explain:'And explain why his/her ideas impress you',hot:false},
  {zh:'环保人士',en:'Describe a person who cares about the environment',bullets:['Who this person is','How you knew him/her','What he/she does for the environment'],explain:'And explain how you feel about this person',hot:false}
];

function getFilteredPrompts() {
  var hotOnly = document.getElementById('hot-topics-toggle');
  if (hotOnly && hotOnly.checked) {
    return peoplePrompts.filter(function(p) { return p.hot; });
  }
  return peoplePrompts;
}

function randomPrompt() {
  var pool = getFilteredPrompts();
  var p = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById('drill-prompt-zh').textContent = p.zh;
  document.getElementById('drill-prompt-en').textContent = p.en;
  document.getElementById('cross-topic').placeholder = p.zh;
  var bulletsHtml = '';
  p.bullets.forEach(function(b) {
    bulletsHtml += '<li><span style="color:var(--p2-people);font-weight:700;">•</span> ' + b + '</li>';
  });
  document.getElementById('drill-bullets').innerHTML = bulletsHtml;
  document.getElementById('drill-explain').textContent = p.explain;
  document.getElementById('cross-nw').placeholder = p.bullets[0];
  document.getElementById('cross-ne').placeholder = p.bullets[1];
  document.getElementById('cross-sw').placeholder = p.bullets[2];
  document.getElementById('cross-se').placeholder = p.explain;
  ['cross-nw','cross-ne','cross-sw','cross-se'].forEach(function(id) {
    document.getElementById(id).value = '';
  });
  document.getElementById('cross-topic').placeholder = p.zh;
  stopTimer();
}

function toggleHotTopics() {
  var toggled = document.getElementById('hot-topics-toggle').checked;
  var label = document.getElementById('hot-topics-label');
  var pool = toggled ? peoplePrompts.filter(function(p) { return p.hot; }) : peoplePrompts;
  label.textContent = toggled ? '🔥 Hot Topics (' + pool.length + ')' : '📋 All Topics (' + pool.length + ')';
  randomPrompt();
}

var timerInterval = null;
var timerSeconds = 0;
var activeTimer = null;

function startNotesTimer() {
  if (timerInterval) stopTimer();
  timerSeconds = 60;
  activeTimer = 'notes';
  document.getElementById('notes-timer-btn').textContent = '📝 Noting...';
  document.getElementById('notes-timer-btn').style.background = '#F59E0B';
  document.getElementById('notes-timer-btn').style.color = '#fff';
  document.getElementById('notes-timer-btn').style.borderColor = '#F59E0B';
  document.getElementById('speech-timer-btn').style.display = 'none';
  document.getElementById('reset-btn').style.display = 'inline-flex';
  updateTimerDisplay();
  timerInterval = setInterval(function() {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) { stopTimer(); }
  }, 1000);
}

function startSpeechTimer() {
  if (timerInterval) stopTimer();
  timerSeconds = 120;
  activeTimer = 'speech';
  document.getElementById('speech-timer-btn').textContent = '🎤 Speaking...';
  document.getElementById('speech-timer-btn').style.background = '#EF4444';
  document.getElementById('speech-timer-btn').style.color = '#fff';
  document.getElementById('speech-timer-btn').style.borderColor = '#EF4444';
  document.getElementById('notes-timer-btn').style.display = 'none';
  document.getElementById('reset-btn').style.display = 'inline-flex';
  updateTimerDisplay();
  timerInterval = setInterval(function() {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) { stopTimer(); }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  activeTimer = null;
  document.getElementById('notes-timer-btn').textContent = '📝 1-min Notes';
  document.getElementById('notes-timer-btn').style.background = '';
  document.getElementById('notes-timer-btn').style.color = '';
  document.getElementById('notes-timer-btn').style.borderColor = '';
  document.getElementById('notes-timer-btn').style.display = '';
  document.getElementById('speech-timer-btn').textContent = '🎤 2-min Speech';
  document.getElementById('speech-timer-btn').style.background = '';
  document.getElementById('speech-timer-btn').style.color = '';
  document.getElementById('speech-timer-btn').style.borderColor = '';
  document.getElementById('speech-timer-btn').style.display = '';
  document.getElementById('reset-btn').style.display = 'none';
  if (timerSeconds <= 0) { document.getElementById('timer-display').textContent = "0:00 — Time's up!"; }
}

function resetTimer() { stopTimer(); timerSeconds = activeTimer === 'notes' ? 60 : 120; updateTimerDisplay(); }

function updateTimerDisplay() {
  var m = Math.floor(timerSeconds / 60);
  var s = timerSeconds % 60;
  document.getElementById('timer-display').textContent = m + ':' + (s < 10 ? '0' : '') + s;
}

function scrollTo(id) { document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'}); }

/* Save cross method area as JPG (zero-dependency, SVG+Canvas) */
function saveCrossAsJPG() {
  var box = document.querySelector('.cross-box');
  if (!box) return;
  var btn = document.querySelector('[onclick="saveCrossAsJPG()"]');
  if (btn) { btn.textContent = 'Wait...'; btn.disabled = true; }

  try {
    var rect = box.getBoundingClientRect();
    var w = Math.ceil(rect.width);
    var h = Math.ceil(rect.height);
    var scale = 2;
    var canvas = document.createElement('canvas');
    canvas.width = w * scale;
    canvas.height = h * scale;
    var ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // Clone styles from the document
    var styles = '';
    var sheets = document.styleSheets;
    try {
      for (var i = 0; i < sheets.length; i++) {
        try { var rules = sheets[i].cssRules || sheets[i].rules; if (rules) { for (var j = 0; j < rules.length; j++) styles += rules[j].cssText; } } catch(e) {}
      }
    } catch(e) {}

    var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' +
      'body{margin:0;font-family:Inter,-apple-system,sans-serif;font-size:14px;color:#1E293B;}' +
      styles +
      '</style></head><body>' +
      '<div style="padding:20px;background:#fff;">' + box.innerHTML + '</div>' +
      '</body></html>';

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
      '<foreignObject width="100%" height="100%">' +
      '<div xmlns="http://www.w3.org/1999/xhtml">' + html + '</div>' +
      '</foreignObject></svg>';

    var img = new Image();
    var blob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
    var url = URL.createObjectURL(blob);
    img.onload = function() {
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      var link = document.createElement('a');
      link.download = 'p2-notes-' + new Date().toISOString().slice(0,10) + '.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
      if (btn) { btn.textContent = '📸 Save'; btn.disabled = false; }
    };
    img.onerror = function() {
      URL.revokeObjectURL(url);
      if (btn) { btn.textContent = '📸 Save'; btn.disabled = false; }
    };
    img.src = url;
  } catch(e) {
    if (btn) { btn.textContent = '📸 Save'; btn.disabled = false; }
  }
}

function openEileenModal() { document.getElementById('eileen-modal').classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeEileenModal() { document.getElementById('eileen-modal').classList.remove('active'); document.body.style.overflow = ''; }
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeEileenModal(); });
document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('eileen-modal');
  if (modal) { modal.addEventListener('click', function(e) { if (e.target === modal) closeEileenModal(); }); }
});

function markUsed(chunkId, btn) {
  btn.classList.toggle('done');
  var key = 'p2-used-' + chunkId;
  if (btn.classList.contains('done')) { localStorage.setItem(key, '1'); btn.innerHTML = '✅ Got it'; }
  else { localStorage.removeItem(key); btn.innerHTML = '✓ Mark as used'; }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.used-btn').forEach(function(btn) {
    var chunkId = btn.getAttribute('data-chunk');
    if (chunkId && localStorage.getItem('p2-used-' + chunkId)) { btn.classList.add('done'); btn.innerHTML = '✅ Got it'; }
  });
  randomPrompt();

  /* Auto-highlight chunk phrase in example sentences */
  var pronounSwaps = {
    'his/her': ['his','her','their','my'],
    'him/her': ['him','her','them','me'],
    'he/she': ['he','she','they','i'],
    'oneself': ['himself','herself','myself','themself'],
    "one's": ["his","her","my","their"],
    'himself/herself': ['himself','herself','myself','themself']
  };

  document.querySelectorAll('.p2-card').forEach(function(card) {
    var chunk = card.querySelector('.chunk');
    var example = card.querySelector('.example');
    if (!chunk || !example) return;
    var chunkText = chunk.textContent.trim();
    var exampleText = example.textContent;
    var idx = exampleText.toLowerCase().indexOf(chunkText.toLowerCase());

    if (idx === -1) {
      var words = chunkText.split(/\s+/);
      for (var i = 0; i < words.length; i++) {
        var w = words[i].toLowerCase();
        var swaps = pronounSwaps[w];
        if (swaps) {
          for (var j = 0; j < swaps.length; j++) {
            var alt = words.slice(); alt[i] = swaps[j];
            var altText = alt.join(' ');
            idx = exampleText.toLowerCase().indexOf(altText.toLowerCase());
            if (idx !== -1) { chunkText = exampleText.substr(idx, altText.length); break; }
          }
        }
        if (idx !== -1) break;
      }
    }

    if (idx !== -1) {
      var before = exampleText.substring(0, idx);
      var match = exampleText.substring(idx, idx + chunkText.length);
      var after = exampleText.substring(idx + chunkText.length);
      example.innerHTML = before + '<mark class="hl">' + match + '</mark>' + after;
    }
  });

  /* Mobile dropdown sidebar with auto-hide (mobile only) */
  var sidebar = document.querySelector('.p2-sidebar');
  var toggle = document.getElementById('nav-toggle');
  var isMobile = window.matchMedia('(max-width: 900px)');

  /* Make all cards iOS-Safari-interactive */
  document.querySelectorAll('.p2-card').forEach(function(c) {
    c.setAttribute('role', 'button');
    c.setAttribute('tabindex', '0');
  });
  document.querySelectorAll('.struct-item').forEach(function(c) {
    c.setAttribute('role', 'button');
    c.setAttribute('tabindex', '0');
  });

  // Sidebar dropdown — only on mobile
  if (!sidebar || !toggle || !isMobile.matches) return;
  var hideTimer;

  function openSidebar() {
    sidebar.classList.add('open');
    toggle.innerHTML = '✕ Topics';
    toggle.style.background = 'var(--p2-people)';
    toggle.style.color = '#fff';
    resetHideTimer();
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    toggle.innerHTML = '☰ Topics';
    toggle.style.background = '';
    toggle.style.color = '';
    clearTimeout(hideTimer);
  }
  function resetHideTimer() {
    clearTimeout(hideTimer);
    if (isMobile.matches) {
      hideTimer = setTimeout(closeSidebar, 5000);
    }
  }

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (sidebar.classList.contains('open')) { closeSidebar(); }
    else { openSidebar(); }
  });

  // Close when tapping a sidebar link
  sidebar.addEventListener('click', function(e) {
    if (e.target.closest('a')) {
      setTimeout(closeSidebar, 300);
    }
  });

  // Close when tapping outside
  document.addEventListener('click', function(e) {
    if (!sidebar.contains(e.target) && e.target !== toggle) {
      closeSidebar();
    }
  });

  // Reset timer on scroll/touch
  document.addEventListener('scroll', resetHideTimer, {passive: true});
  sidebar.addEventListener('touchstart', resetHideTimer, {passive: true});
});
