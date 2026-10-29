"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Stethoscope,
  Milk,
  HeartHandshake,
  ShieldCheck,
  Edit2,
  Sparkles,
  Camera,
  Activity,
  AlertTriangle,
  FileText,
  Clock,
  X,
  Phone,
  MapPin,
} from "lucide-react";

export function VeterinarianPanel() {
  const { currentUser, updateProfile } = useUserStore();
  const { consultations, attachPrescription } = useConsultationStore();
  const { getQuestionsBySector } = useCommunityStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const vetCases = consultations.filter((c) => c.category === "veterinary" || c.category === "pet");
  const dairyQuestions = getQuestionsBySector("dairy");

  // Selected case
  const [selectedCaseId, setSelectedCaseId] = useState<string>(vetCases[0]?.id || "");
  const selectedCase = vetCases.find((c) => c.id === selectedCaseId) || vetCases[0];

  // Prescription Form State
  const [diagTitle, setDiagTitle] = useState("Acute Subclinical Bovine Mastitis (Right Hind Teat)");
  const [pathogen, setPathogen] = useState("Streptococcus uberis bacterial colonization in teat canal");
  const [severity, setSeverity] = useState<"Mild" | "Moderate" | "Severe" | "Critical">("Severe");
  const [medItem, setMedItem] = useState("Ceftiofur Sodium 1g Sterile Powder");
  const [medDose, setMedDose] = useState("1.1 to 2.2 mg/kg body weight Intramuscularly (q24h for 3 days)");
  const [medSafety, setMedSafety] = useState("Milk Withholding: 72 Hours • Meat: 4 Days");
  const [prescriptionSuccess, setPrescriptionSuccess] = useState(false);

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [fee, setFee] = useState(currentUser.fee || 300);
  const [location, setLocation] = useState(currentUser.location);
  const [bio, setBio] = useState(
    currentUser.bio ||
      "Senior Veterinary Surgeon specializing in bovine medicine, CMT mastitis scoring, artificial insemination, and small animal emergency triage."
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
        "Isolate cow to clean, dry bedding stall dusted with hydrated lime.",
        "Apply cold water hose on swollen quarter for 15 mins prior to milking.",
        "Discard milk from this cow completely; strictly do NOT feed to calves.",
      ],
      medicationsOrSprays: [
        {
          item: medItem,
          activeIngredient: "Ceftiofur Sodium (3rd Gen Cephalosporin)",
          dosage: medDose,
          frequencyAndDuration: "Once daily for 3 consecutive days",
          withholdingSafetyPeriod: medSafety,
        },
      ],
      preventiveAdvice: "Check milking machine vacuum pressure is calibrated to 42 kPa.",
      followUpDate: "2026-11-04",
      prescribedAt: new Date().toISOString(),
    });

    setPrescriptionSuccess(true);
    setTimeout(() => setPrescriptionSuccess(false), 3000);
  };

  const totalEarnings = vetCases.reduce((sum, c) => sum + Math.round((c.feePaid || 300) * 0.7), 0);

  return (
    <div className="w-full space-y-6">
      {/* 1. Veterinary Surgeon Credential Banner */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-slate-900 to-[#020914] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-500/70 shadow-lg shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>BVC REG #VET-2014-7714</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                Clinical Fee: ৳{currentUser.fee || 300} / Consult
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
            <Edit2 className="w-3.5 h-3.5 text-blue-400" />
            <span>{isBn ? "সার্জন প্রোফাইল সম্পাদনা" : "Edit Surgeon Profile"}</span>
          </button>
        </div>
      </div>

      {/* 2. Clinical Revenue & Tele-Vet Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Clinical Share (70%)</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5 block">
            {formatCurrency(totalEarnings)}
          </span>
          <span className="text-[10px] text-slate-400">Direct Doctor Wallet</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Bovine & Pet Triage</span>
          <span className="text-xl sm:text-2xl font-black text-blue-300 font-mono mt-0.5 block">
            {vetCases.length} Cases
          </span>
          <span className="text-[10px] text-blue-400 font-medium">BVC Protocols</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Statutory Withholding</span>
          <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-0.5 block">100% Enforced</span>
          <span className="text-[10px] text-amber-300 font-medium">Zero Drug Residue</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Community Q&A</span>
          <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono mt-0.5 block">
            {dairyQuestions.length} Threads
          </span>
          <span className="text-[10px] text-cyan-400 font-medium">Verified Solutions</span>
        </div>
      </div>

      {/* 3. Live Veterinary Queue & Digital Rx Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 5 Cols: Incoming Veterinary Patients */}
        <div className="lg:col-span-5 srot-glass-card rounded-2xl p-5 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-blue-400" />
              <span>{isBn ? "ভেটেরিনারি রোগীর ট্রায়াজ" : "Veterinary Triage Queue"}</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">{vetCases.length} Active</span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto">
            {vetCases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                  selectedCase?.id === c.id
                    ? "bg-slate-900 border-blue-500/50 shadow-md ring-1 ring-blue-500/25"
                    : "bg-slate-950/50 hover:bg-slate-900/60 border-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-blue-400">{c.caseNumber}</span>
                  <span className="text-[10px] text-slate-500">{formatDate(c.createdAt)}</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">{c.farmerOrOwner.subjectName}</h4>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  Owner: {c.farmerOrOwner.name} ({c.farmerOrOwner.location})
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-white/[0.04]">
                  <span className="text-emerald-400 font-bold">৳{c.feePaid} Paid</span>
                  <span>{c.messages.length} Messages</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right 7 Cols: BVC Digital Prescription Studio */}
        <div className="lg:col-span-7 srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-5 bg-gradient-to-br from-slate-900/90 via-slate-950 to-[#020814]">
          {selectedCase ? (
            <form onSubmit={handleIssuePrescription} className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400">{selectedCase.caseNumber}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-300 font-bold">{selectedCase.farmerOrOwner.name}</span>
                  </div>
                  <h3 className="text-base font-black text-white mt-0.5">{selectedCase.farmerOrOwner.subjectName}</h3>
                </div>

                <Link
                  href={`/consult/${selectedCase.id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold hover:bg-blue-500/30 transition"
                >
                  Enter Chamber &rarr;
                </Link>
              </div>

              {/* Photo Preview */}
              {selectedCase.uploadedPhotos && selectedCase.uploadedPhotos.length > 0 && (
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    <span>Clinical Udder / Skin Lesion Photo:</span>
                  </label>
                  <div className="h-44 rounded-xl overflow-hidden border border-white/[0.1] relative">
                    <img
                      src={selectedCase.uploadedPhotos[0]}
                      alt="Veterinary specimen"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-blue-300">
                      BVC Clinical Evidence
                    </div>
                  </div>
                </div>
              )}

              {/* Clinical Inputs */}
              <div>
                <label className="text-slate-300 font-bold block mb-1">Veterinary Diagnosis:</label>
                <input
                  type="text"
                  value={diagTitle}
                  onChange={(e) => setDiagTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Etiology / Pathogen:</label>
                  <input
                    type="text"
                    value={pathogen}
                    onChange={(e) => setPathogen(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Clinical Severity:</label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Mild">Mild (হালকা)</option>
                    <option value="Moderate">Moderate (মধ্যম)</option>
                    <option value="Severe">Severe (তীব্র)</option>
                    <option value="Critical">Critical (জরুরি সার্জারি)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Prescribed Drug / Active Chemical:</label>
                <input
                  type="text"
                  value={medItem}
                  onChange={(e) => setMedItem(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Dosage & Route:</label>
                  <input
                    type="text"
                    value={medDose}
                    onChange={(e) => setMedDose(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-amber-400 font-bold block mb-1">Mandatory Withholding Period:</label>
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
                  BVC Verified Prescription digitally signed and issued!
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-400 hover:to-teal-400 text-slate-950 font-black text-xs transition shadow-md shadow-blue-500/20 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Issue Official BVC Signed Veterinary Prescription</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">
              No veterinary case selected.
            </div>
          )}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-blue-500/30 p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-blue-400" />
                <span>{isBn ? "সার্জন প্রোফাইল ও ফি সম্পাদনা" : "Edit Surgeon Profile"}</span>
              </h3>
              <button onClick={() => setIsProfileModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Surgeon Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Consultation Fee (BDT / ৳):</label>
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Hospital / Station:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Clinical Bio & Specialties:</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
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
                  className="px-5 py-2 rounded-xl bg-blue-500 text-slate-950 font-bold"
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
