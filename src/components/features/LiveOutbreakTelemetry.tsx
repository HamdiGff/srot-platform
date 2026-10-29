"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  AlertTriangle,
  Radio,
  MapPin,
  ShieldAlert,
  Wheat,
  Milk,
  Egg,
  Fish,
  HeartHandshake,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Activity,
  Flame,
} from "lucide-react";

interface DivisionOutbreak {
  id: string;
  divisionEn: string;
  divisionBn: string;
  districts: string[];
  sector: "agri" | "veterinary" | "poultry" | "fisheries";
  diseaseEn: string;
  diseaseBn: string;
  severity: "critical" | "warning" | "monitored";
  casesReported: number;
  temperature: string;
  humidity: string;
  contagionVector: string;
  recommendedActionEn: string;
  recommendedActionBn: string;
  activeDoctorsCount: number;
}

const OUTBREAK_DATA: DivisionOutbreak[] = [
  {
    id: "outbreak-sirajganj",
    divisionEn: "Rajshahi",
    divisionBn: "রাজশাহী",
    districts: ["Sirajganj (সিরাজগঞ্জ)", "Pabna (পাবনা)", "Bogura (বগুড়া)"],
    sector: "veterinary",
    diseaseEn: "Lumpy Skin Disease (LSD) Vector Surge",
    diseaseBn: "ল্যাম্পি স্কিন ডিজিজ (LSD) মশা-মাছি বাহিত প্রাদুর্ভাব",
    severity: "critical",
    casesReported: 142,
    temperature: "31°C",
    humidity: "86%",
    contagionVector: "Stomoxys flies & mosquitoes in marshland barnyards",
    recommendedActionEn: "Administer Goat Pox vaccine (10x dose for cattle) to healthy animals immediately. Apply Deltamethrin 1% spray on stalls.",
    recommendedActionBn: "সুস্থ গাভীকে দ্রুত গোট পক্স টিকা দিন। খামারে মশা-মাছি দমনে ডেল্টামেথ্রিন ১% স্প্রে করুন। আক্রান্ত পশুকে সম্পূর্ণ আলাদা রাখুন।",
    activeDoctorsCount: 28,
  },
  {
    id: "outbreak-dinajpur",
    divisionEn: "Rangpur",
    divisionBn: "রংপুর",
    districts: ["Dinajpur (দিনাজপুর)", "Rangpur (রংপুর)", "Kurigram (কুড়িগ্রাম)"],
    sector: "agri",
    diseaseEn: "Boro Rice Foliar & Neck Blast Spore Alert",
    diseaseBn: "বোরো ধানের পাতা ও নেক ব্লাস্ট ছত্রাক সতর্কতা",
    severity: "critical",
    casesReported: 310,
    temperature: "26°C",
    humidity: "93%",
    contagionVector: "Heavy morning mist followed by warm humid afternoons",
    recommendedActionEn: "Halt all urea top-dressing. Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane @ 2ml/L during late afternoon.",
    recommendedActionBn: "ইউরিয়া সারের উপরিপ্রয়োগ সম্পূর্ণ বন্ধ রাখুন। বিকেলে ট্রাইসাইক্লাজোল ৭৫% ডব্লিউপি ০.৬ গ্রাম/লিটার হারে পাতায় স্প্রে করুন।",
    activeDoctorsCount: 34,
  },
  {
    id: "outbreak-mymensingh",
    divisionEn: "Mymensingh",
    divisionBn: "ময়মনসিংহ",
    districts: ["Mymensingh Sadar (ময়মনসিংহ)", "Muktagacha (মুক্তাগাছা)", "Trishal (ত্রিশাল)"],
    sector: "fisheries",
    diseaseEn: "Early-Morning DO Crash & Toxic Ammonia in Pangas Ponds",
    diseaseBn: "পাঙ্গাশ ও কার্প পুকুরে ভোরের অক্সিজেন ঘাটতি ও অ্যামোনিয়া",
    severity: "warning",
    casesReported: 89,
    temperature: "28°C",
    humidity: "88%",
    contagionVector: "Dense phytoplankton blooms dying off overnight",
    recommendedActionEn: "Operate paddlewheel aerators from 2 AM to 7 AM. Apply agricultural gypsum @ 15 kg/bigha and stop feed by 50%.",
    recommendedActionBn: "রাত ২টা থেকে সকাল ৭টা পর্যন্ত অ্যারোটর চালান। প্রতি বিঘায় ১৫ কেজি জিপসাম প্রয়োগ করুন এবং খাবার অর্ধেক কমিয়ে দিন।",
    activeDoctorsCount: 19,
  },
  {
    id: "outbreak-gazipur",
    divisionEn: "Dhaka",
    divisionBn: "ঢাকা",
    districts: ["Gazipur (গাজীপুর)", "Narsingdi (নরসিংদী)", "Tangail (টাঙ্গাইল)"],
    sector: "poultry",
    diseaseEn: "Infectious Bursal Disease (Gumboro) & Heat Stress",
    diseaseBn: "ব্রয়লার খামারে গামবোরো ও তাপদাহ জনিত হিট-স্ট্রোক",
    severity: "warning",
    casesReported: 114,
    temperature: "33°C",
    humidity: "82%",
    contagionVector: "Poor ventilation in high-density commercial broiler sheds",
    recommendedActionEn: "Add Vitamin C + Electrolytes in drinking water. Maintain strict foot-bath biosecurity with Potassium Permanganate.",
    recommendedActionBn: "খাবারের পানিতে ভিটামিন সি ও ইলেকট্রোলাইট দিন। শেডের সামনে পটাশিয়াম পারম্যাঙ্গানেটের ফুট-বাথ বায়োসিকিউরিটি বজায় রাখুন।",
    activeDoctorsCount: 25,
  },
  {
    id: "outbreak-barishal",
    divisionEn: "Barishal",
    divisionBn: "বরিশাল",
    districts: ["Barishal (বরিশাল)", "Bhola (ভোলা)", "Patuakhali (পটুয়াখালী)"],
    sector: "agri",
    diseaseEn: "Brown Planthopper (BPH / কারেন্ট পোকা) Hopper Burn",
    diseaseBn: "বাদামি গাছফড়িং (কারেন্ট পোকা) আক্রমণ ও হপার বার্ন",
    severity: "monitored",
    casesReported: 67,
    temperature: "30°C",
    humidity: "89%",
    contagionVector: "Excessive canopy shading and stagnant floodwaters",
    recommendedActionEn: "Create 1-foot alley pathways ('Ail') every 10 rows. Spray Pymetrozine 50% WDG directly targeting the stem base.",
    recommendedActionBn: "জমিতে প্রতি ১০ সারি পরপর ১ ফুট 'বিলি' কেটে আলো-বাতাস দিন। গোড়া লক্ষ্য করে পাইমেট্রোজিন ৫০% ডব্লিউডিজি স্প্রে করুন।",
    activeDoctorsCount: 16,
  },
];

export function LiveOutbreakTelemetry() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [selectedId, setSelectedId] = useState<string>("outbreak-sirajganj");
  const [sectorFilter, setSectorFilter] = useState<string>("all");

  const filteredData = OUTBREAK_DATA.filter(
    (item) => sectorFilter === "all" || item.sector === sectorFilter
  );

  const selectedItem =
    OUTBREAK_DATA.find((item) => item.id === selectedId) || OUTBREAK_DATA[0];

  return (
    <div className="w-full space-y-6">
      {/* Top Telemetry Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/25 relative">
            <Radio className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">
                {isBn ? "লাইভ জাতীয় রোগ ও বালাই রাডার" : "Live National Agro-Vet Outbreak Radar"}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                TELEMETRY ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {isBn
                ? "কৃষি সম্প্রসারণ অধিদপ্তর (DAE) ও প্রাণিসম্পদ অধিদপ্তর (DLS) এর সমন্বিত ৮ বিভাগের ডাটা।"
                : "Real-time surveillance across 8 divisions grounded in DAE, DLS & DoF field telemetry."}
            </p>
          </div>
        </div>

        {/* Sector Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: isBn ? "সকল খাত" : "All Sectors" },
            { id: "agri", label: isBn ? "ফসল" : "Crops", icon: Wheat },
            { id: "veterinary", label: isBn ? "গবাদিপশু" : "Livestock", icon: Milk },
            { id: "poultry", label: isBn ? "পোল্ট্রি" : "Poultry", icon: Egg },
            { id: "fisheries", label: isBn ? "মৎস্য" : "Fisheries", icon: Fish },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = sectorFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSectorFilter(tab.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/[0.06]"
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Division Outbreak Cards (Left) & Live Incident Room (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Live Alert Feeds */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
          {filteredData.map((item) => {
            const isSelected = item.id === selectedItem.id;
            const isCritical = item.severity === "critical";
            const isWarning = item.severity === "warning";

            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-slate-900/90 border-emerald-400 ring-2 ring-emerald-500/25 shadow-lg"
                    : "bg-slate-950/60 border-white/[0.06] hover:bg-slate-900/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-300">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{isBn ? item.divisionBn : item.divisionEn} Division</span>
                  </span>

                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1 ${
                      isCritical
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : isWarning
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    <Flame className="w-2.5 h-2.5" />
                    <span>{item.severity}</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1">
                  {isBn ? item.diseaseBn : item.diseaseEn}
                </h4>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/[0.04]">
                  <span>{item.districts[0]}</span>
                  <span className="font-mono text-emerald-400">
                    {item.casesReported} {isBn ? "টি আক্রান্ত এলাকা" : "hotspots reported"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 7 Cols: Detailed Incident Chamber & Instant Protocol */}
        <div className="lg:col-span-7 srot-glass-card rounded-2xl p-5 border border-white/[0.08] space-y-4 bg-gradient-to-br from-slate-900 via-slate-950 to-[#040911]">
          {/* Header of Selected Incident */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[10px] font-bold font-mono">
                  {selectedItem.divisionEn.toUpperCase()} CLUSTER
                </span>
                <span className="text-[11px] text-slate-400">
                  {isBn ? "আক্রান্ত জেলাসমূহ:" : "Affected Districts:"} {selectedItem.districts.join(", ")}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-1">
                {isBn ? selectedItem.diseaseBn : selectedItem.diseaseEn}
              </h3>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-mono font-bold text-emerald-400 block">
                {selectedItem.activeDoctorsCount} {isBn ? "ডাক্তার সক্রিয়" : "Doctors Online"}
              </span>
              <span className="text-[10px] text-slate-400">
                {selectedItem.temperature} • {selectedItem.humidity} RH
              </span>
            </div>
          </div>

          {/* Contagion Vector Explanation */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.05] text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {isBn ? "সংক্রমণের প্রধান কারণ (Transmission Vector):" : "Contagion Vector & Weather Trigger:"}
            </span>
            <p className="text-slate-300">{selectedItem.contagionVector}</p>
          </div>

          {/* Official Rapid Protocol */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/30 border border-emerald-500/25 text-xs space-y-2">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "সরকারি অনুমোদিত তাত্ক্ষণিক প্রোটোকল:" : "Statutory Emergency Mitigation Protocol:"}</span>
            </span>
            <p className="text-slate-200 leading-relaxed font-medium">
              {isBn ? selectedItem.recommendedActionBn : selectedItem.recommendedActionEn}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={`/consult?category=${selectedItem.sector}`}
              className="flex-1 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition shadow-md shadow-emerald-500/20"
            >
              <Activity className="w-3.5 h-3.5 text-slate-950" />
              <span>
                {isBn
                  ? "এই জোনের বিশেষজ্ঞের সাথে লাইভ ট্রায়াজ শুরু করুন (৳২০০)"
                  : "Connect with On-Duty Specialist for This Zone (৳200)"}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </Link>

            <a
              href="tel:16123"
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/[0.08] text-xs font-bold transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isBn ? "হটলাইন ১৬১২৩" : "Hotline 16123"}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
