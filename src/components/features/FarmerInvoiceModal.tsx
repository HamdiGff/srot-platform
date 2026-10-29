"use client";

import React from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  QrCode,
  FileCheck2,
} from "lucide-react";

interface FarmerInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultation: {
    id: string;
    caseNumber: string;
    serviceName: string;
    channel: string;
    scheduledDateTime: string;
    feePaid: number;
    farmerOrOwner: {
      name: string;
      phone: string;
      location: string;
      subjectName: string;
    };
    expert: {
      name: string;
      title: string;
      regNumber: string;
    };
  } | null;
}

export function FarmerInvoiceModal({
  isOpen,
  onClose,
  consultation,
}: FarmerInvoiceModalProps) {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  if (!isOpen || !consultation) return null;

  const fee = consultation.feePaid || 300;
  const doctorPart = Math.round(fee * 0.7);
  const srotPart = fee - doctorPart;
  const invoiceNumber = `INV-${consultation.caseNumber.replace("CASE-", "")}-${Date.now().toString().slice(-4)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090f19] border border-white/[0.08] p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6">
        {/* Action Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4" />
            <span>{isBn ? "অফিসিয়াল পেমেন্ট রসিদ ও ইনভয়েস" : "Official Digital Payment Receipt"}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
              title="Print Receipt"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isBn ? "প্রিন্ট করুন" : "Print"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div className="rounded-2xl bg-[#060a12] border border-white/[0.08] p-6 sm:p-8 space-y-6 print:bg-white print:text-black">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white">SROT Platform</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PAID
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isBn
                  ? "ডিজিটাল কৃষি ও প্রাণিসম্পদ স্বাস্থ্য প্ল্যাটফর্ম (বাংলাদেশ)"
                  : "Digital Agriculture & Veterinary Tele-Health Network BD"}
              </p>
            </div>

            <div className="text-left sm:text-right text-xs">
              <span className="font-mono font-bold text-slate-200 block">
                {invoiceNumber}
              </span>
              <span className="text-slate-400 text-[11px] block">
                {isBn ? "তারিখ: " : "Date: "}
                {formatDate(consultation.scheduledDateTime)}
              </span>
            </div>
          </div>

          {/* Client & Doctor 2-Column Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.04]">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                {isBn ? "খামারি / গ্রাহক তথ্য:" : "Billed To (Client):"}
              </span>
              <strong className="text-white text-sm block">
                {consultation.farmerOrOwner.name}
              </strong>
              <span className="text-slate-300 block">{consultation.farmerOrOwner.location}</span>
              <span className="text-slate-400 block font-mono">{consultation.farmerOrOwner.phone}</span>
              <span className="text-emerald-400 text-[11px] mt-1 block">
                {isBn ? "বিষয়: " : "Subject: "}
                {consultation.farmerOrOwner.subjectName}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.04]">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                {isBn ? "পরামর্শক চিকিৎসক:" : "Attending Clinician:"}
              </span>
              <strong className="text-white text-sm block">
                {consultation.expert.name}
              </strong>
              <span className="text-slate-300 block">{consultation.expert.title}</span>
              <span className="text-cyan-400 font-mono text-[11px] block">
                {consultation.expert.regNumber}
              </span>
              <span className="text-slate-400 text-[11px] mt-1 block capitalize">
                {isBn ? "মাধ্যম: " : "Channel: "}
                {consultation.channel.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-white/[0.06] rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold">
                <tr>
                  <th className="py-2.5 px-4">{isBn ? "সেবার বিবরণ" : "Service Description"}</th>
                  <th className="py-2.5 px-4 text-right">{isBn ? "শেয়ার হার" : "Ratio"}</th>
                  <th className="py-2.5 px-4 text-right">{isBn ? "পরিমাণ" : "Amount"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <tr>
                  <td className="py-2.5 px-4">
                    <strong className="text-white block">{consultation.serviceName}</strong>
                    <span className="text-[10px] text-slate-400">
                      {isBn ? "বিশেষজ্ঞ ডায়াগনোসিস ও প্রেসক্রিপশন ফি" : "Clinical evaluation & digital Rx fee"}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-400 font-mono">70%</td>
                  <td className="py-2.5 px-4 text-right text-white font-mono font-bold">
                    {formatCurrency(doctorPart)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">
                    <strong className="text-white block">
                      {isBn ? "এসআরওটি টেলি-হেলথ প্ল্যাটফর্ম ফি" : "SROT Platform & Encrypted Channel"}
                    </strong>
                    <span className="text-[10px] text-slate-400">
                      {isBn ? "কিউআর ভেরিফিকেশন, সার্ভার ও ৪৮ ঘণ্টা ফলো-আপ" : "QR verification & 48h active follow-up"}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right text-slate-400 font-mono">30%</td>
                  <td className="py-2.5 px-4 text-right text-white font-mono font-bold">
                    {formatCurrency(srotPart)}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-950/80 border-t border-white/[0.08]">
                <tr>
                  <td colSpan={2} className="py-3 px-4 font-bold text-white text-right">
                    {isBn ? "সর্বমোট পরিশোধিত (Paid):" : "Total Paid Amount:"}
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-400 font-black text-sm font-mono">
                    {formatCurrency(fee)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Verification Stamp & QR Code */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white text-slate-950 shrink-0">
                <QrCode className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  {isBn ? "ডিজিটাল ভেরিফিকেশন টোকেন" : "Digital Verification Token"}
                </span>
                <span className="font-mono text-[11px] text-slate-200">
                  AUTH-VERIFIED-{consultation.id}
                </span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">
                  ✓ bKash MFS Secured Gateway Settlement
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">
                {isBn ? "হেল্পলাইন: ১৬১২৩" : "Helpline: 16123"}
              </span>
              <span className="text-[10px] text-slate-500 block">
                support@srot.com.bd
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
