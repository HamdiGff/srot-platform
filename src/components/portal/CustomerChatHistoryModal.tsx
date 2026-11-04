"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ConsultationRecord } from "@/data/mockConsultations";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import { formatDate } from "@/lib/utils";
import {
  X,
  MessageSquare,
  FileText,
  Download,
  ShieldCheck,
  ExternalLink,
  Clock,
  Send,
  User,
} from "lucide-react";

interface CustomerChatHistoryModalProps {
  consultation: ConsultationRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage?: (text: string) => void;
}

export function CustomerChatHistoryModal({
  consultation,
  isOpen,
  onClose,
  onSendMessage,
}: CustomerChatHistoryModalProps) {
  const [replyText, setReplyText] = useState("");

  if (!isOpen || !consultation) return null;

  const messages = consultation.messages || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !onSendMessage) return;
    onSendMessage(replyText.trim());
    setReplyText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl srot-glass-card rounded-3xl border border-white/[0.1] shadow-2xl bg-[#070d16] flex flex-col max-h-[85vh] overflow-hidden text-white">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-white/[0.08] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-emerald-400">
                {consultation.caseNumber}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300 font-semibold">
                {consultation.serviceName}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white mt-0.5">
              Doctor Consultation Chat & Clinical Transcript
            </h3>
            <p className="text-[11px] text-slate-400">
              Attending: <strong>{consultation.expert.name}</strong> ({consultation.expert.title})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/consult/${consultation.id}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition"
            >
              <span>Live Chamber</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Doctor's Prescription Strip if Available */}
        {consultation.prescription && (
          <div className="p-3 bg-emerald-950/40 border-b border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white">
                  Prescription: {consultation.prescription.diagnosisTitle}
                </span>
                <span className="text-[11px] text-amber-300 ml-2 font-mono">
                  (Withholding: {consultation.prescription.medicationsOrSprays[0]?.withholdingSafetyPeriod})
                </span>
              </div>
            </div>

            <button
              onClick={() => generatePrescriptionPdf(consultation)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shrink-0"
            >
              <Download className="w-3 h-3" />
              <span>Download PDF</span>
            </button>
          </div>
        )}

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 text-xs bg-slate-950/60">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No chat messages logged in this consultation yet.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isSystem = msg.senderRole === "system";
              const isDoctor =
                msg.senderRole === "expert_agronomist" || msg.senderRole === "veterinarian";

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
                  className={`flex flex-col ${isDoctor ? "items-start" : "items-end"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed shadow-md ${
                      isDoctor
                        ? "bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none"
                        : "bg-emerald-600 text-white rounded-tr-none"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="text-[10px] font-bold opacity-80 flex items-center gap-1">
                        {isDoctor && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
                        {msg.senderName}
                      </span>
                      <span className="text-[9px] opacity-60">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>

                    <p className="text-xs whitespace-pre-wrap">{msg.text}</p>

                    {/* Shared Photos */}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 gap-1.5">
                        {msg.attachments.map((att, i) => (
                          <img
                            key={i}
                            src={att}
                            alt="Attachment"
                            className="rounded-lg object-cover max-h-32 w-full border border-white/20"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Follow-up Message Input */}
        {onSendMessage && (
          <form onSubmit={handleSend} className="p-3 bg-slate-900/90 border-t border-white/[0.08] flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Ask doctor a follow-up question..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white text-xs focus:outline-none focus:border-emerald-500 placeholder:text-slate-500 font-medium"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4 text-slate-950" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
