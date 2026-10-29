"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useUserStore } from "@/lib/store/userStore";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  FileText,
  Download,
  Video,
  Phone,
  Camera,
  MapPin,
  CheckCircle,
  Clock,
  ShieldCheck,
  Send,
  MessageSquare,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  Wheat,
  Milk,
  HeartHandshake,
  Image as ImageIcon,
  CheckCheck,
} from "lucide-react";

interface ConsultationRoomClientProps {
  consultationId: string;
}

export function ConsultationRoomClient({ consultationId }: ConsultationRoomClientProps) {
  const { getById, updateStatus, attachPrescription, sendMessage } = useConsultationStore();
  const { currentUser, currentRole } = useUserStore();
  const consultation = getById(consultationId);

  const [inputText, setInputText] = useState("");
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  if (!consultation) {
    return (
      <div className="w-full max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white">Consultation Case Not Found</h2>
          <p className="text-xs text-slate-400 mt-1">
            The requested consultation record {consultationId} does not exist or has expired.
          </p>
          <Link
            href="/farmer-portal"
            className="inline-block mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isAgri = consultation.category === "agri";
  const isPet = consultation.category === "pet";
  const messages = consultation.messages || [];

  const isCurrentUserExpert =
    currentRole.startsWith("expert_") ||
    currentRole === "veterinarian" ||
    currentUser.id === consultation.expert.id;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText.trim();
    setInputText("");

    sendMessage(consultation.id, {
      text,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
    });

    // If the sender is the patient and currently in a demo simulation, trigger a prompt doctor acknowledgement
    if (!isCurrentUserExpert && messages.length <= 4) {
      setTimeout(() => {
        sendMessage(consultation.id, {
          text: `Thank you, ${currentUser.name}. I have noted this symptom. I am preparing your verified prescription and dosage advice now.`,
          senderId: consultation.expert.id,
          senderName: consultation.expert.name,
          senderRole: isAgri ? "expert_agronomist" : "veterinarian",
        });
      }, 1500);
    }
  };

  // Simulate expert completing the review and issuing prescription
  const handleSimulateResolve = () => {
    const samplePrescription = isAgri
      ? {
          diagnosisTitle: "Early Nitrogen Chlorosis & Mild Fungal Leaf Spot",
          pathogenOrCause: "Cercospora oryzae with trace nitrogen leaching",
          severity: "Moderate" as const,
          treatmentSteps: [
            "Apply foliar spray of Mancozeb 75% WP @ 2.5 g/L during late afternoon.",
            "Incorporate 15 kg/acre urea mixed with neem oil cake to prevent nitrogen leaching.",
            "Re-check lower leaf margins in 7 days for new lesion development.",
          ],
          medicationsOrSprays: [
            {
              item: "Mancozeb 75% WP",
              activeIngredient: "Mancozeb (Dithiocarbamate broad-spectrum protectant)",
              dosage: "2.5 g / Liter clean water (500 g / acre)",
              frequencyAndDuration: "Single spray; repeat after 10 days if humid mist continues",
              withholdingSafetyPeriod: "14 Days pre-harvest interval",
            },
            {
              item: "Chelated Zinc (Zn-EDTA 12%)",
              activeIngredient: "Zinc Ethylenediaminetetraacetate",
              dosage: "1 g / Liter foliar spray",
              frequencyAndDuration: "Foliar booster at tillering stage",
              withholdingSafetyPeriod: "0 Days (Micro-nutrient)",
            },
          ],
          preventiveAdvice:
            "Maintain optimal field drainage and do not let water stagnate more than 5 cm during active tillering.",
          followUpDate: "2026-11-06",
          prescribedAt: new Date().toISOString(),
        }
      : isPet
      ? {
          diagnosisTitle: "Acute Canine Gastrointestinal Dysbiosis",
          pathogenOrCause: "Dietary indiscretion with mild bacterial overgrowth",
          severity: "Mild" as const,
          treatmentSteps: [
            "Withhold food for 12 hours, ensuring constant access to fresh water with electrolytes.",
            "Transition to bland boiled white rice and skinless chicken for 3-4 days.",
            "Administer veterinary probiotic paste with breakfast.",
          ],
          medicationsOrSprays: [
            {
              item: "Pro-Kolin Advanced Paste",
              activeIngredient: "Probiotics (Enterococcus faecium) + Preplex prebiotics + Kaolin",
              dosage: "3 ml orally twice daily",
              frequencyAndDuration: "Twice daily for 3 days",
              withholdingSafetyPeriod: "N/A",
            },
          ],
          preventiveAdvice: "Avoid table scraps and introduce novel treats gradually over 7 days.",
          followUpDate: "2026-11-04",
          prescribedAt: new Date().toISOString(),
        }
      : {
          diagnosisTitle: "Subclinical Bovine Mastitis",
          pathogenOrCause: "Streptococcus dysgalactiae",
          severity: "Moderate" as const,
          treatmentSteps: [
            "Perform California Mastitis Test (CMT) strip on all four quarters.",
            "Infuse accredited intramammary antibiotic tube after complete milking.",
            "Apply post-milking chlorhexidine teat dip (0.5%).",
          ],
          medicationsOrSprays: [
            {
              item: "Cefquinome Sulfate Intramammary Infusion",
              activeIngredient: "4th Generation Cephalosporin (75 mg)",
              dosage: "1 syringe per affected quarter",
              frequencyAndDuration: "Every 12 hours for 3 consecutive milkings",
              withholdingSafetyPeriod: "Milk Withholding: 96 Hours (4 Days) • Meat: 7 Days",
            },
          ],
          preventiveAdvice:
            "Discard milk from treated quarters during withholding period. Maintain dry sand bedding.",
          followUpDate: "2026-11-05",
          prescribedAt: new Date().toISOString(),
        };

    attachPrescription(consultation.id, samplePrescription);
  };

  return (
    <div className="w-full srot-glow-mesh py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Navigation & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href={isCurrentUserExpert ? "/expert-portal" : "/farmer-portal"}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400">
                {consultation.caseNumber}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400">{formatDate(consultation.createdAt)}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-semibold text-slate-300">
                Fee Paid: {formatCurrency(consultation.feePaid || 300)}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-0.5">
              <span>{consultation.serviceName}</span>
              {consultation.category === "agri" ? (
                <Wheat className="w-5 h-5 text-emerald-400" />
              ) : consultation.category === "veterinary" ? (
                <Milk className="w-5 h-5 text-cyan-400" />
              ) : (
                <HeartHandshake className="w-5 h-5 text-pink-400" />
              )}
            </h1>
          </div>
        </div>

        {/* Case Status Badge & CTAs */}
        <div className="flex items-center gap-3">
          {consultation.status === "completed" ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <CheckCircle className="w-4 h-4" /> Case Resolved & Prescribed
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
                <Clock className="w-4 h-4" /> Live in Review
              </span>

              {/* Expert demo simulator */}
              <button
                onClick={handleSimulateResolve}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-md"
                title="Issue official diagnosis & verified prescription"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Issue Prescription (Rx)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MESSAGE ROUTING & VERIFICATION BANNER */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-slate-300">
            <strong>Active Message Channel:</strong>{" "}
            <span className="text-white font-semibold">{consultation.farmerOrOwner.name}</span>{" "}
            ({consultation.farmerOrOwner.location}){" "}
            <span className="text-emerald-400 font-mono">⇄</span>{" "}
            <span className="text-white font-semibold">{consultation.expert.name}</span>{" "}
            ({consultation.expert.title})
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300 font-mono text-[11px]">
            Logged in: <strong className="text-emerald-400">{currentUser.name}</strong> ({currentUser.role})
          </span>
        </div>
      </div>

      {/* Main Consultation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Media View / Live Feed & Prescription */}
        <div className="lg:col-span-2 space-y-6">
          {/* Channel Experience View */}
          <div className="srot-glass-card rounded-2xl overflow-hidden border border-slate-800">
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-semibold text-white">
                {consultation.channel === "video" ? (
                  <Video className="w-4 h-4 text-cyan-400" />
                ) : consultation.channel === "audio" ? (
                  <Phone className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Camera className="w-4 h-4 text-amber-400" />
                )}
                <span>
                  {consultation.channel === "video"
                    ? "Live Encrypted Video Consultation Feed"
                    : consultation.channel === "audio"
                    ? "Secure Tele-Voice Audio Stream"
                    : "High-Resolution Diagnostic Visual Inspection"}
                </span>
              </div>

              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                LIVE CHANNEL ACTIVE
              </span>
            </div>

            {/* Video / Photo Screen Simulator */}
            <div className="relative h-64 sm:h-80 bg-slate-950 flex items-center justify-center overflow-hidden">
              {consultation.channel === "video" ? (
                <div className="relative w-full h-full">
                  <img
                    src={consultation.uploadedPhotos[0]}
                    alt="Live crop/patient video feed"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

                  {/* Specialist Picture-in-picture */}
                  <div className="absolute top-4 right-4 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-2xl bg-slate-900">
                    <img
                      src={consultation.expert.avatar}
                      alt={consultation.expert.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1.5 bg-black/70 px-1.5 py-0.5 rounded text-[9px] text-white font-semibold">
                      {consultation.expert.name.split(" ")[0]} (Practitioner)
                    </div>
                  </div>

                  {/* Bottom Video Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                      Patient / Plot: {consultation.farmerOrOwner.subjectName}
                    </span>
                    <button
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      className="px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md font-semibold"
                    >
                      {isVideoMuted ? "Unmute Mic" : "Mute Mic"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 p-4 w-full h-full">
                  {consultation.uploadedPhotos.map((photo, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden border border-slate-800">
                      <img
                        src={photo}
                        alt="Diagnostic leaf or animal sample"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 text-[10px] bg-slate-950/80 text-white px-2 py-0.5 rounded backdrop-blur-md">
                        Photo #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Prescribed Advisory Card (If resolved) */}
          {consultation.prescription && (
            <div className="srot-glass-card rounded-2xl p-6 border border-emerald-500/30 bg-emerald-950/10 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <FileText className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Official Advisory & Clinical Prescription
                    </h3>
                    <p className="text-xs text-emerald-400">
                      Verified by {consultation.expert.name} ({consultation.expert.regNumber})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => generatePrescriptionPdf(consultation)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-950/60"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              {/* Diagnosis Banner */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Primary Clinical Diagnosis
                </span>
                <h4 className="text-lg font-bold text-white">
                  {consultation.prescription.diagnosisTitle}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Pathogen / Cause: {consultation.prescription.pathogenOrCause}
                </p>
              </div>

              {/* Action Protocol Steps */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Immediate Field Action Steps:
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {consultation.prescription.treatmentSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Formulations & Withholding Table */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Prescribed Spray / Medical Dosage:
                </h5>
                <div className="space-y-2">
                  {consultation.prescription.medicationsOrSprays.map((med, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <span className="font-bold text-white">{med.item}</span>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          {med.activeIngredient}
                        </span>
                        <span className="text-[11px] text-slate-300">
                          Dosage: <strong className="text-emerald-400">{med.dosage}</strong> •{" "}
                          {med.frequencyAndDuration}
                        </span>
                      </div>

                      <div className="sm:text-right">
                        <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-medium">
                          Safety: {med.withholdingSafetyPeriod}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preventive Advice */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
                <span className="font-bold text-slate-200 block mb-0.5">Preventive Advice:</span>
                <p className="text-slate-400">{consultation.prescription.preventiveAdvice}</p>
                <div className="mt-2 text-emerald-400 font-semibold text-[11px]">
                  Scheduled Follow-up Review: {consultation.prescription.followUpDate}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Live Chat & Case Metadata */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="srot-glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Case Information
            </h3>

            {/* Specialist */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <img
                src={consultation.expert.avatar}
                alt={consultation.expert.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-700"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-white">{consultation.expert.name}</h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400">{consultation.expert.title}</p>
                <span className="text-[10px] font-mono text-emerald-400">
                  {consultation.expert.regNumber}
                </span>
              </div>
            </div>

            {/* Beneficiary */}
            <div className="text-xs space-y-1">
              <span className="text-slate-400 block text-[11px]">Client / Farm Producer:</span>
              <span className="font-bold text-white">{consultation.farmerOrOwner.name}</span>
              <p className="text-slate-400 text-[11px]">{consultation.farmerOrOwner.location}</p>
              <p className="text-slate-400 text-[11px]">{consultation.farmerOrOwner.phone}</p>
              <p className="text-emerald-400 text-[11px] font-semibold mt-1">
                Asset: {consultation.farmerOrOwner.subjectName} ({consultation.farmerOrOwner.subjectAgeOrStage})
              </p>
            </div>
          </div>

          {/* Interactive Chat Console (Directly Persistent) */}
          <div className="srot-glass-card rounded-2xl border border-slate-800 flex flex-col h-[450px]">
            <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-white">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Live Case Chamber Feed</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {messages.length} messages
              </span>
            </div>

            {/* Message stream */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
              {messages.map((msg) => {
                const isFromCurrentUser = msg.senderId === currentUser.id;
                const isSystem = msg.senderRole === "system" || msg.senderId === "system";

                if (isSystem) {
                  return (
                    <div key={msg.id} className="text-center my-2">
                      <span className="text-[10px] text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-white/[0.06] inline-block max-w-[90%]">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isFromCurrentUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                        isFromCurrentUser
                          ? "bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-950/40"
                          : "bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="text-[10px] font-bold opacity-80">
                          {isFromCurrentUser ? "You" : msg.senderName}
                        </span>
                        <span className="text-[9px] opacity-60">
                          {formatDate(msg.timestamp).split(",")[0] || "Just now"}
                        </span>
                      </div>

                      <p className="text-xs whitespace-pre-wrap">{msg.text}</p>

                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 grid grid-cols-2 gap-1.5">
                          {msg.attachments.map((imgUrl, idx) => (
                            <img
                              key={idx}
                              src={imgUrl}
                              alt="Attachment"
                              className="rounded-lg max-h-24 object-cover border border-white/20"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input box */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isCurrentUserExpert
                    ? "Type clinician instructions or questions to patient..."
                    : "Ask doctor about symptoms, spray dosage, reaction..."
                }
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center justify-center shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
