import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Sparkles, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-flex items-center group">
            <div className="relative flex items-center dark:bg-white/95 dark:px-3 dark:py-1.5 dark:rounded-xl transition-transform group-hover:scale-[1.02]">
              <Image
                src="/logo.png"
                alt="Akshar Abhyas - अक्षर अभ्यास"
                width={190}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </div>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            A free, distraction-free online touch typing tutor, speed test, and typing games platform. Designed to help absolute beginners become confident touch typists.
          </p>
          <div className="flex items-center gap-2 text-xs text-brand-700 dark:text-brand-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>100% Client-Side • No Account Required • Zero Trackers</span>
          </div>
        </div>

        {/* Tools Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Typing Tools
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/typing-test" className="hover:text-brand-600 transition">
                Typing Speed Test
              </Link>
            </li>
            <li>
              <Link href="/typing-practice" className="hover:text-brand-600 transition">
                Free Typing Practice
              </Link>
            </li>
            <li>
              <Link href="/keyboard-test" className="hover:text-brand-600 transition">
                Interactive Keyboard Tester
              </Link>
            </li>
            <li>
              <Link href="/typing-certificate" className="hover:text-brand-600 transition">
                Typing Certificate Generator
              </Link>
            </li>
            <li>
              <Link href="/progress" className="hover:text-brand-600 transition">
                User Progress & Analytics
              </Link>
            </li>
          </ul>
        </div>

        {/* Curriculum Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Curriculum & Games
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/typing-lessons" className="hover:text-brand-600 transition">
                All 6 Learning Levels
              </Link>
            </li>
            <li>
              <Link href="/typing-games" className="hover:text-brand-600 transition">
                All Typing Games
              </Link>
            </li>
            <li>
              <Link href="/typing-games/word-rain" className="hover:text-brand-600 transition">
                Word Rain
              </Link>
            </li>
            <li>
              <Link href="/typing-games/speed-challenge" className="hover:text-brand-600 transition">
                Speed Challenge (60s)
              </Link>
            </li>
            <li>
              <Link href="/typing-games/text-survival" className="hover:text-brand-600 transition">
                Text Survival
              </Link>
            </li>
          </ul>
        </div>

        {/* Learn & About Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Guides & Legal
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/blog" className="hover:text-brand-600 transition font-medium text-brand-700 dark:text-brand-300">
                Typing Blog & Benchmarks
              </Link>
            </li>
            <li>
              <Link href="/touch-typing" className="hover:text-brand-600 transition">
                Touch Typing Master Guide
              </Link>
            </li>
            <li>
              <Link href="/learn-keyboard-typing" className="hover:text-brand-600 transition">
                Keyboard Typing Guide
              </Link>
            </li>
            <li>
              <Link href="/typing-tips" className="hover:text-brand-600 transition">
                Typing Tips & 10 Articles
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-600 transition">
                About the Platform
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-brand-600 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-600 transition">
                Contact & Feedback
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>
          © {new Date().getFullYear()} Akshar Abhyas (अक्षर अभ्यास). All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          <span>Crafted for learners worldwide</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </div>
      </div>
    </footer>
  );
};

