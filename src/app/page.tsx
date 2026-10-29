"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PLATFORM_SERVICES, ServiceCategory } from "@/data/mockServices";
import { PLATFORM_EXPERTS } from "@/data/mockExperts";
import { KNOWLEDGE_ARTICLES } from "@/data/mockKnowledge";
import { INITIAL_CONSULTATIONS } from "@/data/mockConsultations";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ExpertCard } from "@/components/cards/ExpertCard";
import { KnowledgeCard } from "@/components/cards/KnowledgeCard";
import { ConsultationCard } from "@/components/cards/ConsultationCard";
import { useUserStore } from "@/lib/store/userStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import { AiSymptomScanner } from "@/components/features/AiSymptomScanner";
import { AgroWeatherRadar } from "@/components/features/AgroWeatherRadar";
import { OutbreakAlertBanner } from "@/components/features/OutbreakAlertBanner";
import { PricingComparisonTable } from "@/components/features/PricingComparisonTable";
import { VerifiedTestimonials } from "@/components/features/VerifiedTestimonials";
import { DosageCalculatorModal } from "@/components/features/DosageCalculatorModal";
import { HeroVisualGraphic } from "@/components/features/HeroVisualGraphic";
import { CropLivestockCalendar } from "@/components/features/CropLivestockCalendar";
import { SoilHealthInterpreter } from "@/components/features/SoilHealthInterpreter";
import { AccreditationBadges } from "@/components/features/AccreditationBadges";
import { MOCK_COMMUNITY_QUESTIONS, CommunityQuestion } from "@/data/mockCommunity";
import { QuestionCard } from "@/components/community/QuestionCard";
import { QuestionDetailModal } from "@/components/community/QuestionDetailModal";
import { AskQuestionModal } from "@/components/community/AskQuestionModal";
import {
  Wheat,
  Milk,
  HeartHandshake,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  FileCheck2,
  Sliders,
  Layers,
  Clock,
  Download,
  AlertTriangle,
  Stethoscope,
  Video,
  Camera,
  Search,
  Check,
  ChevronDown,
  PhoneCall,
  HelpCircle,
  Calculator,
  Activity,
  Scan,
} from "lucide-react";

export default function HomePage() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");
  const [heroSector, setHeroSector] = useState<"agri" | "livestock" | "pet">("agri");
  const [heroRightTab, setHeroRightTab] = useState<"graphic" | "triage">("graphic");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [homeQuestions, setHomeQuestions] = useState<CommunityQuestion[]>(MOCK_COMMUNITY_QUESTIONS);
  const [activeCommunityQuestion, setActiveCommunityQuestion] = useState<CommunityQuestion | null>(null);
  const [isHomeAskModalOpen, setIsHomeAskModalOpen] = useState(false);
  const { openRoleModal, currentUser } = useUserStore();

  const filteredServices =
    activeCategory === "all"
      ? PLATFORM_SERVICES
      : PLATFORM_SERVICES.filter((s) => s.category === activeCategory);

  // Quick Triage Demo Presets for Hero Interactive Simulator (Bilingual)
  const heroTriagePresets = {
    agri: {
      tag: isBn ? "উদ্ভিদ রোগতত্ত্ব ট্রায়াজ" : "Crop Disease Triage",
      title: isBn ? "বোরো ধানের পাতা ব্লাস্ট (Pyricularia oryzae)" : "Rice Blast (Pyricularia oryzae)",
      symptom: isBn ? "কুশি গজানো ধানের পাতায় মাকু আকৃতির চোখা বাদামি দাগ" : "Diamond spindle lesions on tillering leaves",
      doctor: isBn ? "ড. তরিকুল ইসলাম (প্রধান উদ্ভিদ রোগতত্ত্ববিদ)" : "Dr. Tariqul Islam, Ph.D. (Chief Pathologist)",
      solution: isBn ? "ট্রাইসাইক্লাজল ৭৫ ডব্লিউপি + জমিতে পরিমিত পানি রাখা" : "Tricyclazole 75% WP + Silica Soil Amendment",
      safety: isBn ? "ফসল কাটার ২১ দিন পূর্বে স্প্রে বন্ধ রাখুন (Withholding)" : "21 Days Pre-Harvest Withholding Period",
      sampleCaseId: "consult-agri-101",
      icon: <Wheat className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/40 bg-emerald-950/30",
    },
    livestock: {
      tag: isBn ? "ডেইরি ভেটেরিনারি ট্রায়াজ" : "Dairy Veterinary Triage",
      title: isBn ? "গাভীর তীব্র ওলান পাকা রোগ (Acute Bovine Mastitis)" : "Acute Bovine Mastitis (Hind Quarter)",
      symptom: isBn ? "পেছনের বাঁট অস্বাভাবিক ফোলা, ওলান গরম ও দুধে ছানা থোকা" : "Swollen hot quarter with milk curdling",
      doctor: isBn ? "ডা. অনন্যা সেন, ডিভিএম (ভেটেরিনারি সার্জন)" : "Dr. Ananya Sen, D.V.M. (Veterinary Surgeon)",
      solution: isBn ? "ইন্ট্রাম্যামারি অ্যান্টিবায়োটিক ইনফিউশন + বরফ-পানি সেঁক" : "Intramammary Infusion + Cold Water Hydrotherapy",
      safety: isBn ? "চিকিৎসা চলাকালীন ও পরবর্তী ৭২ ঘণ্টা দুধ বিক্রি বন্ধ" : "72 Hours Strict Milk Withholding Interval",
      sampleCaseId: "consult-vet-202",
      icon: <Milk className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/40 bg-cyan-950/30",
    },
    pet: {
      tag: isBn ? "পোষা প্রাণী টেলি-ভেটেরিনারি" : "Companion Pet Tele-Vet",
      title: isBn ? "কুকুর ও বিড়ালের অ্যালার্জি ডার্মাটাইটিস ও চুলকানি" : "Canine Atopic Dermatitis & Ear Pruritus",
      symptom: isBn ? "ঘন ঘন পা চাটা, তলপেটে লালচে ফুসকুড়ি ও চুলকানি" : "Intense paw licking, red inflamed groin",
      doctor: isBn ? "ডা. ফারহানা হক, ডিভিএম (স্মল অ্যানিমেল স্পেশালিস্ট)" : "Dr. Farhana Haque, D.V.M. (Small Animal Clinician)",
      solution: isBn ? "ওজনভিত্তিক ওকলাসিটিনিব + হাইপোঅ্যালার্জিক ড্রপ" : "Weight-Titrated Oclacitinib + Otic Drops",
      safety: isBn ? "ওজন অনুসারে সঠিক মাত্রায় সেব্য (৩১.৫ কেজি)" : "Weight-specific dosage verified (31.5 kg)",
      sampleCaseId: "consult-pet-303",
      icon: <HeartHandshake className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/40 bg-amber-950/30",
    },
  };

  const currentPreset = heroTriagePresets[heroSector];

  return (
    <div className="w-full srot-grid-pattern srot-ambient-glow pb-24">
      {/* 1. Live Disease & Pest Outbreak Warning Ticker */}
      <OutbreakAlertBanner />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols: Headline & Sector Selector */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold backdrop-blur-md animate-float">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>
                  {isBn
                    ? "বাংলাদেশ কাউন্সিল-নিবন্ধিত কৃষি ও প্রাণিসম্পদ টেলি-সেবা প্ল্যাটফর্ম"
                    : "COUNCIL-ACCREDITED TELE-HEALTH FOR BANGLADESH AGRICULTURE & ANIMALS"}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] font-sans">
                {isBn ? (
                  <>
                    মাঠের ফসল, ডেইরি খামার ও পোষা প্রাণীর বৈজ্ঞানিক সমাধান এবং{" "}
                    <span className="text-gradient-hero">
                      ডিজিটাল প্রেসক্রিপশন।
                    </span>
                  </>
                ) : (
                  <>
                    Scientific Advisory & Digital Rx for Every{" "}
                    <span className="text-gradient-hero">
                      Field, Herd & Companion Animal.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {isBn
                  ? "বিআরআরআই ও বিএআরআই সার্টিফাইড কৃষিবিদ এবং বিভিসি নিবন্ধিত ভেটেরিনারি সার্জনের সাথে মিনিটে সরাসরি সংযুক্ত হোন। ধানের ব্লাস্ট, মাটির পিএইচ, ডেইরি গাভীর রোগ বা পোষা প্রাণীর অসুস্থতায় তাৎক্ষণিক ভিডিও কনসালটেশন ও কিউআর সিলযুক্ত ডিজিটাল প্রেসক্রিপশন পান।"
                  : "Connect with verified plant pathologists, agronomists, and veterinarians in minutes. From paddy rice blights and soil fertility to dairy cattle mastitis and pet dermatology — receive rapid visual diagnosis and verifiable official prescriptions."}
              </p>

              {/* Sector Switcher Pills in Hero */}
              <div className="pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  {isBn ? "লাইভ ট্রায়াজ প্রিভিউ দেখতে খাত নির্বাচন করুন:" : "Choose Your Sector to Preview Live Triage:"}
                </span>
                <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md gap-1">
                  {[
                    {
                      id: "agri",
                      label: isBn ? "🌾 ফসল পরামর্শ (ধান, সবজি, গম)" : "🌾 Crop Advisory",
                      color: "text-emerald-400",
                    },
                    {
                      id: "livestock",
                      label: isBn ? "🐄 ডেইরি, ছাগল ও মাছ" : "🐄 Livestock & Dairy",
                      color: "text-cyan-400",
                    },
                    {
                      id: "pet",
                      label: isBn ? "🐕 পোষা প্রাণী (কুকুর ও বিড়াল)" : "🐕 Companion Pets",
                      color: "text-amber-400",
                    },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setHeroSector(s.id as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                        heroSector === s.id
                          ? "bg-slate-800 text-white shadow-md border border-slate-600 scale-102"
                          : "text-slate-400 hover:text-white hover:bg-slate-850"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/consult"
                  className="btn-shimmer flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm transition shadow-xl shadow-emerald-950/60 hover:-translate-y-1 hover:shadow-emerald-900/80"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>{isBn ? "পরামর্শ সেবা শুরু করুন" : "Start Consultation Flow"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold text-sm transition hover-glow-emerald hover:-translate-y-0.5"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{isBn ? "ডোজ ক্যালকুলেটর" : "Dosage Calculator"}</span>
                </button>

                <button
                  onClick={openRoleModal}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition"
                >
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>
                    {isBn ? "সক্রিয় প্রোফাইল:" : "Persona:"} {currentUser.name.split(" ")[0]}
                  </span>
                </button>
              </div>

              {/* Real-Time Metrics Strip & MFS Supported Badge */}
              <div className="pt-6 border-t border-white/[0.08] space-y-4">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-white block">১৪,৮০০+</span>
                    <span className="text-xs text-slate-400 font-medium">
                      {isBn ? "সফল সমাধানকৃত কেস" : "Verified Solved Cases"}
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">&lt; ২০ মিনিট</span>
                    <span className="text-xs text-slate-400 font-medium">
                      {isBn ? "গড় রেসপন্স সময়" : "Average Response Time"}
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-cyan-400 block">১০০%</span>
                    <span className="text-xs text-slate-400 font-medium">
                      {isBn ? "কাউন্সিল নিবন্ধিত সার্জন" : "Council Registered Vets"}
                    </span>
                  </div>
                </div>

                {/* Local MFS Payment Strip */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{isBn ? "সহজ ফি পরিশোধ:" : "Secure Payment:"}</span>
                  <span className="text-pink-400 font-bold">বিকাশ (bKash)</span>
                  <span>•</span>
                  <span className="text-orange-400 font-bold">নগদ (Nagad)</span>
                  <span>•</span>
                  <span className="text-purple-400 font-bold">রকেট (Rocket)</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Switchable Diagnostic Graphic & Case Triage Preview */}
            <div className="lg:col-span-5 space-y-3">
              {/* Tab Selector on Top of Card */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  {isBn ? "ইন্টারেক্টিভ ডায়াগনস্টিক ডেস্ক:" : "Interactive Tele-Deck:"}
                </span>
                <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 gap-1 text-[11px] font-bold">
                  <button
                    onClick={() => setHeroRightTab("graphic")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                      heroRightTab === "graphic"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Scan className="w-3.5 h-3.5" />
                    <span>{isBn ? "স্পেকট্রাল স্ক্যান" : "Spectral Telemetry"}</span>
                  </button>
                  <button
                    onClick={() => setHeroRightTab("triage")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                      heroRightTab === "triage"
                        ? "bg-cyan-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>{isBn ? "লাইভ কেস ট্রায়াজ" : "Live Case Triage"}</span>
                  </button>
                </div>
              </div>

              {heroRightTab === "graphic" ? (
                <HeroVisualGraphic />
              ) : (
                <div className={`srot-glass-card rounded-3xl p-6 sm:p-7 border ${currentPreset.color} shadow-2xl relative transition-all duration-300 hover-glow-cyan`}>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-slate-800/90 border border-slate-700">
                        {currentPreset.icon}
                      </span>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {isBn ? "লাইভ কেস ট্রায়াজ প্রিভিউ" : "Live Case Triage Preview"}
                        </span>
                        <h4 className="text-xs font-bold text-white">{currentPreset.tag}</h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      {isBn ? "চিকিৎসক অনলাইন" : "Doctor Active"}
                    </span>
                  </div>

                  <div className="py-4 space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] uppercase text-slate-400 block">
                        {isBn ? "উপসর্গ বা লক্ষণসমূহ:" : "Reported Symptoms:"}
                      </span>
                      <p className="text-xs text-slate-200 font-medium mt-0.5">{currentPreset.symptom}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] uppercase text-slate-400 block">
                        {isBn ? "রোগতাত্ত্বিক বা ক্লিনিকাল ডায়াগনোসিস:" : "Pathology / Clinical Diagnosis:"}
                      </span>
                      <p className="text-xs font-bold text-emerald-300 mt-0.5">{currentPreset.title}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] uppercase text-slate-400 block">
                        {isBn ? "প্রেসক্রিপশন ও ওষুধের মাত্রা:" : "Prescribed Action & Spray / Medicine:"}
                      </span>
                      <p className="text-xs text-white font-semibold mt-0.5">{currentPreset.solution}</p>
                      <span className="text-[10px] text-amber-400 block mt-1 font-mono">
                        {isBn ? "নিরাপত্তা নিয়ম: " : "Safety Protocol: "}
                        {currentPreset.safety}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 pt-1 text-xs text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-[11px] truncate">{currentPreset.doctor}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <Link
                      href={`/consult/${currentPreset.sampleCaseId}`}
                      className="btn-shimmer flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center transition shadow-lg shadow-emerald-950/60"
                    >
                      {isBn ? "লাইভ চেম্বার খুলুন →" : "Open Live Case Room →"}
                    </Link>
                    <Link
                      href={`/consult?category=${heroSector === "pet" ? "pet" : heroSector === "livestock" ? "veterinary" : "agri"}`}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                    >
                      {isBn ? "নতুন বুকিং" : "Book New"}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. CERTIFIED ACCREDITATIONS & SECURITY RIBBON ================= */}
      <AccreditationBadges />

      {/* ================= 3. LIVE AI SYMPTOM SCANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AiSymptomScanner />
      </section>

      {/* ================= 4. SEASONAL SPRAY & VACCINATION PROTOCOL CALENDAR ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CropLivestockCalendar />
      </section>

      {/* ================= 5. AGRO-CLIMATIC & LIVESTOCK THI RADAR ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AgroWeatherRadar />
      </section>

      {/* ================= 6. SOIL HEALTH & N-P-K NUTRIENT BIOAVAILABILITY ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SoilHealthInterpreter />
      </section>

      {/* ================= 7. ARCHITECTURAL DESIGN SPOTLIGHT ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="srot-glass-card hover-glow-emerald rounded-3xl p-6 sm:p-10 border border-white/[0.08] bg-gradient-to-b from-slate-900/70 to-slate-950/90 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                <Layers className="w-4 h-4" />
                {isBn ? "মাল্টি-সেক্টর মডুলার আর্কিটেকচার" : "Multi-Sector Modular Architecture"}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isBn
                  ? "এক প্ল্যাটফর্ম, সর্বজনীন ডেটাবেজ ও সম্প্রসারণযোগ্য সার্ভিস মডিউল"
                  : "One Platform, Generic Database & Scalable Service Modules"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
                {isBn
                  ? "প্রাণিসম্পদ স্বাস্থ্য ও পোষা প্রাণীর সেবা কোনো আলাদা ওয়েবসাইট নয়। তারা একই কনসালটেশন বুকিং ইঞ্জিন, বিশেষজ্ঞ ডিরেক্টরি এবং কিউআর ভেরিফাইড প্রেসক্রিপশন জেনারেটরের অংশ।"
                  : "Animal Healthcare and Companion Pet Care are not separate websites. They share the same generic consultation booking engine, practitioner directory, and cryptographic prescription generator."}
              </p>
            </div>

            <Link
              href="/admin"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition self-start lg:self-auto hover:-translate-y-0.5"
            >
              <Sliders className="w-4 h-4" />
              <span>{isBn ? "অ্যাডমিন মডিউল কন্ট্রোল প্যানেল →" : "Admin Module Switcher & Telemetry →"}</span>
            </Link>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Agri */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-emerald-500/30 flex flex-col justify-between hover-glow-emerald">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Wheat className="w-6 h-6" />
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {isBn ? "ফেজ ১ • লাইভ" : "Phase 1 • Live"}
                  </span>
                </div>
                <h4 className="font-bold text-white text-lg">
                  {isBn ? "কৃষি পরামর্শ ও ফসল সুরক্ষা" : "Agriculture Advisory"}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {isBn ? "ধান, পাট, আলু, ভুট্টা, সবজি ও ফলের বাগান।" : "Grain crops, horticulture, orchards, and cash crops."}
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isBn ? "ধানের ব্লাস্ট, পাতা পোড়া ও শেকড় পচা রোগ নির্ণয়" : "Crop Leaf Blast, Blight & Root Rot Diagnosis"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isBn ? "ইউরিয়া, টিএসপি, পটাশ ও জিংক সুষম সার প্রয়োগ" : "Basal & Top-Dressing N-P-K Soil Balancing"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isBn ? "আইপিএম (IPM) জৈব বালাই দমন ও কীটনাশক সতর্কতা" : "IPM Bio-Control & Pesticide Resistance Control"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isBn ? "মাঠ পর্যায়ে কৃষিবিদ দ্বারা জমি পরিদর্শন সুবিধা" : "On-Site Farm Acreage Agronomist Inspections"}</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/services?cat=agri"
                className="mt-6 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:translate-x-1 transition-transform"
              >
                <span>{isBn ? "কৃষি সেবাসমূহ দেখুন" : "View Agri Services"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Livestock */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/30 flex flex-col justify-between hover-glow-cyan">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Milk className="w-6 h-6" />
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                    {isBn ? "ফেজ ২ • লাইভ" : "Phase 2 • Live"}
                  </span>
                </div>
                <h4 className="font-bold text-white text-lg">
                  {isBn ? "প্রাণিসম্পদ ও খামার চিকিৎসা" : "Animal Healthcare (Herd)"}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {isBn ? "ডেইরি গরু, ব্রয়লার-লেয়ার পোল্ট্রি, ছাগল ও মাছের ঘের।" : "Commercial dairy, poultry flocks, sheep, and aquaculture."}
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{isBn ? "গাভীর ওলান পাকা (Mastitis) সিএমটি টেস্ট ও চিকিৎসা" : "Subclinical & Clinical Mastitis CMT Scoring"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{isBn ? "পোল্ট্রি ব্রয়লার এফসিআর (FCR) ও কক্সিডিওসিস নিয়ন্ত্রণ" : "Broiler FCR Optimization & Coccidiosis Control"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{isBn ? "ব্ল্যাক বেঙ্গল ছাগলের কৃমিনাশক ও পিপিআর ভ্যাকসিন" : "Small Ruminant Deworming (FAMACHA Score)"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{isBn ? "পুকুরে অক্সিজেনের ঘাটতি ও গ্যাস দূরীকরণে চুন/জিওলাইট" : "Pond Oxygen Crashes & Aquaculture Chemistry"}</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/services?cat=veterinary"
                className="mt-6 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:translate-x-1 transition-transform"
              >
                <span>{isBn ? "প্রাণিসম্পদ সেবাসমূহ দেখুন" : "View Livestock Services"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pets */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-amber-500/30 flex flex-col justify-between hover-glow-amber">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <HeartHandshake className="w-6 h-6" />
                  </span>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    {isBn ? "ফেজ ২ • লাইভ" : "Phase 2 • Live"}
                  </span>
                </div>
                <h4 className="font-bold text-white text-lg">
                  {isBn ? "পোষা প্রাণী স্বাস্থ্যসেবা (পেট কেয়ার)" : "Companion Pet Care"}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {isBn ? "পোষা কুকুর, বিড়াল, খরগোশ ও পাখি।" : "Dogs, cats, rabbits, and domestic companion animals."}
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{isBn ? "২৪/৭ লাইভ ভিডিওতে ভেটেরিনারি ডাক্তারের পরামর্শ" : "24/7 Small-Animal Video Tele-Vet Consultations"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{isBn ? "চামড়ার অ্যালার্জি, উকুন ও ফাংগাল ইনফেকশন ট্রায়াজ" : "Skin Allergy & Flea/Tick Dermatitis Triage"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{isBn ? "ওজন নিয়ন্ত্রণ ও সঠিক পুষ্টির ক্লিনিকাল চার্ট" : "Weight & Clinical Prescription Nutrition Plans"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{isBn ? "ডিজিটাল পিডিএফ প্রেসক্রিপশন ডাউনলোড সুবিধা" : "Downloadable Official Vet Prescriptions (PDF)"}</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/services?cat=pet"
                className="mt-6 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:translate-x-1 transition-transform"
              >
                <span>{isBn ? "পেট সেবাসমূহ দেখুন" : "View Pet Services"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. HOW IT WORKS (4 STEPS) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            {isBn ? "সহজ ৪-ধাপের প্রক্রিয়া" : "Rapid 4-Step Process"}
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-white mt-1">
            {isBn ? "এসআরওটি প্ল্যাটফর্মে কীভাবে পরামর্শ নিবেন" : "How Tele-Advisory Works on SROT"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            {isBn
              ? "মাঠের পাশে বসেই বা ঘরে থেকেই ২০ মিনিটের মধ্যে বৈজ্ঞানিক পরামর্শ ও চিকিৎসাপত্র গ্রহণ করুন।"
              : "Accredited science delivered straight to your field or home in under 20 minutes."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: isBn ? "ছবি তুলুন বা ভিডিও অনুরোধ করুন" : "Upload Photos or Request Video",
              desc: isBn
                ? "আক্রান্ত পাতা, ওলান বা প্রাণীর লক্ষণের স্পষ্ট ছবি আপলোড করুন অথবা সরাসরি ভিডিও কলের সময় বুক করুন।"
                : "Snap close-up photos of leaf lesions, animal symptoms, or request a scheduled HD video call.",
              icon: <Camera className="w-6 h-6 text-emerald-400" />,
            },
            {
              step: "02",
              title: isBn ? "এআই ট্রায়াজ ও ডাক্তার ম্যাচ" : "Pre-Screening & Doctor Match",
              desc: isBn
                ? "আমাদের ইঞ্জিন আপনার কেসটি সংশ্লিষ্ট বিশেষজ্ঞ উদ্ভিদ রোগতত্ত্ববিদ বা নিবন্ধিত ভেটেরিনারি সার্জনের কাছে পাঠাবে।"
                : "Our engine routes your case to certified plant pathologists or veterinary surgeons on duty.",
            },
            {
              step: "03",
              title: isBn ? "লাইভ কনসালটেশন ও পরীক্ষা" : "Live Examination & Triage",
              desc: isBn
                ? "চ্যাট বা ভিডিওতে লক্ষণগুলো আলোচনা করুন। আবহাওয়া, পূর্ববর্তী স্প্রে ও খাদ্য ইতিহাস পর্যালোচনা করা হবে।"
                : "Discuss symptoms over chat or face-to-face video. Clarify history, recent weather, and feed.",
              icon: <Video className="w-6 h-6 text-amber-400" />,
            },
            {
              step: "04",
              title: isBn ? "স্বাক্ষরিত ডিজিটাল প্রেসক্রিপশন" : "Receive Signed Digital Rx",
              desc: isBn
                ? "সঠিক ওষুধের মাত্রা, সক্রিয় ফর্মুলেশন ও প্রত্যাহার সময়সহ অফিসিয়াল এ৪ সাইজের পিডিএফ প্রেসক্রিপশন ডাউনলোড করুন।"
                : "Download official PDF prescription with exact dosages, active formulations, and withholding rules.",
              icon: <Download className="w-6 h-6 text-emerald-400" />,
            },
          ].map((item, i) => (
            <div key={i} className="srot-glass-card rounded-2xl p-6 border border-slate-800 relative group hover-glow-emerald">
              <span className="text-4xl font-black text-slate-800/80 absolute top-4 right-4 font-mono group-hover:text-emerald-500/20 transition-colors">
                {item.step}
              </span>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700/80 inline-block mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 9. MODULAR SERVICES CATALOG ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {isBn ? "সার্ভিস ক্যাটালগ" : "Interactive Service Catalog"}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white mt-1">
              {isBn ? "পরামর্শ বা চিকিৎসাসেবা নির্বাচন করুন" : "Select an Advisory or Clinical Service"}
            </h3>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: isBn ? "সব সেবাসমূহ" : "All Services" },
              { id: "agri", label: isBn ? "কৃষি সেবা" : "Agriculture" },
              { id: "veterinary", label: isBn ? "ডেইরি ও গবাদিপশু" : "Dairy & Cattle" },
              { id: "poultry", label: isBn ? "পোল্ট্রি ও মুরগি" : "Poultry" },
              { id: "fisheries", label: isBn ? "মৎস্য চাষ" : "Fisheries" },
              { id: "pet", label: isBn ? "পোষা প্রাণী" : "Pet Care" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeCategory === tab.id
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* ================= 10. PRICING & VALUE COMPARISON ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <PricingComparisonTable />
      </section>

      {/* ================= 11. VERIFIED PRACTITIONERS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {isBn ? "যাচাইকৃত সনদপ্রাপ্ত প্যানেল" : "Verified Accreditation"}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white mt-1">
              {isBn ? "কাউন্সিল-নিবন্ধিত কৃষিবিদ ও ভেটেরিনারি সার্জন" : "Council-Registered Specialists"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isBn
                ? "আমাদের প্রতিটি কনসালটেন্টের অফিসিয়াল সরকারি রেজিস্ট্রেশন নম্বর ও মাঠ পর্যায়ের অভিজ্ঞতা যাচাইকৃত।"
                : "Each consultant possesses verifiable state council licensing numbers and field credentials."}
            </p>
          </div>

          <Link
            href="/experts"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:translate-x-1 transition-transform"
          >
            <span>{isBn ? "সকল বিশেষজ্ঞ দেখুন →" : "View All Practitioners →"}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLATFORM_EXPERTS.slice(0, 3).map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </section>

      {/* ================= 12. VERIFIED CLIENT TESTIMONIALS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <VerifiedTestimonials />
      </section>

      {/* ================= 13. DOWNLOADABLE OFFICIAL RX SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="srot-glass-card hover-glow-emerald rounded-3xl p-6 sm:p-10 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-950">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {isBn ? "অফিসিয়াল ডিজিটাল প্রেসক্রিপশন" : "Official Clinical Documents"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {isBn ? "যাচাইযোগ্য পরামর্শ রিপোর্ট ও কিউআর ডিজিটাল প্রেসক্রিপশন" : "Verifiable Advisory Reports & Digital Rx"}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {isBn
                  ? "প্রতিটি কনসালটেশন শেষে প্রিন্টযোগ্য এ৪ সাইজের সাইনড প্রেসক্রিপশন পাবেন যাতে ওষুধের সঠিক মাত্রা ও খাদ্য নিরাপত্তার উইথহোল্ডিং সময় উল্লেখ থাকে।"
                  : "Every completed consultation outputs a signed A4 PDF document containing diagnosis, active formulations, and withholding rules."}
              </p>
            </div>

            <button
              onClick={() => generatePrescriptionPdf(INITIAL_CONSULTATIONS[0])}
              className="btn-shimmer flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition shadow-lg self-start md:self-auto hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>{isBn ? "নমুনা প্রেসক্রিপশন ডাউনলোড (PDF)" : "Test Download Sample Rx (PDF)"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_CONSULTATIONS.slice(0, 2).map((c) => (
              <ConsultationCard key={c.id} consultation={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= 14. KNOWLEDGE HUB ARTICLES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {isBn ? "বিজ্ঞানসম্মত প্রটোকল" : "Evidence-Based Protocols"}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white mt-1">
              {isBn ? "কৃষি ও ভেটেরিনারি জ্ঞানকোষের ফিল্ড গাইড" : "Field Protocols from the Knowledge Hub"}
            </h3>
          </div>

          <Link
            href="/knowledge"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:translate-x-1 transition-transform"
          >
            <span>{isBn ? "সকল প্রটোকল পড়ুন →" : "Explore All Protocols →"}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KNOWLEDGE_ARTICLES.slice(0, 3).map((article) => (
            <KnowledgeCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* ================= 14B. ASK COMMUNITY Q&A (AGRI STACK OVERFLOW) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/[0.05]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>{isBn ? "উন্মুক্ত প্রশ্নোত্তর ফোরাম" : "Open Knowledge Forum"}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              {isBn ? "কৃষি ও ভেটেরিনারি সম্প্রদায় প্রশ্নোত্তর" : "Ask the SROT Agro-Vet Community"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {isBn
                ? "কোনো সমস্যায় আটকে আছেন? ছবি ও বিবরণ দিয়ে প্রশ্ন করুন। নিবন্ধিত চিকিৎসক ও অভিজ্ঞ খামারিরা উত্তর দেবেন সম্পূর্ণ বিনামূল্যে।"
                : "Got an unsolved crop or livestock symptom? Post photos and description. Certified clinicians and farmers answer free of charge."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsHomeAskModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-emerald-500/20"
            >
              {isBn ? "+ প্রশ্ন করুন (বিনামূল্যে)" : "+ Ask a Question (Free)"}
            </button>
            <Link
              href="/community"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.08] text-xs font-semibold transition"
            >
              {isBn ? "সকল প্রশ্নোত্তর দেখুন →" : "View All Q&A →"}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {homeQuestions.slice(0, 4).map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onOpenDetails={(selected) => setActiveCommunityQuestion(selected)}
            />
          ))}
        </div>
      </section>

      {/* ================= 15. INTERACTIVE FAQ (ACCESSIBLE DETAILS ACCORDION) ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            {isBn ? "সাধারণ প্রশ্নোত্তর" : "Frequently Asked Questions"}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {isBn ? "এসআরওটি (SROT) প্ল্যাটফর্ম সম্পর্কে জানুন" : "Understanding the SROT Platform"}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? "টেলি-পরামর্শ, ডিজিটাল প্রেসক্রিপশন ও বিকাশ/নগদে ফি প্রদানের নিয়মাবলী।"
              : "How our tele-advisory, digital prescriptions, and multi-sector system operate."}
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: isBn
                ? "আমি কি একই অ্যাকাউন্ট দিয়ে ধানক্ষেত, ডেইরি গরু ও পোষা বিড়ালের চিকিৎসা নিতে পারব?"
                : "Can I manage both crop acreage and livestock or pets under one account?",
              a: isBn
                ? "হ্যাঁ। এসআরওটি প্ল্যাটফর্মে একাউন্টে আপনি একই সাথে আপনার ধানের জমি, খামারের গরু-ছাগল এবং পোষা প্রাণীর প্রোফাইল যুক্ত করতে পারবেন। আমাদের বুদ্ধিমান রাউটিং সিস্টেম স্বয়ংক্রিয়ভাবে কেসটি সংশ্লিষ্ট উদ্ভিদ রোগতত্ত্ববিদ বা ভেটেরিনারি সার্জনের কাছে পাঠাবে।"
                : "Yes. SROT was built around generic users and entities. You can register rice fields, orchards, a 30-head dairy herd, and your family dog under the same single account. The consultation engine automatically routes each case to the right agronomist or veterinarian.",
            },
            {
              q: isBn
                ? "বিকাশ বা নগদ দিয়ে কীভাবে পরামর্শ ফি দেওয়া যায়?"
                : "How do I pay consultation fees using bKash or Nagad?",
              a: isBn
                ? "কনসালটেশন বুকিংয়ের সময় সরাসরি বিকাশ (bKash), নগদ (Nagad) অথবা রকেটের সুরক্ষিত অনলাইন গেটওয়ের মাধ্যমে মাত্র ৳২৫০ ফি পরিশোধ করা যায়। সফল পেমেন্টের সাথে সাথেই আপনার প্রেসক্রিপশন চেম্বার সক্রিয় হবে।"
                : "During booking, you can pay via bKash, Nagad, Rocket, or cards starting from ৳250 ($2.50). Once confirmed, your tele-consultation room activates instantly.",
            },
            {
              q: isBn
                ? "ডিজিটাল প্রেসক্রিপশন কি ভেটেরিনারি ওষুধ কিনতে গ্রহণ করবে?"
                : "Are the digital veterinary prescriptions legally verifiable at pharmacies?",
              a: isBn
                ? "হ্যাঁ। আমাদের প্রতিটি প্রেসক্রিপশনে বাংলাদেশ ভেটেরিনারি কাউন্সিল (BVC) নিবন্ধিত সার্জনের রেজিস্ট্রেশন নম্বর, ডিজিটাল কিউআর কোড এবং ওষুধের সঠিক উইথহোল্ডিং মেয়াদ স্পষ্টভাবে উল্লেখ থাকে, যা যেকোনো রেজিস্টার্ড ভেট ফার্মেসিতে শতভাগ বৈধ।"
                : "Yes. Each prescription is issued by a veterinarian with their official Veterinary Council registration number, cryptographic checksum, exact body-weight dosage, and mandated milk or meat withholding period.",
            },
            {
              q: isBn
                ? "জরুরি অবস্থায় খামারে কোনো আকস্মিক মহামারি দেখা দিলে কী করণীয়?"
                : "What if I experience an emergency crop swarm or downer cow in Bangladesh?",
              a: isBn
                ? "আমাদের উপরের নেভিগেশন বার থেকে 'জরুরি হটলাইন' বাটনে ক্লিক করুন অথবা সরকারি কৃষি কল সেন্টার ১৬১২৩ কিংবা ৩৩৩-এ ফোন করুন। আমাদের ইমার্জেন্সি রোস্টার থেকে ১০ মিনিটের মধ্যে অন-কল ডাক্তারের সাথে কথা বলতে পারবেন।"
                : "Click the 24/7 SOS Helpline button in the top navigation or call Bangladesh Krishi Call Centre 16123 or 333. Emergency cases receive priority dispatch and under 10-minute specialist connection.",
            },
            {
              q: isBn
                ? "ফসলের পাতার ছবি তুলে কীভাবে রোগ নির্ণয় করব?"
                : "How does the rapid photo diagnosis work for crop leaf diseases?",
              a: isBn
                ? "আপনার মোবাইল দিয়ে ধানের পাতা বা আক্রান্ত ফসলের স্পষ্ট আলোতে ছবি তুলুন এবং প্ল্যাটফর্মে আপলোড করুন। আমাদের এআই ও উদ্ভিদ রোগতত্ত্ববিদ ১৫-২০ মিনিটের মধ্যে রোগের স্পেকট্রাল বিশ্লেষণ ও অনুমোদিত বালাইনাশকের ডোজ পাঠাবেন।"
                : "When you upload high-resolution photos of affected leaves or stems, our certified plant pathologists inspect lesion morphology, collar rings, and fungal spores. In under 25 minutes, you receive a verified diagnosis and downloadable spray schedule.",
            },
          ].map((faq, idx) => (
            <details
              key={idx}
              name="srot-faq"
              className="srot-glass-card hover-glow-emerald rounded-2xl border border-slate-800 p-5 group transition-all"
            >
              <summary className="flex items-center justify-between cursor-pointer font-bold text-white text-sm list-none select-none">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed pl-6">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ================= 16. FINAL CALL TO ACTION ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0a141f] to-teal-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden group hover-glow-emerald">
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
              {isBn ? "লাইভ টেলি-পরামর্শ সেবা সক্রিয়" : "Instant Tele-Advisory Active"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              {isBn ? "আপনার ফসল, খামার ও পোষা প্রাণীর সুরক্ষায় প্রস্তুত?" : "Ready to Protect Your Crops, Herds & Pets?"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              {isBn
                ? "এখনই বিএআরআই/বিআরআরআই সার্টিফাইড কৃষিবিদ বা বিভিসি নিবন্ধিত ভেটেরিনারি ডাক্তারের সাথে পরামর্শ নিন। আধুনিক বাংলাদেশের কৃষিকে করুন লাভজনক ও নিরাপদ।"
                : "Book a consultation with certified plant pathologists or veterinary surgeons now. Experience the power of modern agricultural & veterinary tele-health."}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/consult"
                className="btn-shimmer px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm transition shadow-xl shadow-emerald-950/80 hover:scale-105 active:scale-95"
              >
                {isBn ? "পরামর্শ বুক করুন (৳২৫০ থেকে)" : "Book Advisory Consultation"}
              </Link>
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-sm hover:bg-slate-800 transition flex items-center gap-2 hover-glow-emerald"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? "ডোজ ক্যালকুলেটর খুলুন" : "Open Dosage Calculator"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Dosage Calculator Modal on Homepage */}
      <DosageCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Community Q&A Modals */}
      <AskQuestionModal
        isOpen={isHomeAskModalOpen}
        onClose={() => setIsHomeAskModalOpen(false)}
        onSubmitQuestion={(newQ) => setHomeQuestions([newQ, ...homeQuestions])}
      />
      <QuestionDetailModal
        question={activeCommunityQuestion}
        onClose={() => setActiveCommunityQuestion(null)}
      />
    </div>
  );
}
