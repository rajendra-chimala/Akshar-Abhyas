"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost, BLOG_POSTS, getAllBlogCategories } from "@/data/blog";
import {
  BookOpen,
  Clock,
  Calendar,
  Search,
  ArrowRight,
  Sparkles,
  Tag,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";

export function BlogHubClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => getAllBlogCategories(), []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.keywords.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-3.5 py-1 rounded-full bg-brand-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 font-bold text-xs border border-brand-200 dark:border-emerald-800 uppercase tracking-wider mb-4 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          <span>Knowledge & SEO Articles</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-4">
          The Touch Typing & Speed Blog
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          In-depth guides, speed benchmarks, keyboard ergonomics, and science-backed training blueprints to help you achieve effortless keyboard mastery.
        </p>
      </div>

      {/* Featured Article Card */}
      {featuredPost && activeCategory === "All" && !searchQuery && (
        <div className="mb-12">
          <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-50/70 via-emerald-50/40 to-white dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border border-brand-200 dark:border-emerald-800 shadow-sm hover:shadow-md transition">
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-600 text-white font-bold">
                    Featured Guide
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground font-mono">
                    <Clock className="w-3.5 h-3.5 text-brand-600" />
                    <span>{featuredPost.readingTime}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                  {featuredPost.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-sm transition active:scale-95"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/typing-test"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 text-sm font-semibold transition"
                  >
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Test Your Speed</span>
                  </Link>
                </div>
              </div>

              {/* Quick Key Takeaways Box */}
              <div className="w-full lg:w-80 p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-brand-100 dark:border-emerald-900/60 text-xs space-y-3">
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <TrendingUp className="w-4 h-4 text-brand-600" />
                  <span>Key Article Highlights</span>
                </span>
                <ul className="space-y-2 text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-brand-600 font-bold">•</span>
                    <span>100% ad-free modern typing environment.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-brand-600 font-bold">•</span>
                    <span>Live virtual keyboard with 10-finger color guidance.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-brand-600 font-bold">•</span>
                    <span>Zero logins: 100% private browser localStorage.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all
                  ${
                    isSelected
                      ? "bg-brand-600 text-white shadow-sm ring-2 ring-brand-600/20"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search typing articles..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
            No articles found
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your search query or switching to another category.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-brand-600 text-white"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-500 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Meta Top */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 font-mono">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-600" />
                    <span>{post.readingTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition mb-2 line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Summary */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                  {post.summary}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.publishedDate}</span>
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Bottom Practice Banner */}
      <div className="mt-16 p-8 rounded-3xl bg-slate-900 text-white dark:bg-emerald-950/70 border border-slate-800 dark:border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="max-w-xl">
          <span className="text-xs uppercase tracking-wider font-bold text-brand-400 block mb-1">
            Put Theory Into Practice
          </span>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            Ready to test your typing speed right now?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Take our free 60-second typing test, view real-time accuracy and CPM, and unlock your personal typing certificate.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/typing-test"
            className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition active:scale-95"
          >
            Start 60s Test
          </Link>
          <Link
            href="/typing-lessons"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition"
          >
            Browse Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}

