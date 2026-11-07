"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { VirtualKeyboard } from "@/components/keyboard/VirtualKeyboard";
import { TypingDisplay } from "@/components/typing/TypingDisplay";
import { MetricsBar } from "@/components/typing/MetricsBar";
import { ResultCard } from "@/components/typing/ResultCard";
import { ALL_LEVELS_INFO } from "@/data/lessons";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Gamepad2,
  HelpCircle,
  Keyboard as KeyboardIcon,
  Play,
  ShieldCheck,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";

const HERO_PREVIEW_TEXT = "Practice touch typing every day to build lightning speed and flawless accuracy.";

export default function HomePage() {
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

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
    targetText: HERO_PREVIEW_TEXT,
    strictBackspace: false,
    soundEnabled,
  });

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center flex flex-col items-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-emerald-950/60 border border-brand-200 dark:border-emerald-800 text-brand-800 dark:text-brand-300 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>100% Free • No Account Required • Client-Side Local Storage</span>
        </div>

        {/* Master Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] max-w-4xl mb-6">
          Master Typing. <br className="hidden sm:inline" />
          <span className="text-brand-600 dark:text-brand-400">Build Speed.</span> Improve Accuracy.
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
          Learn touch typing from beginner to advanced, practice with interactive keyboard lessons, and discover your real typing speed with free online tests.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          <Link
            href="/typing-test"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-xl shadow-brand-600/20 transition active:scale-95"
          >
            <Timer className="w-5 h-5" />
            <span>Start Typing Test</span>
          </Link>

          <Link
            href="/typing-lessons"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-800 font-bold text-base transition active:scale-95"
          >
            <BookOpen className="w-5 h-5 text-brand-600" />
            <span>Learn Touch Typing</span>
          </Link>
        </div>

        {/* Live Functional Typing Test Preview on Homepage */}
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full max-w-4xl p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl outline-none select-none"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <KeyboardIcon className="w-4 h-4 text-brand-600" />
              <span>Interactive Live Preview (Type directly below)</span>
            </div>
            <button
              onClick={() => restart(HERO_PREVIEW_TEXT)}
              className="text-xs text-brand-600 font-semibold hover:underline"
            >
              Reset Preview
            </button>
          </div>

          <MetricsBar
            metrics={metrics}
            remainingSeconds={null}
            onRestart={() => restart(HERO_PREVIEW_TEXT)}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            className="mb-4"
          />

          {isCompleted ? (
            <ResultCard
              metrics={metrics}
              testTitle="Preview Completed!"
              onRestart={() => restart(HERO_PREVIEW_TEXT)}
              nextLessonHref="/typing-test"
              className="mb-4"
            />
          ) : (
            <TypingDisplay
              charStatuses={charStatuses}
              currentIndex={currentIndex}
              isFocused={isFocused}
              onFocusClick={() => setIsFocused(true)}
              className="mb-4"
            />
          )}

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
      </section>

      {/* Curriculum Levels Preview Section */}
      <section className="w-full bg-slate-50 dark:bg-slate-950 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 block mb-2">
              Structured Learning
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
              Six Comprehensive Learning Levels
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              A progressive curriculum taking you systematically from zero knowledge to high-speed certified touch typing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_LEVELS_INFO.map((lvl) => (
              <div
                key={lvl.id}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md hover:border-brand-500 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-brand-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold">
                      Level {lvl.id}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">10 Lessons</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition mb-2">
                    {lvl.title.split(": ")[1]}
                  </h3>
                  <p className="text-xs font-semibold text-brand-700 dark:text-brand-300 mb-2">
                    {lvl.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {lvl.description}
                  </p>
                </div>

                <Link
                  href="/typing-lessons"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Lessons</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arcade Games Showcase */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-2">
              Gamification
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
              Play Real Typing Games
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl">
              Turn typing practice into high-stakes arcade fun. Five playable games that test reflex speed, endurance, and surgical accuracy.
            </p>
          </div>
          <Link
            href="/typing-games"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            <span>View All 5 Games</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/typing-games/word-rain"
            className="p-6 bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-200 dark:border-rose-900/60 rounded-3xl hover:border-rose-400 transition group"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2">
              Reflex Challenge
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-rose-600 transition">
              Word Rain
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Type falling words before they hit the laser baseline. 5 lives, progressive speed scaling.
            </p>
          </Link>

          <Link
            href="/typing-games/speed-challenge"
            className="p-6 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-200 dark:border-amber-900/60 rounded-3xl hover:border-amber-400 transition group"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
              Sprint Challenge
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-amber-600 transition">
              Speed Challenge (60s)
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              How many words can you type in 60 seconds? Test your raw throughput against the clock.
            </p>
          </Link>

          <Link
            href="/typing-games/text-survival"
            className="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-200 dark:border-emerald-900/60 rounded-3xl hover:border-emerald-400 transition group"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
              Precision Survival
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-emerald-600 transition">
              Text Survival
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              100 HP health bar. Typographical mistakes drain your life. Complete sentences to heal and survive.
            </p>
          </Link>
        </div>
      </section>

      {/* Why Touch Typing Matters Section */}
      <section className="w-full bg-slate-50 dark:bg-slate-950 py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">
              Why Learn Touch Typing?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              The keyboard is your primary instrument of productivity. Here is why touch typing is a transformative life skill.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                Save 20+ Days Per Year
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Doubling your speed from 30 WPM to 60 WPM saves 200+ hours every year for knowledge workers, developers, and students.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                Uninterrupted Cognitive Flow
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                When fingers execute automatically, your mind stays focused on problem-solving, creative writing, and coding rather than key hunting.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                Ergonomic Health & Comfort
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Proper finger positioning and upright posture drastically reduce repetitive strain injury (RSI), wrist tension, and neck pain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-2">
            Answers
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Is Akshar Abhyas really 100% free with no login required?",
              a: "Yes! You never have to create an account, enter an email, or make any payment. All lessons, tests, games, and progress records run and save right inside your browser.",
            },
            {
              q: "Can I use this platform on a mobile phone or tablet?",
              a: "Yes! While physical keyboards provide the true touch typing experience with home row finger positioning, our virtual keyboard is fully clickable and touch-compatible on tablets and phones.",
            },
            {
              q: "How is my progress saved if there is no account?",
              a: "Your browser saves all completed lessons, test records, high scores, and preferences locally using browser localStorage. You can also export your history as a JSON file anytime.",
            },
            {
              q: "How is Words Per Minute (WPM) calculated?",
              a: "We adhere to the global standard: 1 word equals 5 characters (including spaces and punctuation). Net WPM = (Correct Keystrokes / 5) / (Elapsed Minutes).",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl"
            >
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-600 shrink-0" />
                <span>{item.q}</span>
              </h3>
              <p className="text-sm text-muted-foreground pl-6 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
