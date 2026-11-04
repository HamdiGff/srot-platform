"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Stethoscope,
  Milk,
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
  Download,
  ShieldCheck,
  ShieldAlert,
  Send,
  Droplets,
  TrendingUp,
} from "lucide-react";

export function VeterinarianPanel() {
  const { currentUser, updateProfile } = useUserStore();
  const { consultations, attachPrescription, sendMessage } = useConsultationStore();
  const { getQuestionsBySector, addAnswer } = useCommunityStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const vetCases = consultations.filter((c) => c.category === "veterinary" || c.category === "pet");
  const vetCommunityQuestions = getQuestionsBySector("dairy");

  // Active Workspace Tab
  const [activeTab, setActiveTab] = useState<"triage" | "rx_studio" | "wallet" | "community">("triage");

  // Selected case for triage
  const [selectedCaseId, setSelectedCaseId] = useState<string>(vetCases[0]?.id || "");
  const selectedCase = vetCases.find((c) => c.id === selectedCaseId) || vetCases[0];

  // Prescription Form State
  const [diagTitle, setDiagTitle] = useState("Acute Bovine Mastitis (Streptococcus uberis)");
  const [pathogen, setPathogen] = useState("Environmental Teat Bacterial Infection with Fibrinous Clots");
  const [severity, setSeverity] = useState<"Mild" | "Moderate" | "Severe" | "Critical">("Severe");
  const [medItem, setMedItem] = useState("Ceftiofur Sodium 1g IM + Cloxacillin Intramammary Infusion");
  const [medDose, setMedDose] = useState("1g deep intramuscular injection every 24 hours for 3 days");
  const [medWithholding, setMedWithholding] = useState("Milk Withholding: 72 Hours (3 Days) • Meat: 4 Days");
  const [prescriptionSuccess, setPrescriptionSuccess] = useState(false);

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [fee, setFee] = useState(currentUser.fee || 300);
  const [location, setLocation] = useState(currentUser.location);
  const [bio, setBio] = useState(
    currentUser.bio ||
      "BVC Registered Surgeon with 14 years specializing in bovine obstetrics, mastitis eradication, and companion pet surgery."
  );

  // Payout Request Modal State
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState<"bkash" | "nagad" | "bank">("bkash");
  const [payoutWalletNumber, setPayoutWalletNumber] = useState("01799-887702");
  const [payoutAmount, setPayoutAmount] = useState<number>(4500);
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [withdrawnTotal, setWithdrawnTotal] = useState<number>(18500);

  // Community Reply State
  const [replyingQId, setReplyingQId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

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
        "Completely strip out the affected quarter every 3 hours into sanitary bucket.",
        "Apply cold hydrotherapy compress for 15 minutes prior to stripping.",
        "Strictly discard all milk during the 72-hour withholding window; never feed calves.",
      ],
      medicationsOrSprays: [
        {
          item: medItem,
          activeIngredient: "Ceftiofur (3rd Gen Cephalosporin) + Cloxacillin",
          dosage: medDose,
          frequencyAndDuration: "Once daily for 3 consecutive days",
          withholdingSafetyPeriod: medWithholding,
        },
      ],
      preventiveAdvice: "Pre-milking and post-milking iodine teat dip (0.5% available iodine).",
      followUpDate: "2026-11-08",
      prescribedAt: new Date().toISOString(),
    });

    setPrescriptionSuccess(true);
    setTimeout(() => setPrescriptionSuccess(false), 3000);
  };

  const handleProcessPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawnTotal((prev) => prev + payoutAmount);
    setPayoutSuccess(true);
    setTimeout(() => {
      setPayoutSuccess(false);
      setIsPayoutModalOpen(false);
    }, 2000);
  };

  const handleSendCommunityReply = (qId: string) => {
    if (!replyText.trim()) return;
    addAnswer(qId, {
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorTitle: "Veterinary Surgeon • BVC Registered",
      authorAvatar: currentUser.avatar,
      isVerifiedExpert: true,
      registrationBadge: currentUser.licenseNumber || "BVC-VET-2014-7714",
      content: replyText.trim(),
      clinicalAction: "Enforce strict milk withholding and California Mastitis Test.",
    });
    setReplyText("");
    setReplyingQId(null);
  };

  const grossEarnings = vetCases.reduce((sum, c) => sum + (c.feePaid || 300), 0) + 24000;
  const expertShare = Math.round(grossEarnings * 0.7);
  const availableBalance = expertShare - withdrawnTotal;

  return (
    <div className="w-full space-y-6">
      {/* 1. VETERINARIAN SURGEON CREDENTIAL BANNER */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-blue-500/25 bg-gradient-to-r from-blue-950/40 via-slate-900 to-[#020b14] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-500/70 shadow-lg shrink-0"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-400 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-blue-400" />
                <span>BVC REG #VET-2014-7714</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                Fee: ৳{currentUser.fee || 300} / Consult
              </span>
              <span className="px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 font-mono text-[10px] border border-blue-500/30">
                BAU Veterinary Hospital Clinician
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{currentUser.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
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
            <Edit2 className="w-3.5 h-3.5 text-blue-400" />
            <span>{isBn ? "প্রোফাইল সম্পাদন" : "Edit BVC Profile"}</span>
          </button>

          <button
            onClick={() => setIsPayoutModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-black transition shadow-lg shadow-emerald-500/20"
          >
            <Wallet className="w-3.5 h-3.5 text-slate-950" />
            <span>{isBn ? "বিকাশ উইথড্র (৳)" : "Withdraw Wallet (৳)"}</span>
          </button>
        </div>
      </div>

      {/* 2. THE MODERN WORKSPACE NAVIGATION TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-white/[0.08] text-xs">
        {[
          { id: "triage", label: isBn ? "ভেটেরিনারি কেস কিউ" : "Livestock & Pet Queue", icon: Activity, count: vetCases.length },
          { id: "rx_studio", label: isBn ? "বিভিসি প্রেসক্রিপশন স্টুডিও" : "BVC Rx Studio", icon: FileText },
          { id: "wallet", label: isBn ? "৭০/৩০ রাজস্ব ওয়ালেট" : "Tele-Vet Wallet", icon: Wallet },
          { id: "community", label: isBn ? "কমিউনিটি কনসালটেশন" : "Community Clinical Desk", icon: MessageSquare, count: vetCommunityQuestions.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 border border-blue-500/50 text-blue-300 shadow-md font-black ring-1 ring-blue-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-400" : ""}`} />
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
      {/* TAB 1: BOVINE & PET CLINICAL TRIAGE QUEUE */}
      {/* ========================================================================= */}
      {activeTab === "triage" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 5 Cols: Incoming Cases */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-xs font-black text-white uppercase tracking-wider font-mono">
                CLINICAL CASES QUEUE ({vetCases.length})
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">● LIVE SYNC</span>
            </div>

            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {vetCases.map((c) => {
                const isSelected = selectedCase?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-blue-500/60 shadow-lg shadow-blue-950/40 ring-1 ring-blue-500/40"
                        : "bg-slate-950/70 border-white/[0.06] hover:border-white/[0.15]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">{c.caseNumber}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-red-500/20 text-red-300 border border-red-500/30">
                        Urgent Veterinary
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-white mt-1">{c.farmerOrOwner.name}</h4>
                    <p className="text-[11px] text-slate-300 font-mono">
                      {c.farmerOrOwner.subjectName} • {c.farmerOrOwner.location}
                    </p>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 bg-slate-950/60 p-2 rounded-lg border border-white/[0.04]">
                      {c.symptomsDescription}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 7 Cols: Selected Case Clinical Examination & Chamber */}
          <div className="lg:col-span-7 srot-glass-card rounded-3xl p-5 sm:p-6 border border-white/[0.08] bg-slate-950/90 space-y-4">
            {selectedCase ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">
                      CASE #{selectedCase.caseNumber}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                      {selectedCase.farmerOrOwner.subjectName} ({selectedCase.farmerOrOwner.areaOrHerdSize})
                    </h3>
                  </div>

                  <Link
                    href={`/consult/${selectedCase.id}`}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs transition shadow-md shadow-blue-500/20 self-start sm:self-auto"
                  >
                    <span>{isBn ? "লাইভ টেলি-সার্জারি চেম্বার" : "Enter Clinical Chamber"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                  </Link>
                </div>

                {/* Patient Telemetry */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/[0.04]">
                    <span className="text-slate-400 block text-[10px]">Client Contact</span>
                    <span className="text-white font-bold">{selectedCase.farmerOrOwner.phone}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/[0.04]">
                    <span className="text-slate-400 block text-[10px]">Lactation / Age</span>
                    <span className="text-cyan-300 font-bold">{selectedCase.farmerOrOwner.subjectAgeOrStage}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/[0.04] col-span-2 sm:col-span-1">
                    <span className="text-slate-400 block text-[10px]">Consultation Fee</span>
                    <span className="text-emerald-400 font-bold">৳{selectedCase.feePaid || 300}</span>
                  </div>
                </div>

                {/* Attached Photo */}
                {selectedCase.uploadedPhotos && selectedCase.uploadedPhotos.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-blue-400" />
                      <span>Clinical Lesion / Teat Specimen:</span>
                    </span>
                    <div className="h-44 w-full rounded-2xl overflow-hidden border border-white/[0.1] bg-slate-900">
                      <img
                        src={selectedCase.uploadedPhotos[0]}
                        alt="Teat Specimen"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Fast Action to Switch to Rx Studio */}
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab("rx_studio")}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-300 border border-blue-500/30 text-xs font-bold flex items-center justify-center gap-2 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isBn ? "এই কেসের বিভিসি চিকিৎসাপত্র তৈরি করুন" : "Open BVC Prescription Studio &rarr;"}</span>
                  </button>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400 text-center py-12">No case selected.</p>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: BVC VETERINARY RX STUDIO WITH ENFORCED WITHHOLDING */}
      {/* ========================================================================= */}
      {activeTab === "rx_studio" && (
        <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] bg-slate-950/90 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isBn ? "বাংলাদেশ ভেটেরিনারি কাউন্সিল (BVC) ডিজিটাল প্রেসক্রিপশন স্টুডিও" : "Official BVC Veterinary Prescription Studio"}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isBn ? "খাদ্য নিরাপত্তা বিধিমতে কঠোর দুধ ও মাংস উইথহোল্ডিং নির্দেশনা অন্তর্ভুক্ত করুন।" : "Enforces mandatory milk and meat withdrawal warnings to protect public health."}
              </p>
            </div>

            {selectedCase?.prescription && (
              <button
                onClick={() => generatePrescriptionPdf(selectedCase)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isBn ? "প্রেসক্রিপশন পিডিএফ ডাউনলোড" : "Download Issued PDF"}</span>
              </button>
            )}
          </div>

          {prescriptionSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Official BVC Veterinary Prescription Signed & Withholding Warnings Dispatched!</span>
            </div>
          )}

          <form onSubmit={handleIssuePrescription} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Veterinary Diagnosis</label>
                <input
                  type="text"
                  value={diagTitle}
                  onChange={(e) => setDiagTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500 font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Pathogen / Etiology</label>
                <input
                  type="text"
                  value={pathogen}
                  onChange={(e) => setPathogen(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Veterinary Pharmaceuticals</label>
                <input
                  type="text"
                  value={medItem}
                  onChange={(e) => setMedItem(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Route & Dosage Instructions</label>
                <input
                  type="text"
                  value={medDose}
                  onChange={(e) => setMedDose(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Enforced Withdrawal Safety</label>
                <input
                  type="text"
                  value={medWithholding}
                  onChange={(e) => setMedWithholding(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-rose-500/40 text-rose-300 focus:outline-none focus:border-rose-400 font-mono font-bold"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-400 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/25 transition"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>{isBn ? "বিভিসি অফিসিয়াল চিকিৎসাপত্র স্বাক্ষর ও জারি করুন" : "Sign & Issue Tamper-Proof BVC Prescription"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TELE-VET REVENUE WALLET & BKASH PAYOUTS */}
      {/* ========================================================================= */}
      {activeTab === "wallet" && (
        <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] bg-slate-950/80 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base sm:text-lg font-black text-white">
                  {isBn ? "ভেটেরিনারি সার্জন রাজস্ব ওয়ালেট ও পেমেন্ট হিস্ট্রি" : "Veterinary Surgeon 70/30 Revenue Wallet"}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isBn ? "প্রতিটি টেলি-কনসালটেশনের ৭০% ডাক্তার পেমেন্ট হিসেবে সংরক্ষিত।" : "Direct mobile wallet disbursement with encrypted ledger reconciliation."}
              </p>
            </div>

            <button
              onClick={() => setIsPayoutModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-md shadow-emerald-500/20"
            >
              {isBn ? "বিকাশ উত্তোলন" : "Request Payout"}
            </button>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/[0.06] text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">মোট পরামর্শ সংখ্যা</span>
              <span className="text-2xl font-black text-white font-mono mt-1 block">118 Cases</span>
              <span className="text-[10px] text-emerald-400 font-mono">100% BVC Verified</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/[0.06] text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">সর্বমোট আয় (Gross GMV)</span>
              <span className="text-2xl font-black text-white font-mono mt-1 block">৳{grossEarnings.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400 font-mono">Platform GMV</span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">আপনার ৭০% অংশ</span>
              <span className="text-2xl font-black text-blue-300 font-mono mt-1 block">৳{expertShare.toLocaleString()}</span>
              <span className="text-[10px] text-blue-400 font-mono">Surgeon Share</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">উত্তোলনযোগ্য ব্যালেন্স</span>
              <span className="text-2xl font-black text-emerald-300 font-mono mt-1 block">৳{availableBalance.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-400 font-mono">Ready to Withdraw</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: COMMUNITY CLINICAL DESK */}
      {/* ========================================================================= */}
      {activeTab === "community" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                {isBn ? "কমিউনিটিতে ডেইরি ও প্রাণিসম্পদ প্রশ্নের উত্তর" : "Livestock Inquiries Awaiting Surgeon Reply"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn ? "আপনার উত্তরগুলো স্বয়ংক্রিয়ভাবে বিভিসি রেজিস্ট্রেশন সিলের সাথে প্রদর্শিত হবে।" : "Your responses are stamped with verified BVC council accreditation."}
              </p>
            </div>

            <Link
              href="/community"
              className="px-3.5 py-1.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 text-xs font-bold transition flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isBn ? "ফোরাম ভিউ" : "Full Forum"}</span>
            </Link>
          </div>

          <div className="space-y-3">
            {vetCommunityQuestions.slice(0, 3).map((q) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] space-y-3 shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">
                      {q.cropOrAnimal} • {q.authorLocation}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{q.title}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono text-[10px] font-bold shrink-0">
                    {q.answers?.length || 0} Replies
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-white/[0.04]">
                  {q.description}
                </p>

                {replyingQId === q.id ? (
                  <div className="space-y-2 pt-2 border-t border-white/[0.06] text-xs">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write verified veterinary surgeon advice and withdrawal protocol..."
                      className="w-full p-3 rounded-xl bg-slate-900 border border-blue-500/40 text-white focus:outline-none"
                      rows={3}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSendCommunityReply(q.id)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post BVC Verified Answer</span>
                      </button>
                      <button
                        onClick={() => setReplyingQId(null)}
                        className="px-3 py-2 rounded-xl text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-1">
                    <button
                      onClick={() => {
                        setReplyingQId(q.id);
                        setReplyText("");
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{isBn ? "উত্তর লিখুন" : "Answer as Verified Vet Surgeon &rarr;"}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: EDIT PROFILE MODAL */}
      {/* ========================================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-blue-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-blue-400" />
              <span>{isBn ? "ভেটেরিনারি সার্জন প্রোফাইল সম্পাদন" : "Edit Surgeon Profile"}</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Surgeon Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Consultation Fee (BDT)</label>
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white font-mono font-bold focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Hospital & Station Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Surgical & Clinical Expertise</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition shadow-md"
                >
                  Save Surgeon Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: PAYOUT REQUEST MODAL */}
      {/* ========================================================================= */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-emerald-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsPayoutModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-black text-white mb-2 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "ভেটেরিনারি রাজস্ব উত্তোলন" : "Withdraw Veterinary Earnings"}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Disburse available consultation revenue directly to your mobile wallet.
            </p>

            {payoutSuccess ? (
              <div className="p-6 text-center rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-white">Disbursement Initiated!</h4>
                <p className="text-xs text-slate-300 font-mono">
                  ৳{payoutAmount} sent to {payoutWalletNumber} via {payoutMethod.toUpperCase()}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProcessPayout} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Withdrawal Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["bkash", "nagad", "bank"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPayoutMethod(m)}
                        className={`py-2 rounded-xl font-bold uppercase transition ${
                          payoutMethod === m
                            ? "bg-emerald-600 text-white font-black shadow-md"
                            : "bg-slate-900 text-slate-400"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Wallet Account Number</label>
                  <input
                    type="text"
                    value={payoutWalletNumber}
                    onChange={(e) => setPayoutWalletNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white font-mono focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Withdrawal Amount (BDT)</label>
                  <input
                    type="number"
                    max={availableBalance}
                    min={500}
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white font-mono font-bold text-sm focus:outline-none focus:border-emerald-500"
                    required
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Available: ৳{availableBalance.toLocaleString()}
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black transition shadow-lg shadow-emerald-600/30"
                  >
                    Confirm Payout Transfer
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
