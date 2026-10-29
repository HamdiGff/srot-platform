"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { ConsultationCard } from "@/components/cards/ConsultationCard";
import { FarmerInvoiceModal } from "@/components/features/FarmerInvoiceModal";
import { FarmHealthPackages } from "@/components/features/FarmHealthPackages";
import { FarmRecordsDashboard } from "@/components/features/FarmRecordsDashboard";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
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
  MessageSquare,
  Download,
  Stethoscope,
  Heart,
  Activity,
  Calculator,
} from "lucide-react";

export default function FarmerPortalPage() {
  const { currentUser, currentRole, openRoleModal } = useUserStore();
  const { getByUserRole } = useConsultationStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const userConsultations = getByUserRole(currentRole, currentUser.id);
  const [selectedInvoiceCase, setSelectedInvoiceCase] = useState<any>(null);
  const totalPaid = userConsultations.reduce((sum, c) => sum + (c.feePaid || 300), 0);

  const isPetParent = currentRole === "pet_owner";
  const isDairyFarmer = currentRole === "livestock_farmer";
  const isCropFarmer = currentRole === "farmer";

  return (
    <div className="w-full srot-glow-mesh py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Profile Overview Header */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500/80 shadow-xl"
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
                Switch Account / Role
              </button>
            </div>
            <h1 className="text-2xl font-black text-white">{currentUser.name}</h1>
            <p className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentUser.location}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono">{currentUser.phone}</span>
              </span>
            </p>
          </div>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/consult"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{isBn ? "নতুন ডাক্তারের পরামর্শ নিন" : "Book New Consultation"}</span>
          </Link>
        </div>
      </div>

      {/* SPECIALIZED PET OWNER VIEW (IF LOGGED IN AS PET PARENT) */}
      {isPetParent && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-pink-950/30 via-slate-900 to-slate-950 border border-pink-500/30 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">
                  Companion Pet Health Passport & Digital Cards
                </h2>
                <p className="text-xs text-slate-300">
                  Track vaccination dates, deworming cycles, and 24/7 small animal vet tele-triage.
                </p>
              </div>
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/30 self-start sm:self-auto">
              2 Registered Pets Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pet Card 1 */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.08] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80"
                  alt="Max"
                  className="w-14 h-14 rounded-xl object-cover border border-white/[0.1]"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Max (গোল্ডেন রিট্রিভার)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                      3.5 Yrs
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">Weight: 31.5 kg • Microchip #BD-PET-9912</p>
                  <p className="text-[11px] text-emerald-400 mt-1 font-semibold">
                    ✓ Rabies & DHPP Valid until Dec 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Pet Card 2 */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.08] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80"
                  alt="Cleo"
                  className="w-14 h-14 rounded-xl object-cover border border-white/[0.1]"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Cleo (ব্রিটিশ শর্টহেয়ার বিড়াল)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                      2 Yrs
                    </span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">Weight: 4.2 kg • Indoor Dewormed</p>
                  <p className="text-[11px] text-amber-400 mt-1 font-semibold">
                    ⚠ Next Deworming Due: 15 Nov 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ACTIVE FARM HEALTH PACKAGE CARD (STEP 4) */}
      <div
        id="packages"
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-[#0c1824] border border-emerald-500/30 relative overflow-hidden shadow-xl"
      >
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
                <span>SMS সতর্কবার্তা: <strong className="text-slate-200">সক্রিয় ({currentUser.district || "বগুড়া"})</strong></span>
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

      {/* 3. FARM MANAGEMENT & ANIMAL HEALTH RECORDS (BLUEPRINT MODULES 6 & 7) - For Crop & Livestock */}
      {!isPetParent && <FarmRecordsDashboard />}

      {/* 4. LIVE TELE-CONSULTATIONS & ACTIVE DOCTOR MESSAGES */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>
                {isBn
                  ? `সক্রিয় টেলি-পরামর্শ ও ডাক্তারের মেসেজ চেম্বার (${userConsultations.length})`
                  : `Active Consultations & Doctor Tele-Chambers (${userConsultations.length})`}
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {isBn
                ? "প্রত্যেকটি পরামর্শ সরাসরি নিযুক্ত বিশেষজ্ঞ চিকিৎসকের চেম্বারের সাথে সংযুক্ত। মেসেজ পাঠান এবং প্রেসক্রিপশন ডাউনলোড করুন।"
                : "Each consultation links directly to your assigned doctor's desk. Exchange live messages and download certified prescriptions."}
            </p>
          </div>

          <Link
            href="/consult"
            className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold self-start sm:self-auto"
          >
            <span>+ {isBn ? "নতুন টিকিট তৈরি করুন" : "New Consultation Ticket"}</span>
          </Link>
        </div>

        {userConsultations.length > 0 ? (
          <div className="space-y-4">
            {userConsultations.map((c) => {
              const lastMsg = c.messages && c.messages.length > 0 ? c.messages[c.messages.length - 1] : null;

              return (
                <div
                  key={c.id}
                  className="srot-glass-card rounded-2xl p-5 border border-slate-800 space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Doctor & Case Info */}
                    <div className="flex items-start sm:items-center gap-3.5">
                      <img
                        src={c.expert.avatar}
                        alt={c.expert.name}
                        className="w-12 h-12 rounded-xl object-cover border border-emerald-500/40 shrink-0"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="font-mono text-xs font-bold text-emerald-400">
                            {c.caseNumber}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-[11px] text-slate-400">{formatDate(c.createdAt)}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              c.status === "completed"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse"
                            }`}
                          >
                            {c.status === "completed" ? "Prescription Ready" : "In Specialist Review"}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{c.serviceName}</span>
                          <span className="text-xs text-slate-400 font-normal">
                            ({c.farmerOrOwner.subjectName})
                          </span>
                        </h3>

                        <p className="text-xs text-slate-300">
                          Assigned Clinician: <strong className="text-white">{c.expert.name}</strong> •{" "}
                          <span className="text-slate-400">{c.expert.title}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <Link
                        href={`/consult/${c.id}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-950/60"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{isBn ? "লাইভ চেম্বারে যান" : "Open Live Chamber"}</span>
                      </Link>

                      {c.prescription && (
                        <button
                          onClick={() => generatePrescriptionPdf(c)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-white/[0.08] transition"
                        >
                          <Download className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{isBn ? "প্রেসক্রিপশন PDF" : "Download Rx"}</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedInvoiceCase(c)}
                        className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/[0.06] transition"
                        title={isBn ? "মানি রসিদ দেখুন" : "View Invoice Receipt"}
                      >
                        <Receipt className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Last Message Snippet */}
                  {lastMsg && (
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-white/[0.04] text-xs flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-slate-400 truncate">
                          <strong className="text-slate-200">{lastMsg.senderName}:</strong> {lastMsg.text}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0">
                        {formatDate(lastMsg.timestamp).split(",")[0] || "Recently"}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
            <p className="text-sm">No consultations found for this account.</p>
            <Link
              href="/consult"
              className="inline-block mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              Book First Consultation
            </Link>
          </div>
        )}
      </div>

      {/* 5. Billing & Digital Invoices Section */}
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

      {/* 6. Explore & Upgrade Farm Health Subscription Plans */}
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
