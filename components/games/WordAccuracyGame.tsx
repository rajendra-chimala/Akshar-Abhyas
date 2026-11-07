"use client";

import React, { useState, useEffect, useRef } from "react";
import { COMMON_WORDS } from "@/data/practice/testSnippets";
import { recordGameScore } from "@/lib/storage/localStorage";
import { soundEffects } from "@/lib/typing/soundEffects";
import { Play, RotateCcw, Target, Trophy, Sparkles, CheckCircle2 } from "lucide-react";

export const WordAccuracyGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [multiplier, setMultiplier] = useState(1);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const generateWordQueue = () => {
    const list: string[] = [];
    for (let i = 0; i < 30; i++) {
      const idx = Math.floor(Math.random() * COMMON_WORDS.length);
      list.push(COMMON_WORDS[idx]);
    }
    return list;
  };

  const startGame = () => {
    const queue = generateWordQueue();
    setWords(queue);
    setCurrentIndex(0);
    setCurrentInput("");
    setMultiplier(1);
    setScore(0);
    setCorrectCount(0);
    setErrorCount(0);
    setGameOver(false);
    setIsPlaying(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isPlaying || gameOver) return;

    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const trimmed = currentInput.trim().toLowerCase();
      if (!trimmed) return;

      const target = words[currentIndex]?.toLowerCase();
      if (trimmed === target) {
        soundEffects.playKeyClick(true);
        const points = 50 * multiplier;
        setScore((s) => s + points);
        setCorrectCount((c) => c + 1);
        setMultiplier((m) => Math.min(10, m + 1));
      } else {
        soundEffects.playKeyError(true);
        setErrorCount((err) => err + 1);
        setMultiplier(1); // multiplier resets on error!
      }

      const nextIdx = currentIndex + 1;
      if (nextIdx >= words.length) {
        // Game completed
        soundEffects.playSuccessChime(true);
        setIsPlaying(false);
        setGameOver(true);
        const total = correctCount + 1 + errorCount;
        const acc = Math.round(((correctCount + (trimmed === target ? 1 : 0)) / total) * 100);
        recordGameScore("word-accuracy", "Word Accuracy Challenge", score, undefined, acc);
      } else {
        setCurrentIndex(nextIdx);
        setCurrentInput("");
      }
    }
  };

  const totalAttempted = correctCount + errorCount;
  const accuracy = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 100;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center select-none">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-mono font-bold text-lg">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Score: {score}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Combo: {multiplier}x</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold">
          <div className="text-slate-600 dark:text-slate-300 font-mono">
            {currentIndex + 1} / {words.length || 30}
          </div>
          <div className="text-brand-600 font-mono font-bold">{accuracy}% Acc</div>
        </div>
      </div>

      {/* Main card */}
      <div className="relative w-full p-8 bg-slate-900 rounded-3xl border-2 border-slate-800 shadow-2xl flex flex-col items-center">
        {isPlaying && !gameOver && (
          <>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 text-slate-400">
              Type word with 100% precision
            </span>
            <div className="font-mono text-4xl sm:text-5xl font-extrabold text-white mb-8 tracking-wide">
              {words[currentIndex]}
            </div>

            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type word and press Space..."
              className="w-full max-w-md px-5 py-3.5 rounded-2xl bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-center text-xl shadow-inner mb-4"
              autoComplete="off"
            />
          </>
        )}

        {gameOver && (
          <div className="text-center animate-fade-in">
            <div className="w-14 h-14 mx-auto rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-2">Challenge Finished!</h3>
            <p className="text-slate-300 mb-6">
              Final Score: <span className="text-brand-400 font-bold font-mono">{score}</span> with{" "}
              <span className="text-brand-400 font-bold font-mono">{accuracy}% accuracy</span>!
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-3.5 mx-auto rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg transition active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {!isPlaying && !gameOver && (
          <div className="text-center">
            <h3 className="text-3xl font-extrabold text-white mb-2">Word Accuracy Challenge</h3>
            <p className="text-slate-300 max-w-md mx-auto mb-6 text-sm">
              Each accurate word builds your combo multiplier up to 10x! A single error resets your combo multiplier back to 1x.
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-3.5 mx-auto rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg transition active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Challenge</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
