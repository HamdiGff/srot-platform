"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import { PLATFORM_EXPERTS, PlatformExpert } from "@/data/mockExperts";
import { ExpressChamberModal } from "./ExpressChamberModal";
import {
  Wheat,
  Milk,
  Egg,
  Fish,
  HeartHandshake,
  Scan,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Camera,
  Mic,
  MicOff,
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  PhoneCall,
  Search,
  Radio,
  FileText,
  BadgeCheck,
} from "lucide-react";

type SectorType = "agri" | "veterinary" | "poultry" | "fisheries" | "pet";

interface TriageCase {
  id: string;
  labelEn: string;
  labelBn: string;
  subjectNameEn: string;
  subjectNameBn: string;
  varietyOrBreed: string;
  image: string;
  pathogen: string;
  confidence: number;
  severity: "High" | "Acute" | "Moderate";
  voiceTranscriptEn: string;
  voiceTranscriptBn: string;
  firstAidEn: string;
  firstAidBn: string;
  rxFormulationEn: string;
  rxFormulationBn: string;
  withholdingEn: string;
  withholdingBn: string;
  doctorExpertId: string;
}

const SECTOR_CONFIG: Record<
  SectorType,
  {
    titleEn: string;
    titleBn: string;
    subEn: string;
    subBn: string;
    icon: any;
    onlineCount: number;
    color: string;
    cases: TriageCase[];
  }
> = {
  agri: {
    titleEn: "Crop Pathology",
    titleBn: "আবাদি ফসল",
    subEn: "Rice, Maize, Potato & Fruit",
    subBn: "ধান, ভুট্টা, আলু ও সবজি",
    icon: Wheat,
    onlineCount: 42,
    color: "emerald",
    cases: [
      {
        id: "blast",
        labelEn: "Rice Leaf Blast",
        labelBn: "ধানের পাতা ব্লাস্ট",
        subjectNameEn: "Boro Paddy (BRRI Dhan-28)",
        subjectNameBn: "বোরো ধান (ব্রি ধান-২৮)",
        varietyOrBreed: "Dinajpur Sadar • 45 Days",
        image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
        pathogen: "Magnaporthe oryzae (Pyricularia)",
        confidence: 98.6,
        severity: "High",
        voiceTranscriptEn: "Leaves turning spindle brown with ash centers after morning fog.",
        voiceTranscriptBn: "ভোরের কুয়াশার পর ধানের পাতায় বাদামী মাকু আকৃতির ছাই দাগ দেখা দিয়েছে।",
        firstAidEn: "Halt all urea top-dressing immediately; hold 5 cm standing water in paddy.",
        firstAidBn: "ইউরিয়া সার ছিটানো অবিলম্বে বন্ধ রাখুন এবং জমিতে ২-৩ ইঞ্চি পানি ধরে রাখুন।",
        rxFormulationEn: "Tricyclazole 75% WP @ 0.6g/L foliar spray",
        rxFormulationBn: "ট্রাইসাইক্লাজল ৭৫% ডব্লিউপি প্রতি লিটারে ০.৬ গ্রাম",
        withholdingEn: "21 Days Pre-Harvest Statutory Withdrawal Interval",
        withholdingBn: "ফসল কাটার ২১ দিন পূর্বে বালাইনাশক স্প্রে বন্ধ রাখা বাধ্যতামূলক",
        doctorExpertId: "exp-dr-ramesh-patel",
      },
      {
        id: "blight",
        labelEn: "Potato Late Blight",
        labelBn: "আলুর নাবি ধসা রোগ",
        subjectNameEn: "Cardinal Potato Crop",
        subjectNameBn: "কার্ডিনাল জাতের আলু",
        varietyOrBreed: "Munshiganj Hub • 60 Days",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
        pathogen: "Phytophthora infestans (Oomycete)",
        confidence: 97.4,
        severity: "Acute",
        voiceTranscriptEn: "Water-soaked dark lesions spreading rapidly across whole potato plot.",
        voiceTranscriptBn: "পুরো আলু ক্ষেতে পানিভেজা কালো দাগ দ্রুত ছড়িয়ে পাতা পচে যাচ্ছে।",
        firstAidEn: "Prune heavily infected lower haulms; avoid sprinkler irrigation.",
        firstAidBn: "আক্রান্ত আলু গাছের নিচের পচা পাতা ছিঁড়ে মাটিতে পুঁতে ফেলুন।",
        rxFormulationEn: "Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/L",
        rxFormulationBn: "সাইমোক্সানিল ৮% + ম্যানকোজেব ৬৪% ডব্লিউপি প্রতি লিটারে ২.৫ গ্রাম",
        withholdingEn: "14 Days Pre-Harvest Safety Interval",
        withholdingBn: "ফসল তোলার ১৪ দিন পূর্বে স্প্রে বন্ধ রাখুন",
        doctorExpertId: "exp-dr-ramesh-patel",
      },
    ],
  },
  veterinary: {
    titleEn: "Bovine & Livestock",
    titleBn: "ডেইরি ও গবাদিপশু",
    subEn: "Dairy Cow, Buffalo & Goats",
    subBn: "গাভী, মহিষ ও ছাগল",
    icon: Milk,
    onlineCount: 38,
    color: "cyan",
    cases: [
      {
        id: "mastitis",
        labelEn: "Acute Bovine Mastitis",
        labelBn: "গাভীর তীব্র ওলান পাকা",
        subjectNameEn: "Holstein Friesian Cross Cow",
        subjectNameBn: "হোলস্টাইন ফ্রিজিয়ান সংকর গাভী",
        varietyOrBreed: "Baghabari Milk Belt • 2nd Lactation",
        image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80",
        pathogen: "Streptococcus uberis / S. aureus",
        confidence: 97.8,
        severity: "High",
        voiceTranscriptEn: "Right rear quarter swollen hot, milk curdling with yellow flakes.",
        voiceTranscriptBn: "ডান পেছনের ওলান অস্বাভাবিক ফুলে গরম হয়ে গেছে এবং দুধে ছানার মতো দলা।",
        firstAidEn: "Completely strip affected quarter every 3 hours; discard milk safely.",
        firstAidBn: "প্রতি ৩ ঘণ্টা পর পর আক্রান্ত বাঁট থেকে সম্পূর্ণ দুধ টেনে ফেলে দিন ও ঠান্ডা সেঁক দিন।",
        rxFormulationEn: "Ceftiofur Sodium 1g IM + Intramammary Infusion",
        rxFormulationBn: "সেফটিওফার সোডিয়াম ১ গ্রাম ইনজেকশন + ইন্ট্রাম্যামারি টিউব",
        withholdingEn: "Strict Milk Withholding: 72 Hours • Meat: 4 Days",
        withholdingBn: "শেষ ইনজেকশনের পর ৭২ ঘণ্টা দুধ বাজারে বিক্রি সম্পূর্ণ নিষিদ্ধ",
        doctorExpertId: "exp-dr-ananya-sen",
      },
      {
        id: "lsd",
        labelEn: "Lumpy Skin Disease",
        labelBn: "ল্যাম্পি স্কিন ডিজিজ (LSD)",
        subjectNameEn: "Sahiwal Bull Cattle",
        subjectNameBn: "শাহিওয়াল জাতের ষাঁড়",
        varietyOrBreed: "Sirajganj • 420 kg Bodyweight",
        image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80",
        pathogen: "Capripoxvirus (Lumpy Skin)",
        confidence: 96.5,
        severity: "Acute",
        voiceTranscriptEn: "Round nodular lumps on skin with high fever and swollen dewlap.",
        voiceTranscriptBn: "গায়ে শক্ত গোল গোল গোটা উঠেছে, তীব্র জ্বর এবং গলা ফুলে পানি জমছে।",
        firstAidEn: "Isolate animal in mosquito-netted stall; apply antiseptic neem wash.",
        firstAidBn: "আক্রান্ত পশুকে মশারির ভেতরে রাখুন এবং নিম পাতার পানি দিয়ে গা পরিষ্কার রাখুন।",
        rxFormulationEn: "Meloxicam + Paracetamol IM + Antihistaminic Support",
        rxFormulationBn: "মেলোক্সিক্যাম + প্যারাসিটামল ইনজেকশন এবং এন্টিহিস্টামিনিক ডোজ",
        withholdingEn: "Meat Withholding: 5 Days",
        withholdingBn: "মাংস উইথহোল্ডিং: ৫ দিন",
        doctorExpertId: "exp-dr-ananya-sen",
      },
    ],
  },
  poultry: {
    titleEn: "Poultry Flocks",
    titleBn: "পোল্ট্রি ও ফ্লক",
    subEn: "Broiler, Layer & Sonali",
    subBn: "ব্রয়লার, লেয়ার ও সোনালি",
    icon: Egg,
    onlineCount: 24,
    color: "amber",
    cases: [
      {
        id: "coccidiosis",
        labelEn: "Caecal Coccidiosis",
        labelBn: "রক্ত আমাশয় (কক্সিডিওসিস)",
        subjectNameEn: "Commercial Cobb-500 Broilers",
        subjectNameBn: "বাণিজ্যিক ব্রয়লার ফ্লক",
        varietyOrBreed: "Sreepur, Gazipur • 3,500 Birds",
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80",
        pathogen: "Eimeria tenella (Protozoan)",
        confidence: 96.9,
        severity: "High",
        voiceTranscriptEn: "Blood in droppings, chicks huddling under heaters with pale combs.",
        voiceTranscriptBn: "পায়খানার সাথে রক্ত ও আমাশয়, ব্রুডারের নিচে দলা পাকিয়ে মুরগি ঝিমোচ্ছে।",
        firstAidEn: "Remove damp litter around drinker lines immediately; add Vitamin K3.",
        firstAidBn: "পানির পাত্রের ভেজা লিটার সরিয়ে শুকনা তুষ দিন এবং পানিতে ভিটামিন কে৩ দিন।",
        rxFormulationEn: "Toltrazuril 2.5% Oral @ 1ml/L drinking water for 48 hrs",
        rxFormulationBn: "টোল্ট্রাজুরিল ২.৫% প্রতি লিটারে ১ মিলি হারে টানা ৪৮ ঘণ্টা",
        withholdingEn: "Statutory Meat Withholding: 14 Days Prior to Slaughter",
        withholdingBn: "মুরগি বিক্রির ১৪ দিন পূর্বে ওষুধ প্রয়োগ বন্ধ রাখুন",
        doctorExpertId: "exp-dr-tariq-mansoor",
      },
    ],
  },
  fisheries: {
    titleEn: "Aquaculture & Pond",
    titleBn: "মৎস্য ও অ্যাকুয়াকালচার",
    subEn: "Pangas, Tilapia & Carp",
    subBn: "পাঙ্গাশ, তেলাপিয়া ও কার্প",
    icon: Fish,
    onlineCount: 18,
    color: "blue",
    cases: [
      {
        id: "oxygen_crash",
        labelEn: "Emergency DO Oxygen Crash",
        labelBn: "পুকুরে অক্সিজেনের ঘাটতি",
        subjectNameEn: "Intensive Pangas Pond",
        subjectNameBn: "নিবিড় পাঙ্গাশ চাষের পুকুর",
        varietyOrBreed: "Trishal, Mymensingh • 1.2 Acre",
        image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80",
        pathogen: "Severe Hypoxia (Dissolved O2 < 1.2 mg/L)",
        confidence: 98.1,
        severity: "Acute",
        voiceTranscriptEn: "All fish gasping at water surface at 5:00 AM after night rain.",
        voiceTranscriptBn: "ভোরবেলায় সব মাছ ভেসে খাবি খাচ্ছে এবং পানির ওপরে মুখ তুলে হাঁপাচ্ছে।",
        firstAidEn: "Start paddle aerators immediately; spray sodium percarbonate O2 tablets.",
        firstAidBn: "পুকুরে পানি ছিটানোর পাম্প চালু করুন এবং অক্সিজেন ট্যাবলেট পুরো পুকুরে ছিটিয়ে দিন।",
        rxFormulationEn: "Active Oxygen Tablet @ 250g/decimal + Zeolite 1kg/decimal",
        rxFormulationBn: "অক্সিজেন ট্যাবলেট শতকে ২৫০ গ্রাম + জিওলাইট শতকে ১ কেজি",
        withholdingEn: "Safe for Consumption (Zero Chemical Residue)",
        withholdingBn: "খাদ্য হিসেবে সম্পূর্ণ নিরাপদ ও কোনো ক্ষতিকর অবশিষ্টাংশ নেই",
        doctorExpertId: "exp-sarah-jenkins",
      },
    ],
  },
  pet: {
    titleEn: "Companion Pets",
    titleBn: "পোষা প্রাণী কেয়ার",
    subEn: "Cats, Dogs & Rabbits",
    subBn: "কুকুর, বিড়াল ও খরগোশ",
    icon: HeartHandshake,
    onlineCount: 20,
    color: "pink",
    cases: [
      {
        id: "dermatitis",
        labelEn: "Canine Allergic Dermatitis",
        labelBn: "কুকুর ও বিড়ালের চর্মরোগ",
        subjectNameEn: "Golden Retriever Companion",
        subjectNameBn: "গোল্ডেন রিট্রিভার পোষা কুকুর",
        varietyOrBreed: "Dhanmondi, Dhaka • 3 Years Old",
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
        pathogen: "Atopic Dermatitis & Malassezia Yeast",
        confidence: 97.4,
        severity: "Moderate",
        voiceTranscriptEn: "Severe paw chewing, red skin rashes, scratching ears constantly.",
        voiceTranscriptBn: "ঘন ঘন পা চাটা, পেটে লালচে ফুসকুড়ি ও রাতে ক্রমাগত শরীর চুলকানো।",
        firstAidEn: "Fit soft e-collar for 48 hours to prevent self-mutilation; cold cloth wipe.",
        firstAidBn: "চুলকানি বন্ধ রাখতে সফট ই-কলার পরিয়ে রাখুন এবং ভেজা নরম তোয়ালে দিয়ে গা মুছুন।",
        rxFormulationEn: "Oclacitinib 16mg Oral + Otic Antifungal Drops",
        rxFormulationBn: "ওক্লাসিটিনিব ১৬ মিলিগ্রাম ট্যাবলেট ও কান পরিষ্কারের ড্রপ",
        withholdingEn: "BVC Certified Veterinary Prescription Only",
        withholdingBn: "বিভিসি লাইসেন্সকৃত চিকিৎসকের প্রেসক্রিপশন ব্যতীত সেব্য নয়",
        doctorExpertId: "exp-dr-elena-rostova",
      },
    ],
  },
};

export function LiveClinicalTriageHero() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [activeSector, setActiveSector] = useState<SectorType>("agri");
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [isVoiceSimActive, setIsVoiceSimActive] = useState(false);
  const [isExpressModalOpen, setIsExpressModalOpen] = useState(false);
  const [customPhotoPreview, setCustomPhotoPreview] = useState<string | null>(null);

  const sector = SECTOR_CONFIG[activeSector];
  const activeCase = sector.cases[selectedCaseIndex] || sector.cases[0];

  // Resolve Doctor for this case
  const assignedDoctor: PlatformExpert =
    PLATFORM_EXPERTS.find((doc) => doc.id === activeCase.doctorExpertId) ||
    PLATFORM_EXPERTS[0];

  const handleSimulateCustomPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setCustomPhotoPreview(url);
    }
  };

  const handleToggleVoice = () => {
    setIsVoiceSimActive((prev) => !prev);
  };

  const activeDisplayImage = customPhotoPreview || activeCase.image;

  return (
    <>
      <section className="relative pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 overflow-hidden border-b border-white/[0.06]">
        {/* Cinematic Ambient Multi-Color Radial Atmospheric Lighting */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[600px] h-[320px] bg-emerald-500/12 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[550px] h-[300px] bg-cyan-500/12 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
          {/* 1. TOP HEADER: AUTHORITY PILL & EXECUTIVE HEADLINE */}
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {/* Live Accredited Presence Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold backdrop-blur-md shadow-lg shadow-emerald-500/10">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>
                {isBn
                  ? "১৪২ জন বিএআরআই, বিআরআরআই ও বিভিসি সার্টিফাইড বিশেষজ্ঞ লাইভ অন-ডিউটি"
                  : "142 CERTIFIED AGRONOMISTS & VETERINARY SURGEONS ON-CALL NOW"}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400 font-mono font-bold">
                {isBn ? "গড় সাড়া: ৪ মিনিট" : "Avg Wait: 4m"}
              </span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-tight">
              {isBn ? (
                <>
                  লক্ষণ দেখে তাত্ক্ষণিক রোগ নির্ণয় ও{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    ৬০ সেকেন্ডে সরাসরি ডাক্তার চেম্বার।
                  </span>
                </>
              ) : (
                <>
                  Instant AI Clinical Triage &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    60-Second Tele-Advisory Chamber.
                  </span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              {isBn
                ? "কোনো দীর্ঘ ফর্ম বা জটিলতা ছাড়া—আপনার আক্রান্ত ফসল, ডেইরি গাভী বা পোষা প্রাণীর লক্ষণ সিলেক্ট করুন। এআই তাৎক্ষণিক ফার্স্ট-এইড জানাবে এবং বিশেষজ্ঞ ডাক্তার কিউআর স্বাক্ষরিত প্রেসক্রিপশন দেবেন।"
                : "Zero friction, zero paperwork. Select your field symptom or speak in natural language. Get immediate emergency first-aid and connect with verified state council clinicians in under a minute."}
            </p>
          </div>

          {/* 2. THE 5-SECTOR INTERACTIVE COMMAND STRIP */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 px-1">
            {(
              [
                { id: "agri", config: SECTOR_CONFIG.agri },
                { id: "veterinary", config: SECTOR_CONFIG.veterinary },
                { id: "poultry", config: SECTOR_CONFIG.poultry },
                { id: "fisheries", config: SECTOR_CONFIG.fisheries },
                { id: "pet", config: SECTOR_CONFIG.pet },
              ] as const
            ).map(({ id, config }) => {
              const Icon = config.icon;
              const isActive = activeSector === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveSector(id);
                    setSelectedCaseIndex(0);
                    setCustomPhotoPreview(null);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? "bg-slate-900 border-emerald-400/80 text-white shadow-xl shadow-emerald-500/15 ring-1 ring-emerald-400/50 scale-[1.02]"
                      : "bg-slate-950/70 border-white/[0.08] text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <span
                    className={`p-1.5 rounded-xl ${
                      isActive
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-white/[0.04] text-slate-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="text-left">
                    <span className="block leading-tight font-black text-white text-xs">
                      {isBn ? config.titleBn : config.titleEn}
                    </span>
                    <span className="block text-[9px] text-emerald-400 font-mono">
                      ● {config.onlineCount} {isBn ? "অনলাইন" : "Doctors"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3. THE MAIN INTERACTIVE CLINICAL WORKBENCH */}
          <div className="srot-glass-card rounded-3xl border border-white/[0.1] bg-[#070d17]/95 shadow-2xl p-4 sm:p-6 lg:p-7 backdrop-blur-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* LEFT 5 COLS: COMPUTER VISION & VIEW FINDER HUD */}
              <div className="lg:col-span-5 space-y-3">
                {/* Viewfinder Frame */}
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-white/[0.1] bg-slate-950 shadow-inner group">
                  <img
                    src={activeDisplayImage}
                    alt={activeCase.subjectNameEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40 pointer-events-none" />

                  {/* Animated Laser Scanning Beam */}
                  <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scan-laser pointer-events-none" />

                  {/* AI Bounding Box Reticle */}
                  <div className="absolute top-[22%] left-[20%] w-36 h-24 border-2 border-emerald-400/90 rounded-xl pointer-events-none p-2 flex flex-col justify-between shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <div className="flex items-center justify-between">
                      <span className="px-1.5 py-0.5 rounded bg-black/80 text-[8px] font-mono font-bold text-emerald-400 border border-emerald-500/40">
                        {activeCase.confidence}% MATCH
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/90 text-white text-[8px] font-mono font-bold uppercase">
                        {activeCase.severity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[8px] font-mono text-slate-300">
                      <span>RESNET-50</span>
                      <span>FOV 1.4X</span>
                    </div>
                  </div>

                  {/* Top Subject Badge */}
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs text-white border border-white/15 flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-[11px]">
                      {isBn ? activeCase.subjectNameBn : activeCase.subjectNameEn}
                    </span>
                  </div>

                  {/* Bottom Variety / Region */}
                  <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-slate-300 border border-white/10 font-mono">
                    {activeCase.varietyOrBreed}
                  </div>
                </div>

                {/* Multimodal Photo Upload & Voice Controls Bar */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-slate-200 cursor-pointer transition font-bold">
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isBn ? "ক্যামেরা ছবি দিন" : "Upload Live Photo"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSimulateCustomPhoto}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border font-bold transition ${
                      isVoiceSimActive
                        ? "bg-rose-500/15 border-rose-500 text-rose-300 animate-pulse"
                        : "bg-slate-900 hover:bg-slate-800 border-white/[0.08] text-slate-200"
                    }`}
                  >
                    {isVoiceSimActive ? (
                      <>
                        <Mic className="w-3.5 h-3.5 text-rose-400 animate-ping" />
                        <span>{isBn ? "শুনছি..." : "Listening..."}</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isBn ? "ভয়েস বলুন" : "Voice Triage"}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Voice Audio Waveform Transcript Simulator */}
                {isVoiceSimActive && (
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-rose-500/30 space-y-1.5 animate-in fade-in duration-200 text-xs">
                    <div className="flex items-center justify-between text-[10px] text-rose-400 font-mono">
                      <span>VOICE TRANSCRIBING...</span>
                      <div className="flex items-center gap-0.5">
                        <span className="w-1 h-3 bg-rose-400 animate-pulse" />
                        <span className="w-1 h-4 bg-rose-400 animate-pulse delay-75" />
                        <span className="w-1 h-2 bg-rose-400 animate-pulse delay-150" />
                      </div>
                    </div>
                    <p className="text-[11px] text-white italic">
                      &quot;{isBn ? activeCase.voiceTranscriptBn : activeCase.voiceTranscriptEn}&quot;
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHT 7 COLS: CLINICAL DIAGNOSIS, FIRST-AID PROTOCOL & 1-CLICK PASS */}
              <div className="lg:col-span-7 space-y-4">
                {/* 1. Quick Symptom Switcher Chips */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {isBn ? "দ্রুত লক্ষণ নির্বাচন করুন (নমুনা কেস):" : "High-Frequency Field Symptoms:"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sector.cases.map((c, idx) => {
                      const isSelected = selectedCaseIndex === idx && !customPhotoPreview;
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSelectedCaseIndex(idx);
                            setCustomPhotoPreview(null);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black shadow-md shadow-emerald-500/20"
                              : "bg-slate-950 border border-white/[0.08] text-slate-300 hover:text-white"
                          }`}
                        >
                          <Activity className="w-3 h-3" />
                          <span>{isBn ? c.labelBn : c.labelEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Detected Pathogen & Severity Block */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.08] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                      <Scan className="w-3 h-3" />
                      <span>{isBn ? "চিহ্নিত রোগ ও প্যাথোজেন" : "Identified Pathogen / Condition"}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[10px] font-bold flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span>{activeCase.severity} Severity</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white">
                    {isBn ? activeCase.labelBn : activeCase.labelEn}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {activeCase.pathogen}
                  </p>
                </div>

                {/* 3. Emergency Immediate First-Aid Step */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{isBn ? "জরুরি তাৎক্ষণিক করণীয় (ফার্স্ট-এইড):" : "Immediate Field First-Aid:"}</span>
                  </span>
                  <p className="text-xs text-slate-200 font-medium">
                    {isBn ? activeCase.firstAidBn : activeCase.firstAidEn}
                  </p>
                </div>

                {/* 4. Active Specialist Doctor On-Duty Card */}
                <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-emerald-500/30 flex items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={assignedDoctor.avatar}
                        alt={assignedDoctor.name}
                        className="w-12 h-12 rounded-xl object-cover border border-emerald-400/50"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-white truncate">
                          {assignedDoctor.name}
                        </span>
                        <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{assignedDoctor.title}</p>
                      <p className="text-[10px] font-mono text-emerald-400 truncate">
                        {assignedDoctor.registrationNumber}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block">{isBn ? "অন-কল ফি" : "Advisory Fee"}</span>
                    <span className="text-sm font-mono font-black text-white">
                      ৳{assignedDoctor.feePerConsultation || 200}
                    </span>
                  </div>
                </div>

                {/* 5. THE HIGH-CONVERSION 1-CLICK ACTION ROW */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsExpressModalOpen(true)}
                    className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xl shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>
                      {isBn
                        ? `৬০ সেকেন্ডে ডাক্তারের সাথে কথা বলুন (৳${assignedDoctor.feePerConsultation || 200})`
                        : `Instant Consult with Doctor (৳${assignedDoctor.feePerConsultation || 200})`}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>

                  <Link
                    href={`/consult?category=${activeSector}&query=${encodeURIComponent(activeCase.labelEn)}`}
                    className="py-3 px-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/[0.1] text-xs font-bold text-center transition whitespace-nowrap"
                  >
                    {isBn ? "বিস্তারিত বুকিং" : "Detailed Flow"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Express Chamber Modal */}
      <ExpressChamberModal
        isOpen={isExpressModalOpen}
        onClose={() => setIsExpressModalOpen(false)}
        sampleData={{
          category: activeSector,
          subjectName: isBn ? activeCase.subjectNameBn : activeCase.subjectNameEn,
          symptomName: isBn ? activeCase.labelBn : activeCase.labelEn,
          pathogen: activeCase.pathogen,
          immediateAction: isBn ? activeCase.firstAidBn : activeCase.firstAidEn,
          withholding: isBn ? activeCase.withholdingBn : activeCase.withholdingEn,
          image: activeDisplayImage,
          doctor: assignedDoctor,
        }}
      />
    </>
  );
}
