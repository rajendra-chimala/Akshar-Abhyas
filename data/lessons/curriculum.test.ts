import { describe, it, expect } from "vitest";
import { ALL_LESSONS, ALL_LEVELS_INFO, getLessonsByLevel, getNextLesson, getPrevLesson } from "./index";

describe("curriculum data integrity", () => {
  it("has exactly 6 levels and 60 total lessons", () => {
    expect(ALL_LEVELS_INFO.length).toBe(6);
    expect(ALL_LESSONS.length).toBe(60);

    for (let level = 1; level <= 6; level++) {
      const lessons = getLessonsByLevel(level as any);
      expect(lessons.length).toBe(10);
    }
  });

  it("ensures every lesson has a unique slug and non-empty text", () => {
    const slugs = new Set<string>();
    ALL_LESSONS.forEach((lesson) => {
      expect(slugs.has(lesson.slug)).toBe(false);
      slugs.add(lesson.slug);
      expect(lesson.text.length).toBeGreaterThan(10);
      expect(lesson.targetKeys.length).toBeGreaterThan(0);
      expect(lesson.targetWpm).toBeGreaterThan(0);
    });
  });

  it("handles next and previous lesson navigation correctly", () => {
    const firstLesson = ALL_LESSONS[0];
    const prev = getPrevLesson(firstLesson.id);
    expect(prev).toBeUndefined();

    const next = getNextLesson(firstLesson.id);
    expect(next).toBeDefined();
    expect(next?.id).toBe(ALL_LESSONS[1].id);

    const lastLesson = ALL_LESSONS[ALL_LESSONS.length - 1];
    expect(getNextLesson(lastLesson.id)).toBeUndefined();
    expect(getPrevLesson(lastLesson.id)?.id).toBe(ALL_LESSONS[ALL_LESSONS.length - 2].id);
  });
});

