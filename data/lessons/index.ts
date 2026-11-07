import { Lesson, LevelId, LevelInfo } from "@/types/lesson";
import { LEVEL_1_LESSONS } from "./level1";
import { LEVEL_2_LESSONS } from "./level2";
import { LEVEL_3_LESSONS } from "./level3";
import { LEVEL_4_LESSONS } from "./level4";
import { LEVEL_5_LESSONS } from "./level5";
import { LEVEL_6_LESSONS } from "./level6";

export const ALL_LEVELS_INFO: LevelInfo[] = [
  {
    id: 1,
    title: "Level 1: Absolute Beginner",
    subtitle: "Home Row Mastery & Finger Placement",
    goal: "Understand keyboard layout, finger positioning, and conquer the home row (ASDF JKL;).",
    description: "Start your touch typing journey from scratch. Learn proper ergonomic posture, discover the physical bumps on F and J, and build muscle memory on the home row.",
    badge: "Foundation",
    iconName: "Home",
    lessonCount: LEVEL_1_LESSONS.length,
  },
  {
    id: 2,
    title: "Level 2: Beginner",
    subtitle: "Upper & Lower Letter Rows",
    goal: "Master reaching to the top (QWERT YUIOP) and bottom (ZXCV BNM) letter rows.",
    description: "Expand your finger reach across the entire 26-letter English alphabet. Connect top, home, and bottom rows to type real sentences fluidly.",
    badge: "Alphabet",
    iconName: "Compass",
    lessonCount: LEVEL_2_LESSONS.length,
  },
  {
    id: 3,
    title: "Level 3: Intermediate",
    subtitle: "Speed, Accuracy, Shift & Punctuation",
    goal: "Boost WPM to 35+, master the Shift key for capital letters, and punctuate naturally.",
    description: "Train on high-frequency digraphs, trigraphs, and proper capitalization using opposite-hand Shift technique.",
    badge: "Fluency",
    iconName: "Zap",
    lessonCount: LEVEL_3_LESSONS.length,
  },
  {
    id: 4,
    title: "Level 4: Numbers & Symbols",
    subtitle: "Top Row Digits & Special Characters",
    goal: "Type numbers (0-9) and programming symbols (!@#$%^&*()_+=[]{}<>/) without looking down.",
    description: "Conquer the difficult top number row and shift-symbols. Essential for developers, accountants, students, and professionals.",
    badge: "Symbols",
    iconName: "Hash",
    lessonCount: LEVEL_4_LESSONS.length,
  },
  {
    id: "5" as unknown as LevelId, // will be cast to LevelId 5
    title: "Level 5: Advanced Typing",
    subtitle: "Endurance, Technical Text & Speed Drills",
    goal: "Achieve 50+ WPM with 95%+ accuracy under time pressure and technical documentation.",
    description: "Tackle difficult vocabulary, code snippets, camelCase identifiers, and long-form endurance paragraphs.",
    badge: "Speed",
    iconName: "Award",
    lessonCount: LEVEL_5_LESSONS.length,
  },
  {
    id: 6,
    title: "Level 6: Expert",
    subtitle: "Transcription, Mastery & Certification",
    goal: "Break 70+ WPM with near-perfect 98%+ accuracy across complex multi-clause prose.",
    description: "Elite speed training, courtroom/medical transcription simulation, and the final grand touch typing certification assessment.",
    badge: "Mastery",
    iconName: "Crown",
    lessonCount: LEVEL_6_LESSONS.length,
  },
];

// Fix Level 5 id type
ALL_LEVELS_INFO[4].id = 5 as LevelId;

export const ALL_LESSONS: Lesson[] = [
  ...LEVEL_1_LESSONS,
  ...LEVEL_2_LESSONS,
  ...LEVEL_3_LESSONS,
  ...LEVEL_4_LESSONS,
  ...LEVEL_5_LESSONS,
  ...LEVEL_6_LESSONS,
];

export function getLessonsByLevel(levelId: LevelId): Lesson[] {
  return ALL_LESSONS.filter((l) => l.levelId === levelId);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.slug === slug);
}

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = ALL_LESSONS.findIndex((l) => l.id === currentLessonId);
  if (currentIndex >= 0 && currentIndex < ALL_LESSONS.length - 1) {
    return ALL_LESSONS[currentIndex + 1];
  }
  return undefined;
}

export function getPrevLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = ALL_LESSONS.findIndex((l) => l.id === currentLessonId);
  if (currentIndex > 0) {
    return ALL_LESSONS[currentIndex - 1];
  }
  return undefined;
}

