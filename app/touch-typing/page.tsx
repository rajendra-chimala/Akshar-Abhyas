import React from "react";
import Link from "next/link";
import { generateSeoMetadata, generateBreadcrumbSchema } from "@/lib/seo/metadata";
import { BookOpen, CheckCircle, ArrowRight, Shield, Zap, Keyboard } from "lucide-react";

export const metadata = generateSeoMetadata({
  title: "Touch Typing: The Definitive Guide to Typing Without Looking",
  description: "Learn how touch typing works, why the home row is your anchor, and how muscle memory allows you to type faster than 80 WPM effortlessly.",
  path: "/touch-typing",
  keywords: [
    "touch typing",
    "learn touch typing",
    "touch typing practice",
    "how to touch type",
    "typing without looking",
    "touch typing for beginners",
  ],
});

export default function TouchTypingMasterGuidePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Touch Typing Guide", item: "/touch-typing" },
  ]);

  return (
    <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-2">
          Comprehensive Touch Typing Guide
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-4">
          The Definitive Guide to Touch Typing Mastery
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Touch typing is the cognitive bridge between thought and digital text. By training subconscious motor memory, you eliminate visual searching and multiply your daily productivity.
        </p>
      </div>

      {/* Quick Start Action Card */}
      <div className="p-6 bg-brand-50/80 dark:bg-emerald-950/40 border border-brand-200 dark:border-emerald-800 rounded-3xl mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-brand-900 dark:text-brand-200 mb-1">
            Ready to start practicing immediately?
          </h2>
          <p className="text-xs sm:text-sm text-brand-700 dark:text-brand-300">
            Our 6-level interactive curriculum takes you from the home row to 75+ WPM.
          </p>
        </div>
        <Link
          href="/typing-lessons"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition active:scale-95 shrink-0"
        >
          <span>Start Level 1</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Body Content */}
      <div className="prose dark:prose-invert max-w-none space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            What Is Touch Typing?
          </h2>
          <p>
            Touch typing is the practice of locating and pressing keys on a physical keyboard relying solely on neuromuscular muscle memory, without using your eyes to scan keycaps. Rather than moving your entire hand across the keyboard hunting for letters, both hands remain anchored over the <strong>home row</strong> keys (<code>A S D F</code> on the left, and <code>J K L ;</code> on the right).
          </p>
          <p>
            Every key is assigned to a designated finger. After striking a key in an upper or lower row, your finger immediately recoils to its home row base.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            The Biomechanics of the Home Row
          </h2>
          <p>
            Standard QWERTY keyboards feature raised tactile bumps on the <code>F</code> and <code>J</code> keys. These ridges serve as spatial anchors:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong className="text-slate-800 dark:text-slate-100">Left Index Finger:</strong> Rests on <code>F</code>.</li>
            <li><strong className="text-slate-800 dark:text-slate-100">Right Index Finger:</strong> Rests on <code>J</code>.</li>
            <li><strong className="text-slate-800 dark:text-slate-100">Thumbs:</strong> Rest naturally over the <code>Spacebar</code>.</li>
            <li><strong className="text-slate-800 dark:text-slate-100">Remaining Fingers:</strong> Rest sequentially over <code>A, S, D</code> and <code>K, L, ;</code>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Why Looking Down Slows You Down by 60%
          </h2>
          <p>
            When you glance down at your keyboard while typing, your visual processing system must perform three distinct cognitive steps:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>Refocus eyes from the monitor down to the keyboard.</li>
            <li>Visually scan rows to identify the desired letter.</li>
            <li>Refocus back up to the monitor to verify if the character appeared correctly.</li>
          </ol>
          <p>
            This constant cycle interrupts your working memory. In contrast, touch typists buffer thoughts in continuous prose while subconscious motor loops execute the keystrokes in parallel.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Recommended Practice Schedule
          </h2>
          <p>
            Consistency beats marathon cram sessions. We recommend:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 not-prose my-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase text-brand-600 block mb-1">Step 1 (5 mins)</span>
              <p className="text-xs text-slate-600 dark:text-slate-300">Complete 2 lessons from the structured curriculum.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase text-brand-600 block mb-1">Step 2 (5 mins)</span>
              <p className="text-xs text-slate-600 dark:text-slate-300">Take a 60-second speed test to record your daily WPM benchmark.</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase text-brand-600 block mb-1">Step 3 (5 mins)</span>
              <p className="text-xs text-slate-600 dark:text-slate-300">Play a typing arcade game like Word Rain for reflex conditioning.</p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

