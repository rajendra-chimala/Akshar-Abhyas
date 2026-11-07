import { describe, it, expect } from "vitest";
import { calculateMetrics, getPerformanceRating } from "./typingMetrics";

describe("typingMetrics calculations", () => {
  it("calculates accurate WPM using 5-character word standard", () => {
    // 300 characters in 60 seconds = 60 WPM
    const metrics = calculateMetrics(300, 0, 300, 60, true);
    expect(metrics.wpm).toBe(60);
    expect(metrics.cpm).toBe(300);
    expect(metrics.accuracy).toBe(100);
    expect(metrics.rating).toBe("Proficient");
  });

  it("handles errors and calculates accuracy correctly", () => {
    // 270 correct keystrokes out of 300 total keystrokes = 90% accuracy
    const metrics = calculateMetrics(270, 30, 300, 60, true);
    expect(metrics.wpm).toBe(54);
    expect(metrics.accuracy).toBe(90);
    expect(metrics.rawWpm).toBe(60);
  });

  it("prevents division by zero when elapsed time is 0", () => {
    const metrics = calculateMetrics(0, 0, 0, 0, false);
    expect(metrics.wpm).toBe(0);
    expect(metrics.accuracy).toBe(100);
    expect(metrics.rating).toBe("Beginner");
  });

  it("assigns ratings accurately according to benchmarks", () => {
    expect(getPerformanceRating(15, 90)).toBe("Beginner");
    expect(getPerformanceRating(25, 95)).toBe("Elementary");
    expect(getPerformanceRating(40, 95)).toBe("Intermediate");
    expect(getPerformanceRating(60, 95)).toBe("Proficient");
    expect(getPerformanceRating(75, 95)).toBe("Advanced");
    expect(getPerformanceRating(90, 95)).toBe("Pro");
    expect(getPerformanceRating(105, 95)).toBe("Master");
    expect(getPerformanceRating(125, 98)).toBe("Typing Ninja");
  });
});

