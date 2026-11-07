# Akshar Abhyas (अक्षर अभ्यास) — Online Touch Typing Platform

A complete, production-ready online touch typing tutor, speed test, and typing games platform built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

Designed with a clean, modern green-and-white aesthetic inspired by professional SaaS applications. Requires **no backend server**, **no database**, **no user registration**, and **no payments**. Everything works immediately upon opening the website, using browser `localStorage` for private progress persistence.

---

## 🌟 Key Highlights & Features

### 1. Interactive Virtual Keyboard
- **10-Finger Zone Color Coding:**
  - Little fingers (Pinky): Soft Rose / Pink (`#FEE2E2` / `#EF4444`)
  - Ring fingers: Soft Amber / Orange (`#FFEDD5` / `#F97316`)
  - Middle fingers: Soft Yellow (`#FEF9C3` / `#EAB308`)
  - Index fingers: Green (`#DCFCE7` / `#16A34A`)
  - Thumbs: Light Blue (`#E0F2FE` / `#0284C7`)
- **Real-time Highlights:** Next expected key glows; currently pressed key presses down; incorrect keys flash red; correct keystrokes flash green.
- **Opposite-Hand Shift Guidance:** Dynamic Shift key highlighting when uppercase letters or symbols are required.
- **Tactile Switch Audio:** Realistic mechanical keyboard click and error audio feedback synthesized in-browser via the Web Audio API (zero external assets).
- **Customizable Controls:** Toggles for keyboard visibility, finger colors, key labels, and audio feedback.
- **Touch & Mobile Support:** Keys are clickable for mobile and tablet users.

---

### 2. Comprehensive 6-Level Curriculum (60 Lessons)
- **Level 1: Absolute Beginner (10 Lessons):** Home-row foundation (`ASDF` & `JKL;`), physical tactile bumps on `F` & `J`, ergonomic posture.
- **Level 2: Beginner (10 Lessons):** Upper row (`QWERT` & `YUIOP`), lower row (`ZXCV` & `BNM`), 26-letter alphabet fluency.
- **Level 3: Intermediate (10 Lessons):** High-frequency digraphs/trigraphs, capital letters, Shift key discipline, punctuation, 35+ WPM goals.
- **Level 4: Numbers & Symbols (10 Lessons):** Top number row (`0-9`), math operators, brackets, currency (`$`), programming syntax.
- **Level 5: Advanced Typing (10 Lessons):** Long paragraphs, technical terminology, camelCase identifiers, 50+ WPM drills.
- **Level 6: Expert (10 Lessons):** Courtroom/medical transcription simulation, multi-clause complex prose, 75+ WPM, capstone certification.

---

### 3. Professional Typing Speed Test (`/typing-test`)
- **Durations:** 15s, 30s, 60s (Standard), 120s, 300s (5-Minute Endurance).
- **Categories:** Standard English, Random Words, Paragraphs, Easy, Hard, Expert, Numbers, Punctuation, and Custom User Text.
- **Standardized Calculations:**
  - Standard Word = 5 keystrokes (including spaces/punctuation)
  - Net WPM = $(\text{Correct Keystrokes} / 5) / \text{Minutes}$
  - Raw WPM = $(\text{Total Keystrokes} / 5) / \text{Minutes}$
  - CPM = $\text{Correct Keystrokes} / \text{Minutes}$
  - Accuracy = $(\text{Correct Keystrokes} / \text{Total Keystrokes}) \times 100\%$
- **Performance Ranks:** Beginner, Elementary, Intermediate, Proficient, Advanced, Pro, Master, Typing Ninja.
- **Share & Certify:** One-click clipboard share and instant redirection to generate a practice certificate.

---

### 4. Five Playable Arcade Typing Games (`/typing-games`)
1. **Word Rain (`/typing-games/word-rain`):** Words fall from the sky; type each word before it strikes the red laser baseline. 5 lives, progressive speed scaling.
2. **Speed Challenge (`/typing-games/speed-challenge`):** 60-second word blitz; type as many random English words as possible to set a personal high score.
3. **Text Survival (`/typing-games/text-survival`):** 100 HP health bar; typos deal damage, while completed sentences restore health and advance stages.
4. **Falling Letters (`/typing-games/falling-letters`):** Fast single-letter arcade drills; hit the physical key before letters hit the floor to rack up combo multipliers.
5. **Word Accuracy Challenge (`/typing-games/word-accuracy`):** Zero-tolerance accuracy mode; builds up to a 10x score multiplier for consecutive error-free words.

---

### 5. Hardware Keyboard Switch Tester (`/keyboard-test`)
- Tests physical key switches, detects ghosting, and highlights stuck or unresponsive keys.
- Real-time keystroke log recording recent keydown/keyup events.
- Progress bar displaying percentage of keyboard keys verified.

---

### 6. Self-Generated Printable Certificate (`/typing-certificate`)
- Customizable student/recipient name.
- Displays certified Net WPM, accuracy, rank, issue date, and unique verification ID.
- Print-ready CSS for clean printing or 1-click "Save as PDF".
- Transparent disclaimer stating it is a self-generated milestone certificate.

---

### 7. User Progress Dashboard (`/progress`)
- 100% Client-side local storage (`localStorage`).
- Best WPM, average accuracy, total practice minutes, and completed lesson count.
- Recent speed test history table.
- High scores table for all 5 arcade games.
- **Data Portability:** Full JSON export, JSON import/restore, and reset capability.

---

### 8. SEO Architecture & Educational Content
- **10 Original Educational Articles (`/typing-tips`):**
  1. *How to Learn Touch Typing from Scratch*
  2. *What Is WPM in Typing? Standard Calculations Explained*
  3. *How to Improve Your Typing Speed: Proven Techniques*
  4. *What Is a Good Typing Speed? Benchmarks for 2026*
  5. *How to Type Without Looking at the Keyboard*
  6. *Correct Finger Placement on a Keyboard: The Complete Guide*
  7. *How to Practice Home Row Typing Effectively*
  8. *How to Improve Typing Accuracy: Zero-Mistake Blueprint*
  9. *Why Touch Typing Is Important in the AI Era*
  10. *Best Ways to Practice Typing Every Day*
- **Structured Data:** Full Schema.org JSON-LD for `SoftwareApplication`, `WebSite`, `BreadcrumbList`, and `Article`.
- **Crawling Foundations:** Dynamic `sitemap.xml` (all 96 static pages indexed) and `robots.txt`.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14.2 (App Router)
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS 3.4
- **Icons:** Lucide React
- **Audio:** Web Audio API (tactile switch synthesizer)
- **Testing:** Vitest 2.1
- **Deployment:** Vercel

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.17+ or 20+ installed.

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/your-username/akshar-abhyas.git
cd akshar-abhyas

# Install dependencies
npm install

# Run the test suite
npm test

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🧪 Testing

Automated unit tests cover typing metric calculations, character-to-key finger mapping, Shift requirements, and curriculum integrity:

```bash
npm test
```

---

## 📦 Production Build & Vercel Deployment

### Build Locally
```bash
npm run build
```

### Deploy to Vercel
This project is configured to deploy directly to Vercel with zero backend or database setup:

1. Push your repository to **GitHub**.
2. Visit [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will be automatically detected as **Next.js**.
5. Leave build command as default (`next build`) and output directory as default (`.next`).
6. Click **Deploy**.

---

## 📄 License
MIT License. Free for educational and personal use.
