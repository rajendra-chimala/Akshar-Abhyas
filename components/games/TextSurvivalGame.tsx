"use client";

import React, { useState, useEffect, useRef } from "react";
import { CATEGORY_SNIPPETS } from "@/data/practice/testSnippets";
import { recordGameScore } from "@/lib/storage/localStorage";
import { soundEffects } from "@/lib/typing/soundEffects";
import { Play, RotateCcw, Heart, Shield, Trophy } from "lucide-react";

export const TextSurvivalGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [health, setHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState(1);
  const [currentSentence, setCurrentSentence] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const getSentenceForStage = (stageNum: number) => {
    let pool = CATEGORY_SNIPPETS.easy;
    if (stageNum >= 3) pool = CATEGORY_SNIPPETS.medium;
    if (stageNum >= 6) pool = CATEGORY_SNIPPETS.hard;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const startGame = () => {
    setHealth(100);
    setScore(0);
    setStage(1);
    setCharIndex(0);
    setGameOver(false);
    setCurrentSentence(getSentenceForStage(1));
    setIsPlaying(true);
    setTimeout(() => containerRef.current?.focus(), 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isPlaying || gameOver) return;

    if (e.key === " ") e.preventDefault();
    if (e.key.length > 1 && e.key !== "Enter") return;

    const expected = currentSentence[charIndex];
    const typed = e.key === "Enter" ? "\n" : e.key;

    if (typed === expected) {
      soundEffects.playKeyClick(true);
      const nextIdx = charIndex + 1;
      setScore((s) => s + 5);

      if (nextIdx >= currentSentence.length) {
        // Stage completed!
        soundEffects.playSuccessChime(true);
        setStage((stg) => {
          const nextStage = stg + 1;
          setCurrentSentence(getSentenceForStage(nextStage));
          return nextStage;
        });
        setCharIndex(0);
        setHealth((h) => Math.min(100, h + 25)); // heal +25 HP
        setScore((s) => s + 100);
      } else {
        setCharIndex(nextIdx);
      }
    } else {
      // Mistake takes damage!
      soundEffects.playKeyError(true);
      setHealth((h) => {
        const nextH = h - 12;
        if (nextH <= 0) {
          setIsPlaying(false);
          setGameOver(true);
          recordGameScore("text-survival", "Text Survival", score, undefined, undefined, stage);
          return 0;
        }
        return nextH;
      });
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full max-w-3xl mx-auto flex flex-col items-center select-none outline-none"
    >
      {/* Header bar */}
      <div className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-mono font-bold text-lg">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Score: {score}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold text-sm">
            <Shield className="w-4 h-4 text-brand-600" />
            <span>Stage {stage}</span>
          </div>
        </div>

        {/* Health bar */}
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          <div className="w-36 sm:w-48 h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700">
            <div
              style={{ width: `${health}%` }}
              className={`h-full transition-all duration-300 ${
                health > 50 ? "bg-emerald-500" : health > 25 ? "bg-amber-500" : "bg-rose-500"
              }`}
            />
          </div>
          <span className="font-mono text-xs font-bold w-10 text-right">{health}%</span>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="relative w-full p-8 bg-slate-900 rounded-3xl border-2 border-slate-800 shadow-2xl flex flex-col items-center justify-center min-h-[300px]">
        {isPlaying && !gameOver && (
          <div className="font-mono text-xl sm:text-2xl leading-relaxed text-center max-w-2xl">
            {currentSentence.split("").map((ch, idx) => {
              const isTyped = idx < charIndex;
              const isCurrent = idx === charIndex;

              return (
                <span
                  key={idx}
                  className={`
                    transition-colors duration-75
                    ${
                      isTyped
                        ? "text-emerald-400 font-bold"
                        : isCurrent
                        ? "bg-brand-500 text-white px-1 rounded animate-pulse"
                        : "text-slate-500"
                    }
                  `}
                >
                  {ch}
                </span>
              );
            })}
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="text-center animate-fade-in">
            <h3 className="text-3xl font-extrabold text-rose-500 mb-2">You Perished!</h3>
            <p className="text-slate-300 mb-6">
              You survived to Stage <span className="font-bold text-white font-mono">{stage}</span> with{" "}
              <span className="font-bold text-white font-mono">{score} points</span>!
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-3.5 mx-auto rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg transition active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retry Survival</span>
            </button>
          </div>
        )}

        {/* Not Started Screen */}
        {!isPlaying && !gameOver && (
          <div className="text-center">
            <h3 className="text-3xl font-extrabold text-white mb-2">Text Survival</h3>
            <p className="text-slate-300 max-w-md mx-auto mb-6 text-sm">
              Type the sentences accurately to survive! Each mistake drains your health by 12%. Complete sentences to restore health and advance stages.
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-3.5 mx-auto rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg transition active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Survival</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

