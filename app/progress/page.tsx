"use client";

import React, { useState, useEffect } from "react";
import {
  getUserProgress,
  exportProgressToJson,
  importProgressFromJson,
  resetProgress,
  DEFAULT_USER_PROGRESS,
} from "@/lib/storage/localStorage";
import { UserProgress } from "@/types/progress";
import { formatDuration } from "@/lib/calculations/typingMetrics";
import {
  Award,
  BookOpen,
  Calendar,
  Clock,
  Download,
  Flame,
  Gamepad2,
  RotateCcw,
  ShieldCheck,
  Timer,
  Trash2,
  TrendingUp,
  Upload,
} from "lucide-react";
import Link from "next/link";

export default function ProgressDashboardPage() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_USER_PROGRESS);
  const [mounted, setMounted] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setProgress(getUserProgress());

    const handleUpdate = () => {
      setProgress(getUserProgress());
    };
    window.addEventListener("akshar-progress-updated", handleUpdate);
    return () => window.removeEventListener("akshar-progress-updated", handleUpdate);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center text-muted-foreground">
        Loading your practice history...
      </div>
    );
  }

  // Calculate summary metrics
  const completedCount = Object.keys(progress.completedLessons).length;
  const testsCount = progress.testsHistory.length;

  let bestWpm = 0;
  let totalWpm = 0;
  let totalAcc = 0;

  progress.testsHistory.forEach((t) => {
    if (t.wpm > bestWpm) bestWpm = t.wpm;
    totalWpm += t.wpm;
    totalAcc += t.accuracy;
  });

  const avgWpm = testsCount > 0 ? Math.round(totalWpm / testsCount) : 0;
  const avgAcc = testsCount > 0 ? Math.round((totalAcc / testsCount) * 10) / 10 : 0;
  const totalMinutes = Math.round(progress.totalPracticeSeconds / 60);

  const handleExport = () => {
    const json = exportProgressToJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `akshar-abhyas-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importProgressFromJson(content);
      if (res.success) {
        setImportStatus("Progress successfully restored!");
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus(`Failed to import: ${res.error}`);
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to delete all saved practice data? This cannot be undone.")) {
      resetProgress();
      setProgress(DEFAULT_USER_PROGRESS);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-1">
            Learning Progress & Analytics
          </h1>
          <p className="text-muted-foreground text-sm flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Saved securely in your browser's local storage (100% private, no login required)</span>
          </p>
        </div>

        {/* Data Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition"
            title="Download your progress as JSON"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>

          <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer transition">
            <Upload className="w-4 h-4" />
            <span>Import JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 transition"
            title="Reset all saved data"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {importStatus && (
        <div className="mb-6 p-3 rounded-xl bg-brand-50 border border-brand-300 text-brand-800 text-sm font-medium animate-fade-in">
          {importStatus}
        </div>
      )}

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Best Speed
            </span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-brand-600 dark:text-brand-400">
            {bestWpm} <span className="text-sm font-sans font-medium text-slate-500">WPM</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Average Accuracy
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {avgAcc > 0 ? `${avgAcc}%` : "--"}
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Lessons Completed
            </span>
            <BookOpen className="w-4 h-4 text-sky-500" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {completedCount} <span className="text-sm font-sans font-medium text-slate-500">/ 60</span>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Practice Time
            </span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {totalMinutes} <span className="text-sm font-sans font-medium text-slate-500">min</span>
          </div>
        </div>
      </div>

      {/* Game High Scores Section */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-8">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-brand-600" />
          <span>Arcade Typing Game High Scores</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { id: "word-rain", name: "Word Rain", link: "/typing-games/word-rain" },
            { id: "speed-challenge", name: "Speed Challenge", link: "/typing-games/speed-challenge" },
            { id: "text-survival", name: "Text Survival", link: "/typing-games/text-survival" },
            { id: "falling-letters", name: "Falling Letters", link: "/typing-games/falling-letters" },
            { id: "word-accuracy", name: "Word Accuracy", link: "/typing-games/word-accuracy" },
          ].map((game) => {
            const record = progress.gameHighScores[game.id];
            return (
              <Link
                key={game.id}
                href={game.link}
                className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-brand-500 transition group"
              >
                <div className="text-xs font-semibold text-muted-foreground group-hover:text-brand-600 transition mb-1">
                  {game.name}
                </div>
                <div className="font-mono text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {record ? record.score : 0}
                  <span className="text-xs font-sans text-muted-foreground font-normal ml-1">pts</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Typing Tests History */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Timer className="w-5 h-5 text-brand-600" />
          <span>Recent Speed Tests ({testsCount})</span>
        </h2>

        {testsCount === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <p className="mb-3">No speed tests taken yet.</p>
            <Link
              href="/typing-test"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 text-white font-semibold text-xs shadow-sm hover:bg-brand-700 transition"
            >
              Take Your First Test
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase font-bold text-muted-foreground">
                <tr>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Mode</th>
                  <th className="py-2.5 px-3">Net WPM</th>
                  <th className="py-2.5 px-3">Accuracy</th>
                  <th className="py-2.5 px-3">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {progress.testsHistory.slice(0, 15).map((test) => (
                  <tr key={test.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-2.5 px-3 text-xs text-muted-foreground font-sans">
                      {new Date(test.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-3 text-xs capitalize text-slate-700 dark:text-slate-300 font-sans">
                      {test.duration}s • {test.category}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-brand-600 dark:text-brand-400">
                      {test.wpm}
                    </td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">
                      {test.accuracy}%
                    </td>
                    <td className="py-2.5 px-3 font-sans text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-brand-50 dark:bg-emerald-950/40 text-brand-700 dark:text-brand-300 font-semibold border border-brand-200 dark:border-emerald-800">
                        {test.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
