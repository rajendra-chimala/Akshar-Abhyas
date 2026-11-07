import { LevelId } from "./lesson";
import { KeyboardPreferences, PerformanceRating, TestCategory, TestDuration } from "./typing";

export interface TypingTestRecord {
  id: string;
  timestamp: string;
  duration: TestDuration;
  category: TestCategory;
  wpm: number;
  rawWpm: number;
  cpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  rating: PerformanceRating;
}

export interface CompletedLesson {
  lessonId: string;
  levelId: LevelId;
  completedAt: string;
  bestWpm: number;
  bestAccuracy: number;
  attempts: number;
}

export interface GameHighScore {
  gameId: string;
  gameName: string;
  score: number;
  wpm?: number;
  accuracy?: number;
  levelReached?: number;
  date: string;
}

export interface UserProgress {
  version: number;
  completedLessons: Record<string, CompletedLesson>;
  currentLevelId: LevelId;
  totalPracticeSeconds: number;
  testsHistory: TypingTestRecord[];
  gameHighScores: Record<string, GameHighScore>;
  preferences: KeyboardPreferences;
  theme: "light" | "dark" | "system";
  lastActive: string;
}
