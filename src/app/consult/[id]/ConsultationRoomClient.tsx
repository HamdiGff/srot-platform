"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useConsultationStore } from "@/lib/store/consultationStore";
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
} from "lucide-react";

interface ConsultationRoomClientProps {
  consultationId: string;
}

export function ConsultationRoomClient({ consultationId }: ConsultationRoomClientProps) {
  const { getById, updateStatus, attachPrescription } = useConsultationStore();
  const consultation = getById(consultationId);

  // Chat message simulator state
  const [messages, setMessages] = useState<
    { sender: "user" | "expert" | "system"; text: string; time: string }[]
  >([
    {
      sender: "system",
      text: "Consultation ticket initialized. Secure end-to-end encrypted channel established.",
      time: "Just now",
    },
    {
      sender: "expert",
      text: "Hello! I am reviewing the photos and symptoms submitted for this case. Are there any other neighboring plants or animals showing similar signs?",
      time: "2 mins ago",
    },
  ]);
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: "user" as const,
      text: inputText,
      time: "Just now",
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Automated expert simulated reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "expert",
          text: "Thank you for the additional information. I have calibrated the recommended dosage and withholding period into your digital prescription below.",
          time: "Just now",
        },
      ]);
    }, 1200);
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
          preventiveAdvice: "Maintain optimal field drainage and do not let water stagnate more than 5 cm during active tillering.",
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
            "Strip affected quarter 4 times daily to evacuate bacterial clumps.",
            "Apply post-milking barrier teat dip immediately after cups are removed.",
          ],
          medicationsOrSprays: [
            {
              item: "Cefquinome Intramammary Infusion",
              activeIngredient: "Cefquinome Sulfate 75mg",
              dosage: "1 syringe per affected quarter",
              frequencyAndDuration: "Every 12 hours after milking for 3 milkings",
              withholdingSafetyPeriod: "Milk: 84 hours. Meat: 4 days",
            },
          ],
          preventiveAdvice: "Clean and dry cubicle stalls with hydrated lime bedding weekly.",
          followUpDate: "2026-11-05",
          prescribedAt: new Date().toISOString(),
        };

    attachPrescription(consultation.id, samplePrescription);
  };

  return (
    <div className="w-full srot-glow-mesh py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header Bar */}
      <div className="srot-glass-card rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              href="/farmer-portal"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              {consultation.caseNumber}
            </span>
            <span className="text-xs text-slate-400 capitalize">
              • {consultation.serviceName}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>Consultation Case: {consultation.farmerOrOwner.subjectName}</span>
            <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
              {consultation.farmerOrOwner.subjectAgeOrStage}
            </span>
          </h1>
        </div>

        {/* Status Actions */}
        <div className="flex items-center gap-3">
          {consultation.status === "completed" ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                <CheckCircle className="w-4 h-4" /> Solved & Prescription Active
              </span>

              <button
                onClick={() => generatePrescriptionPdf(consultation)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-950/60"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Rx (PDF)</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl animate-pulse">
                <Clock className="w-4 h-4" /> In Specialist Review
              </span>

              {/* Expert demo simulator */}
              <button
                onClick={handleSimulateResolve}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-md"
                title="Simulate practitioner issuing final diagnosis & prescription"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Expert Issuing Rx</span>
              </button>
            </div>
          )}
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
                      Patient/Plot: {consultation.farmerOrOwner.subjectName}
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
                      <img src={photo} alt="Diagnostic leaf or animal sample" className="w-full h-full object-cover" />
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
                          Dosage: <strong className="text-emerald-400">{med.dosage}</strong> • {med.frequencyAndDuration}
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
              Case Parties
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
            </div>
          </div>

          {/* Interactive Chat Console */}
          <div className="srot-glass-card rounded-2xl border border-slate-800 flex flex-col h-96">
            <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2 text-xs font-bold text-white">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direct Tele-Consultation Chat</span>
            </div>

            {/* Message stream */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 text-xs">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === "user"
                      ? "items-end"
                      : msg.sender === "expert"
                      ? "items-start"
                      : "items-center"
                  }`}
                >
                  {msg.sender === "system" ? (
                    <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded text-center">
                      {msg.text}
                    </span>
                  ) : (
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-emerald-600 text-white rounded-tr-none"
                          : "bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none"
                      }`}
                    >
                      <span className="text-[10px] font-bold block mb-0.5 opacity-70">
                        {msg.sender === "user" ? "You" : consultation.expert.name}
                      </span>
                      {msg.text}
                      <span className="text-[9px] block text-right mt-1 opacity-60">
                        {msg.time}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input box */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask doctor for advice, dosage..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition"
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
