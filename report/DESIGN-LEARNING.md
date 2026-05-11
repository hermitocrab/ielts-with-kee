# Design Research & Learning Report
## IELTS Speaking Question Bank Redesign · May 2026

---

## Phase 1: Sites Researched

### 1. Stripe Docs
**URL:** docs.stripe.com  
**Category:** Documentation/Reference  
**What I learned:**
- Three-panel layout (sidebar → content → right TOC) creates clear information scent
- Typographic scale is conservative but precise — 3-4 sizes only, with weight as differentiator
- Color is used sparingly; blue is the only accent, reserved for links and CTAs
- Cards are used for "use case" navigation, not for data display
- Information density is LOW — every section has generous whitespace

### 2. Linear Docs
**URL:** linear.app/docs  
**Category:** Documentation/Reference  
**What I learned:**
- Command-palette navigation is a power-user feature, but sidebar + search is universal
- Dark sidebar + light content creates natural visual separation
- Iconography is consistent and semantic — every nav item has an icon
- Cards in Linear are minimal: title, description, status badge — nothing more
- "Progressive disclosure" — show summary first, details on click

### 3. Apple Human Interface Guidelines
**URL:** developer.apple.com/design/human-interface-guidelines  
**Category:** Documentation/Reference  
**What I learned:**
- Generous line-height (1.5-1.6) creates readability even at small sizes
- San Francisco's optical sizing — different weights create hierarchy without size changes
- Sidebar stays sticky but scrolls independently
- Every interactive element has clear affordance — no "mystery meat" navigation
- Content width capped (~680px for reading) prevents eye fatigue

### 4. Pitchfork Reviews
**URL:** pitchfork.com/reviews/albums/  
**Category:** Editorial Database  
**What I learned:**
- Card grid is the primary data browsing pattern — 4 columns on desktop, 2 on mobile
- Each card has exactly 4 elements: artwork, artist, album, date — NO MORE
- The score badge (colored circle with number) is the hero element — instant scanability
- Category filters at the top let users slice the database instantly
- Typography is restrained: one serif (for editorial feel) + one sans (for metadata)

### 5. Brainscape Flashcards
**URL:** brainscape.com/subjects  
**Category:** Question Bank / Flashcard App  
**What I learned:**
- Taxonomic hierarchy: broad subject → narrower category → specific deck → individual cards
- Breadcrumbs are essential for deep hierarchies — users must always know where they are
- "Knowledge Genome" metaphor makes data feel alive and interconnected
- Card counts per category give users immediate scope awareness
- Search is primary — filters are secondary

### 6. Notion Templates Gallery
**URL:** notion.so/templates  
**Category:** Modern Web App Data Browsing  
**What I learned:**
- Gallery view is the most engaging way to browse a large dataset
- Card metadata (creator, category, use case) enriches browsing without cluttering
- Featured vs. chronological sorting gives editorial control
- Filter chips are more touchable than dropdowns on mobile
- Empty states are intentional — they guide the user to create or search

### 7. Our World in Data
**URL:** ourworldindata.org  
**Category:** Government/Open Data Portal  
**What I learned:**
- Data storytelling: every chart comes with a narrative, not just raw numbers
- Topic pages are the atomic unit — each is a self-contained exploration
- "Key Insights" cards distill massive datasets into digestible takeaways
- Statistics as hero numbers (13,858 charts · 126 topics) create instant credibility
- Footer methodology section builds trust through transparency

### 8. A24 Films
**URL:** a24films.com/films  
**Category:** Editorial Database / Gallery  
**What I learned:**
- Film posters as the card hero — full-bleed images create immersion
- Minimal metadata on cards (title only) — details on hover/click
- Grid with varied aspect ratios creates visual rhythm vs monotonous uniformity
- Brand identity is inseparable from UI — the design IS the brand
- Dark mode as default creates cinematic atmosphere

---

## Phase 2: Core Design Principles (7)

### Principle 1: One Thing Per Card
Every card should answer exactly one question. In the current report, a single cue card shows: topic name (header), topic name again (Chinese prompt), describe line, bullets, explain line, category badge, new badge. That's 7 pieces of information fighting for attention. The redesign: topic is the card title. Category is a subtle color accent. Everything else is behind a click/tap.

### Principle 2: Progressive Disclosure
Show the skeleton first, the muscle second. Stripe and Linear both master this: summary in the list view, details on demand. For IELTS questions: show topic name + category + season badge in the grid. Click to expand the full cue card with bullets, describe line, and follow-ups.

### Principle 3: Breathing Room Is Information
Apple HIG and Stripe Docs both prove that whitespace isn't wasted — it's the most important design element. Generous padding, wide line-height, and content width caps create focus. The current report crams too much into each card. The redesign: cards breathe. 24px+ padding. Content max-width 720px. Line-height 1.6 minimum.

### Principle 4: Color as Signifier, Not Decoration
Pitchfork's score badges, Stripe's single blue accent, Linear's status colors — color should MEAN something. The redesign: purple = Part 2, teal = Part 1, amber = high frequency, green = new. No decorative gradients. Every color decision communicates data.

### Principle 5: Navigation Should Be Invisible
The best navigation is the one you don't notice. Linear's command palette, Stripe's search, Notion's sidebar — they work because they're always there but never in the way. The redesign: sticky sidebar with sections, search bar always visible, tab content loads instantly (no flash).

### Principle 6: Type Creates Hierarchy, Not Size
Playfair Display for editorial moments (hero, section headers). Source Serif 4 for reading (question text). Inter for UI (navigation, badges, metadata). Three typefaces, each with a clear role. No more than 4 font sizes on screen at once.

### Principle 7: Every Number Tells a Story
Our World in Data excels at this: statistics aren't decoration, they're the content. The hero stats (134 cue cards, 7 seasons, 37 new topics) should be prominent and contextual. Badge counts on every category heading. "X of Y" progress indicators.

---

## Phase 3: Specific UI Patterns (5)

### Pattern 1: Masonry Card Grid with Color-Coded Side Accents
Instead of the current uniform grid, cards get a 4px left border accent matching their category color. This creates instant visual grouping without explicit labels. Inspired by Pitchfork's colored score badges + Linear's status indicators.

### Pattern 2: Expandable "Quick View" Overlay
Instead of the current accordion that pushes content down, clicking a card opens a centered modal/overlay with the full cue card. This keeps the grid context visible and prevents layout shifts. Inspired by Notion's page peek + A24's film detail modals.

### Pattern 3: Persistent Search Bar with Live Filter Chips
A single search bar at the top that filters ALL content (Part 1 + Part 2) simultaneously. Below it: filter chips for category (👥 People, 📍 Places, 🎬 Events, 📦 Objects) and type (Part 1, Part 2). Chips are more touchable than dropdowns. Inspired by Notion's filter system + Pitchfork's genre navigation.

### Pattern 4: Sticky Two-Column Layout
Left sidebar (240px) always visible on desktop with: navigation sections, stats summary, methodology link. Right content area scrolls independently. On mobile, sidebar collapses to a horizontal scroll. Inspired by Stripe Docs + Apple HIG.

### Pattern 5: Data Storytelling Cards for Insights
Instead of the current grid of insight cards, use "data story" cards that combine: a hero statistic, a one-sentence insight, and an expandable explanation. This makes the insights section feel like editorial content, not bullet points. Inspired by Our World in Data.

---

## Phase 4: Color Palette & Typography

### Color Palette
```
Primary (P2/People):    #6366F1 (Indigo) — confident, trustworthy
Primary (P2/Places):    #0D9488 (Teal) — calm, geographic
Primary (P2/Events):    #D97706 (Amber) — warm, memorable
Primary (P2/Objects):   #7C3AED (Violet) — curious, tangible
Secondary (P1):         #0891B2 (Cyan) — conversational, light
Success (New):          #16A34A (Green) — fresh
Warning (High Freq):    #D97706 (Amber) — attention
Background:             #FAFBFC (near-white with warmth)
Surface:                #FFFFFF
Text Primary:           #1E293B (Slate 800)
Text Secondary:         #64748B (Slate 500)
Text Tertiary:          #94A3B8 (Slate 400)
Border:                 #E2E8F0 (Slate 200)
Border Accent:          #CBD5E1 (Slate 300)
```

### Typography Scale
```
Hero Title:    Playfair Display 700 · 3rem / 1.15
Section Head:  Playfair Display 700 · 1.75rem / 1.25
Card Title:    Inter 600 · 0.95rem / 1.35
Body Text:     Source Serif 4 400 · 1rem / 1.7
Metadata:      Inter 500 · 0.75rem / 1.4
Badges:        Inter 600 · 0.675rem / 1
```

---

## Phase 5: Information Architecture (Report Site)

```
IELTS Report
├── Hero (stats + description)
│   └── Quick Stats Row: 134 cards · 20 P1 topics · 7 seasons · 37 new
├── Search & Filter Bar (persistent)
│   ├── Text input
│   ├── Category chips: All | People | Places | Events | Objects
│   └── Type chips: All | Part 1 | Part 2
├── Tab Navigation (P2-style pills)
│   ├── 🆕 Latest Season (May–Aug 2026)
│   ├── 🏆 All-Time Rankings
│   └── 🔍 Full Database
├── [Tab Content]
│   ├── Latest Season:
│   │   ├── Part 1 Accordion (by category)
│   │   └── Part 2 Card Grid (by category, with section headers)
│   ├── All-Time Rankings:
│   │   ├── Part 1 Top 20 Table
│   │   └── Part 2 Top 20 Table
│   └── Full Database:
│       ├── Filtered Part 1 Accordions
│       └── Filtered Part 2 Card Grid
├── Key Insights (data story cards)
├── Recommendations for Teaching
├── Methodology (transparent footer)
└── Footer
```

---

## What Makes This Design "Cutting-Edge"

1. **Not trendy — timeless.** No glassmorphism, no brutalism, no gradients. Just clean typography, generous whitespace, and intentional color. This will look good in 5 years.

2. **Information density calibrated to the task.** A reference site should let you scan quickly (hence the card grid) but read deeply when you find something (hence the expandable detail view). The density adapts to the user's intent.

3. **Color communicates, not decorates.** Every color choice maps to data: category, frequency, newness. Users learn the visual language in seconds and navigate faster.

4. **Mobile-first but desktop-optimized.** Touch targets ≥44px. Cards stack on mobile. But the desktop experience is the primary target — this is a research tool, not a social feed.

5. **Editorial quality for educational content.** The Playfair Display hero, Source Serif body text, and generous spacing create a reading experience worthy of NYT or The New Yorker — appropriate for academic content.

6. **Zero redundancy.** Every piece of information appears exactly once. Topic name is the card title. Category is the side accent color. The "describe" line appears only in the expanded detail view. No more "3 times in one card."
