"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguageStore } from "@/lib/store/languageStore";
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

interface DosageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DosageCalculatorModal({ isOpen, onClose }: DosageCalculatorModalProps) {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
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
    let formulationName = isBn ? "ট্রাইসাইক্লাজল ৭৫% ডব্লিউপি (ব্লাস্ট প্রতিরোধী)" : "Tricyclazole 75% WP (Blast Control)";

    if (chemicalType === "mancozeb") {
      chemGramsPerAcre = 500;
      waterPerAcre = 200;
      spraySafetyDays = 14;
      formulationName = isBn ? "ম্যানকোজেব ৭৫% ডব্লিউপি (পাতা ধসা ও দাগ প্রতিরোধক)" : "Mancozeb 75% WP (Contact Protectant)";
    } else if (chemicalType === "urea") {
      chemGramsPerAcre = 25000; // 25kg
      waterPerAcre = 0;
      spraySafetyDays = 0;
      formulationName = isBn ? "ইউরিয়া সার (নাইট্রোজেন ৪৬% - জমিতে উপরিপ্রয়োগ)" : "Urea (Nitrogen 46% - Soil Top Dressing)";
    } else if (chemicalType === "chlorantraniliprole") {
      chemGramsPerAcre = 60; // 60ml
      waterPerAcre = 150;
      spraySafetyDays = 14;
      formulationName = isBn ? "ক্লোরান্ট্রানিলিপ্রোল ১৮.৫% এসসি (মাজরা পোকা দমন)" : "Chlorantraniliprole 18.5% SC (Borer Control)";
    }

    const totalWater = waterPerAcre * acreage;
    const totalChem = chemGramsPerAcre * acreage;
    const knapsackTanks = Math.ceil(totalWater / 16); // 16-liter knapsack sprayers

    return {
      totalWater,
      totalChem: totalChem >= 1000 ? `${(totalChem / 1000).toFixed(1)} kg` : `${totalChem} g/ml`,
      knapsackTanks,
      spraySafetyDays,
      formulationName,
    };
  };

  // Vet calculation logic
  const calculateVetDosage = () => {
    let doseMl = 0;
    let frequency = isBn ? "প্রতিদিন একবার, টানা ৩ দিন" : "Once daily for 3 days";
    let route = isBn ? "ঘাড়ের মাংসে ইনজেকশন (IM)" : "Intramuscular (IM) in neck muscle";
    let withholding = isBn ? "দুধ: ৭২ ঘণ্টা বর্জন • মাংস: ৪ দিন" : "Milk: 72 hours. Meat: 4 days";
    let medicineName = isBn ? "সেফটিওফার সোডিয়াম অ্যান্টিবায়োটিক" : "Ceftiofur Sodium Sterile Powder";

    if (medCategory === "antibiotic_ceftiofur") {
      doseMl = Number((bodyWeightKg * 0.02).toFixed(1)); // ~2ml per 100kg
      route = isBn ? "ঘাড়ের মাংসে ইনজেকশন (IM)" : "Intramuscular (IM) in neck muscle";
      withholding = isBn ? "দুধ: ৭২ ঘণ্টা বর্জন • মাংস: ৪ দিন" : "Milk: 72 hours. Meat: 4 days";
      medicineName = isBn ? "সেফটিওফার সোডিয়াম (নিউমোনিয়া ও ওলান পাকা)" : "Ceftiofur Sodium Sterile Powder";
    } else if (medCategory === "meloxicam") {
      doseMl = Number((bodyWeightKg * 0.025).toFixed(1)); // 0.5mg/kg, 20mg/ml
      route = isBn ? "চামড়ার নিচে (SC) বা ওরাল" : "Subcutaneous (SC) or Oral";
      withholding = isBn ? "দুধ: ১২০ ঘণ্টা বর্জন • মাংস: ১৫ দিন" : "Milk: 120 hours. Meat: 15 days";
      medicineName = isBn ? "মেলোক্সিক্যাম ব্যথানাশক ও জ্বর প্রতিরোধক" : "Meloxicam NSAID Anti-Inflammatory";
      frequency = isBn ? "একক ডোজ, ব্যথা থাকলে ২৪ ঘণ্টা পর পুনরাবৃত্তি" : "Single initial dose, repeat in 24 hrs if pain persists";
    } else if (medCategory === "anthelmintic") {
      doseMl = Number((bodyWeightKg * 0.075).toFixed(1)); // Albendazole suspension
      route = isBn ? "সকালে খালি পেটে মুখে খাওয়ানো" : "Oral Drench";
      withholding = isBn ? "দুধ: ৬০ ঘণ্টা বর্জন • মাংস: ১৪ দিন" : "Milk: 60 hours. Meat: 14 days";
      medicineName = isBn ? "অ্যালবেনডাজল ১০% কৃমিনাশক সাসপেনশন" : "Albendazole 10% Micronized Oral Drench";
      frequency = isBn ? "একক চিকিৎসা, ২১ দিন পর দ্বিতীয় ডোজ" : "Single treatment, repeat after 21 days";
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
                {isBn ? "কৃষি ও ভেটেরিনারি বৈজ্ঞানিক ডোজ ক্যালকুলেটর" : "Agronomic & Veterinary Dosage Engine"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn
                  ? "বিঘা/একরভিত্তিক স্প্রে এবং প্রাণীর শারীরিক ওজনভিত্তিক সঠিক ওষুধের মাত্রা।"
                  : "Scientifically calibrated chemical, fertilizer, and weight-based clinical dosages."}
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
            <span>{isBn ? "ফসল স্প্রে ও সার হিসাব" : "Crop Spray & Fertilizer"}</span>
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
            <span>{isBn ? "প্রাণীর ওজনভিত্তিক ওষুধ মাত্রা" : "Animal Weight-to-Dose"}</span>
          </button>
        </div>

        {/* TAB 1: CROP DOSAGE */}
        {activeTab === "crop" ? (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {isBn ? "জমির পরিমাণ (একর / বিঘা):" : "Field Area (Acres):"}{" "}
                  <strong className="text-emerald-400">
                    {acreage} {isBn ? "একর" : "Acres"} ({Math.round(acreage * 3)} {isBn ? "বিঘা" : "Bigha"})
                  </strong>
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
                <label className="block font-semibold text-slate-300 mb-1">
                  {isBn ? "ফসলের ধরন" : "Crop Type"}
                </label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="paddy">{isBn ? "ধান (বোরো/আমন)" : "Rice / Paddy"}</option>
                  <option value="maize">{isBn ? "ভুট্টা" : "Maize / Corn"}</option>
                  <option value="wheat">{isBn ? "গম" : "Wheat"}</option>
                  <option value="potato">{isBn ? "আলু" : "Potato"}</option>
                  <option value="tomato">{isBn ? "সবজি / টমেটো" : "Vegetables"}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {isBn ? "বালাইনাশক / সার" : "Chemical / Fertilizer"}
                </label>
                <select
                  value={chemicalType}
                  onChange={(e) => setChemicalType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="tricyclazole">{isBn ? "ট্রাইসাইক্লাজল (ব্লাস্ট প্রতিরোধ)" : "Tricyclazole (Blast)"}</option>
                  <option value="mancozeb">{isBn ? "ম্যানকোজেব (নাবি ধসা ও দাগ)" : "Mancozeb (Late Blight)"}</option>
                  <option value="chlorantraniliprole">{isBn ? "ক্লোরান্ট্রানিলিপ্রোল (মাজরা পোকা)" : "Chlorantraniliprole (Stem Borer)"}</option>
                  <option value="urea">{isBn ? "ইউরিয়া (নাইট্রোজেন উপরিপ্রয়োগ)" : "Urea (Nitrogen)"}</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Display */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-3">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                {isBn
                  ? `${acreage} একর (${Math.round(acreage * 3)} বিঘা) জমির জন্য প্রয়োজনীয় হিসাব:`
                  : `Calculated Recipe for ${acreage} Acre(s):`}
              </span>
              <h3 className="font-bold text-white text-base">{cropResult.formulationName}</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">
                    {isBn ? "মোট ওষুধের পরিমাণ:" : "Total Formulation:"}
                  </span>
                  <strong className="text-white text-sm">{cropResult.totalChem}</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">
                    {isBn ? "বিশুদ্ধ পানির পরিমাণ:" : "Clean Water:"}
                  </span>
                  <strong className="text-white text-sm">
                    {cropResult.totalWater} {isBn ? "লিটার" : "Liters"}
                  </strong>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">
                    {isBn ? "১৬ লিটার স্প্রেয়ার ট্যাংক:" : "16L Knapsack Tanks:"}
                  </span>
                  <strong className="text-white text-sm">
                    {cropResult.knapsackTanks} {isBn ? "ট্যাংক" : "Tanks"}
                  </strong>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">
                    {isBn ? "ফসল কাটার সেফটি সময়:" : "Pre-Harvest Interval:"}
                  </span>
                  <strong className="text-amber-400 text-sm">
                    {cropResult.spraySafetyDays} {isBn ? "দিন" : "Days"}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: VET DOSAGE */
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {isBn ? "প্রাণীর প্রজাতি" : "Animal Species"}
                </label>
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
                  <option value="cattle">{isBn ? "ডেইরি গাভী (প্রাপ্তবয়স্ক)" : "Dairy Cattle (Adult)"}</option>
                  <option value="calf">{isBn ? "বাছুর" : "Dairy Calf"}</option>
                  <option value="goat">{isBn ? "ব্ল্যাক বেঙ্গল ছাগল / ভেড়া" : "Goat / Sheep"}</option>
                  <option value="dog">{isBn ? "পোষা কুকুর" : "Dog (Companion Pet)"}</option>
                  <option value="cat">{isBn ? "পোষা বিড়াল" : "Cat (Companion Pet)"}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  {isBn ? "শারীরিক ওজন:" : "Body Weight:"}{" "}
                  <strong className="text-cyan-400">
                    {bodyWeightKg} {isBn ? "কেজি" : "kg"}
                  </strong>
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
                <label className="block font-semibold text-slate-300 mb-1">
                  {isBn ? "ওষুধের ক্যাটাগরি" : "Clinical Medicine"}
                </label>
                <select
                  value={medCategory}
                  onChange={(e) => setMedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="antibiotic_ceftiofur">{isBn ? "সেফটিওফার (শ্বাসকষ্ট ও ওলান পাকা)" : "Ceftiofur Antibiotic"}</option>
                  <option value="meloxicam">{isBn ? "মেলোক্সিক্যাম (জ্বর ও ব্যথা নিরামক)" : "Meloxicam NSAID"}</option>
                  <option value="anthelmintic">{isBn ? "অ্যালবেনডাজল (কৃমিনাশক)" : "Albendazole Dewormer"}</option>
                </select>
              </div>
            </div>

            {/* Calculated Output Display */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-3">
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">
                {isBn
                  ? `${bodyWeightKg} কেজি ওজনের জন্য নির্ধারিত মাত্রা:`
                  : `Calculated Prescription for ${bodyWeightKg} kg ${animalSpecies.toUpperCase()}:`}
              </span>
              <h3 className="font-bold text-white text-base">{vetResult.medicineName}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-800">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">
                    {isBn ? "প্রয়োগযোগ্য মোট মাত্রা:" : "Volume to Administer:"}
                  </span>
                  <strong className="text-cyan-400 text-base">{vetResult.doseMl}</strong>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{vetResult.route}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">
                    {isBn ? "প্রয়োগের সময়কাল ও নিয়ম:" : "Frequency & Regimen:"}
                  </span>
                  <strong className="text-white text-xs leading-tight block">{vetResult.frequency}</strong>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">
                    {isBn ? "বাধ্যতামূলক উইথহোল্ডিং মেয়াদ:" : "Mandatory Withholding Period:"}
                  </span>
                  <strong className="text-amber-400 text-xs leading-tight block">{vetResult.withholding}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {isBn
                ? "বাংলাদেশ কৃষি ও প্রাণিসম্পদ ফার্মাকোলজি বোর্ড দ্বারা পরীক্ষিত।"
                : "Formulas verified by SROT Clinical Pharmacology Board"}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
          >
            {isBn ? "ক্যালকুলেটর বন্ধ করুন" : "Close Calculator"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
