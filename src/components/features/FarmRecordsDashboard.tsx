"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  MOCK_ANIMALS,
  MOCK_CROPS,
  MOCK_FARM_FINANCES,
  AnimalHealthCard,
  CropCycleRecord,
  VaccinationRecord,
} from "@/data/mockFarmRecords";
import { formatCurrency } from "@/lib/utils";
import {
  Milk,
  Wheat,
  Plus,
  QrCode,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  FileSpreadsheet,
  Stethoscope,
  X,
  Sparkles,
  Droplet,
  ChevronRight,
  BadgeCheck,
  Check,
} from "lucide-react";

type RecordTab = "animals" | "crops" | "vaccines" | "finances";

export function FarmRecordsDashboard() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [activeTab, setActiveTab] = useState<RecordTab>("animals");
  const [animals, setAnimals] = useState<AnimalHealthCard[]>(MOCK_ANIMALS);
  const [crops, setCrops] = useState<CropCycleRecord[]>(MOCK_CROPS);

  // Modals
  const [isAddAnimalOpen, setIsAddAnimalOpen] = useState(false);
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [selectedAnimalForQR, setSelectedAnimalForQR] = useState<AnimalHealthCard | null>(null);

  // Form states for new animal
  const [newAnimalName, setNewAnimalName] = useState("");
  const [newAnimalTag, setNewAnimalTag] = useState("BD-TAG-482");
  const [newAnimalSpecies, setNewAnimalSpecies] = useState<AnimalHealthCard["species"]>("cattle");
  const [newAnimalBreed, setNewAnimalBreed] = useState("Holstein Friesian Cross");
  const [newAnimalWeight, setNewAnimalWeight] = useState("350");
  const [newAnimalYield, setNewAnimalYield] = useState("16");

  // Form states for new crop
  const [newPlotName, setNewPlotName] = useState("");
  const [newCropName, setNewCropName] = useState("Boro Rice");
  const [newCropVariety, setNewCropVariety] = useState("BRRI dhan-29");
  const [newCropAcreage, setNewCropAcreage] = useState("2.0");

  const handleCreateAnimal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnimalName.trim()) return;

    const created: AnimalHealthCard = {
      id: `animal-${Date.now()}`,
      tagNumber: newAnimalTag,
      name: newAnimalName,
      species: newAnimalSpecies,
      speciesLabel: {
        en: newAnimalSpecies === "cattle" ? "Dairy Cattle" : newAnimalSpecies === "goat" ? "Goat" : "Livestock",
        bn: newAnimalSpecies === "cattle" ? "দুগ্ধবতী গাভী" : newAnimalSpecies === "goat" ? "ছাগল" : "গবাদিপশু",
      },
      breed: newAnimalBreed,
      gender: "Female",
      age: "2 Years",
      weightKg: parseFloat(newAnimalWeight) || 300,
      healthStatus: "healthy",
      healthStatusLabel: {
        en: "Healthy & Monitored",
        bn: "সুস্থ ও সক্রিয়",
      },
      avatarUrl:
        newAnimalSpecies === "cattle"
          ? "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=400&q=80"
          : "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=400&q=80",
      dailyYieldLiters: parseFloat(newAnimalYield) || 0,
      vaccinations: [
        {
          id: `v-${Date.now()}`,
          name: {
            en: "Anthrax & FMD Routine Booster",
            bn: "তড়কা ও খুরা রোগ প্রতিরোধক টিকা",
          },
          dueDate: "20 Nov 2026",
          status: "upcoming",
          notes: {
            en: "Mandatory seasonal booster dose",
            bn: "বাধ্যতামূলক মৌসুমী বুস্টার ডোজ",
          },
        },
      ],
    };

    setAnimals([created, ...animals]);
    setNewAnimalName("");
    setIsAddAnimalOpen(false);
  };

  const handleCreateCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlotName.trim()) return;

    const created: CropCycleRecord = {
      id: `crop-${Date.now()}`,
      plotName: {
        en: newPlotName,
        bn: newPlotName,
      },
      cropName: {
        en: newCropName,
        bn: newCropName,
      },
      variety: newCropVariety,
      acreageBigha: parseFloat(newCropAcreage) || 1.5,
      sowingDate: "01 Nov 2025",
      growthStage: {
        en: "Vegetative / Tillering",
        bn: "অঙ্গজ বৃদ্ধি ও কুশি গজানো",
      },
      progressPercentage: 35,
      targetHarvestDate: "20 Apr 2026",
      expectedYieldMounds: 45,
      nextScheduledSpray: {
        chemical: "Balanced NPK Foliar + Bio-fungicide",
        targetDisease: {
          en: "Early Leaf Protection",
          bn: "প্রাথমিক পাতা সুরক্ষা",
        },
        scheduledDate: "15 Nov 2026",
        withholdingDays: 14,
      },
    };

    setCrops([created, ...crops]);
    setNewPlotName("");
    setIsAddCropOpen(false);
  };

  // Mark vaccine completed helper
  const handleCompleteVaccine = (animalId: string, vaccineId: string) => {
    setAnimals(
      animals.map((a) => {
        if (a.id !== animalId) return a;
        return {
          ...a,
          vaccinations: a.vaccinations.map((v) =>
            v.id === vaccineId
              ? {
                  ...v,
                  status: "completed",
                  administeredBy: "Dr. Ananya Sen, D.V.M. (Verified)",
                }
              : v
          ),
        };
      })
    );
  };

  return (
    <div id="records" className="space-y-6">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{isBn ? "ব্লুপ্রিন্ট মডিউল ৬ ও ৭" : "Blueprint Modules 6 & 7"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>{isBn ? "খামার ও পশুর ডিজিটাল স্বাস্থ্য রেকর্ড" : "Farm & Animal Health Records"}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
              LIVE
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn
              ? "গবাদিপশুর ডিজিটাল ইয়ার-ট্যাগ আইডি, ভ্যাকসিন রিমাইন্ডার এবং ফসল আবাদের স্প্রে সাইকেল ট্র্যাকার।"
              : "Verifiable Cattle Ear-Tag IDs, automated vaccination schedules, and crop spray cycle journals."}
          </p>
        </div>

        {/* Global Quick Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAddAnimalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-md shadow-cyan-950/50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isBn ? "+ নতুন পশু যোগ করুন" : "+ Add Animal ID"}</span>
          </button>

          <button
            onClick={() => setIsAddCropOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-950/50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isBn ? "+ নতুন ফসল প্লট যোগ করুন" : "+ Add Crop Plot"}</span>
          </button>
        </div>
      </div>

      {/* Modern Segmented Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto text-xs">
        {[
          { id: "animals", labelEn: "Animal Health Cards & Ear-Tags", labelBn: "পশুর স্বাস্থ্য কার্ড ও ইয়ার-ট্যাগ", icon: Milk, count: animals.length },
          { id: "crops", labelEn: "Crop Growth & Spray Cycles", labelBn: "ফসল চক্র ও স্প্রে ডায়েরি", icon: Wheat, count: crops.length },
          { id: "vaccines", labelEn: "Vaccination Calendar", labelBn: "ভ্যাকসিনেশন শিডিউল", icon: Activity },
          { id: "finances", labelEn: "Farm Yield & Financials", labelBn: "আয়-ব্যয় ও উৎপাদন হিসাব", icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as RecordTab)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition shrink-0 ${
                isSelected
                  ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-sm"
                  : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/60 border border-white/[0.04]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{isBn ? tab.labelBn : tab.labelEn}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isSelected ? "bg-emerald-500 text-slate-950 font-black" : "bg-slate-800 text-slate-300"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: ANIMAL HEALTH CARDS & EAR-TAGS */}
      {/* ========================================================================= */}
      {activeTab === "animals" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0b1320] border border-white/[0.08] hover:border-cyan-500/30 p-5 space-y-4 transition shadow-lg relative group"
            >
              {/* Header: Avatar, Name & Ear-Tag Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={animal.avatarUrl}
                    alt={animal.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-white/[0.1] shadow-md shrink-0"
                  />
                  <div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-bold">
                      <QrCode className="w-3 h-3" />
                      <span>{animal.tagNumber}</span>
                    </div>
                    <h3 className="text-base font-black text-white mt-1">{animal.name}</h3>
                    <p className="text-[11px] text-slate-400">{animal.breed}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAnimalForQR(animal)}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  title="View Digital Ear-Tag QR Pass"
                >
                  <QrCode className="w-4 h-4 text-cyan-400" />
                </button>
              </div>

              {/* Vitals Grid */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/70 border border-white/[0.04] text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    {isBn ? "বয়স" : "Age"}
                  </span>
                  <span className="font-bold text-slate-200 mt-0.5 block truncate">{animal.age}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    {isBn ? "ওজন" : "Weight"}
                  </span>
                  <span className="font-bold text-slate-200 mt-0.5 block">{animal.weightKg} kg</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    {isBn ? "দুধ ফলন" : "Milk/Day"}
                  </span>
                  <span className="font-bold text-emerald-400 mt-0.5 block">
                    {animal.dailyYieldLiters ? `${animal.dailyYieldLiters} L` : "N/A"}
                  </span>
                </div>
              </div>

              {/* Clinical Status */}
              <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {isBn ? "স্বাস্থ্য স্ট্যাটাস" : "Clinical Status"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{isBn ? animal.healthStatusLabel.bn : animal.healthStatusLabel.en}</span>
                  </span>
                </div>

                {animal.recentDiagnosis && (
                  <p className="text-[11px] text-slate-300 line-clamp-1 pt-1 border-t border-white/[0.04]">
                    {isBn ? animal.recentDiagnosis.bn : animal.recentDiagnosis.en}
                  </p>
                )}
              </div>

              {/* Next Vaccine Notice */}
              {animal.vaccinations.length > 0 && (
                <div className="text-[11px] flex items-center justify-between text-slate-400 px-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{isBn ? "পরবর্তী টিকা:" : "Next Vaccine:"}</span>
                  </span>
                  <span className="text-amber-300 font-bold font-mono">
                    {animal.vaccinations[0].dueDate}
                  </span>
                </div>
              )}

              {/* Action: Direct Tele-Vet Booking for this specific animal */}
              <div className="pt-2 border-t border-white/[0.06] flex gap-2">
                <Link
                  href={`/consult?category=veterinary&tag=${animal.tagNumber}`}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>{isBn ? "এই পশুর জন্য ডাক্তার বুক করুন" : "Consult Vet for this Animal"}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CROP GROWTH & SPRAY CYCLES */}
      {/* ========================================================================= */}
      {activeTab === "crops" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {crops.map((crop) => (
            <div
              key={crop.id}
              className="rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0b1320] border border-white/[0.08] hover:border-emerald-500/30 p-6 space-y-4 transition shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Wheat className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">{isBn ? crop.cropName.bn : crop.cropName.en}</h3>
                    <p className="text-xs text-emerald-400 font-semibold">{crop.variety}</p>
                    <span className="text-[11px] text-slate-400">{isBn ? crop.plotName.bn : crop.plotName.en}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-white font-mono">{crop.acreageBigha}</span>
                  <span className="text-xs text-slate-400 block">{isBn ? "বিঘা জমি" : "Bigha Area"}</span>
                </div>
              </div>

              {/* Growth Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{isBn ? "বর্তমান বৃদ্ধি পর্যায়:" : "Growth Stage:"}</span>
                  <span className="text-emerald-300 font-bold">{isBn ? crop.growthStage.bn : crop.growthStage.en}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${crop.progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>{isBn ? `বপন: ${crop.sowingDate}` : `Sown: ${crop.sowingDate}`}</span>
                  <span>{isBn ? `সম্ভাব্য কর্তন: ${crop.targetHarvestDate}` : `Target: ${crop.targetHarvestDate}`}</span>
                </div>
              </div>

              {/* Scheduled Spray Diary */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-white/[0.04] space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isBn ? "পরবর্তী স্প্রে শিডিউল" : "Mandatory Spray Protocol"}</span>
                  </span>
                  <span className="text-cyan-300 font-mono">{crop.nextScheduledSpray.scheduledDate}</span>
                </div>

                <div className="text-[11px] text-slate-200 bg-slate-900/80 p-2 rounded-xl">
                  <strong className="text-white block">{crop.nextScheduledSpray.chemical}</strong>
                  <span className="text-slate-400">
                    {isBn ? "লক্ষ্য:" : "Target:"} {isBn ? crop.nextScheduledSpray.targetDisease.bn : crop.nextScheduledSpray.targetDisease.en}
                  </span>
                  <span className="block text-[10px] text-amber-400 font-semibold mt-0.5">
                    {isBn
                      ? `⚠️ উইথহোল্ডিং পিরিয়ড: ${crop.nextScheduledSpray.withholdingDays} দিন (ফসল তোলার আগে স্প্রে বন্ধ রাখুন)`
                      : `⚠️ Withholding: ${crop.nextScheduledSpray.withholdingDays} days pre-harvest restriction`}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {isBn ? "প্রত্যাশিত ফলন:" : "Yield Forecast:"}{" "}
                  <strong className="text-white">{crop.expectedYieldMounds} {isBn ? "মণ" : "Mounds"}</strong>
                </span>

                <Link
                  href={`/consult?category=agri&crop=${encodeURIComponent(crop.cropName.en)}`}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition flex items-center gap-1"
                >
                  <span>{isBn ? "কৃষিবিদ পরামর্শ নিন" : "Consult Agronomist"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: VACCINATION CALENDAR & ALERTS */}
      {/* ========================================================================= */}
      {activeTab === "vaccines" && (
        <div className="rounded-3xl bg-slate-900/60 border border-white/[0.08] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                <span>{isBn ? "গবাদিপশুর ডিজিটাল টিকাদান ক্যালেন্ডার" : "Herd Vaccination Master Calendar"}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {isBn
                  ? "উপজেলা ভিত্তিক প্রাণিসম্পদ অধিদপ্তরের (DLS) মানসম্মত ভ্যাকসিনের সময়সূচী ও স্বয়ংক্রিয় SMS ট্র্যাকিং।"
                  : "National DLS-aligned inoculation roster with automated SMS alerts."}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{isBn ? "পরবর্তী ৩০ দিনে ২টি বুস্টার টিকা নির্ধারিত" : "2 Booster Doses Due in 30 Days"}</span>
            </div>
          </div>

          <div className="divide-y divide-white/[0.06] text-xs">
            {animals.flatMap((animal) =>
              animal.vaccinations.map((vac) => {
                const isUpcoming = vac.status === "upcoming";
                const isCompleted = vac.status === "completed";

                return (
                  <div key={vac.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                          isCompleted
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {isCompleted ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-bold text-white">
                            {isBn ? vac.name.bn : vac.name.en}
                          </strong>
                          <span className="text-[10px] px-2 py-0.2 rounded font-mono font-bold bg-slate-800 text-cyan-300">
                            {animal.tagNumber} ({animal.name})
                          </span>
                        </div>
                        <p className="text-slate-400 mt-0.5">{isBn ? vac.notes.bn : vac.notes.en}</p>
                        {vac.administeredBy && (
                          <span className="text-[11px] text-emerald-400 block mt-1 font-semibold">
                            ✓ {isBn ? "প্রদানকারী:" : "Administered by:"} {vac.administeredBy}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-white block">{vac.dueDate}</span>
                        <span
                          className={`text-[10px] uppercase font-bold ${
                            isCompleted ? "text-emerald-400" : "text-amber-400"
                          }`}
                        >
                          {vac.status}
                        </span>
                      </div>

                      {isUpcoming && (
                        <button
                          onClick={() => handleCompleteVaccine(animal.id, vac.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                        >
                          {isBn ? "সম্পন্ন চিহ্নিত করুন" : "Mark Administered"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: FARM FINANCIALS & YIELD ANALYTICS */}
      {/* ========================================================================= */}
      {activeTab === "finances" && (
        <div className="space-y-6">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/[0.08] space-y-1">
              <span className="text-xs text-slate-400 font-medium">{isBn ? "মোট জমি" : "Total Farm Acreage"}</span>
              <div className="text-2xl font-black text-white font-mono">
                {MOCK_FARM_FINANCES.totalAcreageBigha} <span className="text-sm font-normal text-slate-400">{isBn ? "বিঘা" : "Bigha"}</span>
              </div>
              <span className="text-[11px] text-emerald-400">২টি সক্রিয় প্লট / 2 Active plots</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/[0.08] space-y-1">
              <span className="text-xs text-slate-400 font-medium">{isBn ? "মোট গবাদিপশু" : "Livestock Headcount"}</span>
              <div className="text-2xl font-black text-white font-mono">
                {animals.length} <span className="text-sm font-normal text-slate-400">{isBn ? "টি" : "Heads"}</span>
              </div>
              <span className="text-[11px] text-cyan-400">১০০% ট্যাগ করা / 100% Ear-Tagged</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/[0.08] space-y-1">
              <span className="text-xs text-slate-400 font-medium">{isBn ? "মাসিক ইনপুট ব্যয়" : "Monthly Agro-Inputs"}</span>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {formatCurrency(MOCK_FARM_FINANCES.monthlyInputExpense)}
              </div>
              <span className="text-[11px] text-slate-400">ফিড, সার ও ওষুধ / Feed, fertilizer</span>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-1">
              <span className="text-xs text-emerald-400 font-bold">{isBn ? "নিট মাসিক মুনাফা" : "Net Farm Margin"}</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                +{formatCurrency(MOCK_FARM_FINANCES.netMargin)}
              </div>
              <span className="text-[11px] text-emerald-300 font-bold">+৪৫.৬% মার্জিন / 45.6% ROI</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] text-xs text-slate-300 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "উৎপাদন ও ফলন পর্যবেক্ষণ রিপোর্ট" : "Production & Harvest Intelligence Report"}</span>
            </h4>
            <p className="leading-relaxed">
              {isBn
                ? "বগুড়া ও রাজশাহী ক্লাস্টারে আপনার ডেইরি গাভীর গড় দুধ উৎপাদন জাতীয় গড়ের চেয়ে ২৪% বেশি (১৯.৫ লিটার/দিন)। বোরো ধানের বর্তমান কুশি গজানো পর্যায়ে প্রতি বিঘায় ২১ মণ সম্ভাব্য ফলন প্রক্ষেপণ করা হয়েছে।"
                : "Your dairy yield index (19.5L/day) outperforms the national sub-district benchmark by 24%. Boro paddy tillering phase indicates an estimated yield of 21 mounds per bigha with zero active pest infestations."}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: ADD NEW ANIMAL PROFILE */}
      {/* ========================================================================= */}
      {isAddAnimalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-cyan-500/30 p-6 text-slate-200 shadow-2xl">
            <button
              onClick={() => setIsAddAnimalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <Milk className="w-5 h-5 text-cyan-400" />
              <span>{isBn ? "নতুন পশু নিবন্ধন ও ডিজিটাল ট্যাগ" : "Register New Animal & Tag ID"}</span>
            </h3>

            <form onSubmit={handleCreateAnimal} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {isBn ? "পশুর নাম / ডাকনাম" : "Animal Name / Call Name"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? "যেমন: রূপালী / লালটু" : "e.g. Rupali / Daisy"}
                  value={newAnimalName}
                  onChange={(e) => setNewAnimalName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? "ইয়ার-ট্যাগ নম্বর" : "Ear-Tag ID"}
                  </label>
                  <input
                    type="text"
                    required
                    value={newAnimalTag}
                    onChange={(e) => setNewAnimalTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-cyan-300 font-mono font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? "প্রজাতি" : "Species"}
                  </label>
                  <select
                    value={newAnimalSpecies}
                    onChange={(e) => setNewAnimalSpecies(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none"
                  >
                    <option value="cattle">{isBn ? "গরু / গাভী" : "Dairy Cattle"}</option>
                    <option value="goat">{isBn ? "ছাগল" : "Goat"}</option>
                    <option value="sheep">{isBn ? "ভেড়া" : "Sheep"}</option>
                    <option value="poultry">{isBn ? "পোল্ট্রি" : "Poultry"}</option>
                    <option value="pet">{isBn ? "পোষা প্রাণী" : "Companion Pet"}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? "জাত / ব্রিড" : "Breed"}
                  </label>
                  <input
                    type="text"
                    value={newAnimalBreed}
                    onChange={(e) => setNewAnimalBreed(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? "ওজন (কেজি)" : "Weight (kg)"}
                  </label>
                  <input
                    type="number"
                    value={newAnimalWeight}
                    onChange={(e) => setNewAnimalWeight(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {isBn ? "দৈনিক দুধ ফলন (লিটার, যদি প্রযোজ্য হয়)" : "Daily Milk Yield (Liters, if applicable)"}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={newAnimalYield}
                  onChange={(e) => setNewAnimalYield(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-emerald-400 font-mono font-bold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition mt-2 shadow-lg"
              >
                {isBn ? "ডিজিটাল স্বাস্থ্য কার্ড তৈরি করুন" : "Generate Digital Health Card"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD NEW CROP CYCLE */}
      {/* ========================================================================= */}
      {isAddCropOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-emerald-500/30 p-6 text-slate-200 shadow-2xl">
            <button
              onClick={() => setIsAddCropOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <Wheat className="w-5 h-5 text-emerald-400" />
              <span>{isBn ? "নতুন ফসল ও প্লট ট্র্যাকিং" : "Register Crop Plot & Cycle"}</span>
            </h3>

            <form onSubmit={handleCreateCrop} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {isBn ? "প্লট বা জমির নাম" : "Plot / Field Name"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isBn ? "যেমন: পশ্চিম মাঠ প্লট ৩" : "e.g. West Boro Plot 3"}
                  value={newPlotName}
                  onChange={(e) => setNewPlotName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? "ফসলের নাম" : "Crop Name"}
                  </label>
                  <select
                    value={newCropName}
                    onChange={(e) => setNewCropName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none"
                  >
                    <option value="Boro Rice">{isBn ? "বোরো ধান" : "Boro Rice"}</option>
                    <option value="Aman Rice">{isBn ? "আমন ধান" : "Aman Rice"}</option>
                    <option value="Maize">{isBn ? "ভুট্টা" : "Maize"}</option>
                    <option value="Mustard">{isBn ? "সরিষা" : "Mustard"}</option>
                    <option value="Potato">{isBn ? "আলু" : "Potato"}</option>
                    <option value="Vegetables">{isBn ? "শাকসবজি" : "Winter Vegetables"}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? "জাত / ভ্যারাইটি" : "Variety"}
                  </label>
                  <input
                    type="text"
                    value={newCropVariety}
                    onChange={(e) => setNewCropVariety(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {isBn ? "জমির পরিমাণ (বিঘা)" : "Acreage (Bigha)"}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={newCropAcreage}
                  onChange={(e) => setNewCropAcreage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-emerald-400 font-mono font-bold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition mt-2 shadow-lg"
              >
                {isBn ? "ফসল চক্র ট্র্যাকিং শুরু করুন" : "Start Tracking Crop Cycle"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: DIGITAL EAR-TAG QR PASS VIEW */}
      {/* ========================================================================= */}
      {selectedAnimalForQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#09101b] to-[#04080e] border border-cyan-500/40 p-6 text-center text-slate-200 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedAnimalForQR(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
              <span>OFFICIAL EAR-TAG PASS</span>
            </div>

            {/* Simulated QR Visual */}
            <div className="w-44 h-44 mx-auto p-3 rounded-2xl bg-white flex items-center justify-center shadow-xl">
              <div className="w-full h-full border-4 border-slate-900 p-2 flex flex-col items-center justify-between">
                <div className="w-full flex justify-between">
                  <div className="w-7 h-7 bg-slate-900" />
                  <div className="w-7 h-7 bg-slate-900" />
                </div>
                <div className="text-[11px] font-black text-slate-900 font-mono">
                  {selectedAnimalForQR.tagNumber}
                </div>
                <div className="w-full flex justify-between">
                  <div className="w-7 h-7 bg-slate-900" />
                  <div className="w-4 h-4 bg-slate-900" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-black text-white">{selectedAnimalForQR.name}</h4>
              <p className="text-xs text-slate-400">{selectedAnimalForQR.breed}</p>
              <p className="text-xs text-emerald-400 font-semibold mt-1">
                {isBn ? "বাংলাদেশ ভেটেরিনারি কাউন্সিল কমপ্লায়েন্স" : "BVC Digital Compliance Verified"}
              </p>
            </div>

            <div className="pt-2 border-t border-white/[0.08] flex gap-2">
              <button
                onClick={() => setSelectedAnimalForQR(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition"
              >
                {isBn ? "বন্ধ করুন" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
