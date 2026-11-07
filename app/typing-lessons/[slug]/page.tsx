import React from "react";
import { notFound } from "next/navigation";
import { getLessonBySlug, ALL_LESSONS } from "@/data/lessons";
import { generateSeoMetadata, generateBreadcrumbSchema } from "@/lib/seo/metadata";
import { LessonRunnerClient } from "./LessonRunnerClient";
import { Metadata } from "next";

export function generateStaticParams() {
  return ALL_LESSONS.map((l) => ({
    slug: l.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) {
    return { title: "Lesson Not Found" };
  }
  return generateSeoMetadata({
    title: `${lesson.title} - Level ${lesson.levelId} Lesson ${lesson.lessonNumber}`,
    description: lesson.description,
    path: `/typing-lessons/${lesson.slug}`,
  });
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLessonBySlug(params.slug);

  if (!lesson) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Typing Lessons", item: "/typing-lessons" },
    { name: lesson.title, item: `/typing-lessons/${lesson.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <LessonRunnerClient lesson={lesson} />
    </>
  );
}
