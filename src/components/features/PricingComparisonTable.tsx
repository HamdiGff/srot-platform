"use client";

import React from "react";
import { useLanguageStore } from "@/lib/store/languageStore";
import { Check, X, ShieldCheck, Zap, CreditCard } from "lucide-react";

export function PricingComparisonTable() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const comparisonRows = [
    {
      feature: isBn ? "পরামর্শ ও রোগ নির্ণয়ের সময়" : "Response & Diagnosis Turnaround",
      traditional: isBn
        ? "২ থেকে ৫ দিন (উপজেলা সদরে যাওয়া বা মাঠ কর্মকর্তার অপেক্ষা)"
        : "2 to 5 Days (waiting for field agents or travelling to town)",
      srot: isBn
        ? "২০ মিনিটের মধ্যে (ছবি স্ক্যান করে তাৎক্ষণিক লাইভ ভিডিও কনসালটেশন)"
        : "Under 20 Minutes (Instant visual triage & video visit)",
    },
    {
      feature: isBn ? "বিশেষজ্ঞদের যোগ্যতা ও রেজিস্ট্রেশন" : "Practitioner Credentials",
      traditional: isBn
        ? "স্থানীয় সার-কীটনাশক দোকানদার বা হাতুড়ে চিকিৎসক"
        : "Local chemical sales agent / Uncertified shopkeeper",
      srot: isBn
        ? "বিএআরআই/বিআরআরআই সার্টিফাইড কৃষিবিদ ও বিভিসি নিবন্ধিত ভেটেরিনারি সার্জন"
        : "BARI/BRRI Agronomists & BVC Registered Veterinary Surgeons",
    },
    {
      feature: isBn ? "জীবাণু নিরাপত্তা (Biosecurity)" : "Biosecurity & Infection Control",
      traditional: isBn
        ? "অসুস্থ গরু বা ছাগল বাজারে নেওয়ায় অন্য খামারে ভাইরাস ছড়ানোর উচ্চ ঝুঁকি"
        : "High Risk (transporting sick animals spreads viral pathogens)",
      srot: isBn
        ? "শূন্য সংক্রমণ ঝুঁকি (খামারে বসেই দূরবর্তী এইচডি ভিডিও ও ফটো ট্রায়াজ)"
        : "Zero Transmission Risk (Remote HD video examination)",
    },
    {
      feature: isBn ? "ডিজিটাল প্রেসক্রিপশন ও উইথহোল্ডিং" : "Prescription Integrity & Legality",
      traditional: isBn
        ? "কাগজে লেখা অস্পষ্ট নোট, অ্যান্টিবায়োটিকের যথেচ্ছ ব্যবহার"
        : "Verbal recommendation or handwritten unverified note",
      srot: isBn
        ? "কিউআর কোড সিলসহ এ৪ সাইজ ডিজিটাল প্রেসক্রিপশন ও দুধ/মাংসের সেফটি সময়"
        : "Cryptographically Signed A4 PDF with strict withholding dates",
    },
    {
      feature: isBn ? "এক প্ল্যাটফর্মে সমন্বিত সেবা" : "Scope of Care",
      traditional: isBn
        ? "ফসল, গরু, ছাগল ও পোষা প্রাণীর জন্য আলাদা আলাদা দ্বারে ঘুরতে হয়"
        : "Fragmented (must find separate dealers and animal doctors)",
      srot: isBn
        ? "একটি অ্যাকাউন্টে ধান, আলু, ডেইরি গরু, ছাগল, মাছ ও পোষা কুকুর-বিড়াল"
        : "Unified Platform (Crops, Livestock, Dairy & Companion Pets)",
    },
    {
      feature: isBn ? "খরচ ও ফি স্বচ্ছতা (বিকাশ / নগদ)" : "Cost Transparency & Payment",
      traditional: isBn
        ? "যাতায়াত ও অপচয়সহ ৳১,৫০০ – ৳৩,০০০+ অতিরিক্ত খরচ"
        : "Unpredictable markups + expensive travel and lost farm days",
      srot: isBn
        ? "মাত্র ৳২৫০ থেকে শুরু (বিকাশ, নগদ, রকেটে সুরক্ষিত পেমেন্ট)"
        : "Transparent fee starting from ৳250 ($2.50) via bKash / Nagad",
    },
  ];

  return (
    <div className="srot-glass-card hover-glow-emerald rounded-3xl p-6 sm:p-10 border border-white/[0.08] shadow-2xl relative overflow-hidden group">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          {isBn ? "কেন এসআরওটি প্ল্যাটফর্ম বেছে নিবেন" : "The SROT Advantage"}
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
          {isBn
            ? "ঐতিহ্যবাহী পরামর্শ বনাম এসআরওটি ডিজিটাল টেলি-সেবা"
            : "Traditional Farm Visits vs. SROT Tele-Health"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          {isBn
            ? "কীটনাশকের দোকানদারের ধারণানির্ভর পরামর্শের পরিবর্তে বৈজ্ঞানিক প্রেসক্রিপশন নিন এবং সময় ও অর্থ সাশ্রয় করুন।"
            : "Comparing traditional fragmented agricultural advice with SROT Council-Accredited Tele-Health."}
        </p>

        {/* Bangladesh Payment Methods Strip */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs">
          <span className="text-slate-400 text-[11px] font-bold">
            {isBn ? "পেমেন্ট মাধ্যম:" : "Accepted BD Payments:"}
          </span>
          <span className="font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
            bKash (বিকাশ)
          </span>
          <span className="font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
            Nagad (নগদ)
          </span>
          <span className="font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            Rocket (রকেট)
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="py-4 px-4 font-bold text-slate-400 uppercase text-[11px] w-1/3">
                {isBn ? "মূল তুলনামূলক মানদণ্ড" : "Key Comparison Metric"}
              </th>
              <th className="py-4 px-4 font-bold text-slate-400 uppercase text-[11px] w-1/3">
                {isBn ? "প্রচলিত মাঠ বা দোকান ভিজিট" : "Traditional Agricultural / Vet Visit"}
              </th>
              <th className="py-4 px-4 font-bold text-emerald-400 uppercase text-[11px] w-1/3 bg-emerald-950/20 rounded-t-xl border-t border-x border-emerald-500/30">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  {isBn ? "এসআরওটি (SROT) ডিজিটাল প্ল্যাটফর্ম" : "SROT Digital Platform"}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {comparisonRows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-900/40 transition">
                <td className="py-4 px-4 font-semibold text-white">
                  {row.feature}
                </td>
                <td className="py-4 px-4 text-slate-400">
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-200 bg-emerald-950/15 border-x border-emerald-500/20">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-medium text-emerald-200">{row.srot}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
