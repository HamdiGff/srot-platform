"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  Wheat,
  Activity,
  HeartPulse,
  ShieldCheck,
  CheckCircle2,
  Scan,
  AlertCircle,
  FileText,
  Sparkles,
} from "lucide-react";

export function HeroVisualGraphic() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const [activeTab, setActiveTab] = useState<"agri" | "herd" | "pet">("agri");

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#081119] to-slate-950/95 border border-emerald-500/30 p-5 sm:p-6 shadow-2xl backdrop-blur-xl overflow-hidden group hover-glow-emerald">
      {/* Subtle Background Glow Rings */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Header with Mode Switcher & Real-time Telemetry Pulse */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Scan className="w-4 h-4 animate-pulse" />
          </span>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
              {isBn ? "মাল্টি-স্পেকট্রাল টেলি-ডায়াগনস্টিক ডেস্ক" : "Multi-Spectral Tele-Diagnostic Desk"}
            </span>
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{isBn ? "এসআরওটি এআই ইঞ্জিন ৩.৪ (বাংলাদেশ)" : "SROT AI Tele-Health v3.4 BD"}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </span>
          </div>
        </div>

        {/* Sector mini-toggle inside graphic */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/60 text-[11px] font-bold">
          <button
            onClick={() => setActiveTab("agri")}
            className={`px-2.5 py-1 rounded-lg transition ${
              activeTab === "agri"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {isBn ? "ধানের পাতা" : "Crop Leaf"}
          </button>
          <button
            onClick={() => setActiveTab("herd")}
            className={`px-2.5 py-1 rounded-lg transition ${
              activeTab === "herd"
                ? "bg-cyan-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {isBn ? "ডেইরি গরু" : "Bovine Herd"}
          </button>
          <button
            onClick={() => setActiveTab("pet")}
            className={`px-2.5 py-1 rounded-lg transition ${
              activeTab === "pet"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {isBn ? "পোষা প্রাণী" : "Companion Pet"}
          </button>
        </div>
      </div>

      {/* Dynamic Graphic Display based on Sector */}
      <div className="py-4">
        {activeTab === "agri" && (
          <div className="space-y-4">
            {/* Simulated Multi-spectral leaf scanner display */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#071612] via-[#0b1c18] to-slate-900 p-4 border border-emerald-500/30 overflow-hidden">
              {/* Laser scanning beam */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-scan-laser pointer-events-none" />

              <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 pb-2 border-b border-emerald-500/20">
                <span className="flex items-center gap-1.5">
                  <Wheat className="w-3.5 h-3.5" />
                  {isBn ? "স্পেকট্রাল ব্যান্ড: বিআরআরআই ধান-২৮ • এনডিভিআই ০.৭২" : "SPECTRAL BAND: BRRI 28 • NDVI 0.72 | 840nm"}
                </span>
                <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-[10px] font-bold border border-red-500/30">
                  {isBn ? "ব্লাস্ট আক্রান্ত" : "BLAST DETECTED"}
                </span>
              </div>

              {/* Vector Diagnostic Graphic */}
              <div className="relative h-36 w-full flex items-center justify-center my-2">
                <svg
                  viewBox="0 0 360 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  {/* Grid Lines */}
                  <line x1="20" y1="20" x2="340" y2="20" stroke="#064e3b" strokeDasharray="4 4" strokeWidth="0.8" />
                  <line x1="20" y1="70" x2="340" y2="70" stroke="#064e3b" strokeDasharray="4 4" strokeWidth="0.8" />
                  <line x1="20" y1="120" x2="340" y2="120" stroke="#064e3b" strokeDasharray="4 4" strokeWidth="0.8" />
                  <line x1="90" y1="10" x2="90" y2="130" stroke="#064e3b" strokeDasharray="4 4" strokeWidth="0.8" />
                  <line x1="180" y1="10" x2="180" y2="130" stroke="#064e3b" strokeDasharray="4 4" strokeWidth="0.8" />
                  <line x1="270" y1="10" x2="270" y2="130" stroke="#064e3b" strokeDasharray="4 4" strokeWidth="0.8" />

                  {/* Stylized Rice Leaf Contour */}
                  <path
                    d="M30 110 C90 100, 160 50, 320 20 C240 70, 130 110, 30 110 Z"
                    fill="url(#leaf-spectral-grad)"
                    stroke="#10b981"
                    strokeWidth="1.5"
                  />
                  {/* Midrib vein */}
                  <path
                    d="M30 110 C140 75, 230 45, 320 20"
                    stroke="#059669"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                  />

                  {/* Fungal Lesion Spot with Pinpoint Reticle */}
                  <ellipse cx="175" cy="65" rx="16" ry="8" fill="#7f1d1d" fillOpacity="0.8" stroke="#ef4444" strokeWidth="1.5" />
                  <ellipse cx="175" cy="65" rx="7" ry="3.5" fill="#f87171" />

                  {/* Bounding Reticle Target */}
                  <rect x="150" y="45" width="50" height="40" rx="4" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" />
                  {/* Corner accents */}
                  <path d="M148 48 V43 H153" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M197 43 H202 V48" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M148 82 V87 H153" stroke="#38bdf8" strokeWidth="2" />
                  <path d="M197 87 H202 V82" stroke="#38bdf8" strokeWidth="2" />

                  {/* Label Callout */}
                  <line x1="202" y1="55" x2="245" y2="35" stroke="#38bdf8" strokeWidth="1" />
                  <rect x="245" y="24" width="98" height="22" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.8" />
                  <text x="250" y="38" fill="#38bdf8" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                    Pyricularia oryzae (98.4%)
                  </text>

                  <defs>
                    <linearGradient id="leaf-spectral-grad" x1="30" y1="110" x2="320" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#047857" />
                      <stop offset="0.5" stopColor="#10b981" />
                      <stop offset="0.75" stopColor="#ca8a04" />
                      <stop offset="1" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Pathology Metric Pills */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-500/20 text-[10px]">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block font-mono">{isBn ? "রোগ নির্ণয়" : "INCIDENCE"}</span>
                  <span className="font-bold text-red-400">{isBn ? "পাতার ব্লাস্ট দাগ" : "Leaf Blast Lesions"}</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block font-mono">{isBn ? "নিশ্চয়তা" : "CONFIDENCE"}</span>
                  <span className="font-bold text-emerald-400">৯৮.৪% এআই ম্যাচ</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block font-mono">{isBn ? "প্রেসক্রিপশন" : "REC. SPRAY"}</span>
                  <span className="font-bold text-cyan-300">ট্রাইসাইক্লাজল ৭৫ ডব্লিউপি</span>
                </div>
              </div>
            </div>

            {/* Prescribing Doctor Stamp */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{isBn ? "যাচাইকৃত প্রধান উদ্ভিদ রোগতত্ত্ববিদ" : "Verified Plant Pathologist"}</span>
                  <span className="font-bold text-white">{isBn ? "ড. তরিকুল ইসলাম • BRRI/BARC-AGRI-109" : "Dr. Tariqul Islam, Ph.D. • BRRI-109"}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                {isBn ? "প্রেসক্রিপশন প্রস্তুত" : "Official Rx Issued"}
              </span>
            </div>
          </div>
        )}

        {activeTab === "herd" && (
          <div className="space-y-4">
            {/* Bovine Herd Telemetry Display */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#081824] via-[#091f2e] to-slate-900 p-4 border border-cyan-500/30 overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 pb-2 border-b border-cyan-500/20">
                <span className="flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5" />
                  {isBn ? "গাভীর ভাইটালস: ফ্রিজিয়ান ক্রস HF-৮০২ (ময়মনসিংহ ক্লাস্টার)" : "BOVINE VITALS: HOLSTEIN-DESHI HF-802 BD"}
                </span>
                <span className="bg-cyan-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                  {isBn ? "টেলি-ভেটেরিনারি মনিটর" : "TELE-VET MONITOR"}
                </span>
              </div>

              {/* Herd Vitals Graphic Curve */}
              <div className="relative h-36 w-full flex items-center justify-center my-2">
                <svg
                  viewBox="0 0 360 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <line x1="20" y1="20" x2="340" y2="20" stroke="#083344" strokeDasharray="4 4" strokeWidth="0.8" />
                  <line x1="20" y1="70" x2="340" y2="70" stroke="#083344" strokeDasharray="4 4" strokeWidth="0.8" />
                  <line x1="20" y1="120" x2="340" y2="120" stroke="#083344" strokeDasharray="4 4" strokeWidth="0.8" />

                  {/* Rumination & Temperature Telemetry Line */}
                  <path
                    d="M20 90 Q 50 85, 80 88 T 140 70 T 200 45 T 260 55 T 320 60"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                  {/* Rumination Rhythm wave */}
                  <path
                    d="M20 90 L 40 90 L 45 75 L 50 105 L 55 90 L 80 88 L 85 70 L 90 110 L 95 88 L 140 70 L 145 50 L 150 90 L 155 70 L 200 45 L 205 25 L 210 65 L 215 45 L 260 55 L 265 40 L 270 70 L 275 55 L 340 60"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                  />

                  {/* High Somatic Cell Count Alert Point */}
                  <circle cx="205" cy="25" r="5" fill="#ef4444" className="animate-ping" />
                  <circle cx="205" cy="25" r="3.5" fill="#ef4444" />
                  <line x1="205" y1="25" x2="235" y2="15" stroke="#ef4444" strokeWidth="1" />
                  <rect x="235" y="5" width="115" height="22" rx="4" fill="#0f172a" stroke="#ef4444" strokeWidth="0.8" />
                  <text x="240" y="19" fill="#f87171" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                    SCC 650K (ম্যাস্টাইটিস +)
                  </text>
                </svg>
              </div>

              {/* Vitals Cards */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-cyan-500/20 text-[10px]">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block font-mono">{isBn ? "শরীরের তাপমাত্রা" : "RECTAL TEMP"}</span>
                  <span className="font-bold text-amber-400">৩৯.৪°C (জ্বর)</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block font-mono">{isBn ? "জাবর কাটা" : "RUMINATION"}</span>
                  <span className="font-bold text-red-400">৩২০ মিনিট (-৩৫%)</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block font-mono">{isBn ? "দুধ বর্জন (Withhold)" : "MILK WITHHOLD"}</span>
                  <span className="font-bold text-cyan-300">৭২ ঘণ্টা কঠোর নিয়ম</span>
                </div>
              </div>
            </div>

            {/* Surgeon Review */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{isBn ? "বাংলাদেশ ভেটেরিনারি কাউন্সিল (BVC) নিবন্ধিত" : "Veterinary Council Accredited"}</span>
                  <span className="font-bold text-white">{isBn ? "ডা. অনন্যা সেন, ডিভিএম • BVC-VET-BD-2024" : "Dr. Ananya Sen, D.V.M. • BVC-BD-2024"}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/25">
                {isBn ? "ইন্ট্রাম্যামারি ইনফিউশন" : "Intramammary Infusion"}
              </span>
            </div>
          </div>
        )}

        {activeTab === "pet" && (
          <div className="space-y-4">
            {/* Pet Tele-Vet Display */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#1c1208] via-[#24170a] to-slate-900 p-4 border border-amber-500/30 overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 pb-2 border-b border-amber-500/20">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  {isBn ? "পোষা কুকুর: গোল্ডেন রিট্রিভার (৩১.৫ কেজি • ঢাকা)" : "COMPANION CANINE: DHAKA (31.5 KG)"}
                </span>
                <span className="bg-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                  {isBn ? "চর্মরোগ ট্রায়াজ" : "DERMATOLOGY TRIAGE"}
                </span>
              </div>

              {/* Pet Dermatology Curve */}
              <div className="relative h-36 w-full flex items-center justify-center my-2">
                <svg
                  viewBox="0 0 360 140"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <line x1="20" y1="20" x2="340" y2="20" stroke="#451a03" strokeDasharray="4 4" strokeWidth="0.8" />
                  <line x1="20" y1="70" x2="340" y2="70" stroke="#451a03" strokeDasharray="4 4" strokeWidth="0.8" />
                  <line x1="20" y1="120" x2="340" y2="120" stroke="#451a03" strokeDasharray="4 4" strokeWidth="0.8" />

                  {/* Pruritus score waveform */}
                  <path
                    d="M20 70 C60 70, 80 40, 120 40 C160 40, 180 90, 220 90 C260 90, 280 30, 340 30"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />
                  <circle cx="280" cy="30" r="4" fill="#f59e0b" />
                  <rect x="210" y="8" width="130" height="20" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="0.8" />
                  <text x="215" y="21" fill="#fbbf24" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                    {isBn ? "চুলকানি স্কোর: ৮.৫/১০" : "Pruritus Score: 8.5/10"}
                  </text>
                </svg>
              </div>

              {/* Pet Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-amber-500/20 text-[10px]">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block font-mono">{isBn ? "সমস্যা" : "DIAGNOSIS"}</span>
                  <span className="font-bold text-amber-300">{isBn ? "এটোপিক ডার্মাটাইটিস" : "Atopic Dermatitis"}</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block font-mono">{isBn ? "ওজনভিত্তিক ডোজ" : "WEIGHT TITRATED"}</span>
                  <span className="font-bold text-emerald-400">১৬ মিগ্রা দিনে ২ বার</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block font-mono">{isBn ? "ওষুধ" : "FORMULATION"}</span>
                  <span className="font-bold text-cyan-300">ওকলাসিটিনিব ওরাল</span>
                </div>
              </div>
            </div>

            {/* Small animal vet */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] text-slate-400 block">{isBn ? "ছোট প্রাণী ও পোষা জীব চিকিৎসক" : "Small Animal Clinician"}</span>
                  <span className="font-bold text-white">{isBn ? "ডা. ফারহানা হক, ডিভিএম • BVC-9912" : "Dr. Farhana Haque, D.V.M. • BVC-9912"}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/25">
                {isBn ? "অ্যালার্জি প্ল্যান সক্রিয়" : "Allergy Plan Active"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer with Live Prescription Link */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isBn ? "কিউআর ভেরিফাইড অফিসিয়াল ডিজিটাল এ৪ প্রেসক্রিপশন" : "Legally Verifiable Digital PDF Rx with QR Checksum"}</span>
        </div>
        <Link
          href={`/consult/${activeTab === "agri" ? "consult-agri-101" : activeTab === "herd" ? "consult-vet-202" : "consult-pet-303"}`}
          className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          <span>{isBn ? "লাইভ চেম্বার দেখুন" : "Examine Case Room"}</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
