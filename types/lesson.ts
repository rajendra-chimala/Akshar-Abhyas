import { Finger, Hand } from "./typing";

export type LevelId = 1 | 2 | 3 | 4 | 5 | 6;

export interface Lesson {
  id: string;
  slug: string;
  levelId: LevelId;
  lessonNumber: number;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  targetKeys: string[];
  focusHand?: Hand;
  focusFingers?: Finger[];
  instructions?: string;
  text: string;
  minAccuracyToPass: number;
  targetWpm: number;
}

export interface LevelInfo {
  id: LevelId;
  title: string;
  subtitle: string;
  goal: string;
  description: string;
  badge: string;
  iconName: string;
  lessonCount: number;
}

