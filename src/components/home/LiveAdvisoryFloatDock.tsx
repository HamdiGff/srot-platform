"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  Sparkles,
  PhoneCall,
  ShieldCheck,
  ArrowRight,
  X,
  Stethoscope,
  ChevronUp,
} from "lucide-react";

interface LiveAdvisoryFloatDockProps {
  onOpenExpressTriage?: () => void;
}

export function LiveAdvisoryFloatDock({ onOpenExpressTriage }: LiveAdvisoryFloatDockProps) {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 300px
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  const scrollToHero = () => {
    if (onOpenExpressTriage) {
      onOpenExpressTriage();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Live Tele-health Dispatch Dock"
      className={`fixed bottom-4 inset-x-3 sm:inset-x-auto sm:right-6 z-40 max-w-xl transition-all duration-300 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto shadow-2xl"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="p-2.5 sm:p-3 rounded-2xl bg-[#070e18]/95 border border-emerald-500/40 shadow-2xl backdrop-blur-2xl text-slate-100 flex items-center justify-between gap-3 sm:gap-4 ring-1 ring-white/10">
        {/* Left: Active Specialist Status */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar stack */}
          <div className="flex -space-x-2 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Dr. Tanvir"
              className="w-7 h-7 rounded-full object-cover border-2 border-slate-900"
            />
            <img
              src="https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=100&q=80"
              alt="Dr. Mahfuz"
              className="w-7 h-7 rounded-full object-cover border-2 border-slate-900"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-black text-white truncate">
                {isBn ? "১৪২ জন ডাক্তার অন-ডিউটি" : "142 Specialists Online"}
              </span>
            </div>
            <p className="text-[10px] text-emerald-400 font-mono truncate">
              {isBn ? "গড় সাড়া ৩ মিনিট • BVC ও DAE অনুমোদিত" : "Wait time < 3 mins • BVC / DAE Verified"}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={scrollToHero}
            className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">{isBn ? "লাইভ ট্রায়াজ" : "Instant Triage"}</span>
            <span className="sm:hidden">{isBn ? "পরামর্শ" : "Triage"}</span>
          </button>

          <a
            href="tel:16123"
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-white/[0.08] transition"
            title={isBn ? "কৃষি কল সেন্টার ১৬১২৩" : "Krishi Hotline 16123"}
            aria-label="Call Krishi Hotline 16123"
          >
            <PhoneCall className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition"
            aria-label="Dismiss float dock"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
