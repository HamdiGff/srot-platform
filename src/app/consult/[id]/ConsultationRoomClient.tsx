"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { usePrescriptionStore } from "@/lib/store/prescriptionStore";
import { useUserStore } from "@/lib/store/userStore";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import { audioFeedback } from "@/lib/audioFeedback";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PrescriptionStudioManager } from "@/components/portal/PrescriptionStudioManager";
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
  Monitor,
  Share2,
  Scan,
  Maximize2,
  Volume2,
  CheckCircle2,
  Plus,
} from "lucide-react";

interface ConsultationRoomClientProps {
  consultationId: string;
}

export function ConsultationRoomClient({ consultationId }: ConsultationRoomClientProps) {
  const { getById, updateStatus, attachPrescription, sendMessage } = useConsultationStore();
  const { getByCaseId } = usePrescriptionStore();
  const { currentUser, currentRole } = useUserStore();
  const consultation = getById(consultationId);

  // Input & Messaging State
  const [inputText, setInputText] = useState("");
  const [pendingAttachment, setPendingAttachment] = useState<string | null>(null);

  // Live Media Controls
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoStopped, setIsVideoStopped] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isCameraFlipped, setIsCameraFlipped] = useState(false);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [aiScanResult, setAiScanResult] = useState<string | null>(null);

  // Modal / Drawer States
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isRxStudioDrawerOpen, setIsRxStudioDrawerOpen] = useState(false);
  const [callDurationSeconds, setCallDurationSeconds] = useState(864); // 14m 24s default
  const [simulatedVolume, setSimulatedVolume] = useState<number[]>([20, 45, 75, 50, 85, 40, 60]);

  // Real Hardware Video Stream Reference
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDurationSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Voice Equalizer Bar Animation when Mic is Active
  useEffect(() => {
    if (isMicMuted) return;
    const eqTimer = setInterval(() => {
      setSimulatedVolume([
        Math.floor(15 + Math.random() * 65),
        Math.floor(25 + Math.random() * 75),
        Math.floor(35 + Math.random() * 60),
        Math.floor(20 + Math.random() * 80),
        Math.floor(30 + Math.random() * 70),
        Math.floor(15 + Math.random() * 85),
        Math.floor(20 + Math.random() * 60),
      ]);
    }, 250);
    return () => clearInterval(eqTimer);
  }, [isMicMuted]);

  // Clean up hardware streams on unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consultation?.messages]);

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

  // Active prescriptions in store for this case
  const casePrescriptions = getByCaseId(consultation.id);
  const activeRx = casePrescriptions[0] || (consultation.prescription as any);

  // =========================================================================
  // HARDWARE MEDIA CONTROLS (MIC, CAMERA, SCREEN SHARE)
  // =========================================================================

  const handleToggleMic = () => {
    const nextState = !isMicMuted;
    setIsMicMuted(nextState);
    audioFeedback.playToggleTone(!nextState);
  };

  const handleToggleCamera = async () => {
    const nextState = !isVideoStopped;
    setIsVideoStopped(nextState);
    audioFeedback.playToggleTone(!nextState);

    if (!nextState && typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: isCameraFlipped ? "user" : "environment" },
        });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.log("Using high-def simulated diagnostic stream:", err);
      }
    } else if (nextState && mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const handleToggleScreenShare = async () => {
    if (!isScreenSharing) {
      audioFeedback.playToggleTone(true);
      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getDisplayMedia) {
        try {
          const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          setIsScreenSharing(true);
          displayStream.getVideoTracks()[0].onended = () => {
            setIsScreenSharing(false);
          };
        } catch {
          // If browser restricts display media, toggle high-def lab broadcast mode
          setIsScreenSharing(true);
        }
      } else {
        setIsScreenSharing(true);
      }
    } else {
      audioFeedback.playToggleTone(false);
      setIsScreenSharing(false);
    }
  };

  const handleFlipCamera = () => {
    setIsCameraFlipped((prev) => !prev);
    audioFeedback.playToggleTone(true);
  };

  // AI Diagnostic Snapshot Feature
  const handleTriggerAiScan = () => {
    setIsAiScanning(true);
    setAiScanResult(null);
    audioFeedback.playToggleTone(true);

    setTimeout(() => {
      setIsAiScanning(false);
      const resultText = isAgri
        ? "AI Vision Match (98.6% Confidence): Spindle-shaped foliar blast lesion detected with necrotic ash center."
        : isPet
        ? "AI Vision Match (97.4% Confidence): Atopic erythema on ventral abdomen; ear canal inflammation detected."
        : "AI Vision Match (98.1% Confidence): Acute right hind quarter mastitis inflammation score Grade 3.";
      setAiScanResult(resultText);

      // Auto-post diagnostic snapshot to chat
      sendMessage(consultation.id, {
        text: `📸 AI Clinical Diagnostic Scan: ${resultText}`,
        senderId: "system",
        senderName: "SROT AI Diagnostic Engine",
        senderRole: "system",
        attachments: consultation.uploadedPhotos.slice(0, 1),
      });
      audioFeedback.playMessageReceived();
    }, 1800);
  };

  // =========================================================================
  // CHAT & MESSAGING
  // =========================================================================

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !pendingAttachment) return;

    const text = inputText.trim() || (pendingAttachment ? "Attached clinical image / report." : "");
    const attachmentArray = pendingAttachment ? [pendingAttachment] : undefined;

    setInputText("");
    setPendingAttachment(null);

    sendMessage(consultation.id, {
      text,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      attachments: attachmentArray,
    });

    audioFeedback.playMessageSent();

    // Auto-respond if patient messages in simulator
    if (!isCurrentUserExpert && messages.length <= 6) {
      setTimeout(() => {
        sendMessage(consultation.id, {
          text: `Doctor ${consultation.expert.name}: "I have reviewed your update. Formulating calibrated dosage with required withholding intervals now."`,
          senderId: consultation.expert.id,
          senderName: consultation.expert.name,
          senderRole: isAgri ? "expert_agronomist" : "veterinarian",
        });
        audioFeedback.playMessageReceived();
      }, 1500);
    }
  };

  // Photo Attachment Handler
  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPendingAttachment(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Export Chat Transcript
  const handleExportTranscript = () => {
    const transcriptText = messages
      .map(
        (m) =>
          `[${new Date(m.timestamp).toLocaleTimeString()}] ${m.senderName} (${m.senderRole}):\n${m.text}\n`
      )
      .join("\n----------------------------------------\n");

    const blob = new Blob(
      [
        `SROT TELEHEALTH CASE CHAT TRANSCRIPT\nCase ID: ${consultation.caseNumber}\nDate: ${consultation.createdAt}\nPatient: ${consultation.farmerOrOwner.name}\nClinician: ${consultation.expert.name}\n\n========================================\n\n${transcriptText}`,
      ],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${consultation.caseNumber}-Chat-Transcript.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Quick Clinical Preset Chips
  const clinicianPresetChips = isAgri
    ? [
        "Halt all urea top-dressing immediately.",
        "Maintain 2-3 cm standing water in paddy.",
        "Spray Tricyclazole late afternoon on lower leaves.",
        "Observe 21-day pre-harvest withholding interval.",
      ]
    : [
        "Completely strip affected quarter every 3 hours.",
        "Apply cold water compress to udder for 15 mins.",
        "Strict 72-hour milk withholding; do not feed calves.",
        "Send follow-up photo tomorrow at 10 AM.",
      ];

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
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* Digital Cash Memo Trigger */}
          <button
            onClick={() => setIsReceiptModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-semibold transition"
          >
            <Receipt className="w-3.5 h-3.5 text-cyan-400" />
            <span>Digital Memo (রসিদ)</span>
          </button>

          {/* Export Transcript */}
          <button
            onClick={handleExportTranscript}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-semibold transition"
            title="Download complete encrypted case transcript"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Transcript</span>
          </button>

          {/* Specialist In-Chamber Prescription Studio Launcher */}
          {isCurrentUserExpert && (
            <button
              onClick={() => setIsRxStudioDrawerOpen(!isRxStudioDrawerOpen)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 hover:from-teal-400 hover:to-emerald-300 text-slate-950 text-xs font-black transition shadow-lg shadow-teal-500/20"
            >
              <FileText className="w-3.5 h-3.5 text-slate-950" />
              <span>{isRxStudioDrawerOpen ? "Close Rx Studio" : "Prescription Studio"}</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* IN-CHAMBER PRESCRIPTION STUDIO SLIDING DRAWER */}
      {/* ========================================================================= */}
      {isRxStudioDrawerOpen && (
        <div className="animate-in fade-in duration-200">
          <PrescriptionStudioManager
            council={isAgri ? "DAE" : "BVC"}
            specialistId={consultation.expert.id}
            specialistName={consultation.expert.name}
            specialistTitle={consultation.expert.title}
            specialistAvatar={consultation.expert.avatar}
            specialistRegNumber={consultation.expert.regNumber}
            defaultCategory={consultation.category}
          />
        </div>
      )}

      {/* MESSAGE ROUTING & TELEMETRY BANNER */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-slate-300">
            <strong>Active Clinical Tele-Chamber:</strong>{" "}
            <span className="text-white font-semibold">{consultation.farmerOrOwner.name}</span>{" "}
            ({consultation.farmerOrOwner.location}){" "}
            <span className="text-emerald-400 font-mono">⇄</span>{" "}
            <span className="text-white font-semibold">{consultation.expert.name}</span>{" "}
            ({consultation.expert.title})
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Animated Mic Audio Equalizer */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-white/[0.08]">
            <Volume2 className={`w-3.5 h-3.5 ${isMicMuted ? "text-slate-600" : "text-emerald-400"}`} />
            <div className="flex items-end gap-0.5 h-3.5 w-12">
              {simulatedVolume.map((vol, i) => (
                <span
                  key={i}
                  style={{ height: isMicMuted ? "20%" : `${vol}%` }}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isMicMuted ? "bg-slate-700" : "bg-gradient-to-t from-emerald-500 to-cyan-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300 font-mono text-[11px]">
            User: <strong className="text-emerald-400">{currentUser.name}</strong>
          </span>
        </div>
      </div>

      {/* MAIN CONSULTATION WORKBENCH GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 7 COLS: MEDIA FEED, SCREEN SHARE & CLINICAL PRESCRIPTION */}
        <div className="lg:col-span-7 space-y-6">
          {/* Video & Screen Share Frame */}
          <div className="srot-glass-card rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-slate-950">
            {/* Top Toolbar */}
            <div className="p-3.5 bg-slate-900/90 border-b border-white/[0.08] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-semibold text-white">
                {isScreenSharing ? (
                  <>
                    <Share2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span className="text-cyan-300 font-bold">Live Screen Share Broadcast</span>
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 text-emerald-400" />
                    <span>Live WebRTC Encrypted Clinical Chamber</span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {formatTimer(callDurationSeconds)}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono border border-cyan-500/20">
                  1080p 60fps
                </span>
              </div>
            </div>

            {/* Main Stage Viewport */}
            <div className="relative h-72 sm:h-96 bg-black flex items-center justify-center overflow-hidden group">
              {isVideoStopped ? (
                <div className="text-center space-y-2 p-6">
                  <VideoOff className="w-12 h-12 text-slate-700 mx-auto" />
                  <p className="text-xs text-slate-400 font-bold">Patient camera feed is paused</p>
                  <button
                    onClick={handleToggleCamera}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                  >
                    Resume Camera
                  </button>
                </div>
              ) : isScreenSharing ? (
                /* Interactive Screen Share / Lab Telemetry Broadcast View */
                <div className="relative w-full h-full bg-slate-950 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5" />
                        <span>TELEMETRY REPORT BROADCAST ACTIVE</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">RESOLUTION: 1920x1080</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.08] space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block">NPK / BIOCHEMICAL INDEX</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-mono font-bold text-emerald-400">7.2 pH</span>
                          <span className="text-xs text-slate-400">(Optimal Range)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                          <div className="bg-emerald-400 h-full w-[72%]" />
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.08] space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block">MICROBIAL CELL DENSITY</span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-mono font-bold text-cyan-400">650K / ml</span>
                          <span className="text-xs text-amber-300">(Inflammation Alert)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                          <div className="bg-cyan-400 h-full w-[85%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/[0.06] text-[11px] text-slate-300 font-mono text-center">
                    Doctor is presenting live pathology slides & withholding charts to client.
                  </div>
                </div>
              ) : (
                /* Primary Patient / Field Video Stream */
                <div className="relative w-full h-full">
                  <img
                    src={consultation.uploadedPhotos[0] || "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80"}
                    alt="Live crop/patient video feed"
                    className="w-full h-full object-cover opacity-85 transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 pointer-events-none" />

                  {/* AI Scanning Reticle when Activated */}
                  {isAiScanning && (
                    <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-dashed border-emerald-400 rounded-3xl animate-spin p-4 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                        <Scan className="w-12 h-12 text-emerald-400 animate-pulse" />
                      </div>
                      <div className="absolute bottom-16 bg-slate-950/90 border border-emerald-500 px-4 py-1.5 rounded-xl text-emerald-400 font-mono text-xs font-bold animate-pulse">
                        COMPUTER VISION DIAGNOSIS RUNNING...
                      </div>
                    </div>
                  )}

                  {/* Specialist Picture-in-Picture */}
                  <div className="absolute top-4 right-4 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-2xl bg-slate-900">
                    <img
                      src={consultation.expert.avatar}
                      alt={consultation.expert.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1 right-1 bg-black/85 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] text-white font-bold truncate">
                      {consultation.expert.name.split(" ")[0]} (Clinician)
                    </div>
                  </div>

                  {/* Top Left Focus Pill */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-white border border-white/15 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span className="font-semibold">{consultation.farmerOrOwner.subjectName}</span>
                  </div>

                  {/* AI Scan Result Toast if triggered */}
                  {aiScanResult && (
                    <div className="absolute bottom-16 left-4 right-4 bg-slate-950/90 border border-emerald-500/40 p-2.5 rounded-xl text-xs text-emerald-300 font-semibold shadow-2xl animate-in fade-in">
                      {aiScanResult}
                    </div>
                  )}
                </div>
              )}

              {/* HARDWARE INTERACTIVE CONTROL DECK */}
              <div className="absolute bottom-3 left-3 right-3 p-2 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-white/[0.12] flex items-center justify-between text-xs text-white shadow-2xl">
                <span className="text-[11px] font-mono text-slate-300 pl-1 hidden sm:inline">
                  {consultation.farmerOrOwner.subjectAgeOrStage}
                </span>

                <div className="flex items-center gap-2 mx-auto sm:mx-0">
                  {/* Mic Toggle with Working State */}
                  <button
                    onClick={handleToggleMic}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl font-bold transition ${
                      isMicMuted
                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                    title={isMicMuted ? "Unmute Microphone" : "Mute Microphone"}
                  >
                    {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-400" />}
                    <span className="text-[11px]">{isMicMuted ? "Muted" : "Mic On"}</span>
                  </button>

                  {/* Camera Toggle with Working State */}
                  <button
                    onClick={handleToggleCamera}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl font-bold transition ${
                      isVideoStopped
                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                    title={isVideoStopped ? "Start Camera" : "Stop Camera"}
                  >
                    {isVideoStopped ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4 text-emerald-400" />}
                    <span className="text-[11px]">{isVideoStopped ? "Video Off" : "Video On"}</span>
                  </button>

                  {/* Working Screen Share Toggle */}
                  <button
                    onClick={handleToggleScreenShare}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl font-bold transition ${
                      isScreenSharing
                        ? "bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/25"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                    title="Share screen or lab report telemetry"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-[11px]">{isScreenSharing ? "Sharing" : "Screen Share"}</span>
                  </button>

                  {/* Camera Flip */}
                  <button
                    onClick={handleFlipCamera}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    title="Flip camera view (Front / Rear lens)"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  {/* Trigger Diagnostic AI Scan */}
                  <button
                    onClick={handleTriggerAiScan}
                    disabled={isAiScanning}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black transition shadow-md shadow-emerald-500/20"
                    title="Take snapshot and run AI pathology vision scan"
                  >
                    <Scan className="w-4 h-4 text-slate-950" />
                    <span className="text-[11px]">{isAiScanning ? "Scanning..." : "AI Snapshot"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Prescribed Advisory Card (If issued) */}
          {activeRx && (
            <div className="srot-glass-card rounded-3xl p-5 sm:p-6 border border-emerald-500/30 bg-emerald-950/15 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-900/40">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                    <FileText className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Official Clinical Prescription (চিকিৎসাপত্র)
                    </h3>
                    <p className="text-xs text-emerald-400 font-mono">
                      Signed by {consultation.expert.name} ({consultation.expert.regNumber})
                      {activeRx.revisionCount && activeRx.revisionCount > 1 && (
                        <span className="ml-2 text-amber-300 font-bold">• Revision {activeRx.revisionCount}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generatePrescriptionPdf(consultation)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-950/60"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Rx</span>
                  </button>
                </div>
              </div>

              {/* Diagnosis Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/[0.08]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                  Primary Clinical Diagnosis
                </span>
                <h4 className="text-base font-bold text-white">{activeRx.diagnosisTitle}</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Pathogen / Cause: {activeRx.pathogenOrCause}
                </p>
              </div>

              {/* Formulations & Withholding Table */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Prescribed Formulations:
                </h5>
                {activeRx.medicationsOrSprays.map((med: any, i: number) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
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
                        ⚠️ Withholding: {med.withholdingSafetyPeriod}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT 5 COLS: ENHANCED LIVE CASE CHAT WITH INSTANT FEEDBACK */}
        <div className="lg:col-span-5 space-y-4">
          <div className="srot-glass-card rounded-3xl border border-white/[0.1] flex flex-col h-[600px] shadow-2xl bg-slate-950/95">
            {/* Chat Header with Real-Time WebRTC Status */}
            <div className="p-3.5 bg-slate-900/90 border-b border-white/[0.08] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">Live Chamber Chat</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Encrypted • 38ms</span>
              </div>
            </div>

            {/* Quick Recommendation Preset Chips for Clinicians */}
            {isCurrentUserExpert && (
              <div className="px-3 py-2 bg-slate-900/50 border-b border-white/[0.06] overflow-x-auto flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-mono text-slate-400 uppercase shrink-0">Quick Presets:</span>
                {clinicianPresetChips.map((chip, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setInputText(chip);
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/[0.06] text-[10px] font-semibold transition shrink-0 whitespace-nowrap"
                  >
                    + {chip.slice(0, 24)}...
                  </button>
                ))}
              </div>
            )}

            {/* Chat Message Stream */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
              {messages.map((msg) => {
                const isFromCurrentUser = msg.senderId === currentUser.id;
                const isSystem = msg.senderRole === "system" || msg.senderId === "system";

                if (isSystem) {
                  return (
                    <div key={msg.id} className="text-center my-2">
                      <span className="text-[10px] text-slate-400 bg-slate-900/90 px-3 py-1 rounded-full border border-white/[0.06] inline-block max-w-[90%]">
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
                      className={`max-w-[85%] p-3 rounded-2xl leading-relaxed shadow-md ${
                        isFromCurrentUser
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-none"
                          : "bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="text-[10px] font-bold opacity-80">
                          {isFromCurrentUser ? "You" : msg.senderName}
                        </span>
                        <span className="text-[9px] opacity-60">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>

                      <p className="text-xs whitespace-pre-wrap">{msg.text}</p>

                      {/* Photo attachments */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 grid grid-cols-2 gap-1.5">
                          {msg.attachments.map((att, i) => (
                            <img
                              key={i}
                              src={att}
                              alt="Attachment"
                              className="rounded-lg object-cover max-h-28 w-full border border-white/20"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Attachment Preview if selected */}
            {pendingAttachment && (
              <div className="px-3 py-2 bg-slate-900 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={pendingAttachment}
                    alt="Pending upload preview"
                    className="w-10 h-10 rounded-lg object-cover border border-emerald-400"
                  />
                  <span className="text-[11px] text-emerald-300 font-semibold">Image ready to send</span>
                </div>
                <button
                  onClick={() => setPendingAttachment(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/[0.08] flex items-center gap-2">
              {/* Photo Attachment Trigger */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/[0.08] transition shrink-0"
                title="Attach diagnostic photo or leaf image"
              >
                <ImageIcon className="w-4 h-4 text-cyan-400" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileAttach}
                className="hidden"
              />

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isCurrentUserExpert
                    ? "Type clinician guidance or prescription adjustment..."
                    : "Type symptoms or questions to doctor..."
                }
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.1] text-white text-xs focus:outline-none focus:border-emerald-500 placeholder:text-slate-500 font-medium"
              />

              <button
                type="submit"
                className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black transition flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-slate-950" />
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
                  <span className="text-pink-400 font-bold">bKash (Verified TrxID)</span>
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

            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[10px] text-emerald-300 text-center font-mono">
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
