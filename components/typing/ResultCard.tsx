"use client";

import React, { useState } from "react";
import { formatDuration } from "@/lib/calculations/typingMetrics";
import { TypingMetrics } from "@/types/typing";
import {
  Award,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  Share2,
  FileBadge,
} from "lucide-react";
import Link from "next/link";

interface ResultCardProps {
  metrics: TypingMetrics;
  testTitle?: string;
  onRestart: () => void;
  nextLessonHref?: string;
  className?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  metrics,
  testTitle = "Typing Test Completed!",
  onRestart,
  nextLessonHref,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const shareText = `⌨️ I just scored ${metrics.wpm} WPM with ${metrics.accuracy}% accuracy (${metrics.rating}) on Akshar Abhyas! Practice touch typing at https://aksharabhyas.com`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`w-full max-w-2xl mx-auto p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl flex flex-col items-center text-center animate-fade-in ${className}`}
    >
      {/* Trophy Badge */}
      <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-950/60 border border-brand-300 dark:border-brand-700 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-4 shadow-sm">
        <Award className="w-8 h-8" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-1">
        {testTitle}
      </h2>

      {/* Performance Rank */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-emerald-950/40 border border-brand-200 dark:border-emerald-800 text-brand-700 dark:text-brand-300 text-sm font-semibold mb-6">
        <CheckCircle2 className="w-4 h-4 text-brand-600" />
        <span>Rating: {metrics.rating}</span>
      </div>

      {/* Metrics Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* WPM */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs uppercase font-medium text-muted-foreground block mb-1">
            Net WPM
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-brand-600 dark:text-brand-400">
            {metrics.wpm}
          </span>
        </div>

        {/* Accuracy */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs uppercase font-medium text-muted-foreground block mb-1">
            Accuracy
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-800 dark:text-slate-100">
            {metrics.accuracy}%
          </span>
        </div>

        {/* Raw WPM */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs uppercase font-medium text-muted-foreground block mb-1">
            Raw WPM
          </span>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-slate-600 dark:text-slate-300">
            {metrics.rawWpm}
          </span>
        </div>

        {/* Characters & Errors */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-xs uppercase font-medium text-muted-foreground block mb-1">
            Time & Errors
          </span>
          <div className="font-mono text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
            {formatDuration(metrics.elapsedSeconds)} / {metrics.incorrectChars} err
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <button
          type="button"
          onClick={onRestart}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm transition"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Share Result</span>
            </>
          )}
        </button>

        <Link
          href={`/typing-certificate?wpm=${metrics.wpm}&acc=${metrics.accuracy}&rating=${metrics.rating}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-sm transition"
        >
          <FileBadge className="w-4 h-4" />
          <span>Get Certificate</span>
        </Link>

        {nextLessonHref && (
          <Link
            href={nextLessonHref}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition"
          >
            <span>Next Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

