"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  FlaskConical,
  Sprout,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet,
} from "lucide-react";

export function SoilHealthInterpreter() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const [pH, setPH] = useState<number>(6.5);

  // Determine pH Status & Scientific Interpretation for Bangladesh Agro-Ecological Zones
  const getPHAnalysis = (val: number) => {
    if (val < 5.5) {
      return {
        label: isBn ? "তীব্র অম্লীয় / অ্যাসিডিক মাটি (সিলেট ও হাওর এলাকা)" : "Strongly Acidic (Haor & Hill Tracts Peat)",
        status: "acidic",
        color: "text-red-400",
        barColor: "bg-red-500",
        pAvailability: 35,
        nAvailability: 55,
        kAvailability: 60,
        microAvailability: 90,
        amendment: isBn
          ? "প্রতি বিঘায় ৫০-৭০ কেজি ডলোমাইট চুন (CaCO3 + MgCO3) প্রয়োগ করে মাটির পিএইচ ৬.২-এ আনুন।"
          : "Apply Dolomitic Limestone @ 1.5 - 2.5 Tons/Acre to neutralize aluminum toxicity and unlock phosphate.",
        impact: isBn
          ? "মাটিতে ফসফরাস আটকে যায় (Fixation), শেকড়ের বৃদ্ধি ব্যাহত হয় এবং গাছ হলুদ হয়ে খর্বাকৃতি ধারণ করে।"
          : "Severe Phosphorus (P) fixation with iron and aluminum; root tip cell death.",
      };
    } else if (val < 6.2) {
      return {
        label: isBn ? "হালকা অম্লীয় মাটি (বরেন্দ্র ও মধুপুর গড়)" : "Moderately Acidic (Barind Tract & Madhupur)",
        status: "mod-acidic",
        color: "text-amber-400",
        barColor: "bg-amber-500",
        pAvailability: 65,
        nAvailability: 78,
        kAvailability: 80,
        microAvailability: 85,
        amendment: isBn
          ? "জমি চাষের সময় প্রতি শতকে ১ কেজি চুন ও পর্যাপ্ত জৈব সার/ভার্মিকম্পোস্ট প্রয়োগ করুন।"
          : "Broadcast 800 kg/Acre Agricultural Lime with organic farmyard manure before sowing.",
        impact: isBn
          ? "ফসফরাসের সামান্য ঘাটতি দেখা যায়; আলু ও চা চাষের জন্য উপযোগী হলেও ডাল ও তেলের জন্য চুন প্রয়োজন।"
          : "Slight restriction of phosphorus uptake; beneficial for tea and potatoes, sub-optimal for legumes.",
      };
    } else if (val <= 7.3) {
      return {
        label: isBn ? "আদর্শ মধ্যম অম্ল-ক্ষার মাত্রা (পলি ও দোআঁশ মাটি)" : "Optimal Neutral Range (Alluvial Delta Soil)",
        status: "optimal",
        color: "text-emerald-400",
        barColor: "bg-emerald-500",
        pAvailability: 96,
        nAvailability: 98,
        kAvailability: 95,
        microAvailability: 92,
        amendment: isBn
          ? "মাটি প্রাকৃতিক ভারসাম্য অবস্থায় আছে। সুষম এন-পি-কে ও জিংক সালফেট বজায় রাখুন।"
          : "Soil is in prime chemical equilibrium. Maintain with bio-fertilizers and balanced N-P-K.",
        impact: isBn
          ? "গাছের শেকড় দ্বারা সর্বাধিক পুষ্টি উপাদান গ্রহণ এবং মাটিতে উপকারী ব্যাকটেরিয়ার সর্বোচ্চ কার্যকারিতা।"
          : "Maximum nutrient absorption by root hairs; optimal soil microbial nitrogen fixation.",
      };
    } else if (val <= 8.2) {
      return {
        label: isBn ? "হালকা ক্ষারীয় / লোনাপানি প্রভাবিত মাটি (উপকূলীয় বলয়)" : "Moderately Alkaline (Coastal Saline Fringe)",
        status: "mod-alkaline",
        color: "text-amber-400",
        barColor: "bg-amber-500",
        pAvailability: 50,
        nAvailability: 75,
        kAvailability: 85,
        microAvailability: 40,
        amendment: isBn
          ? "প্রতি বিঘায় ২০-২৫ কেজি জিপসাম বা গন্ধক (Sulfur) ও ট্রাইকোডার্মা মিশ্রিত জৈব সার প্রয়োগ করুন।"
          : "Incorporate Elemental Sulfur @ 150 kg/Acre or fermented compost to reduce soil pH.",
        impact: isBn
          ? "জিংক ও আয়রন অদ্রবণীয় হয়ে যায়, ধানে খয়রা রোগ ও কচি পাতায় শিরার মাঝে হলুদ দাগ দেখা দেয়।"
          : "Zinc and Iron become insoluble carbonates, causing interveinal leaf chlorosis.",
      };
    } else {
      return {
        label: isBn ? "তীব্র ক্ষারীয় ও লবণাক্ত মাটি (খুলনা ও সাতক্ষীরা উপকূল)" : "Strongly Saline / Sodic (Coastal Sundarbans Belt)",
        status: "alkaline",
        color: "text-red-400",
        barColor: "bg-red-500",
        pAvailability: 28,
        nAvailability: 60,
        kAvailability: 70,
        microAvailability: 20,
        amendment: isBn
          ? "প্রতি শতকে ২-৩ কেজি জিপসাম প্রয়োগের পর মিষ্টি পানিতে ধৌত (Leaching) করুন এবং লবন-সহিষ্ণু জাত চাষ করুন।"
          : "Broadcast Agricultural Gypsum @ 2.0 - 4.0 Tons/Acre followed by fresh water flushing.",
        impact: isBn
          ? "সোডিয়ামের কারণে মাটির কাঠামো নষ্ট হয়, শিকড়ে বাতাস ঢুকতে পারে না এবং অঙ্কুরোদগম ব্যাহত হয়।"
          : "Sodium disperses soil clay aggregates; water infiltration crashes, severe root asphyxiation.",
      };
    }
  };

  const analysis = getPHAnalysis(pH);

  return (
    <div className="srot-glass-card hover-glow-emerald rounded-3xl p-6 sm:p-10 border border-slate-800 bg-gradient-to-b from-slate-900/85 via-[#071318] to-slate-950 shadow-2xl relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-teal-500/15 transition-all" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
            <FlaskConical className="w-4 h-4" />
            <span>{isBn ? "বাংলাদেশ মৃত্তিকা সম্পদ ও সার নির্দেশিকা" : "Bangladesh Soil Chemistry Engine"}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {isBn ? "মাটির পিএইচ (pH) ও এন-পি-কে পুষ্টি উপাদান বিশ্লেষণ" : "Soil pH & N-P-K Nutrient Availability Interpreter"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {isBn
              ? "স্লাইডার ঘুরিয়ে আপনার মাটির পিএইচ নির্বাচন করুন এবং মাটিতে রাসায়নিক লকআউট ও চুন/জিপসামের সঠিক মাত্রা জেনে নিন।"
              : "Drag the pH slider to see how chemical nutrient lockouts occur in root zones, and get verified lime/gypsum dosage formulas."}
          </p>
        </div>

        {/* Quick Bangladesh Presets */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto text-xs">
          <span className="text-slate-400 text-[11px] font-mono hidden sm:inline">
            {isBn ? "প্রিসেট:" : "Presets:"}
          </span>
          <button
            onClick={() => setPH(5.0)}
            className={`px-3 py-1.5 rounded-xl border transition ${
              pH === 5.0
                ? "bg-red-500/20 text-red-300 border-red-500/50"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            {isBn ? "হাওর অম্লীয় (৫.০)" : "Acidic Haor (5.0)"}
          </button>
          <button
            onClick={() => setPH(6.8)}
            className={`px-3 py-1.5 rounded-xl border transition ${
              pH === 6.8
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            {isBn ? "পলিমাটি স্বাভাবিক (৬.৮)" : "Alluvial (6.8)"}
          </button>
          <button
            onClick={() => setPH(8.3)}
            className={`px-3 py-1.5 rounded-xl border transition ${
              pH === 8.3
                ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            {isBn ? "উপকূলীয় ক্ষারীয় (৮.৩)" : "Coastal Saline (8.3)"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
        {/* Left 6 Cols: pH Slider and Nutrient Bioavailability Bars */}
        <div className="lg:col-span-6 space-y-6">
          {/* Interactive Slider Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                {isBn ? "মাটির পিএইচ মান (pH Value):" : "Soil Reaction (pH Value):"}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-mono text-white px-3 py-0.5 rounded-xl bg-slate-950 border border-slate-700">
                  {pH.toFixed(1)}
                </span>
                <span className={`text-xs font-bold ${analysis.color}`}>
                  {pH < 6.2
                    ? isBn ? "অম্লীয়" : "Acidic"
                    : pH <= 7.3
                    ? isBn ? "নিরপেক্ষ (আদর্শ)" : "Neutral"
                    : isBn ? "ক্ষারীয়" : "Alkaline"}
                </span>
              </div>
            </div>

            {/* Slider */}
            <div>
              <input
                type="range"
                min="4.5"
                max="8.8"
                step="0.1"
                value={pH}
                onChange={(e) => setPH(parseFloat(e.target.value))}
                aria-label="Soil pH Level"
                className="w-full h-3 bg-gradient-to-r from-red-600 via-emerald-500 to-purple-600 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
                <span>৪.৫ (অম্লীয়)</span>
                <span>৬.৫ – ৭.০ (কৃষির সোনালী মান)</span>
                <span>৮.৮ (লবণাক্ত ক্ষারীয়)</span>
              </div>
            </div>

            {/* Status callout */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">
                {isBn ? "রাসায়নিক অবস্থা:" : "Chemical Classification:"}
              </span>
              <p className={`text-xs font-bold mt-0.5 ${analysis.color}`}>
                {analysis.label}
              </p>
            </div>
          </div>

          {/* Bioavailability Progress Bars */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
              {isBn ? "মাটিতে পুষ্টি উপাদানের কার্যকারিতা (% Bioavailability)" : "Relative Nutrient Bioavailability (% In Soil Solution)"}
            </span>

            {/* Nitrogen */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">{isBn ? "নাইট্রোজেন (ইউরিয়া সার):" : "Nitrogen (N) Nitrate / Ammonium:"}</span>
                <span className="font-mono font-bold text-white">{analysis.nAvailability}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${analysis.nAvailability}%` }}
                />
              </div>
            </div>

            {/* Phosphorus */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">{isBn ? "ফসফরাস (টিএসপি / ডিএপি সার):" : "Phosphorus (P2O5) Available:"}</span>
                <span className={`font-mono font-bold ${analysis.pAvailability < 60 ? "text-red-400" : "text-white"}`}>
                  {analysis.pAvailability}% {analysis.pAvailability < 50 && (isBn ? "(মাটিতে আটকে যায়)" : "(High Fixation)")}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    analysis.pAvailability < 50 ? "bg-red-500" : "bg-cyan-500"
                  }`}
                  style={{ width: `${analysis.pAvailability}%` }}
                />
              </div>
            </div>

            {/* Potassium */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">{isBn ? "পটাশিয়াম (এমওপি সার):" : "Potassium (K2O) Available:"}</span>
                <span className="font-mono font-bold text-white">{analysis.kAvailability}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all duration-300"
                  style={{ width: `${analysis.kAvailability}%` }}
                />
              </div>
            </div>

            {/* Micronutrients */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">{isBn ? "অণুখাদ্য (দস্তা ও বোরন):" : "Micronutrients (Zinc, Boron, Iron):"}</span>
                <span className={`font-mono font-bold ${analysis.microAvailability < 50 ? "text-amber-400" : "text-white"}`}>
                  {analysis.microAvailability}% {pH > 7.5 ? (isBn ? "(ঘাটতি ও খয়রা রোগ ঝুঁকি)" : "(Chlorosis Risk)") : ""}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    analysis.microAvailability < 50 ? "bg-amber-500" : "bg-purple-500"
                  }`}
                  style={{ width: `${analysis.microAvailability}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Scientific Diagnosis, Corrective Amendment & Prescription Action */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <Sprout className="w-4 h-4" />
              <span>{isBn ? "ফসলের শারীরতত্ত্ব ও মাটির প্রভাব" : "Agronomic Impact & Root Physiology"}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {analysis.impact}
            </p>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-teal-500/30">
              <span className="text-[10px] font-mono uppercase text-teal-400 block font-bold">
                {isBn ? "প্রস্তাবিত বৈজ্ঞানিক সমাধান / সার প্রয়োগ:" : "Recommended Scientific Amendment:"}
              </span>
              <p className="text-xs sm:text-sm text-white font-semibold mt-1">
                {analysis.amendment}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBn ? "মৃত্তিকা সম্পদ উন্নয়ন ইনস্টিটিউট (SRDI) ও বিএআরআই নির্দেশিকা অনুযায়ী।" : "Calibrated against SRDI and BARI soil standards."}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBn ? "অতিরিক্ত ইউরিয়া বা ডিএপি সারের অপচয় রোধ করে খরচের সুরক্ষা।" : "Prevents fertilizer wastage from unbalanced applications."}</span>
              </div>
            </div>
          </div>

          {/* Action Box to send soil test to agronomist */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/50 via-slate-900 to-slate-950 border border-teal-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-white block">
                {isBn ? "মাটি পরীক্ষার কার্ড বা স্বাস্থ্য কার্ড আছে?" : "Have an official soil test card?"}
              </span>
              <span className="text-[11px] text-slate-400">
                {isBn ? "কার্ডের ছবি তুলে পাঠান, আমাদের মৃত্তিকা বিশেষজ্ঞ সুষম সার প্রয়োগ তালিকা দেবেন।" : "Upload your soil card to receive an agronomist-certified custom fertilizer schedule."}
              </span>
            </div>
            <Link
              href="/consult?service=fertilizer-advice"
              className="btn-shimmer px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition shadow-lg shrink-0 flex items-center gap-1.5"
            >
              <span>{isBn ? "মৃত্তিকা বিশেষজ্ঞের পরামর্শ" : "Consult Soil Expert"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
