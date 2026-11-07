"use client";

import React from "react";
import { formatDuration } from "@/lib/calculations/typingMetrics";
import { TypingMetrics } from "@/types/typing";
import { RotateCcw, Volume2, VolumeX, ShieldAlert } from "lucide-react";

interface MetricsBarProps {
  metrics: TypingMetrics;
  remainingSeconds: number | null;
  onRestart: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  strictBackspace?: boolean;
  onToggleStrictBackspace?: () => void;
  className?: string;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({
  metrics,
  remainingSeconds,
  onRestart,
  soundEnabled,
  onToggleSound,
  strictBackspace = false,
  onToggleStrictBackspace,
  className = "",
}) => {
  return (
    <div
      className={`w-full flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm ${className}`}
    >
      {/* Primary live metrics */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* WPM */}
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            WPM
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-brand-700 dark:text-brand-400 font-mono">
            {metrics.wpm}
          </span>
        </div>

        {/* Accuracy */}
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Accuracy
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-mono">
            {metrics.accuracy}%
          </span>
        </div>

        {/* CPM */}
        <div className="hidden sm:flex flex-col">
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            CPM
          </span>
          <span className="text-lg sm:text-xl font-bold text-slate-600 dark:text-slate-400 font-mono">
            {metrics.cpm}
          </span>
        </div>

        {/* Errors */}
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Errors
          </span>
          <span
            className={`text-lg sm:text-xl font-bold font-mono ${
              metrics.incorrectChars > 0 ? "text-rose-500" : "text-emerald-500"
            }`}
          >
            {metrics.incorrectChars}
          </span>
        </div>

        {/* Timer / Remaining */}
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            {remainingSeconds !== null ? "Time Left" : "Elapsed"}
          </span>
          <span className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-300 font-mono">
            {remainingSeconds !== null
              ? `${remainingSeconds}s`
              : formatDuration(metrics.elapsedSeconds)}
          </span>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-2">
        {/* Strict backspace toggle */}
        {onToggleStrictBackspace && (
          <button
            type="button"
            onClick={onToggleStrictBackspace}
            title={
              strictBackspace
                ? "Strict Mode (Backspace disabled) - Click to allow backspace"
                : "Normal Mode (Backspace allowed) - Click to enforce strict mode"
            }
            className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition ${
              strictBackspace
                ? "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300"
                : "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden md:inline">
              {strictBackspace ? "Strict" : "Normal"}
            </span>
          </button>
        )}

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          title={soundEnabled ? "Mute typing audio" : "Enable typing audio"}
          className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Restart Button */}
        <button
          type="button"
          onClick={onRestart}
          title="Restart exercise (Esc or Tab+Enter)"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-medium text-xs sm:text-sm shadow-sm transition active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart</span>
        </button>
      </div>
    </div>
  );
};
