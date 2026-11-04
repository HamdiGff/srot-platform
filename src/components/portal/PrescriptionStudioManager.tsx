"use client";

import React, { useState } from "react";
import { useLanguageStore } from "@/lib/store/languageStore";
import { usePrescriptionStore, PrescriptionItem } from "@/lib/store/prescriptionStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { generatePrescriptionPdfFromItem } from "@/lib/prescriptionGenerator";
import { formatDate } from "@/lib/utils";
import {
  FileText,
  Plus,
  Edit3,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ShieldCheck,
  Search,
  Trash2,
  History,
  Link as LinkIcon,
  Filter,
  Check,
  ChevronRight,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

interface PrescriptionStudioManagerProps {
  council: "DAE" | "BVC";
  specialistId: string;
  specialistName: string;
  specialistTitle: string;
  specialistAvatar: string;
  specialistRegNumber: string;
  defaultCategory?: "agri" | "veterinary" | "pet" | "poultry" | "fisheries";
}

export function PrescriptionStudioManager({
  council,
  specialistId,
  specialistName,
  specialistTitle,
  specialistAvatar,
  specialistRegNumber,
  defaultCategory = "agri",
}: PrescriptionStudioManagerProps) {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const {
    prescriptions,
    createPrescription,
    updatePrescription,
    assignPrescription,
    deletePrescription,
  } = usePrescriptionStore();

  const { consultations } = useConsultationStore();

  // Mode: "repository" | "create" | "revise"
  const [viewMode, setViewMode] = useState<"repository" | "create" | "revise">("repository");
  const [editingRxId, setEditingRxId] = useState<string | null>(null);

  // Search & Filter in repository
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "revised">("all");

  // Form State
  const [selectedCaseId, setSelectedCaseId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientRole, setPatientRole] = useState<"farmer" | "livestock_farmer" | "pet_owner">("farmer");
  const [patientLocation, setPatientLocation] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [category, setCategory] = useState<"agri" | "veterinary" | "pet" | "poultry" | "fisheries">(defaultCategory);

  const [diagnosisTitle, setDiagnosisTitle] = useState("");
  const [pathogenOrCause, setPathogenOrCause] = useState("");
  const [severity, setSeverity] = useState<"Mild" | "Moderate" | "Severe" | "Critical">("Moderate");

  // Dynamic Medications Array
  const [medications, setMedications] = useState<
    {
      item: string;
      activeIngredient: string;
      dosage: string;
      frequencyAndDuration: string;
      withholdingSafetyPeriod: string;
    }[]
  >([
    {
      item: "",
      activeIngredient: "",
      dosage: "",
      frequencyAndDuration: "",
      withholdingSafetyPeriod: "",
    },
  ]);

  const [treatmentSteps, setTreatmentSteps] = useState<string>("");
  const [preventiveAdvice, setPreventiveAdvice] = useState<string>("");
  const [followUpDate, setFollowUpDate] = useState<string>("");
  const [revisionNote, setRevisionNote] = useState<string>("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Relevant consultations matching this council/specialist discipline
  const availableConsultations = consultations.filter((c) =>
    council === "DAE" ? c.category === "agri" : c.category === "veterinary" || c.category === "pet"
  );

  // Filtered prescriptions list
  const filteredPrescriptions = prescriptions
    .filter((rx) => (council === "DAE" ? rx.category === "agri" : rx.category !== "agri"))
    .filter((rx) => {
      if (statusFilter === "all") return true;
      return rx.status === statusFilter;
    })
    .filter((rx) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        rx.id.toLowerCase().includes(q) ||
        rx.diagnosisTitle.toLowerCase().includes(q) ||
        rx.patientOrFarmer.name.toLowerCase().includes(q) ||
        rx.patientOrFarmer.subjectName.toLowerCase().includes(q)
      );
    });

  // Load a case's details into the prescription form
  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    if (!caseId) return;

    const matchedCase = consultations.find((c) => c.id === caseId);
    if (matchedCase) {
      setPatientName(matchedCase.farmerOrOwner.name);
      setPatientRole(matchedCase.farmerOrOwner.role);
      setPatientLocation(matchedCase.farmerOrOwner.location);
      setSubjectName(matchedCase.farmerOrOwner.subjectName);
      setCategory(matchedCase.category);

      // Pre-fill diagnosis if available
      if (!diagnosisTitle && matchedCase.serviceName) {
        setDiagnosisTitle(matchedCase.serviceName);
      }
      if (!pathogenOrCause && matchedCase.symptomsDescription) {
        setPathogenOrCause(matchedCase.symptomsDescription.slice(0, 100));
      }
    }
  };

  // Open "Create New"
  const startCreateNew = () => {
    setEditingRxId(null);
    setSelectedCaseId("");
    setPatientName("");
    setPatientRole(council === "DAE" ? "farmer" : "livestock_farmer");
    setPatientLocation("");
    setSubjectName("");
    setCategory(defaultCategory);
    setDiagnosisTitle("");
    setPathogenOrCause("");
    setSeverity("Moderate");
    setMedications([
      {
        item: "",
        activeIngredient: "",
        dosage: "",
        frequencyAndDuration: "",
        withholdingSafetyPeriod: council === "DAE" ? "14 Days Pre-Harvest Safety" : "72 Hours Milk Withholding",
      },
    ]);
    setTreatmentSteps("");
    setPreventiveAdvice("");
    setFollowUpDate("");
    setRevisionNote("");
    setViewMode("create");
  };

  // Open "Edit / Revise"
  const startRevise = (rx: PrescriptionItem) => {
    setEditingRxId(rx.id);
    setSelectedCaseId(rx.caseId || "");
    setPatientName(rx.patientOrFarmer.name);
    setPatientRole(rx.patientOrFarmer.role);
    setPatientLocation(rx.patientOrFarmer.location);
    setSubjectName(rx.patientOrFarmer.subjectName);
    setCategory(rx.category);
    setDiagnosisTitle(rx.diagnosisTitle);
    setPathogenOrCause(rx.pathogenOrCause);
    setSeverity(rx.severity);
    setMedications(
      rx.medicationsOrSprays.length > 0
        ? rx.medicationsOrSprays
        : [
            {
              item: "",
              activeIngredient: "",
              dosage: "",
              frequencyAndDuration: "",
              withholdingSafetyPeriod: "",
            },
          ]
    );
    setTreatmentSteps(rx.treatmentSteps.join("\n"));
    setPreventiveAdvice(rx.preventiveAdvice);
    setFollowUpDate(rx.followUpDate);
    setRevisionNote("");
    setViewMode("revise");
  };

  // Add medication row
  const addMedicationRow = () => {
    setMedications((prev) => [
      ...prev,
      {
        item: "",
        activeIngredient: "",
        dosage: "",
        frequencyAndDuration: "",
        withholdingSafetyPeriod: council === "DAE" ? "14 Days Pre-Harvest" : "72 Hours Milk Withholding",
      },
    ]);
  };

  // Remove medication row
  const removeMedicationRow = (index: number) => {
    if (medications.length <= 1) return;
    setMedications((prev) => prev.filter((_, i) => i !== index));
  };

  // Update specific medication field
  const updateMedicationField = (index: number, field: string, val: string) => {
    setMedications((prev) =>
      prev.map((med, i) => (i === index ? { ...med, [field]: val } : med))
    );
  };

  // Submit Handler: Create or Update
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!diagnosisTitle.trim()) {
      alert("Please enter a Primary Clinical Diagnosis.");
      return;
    }

    const stepsArray = treatmentSteps
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const validMedications = medications.filter((m) => m.item.trim().length > 0);
    if (validMedications.length === 0) {
      alert("Please provide at least one medication or spray item.");
      return;
    }

    if (viewMode === "create") {
      // Create Brand New Prescription
      const newRx = createPrescription({
        caseId: selectedCaseId || undefined,
        category,
        patientOrFarmer: {
          id: `usr-farmer-${Date.now().toString().slice(-4)}`,
          name: patientName.trim() || (isBn ? "নিবন্ধিত সেবাগ্রহীতা" : "Registered Patient"),
          role: patientRole,
          location: patientLocation.trim() || (isBn ? "বাংলাদেশ" : "Bangladesh Hub"),
          subjectName: subjectName.trim() || (isBn ? "ফসল / গবাদিপশু" : "Specimen / Herd"),
        },
        specialist: {
          id: specialistId,
          name: specialistName,
          title: specialistTitle,
          avatar: specialistAvatar,
          regNumber: specialistRegNumber,
          council,
        },
        diagnosisTitle: diagnosisTitle.trim(),
        pathogenOrCause: pathogenOrCause.trim() || "Pathological examination confirmed",
        severity,
        treatmentSteps:
          stepsArray.length > 0
            ? stepsArray
            : ["Administer recommended formulation as per labeled statutory intervals."],
        medicationsOrSprays: validMedications,
        preventiveAdvice:
          preventiveAdvice.trim() ||
          "Follow council bio-security guidelines and store chemicals safely away from livestock.",
        followUpDate: followUpDate || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      });

      showToast(`Prescription #${newRx.id} successfully created and signed!`);
      setViewMode("repository");
    } else if (viewMode === "revise" && editingRxId) {
      // Update Existing Prescription
      const updated = updatePrescription(editingRxId, {
        diagnosisTitle: diagnosisTitle.trim(),
        pathogenOrCause: pathogenOrCause.trim(),
        severity,
        treatmentSteps:
          stepsArray.length > 0
            ? stepsArray
            : ["Administer recommended formulation as per labeled statutory intervals."],
        medicationsOrSprays: validMedications,
        preventiveAdvice: preventiveAdvice.trim(),
        followUpDate: followUpDate || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
        revisionNote: revisionNote.trim() || "Clinical review & dosage formulation updated by specialist.",
      });

      if (updated) {
        showToast(`Prescription #${updated.id} successfully updated to Revision ${updated.revisionCount}!`);
      }
      setViewMode("repository");
    }
  };

  return (
    <div className="srot-glass-card rounded-3xl p-5 sm:p-7 border border-white/[0.08] bg-slate-950/90 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2.5 animate-in fade-in shadow-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER & ACTION NAV */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <FileText className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-white">
              {council === "DAE"
                ? isBn
                  ? "ডিএই ডিজিটাল প্রেসক্রিপশন ও রিভিশন স্টুডিও"
                  : "Official DAE Digital Prescription & Revision Studio"
                : isBn
                ? "বিভিসি ভেটেরিনারি প্রেসক্রিপশন ও রিভিশন স্টুডিও"
                : "Official BVC Veterinary Prescription & Revision Studio"}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? "অসীম সংখ্যক চিকিৎসাপত্র তৈরি করুন, পুরোনো প্রেসক্রিপশন আপডেট/রিভাইস করুন এবং যেকোনো কেসে তাৎক্ষণিক যুক্ত করুন।"
              : "Author unlimited verified prescriptions, revise previous dosages with live audit trails, and assign directly to patient consultations."}
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-white/[0.08] text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setViewMode("repository")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              viewMode === "repository"
                ? "bg-teal-500 text-slate-950 font-black shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>{isBn ? "প্রেসক্রিপশন তালিকা" : "Repository"}</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-950/40 text-[10px]">
              {filteredPrescriptions.length}
            </span>
          </button>

          <button
            type="button"
            onClick={startCreateNew}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              viewMode === "create"
                ? "bg-teal-500 text-slate-950 font-black shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isBn ? "নতুন চিকিৎসাপত্র" : "Write New Rx"}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. REPOSITORY TAB: LIST ALL AUTHORED PRESCRIPTIONS WITH REVISION BADGES */}
      {/* ========================================================================= */}
      {viewMode === "repository" && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isBn
                    ? "প্রেসক্রিপশন নম্বর, কৃষক, রোগ বা ওষুধ দিয়ে খুঁজুন..."
                    : "Search by Rx ID, farmer name, diagnosis, or drug..."
                }
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-semibold">{isBn ? "ফিল্টার:" : "Filter:"}</span>
              {(["all", "active", "revised"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                    statusFilter === status
                      ? "bg-slate-800 text-teal-400 border border-teal-500/30"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-white/[0.04]"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Prescriptions List */}
          {filteredPrescriptions.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-dashed border-white/[0.1] text-center space-y-2">
              <FileText className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400 font-bold">
                {isBn ? "কোনো প্রেসক্রিপশন পাওয়া যায়নি।" : "No prescriptions match your search criteria."}
              </p>
              <button
                onClick={startCreateNew}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold transition hover:bg-teal-400"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isBn ? "প্রথম চিকিৎসাপত্রটি লিখুন" : "Write Your First Prescription"}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredPrescriptions.map((rx) => {
                const isRevised = rx.revisionCount > 1;
                return (
                  <div
                    key={rx.id}
                    className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-white/[0.06] hover:border-teal-500/30 transition space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-teal-400">{rx.id}</span>
                        {rx.caseId && (
                          <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono text-slate-400 border border-white/[0.06]">
                            Case: {rx.caseId}
                          </span>
                        )}
                        {isRevised ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center gap-1">
                            <RefreshCw className="w-2.5 h-2.5" />
                            <span>Rev {rx.revisionCount}</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                            Original (Rev 1)
                          </span>
                        )}
                      </div>

                      <div className="text-right text-[11px] text-slate-400">
                        <span>Issued: {formatDate(rx.prescribedAt)}</span>
                        {rx.updatedAt && (
                          <span className="block text-[10px] text-amber-400/90 font-mono">
                            Last Updated: {formatDate(rx.updatedAt)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Patient / Subject</span>
                        <span className="text-white font-bold">{rx.patientOrFarmer.name}</span>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          {rx.patientOrFarmer.subjectName} ({rx.patientOrFarmer.location})
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Diagnosis</span>
                        <span className="text-white font-bold">{rx.diagnosisTitle}</span>
                        <span className="text-[11px] text-amber-300 block font-mono">
                          Severity: {rx.severity}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Prescribed Formulation</span>
                        <span className="text-teal-300 font-mono font-bold block truncate">
                          {rx.medicationsOrSprays[0]?.item || "Clinical Protocol"}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {rx.medicationsOrSprays.length} active formulations prescribed
                        </span>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <div className="text-[11px] text-slate-400 font-mono">
                        Safety: <strong className="text-amber-400">{rx.medicationsOrSprays[0]?.withholdingSafetyPeriod || "Strict statutory guidelines"}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Download PDF */}
                        <button
                          type="button"
                          onClick={() => generatePrescriptionPdfFromItem(rx)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/[0.1] text-xs font-semibold transition"
                          title="Download Cryptographically Signed PDF"
                        >
                          <Download className="w-3.5 h-3.5 text-teal-400" />
                          <span>PDF</span>
                        </button>

                        {/* Revise / Update Prescription */}
                        <button
                          type="button"
                          onClick={() => startRevise(rx)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 border border-teal-500/30 text-xs font-bold transition"
                          title="Update formulations, dosages, or advice"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{isBn ? "রিভাইস / আপডেট করুন" : "Revise / Update"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FORM TAB: AUTHOR NEW OR REVISE/UPDATE EXISTING PRESCRIPTION */}
      {/* ========================================================================= */}
      {(viewMode === "create" || viewMode === "revise") && (
        <form onSubmit={handleSubmit} className="space-y-5 text-xs animate-in fade-in">
          {/* Header Banner depending on Mode */}
          <div
            className={`p-3.5 rounded-2xl border flex items-center justify-between ${
              viewMode === "revise"
                ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                : "bg-teal-500/10 border-teal-500/30 text-teal-300"
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              {viewMode === "revise" ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>
                    {isBn ? "প্রেসক্রিপশন রিভিশন মোড: " : "Revising Prescription: "}
                    <strong className="underline">{editingRxId}</strong>
                  </span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-teal-400" />
                  <span>{isBn ? "নতুন চিকিৎসাপত্র তৈরি করুন" : "Authoring New Official Prescription"}</span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setViewMode("repository")}
              className="text-[11px] underline hover:text-white"
            >
              {isBn ? "বাতিল করুন" : "Cancel"}
            </button>
          </div>

          {/* Section A: Case & Beneficiary Linkage */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">
              1. Case Assignment & Beneficiary Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Assign to Active Consultation Ticket (Optional)
                </label>
                <select
                  value={selectedCaseId}
                  onChange={(e) => handleSelectCase(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="">-- Standalone Prescription (No Case Linked) --</option>
                  {availableConsultations.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.caseNumber} • {c.farmerOrOwner.name} ({c.farmerOrOwner.subjectName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Patient / Farmer Full Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Md. Abdul Alim"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Crop Variety or Animal Subject</label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="e.g. BRRI Dhan-28 (Boro) or Holstein Cross Cow"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Location / Upazila</label>
                <input
                  type="text"
                  value={patientLocation}
                  onChange={(e) => setPatientLocation(e.target.value)}
                  placeholder="e.g. Dinajpur Sadar, Rangpur"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Section B: Clinical Diagnosis & Severity */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">
              2. Clinical Pathology & Severity Assessment
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-slate-400 font-semibold block mb-1">Primary Clinical Diagnosis</label>
                <input
                  type="text"
                  value={diagnosisTitle}
                  onChange={(e) => setDiagnosisTitle(e.target.value)}
                  placeholder="e.g. Acute Bovine Mastitis or Rice Leaf Blast"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500 font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Clinical Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500 font-bold"
                >
                  <option value="Mild">Mild Risk</option>
                  <option value="Moderate">Moderate Risk</option>
                  <option value="Severe">Severe (Action Needed)</option>
                  <option value="Critical">Critical Emergency</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Pathogen / Etiological Cause</label>
              <input
                type="text"
                value={pathogenOrCause}
                onChange={(e) => setPathogenOrCause(e.target.value)}
                placeholder="e.g. Streptococcus uberis / Pyricularia oryzae fungal spores"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Section C: Dynamic Multi-Medication Formulations */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-teal-400 font-mono">
                3. Prescribed Medications & Chemicals ({medications.length} items)
              </h3>
              <button
                type="button"
                onClick={addMedicationRow}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-bold transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Medication Row</span>
              </button>
            </div>

            <div className="space-y-3">
              {medications.map((med, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06] space-y-2 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      Item #{idx + 1}
                    </span>
                    {medications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicationRow(idx)}
                        className="text-rose-400 hover:text-rose-300 text-[11px] font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Commercial Brand / Item Name</label>
                      <input
                        type="text"
                        value={med.item}
                        onChange={(e) => updateMedicationField(idx, "item", e.target.value)}
                        placeholder="e.g. Tricyclazole 75% WP or Ceftiofur Sodium 1g"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500 font-bold text-xs"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Active Chemical Ingredient</label>
                      <input
                        type="text"
                        value={med.activeIngredient}
                        onChange={(e) => updateMedicationField(idx, "activeIngredient", e.target.value)}
                        placeholder="e.g. Tricyclazole (Melanin inhibitor) or Ceftiofur Sodium"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.1] text-slate-300 focus:outline-none focus:border-teal-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Calibrated Dosage</label>
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => updateMedicationField(idx, "dosage", e.target.value)}
                        placeholder="e.g. 0.6 g / Liter water or 1.5 mg / kg"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500 text-xs"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Frequency & Duration</label>
                      <input
                        type="text"
                        value={med.frequencyAndDuration}
                        onChange={(e) => updateMedicationField(idx, "frequencyAndDuration", e.target.value)}
                        placeholder="e.g. Once daily for 3 days or Repeat in 10d"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500 text-xs"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-amber-300 font-bold block mb-0.5">
                        Statutory Withholding Interval
                      </label>
                      <input
                        type="text"
                        value={med.withholdingSafetyPeriod}
                        onChange={(e) => updateMedicationField(idx, "withholdingSafetyPeriod", e.target.value)}
                        placeholder="e.g. 21 Days Pre-Harvest or 72 Hours Milk"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-300 focus:outline-none focus:border-amber-400 font-mono text-xs font-bold"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section D: Instructions, Advice & Follow-up */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">
              4. Step-by-Step Instructions & Follow-up
            </h3>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">
                Step-by-Step Treatment Guidance (One step per line)
              </label>
              <textarea
                rows={3}
                value={treatmentSteps}
                onChange={(e) => setTreatmentSteps(e.target.value)}
                placeholder="1. Halt urea application immediately.&#10;2. Spray during late afternoon with hollow cone nozzle.&#10;3. Maintain 5 cm water in plot."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500 font-mono text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Long-term Preventive Advice</label>
                <input
                  type="text"
                  value={preventiveAdvice}
                  onChange={(e) => setPreventiveAdvice(e.target.value)}
                  placeholder="e.g. Treat seedbed with Carbendazim 2g/kg seed"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Follow-up Review Date</label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Revision Note for Updates */}
            {viewMode === "revise" && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <label className="text-amber-300 font-bold block text-xs">
                  Revision Reason & Clinical Update Note (Mandatory for Audit Trail)
                </label>
                <input
                  type="text"
                  value={revisionNote}
                  onChange={(e) => setRevisionNote(e.target.value)}
                  placeholder="e.g. Extended milk withholding to 96h; adjusted dosage to 0.4g/L following recovery"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-amber-500/40 text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            )}
          </div>

          {/* Submit CTAs */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-teal-500/25 transition"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>
                {viewMode === "revise"
                  ? isBn
                    ? "সংশোধিত চিকিৎসাপত্র জারি করুন (নতুন রিভিশন)"
                    : "Authorize & Issue Updated Revision"
                  : isBn
                  ? "অফিসিয়াল প্রেসক্রিপশন স্বাক্ষর ও জারি করুন"
                  : "Sign & Authorize Digital Prescription"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("repository")}
              className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-white/[0.08] transition"
            >
              {isBn ? "বাতিল" : "Cancel"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
