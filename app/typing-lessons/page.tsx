"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ALL_LEVELS_INFO, getLessonsByLevel } from "@/data/lessons";
import { getUserProgress } from "@/lib/storage/localStorage";
import { LevelId } from "@/types/lesson";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Flame,
  Lock,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";

export default function TypingLessonsCurriculumPage() {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [activeLevel, setActiveLevel] = useState<LevelId>(1);

  useEffect(() => {
    const p = getUserProgress();
    const map: Record<string, boolean> = {};
    Object.keys(p.completedLessons).forEach((k) => {
      map[k] = true;
    });
    setCompletedMap(map);
  }, []);

  const currentLevelLessons = getLessonsByLevel(activeLevel);
  const completedInActiveLevel = currentLevelLessons.filter((l) => completedMap[l.id]).length;
  const levelProgressPct = Math.round((completedInActiveLevel / currentLevelLessons.length) * 100);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 font-semibold text-xs border border-brand-200 dark:border-emerald-800 uppercase tracking-wider mb-3 inline-block">
          Complete Curriculum
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
          Touch Typing Learning Curriculum
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          From absolute beginner to typing ninja. Six structured levels, 60 interactive lessons, zero login required. Start at Level 1 or jump straight to your skill level.
        </p>
      </div>

      {/* Level Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {ALL_LEVELS_INFO.map((lvl) => {
          const isSelected = activeLevel === lvl.id;
          const lessons = getLessonsByLevel(lvl.id);
          const done = lessons.filter((l) => completedMap[l.id]).length;
          const pct = Math.round((done / lessons.length) * 100);

          return (
            <button
              key={lvl.id}
              onClick={() => setActiveLevel(lvl.id)}
              className={`
                p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between
                ${
                  isSelected
                    ? "bg-brand-50/90 dark:bg-emerald-950/50 border-brand-500 shadow-sm ring-2 ring-brand-400/20"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }
              `}
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">
                  Level {lvl.id}
                </span>
                <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 line-clamp-1">
                  {lvl.badge}
                </span>
              </div>

              <div className="mt-3">
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1">
                  <div
                    style={{ width: `${pct}%` }}
                    className="h-full bg-brand-500 rounded-full"
                  />
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {done}/10 ({pct}%)
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Level Overview Header */}
      {(() => {
        const currentInfo = ALL_LEVELS_INFO.find((l) => l.id === activeLevel)!;
        return (
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-brand-100 dark:bg-emerald-950 text-brand-800 dark:text-brand-300 font-bold text-xs">
                    {currentInfo.title}
                  </span>
                  <span className="text-xs text-muted-foreground">• 10 Lessons</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {currentInfo.subtitle}
                </h2>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  {currentInfo.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-semibold text-muted-foreground block">
                    Completion
                  </span>
                  <span className="font-mono text-2xl font-bold text-brand-600 dark:text-brand-400">
                    {levelProgressPct}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentLevelLessons.map((lesson) => {
          const isDone = completedMap[lesson.id];
          return (
            <Link
              key={lesson.id}
              href={`/typing-lessons/${lesson.slug}`}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-brand-500 hover:shadow-md transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-muted-foreground">
                    Lesson {lesson.lessonNumber}
                  </span>
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {lesson.targetWpm} WPM goal
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition mb-1">
                  {lesson.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">
                  {lesson.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1 font-mono text-xs text-slate-500">
                  <span className="font-medium">Keys:</span>
                  <span className="text-brand-700 dark:text-brand-300 font-semibold">
                    {lesson.targetKeys.slice(0, 6).join(" ")}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
                  <span>Start</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
