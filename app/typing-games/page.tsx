"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getUserProgress } from "@/lib/storage/localStorage";
import {
  Gamepad2,
  Flame,
  Shield,
  Zap,
  Target,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const GAMES_LIST = [
  {
    id: "word-rain",
    title: "Word Rain",
    description: "Words rain down from the sky! Type each word before it hits the red laser floor. Includes 5 lives and escalating difficulty.",
    icon: Flame,
    color: "from-rose-500/20 to-orange-500/20 border-rose-300 dark:border-rose-800 text-rose-600",
    href: "/typing-games/word-rain",
    badge: "Arcade Reflex",
  },
  {
    id: "speed-challenge",
    title: "Speed Challenge (60s)",
    description: "Type as many random English words as humanly possible in 60 seconds flat. Measures WPM, accuracy, and score.",
    icon: Zap,
    color: "from-amber-500/20 to-yellow-500/20 border-amber-300 dark:border-amber-800 text-amber-600",
    href: "/typing-games/speed-challenge",
    badge: "Speed Sprint",
  },
  {
    id: "text-survival",
    title: "Text Survival",
    description: "Type complete sentences to stay alive. Every typo damages your 100 HP health bar. Complete sentences to restore health and advance stages.",
    icon: Shield,
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-300 dark:border-emerald-800 text-emerald-600",
    href: "/typing-games/text-survival",
    badge: "Survival Mode",
  },
  {
    id: "falling-letters",
    title: "Falling Letters",
    description: "Single alphabet letters fall from the top of the screen. Press the corresponding physical key to zap them with high combo streaks.",
    icon: Sparkles,
    color: "from-sky-500/20 to-indigo-500/20 border-sky-300 dark:border-sky-800 text-sky-600",
    href: "/typing-games/falling-letters",
    badge: "Precision Drills",
  },
  {
    id: "word-accuracy",
    title: "Word Accuracy Challenge",
    description: "Zero tolerance for mistakes. Build an exponential score multiplier (up to 10x) for consecutive flawless words.",
    icon: Target,
    color: "from-purple-500/20 to-violet-500/20 border-purple-300 dark:border-purple-800 text-purple-600",
    href: "/typing-games/word-accuracy",
    badge: "Accuracy Gauntlet",
  },
];

export default function TypingGamesHubPage() {
  const [highScores, setHighScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const p = getUserProgress();
    const scores: Record<string, number> = {};
    Object.entries(p.gameHighScores).forEach(([k, v]) => {
      scores[k] = v.score;
    });
    setHighScores(scores);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 font-semibold text-xs border border-brand-200 dark:border-emerald-800 uppercase tracking-wider mb-3 inline-block">
          Gamified Practice
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
          Arcade Typing Games
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Make touch typing addictive and fun. Play five distinct, fully responsive keyboard games designed to hone your reflexes, speed, and precision.
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAMES_LIST.map((game) => {
          const Icon = game.icon;
          const best = highScores[game.id] || 0;

          return (
            <div
              key={game.id}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.color} border flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {game.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">
                  {game.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {game.description}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between py-3 border-t border-slate-100 dark:border-slate-800 text-xs mb-4">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Personal Best:</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                    {best} pts
                  </span>
                </div>

                <Link
                  href={game.href}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-sm transition active:scale-95"
                >
                  <span>Play Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
