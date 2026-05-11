# IELTS Speaking Part 2 — RUA Syllabus Blueprint
## Web Structure & Learning Architecture

> **Role:** Expert IELTS Curriculum Designer × Web Developer  
> **Project:** `ielts-speaking-p2` — a new section within the "IELTS with Kee" ecosystem  
> **Framework:** RUA (Recognize → Understand → Apply) with DynamOS ⚡ branding  
> **Instructional Language:** Band 5–accessible English (simple, clear, no academic jargon)  
> **Target Lexical Level:** B2 (Band 6.5) — natural collocations, native-like phrasing, ~100 chunks per category

---

## 1. QUESTION BANK ANALYSIS

Scanned: `紫藤雅思2026年1-4月口语题库纯享版` — 56 pages, 50+ Part 2 prompts.

### Category Distribution (Complete Extraction)

| Category | New Season | Retained | **Total** |
|----------|-----------|----------|-----------|
| **PEOPLE** (人物) | 7 | 6 | **13** |
| **EVENT** (事件) | 7 | 11 | **18** |
| **PLACE** (地点) | 4 | 3 | **7** |
| **OBJECT** (物品) | 9 | 12 | **21** |

---

## 2. THEMATIC ANGLES (Per Category)

### 🧑 PEOPLE — 5 Angles

| # | Angle | Chinese | What It Covers | Sample Prompt Mapping |
|---|-------|---------|----------------|----------------------|
| 1 | **Physical Appearance** | 外貌特征 | Height, build, face, style, presence | 想见的名人, 喜欢画画的朋友 |
| 2 | **Personality** | 性格品质 | Traits, habits, values, quirks | 乐于助人的人, 常做计划的人, 机智解决问题的人 |
| 3 | **Your Relationship** | 你与TA的关系 | How you met, bond, shared experiences | 最重要的好朋友, 学习新知识的朋友, 在家族企业工作的人 |
| 4 | **Lifestyle** | 生活方式 | Daily routine, hobbies, passions, work | 擅长音乐的朋友, 钦佩的创作者, 鼓励你保护自然的人 |
| 5 | **Achievement** | 成就与影响 | What they've done, impact on others, legacy | 钦佩的运动员, 受欢迎的人 |

### 📍 PLACE — 5 Angles

| # | Angle | Chinese | What It Covers | Sample Prompt Mapping |
|---|-------|---------|----------------|----------------------|
| 1 | **Location & Access** | 位置与交通 | Where, how to get there, surroundings | 商场, 外国的短期停留 |
| 2 | **Physical Description** | 外观描述 | Size, architecture, layout, colors, details | 有趣的建筑, 旅途中所见的有趣建筑 |
| 3 | **Atmosphere & Feeling** | 氛围与感受 | Vibe, mood, sounds, smells, emotional tone | 家里放松的地方, 自然之地 |
| 4 | **Activities & Functions** | 活动与功能 | What you do there, purpose, who uses it | 商场, 想去的多树之地 |
| 5 | **Personal Connection** | 个人联系 | Memories, why it matters to YOU | 家里放松的地方, 自然之地 |

### 🎬 EVENT — 5 Angles

| # | Angle | Chinese | What It Covers | Sample Prompt Mapping |
|---|-------|---------|----------------|----------------------|
| 1 | **Background & Setting** | 背景设定 | When, where, why it happened, context | 等待特别事情, 突然停电 |
| 2 | **Sequence & Process** | 过程顺序 | Step-by-step, what happened first/next/last | 弄坏东西, 第一次用外语, 迷路 |
| 3 | **People Involved** | 人物关系 | Who was there, roles, interactions | 为家人骄傲, 给别人建议 |
| 4 | **Emotional Journey** | 情感变化 | How you felt before/during/after, emotional arc | 不享受的音乐活动, 别人向你道歉 |
| 5 | **Significance & Lesson** | 意义与收获 | Why it matters, what you learned, lasting impact | 发挥想象力, 鼓励别人做不愿做的事 |

### 🎁 OBJECT — 5 Angles

| # | Angle | Chinese | What It Covers | Sample Prompt Mapping |
|---|-------|---------|----------------|----------------------|
| 1 | **Physical Description** | 外观描述 | Size, shape, color, material, visual details | 童年喜欢的玩具, 家中老物件 |
| 2 | **Function & Use** | 功能与用途 | What it does, how you use it, when/where | app/程序, 想拥有的科技产品, 生活中离不开的东西 |
| 3 | **Origin & History** | 来源与历史 | Where it came from, how you got it, backstory | 花费超过预期的物品, 对家庭重要的东西 |
| 4 | **Personal Value** | 个人价值 | Why it matters to YOU, emotional attachment | 有用的书, 别人帮忙做的决定 |
| 5 | **Comparison & Uniqueness** | 比较与独特 | How it differs from similar things, what makes it special | 让你失望的电影 vs 近期观影, 不同寻常的一餐 |

---

## 3. WEB STRUCTURE — PAGE LAYOUT

### 3.1 Overall Architecture

```
┌─────────────────────────────────────────────────┐
│              STICKY TOP NAV                      │
│  🦄 IELTS with Kee  │  P1  │  P2 ⚡ │  P3  │  Resources  │
└─────────────────────────────────────────────────┘
┌──────────┬──────────────────────────────────────┐
│          │                                       │
│  SIDEBAR │         MAIN CONTENT AREA             │
│          │                                       │
│  🧑 People│  ┌─────────────────────────────────┐ │
│  📍 Places│  │  HERO SECTION (category intro)   │ │
│  🎬 Events│  │  Title + Subtitle + Prompt Count  │ │
│  🎁 Objects│  └─────────────────────────────────┘ │
│          │                                       │
│  [Case    │  ┌─────────────────────────────────┐ │
│   Study] │  │  TAB / ACCORDION PANEL           │ │
│          │  │  [Angle 1] [Angle 2] [Angle 3]   │ │
│          │  │  [Angle 4] [Angle 5]              │ │
│          │  │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │ │
│          │  │  Active Angle Content:            │ │
│          │  │  • Chunk Cards (Flashcards)       │ │
│          │  │  • Sample Prompts (mapped)        │ │
│          │  │  • Quick Practice Box             │ │
│          │  └─────────────────────────────────┘ │
│          │                                       │
│          │  ┌─────────────────────────────────┐ │
│          │  │  PRACTICE DRILL AREA             │ │
│          │  │  "Pick a Prompt → Use Chunks"    │ │
│          │  └─────────────────────────────────┘ │
│          │                                       │
└──────────┴──────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│                 FOOTER (RUA ⚡)                   │
└─────────────────────────────────────────────────┘
```

### 3.2 UI Component Inventory

| Component | Purpose | Behaviour |
|-----------|---------|-----------|
| **Sticky Top Nav** | Navigate between P1/P2/P3/Resources | Fixed top, scrolled state, consistent with `ielts-with-kee` |
| **Sidebar** | Category switching (People/Places/Events/Objects) | Sticky, highlights active, collapse on mobile |
| **Hero Section** | Category intro — title, angle preview, prompt count | Changes content on sidebar click (SPA-style or page reload) |
| **Tab Bar** | Toggle between 5 thematic angles within a category | Active tab highlighted, content swaps below with fade transition |
| **Interactive Flashcards** | Present ~20 lexical chunks per angle | Flip animation (click to reveal: chunk → meaning → example → prompt mapping), swipe on mobile |
| **RUA Badge** | Labels each chunk by RUA stage | `R` = recognition chunks, `U` = understanding chunks, `A` = application chunks |
| **Call-out Block** | Eileen Gu case study reference section | Prominent bordered card with gradient accent, always visible in People sidebar |
| **Modal** | Full Eileen Gu deep-dive | Triggered by "View Case Study" button, shows all 4 prompt adaptations |
| **Practice Drill Box** | Quick speaking practice generator | "Random Prompt + Pick 3 Chunks" button with timer |
| **Progress Tracker** | Simple checkbox "I've used this chunk" | LocalStorage persistence, per-user |

---

## 4. UI COMPONENT DETAIL

### 4.1 Hero Section (Dynamic per Category)

```
┌──────────────────────────────────────────────┐
│  ⚡ RUA P2 LAB                                │
│                                              │
│  🧑  PEOPLE                                  │
│  Master 5 Angles · 13 Real Prompts           │
│  ~100 B2 Lexical Chunks                      │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │ 📋 Sample Prompt:                     │    │
│  │ "Describe a successful sportsperson   │    │
│  │  you admire"                          │    │
│  │                                       │    │
│  │ [Start Practicing →]                  │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

- Gradient background matches category color (People=indigo, Places=teal, Events=amber, Objects=violet)
- Prompt count dynamically shows `N real exam prompts`
- Sample prompt rotates on page load (one of the mapped prompts for that category)

### 4.2 Tab / Accordion Panel

```
┌──────────────────────────────────────────────┐
│  [Physical    │ Personality │ Relationship    │
│   Appearance] │             │                 │
│              (active tab)                     │
│  [Lifestyle]  │ [Achievement]                 │
│──────────────────────────────────────────────│
│                                              │
│  ▲ PERSONALITY — Chunk Cards (20/20)          │
│                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │chunk │ │chunk │ │chunk │ │chunk │       │
│  │ card │ │ card │ │ card │ │ card │  ...  │
│  └──────┘ └──────┘ └──────┘ └──────┘       │
│                                              │
│  ─────────────────────────────────────────── │
│  📋 Mapped Prompts for this Angle:            │
│  • 乐于助人的人                               │
│  • 常做计划的人                               │
│  • 机智解决问题的人                           │
└──────────────────────────────────────────────┘
```

- **Desktop:** Horizontal tab bar, 5 tabs
- **Mobile:** Vertical accordion (collapsible sections)
- Active tab slides content area with fade transition
- Tab shows chunk count badge: `Personality (20)`

### 4.3 Interactive Flashcard

```
┌─────────────────────┐      ┌─────────────────────┐
│                     │      │                     │
│   FRONT (Default)   │ FLIP │   BACK (Revealed)   │
│                     │  →   │                     │
│  "down-to-earth"    │      │  Meaning: 接地气的    │
│   ⚡ R              │      │  Example:            │
│                     │      │  "Despite her fame,  │
│                     │      │   she's incredibly   │
│                     │      │   down-to-earth."    │
│                     │      │                     │
│                     │      │  🎯 Use for:         │
│                     │      │  钦佩的运动员         │
│                     │      │  受欢迎的人           │
│                     │      │                     │
│                     │      │  [✓ I've used this]  │
└─────────────────────┘      └─────────────────────┘
```

**Card anatomy:**
- **Front:** Lexical chunk (large text), RUA stage badge (⚡R / 🧠U / 🎯A), category tag
- **Back:** Chinese meaning, natural example sentence, 2–3 mapped prompt names, checkbox
- **Interaction:** Click/tap to flip, swipe left/right to navigate between cards
- **Visual:** Glassmorphism card (matches `ielts-with-kee` aesthetic), colored left border by category
- **Animation:** 3D CSS flip (0.4s cubic-bezier)

**RUA Stage Badges:**
- ⚡ **R (Recognize):** Chunks for describing — adjectives, physical traits, factual phrases
- 🧠 **U (Understand):** Chunks for explaining — reasons, causes, comparisons, context
- 🎯 **A (Apply):** Chunks for storytelling — transitions, emotional language, concluding phrases

### 4.4 Sidebar Navigation

```
┌──────────────┐
│  P2 TOPICS   │
│              │
│  🧑 People   │ ← active (highlighted, indigo)
│    13 prompts│
│              │
│  📍 Places   │
│    7 prompts │
│              │
│  🎬 Events   │
│    18 prompts│
│              │
│  🎁 Objects  │
│    21 prompts│
│              │
│ ──────────── │
│  ⭐ CASE      │
│  STUDY       │
│              │
│  🏅 Eileen   │ ← special call-out
│     Gu       │
│  4-in-1 Map  │
│              │
└──────────────┘
```

- Sticky on desktop (position: sticky, top: 80px)
- Collapses to horizontal scroll on mobile
- Active category has colored left border + background highlight
- Eileen Gu case study is a permanent CTA at the bottom of the sidebar
- Prompt counts update dynamically

### 4.5 Eileen Gu Case Study — Call-out Block

```
┌──────────────────────────────────────────────────┐
│  ⭐ CASE STUDY: EILEEN GU (谷爱凌)                │
│  THE 4-IN-1 PEOPLE PROMPT ADAPTOR                 │
│                                                   │
│  One person. Four different cue cards.             │
│  Same content, different angles.                  │
│                                                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │ 钦佩的   │ │ 想见的   │ │ 受欢迎的 │ │ 钦佩的  │ │
│  │ 运动员   │ │ 名人     │ │ 人       │ │ 创作者  │ │
│  │         │ │         │ │         │ │        │ │
│  │ Focus:  │ │ Focus:  │ │ Focus:  │ │ Focus: │ │
│  │ Achieve-│ │ Why you │ │ What    │ │ Creati-│ │
│  │ ment &  │ │ want to │ │ makes   │ │ vity & │ │
│  │ athletic│ │ meet her│ │ her     │ │ brand- │ │
│  │ journey │ │ + where │ │ popular │ │ building│ │
│  └─────────┘ └─────────┘ └─────────┘ └────────┘ │
│                                                   │
│  [🔍 View Full Case Study →]   Opens Modal        │
└──────────────────────────────────────────────────┘
```

**Modal Content (full view):**
- Scrollable overlay, dark glassmorphism background
- **Section 1:** Eileen Gu profile snapshot (age, background, key achievements)
- **Section 2:** 4-column comparison grid showing how the SAME content is angled differently for each prompt
- **Section 3:** Pre-written opening sentences for each of the 4 prompts
- **Section 4:** Which chunks from the 5 People angles apply to each prompt version
- **Section 5:** "Adapt Your Own Person" template — blank grid for students to fill in

### 4.6 Practice Drill Box

```
┌──────────────────────────────────────────────────┐
│  🎯 QUICK DRILL                                   │
│                                                   │
│  Random Prompt:                                   │
│  "Describe a person who often helps others"       │
│                                                   │
│  Your Mission: Use at least 3 chunks from today    │
│                                                   │
│  Suggested Chunks:                                │
│  [go out of one's way] [a heart of gold]          │
│  [wouldn't hesitate to...]                        │
│                                                   │
│  ┌─────────────────────────────────────────┐     │
│  │  Tap to start 2-minute timer...          │     │
│  └─────────────────────────────────────────┘     │
│                                                   │
│  [🎲 New Prompt]  [⏱ Start Timer]  [📝 Notes]    │
└──────────────────────────────────────────────────┘
```

---

## 5. FILE ARCHITECTURE

```
ielts-with-kee/
├── speaking-p2/
│   ├── index.html              ← P2 hub page (sidebar navigation between categories)
│   ├── css/
│   │   └── p2-module.css       ← P2-specific styles (cards, tabs, sidebar, modal)
│   ├── js/
│   │   ├── p2-navigation.js    ← Sidebar click → load category content
│   │   ├── p2-tabs.js           ← Tab switching + accordion (mobile)
│   │   ├── p2-flashcards.js     ← Card flip, swipe, progress tracking
│   │   ├── p2-drill.js          ← Random prompt + timer logic
│   │   └── p2-modal.js          ← Eileen Gu case study modal
│   ├── data/
│   │   ├── people-chunks.json   ← ~100 chunks, categorized by angle + RUA stage
│   │   ├── places-chunks.json
│   │   ├── events-chunks.json
│   │   ├── objects-chunks.json
│   │   └── prompts-mapping.json ← All prompts mapped to angles (for dynamic display)
│   └── partials/
│       ├── hero-people.html
│       ├── hero-places.html
│       ├── hero-events.html
│       ├── hero-objects.html
│       └── eileen-gu-modal.html
```

---

## 6. VISUAL DESIGN TOKENS (Matches ielts-with-kee RUA Edition)

| Token | Value | Usage |
|-------|-------|-------|
| `--p2-people` | `#6366F1` (Indigo) | People category accent |
| `--p2-places` | `#0D9488` (Teal) | Places category accent |
| `--p2-events` | `#D97706` (Amber) | Events category accent |
| `--p2-objects` | `#7C3AED` (Violet) | Objects category accent |
| `--rua-r` | `#3B82F6` (Blue) | Recognize stage badge |
| `--rua-u` | `#8B5CF6` (Purple) | Understand stage badge |
| `--rua-a` | `#F59E0B` (Gold) | Apply stage badge |
| Card Style | Glassmorphism | Matches existing `liquid-glass-card` |
| Font Stack | Inter + Syncopate | Matches `rkrk.io` + `ielts-with-kee` |
| Border Radius | 12–20px | Progressive rounding per component level |

---

## 7. CONTENT STRATEGY — THE 400+ CHUNKS

### Distribution Plan

| Category | Angles | Chunks/Angle | **Total Chunks** |
|----------|--------|-------------|-----------------|
| 🧑 People | 5 | ~20 | **~100** |
| 📍 Places | 5 | ~20 | **~100** |
| 🎬 Events | 5 | ~20 | **~100** |
| 🎁 Objects | 5 | ~20 | **~100** |
| ⭐ Eileen Gu | — | ~15 (adaptor phrases) | **~15** |
| **TOTAL** | | | **~415** |

### Chunk Format (per entry in JSON)

```json
{
  "id": "p-a1-001",
  "chunk": "down-to-earth",
  "category": "people",
  "angle": "personality",
  "ruaStage": "r",
  "meaning": "接地气的，务实的",
  "example": "Despite her fame, she's incredibly down-to-earth.",
  "mappedPrompts": ["钦佩的运动员", "受欢迎的人"],
  "collocations": ["incredibly down-to-earth", "surprisingly down-to-earth"],
  "bandLevel": 6.5
}
```

### RUA Stage Distribution Within Each Angle

| RUA Stage | % of Chunks | Purpose |
|-----------|------------|---------|
| ⚡ R (Recognize) | ~40% | Descriptive chunks — what things ARE (adjectives, nouns, basic collocations) |
| 🧠 U (Understand) | ~35% | Explanatory chunks — WHY and HOW (cause/effect, comparison, context phrases) |
| 🎯 A (Apply) | ~25% | Storytelling chunks — transitions, emotion, conclusion, "glue" language |

---

## 8. EILEEN GU — 4-PROMPT ADAPTATION MAP

| Cue Card | Focus Angle | Key Chunks to Deploy | Opening Sentence |
|----------|------------|---------------------|-----------------|
| **钦佩的运动员** | Achievement + Lifestyle | *broke records, pushed boundaries, relentless work ethic, trailblazer* | "The sportsperson I truly admire is Eileen Gu, the freestyle skier who made history at the 2022 Winter Olympics." |
| **想见的名人** | Physical Appearance + Personality | *down-to-earth, carries herself with grace, bilingual, role model* | "If I could meet any famous person, I'd choose Eileen Gu — not just because she's an Olympic champion, but because she bridges two cultures so effortlessly." |
| **受欢迎的人** | Personality + Your Relationship + Lifestyle | *relatable, inspires young people, speaks her mind, authentic* | "A person I think is incredibly popular right now is Eileen Gu — and honestly, the reasons go way beyond her medals." |
| **钦佩的创作者** | Achievement + Personality (reframed as creative) | *carved her own path, brand-builder, multifaceted, redefined what's possible* | "A creative person I admire is Eileen Gu — not for painting or music, but for how she's designed her own identity as an athlete-student-model all in one." |

**The key insight for students:** Same person, same core facts. Different opening, different emphasis, different chunk selection. That's the 4-in-1 method.

---

## 9. DEVELOPMENT PHASES

| Phase | Deliverable | Effort |
|-------|------------|--------|
| **Phase 1** | `index.html` hub page + sidebar + CSS tokens + People category (hero, tabs, 100 chunks as static HTML cards) | Core MVP |
| **Phase 2** | Places + Events + Objects categories (hero content, tabs, 300 chunks) | Content expansion |
| **Phase 3** | Eileen Gu call-out block + modal (full case study content) | Case study |
| **Phase 4** | JavaScript: card flip, tab switching, practice drill, progress tracker, data-driven loading from JSON | Interactivity |
| **Phase 5** | Mobile responsive polish, accordion mode, swipe gestures | Polish |

---

## 10. AWAITING APPROVAL

Before I generate **one line of lexical chunk content** or **one line of HTML**, I need your sign-off on:

1. ✅ **Angles structure** — Are the 5 angles per category right? Any you'd add/remove/rename?
2. ✅ **Web layout** — Sidebar + tabs + flashcards + call-out block + modal work for you?
3. ✅ **Eileen Gu 4-prompt mapping** — Right 4 prompts selected? Different ones you'd prefer?
4. ✅ **RUA stage distribution** — 40/35/25 split acceptable?
5. ✅ **File architecture** — Single HTML hub with JSON data vs separate HTML pages per category?
6. ✅ **Phase approach** — Start with People category as MVP, expand from there?

Reply with any adjustments and I'll start building. ⚡
