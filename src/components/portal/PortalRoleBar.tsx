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
    <div className="w-full vercel-hud rounded-2xl p-2.5 shadow-2xl">
      <div className="flex items-center justify-between pb-2 mb-2 px-3 border-b border-white/[0.08] text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono uppercase tracking-wider text-zinc-400 font-semibold text-[11px]">
            {isBn ? "৭টি বিশেষায়িত ব্যবহারকারী পোর্টাল কনসোল:" : "7 ROLE CONSOLES // INSTANT ENVIRONMENT SWITCHER:"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-[10px] font-mono text-zinc-400 hidden sm:inline">
            ENV: PRODUCTION
          </span>
          <span className="text-[11px] text-emerald-400 font-mono font-medium hidden sm:inline">
            [ READY ]
          </span>
        </div>
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
                  ? "bg-white/[0.09] border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.5)] ring-1 ring-white/20"
                  : "bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/[0.15]"
              }`}
            >
              {isActive && (
                <div className="absolute top-1.5 right-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                    isActive
                      ? "bg-white text-black font-bold shadow-sm"
                      : "bg-white/[0.06] text-zinc-400 group-hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span
                  className={`text-xs font-semibold truncate ${
                    isActive ? "text-white" : "text-zinc-300 group-hover:text-white"
                  }`}
                >
                  {isBn ? role.nameBn : role.nameEn}
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono block truncate">
                {isBn ? role.subBn : role.subEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
