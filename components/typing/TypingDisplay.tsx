"use client";

import React, { useEffect, useRef } from "react";
import { CharStatus } from "@/types/typing";

interface TypingDisplayProps {
  charStatuses: CharStatus[];
  currentIndex: number;
  isFocused: boolean;
  onFocusClick?: () => void;
  className?: string;
}

export const TypingDisplay: React.FC<TypingDisplayProps> = ({
  charStatuses,
  currentIndex,
  isFocused,
  onFocusClick,
  className = "",
}) => {
  const activeCharRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll so current character is always comfortably in view
  useEffect(() => {
    if (activeCharRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeEl = activeCharRef.current;

      const offsetTop = activeEl.offsetTop - container.offsetTop;
      const targetScrollTop = offsetTop - container.clientHeight / 2 + activeEl.clientHeight / 2;

      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      onClick={onFocusClick}
      className={`
        relative w-full max-h-52 overflow-y-auto p-4 sm:p-6 rounded-2xl
        bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800
        cursor-text font-mono text-lg sm:text-2xl leading-relaxed tracking-wide select-none
        transition-all duration-200 shadow-sm
        ${isFocused ? "border-brand-500/80 ring-2 ring-brand-400/20 shadow-md" : "opacity-90"}
        ${className}
      `}
    >
      {/* Unfocused overlay prompt */}
      {!isFocused && (
        <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-2xl">
          <span className="px-4 py-2 bg-white dark:bg-slate-800 text-brand-700 dark:text-brand-300 font-sans text-sm font-semibold rounded-lg shadow border border-brand-200">
            Click here or press any key to focus & start typing
          </span>
        </div>
      )}

      {/* Render text stream */}
      <div className="flex flex-wrap break-words">
        {charStatuses.map((item, idx) => {
          const isCurrent = idx === currentIndex;
          const displayChar = item.expectedChar === "\n" ? "↵\n" : item.expectedChar;

          let charClasses = "text-slate-400 dark:text-slate-500"; // untyped

          if (item.state === "correct") {
            charClasses = "text-emerald-600 dark:text-emerald-400 font-semibold";
          } else if (item.state === "incorrect") {
            charClasses = "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80 rounded underline decoration-rose-500";
          }

          if (isCurrent) {
            charClasses = "bg-brand-200/80 dark:bg-emerald-950/80 border-b-2 border-brand-600 text-brand-950 dark:text-brand-100 font-bold px-0.5 rounded-t animate-pulse";
          }

          return (
            <span
              key={idx}
              ref={isCurrent ? activeCharRef : null}
              className={`transition-colors duration-75 inline-block whitespace-pre ${charClasses}`}
            >
              {displayChar}
            </span>
          );
        })}
      </div>
    </div>
  );
};

