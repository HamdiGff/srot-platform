"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CustomerInvoicesTab } from "./CustomerInvoicesTab";
import { CustomerChatHistoryModal } from "./CustomerChatHistoryModal";
import {
  Wheat,
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
  Sprout,
  X,
  Droplet,
  Layers,
  FlaskConical,
  Truck,
  Download,
  Calculator,
  ArrowRight,
  Clock,
  TrendingUp,
  Receipt,
} from "lucide-react";

export function CropFarmerPanel() {
  const { currentUser, updateProfile, addEntity, updateEntity, deleteEntity } = useUserStore();
  const { getByUserRole } = useConsultationStore();
  const { getQuestionsByAuthor, deleteQuestion } = useCommunityStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const consultations = getByUserRole("farmer", currentUser.id);
  const myQuestions = getQuestionsByAuthor(currentUser.name);

  // Active Workspace Tab
  const [activeTab, setActiveTab] = useState<"plots" | "calculator" | "prescriptions" | "dispatch" | "community" | "invoices">("plots");
  const [activeChatModalCase, setActiveChatModalCase] = useState<any | null>(null);

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);
  const [district, setDistrict] = useState(currentUser.district || "Bogura");

  // New Crop Entity Modal State
  const [isAddPlotModalOpen, setIsAddPlotModalOpen] = useState(false);
  const [plotName, setPlotName] = useState("");
  const [cropVariety, setCropVariety] = useState("");
  const [acreage, setAcreage] = useState("3.5 Bigha (১.১৫ একর)");
  const [growthStage, setGrowthStage] = useState("Tillering / কুশি পর্যায়");

  // Editing Entity State
  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [editEntityDetails, setEditEntityDetails] = useState("");

  // NPK Calculator State
  const [calcCrop, setCalcCrop] = useState<"rice" | "potato" | "maize" | "mustard">("rice");
  const [calcLandSize, setCalcLandSize] = useState<number>(3); // in bighas
  const [calcUnit, setCalcUnit] = useState<"bigha" | "decimal" | "acre">("bigha");

  // Doorstep Soil Test Dispatch Request State
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [dispatchPlot, setDispatchPlot] = useState("Aman Rice Paddy");
  const [dispatchUrgency, setDispatchUrgency] = useState<"Normal" | "Urgent">("Urgent");
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  // Calculate NPK Fertilizer requirements based on BRRI/BARI agronomic standards
  const calculateFertilizers = () => {
    // Normalization to Bigha (1 Acre = 3 Bighas, 1 Bigha = 33 Decimals)
    const bighas =
      calcUnit === "acre"
        ? calcLandSize * 3
        : calcUnit === "decimal"
        ? calcLandSize / 33
        : calcLandSize;

    if (calcCrop === "rice") {
      // Boro Rice per bigha: Urea 35kg, TSP 14kg, MoP 18kg, Gypsum 10kg, Zinc 1.5kg
      return {
        urea: Math.round(bighas * 35),
        tsp: Math.round(bighas * 14),
        mop: Math.round(bighas * 18),
        gypsum: Math.round(bighas * 10),
        zinc: (bighas * 1.5).toFixed(1),
        splits: isBn
          ? "ইউরিয়া ৩ কিস্তিতে: চারা রোপণের ১৫ দিন পর, ৩০ দিন পর এবং কাইচথোড় আসার ৫-৭ দিন আগে।"
          : "Apply Urea in 3 equal splits: 15 DAT, 30 DAT, and 5-7 days before panicle initiation.",
      };
    } else if (calcCrop === "potato") {
      // Potato per bigha: Urea 40kg, TSP 22kg, MoP 30kg, Gypsum 14kg, Magnesium 4kg
      return {
        urea: Math.round(bighas * 40),
        tsp: Math.round(bighas * 22),
        mop: Math.round(bighas * 30),
        gypsum: Math.round(bighas * 14),
        zinc: (bighas * 2.0).toFixed(1),
        splits: isBn
          ? "অর্ধেক ইউরিয়া ও সকল সার শেষ চাষে। বাকি ইউরিয়া ৩০-৩৫ দিন পর মাটি তোলার সময়।"
          : "Apply 50% Urea & all TSP/MoP during final land preparation; remaining Urea at 30-35 DAP earthing up.",
      };
    } else if (calcCrop === "maize") {
      return {
        urea: Math.round(bighas * 45),
        tsp: Math.round(bighas * 20),
        mop: Math.round(bighas * 25),
        gypsum: Math.round(bighas * 12),
        zinc: (bighas * 2.5).toFixed(1),
        splits: isBn
          ? "১/৩ অংশ ইউরিয়া শেষ চাষে, ১/৩ অংশ ৮-১০ পাতা বের হলে এবং ১/৩ অংশ মোচা আসার পূর্বে।"
          : "Apply 1/3rd Urea basal, 1/3rd at knee-high (V8 stage), and 1/3rd at tasseling.",
      };
    } else {
      // Mustard
      return {
        urea: Math.round(bighas * 25),
        tsp: Math.round(bighas * 18),
        mop: Math.round(bighas * 15),
        gypsum: Math.round(bighas * 15),
        zinc: (bighas * 1.0).toFixed(1),
        splits: isBn
          ? "অর্ধেক ইউরিয়া ও সব সার জমিতে শেষ চাষে। বাকি ইউরিয়া ফুল আসার আগে সেচের পর।"
          : "50% Urea + full P/K basal at final tilling; 50% Urea top-dressed before flowering with irrigation.",
      };
    }
  };

  const fert = calculateFertilizers();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, location, district });
    setIsProfileModalOpen(false);
  };

  const handleAddPlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plotName.trim()) return;
    addEntity({
      name: plotName.trim(),
      type: "crop",
      details: `${cropVariety || "BRRI Dhan"} • ${acreage} • ${growthStage}`,
      icon: "Wheat",
    });
    setPlotName("");
    setCropVariety("");
    setIsAddPlotModalOpen(false);
  };

  const handleRequestDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatchSuccess(true);
    setTimeout(() => {
      setDispatchSuccess(false);
      setIsDispatchModalOpen(false);
    }, 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. EXECUTIVE CROP FARMER PROFILE HERO STRIP */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-emerald-500/25 bg-gradient-to-r from-emerald-950/50 via-slate-900 to-[#040910] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500/70 shadow-lg shrink-0"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Wheat className="w-3 h-3" />
                <span>{currentUser.roleLabel}</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">ID: {currentUser.id}</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
                DAE Smart Card Verified
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
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
            <Edit2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isBn ? "প্রোফাইল সম্পাদন" : "Edit Farm Profile"}</span>
          </button>

          <Link
            href="/consult?category=agri"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-black transition shadow-lg shadow-emerald-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>{isBn ? "কৃষিবিদ চেম্বার (৳২০০)" : "Consult Plant Doctor (৳200)"}</span>
          </Link>
        </div>
      </div>

      {/* 2. THE MODERN WORKSPACE NAVIGATION TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-white/[0.08] text-xs">
        {[
          { id: "plots", label: isBn ? "জমির প্লট ও ফসল" : "My Crop Plots", icon: Sprout, count: currentUser.registeredEntities?.length || 0 },
          { id: "calculator", label: isBn ? "সুষম সার ও এনপিকে ক্যালকুলেটর" : "Precision NPK Calculator", icon: Calculator },
          { id: "prescriptions", label: isBn ? "ডিজিটাল প্রেসক্রিপশন ও হিস্ট্রি" : "DAE Prescriptions", icon: FileText, count: consultations.length },
          { id: "dispatch", label: isBn ? "মাঠ সেবা ও মাটি টেস্ট" : "Dispatch Soil Tech", icon: Truck },
          { id: "invoices", label: isBn ? "ইনভয়েস ও অর্ডার ইতিহাস" : "Invoices & Receipts", icon: Receipt },
          { id: "community", label: isBn ? "আমার প্রশ্ন ও উত্তর" : "My Community Q&A", icon: MessageSquare, count: myQuestions.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 border border-emerald-500/50 text-emerald-300 shadow-md font-black ring-1 ring-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : ""}`} />
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
      {/* TAB 1: REGISTERED CROP PLOTS & LAND HOLDINGS */}
      {/* ========================================================================= */}
      {activeTab === "plots" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                {isBn ? "নিবন্ধিত জমির প্লট ও ফসলের স্ট্যাটাস" : "Registered Agricultural Land Holdings"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn ? "প্রতিটি প্লটের ক্যানোপি আর্দ্রতা, এনডিভিআই গ্রোথ ও বালাই ঝুঁকি ট্র্যাক করুন।" : "Track vegetative index, canopy moisture, and disease risks per acreage."}
              </p>
            </div>

            <button
              onClick={() => setIsAddPlotModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isBn ? "নতুন প্লট যোগ করুন" : "Add Crop Plot"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(currentUser.registeredEntities || []).map((plot) => {
              const isEditing = editingEntityId === plot.id;
              return (
                <div
                  key={plot.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] hover:border-emerald-500/40 transition flex flex-col justify-between gap-3 shadow-lg group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                          <Sprout className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">{plot.name}</h3>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                            Active Season • BRRI Dhan
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            if (isEditing) {
                              updateEntity(plot.id, { details: editEntityDetails });
                              setEditingEntityId(null);
                            } else {
                              setEditingEntityId(plot.id);
                              setEditEntityDetails(plot.details);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 transition"
                          title={isEditing ? "Save Plot" : "Edit Plot"}
                        >
                          {isEditing ? <Save className="w-3.5 h-3.5 text-emerald-400" /> : <Edit2 className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(isBn ? "প্লটটি মুছে ফেলতে চান?" : "Delete this plot?")) {
                              deleteEntity(plot.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 transition"
                          title="Delete Plot"
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
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-white text-xs focus:outline-none"
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-slate-300 mt-3 font-mono leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-white/[0.04]">
                        {plot.details}
                      </p>
                    )}
                  </div>

                  {/* Telemetry Strip for Plot */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-t border-white/[0.06] text-center text-[10px] font-mono">
                    <div className="p-1.5 rounded-lg bg-slate-900/40 border border-white/[0.04]">
                      <span className="text-slate-400 block">Canopy Wet</span>
                      <span className="text-cyan-400 font-bold">84% Optimal</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/40 border border-white/[0.04]">
                      <span className="text-slate-400 block">NDVI Index</span>
                      <span className="text-emerald-400 font-bold">0.76 Vigorous</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/40 border border-white/[0.04]">
                      <span className="text-slate-400 block">Soil pH</span>
                      <span className="text-amber-400 font-bold">6.4 Balanced</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      onClick={() => {
                        setDispatchPlot(plot.name);
                        setIsDispatchModalOpen(true);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>{isBn ? "মাটি পরীক্ষা কল" : "Call Soil Lab"}</span>
                    </button>

                    <Link
                      href={`/consult?category=agri&query=${encodeURIComponent(plot.name)}`}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-xs transition border border-emerald-500/30 flex items-center gap-1"
                    >
                      <span>{isBn ? "এআই ট্রায়াজ" : "Run AI Triage"}</span>
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
      {/* TAB 2: PRECISION NPK FERTILIZER & NUTRIENT CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === "calculator" && (
        <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-emerald-500/20 bg-slate-950/90 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-400" />
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isBn ? "বাংলাদেশ কৃষি গবেষণা কাউন্সিল (BARC) সুষম সার নির্দেশিকা" : "Precision Crop Nutrition & Split Dose Calculator"}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isBn
                  ? "জমির আয়তন অনুযায়ী ইউরিয়া, টিএসপি, ডিএপি, পটাশ, জিপসাম ও জিংক সারের সঠিক মাত্রা গণনা করুন।"
                  : "Calculated from official BARC / BRRI crop fertilizer recommendation charts."}
              </p>
            </div>
          </div>

          {/* Input Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1.5">{isBn ? "আবাদি ফসল:" : "Target Crop:"}</label>
              <select
                value={calcCrop}
                onChange={(e) => setCalcCrop(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="rice">বোরো ধান (Boro Rice High Yielding)</option>
                <option value="potato">আলু (Cardinal / Diamond Potato)</option>
                <option value="maize">ভুট্টা (Hybrid Grain Maize)</option>
                <option value="mustard">সরিষা (Tori-7 / BARI Sarisha-14)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1.5">{isBn ? "জমির আয়তন:" : "Land Area:"}</label>
              <input
                type="number"
                min={0.1}
                step={0.1}
                value={calcLandSize}
                onChange={(e) => setCalcLandSize(Math.max(0.1, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500 font-mono font-bold"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1.5">{isBn ? "পরিমাপের একক:" : "Land Unit:"}</label>
              <div className="grid grid-cols-3 gap-1">
                {(["bigha", "decimal", "acre"] as const).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setCalcUnit(unit)}
                    className={`py-2 rounded-xl font-bold uppercase transition ${
                      calcUnit === unit
                        ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">ইউরিয়া (Urea)</span>
              <span className="text-lg sm:text-xl font-black text-white font-mono mt-0.5 block">{fert.urea} kg</span>
              <span className="text-[9px] text-emerald-400 font-mono">৪৬% নাইট্রোজেন</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">টিএসপি (TSP)</span>
              <span className="text-lg sm:text-xl font-black text-white font-mono mt-0.5 block">{fert.tsp} kg</span>
              <span className="text-[9px] text-cyan-400 font-mono">৪৬% ফসফরাস</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">এমওপি (MoP)</span>
              <span className="text-lg sm:text-xl font-black text-white font-mono mt-0.5 block">{fert.mop} kg</span>
              <span className="text-[9px] text-amber-400 font-mono">৬০% পটাশিয়াম</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">জিপসাম (Gypsum)</span>
              <span className="text-lg sm:text-xl font-black text-white font-mono mt-0.5 block">{fert.gypsum} kg</span>
              <span className="text-[9px] text-purple-400 font-mono">১৭% সালফার</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">জিংক সালফেট (Zinc)</span>
              <span className="text-lg sm:text-xl font-black text-white font-mono mt-0.5 block">{fert.zinc} kg</span>
              <span className="text-[9px] text-teal-400 font-mono">৩৬% জিংক</span>
            </div>
          </div>

          {/* Split Schedule Card */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/[0.08] flex items-start gap-3 text-xs">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">{isBn ? "প্রয়োগ সময়সূচী ও কিস্তি বিভাজন:" : "Recommended Split Application Timeline:"}</span>
              <p className="text-slate-300 leading-relaxed">{fert.splits}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DAE CERTIFIED DIGITAL PRESCRIPTIONS & ADVISORY ARCHIVE */}
      {/* ========================================================================= */}
      {activeTab === "prescriptions" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                {isBn ? "ডিএই অনুমোদিত প্রেসক্রিপশন ও টেলি-কনসালটেশন হিস্ট্রি" : "DAE Verifiable Digital Prescriptions"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn ? "প্রত্যেক প্রেসক্রিপশনে সক্রিয় রাসায়নিক উপাদান ও প্রত্যাহার সময় স্পষ্টভাবে উল্লেখিত।" : "Every prescription carries verifiable council accreditation and withholding intervals."}
              </p>
            </div>

            <span className="text-xs font-mono text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              {consultations.length} Prescriptions
            </span>
          </div>

          {consultations.length > 0 ? (
            <div className="space-y-3">
              {consultations.map((c) => (
                <div
                  key={c.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg hover:border-emerald-500/40 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                        {c.caseNumber}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-400">{formatDate(c.createdAt)}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-200 font-semibold">{c.serviceName}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white">
                      Attending: {c.expert.name} ({c.expert.title})
                    </h3>

                    {c.prescription ? (
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.06] text-xs space-y-1 mt-2">
                        <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Dx: {c.prescription.diagnosisTitle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                          <span>Rx Formulation: <strong>{c.prescription.medicationsOrSprays[0]?.item}</strong></span>
                          <span>•</span>
                          <span className="text-amber-300 font-mono">
                            Withholding: {c.prescription.medicationsOrSprays[0]?.withholdingSafetyPeriod}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No prescription issued yet for this case.</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={() => setActiveChatModalCase(c)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isBn ? "চ্যাট হিস্ট্রি" : "Chat History"}</span>
                    </button>

                    <button
                      onClick={() => generatePrescriptionPdf(c)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isBn ? "পিডিএফ ডাউনলোড" : "Download PDF"}</span>
                    </button>

                    <Link
                      href={`/consult/${c.id}`}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs transition shadow-md shadow-emerald-500/20"
                    >
                      {isBn ? "লাইভ চেম্বার →" : "Live Chamber →"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-white/[0.04] text-slate-400 text-xs">
              {isBn ? "এখনও কোনো প্রেসক্রিপশন নেই।" : "No prescription archives available."}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: DISPATCH MOBILE SOIL LAB / FIELD PARAVET */}
      {/* ========================================================================= */}
      {activeTab === "dispatch" && (
        <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] bg-slate-950/80 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-purple-400" />
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isBn ? "অন-সাইট মাঠ সেবা ও মোবাইল সয়েল ল্যাবরেটরি সার্ভিস" : "Doorstep Mobile Soil Lab & On-Site Agronomy Dispatch"}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isBn ? "খামারের জমিতে সার্টিফাইড টেকনিশিয়ান ডেকে তাৎক্ষণিক এন-পি-কে ও পিএইচ টেস্ট করান।" : "Certified technician arrives with core soil corer and digital photometer within 2-4 hours."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/[0.08] space-y-2">
              <span className="text-xs font-black text-emerald-400 font-mono">01. SOIL CORING</span>
              <h3 className="text-sm font-bold text-white">{isBn ? "মাটির নমুনা সংগ্রহ ও ড্রিলিং" : "Mobile Soil Lab Kit"}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn ? "১৫ সেমি গভীর থেকে সুষম মিশ্র নমুনা উত্তোলন ও ডিজিটাল ফটোমিটারে টেস্ট।" : "Extracts 6 core samples across plot and tests with digital photometer."}
              </p>
              <span className="text-xs font-bold text-white font-mono block pt-2">৳850 / Plot</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/[0.08] space-y-2">
              <span className="text-xs font-black text-cyan-400 font-mono">02. NPK BALANCING</span>
              <h3 className="text-sm font-bold text-white">{isBn ? "তাৎক্ষণিক সার প্রেসক্রিপশন" : "Instant Soil Health Card"}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn ? "ল্যাবের ফলাফলের ভিত্তিতে কোন সার কত কেজি লাগবে তার প্রিন্টেড কার্ড।" : "Immediate printed fertilizer recommendation chart signed by DAE paravet."}
              </p>
              <span className="text-xs font-bold text-white font-mono block pt-2">Included</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/[0.08] space-y-2">
              <span className="text-xs font-black text-purple-400 font-mono">03. BIOSECURITY CHECK</span>
              <h3 className="text-sm font-bold text-white">{isBn ? "নেমাটোড ও ছত্রাক স্ক্যান" : "Root Nematode Scan"}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn ? "গাছের শিকড় পচা ও ক্ষতিকর কৃমির উপস্থিতি মাইক্রোস্কোপে পর্যবেক্ষণ।" : "Field microscope check for root knot nematodes and bacterial wilt."}
              </p>
              <span className="text-xs font-bold text-white font-mono block pt-2">৳400 Optional</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsDispatchModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-500/20 transition"
            >
              <Truck className="w-4 h-4" />
              <span>{isBn ? "এখনই টেকনিশিয়ান রিকুয়েস্ট করুন (৳৮৫০)" : "Request Doorstep Field Technician Dispatch (৳850)"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: MY COMMUNITY QUESTIONS & FORUM INQUIRIES */}
      {/* ========================================================================= */}
      {activeTab === "community" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                {isBn ? "কমিউনিটিতে আমার পোস্ট ও বিশেষজ্ঞদের পরামর্শ" : "My Community Questions & Specialist Answers"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn ? "আপনার পোস্ট করা প্রশ্ন সম্পাদনা করুন অথবা চিকিৎসকদের উত্তর গ্রহণ করুন।" : "Manage your posted questions and mark accepted expert replies."}
              </p>
            </div>

            <Link
              href="/community"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition flex items-center gap-1.5"
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
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-bold">
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
              {isBn ? "আপনি এখনও কোনো প্রশ্ন পোস্ট করেননি।" : "You haven't posted any community questions yet."}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: INVOICES, ORDER HISTORY & CASH MEMOS */}
      {/* ========================================================================= */}
      {activeTab === "invoices" && <CustomerInvoicesTab role="farmer" roleLabel="Crop Farmer" />}

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT PROFILE MODAL */}
      {/* ========================================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-emerald-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "কৃষক প্রোফাইল সম্পাদনা" : "Edit Farmer Profile"}</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Mobile Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Upazila & District Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD PLOT MODAL */}
      {/* ========================================================================= */}
      {isAddPlotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-emerald-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsAddPlotModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "নতুন আবাদি জমির প্লট যোগ করুন" : "Register New Crop Plot"}</span>
            </h3>

            <form onSubmit={handleAddPlot} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Plot Identification Name</label>
                <input
                  type="text"
                  value={plotName}
                  onChange={(e) => setPlotName(e.target.value)}
                  placeholder="e.g. উত্তরপাড়ার ব্রি-ধান প্লট (North Paddy)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Crop Variety</label>
                <input
                  type="text"
                  value={cropVariety}
                  onChange={(e) => setCropVariety(e.target.value)}
                  placeholder="e.g. BRRI Dhan-28 / BARI Alu-7"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Land Acreage</label>
                  <input
                    type="text"
                    value={acreage}
                    onChange={(e) => setAcreage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Current Stage</label>
                  <input
                    type="text"
                    value={growthStage}
                    onChange={(e) => setGrowthStage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md"
                >
                  Register Plot to Farm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: REQUEST FIELD TECHNICIAN DISPATCH */}
      {/* ========================================================================= */}
      {isDispatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-purple-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsDispatchModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-2 flex items-center gap-2">
              <Truck className="w-4 h-4 text-purple-400" />
              <span>{isBn ? "মাটি পরীক্ষা টেকনিশিয়ান অর্ডার" : "Request On-Site Soil Lab Technician"}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Local certified technician will arrive at your plot with soil corer and photometer.
            </p>

            {dispatchSuccess ? (
              <div className="p-6 text-center rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-white">Technician Dispatched!</h4>
                <p className="text-xs text-slate-300">
                  Technician Kamal Hossain has received your dispatch order and is en route.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestDispatch} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Select Farm Plot</label>
                  <select
                    value={dispatchPlot}
                    onChange={(e) => setDispatchPlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-purple-500"
                  >
                    {(currentUser.registeredEntities || []).map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Dispatch Urgency</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["Normal", "Urgent"] as const).map((urg) => (
                      <button
                        key={urg}
                        type="button"
                        onClick={() => setDispatchUrgency(urg)}
                        className={`py-2 rounded-xl font-bold transition border ${
                          dispatchUrgency === urg
                            ? "bg-purple-600 border-purple-400 text-white shadow-md"
                            : "bg-slate-900 border-white/[0.08] text-slate-400"
                        }`}
                      >
                        {urg === "Urgent" ? "Emergency (2-4 hrs)" : "Standard (Within 24 hrs)"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-white/[0.06] flex items-center justify-between">
                  <span className="text-slate-300">Total Dispatch & Lab Fee:</span>
                  <span className="font-mono font-bold text-white text-sm">৳850 (Pay upon arrival)</span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition shadow-lg shadow-purple-600/30"
                  >
                    Confirm Dispatch Request (৳850)
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Customer Consultation Chat History Modal */}
      <CustomerChatHistoryModal
        consultation={activeChatModalCase}
        isOpen={!!activeChatModalCase}
        onClose={() => setActiveChatModalCase(null)}
      />
    </div>
  );
}
