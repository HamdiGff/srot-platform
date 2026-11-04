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
  HeartHandshake,
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
  Droplet,
  Download,
  ArrowRight,
  Scale,
  Syringe,
  Printer,
  QrCode,
  Receipt,
} from "lucide-react";

interface VaccineLog {
  id: string;
  petName: string;
  vaccineName: string;
  administeredDate: string;
  nextDueDate: string;
  status: "Up-to-date" | "Due Soon" | "Overdue";
  batchNumber: string;
}

export function PetParentPanel() {
  const { currentUser, updateProfile, addEntity, updateEntity, deleteEntity } = useUserStore();
  const { getByUserRole } = useConsultationStore();
  const { getQuestionsByAuthor, deleteQuestion } = useCommunityStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const consultations = getByUserRole("pet_owner", currentUser.id);
  const myQuestions = getQuestionsByAuthor(currentUser.name);

  // Active Workspace Tab
  const [activeTab, setActiveTab] = useState<"passports" | "vaccines" | "dosage" | "prescriptions" | "community" | "invoices">("passports");
  const [activeChatModalCase, setActiveChatModalCase] = useState<any | null>(null);

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);

  // New Pet Modal State
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);
  const [petName, setPetName] = useState("");
  const [petSpecies, setPetSpecies] = useState<"Dog" | "Cat" | "Rabbit" | "Bird">("Dog");
  const [petBreed, setPetBreed] = useState("Golden Retriever");
  const [petAge, setPetAge] = useState("2.5 Years");
  const [petWeight, setPetWeight] = useState("28.5 kg");
  const [microchipId, setMicrochipId] = useState("985141002348911");

  // Editing Entity State
  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [editEntityDetails, setEditEntityDetails] = useState("");

  // Weight-Titrated Dosage Calculator State
  const [dosePetSpecies, setDosePetSpecies] = useState<"dog" | "cat">("dog");
  const [doseWeightKg, setDoseWeightKg] = useState<number>(10);
  const [doseMedicineType, setDoseMedicineType] = useState<"dewormer" | "flea_pipette" | "pain_relief">("dewormer");

  // Vaccine Tracker Records
  const [vaccines, setVaccines] = useState<VaccineLog[]>([
    {
      id: "vac-1",
      petName: "Max (Golden Retriever)",
      vaccineName: "Rabies Anti-Viral Booster (Rabisin)",
      administeredDate: "2025-11-20",
      nextDueDate: "2026-11-20",
      status: "Due Soon",
      batchNumber: "RAB-BD-2025-881",
    },
    {
      id: "vac-2",
      petName: "Max (Golden Retriever)",
      vaccineName: "DHPPi Core 5-in-1 (Nobivac)",
      administeredDate: "2026-04-12",
      nextDueDate: "2027-04-12",
      status: "Up-to-date",
      batchNumber: "NOB-DH-9014",
    },
    {
      id: "vac-3",
      petName: "Cleo (British Shorthair)",
      vaccineName: "FVRCP Feline Triple Core (Nobivac Tricat)",
      administeredDate: "2026-02-15",
      nextDueDate: "2027-02-15",
      status: "Up-to-date",
      batchNumber: "FEL-TRI-4401",
    },
  ]);

  const [isAddVaccineOpen, setIsAddVaccineOpen] = useState(false);
  const [vacPet, setVacPet] = useState("Max (Golden Retriever)");
  const [vacName, setVacName] = useState("Rabies Booster");
  const [vacDate, setVacDate] = useState("2026-11-04");
  const [vacNextDate, setVacNextDate] = useState("2027-11-04");

  // Calculate pet dosage safely
  const calculatePetDose = () => {
    if (doseMedicineType === "dewormer") {
      // Albendazole / Pyrantel: 1 tablet per 10kg, or 0.5ml suspension per kg
      const tablets = (doseWeightKg / 10).toFixed(1);
      const liquidMl = (doseWeightKg * 0.5).toFixed(1);
      return {
        formula: `${tablets} Tablet (10kg/tab) OR ${liquidMl} ml Oral Suspension`,
        instructions: "Administer on empty stomach in the morning. Repeat after 14 days if tapeworms present.",
      };
    } else if (doseMedicineType === "flea_pipette") {
      let pipetteSize = "Small (<4 kg)";
      if (doseWeightKg > 4 && doseWeightKg <= 10) pipetteSize = "Medium (4-10 kg) 0.67 ml Pipette";
      else if (doseWeightKg > 10 && doseWeightKg <= 20) pipetteSize = "Large (10-20 kg) 1.34 ml Pipette";
      else if (doseWeightKg > 20) pipetteSize = "Extra Large (>20 kg) 2.68 ml Pipette";
      return {
        formula: `Spot-on Pipette: ${pipetteSize}`,
        instructions: "Part coat between shoulder blades at base of neck; part fur until skin visible and apply full tube.",
      };
    } else {
      // Meloxicam Pet Liquid (0.1 mg/kg)
      const drops = Math.round(doseWeightKg * 2);
      return {
        formula: `Meloxicam 1.5mg/ml: ${drops} Drops once daily with food`,
        instructions: "Always administer with or directly after meals. Never administer on empty stomach.",
      };
    }
  };

  const calculatedDose = calculatePetDose();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, location });
    setIsProfileModalOpen(false);
  };

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim()) return;
    addEntity({
      name: `${petName.trim()} (${petBreed})`,
      type: "pet",
      details: `${petSpecies} • ${petBreed} • ${petAge} • ${petWeight} • Microchip: ${microchipId}`,
      icon: "HeartHandshake",
    });
    setPetName("");
    setIsAddPetModalOpen(false);
  };

  const handleAddVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    setVaccines([
      {
        id: `vac-${Date.now()}`,
        petName: vacPet,
        vaccineName: vacName,
        administeredDate: vacDate,
        nextDueDate: vacNextDate,
        status: "Up-to-date",
        batchNumber: `VAC-BD-${Math.floor(1000 + Math.random() * 9000)}`,
      },
      ...vaccines,
    ]);
    setIsAddVaccineOpen(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. COMPANION PET PARENT OVERVIEW STRIP */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-pink-500/25 bg-gradient-to-r from-pink-950/40 via-slate-900 to-[#0e0409] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-pink-500/70 shadow-lg shrink-0"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-pink-400 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30 flex items-center gap-1">
                <HeartHandshake className="w-3 h-3" />
                <span>{currentUser.roleLabel}</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">ID: {currentUser.id}</span>
              <span className="px-2 py-0.5 rounded-md bg-pink-950/80 text-pink-300 font-mono text-[10px] border border-pink-500/30">
                Small Animal Care Pass Active
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                <span>{currentUser.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-pink-400" />
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
            <Edit2 className="w-3.5 h-3.5 text-pink-400" />
            <span>{isBn ? "প্রোফাইল সম্পাদন" : "Edit Pet Parent Profile"}</span>
          </button>

          <Link
            href="/consult?category=pet"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-400 hover:to-rose-300 text-slate-950 text-xs font-black transition shadow-lg shadow-pink-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>{isBn ? "পেট সার্জন কনসাল্ট (৳৩০০)" : "Consult Pet Doctor (৳300)"}</span>
          </Link>
        </div>
      </div>

      {/* 2. THE MODERN WORKSPACE NAVIGATION TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-white/[0.08] text-xs">
        {[
          { id: "passports", label: isBn ? "ডিজিটাল পেট পাসপোর্ট" : "Digital Pet Passports", icon: HeartHandshake, count: currentUser.registeredEntities?.length || 0 },
          { id: "vaccines", label: isBn ? "ভ্যাকসিন ও কৃমিনাশক টাইমলাইন" : "Vaccine Tracker", icon: Syringe, count: vaccines.length },
          { id: "dosage", label: isBn ? "ওজনভিত্তিক ওষুধ ক্যালকুলেটর" : "Weight Dose Calculator", icon: Scale },
          { id: "prescriptions", label: isBn ? "প্রেসক্রিপশন ও চেম্বার হিস্ট্রি" : "Prescriptions & Rx", icon: FileText, count: consultations.length },
          { id: "invoices", label: isBn ? "ইনভয়েস ও অর্ডার ইতিহাস" : "Invoices & Receipts", icon: Receipt },
          { id: "community", label: isBn ? "আমার পোস্ট ও প্রশ্ন" : "My Pet Inquiries", icon: MessageSquare, count: myQuestions.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 border border-pink-500/50 text-pink-300 shadow-md font-black ring-1 ring-pink-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-pink-400" : ""}`} />
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
      {/* TAB 1: DIGITAL PET PASSPORTS & IDENTIFICATION CARDS */}
      {/* ========================================================================= */}
      {activeTab === "passports" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                {isBn ? "নিবন্ধিত পোষা প্রাণীর ডিজিটাল হেলথ পাসপোর্ট" : "Registered Companion Pets & Digital Passports"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn ? "মাইক্রোচিপ আইডি, ওজন, ব্লাড গ্রুপ ও সার্বিক টিকাদান হিস্ট্রি এক ক্লিকে প্রিন্ট করুন।" : "Manage animal microchip cards, allergy flags, and certified vaccination passports."}
              </p>
            </div>

            <button
              onClick={() => setIsAddPetModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-300 border border-pink-500/30 text-xs font-bold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isBn ? "নতুন পেট যোগ করুন" : "Register Pet Passport"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(currentUser.registeredEntities || []).map((pet) => {
              const isEditing = editingEntityId === pet.id;
              return (
                <div
                  key={pet.id}
                  className="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] hover:border-pink-500/40 transition flex flex-col justify-between gap-4 shadow-xl group relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:scale-105 transition-transform">
                          <HeartHandshake className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-black text-white">{pet.name}</h3>
                          <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-pink-400" />
                            <span>BVC Pet Passport #BD-PET-2026</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            if (isEditing) {
                              updateEntity(pet.id, { details: editEntityDetails });
                              setEditingEntityId(null);
                            } else {
                              setEditingEntityId(pet.id);
                              setEditEntityDetails(pet.details);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-pink-400 transition"
                          title={isEditing ? "Save Pet" : "Edit Pet"}
                        >
                          {isEditing ? <Save className="w-3.5 h-3.5 text-pink-400" /> : <Edit2 className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(isBn ? "পোষা প্রাণীর রেকর্ডটি মুছে ফেলতে চান?" : "Delete this pet passport?")) {
                              deleteEntity(pet.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 transition"
                          title="Delete Pet"
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
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-pink-500/40 text-white text-xs focus:outline-none"
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-slate-300 mt-3 font-mono leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-white/[0.04]">
                        {pet.details}
                      </p>
                    )}
                  </div>

                  {/* Microchip & Telemetry Strip */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-t border-white/[0.06] text-center text-[10px] font-mono">
                    <div className="p-1.5 rounded-lg bg-slate-900/40 border border-white/[0.04]">
                      <span className="text-slate-400 block">Vaccine Due</span>
                      <span className="text-amber-400 font-bold">14 Days (Rabies)</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/40 border border-white/[0.04]">
                      <span className="text-slate-400 block">Dewormed</span>
                      <span className="text-emerald-400 font-bold">Valid (35d ago)</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/40 border border-white/[0.04]">
                      <span className="text-slate-400 block">Diet Plan</span>
                      <span className="text-pink-400 font-bold">High Protein</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      onClick={() => alert(isBn ? "পেট পাসপোর্ট প্রিন্ট ফাইল তৈরি হয়েছে।" : "Pet ID Card PDF ready to print!")}
                      className="text-slate-300 hover:text-white font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08]"
                    >
                      <Printer className="w-3.5 h-3.5 text-pink-400" />
                      <span>{isBn ? "কার্ড প্রিন্ট" : "Print ID Card"}</span>
                    </button>

                    <Link
                      href={`/consult?category=pet&query=${encodeURIComponent(pet.name)}`}
                      className="px-3.5 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500 text-pink-300 hover:text-slate-950 font-bold text-xs transition border border-pink-500/30 flex items-center gap-1"
                    >
                      <span>{isBn ? "লাইভ ডাক্তার কল" : "Video Tele-Vet"}</span>
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
      {/* TAB 2: VACCINE & DEWORMING HEALTH TIMELINE */}
      {/* ========================================================================= */}
      {activeTab === "vaccines" && (
        <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] bg-slate-950/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <Syringe className="w-5 h-5 text-pink-400" />
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isBn ? "টিকা প্রদান ও কৃমিনাশক ডিজিটাল হিস্ট্রি ট্র্যাকার" : "Vaccination & Anti-Parasitic Booster Timeline"}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isBn ? "জলাতঙ্ক (Rabies), ডগ পারভো ও বিড়ালের ট্রিপল ভ্যাকসিনের মেয়াদ ও অ্যালার্ট পর্যবেক্ষণ করুন।" : "Tracks rabies immunity certificates and automated due-date SMS notifications."}
              </p>
            </div>

            <button
              onClick={() => setIsAddVaccineOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-300 border border-pink-500/30 text-xs font-bold transition shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isBn ? "নতুন টিকা রেকর্ড" : "Log New Vaccination"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vaccines.map((v) => {
              const isDueSoon = v.status === "Due Soon";
              return (
                <div
                  key={v.id}
                  className={`p-4 rounded-2xl border transition space-y-3 ${
                    isDueSoon
                      ? "bg-amber-950/20 border-amber-500/40 shadow-lg shadow-amber-950/30"
                      : "bg-slate-900 border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono text-slate-400 block">{v.batchNumber}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono ${
                        isDueSoon
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-white">{v.petName}</h3>
                    <p className="text-xs text-pink-300 font-medium mt-0.5">{v.vaccineName}</p>
                  </div>

                  <div className="pt-2 border-t border-white/[0.06] text-xs font-mono space-y-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Given:</span>
                      <span className="text-white font-bold">{v.administeredDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Next Booster Due:</span>
                      <span className={isDueSoon ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
                        {v.nextDueDate}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: WEIGHT-TITRATED MEDICATION & FLEA DOSE CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === "dosage" && (
        <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] bg-slate-950/80 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isBn ? "ওজন অনুসারে সঠিক ওষুধের মাত্রা নির্দেশিকা" : "Weight-Titrated Medication & Anti-Parasitic Calculator"}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isBn ? "কুকুর বা বিড়ালের ওজন (কেজি) অনুসারে কৃমিনাশক ও উকুন ড্রপের নির্ভুল মাত্রা গণনা করুন।" : "Calibrated from WSAVA veterinary small-animal pharmacopoeia guidelines."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">প্রাণীর প্রজাতি (Species):</label>
              <div className="grid grid-cols-2 gap-2">
                {(["dog", "cat"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setDosePetSpecies(s)}
                    className={`py-2 rounded-xl font-bold uppercase transition ${
                      dosePetSpecies === s
                        ? "bg-pink-600 text-white font-black shadow-md"
                        : "bg-slate-900 text-slate-400"
                    }`}
                  >
                    {s === "dog" ? "Dog (কুকুর)" : "Cat (বিড়াল)"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">শরীরের ওজন (Weight in kg):</label>
              <input
                type="number"
                min={0.5}
                step={0.5}
                value={doseWeightKg}
                onChange={(e) => setDoseWeightKg(Math.max(0.5, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white font-mono font-bold text-sm focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">ওষুধের ক্যাটাগরি (Medication):</label>
              <select
                value={doseMedicineType}
                onChange={(e) => setDoseMedicineType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
              >
                <option value="dewormer">ব্রড-স্পেকট্রাম কৃমিনাশক (Dewormer)</option>
                <option value="flea_pipette">টিক ও মাছি স্পট-অন ড্রপস (Flea Pipette)</option>
                <option value="pain_relief">ব্যথানাশক ড্রপস (Meloxicam NSAID)</option>
              </select>
            </div>
          </div>

          {/* Results Display Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-950/30 via-slate-900 to-rose-950/30 border border-pink-500/30 space-y-2">
            <span className="text-[10px] uppercase font-mono text-pink-400 font-bold">CALIBRATED CLINICAL DOSE:</span>
            <h3 className="text-base sm:text-lg font-black text-white">{calculatedDose.formula}</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              ℹ️ {calculatedDose.instructions}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PRESCRIPTIONS & RX HISTORY */}
      {/* ========================================================================= */}
      {activeTab === "prescriptions" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                {isBn ? "সার্টিফাইড পেডিয়াট্রিক ও পেট প্রেসক্রিপশন" : "BVC Registered Pet Prescriptions"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn ? "স্মল-অ্যানিমেল ভেটেরিনারি সার্জনদের স্বাক্ষরিত প্রেসক্রিপশন ও ফলো-আপ শিডিউল।" : "Digital prescriptions carry verified council credentials and drug safety instructions."}
              </p>
            </div>

            <span className="text-xs font-mono text-pink-400 font-bold px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30">
              {consultations.length} Consultations
            </span>
          </div>

          {consultations.length > 0 ? (
            <div className="space-y-3">
              {consultations.map((c) => (
                <div
                  key={c.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg hover:border-pink-500/40 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-pink-500/15 text-pink-300 font-mono text-[10px] font-bold border border-pink-500/30">
                        {c.caseNumber}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-400">{formatDate(c.createdAt)}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-200 font-semibold">{c.serviceName}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white">
                      Attending Clinician: {c.expert.name} ({c.expert.title})
                    </h3>

                    {c.prescription && (
                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.06] text-xs space-y-1 mt-2">
                        <div className="flex items-center gap-1.5 text-pink-300 font-bold">
                          <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                          <span>Diagnosis: {c.prescription.diagnosisTitle}</span>
                        </div>
                        <div className="text-slate-300 text-[11px]">
                          <span>Active Medication: <strong>{c.prescription.medicationsOrSprays[0]?.item}</strong></span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                    <button
                      onClick={() => setActiveChatModalCase(c)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-pink-300 border border-pink-500/30 text-xs font-bold transition shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-pink-400" />
                      <span>{isBn ? "চ্যাট হিস্ট্রি" : "Chat History"}</span>
                    </button>

                    <button
                      onClick={() => generatePrescriptionPdf(c)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-pink-400" />
                      <span>{isBn ? "পিডিএফ ডাউনলোড" : "Download PDF"}</span>
                    </button>

                    <Link
                      href={`/consult/${c.id}`}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-slate-950 font-black text-xs transition shadow-md shadow-pink-500/20"
                    >
                      {isBn ? "লাইভ চেম্বার →" : "Live Chamber →"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-slate-950/40 border border-white/[0.04] text-slate-400 text-xs">
              {isBn ? "এখনও কোনো প্রেসক্রিপশন নেই।" : "No companion pet consultations booked yet."}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: MY COMMUNITY PET QUESTIONS */}
      {/* ========================================================================= */}
      {activeTab === "community" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                {isBn ? "কমিউনিটিতে আমার পোষা প্রাণীর প্রশ্নসমূহ" : "My Companion Pet Community Inquiries"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn ? "আপনার পোস্ট করা প্রশ্নের চিকিৎসকদের উত্তর গ্রহণ করুন।" : "Manage your posted questions and mark accepted expert replies."}
              </p>
            </div>

            <Link
              href="/community"
              className="px-3.5 py-1.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-300 border border-pink-500/30 text-xs font-bold transition flex items-center gap-1.5"
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
                      <span className="px-2 py-0.5 rounded-md bg-pink-500/15 text-pink-400 font-mono text-[10px] font-bold">
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
              {isBn ? "আপনি এখনও কোনো প্রশ্ন করেননি।" : "No questions posted yet."}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: INVOICES, ORDER HISTORY & CASH MEMOS */}
      {/* ========================================================================= */}
      {activeTab === "invoices" && (
        <CustomerInvoicesTab role="pet_owner" roleLabel="Companion Pet Parent" />
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT PROFILE MODAL */}
      {/* ========================================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-pink-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-pink-400" />
              <span>{isBn ? "পেট অভিভাবক প্রোফাইল সম্পাদন" : "Edit Pet Parent Profile"}</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Emergency Mobile Contact</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Residence Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold transition shadow-md"
                >
                  Save Pet Parent Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD PET PASSPORT MODAL */}
      {/* ========================================================================= */}
      {isAddPetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-pink-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsAddPetModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-pink-400" />
              <span>{isBn ? "নতুন পেট হেলথ পাসপোর্ট নিবন্ধন" : "Register Pet Health Passport"}</span>
            </h3>

            <form onSubmit={handleAddPet} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Pet Name</label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="e.g. Max / Cleo / Bruno"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Species</label>
                  <select
                    value={petSpecies}
                    onChange={(e) => setPetSpecies(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="Dog">Dog (কুকুর)</option>
                    <option value="Cat">Cat (বিড়াল)</option>
                    <option value="Rabbit">Rabbit (খরগোশ)</option>
                    <option value="Bird">Bird (পাখি)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Breed</label>
                  <input
                    type="text"
                    value={petBreed}
                    onChange={(e) => setPetBreed(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Age</label>
                  <input
                    type="text"
                    value={petAge}
                    onChange={(e) => setPetAge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Weight</label>
                  <input
                    type="text"
                    value={petWeight}
                    onChange={(e) => setPetWeight(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Microchip ID (Optional)</label>
                <input
                  type="text"
                  value={microchipId}
                  onChange={(e) => setMicrochipId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white font-mono focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold transition shadow-md"
                >
                  Create Pet Passport
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: LOG NEW VACCINATION MODAL */}
      {/* ========================================================================= */}
      {isAddVaccineOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-pink-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsAddVaccineOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-2 flex items-center gap-2">
              <Syringe className="w-4 h-4 text-pink-400" />
              <span>{isBn ? "নতুন টিকা রেকর্ড যোগ করুন" : "Log New Vaccination Record"}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Keep your digital pet vaccination passport updated with batch and booster dates.
            </p>

            <form onSubmit={handleAddVaccine} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Select Pet</label>
                <select
                  value={vacPet}
                  onChange={(e) => setVacPet(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                >
                  {(currentUser.registeredEntities || []).map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Max (Golden Retriever)">Max (Golden Retriever)</option>
                  <option value="Cleo (British Shorthair)">Cleo (British Shorthair)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Vaccine Name</label>
                <select
                  value={vacName}
                  onChange={(e) => setVacName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="Rabies Anti-Viral Booster (Rabisin)">Rabies Anti-Viral Booster (Rabisin)</option>
                  <option value="DHPPi Core 5-in-1 (Nobivac)">DHPPi Canine Core 5-in-1 (Nobivac)</option>
                  <option value="FVRCP Feline Triple Core (Nobivac Tricat)">FVRCP Feline Triple Core (Nobivac Tricat)</option>
                  <option value="Bordetella Kennel Cough">Bordetella Kennel Cough</option>
                  <option value="Broad-Spectrum Deworming Dose">Broad-Spectrum Deworming Dose</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Administered Date</label>
                  <input
                    type="date"
                    value={vacDate}
                    onChange={(e) => setVacDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Next Due Date</label>
                  <input
                    type="date"
                    value={vacNextDate}
                    onChange={(e) => setVacNextDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold transition shadow-md"
                >
                  Save Vaccination Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Chat History Modal */}
      <CustomerChatHistoryModal
        consultation={activeChatModalCase}
        isOpen={!!activeChatModalCase}
        onClose={() => setActiveChatModalCase(null)}
      />
    </div>
  );
}
