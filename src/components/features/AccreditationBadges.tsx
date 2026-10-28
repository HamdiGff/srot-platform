"use client";

import React from "react";
import { useLanguageStore } from "@/lib/store/languageStore";
import { Award, Lock, FileCheck2, Scale } from "lucide-react";

export function AccreditationBadges() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const credentials = [
    {
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      title: isBn ? "নিবন্ধিত কৃষিবিদ ও ভেটেরিনারিয়ান" : "Council-Registered Specialists",
      subtitle: isBn
        ? "বিআরআরআই/বিএআরআই কৃষিবিদ ও বিভিসি (BVC) লাইসেন্সধারী ভেটেরিনারি সার্জন"
        : "BRRI, BARI Agronomists & BVC Licensed Veterinary Surgeons",
    },
    {
      icon: <Lock className="w-5 h-5 text-cyan-400" />,
      title: isBn ? "২৫৬-বিট ক্রিপ্টোগ্রাফিক সুরক্ষা" : "256-Bit Tamper-Proof Security",
      subtitle: isBn
        ? "কিউআর ভেরিফাইড ডিজিটাল প্রেসক্রিপশন ও বিকাশ/নগদে ১০০% নিরাপদ পেমেন্ট"
        : "QR-validated digital prescriptions with secure bKash/Nagad gateway",
    },
    {
      icon: <FileCheck2 className="w-5 h-5 text-teal-400" />,
      title: isBn ? "উইথহোল্ডিং ও খাদ্য নিরাপত্তা" : "Statutory Withholding Protocol",
      subtitle: isBn
        ? "দুধ, মাংস ও শস্যে অ্যান্টিবায়োটিক ও বিষাক্ত রাসায়নিক অবশিষ্টাংশ মুক্ত নিয়ম"
        : "Zero-residue milk, meat & grain withdrawal intervals adhering to DLS",
    },
    {
      icon: <Scale className="w-5 h-5 text-amber-400" />,
      title: isBn ? "বাংলাদেশ টেলি-মেডিসিন কমপ্লায়েন্স" : "BD Tele-Health Compliance",
      subtitle: isBn
        ? "কৃষি সম্প্রসারণ অধিদপ্তর (DAE) ও প্রাণিসম্পদ অধিদপ্তরের জাতীয় প্রটোকল"
        : "Adheres to National Agri Extension (DAE) & Livestock Guidelines",
    },
  ];

  return (
    <div className="w-full py-6 border-y border-white/[0.06] bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-emerald-500/40 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0 group-hover:scale-110 group-hover:border-emerald-500/40 transition-transform">
                {cred.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-tight leading-snug group-hover:text-emerald-300 transition-colors">
                  {cred.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                  {cred.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
