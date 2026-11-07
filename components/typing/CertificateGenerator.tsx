"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, Printer, ShieldCheck, Sparkles } from "lucide-react";

interface CertificateGeneratorProps {
  initialWpm?: number;
  initialAccuracy?: number;
  initialRating?: string;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  initialWpm = 65,
  initialAccuracy = 98,
  initialRating = "Advanced",
}) => {
  const [studentName, setStudentName] = useState("Touch Typing Learner");
  const [wpm, setWpm] = useState(initialWpm);
  const [accuracy, setAccuracy] = useState(initialAccuracy);
  const [rating, setRating] = useState(initialRating);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const certId = `AA-${Math.abs(
    (studentName.length * 37 + wpm * 19 + accuracy * 7) % 99999
  )
    .toString()
    .padStart(5, "0")}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Controls Bar (hidden during print) */}
      <div className="print:hidden w-full max-w-4xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Recipient Name:
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Enter your name"
          />
        </div>

        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* The Printable Certificate Container */}
      <div
        id="certificate-print-area"
        className="w-full max-w-4xl aspect-[1.414/1] bg-[#FCFDF9] text-slate-900 p-8 sm:p-12 rounded-3xl border-8 border-double border-brand-800 shadow-2xl relative flex flex-col justify-between overflow-hidden"
      >
        {/* Subtle Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Image
            src="/icon.png"
            alt="Watermark"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Outer Corner Ornaments */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-brand-700" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-brand-700" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-brand-700" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-brand-700" />

        {/* Certificate Header */}
        <div className="text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-8 h-8 text-amber-600" />
            <span className="font-extrabold text-2xl tracking-wider text-brand-900 uppercase">
              Akshar Abhyas
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-wide text-slate-900 uppercase mb-1">
            Certificate of Achievement
          </h1>
          <p className="text-xs uppercase tracking-widest text-brand-800 font-bold">
            Touch Typing Proficiency Recognition
          </p>
        </div>

        {/* Main Body */}
        <div className="text-center my-4 relative z-10">
          <p className="text-sm text-slate-600 italic mb-2">
            This self-practice certificate certifies that
          </p>
          <div className="text-3xl sm:text-5xl font-serif font-extrabold text-brand-900 border-b-2 border-brand-600 pb-2 inline-block px-8 max-w-full truncate">
            {studentName || "Distinguished Typist"}
          </div>
          <p className="text-sm text-slate-600 mt-3 max-w-xl mx-auto leading-relaxed">
            has demonstrated commendable keyboard touch typing proficiency, speed, and accuracy on the Akshar Abhyas practice platform.
          </p>
        </div>

        {/* Metrics Badges */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto my-3 text-center relative z-10">
          <div className="p-3 bg-white/80 border border-brand-200 rounded-xl shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">
              Speed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-brand-700">
              {wpm} WPM
            </span>
          </div>

          <div className="p-3 bg-white/80 border border-brand-200 rounded-xl shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">
              Accuracy
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
              {accuracy}%
            </span>
          </div>

          <div className="p-3 bg-white/80 border border-brand-200 rounded-xl shadow-sm">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">
              Rating
            </span>
            <span className="text-lg sm:text-xl font-extrabold font-sans text-amber-700">
              {rating}
            </span>
          </div>
        </div>

        {/* Signatures & Seal Footer */}
        <div className="flex items-end justify-between pt-4 border-t border-slate-200 text-xs text-slate-600 relative z-10">
          <div className="text-left space-y-1">
            <p className="font-semibold text-slate-800">Issue Date: {currentDate}</p>
            <p className="font-mono text-[11px] text-slate-500">Certificate ID: {certId}</p>
            <p className="text-[10px] text-slate-400">
              * Self-generated online practice certificate
            </p>
          </div>

          {/* Golden Seal */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 border-2 border-amber-500 shadow-md flex flex-col items-center justify-center text-amber-950 font-bold text-[9px] uppercase tracking-tighter text-center leading-none p-1">
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span>Official</span>
            <span>Practice</span>
            <span>Mastery</span>
          </div>

          <div className="text-right space-y-1">
            <div className="font-serif italic text-base text-brand-900 font-bold">
              Akshar Abhyas
            </div>
            <p className="border-t border-slate-400 pt-1 text-[11px] text-slate-700 font-medium">
              Verified Platform Engine
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
