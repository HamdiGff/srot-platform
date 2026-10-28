"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import { AlertCircle, ArrowRight, X } from "lucide-react";

export function OutbreakAlertBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      className="w-full bg-gradient-to-r from-red-950/60 via-[#160a0d] to-red-950/60 border-b border-red-500/25 px-4 py-2 text-xs transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Outbreak Advisory Text */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 truncate text-[11px] sm:text-xs">
            <span className="font-bold text-red-300 uppercase tracking-wider shrink-0">
              {isBn ? "সতর্কতা বার্তা:" : "Active Outbreak Alert:"}
            </span>
            <span className="text-slate-300 truncate">
              {isBn
                ? "বোরো ধানে শীষ ব্লাস্ট ও খোলপচা এবং ডেইরিতে লাম্পি স্কিন ডিজিজ (LSD) প্রাদুর্ভাব সংক্রান্ত জরুরি নির্দেশনা।"
                : "Neck Blast in Boro Rice & Lumpy Skin Disease (LSD) in cattle reported in active agricultural clusters."}
            </span>
          </div>
        </div>

        {/* Right: Clean Single CTA & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/consult?priority=emergency"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-300 hover:text-white transition group px-2 py-0.5 rounded-md hover:bg-red-500/10"
          >
            <span>{isBn ? "প্রতিরোধ গাইড" : "Advisory Protocol"}</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-slate-400 hover:text-white transition rounded-md hover:bg-white/[0.05]"
            aria-label="Dismiss alert"
            title={isBn ? "সতর্কতা বন্ধ করুন" : "Dismiss"}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
