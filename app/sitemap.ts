import { MetadataRoute } from "next";
import { ALL_LESSONS } from "@/data/lessons";
import { EDUCATIONAL_ARTICLES } from "@/data/articles";
import { BLOG_POSTS } from "@/data/blog";

const BASE_URL = "https://aksharabhyas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/typing-test`, lastModified: currentDate, changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/typing-speed-test`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/typing-practice`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/typing-lessons`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE_URL}/keyboard-test`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/typing-games`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/typing-games/word-rain`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/typing-games/speed-challenge`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/typing-games/text-survival`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/typing-games/falling-letters`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/typing-games/word-accuracy`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/touch-typing`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/learn-keyboard-typing`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/blog`, lastModified: currentDate, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/typing-tips`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/typing-certificate`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/progress`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/terms`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Dynamic lesson routes (60 lessons)
  const lessonRoutes: MetadataRoute.Sitemap = ALL_LESSONS.map((l) => ({
    url: `${BASE_URL}/typing-lessons/${l.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic article routes (10 articles)
  const articleRoutes: MetadataRoute.Sitemap = EDUCATIONAL_ARTICLES.map((a) => ({
    url: `${BASE_URL}/typing-tips/${a.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic blog routes (9 articles)
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((b) => ({
    url: `${BASE_URL}/blog/${b.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...lessonRoutes, ...articleRoutes, ...blogRoutes];
}

