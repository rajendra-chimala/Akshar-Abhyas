"use client";

import React, { useMemo } from "react";
import { FINGER_COLORS, getKeyForChar, KEYBOARD_ROWS } from "@/lib/typing/keyboardData";
import { Finger, Hand, KeyDefinition } from "@/types/typing";

interface VirtualKeyboardProps {
  nextExpectedChar?: string;
  activeKeyCode?: string | null;
  lastKeystrokeStatus?: "correct" | "incorrect" | null;
  showColors?: boolean;
  showLabels?: boolean;
  onKeyClick?: (key: string, code: string) => void;
  className?: string;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  nextExpectedChar = "",
  activeKeyCode = null,
  lastKeystrokeStatus = null,
  showColors = true,
  showLabels = true,
  onKeyClick,
  className = "",
}) => {
  // Determine target key and whether Shift is needed
  const targetKeyInfo = useMemo(() => {
    if (!nextExpectedChar) return null;
    return getKeyForChar(nextExpectedChar) || null;
  }, [nextExpectedChar]);

  const targetCode = targetKeyInfo?.code;
  const isShiftNeeded = targetKeyInfo?.shiftRequired;
  const shiftHand = targetKeyInfo?.shiftHand; // 'left' or 'right'

  return (
    <div className={`w-full flex flex-col items-center select-none ${className}`}>
      {/* Hand & Finger Guidance Header */}
      {targetKeyInfo && (
        <div className="mb-3 flex items-center justify-between w-full max-w-4xl px-3 py-1.5 bg-brand-50/80 dark:bg-emerald-950/30 border border-brand-200 dark:border-emerald-800/40 rounded-lg text-xs sm:text-sm text-brand-900 dark:text-brand-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-brand-700 dark:text-brand-400">Next Key:</span>
            <span className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded border border-brand-300 dark:border-slate-700 font-mono font-bold text-sm shadow-sm">
              {nextExpectedChar === " " ? "␣ Space" : nextExpectedChar === "\n" ? "↵ Enter" : nextExpectedChar}
            </span>
            {isShiftNeeded && (
              <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 rounded border border-amber-300">
                + Shift ({shiftHand} hand)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-muted-foreground">Hand:</span>
              <span className="font-semibold capitalize text-brand-800 dark:text-brand-200">
                {targetKeyInfo.hand}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-muted-foreground">Finger:</span>
              <span
                className={`font-semibold capitalize px-2 py-0.5 rounded text-xs ${
                  FINGER_COLORS[targetKeyInfo.finger].bg
                } ${FINGER_COLORS[targetKeyInfo.finger].text} border ${
                  FINGER_COLORS[targetKeyInfo.finger].border
                }`}
              >
                {targetKeyInfo.finger}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Matrix */}
      <div className="w-full max-w-4xl p-2 sm:p-3 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl shadow-inner flex flex-col gap-1 sm:gap-1.5 overflow-x-auto">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1 sm:gap-1.5 justify-center w-full">
            {row.map((key) => {
              const isTarget = targetCode === key.code;
              const isShiftTarget =
                isShiftNeeded &&
                ((shiftHand === "left" && key.code === "ShiftLeft") ||
                  (shiftHand === "right" && key.code === "ShiftRight"));
              const isPressed = activeKeyCode === key.code;
              const fingerColor = FINGER_COLORS[key.finger];

              // Dynamic styling based on states
              let keyBg = "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100";
              let keyBorder = "border-slate-300 dark:border-slate-700";
              let keyShadow = "shadow-sm";

              if (showColors && !isTarget && !isPressed) {
                keyBg = fingerColor.bg;
                keyBorder = fingerColor.border;
              }

              // Active pressed key
              if (isPressed) {
                keyShadow = "shadow-inner scale-[0.96] translate-y-0.5";
                if (lastKeystrokeStatus === "incorrect") {
                  keyBg = "bg-red-500 text-white border-red-600";
                } else {
                  keyBg = "bg-brand-600 text-white border-brand-700";
                }
              } else if (isTarget || isShiftTarget) {
                // Next expected key pulse
                keyBg = "bg-brand-500 text-white border-brand-600 ring-2 ring-brand-400 ring-offset-1 dark:ring-offset-slate-900 animate-pulse";
              }

              return (
                <button
                  key={key.code}
                  type="button"
                  tabIndex={-1}
                  onClick={() => onKeyClick && onKeyClick(key.label, key.code)}
                  className={`
                    relative h-9 sm:h-11 rounded-lg border flex flex-col items-center justify-center
                    font-mono font-medium text-xs sm:text-sm transition-all duration-100 select-none
                    ${key.width || "w-10 sm:w-11"}
                    ${keyBg} ${keyBorder} ${keyShadow}
                    hover:brightness-95 active:scale-95
                  `}
                  title={`${key.label} (${key.hand} ${key.finger})`}
                >
                  {/* Tactile bumps on F and J */}
                  {(key.code === "KeyF" || key.code === "KeyJ") && (
                    <span className="absolute bottom-1 w-2.5 sm:w-3 h-0.5 bg-slate-400 dark:bg-slate-300 rounded-full" />
                  )}

                  {/* Key Shift Label */}
                  {showLabels && key.shiftLabel && (
                    <span className="text-[10px] leading-none opacity-60">
                      {key.shiftLabel}
                    </span>
                  )}

                  {/* Main Key Label */}
                  <span className="leading-tight">
                    {showLabels ? key.label : ""}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Color Legend */}
      {showColors && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-200 border border-rose-400" />
            <span>Pinky</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-200 border border-amber-400" />
            <span>Ring</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-yellow-200 border border-yellow-400" />
            <span>Middle</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-200 border border-emerald-400" />
            <span>Index</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-200 border border-sky-400" />
            <span>Thumb (Space)</span>
          </div>
        </div>
      )}
    </div>
  );
};
