"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  Camera,
  Scan,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Wheat,
  Milk,
  HeartHandshake,
  Upload,
  ShieldCheck,
} from "lucide-react";

interface ScanSample {
  id: string;
  category: "agri" | "veterinary" | "pet";
  categoryLabel: string;
  categoryLabelBn: string;
  label: string;
  labelBn: string;
  image: string;
  pathogen: string;
  pathogenBn: string;
  confidence: number;
  symptomsObserved: string[];
  symptomsObservedBn: string[];
  immediateSteps: string[];
  immediateStepsBn: string[];
  matchedDoctor: {
    name: string;
    role: string;
    avatar: string;
    id: string;
  };
  recommendedFormulation: string;
  recommendedFormulationBn: string;
  withholdingTime: string;
  withholdingTimeBn: string;
}

const SAMPLES: ScanSample[] = [
  {
    id: "sample-blast",
    category: "agri",
    categoryLabel: "Crop Pathology",
    categoryLabelBn: "উদ্ভিদ রোগতত্ত্ব",
    label: "Rice Leaf Blast (BRRI dhan28)",
    labelBn: "বোরো ধানের পাতা ব্লাস্ট (BRRI ধান-২৮)",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
    pathogen: "Magnaporthe oryzae (Pyricularia oryzae)",
    pathogenBn: "ম্যাগনাপোর্থে ওরিজি (ব্লাস্ট ছত্রাক)",
    confidence: 98.4,
    symptomsObserved: [
      "Diamond spindle-shaped foliar lesions with ash-gray center",
      "Necrotic brown outer borders spreading along vascular veins",
      "Humidity-induced sporulation on lower canopy layer",
    ],
    symptomsObservedBn: [
      "পাতায় দুই প্রান্ত চোখা তেকোনা/মাকু আকৃতির ছাই রঙের দাগ",
      "দাগের চারপাশের কিনারা গাঢ় বাদামি হয়ে প্রসারিত হচ্ছে",
      "উচ্চ আর্দ্রতার কারণে নিচের পাতায় ছত্রাকের জীবাণু ছড়িয়ে পড়ছে",
    ],
    immediateSteps: [
      "Suspend further urea/nitrogen top-dressing to prevent vegetative succulence.",
      "Maintain 2-3 cm standing water layer across affected paddy plots.",
      "Prepare calibrated foliar triazole spray for late afternoon.",
    ],
    immediateStepsBn: [
      "জমিতে অতিরিক্ত ইউরিয়া সার প্রয়োগ অবিলম্বে বন্ধ রাখুন।",
      "ক্ষেতে ২-৩ ইঞ্চি পানি ধরে রাখুন যাতে ছত্রাকের বিস্তার হ্রাস পায়।",
      "পড়ন্ত বিকেলে ট্রাইসাইক্লাজল বা নাটিভো স্প্রে করার প্রস্তুতি নিন।",
    ],
    matchedDoctor: {
      name: "ড. তরিকুল ইসলাম (Dr. Tariqul Islam, Ph.D.)",
      role: "প্রধান উদ্ভিদ রোগতত্ত্ববিদ • BRRI/BARC-AGRI-109",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      id: "exp-dr-ramesh-patel",
    },
    recommendedFormulation: "Tricyclazole 75% WP @ 0.8g/L or Nativo 75 WG",
    recommendedFormulationBn: "ট্রাইসাইক্লাজল ৭৫ ডব্লিউপি প্রতি লিটারে ০.৮ গ্রাম অথবা নাটিভো",
    withholdingTime: "21 Days Pre-Harvest Safety Interval",
    withholdingTimeBn: "ফসল কাটার ২১ দিন পূর্বে স্প্রে বন্ধ রাখুন",
  },
  {
    id: "sample-mastitis",
    category: "veterinary",
    categoryLabel: "Dairy Veterinary",
    categoryLabelBn: "ডেইরি ভেটেরিনারি",
    label: "Bovine Acute Mastitis (Mymensingh)",
    labelBn: "গাভীর তীব্র ওলান পাকা রোগ (ময়মনসিংহ ক্লাস্টার)",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80",
    pathogen: "Streptococcus uberis / S. aureus",
    pathogenBn: "স্ট্রেপটোকক্কাস উবারিস ও স্ট্যাফাইলোকক্কাস",
    confidence: 96.8,
    symptomsObserved: [
      "Erythematous swelling and localized hyperthermia in right hind quarter",
      "Viscous milk flakes & yellowish serous clots on fore-strip paddle",
      "Elevated somatic cell count > 800,000 cells/ml",
    ],
    symptomsObservedBn: [
      "ডান পেছনের ওলান অস্বাভাবিক ফুলে গেছে এবং স্পর্শে গরম",
      "দুধে ছানার মতো থোকা থোকা রক্তাভ ও হলুদাভ জমাট পদার্থ",
      "সোমাটিক সেল কাউন্ট প্রতি মিলিলিটারে ৮ লাখের বেশি",
    ],
    immediateSteps: [
      "Strip out affected quarter completely every 3 hours to purge toxins.",
      "Apply cold hydrotherapy pack to udder for 15 minutes before milking.",
      "Discard milk entirely into bio-disposal; do NOT feed to replacement calves.",
    ],
    immediateStepsBn: [
      "প্রতি ৩ ঘণ্টা পর পর আক্রান্ত বাঁট থেকে সম্পূর্ণ দুধ টেনে ফেলে দিন।",
      "দোহনের পূর্বে ওলানে ১৫ মিনিট বরফ-ঠাণ্ডা পানির সেঁক দিন।",
      "এই দুধ সম্পূর্ণ মাটিতে পুঁতে ফেলুন; বাছুরকে কোনোভাবেই খাওয়াবেন না।",
    ],
    matchedDoctor: {
      name: "ডা. অনন্যা সেন (Dr. Ananya Sen, D.V.M.)",
      role: "সিনিয়র ভেটেরিনারি সার্জন • BVC-VET-BD-2024",
      avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=200&q=80",
      id: "exp-dr-ananya-sen",
    },
    recommendedFormulation: "Intramammary Infusion + Meloxicam NSAID",
    recommendedFormulationBn: "ইন্ট্রাম্যামারি অ্যান্টিবায়োটিক টিউব + মেলোক্সিক্যাম",
    withholdingTime: "72 Hours Strict Milk Withholding",
    withholdingTimeBn: "চিকিৎসা চলাকালীন ও পরবর্তী ৭২ ঘণ্টা দুধ বিক্রি বন্ধ",
  },
  {
    id: "sample-dermatitis",
    category: "pet",
    categoryLabel: "Companion Pet Care",
    categoryLabelBn: "পোষা প্রাণীর স্বাস্থ্য",
    label: "Canine Atopic & Flea Dermatitis",
    labelBn: "কুকুর ও বিড়ালের চর্মরোগ ও চুলকানি (ঢাকা)",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
    pathogen: "Atopic Allergy with Secondary Malassezia Yeast",
    pathogenBn: "এলার্জি ও ব্যাকটেরিয়াজনিত চর্মরোগ",
    confidence: 96.2,
    symptomsObserved: [
      "Bilateral paw pododermatitis with salivary staining",
      "Erythematous ventral abdomen flare and intense pruritus",
      "Secondary follicular crusting along tail base and inner thighs",
    ],
    symptomsObservedBn: [
      "ঘন ঘন পা ও তলপেট চাটা এবং লালচে প্রদাহ",
      "চুলকানির চোটে লোম উঠে গিয়ে চামড়া খসখসে হওয়া",
      "লেজের গোড়ায় ও উরুর ভেতরের অংশে খুশকির মতো স্তর",
    ],
    immediateSteps: [
      "Fit protective soft cone collar to prevent self-mutilating skin licking.",
      "Wipe paws and ventral groin with hypoallergenic damp washcloth.",
      "Administer weight-titrated antipruritic JAK inhibitor.",
    ],
    immediateStepsBn: [
      "মুখে কোন কলার (ই-কলার) পরিয়ে দিন যাতে ক্ষতস্থান চাটতে না পারে।",
      "হালকা কুসুম গরম পানিতে ভেজা তোয়ালে দিয়ে পা পরিষ্কার রাখুন।",
      "ভেটেরিনারি চিকিৎসকের ওজনভিত্তিক চুলকানির ওষুধ খাওয়ান।",
    ],
    matchedDoctor: {
      name: "ডা. ফারহানা হক (Dr. Farhana Haque, D.V.M.)",
      role: "স্মল অ্যানিমেল স্পেশালিস্ট • BVC-9912",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
      id: "exp-dr-elena-rostova",
    },
    recommendedFormulation: "Oclacitinib 16mg + Otic Drops",
    recommendedFormulationBn: "ওকলাসিটিনিব ১৬ মিগ্রা + কান ও ত্বকের ড্রপ",
    withholdingTime: "Veterinary Prescription Only (Weight: 31.5 kg)",
    withholdingTimeBn: "ওজন অনুসারে সঠিক মাত্রায় সেব্য",
  },
];

export function AiSymptomScanner() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const [selectedSample, setSelectedSample] = useState<ScanSample>(SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  const handleSelectSample = (sample: ScanSample) => {
    setSelectedSample(sample);
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 25;
      });
    }, 120);
  };

  return (
    <div className="srot-glass-card hover-glow-emerald rounded-3xl p-6 sm:p-8 md:p-10 border border-emerald-500/30 bg-gradient-to-b from-[#0c1522] to-[#060b11] shadow-2xl relative overflow-hidden group">
      {/* Background ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isBn ? "কৃত্রিম বুদ্ধিমত্তা ভিজ্যুয়াল ট্রায়াজ ইঞ্জিন" : "AI Computer Vision Triage Engine"}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {isBn ? "লাইভ ফসল ও প্রাণীর রোগ নির্ণয় স্ক্যানার" : "Live Crop & Animal Symptom Scanner"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {isBn
              ? "নিচের নমুনা রোগ নির্বাচন করে স্ক্যান করুন এবং এআই সনাক্তকরণ ও বিশেষজ্ঞ প্রেসক্রিপশন প্রবাহ পরীক্ষা করুন।"
              : "Test the AI diagnostic scanner below using verified clinical samples from crop fields, dairy herds, or companion pets."}
          </p>
        </div>

        {/* Sample Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {SAMPLES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectSample(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                selectedSample.id === s.id
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60"
                  : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {s.category === "agri" && <Wheat className="w-3.5 h-3.5 text-emerald-400" />}
              {s.category === "veterinary" && <Milk className="w-3.5 h-3.5 text-cyan-400" />}
              {s.category === "pet" && <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />}
              <span>{isBn ? s.categoryLabelBn : s.categoryLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* Left 5 Cols: Visual Scanner Screen with Laser Line */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-black aspect-4/3 group">
            <img
              src={selectedSample.image}
              alt={selectedSample.label}
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

            {/* Scanning Laser Line Animation */}
            {isScanning && (
              <div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 shadow-[0_0_15px_#34d399] transition-all duration-150 z-20"
                style={{ top: `${scanProgress}%` }}
              />
            )}

            {/* Overlay Grid lines for HUD effect */}
            <div className="absolute inset-0 srot-grid-pattern opacity-30 pointer-events-none" />

            {/* Status Stamp */}
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 z-10">
              <Scan className="w-3 h-3 animate-spin" />
              <span>{isScanning ? (isBn ? "মডেল স্ক্যানিং চলছে..." : "AI MODEL SCANNING...") : (isBn ? "শনাক্তকরণ সম্পন্ন" : "ANALYSIS LOCKED")}</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-white/10 z-10">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">
                {isBn ? "পরীক্ষিত নমুনা:" : "ANALYZED SPECIMEN:"}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {isBn ? selectedSample.labelBn : selectedSample.label}
              </h4>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Diagnostic Findings & Matched Doctor */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">
                  {isBn ? "শনাক্তকৃত প্যাথোজেন / রোগজীবাণু:" : "DETECTED PATHOGEN / BIOMARKER:"}
                </span>
                <h4 className="text-base sm:text-lg font-black text-emerald-400 mt-0.5">
                  {isBn ? selectedSample.pathogenBn : selectedSample.pathogen}
                </h4>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">
                  {isBn ? "নিশ্চয়তার স্কোর" : "CONFIDENCE"}
                </span>
                <span className="text-xl font-black text-white font-mono">
                  {selectedSample.confidence}%
                </span>
              </div>
            </div>

            {/* Observed Symptoms */}
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-300 block mb-1">
                {isBn ? "লক্ষণসমূহ (Symptoms Observed):" : "Visual Pathology Observed:"}
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {(isBn ? selectedSample.symptomsObservedBn : selectedSample.symptomsObserved).map((symptom, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Immediate Steps */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-amber-400 block font-bold mb-1">
                {isBn ? "জরুরি তাৎক্ষণিক করণীয় (Immediate Action):" : "CRITICAL IMMEDIATE PROTOCOL:"}
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {(isBn ? selectedSample.immediateStepsBn : selectedSample.immediateSteps).map((step, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Matched Specialist Doctor Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedSample.matchedDoctor.avatar}
                alt={selectedSample.matchedDoctor.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400 shadow-lg"
              />
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase block font-semibold">
                  {isBn ? "অন-ডিউটি স্পেশালিস্ট:" : "MATCHED SPECIALIST ON DUTY:"}
                </span>
                <h4 className="text-sm font-bold text-white">
                  {selectedSample.matchedDoctor.name}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {selectedSample.matchedDoctor.role}
                </p>
              </div>
            </div>

            <Link
              href={`/consult?category=${selectedSample.category === "agri" ? "agri" : selectedSample.category === "veterinary" ? "veterinary" : "pet"}`}
              className="btn-shimmer px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition shadow-lg shrink-0 flex items-center gap-1.5"
            >
              <span>{isBn ? "চিকিৎসকের সাথে কথা বলুন" : "Connect With Doctor"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
