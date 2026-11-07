import React from "react";
import Link from "next/link";
import { generateSeoMetadata, generateBreadcrumbSchema } from "@/lib/seo/metadata";
import { Keyboard, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const metadata = generateSeoMetadata({
  title: "Learn Keyboard Typing: Beginner to Master Typing Guide",
  description: "A complete step-by-step guide to learning keyboard typing. Master key reaches, posture, finger zones, and typing ergonomics.",
  path: "/learn-keyboard-typing",
  keywords: [
    "learn keyboard typing",
    "keyboard typing practice",
    "typing practice for beginners",
    "how to type fast",
    "typing tutor free",
  ],
});

export default function LearnKeyboardTypingGuidePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Learn Keyboard Typing", item: "/learn-keyboard-typing" },
  ]);

  return (
    <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-2">
          Foundations & Technique
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-4">
          Learn Keyboard Typing: The Beginner's Complete Roadmap
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Master the physical keyboard layout, understand finger reach zones, adopt healthy ergonomic typing posture, and practice with real-time feedback.
        </p>
      </div>

      {/* Hero Links */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <Link
          href="/typing-lessons"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition active:scale-95"
        >
          <Keyboard className="w-4 h-4" />
          <span>Start Interactive Lessons</span>
        </Link>
        <Link
          href="/typing-test"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm transition"
        >
          <span>Take a Speed Test</span>
        </Link>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            1. Keyboard Anatomy & The 10-Finger Zone Map
          </h2>
          <p>
            Standard computer keyboards consist of four main character rows: the Number row, the Upper (QWERTY) row, the Home (ASDF) row, and the Lower (ZXCV) row.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 not-prose space-y-2 text-xs sm:text-sm">
            <p><strong className="text-rose-600 font-semibold">Pinky Fingers:</strong> Responsible for edge keys: <code>Q, A, Z, 1, Tab, Caps, Left Shift</code> (Left Hand) and <code>P, ;, /, 0, Backspace, Enter, Right Shift</code> (Right Hand).</p>
            <p><strong className="text-amber-600 font-semibold">Ring Fingers:</strong> Handle the second column: <code>W, S, X, 2</code> (Left Hand) and <code>O, L, ., 9</code> (Right Hand).</p>
            <p><strong className="text-yellow-600 font-semibold">Middle Fingers:</strong> Handle the third column: <code>E, D, C, 3</code> (Left Hand) and <code>I, K, ,, 8</code> (Right Hand).</p>
            <p><strong className="text-emerald-600 font-semibold">Index Fingers:</strong> Handle two columns each: <code>R, T, F, G, V, B, 4, 5</code> (Left Hand) and <code>Y, U, H, J, N, M, 6, 7</code> (Right Hand).</p>
            <p><strong className="text-sky-600 font-semibold">Thumbs:</strong> Rest over the <code>Spacebar</code>.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            2. Ergonomic Sitting Posture
          </h2>
          <p>
            Typing without fatigue requires good biomechanical alignment:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Keep your back straight and feet flat on the floor.</li>
            <li>Maintain elbows at an open angle of 90 to 110 degrees.</li>
            <li>Do not rest your wrists heavily on the desk edge while actively striking keys; let them hover gently.</li>
            <li>Keep screen eye-level to prevent neck strain.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            3. The 3 Phases of Touch Typing Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-4">
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <span className="text-xs font-bold uppercase text-brand-600 block mb-1">Phase 1 (Week 1-2)</span>
              <h3 className="font-bold text-base mb-1">Finger Positioning</h3>
              <p className="text-xs text-muted-foreground">Focus exclusively on finger discipline and returning to home row keys. Target: 15-20 WPM with 95% accuracy.</p>
            </div>
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <span className="text-xs font-bold uppercase text-brand-600 block mb-1">Phase 2 (Week 3-6)</span>
              <h3 className="font-bold text-base mb-1">Word Fluency</h3>
              <p className="text-xs text-muted-foreground">Shift from individual letters to whole common words. Smooth out cadence. Target: 35-50 WPM.</p>
            </div>
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <span className="text-xs font-bold uppercase text-brand-600 block mb-1">Phase 3 (Month 2+)</span>
              <h3 className="font-bold text-base mb-1">Speed & Stamina</h3>
              <p className="text-xs text-muted-foreground">Read ahead, handle numbers and punctuation effortlessly. Target: 65-85+ WPM.</p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

