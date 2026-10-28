"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ShieldAlert, ArrowRight, X, Bell } from "lucide-react";

export function OutbreakAlertBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-r from-red-950/90 via-slate-950 to-red-950/90 border-y border-red-500/30 px-4 py-2.5 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="p-1 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 shrink-0 animate-pulse">
            <Bell className="w-4 h-4" />
          </span>
          <div className="text-slate-200">
            <strong className="text-red-400 font-bold uppercase tracking-wider text-[11px] mr-2">
              🚨 Active Disease & Pest Outbreak Alert:
            </strong>
            <span className="text-slate-300">
              Lumpy Skin Disease (LSD) reported in Eastern livestock cluster & Fall Armyworm in late vegetative maize.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-xs">
          <Link
            href="/consult?priority=emergency"
            className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] transition shadow-md shadow-red-950/60"
          >
            Emergency Advisory &rarr;
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white p-1"
            aria-label="Dismiss alert"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
