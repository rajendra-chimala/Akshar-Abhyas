"use client";

import React, { useState, useEffect, useRef } from "react";
import { COMMON_WORDS } from "@/data/practice/testSnippets";
import { recordGameScore } from "@/lib/storage/localStorage";
import { soundEffects } from "@/lib/typing/soundEffects";
import { Play, RotateCcw, Timer, Trophy, Zap, AlertCircle } from "lucide-react";

export const SpeedChallengeGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [correctWords, setCorrectWords] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate word stream
  const generateWords = () => {
    const list: string[] = [];
    for (let i = 0; i < 150; i++) {
      const idx = Math.floor(Math.random() * COMMON_WORDS.length);
      list.push(COMMON_WORDS[idx]);
    }
    return list;
  };

  const startGame = () => {
    const words = generateWords();
    setWordList(words);
    setCurrentWordIndex(0);
    setCurrentInput("");
    setCorrectWords(0);
    setMistakes(0);
    setTimeLeft(60);
    setGameOver(false);
    setIsPlaying(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Timer loop
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsPlaying(false);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  // When game finishes, record score
  useEffect(() => {
    if (gameOver) {
      soundEffects.playSuccessChime(true);
      const totalAttempted = correctWords + mistakes;
      const acc = totalAttempted > 0 ? Math.round((correctWords / totalAttempted) * 100) : 100;
      recordGameScore("speed-challenge", "Speed Challenge", correctWords * 10, correctWords, acc);
    }
  }, [gameOver, correctWords, mistakes]);

  // Handle typing space or enter to submit word
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isPlaying) return;

    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const trimmed = currentInput.trim().toLowerCase();
      if (!trimmed) return;

      const target = wordList[currentWordIndex]?.toLowerCase();
      if (trimmed === target) {
        soundEffects.playKeyClick(true);
        setCorrectWords((c) => c + 1);
      } else {
        soundEffects.playKeyError(true);
        setMistakes((m) => m + 1);
      }

      setCurrentWordIndex((idx) => idx + 1);
      setCurrentInput("");
    }
  };

  const totalWordsAttempted = correctWords + mistakes;
  const currentAcc = totalWordsAttempted > 0 ? Math.round((correctWords / totalWordsAttempted) * 100) : 100;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center select-none">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-mono font-bold text-xl">
            <Timer className="w-5 h-5" />
            <span>{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-mono text-base font-semibold">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Score: {correctWords * 10}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold">
          <div className="text-emerald-600 flex items-center gap-1 font-mono">
            <span>{correctWords} correct</span>
          </div>
          <div className="text-rose-500 flex items-center gap-1 font-mono">
            <span>{mistakes} err</span>
          </div>
          <div className="text-slate-500 font-mono">
            <span>{currentAcc}% acc</span>
          </div>
        </div>
      </div>

      {/* Word Box Display */}
      <div className="relative w-full p-6 sm:p-8 bg-slate-900 rounded-3xl border-2 border-slate-800 shadow-2xl flex flex-col items-center">
        {/* Game Active Area */}
        <div className="w-full h-36 overflow-hidden flex flex-wrap gap-2.5 items-center justify-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 mb-6 font-mono text-xl sm:text-2xl">
          {wordList.slice(Math.max(0, currentWordIndex - 2), currentWordIndex + 12).map((word, i) => {
            const actualIdx = Math.max(0, currentWordIndex - 2) + i;
            const isCurrent = actualIdx === currentWordIndex;
            const isPast = actualIdx < currentWordIndex;

            return (
              <span
                key={actualIdx}
                className={`
                  px-2.5 py-1 rounded-lg transition-all
                  ${
                    isCurrent
                      ? "bg-brand-500 text-white font-bold scale-110 shadow-lg shadow-brand-500/40"
                      : isPast
                      ? "text-slate-600 line-through opacity-50"
                      : "text-slate-300"
                  }
                `}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Input box */}
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isPlaying || gameOver}
          placeholder={isPlaying ? "Type word and press Space..." : "Click Start Challenge below"}
          className="w-full max-w-md px-5 py-3 rounded-2xl bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-center text-xl shadow-inner mb-4"
          autoComplete="off"
        />

        {/* Start / Play Again Button */}
        {!isPlaying && (
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg transition active:scale-95"
          >
            {gameOver ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            <span>{gameOver ? "Play Again" : "Start 60s Challenge"}</span>
          </button>
        )}

        {/* Game Over Summary Modal */}
        {gameOver && (
          <div className="mt-4 p-4 bg-brand-950/60 border border-brand-800 rounded-2xl text-center w-full max-w-md">
            <h4 className="text-xl font-bold text-brand-300 mb-1">Time's Up!</h4>
            <p className="text-sm text-slate-300">
              You typed <span className="font-bold text-white font-mono">{correctWords} words</span> in 60 seconds with <span className="font-bold text-white font-mono">{currentAcc}% accuracy</span>!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

