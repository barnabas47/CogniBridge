# 🧠 CogniBridge — Cognitive Accessibility & Executive Function OS
> **Built for the [Code for Humanity Hackathon](https://code-for-humanity.devpost.com/)**  
> *Empowering neurodivergent individuals, ADHDers, dyslexic readers, seniors, and underserved communities by eliminating cognitive friction and turning overwhelming bureaucracy into effortless, panic-free action.*

---

## 🌟 The Problem: The Invisible Wall of Cognitive Overload

For over **1.3 billion people globally** (including individuals with ADHD, Autism, Dyslexia, low digital literacy, elderly citizens, and refugees), everyday bureaucratic paperwork, medical test reports, tax notices, and university syllabus rules trigger severe **executive dysfunction and anxiety paralysis**.

- **Anxiety & Avoidance:** Opening an official tax warning or hospital lab panel induces panic, leading to delayed action and cascading penalties.
- **Cognitive Fog:** Wall-of-text legal jargon and dense typography overwhelm working memory.
- **Fragmented Tools:** Existing solutions only do one thing (e.g., text-to-speech without simplification, or to-do breakdowns without document understanding).

---

## 🚀 The Solution: What is CogniBridge?

**CogniBridge** is an all-in-one **Multimodal Cognitive Accessibility Platform** that ingests complex documents (via Photo/Camera OCR, Voice Dictation, PDF, or Pasted Text) and transforms them into a sensory-friendly, panic-free actionable experience:

```
[ Complex Paper Letter / Medical Lab / University Syllabus ]
                           ⬇ (Multimodal Gemini 2.5 Flash / On-Device Vision)
┌────────────────────────────────────────────────────────────────────────┐
│ 1. 🟢/🟡/🔴 Cognitive Triage: Panic-Free 10-Word Bottom Line           │
│ 2. ⚡ Laser-Focus Step Wizard: Single-step Anti-Paralysis Micro-Tasks │
│ 3. 📖 Bionic Reading & Dyslexia Engine: Lexend / OpenDyslexic / TTS    │
│ 4. 💡 Jargon Buster: Real-world analogies for legal/medical terms      │
│ 5. ✉️ Resolution Studio: 1-Click Official Reply & .ICS Calendar Alerts │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🏆 Key Features & Innovations

### 1. 🧘 Cognitive Triage & Panic Radar
- **Instant Emotional De-escalation:** Immediately tells the user: *"Relax: this is just informational, no payment required"* or *"Action needed: 8-day deadline for 14,500 HUF"*.
- **10-Word Bottom Line:** Extreme executive-function-friendly TL;DR.
- **Key Entities Matrix:** Amounts, deadlines, IBAN bank accounts, and case numbers with 1-click clipboard copy.

### 2. ⚡ Laser-Focus Micro-Action Wizard (Anti-Paralysis)
- **1-Step-at-a-Time Focus Mode:** Eliminates list paralysis by displaying only the active micro-step (~2-minute tasks).
- **Sub-step Decomposer:** Breaks down complex tasks even further if the user feels stuck.
- **Dopamine Micro-Rewards:** Gentle celebratory micro-animations on step completion.

### 3. 📖 Adaptive Reading & Sensory Dimmer
- **Real-time Bionic Reading Engine:** Algorithmically bolds the fixation point of each word to boost reading speed and ease visual strain.
- **Interactive Reading Ruler:** Ambient focus mask that follows cursor/keyboard navigation to reduce visual crowding.
- **Accessible Typography:** Native support for `Lexend` (scientifically proven for dyslexia/ADHD fluency), `OpenDyslexic`, and `Inter`.
- **Sensory Calming Themes:** Soft Sage (sensory soothing), Warm Sepia (eye strain relief), Dyslexia Yellow (contrast tint), and OLED Dark.
- **Zero-Cost Web Speech API:** Client-side text-to-speech with live word-by-word tracking and voice dictation.

### 4. 💡 Jargon Buster & Context Lens
- Auto-detects dense bureaucratic and medical terminology.
- Interactive cards provide plain language explanations, real-world analogies, and direct actionability context.

### 5. ✉️ Resolution Studio
- Auto-generates polite, formal reply letters in multiple tones (Request for Extension, Confirmation of Payment, Inquiries).
- Generates `.ics` calendar events pre-configured with 3-day and 1-day reminders.

### 6. 🔒 Privacy-First & Offline Vault
- Local-first client architecture: sensitive personal documents stay private in your browser (LocalStorage / IndexedDB).
- 100% Free: runs out-of-the-box with intelligent sample cases or connects to free-tier Google Gemini 2.5 Flash API.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling & Design System:** Tailwind CSS v4 + Radix UI Primitives + Lucide React
- **Animations:** Framer Motion + Canvas Confetti
- **Typography:** `@fontsource/lexend`, `@fontsource/inter`, `OpenDyslexic`
- **AI & Multimodal Vision:** Google Gemini 2.5 / 1.5 Flash API (`@google/genai`)
- **Speech Engine:** Native Web Speech API (`SpeechSynthesis` & `SpeechRecognition`)
- **Storage:** LocalStorage / IndexedDB Private Vault

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cognibridge.git
cd cognibridge

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to start exploring CogniBridge!

---

## 🎯 Code for Humanity Judging Criteria Alignment

| Criteria | Weight | How CogniBridge Excels |
| :--- | :---: | :--- |
| **Impact** | **30%** | Directly removes the executive function barrier for 15-20% of the population facing ADHD, dyslexia, cognitive fatigue, and administrative exclusion. |
| **Innovation** | **25%** | First unified system combining real-time bionic fixation, panic triage, laser-focus decomposition, and multimodal resolution. |
| **Technical Excellence** | **20%** | Zero-latency React 19 + Vite architecture, WCAG 2.2 AAA accessibility compliance, structured Gemini JSON schema, native Web Speech integration. |
| **UX & Accessibility** | **15%** | Multiple dyslexia fonts, Reading Ruler ambient masks, sensory color themes, full keyboard navigability, screen reader semantics. |
| **Scalability & Sustainability** | **10%** | 100% free-tier scalable, zero-server operational cost, modular multi-language expandability. |

---

*Made with ❤️ for the global Code for Humanity community.*

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
