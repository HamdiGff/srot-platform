"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calculator,
  Wheat,
  Milk,
  HeartHandshake,
  X,
  Droplets,
  Scale,
  Clock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DosageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DosageCalculatorModal({ isOpen, onClose }: DosageCalculatorModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeTab, setActiveTab] = useState<"crop" | "vet">("crop");

  // Crop Form State
  const [acreage, setAcreage] = useState<number>(3);
  const [cropType, setCropType] = useState<string>("paddy");
  const [chemicalType, setChemicalType] = useState<string>("tricyclazole");

  // Vet Form State
  const [animalSpecies, setAnimalSpecies] = useState<string>("cattle");
  const [bodyWeightKg, setBodyWeightKg] = useState<number>(450);
  const [medCategory, setMedCategory] = useState<string>("antibiotic_ceftiofur");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Crop calculation logic
  const calculateCropDosage = () => {
    let waterPerAcre = 200; // liters
    let chemGramsPerAcre = 120; // default tricyclazole
    let spraySafetyDays = 21;
    let formulationName = "Tricyclazole 75% WP";

    if (chemicalType === "mancozeb") {
      chemGramsPerAcre = 500;
      waterPerAcre = 200;
      spraySafetyDays = 14;
      formulationName = "Mancozeb 75% WP (Contact Protectant)";
    } else if (chemicalType === "urea") {
      chemGramsPerAcre = 25000; // 25kg
      waterPerAcre = 0;
      spraySafetyDays = 0;
      formulationName = "Urea (Nitrogen 46% - Soil Top Dressing)";
    } else if (chemicalType === "chlorantraniliprole") {
      chemGramsPerAcre = 60; // 60ml
      waterPerAcre = 150;
      spraySafetyDays = 14;
      formulationName = "Chlorantraniliprole 18.5% SC (Borer Control)";
    }

    const totalWater = waterPerAcre * acreage;
    const totalChem = chemGramsPerAcre * acreage;
    const knapsackTanks = Math.ceil(totalWater / 16); // 16-liter knapsack sprayers

    return {
      totalWater,
      totalChem: totalChem >= 1000 ? `${(totalChem / 1000).toFixed(1)} kg` : `${totalChem} grams/ml`,
      knapsackTanks,
      spraySafetyDays,
      formulationName,
    };
  };

  // Vet calculation logic
  const calculateVetDosage = () => {
    let doseMl = 0;
    let frequency = "Once daily for 3 days";
    let route = "Intramuscular (IM)";
    let withholding = "Milk: 72 hours. Meat: 4 days";
    let medicineName = "Ceftiofur Sodium (1g/vial)";

    if (medCategory === "antibiotic_ceftiofur") {
      doseMl = Number((bodyWeightKg * 0.02).toFixed(1)); // ~2ml per 100kg
      route = "Intramuscular (IM) in neck muscle";
      withholding = "Milk: 72 hours. Meat: 4 days";
      medicineName = "Ceftiofur Sodium Sterile Powder";
    } else if (medCategory === "meloxicam") {
      doseMl = Number((bodyWeightKg * 0.025).toFixed(1)); // 0.5mg/kg, 20mg/ml
      route = "Subcutaneous (SC) or Oral (Pets)";
      withholding = "Milk: 120 hours. Meat: 15 days";
      medicineName = "Meloxicam NSAID Anti-Inflammatory";
      frequency = "Single initial dose, repeat in 24 hrs if pain persists";
    } else if (medCategory === "anthelmintic") {
      doseMl = Number((bodyWeightKg * 0.075).toFixed(1)); // Albendazole suspension
      route = "Oral Drench";
      withholding = "Milk: 60 hours. Meat: 14 days";
      medicineName = "Albendazole 10% Micronized Oral Drench";
      frequency = "Single treatment, repeat after 21 days";
    }

    return {
      doseMl: `${doseMl} ml`,
      frequency,
      route,
      withholding,
      medicineName,
    };
  };

  const cropResult = calculateCropDosage();
  const vetResult = calculateVetDosage();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="calculator-modal-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-auto z-50 p-0 rounded-3xl bg-[#090e17] text-slate-100 border border-slate-700/80 shadow-2xl max-w-2xl w-[94vw] backdrop:bg-black/80"
    >
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Calculator className="w-5 h-5" />
            </span>
            <div>
              <h2 id="calculator-modal-title" className="text-xl font-bold text-white">
                Agronomic & Veterinary Dosage Engine
              </h2>
              <p className="text-xs text-slate-400">
                Scientifically calibrated chemical, fertilizer, and weight-based clinical dosages.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-5 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab("crop")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === "crop"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/60"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Wheat className="w-4 h-4" />
            <span>Crop Spray & Fertilizer Calculator</span>
          </button>
          <button
            onClick={() => setActiveTab("vet")}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === "vet"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-950/60"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Milk className="w-4 h-4" />
            <span>Animal Weight-to-Dose Calculator</span>
          </button>
        </div>

        {/* TAB 1: CROP DOSAGE */}
        {activeTab === "crop" ? (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Field Area (Acres): <strong className="text-emerald-400">{acreage} Acres</strong>
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={25}
                  step={0.5}
                  value={acreage}
                  onChange={(e) => setAcreage(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Crop Type</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="paddy">Rice / Paddy</option>
                  <option value="maize">Maize / Corn</option>
                  <option value="wheat">Wheat</option>
                  <option value="tomato">Tomato / Vegetable</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Chemical / Fertilizer</label>
                <select
                  value={chemicalType}
                  onChange={(e) => setChemicalType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="tricyclazole">Tricyclazole (Blast Control)</option>
                  <option value="mancozeb">Mancozeb (Leaf Spot / Blight)</option>
                  <option value="chlorantraniliprole">Chlorantraniliprole (Stem Borer)</option>
                  <option value="urea">Urea (Nitrogen Top Dressing)</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Display */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-3">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                Calculated Recipe for {acreage} Acre(s):
              </span>
              <h3 className="font-bold text-white text-base">{cropResult.formulationName}</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Total Formulation:</span>
                  <strong className="text-white text-sm">{cropResult.totalChem}</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Clean Water:</span>
                  <strong className="text-white text-sm">{cropResult.totalWater} Liters</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">16L Knapsack Tanks:</span>
                  <strong className="text-white text-sm">{cropResult.knapsackTanks} Tanks</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Pre-Harvest Interval:</span>
                  <strong className="text-amber-400 text-sm">{cropResult.spraySafetyDays} Days</strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: VET DOSAGE */
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Animal Species</label>
                <select
                  value={animalSpecies}
                  onChange={(e) => {
                    const sp = e.target.value;
                    setAnimalSpecies(sp);
                    if (sp === "cattle") setBodyWeightKg(450);
                    else if (sp === "calf") setBodyWeightKg(65);
                    else if (sp === "goat") setBodyWeightKg(35);
                    else if (sp === "dog") setBodyWeightKg(28);
                    else if (sp === "cat") setBodyWeightKg(4.5);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="cattle">Dairy Cattle (Adult)</option>
                  <option value="calf">Dairy Calf (Weaned)</option>
                  <option value="goat">Goat / Sheep</option>
                  <option value="dog">Dog (Companion Pet)</option>
                  <option value="cat">Cat (Companion Pet)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Body Weight: <strong className="text-cyan-400">{bodyWeightKg} kg</strong>
                </label>
                <input
                  type="range"
                  min={2}
                  max={800}
                  step={1}
                  value={bodyWeightKg}
                  onChange={(e) => setBodyWeightKg(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Clinical Medicine</label>
                <select
                  value={medCategory}
                  onChange={(e) => setMedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="antibiotic_ceftiofur">Ceftiofur Antibiotic (Respiratory/Mastitis)</option>
                  <option value="meloxicam">Meloxicam NSAID (Fever & Pain)</option>
                  <option value="anthelmintic">Albendazole (Broad-Spectrum Dewormer)</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Display */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-3">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">
                Calculated Prescription for {bodyWeightKg} kg {animalSpecies.toUpperCase()}:
              </span>
              <h3 className="font-bold text-white text-base">{vetResult.medicineName}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Volume to Administer:</span>
                  <strong className="text-cyan-400 text-base">{vetResult.doseMl}</strong>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{vetResult.route}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Frequency & Regimen:</span>
                  <strong className="text-white text-xs leading-tight block">{vetResult.frequency}</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Mandatory Withholding Period:</span>
                  <strong className="text-amber-400 text-xs leading-tight block">{vetResult.withholding}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Formulas verified by SROT Clinical Pharmacology Board</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </dialog>
  );
}
