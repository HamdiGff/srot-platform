"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Milk,
  MapPin,
  Phone,
  Edit2,
  Plus,
  Trash2,
  Save,
  CalendarCheck,
  FileText,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  X,
  Activity,
  Clock,
  Heart,
  Droplets,
  Truck,
  TrendingUp,
  Download,
  ArrowRight,
  Flame,
  ShieldAlert,
} from "lucide-react";

interface WithholdingRecord {
  id: string;
  cowTag: string;
  drugName: string;
  dose: string;
  totalHours: number;
  remainingHours: number;
  administeredDate: string;
}

export function DairyFarmerPanel() {
  const { currentUser, updateProfile, addEntity, updateEntity, deleteEntity } = useUserStore();
  const { getByUserRole } = useConsultationStore();
  const { getQuestionsByAuthor, deleteQuestion } = useCommunityStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const consultations = getByUserRole("livestock_farmer", currentUser.id);
  const myQuestions = getQuestionsByAuthor(currentUser.name);

  // Active Workspace Tab
  const [activeTab, setActiveTab] = useState<"herd" | "withholding" | "yield" | "prescriptions" | "dispatch" | "community">("herd");

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);

  // New Cattle Entity Modal State
  const [isAddCowModalOpen, setIsAddCowModalOpen] = useState(false);
  const [tagNumber, setTagNumber] = useState("");
  const [breed, setBreed] = useState("Holstein Friesian Cross (HF-75%)");
  const [lactationStage, setLactationStage] = useState("2nd Lactation • Day 85");
  const [dailyYield, setDailyYield] = useState("24 Liters/day");

  // Editing Entity State
  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [editEntityDetails, setEditEntityDetails] = useState("");

  // Milk Yield Tracker State
  const [morningYield, setMorningYield] = useState<number>(14);
  const [eveningYield, setEveningYield] = useState<number>(12);
  const [milkPricePerLitre, setMilkPricePerLitre] = useState<number>(75); // BDT

  // Withholding Timer Records
  const [withholdings, setWithholdings] = useState<WithholdingRecord[]>([
    {
      id: "wh-1",
      cowTag: "HF-108 (সুলতানা)",
      drugName: "Ceftiofur Sodium 1g IM + Intramammary Infusion",
      dose: "Mastitis Acute Treatment",
      totalHours: 72,
      remainingHours: 19,
      administeredDate: "2026-11-03 08:00 AM",
    },
    {
      id: "wh-2",
      cowTag: "SH-402 (চম্পা)",
      drugName: "Oxytetracycline LA 200mg/ml",
      dose: "Systemic Respiratory Infection",
      totalHours: 96,
      remainingHours: 0,
      administeredDate: "2026-10-30 10:00 AM",
    },
  ]);

  const [isAddWithholdingOpen, setIsAddWithholdingOpen] = useState(false);
  const [whCowTag, setWhCowTag] = useState("HF-108 (সুলতানা)");
  const [whDrug, setWhDrug] = useState("Ceftiofur Sodium 1g (72 Hours)");
  const [whHours, setWhHours] = useState<number>(72);

  // Artificial Insemination Dispatch Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiCowTag, setAiCowTag] = useState("HF-108");
  const [aiBreedStraw, setAiBreedStraw] = useState("100% Pedigree Holstein Friesian Straw");
  const [aiSuccess, setAiSuccess] = useState(false);

  const totalDailyYield = morningYield + eveningYield;
  const monthlyRevenue = totalDailyYield * 30 * milkPricePerLitre;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, location });
    setIsProfileModalOpen(false);
  };

  const handleAddCow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagNumber.trim()) return;
    addEntity({
      name: `Cattle Tag #${tagNumber.trim().toUpperCase()}`,
      type: "livestock",
      details: `${breed} • ${lactationStage} • Yield: ${dailyYield}`,
      icon: "Milk",
    });
    setTagNumber("");
    setIsAddCowModalOpen(false);
  };

  const handleAddWithholding = (e: React.FormEvent) => {
    e.preventDefault();
    setWithholdings([
      {
        id: `wh-${Date.now()}`,
        cowTag: whCowTag,
        drugName: whDrug,
        dose: "Active Antibiotic Administration",
        totalHours: whHours,
        remainingHours: whHours,
        administeredDate: new Date().toLocaleString(),
      },
      ...withholdings,
    ]);
    setIsAddWithholdingOpen(false);
  };

  const handleRequestAiDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setAiSuccess(true);
    setTimeout(() => {
      setAiSuccess(false);
      setIsAiModalOpen(false);
    }, 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. DAIRY PRODUCER OVERVIEW STRIP */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-cyan-500/25 bg-gradient-to-r from-cyan-950/50 via-slate-900 to-[#030910] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cyan-500/70 shadow-lg shrink-0"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <Milk className="w-3 h-3" />
                <span>{currentUser.roleLabel}</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">ID: {currentUser.id}</span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 font-mono text-[10px] border border-cyan-500/30">
                Milk Union Member • Sirajganj Belt
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentUser.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentUser.phone}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition shadow-sm"
          >
            <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isBn ? "প্রোফাইল সম্পাদন" : "Edit Dairy Profile"}</span>
          </button>

          <Link
            href="/consult?category=veterinary"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 text-xs font-black transition shadow-lg shadow-cyan-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>{isBn ? "ভেটেরিনারি সার্জন (৳৩০০)" : "Consult Bovine Vet (৳300)"}</span>
          </Link>
        </div>
      </div>

      {/* 2. THE MODERN WORKSPACE NAVIGATION TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-white/[0.08] text-xs">
        {[
          { id: "herd", label: isBn ? "গবাদিপশু ও ইয়ার-ট্যাগ" : "Herd & Ear-Tags", icon: Milk, count: currentUser.registeredEntities?.length || 0 },
          { id: "withholding", label: isBn ? "উইথহোল্ডিং সেফটি রাডার" : "Withholding Safety Radar", icon: Clock, count: withholdings.filter(w => w.remainingHours > 0).length },
          { id: "yield", label: isBn ? "দুধের রেকর্ড ও আয় হিসাব" : "Milk Yield & Revenue", icon: TrendingUp },
          { id: "prescriptions", label: isBn ? "বিভিসি প্রেসক্রিপশন হিস্ট্রি" : "BVC Prescriptions", icon: FileText, count: consultations.length },
          { id: "dispatch", label: isBn ? "কৃত্রিম প্রজনন (AI) টেকনিশিয়ান" : "Dispatch AI Tech", icon: Truck },
          { id: "community", label: isBn ? "আমার ডেইরি প্রশ্ন" : "My Questions", icon: MessageSquare, count: myQuestions.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 border border-cyan-500/50 text-cyan-300 shadow-md font-black ring-1 ring-cyan-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : ""}`} />
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span className="px-1.5 py-0.2 rounded-full bg-slate-950 text-[10px] font-mono border border-white/10">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: HERD & CATTLE EAR-TAG REGISTRY */}
      {/* ========================================================================= */}
      {activeTab === "herd" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                {isBn ? "নিবন্ধিত গাভী ও ইয়ার-ট্যাগ রেজিস্ট্রি" : "Registered Dairy Herd & Livestock"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn ? "প্রতিটি গাভীর স্বাস্থ্য পরীক্ষা, দুধ উৎপাদন ও টিকাদানের ডিজিটাল রেকর্ড রাখুন।" : "Manage ear-tags, lactation cycles, and daily production metrics."}
              </p>
            </div>

            <button
              onClick={() => setIsAddCowModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isBn ? "নতুন গাভী যোগ করুন" : "Add Cattle Ear-Tag"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(currentUser.registeredEntities || []).map((cow) => {
              const isEditing = editingEntityId === cow.id;
              return (
                <div
                  key={cow.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] hover:border-cyan-500/40 transition flex flex-col justify-between gap-3 shadow-lg group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                          <Milk className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">{cow.name}</h3>
                          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                            Verified RFID E-Tag
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            if (isEditing) {
                              updateEntity(cow.id, { details: editEntityDetails });
                              setEditingEntityId(null);
                            } else {
                              setEditingEntityId(cow.id);
                              setEditEntityDetails(cow.details);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 transition"
                          title={isEditing ? "Save Cattle" : "Edit Cattle"}
                        >
                          {isEditing ? <Save className="w-3.5 h-3.5 text-cyan-400" /> : <Edit2 className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(isBn ? "গাভীটি মুছে ফেলতে চান?" : "Delete this animal record?")) {
                              deleteEntity(cow.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 transition"
                          title="Delete Cattle"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {isEditing ? (
                      <div className="mt-3">
                        <input
                          type="text"
                          value={editEntityDetails}
                          onChange={(e) => setEditEntityDetails(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-white text-xs focus:outline-none"
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-slate-300 mt-3 font-mono leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-white/[0.04]">
                        {cow.details}
                      </p>
                    )}
                  </div>

                  {/* Telemetry Strip for Cattle */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-t border-white/[0.06] text-center text-[10px] font-mono">
                    <div className="p-1.5 rounded-lg bg-slate-900/40 border border-white/[0.04]">
                      <span className="text-slate-400 block">Somatic Count</span>
                      <span className="text-emerald-400 font-bold">&lt; 200k/ml Good</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/40 border border-white/[0.04]">
                      <span className="text-slate-400 block">Body Temp</span>
                      <span className="text-cyan-400 font-bold">38.6°C Normal</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/40 border border-white/[0.04]">
                      <span className="text-slate-400 block">AI Heat Due</span>
                      <span className="text-amber-400 font-bold">In 12 Days</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      onClick={() => {
                        setAiCowTag(cow.name);
                        setIsAiModalOpen(true);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isBn ? "কৃত্রিম প্রজনন বুক" : "Book AI Straw"}</span>
                    </button>

                    <Link
                      href={`/consult?category=veterinary&query=${encodeURIComponent(cow.name)}`}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-bold text-xs transition border border-cyan-500/30 flex items-center gap-1"
                    >
                      <span>{isBn ? "ভেটেরিনারি ট্রায়াজ" : "Run Vet Triage"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERACTIVE ANTIBIOTIC WITHHOLDING SAFETY RADAR */}
      {/* ========================================================================= */}
      {activeTab === "withholding" && (
        <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 bg-slate-950/90 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isBn ? "অ্যান্টিবায়োটিক উইথহোল্ডিং ও খাদ্য নিরাপত্তা রাডার" : "Statutory Antibiotic Milk & Meat Withdrawal Radar"}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isBn
                  ? "ওষুধ প্রয়োগকৃত গাভীর দুধ বা মাংস কত ঘণ্টা বাজারে বিক্রি নিষিদ্ধ তা নির্ভুলভাবে পর্যবেক্ষণ করুন।"
                  : "Zero-tolerance residue monitor to protect consumers from antibiotic resistance & export rejection."}
              </p>
            </div>

            <button
              onClick={() => setIsAddWithholdingOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold transition shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isBn ? "নতুন ওষুধ টাইমার শুরু" : "Start Withholding Timer"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {withholdings.map((w) => {
              const isLocked = w.remainingHours > 0;
              const percentElapsed = Math.round(((w.totalHours - w.remainingHours) / w.totalHours) * 100);

              return (
                <div
                  key={w.id}
                  className={`p-5 rounded-2xl border transition space-y-4 ${
                    isLocked
                      ? "bg-rose-950/20 border-rose-500/40 shadow-lg shadow-rose-950/30"
                      : "bg-emerald-950/20 border-emerald-500/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">{w.administeredDate}</span>
                      <h3 className="text-sm font-black text-white mt-0.5">{w.cowTag}</h3>
                      <p className="text-xs text-slate-300 font-mono mt-1">{w.drugName}</p>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider font-mono shrink-0 ${
                        isLocked
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      }`}
                    >
                      {isLocked ? "Milk Discard Mandatory" : "Milk Safe to Sell"}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Total Withdrawal: {w.totalHours} Hours</span>
                      <span className={`font-bold ${isLocked ? "text-rose-400" : "text-emerald-400"}`}>
                        {isLocked ? `${w.remainingHours}h Remaining` : "Completed"}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-white/[0.06]">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isLocked ? "bg-gradient-to-r from-amber-500 to-rose-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${percentElapsed}%` }}
                      />
                    </div>
                  </div>

                  {/* Directive Box */}
                  <div className={`p-3 rounded-xl text-xs font-medium leading-relaxed ${
                    isLocked
                      ? "bg-rose-900/30 border border-rose-500/30 text-rose-200"
                      : "bg-emerald-900/30 border border-emerald-500/30 text-emerald-200"
                  }`}>
                    {isLocked ? (
                      <p>
                        ⚠️ <strong>খাদ্য নিরাপত্তা সতর্কতা:</strong> এই গাভীর দুধ পরবর্তী {w.remainingHours} ঘণ্টা ডেইরি সেন্টারে বিক্রি করা আইনগতভাবে নিষিদ্ধ। দুধ সম্পূর্ণ মাটিতে পুঁতে ফেলুন। বাছুরকে খাওয়াবেন না।
                      </p>
                    ) : (
                      <p>
                        ✅ <strong>নিরাপদ অনুমোদন:</strong> উইথহোল্ডিং সময়সীমা অতিক্রান্ত হয়েছে। দুধে কোনো ক্ষতিকর অ্যান্টিবায়োটিক অবশিষ্টাংশ নেই। স্বাভাবিকভাবে বিক্রির জন্য প্রস্তুত।
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DAILY MILK YIELD & REVENUE ESTIMATOR */}
      {/* ========================================================================= */}
      {activeTab === "yield" && (
        <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] bg-slate-950/80 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isBn ? "দৈনিক দুধ উৎপাদন ও খামারের রাজস্ব হিসাব" : "Daily Bulk Milk Yield & Revenue Forecaster"}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isBn ? "সকাল ও বিকালের দোহন পরিমাণ দিয়ে মাসিক সম্ভাব্য নিট আয় গণনা করুন।" : "Calculate projected milk cashflow based on Sirajganj / Milk Vita procurement rates."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">সকালের দোহন (Morning Yield - L):</label>
              <input
                type="number"
                min={0}
                value={morningYield}
                onChange={(e) => setMorningYield(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">বিকালের দোহন (Evening Yield - L):</label>
              <input
                type="number"
                min={0}
                value={eveningYield}
                onChange={(e) => setEveningYield(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">প্রতি লিটার বাজার দর (BDT / L):</label>
              <input
                type="number"
                min={10}
                value={milkPricePerLitre}
                onChange={(e) => setMilkPricePerLitre(Math.max(10, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Revenue KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">দৈনিক মোট দুধ উৎপাদন</span>
              <span className="text-2xl font-black text-white font-mono mt-1 block">{totalDailyYield} Liters</span>
              <span className="text-[10px] text-cyan-400 font-mono">সকাল {morningYield}L + বিকাল {eveningYield}L</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">দৈনিক আনুমানিক বিক্রি</span>
              <span className="text-2xl font-black text-white font-mono mt-1 block">৳{totalDailyYield * milkPricePerLitre}</span>
              <span className="text-[10px] text-emerald-400 font-mono">প্রতিদিন নগদ আদায়</span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">মাসিক প্রত্যাশিত আয়</span>
              <span className="text-2xl font-black text-white font-mono mt-1 block">৳{monthlyRevenue.toLocaleString()}</span>
              <span className="text-[10px] text-teal-400 font-mono">৩০ দিনের প্রক্ষেপণ</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: BVC VETERINARY PRESCRIPTIONS ARCHIVE */}
      {/* ========================================================================= */}
      {activeTab === "prescriptions" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                {isBn ? "বাংলাদেশ ভেটেরিনারি কাউন্সিল (BVC) রেজিস্টার্ড প্রেসক্রিপশন" : "BVC Certified Veterinary Prescriptions"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn ? "ভেটেরিনারি সার্জনদের স্বাক্ষরিত অফিসিয়াল চিকিৎসাপত্র ও নিরাপদ উইথহোল্ডিং নির্দেশনা।" : "Verifiable prescriptions with withdrawal schedules and drug dosage instructions."}
              </p>
            </div>

            <span className="text-xs font-mono text-cyan-400 font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              {consultations.length} Consultations
            </span>
          </div>

          {consultations.length > 0 ? (
            <div className="space-y-3">
              {consultations.map((c) => (
                <div
                  key={c.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg hover:border-cyan-500/40 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                        {c.caseNumber}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-400">{formatDate(c.createdAt)}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-200 font-semibold">{c.serviceName}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white">
                      Attending Surgeon: {c.expert.name} ({c.expert.title})
                    </h3>

                    {c.prescription && (
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.06] text-xs space-y-1 mt-2">
                        <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Diagnosis: {c.prescription.diagnosisTitle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                          <span>Active Medication: <strong>{c.prescription.medicationsOrSprays[0]?.item}</strong></span>
                          <span>•</span>
                          <span className="text-rose-400 font-mono font-bold">
                            Withholding: {c.prescription.medicationsOrSprays[0]?.withholdingSafetyPeriod}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => generatePrescriptionPdf(c)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isBn ? "পিডিএফ ডাউনলোড" : "Download PDF"}</span>
                    </button>

                    <Link
                      href={`/consult/${c.id}`}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-black text-xs transition shadow-md shadow-cyan-500/20"
                    >
                      {isBn ? "চেম্বার পাস →" : "Chamber Pass →"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-white/[0.04] text-slate-400 text-xs">
              {isBn ? "এখনও কোনো প্রেসক্রিপশন নেই।" : "No clinical prescription records available."}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: DISPATCH ARTIFICIAL INSEMINATION (AI) PARAVET */}
      {/* ========================================================================= */}
      {activeTab === "dispatch" && (
        <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] bg-slate-950/80 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isBn ? "উন্নত জাতের কৃত্রিম প্রজনন (AI) টেকনিশিয়ান ডোরস্টেপ সার্ভিস" : "Pedigree Artificial Insemination (AI) Doorstep Dispatch"}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isBn ? "লিকুইড নাইট্রোজেন ক্রায়ো-ক্যানিস্টারে সংরক্ষিত ১০০% সংকর হোলস্টাইন ও শাহিওয়াল সিমেন।" : "Certified AI technician arrives with -196°C cryo-tank within 2 hours of standing heat notification."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/[0.08] space-y-2">
              <span className="text-xs font-black text-cyan-400 font-mono">01. HOLSTEIN FRIESIAN</span>
              <h3 className="text-sm font-bold text-white">100% HF Pedigree Straw</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                উচ্চ দুধ উৎপাদনক্ষম ডাচ লাইন (২৫-৩৫ লিটার/দিন প্রজেকশন)।
              </p>
              <span className="text-xs font-bold text-white font-mono block pt-2">৳1,200 All Included</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/[0.08] space-y-2">
              <span className="text-xs font-black text-amber-400 font-mono">02. SAHIWAL DUAL-PURPOSE</span>
              <h3 className="text-sm font-bold text-white">Pure Sahiwal Breed Straw</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                উচ্চ তাপ ও রোগ সহনশীল জাত, ফ্যাট শতকরা ৪.৫% এর ওপরে।
              </p>
              <span className="text-xs font-bold text-white font-mono block pt-2">৳1,000 All Included</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/[0.08] space-y-2">
              <span className="text-xs font-black text-purple-400 font-mono">03. PREGNANCY SCAN</span>
              <h3 className="text-sm font-bold text-white">45-Day USG / Rectal Exam</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ইনসেমিনেশনের ৪৫ দিন পর গর্ভধারণ নিশ্চিতকরণ পরীক্ষা।
              </p>
              <span className="text-xs font-bold text-white font-mono block pt-2">৳400 Follow-Up</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition"
            >
              <Truck className="w-4 h-4 text-slate-950" />
              <span>{isBn ? "এখনই এআই টেকনিশিয়ান অর্ডার করুন (৳১,২০০)" : "Order AI Insemination Dispatch (৳1,200)"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: MY COMMUNITY DAIRY QUESTIONS */}
      {/* ========================================================================= */}
      {activeTab === "community" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                {isBn ? "কমিউনিটিতে আমার ডেইরি প্রশ্নসমূহ" : "My Livestock & Dairy Community Threads"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn ? "আপনার পোস্ট করা গবাদিপশুর প্রশ্নের চিকিৎসকদের উত্তর গ্রহণ করুন।" : "Manage your posted questions and mark accepted expert replies."}
              </p>
            </div>

            <Link
              href="/community"
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isBn ? "কমিউনিটি ফোরাম" : "Open Community"}</span>
            </Link>
          </div>

          {myQuestions.length > 0 ? (
            <div className="space-y-3">
              {myQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-400 font-mono text-[10px] font-bold">
                        {q.sector.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400">{q.authorLocation}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-400">{q.answers?.length || 0} Answers</span>
                    </div>

                    <h3 className="text-sm font-bold text-white">{q.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2">{q.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        if (confirm(isBn ? "পোস্টটি মুছে ফেলতে চান?" : "Delete this question?")) {
                          deleteQuestion(q.id);
                        }
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-400 bg-slate-900 border border-white/[0.08] transition"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <Link
                      href="/community"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition"
                    >
                      {isBn ? "উত্তর দেখুন" : "View Answers"} &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-white/[0.04] text-slate-400 text-xs">
              {isBn ? "আপনি এখনও কোনো ডেইরি প্রশ্ন করেননি।" : "No questions posted yet."}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT PROFILE MODAL */}
      {/* ========================================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-cyan-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-cyan-400" />
              <span>{isBn ? "ডেইরি খামারি প্রোফাইল সম্পাদন" : "Edit Dairy Profile"}</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Mobile Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Location / Dairy Union</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-md"
                >
                  Save Dairy Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD CATTLE EAR-TAG MODAL */}
      {/* ========================================================================= */}
      {isAddCowModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-cyan-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsAddCowModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>{isBn ? "নতুন গাভী ও ইয়ার-ট্যাগ নিবন্ধন" : "Register Cattle Ear-Tag"}</span>
            </h3>

            <form onSubmit={handleAddCow} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Official Ear-Tag ID</label>
                <input
                  type="text"
                  value={tagNumber}
                  onChange={(e) => setTagNumber(e.target.value)}
                  placeholder="e.g. BD-LIV-8821 (সুলতানা)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500 uppercase font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Breed / Genetics</label>
                <select
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Holstein Friesian Cross (HF-75%)">Holstein Friesian Cross (HF-75%)</option>
                  <option value="Pure Sahiwal Cow (SH)">Pure Sahiwal Breed (SH)</option>
                  <option value="Red Chittagong Cattle (RCC)">Red Chittagong Cattle (RCC)</option>
                  <option value="Jersey Cross Breed">Jersey Cross Breed</option>
                  <option value="Boer Meat Goat">Boer Breeding Goat</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Lactation Stage</label>
                  <input
                    type="text"
                    value={lactationStage}
                    onChange={(e) => setLactationStage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Daily Yield</label>
                  <input
                    type="text"
                    value={dailyYield}
                    onChange={(e) => setDailyYield(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition shadow-md"
                >
                  Register Cow to Herd
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: START WITHHOLDING TIMER MODAL */}
      {/* ========================================================================= */}
      {isAddWithholdingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-amber-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsAddWithholdingOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{isBn ? "অ্যান্টিবায়োটিক উইথহোল্ডিং টাইমার চালু" : "Start Withholding Countdown Timer"}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter administered antibiotic details to track legally mandated milk withdrawal period.
            </p>

            <form onSubmit={handleAddWithholding} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Select Cattle</label>
                <select
                  value={whCowTag}
                  onChange={(e) => setWhCowTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-amber-500"
                >
                  {(currentUser.registeredEntities || []).map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                  <option value="HF-108 (সুলতানা)">HF-108 (সুলতানা)</option>
                  <option value="SH-402 (চম্পা)">SH-402 (চম্পা)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Administered Drug</label>
                <select
                  value={whDrug}
                  onChange={(e) => {
                    setWhDrug(e.target.value);
                    if (e.target.value.includes("72")) setWhHours(72);
                    else if (e.target.value.includes("96")) setWhHours(96);
                    else if (e.target.value.includes("48")) setWhHours(48);
                    else setWhHours(120);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Ceftiofur Sodium 1g (72 Hours Milk Withholding)">Ceftiofur Sodium 1g (72 Hours Milk Withholding)</option>
                  <option value="Oxytetracycline LA 200mg (96 Hours Milk Withholding)">Oxytetracycline LA 200mg (96 Hours Milk Withholding)</option>
                  <option value="Gentamicin Sulfate (120 Hours Milk Withholding)">Gentamicin Sulfate (120 Hours Milk Withholding)</option>
                  <option value="Intramammary Cloxacillin Tube (48 Hours Withholding)">Intramammary Cloxacillin Tube (48 Hours Withholding)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Mandatory Withholding Duration (Hours)</label>
                <input
                  type="number"
                  value={whHours}
                  onChange={(e) => setWhHours(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-black transition shadow-md"
                >
                  Activate Withholding Radar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: DISPATCH AI TECHNICIAN MODAL */}
      {/* ========================================================================= */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-cyan-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsAiModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-2 flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>{isBn ? "কৃত্রিম প্রজনন (AI) টেকনিশিয়ান অর্ডার" : "Order Artificial Insemination (AI) Dispatch"}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Local certified paravet will arrive with cryo-tank and pedigree straw at your farm.
            </p>

            {aiSuccess ? (
              <div className="p-6 text-center rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto" />
                <h4 className="font-bold text-sm text-white">Technician Dispatched!</h4>
                <p className="text-xs text-slate-300">
                  Paravet Kamal Hossain has received your dispatch order and is en route with cryo-tank.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestAiDispatch} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Select Cattle in Standing Heat</label>
                  <select
                    value={aiCowTag}
                    onChange={(e) => setAiCowTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  >
                    {(currentUser.registeredEntities || []).map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                    <option value="HF-108 (সুলতানা)">HF-108 (সুলতানা)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Select Semen Straw Quality</label>
                  <select
                    value={aiBreedStraw}
                    onChange={(e) => setAiBreedStraw(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="100% Pedigree Holstein Friesian Straw">100% Pedigree Holstein Friesian Straw (৳1,200)</option>
                    <option value="Pure Sahiwal Breed Straw">Pure Sahiwal Breed Straw (৳1,000)</option>
                    <option value="Red Chittagong Indigenous Straw">Red Chittagong Indigenous Straw (৳800)</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-white/[0.06] flex items-center justify-between">
                  <span className="text-slate-300">Total Dispatch & Insemination Fee:</span>
                  <span className="font-mono font-bold text-white text-sm">৳1,200 (Pay on arrival)</span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black transition shadow-lg shadow-cyan-600/30"
                  >
                    Confirm Doorstep AI Dispatch (৳1,200)
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
