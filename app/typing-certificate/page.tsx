"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CertificateGenerator } from "@/components/typing/CertificateGenerator";
import { Award, ShieldAlert } from "lucide-react";

function CertificateContent() {
  const searchParams = useSearchParams();
  const wpm = parseInt(searchParams?.get("wpm") || "65", 10);
  const acc = parseFloat(searchParams?.get("acc") || "98");
  const rating = searchParams?.get("rating") || "Proficient";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Disclaimer Alert */}
      <div className="print:hidden mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <span className="font-bold block">Self-Generated Practice Certificate Notice:</span>
          This certificate is generated locally based on your real browser test scores. It serves as personal motivation and a milestone record of your touch-typing progress, not an accredited third-party qualification.
        </div>
      </div>

      <CertificateGenerator
        initialWpm={wpm}
        initialAccuracy={acc}
        initialRating={rating}
      />
    </div>
  );
}

export default function TypingCertificatePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted-foreground">Loading certificate...</div>}>
      <CertificateContent />
    </Suspense>
  );
}
