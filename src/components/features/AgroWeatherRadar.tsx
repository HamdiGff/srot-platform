"use client";

import React, { useState } from "react";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  CloudSun,
  Droplets,
  Wind,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Thermometer,
  ShieldAlert,
  Sun,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

interface WeatherZone {
  id: string;
  name: string;
  nameBn: string;
  division: string;
  divisionBn: string;
  regionType: string;
  regionTypeBn: string;
  tempC: number;
  humidityPct: number;
  windKmH: number;
  rainForecast: string;
  rainForecastBn: string;
  thiIndex: number; // Temperature Humidity Index for cattle (<72 normal, 72-78 mild, >79 severe)
  sprayWindowStatus: "Optimal Window" | "Caution - High Wind" | "Unsafe - Rain Imminent";
  sprayWindowStatusBn: string;
  sprayWindowTimes: string;
  sprayWindowTimesBn: string;
  fungalRisk: "High Infection Risk" | "Moderate Risk" | "Low Risk";
  fungalRiskBn: string;
  cropContext: string;
  cropContextBn: string;
}

const ZONES: WeatherZone[] = [
  {
    id: "zone-mymensingh",
    name: "Mymensingh & Netrokona Basin",
    nameBn: "ময়মনসিংহ ও নেত্রকোণা হাওর অঞ্চল",
    division: "Mymensingh Division",
    divisionBn: "ময়মনসিংহ বিভাগ",
    regionType: "Boro Rice & Commercial Dairy Cluster",
    regionTypeBn: "বোরো ধান ও ডেইরি ক্লাস্টার",
    tempC: 28.5,
    humidityPct: 86,
    windKmH: 7.4,
    rainForecast: "Partly cloudy, light haor breeze next 6 hrs",
    rainForecastBn: "হাওরে মৃদু বাতাস, আগামী ৬ ঘণ্টা বৃষ্টিহীন",
    thiIndex: 76,
    sprayWindowStatus: "Optimal Window",
    sprayWindowStatusBn: "স্প্রে করার উপযুক্ত সময়",
    sprayWindowTimes: "06:30 AM – 10:00 AM (Calm Wind, No Rain)",
    sprayWindowTimesBn: "সকাল ০৬:৩০ – ১০:০০ টা (শান্ত বাতাস)",
    fungalRisk: "High Infection Risk",
    fungalRiskBn: "ধানের ব্লাস্ট ও খোলপচা রোগের উচ্চ ঝুঁকি",
    cropContext: "Boro Paddy (BRRI 28/29/89) Tillering Stage • Check for Stem Borer",
    cropContextBn: "বোরো ধান কুশি গজানো পর্যায় • মাজরা পোকা ও ব্লাস্ট মনিটর করুন",
  },
  {
    id: "zone-rangpur",
    name: "Rangpur & Dinajpur Belt",
    nameBn: "রংপুর ও দিনাজপুর শস্য বলয়",
    division: "Rangpur Division",
    divisionBn: "রংপুর বিভাগ",
    regionType: "Potato, Maize & Grain Heartland",
    regionTypeBn: "আলু, ভুট্টা ও শস্য এলাকা",
    tempC: 24.2,
    humidityPct: 89,
    windKmH: 6.1,
    rainForecast: "Heavy morning fog, clear sunny noon",
    rainForecastBn: "সকালে ঘন কুয়াশা, দুপুরে রোদ",
    thiIndex: 68,
    sprayWindowStatus: "Optimal Window",
    sprayWindowStatusBn: "স্প্রে করার নিরাপদ উইন্ডো",
    sprayWindowTimes: "09:30 AM – 03:00 PM (After dew dries up)",
    sprayWindowTimesBn: "সকাল ০৯:৩০ – বিকাল ০৩:০০ (শিশির শুকানোর পর)",
    fungalRisk: "High Infection Risk",
    fungalRiskBn: "আলুর নাবি ধসা (Late Blight) ঝুঁকি",
    cropContext: "Potato (Cardinal/Diamant) Foliar protection with Mancozeb",
    cropContextBn: "আলু ক্ষেতে ম্যানকোজেব স্প্রে করে নাবি ধসা প্রতিরোধ করুন",
  },
  {
    id: "zone-rajshahi",
    name: "Rajshahi & Chapainawabganj",
    nameBn: "রাজশাহী ও চাঁপাইনবাবগঞ্জ আম-শস্য বেল্ট",
    division: "Rajshahi Division",
    divisionBn: "রাজশাহী বিভাগ",
    regionType: "Mango Orchards & Rabi Mustard/Wheat",
    regionTypeBn: "আমের বাগান, সরিষা ও গম",
    tempC: 32.4,
    humidityPct: 58,
    windKmH: 13.8,
    rainForecast: "Dry dry weather, Nor'wester storm watch in 48h",
    rainForecastBn: "শুষ্ক আবহাওয়া, কালবৈশাখীর পূর্ব-সতর্কতা",
    thiIndex: 78,
    sprayWindowStatus: "Caution - High Wind",
    sprayWindowStatusBn: "সতর্কতা - বেশি বাতাসের গতিবেগ",
    sprayWindowTimes: "Late evening 05:00 PM – 06:45 PM",
    sprayWindowTimesBn: "সন্ধ্যায় ০৫:০০ – ০৬:৪৫ টা",
    fungalRisk: "Moderate Risk",
    fungalRiskBn: "আমের মুকুলে হপার পোকা ও পাউডারি মিলডিউ",
    cropContext: "Mango Blossom emergence • Spray Imidacloprid + Hexaconazole",
    cropContextBn: "আমের মুকুল সুরক্ষা • ইমিডাক্লোপ্রিড ও হেক্সাকোনাজল স্প্রে",
  },
  {
    id: "zone-jashore",
    name: "Jashore & Khulna Coastal Belt",
    nameBn: "যশোর ও খুলনা উপকূলীয় বলয়",
    division: "Khulna Division",
    divisionBn: "খুলনা বিভাগ",
    regionType: "Vegetables, Black Bengal Goat & Shrimp Gher",
    regionTypeBn: "সবজি, ব্ল্যাক বেঙ্গল ছাগল ও চিংড়ি ঘের",
    tempC: 30.0,
    humidityPct: 78,
    windKmH: 9.5,
    rainForecast: "Coastal humidity, tidal surge normal",
    rainForecastBn: "উপকূলীয় আর্দ্রতা, ঘেরের পানির তাপমাত্রা স্বাভাবিক",
    thiIndex: 77,
    sprayWindowStatus: "Optimal Window",
    sprayWindowStatusBn: "উপযুক্ত সময়",
    sprayWindowTimes: "07:00 AM – 10:30 AM",
    sprayWindowTimesBn: "সকাল ০৭:০০ – ১০:৩০ টা",
    fungalRisk: "Moderate Risk",
    fungalRiskBn: "ছাগলের পিপিআর ও ঘেরে অক্সিজেনের ঘাটতি",
    cropContext: "Winter vegetables (Brinjal/Cabbage) & Fish Pond DO monitoring",
    cropContextBn: "বেগুন ও বাঁধাকপিতে পোকা দমন এবং ঘেরে চুনের সঠিক প্রয়োগ",
  },
  {
    id: "zone-gazipur",
    name: "Dhaka & Gazipur Agro-Industrial",
    nameBn: "ঢাকা ও গাজীপুর পোল্ট্রি-ডেইরি করিডোর",
    division: "Dhaka Division",
    divisionBn: "ঢাকা বিভাগ",
    regionType: "Commercial Broiler Poultry & Dairy Farms",
    regionTypeBn: "বাণিজ্যিক ব্রয়লার পোল্ট্রি ও ডেইরি",
    tempC: 31.8,
    humidityPct: 79,
    windKmH: 8.2,
    rainForecast: "Warm and humid, low wind",
    rainForecastBn: "গরম ও আর্দ্র, শেডে পর্যাপ্ত বাতাস চলাচলের ব্যবস্থা রাখুন",
    thiIndex: 81,
    sprayWindowStatus: "Optimal Window",
    sprayWindowStatusBn: "ফার্ম স্যানিটাইজেশন উপযোগী",
    sprayWindowTimes: "Early Morning 06:00 AM – 08:30 AM",
    sprayWindowTimesBn: "ভোর ০৬:০০ – ০৮:৩০ টা",
    fungalRisk: "Low Risk",
    fungalRiskBn: "ব্রয়লারে হিট স্ট্রোক ও রক্ত আমাশয় ঝুঁকি",
    cropContext: "High THI in Crossbred Holstein Cows • Activate mist fans",
    cropContextBn: "উন্নত জাতের গাভীতে হিট স্ট্রেস • শেডে ফ্যান ও ঠাণ্ডা পানি দিন",
  },
];

export function AgroWeatherRadar() {
  const { language } = useLanguageStore();
  const [activeZone, setActiveZone] = useState<WeatherZone>(ZONES[0]);

  const isBn = language === "bn";

  // THI calculation color
  const getThiBadge = (thi: number) => {
    if (thi < 72) {
      return {
        label: isBn ? "স্বাভাবিক (আরামদায়ক)" : "Comfort Zone (< 72)",
        color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
        note: isBn ? "দুধ উৎপাদন স্বাভাবিক থাকবে" : "Ideal Milk Yield & Feed Intake",
      };
    } else if (thi <= 78) {
      return {
        label: isBn ? "হালকা হিট স্ট্রেস (৭২-৭৮)" : "Mild Heat Stress (72-78)",
        color: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        note: isBn ? "গাভীকে পর্যাপ্ত ঠাণ্ডা পানি ও ইলেক্ট্রোলাইট দিন" : "Provide fresh drinking water & mineral electrolytes",
      };
    } else {
      return {
        label: isBn ? "তীব্র হিট স্ট্রেস (> ৭৯)" : "Severe Heat Stress (> 79)",
        color: "bg-red-500/20 text-red-300 border-red-500/40 animate-pulse",
        note: isBn ? "দুধ উৎপাদন ১০-২৫% কমে যেতে পারে, শেডে ফ্যান চালান" : "Risk of milk drop by 15-25%. Turn on roof sprinklers",
      };
    }
  };

  const thiData = getThiBadge(activeZone.thiIndex);

  return (
    <div className="srot-glass-card hover-glow-cyan rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl relative overflow-hidden group">
      {/* Background radial glow */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-1.5">
            <CloudSun className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {isBn
                ? "বাংলাদেশের বিভাগীয় কৃষি-আবহাওয়া ও লাইভস্টক রাডার"
                : "Bangladesh Divisional Agro-Climatic & Livestock Radar"}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {isBn
              ? "ক্ষেতে বালাইনাশক স্প্রে ও গাভীর হিট স্ট্রেস সতর্কতা"
              : "Microclimate Spray Window & Livestock Heat Index"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {isBn
              ? "বিভাগীয় রিয়েল-টাইম আর্দ্রতা, বাতাসের গতিবেগ ও বৃষ্টিপাতের পূর্বাভাস দেখে স্প্রে করুন এবং গাভীর তাপপ্রবাহ নিয়ন্ত্রণ করুন।"
              : "Live temperature, dew point, and wind velocity across major Bangladesh agricultural divisions for precise chemical application."}
          </p>
        </div>

        {/* Division Selector Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700 overflow-x-auto max-w-full">
          {ZONES.map((z) => (
            <button
              key={z.id}
              onClick={() => setActiveZone(z)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeZone.id === z.id
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/60 border border-cyan-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {isBn ? z.nameBn.split(" ")[0] : z.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Radar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left 4 Cols: Live Divisional Telemetry */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  {isBn ? activeZone.divisionBn : activeZone.division}
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {isBn ? activeZone.nameBn : activeZone.name}
                </h4>
              </div>
              <span className="text-3xl font-black font-mono text-cyan-300">
                {activeZone.tempC}°C
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-cyan-400" />
                  {isBn ? "বায়ুর আর্দ্রতা" : "Humidity"}
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {activeZone.humidityPct}%
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Wind className="w-3 h-3 text-emerald-400" />
                  {isBn ? "বাতাসের গতি" : "Wind Speed"}
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {activeZone.windKmH} km/h
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300">
              <span className="text-slate-400 font-mono text-[10px] block">
                {isBn ? "আবহাওয়ার পূর্বাভাস:" : "6-HOUR MET FORECAST:"}
              </span>
              <p className="mt-0.5 font-medium">
                {isBn ? activeZone.rainForecastBn : activeZone.rainForecast}
              </p>
            </div>
          </div>

          {/* Regional Crop Alert Box */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs">
            <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">
              {isBn ? "মাঠ পর্যায়ের ফসল ও পরামর্শ:" : "REGIONAL CROP CONTEXT:"}
            </span>
            <p className="text-slate-200 mt-1 leading-relaxed">
              {isBn ? activeZone.cropContextBn : activeZone.cropContext}
            </p>
          </div>
        </div>

        {/* Right 8 Cols: Dual Action Cards (Spray Window & Cattle THI) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Agricultural Spray Window */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 flex flex-col justify-between hover-glow-emerald">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4" />
                  <span>{isBn ? "বালাইনাশক স্প্রে ক্যালেন্ডার" : "Pesticide Spray Window"}</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {isBn ? activeZone.sprayWindowStatusBn : activeZone.sprayWindowStatus}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 my-3">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  {isBn ? "নিরাপদ স্প্রে উইন্ডো:" : "OPTIMAL SPRAY WINDOW:"}
                </span>
                <p className="text-xs font-bold text-white">
                  {isBn ? activeZone.sprayWindowTimesBn : activeZone.sprayWindowTimes}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {isBn
                      ? "বাতাসের গতি ১২ কিমি/ঘণ্টার কম থাকায় রাসায়নিক অপচয় (spray drift) হবে না।"
                      : "Wind velocity is under 12 km/h; minimal droplet drift risk."}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isBn ? "রোগ ঝুঁকি: " : "Fungal Spore Risk: "}</strong>
                    {isBn ? activeZone.fungalRiskBn : activeZone.fungalRisk}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{isBn ? "বৃষ্টিপাতের সম্ভাবনা: < ১০%" : "Wash-off Risk: Low (<10%)"}</span>
              <span className="text-emerald-400 font-bold">{isBn ? "নিরাপদ" : "Approved"}</span>
            </div>
          </div>

          {/* Card 2: Livestock THI Heat Stress Index */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 flex flex-col justify-between hover-glow-cyan">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4" />
                  <span>{isBn ? "গাভীর হিট স্ট্রেস (THI) ইনডেক্স" : "Dairy Cattle THI Index"}</span>
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${thiData.color}`}>
                  THI: {activeZone.thiIndex}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 my-3">
                <span className="text-[10px] text-slate-400 font-mono block">
                  {isBn ? "তাপপ্রবাহ মাত্রা:" : "HEAT STRESS ASSESSMENT:"}
                </span>
                <p className="text-xs font-bold text-white">
                  {thiData.label}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {thiData.note}
                </p>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] text-slate-400">
                  <span className="font-semibold text-cyan-300">
                    {isBn ? "জাতভিত্তিক ঝুঁকি: " : "Breed Impact: "}
                  </span>
                  {isBn
                    ? "উন্নত হলস্টেইন-ফ্রিজিয়ান ক্রস গাভী দেশি জিবু গরুর চেয়ে তাপে বেশি সংবেদনশীল।"
                    : "Holstein-Friesian crosses are more vulnerable than Deshi Zebu cattle."}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{isBn ? "পানি ও ইলেক্ট্রোলাইট সাপ্লিমেন্ট" : "Electrolyte Protocol"}</span>
              <span className="text-cyan-400 font-bold">{isBn ? "পর্যবেক্ষণে রাখুন" : "Active"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
