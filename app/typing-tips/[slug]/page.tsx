import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, EDUCATIONAL_ARTICLES } from "@/data/articles";
import { generateBreadcrumbSchema, generateSeoMetadata } from "@/lib/seo/metadata";
import { ArrowLeft, Clock, Calendar, CheckCircle2, HelpCircle, ArrowRight, BookOpen } from "lucide-react";
import { Metadata } from "next";

export async function generateStaticParams() {
  return EDUCATIONAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return { title: "Article Not Found" };
  }
  return generateSeoMetadata({
    title: article.title,
    description: article.summary,
    path: `/typing-tips/${article.slug}`,
  });
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Typing Tips", item: "/typing-tips" },
    { name: article.title, item: `/typing-tips/${article.slug}` },
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedDate,
    author: {
      "@type": "Organization",
      name: "Akshar Abhyas Editorial Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Akshar Abhyas",
      logo: {
        "@type": "ImageObject",
        url: "https://aksharabhyas.com/logo.png",
      },
    },
  };

  return (
    <article className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/typing-tips"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-8">
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

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
          {article.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {article.subtitle}
        </p>
      </header>

      {/* Quick Summary Box */}
      <div className="p-5 bg-brand-50/80 dark:bg-emerald-950/40 border border-brand-200 dark:border-emerald-800 rounded-2xl mb-8 text-sm text-brand-900 dark:text-brand-200 leading-relaxed">
        <strong className="block font-bold mb-1">Key Takeaway:</strong>
        {article.summary}
      </div>

      {/* Article Content Sections */}
      <div className="space-y-8 text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
        {article.sections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {section.heading}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {section.content}
            </p>

            {section.keyPoints && (
              <ul className="space-y-2 mt-3 pl-2">
                {section.keyPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 mt-0.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {/* FAQs if present */}
        {article.faqs.length > 0 && (
          <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {article.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-600" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Call to Action Footer */}
      <div className="mt-12 p-6 bg-slate-900 text-white rounded-3xl text-center space-y-4">
        <h3 className="text-xl font-bold">Put This Technique Into Practice</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Start typing practice now or benchmark your speed with our free 60-second test.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/typing-test"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow"
          >
            Take 60s Typing Test
          </Link>
          <Link
            href="/typing-lessons"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700"
          >
            Browse Lessons
          </Link>
        </div>
      </div>
    </article>
  );
}

