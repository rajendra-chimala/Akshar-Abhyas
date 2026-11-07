"use client";

import React, { useState, useEffect } from "react";
import { KEYBOARD_ROWS } from "@/lib/typing/keyboardData";
import { soundEffects } from "@/lib/typing/soundEffects";
import { RotateCcw, Volume2, VolumeX, CheckCircle, Info } from "lucide-react";

export default function KeyboardTestPage() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [keyHistory, setKeyHistory] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser default for test keys (Space, Tab, Backspace, etc.)
      if (["Space", "Tab", "Backspace", "AltLeft", "AltRight"].includes(e.code)) {
        e.preventDefault();
      }

      if (soundEnabled) {
        soundEffects.playKeyClick(true);
      }

      setActiveCode(e.code);
      setPressedKeys((prev) => new Set(prev).add(e.code));
      setKeyHistory((prev) => [e.code, ...prev].slice(0, 20));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setActiveCode(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [soundEnabled]);

  const handleReset = () => {
    setPressedKeys(new Set());
    setKeyHistory([]);
    setActiveCode(null);
  };

  // Calculate total testable keys
  const totalKeys = KEYBOARD_ROWS.reduce((acc, row) => acc + row.length, 0);
  const testedCount = pressedKeys.size;
  const percentage = Math.round((testedCount / totalKeys) * 100);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
          Interactive Keyboard Tester
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Press any key on your physical keyboard to verify key switches, detect ghosting, or identify stuck and unresponsive keys.
        </p>
      </div>

      {/* Progress & Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Keys Tested:
            </span>
            <span className="font-mono font-bold text-brand-600 dark:text-brand-400 text-lg">
              {testedCount} / {totalKeys} ({percentage}%)
            </span>
          </div>

          <div className="w-32 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${percentage}%` }}
              className="h-full bg-brand-500 rounded-full transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            title={soundEnabled ? "Mute audio" : "Enable audio"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-brand-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Test</span>
          </button>
        </div>
      </div>

      {/* Keyboard Visual Display */}
      <div className="p-4 sm:p-6 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-inner mb-6 overflow-x-auto">
        <div className="flex flex-col gap-1.5 min-w-[700px]">
          {KEYBOARD_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-1.5 justify-center w-full">
              {row.map((key) => {
                const isTested = pressedKeys.has(key.code);
                const isCurrentlyDown = activeCode === key.code;

                let btnClass = "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700";

                if (isCurrentlyDown) {
                  btnClass = "bg-brand-600 text-white border-brand-700 scale-95 shadow-inner";
                } else if (isTested) {
                  btnClass = "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700 font-semibold";
                }

                return (
                  <div
                    key={key.code}
                    className={`
                      relative h-11 rounded-lg border flex flex-col items-center justify-center
                      font-mono text-xs sm:text-sm select-none shadow-sm transition-all duration-75
                      ${key.width || "w-11"} ${btnClass}
                    `}
                  >
                    {key.shiftLabel && (
                      <span className="text-[10px] leading-none opacity-60">
                        {key.shiftLabel}
                      </span>
                    )}
                    <span className="leading-tight">{key.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Keystroke Log */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>Recent Key Events:</span>
          </span>
          <span className="text-xs text-muted-foreground">Showing last 20 events</span>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[36px]">
          {keyHistory.length === 0 ? (
            <span className="text-sm text-slate-400 italic">
              Press any key on your keyboard to begin testing...
            </span>
          ) : (
            keyHistory.map((code, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                {code}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

