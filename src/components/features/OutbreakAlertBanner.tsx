"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import { AlertTriangle, ArrowRight, X, Bell, PhoneCall } from "lucide-react";

export function OutbreakAlertBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-red-950/95 via-[#130707] to-red-950/95 border-y border-red-500/40 px-4 py-2.5 text-xs shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="p-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 shrink-0 animate-pulse">
            <Bell className="w-4 h-4" />
          </span>
          <div className="text-slate-200">
            <strong className="text-red-400 font-bold uppercase tracking-wider text-[11px] mr-2">
              {isBn ? "🚨 জাতীয় মহামারি ও বালাই সতর্কতা:" : "🚨 Active BD Outbreak Alert:"}
            </strong>
            <span className="text-slate-300">
              {isBn
                ? "বোরো ধানে শীষ ব্লাস্ট ও খোলপচা এবং ডেইরি খামারে ল্যাম্পি স্কিন ডিজিজ (LSD) প্রাদুর্ভাবের বিরুদ্ধে সতর্কতা জারি।"
                : "Active Neck Blast in Boro Rice & Lumpy Skin Disease (LSD) outbreak reported in Eastern & Northern livestock clusters."}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-xs">
          <a
            href="tel:16123"
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-600/50 font-bold text-[11px] transition"
          >
            <PhoneCall className="w-3 h-3" />
            <span>১৬১২৩</span>
          </a>
          <Link
            href="/consult?priority=emergency"
            className="px-3.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] transition shadow-md shadow-red-950/60 hover:scale-105 active:scale-95"
          >
            {isBn ? "জরুরি পরামর্শ নিন →" : "Emergency Advisory →"}
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-1 ml-1"
            aria-label="Dismiss alert"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
