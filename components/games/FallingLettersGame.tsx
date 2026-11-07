"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { recordGameScore } from "@/lib/storage/localStorage";
import { soundEffects } from "@/lib/typing/soundEffects";
import { Play, RotateCcw, Heart, Trophy, Flame } from "lucide-react";

interface FallingLetter {
  id: number;
  letter: string;
  x: number;
  y: number;
  speed: number;
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export const FallingLettersGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(5);
  const [letters, setLetters] = useState<FallingLetter[]>([]);

  const nextIdRef = useRef(1);
  const animFrameRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const spawnLetter = useCallback(() => {
    const randomChar = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    const x = Math.floor(Math.random() * 80) + 10;
    const speed = 0.2 + Math.min(score / 500, 0.4);

    const newLetter: FallingLetter = {
      id: nextIdRef.current++,
      letter: randomChar,
      x,
      y: 0,
      speed,
    };
    setLetters((prev) => [...prev, newLetter]);
  }, [score]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 16.6;
      lastTime = time;

      const spawnInterval = Math.max(700, 1500 - streak * 20);
      if (time - lastSpawnRef.current > spawnInterval) {
        spawnLetter();
        lastSpawnRef.current = time;
      }

      setLetters((prev) => {
        let missed = 0;
        const updated: FallingLetter[] = [];

        for (const item of prev) {
          const nextY = item.y + item.speed * delta;
          if (nextY >= 90) {
            missed++;
          } else {
            updated.push({ ...item, y: nextY });
          }
        }

        if (missed > 0) {
          soundEffects.playKeyError(true);
          setStreak(0);
          setLives((l) => {
            const nextL = l - missed;
            if (nextL <= 0) {
              setGameOver(true);
              setIsPlaying(false);
              recordGameScore("falling-letters", "Falling Letters", score);
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
  }, [isPlaying, gameOver, streak, score, spawnLetter]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isPlaying || gameOver) return;

    const key = e.key.toLowerCase();
    if (key.length !== 1 || key < "a" || key > "z") return;

    // Find the lowest falling letter that matches
    const matches = letters.filter((l) => l.letter === key);
    if (matches.length > 0) {
      // Find the one closest to bottom (highest Y)
      matches.sort((a, b) => b.y - a.y);
      const target = matches[0];

      soundEffects.playKeyClick(true);
      setLetters((prev) => prev.filter((l) => l.id !== target.id));
      setStreak((s) => s + 1);
      setScore((s) => s + 10 + streak * 2);
    } else {
      soundEffects.playKeyError(true);
      setStreak(0);
    }
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setLives(5);
    setLetters([]);
    setGameOver(false);
    setIsPlaying(true);
    lastSpawnRef.current = performance.now();
    setTimeout(() => containerRef.current?.focus(), 50);
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
          <div className="flex items-center gap-1 text-amber-500 font-semibold text-sm">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>Streak: {streak}x</span>
          </div>
        </div>

        {/* Lives */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-5 h-5 transition ${
                i < lives
                  ? "text-rose-500 fill-rose-500"
                  : "text-slate-300 dark:text-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Game arena */}
      <div className="relative w-full h-[400px] bg-slate-900 rounded-3xl border-2 border-slate-800 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
        {/* Danger bottom boundary */}
        <div className="absolute bottom-10 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500/80 to-transparent shadow-[0_0_8px_rgba(244,63,94,0.8)]" />

        {/* Falling letters */}
        {letters.map((l) => (
          <div
            key={l.id}
            style={{
              left: `${l.x}%`,
              top: `${l.y}%`,
            }}
            className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full bg-brand-500 text-white font-mono font-bold text-xl flex items-center justify-center shadow-lg shadow-brand-500/50 uppercase border-2 border-brand-300 animate-pulse"
          >
            {l.letter}
          </div>
        ))}

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20 animate-fade-in">
            <h3 className="text-3xl font-extrabold text-rose-500 mb-2">Game Over!</h3>
            <p className="text-slate-300 mb-6">
              Final Score: <span className="text-white font-bold font-mono">{score} points</span>
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg transition active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Play Again</span>
            </button>
          </div>
        )}

        {/* Not started */}
        {!isPlaying && !gameOver && (
          <div className="text-center z-20">
            <h3 className="text-3xl font-extrabold text-white mb-2">Falling Letters</h3>
            <p className="text-slate-300 max-w-md mx-auto mb-6 text-sm">
              Press the matching letter key on your physical keyboard to zap letters before they hit the bottom red laser line!
            </p>
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-3.5 mx-auto rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-base shadow-lg transition active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Game</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
