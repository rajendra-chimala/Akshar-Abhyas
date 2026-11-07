import React from "react";
import Image from "next/image";
import Link from "next/link";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { ShieldCheck, Heart, Sparkles, Zap, Award, CheckCircle2 } from "lucide-react";

export const metadata = generateSeoMetadata({
  title: "About Akshar Abhyas - Our Mission & Touch Typing Platform",
  description: "Learn about Akshar Abhyas (अक्षर अभ्यास). Our mission is to make touch typing education completely free, private, and accessible to everyone worldwide.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Brand Hero */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="w-16 h-16 rounded-2xl mx-auto overflow-hidden bg-brand-50 border border-brand-200 dark:bg-emerald-950/60 dark:border-emerald-800 flex items-center justify-center p-2 mb-4 shadow-sm">
          <Image
            src="/icon.png"
            alt="Akshar Abhyas Icon"
            width={54}
            height={54}
            className="object-contain"
          />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-3">
          About Akshar Abhyas
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          <strong className="text-brand-700 dark:text-brand-400">अक्षर अभ्यास</strong> translates to <em>"Letter Practice"</em> or <em>"Learning Every Letter."</em> We build distraction-free keyboard education tools for learners worldwide.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-emerald-950/50 text-brand-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            100% Client-Side Privacy
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            No registration, no accounts, no server databases, and no user tracking. Your practice history and preferences remain on your device.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            Completely Free Forever
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            No subscriptions, no paywalls, no locked lessons, and no annoying popups. Typing is an essential modern skill that should be accessible to all.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            Scientifically Grounded
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Designed around standard 10-finger spatial zones, home-row anchor fundamentals, and deliberate motor memory practice principles.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Our Philosophy
        </h2>
        <p>
          In a world where almost every professional, educational, and creative task requires a computer, typing remains the primary bottleneck between human imagination and digital reality. When typists must hunt for individual letters, their creative flow is continuously severed.
        </p>
        <p>
          Akshar Abhyas was created to eliminate this friction. By combining an intuitive on-screen virtual keyboard with color-coded finger zones, precision metric calculations, a structured 6-level curriculum, and gamified practice, we help typists of all ages reach fluent 60+ WPM touch typing.
        </p>
      </div>
    </div>
  );
}

