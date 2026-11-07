import { LevelId } from "@/types/lesson";
import { CompletedLesson, GameHighScore, TypingTestRecord, UserProgress } from "@/types/progress";
import { KeyboardPreferences } from "@/types/typing";

const STORAGE_KEY = "akshar_abhyas_user_data_v1";

export const DEFAULT_PREFERENCES: KeyboardPreferences = {
  showKeyboard: true,
  showFingerColors: true,
  showKeyLabels: true,
  soundEnabled: true,
  strictBackspace: false,
};

export const DEFAULT_USER_PROGRESS: UserProgress = {
  version: 1,
  completedLessons: {},
  currentLevelId: 1,
  totalPracticeSeconds: 0,
  testsHistory: [],
  gameHighScores: {},
  preferences: DEFAULT_PREFERENCES,
  theme: "light",
  lastActive: new Date().toISOString(),
};

export function getUserProgress(): UserProgress {
  if (typeof window === "undefined") return DEFAULT_USER_PROGRESS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_USER_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_USER_PROGRESS,
      ...parsed,
      preferences: {
        ...DEFAULT_PREFERENCES,
        ...(parsed.preferences || {}),
      },
      completedLessons: parsed.completedLessons || {},
      testsHistory: parsed.testsHistory || [],
      gameHighScores: parsed.gameHighScores || {},
    };
  } catch (err) {
    console.error("Failed to load user progress:", err);
    return DEFAULT_USER_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;

  try {
    const updated = {
      ...progress,
      lastActive: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event for reactive sync across components
    window.dispatchEvent(new Event("akshar-progress-updated"));
  } catch (err) {
    console.error("Failed to save user progress:", err);
  }
}

export function recordTestResult(record: TypingTestRecord): UserProgress {
  const current = getUserProgress();
  const updatedHistory = [record, ...current.testsHistory].slice(0, 50); // Keep last 50 tests
  const updated: UserProgress = {
    ...current,
    totalPracticeSeconds: current.totalPracticeSeconds + record.duration,
    testsHistory: updatedHistory,
  };
  saveUserProgress(updated);
  return updated;
}

export function recordLessonCompletion(
  lessonId: string,
  levelId: LevelId,
  wpm: number,
  accuracy: number,
  secondsSpent: number = 60
): UserProgress {
  const current = getUserProgress();
  const existing = current.completedLessons[lessonId];

  const updatedLesson: CompletedLesson = {
    lessonId,
    levelId,
    completedAt: new Date().toISOString(),
    bestWpm: existing ? Math.max(existing.bestWpm, wpm) : wpm,
    bestAccuracy: existing ? Math.max(existing.bestAccuracy, accuracy) : accuracy,
    attempts: (existing?.attempts || 0) + 1,
  };

  const updated: UserProgress = {
    ...current,
    totalPracticeSeconds: current.totalPracticeSeconds + secondsSpent,
    completedLessons: {
      ...current.completedLessons,
      [lessonId]: updatedLesson,
    },
  };

  saveUserProgress(updated);
  return updated;
}

export function recordGameScore(
  gameId: string,
  gameName: string,
  score: number,
  wpm?: number,
  accuracy?: number,
  levelReached?: number
): UserProgress {
  const current = getUserProgress();
  const existing = current.gameHighScores[gameId];

  if (!existing || score > existing.score) {
    const newRecord: GameHighScore = {
      gameId,
      gameName,
      score,
      wpm,
      accuracy,
      levelReached,
      date: new Date().toISOString(),
    };

    const updated: UserProgress = {
      ...current,
      gameHighScores: {
        ...current.gameHighScores,
        [gameId]: newRecord,
      },
    };
    saveUserProgress(updated);
    return updated;
  }
  return current;
}

export function updatePreferences(partial: Partial<KeyboardPreferences>): UserProgress {
  const current = getUserProgress();
  const updated: UserProgress = {
    ...current,
    preferences: {
      ...current.preferences,
      ...partial,
    },
  };
  saveUserProgress(updated);
  return updated;
}

export function exportProgressToJson(): string {
  const progress = getUserProgress();
  return JSON.stringify(progress, null, 2);
}

export function importProgressFromJson(jsonStr: string): { success: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== "object") {
      return { success: false, error: "Invalid JSON format." };
    }
    const validated: UserProgress = {
      ...DEFAULT_USER_PROGRESS,
      ...parsed,
      preferences: {
        ...DEFAULT_PREFERENCES,
        ...(parsed.preferences || {}),
      },
    };
    saveUserProgress(validated);
    return { success: true };
  } catch {
    return { success: false, error: "Could not parse JSON. Check file structure." };
  }
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("akshar-progress-updated"));
}
