import React from "react";
import Link from "next/link";

interface SrotLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function SrotLogo({ className = "", size = "md", showTagline = true }: SrotLogoProps) {
  const iconSize = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10";
  const titleSize = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      {/* High-Tech Vector Logo Emblem */}
      <div className={`relative ${iconSize} shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-xl blur-[5px] opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-[#0c1622] to-[#060b12] border border-emerald-500/40 p-2 flex items-center justify-center shadow-lg shadow-emerald-950/40 group-hover:scale-105 transition-transform duration-200">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Agritech Sprouting Leaf (Left) */}
            <path
              d="M8 24C8 17.3726 13.3726 12 20 12C20 18.6274 14.6274 24 8 24Z"
              fill="url(#srot-leaf-grad)"
            />
            {/* Veterinary Cross / Pulse Heart Shield (Right) */}
            <path
              d="M14 6C17.3137 6 20 8.68629 20 12C20 15.3137 17.3137 18 14 18C10.6863 18 8 15.3137 8 12C8 8.68629 10.6863 6 14 6Z"
              stroke="#06b6d4"
              strokeWidth="1.8"
              strokeDasharray="2 2"
            />
            {/* Center Growth Core */}
            <circle cx="15" cy="15" r="2.5" fill="#34d399" />
            <path
              d="M8 24L24 8"
              stroke="url(#srot-stem-grad)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Micro Cross indicator for veterinary */}
            <path
              d="M22 17V23M19 20H25"
              stroke="#38bdf8"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="srot-leaf-grad" x1="8" y1="12" x2="20" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34d399" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="srot-stem-grad" x1="8" y1="24" x2="24" y2="8" gradientUnits="userSpaceOnUse">
                <stop stopColor="#059669" />
                <stop offset="0.5" stopColor="#10b981" />
                <stop offset="1" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Typography */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className={`${titleSize} font-black tracking-tight text-white font-sans`}>
            SROT
          </span>
          <span className="text-[10px] uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            Platform
          </span>
        </div>
        {showTagline && (
          <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase font-mono -mt-0.5">
            Agri & Animal Health
          </p>
        )}
      </div>
    </Link>
  );
}
