"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { getRandomSnippet, getRandomWords } from "@/data/practice/testSnippets";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { VirtualKeyboard } from "@/components/keyboard/VirtualKeyboard";
import { TypingDisplay } from "@/components/typing/TypingDisplay";
import { MetricsBar } from "@/components/typing/MetricsBar";
import { ResultCard } from "@/components/typing/ResultCard";
import { recordTestResult } from "@/lib/storage/localStorage";
import { TestCategory, TestDuration, TypingMetrics } from "@/types/typing";
import { TypingTestRecord } from "@/types/progress";
import {
  Timer,
  Settings2,
  Keyboard as KeyboardIcon,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

const DURATIONS: TestDuration[] = [15, 30, 60, 120, 300];

const CATEGORIES: { id: TestCategory; label: string }[] = [
  { id: "medium", label: "Standard" },
  { id: "words", label: "Random Words" },
  { id: "paragraphs", label: "Paragraphs" },
  { id: "easy", label: "Easy" },
  { id: "hard", label: "Hard" },
  { id: "expert", label: "Expert" },
  { id: "numbers", label: "Numbers" },
  { id: "punctuation", label: "Punctuation" },
  { id: "custom", label: "Custom Text" },
];

export default function TypingTestPage() {
  const [duration, setDuration] = useState<TestDuration>(60);
  const [category, setCategory] = useState<TestCategory>("medium");
  const [customText, setCustomText] = useState("");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [targetText, setTargetText] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [strictBackspace, setStrictBackspace] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Generate appropriate text based on chosen category
  const generateText = useCallback(
    (cat: TestCategory) => {
      if (cat === "custom") {
        return customText || "Type or paste your custom text in the settings above.";
      }
      if (cat === "words") {
        return getRandomWords(duration >= 120 ? 120 : 60);
      }
      return getRandomSnippet(cat);
    },
    [customText, duration]
  );

  // Initialize text on mount or category change
  useEffect(() => {
    setTargetText(generateText(category));
  }, [category, generateText]);

  // Handle completion callback
  const handleTestComplete = useCallback(
    (finalMetrics: TypingMetrics) => {
      const record: TypingTestRecord = {
        id: `test-${Date.now()}`,
        timestamp: new Date().toISOString(),
        duration,
        category,
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
    [duration, category]
  );

  const {
    charStatuses,
    currentIndex,
    nextExpectedChar,
    isCompleted,
    remainingSeconds,
    metrics,
    pressedKey,
    lastKeystrokeStatus,
    handleKeyDown,
    processCharacter,
    restart,
  } = useTypingEngine({
    targetText,
    duration,
    strictBackspace,
    soundEnabled,
    onComplete: handleTestComplete,
  });

  const handleRestart = () => {
    const newText = generateText(category);
    setTargetText(newText);
    restart(newText);
    containerRef.current?.focus();
  };

  const handleApplyCustomText = () => {
    if (customText.trim()) {
      setCategory("custom");
      setTargetText(customText.trim());
      restart(customText.trim());
      setShowCustomModal(false);
      containerRef.current?.focus();
    }
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
      {/* Test Control Configurations */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-6">
        {/* Durations */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          <Timer className="w-4 h-4 ml-2 mr-1 text-muted-foreground" />
          {DURATIONS.map((dur) => (
            <button
              key={dur}
              type="button"
              onClick={() => {
                setDuration(dur);
                handleRestart();
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold font-mono transition ${
                duration === dur
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
              }`}
            >
              {dur}s
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                if (cat.id === "custom") {
                  setShowCustomModal(true);
                } else {
                  setCategory(cat.id);
                  const txt = generateText(cat.id);
                  setTargetText(txt);
                  restart(txt);
                }
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                category === cat.id
                  ? "bg-brand-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 border border-brand-300 dark:border-emerald-800 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Keyboard Display Toggles */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition ${
              showKeyboard
                ? "bg-brand-50 border-brand-300 text-brand-700 dark:bg-emerald-950/40 dark:text-brand-300"
                : "bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700"
            }`}
            title="Toggle virtual keyboard"
          >
            <KeyboardIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Keyboard</span>
          </button>

          <button
            type="button"
            onClick={() => setShowColors(!showColors)}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition ${
              showColors
                ? "bg-brand-50 border-brand-300 text-brand-700 dark:bg-emerald-950/40 dark:text-brand-300"
                : "bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700"
            }`}
            title="Toggle finger colors"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Colors</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <MetricsBar
        metrics={metrics}
        remainingSeconds={remainingSeconds}
        onRestart={handleRestart}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        strictBackspace={strictBackspace}
        onToggleStrictBackspace={() => setStrictBackspace(!strictBackspace)}
        className="mb-6"
      />

      {/* When completed, show Result Card; otherwise show Typing Display */}
      {isCompleted ? (
        <ResultCard
          metrics={metrics}
          testTitle={`${duration}s ${category.toUpperCase()} Speed Test Result`}
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

      {/* Interactive Virtual Keyboard */}
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

      {/* Custom Text Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Practice Custom Text
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Paste articles, speeches, or code snippets you want to practice typing.
            </p>
            <textarea
              rows={5}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste your text here..."
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 mb-4"
            />
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyCustomText}
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow"
              >
                Apply & Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
