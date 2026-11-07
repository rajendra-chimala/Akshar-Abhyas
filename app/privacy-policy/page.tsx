import React from "react";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { ShieldCheck, Lock, Database, RefreshCw } from "lucide-react";

export const metadata = generateSeoMetadata({
  title: "Privacy Policy - 100% Private, Local-Only Touch Typing",
  description: "Akshar Abhyas privacy policy: Learn how our zero-tracking, client-side localStorage architecture guarantees your privacy.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-2">
          Your Privacy First
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground">
          Last updated: November 2026 • Effective immediately
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-6">
        <section className="p-5 bg-brand-50/80 dark:bg-emerald-950/40 border border-brand-200 dark:border-emerald-800 rounded-2xl">
          <h2 className="text-lg font-bold text-brand-900 dark:text-brand-200 flex items-center gap-2 mb-2 not-prose">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
            <span>Core Privacy Guarantee: Zero User Tracking</span>
          </h2>
          <p className="text-xs sm:text-sm text-brand-800 dark:text-brand-300">
            Akshar Abhyas does not collect, sell, lease, or transmit your keystrokes, personal identity, or typing statistics to any remote database. Everything runs 100% inside your local web browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            1. What Data Is Stored?
          </h2>
          <p>
            When you complete a typing lesson, speed test, or arcade game on Akshar Abhyas, the application stores your results locally in your browser's <code>localStorage</code>. This data includes:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground text-sm">
            <li>Lesson completion status and target WPM records.</li>
            <li>Typing test history (timestamps, WPM, CPM, accuracy).</li>
            <li>Arcade typing game high scores.</li>
            <li>User interface preferences (virtual keyboard toggles, sound settings, color guides).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            2. Keystroke Privacy
          </h2>
          <p>
            Your keystrokes are processed ephemerally in real-time memory to compare against the exercise text. Keystrokes are never logged to a remote server or telemetry service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            3. Data Portability & Deletion
          </h2>
          <p>
            You have complete control over your practice records:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground text-sm">
            <li>You can export your complete history as a standard JSON file at any time on the <a href="/progress" className="text-brand-600 underline">Progress Dashboard</a>.</li>
            <li>You can permanently delete all stored data with a single click using the "Reset Progress" button.</li>
            <li>Clearing your browser's site data or cache will also delete all stored records.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

