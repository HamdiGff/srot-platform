"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import { useOutbreakStore } from "@/lib/store/outbreakStore";
import { AlertCircle, ArrowRight, X, Radio } from "lucide-react";

export function OutbreakAlertBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const { outbreaks } = useOutbreakStore();

  const currentOutbreak = outbreaks[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible || !currentOutbreak) return null;

  return (
    <div
      role="alert"
      className={`w-full bg-gradient-to-r from-red-950/80 via-[#180a0e] to-red-950/80 border-b border-red-500/30 px-4 text-xs transition-all duration-300 ease-in-out overflow-hidden ${
        isScrolled
          ? "max-h-0 opacity-0 py-0 border-b-0 -translate-y-2 pointer-events-none"
          : "max-h-16 opacity-100 py-2 translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Reactive Outbreak Advisory Text */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 truncate text-[11px] sm:text-xs">
            <span className="font-bold text-red-300 uppercase tracking-wider shrink-0 flex items-center gap-1 font-mono">
              <Radio className="w-3 h-3 text-red-400" />
              <span>[{currentOutbreak.division.toUpperCase()}] {currentOutbreak.severity}:</span>
            </span>
            <span className="text-slate-200 font-medium truncate">
              {isBn ? currentOutbreak.headlineBn || currentOutbreak.disease : currentOutbreak.headlineEn || currentOutbreak.disease}
            </span>
          </div>
        </div>

        {/* Right: Clean Single CTA & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/consult?priority=emergency&category=${
              currentOutbreak.target.toLowerCase().includes("rice") || currentOutbreak.target.toLowerCase().includes("crop")
                ? "agri"
                : "veterinary"
            }`}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-red-300 hover:text-white transition group px-2.5 py-0.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 font-mono"
          >
            <span>{isBn ? "প্রটোকল ও ডাক্তার চেম্বার" : "Advisory Protocol"}</span>
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
