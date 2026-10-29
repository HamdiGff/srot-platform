"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { ConsultationCard } from "@/components/cards/ConsultationCard";
import { FarmerInvoiceModal } from "@/components/features/FarmerInvoiceModal";
import { FarmHealthPackages } from "@/components/features/FarmHealthPackages";
import { FarmRecordsDashboard } from "@/components/features/FarmRecordsDashboard";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Wheat,
  Milk,
  HeartHandshake,
  Plus,
  CalendarCheck,
  AlertTriangle,
  FileCheck2,
  MapPin,
  Phone,
  ShieldCheck,
  ExternalLink,
  CreditCard,
  CheckCircle2,
  Receipt,
  FileText,
  Sparkles,
  Package,
} from "lucide-react";

export default function FarmerPortalPage() {
  const { currentUser, currentRole, openRoleModal } = useUserStore();
  const { getByUserRole } = useConsultationStore();

  const userConsultations = getByUserRole(currentRole);
  const [selectedInvoiceCase, setSelectedInvoiceCase] = useState<any>(null);
  const totalPaid = userConsultations.reduce((sum, c) => sum + (c.feePaid || 300), 0);

  return (
    <div className="w-full srot-glow-mesh py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Profile Overview Header */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-xl"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {currentUser.roleLabel}
              </span>
              <button
                onClick={openRoleModal}
                className="text-xs text-slate-400 hover:text-white underline underline-offset-2 transition"
              >
                Switch Role Persona
              </button>
            </div>
            <h1 className="text-2xl font-black text-white">{currentUser.name}</h1>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentUser.location}</span>
              <span>•</span>
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.phone}</span>
            </p>
          </div>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/consult"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-950/60"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book New Consultation</span>
          </Link>
        </div>
      </div>

      {/* 2. ACTIVE FARM HEALTH PACKAGE CARD (STEP 4) */}
      <div id="packages" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-[#0c1824] border border-emerald-500/30 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>সক্রিয় সদস্যপদ (Active Subscription)</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: SROT-FH-2026-8910</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>বেসিক খামার হেলথ প্যাকেজ (Basic Farm Health)</span>
              <span className="text-sm font-semibold text-emerald-400">৳১৯৯/মাস</span>
            </h3>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              আপনার খামারের সকল ফসল ও গবাদিপশুর জন্য ডিজিটাল বিশেষজ্ঞ কেয়ার সক্রিয় রয়েছে। প্রতি মাসে ২টি ফ্রি কনসালটেশন কোটা এবং উপজেলাভিত্তিক ক্ষতিকর বালাই ও রোগ সতর্কতা নোটিফিকেশন চালু আছে।
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>কোটা: <strong className="text-emerald-300">২টির মধ্যে ২টেই অবশিষ্ট</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>পরবর্তী নবায়ন: <strong className="text-slate-200">২০ নভেম্বর ২০২৬</strong> (বিকাশ অটো-রিনিউ)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>SMS সতর্কবার্তা: <strong className="text-slate-200">সক্রিয় (বগুড়া / রাজশাহী)</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <a
              href="#explore-packages"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs text-center transition hover:scale-105 shadow-md shadow-emerald-500/20"
            >
              প্রিমিয়ামে আপগ্রেড করুন (৳৪৯৯)
            </a>
            <Link
              href="/consult"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center border border-white/[0.08] transition"
            >
              কোটা ব্যবহার করে পরামর্শ নিন
            </Link>
          </div>
        </div>
      </div>

      {/* 3. FARM MANAGEMENT & ANIMAL HEALTH RECORDS (BLUEPRINT MODULES 6 & 7) */}
      <FarmRecordsDashboard />

      {/* Consultations & Rx History */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">
            Consultation Cases & Prescriptions ({userConsultations.length})
          </h2>
          <p className="text-xs text-slate-400">
            Real-time status, live triage room passes, and downloadable official prescriptions.
          </p>
        </div>

        {userConsultations.length > 0 ? (
          <div className="space-y-4">
            {userConsultations.map((c) => (
              <ConsultationCard key={c.id} consultation={c} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
            <p className="text-sm">No consultations found for this persona.</p>
            <Link
              href="/consult"
              className="inline-block mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              Book First Consultation
            </Link>
          </div>
        )}
      </div>

      {/* 3. Billing & Digital Invoices Section */}
      <div className="pt-6 border-t border-white/[0.08] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-400" />
              <span>লেনদেন ও ডিজিটাল মানি রসিদ (Payment Receipts & Invoices)</span>
            </h2>
            <p className="text-xs text-slate-400">
              বিকাশ, নগদ ও রকেটের মাধ্যমে সম্পন্ন হওয়া প্রতিটি পরামর্শের অনুমোদিত ক্যাশ মেমো ও প্রেসক্রিপশন টোকেন।
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-white/[0.08] flex items-center gap-3">
            <span className="text-xs text-slate-400">মোট পরিশোধিত:</span>
            <span className="text-base font-black text-emerald-400 font-mono">
              {formatCurrency(totalPaid)}
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-[#090f19] border border-white/[0.08] overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-[11px] font-bold border-b border-white/[0.06]">
              <tr>
                <th className="py-3 px-4">রসিদ / কেস নম্বর</th>
                <th className="py-3 px-4">পরামর্শক চিকিৎসক</th>
                <th className="py-3 px-4">সেবা</th>
                <th className="py-3 px-4 text-right">পরিশোধিত ফি</th>
                <th className="py-3 px-4 text-center">ইনভয়েস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {userConsultations.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-4 font-mono font-bold text-white">
                    {c.caseNumber}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-200">
                    {c.expert.name}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {c.serviceName}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                    {formatCurrency(c.feePaid || 300)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedInvoiceCase(c)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-[11px] transition"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>রসিদ দেখুন</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Explore & Upgrade Farm Health Subscription Plans */}
      <div id="explore-packages" className="pt-8 border-t border-white/[0.08]">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" />
            <span>অন্যান্য প্যাকেজ ও সাবস্ক্রিপশন প্ল্যানসমূহ</span>
          </h2>
          <p className="text-xs text-slate-400">
            খামারের বৃদ্ধির সাথে সাথে আপনার প্রয়োজনীয় প্ল্যান পরিবর্তন বা আপগ্রেড করুন।
          </p>
        </div>
        <FarmHealthPackages />
      </div>

      {/* Invoice Modal */}
      <FarmerInvoiceModal
        isOpen={!!selectedInvoiceCase}
        onClose={() => setSelectedInvoiceCase(null)}
        consultation={selectedInvoiceCase}
      />
    </div>
  );
}
