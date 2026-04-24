# QA Audit Report: IELTS with Kee Website

**Date:** 2026-04-24  
**Auditor:** QA Subagent  
**Site:** https://ielts-website-two.vercel.app  
**Scope:** Full site audit — HTTP status, content review, functional checks, security scan  

---

## 1. Executive Summary

The **IELTS with Kee** website is a feature-rich IELTS preparation platform aimed at Chinese-speaking learners. It includes a whiteboard/language lab, phonetics flashcard system, speaking part 1 toolkit with flipped cards, grammar AI-prompt library, an interactive mindmap, resource PDFs, and Supabase-backed auth/dashboard.

**Overall assessment: The site loads, is functional, and has rich IELTS content.** However, there are several security, UX, and code-quality issues that need attention before this can be considered production-ready.

---

## 2. Pages & Status

### HTML Pages

| URL | HTTP Status | Load | Content | Notes |
|-----|-------------|------|---------|-------|
| `/` (index.html) | 200 ✅ | Full | IELTS landing page | Main nav links to all tools, hero + feature sections |
| `/index.html` | 200 ✅ | Full | Same as `/` | Redirects/content identical |
| `/auth.html` | 200 ✅ | Full | Sign In / Sign Up with Supabase | Tabbed form, supabase JS SDK loaded |
| `/dashboard.html` | 200 ✅ | Full | Student dashboard with stats | Supabase auth-gated, homework list, progress |
| `/debug-auth.html` | 200 ✅ | Full | Auth debugging page | Hardcoded test credentials visible |
| `/whiteboard.html` | 200 ✅ | Full | Language Lab v19 | Complex canvas/notepad/mindmap/toolbar. ~79KB HTML + 5 external JS libs |
| `/phonetics.html` | 200 ✅ | Full | Connected Speech Pro | Flippable cards with explanations, music links, no `<audio>` elements |
| `/speaking.html` | 200 ✅ | Full | Part 1 Speaking Toolkit (~128KB) | Vocabulary flashcards, logic labels, interactive chunks, pop corners |
| `/grammar.html` | 200 ✅ | Full | AI Prompt Library (Chinese) | Sidebar nav, card sections with copy-to-clipboard prompts. No interactive exercises |
| `/mindmap.html` | 200 ✅ | Full | IELTS Speaking Mindmap | Loading spinner, fetches JSON, renders via mindmap-renderer.js |
| `/resources.html` | 200 ✅ | Full | Download page for 3 PDFs | File listing with download buttons |

### Assets

| URL | HTTP Status | Size | Notes |
|-----|-------------|------|-------|
| `/css/global.css` | 200 ✅ | ~2KB | CSS custom properties for purple/pink/banana theme colors |
| `/js/navigation.js` | 200 ✅ | ~3KB | Shared sticky nav component, injects nav into pages via JS |
| `/js/mindmap-renderer.js` | 200 ✅ | ~7KB | Renders JSON mindmap data as interactive HTML tree |
| `/ielts-speaking-mindmap.json` | 200 ✅ | ~180KB | Complete IELTS speaking mindmap data, all topics/Part 2 |
| `/supabase-setup.sql` | 200 ✅ | ~3.5KB | SQL schema for students + homework tables + RLS policies |

### PDFs

| URL | HTTP Status | Notes |
|-----|-------------|-------|
| `/pdfs/IELTS_2026_JanApr_Question_Bank.pdf` | 200 ✅ | ~1MB, real speaking questions |
| `/pdfs/IELTS_Speaking_Phrases_Interpretation.pdf` | 200 ✅ | Phrase interpretation drills |
| `/pdfs/IELTS_Speaking_Phrases_Expressions.pdf` | 200 ✅ | Expression guide, band 7+ |

### Security Scan

| Path | Result | Notes |
|------|--------|-------|
| `/.env` | 404 ✅ | Not exposed |
| `/.git/config` | 404 ✅ | Not exposed |
| `/robots.txt` | 404 ❓ | Missing — not critical but recommended |
| `/sitemap.xml` | 404 ❓ | Missing |
| `/admin`, `/wp-admin` | 404/403 ✅ | Not accessible |
| `/config.json` | 404 ✅ | Not exposed |

**All external resources use HTTPS.** No mixed content warnings expected.

---

## 3. Bugs & Issues Found

### 🔴 Critical (1)

| ID | Bug | Location | Detail |
|----|-----|----------|--------|
| C1 | **Supabase anon key + URL exposed in 3 pages** | `auth.html`, `dashboard.html`, `debug-auth.html` | The Supabase URL and anon key are hardcoded in plaintext in `<script>` blocks. This is **expected** for Supabase (anon key is designed to be public when RLS is enforced), but the `debug-auth.html` also hardcodes a **test user password** (`Test123!`) and email (`sriskeeda@gmail.com`). This is a real credential exposure. |

### 🟠 High (3)

| ID | Bug | Location | Detail |
|----|-----|----------|--------|
| H1 | **No `<audio>` elements on phonetics page** | `phonetics.html` | Despite being named "Connected Speech Pro" and having phonetic transcriptions, the page has **zero audio elements** — no embedded audio, no `<audio>` tags, no `.mp3`/`.wav` references. Phonetics without audio is a major UX gap. The "Search on Music" buttons just search the web, not play audio. |
| H2 | **Grammar page has no interactive exercises** | `grammar.html` | The grammar page is **a library of Chinese-language AI prompts** to copy-paste into ChatGPT/Claude. There are no interactive grammar exercises, quizzes, or drills. The title "Grammar Lab" is misleading. 8 occurrences of "exercise/interactive/quiz" in the HTML are all in prompt text for AI tools, not actual exercises. |
| H3 | **Test credentials hardcoded in production** | `debug-auth.html` | Email `sriskeeda@gmail.com` and password `Test123!` appear in plaintext HTML. Any visitor can see and use these credentials to sign in. |

### 🟡 Medium (4)

| ID | Bug | Location | Detail |
|----|-----|----------|--------|
| M1 | **No navigation.js fallback when JS disabled** | All pages using `js/navigation.js` | Navigation is injected **entirely via JavaScript**. If JS fails to load, the page has no nav at all. Should include a `<noscript>` fallback or server-rendered nav. |
| M2 | **Whiteboard: 5 external JS dependencies** | `whiteboard.html` | Loads html2canvas, pdf.js, mammoth, html2pdf, font-awesome from CDN. If any CDN fails, parts of the whiteboard break. No `<script>` fallbacks or integrity hashes (`integrity` attribute missing on all CDN links). |
| M3 | **Pages missing semantic `<nav>` elements** | Multiple pages | Navigation is injected as a generic `<div>` by JS. No `<nav>` landmark for accessibility. |
| M4 | **Missing `robots.txt` and `sitemap.xml`** | Root | Search engines won't find the site easily. Not critical for a study app but worth adding. |

### 🟢 Low (3)

| ID | Bug | Location | Detail |
|----|-----|----------|--------|
| L1 | **No favicon** | All pages | No `<link rel="icon">` in any page. Browser tab shows generic icon. |
| L2 | **Grammar page is entirely in Chinese** | `grammar.html` | All UI labels, prompts, and instructions are in Chinese. This is a deliberate design choice for the target audience but should be documented. |
| L3 | **Misspelling in mindmap JSON** | `ielts-speaking-mindmap.json` | "influencial" → should be "influential" (found in Charlie Puth section). |

---

## 4. Overhaul Recommendations

### Security
1. **Remove `debug-auth.html` from production or strip the hardcoded credentials.** This is the most urgent fix. Replace with an environment-variable-based approach or remove the file entirely.
2. **Add `integrity` attributes** to all CDN `<script>` and `<link>` tags to prevent supply-chain attacks.
3. **Consider moving supabase configuration** to a server-side endpoint rather than embedding in HTML (though anon key exposure is standard practice for Supabase, the test credentials are not).

### UX / Content
4. **Add audio to the phonetics page.** Even simple Web Speech API or pre-recorded IPA sound clips would dramatically improve the learning experience.
5. **Rename or add interactive exercises to the Grammar page** — "Grammar Lab" should have actual grammar exercises, not just AI prompts.
6. **Add a `<noscript>` fallback on all pages** that rely on navigation.js for critical navigation.
7. **Replace the JS-injected navigation with server-rendered `<nav>`** with proper landmark roles for accessibility.
8. **Add a favicon** — a simple unicorn or "K" icon.

### Technical
9. **Add `robots.txt` and `sitemap.xml`** for SEO.
10. **Add `<meta name="description">` tags** to all pages for better search engine snippets.
11. **Fix typo "influencial" → "influential"** in the mindmap JSON.
12. **Add error monitoring** — the whiteboard has complex JS that could easily break on edge cases. Consider adding error boundaries.

---

## 5. Prioritized Todo List

### Immediate (Do today)
- [ ] **P1** Replace hardcoded test credentials in `debug-auth.html` with environment variables or remove the file
- [ ] **P2** Add `integrity` hashes to all CDN resources (font-awesome, html2canvas, pdf.js, mammoth, html2pdf, supabase SDK)
- [ ] **P3** Add `<noscript>` navigation fallback to all pages

### Short-term (This week)
- [ ] Add audio playback to the phonetics page (Web Speech API or MP3 clips)
- [ ] Add at least one interactive exercise to the Grammar page
- [ ] Inject navigation using semantic `<nav>` element instead of generic `<div>`
- [ ] Add favicon

### Medium-term (This month)
- [ ] Add `robots.txt` and `sitemap.xml`
- [ ] Add `<meta name="description">` tags to all pages
- [ ] Fix "influencial" typo in `ielts-speaking-mindmap.json`
- [ ] Refactor whiteboard JS to load scripts asynchronously with fallbacks

### Long-term (Next quarter)
- [ ] Consider server-side rendering for navigation rather than JS injection
- [ ] Add content security policy (CSP) headers
- [ ] Set up automated error tracking (Sentry, etc.)
- [ ] Add structured data (JSON-LD) for educational content

---

## Appendix: Technical Details

### Supabase Credentials Found
```
URL: https://areedjmpngwzocqpoaur.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZWVkam1wbmd3em9jcXBvYXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5ODAwMTgsImV4cCI6MjA5MjU1NjAxOH0.CSHpruDqBm4mbKseySbbOlZk2-uBG2Oxe4DvqwTVFJ8
```
*(Note: Supabase anon key is designed to be public when Row-Level Security is properly configured. Risk is mitigated if RLS is enforced, which the SQL schema setup enables.)*

### Test Account Exposed
```
Email: sriskeeda@gmail.com
Password: Test123!
```

### Database Schema
The `supabase-setup.sql` defines tables for `students` and `homework` with proper foreign key references to `auth.users` and RLS policies for student data isolation.

### Mindmap JSON
~180KB JSON file containing structured IELTS speaking notes organized by:
- Part 1 topics (Colors, Maths, Singing, Market, etc.)
- Part 2 topic categories (People, Experience/Events, Objects)
- Each with example answers, vocabulary, and phonetic annotations

---

*End of QA Report*
