import { PerformanceRating, TypingMetrics } from "@/types/typing";

export function calculateMetrics(
  correctChars: number,
  incorrectChars: number,
  totalKeystrokes: number,
  elapsedSeconds: number,
  completed: boolean = false
): TypingMetrics {
  // Prevent division by zero or unrealistic initial bursts
  const effectiveSeconds = Math.max(elapsedSeconds, 1);
  const minutes = effectiveSeconds / 60;

  // Standard calculation: 5 characters per word
  const rawWpm = Math.round(totalKeystrokes / 5 / minutes);
  const wpm = Math.max(0, Math.round(correctChars / 5 / minutes));
  const cpm = Math.max(0, Math.round(correctChars / minutes));

  const accuracy =
    totalKeystrokes > 0
      ? Math.max(0, Math.min(100, Math.round((correctChars / totalKeystrokes) * 1000) / 10))
      : 100;

  const rating = getPerformanceRating(wpm, accuracy);

  return {
    wpm,
    rawWpm,
    cpm,
    accuracy,
    correctChars,
    incorrectChars,
    totalKeystrokes,
    elapsedSeconds,
    completed,
    rating,
  };
}

export function getPerformanceRating(wpm: number, accuracy: number): PerformanceRating {
  if (wpm >= 120 && accuracy >= 95) return "Typing Ninja";
  if (wpm >= 100) return "Master";
  if (wpm >= 85) return "Pro";
  if (wpm >= 70) return "Advanced";
  if (wpm >= 50) return "Proficient";
  if (wpm >= 35) return "Intermediate";
  if (wpm >= 20) return "Elementary";
  return "Beginner";
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

