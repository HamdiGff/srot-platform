"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Scan,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Wheat,
  Milk,
  HeartHandshake,
  Upload,
  ShieldCheck,
} from "lucide-react";

interface ScanSample {
  id: string;
  category: "agri" | "veterinary" | "pet";
  categoryLabel: string;
  label: string;
  image: string;
  pathogen: string;
  confidence: number;
  symptomsObserved: string[];
  immediateSteps: string[];
  matchedDoctor: {
    name: string;
    role: string;
    avatar: string;
    id: string;
  };
  recommendedFormulation: string;
  withholdingTime: string;
}

const SAMPLES: ScanSample[] = [
  {
    id: "sample-blast",
    category: "agri",
    categoryLabel: "Crop Pathology",
    label: "Rice Leaf Blast (Swarna)",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
    pathogen: "Magnaporthe oryzae (Pyricularia oryzae)",
    confidence: 97.4,
    symptomsObserved: [
      "Diamond spindle-shaped foliar lesions with ash-gray center",
      "Necrotic brown outer borders spreading along vascular veins",
      "Humidity-induced sporulation on lower canopy layer",
    ],
    immediateSteps: [
      "Suspend further nitrogen top-dressing to prevent vegetative succulence.",
      "Maintain 2-3 cm standing water layer across affected paddy plots.",
      "Prepare calibrated foliar triazole spray for late afternoon.",
    ],
    matchedDoctor: {
      name: "Dr. Ramesh Patel",
      role: "Chief Plant Pathologist (16 Yrs Exp)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      id: "exp-dr-ramesh-patel",
    },
    recommendedFormulation: "Tricyclazole 75% WP @ 0.6g/L",
    withholdingTime: "21 Days Pre-Harvest Safety Interval",
  },
  {
    id: "sample-mastitis",
    category: "veterinary",
    categoryLabel: "Dairy Veterinary",
    label: "Bovine Acute Mastitis (Hind Teat)",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80",
    pathogen: "Streptococcus uberis / S. aureus",
    confidence: 95.8,
    symptomsObserved: [
      "Erythematous swelling and localized hyperthermia in right hind quarter",
      "Viscous milk flakes & yellowish serous clots on fore-strip paddle",
      "Elevated somatic cell count > 800,000 cells/ml",
    ],
    immediateSteps: [
      "Strip out affected quarter completely every 3 hours to purge toxins.",
      "Apply cold hydrotherapy pack to udder for 15 minutes before milking.",
      "Discard milk entirely into bio-disposal; do NOT feed to replacement calves.",
    ],
    matchedDoctor: {
      name: "Dr. Ananya Sen, M.V.Sc.",
      role: "Senior Veterinary Surgeon (14 Yrs Exp)",
      avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=200&q=80",
      id: "exp-dr-ananya-sen",
    },
    recommendedFormulation: "Intramammary Infusion + Meloxicam NSAID",
    withholdingTime: "72 Hours Strict Milk Withholding",
  },
  {
    id: "sample-dermatitis",
    category: "pet",
    categoryLabel: "Companion Pet Care",
    label: "Canine Atopic & Flea Dermatitis",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
    pathogen: "Atopic Allergy with Secondary Malassezia Yeast",
    confidence: 96.2,
    symptomsObserved: [
      "Bilateral paw pododermatitis with salivary staining",
      "Erythematous ventral abdomen flare and intense pruritus",
      "Secondary follicular crusting along tail base and inner thighs",
    ],
    immediateSteps: [
      "Fit protective soft cone collar to prevent self-mutilating skin licking.",
      "Wipe paws and ventral groin with hypoallergenic damp washcloth.",
      "Administer weight-titrated antipruritic JAK inhibitor.",
    ],
    matchedDoctor: {
      name: "Dr. Elena Rostova, D.V.M.",
      role: "Companion Pet Tele-Vet Director (9 Yrs Exp)",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
      id: "exp-dr-elena-rostova",
    },
    recommendedFormulation: "Oclacitinib 16mg + Otic Drops",
    withholdingTime: "Veterinary Prescription Only (Weight: 31.5 kg)",
  },
];

export function AiSymptomScanner() {
  const [selectedSample, setSelectedSample] = useState<ScanSample>(SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);

  const handleSelectSample = (sample: ScanSample) => {
    setSelectedSample(sample);
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 25;
      });
    }, 120);
  };

  return (
    <div className="srot-glass-card rounded-3xl p-6 sm:p-8 md:p-10 border border-emerald-500/30 bg-gradient-to-b from-[#0c1522] to-[#060b11] shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Computer Vision Triage Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Live Crop & Animal Symptom Scanner
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Test the AI diagnostic scanner below using verified clinical samples from crop fields, dairy herds, or companion pets.
          </p>
        </div>

        {/* Sample Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {SAMPLES.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectSample(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                selectedSample.id === s.id
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60"
                  : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              }`}
            >
              {s.category === "agri" && <Wheat className="w-3.5 h-3.5 text-emerald-400" />}
              {s.category === "veterinary" && <Milk className="w-3.5 h-3.5 text-cyan-400" />}
              {s.category === "pet" && <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />}
              <span>{s.categoryLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* Left 5 Cols: Visual Scanner Screen with Laser Line */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-black aspect-4/3 group">
            <img
              src={selectedSample.image}
              alt={selectedSample.label}
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

            {/* Scanning Laser Line Animation */}
            {isScanning && (
              <div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 shadow-[0_0_15px_#34d399] transition-all duration-150 z-20"
                style={{ top: `${scanProgress}%` }}
              />
            )}

            {/* HUD Overlay Elements */}
            <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] text-white font-mono flex items-center gap-2">
              <Scan className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>{isScanning ? `SCANNING: ${scanProgress}%` : "AI SPECTRAL MATCH: CONFIRMED"}</span>
            </div>

            <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
              {selectedSample.confidence}% Match
            </div>

            <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Active Sample:</span>
                <span className="font-bold text-white truncate block">{selectedSample.label}</span>
              </div>
              <button
                onClick={() => handleSelectSample(selectedSample)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-semibold flex items-center gap-1 transition"
              >
                <RefreshCw className="w-3 h-3 text-emerald-400" /> Rescan
              </button>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Diagnostic Analysis Card & Prescribed Action */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Primary Pathogen / Etiology
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                High Confidence Diagnostic
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-mono">
              {selectedSample.pathogen}
            </h3>

            {/* Observed Symptoms */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Detected Micro-Morphology:
              </span>
              {selectedSample.symptomsObserved.map((sym, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{sym}</span>
                </div>
              ))}
            </div>

            {/* Recommended Formulation & Safety */}
            <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Recommended Formulation:</span>
                <strong className="text-emerald-300">{selectedSample.recommendedFormulation}</strong>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block">
                  {selectedSample.withholdingTime}
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Practitioner & Booking CTA */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedSample.matchedDoctor.avatar}
                alt={selectedSample.matchedDoctor.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-700"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white">{selectedSample.matchedDoctor.name}</h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400">{selectedSample.matchedDoctor.role}</p>
                <span className="text-[10px] text-emerald-400 font-semibold">Available for Live Review</span>
              </div>
            </div>

            <Link
              href={`/consult?category=${selectedSample.category}&expert=${selectedSample.matchedDoctor.id}`}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-950/60"
            >
              <span>Connect for Official Signed Rx</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
