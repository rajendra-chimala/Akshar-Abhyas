import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { calculateMetrics } from "@/lib/calculations/typingMetrics";
import { soundEffects } from "@/lib/typing/soundEffects";
import { CharStatus, TypingMetrics } from "@/types/typing";

interface UseTypingEngineProps {
  targetText: string;
  duration?: number; // In seconds; if undefined, test ends when targetText is fully typed
  strictBackspace?: boolean;
  soundEnabled?: boolean;
  onComplete?: (metrics: TypingMetrics) => void;
}

export function useTypingEngine({
  targetText,
  duration,
  strictBackspace = false,
  soundEnabled = true,
  onComplete,
}: UseTypingEngineProps) {
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [lastKeystrokeStatus, setLastKeystrokeStatus] = useState<"correct" | "incorrect" | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const textLength = targetText.length;
  const currentIndex = typedChars.length;

  // Build character status array
  const charStatuses = useMemo<CharStatus[]>(() => {
    const list: CharStatus[] = [];
    for (let i = 0; i < textLength; i++) {
      const expectedChar = targetText[i];
      if (i < currentIndex) {
        const typed = typedChars[i];
        list.push({
          char: typed,
          expectedChar,
          state: typed === expectedChar ? "correct" : "incorrect",
        });
      } else if (i === currentIndex) {
        list.push({
          char: expectedChar,
          expectedChar,
          state: "current",
        });
      } else {
        list.push({
          char: expectedChar,
          expectedChar,
          state: "untyped",
        });
      }
    }
    return list;
  }, [targetText, textLength, currentIndex, typedChars]);

  const metrics = useMemo<TypingMetrics>(() => {
    return calculateMetrics(
      correctCount,
      incorrectCount,
      totalKeystrokes,
      elapsedSeconds,
      isCompleted
    );
  }, [correctCount, incorrectCount, totalKeystrokes, elapsedSeconds, isCompleted]);

  // Complete helper
  const finalizeTest = useCallback(
    (finalElapsed: number, finalCorrect: number, finalIncorrect: number, finalKeystrokes: number) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsCompleted(true);
      const finalMetrics = calculateMetrics(
        finalCorrect,
        finalIncorrect,
        finalKeystrokes,
        finalElapsed,
        true
      );
      if (soundEnabled) {
        soundEffects.playSuccessChime(true);
      }
      if (onCompleteRef.current) {
        onCompleteRef.current(finalMetrics);
      }
    },
    [soundEnabled]
  );

  // Timer loop
  useEffect(() => {
    if (startTime && !isCompleted) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.max(1, Math.floor((now - startTime) / 1000));
        setElapsedSeconds(elapsed);

        if (duration && elapsed >= duration) {
          finalizeTest(duration, correctCount, incorrectCount, totalKeystrokes);
        }
      }, 250);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime, isCompleted, duration, finalizeTest, correctCount, incorrectCount, totalKeystrokes]);

  // Key press processor
  const processCharacter = useCallback(
    (key: string, code?: string) => {
      if (isCompleted) return;

      // Handle Backspace
      if (key === "Backspace") {
        if (strictBackspace) return; // Strict mode disables backspace
        if (typedChars.length > 0) {
          setTypedChars((prev) => prev.slice(0, -1));
          setLastKeystrokeStatus(null);
        }
        return;
      }

      // Ignore multi-char special keys (Tab, Shift, Control, Alt, Meta, CapsLock, Enter when not expected)
      if (key.length > 1 && key !== "Enter") {
        return;
      }

      const charToCompare = key === "Enter" ? "\n" : key;

      // Start timing upon first valid keystroke
      if (!startTime) {
        setStartTime(Date.now());
      }

      const expectedChar = targetText[currentIndex];
      const isCorrect = charToCompare === expectedChar;

      // Play audio feedback
      if (soundEnabled) {
        if (isCorrect) {
          soundEffects.playKeyClick(true);
        } else {
          soundEffects.playKeyError(true);
        }
      }

      // Key animation trigger
      setPressedKey(code || key);
      setTimeout(() => setPressedKey(null), 120);

      const nextTyped = [...typedChars, charToCompare];
      const nextCorrect = isCorrect ? correctCount + 1 : correctCount;
      const nextIncorrect = isCorrect ? incorrectCount : incorrectCount + 1;
      const nextTotal = totalKeystrokes + 1;

      setTypedChars(nextTyped);
      setTotalKeystrokes(nextTotal);
      if (isCorrect) {
        setCorrectCount(nextCorrect);
      } else {
        setIncorrectCount(nextIncorrect);
      }
      setLastKeystrokeStatus(isCorrect ? "correct" : "incorrect");

      // Check if test reached end of text
      if (nextTyped.length >= textLength) {
        const now = Date.now();
        const finalSecs = startTime ? Math.max(1, Math.round((now - startTime) / 1000)) : 1;
        finalizeTest(finalSecs, nextCorrect, nextIncorrect, nextTotal);
      }
    },
    [
      isCompleted,
      strictBackspace,
      typedChars,
      startTime,
      targetText,
      currentIndex,
      soundEnabled,
      correctCount,
      incorrectCount,
      totalKeystrokes,
      textLength,
      finalizeTest,
    ]
  );

  // Global keyboard listener hook
  const handleKeyDown = useCallback(
    (e: KeyboardEvent | React.KeyboardEvent) => {
      // Prevent page scrolling on Spacebar
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
      }

      // Ignore browser shortcuts
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }

      processCharacter(e.key, e.code);
    },
    [processCharacter]
  );

  // Restart function
  const restart = useCallback((newText?: string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTypedChars([]);
    setStartTime(null);
    setElapsedSeconds(0);
    setIsCompleted(false);
    setTotalKeystrokes(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setPressedKey(null);
    setLastKeystrokeStatus(null);
  }, []);

  const remainingSeconds = duration ? Math.max(0, duration - elapsedSeconds) : null;
  const nextExpectedChar = currentIndex < textLength ? targetText[currentIndex] : "";

  return {
    typedChars,
    charStatuses,
    currentIndex,
    nextExpectedChar,
    isStarted: startTime !== null,
    isCompleted,
    elapsedSeconds,
    remainingSeconds,
    metrics,
    pressedKey,
    lastKeystrokeStatus,
    handleKeyDown,
    processCharacter,
    restart,
  };
}
