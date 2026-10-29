"use client";

import React from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";

interface SrotLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function SrotLogo({ className = "", size = "md", showTagline = true }: SrotLogoProps) {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const titleSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group select-none transition-transform duration-200 active:scale-[0.98] ${className}`}
      aria-label="SROT Digital Health Platform"
    >
      {/* Precision Agritech & Veterinary Vector Mark */}
      <div className={`relative ${iconSizes[size]} shrink-0`}>
        {/* Ambient Emerald-Cyan Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-xl blur-[5px] opacity-50 group-hover:opacity-90 transition-opacity duration-300" />

        <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#0e1724] to-[#070c14] border border-emerald-400/30 p-2 flex items-center justify-center shadow-md group-hover:border-emerald-400/60 transition-colors">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Agritech Leaf Core */}
            <path
              d="M7 23C7 16.5 12.5 11 19 11C19 17.5 13.5 23 7 23Z"
              fill="url(#srot-leaf-fill)"
            />
            {/* Diagnostic Pulse Arc */}
            <path
              d="M13 7C16.31 7 19 9.69 19 13C19 16.31 16.31 19 13 19"
              stroke="#38bdf8"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="2.5 2.5"
            />
            {/* Center Vitality Point */}
            <circle cx="15" cy="15" r="2.2" fill="#34d399" />
            {/* Sprouting Axis */}
            <path
              d="M8 23L23 8"
              stroke="url(#srot-axis-grad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Clinical Cross */}
            <path
              d="M21 16V22M18 19H24"
              stroke="#06b6d4"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="srot-leaf-fill" x1="7" y1="11" x2="19" y2="23" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34d399" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="srot-axis-grad" x1="8" y1="23" x2="23" y2="8" gradientUnits="userSpaceOnUse">
                <stop stopColor="#059669" />
                <stop offset="0.5" stopColor="#10b981" />
                <stop offset="1" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Typography & Status Pill */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span
            className={`${titleSizes[size]} font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5`}
          >
            <span>{isBn ? "স্রোত" : "SROT"}</span>
            <span className="text-emerald-400 text-xs font-semibold tracking-normal hidden sm:inline">
              {isBn ? "প্ল্যাটফর্ম" : "Platform"}
            </span>
          </span>

          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>BD</span>
          </span>
        </div>

        {showTagline && (
          <p className="text-[11px] text-slate-400 font-medium tracking-wide">
            {isBn ? "ডিজিটাল কৃষি ও প্রাণিসম্পদ স্বাস্থ্য" : "Agri & Animal Health Network"}
          </p>
        )}
      </div>
    </Link>
  );
}
