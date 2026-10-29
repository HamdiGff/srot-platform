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
  ShieldCheck,
  Wheat,
  Milk,
  Egg,
  HeartHandshake,
  Upload,
  Activity,
  Layers,
  Clock,
  Flame,
  Radio,
} from "lucide-react";

interface DiagnosticSample {
  id: string;
  category: "agri" | "veterinary" | "poultry" | "pet";
  tabLabelEn: string;
  tabLabelBn: string;
  specimenNameEn: string;
  specimenNameBn: string;
  varietyOrBreed: string;
  image: string;
  pathogenScientific: string;
  pathogenCommonEn: string;
  pathogenCommonBn: string;
  confidence: number;
  severity: "High" | "Moderate" | "Controlled";
  observedSignsEn: string[];
  observedSignsBn: string[];
  protocolStepsEn: string[];
  protocolStepsBn: string[];
  recommendedRxEn: string;
  recommendedRxBn: string;
  withholdingSafetyEn: string;
  withholdingSafetyBn: string;
  doctor: {
    name: string;
    role: string;
    regNumber: string;
    council: string;
    avatar: string;
    fee: number;
    id: string;
  };
}

const DIAGNOSTIC_SAMPLES: DiagnosticSample[] = [
  {
    id: "sample-rice-blast",
    category: "agri",
    tabLabelEn: "Crop Leaf Blast",
    tabLabelBn: "ধানের পাতা ব্লাস্ট",
    specimenNameEn: "Boro Rice Foliar Blast",
    specimenNameBn: "বোরো ধানের পাতা ব্লাস্ট",
    varietyOrBreed: "BRRI Dhan-28 (দিনাজপুর সদর)",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=900&q=80",
    pathogenScientific: "Pyricularia oryzae (Magnaporthe oryzae)",
    pathogenCommonEn: "Foliar & Neck Blast Fungus",
    pathogenCommonBn: "ছত্রাকজনিত পাতা ও শীষ ব্লাস্ট",
    confidence: 98.6,
    severity: "High",
    observedSignsEn: [
      "Spindle diamond-shaped lesions with ash-gray center",
      "Necrotic brown borders spreading along parallel veins",
      "High humidity and nitrogen succulence triggering sporulation",
    ],
    observedSignsBn: [
      "পাতায় দুই প্রান্ত চোখা তেকোনা/মাকু আকৃতির ছাই রঙের দাগ",
      "দাগের চারপাশের কিনারা গাঢ় বাদামি হয়ে পাতাজুড়ে ছড়াচ্ছে",
      "ভোরের কুয়াশা ও উচ্চ আর্দ্রতায় ছত্রাকের দ্রুত বিস্তার",
    ],
    protocolStepsEn: [
      "Halt all urea top-dressing immediately to slow vegetative succulence.",
      "Maintain 3-5 cm standing water in paddy; do not let the field dry crack.",
      "Spray calibrated protectant triazole fungicide during late afternoon.",
    ],
    protocolStepsBn: [
      "জমিতে অতিরিক্ত ইউরিয়া সার প্রয়োগ অবিলম্বে বন্ধ রাখুন।",
      "ক্ষেতে ২-৩ ইঞ্চি পানি ধরে রাখুন যাতে ছত্রাকের বিস্তার রোধ হয়।",
      "পড়ন্ত বিকেলে ট্রাইসাইক্লাজল বা নাটিভো স্প্রে প্রয়োগ করুন।",
    ],
    recommendedRxEn: "Tricyclazole 75% WP @ 0.6g/L water (Foliar)",
    recommendedRxBn: "ট্রাইসাইক্লাজল ৭৫% ডব্লিউপি প্রতি লিটার পানিতে ০.৬ গ্রাম",
    withholdingSafetyEn: "21 Days Pre-Harvest Statutory Withdrawal Interval",
    withholdingSafetyBn: "ফসল কাটার ২১ দিন পূর্বে বালাইনাশক স্প্রে বন্ধ রাখুন",
    doctor: {
      name: "Dr. S. M. Tanvir Ahmed, Ph.D.",
      role: "Chief Plant Pathologist & Rice IPM Specialist",
      regNumber: "DAE-AGR-2015-8891",
      council: "Department of Agricultural Extension",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      fee: 200,
      id: "exp-dr-ramesh-patel",
    },
  },
  {
    id: "sample-bovine-mastitis",
    category: "veterinary",
    tabLabelEn: "Dairy Mastitis",
    tabLabelBn: "ডেইরি ওলান পাকা",
    specimenNameEn: "Acute Bovine Mastitis",
    specimenNameBn: "গাভীর তীব্র ওলান পাকা রোগ",
    varietyOrBreed: "Holstein Friesian Cross (বাঘাবাড়ী ডেইরি বেল্ট)",
    image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=900&q=80",
    pathogenScientific: "Streptococcus uberis / S. aureus",
    pathogenCommonEn: "Environmental Bacterial Teat Infection",
    pathogenCommonBn: "পরিবেশগত ব্যাকটেরিয়াজনিত ওলান প্রদাহ",
    confidence: 97.4,
    severity: "High",
    observedSignsEn: [
      "Swollen, erythematous, hot right hind udder quarter",
      "Milk flakes and yellowish serous clots on strip cup paddle",
      "Somatic cell count >750,000 cells/ml with systemic fever (103.4°F)",
    ],
    observedSignsBn: [
      "ডান পেছনের ওলান অস্বাভাবিক ফুলে গেছে এবং স্পর্শে অত্যন্ত গরম",
      "দুধে ছানার মতো থোকা থোকা রক্তাভ ও হলুদাভ জমাট পদার্থ",
      "সোমাটিক সেল কাউন্ট প্রতি মিলিলিটারে ৭.৫ লাখ ও গাভীর জ্বর",
    ],
    protocolStepsEn: [
      "Completely strip out the affected quarter every 3 hours to evacuate toxins.",
      "Apply cold hydrotherapy compress for 15 minutes prior to milking.",
      "Strictly discard all milk into sanitary disposal pit — never feed calves.",
    ],
    protocolStepsBn: [
      "প্রতি ৩ ঘণ্টা পর পর আক্রান্ত বাঁট থেকে সম্পূর্ণ দুধ টেনে ফেলে দিন।",
      "দোহনের পূর্বে ওলানে ১৫ মিনিট ঠান্ডা পানির সেঁক দিন।",
      "এই দুধ সম্পূর্ণ মাটিতে পুঁতে ফেলুন; বাছুরকে কোনোভাবেই খাওয়াবেন না।",
    ],
    recommendedRxEn: "Ceftiofur Sodium 1g IM + Intramammary Infusion",
    recommendedRxBn: "সেফটিওফার সোডিয়াম ১ গ্রাম ইনজেকশন + ইন্ট্রাম্যামারি টিউব",
    withholdingSafetyEn: "Strict Milk Withholding: 72 Hours (3 Days) • Meat: 4 Days",
    withholdingSafetyBn: "শেষ ইনজেকশনের পর ৭২ ঘণ্টা দুধ বাজারে বিক্রি সম্পূর্ণ নিষিদ্ধ",
    doctor: {
      name: "Dr. Mahfuzur Rahman, M.V.Sc.",
      role: "Senior Veterinary Surgeon & Bovine Specialist",
      regNumber: "BVC-VET-2014-7714",
      council: "Bangladesh Veterinary Council",
      avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=200&q=80",
      fee: 300,
      id: "exp-dr-ananya-sen",
    },
  },
  {
    id: "sample-poultry-coccidiosis",
    category: "poultry",
    tabLabelEn: "Poultry Flocks",
    tabLabelBn: "পোল্ট্রি ফ্লক আমাশয়",
    specimenNameEn: "Caecal Coccidiosis Outbreak",
    specimenNameBn: "ব্রয়লার কক্সিডিওসিস রক্ত আমাশয়",
    varietyOrBreed: "Cobb-500 Broiler Flock (শ্রীপুর, গাজীপুর)",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=80",
    pathogenScientific: "Eimeria tenella (Protozoan parasite)",
    pathogenCommonEn: "Caecal Intestinal Coccidiosis",
    pathogenCommonBn: "অন্ত্রের প্রোটোজোয়া রক্ত আমাশয়",
    confidence: 96.8,
    severity: "High",
    observedSignsEn: [
      "Blood-tinged mucoid droppings and ruffled feathers",
      "Spike in morning mortality (22 birds lost in 3,500 flock)",
      "Huddling under brooding heat lamps with pale combs",
    ],
    observedSignsBn: [
      "পায়খানার সাথে রক্ত ও আমাশয়ের স্পষ্ট লক্ষণ এবং ডানা ঝোলানো",
      "সকালে হঠাৎ মৃত্যুহার বৃদ্ধি (৩,৫০০ মুরগির শেডে ২২টি মৃত্যু)",
      "পাখির রক্তস্বল্পতায় ফ্যাকাশে ঝুঁটি ও ব্রুডারের নিচে দলা পাকানো",
    ],
    protocolStepsEn: [
      "Remove all damp, caked litter around drinker lines immediately.",
      "Add water-soluble Toltrazuril 2.5% for 48 continuous hours.",
      "Administer Vitamin K3 to halt intestinal hemorrhaging.",
    ],
    protocolStepsBn: [
      "পানির পাত্রের চারপাশের ভেজা লিটার অবিলম্বে অপসারণ করে শুকনা তুষ দিন।",
      "খাবারের পানিতে টোল্ট্রাজুরিল ২.৫% টানা ৪৮ ঘণ্টা প্রয়োগ করুন।",
      "রক্তক্ষরণ বন্ধে পানিতে ভিটামিন কে৩ ও ইলেকট্রোলাইট সরবরাহ করুন।",
    ],
    recommendedRxEn: "Toltrazuril 2.5% Oral Solution @ 1ml/L drinking water",
    recommendedRxBn: "টোল্ট্রাজুরিল ২.৫% প্রতি লিটার পানিতে ১ মিলি হারে ৪৮ ঘণ্টা",
    withholdingSafetyEn: "Statutory Meat Withholding: 14 Days Prior to Slaughter",
    withholdingSafetyBn: "মুরগি বিক্রির ১৪ দিন পূর্বে ওষুধ প্রয়োগ বন্ধ রাখুন",
    doctor: {
      name: "Dr. Tariqul Hasan, D.V.M., Ph.D.",
      role: "Commercial Avian Epidemiologist & Biosecurity Consultant",
      regNumber: "BVC-PLT-2015-1092",
      council: "Bangladesh Veterinary Council",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
      fee: 250,
      id: "exp-dr-tariq-mansoor",
    },
  },
  {
    id: "sample-pet-dermatitis",
    category: "pet",
    tabLabelEn: "Companion Pets",
    tabLabelBn: "পোষা প্রাণী চর্মরোগ",
    specimenNameEn: "Canine Allergic Dermatitis",
    specimenNameBn: "কুকুর ও বিড়ালের অ্যালার্জিক চর্মরোগ",
    varietyOrBreed: "Golden Retriever (ধানমন্ডি, ঢাকা)",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80",
    pathogenScientific: "Atopic Dermatitis & Malassezia pachydermatis",
    pathogenCommonEn: "Allergic Pruritus with Secondary Yeast Flare",
    pathogenCommonBn: "পরাগরেণু এলার্জি ও ত্বক প্রদাহ",
    confidence: 97.9,
    severity: "Moderate",
    observedSignsEn: [
      "Intense bilateral pododermatitis (paw licking) & erythema",
      "Secondary yeast colonization in ear canals with scratching",
      "Alopecia and excoriation around ventral abdomen",
    ],
    observedSignsBn: [
      "ঘন ঘন পা চাটা, লালচে ফুসকুড়ি ও রাতে ক্রমাগত শরীর চুলকানো",
      "কানের ভেতরে চুলকানি ও বাদামি খৈলস জমাট বাঁধা",
      "পেটের নিচের অংশে লোম উঠে ত্বক শুষ্ক ও খসখসে হওয়া",
    ],
    protocolStepsEn: [
      "Wipe paws and lower abdomen with damp washcloth after outdoor walks.",
      "Fit soft Elizabethan cone collar for 48 hours to halt self-trauma.",
      "Administer weight-titrated Janus kinase (JAK) inhibitor with food.",
    ],
    protocolStepsBn: [
      "বাইরে থেকে আসার পর ভেজা নরম তোয়ালে দিয়ে পা ও পেট মুছে দিন।",
      "চুলকানি বন্ধ রাখতে ৪৮ ঘণ্টা সফট ই-কলার পরিয়ে রাখুন।",
      "ওজন অনুযায়ী নির্ধারিত এন্টি-অ্যালার্জি ওষুধ খাবারের সাথে দিন।",
    ],
    recommendedRxEn: "Oclacitinib (Apoquel) 16mg + Otic Antifungal Drops",
    recommendedRxBn: "ওক্লাসিটিনিব (অ্যাপোকুয়েল) ১৬ মিলিগ্রাম ও কান পরিষ্কারের ড্রপ",
    withholdingSafetyEn: "Prescription Only (BVC Verified Veterinary Formulation)",
    withholdingSafetyBn: "শুধুমাত্র প্রেসক্রিপশন অনুযায়ী চিকিৎসকের তত্ত্বাবধানে সেব্য",
    doctor: {
      name: "Dr. Nusrat Jahan, D.V.M.",
      role: "Small Animal Clinician & Pet Tele-Health Director",
      regNumber: "BVC-PET-2018-9104",
      council: "Bangladesh Veterinary Council",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
      fee: 300,
      id: "exp-dr-elena-rostova",
    },
  },
];

export function AiSymptomScanner() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [activeSampleId, setActiveSampleId] = useState<string>("sample-rice-blast");
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [isScanningActive, setIsScanningActive] = useState<boolean>(true);

  const currentSample =
    DIAGNOSTIC_SAMPLES.find((s) => s.id === activeSampleId) || DIAGNOSTIC_SAMPLES[0];

  const handleSimulateCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setUploadedPreview(url);
      setIsScanningActive(true);
    }
  };

  const activeImage = uploadedPreview || currentSample.image;

  return (
    <div className="w-full space-y-5">
      {/* 1. SCANNER SUBHEADER & SPECIMEN SELECTOR BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
              {isBn ? "লাইভ এআই ভিশন প্যাথোলজি স্ক্যানার" : "Live AI Vision Pathology Scanner"}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
              v3.5 Live
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn
              ? "মাঠ ও খামারের রোগ শনাক্তকরণ এবং ডিজিটাল প্রেসক্রিপশন তৈরির জন্য নমুনা নির্বাচন করুন।"
              : "Switch between real field samples below to test automated vision detection and verified prescription generation."}
          </p>
        </div>

        {/* Specimen Category Selectors & Upload */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/70 border border-white/[0.06] overflow-x-auto">
            {DIAGNOSTIC_SAMPLES.map((sample) => {
              const isSelected = sample.id === currentSample.id && !uploadedPreview;
              return (
                <button
                  key={sample.id}
                  onClick={() => {
                    setUploadedPreview(null);
                    setActiveSampleId(sample.id);
                    setIsScanningActive(true);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-black"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  {sample.category === "agri" ? (
                    <Wheat className="w-3.5 h-3.5" />
                  ) : sample.category === "veterinary" ? (
                    <Milk className="w-3.5 h-3.5" />
                  ) : sample.category === "poultry" ? (
                    <Egg className="w-3.5 h-3.5" />
                  ) : (
                    <HeartHandshake className="w-3.5 h-3.5" />
                  )}
                  <span>{isBn ? sample.tabLabelBn : sample.tabLabelEn}</span>
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold cursor-pointer transition shrink-0">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isBn ? "ছবি স্ক্যান করুন" : "Upload Live Photo"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleSimulateCustomUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN CLINICAL DIAGNOSTIC WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT 5 COLS: COMPUTER VISION VIEWFINDER HUD */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/[0.1] bg-slate-950 shadow-xl group">
          {/* Main Visual Frame */}
          <div className="relative h-72 sm:h-80 w-full overflow-hidden">
            <img
              src={activeImage}
              alt={currentSample.specimenNameEn}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />

            {/* High-Tech Laser Scan Line Animation */}
            {isScanningActive && (
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse pointer-events-none" />
            )}

            {/* AI Bounding Crosshair Target */}
            <div className="absolute inset-10 border-2 border-emerald-400/80 rounded-2xl pointer-events-none flex flex-col justify-between p-2.5 backdrop-blur-[0.5px]">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                  <Scan className="w-3 h-3" />
                  <span>{currentSample.confidence}% AI MATCH</span>
                </span>

                <span className="px-2 py-0.5 rounded-md bg-red-500/80 text-white font-mono font-bold text-[9px] uppercase tracking-wider">
                  {currentSample.severity}
                </span>
              </div>

              {/* Bounding box target corners */}
              <div className="flex items-end justify-between">
                <span className="text-[9px] font-mono text-slate-300 bg-black/80 px-2 py-0.5 rounded border border-white/10">
                  FOV: MACRO LENS 1.4x
                </span>
                <span className="text-[9px] font-mono text-emerald-300 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  RESNET-50 AGRO
                </span>
              </div>
            </div>

            {/* Specimen Variety Header Pill */}
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl text-xs text-white border border-white/15 flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">{currentSample.varietyOrBreed}</span>
            </div>
          </div>

          {/* Under-Image Metadata Strip */}
          <div className="p-3 bg-slate-900/90 border-t border-white/[0.08] flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isBn ? "কাউন্সিল ভেরিফাইড ডাটাবেস" : "BVC & DAE Ground Truth Model"}</span>
            </span>

            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              TAMPER-PROOF QR
            </span>
          </div>
        </div>

        {/* RIGHT 7 COLS: EXECUTIVE CLINICAL PATHOLOGY DOSSIER */}
        <div className="lg:col-span-7 srot-glass-card rounded-2xl p-5 sm:p-6 border border-white/[0.08] space-y-4 bg-gradient-to-br from-slate-900/90 via-[#060c14] to-slate-950">
          {/* Pathogen Identification Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>{isBn ? "চিহ্নিত রোগজীবাণু ও প্যাথোজেন" : "Primary Identified Pathogen"}</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {isBn ? currentSample.specimenNameBn : currentSample.specimenNameEn}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {currentSample.pathogenScientific} • ({isBn ? currentSample.pathogenCommonBn : currentSample.pathogenCommonEn})
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-[11px] font-bold flex items-center gap-1">
                <Flame className="w-3 h-3" />
                <span>{currentSample.severity} Severity</span>
              </span>
            </div>
          </div>

          {/* 2-Column Clinical Manifestations & Protocol */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Column A: Observed Manifestations */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.05] space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? "দৃষ্ট ক্লিনিকাল আলামতসমূহ:" : "Observed Clinical Signs:"}</span>
              </h4>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                {(isBn ? currentSample.observedSignsBn : currentSample.observedSignsEn).map((sign, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column B: Immediate Field Protocol */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.05] space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isBn ? "জরুরি মাঠ প্রোটোকল:" : "Immediate Mitigation:"}</span>
              </h4>
              <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                {(isBn ? currentSample.protocolStepsBn : currentSample.protocolStepsEn).map((step, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-[9px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Prescribed Formulation & Withholding Safety */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/30 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs overflow-hidden">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                {isBn ? "প্রস্তাবিত স্প্রে / চিকিৎসা ফর্মুলেশন:" : "Calibrated Chemical / Medical Formulation:"}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block truncate">
                {isBn ? currentSample.recommendedRxBn : currentSample.recommendedRxEn}
              </span>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-[10px] text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-md font-semibold block sm:inline-block whitespace-nowrap">
                ⚠️ {isBn ? currentSample.withholdingSafetyBn : currentSample.withholdingSafetyEn}
              </span>
            </div>
          </div>

          {/* Attending Verified Doctor & One-Click Consult Bar */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden">
            <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
              <img
                src={currentSample.doctor.avatar}
                alt={currentSample.doctor.name}
                className="w-10 h-10 rounded-xl object-cover border border-emerald-400/40 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs font-bold text-white truncate">{currentSample.doctor.name}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 truncate">{currentSample.doctor.role}</p>
                <p className="text-[10px] text-emerald-400 font-mono truncate">
                  {currentSample.doctor.council} • {currentSample.doctor.regNumber}
                </p>
              </div>
            </div>

            <Link
              href={`/consult?expert=${currentSample.doctor.id}&category=${currentSample.category}`}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition shadow-md shadow-emerald-500/20 shrink-0 whitespace-nowrap self-stretch sm:self-auto"
            >
              <span>{isBn ? `পরামর্শ নিন (৳${currentSample.doctor.fee})` : `Consult (৳${currentSample.doctor.fee})`}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
