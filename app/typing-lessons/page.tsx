import React from "react";
import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { LessonsPageClient } from "./LessonsPageClient";

export const metadata: Metadata = generateSeoMetadata({
  title: "Typing Lessons: 6 Levels & 60 Interactive Touch Typing Lessons",
  description: "Learn touch typing with 60 structured interactive lessons across 6 progressive levels: Home Row, Upper & Lower rows, Shift keys, Numbers, Symbols, and Advanced Speed Drills.",
  path: "/typing-lessons",
  keywords: [
    "typing lessons",
    "touch typing curriculum",
    "free typing lessons online",
    "home row lessons",
    "learn typing step by step",
    "keyboard typing course",
    "beginner typing lessons",
  ],
});

export default function TypingLessonsPage() {
  return <LessonsPageClient />;
}
