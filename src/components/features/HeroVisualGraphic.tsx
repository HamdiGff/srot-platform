"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  Wheat,
  Milk,
  HeartHandshake,
  ShieldCheck,
  Scan,
  FileText,
  ArrowRight,
} from "lucide-react";

export function HeroVisualGraphic() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const [activeSector, setActiveSector] = useState<"agri" | "livestock" | "pet">("agri");

  // Sector Data for the Compact Clinical HUD
  const sectorData = {
    agri: {
      tag: isBn ? "উদ্ভিদ রোগতত্ত্ব" : "Crop Pathology",
      subject: isBn ? "বোরো ধানের পাতা (BRRI ধান-২৮)" : "Boro Rice Paddy (BRRI Dhan-28)",
      stage: isBn ? "কুশি পর্যায় • ৪২ দিন" : "Tillering • 42 Days",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=700&q=80",
      detection: "Magnaporthe oryzae (Leaf Blast)",
      detectionBn: "বোরো ধানের পাতা ব্লাস্ট",
      confidence: "98.4%",
      severity: isBn ? "তীব্র ঝুঁকি" : "High Risk",
      telemetry: [
        { label: isBn ? "এনডিভিআই" : "NDVI", value: "0.74" },
        { label: isBn ? "আর্দ্রতা" : "Leaf Wet", value: "4.2h" },
        { label: isBn ? "তাপমাত্রা" : "Canopy", value: "28.5°C" },
      ],
      doctor: {
        name: "Dr. Ramesh Patel, Ph.D.",
        title: isBn ? "উদ্ভিদ বিশেষজ্ঞ • DAE-8891" : "Plant Pathologist • DAE-8891",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      },
      rxItem: "Tricyclazole 75% WP",
      rxDose: "0.6 g / L",
      withholding: isBn ? "ফসল কাটার ২১ দিন পূর্বে স্প্রে বন্ধ" : "21d Pre-Harvest Interval",
      caseId: "consult-agri-101",
    },
    livestock: {
      tag: isBn ? "ডেইরি ভেটেরিনারি" : "Bovine Tele-Vet",
      subject: isBn ? "সংকর ডেইরি গাভী (HF-১০৮)" : "Holstein Cross Cow (HF-108)",
      stage: isBn ? "২য় ল্যাকটেশন • ৩৫০ কেজি" : "2nd Lactation • 350 kg",
      image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=700&q=80",
      detection: "Acute Mastitis (Hind Teat)",
      detectionBn: "গাভীর তীব্র ওলান পাকা",
      confidence: "96.8%",
      severity: isBn ? "জরুরি চিকিৎসা" : "Acute Teat",
      telemetry: [
        { label: isBn ? "সোমাটিক সেল" : "SCC", value: "650K/ml" },
        { label: isBn ? "তাপমাত্রা" : "Temp", value: "39.4°C" },
        { label: isBn ? "দুধ হ্রাস" : "Yield Drop", value: "-35%" },
      ],
      doctor: {
        name: "Dr. Ananya Sen, M.V.Sc.",
        title: isBn ? "ভেটেরিনারি সার্জন • BVC-7714" : "Vet Surgeon • BVC-7714",
        avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=150&q=80",
      },
      rxItem: "Cefquinome Sulfate Infusion",
      rxDose: "75 mg Teat Tube",
      withholding: isBn ? "দুধ বর্জন: ৭২ ঘণ্টা কঠোর নিয়ম" : "72h Milk Withdrawal Interval",
      caseId: "consult-vet-202",
    },
    pet: {
      tag: isBn ? "পোষা প্রাণী কেয়ার" : "Companion Pet Vet",
      subject: isBn ? "গোল্ডেন রিট্রিভার (ম্যাক্স)" : "Golden Retriever (Max • 3.5 Yrs)",
      stage: isBn ? "ওজন: ৩১.৫ কেজি • চিপড" : "Weight: 31.5 kg • Chipped",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80",
      detection: "Canine Atopic Dermatitis",
      detectionBn: "কুকুরের চর্মরোগ ও অ্যালার্জি",
      confidence: "97.2%",
      severity: isBn ? "মধ্যম অ্যালার্জি" : "Pruritus 8.5/10",
      telemetry: [
        { label: isBn ? "চুলকানি" : "Pruritus", value: "8.5 / 10" },
        { label: isBn ? "ত্বক পিএইচ" : "Skin pH", value: "7.1" },
        { label: isBn ? "ভ্যাকসিন" : "Vaccine", value: "Valid" },
      ],
      doctor: {
        name: "Dr. Farhana Haque, D.V.M.",
        title: isBn ? "স্মল অ্যানিমেল • BVC-9912" : "Small Animal • BVC-9912",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      },
      rxItem: "Oclacitinib Oral Tablets",
      rxDose: "16 mg BID",
      withholding: isBn ? "ওজন অনুসারে সঠিক মাত্রায় সেব্য" : "Veterinary Prescription Only",
      caseId: "consult-pet-303",
    },
  };

  const current = sectorData[activeSector];

  return (
    <div className="relative w-full rounded-2xl bg-slate-900/90 border border-white/[0.1] p-3 sm:p-4 shadow-xl backdrop-blur-xl overflow-hidden group">
      {/* Background Subtle Glows */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Compact Top Header */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/[0.08] relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Scan className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-white font-mono">CLINICAL HUD</span>
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
          </div>
        </div>

        {/* Mini 3-Sector Navigation Tabs */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-white/[0.08] text-[10px] font-bold">
          <button
            onClick={() => setActiveSector("agri")}
            className={`px-2 py-1 rounded transition-all flex items-center gap-1 ${
              activeSector === "agri"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Wheat className="w-3 h-3" />
            <span>{isBn ? "ফসল" : "Crops"}</span>
          </button>
          <button
            onClick={() => setActiveSector("livestock")}
            className={`px-2 py-1 rounded transition-all flex items-center gap-1 ${
              activeSector === "livestock"
                ? "bg-cyan-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Milk className="w-3 h-3" />
            <span>{isBn ? "ডেইরি" : "Dairy"}</span>
          </button>
          <button
            onClick={() => setActiveSector("pet")}
            className={`px-2 py-1 rounded transition-all flex items-center gap-1 ${
              activeSector === "pet"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <HeartHandshake className="w-3 h-3" />
            <span>{isBn ? "পেট" : "Pets"}</span>
          </button>
        </div>
      </div>

      {/* Main Visual Display: Tightened aspect ratio */}
      <div className="relative mt-2.5 rounded-xl overflow-hidden border border-white/[0.08] bg-slate-950 shadow-inner">
        <div className="relative h-36 sm:h-44 w-full overflow-hidden">
          <img
            src={current.image}
            alt={current.subject}
            className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30" />

          {/* Animated Laser Scanning Beam */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] animate-scan-laser pointer-events-none" />

          {/* AI Reticle & Bounding Target Box */}
          <div className="absolute top-[20%] left-[22%] w-32 h-20 border-2 border-emerald-400/90 rounded-lg pointer-events-none shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-emerald-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-emerald-300" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-emerald-300" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-emerald-300" />

            <div className="absolute -top-2.5 left-1.5 px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 text-[8px] font-mono font-black shadow-md">
              AI MATCH: {current.confidence}
            </div>
          </div>

          {/* Top Left Tag */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[9px] font-bold text-white border border-white/10 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{current.subject}</span>
            </span>
          </div>

          {/* Top Right Severity */}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 rounded-md bg-rose-500/20 backdrop-blur-md text-[9px] font-mono font-bold text-rose-300 border border-rose-500/30">
              {current.severity}
            </span>
          </div>

          {/* Compact Doctor Pill (Bottom Right) */}
          <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-900/95 border border-white/[0.12] shadow-xl backdrop-blur-md flex items-center gap-2 max-w-[170px]">
            <img
              src={current.doctor.avatar}
              alt=""
              className="w-7 h-7 rounded-md object-cover border border-emerald-500/60 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-white truncate">{current.doctor.name}</p>
              <p className="text-[8px] text-emerald-400 font-mono truncate">{current.doctor.title}</p>
            </div>
          </div>
        </div>

        {/* Compact Telemetry Strip */}
        <div className="grid grid-cols-3 divide-x divide-white/[0.06] bg-slate-950 border-t border-white/[0.08] text-[10px] py-1.5 px-2">
          {current.telemetry.map((t, idx) => (
            <div key={idx} className="px-1 text-center">
              <span className="text-[9px] text-slate-400 block font-mono">{t.label}</span>
              <span className="font-mono font-bold text-white block mt-0.5">{t.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Prescription Token Row */}
      <div className="mt-2.5 p-2 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <div className="truncate">
            <span className="font-bold text-white mr-1.5">{current.rxItem}</span>
            <span className="text-[9px] text-amber-300 font-mono">({current.withholding})</span>
          </div>
        </div>

        <Link
          href={`/consult/${current.caseId}`}
          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 transition shrink-0"
        >
          <span>{isBn ? "চেম্বার" : "Chamber"}</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
