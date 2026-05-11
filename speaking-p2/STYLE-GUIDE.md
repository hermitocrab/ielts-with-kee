# P2 Style Guide — IELTS Speaking Part 2

Aesthetic principles and taste anchors for all future topics (Places, Events, Objects, etc).

**Reference implementation:** `people.html` + `css/p2.css` + `js/p2.js` — this is the canonical codebase. Match its vibe.

---

## Layout

- Sidebar: active category at top → sub-items (Chunks, Case Study, Quick Drill) indented with left border accent → other categories below as top-level links
- No separate "Quick Access" section — sub-items belong under their parent category
- Mobile: hidden sidebar, ☰ dropdown in nav banner, auto-hides after 5s no interaction
- Desktop: sticky sidebar, pure CSS, no JS interference
- Full-page gradient background that changes with tab switch — VISIBLE colors, not subtle pastels
- Gradient transitions: 0.8s ease, 170deg angle, deep start → medium middle → neutral base

## Cards

- 3D rotateY(180deg) flip, NEVER opacity/scale fade
- perspective + transform-style: preserve-3d + backface-visibility: hidden
- All -webkit- prefixed
- touch-action: manipulation on every card
- Swipe detection: track touchstart coords, reject movement >8px (swipe ≠ tap)
- role="button" tabindex="0" on every card for iOS Safari
- No :hover transforms that change layout dimensions (no translateY on hover)
- outline: none on :focus/:focus-visible
- -webkit-tap-highlight-color: transparent
- Grid rows: explicit grid-auto-rows matching card height — prevents flip-triggered reflow

## Chunk Cards

- Front: chunk phrase (1.2rem, bold) + "Tap to reveal" (0.72rem, light)
- Back: example sentence (0.85rem, dark) + Chinese translation (0.8rem, light) + "✓ Mark as used" button
- NO italic on example text
- NO separator/border between English and Chinese — tight 2px margin
- Auto-highlight target phrase in example with yellow mark tag (JS-powered, handles pronoun variants)
- Used button toggles to green "✅ Got it" state, persisted in localStorage
- Desktop: height 220px. Mobile: min-height 180px

## Structure Cards

- Dark background (#1E293B) with white text
- Blanks displayed as inline spaces — NEVER underlined, NEVER border-bottom
- Front: sentence frame with blank spaces
- Back: example sentence (0.9rem, italic, white) + Chinese translation (0.82rem)
- Min-height 160px on desktop, 120px on mobile
- overflow: hidden to prevent content leakage
- word-break: break-word on both example and translation

## Buttons

- All same visual weight — no random primary highlighted buttons
- Clean white background, 1px border, 12px border-radius, subtle shadow
- Hover: slight bg change + border darken
- Active: subtle scale down (0.97-0.98)
- New Prompt: green tint (F0FDF4 bg, BBF7D0 border)
- Save: purple accent (solid var(--p2-people))
- Timer display: monospace font, centered between button groups
- Min-height 40-44px for touch targets

## Typography & UI Text

- ALL interface text must be natural, authentic English — no Chinglish, no awkward phrasing
- "Tap to reveal" — never "Click to flip"
- "Mark as used" — never "I've used this"
- "Sentence frames" — never "Useful Structures"
- "Vocabulary chunks" or "Lexical Chunks"
- "Cue cards" or "Real Exam Prompts"
- "Speaking angles" not "Descriptive Angles"
- Instruction text: conversational, not robotic
- iMessage: emoji for emphasis, ZERO markdown (no **, ##, ---, ``, - lists)

## Case Study (NYT Editorial)

- Serif fonts: New York, Georgia, Times New Roman
- Rubric line: all-caps, red (#9B1B20), small, tracked out
- Headline: italic, large (2.4rem), tight line-height
- Lede: medium gray, slightly larger than body
- Drop cap on first paragraph: 4.5rem, red, italic
- Pull quote: left border accent, cream bg, centered italic text, large quote mark, cite below
- Hero image: full-width, subtle border-radius, caption in small gray
- Byline: small, gray, Inter font
- Footer note: cream bg, small text, acknowledging chunk integration
- Article integrates 20+ chunks and 10+ sentence frames from the topic
- Divider between article and case study cards: thin gray line, 120px wide, centered

## Mobile

- All tappable elements ≥ 44px
- Cards: single column grid
- Fonts scale down proportionally
- Tabs: horizontal scroll with -webkit-overflow-scrolling: touch, min-width 90-100px
- Sidebar: fixed dropdown from nav, max-height animation, 5s auto-close
- Sidebar items: 48px min-height, comfortable padding

## Technical

- Cache-busting query params on CSS/JS (?v=N, bumped on every deploy)
- vercel.json with no-cache, no-store, must-revalidate headers for /speaking-p2/
- Vercel --force flag on deploys
- CSS: verified balanced braces before deploy (grep -o '{' | wc -l)
- JS: node -c syntax check before deploy
- Verify live CSS matches committed code with curl before claiming done
- When user reports bug: verify live, don't assume

## Interaction

- Pause and ask if prompt is ambiguous — never guess and build
- When user is frustrated: acknowledge, state problem, fix, keep it short
- Never claim fix complete until curl-verified on live domain
- Test on actual target device before reporting success
