"use client";

import React from "react";
import { ShieldCheck, Award, Lock, FileCheck2, Scale } from "lucide-react";

export function AccreditationBadges() {
  const credentials = [
    {
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      title: "Council-Registered Specialists",
      subtitle: "ICAR Agronomists & VCI / RCVS Veterinary Surgeons",
    },
    {
      icon: <Lock className="w-5 h-5 text-cyan-400" />,
      title: "256-Bit Cryptographic Security",
      subtitle: "Tamper-evident signed digital prescriptions with QR validation",
    },
    {
      icon: <FileCheck2 className="w-5 h-5 text-teal-400" />,
      title: "Statutory Withholding Protocol",
      subtitle: "Strict zero-residue milk, meat & grain withdrawal intervals",
    },
    {
      icon: <Scale className="w-5 h-5 text-amber-400" />,
      title: "Legal Tele-Health Compliance",
      subtitle: "Adheres to Tele-Veterinary Practice Act & National Agro standards",
    },
  ];

  return (
    <div className="w-full py-6 border-y border-white/[0.06] bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((cred, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700/80 transition"
            >
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0">
                {cred.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-tight leading-snug">
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
