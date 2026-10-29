"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  ShieldCheck,
  Wheat,
  MapPin,
  Phone,
  Edit2,
  Save,
  CheckCircle2,
  Sparkles,
  Wallet,
  Clock,
  FileText,
  MessageSquare,
  Award,
  X,
  Camera,
  Activity,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export function AgronomistPanel() {
  const { currentUser, updateProfile } = useUserStore();
  const { consultations, attachPrescription, sendMessage } = useConsultationStore();
  const { getQuestionsBySector, addAnswer } = useCommunityStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const cropCases = consultations.filter((c) => c.category === "agri");
  const cropCommunityQuestions = getQuestionsBySector("crops");

  // Selected case for triage
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cropCases[0]?.id || "");
  const selectedCase = cropCases.find((c) => c.id === selectedCaseId) || cropCases[0];

  // Prescription Form State
  const [diagTitle, setDiagTitle] = useState("Boro Rice Foliar Blast (Pyricularia oryzae)");
  const [pathogen, setPathogen] = useState("Fungal Blast Spores triggered by morning mist");
  const [severity, setSeverity] = useState<"Mild" | "Moderate" | "Severe" | "Critical">("Moderate");
  const [medItem, setMedItem] = useState("Tricyclazole 75% WP");
  const [medDose, setMedDose] = useState("0.6 g / L water (120 g / acre)");
  const [medSafety, setMedSafety] = useState("21 Days Pre-Harvest Statutory Withholding");
  const [prescriptionSuccess, setPrescriptionSuccess] = useState(false);

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [fee, setFee] = useState(currentUser.fee || 200);
  const [location, setLocation] = useState(currentUser.location);
  const [bio, setBio] = useState(
    currentUser.bio ||
      "Over 16 years leading pest and disease eradication across Boro/Aman rice, maize, and high-value vegetables."
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, fee: Number(fee), location, bio });
    setIsProfileModalOpen(false);
  };

  const handleIssuePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;

    attachPrescription(selectedCase.id, {
      diagnosisTitle: diagTitle,
      pathogenOrCause: pathogen,
      severity: severity as any,
      treatmentSteps: [
        "Halt all urea top-dressing immediately to slow succulent leaf growth.",
        "Maintain 2-3 cm standing water in paddy; do not allow field cracking.",
        "Perform foliar spray during late afternoon using hollow cone nozzle.",
      ],
      medicationsOrSprays: [
        {
          item: medItem,
          activeIngredient: "Tricyclazole (Melanin inhibitor)",
          dosage: medDose,
          frequencyAndDuration: "Single spray; repeat after 10 days if humid mist continues",
          withholdingSafetyPeriod: medSafety,
        },
      ],
      preventiveAdvice: "Treat seedbed with Carbendazim 2g/kg seed before transplanting.",
      followUpDate: "2026-11-06",
      prescribedAt: new Date().toISOString(),
    });

    setPrescriptionSuccess(true);
    setTimeout(() => setPrescriptionSuccess(false), 3000);
  };

  const totalEarnings = cropCases.reduce((sum, c) => sum + Math.round((c.feePaid || 200) * 0.7), 0);

  return (
    <div className="w-full space-y-6">
      {/* 1. Agronomist Credential Banner */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-teal-500/20 bg-gradient-to-r from-teal-950/40 via-slate-900 to-[#030d12] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-teal-500/70 shadow-lg shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>DAE REG #AGR-2015-8891</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                Fee: ৳{currentUser.fee || 200} / Case
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
            <p className="text-xs text-slate-300 mt-0.5 max-w-xl line-clamp-1">{currentUser.bio || currentUser.location}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition shadow-sm"
          >
            <Edit2 className="w-3.5 h-3.5 text-teal-400" />
            <span>{isBn ? "প্র্যাকটিস প্রোফাইল সম্পাদনা" : "Edit Practice Profile"}</span>
          </button>
        </div>
      </div>

      {/* 2. Doctor Financials & Queue Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Doctor Share (70%)</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5 block">
            {formatCurrency(totalEarnings)}
          </span>
          <span className="text-[10px] text-slate-400">bKash Payout Ready</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Incoming Queue</span>
          <span className="text-xl sm:text-2xl font-black text-teal-300 font-mono mt-0.5 block">
            {cropCases.length} Cases
          </span>
          <span className="text-[10px] text-teal-400 font-medium">Boro & Maize</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">DAE Ground Truth</span>
          <span className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5 block">99.4%</span>
          <span className="text-[10px] text-emerald-400 font-medium">Verified Protocol</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Community Impact</span>
          <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono mt-0.5 block">
            {cropCommunityQuestions.length} Threads
          </span>
          <span className="text-[10px] text-cyan-400 font-medium">Verified Solutions</span>
        </div>
      </div>

      {/* 3. Clinical Triage Queue & Digital Prescription Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 5 Cols: Incoming Patient Queue */}
        <div className="lg:col-span-5 srot-glass-card rounded-2xl p-5 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Wheat className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "মাঠের রোগ নির্ণয় কিউ" : "Crop Disease Triage Queue"}</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">{cropCases.length} Active</span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto">
            {cropCases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedCase?.id === c.id
                    ? "bg-slate-900 border-teal-500/50 shadow-md ring-1 ring-teal-500/25"
                    : "bg-slate-950/50 hover:bg-slate-900/60 border-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-teal-400">{c.caseNumber}</span>
                  <span className="text-[10px] text-slate-500">{formatDate(c.createdAt)}</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">{c.farmerOrOwner.subjectName}</h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  Client: {c.farmerOrOwner.name} ({c.farmerOrOwner.location})
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-white/[0.04]">
                  <span className="text-emerald-400 font-bold">৳{c.feePaid} Paid</span>
                  <span>{c.messages.length} Messages</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right 7 Cols: Interactive Digital Prescription Studio */}
        <div className="lg:col-span-7 srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-5 bg-gradient-to-br from-slate-900/90 via-slate-950 to-[#020b10]">
          {selectedCase ? (
            <form onSubmit={handleIssuePrescription} className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-teal-400">{selectedCase.caseNumber}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-300 font-bold">{selectedCase.farmerOrOwner.name}</span>
                  </div>
                  <h3 className="text-base font-black text-white mt-0.5">{selectedCase.farmerOrOwner.subjectName}</h3>
                </div>

                <Link
                  href={`/consult/${selectedCase.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold hover:bg-teal-500/30 transition"
                >
                  Enter Chamber &rarr;
                </Link>
              </div>

              {/* High-Res Photo Viewfinder Preview */}
              {selectedCase.uploadedPhotos && selectedCase.uploadedPhotos.length > 0 && (
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-teal-400" />
                    <span>Uploaded Leaf Pathology Specimen:</span>
                  </label>
                  <div className="h-44 rounded-xl overflow-hidden border border-white/[0.1] relative">
                    <img
                      src={selectedCase.uploadedPhotos[0]}
                      alt="Crop specimen"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-teal-300">
                      FOV 1.4x • High Resolution
                    </div>
                  </div>
                </div>
              )}

              {/* Clinical Inputs */}
              <div>
                <label className="text-slate-300 font-bold block mb-1">Diagnosis Title:</label>
                <input
                  type="text"
                  value={diagTitle}
                  onChange={(e) => setDiagTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Pathogen / Cause:</label>
                  <input
                    type="text"
                    value={pathogen}
                    onChange={(e) => setPathogen(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Severity Rating:</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Mild">Mild (হালকা)</option>
                    <option value="Moderate">Moderate (মধ্যম বিস্তার)</option>
                    <option value="Severe">Severe (মারাত্মক ঝুঁকি)</option>
                    <option value="Critical">Critical (জরুরি হস্তক্ষেপ)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Calibrated Chemical Spray Active:</label>
                <input
                  type="text"
                  value={medItem}
                  onChange={(e) => setMedItem(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Calibrated Dosage:</label>
                  <input
                    type="text"
                    value={medDose}
                    onChange={(e) => setMedDose(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-amber-400 font-bold block mb-1">Mandatory Withholding Safety:</label>
                  <input
                    type="text"
                    value={medSafety}
                    onChange={(e) => setMedSafety(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-200 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              {prescriptionSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-center">
                  Prescription digitally signed & dispatched to farmer device!
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition shadow-md shadow-emerald-500/20 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Issue Official DAE Signed Prescription (Rx)</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">
              No crop case selected.
            </div>
          )}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-teal-500/30 p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-teal-400" />
                <span>{isBn ? "প্র্যাকটিস ও ফি সম্পাদনা" : "Edit Practitioner Profile"}</span>
              </h3>
              <button onClick={() => setIsProfileModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Specialist Full Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Consultation Fee (BDT / ৳):</label>
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Station / Regional Hub:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Professional Bio & Credentials:</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
