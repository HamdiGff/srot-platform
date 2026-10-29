"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PLATFORM_EXPERTS } from "@/data/mockExperts";
import { INITIAL_CONSULTATIONS } from "@/data/mockConsultations";
import { useUserStore } from "@/lib/store/userStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import { formatCurrency } from "@/lib/utils";

// Feature Components
import { OutbreakAlertBanner } from "@/components/features/OutbreakAlertBanner";
import { HeroVisualGraphic } from "@/components/features/HeroVisualGraphic";
import { AccreditationBadges } from "@/components/features/AccreditationBadges";
import { AiSymptomScanner } from "@/components/features/AiSymptomScanner";
import { AgroWeatherRadar } from "@/components/features/AgroWeatherRadar";
import { SoilHealthInterpreter } from "@/components/features/SoilHealthInterpreter";
import { CropLivestockCalendar } from "@/components/features/CropLivestockCalendar";
import { FarmHealthPackages } from "@/components/features/FarmHealthPackages";
import { VerifiedTestimonials } from "@/components/features/VerifiedTestimonials";
import { DosageCalculatorModal } from "@/components/features/DosageCalculatorModal";

import {
  Wheat,
  Milk,
  HeartHandshake,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileCheck2,
  Clock,
  Download,
  Stethoscope,
  Video,
  Camera,
  Search,
  ChevronDown,
  PhoneCall,
  Calculator,
  Activity,
  Scan,
  FlaskConical,
  CloudSun,
  Truck,
  Check,
  ChevronRight,
  FileText,
  BadgeCheck,
  Lock,
  Layers,
} from "lucide-react";

export default function HomePage() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const { openRoleModal, currentUser } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [activeSuiteTab, setActiveSuiteTab] = useState<"ai_scan" | "weather" | "soil" | "calendar">("ai_scan");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick Triage Search Suggestions
  const quickSearchChips = [
    { label: isBn ? "ধানের ব্লাস্ট রোগ" : "Rice Leaf Blast", category: "agri", query: "blast" },
    { label: isBn ? "গাভীর ওলান পাকা (Mastitis)" : "Bovine Mastitis", category: "veterinary", query: "mastitis" },
    { label: isBn ? "কুকুর/বিড়ালের অ্যালার্জি" : "Pet Skin Allergy", category: "pet", query: "allergy" },
    { label: isBn ? "মাটির পিএইচ ও সার" : "Soil NPK Balance", category: "agri", query: "soil" },
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: isBn
        ? "এসআরওটি (SROT) এর ডিজিটাল প্রেসক্রিপশন স্থানীয় ফার্মেসিতে গ্রহণযোগ্য কি না?"
        : "Is SROT's digital prescription legally accepted at local agro-chemical dealers and pharmacies?",
      a: isBn
        ? "হ্যাঁ, সম্পূর্ণ বৈধ। আমাদের প্রতিটি প্রেসক্রিপশনে বাংলাদেশ ভেটেরিনারি কাউন্সিল (BVC) অথবা কৃষি সম্প্রসারণ অধিদপ্তর (DAE) এর নিবন্ধিত বিশেষজ্ঞ চিকিৎসকের নাম, সরকারি রেজিস্ট্রেশন নম্বর এবং ভেরিফিকেশন কিউআর কোড থাকে। ফার্মেসি যেকোনো স্মার্টফোন দিয়ে কিউআর স্ক্যান করে তাৎক্ষণিক অনুমোদন যাচাই করতে পারে।"
        : "Yes, 100% accepted. Every prescription issued through SROT carries the clinician's verifiable state registration number (BVC / DAE), license seal, and a tamper-proof QR code that any local retailer or pharmacy can scan to verify authenticity.",
    },
    {
      q: isBn
        ? "পরামর্শ ফি কীভাবে পরিশোধ করব? বিকাশ ও নগদ কি চালু আছে?"
        : "How do I pay consultation fees? Are bKash and Nagad supported?",
      a: isBn
        ? "খুব সহজেই বিকাশ, নগদ ও রকেটের মাধ্যমে মাত্র কয়েক সেকেন্ডে ফি পরিশোধ করা যায়। পেমেন্ট সম্পন্ন হওয়ামাত্রই আপনার নামে সুরক্ষিত ডিজিটাল মানি রসিদ ও লাইভ কনসালটেশন চেম্বার পাস তৈরি হয়।"
        : "Payment is seamless via bKash, Nagad, and Rocket mobile wallets. An official cash memo and secure consultation room token are generated immediately upon checkout.",
    },
    {
      q: isBn
        ? "গ্রামাঞ্চলে দুর্বল ইন্টারনেটে ভিডিও বা অডিও কল কি সঠিকভাবে চলবে?"
        : "How does tele-advisory perform in rural areas with low-bandwidth 3G or 4G connections?",
      a: isBn
        ? "আমাদের ইঞ্জিনটি বাংলাদেশের প্রত্যন্ত চরাঞ্চল ও গ্রামাঞ্চলের কথা মাথায় রেখে লো-ব্যান্ডউইথ অপটিমাইজড। যদি ইন্টারনেট অতিরিক্ত ধীরগতির হয়, প্ল্যাটফর্মটি স্বয়ংক্রিয়ভাবে হাই-রেজোলিউশন ফটো ট্রায়াজ এবং সিকিউর ভয়েস নোটে সুইচ করে।"
        : "SROT's WebRTC tele-health core is tuned specifically for rural Bangladesh bandwidth constraints. If a video signal drops, it automatically degrades smoothly to crystal-clear VoIP audio and high-resolution photo triage.",
    },
    {
      q: isBn
        ? "উইথহোল্ডিং বা নিরাপদ প্রত্যাহার সময়সীমা কী এবং এটি কেন গুরুত্বপূর্ণ?"
        : "What is the mandatory withholding period (withdrawal interval) on prescriptions?",
      a: isBn
        ? "এটি অত্যন্ত গুরুত্বপূর্ণ খাদ্য নিরাপত্তা বিধি। কোনো গাভীকে অ্যান্টিবায়োটিক দেওয়া হলে কত ঘণ্টা দুধ বিক্রি করা যাবে না (যেমন: ৭২ ঘণ্টা), কিংবা ধানে কীটনাশক স্প্রে করার পর কতদিন ফসল তোলা যাবে না—তা প্রেসক্রিপশনে স্পষ্টভাবে উল্লেখ থাকে। এটি ভোক্তাদের ক্যান্সার ও অ্যান্টিবায়োটিক রেজিস্ট্যান্স থেকে রক্ষা করে।"
        : "A withholding period is the statutory interval required between administering a chemical spray or antibiotic and harvesting crops or consuming milk/meat. SROT strictly enforces this to prevent hazardous pesticide and antimicrobial residues in Bangladesh's food supply.",
    },
    {
      q: isBn
        ? "যদি মাঠে বা খামারে সরাসরি ডাক্তারের উপস্থিতি প্রয়োজন হয়?"
        : "What if my emergency requires an on-site doorstep farm visit?",
      a: isBn
        ? "আমাদের 'মাঠ সেবা ও অন-সাইট ভিজিট' মডিউলটির মাধ্যমে জরুরি ভেটেরিনারি সার্জারি, উন্নত জাতের কৃত্রিম প্রজনন (AI) এবং মাটির কোর নিউট্রিয়েন্ট টেস্টের জন্য স্থানীয় সার্টিফাইড টেকনিশিয়ানকে সরাসরি আপনার খামার গেটে কল করতে পারেন।"
        : "Through our Field Services module (/services/field-visits), you can dispatch licensed paravets and agronomists directly to your farm for emergency dystocia, pedigree Artificial Insemination (AI), and mobile soil lab audits within 2-4 hours.",
    },
  ];

  return (
    <div className="w-full bg-[#05080e] text-slate-100 srot-grid-pattern pb-24 selection:bg-emerald-500 selection:text-black">
      {/* 1. Live Regional Pest & Disease Outbreak Warning Ticker */}
      <OutbreakAlertBanner />

      {/* ========================================================================= */}
      {/* 2. HERO SECTION: CLEAN, IMPACTFUL & EXECUTIVE-GRADE DESIGN */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-white/[0.06]">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 Cols: Executive Headline, Value Proposition & Launchpad */}
            <div className="lg:col-span-7 space-y-7">
              {/* Trust & Council Accreditation Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
                <span className="flex h-2.5 w-2.5 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span>
                  {isBn
                    ? "বিআরআরআই, বিএআরআই ও বিভিসি কাউন্সিল-অনুমোদিত টেলি-স্বাস্থ্য প্ল্যাটফর্ম"
                    : "ACCREDITED PRECISION TELE-HEALTH • BVC & DAE APPROVED"}
                </span>
              </div>

              {/* Bold Executive Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                {isBn ? (
                  <>
                    মাঠের ফসল, ডেইরি খামার ও পোষা প্রাণীর আধুনিক স্বাস্থ্যসেবা এবং{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                      ডিজিটাল প্রেসক্রিপশন।
                    </span>
                  </>
                ) : (
                  <>
                    Next-Gen Tele-Advisory & Certified Digital Rx for Every{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                      Crop, Herd & Companion Animal.
                    </span>
                  </>
                )}
              </h1>

              {/* Refined Sub-headline */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {isBn
                  ? "ধানের ব্লাস্ট বা ক্ষতিকর পোকা, ডেইরি গাভীর ওলান পাকা (Mastitis) কিংবা পোষা বিড়াল ও কুকুরের অসুস্থতায় ১৫ মিনিটে লাইভ ভিডিও ও ফটোতে সার্টিফাইড বিশেষজ্ঞ পরামর্শ এবং কিউআর সিলযুক্ত ডিজিটাল প্রেসক্রিপশন গ্রহণ করুন।"
                  : "Connect with certified plant pathologists, bovine veterinarians, and small animal clinicians in under 15 minutes. Receive real-time AI visual triage, live tele-consultation, and tamper-proof official digital prescriptions with statutory withholding safety intervals."}
              </p>

              {/* UNIFIED FAST-ACTION SEARCH & TRIAGE BAR */}
              <div className="p-2.5 rounded-2xl bg-slate-900/90 border border-white/[0.12] shadow-2xl backdrop-blur-2xl space-y-2.5 focus-within:border-emerald-500/50 transition-colors">
                <div className="flex items-center gap-2 px-3.5 py-1 bg-slate-950/80 rounded-xl border border-white/[0.06]">
                  <Search className="w-4 h-4 text-emerald-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isBn
                        ? "ফসলের রোগ, গরুর লক্ষণ, পোষা প্রাণীর সমস্যা বা ডাক্তার খুঁজুন..."
                        : "Search crop pest, bovine symptom, pet query, or specialist doctor..."
                    }
                    className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none py-2 font-medium"
                  />
                  <Link
                    href={`/consult${searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : ""}`}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shrink-0 shadow-md shadow-emerald-950/60"
                  >
                    {isBn ? "পরামর্শ নিন" : "Start Triage"}
                  </Link>
                </div>

                {/* Quick Suggestion Chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 px-1 text-[11px]">
                  <span className="text-slate-400 font-semibold shrink-0">
                    {isBn ? "জনপ্রিয় ট্রায়াজ:" : "Quick Triage:"}
                  </span>
                  {quickSearchChips.map((chip, i) => (
                    <Link
                      key={i}
                      href={`/consult?category=${chip.category}&query=${chip.query}`}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-emerald-500/10 hover:text-emerald-300 text-slate-300 border border-white/[0.06] transition whitespace-nowrap"
                    >
                      {chip.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Fast CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/consult"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm transition shadow-xl shadow-emerald-500/25 hover:-translate-y-0.5"
                >
                  <CalendarCheck className="w-4 h-4 text-slate-950" />
                  <span>{isBn ? "ডাক্তারের পরামর্শ শুরু করুন" : "Book Doctor Consultation"}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </Link>

                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold text-xs sm:text-sm transition hover:-translate-y-0.5"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{isBn ? "ডোজ ক্যালকুলেটর" : "Dosage Calculator"}</span>
                </button>

                <Link
                  href="/farmer-portal#packages"
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] font-bold text-xs sm:text-sm transition"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{isBn ? "খামার প্যাকেজ (৳১৯৯)" : "Care Packages (৳199)"}</span>
                </Link>
              </div>

              {/* Trust Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/[0.08]">
                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/[0.04]">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono block">১৪০+</span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isBn ? "কাউন্সিল সার্জন ও কৃষিবিদ" : "Licensed Specialists"}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/[0.04]">
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block">&lt; ১৫ মিনিট</span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isBn ? "গড় সাড়া প্রদানের সময়" : "Avg Response Time"}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/[0.04]">
                  <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono block">৳১৯৯</span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isBn ? "মাসিক কেয়ার শুরু" : "Starting Monthly Care"}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/[0.04]">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono block">১০০%</span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isBn ? "যাচাইকৃত প্রেসক্রিপশন" : "Verifiable Digital Rx"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: High-Tech Diagnostic Telemetry Terminal */}
            <div className="lg:col-span-5 relative">
              <HeroVisualGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CERTIFIED ACCREDITATIONS & SECURITY RIBBON */}
      {/* ========================================================================= */}
      <AccreditationBadges />

      {/* ========================================================================= */}
      {/* 4. THE 3 SPECIALIZED PILLARS: CROPS, LIVESTOCK & PETS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>{isBn ? "বিশেষায়িত সেবা খাতসমূহ" : "Specialized Care Sectors"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {isBn ? "আপনার প্রয়োজনীয় সেবাটি নির্বাচন করুন" : "Dedicated Health Desks for Every Domain"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isBn
              ? "মাঠের ফসল, ডেইরি গাভী কিংবা ঘরের পোষা প্রাণী—প্রত্যেকটির জন্য রয়েছে আলাদা প্রটোকল, বিশেষজ্ঞ ডিরেক্টরি এবং সঠিক মাত্রার প্রেসক্রিপশন।"
              : "Standardized clinical protocols, certified expert panels, and weight-calibrated medicine for agriculture, herds, and pets."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Crop Health & Agronomy */}
          <div className="srot-glass-card rounded-3xl p-7 border border-emerald-500/30 flex flex-col justify-between hover-glow-emerald transition-all duration-300 group hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Wheat className="w-7 h-7" />
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {isBn ? "ফসল সুরক্ষা" : "Agronomy Desk"}
                </span>
              </div>

              <h3 className="font-black text-white text-xl group-hover:text-emerald-300 transition-colors">
                {isBn ? "মাঠফসল ও কৃষি পরামর্শ" : "Crop Disease & Agronomy"}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {isBn
                  ? "ধান, গম, ভুট্টা, আলু, সবজি ও ফলের ক্ষতিকর বালাই ও সার ব্যবস্থাপনা।"
                  : "Paddy rice, maize, potatoes, vegetables, and commercial fruit orchards."}
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{isBn ? "ধানের ব্লাস্ট, পাতা পোড়া ও শেকড় পচা রোগ নির্ণয়" : "Leaf Blast, Sheath Blight & Stem Borer Triage"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{isBn ? "ইউরিয়া, টিএসপি, পটাশ ও জিংক সুষম সার শিডিউল" : "Precision N-P-K & Zinc Micro-nutrient Titration"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{isBn ? "আইপিএম (IPM) জৈব বালাই দমন ও বালাইনাশক সতর্কতা" : "IPM Biological Controls & Resistance Prevention"}</span>
                </li>
              </ul>
            </div>

            <Link
              href="/consult?category=agri"
              className="mt-8 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-emerald-500/20 group-hover:border-emerald-500"
            >
              <span>{isBn ? "কৃষি বিশেষজ্ঞের পরামর্শ নিন" : "Consult Agronomist"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2: Dairy, Cattle & Livestock */}
          <div className="srot-glass-card rounded-3xl p-7 border border-cyan-500/30 flex flex-col justify-between hover-glow-cyan transition-all duration-300 group hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                  <Milk className="w-7 h-7" />
                </span>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  {isBn ? "ডেইরি ও গবাদিপশু" : "Livestock Desk"}
                </span>
              </div>

              <h3 className="font-black text-white text-xl group-hover:text-cyan-300 transition-colors">
                {isBn ? "ডেইরি, খামার ও ভেটেরিনারি কেয়ার" : "Dairy & Livestock Healthcare"}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {isBn
                  ? "গাভী, মহিষ, ছাগল ও ভেড়ার ক্লিনিকাল রোগব্যাধি ও কৃত্রিম প্রজনন (AI)।"
                  : "Commercial dairy cattle, buffalo, Boer goats, and sheep breeding herds."}
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{isBn ? "গাভীর ওলান পাকা (Mastitis) সিএমটি টেস্ট ও চিকিৎসাপত্র" : "Subclinical Mastitis CMT Scoring & Antibiotic Dosing"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{isBn ? "দুধ ও মাংসে নিরাপদ অ্যান্টিবায়োটিক উইথহোল্ডিং সময়" : "Strict Milk & Meat Withdrawal Period Calculations"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{isBn ? "উন্নত জাতের কৃত্রিম প্রজনন (AI) ও ডোরস্টেপ ভিজিট" : "Pedigree Artificial Insemination (AI) Doorstep Support"}</span>
                </li>
              </ul>
            </div>

            <Link
              href="/consult?category=veterinary"
              className="mt-8 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-cyan-500/20 group-hover:border-cyan-500"
            >
              <span>{isBn ? "পশু চিকিৎসকের পরামর্শ নিন" : "Consult Bovine Vet"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3: Companion Pet Care */}
          <div className="srot-glass-card rounded-3xl p-7 border border-pink-500/30 flex flex-col justify-between hover-glow-amber transition-all duration-300 group hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="p-3.5 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:scale-110 transition-transform">
                  <HeartHandshake className="w-7 h-7" />
                </span>
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                  {isBn ? "পোষা প্রাণী" : "Companion Pets"}
                </span>
              </div>

              <h3 className="font-black text-white text-xl group-hover:text-pink-300 transition-colors">
                {isBn ? "পোষা প্রাণী স্বাস্থ্যসেবা (পেট কেয়ার)" : "Companion Pet Tele-Vet"}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {isBn
                  ? "কুকুর, বিড়াল, খরগোশ ও পাখির জন্য ২৪/৭ লাইভ ভিডিও ও ডার্মাটোলজি।"
                  : "Dogs, cats, rabbits, and birds with 24/7 tele-triage and diet planning."}
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>{isBn ? "২৪/৭ লাইভ ভিডিওতে স্মল-অ্যানিমেল ভেটেরিনারি সার্জন" : "24/7 Small-Animal Video Tele-Triage Consultations"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>{isBn ? "ওজনভিত্তিক ড্রপ ও অ্যান্টিবায়োটিকের সঠিক মাত্রা" : "Weight-Titrated Medication & Deworming Schedules"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>{isBn ? "চামড়ার অ্যালার্জি, উকুন ও ভ্যাকসিনের ডিজিটাল রেকর্ড" : "Skin Allergy Triage & Digital Rabies Vaccination Passport"}</span>
                </li>
              </ul>
            </div>

            <Link
              href="/consult?category=pet"
              className="mt-8 py-3 rounded-xl bg-pink-500/10 hover:bg-pink-500 text-pink-400 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-pink-500/20 group-hover:border-pink-500"
            >
              <span>{isBn ? "পেট ডাক্তারের পরামর্শ নিন" : "Consult Pet Doctor"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRECISION AGRI-CLINICAL SUITE: UNIFIED DIAGNOSTIC WORKBENCH */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="srot-glass-card rounded-3xl border border-white/[0.1] p-6 sm:p-10 shadow-2xl space-y-8 bg-gradient-to-b from-slate-900/90 via-[#060e17] to-slate-950/95">
          {/* Header & Suite Tab Navigation */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isBn ? "এসআরওটি এআই ও টেলিমেট্রি স্যুট ৩.৫" : "SROT Precision Farm & Clinical Suite v3.5"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {isBn ? "নির্ভুল কৃষি গোয়েন্দা তথ্য ও ক্লিনিকাল ডায়াগনস্টিক স্যুট" : "Precision Agronomic Intelligence & Clinical Diagnostics"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {isBn
                  ? "মাল্টি-স্পেকট্রাল এআই ভিশন, উপজেলাভিত্তিক মাইক্রো-ক্লাইমেট স্প্রে রাডার, মাটির রাসায়নিক উর্বরতা ও গবাদিপশুর টিকা ক্যালেন্ডার।"
                  : "Integrated multi-spectral computer vision, upazila meteorological spray forecasting, soil chemistry interpretation, and livestock health schedules."}
              </p>
            </div>

            {/* High-Tech Tab Pills */}
            <div className="flex flex-wrap items-center bg-slate-950 p-1.5 rounded-2xl border border-white/[0.08] gap-1 shrink-0">
              {[
                { id: "ai_scan", label: isBn ? "এআই প্যাথোলজি স্ক্যানার" : "AI Vision Scanner", icon: Scan },
                { id: "weather", label: isBn ? "আবহাওয়া ও স্প্রে রাডার" : "Weather & Spray Radar", icon: CloudSun },
                { id: "soil", label: isBn ? "মাটির পিএইচ ও সার" : "Soil Health & NPK", icon: FlaskConical },
                { id: "calendar", label: isBn ? "মৌসুমি ক্যালেন্ডার" : "Farm Calendar", icon: CalendarCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSuiteTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSuiteTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-black shadow-emerald-500/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Component */}
          <div className="pt-2">
            {activeSuiteTab === "ai_scan" && <AiSymptomScanner />}
            {activeSuiteTab === "weather" && <AgroWeatherRadar />}
            {activeSuiteTab === "soil" && <SoilHealthInterpreter />}
            {activeSuiteTab === "calendar" && <CropLivestockCalendar />}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HOW SROT WORKS: 3 CRISP STEPS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            {isBn ? "সহজ ৩-ধাপের প্রক্রিয়া" : "Streamlined 3-Step Process"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {isBn ? "যেভাবে ঘরে বসেই বৈজ্ঞানিক পরামর্শ পাবেন" : "How Tele-Advisory Operates on SROT"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isBn
              ? "মাঠের পাশে বসেই বা ঘরে থেকেই ১৫ মিনিটের মধ্যে বৈজ্ঞানিক রোগ নির্ণয় ও অনুমোদিত চিকিৎসাপত্র গ্রহণ করুন।"
              : "Expert diagnosis and verifiable digital prescription delivered to your phone in under 15 minutes."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: isBn ? "লক্ষণ ও ছবি আপলোড করুন" : "Upload Symptoms & Photos",
              desc: isBn
                ? "আক্রান্ত ধানের পাতা, গরুর ওলান বা পোষা প্রাণীর স্পষ্ট ছবি আপলোড করুন অথবা তাৎক্ষণিক ভিডিও কনসালটেশন সিলেক্ট করুন।"
                : "Snap high-resolution photos of damaged leaves, skin lesions, or request an instant live video consult.",
              icon: <Camera className="w-6 h-6 text-emerald-400" />,
            },
            {
              step: "02",
              title: isBn ? "বিশেষজ্ঞ চিকিৎসকের সাথে লাইভ কল" : "Consult with Verified Doctor",
              desc: isBn
                ? "আমাদের ইঞ্জিন আপনার কেসটি ডিএই বা বিভিসি নিবন্ধিত বিশেষজ্ঞ উদ্ভিদ রোগতত্ত্ববিদ বা ভেটেরিনারি সার্জনের চেম্বারে পাঠাবে।"
                : "Your ticket connects directly to on-duty plant pathologists or veterinary clinicians for video or audio examination.",
              icon: <Video className="w-6 h-6 text-cyan-400" />,
            },
            {
              step: "03",
              title: isBn ? "কিউআর স্বাক্ষরিত প্রেসক্রিপশন গ্রহণ" : "Download Official Signed Rx",
              desc: isBn
                ? "সঠিক ওষুধের মাত্রা, সক্রিয় ফর্মুলেশন ও প্রত্যাহার সময়সহ অফিসিয়াল এ৪ সাইজের পিডিএফ প্রেসক্রিপশন ডাউনলোড করুন।"
                : "Receive a tamper-proof PDF prescription with certified chemical active ingredients and strict harvest withdrawal times.",
              icon: <Download className="w-6 h-6 text-teal-400" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="srot-glass-card rounded-3xl p-7 border border-slate-800 relative group hover-glow-emerald transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-5xl font-black text-slate-800/60 absolute top-5 right-6 font-mono group-hover:text-emerald-500/20 transition-colors">
                {item.step}
              </span>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 inline-block mb-5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FARM HEALTH PACKAGES & SUBSCRIPTIONS (STEP 4) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? "সাশ্রয়ী সদস্যপদ" : "Care Subscriptions"}</span>
            </div>
            <h2 className="text-3xl font-black text-white">
              {isBn ? "মাসিক খামার ও পশু স্বাস্থ্য প্যাকেজ" : "Farm & Animal Health Subscription Plans"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isBn
                ? "স্বল্প খরচে নিয়মিত পরামর্শ, ফ্রি কনসালটেশন কোটা এবং জেলাভিত্তিক বালাই সতর্কবার্তা নোটিফিকেশন।"
                : "Cost-effective monthly care with free consultation quotas and automated regional SMS disease alerts."}
            </p>
          </div>

          <Link
            href="/services/field-visits"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold transition self-start sm:self-auto"
          >
            <Truck className="w-4 h-4" />
            <span>{isBn ? "ডোরস্টেপ মাঠ সেবা (Step 6) →" : "Doorstep Farm Visits (Step 6) →"}</span>
          </Link>
        </div>

        <FarmHealthPackages />
      </section>

      {/* ========================================================================= */}
      {/* 8. VERIFIED SPECIALISTS ON-DUTY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {isBn ? "সনদপ্রাপ্ত বিশেষজ্ঞ প্যানেল" : "Council-Registered Specialists"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              {isBn ? "বিশেষজ্ঞ কৃষিবিদ ও ভেটেরিনারি সার্জন" : "Accredited Agronomists & Veterinarians"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isBn
                ? "আমাদের প্রতিটি চিকিৎসকের বিআরআরআই, বিএআরআই বা বাংলাদেশ ভেটেরিনারি কাউন্সিল (BVC) লাইসেন্স নম্বর যাচাইকৃত।"
                : "Every consultant possesses verified state council credentials and active field experience."}
            </p>
          </div>

          <Link
            href="/experts"
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:translate-x-1 transition-transform self-start sm:self-auto"
          >
            <span>{isBn ? "সকল বিশেষজ্ঞ দেখুন (১৪০+) →" : "View All Specialists (140+) →"}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLATFORM_EXPERTS.slice(0, 4).map((expert) => (
            <div
              key={expert.id}
              className="srot-glass-card rounded-2xl p-5 border border-slate-800 space-y-4 hover:border-slate-700 transition hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-4">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-full h-44 rounded-xl object-cover border border-slate-700/80"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-900/90 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online
                  </span>
                </div>

                <div className="flex items-center gap-1 text-emerald-400 mb-0.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-mono">{expert.registrationNumber}</span>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-1">{expert.name}</h3>
                <p className="text-[11px] text-slate-400 line-clamp-1">{expert.title}</p>

                <div className="pt-2 mt-2 border-t border-white/[0.04] text-[11px] text-slate-300 flex items-center justify-between">
                  <span>{expert.experienceYears} Years Exp</span>
                  <span className="font-bold text-white font-mono">{formatCurrency(expert.feePerConsultation)}</span>
                </div>
              </div>

              <Link
                href={`/consult?expert=${expert.id}&category=${expert.primaryCategory}`}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center transition shadow-md"
              >
                {isBn ? "পরামর্শ নিন" : "Book Advisory"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. VERIFIABLE OFFICIAL PRESCRIPTION (Rx) SHOWCASE */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#07131a] via-slate-900 to-slate-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Cols: Explainer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <FileCheck2 className="w-4 h-4" />
                <span>{isBn ? "আইনগত বৈধ ডিজিটাল প্রেসক্রিপশন" : "Official Digital Prescription (Rx)"}</span>
              </div>

              <h2 className="text-3xl font-black text-white">
                {isBn
                  ? "কিউআর ভেরিফাইড প্রেসক্রিপশন ও প্রত্যাহার সময়সীমা"
                  : "Tamper-Proof Digital Prescriptions with Withdrawal Safety"}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isBn
                  ? "এসআরওটি প্রেসক্রিপশন শুধুমাত্র ওষুধ নয়, এটি একটি পূর্ণাঙ্গ বিজ্ঞানভিত্তিক প্রটোকল। প্রতিটি প্রেসক্রিপশনে সক্রিয় রাসায়নিক উপাদান (Active Ingredient), পানির সাথে সঠিক মাত্রা এবং ফসল বা দুধ-মাংসের নিরাপদ প্রত্যাহার সময় (Withholding Period) সুনির্দিষ্টভাবে লেখা থাকে।"
                  : "Every prescription generated on SROT contains verifiable council accreditation, exact active chemical formulations per bigha or bodyweight, and mandatory withholding safety windows ensuring zero harmful residues."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/80 border border-white/[0.06]">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isBn ? "ফার্মেসি ও ডিলার কিউআর ভেরিফিকেশন" : "Retailer QR Scan Authenticity"}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/80 border border-white/[0.06]">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{isBn ? "অ্যান্টিবায়োটিক উইথহোল্ডিং খাদ্য নিরাপত্তা" : "Zero-Residue Withholding Protocol"}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => generatePrescriptionPdf(INITIAL_CONSULTATIONS[0])}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-950/60"
                >
                  <Download className="w-4 h-4" />
                  <span>{isBn ? "নমুনা প্রেসক্রিপশন ডাউনলোড করুন (PDF)" : "Download Sample Prescription PDF"}</span>
                </button>
              </div>
            </div>

            {/* Right 5 Cols: Visual Sample Rx Card */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-950 border border-slate-700/80 shadow-2xl space-y-3 font-sans">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div>
                  <span className="font-bold text-white block">Dr. Ramesh Patel, Ph.D.</span>
                  <span className="text-[10px] text-emerald-400 font-mono">AGR-REG-2014-8891 (DAE)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  Rx #SROT-AG-2026-8819
                </span>
              </div>

              <div className="text-xs space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase">Diagnosis:</span>
                <p className="font-bold text-white">Rice Leaf Blast (Pyricularia oryzae)</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-white font-bold">
                  <span>Tricyclazole 75% WP</span>
                  <span className="text-emerald-400">0.6 g / L</span>
                </div>
                <p className="text-[11px] text-slate-400">Foliar protectant spray at late afternoon tillering</p>
                <div className="pt-1 text-[10px] text-amber-400 font-mono font-semibold">
                  Withholding Period: 21 Days Pre-Harvest
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400">
                <span>Cryptographically Signed</span>
                <span className="text-emerald-400 font-mono">Verified Authenticity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. VERIFIED CUSTOMER & FARMER REVIEWS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <VerifiedTestimonials />
      </section>

      {/* ========================================================================= */}
      {/* 11. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            {isBn ? "সাধারণ প্রশ্ন জিজ্ঞাসা" : "Clear Answers"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {isBn ? "সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ (FAQ)" : "Frequently Asked Questions"}
          </h2>
          <p className="text-xs text-slate-400">
            {isBn
              ? "এসআরওটি প্ল্যাটফর্ম ব্যবহার, পেমেন্ট ও প্রেসক্রিপশন সংক্রান্ত তথ্য।"
              : "Everything you need to know about consultation flow, payments, and prescriptions."}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.08] bg-slate-900/60 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-white hover:text-emerald-300 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs text-slate-300 leading-relaxed border-t border-white/[0.04] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. HIGH-IMPACT FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#071720] to-teal-950 border border-emerald-500/30 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {isBn ? "সারাদেশে সেবা উন্মুক্ত" : "Live Across All 64 Districts"}
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {isBn
                ? "আজই আপনার ফসল ও প্রাণীর সুরক্ষায় প্রস্তুতি নিন"
                : "Protect Your Crops, Livestock & Pets Today"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              {isBn
                ? "কোনো অপ্রয়োজনীয় জটিলতা ছাড়া মাত্র কয়েক ক্লিকে বিশেষজ্ঞ পরামর্শক চিকিৎসকের সাথে যুক্ত হোন। নিরাপদ কৃষি, স্বাস্থ্যবান প্রাণী ও সুরক্ষিত ভবিষ্যৎ।"
                : "Connect with accredited plant doctors and veterinarians in minutes. Science-backed guidance, certified digital prescriptions, and peace of mind."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/consult"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm transition shadow-xl shadow-emerald-500/25 hover:-translate-y-0.5"
              >
                {isBn ? "পরামর্শ সেবা শুরু করুন →" : "Book Advisory Session →"}
              </Link>

              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] font-bold text-xs sm:text-sm transition"
              >
                {isBn ? "ওষুধের ডোজ মাপুন" : "Calculate Dosage"}
              </button>
            </div>

            {/* Emergency Hotline Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>কৃষি কল সেন্টার: <strong className="text-white">16123</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                <span>জাতীয় জরুরি হেল্পলাইন: <strong className="text-white">333</strong></span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Global Dosage Calculator Modal */}
      <DosageCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
}
