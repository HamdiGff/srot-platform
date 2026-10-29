"use client";

import React, { useState, useEffect } from "react";
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
  Egg,
  Fish,
  HeartHandshake,
  Image as ImageIcon,
  CheckCheck,
  Receipt,
  X,
  Mic,
  MicOff,
  VideoOff,
  RefreshCw,
  Activity,
  BadgeDollarSign,
  QrCode,
  ShieldAlert,
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
  const [isVideoStopped, setIsVideoStopped] = useState(false);
  const [isCameraFlipped, setIsCameraFlipped] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [callDurationSeconds, setCallDurationSeconds] = useState(864); // 14 mins 24 secs

  // Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDurationSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

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
  const isPoultry = consultation.category === "poultry";
  const isFisheries = consultation.category === "fisheries";
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

    // Auto-respond if patient messages in simulator
    if (!isCurrentUserExpert && messages.length <= 4) {
      setTimeout(() => {
        sendMessage(consultation.id, {
          text: `Thank you, ${currentUser.name}. I have examined the live feed and photos. Preparing your BVC/DAE signed digital prescription with required withholding intervals now.`,
          senderId: consultation.expert.id,
          senderName: consultation.expert.name,
          senderRole: isAgri ? "expert_agronomist" : "veterinarian",
        });
      }, 1500);
    }
  };

  // Expert issues signed official prescription
  const handleSimulateResolve = () => {
    const samplePrescription = isAgri
      ? {
          diagnosisTitle: "Boro Rice Foliar Blast (Pyricularia oryzae)",
          pathogenOrCause: "Fungal Blast Spores triggered by high humidity and excess urea",
          severity: "Moderate" as const,
          treatmentSteps: [
            "Halt all further urea top-dressing immediately to stop succulent vegetative growth.",
            "Maintain 2-3 cm shallow standing water in paddy; avoid field drying.",
            "Perform foliar spray during late afternoon with hollow cone nozzle covering both upper and lower leaf surfaces.",
          ],
          medicationsOrSprays: [
            {
              item: "Tricyclazole 75% WP",
              activeIngredient: "Tricyclazole (Melanin biosynthesis inhibitor)",
              dosage: "0.6 g per Liter clean water (120 g / acre)",
              frequencyAndDuration: "Single spray; repeat after 10 days if humid mist continues",
              withholdingSafetyPeriod: "21 Days pre-harvest interval",
            },
            {
              item: "MOP (Muriate of Potash)",
              activeIngredient: "Potassium Chloride (K2O 60%)",
              dosage: "5 kg / bigha as soil application",
              frequencyAndDuration: "One-time booster to strengthen silica layer",
              withholdingSafetyPeriod: "0 Days (Nutritional amendment)",
            },
          ],
          preventiveAdvice:
            "Treat seedbed with Carbendazim 2g/kg seed before transplanting and follow DAE 4:2:1 balanced N-P-K recommendation.",
          followUpDate: "2026-11-06",
          prescribedAt: new Date().toISOString(),
        }
      : isPet
      ? {
          diagnosisTitle: "Canine Atopic Dermatitis with Secondary Malassezia Otitis",
          pathogenOrCause: "Environmental seasonal pollen allergen flare with fungal ear colonization",
          severity: "Moderate" as const,
          treatmentSteps: [
            "Wipe paws and lower abdomen with damp hypoallergenic washcloth after every outdoor walk.",
            "Fit soft Elizabethan cone collar for 48 hours to prevent self-mutilating skin trauma.",
            "Flush ears gently before administering otic drops; do not use Q-tips inside ear canal.",
          ],
          medicationsOrSprays: [
            {
              item: "Oclacitinib (Apoquel) 16mg Tablets",
              activeIngredient: "Oclacitinib Maleate (Janus Kinase JAK-1 inhibitor)",
              dosage: "1 tablet (16mg) orally with food",
              frequencyAndDuration: "Twice daily for 7 days, then reduce to once daily maintenance",
              withholdingSafetyPeriod: "N/A (Companion pet approved)",
            },
            {
              item: "Posatex Otic Ear Suspension",
              activeIngredient: "Orbifloxacin + Posaconazole + Mometasone Furoate",
              dosage: "6 drops into each affected ear canal",
              frequencyAndDuration: "Once daily for 7 consecutive days",
              withholdingSafetyPeriod: "N/A (Topical otic)",
            },
          ],
          preventiveAdvice: "Switch to high Omega-3 fish oil supplement to rebuild epidermal barrier strength.",
          followUpDate: "2026-11-08",
          prescribedAt: new Date().toISOString(),
        }
      : isPoultry
      ? {
          diagnosisTitle: "Caecal Coccidiosis (Eimeria tenella) Outbreak",
          pathogenOrCause: "Protozoal parasite oocysts in wet poultry litter",
          severity: "Severe" as const,
          treatmentSteps: [
            "Immediately remove and replace all damp, caked litter around waterers.",
            "Sterilize drinking lines with chlorine dioxide before adding medication.",
            "Administer Toltrazuril solution in drinking water for 48 continuous hours.",
          ],
          medicationsOrSprays: [
            {
              item: "Toltrazuril 2.5% Oral Solution",
              activeIngredient: "Toltrazuril 25 mg/ml",
              dosage: "1 ml per Liter of drinking water for 8 hours daily",
              frequencyAndDuration: "2 consecutive days",
              withholdingSafetyPeriod: "Meat withholding: 14 Days prior to slaughter",
            },
            {
              item: "Vitamin K3 + Electrolyte Powder",
              activeIngredient: "Menadione Sodium Bisulfite",
              dosage: "1 g per 2 Liters water",
              frequencyAndDuration: "3 consecutive days to halt intestinal hemorrhaging",
              withholdingSafetyPeriod: "0 Days",
            },
          ],
          preventiveAdvice: "Maintain minimum 3-inch dry rice husk litter and clean nipple drinkers daily.",
          followUpDate: "2026-11-03",
          prescribedAt: new Date().toISOString(),
        }
      : {
          diagnosisTitle: "Acute Clinical Bovine Mastitis (Right Hind Quarter)",
          pathogenOrCause: "Environmental Streptococcus uberis infection with high somatic cell count",
          severity: "Severe" as const,
          treatmentSteps: [
            "Completely strip out the affected quarter every 3 hours during daytime to evacuate bacterial toxins.",
            "Apply cold water hose or ice packs on swollen quarter for 15 minutes prior to milking.",
            "Discard all milk from this cow completely into disposal pit; strictly do NOT feed to calves.",
          ],
          medicationsOrSprays: [
            {
              item: "Ceftiofur Sodium Sterile Powder",
              activeIngredient: "Ceftiofur Sodium 1g",
              dosage: "1.1 to 2.2 mg/kg body weight Intramuscularly",
              frequencyAndDuration: "Once daily for 3 consecutive days",
              withholdingSafetyPeriod: "Milk withholding: 72 hrs post final injection • Meat: 4 days",
            },
            {
              item: "Meloxicam Injection 5mg/ml",
              activeIngredient: "Meloxicam (NSAID Anti-inflammatory)",
              dosage: "0.5 mg/kg body weight Subcutaneously",
              frequencyAndDuration: "Single initial injection for udder pain & endotoxic fever",
              withholdingSafetyPeriod: "Milk withholding: 120 hrs (5 days)",
            },
          ],
          preventiveAdvice:
            "Disinfect bedding stalls with hydrated lime weekly. Ensure milking machine vacuum pressure is calibrated to 42 kPa.",
          followUpDate: "2026-10-30",
          prescribedAt: new Date().toISOString(),
        };

    attachPrescription(consultation.id, samplePrescription);
  };

  const totalFee = consultation.feePaid || 300;
  const expertShare = Math.round(totalFee * 0.7);
  const srotShare = totalFee - expertShare;

  return (
    <div className="w-full srot-glow-mesh py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Navigation & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <Link
            href={isCurrentUserExpert ? "/expert-portal" : "/farmer-portal"}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/[0.08] transition"
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
                Fee Paid: {formatCurrency(totalFee)}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-0.5">
              <span>{consultation.serviceName}</span>
              {isAgri ? (
                <Wheat className="w-5 h-5 text-emerald-400" />
              ) : isPoultry ? (
                <Egg className="w-5 h-5 text-amber-400" />
              ) : isFisheries ? (
                <Fish className="w-5 h-5 text-blue-400" />
              ) : isPet ? (
                <HeartHandshake className="w-5 h-5 text-pink-400" />
              ) : (
                <Milk className="w-5 h-5 text-cyan-400" />
              )}
            </h1>
          </div>
        </div>

        {/* Case Status Badge & Action CTAs */}
        <div className="flex items-center gap-2.5">
          {/* Digital Cash Memo Trigger */}
          <button
            onClick={() => setIsReceiptModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-semibold transition"
          >
            <Receipt className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Memo (রসিদ)</span>
          </button>

          {consultation.status === "completed" ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <CheckCircle className="w-4 h-4" /> Case Prescribed
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
                <Clock className="w-4 h-4" /> Live in Chamber
              </span>

              {/* Expert demo simulator */}
              <button
                onClick={handleSimulateResolve}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black transition shadow-md hover:from-emerald-400 hover:to-teal-400"
                title="Issue official diagnosis & verified BVC/DAE prescription"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
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

      {/* LIVE TELEMETRY & CLINICAL HUD STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-950/90 border border-white/[0.08]">
        {isAgri ? (
          <>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Canopy Humidity</span>
              <span className="text-sm font-bold text-cyan-400 font-mono">92% RH (High)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Leaf Surface Temp</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">24.5°C</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Chlorophyll SPAD</span>
              <span className="text-sm font-bold text-amber-400 font-mono">34.2 (Sub-optimal)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Spore Contagion</span>
              <span className="text-sm font-bold text-red-400 font-mono">ELEVATED (Blast)</span>
            </div>
          </>
        ) : isPet ? (
          <>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Heart Rate</span>
              <span className="text-sm font-bold text-cyan-400 font-mono">112 bpm</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Rectal Body Temp</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">101.4°F (Normal)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Body Weight</span>
              <span className="text-sm font-bold text-amber-400 font-mono">31.5 kg (BCS 5/9)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Capillary Refill</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">&lt; 1.5s (Pink)</span>
            </div>
          </>
        ) : isPoultry ? (
          <>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Shed Temperature</span>
              <span className="text-sm font-bold text-cyan-400 font-mono">32.8°C</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">House Ammonia</span>
              <span className="text-sm font-bold text-amber-400 font-mono">19 ppm (Warning)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Morning Mortality</span>
              <span className="text-sm font-bold text-red-400 font-mono">22 Birds (Spike)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Lesion Index</span>
              <span className="text-sm font-bold text-red-400 font-mono">Caecal Grade 3</span>
            </div>
          </>
        ) : (
          <>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Rumen Motility</span>
              <span className="text-sm font-bold text-amber-400 font-mono">2 / 2 min (Sluggish)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Rectal Fever</span>
              <span className="text-sm font-bold text-red-400 font-mono">103.4°F (Mastitis Fever)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Respiration Rate</span>
              <span className="text-sm font-bold text-cyan-400 font-mono">36 breaths/min</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.04] text-center">
              <span className="text-[10px] text-slate-400 uppercase block font-medium">Quarter CMT Score</span>
              <span className="text-sm font-bold text-red-400 font-mono">Positive Grade 3</span>
            </div>
          </>
        )}
      </div>

      {/* Main Consultation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Media View / Live Feed & Prescription */}
        <div className="lg:col-span-2 space-y-6">
          {/* Channel Experience View */}
          <div className="srot-glass-card rounded-2xl overflow-hidden border border-white/[0.08]">
            <div className="p-3.5 bg-slate-900/90 border-b border-white/[0.08] flex items-center justify-between text-xs">
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

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {formatTimer(callDurationSeconds)}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono border border-cyan-500/20">
                  WebRTC HD
                </span>
              </div>
            </div>

            {/* Video / Photo Screen Simulator */}
            <div className="relative h-64 sm:h-80 bg-slate-950 flex items-center justify-center overflow-hidden">
              {isVideoStopped ? (
                <div className="text-center space-y-2 p-6">
                  <VideoOff className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400 font-semibold">Patient camera feed is paused</p>
                </div>
              ) : consultation.channel === "video" ? (
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
                    <div className="absolute bottom-1 left-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[9px] text-white font-semibold truncate">
                      {consultation.expert.name.split(" ")[0]} (Clinician)
                    </div>
                  </div>

                  {/* Live HUD Overlays */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] text-white border border-white/10 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Focus: {consultation.farmerOrOwner.subjectName}</span>
                  </div>

                  {/* Bottom Video Hardware Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                    <span className="bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md text-[11px]">
                      Plot/Tag: {consultation.farmerOrOwner.subjectAgeOrStage}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsVideoMuted(!isVideoMuted)}
                        className={`p-2 rounded-xl backdrop-blur-md font-semibold transition ${
                          isVideoMuted
                            ? "bg-red-500 text-white"
                            : "bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                        }`}
                        title={isVideoMuted ? "Unmute Mic" : "Mute Mic"}
                      >
                        {isVideoMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setIsVideoStopped(!isVideoStopped)}
                        className={`p-2 rounded-xl backdrop-blur-md font-semibold transition ${
                          isVideoStopped
                            ? "bg-red-500 text-white"
                            : "bg-slate-800/80 hover:bg-slate-700 text-slate-200"
                        }`}
                        title={isVideoStopped ? "Turn Camera On" : "Turn Camera Off"}
                      >
                        {isVideoStopped ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setIsCameraFlipped(!isCameraFlipped)}
                        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md text-slate-200 transition"
                        title="Switch Camera Lens"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 p-4 w-full h-full">
                  {consultation.uploadedPhotos.map((photo, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden border border-white/[0.08]">
                      <img
                        src={photo}
                        alt="Diagnostic leaf or animal sample"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 text-[10px] bg-slate-950/80 text-white px-2 py-0.5 rounded backdrop-blur-md font-semibold">
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
                <div className="flex items-center gap-2.5">
                  <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <FileText className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Official Clinical Prescription (চিকিৎসাপত্র)
                    </h3>
                    <p className="text-xs text-emerald-400 font-mono">
                      Signed by {consultation.expert.name} ({consultation.expert.regNumber})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => generatePrescriptionPdf(consultation)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-950/60"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Rx</span>
                </button>
              </div>

              {/* Diagnosis Banner */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.08]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Primary Clinical Diagnosis
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {consultation.prescription.diagnosisTitle}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Pathogen / Vector: {consultation.prescription.pathogenOrCause}
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
                      className="p-3 rounded-xl bg-slate-900/70 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <span className="font-bold text-white text-xs sm:text-sm">{med.item}</span>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          {med.activeIngredient}
                        </span>
                        <span className="text-[11px] text-slate-300">
                          Dosage: <strong className="text-emerald-400">{med.dosage}</strong> •{" "}
                          {med.frequencyAndDuration}
                        </span>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <span className="text-[10px] text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-md border border-amber-500/30 font-semibold block sm:inline-block">
                          Withholding: {med.withholdingSafetyPeriod}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preventive Advice */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.08] text-xs">
                <span className="font-bold text-slate-200 block mb-0.5">Preventive Advice:</span>
                <p className="text-slate-400">{consultation.prescription.preventiveAdvice}</p>
                <div className="mt-2 text-emerald-400 font-semibold text-[11px] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Scheduled Follow-up Review: {consultation.prescription.followUpDate}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Live Chat & Case Metadata */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="srot-glass-card rounded-2xl p-5 border border-white/[0.08] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Case Verification Details
            </h3>

            {/* Specialist */}
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
              <img
                src={consultation.expert.avatar}
                alt={consultation.expert.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-white truncate">{consultation.expert.name}</h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 truncate">{consultation.expert.title}</p>
                <span className="text-[10px] font-mono text-emerald-400 block truncate">
                  {consultation.expert.regNumber}
                </span>
              </div>
            </div>

            {/* Beneficiary */}
            <div className="text-xs space-y-1">
              <span className="text-slate-400 block text-[11px]">Client / Farm Producer:</span>
              <span className="font-bold text-white block">{consultation.farmerOrOwner.name}</span>
              <p className="text-slate-400 text-[11px]">{consultation.farmerOrOwner.location}</p>
              <p className="text-slate-400 text-[11px]">{consultation.farmerOrOwner.phone}</p>
              <p className="text-emerald-400 text-[11px] font-semibold mt-1">
                Asset: {consultation.farmerOrOwner.subjectName} ({consultation.farmerOrOwner.subjectAgeOrStage})
              </p>
            </div>
          </div>

          {/* Interactive Chat Console */}
          <div className="srot-glass-card rounded-2xl border border-white/[0.08] flex flex-col h-[460px]">
            <div className="p-3.5 bg-slate-900 border-b border-white/[0.08] flex items-center justify-between text-xs font-bold text-white">
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
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input box */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/[0.08] flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isCurrentUserExpert
                    ? "Type clinician instructions or questions to patient..."
                    : "Ask doctor about symptoms, spray dosage, reaction..."
                }
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white text-xs focus:outline-none focus:border-emerald-500 placeholder:text-slate-500 font-medium"
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

      {/* DIGITAL CASH MEMO / OFFICIAL RECEIPT MODAL */}
      {isReceiptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md srot-glass-card rounded-3xl border border-white/[0.1] p-6 shadow-2xl space-y-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-400" />
                <h3 className="font-black text-sm uppercase tracking-wider">
                  SROT Official Cash Memo
                </h3>
              </div>
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.05] space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Invoice No:</span>
                  <span className="text-white font-bold">{consultation.caseNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Gateway:</span>
                  <span className="text-pink-400 font-bold">bKash (TrxID: 9X4812K)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="text-slate-300">{formatDate(consultation.createdAt)}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Beneficiary:</span>
                  <strong className="text-white">{consultation.farmerOrOwner.name}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Attending Clinician:</span>
                  <strong className="text-white">{consultation.expert.name}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Council Registration:</span>
                  <strong className="text-emerald-400 font-mono">{consultation.expert.regNumber}</strong>
                </div>
              </div>

              {/* 70/30 Commission Breakdown */}
              <div className="pt-2 border-t border-white/[0.08] space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Specialist Disbursal (70%):</span>
                  <span>{formatCurrency(expertShare)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>SROT Tele-Health Operations (30%):</span>
                  <span>{formatCurrency(srotShare)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-white/[0.06]">
                  <span>Total Paid:</span>
                  <span className="text-emerald-400">{formatCurrency(totalFee)}</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[10px] text-emerald-300 text-center">
              ✓ Tax Compliant Digital Cash Receipt • Tamper-proof QR Validated
            </div>

            <button
              onClick={() => setIsReceiptModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
            >
              Close Memo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
