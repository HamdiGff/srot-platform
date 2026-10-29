"use client";

import React from "react";
import { useUserStore, UserRole } from "@/lib/store/userStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  Wheat,
  Milk,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  Truck,
  Sliders,
  CheckCircle2,
} from "lucide-react";

export function PortalRoleBar() {
  const { currentRole, switchRole } = useUserStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const ROLES_LIST: {
    id: UserRole;
    nameEn: string;
    nameBn: string;
    subEn: string;
    subBn: string;
    icon: any;
    color: string;
  }[] = [
    {
      id: "farmer",
      nameEn: "Crop Farmer",
      nameBn: "আবাদি ফসল খামারি",
      subEn: "Acreage & Soil NPK",
      subBn: "জমির প্লট ও সার",
      icon: Wheat,
      color: "emerald",
    },
    {
      id: "livestock_farmer",
      nameEn: "Dairy Producer",
      nameBn: "ডেইরি খামারি",
      subEn: "Herd & Milk Yield",
      subBn: "গাভী ও দুধের রেকর্ড",
      icon: Milk,
      color: "cyan",
    },
    {
      id: "pet_owner",
      nameEn: "Pet Parent",
      nameBn: "পোষা প্রাণীর অভিভাবক",
      subEn: "Vaccines & Passport",
      subBn: "ভ্যাকসিন ও স্বাস্থ্য কার্ড",
      icon: HeartHandshake,
      color: "pink",
    },
    {
      id: "expert_agronomist",
      nameEn: "Plant Pathologist",
      nameBn: "উদ্ভিদ রোগতত্ত্ববিদ",
      subEn: "DAE Reg #8891",
      subBn: "ডিএই লাইসেন্সকৃত",
      icon: ShieldCheck,
      color: "teal",
    },
    {
      id: "veterinarian",
      nameEn: "Veterinary Surgeon",
      nameBn: "ভেটেরিনারি সার্জন",
      subEn: "BVC Reg #7714",
      subBn: "বিভিসি লাইসেন্সকৃত",
      icon: Stethoscope,
      color: "blue",
    },
    {
      id: "field_vendor",
      nameEn: "Field Technician",
      nameBn: "মাঠ টেকনিশিয়ান",
      subEn: "AI & Soil Lab Unit",
      subBn: "কৃত্রিম প্রজনন ও মাটি টেস্ট",
      icon: Truck,
      color: "amber",
    },
    {
      id: "admin",
      nameEn: "System Admin",
      nameBn: "প্ল্যাটফর্ম অ্যাডমিন",
      subEn: "Modules & Telemetry",
      subBn: "মডিউল ও কমান্ড সেন্টার",
      icon: Sliders,
      color: "purple",
    },
  ];

  return (
    <div className="w-full bg-slate-950/80 border border-white/[0.08] rounded-2xl p-2 shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between pb-2 mb-2 px-3 border-b border-white/[0.06] text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono uppercase tracking-wider text-slate-400 font-bold text-[10px]">
            {isBn ? "৭টি বিশেষায়িত ব্যবহারকারী পোর্টাল সুইচবার:" : "7 Specialized Persona Workspaces (Click to Switch):"}
          </span>
        </div>
        <span className="text-[11px] text-emerald-400 font-semibold hidden sm:inline">
          {isBn ? "লাইভ রোল পরিবর্তন সক্রিয়" : "Instant Persona & Dashboard Reaction"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
        {ROLES_LIST.map((role) => {
          const Icon = role.icon;
          const isActive = currentRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => switchRole(role.id)}
              className={`p-2.5 rounded-xl transition-all text-left flex flex-col justify-between relative overflow-hidden group ${
                isActive
                  ? "bg-slate-900 border border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30"
                  : "bg-slate-950/40 hover:bg-slate-900/60 border border-white/[0.04]"
              }`}
            >
              {isActive && (
                <div className="absolute top-1.5 right-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`p-1.5 rounded-lg shrink-0 ${
                    isActive
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "bg-white/[0.06] text-slate-400 group-hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span
                  className={`text-xs font-bold truncate ${
                    isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                  }`}
                >
                  {isBn ? role.nameBn : role.nameEn}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block truncate">
                {isBn ? role.subBn : role.subEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
