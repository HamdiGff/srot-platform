"use client";

import React from "react";
import Link from "next/link";
import { ConsultationRecord } from "@/data/mockConsultations";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import { formatDate } from "@/lib/utils";
import {
  FileText,
  Download,
  Video,
  Phone,
  Camera,
  MapPin,
  CheckCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  Wheat,
  Milk,
  HeartHandshake,
} from "lucide-react";

interface ConsultationCardProps {
  consultation: ConsultationRecord;
}

export function ConsultationCard({ consultation }: ConsultationCardProps) {
  const isAgri = consultation.category === "agri";
  const isPet = consultation.category === "pet";

  const getStatusBadge = (status: ConsultationRecord["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
            <CheckCircle className="w-3 h-3" /> Resolved & Rx Issued
          </span>
        );
      case "pending_review":
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3 animate-spin" /> Pending Review
          </span>
        );
      case "scheduled":
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
            <Video className="w-3 h-3" /> Scheduled Live
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
            {status}
          </span>
        );
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "video":
        return (
          <span title="Video Consultation">
            <Video className="w-3.5 h-3.5 text-cyan-400" />
          </span>
        );
      case "audio":
        return (
          <span title="Audio Call">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
          </span>
        );
      case "photo_instant":
        return (
          <span title="Photo Triage">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
          </span>
        );
      case "field_visit":
        return (
          <span title="Field Visit">
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
          </span>
        );
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="srot-glass-card rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-md">
            {consultation.caseNumber}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            {getChannelIcon(consultation.channel)}
            <span className="capitalize">{consultation.channel.replace("_", " ")}</span>
          </div>
        </div>

        {getStatusBadge(consultation.status)}
      </div>

      {/* Middle: Subject & Specialist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        {/* Subject details */}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
            {isPet ? "Patient / Pet Details" : "Crop / Herd Details"}
          </span>
          <div className="flex items-start gap-2">
            <span className="p-1 rounded bg-slate-800 mt-0.5">
              {isAgri ? (
                <Wheat className="w-4 h-4 text-emerald-400" />
              ) : isPet ? (
                <HeartHandshake className="w-4 h-4 text-amber-400" />
              ) : (
                <Milk className="w-4 h-4 text-cyan-400" />
              )}
            </span>
            <div>
              <h4 className="text-sm font-bold text-white">
                {consultation.farmerOrOwner.subjectName}
              </h4>
              <p className="text-xs text-slate-300">
                {consultation.farmerOrOwner.subjectAgeOrStage} ({consultation.farmerOrOwner.areaOrHerdSize})
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Client: {consultation.farmerOrOwner.name} • {consultation.farmerOrOwner.location}
              </p>
            </div>
          </div>
        </div>

        {/* Expert details */}
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
            Assigned Specialist
          </span>
          <div className="flex items-center gap-2.5">
            <img
              src={consultation.expert.avatar}
              alt={consultation.expert.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-700"
            />
            <div>
              <div className="flex items-center gap-1">
                <h5 className="text-xs font-bold text-white">{consultation.expert.name}</h5>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400">{consultation.expert.title}</p>
              <p className="text-[10px] text-slate-400 font-mono">{consultation.expert.regNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis snippet if available */}
      {consultation.prescription && (
        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-300">
              Rx Diagnosis: {consultation.prescription.diagnosisTitle}
            </span>
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-900/50 px-2 py-0.5 rounded">
              Severity: {consultation.prescription.severity}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">
            {consultation.prescription.treatmentSteps[0]}
          </p>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
        <span className="text-slate-400">
          Created: {formatDate(consultation.createdAt)}
        </span>

        <div className="flex items-center gap-2">
          {consultation.prescription && (
            <button
              onClick={() => generatePrescriptionPdf(consultation)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md shadow-emerald-950/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Rx (PDF)</span>
            </button>
          )}

          <Link
            href={`/consult/${consultation.id}`}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition"
          >
            <span>Open Room</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
