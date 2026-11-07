import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogPostBySlug, BLOG_POSTS, BlogPost } from "@/data/blog";
import { generateBreadcrumbSchema, generateSeoMetadata } from "@/lib/seo/metadata";
import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Share2,
  Sparkles,
  Zap,
  Tag,
  UserCheck,
} from "lucide-react";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  return generateSeoMetadata({
    title: `${post.title} | Akshar Abhyas Blog`,
    description: post.summary,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

export default function BlogPostDetailPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${post.slug}` },
  ]);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Akshar Abhyas",
      logo: {
        "@type": "ImageObject",
        url: "https://aksharabhyas.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aksharabhyas.com/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Find related posts in the same category or adjacent
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-brand-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
            {post.category}
          </span>
        </div>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
            {post.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1.5 font-sans font-semibold text-slate-800 dark:text-slate-200">
              <UserCheck className="w-4 h-4 text-brand-600" />
              <span>{post.author}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Published: {post.publishedDate}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-600" />
              <span>{post.readingTime}</span>
            </span>
          </div>
        </header>

        {/* Quick Summary Callout */}
        <div className="p-6 rounded-2xl bg-brand-50/80 dark:bg-emerald-950/40 border border-brand-200 dark:border-emerald-800 mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Article Overview & Key Takeaway</span>
          </h2>
          <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* Table of Contents */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 block mb-3">
            In this guide:
          </span>
          <nav className="space-y-1.5 text-sm">
            {post.sections.map((section, idx) => (
              <a
                key={idx}
                href={`#section-${idx}`}
                className="block text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition"
              >
                {section.heading}
              </a>
            ))}
            {post.faqs.length > 0 && (
              <a
                href="#frequently-asked-questions"
                className="block text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition"
              >
                Frequently Asked Questions
              </a>
            )}
          </nav>
        </div>

        {/* Article Body Sections */}
        <div className="space-y-12 mb-16">
          {post.sections.map((section, idx) => (
            <section
              key={idx}
              id={`section-${idx}`}
              className="scroll-mt-24 space-y-4"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                {section.heading}
              </h2>

              <div className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                {section.content}
              </div>

              {/* Callout box if present */}
              {section.callout && (
                <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-amber-900 dark:text-amber-200 text-sm leading-relaxed my-4">
                  {section.callout}
                </div>
              )}

              {/* Key points if present */}
              {section.keyPoints && section.keyPoints.length > 0 && (
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 mt-4 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 block mb-2">
                    Key Takeaways:
                  </span>
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {section.keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Related Tool Interactive CTA */}
        {post.relatedTool && (
          <div className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-brand-600 to-emerald-700 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-brand-200 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Recommended Interactive Tool</span>
              </span>
              <h3 className="text-2xl font-black">{post.relatedTool.name}</h3>
              <p className="text-sm text-brand-100 max-w-lg leading-relaxed">
                {post.relatedTool.description}
              </p>
            </div>
            <Link
              href={post.relatedTool.href}
              className="px-6 py-3.5 rounded-xl bg-white text-brand-700 font-extrabold text-sm shadow-md hover:bg-brand-50 transition active:scale-95 flex-shrink-0"
            >
              {post.relatedTool.cta}
            </Link>
          </div>
        )}

        {/* FAQ Section with Rich Snippet Structure */}
        {post.faqs.length > 0 && (
          <section id="frequently-asked-questions" className="scroll-mt-24 mb-16">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-brand-600" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tags / Keywords */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200 dark:border-slate-800 mb-12">
          <Tag className="w-4 h-4 text-slate-400 mr-1" />
          <span className="text-xs text-muted-foreground font-semibold mr-2">Topics:</span>
          {post.keywords.map((kw, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono"
            >
              #{kw}
            </span>
          ))}
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Related Articles & Benchmarks
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.slug}
                  href={`/blog/${rPost.slug}`}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold text-brand-600 block mb-1">
                      {rPost.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition line-clamp-2 mb-2">
                      {rPost.title}
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <Clock className="w-3 h-3 text-brand-600" />
                    <span>{rPost.readingTime}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

