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
  FileText,
  BadgeCheck,
  Clock,
  Activity,
  Droplets,
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
  severity: "High" | "Moderate" | "Mild";
  severityLabel: string;
  symptomsObserved: string[];
  symptomsObservedBn: string[];
  immediateSteps: string[];
  immediateStepsBn: string[];
  matchedDoctor: {
    name: string;
    role: string;
    avatar: string;
    id: string;
    regNumber: string;
  };
  recommendedFormulation: string;
  recommendedFormulationBn: string;
  withholdingTime: string;
  withholdingTimeBn: string;
  consultationPath: string;
}

const SAMPLES: ScanSample[] = [
  {
    id: "sample-blast",
    category: "agri",
    categoryLabel: "Crop Pathology",
    categoryLabelBn: "মাঠফসল রোগতত্ত্ব",
    label: "Rice Leaf Blast (BRRI Dhan-28)",
    labelBn: "বোরো ধানের পাতা ব্লাস্ট (BRRI ধান-২৮)",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
    pathogen: "Magnaporthe oryzae (Pyricularia oryzae)",
    pathogenBn: "ম্যাগনাপোর্থে ওরিজি (পাতা ব্লাস্ট ছত্রাক)",
    confidence: 98.4,
    severity: "High",
    severityLabel: "High Epidemic Spread Risk",
    symptomsObserved: [
      "Diamond spindle-shaped foliar lesions with ash-gray center",
      "Necrotic dark brown borders spreading rapidly along leaf veins",
      "Fungal conidia sporulation activated by morning dew & high humidity",
    ],
    symptomsObservedBn: [
      "পাতায় দুই প্রান্ত চোখা তেকোনা/মাকু আকৃতির ছাই রঙের দাগ",
      "দাগের চারপাশের কিনারা গাঢ় বাদামি হয়ে প্রসারিত হচ্ছে",
      "ভোরের কুয়াশা ও উচ্চ আর্দ্রতার কারণে নিচের পাতায় জীবাণু ছড়িয়ে পড়ছে",
    ],
    immediateSteps: [
      "Halt nitrogen / urea top-dressing immediately to reduce leaf tenderness.",
      "Maintain a 5 cm standing water layer in paddy fields to restrict fungal spread.",
      "Spray calibrated protectant triazole fungicide during late afternoon.",
    ],
    immediateStepsBn: [
      "জমিতে অতিরিক্ত ইউরিয়া সার প্রয়োগ অবিলম্বে বন্ধ রাখুন।",
      "ক্ষেতে ২-৩ ইঞ্চি পানি ধরে রাখুন যাতে ছত্রাকের বিস্তার রোধ হয়।",
      "পড়ন্ত বিকেলে ট্রাইসাইক্লাজল বা নাটিভো স্প্রে করার প্রস্তুতি নিন।",
    ],
    matchedDoctor: {
      name: "Dr. Ramesh Patel, Ph.D.",
      role: "Chief Plant Pathologist & IPM Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      id: "exp-dr-ramesh-patel",
      regNumber: "DAE-AGR-8891",
    },
    recommendedFormulation: "Tricyclazole 75% WP @ 0.6g/L water (Foliar)",
    recommendedFormulationBn: "ট্রাইসাইক্লাজল ৭৫ ডব্লিউপি প্রতি লিটারে ০.৬ গ্রাম অথবা নাটিভো",
    withholdingTime: "21 Days Pre-Harvest Statutory Withdrawal",
    withholdingTimeBn: "ফসল কাটার ২১ দিন পূর্বে স্প্রে বন্ধ রাখুন",
    consultationPath: "/consult?expert=exp-dr-ramesh-patel&category=agri",
  },
  {
    id: "sample-mastitis",
    category: "veterinary",
    categoryLabel: "Dairy Veterinary",
    categoryLabelBn: "ডেইরি ও গবাদিপশু",
    label: "Bovine Acute Mastitis (HF Cross)",
    labelBn: "গাভীর তীব্র ওলান পাকা রোগ (HF-১০৮)",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80",
    pathogen: "Streptococcus uberis / S. aureus",
    pathogenBn: "স্ট্রেপটোকক্কাস উবারিস ও ব্যাকটেরিয়াল লোড",
    confidence: 96.8,
    severity: "High",
    severityLabel: "Critical Acute Teat Inflammation",
    symptomsObserved: [
      "Severe erythematous swelling and localized heat in right hind quarter",
      "Milk flakes & yellowish serous clotting visible on fore-strip paddle",
      "Somatic cell count elevated above 650,000 cells/ml with fever (39.4°C)",
    ],
    symptomsObservedBn: [
      "ডান পেছনের ওলান অস্বাভাবিক ফুলে গেছে এবং স্পর্শে গরম",
      "দুধে ছানার মতো থোকা থোকা রক্তাভ ও হলুদাভ জমাট পদার্থ",
      "সোমাটিক সেল কাউন্ট প্রতি মিলিলিটারে ৬.৫ লাখ ছাড়িয়েছে এবং জ্বর",
    ],
    immediateSteps: [
      "Completely strip out infected milk every 3 hours to eliminate bacterial toxins.",
      "Apply clean cold hydrotherapy packs to inflamed teat before milking.",
      "Isolate cow and discard all milk into sanitary disposal — never feed calves.",
    ],
    immediateStepsBn: [
      "প্রতি ৩ ঘণ্টা পর পর আক্রান্ত বাঁট থেকে সম্পূর্ণ দুধ টেনে ফেলে দিন।",
      "দোহনের পূর্বে ওলানে ১৫ মিনিট বরফ-ঠাণ্ডা পানির সেঁক দিন।",
      "এই দুধ সম্পূর্ণ মাটিতে পুঁতে ফেলুন; বাছুরকে কোনোভাবেই খাওয়াবেন না।",
    ],
    matchedDoctor: {
      name: "Dr. Ananya Sen, M.V.Sc.",
      role: "Senior Veterinary Surgeon & Bovine Clinician",
      avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=200&q=80",
      id: "exp-dr-ananya-sen",
      regNumber: "BVC-VET-7714",
    },
    recommendedFormulation: "Cefquinome Sulfate 75mg Intramammary Infusion",
    recommendedFormulationBn: "ইন্ট্রাম্যামারি অ্যান্টিবায়োটিক ইনফিউশন + মেলোক্সিক্যাম",
    withholdingTime: "Strict Milk Withholding: 72 Hours (3 Days)",
    withholdingTimeBn: "চিকিৎসা চলাকালীন ও পরবর্তী ৭২ ঘণ্টা দুধ বিক্রি বন্ধ",
    consultationPath: "/consult?expert=exp-dr-ananya-sen&category=veterinary",
  },
  {
    id: "sample-dermatitis",
    category: "pet",
    categoryLabel: "Companion Pet Care",
    categoryLabelBn: "পোষা প্রাণী স্বাস্থ্যসেবা",
    label: "Canine Atopic Dermatitis & Pruritus",
    labelBn: "কুকুর ও বিড়ালের অ্যালার্জি চর্মরোগ (ম্যাক্স)",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
    pathogen: "Atopic Environmental Allergy & Secondary Malassezia",
    pathogenBn: "এলার্জি ও ব্যাকটেরিয়াজনিত ত্বকের প্রদাহ",
    confidence: 97.2,
    severity: "Moderate",
    severityLabel: "Moderate Pruritus Severity (8.5/10)",
    symptomsObserved: [
      "Compulsive bilateral paw licking and salivary staining",
      "Erythematous ventral flare with micro-crusting along inner groin",
      "Elevated nocturnal scratching behavior causing skin breakdown",
    ],
    symptomsObservedBn: [
      "ঘন ঘন পা ও তলপেট চাটা এবং লালচে প্রদাহের সৃষ্টি হওয়া",
      "চুলকানির চোটে লোম উঠে গিয়ে চামড়া খসখসে ও লাল হওয়া",
      "রাতের বেলা অতিরিক্ত চুলকানি ও অস্বস্তি প্রকাশ করা",
    ],
    immediateSteps: [
      "Fit protective soft cone collar to stop self-mutilating skin licking.",
      "Wipe paws and ventral groin with damp chlorhexidine antiseptic wipes.",
      "Administer veterinarian-titrated oral JAK inhibitor with meal.",
    ],
    immediateStepsBn: [
      "মুখে কোন কলার (ই-কলার) পরিয়ে দিন যাতে ক্ষতস্থান চাটতে না পারে।",
      "হালকা কুসুম গরম পানিতে ভেজা তোয়ালে দিয়ে পা পরিষ্কার রাখুন।",
      "ভেটেরিনারি চিকিৎসকের ওজনভিত্তিক চুলকানির ওষুধ খাওয়ান।",
    ],
    matchedDoctor: {
      name: "Dr. Farhana Haque, D.V.M.",
      role: "Small Animal Specialist & Veterinary Surgeon",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      id: "exp-dr-elena-rostova",
      regNumber: "BVC-PET-9912",
    },
    recommendedFormulation: "Oclacitinib 16mg Tablets + Hypoallergenic Otic Wash",
    recommendedFormulationBn: "ওকলাসিটিনিব ১৬ মিগ্রা + কান ও ত্বকের অ্যান্টিসেপটিক ড্রপ",
    withholdingTime: "Weight-Titrated Dosage: 31.5 kg (Prescription Only)",
    withholdingTimeBn: "ওজন অনুসারে সঠিক মাত্রায় সেব্য (৩১.৫ কেজি)",
    consultationPath: "/consult?expert=exp-dr-elena-rostova&category=pet",
  },
];

export function AiSymptomScanner() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const [selectedSample, setSelectedSample] = useState<ScanSample>(SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);

  const handleSelectSample = (sample: ScanSample) => {
    if (sample.id === selectedSample.id) return;
    setIsScanning(true);
    setSelectedSample(sample);
    setTimeout(() => {
      setIsScanning(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>{isBn ? "লাইভ এআই ভিশন প্যাথোলজি স্ক্যানার" : "Live AI Vision Pathology Scanner"}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
              v3.5 Live
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? "নিচের নমুনা রোগগুলো সিলেক্ট করে এআই স্ক্যান ও বিশেষজ্ঞ প্রেসক্রিপশন প্রবাহ লাইভ টেস্ট করুন।"
              : "Switch between real field samples below to test automated vision detection and verified prescription generation."}
          </p>
        </div>

        {/* Preset Category Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-white/[0.08] overflow-x-auto">
          {SAMPLES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectSample(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                selectedSample.id === s.id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-black"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {s.category === "agri" && <Wheat className="w-3.5 h-3.5" />}
              {s.category === "veterinary" && <Milk className="w-3.5 h-3.5" />}
              {s.category === "pet" && <HeartHandshake className="w-3.5 h-3.5" />}
              <span>{isBn ? s.categoryLabelBn : s.categoryLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 5 Cols: High-Resolution Vision Viewport with Laser Sweep */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-slate-950 aspect-[4/3] group">
            <img
              src={selectedSample.image}
              alt={selectedSample.label}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isScanning ? "scale-105 brightness-110 blur-[1px]" : "scale-100 brightness-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

            {/* Laser Scanning Line Animation */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-scan-laser pointer-events-none" />

            {/* Bounding Box Target */}
            <div className="absolute top-[22%] left-[24%] w-44 h-32 border-2 border-emerald-400/90 rounded-xl pointer-events-none shadow-[0_0_20px_rgba(16,185,129,0.35)]">
              <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-emerald-300" />
              <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-300" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-300" />

              <div className="absolute -top-3.5 left-2 px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-mono font-black flex items-center gap-1 shadow-lg">
                <Scan className="w-3 h-3" />
                <span>{selectedSample.confidence}% AI CONFIDENCE</span>
              </div>
            </div>

            {/* Top Left Tag */}
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{isBn ? selectedSample.labelBn : selectedSample.label}</span>
              </span>
            </div>

            {/* Bottom Status Ticker */}
            <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/[0.1] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] text-slate-300 font-mono">
                  {selectedSample.severityLabel}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400">
                Tamper-Proof
              </span>
            </div>
          </div>

          {/* Quick Upload Simulator Prompt */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "আপনার আক্রান্ত মাঠের ছবি তুলে ট্রায়াজ করুন" : "Upload your own leaf / symptom photo"}</span>
            </span>
            <Link
              href="/consult"
              className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-2"
            >
              {isBn ? "ছবি আপলোড করুন" : "Start Live Upload"}
            </Link>
          </div>
        </div>

        {/* Right 7 Cols: Diagnostic Analysis & Immediate Clinical Action Plan */}
        <div className="lg:col-span-7 space-y-4">
          {/* Diagnostic Header */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/[0.08] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider">
                PRIMARY CLINICAL PATHOGEN IDENTIFIED
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {selectedSample.severity} Severity
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-white">
              {isBn ? selectedSample.pathogenBn : selectedSample.pathogen}
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              Diagnostic Target: {selectedSample.label}
            </p>
          </div>

          {/* Symptoms Checklist */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
              {isBn ? "সনাক্তকৃত প্যাথলজিক্যাল লক্ষণসমূহ:" : "Observed Clinical Manifestations:"}
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {(isBn ? selectedSample.symptomsObservedBn : selectedSample.symptomsObserved).map((sym, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-xl border border-white/[0.04]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Immediate Action Steps */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
              {isBn ? "তাৎক্ষণিক করণীয় পদক্ষেপ (Emergency Actions):" : "Immediate Field Protocol:"}
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {(isBn ? selectedSample.immediateStepsBn : selectedSample.immediateSteps).map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prescribed Formulation & Withholding Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/50 via-slate-950 to-slate-950 border border-emerald-500/30 space-y-1 text-xs">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
              RECOMMENDED SPRAY / CLINICAL FORMULATION
            </span>
            <div className="font-bold text-white text-sm">
              {isBn ? selectedSample.recommendedFormulationBn : selectedSample.recommendedFormulation}
            </div>
            <div className="text-[11px] text-amber-300 font-mono">
              ⚠ Statutory Withholding: {isBn ? selectedSample.withholdingTimeBn : selectedSample.withholdingTime}
            </div>
          </div>

          {/* Doctor Card & Instant Booking CTA */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedSample.matchedDoctor.avatar}
                alt={selectedSample.matchedDoctor.name}
                className="w-12 h-12 rounded-xl object-cover border border-emerald-500/60 shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{selectedSample.matchedDoctor.regNumber}</span>
                </div>
                <h5 className="font-bold text-white text-xs">{selectedSample.matchedDoctor.name}</h5>
                <p className="text-[11px] text-slate-400">{selectedSample.matchedDoctor.role}</p>
              </div>
            </div>

            <Link
              href={selectedSample.consultationPath}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-950/60 shrink-0"
            >
              <span>{isBn ? "এই ডাক্তারের পরামর্শ নিন (৳৩০০)" : "Consult This Doctor"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
