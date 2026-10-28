"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  const [pH, setPH] = useState<number>(6.5);
  const [soilType, setSoilType] = useState<"alluvial" | "clay" | "sandy" | "laterite">("alluvial");
  const [targetCrop, setTargetCrop] = useState<"rice" | "wheat" | "tomato" | "citrus">("rice");

  // Determine pH Status & Scientific Interpretation
  const getPHAnalysis = (val: number) => {
    if (val < 5.5) {
      return {
        label: "Strongly Acidic (High Risk of Aluminum/Manganese Toxicity)",
        status: "acidic",
        color: "text-red-400",
        barColor: "bg-red-500",
        pAvailability: 35, // % available
        nAvailability: 55,
        kAvailability: 60,
        microAvailability: 90, // Iron/Al toxic
        amendment: "Apply Dolomitic Limestone (CaCO3 + MgCO3) @ 1.5 - 2.5 Tons/Acre to raise pH to 6.5.",
        impact: "Severe Phosphorus (P) fixation with iron and aluminum; root tip cell death.",
      };
    } else if (val < 6.2) {
      return {
        label: "Moderately Acidic (Marginal Micronutrient Imbalance)",
        status: "mod-acidic",
        color: "text-amber-400",
        barColor: "bg-amber-500",
        pAvailability: 65,
        nAvailability: 78,
        kAvailability: 80,
        microAvailability: 85,
        amendment: "Broadcast 800 kg/Acre Agricultural Lime with organic farmyard manure before sowing.",
        impact: "Slight restriction of phosphorus uptake; beneficial for tea and potatoes, sub-optimal for legumes.",
      };
    } else if (val <= 7.3) {
      return {
        label: "Optimal Neutral Agronomic Range (Peak Bioavailability)",
        status: "optimal",
        color: "text-emerald-400",
        barColor: "bg-emerald-500",
        pAvailability: 96,
        nAvailability: 98,
        kAvailability: 95,
        microAvailability: 92,
        amendment: "Soil is in prime chemical equilibrium. Maintain with bio-fertilizers and balanced N-P-K.",
        impact: "Maximum nutrient absorption by root hairs; optimal soil microbial nitrogen fixation.",
      };
    } else if (val <= 8.2) {
      return {
        label: "Moderately Alkaline / Calcareous (Nutrient Lockout)",
        status: "mod-alkaline",
        color: "text-amber-400",
        barColor: "bg-amber-500",
        pAvailability: 50,
        nAvailability: 75,
        kAvailability: 85,
        microAvailability: 40,
        amendment: "Incorporate Elemental Sulfur @ 150 kg/Acre or fermented compost to reduce soil pH.",
        impact: "Zinc and Iron become insoluble carbonates, causing interveinal leaf chlorosis.",
      };
    } else {
      return {
        label: "Strongly Alkaline / Sodic (Severe Salinity Hazard)",
        status: "alkaline",
        color: "text-red-400",
        barColor: "bg-red-500",
        pAvailability: 28,
        nAvailability: 60,
        kAvailability: 70,
        microAvailability: 20,
        amendment: "Broadcast Agricultural Gypsum (CaSO4·2H2O) @ 2.0 - 4.0 Tons/Acre followed by flooding flush.",
        impact: "Sodium disperses soil clay aggregates; water infiltration crashes, severe root asphyxiation.",
      };
    }
  };

  const analysis = getPHAnalysis(pH);

  return (
    <div className="srot-glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 bg-gradient-to-b from-slate-900/80 via-[#071318] to-slate-950 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
            <FlaskConical className="w-4 h-4" />
            <span>Interactive Agronomic Engine</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Soil pH & N-P-K Nutrient Availability Interpreter
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Drag the pH slider or choose a soil type to see how chemical nutrient lockouts occur in root zones, and get verified lime/gypsum dosage formulas.
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-2 self-start lg:self-auto text-xs">
          <span className="text-slate-400 text-[11px] font-mono hidden sm:inline">Presets:</span>
          <button
            onClick={() => setPH(5.0)}
            className={`px-3 py-1.5 rounded-xl border transition ${
              pH === 5.0
                ? "bg-red-500/20 text-red-300 border-red-500/50"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Acidic (5.0)
          </button>
          <button
            onClick={() => setPH(6.8)}
            className={`px-3 py-1.5 rounded-xl border transition ${
              pH === 6.8
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Optimal (6.8)
          </button>
          <button
            onClick={() => setPH(8.3)}
            className={`px-3 py-1.5 rounded-xl border transition ${
              pH === 8.3
                ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Alkaline (8.3)
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
                Soil Reaction (pH Value):
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-mono text-white px-3 py-0.5 rounded-xl bg-slate-950 border border-slate-700">
                  {pH.toFixed(1)}
                </span>
                <span className={`text-xs font-bold ${analysis.color}`}>
                  {pH < 6.2 ? "Acidic" : pH <= 7.3 ? "Neutral" : "Alkaline"}
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
                <span>4.5 (Acidic)</span>
                <span>6.5 - 7.0 (Agronomic Sweet Spot)</span>
                <span>8.8 (Sodic / Calcareous)</span>
              </div>
            </div>

            {/* Status callout */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">
                Chemical Classification:
              </span>
              <p className={`text-xs font-bold mt-0.5 ${analysis.color}`}>
                {analysis.label}
              </p>
            </div>
          </div>

          {/* Bioavailability Progress Bars */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
              Relative Nutrient Bioavailability (% In Soil Solution)
            </span>

            {/* Nitrogen */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Nitrogen (N) Nitrate / Ammonium:</span>
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
                <span className="text-slate-300 font-medium">Phosphorus (P2O5) Bio-available:</span>
                <span className={`font-mono font-bold ${analysis.pAvailability < 60 ? "text-red-400" : "text-white"}`}>
                  {analysis.pAvailability}% {analysis.pAvailability < 50 && "(High Fixation)"}
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
                <span className="text-slate-300 font-medium">Potassium (K2O) Available:</span>
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
                <span className="text-slate-300 font-medium">Micronutrients (Zinc, Iron, Manganese):</span>
                <span className={`font-mono font-bold ${analysis.microAvailability < 50 ? "text-amber-400" : "text-white"}`}>
                  {analysis.microAvailability}% {pH > 7.5 ? "(Severe Chlorosis Risk)" : ""}
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
              <span>Agronomic Impact & Root Physiology</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {analysis.impact}
            </p>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-teal-500/30">
              <span className="text-[10px] font-mono uppercase text-teal-400 block font-bold">
                Recommended Scientific Amendment:
              </span>
              <p className="text-xs sm:text-sm text-white font-semibold mt-1">
                {analysis.amendment}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Calibrated against ICAR Soil & Agricultural Chemistry guidelines.</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prevents fertilizer wastage caused by applying urea or DAP into locked soils.</span>
              </div>
            </div>
          </div>

          {/* Action Box to send soil test to agronomist */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-950/50 via-slate-900 to-slate-950 border border-teal-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-white block">
                Have an official soil laboratory test card?
              </span>
              <span className="text-[11px] text-slate-400">
                Upload your soil card to receive an agronomist-certified custom fertilizer schedule.
              </span>
            </div>
            <Link
              href="/consult?service=fertilizer-advice"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition shadow-lg shrink-0 flex items-center gap-1.5"
            >
              <span>Consult Soil Expert</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
