export type Hand = "left" | "right" | "either";

export type Finger = "pinky" | "ring" | "middle" | "index" | "thumb";

export interface KeyDefinition {
  code: string;
  label: string;
  shiftLabel?: string;
  finger: Finger;
  hand: Hand;
  row: number; // 0: function/number row, 1: QWERTY, 2: ASDF, 3: ZXCV, 4: Space row
  width?: string;
  isSpecial?: boolean;
}

export type CharacterState = "untyped" | "correct" | "incorrect" | "current";

export interface CharStatus {
  char: string;
  state: CharacterState;
  expectedChar: string;
}

export interface TypingMetrics {
  wpm: number;
  rawWpm: number;
  cpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalKeystrokes: number;
  elapsedSeconds: number;
  completed: boolean;
  rating: PerformanceRating;
}

export type PerformanceRating =
  | "Beginner"
  | "Elementary"
  | "Intermediate"
  | "Proficient"
  | "Advanced"
  | "Pro"
  | "Master"
  | "Typing Ninja";

export type TestDuration = 15 | 30 | 60 | 120 | 300;

export type TestCategory =
  | "beginner"
  | "easy"
  | "medium"
  | "hard"
  | "expert"
  | "words"
  | "paragraphs"
  | "numbers"
  | "punctuation"
  | "custom";

export interface KeyboardPreferences {
  showKeyboard: boolean;
  showFingerColors: boolean;
  showKeyLabels: boolean;
  soundEnabled: boolean;
  strictBackspace: boolean; // if true, backspace is disabled
}

export type { TypingTestRecord } from "./progress";

