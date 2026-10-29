"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import { formatDate, formatCurrency } from "@/lib/utils";
import {
  ShieldCheck,
  Stethoscope,
  Wheat,
  Clock,
  CheckCircle,
  FileText,
  Download,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Camera,
  Video,
  Wallet,
  Send,
  MessageSquare,
  User,
  MapPin,
  Phone,
  Milk,
  HeartHandshake,
} from "lucide-react";
import { ExpertEarningsWallet } from "@/components/features/ExpertEarningsWallet";

export default function ExpertPortalPage() {
  const { currentUser, currentRole, openRoleModal } = useUserStore();
  const { consultations, attachPrescription, sendMessage } = useConsultationStore();

  const [activeTab, setActiveTab] = useState<"queue" | "wallet">("queue");
  const [queueFilter, setQueueFilter] = useState<"all" | "pending" | "completed">("all");
  const [selectedCaseId, setSelectedCaseId] = useState<string>(consultations[0]?.id || "");
  const selectedCase = consultations.find((c) => c.id === selectedCaseId) || consultations[0];

  // Clinician in-portal messaging state
  const [doctorMsgInput, setDoctorMsgInput] = useState("");

  // Prescription builder form state
  const [diagTitle, setDiagTitle] = useState("");
  const [pathogen, setPathogen] = useState("");
  const [severity, setSeverity] = useState<"Mild" | "Moderate" | "Severe" | "Critical">("Moderate");
  const [step1, setStep1] = useState("");
  const [medItem, setMedItem] = useState("");
  const [medActive, setMedActive] = useState("");
  const [medDose, setMedDose] = useState("");
  const [medSafety, setMedSafety] = useState("");
  const [preventive, setPreventive] = useState("");
  const [successNotice, setSuccessNotice] = useState(false);

  // Filter consultations based on status
  const filteredQueue = consultations.filter((c) => {
    if (queueFilter === "pending") return c.status !== "completed";
    if (queueFilter === "completed") return c.status === "completed";
    return true;
  });

  const handleSendDoctorMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorMsgInput.trim() || !selectedCase) return;

    sendMessage(selectedCase.id, {
      text: doctorMsgInput.trim(),
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole:
        currentRole === "veterinarian"
          ? "veterinarian"
          : currentRole === "expert_agronomist"
          ? "expert_agronomist"
          : "expert_agronomist",
    });

    setDoctorMsgInput("");
  };

  const handleIssuePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase) return;

    const isAgri = selectedCase.category === "agri";

    attachPrescription(selectedCase.id, {
      diagnosisTitle:
        diagTitle || (isAgri ? "Foliar Blast / Severe Lesion Infection" : "Subclinical Mastitis / Pathogen Infection"),
      pathogenOrCause:
        pathogen || (isAgri ? "Pyricularia oryzae fungal spores" : "Streptococcus / Environmental bacterial load"),
      severity,
      treatmentSteps: [
        step1 || "Isolate affected quadrant and begin calibrated foliar spray immediately.",
        "Maintain clean hydration, reduce excessive synthetic nitrogen, and inspect in 5 days.",
      ],
      medicationsOrSprays: [
        {
          item: medItem || (isAgri ? "Tricyclazole 75% WP" : "Cefquinome Sulfate 75mg Infusion"),
          activeIngredient: medActive || (isAgri ? "Tricyclazole Protectant & Systemic" : "4th Gen Cephalosporin"),
          dosage: medDose || (isAgri ? "0.6 g per Liter water (120 g / bigha)" : "1 syringe per affected teat quarter"),
          frequencyAndDuration: "Once every 7 days for 2 cycles",
          withholdingSafetyPeriod: medSafety || (isAgri ? "21 Days Pre-Harvest" : "Milk: 96 Hrs • Meat: 7 Days"),
        },
      ],
      preventiveAdvice:
        preventive || "Implement recommended bio-security isolation and follow certified withdrawal windows.",
      followUpDate: "2026-11-08",
      prescribedAt: new Date().toISOString(),
    });

    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 5000);
  };

  return (
    <div className="w-full srot-glow-mesh py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500/80 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Accredited Practitioner Desk
              </span>
              <button
                onClick={openRoleModal}
                className="text-xs text-slate-400 hover:text-white underline underline-offset-2 transition"
              >
                Switch Account / Role
              </button>
            </div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <span>{currentUser.name}</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentUser.roleLabel} • {currentUser.location}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("queue")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "queue"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-900 text-slate-300 hover:text-white border border-white/[0.08]"
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Consultation Queue ({consultations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("wallet")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "wallet"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-900 text-slate-300 hover:text-white border border-white/[0.08]"
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Earnings Wallet (70/30 Share)</span>
          </button>
        </div>
      </div>

      {activeTab === "wallet" ? (
        <ExpertEarningsWallet />
      ) : (
        /* Main Workbench Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Col: Queue List & Filters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Patient & Farm Queue</span>
                <span className="text-xs font-mono text-emerald-400">({filteredQueue.length})</span>
              </h2>

              {/* Status Filter Buttons */}
              <div className="flex rounded-lg bg-slate-950 p-0.5 border border-white/[0.08] text-[10px] font-bold">
                <button
                  onClick={() => setQueueFilter("all")}
                  className={`px-2 py-1 rounded transition ${
                    queueFilter === "all" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setQueueFilter("pending")}
                  className={`px-2 py-1 rounded transition ${
                    queueFilter === "pending" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setQueueFilter("completed")}
                  className={`px-2 py-1 rounded transition ${
                    queueFilter === "completed" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Resolved
                </button>
              </div>
            </div>

            <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
              {filteredQueue.map((c) => {
                const isSelected = selectedCase?.id === c.id;
                const msgCount = c.messages?.length || 0;

                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-500/30"
                        : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        {c.caseNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                        }`}
                      >
                        {c.status === "completed" ? "Resolved" : "Pending Action"}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-xs truncate flex items-center gap-1.5">
                      <span>{c.farmerOrOwner.subjectName}</span>
                    </h4>

                    <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                      Client: {c.farmerOrOwner.name} ({c.farmerOrOwner.location})
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 mt-2 border-t border-white/[0.04]">
                      <span className="capitalize">{c.channel.replace("_", " ")} channel</span>
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <MessageSquare className="w-3 h-3" />
                        <span>{msgCount} messages</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 2 Cols: Interactive Case Workspace */}
          {selectedCase && (
            <div className="lg:col-span-2 space-y-6">
              {/* Case Details Card */}
              <div className="srot-glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        {selectedCase.caseNumber}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">
                        Fee: {formatCurrency(selectedCase.feePaid || 300)} (Doctor Share: 70%)
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                      <span>{selectedCase.farmerOrOwner.subjectName}</span>
                      {selectedCase.category === "agri" ? (
                        <Wheat className="w-4 h-4 text-emerald-400" />
                      ) : selectedCase.category === "veterinary" ? (
                        <Milk className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <HeartHandshake className="w-4 h-4 text-pink-400" />
                      )}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Client: <strong className="text-slate-200">{selectedCase.farmerOrOwner.name}</strong> • Phone:{" "}
                      <span className="font-mono">{selectedCase.farmerOrOwner.phone}</span> • {selectedCase.farmerOrOwner.location}
                    </p>
                  </div>

                  <Link
                    href={`/consult/${selectedCase.id}`}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-white/[0.08]"
                  >
                    <span>Open Live Chamber</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Symptoms submitted */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Reported Symptoms & Intake Note:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    {selectedCase.symptomsDescription}
                  </p>
                </div>

                {/* Attached Photos */}
                {selectedCase.uploadedPhotos && selectedCase.uploadedPhotos.length > 0 && (
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Diagnostic Sample Photos:
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {selectedCase.uploadedPhotos.map((photo, i) => (
                        <div
                          key={i}
                          className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-700 hover:scale-105 transition"
                        >
                          <img src={photo} alt="Case photo" className="w-full h-full object-cover" />
                          <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 text-white px-1 rounded">
                            #{i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* LIVE TELE-CHAT FEED WITH PATIENT */}
              <div className="srot-glass-card rounded-2xl border border-slate-800 flex flex-col h-[340px] overflow-hidden">
                <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-white">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Direct Patient Communication: {selectedCase.farmerOrOwner.name}</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono">End-to-End Encrypted</span>
                </div>

                <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 text-xs bg-slate-950/40">
                  {selectedCase.messages && selectedCase.messages.length > 0 ? (
                    selectedCase.messages.map((m) => {
                      const isDoctor =
                        m.senderRole === "expert_agronomist" ||
                        m.senderRole === "veterinarian" ||
                        m.senderId === currentUser.id;
                      const isSystem = m.senderRole === "system";

                      if (isSystem) {
                        return (
                          <div key={m.id} className="text-center my-1.5">
                            <span className="text-[10px] text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-white/[0.04]">
                              {m.text}
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={m.id}
                          className={`flex flex-col ${isDoctor ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-[85%] p-2.5 rounded-xl text-xs leading-relaxed ${
                              isDoctor
                                ? "bg-emerald-600 text-white rounded-tr-none"
                                : "bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none"
                            }`}
                          >
                            <span className="text-[10px] font-bold block mb-0.5 opacity-75">
                              {isDoctor ? `You (${currentUser.name})` : m.senderName}
                            </span>
                            {m.text}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-slate-500 py-8 text-xs">
                      No previous chat history in this chamber. Send a message below to advise the farmer.
                    </p>
                  )}
                </div>

                <form onSubmit={handleSendDoctorMessage} className="p-2.5 bg-slate-900 border-t border-slate-800 flex gap-2">
                  <input
                    type="text"
                    value={doctorMsgInput}
                    onChange={(e) => setDoctorMsgInput(e.target.value)}
                    placeholder="Type medical or agronomic instructions to patient..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>

              {/* Success notification */}
              {successNotice && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span>
                      Official Prescription & Advisory issued and cryptographically signed! Doctor wallet credited.
                    </span>
                  </div>
                  <button
                    onClick={() => generatePrescriptionPdf(selectedCase)}
                    className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  >
                    Download PDF
                  </button>
                </div>
              )}

              {/* Existing or New Prescription Builder */}
              <div className="srot-glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>
                      {selectedCase.prescription
                        ? "Active Authorized Prescription (Rx)"
                        : "Digital Prescription Builder (Rx)"}
                    </span>
                  </h3>

                  {selectedCase.prescription && (
                    <button
                      onClick={() => generatePrescriptionPdf(selectedCase)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  )}
                </div>

                {selectedCase.prescription ? (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Diagnosis:</span>
                      <span className="text-sm font-bold text-white">
                        {selectedCase.prescription.diagnosisTitle}
                      </span>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Cause: {selectedCase.prescription.pathogenOrCause}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-300 block mb-1">
                        Medications / Sprays:
                      </span>
                      {selectedCase.prescription.medicationsOrSprays.map((m, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 mb-1"
                        >
                          <strong className="text-white">{m.item}</strong> — {m.dosage} (
                          {m.frequencyAndDuration})
                          <span className="text-amber-400 block text-[10px]">
                            Withholding: {m.withholdingSafetyPeriod}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleIssuePrescription} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Diagnosis / Pathogen Title:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Rice Blast (Pyricularia oryzae)"
                          value={diagTitle}
                          onChange={(e) => setDiagTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Severity Level:
                        </label>
                        <select
                          value={severity}
                          onChange={(e) => setSeverity(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="Mild">Mild</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Severe">Severe</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Immediate Action Protocol Step:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Halt chemical nitrogen top dressing immediately and drain stagnant water."
                        value={step1}
                        onChange={(e) => setStep1(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Medicine / Spray Name:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Tricyclazole 75% WP"
                          value={medItem}
                          onChange={(e) => setMedItem(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Dosage & Frequency:
                        </label>
                        <input
                          type="text"
                          placeholder="0.6 g / L (once at tillering)"
                          value={medDose}
                          onChange={(e) => setMedDose(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">
                          Mandatory Withholding Period:
                        </label>
                        <input
                          type="text"
                          placeholder="21 Days before harvest"
                          value={medSafety}
                          onChange={(e) => setMedSafety(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-lg shadow-emerald-950/60"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Issue Official Signed Prescription & Complete</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
