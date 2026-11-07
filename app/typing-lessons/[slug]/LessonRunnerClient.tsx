"use client";

import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Lesson } from "@/types/lesson";
import { getNextLesson, getPrevLesson } from "@/data/lessons";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { VirtualKeyboard } from "@/components/keyboard/VirtualKeyboard";
import { TypingDisplay } from "@/components/typing/TypingDisplay";
import { MetricsBar } from "@/components/typing/MetricsBar";
import { ResultCard } from "@/components/typing/ResultCard";
import { recordLessonCompletion } from "@/lib/storage/localStorage";
import { TypingMetrics } from "@/types/typing";
import { ArrowLeft, HelpCircle } from "lucide-react";

interface LessonRunnerClientProps {
  lesson: Lesson;
}

export function LessonRunnerClient({ lesson }: LessonRunnerClientProps) {
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [strictBackspace, setStrictBackspace] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const nextLesson = getNextLesson(lesson.id);
  const prevLesson = getPrevLesson(lesson.id);

  const handleComplete = useCallback(
    (metrics: TypingMetrics) => {
      recordLessonCompletion(
        lesson.id,
        lesson.levelId,
        metrics.wpm,
        metrics.accuracy,
        metrics.elapsedSeconds
      );
    },
    [lesson]
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
    targetText: lesson.text,
    strictBackspace,
    soundEnabled,
    onComplete: handleComplete,
  });

  const handleRestart = () => {
    restart(lesson.text);
    containerRef.current?.focus();
  };

  const nextHref = nextLesson ? `/typing-lessons/${nextLesson.slug}` : "/typing-lessons";

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 outline-none flex flex-col items-center select-none"
    >
      {/* Lesson Header Navigation */}
      <div className="w-full flex items-center justify-between gap-4 mb-4">
        <Link
          href="/typing-lessons"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Lessons</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono font-semibold">
          {prevLesson && (
            <Link
              href={`/typing-lessons/${prevLesson.slug}`}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              ← Prev
            </Link>
          )}
          <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            L{lesson.levelId} • {lesson.lessonNumber} / 10
          </span>
          {nextLesson && (
            <Link
              href={`/typing-lessons/${nextLesson.slug}`}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Next →
            </Link>
          )}
        </div>
      </div>

      {/* Lesson Card Meta */}
      <div className="w-full p-4 sm:p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-brand-50 dark:bg-emerald-950/50 text-brand-700 dark:text-brand-300 font-semibold border border-brand-200 dark:border-emerald-800">
              Goal: {lesson.targetWpm} WPM • {lesson.minAccuracyToPass}% Acc
            </span>
          </div>
        </div>

        {lesson.instructions && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <HelpCircle className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
            <span>{lesson.instructions}</span>
          </div>
        )}
      </div>

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

      {/* Completed State or Live Exercise Display */}
      {isCompleted ? (
        <ResultCard
          metrics={metrics}
          testTitle={`Lesson ${lesson.lessonNumber} Completed!`}
          onRestart={handleRestart}
          nextLessonHref={nextHref}
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
    </div>
  );
}
