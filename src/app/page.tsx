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
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
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
} from "lucide-react";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");
  const [heroSector, setHeroSector] = useState<"agri" | "livestock" | "pet">("agri");
  const { openRoleModal, currentUser } = useUserStore();

  const filteredServices =
    activeCategory === "all"
      ? PLATFORM_SERVICES
      : PLATFORM_SERVICES.filter((s) => s.category === activeCategory);

  // Quick Triage Demo Presets for Hero Interactive Simulator
  const heroTriagePresets = {
    agri: {
      tag: "Crop Disease Triage",
      title: "Rice Blast (Pyricularia oryzae)",
      symptom: "Diamond spindle lesions on tillering leaves",
      doctor: "Dr. Ramesh Patel (Chief Plant Pathologist)",
      solution: "Tricyclazole 75% WP + Silica Soil Amendment",
      safety: "21 Days Pre-Harvest Withholding Period",
      sampleCaseId: "consult-agri-101",
      icon: <Wheat className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/40 bg-emerald-950/30",
    },
    livestock: {
      tag: "Dairy Veterinary Triage",
      title: "Acute Bovine Mastitis (Hind Quarter)",
      symptom: "Swollen hot quarter with milk curdling",
      doctor: "Dr. Ananya Sen, M.V.Sc. (Veterinary Surgeon)",
      solution: "Intramammary Infusion + Cold Water Hydrotherapy",
      safety: "72 Hours Strict Milk Withholding Interval",
      sampleCaseId: "consult-vet-202",
      icon: <Milk className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/40 bg-cyan-950/30",
    },
    pet: {
      tag: "Companion Pet Tele-Vet",
      title: "Canine Atopic Dermatitis & Ear Pruritus",
      symptom: "Intense paw licking, red inflamed groin",
      doctor: "Dr. Elena Rostova, D.V.M. (Small Animal Clinician)",
      solution: "Weight-Titrated Oclacitinib + Otic Drops",
      safety: "Weight-specific dosage verified (31.5 kg)",
      sampleCaseId: "consult-pet-303",
      icon: <HeartHandshake className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/40 bg-amber-950/30",
    },
  };

  const currentPreset = heroTriagePresets[heroSector];

  return (
    <div className="w-full srot-grid-pattern srot-ambient-glow pb-24">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 Cols: Headline & Sector Selector */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>COUNCIL-ACCREDITED TELE-HEALTH FOR AGRICULTURE & ANIMALS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-sans">
                Scientific Advisory & Digital Rx for Every{" "}
                <span className="text-gradient-hero">
                  Field, Herd & Companion Animal.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                Connect with verified plant pathologists, agronomists, and veterinarians in minutes. From crop blights and soil fertility to livestock disease and pet wellness — receive rapid visual diagnosis and verifiable official prescriptions.
              </p>

              {/* Sector Switcher Pills in Hero */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Choose Your Sector to Preview Live Triage:
                </span>
                <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md gap-1">
                  {[
                    { id: "agri", label: "🌾 Crop Advisory", color: "text-emerald-400" },
                    { id: "livestock", label: "🐄 Livestock & Dairy", color: "text-cyan-400" },
                    { id: "pet", label: "🐕 Companion Pets", color: "text-amber-400" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setHeroSector(s.id as any)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                        heroSector === s.id
                          ? "bg-slate-800 text-white shadow-md border border-slate-600"
                          : "text-slate-400 hover:text-white"
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
                  className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm transition shadow-xl shadow-emerald-950/60 hover:-translate-y-0.5"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Start Consultation Flow</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/services"
                  className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm transition"
                >
                  Explore All Services
                </Link>

                <button
                  onClick={openRoleModal}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold transition"
                >
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Switch Persona ({currentUser.name.split(" ")[0]})</span>
                </button>
              </div>

              {/* Real-Time Metrics Strip */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block">14,800+</span>
                  <span className="text-xs text-slate-400 font-medium">Verified Solved Cases</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">&lt; 20 Mins</span>
                  <span className="text-xs text-slate-400 font-medium">Average Response Time</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-cyan-400 block">100%</span>
                  <span className="text-xs text-slate-400 font-medium">Council Registered Vets</span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Live Interactive Triage Simulation Card */}
            <div className="lg:col-span-5">
              <div className={`srot-glass-card rounded-3xl p-6 sm:p-7 border ${currentPreset.color} shadow-2xl relative transition-all duration-300`}>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-slate-800/90 border border-slate-700">
                      {currentPreset.icon}
                    </span>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Live Case Triage Preview
                      </span>
                      <h4 className="text-xs font-bold text-white">{currentPreset.tag}</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Doctor Active
                  </span>
                </div>

                <div className="py-4 space-y-3">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 block">Reported Symptoms:</span>
                    <p className="text-xs text-slate-200 font-medium mt-0.5">{currentPreset.symptom}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 block">Pathology / Clinical Diagnosis:</span>
                    <p className="text-xs font-bold text-emerald-300 mt-0.5">{currentPreset.title}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-400 block">Prescribed Action & Spray / Medicine:</span>
                    <p className="text-xs text-white font-semibold mt-0.5">{currentPreset.solution}</p>
                    <span className="text-[10px] text-amber-400 block mt-1 font-mono">
                      Safety Protocol: {currentPreset.safety}
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
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center transition shadow-lg shadow-emerald-950/60"
                  >
                    Open Live Case Room &rarr;
                  </Link>
                  <Link
                    href={`/consult?category=${heroSector === "pet" ? "pet" : heroSector === "livestock" ? "veterinary" : "agri"}`}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                  >
                    Book New
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ARCHITECTURAL DESIGN SPOTLIGHT ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="srot-glass-card rounded-3xl p-6 sm:p-10 border border-white/[0.08] bg-gradient-to-b from-slate-900/70 to-slate-950/90 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                <Layers className="w-4 h-4" /> Multi-Sector Modular Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                One Platform, Generic Database & Scalable Service Modules
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
                Animal Healthcare and Companion Pet Care are not separate websites. They share the same generic consultation booking engine, practitioner directory, and cryptographic prescription generator.
              </p>
            </div>

            <Link
              href="/admin"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition self-start lg:self-auto"
            >
              <Sliders className="w-4 h-4" />
              <span>Admin Module Switcher & Telemetry &rarr;</span>
            </Link>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Agri */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Wheat className="w-6 h-6" />
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Phase 1 • Live
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg">Agriculture Advisory</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Grain crops, horticulture, orchards, and cash crops.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Crop Leaf Blast, Blight & Root Rot Diagnosis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Basal & Top-Dressing N-P-K Soil Balancing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>IPM Bio-Control & Pesticide Resistance Control</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>On-Site Farm Acreage Agronomist Inspections</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/services?cat=agri"
                className="mt-6 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>View Agri Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Livestock */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Milk className="w-6 h-6" />
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                    Phase 2 • Live
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg">Animal Healthcare (Herd)</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Commercial dairy, poultry flocks, sheep, and aquaculture.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Subclinical & Clinical Mastitis CMT Scoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Broiler FCR Optimization & Coccidiosis Control</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Small Ruminant Deworming (FAMACHA Score)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Pond Oxygen Crashes & Aquaculture Chemistry</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/services?cat=veterinary"
                className="mt-6 text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>View Livestock Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pets */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <HeartHandshake className="w-6 h-6" />
                  </span>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    Phase 2 • Live
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg">Companion Pet Care</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Dogs, cats, rabbits, and domestic companion animals.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>24/7 Small-Animal Video Tele-Vet Consultations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Skin Allergy & Flea/Tick Dermatitis Triage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Weight & Clinical Prescription Nutrition Plans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Downloadable Official Vet Prescriptions (PDF)</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/services?cat=pet"
                className="mt-6 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>View Pet Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (4 STEPS) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Rapid 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
            How Tele-Advisory Works on SROT
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Accredited science delivered straight to your field or home in under 20 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Upload Photos or Request Video",
              desc: "Snap close-up photos of leaf lesions, animal symptoms, or request a scheduled HD video call.",
              icon: <Camera className="w-6 h-6 text-emerald-400" />,
            },
            {
              step: "02",
              title: "Pre-Screening & Doctor Match",
              desc: "Our engine routes your case to certified plant pathologists or veterinary surgeons on duty.",
              icon: <Stethoscope className="w-6 h-6 text-cyan-400" />,
            },
            {
              step: "03",
              title: "Live Examination & Triage",
              desc: "Discuss symptoms over chat or face-to-face video. Clarify history, recent weather, and feed.",
              icon: <Video className="w-6 h-6 text-amber-400" />,
            },
            {
              step: "04",
              title: "Receive Signed Digital Rx",
              desc: "Download official PDF prescription with exact dosages, active formulations, and withholding rules.",
              icon: <Download className="w-6 h-6 text-emerald-400" />,
            },
          ].map((item, i) => (
            <div key={i} className="srot-glass-card rounded-2xl p-6 border border-slate-800 relative group">
              <span className="text-4xl font-black text-slate-800/80 absolute top-4 right-4 font-mono">
                {item.step}
              </span>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700/80 inline-block mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MODULAR SERVICES CATALOG ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Service Catalog
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              Select an Advisory or Clinical Service
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "All Services" },
              { id: "agri", label: "Agriculture" },
              { id: "veterinary", label: "Animal Health" },
              { id: "pet", label: "Pet Care" },
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

      {/* ================= FEATURED PRACTITIONERS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Verified Accreditation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              Council-Registered Specialists
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Each consultant possesses verifiable state council licensing numbers and field credentials.
            </p>
          </div>

          <Link
            href="/experts"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>View All Practitioners &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLATFORM_EXPERTS.slice(0, 3).map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </section>

      {/* ================= DOWNLOADABLE OFFICIAL RX SHOWCASE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="srot-glass-card rounded-3xl p-6 sm:p-10 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-950">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Official Clinical Documents
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Verifiable Advisory Reports & Digital Rx
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Every completed consultation outputs a signed A4 PDF document containing diagnosis, active formulations, and pre-harvest or milk/meat safety intervals.
              </p>
            </div>

            <button
              onClick={() => generatePrescriptionPdf(INITIAL_CONSULTATIONS[0])}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition shadow-lg self-start md:self-auto"
            >
              <Download className="w-4 h-4" />
              <span>Test Download Sample Rx (PDF)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_CONSULTATIONS.slice(0, 2).map((c) => (
              <ConsultationCard key={c.id} consultation={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= KNOWLEDGE HUB ARTICLES ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Evidence-Based Protocols
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              Field Protocols from the Knowledge Hub
            </h2>
          </div>

          <Link
            href="/knowledge"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>Explore All Protocols &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KNOWLEDGE_ARTICLES.slice(0, 3).map((article) => (
            <KnowledgeCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* ================= INTERACTIVE FAQ (ACCESSIBLE DETAILS ACCORDION) ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Understanding the SROT Platform
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            How our tele-advisory, digital prescriptions, and multi-sector system operate.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Can I manage both crop acreage and livestock or pets under one account?",
              a: "Yes. SROT was built around generic users and entities. You can register rice fields, orchards, a 30-head dairy herd, and your family dog under the same single account. The consultation engine automatically routes each case to the right agronomist or veterinarian.",
            },
            {
              q: "How does the rapid photo diagnosis work for crop leaf diseases?",
              a: "When you upload high-resolution photos of affected leaves or stems, our certified plant pathologists inspect lesion morphology, collar rings, and fungal spores. In under 25 minutes, you receive a verified diagnosis and downloadable spray schedule.",
            },
            {
              q: "Are the digital veterinary prescriptions legally verifiable?",
              a: "Yes. Each prescription is issued by a veterinarian with their official Veterinary Council registration number, cryptographic checksum, exact body-weight dosage, and mandated milk or meat withholding period.",
            },
            {
              q: "What if I experience an emergency crop swarm or downer cow?",
              a: "Click the 24/7 Agro-Vet Emergency button in the top navigation or call our toll-free helpline at 1800-SROT-SOS. Emergency cases receive priority dispatch and under 10-minute specialist connection.",
            },
            {
              q: "How does the modular architecture benefit developers and business growth?",
              a: "You launch Phase 1 with Agriculture Advisory and the Knowledge Hub. Later, Animal Healthcare, Pet Care, and Marketplace plug-ins can be enabled without needing a database rewrite or redesign.",
            },
          ].map((faq, idx) => (
            <details
              key={idx}
              name="srot-faq"
              className="srot-glass-card rounded-2xl border border-slate-800 p-5 group transition-all"
            >
              <summary className="flex items-center justify-between cursor-pointer font-bold text-white text-sm list-none select-none">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed pl-6">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ================= FINAL CALL TO ACTION ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0a141f] to-teal-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Instant Tele-Advisory Active
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Ready to Protect Your Crops, Herds & Pets?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Book a consultation with certified plant pathologists or veterinary surgeons now. Experience the power of modern agricultural & veterinary tele-health.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/consult"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm transition shadow-xl shadow-emerald-950/80 hover:scale-105"
              >
                Book Advisory Consultation
              </Link>
              <Link
                href="/services"
                className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-sm hover:bg-slate-800 transition"
              >
                Browse Service Directory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
