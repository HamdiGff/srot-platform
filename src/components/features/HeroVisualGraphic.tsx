"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  Wheat,
  Milk,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Scan,
  AlertTriangle,
  FileText,
  Sparkles,
  Video,
  Activity,
  Droplets,
  CloudSun,
  ArrowRight,
  Clock,
  QrCode,
  BadgeCheck,
} from "lucide-react";

export function HeroVisualGraphic() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const [activeSector, setActiveSector] = useState<"agri" | "livestock" | "pet">("agri");

  // Sector Data for the High-Tech Telehealth HUD
  const sectorData = {
    agri: {
      tag: isBn ? "উদ্ভিদ রোগতত্ত্ব টেলি-ডেস্ক" : "Crop Pathology Tele-Desk",
      subject: isBn ? "বোরো ধানের পাতা (BRRI ধান-২৮)" : "Boro Rice Paddy (BRRI Dhan-28)",
      stage: isBn ? "কুশি পর্যায় • ৪২ দিন বয়স" : "Tillering Stage • 42 Days",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
      detection: "Magnaporthe oryzae (Leaf Blast)",
      detectionBn: "বোরো ধানের পাতা ব্লাস্ট রোগ",
      confidence: "98.4%",
      severity: isBn ? "তীব্র সংক্রমণ ঝুঁকি" : "High Fungal Risk",
      telemetry: [
        { label: isBn ? "এনডিভিআই সূচক" : "NDVI Index", value: "0.74", status: "Optimal" },
        { label: isBn ? "পাতার আর্দ্রতা" : "Leaf Wetness", value: "4.2 hrs", status: "Critical" },
        { label: isBn ? "পরিবেশ তাপমাত্রা" : "Canopy Temp", value: "28.5°C", status: "Normal" },
      ],
      doctor: {
        name: "Dr. Ramesh Patel, Ph.D.",
        title: isBn ? "প্রধান উদ্ভিদ রোগতত্ত্ববিদ • DAE-AGR-8891" : "Chief Plant Pathologist • DAE-8891",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      rxItem: "Tricyclazole 75% WP",
      rxDose: "0.6 g / L (Foliar)",
      withholding: isBn ? "ফসল কাটার ২১ দিন পূর্বে স্প্রে বন্ধ" : "21 Days Pre-Harvest",
      caseId: "consult-agri-101",
      accentColor: "emerald",
    },
    livestock: {
      tag: isBn ? "ডেইরি ভেটেরিনারি টেলি-ডেস্ক" : "Bovine Tele-Vet Desk",
      subject: isBn ? "সংকর ডেইরি গাভী (HF-১০৮)" : "Holstein Cross Dairy Cow (HF-108)",
      stage: isBn ? "২য় ল্যাকটেশন • ৩৫০ কেজি" : "2nd Lactation • 350 kg",
      image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80",
      detection: "Acute Mastitis (Hind Teat)",
      detectionBn: "গাভীর তীব্র ওলান পাকা রোগ",
      confidence: "96.8%",
      severity: isBn ? "জরুরি চিকিৎসা প্রয়োজন" : "Immediate Action",
      telemetry: [
        { label: isBn ? "সোমাটিক সেল কাউন্ট" : "SCC Count", value: "650K/ml", status: "Elevated" },
        { label: isBn ? "শরীরের তাপমাত্রা" : "Rectal Temp", value: "39.4°C", status: "Fever" },
        { label: isBn ? "দুধ হ্রাস" : "Yield Drop", value: "-35%", status: "Warning" },
      ],
      doctor: {
        name: "Dr. Ananya Sen, M.V.Sc.",
        title: isBn ? "রেজিস্টার্ড ভেটেরিনারি সার্জন • BVC-7714" : "Registered Vet Surgeon • BVC-7714",
        avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=200&q=80",
      },
      rxItem: "Cefquinome Sulfate Infusion",
      rxDose: "75 mg / affected teat",
      withholding: isBn ? "দুধ বর্জন: ৭২ ঘণ্টা কঠোর নিয়ম" : "72h Strict Milk Withholding",
      caseId: "consult-vet-202",
      accentColor: "cyan",
    },
    pet: {
      tag: isBn ? "স্মল অ্যানিমেল টেলি-কেয়ার" : "Companion Pet Tele-Vet",
      subject: isBn ? "গোল্ডেন রিট্রিভার (ম্যাক্স)" : "Golden Retriever (Max • 3.5 Yrs)",
      stage: isBn ? "ওজন: ৩১.৫ কেজি • মাইক্রোচিপড" : "Weight: 31.5 kg • Microchipped",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
      detection: "Canine Atopic Dermatitis",
      detectionBn: "কুকুরের তীব্র চর্মরোগ ও চুলকানি",
      confidence: "97.2%",
      severity: isBn ? "মধ্যম অ্যালার্জি" : "Moderate Pruritus",
      telemetry: [
        { label: isBn ? "চুলকানি স্কোর" : "Pruritus Score", value: "8.5 / 10", status: "Severe" },
        { label: isBn ? "ত্বকের পিএইচ" : "Skin pH", value: "7.1", status: "Normal" },
        { label: isBn ? "ভ্যাকসিন স্থিতি" : "Vaccine Status", value: "Valid", status: "Optimal" },
      ],
      doctor: {
        name: "Dr. Farhana Haque, D.V.M.",
        title: isBn ? "স্মল অ্যানিমেল স্পেশালিস্ট • BVC-9912" : "Small Animal Specialist • BVC-9912",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      },
      rxItem: "Oclacitinib Oral Tablets",
      rxDose: "16 mg BID (Weight Titrated)",
      withholding: isBn ? "ওজন অনুসারে সঠিক মাত্রায় সেব্য" : "Veterinary Prescription Only",
      caseId: "consult-pet-303",
      accentColor: "pink",
    },
  };

  const current = sectorData[activeSector];

  return (
    <div className="relative w-full rounded-3xl bg-slate-900/90 border border-white/[0.1] p-5 sm:p-6 shadow-2xl backdrop-blur-2xl overflow-hidden group">
      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Top Header: Telemetry Beacon & Sector Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08] relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Scan className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white font-mono">SROT CLINICAL HUD v3.5</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              {isBn ? "লাইভ এআই ভিশন ও টেলি-মেডিসিন টার্মিনাল" : "Live Multi-Spectral Vision & Telemetry Terminal"}
            </p>
          </div>
        </div>

        {/* 3-Sector Navigation Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-white/[0.08] text-xs font-bold">
          <button
            onClick={() => setActiveSector("agri")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSector === "agri"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Wheat className="w-3.5 h-3.5" />
            <span>{isBn ? "ফসল" : "Crops"}</span>
          </button>
          <button
            onClick={() => setActiveSector("livestock")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSector === "livestock"
                ? "bg-cyan-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Milk className="w-3.5 h-3.5" />
            <span>{isBn ? "ডেইরি" : "Dairy"}</span>
          </button>
          <button
            onClick={() => setActiveSector("pet")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSector === "pet"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{isBn ? "পোষা প্রাণী" : "Pets"}</span>
          </button>
        </div>
      </div>

      {/* Main Visual Display: Real Photographic Visual with High-Tech Diagnostic HUD Overlays */}
      <div className="relative mt-4 rounded-2xl overflow-hidden border border-white/[0.08] bg-slate-950 shadow-inner">
        {/* Real High-Resolution Diagnostic Image */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden">
          <img
            src={current.image}
            alt={current.subject}
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/40" />

          {/* Animated Laser Scanning Beam */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-scan-laser pointer-events-none" />

          {/* AI Reticle & Bounding Target Box */}
          <div className="absolute top-1/4 left-1/4 w-36 h-28 border-2 border-emerald-400/80 rounded-xl pointer-events-none shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            {/* Corner brackets */}
            <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-emerald-300" />
            <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-300" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-300" />

            {/* Bounding box AI chip */}
            <div className="absolute -top-3.5 left-2 px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[9px] font-mono font-black flex items-center gap-1 shadow-md">
              <Scan className="w-2.5 h-2.5" />
              <span>AI DETECT: {current.confidence}</span>
            </div>
          </div>

          {/* Top Floating Target Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{current.subject}</span>
            </span>
          </div>

          {/* Top Right Severity Status */}
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 backdrop-blur-md text-[10px] font-mono font-bold text-rose-300 border border-rose-500/40">
              {current.severity}
            </span>
          </div>

          {/* Floating Clinician Picture-in-Picture Card (Tele-Health Link) */}
          <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-900/95 border border-white/[0.15] shadow-2xl backdrop-blur-md flex items-center gap-2.5 max-w-[210px]">
            <img
              src={current.doctor.avatar}
              alt={current.doctor.name}
              className="w-10 h-10 rounded-lg object-cover border border-emerald-500/60 shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live on Duty
              </span>
              <p className="text-xs font-bold text-white truncate">{current.doctor.name}</p>
              <p className="text-[9px] text-slate-400 truncate">{current.doctor.title.split("•")[1] || "Consultant"}</p>
            </div>
          </div>

          {/* Bottom Left Subject Stage Indicator */}
          <div className="absolute bottom-3 left-3 hidden sm:block">
            <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] text-slate-300 font-mono">
              {current.stage}
            </span>
          </div>
        </div>

        {/* Middle Telemetry Grid Strip */}
        <div className="grid grid-cols-3 divide-x divide-white/[0.06] bg-slate-950 border-t border-white/[0.08] text-[11px] p-2.5">
          {current.telemetry.map((t, idx) => (
            <div key={idx} className="px-2 text-center">
              <span className="text-[10px] text-slate-400 block font-mono">{t.label}</span>
              <span className="font-mono font-black text-white text-xs mt-0.5 block">{t.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certified Prescription Token Banner (Bottom Row) */}
      <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{current.rxItem}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                {current.rxDose}
              </span>
            </div>
            <p className="text-[11px] text-amber-300 font-mono mt-0.5">
              ⚠ {current.withholding}
            </p>
          </div>
        </div>

        <Link
          href={`/consult/${current.caseId}`}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shrink-0 shadow-md"
        >
          <span>{isBn ? "লাইভ চেম্বারে যান" : "Enter Chamber"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
