import React from "react";
import Link from "next/link";
import { EDUCATIONAL_ARTICLES } from "@/data/articles";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";

export const metadata = generateSeoMetadata({
  title: "Typing Tips & Educational Articles: Improve Speed & Accuracy",
  description: "Explore 10 comprehensive educational articles on how to learn touch typing, understand WPM, build keyboard muscle memory, and fix typing mistakes.",
  path: "/typing-tips",
  keywords: [
    "typing tips",
    "how to improve typing speed",
    "touch typing lessons",
    "keyboard typing practice",
    "what is WPM in typing",
  ],
});

export default function TypingTipsHubPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-emerald-950/60 text-brand-700 dark:text-brand-300 font-semibold text-xs border border-brand-200 dark:border-emerald-800 uppercase tracking-wider mb-3 inline-block">
          Educational Resource Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-3">
          Typing Tips & In-Depth Guides
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Genuinely helpful, original educational articles written for learners who want to understand the science of muscle memory and type with effortless speed.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EDUCATIONAL_ARTICLES.map((article, idx) => (
          <article
            key={article.slug}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-500 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-600" />
                  <span>{article.readingTime}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.publishedDate}</span>
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition mb-2">
                <Link href={`/typing-tips/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                {article.summary}
              </p>
            </div>

            <Link
              href={`/typing-tips/${article.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform"
            >
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

