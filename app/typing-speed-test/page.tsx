import React from "react";
import Link from "next/link";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { Timer, Award, Zap, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = generateSeoMetadata({
  title: "Typing Speed Test (WPM) - Free Online Keyboard Test",
  description: "Test your typing speed (WPM) and accuracy with our free online typing test. Choose 1 minute, 2 minute, or 5 minute tests with real-time feedback and certification.",
  path: "/typing-speed-test",
  keywords: [
    "typing speed test",
    "typing speed test WPM",
    "1 minute typing test",
    "5 minute typing test",
    "online typing test",
    "free typing speed test",
    "typing test with keyboard",
  ],
});

export default function TypingSpeedTestSeoLandingPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 font-semibold text-xs border border-brand-200 dark:border-emerald-800 uppercase tracking-wider mb-3 inline-block">
          Official Benchmark
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-4">
          Free Online Typing Speed Test (WPM)
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          Accurately measure your Words Per Minute (WPM), Characters Per Minute (CPM), and typing accuracy in 60 seconds with our zero-distraction typing test.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/typing-test"
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg transition active:scale-95"
          >
            <Timer className="w-5 h-5" />
            <span>Start 60-Second Typing Test</span>
          </Link>
          <Link
            href="/typing-lessons"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm transition"
          >
            <span>Learn Touch Typing</span>
          </Link>
        </div>
      </div>

      {/* Test Durations Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-emerald-950/50 text-brand-600 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
            1 Minute Typing Test (60s)
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            The global gold standard for assessing typing speed in job interviews and academic benchmarks.
          </p>
          <Link
            href="/typing-test"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 hover:underline"
          >
            <span>Take 1 Min Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 flex items-center justify-center mb-4">
            <Timer className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
            30 Second Sprint Test
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Quick burst speed test designed to measure peak finger acceleration and immediate reflex reflexes.
          </p>
          <Link
            href="/typing-test"
            className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1 hover:underline"
          >
            <span>Take 30s Sprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
            5 Minute Endurance Test (300s)
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Measure your typing stamina, consistent accuracy, and fatigue resistance over extended writing.
          </p>
          <Link
            href="/typing-test"
            className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 hover:underline"
          >
            <span>Take 5 Min Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Educational Explanation Section */}
      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm mb-12 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          How Typing Speed (WPM) Is Calculated
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Standardized WPM uses the scientific five-character keystroke standard:
        </p>

        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-2 border border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-brand-600 font-bold">Standard Word:</span> 5 characters (including letters, punctuation, and spaces)
          </div>
          <div>
            <span className="text-brand-600 font-bold">Net WPM Formula:</span> (Correct Keystrokes / 5) / (Elapsed Time in Minutes)
          </div>
          <div>
            <span className="text-brand-600 font-bold">Accuracy Formula:</span> (Correct Keystrokes / Total Keystrokes) × 100%
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 pt-4">
          WPM Performance Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-muted-foreground uppercase">
              <tr>
                <th className="py-2.5 px-3">WPM Range</th>
                <th className="py-2.5 px-3">Skill Level</th>
                <th className="py-2.5 px-3">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-slate-600">0 - 24 WPM</td>
                <td className="py-2.5 px-3 font-semibold text-rose-600">Beginner</td>
                <td className="py-2.5 px-3 text-muted-foreground">Hunt-and-peck typist, glances at keyboard.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-slate-600">25 - 45 WPM</td>
                <td className="py-2.5 px-3 font-semibold text-amber-600">Intermediate</td>
                <td className="py-2.5 px-3 text-muted-foreground">Average casual typist, adequate for daily emails.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-slate-600">46 - 65 WPM</td>
                <td className="py-2.5 px-3 font-semibold text-brand-600">Proficient</td>
                <td className="py-2.5 px-3 text-muted-foreground">Standard professional requirement for modern office roles.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-slate-600">66 - 85 WPM</td>
                <td className="py-2.5 px-3 font-semibold text-emerald-600">Advanced</td>
                <td className="py-2.5 px-3 text-muted-foreground">Software engineers, writers, high-efficiency typists.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold text-slate-600">86+ WPM</td>
                <td className="py-2.5 px-3 font-semibold text-purple-600">Master / Ninja</td>
                <td className="py-2.5 px-3 text-muted-foreground">Court reporters, transcriptionists, competitive speed typists.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
