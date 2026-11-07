"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { COMMON_WORDS } from "@/data/practice/testSnippets";
import { recordGameScore } from "@/lib/storage/localStorage";
import { soundEffects } from "@/lib/typing/soundEffects";
import { Play, RotateCcw, Heart, Trophy, Zap } from "lucide-react";

interface RainWord {
  id: number;
  word: string;
  x: number; // percentage 10% to 80%
  y: number; // percentage 0% to 100%
  speed: number;
}

export const WordRainGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [level, setLevel] = useState(1);
  const [currentInput, setCurrentInput] = useState("");
  const [words, setWords] = useState<RainWord[]>([]);
  const [wordsCleared, setWordsCleared] = useState(0);

  const nextIdRef = useRef(1);
  const animFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Spawn a new falling word
  const spawnWord = useCallback(() => {
    const randomWord = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
    const x = Math.floor(Math.random() * 70) + 10; // 10% to 80%
    const speed = 0.15 + level * 0.05;

    const newWord: RainWord = {
      id: nextIdRef.current++,
      word: randomWord,
      x,
      y: 0,
      speed,
    };
    setWords((prev) => [...prev, newWord]);
  }, [level]);

  // Main game physics loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 16.6; // normalized to ~60fps
      lastTime = time;

      // Spawn words periodically
      const spawnInterval = Math.max(1200, 2800 - level * 250);
      if (time - lastSpawnRef.current > spawnInterval) {
        spawnWord();
        lastSpawnRef.current = time;
      }

      // Update positions
      setWords((prev) => {
        let missedCount = 0;
        const updated: RainWord[] = [];

        for (const w of prev) {
          const nextY = w.y + w.speed * delta;
          if (nextY >= 90) {
            missedCount++;
          } else {
            updated.push({ ...w, y: nextY });
          }
        }

        if (missedCount > 0) {
          soundEffects.playKeyError(true);
          setLives((l) => {
            const nextL = l - missedCount;
            if (nextL <= 0) {
              setGameOver(true);
              setIsPlaying(false);
              recordGameScore("word-rain", "Word Rain", score, undefined, undefined, level);
              return 0;
            }
            return nextL;
          });
        }

        return updated;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, gameOver, level, score, spawnWord]);

  // Handle typing input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim().toLowerCase();
    setCurrentInput(e.target.value);

    // Check if input matches any active falling word
    const matchIndex = words.findIndex((w) => w.word.toLowerCase() === val);
    if (matchIndex !== -1) {
      soundEffects.playKeyClick(true);
      const matched = words[matchIndex];
      setWords((prev) => prev.filter((_, idx) => idx !== matchIndex));
      setCurrentInput("");
      setScore((s) => s + matched.word.length * 10);
      setWordsCleared((c) => {
        const nextC = c + 1;
        if (nextC % 6 === 0) {
          setLevel((lvl) => lvl + 1);
        }
        return nextC;
      });
    }
  };

  const startGame = () => {
    setScore(0);
    setLives(5);
    setLevel(1);
    setWordsCleared(0);
    setWords([]);
    setCurrentInput("");
    setGameOver(false);
    setIsPlaying(true);
    lastSpawnRef.current = performance.now();
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center select-none">
      {/* Game Header Bar */}
      <div className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-mono font-bold text-xl">
            <Trophy className="w-5 h-5" />
            <span>Score: {score}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
            <Zap className="w-4 h-4" />
            <span>Level {level}</span>
          </div>
        </div>

        {/* Lives indicator */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 transition ${
                i < lives
                  ? "text-rose-500 fill-rose-500 scale-100"
                  : "text-slate-300 dark:text-slate-700 scale-90"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="relative w-full h-[450px] bg-slate-900 rounded-3xl border-2 border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-end">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none" />

        {/* Laser danger zone boundary at 90% */}
        <div className="absolute bottom-16 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500/80 to-transparent shadow-[0_0_8px_rgba(244,63,94,0.8)]" />

        {/* Falling Words */}
        {words.map((w) => {
          const isTargeted = currentInput && w.word.startsWith(currentInput.toLowerCase());
          return (
            <div
              key={w.id}
              style={{
                left: `${w.x}%`,
                top: `${w.y}%`,
              }}
              className={`
                absolute px-3 py-1 rounded-lg font-mono font-bold text-sm sm:text-base transition-all
                ${
                  isTargeted
                    ? "bg-brand-500 text-white ring-2 ring-brand-300 scale-110 shadow-lg shadow-brand-500/50"
                    : "bg-slate-800/95 text-slate-100 border border-slate-700 shadow"
                }
              `}
            >
              {w.word}
            </div>
          );
        })}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in">
            <h3 className="text-3xl font-extrabold text-rose-500 mb-2">Game Over!</h3>
            <p className="text-slate-300 mb-4">
              You scored <span className="text-white font-bold font-mono">{score} points</span> and reached Level {level}!
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg transition active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Play Again</span>
            </button>
          </div>
        )}

        {/* Start Game Overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
            <h3 className="text-3xl font-extrabold text-white mb-2">Word Rain</h3>
            <p className="text-slate-300 max-w-md mb-6 text-sm">
              Type the falling words before they hit the red laser line at the bottom. The rain speeds up with each level!
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg transition active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Game</span>
            </button>
          </div>
        )}

        {/* Bottom Typing Input Field */}
        <div className="relative z-10 w-full p-4 bg-slate-950/80 backdrop-blur border-t border-slate-800 flex items-center justify-center">
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInputChange}
            disabled={!isPlaying || gameOver}
            placeholder={isPlaying ? "Type words here..." : "Click Start to play"}
            className="w-full max-w-md px-4 py-2.5 rounded-xl bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-center text-lg shadow-inner"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};
