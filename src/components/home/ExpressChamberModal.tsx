"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useUserStore } from "@/lib/store/userStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { PlatformExpert } from "@/data/mockExperts";
import { formatCurrency } from "@/lib/utils";
import {
  X,
  ShieldCheck,
  Video,
  Phone,
  Camera,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Loader2,
  Lock,
} from "lucide-react";

interface ExpressChamberModalProps {
  isOpen: boolean;
  onClose: () => void;
  sampleData: {
    category: "agri" | "veterinary" | "poultry" | "fisheries" | "pet";
    subjectName: string;
    symptomName: string;
    pathogen: string;
    immediateAction: string;
    withholding: string;
    image: string;
    doctor: PlatformExpert;
  } | null;
}

export function ExpressChamberModal({
  isOpen,
  onClose,
  sampleData,
}: ExpressChamberModalProps) {
  const router = useRouter();
  const { currentUser } = useUserStore();
  const { addConsultation } = useConsultationStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [channel, setChannel] = useState<"video" | "audio" | "photo_instant">("video");
  const [paymentWallet, setPaymentWallet] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phone || "01712-345678");

  if (!isOpen || !sampleData) return null;

  const { doctor, category, subjectName, symptomName, pathogen, immediateAction, image } = sampleData;

  const consultationFee = doctor.feePerConsultation || 200;

  const handleLaunchInstantChamber = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const clientRole =
      category === "pet"
        ? "pet_owner"
        : category === "veterinary"
        ? "livestock_farmer"
        : "farmer";

    const serviceId =
      category === "agri"
        ? "crop-disease"
        : category === "veterinary"
        ? "bovine-mastitis"
        : category === "poultry"
        ? "poultry-flock-care"
        : category === "fisheries"
        ? "pond-water-quality"
        : "companion-pet-telehealth";

    const serviceName =
      category === "agri"
        ? "Crop Disease Diagnostics"
        : category === "veterinary"
        ? "Bovine Clinical Telehealth"
        : category === "poultry"
        ? "Poultry Flock Biosecurity"
        : category === "fisheries"
        ? "Aquaculture Triage"
        : "Companion Pet Consultation";

    const newRecord = addConsultation({
      category,
      serviceId,
      serviceName,
      channel,
      farmerOrOwner: {
        id: currentUser.id,
        name: currentUser.name,
        role: clientRole,
        phone: phoneNumber,
        location: currentUser.location || "Dhaka, Bangladesh",
        subjectName,
        subjectAgeOrStage: "Active Field Stage",
        areaOrHerdSize: "Standard Acreage/Unit",
      },
      expert: {
        id: doctor.id,
        name: doctor.name,
        title: doctor.title,
        avatar: doctor.avatar,
        regNumber: doctor.registrationNumber,
      },
      symptomsDescription: `Instant Express Triage: ${symptomName} (${pathogen}). Protocol: ${immediateAction}`,
      uploadedPhotos: [image],
      scheduledDateTime: new Date().toISOString(),
      feePaid: consultationFee,
    });

    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      router.push(`/consult/${newRecord.id}`);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#090f19] border border-emerald-500/30 p-5 sm:p-7 shadow-2xl text-slate-100 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08] transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 pb-4 border-b border-white/[0.08]">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white">
                {isBn ? "এক্সপ্রেস কনসালটেশন চেম্বার" : "Express Tele-Advisory Chamber"}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold animate-pulse">
                60s Express
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isBn ? "ডাক্তার প্রস্তুত আছেন • সরাসরি চেম্বারে যুক্ত হোন" : "Attending specialist is on-call • Instant room token"}
            </p>
          </div>
        </div>

        {/* Attending Doctor Profile Card */}
        <div className="my-4 p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-12 h-12 rounded-xl object-cover border border-emerald-400/40"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-white truncate">{doctor.name}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-400 truncate">{doctor.title}</p>
              <p className="text-[10px] font-mono text-emerald-400 truncate">
                {doctor.registrationNumber}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-400 block">{isBn ? "পরামর্শ ফি" : "Total Fee"}</span>
            <span className="text-base font-black text-white font-mono">{formatCurrency(consultationFee)}</span>
          </div>
        </div>

        {/* Triage Summary Badge */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.06] text-xs space-y-1 mb-4">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400">{isBn ? "চিহ্নিত রোগ/লক্ষণ:" : "Identified Target:"}</span>
            <span className="font-bold text-emerald-300">{symptomName}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400">{isBn ? "নমুনা বিষয়:" : "Subject:"}</span>
            <span className="font-medium text-white truncate max-w-[200px]">{subjectName}</span>
          </div>
        </div>

        <form onSubmit={handleLaunchInstantChamber} className="space-y-4">
          {/* Consultation Channel Selection */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              {isBn ? "পরামর্শের মাধ্যম নির্বাচন করুন:" : "Choose Consultation Medium:"}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "video", label: isBn ? "ভিডিও কল" : "Live Video", icon: Video, sub: isBn ? "এইচডি ভিডিও" : "HD Visual" },
                { id: "audio", label: isBn ? "ভয়েস কল" : "Voice Audio", icon: Phone, sub: isBn ? "লো-ব্যান্ডউইথ" : "Low Data" },
                { id: "photo_instant", label: isBn ? "ফটো ট্রায়াজ" : "Photo Chat", icon: Camera, sub: isBn ? "মেসেজ ও ফটো" : "Asynchronous" },
              ].map((c) => {
                const Icon = c.icon;
                const isSelected = channel === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setChannel(c.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? "bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-500/15"
                        : "bg-slate-950/60 border-white/[0.06] text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? "text-emerald-400" : ""}`} />
                    <span className="text-xs font-bold">{c.label}</span>
                    <span className="text-[9px] text-slate-500">{c.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Contact Phone */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              {isBn ? "রোগী / খামারির মোবাইল নম্বর:" : "Mobile / Contact Number:"}
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.08] text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              placeholder="017XX-XXXXXX"
            />
          </div>

          {/* 1-Click Mobile Wallet Selection */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              {isBn ? "তাত্ক্ষণিক পেমেন্ট মেথড (টোকেন ফি):" : "Instant Mobile Wallet Checkout:"}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "bkash", name: "bKash", color: "text-pink-400 border-pink-500/30" },
                { id: "nagad", name: "Nagad", color: "text-amber-400 border-amber-500/30" },
                { id: "rocket", name: "Rocket", color: "text-purple-400 border-purple-500/30" },
              ].map((w) => {
                const isSelected = paymentWallet === w.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setPaymentWallet(w.id as any)}
                    className={`py-2 px-3 rounded-xl border text-xs font-black transition flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? "bg-slate-900 border-emerald-400 text-white shadow-sm ring-1 ring-emerald-400"
                        : "bg-slate-950 border-white/[0.06] text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className={w.color}>{w.name}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>{isBn ? "চেম্বার পাস তৈরি হচ্ছে..." : "Connecting to Specialist Chamber..."}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>
                  {isBn
                    ? `ফি প্রদান ও চেম্বারে প্রবেশ (${formatCurrency(consultationFee)}) →`
                    : `Confirm & Enter Live Chamber (${formatCurrency(consultationFee)}) →`}
                </span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>{isBn ? "এনক্রিপ্টেড ও বিভিসি/ডিএই কাউন্সিল সত্যায়িত ডিজিটাল প্রেসক্রিপশন নিশ্চিত" : "Encrypted 256-bit session • BVC/DAE Council Certified Rx Guaranteed"}</span>
          </p>
        </form>
      </div>
    </div>
  );
}
