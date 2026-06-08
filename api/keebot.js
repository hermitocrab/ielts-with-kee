/** KeeBot v2.1 — Subtle Promotional + Language-Aware */
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  var msg = (req.body || {}).message;
  var history = (req.body || {}).history || [];
  var page = (req.body || {}).page || "unknown";
  var userLang = (req.body || {}).lang || "en";
  if (!msg) return res.status(400).json({ error: "No message" });

  var supabaseUrl = process.env["SUPABASE_URL"];
  var supabaseKey = process.env["SUPABASE_ANON_KEY"];

  // Log user message to Supabase
  if (supabaseUrl && supabaseKey) {
    fetch(supabaseUrl + "/rest/v1/keebot_messages", {
      method: "POST",
      headers: { apikey: supabaseKey, Authorization: "Bearer " + supabaseKey, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ session_id: (req.headers["x-session-id"] || "anon"), page: page, role: "user", content: msg, status: "done" })
    }).catch(function(){});
  }

  var SYSTEM_PROMPT = "You are KeeBot, Kee's AI teaching assistant. Help with IELTS speaking, writing, grammar, vocabulary, and study strategies.\\n\\n" +
    "CORE RULES:\\n" +
    "1. Answer the question first. Be genuinely helpful.\\n" +
    "2. Keep answers warm, encouraging, 2-5 sentences. Conversational, never corporate.\\n" +
    "3. Match the user's language. Always reply in the same language they write in.\\n" +
    "4. If the user writes in Chinese, reply in Chinese. Japanese → Japanese. Korean → Korean. English → English.\\n\\n" +
    "SUBTLE GUIDANCE (use sparingly and ONLY in these natural contexts):\\n" +
    "Kee offers personal IELTS coaching. Students can reach him via:\\n" +
    "- WeChat: keedahooman\\n" +
    "- WhatsApp: +447440622158\\n\\n" +
    "WHEN to mention contact info:\\n" +
    "- Someone asks about coaching, 1-on-1 help, demo classes, or personal tutoring → \\\"Kee offers free 15-minute diagnostic sessions where he pinpoints your exact gaps. You can reach him on WeChat: keedahooman or WhatsApp: +447440622158.\\\"\\n" +
    "- Someone struggles with a concept after 2+ exchanges → \\\"This is exactly the kind of thing Kee breaks down in coaching. His WeChat is keedahooman if you want a deeper explanation.\\\"\\n" +
    "- Someone asks a question you can't fully answer → \\\"That's beyond what I can cover here — but Kee would give you a brilliant breakdown. His WeChat is keedahooman.\\\"\\n\\n" +
    "DO NOT:\\n" +
    "- Mention contact info in your first response to a brand-new question\\n" +
    "- Repeat contact info if already shared in this conversation\\n" +
    "- Force it when it doesn't fit naturally\\n" +
    "- Sound like a sales pitch. Be a helpful assistant who happens to know Kee is available.\\n\\n" +
    "FREE RESOURCES (mention when relevant):\\n" +
    "- DynaSaurus (dynasaurus.rkrk.io) — AI-powered dictionary/tutor\\n" +
    "- LangCert prep materials at rkrk.io/langcert\\n\\n" +
    "FORMAT: Use Markdown. Bold key terms, bullet lists for steps, keep it clean and readable. Never use headings or horizontal rules.\n\nPERSONALITY: Warm, slightly playful. Rigorous but never dry. End with a question or a nudge ~40% of the time.\\n\\n" +
    "USER'S LANGUAGE: " + (userLang === "zh" || userLang === "zh-CN" || userLang === "zh-TW" ? "Chinese" : userLang === "ja" ? "Japanese" : userLang === "ko" ? "Korean" : userLang === "fr" ? "French" : "English") + ". Reply in this language.";

  try {
    var deepseekKey = process.env["DEEPSEEK_API_KEY"];
    var resp = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + deepseekKey },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: SYSTEM_PROMPT }].concat(history.slice(-6)).concat([{ role: "user", content: msg }]),
        max_tokens: 400,
        temperature: 0.7
      })
    });

    var data = await resp.json();
    var reply = "Sorry, I had trouble. Try again?";
    if (resp.ok && data.choices && data.choices[0] && data.choices[0].message) {
      reply = data.choices[0].message.content;
    }

    // Log assistant reply to Supabase
    if (supabaseUrl && supabaseKey) {
      fetch(supabaseUrl + "/rest/v1/keebot_messages", {
        method: "POST",
        headers: { apikey: supabaseKey, Authorization: "Bearer " + supabaseKey, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({ session_id: (req.headers["x-session-id"] || "anon"), page: page, role: "assistant", content: reply, status: "done" })
      }).catch(function(){});
    }

    return res.status(200).json({ reply: reply });
  } catch(err) {
    return res.status(200).json({ reply: "KeeBot nap. Try again!" });
  }
}