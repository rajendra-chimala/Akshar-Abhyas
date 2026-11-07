"use client";

import React from "react";
import Link from "next/link";
import { SpeedChallengeGame } from "@/components/games/SpeedChallengeGame";
import { ArrowLeft } from "lucide-react";

export default function SpeedChallengePage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/typing-games"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Games</span>
        </Link>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200">
          60s Speed Challenge
        </span>
      </div>

      <SpeedChallengeGame />
    </div>
  );
}
