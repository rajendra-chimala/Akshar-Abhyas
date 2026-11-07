"use client";

import React from "react";
import Link from "next/link";
import { TextSurvivalGame } from "@/components/games/TextSurvivalGame";
import { ArrowLeft } from "lucide-react";

export default function TextSurvivalPage() {
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
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200">
          Text Survival Mode
        </span>
      </div>

      <TextSurvivalGame />
    </div>
  );
}
