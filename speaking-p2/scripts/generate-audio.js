#!/usr/bin/env node
/**
 * generate-audio.js — Pre-generate MP3s via Google Cloud Text-to-Speech
 * Usage: GOOGLE_APPLICATION_CREDENTIALS=... node scripts/generate-audio.js
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CREDENTIALS_FILE = process.env.GOOGLE_APPLICATION_CREDENTIALS || '';
const TTS_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';

const MANIFEST = {
  voice: 'en-GB-News-K',
  tracks: [
    { filename: 'eileen-intro.mp3', label: 'Eileen — Intro', text: "She has a commanding presence that turns heads the moment she enters a room. At five foot nine with an athletic build from years of skiing and halfpipe training, you wouldn't guess from looking at her that she also models for Louis Vuitton and studies quantum physics at Stanford. She carries herself with confidence — you can tell she's comfortable in her own skin, whether she's landing a double cork fourteen forty or presenting at the Met Gala." },
    { filename: 'eileen-personality.mp3', label: 'Eileen — Personality', text: "One thing you notice straight away about her is how quick-witted she is. In interviews, she doesn't sugar-coat things — which is rare these days for someone under the kind of spotlight she lives in. When asked about the pressure of representing China after growing up in San Francisco, she gave off this really positive, energetic vibe that was infectious, saying simply: I'm not trying to make everyone happy. I'm trying to make myself proud." },
    { filename: 'eileen-character.mp3', label: 'Eileen — Character & Lifestyle', text: "If I had to sum up her personality in one word, it'd be down-to-earth. Despite silencing the doubters with a performance that left absolutely no questions unanswered, she's not the type to show off; instead, she'd rather let her work speak for itself. Her day usually starts with a morning workout and ends with reading — it's that consistent. You'd be surprised how much she squeezes into a single day: from training to studying to modelling to advocating for youth sports across China." },
    { filename: 'eileen-achievement.mp3', label: 'Eileen — Achievements', text: "What sets her achievements apart is that she put in the hours while everyone else was making excuses. Looking at her track record, you see a pattern of excellence — she consistently turns dreams into reality. But her greatest achievement isn't the gold medals — it's the countless lives she's changed along the way. She's proof that you don't need to fit into a single box to make history — just talent, an insane work ethic, and the courage to be yourself." },
    { filename: 'eileen-full.mp3', label: 'Eileen — Full Profile', text: "She has a commanding presence that turns heads the moment she enters a room. At five foot nine with an athletic build from years of skiing and halfpipe training, you wouldn't guess from looking at her that she also models for Louis Vuitton and studies quantum physics at Stanford. She carries herself with confidence — you can tell she's comfortable in her own skin, whether she's landing a double cork fourteen forty or presenting at the Met Gala. One thing you notice straight away about her is how quick-witted she is. In interviews, she doesn't sugar-coat things — which is rare these days for someone under the kind of spotlight she lives in. If I had to sum up her personality in one word, it'd be down-to-earth. Her day usually starts with a morning workout and ends with reading — it's that consistent. What sets her achievements apart is that she put in the hours while everyone else was making excuses. She's proof that you don't need to fit into a single box to make history — just talent, an insane work ethic, and the courage to be yourself." },
    { filename: 'prompt-athlete.mp3', label: 'Opening — Athlete', text: "The sportsperson I truly admire is Eileen Gu, the freestyle skier who made history at the 2022 Winter Olympics by winning three medals — two golds and a silver — at just 18 years old." },
    { filename: 'prompt-meet.mp3', label: 'Opening — Meet', text: "If I could meet any famous person, without hesitation I'd choose Eileen Gu — not just because she's an Olympic champion, but because she navigates two completely different cultures so effortlessly." },
    { filename: 'prompt-popular.mp3', label: 'Opening — Popular', text: "A person I think is incredibly popular right now — and for good reason — is Eileen Gu. And honestly, when you look past the medals and the magazine covers, the reasons she's so widely loved go much deeper than her athletic achievements." },
    { filename: 'prompt-creative.mp3', label: 'Opening — Creative', text: "A creative person I deeply admire is Eileen Gu — though maybe not in the traditional sense. She doesn't paint or compose music. What she's created is something arguably harder: her own identity as an athlete-student-model who refuses to be put in any single box." }
  ]
};

async function getAccessToken() {
  const key = JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf-8'));
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT', kid: key.private_key_id };
  const claim = { iss: key.client_email, scope: 'https://www.googleapis.com/auth/cloud-platform', aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now };
  const enc = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const unsigned = enc(header) + '.' + enc(claim);
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsigned); sign.end();
  return unsigned + '.' + sign.sign(key.private_key, 'base64url');
}

async function synthesize(text) {
  const body = { input: { text }, voice: { languageCode: 'en-GB', name: MANIFEST.voice, ssmlGender: 'MALE' }, audioConfig: { audioEncoding: 'MP3', speakingRate: 0.95, pitch: 0.0, effectsProfileId: ['headphone-class-device'] } };
  const token = await getAccessToken();
  const jwt = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: token }) }).then(r => r.json());
  const res = await fetch(TTS_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + jwt.access_token }, body: JSON.stringify(body) }).then(r => r.json());
  if (res.error) throw new Error(res.error.message);
  return Buffer.from(res.audioContent, 'base64');
}

async function main() {
  console.log('🎙️  Google Cloud TTS — ' + MANIFEST.voice + '\n');
  fs.mkdirSync(path.join(__dirname, '..', 'audio'), { recursive: true });
  for (const t of MANIFEST.tracks) {
    const out = path.join(__dirname, '..', 'audio', t.filename);
    process.stdout.write('  ' + t.label + '... ');
    try {
      const mp3 = await synthesize(t.text);
      fs.writeFileSync(out, mp3);
      console.log('✅ ' + (mp3.length / 1024).toFixed(0) + ' KB');
    } catch (e) { console.log('❌ ' + e.message); }
  }
  console.log('\n📁 audio/ ready');
}
main().catch(e => { console.error(e.message); process.exit(1); });
