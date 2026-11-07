"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { getRandomSnippet, getRandomWords, CATEGORY_SNIPPETS } from "@/data/practice/testSnippets";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { VirtualKeyboard } from "@/components/keyboard/VirtualKeyboard";
import { TypingDisplay } from "@/components/typing/TypingDisplay";
import { MetricsBar } from "@/components/typing/MetricsBar";
import { ResultCard } from "@/components/typing/ResultCard";
import { recordTestResult } from "@/lib/storage/localStorage";
import { TestCategory, TypingMetrics } from "@/types/typing";
import { TypingTestRecord } from "@/types/progress";
import { Keyboard, BookOpen, Sparkles, SlidersHorizontal, Check } from "lucide-react";

export function TypingTestPageContent() {
  const [mode, setMode] = useState<"paragraphs" | "words" | "custom">("paragraphs");
  const [customInput, setCustomInput] = useState("");
  const [activeText, setActiveText] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [strictBackspace, setStrictBackspace] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const getNewText = useCallback(
    (m: "paragraphs" | "words" | "custom") => {
      if (m === "words") return getRandomWords(60);
      if (m === "custom") return customInput || "Paste or type your own text above to begin custom typing practice.";
      return getRandomSnippet("paragraphs");
    },
    [customInput]
  );

  useEffect(() => {
    setActiveText(getNewText(mode));
  }, [mode, getNewText]);

  const handleComplete = useCallback(
    (finalMetrics: TypingMetrics) => {
      const record: TypingTestRecord = {
        id: `practice-${Date.now()}`,
        timestamp: new Date().toISOString(),
        duration: Math.min(finalMetrics.elapsedSeconds, 300) as any,
        category: (mode === "paragraphs" ? "paragraphs" : mode === "words" ? "words" : "custom") as TestCategory,
        wpm: finalMetrics.wpm,
        rawWpm: finalMetrics.rawWpm,
        cpm: finalMetrics.cpm,
        accuracy: finalMetrics.accuracy,
        correctChars: finalMetrics.correctChars,
        incorrectChars: finalMetrics.incorrectChars,
        rating: finalMetrics.rating,
      };
      recordTestResult(record);
    },
    [mode]
  );

  const {
    charStatuses,
    currentIndex,
    nextExpectedChar,
    isCompleted,
    metrics,
    pressedKey,
    lastKeystrokeStatus,
    handleKeyDown,
    processCharacter,
    restart,
  } = useTypingEngine({
    targetText: activeText,
    strictBackspace,
    soundEnabled,
    onComplete: handleComplete,
  });

  const handleRestart = () => {
    const fresh = getNewText(mode);
    setActiveText(fresh);
    restart(fresh);
    containerRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 outline-none flex flex-col items-center select-none"
    >
      <div className="w-full text-center max-w-xl mx-auto mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
          Online Typing Practice
        </h1>
        <p className="text-muted-foreground text-sm">
          Practice paragraphs, vocabulary, or custom text with real-time feedback and our interactive virtual keyboard.
        </p>
      </div>

      {/* Mode selection buttons */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-6">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setMode("paragraphs");
              const t = getNewText("paragraphs");
              setActiveText(t);
              restart(t);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              mode === "paragraphs"
                ? "bg-brand-600 text-white shadow"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Paragraphs
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("words");
              const t = getNewText("words");
              setActiveText(t);
              restart(t);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              mode === "words"
                ? "bg-brand-600 text-white shadow"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Random Words
          </button>

          <button
            type="button"
            onClick={() => setMode("custom")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              mode === "custom"
                ? "bg-brand-600 text-white shadow"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Custom Text
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition ${
              showKeyboard
                ? "bg-brand-50 border-brand-300 text-brand-700 dark:bg-emerald-950/40 dark:text-brand-300"
                : "bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800"
            }`}
            title="Toggle virtual keyboard"
          >
            <Keyboard className="w-4 h-4" />
            <span className="hidden sm:inline">Keyboard</span>
          </button>
          <button
            type="button"
            onClick={() => setShowColors(!showColors)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition ${
              showColors
                ? "bg-brand-50 border-brand-300 text-brand-700 dark:bg-emerald-950/40 dark:text-brand-300"
                : "bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800"
            }`}
            title="Toggle finger colors"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Colors</span>
          </button>
        </div>
      </div>

      {/* Custom Text Area if mode is custom */}
      {mode === "custom" && (
        <div className="w-full mb-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <textarea
            rows={3}
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type or paste custom practice text here..."
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 mb-3"
          />
          <button
            type="button"
            onClick={() => {
              if (customInput.trim()) {
                setActiveText(customInput.trim());
                restart(customInput.trim());
                containerRef.current?.focus();
              }
            }}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow transition"
          >
            Load Custom Text
          </button>
        </div>
      )}

      {/* Metrics Bar */}
      <MetricsBar
        metrics={metrics}
        remainingSeconds={null}
        onRestart={handleRestart}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        strictBackspace={strictBackspace}
        onToggleStrictBackspace={() => setStrictBackspace(!strictBackspace)}
        className="mb-6"
      />

      {/* Display or Result */}
      {isCompleted ? (
        <ResultCard
          metrics={metrics}
          testTitle="Practice Completed!"
          onRestart={handleRestart}
          className="mb-8"
        />
      ) : (
        <TypingDisplay
          charStatuses={charStatuses}
          currentIndex={currentIndex}
          isFocused={isFocused}
          onFocusClick={() => containerRef.current?.focus()}
          className="mb-6"
        />
      )}

      {/* Virtual Keyboard */}
      {showKeyboard && (
        <VirtualKeyboard
          nextExpectedChar={nextExpectedChar}
          activeKeyCode={pressedKey}
          lastKeystrokeStatus={lastKeystrokeStatus}
          showColors={showColors}
          showLabels={true}
          onKeyClick={(key, code) => processCharacter(key, code)}
        />
      )}
    </div>
  );
}
