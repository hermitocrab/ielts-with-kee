# IELTS with Kee 🦄🍌

> **Master IELTS Speaking, Pronunciation, Grammar & Writing** — interactive teaching tools by Master Kee.

A static HTML/CSS/JS website combining four powerful IELTS preparation tools into one unified hub with navigation, a mindmap viewer, and downloadable resources.

## 🚀 Live Demo

Deployed to: [GitHub Pages URL] | [Vercel URL]

## 📁 Project Structure

```
ielts-website/
├── index.html              # Landing page (site hub)
├── whiteboard.html         # Kee's Language Lab — Interactive whiteboard
├── phonetics.html          # Connected Speech Pro — Phonetics flip cards
├── speaking.html           # Part 1 Speaking Toolkit — Flashcards
├── grammar.html            # Grammar Lab (Nano Banana Edition)
├── resources.html          # Resource downloads page (PDFs)
├── mindmap.html            # IELTS Speaking mindmap viewer
├── css/
│   └── global.css          # Shared styles (purple/pink/banana theme)
├── js/
│   ├── navigation.js       # Shared navigation bar component
│   └── mindmap-renderer.js # Mindmap JSON renderer
└── README.md
```

## 🎯 Features

| Tool | Description |
|------|-------------|
| 📝 **Whiteboard** | Full-featured interactive whiteboard with PDF import, drawing tools, annotations, and export |
| 🔊 **Phonetics** | Connected speech learning with interactive flip cards, phoneme practice |
| 🗣️ **Speaking** | IELTS Part 1 flashcard toolkit with question patterns and model answers |
| 📚 **Grammar Lab** | Interactive grammar exercises with band 7+ patterns |
| 🧠 **Mindmap** | Visual IELTS Speaking syllabus with 8 main branches and 200+ nodes |
| 📥 **Resources** | Downloadable PDF question banks and phrase drills |

## 🎨 Brand

- **Name:** IELTS with Kee
- **Persona:** Master Kee — the unicorn teaching assistant
- **Colors:** Purple `#9F44D3`, Pink `#FF2442`, Banana Yellow `#FFD700`
- **Vibe:** Teaching tools with 🦄 unicorn + 🍌 Nano Banana aesthetic

## 🛠 Development

This is a **pure static site** — no build tools, no package managers, no backend required.

### To run locally:
```bash
cd ielts-website
# Serve with any HTTP server, e.g.:
python3 -m http.server 8080
# or
npx serve .
```

### To deploy:
Push to GitHub and enable GitHub Pages from the `ielts-website/` folder (or root).  
Or deploy to Vercel by pointing to the `ielts-website/` directory.

## 📦 Dependencies

External CDN resources used by the tools:
- Font Awesome 6 (icons)
- html2canvas (whiteboard export)
- PDF.js (PDF import on whiteboard)
- Mammoth.js (DOCX import on whiteboard)
- html2pdf.js (PDF export on whiteboard)

*These are loaded via CDN in the individual tool HTML files.*

## 🧠 Mindmap Data

The mindmap loads from `../ielts-speaking-mindmap.json` (located in the sibling `ielts-toolkit/` directory). It is an XMind-format JSON export with the full IELTS Speaking syllabus.

## 📄 License

Internal teaching tool — use freely for IELTS preparation.
