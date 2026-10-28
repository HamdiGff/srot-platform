"use client";

import React from "react";
import { useModuleStore } from "@/lib/store/moduleStore";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import {
  Sliders,
  Layers,
  Wheat,
  BookOpen,
  Milk,
  HeartHandshake,
  FileCheck2,
  Store,
  ShieldCheck,
  Activity,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AdminModularDashboardPage() {
  const { modules, toggleModule, resetToDefaults } = useModuleStore();
  const { currentUser, openRoleModal } = useUserStore();
  const { consultations } = useConsultationStore();

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "Wheat":
        return <Wheat className="w-5 h-5 text-emerald-400" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-emerald-400" />;
      case "Milk":
        return <Milk className="w-5 h-5 text-cyan-400" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-5 h-5 text-amber-400" />;
      case "FileCheck2":
        return <FileCheck2 className="w-5 h-5 text-emerald-400" />;
      case "Store":
        return <Store className="w-5 h-5 text-purple-400" />;
      default:
        return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="w-full srot-glow-mesh py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Admin Header */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Platform Modular Architecture Control</span>
            </span>
            <button
              onClick={openRoleModal}
              className="text-xs text-slate-400 hover:text-white underline underline-offset-2"
            >
              Switch Role
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            SROT System Module Orchestrator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Enable or isolate services independently across Phase 1 (Agri & Knowledge), Phase 2 (Livestock & Pet Tele-Vet), and Phase 3 (Marketplace & Inputs).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-300 transition"
          >
            Reset Default Phases
          </button>
        </div>
      </div>

      {/* System Telemetry Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Solved Cases</span>
          <span className="text-xl font-black text-white mt-0.5 block">14,820</span>
          <span className="text-[10px] text-emerald-400">+18% this month</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Tele-Vets & Agronomists</span>
          <span className="text-xl font-black text-cyan-400 mt-0.5 block">142 Verified</span>
          <span className="text-[10px] text-slate-400">100% Council Registered</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Rx Generation Engine</span>
          <span className="text-xl font-black text-emerald-400 mt-0.5 block">Operational</span>
          <span className="text-[10px] text-slate-400">SHA-256 Authenticated</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Average Response Time</span>
          <span className="text-xl font-black text-amber-400 mt-0.5 block">18.4 Mins</span>
          <span className="text-[10px] text-emerald-400">Under 25 min SLA</span>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">System Modules & Capabilities</h2>
            <p className="text-xs text-slate-400">
              Toggle any module to activate or deactivate it instantly across the platform navigation and consultation engine.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className={`p-5 rounded-2xl border transition-all ${
                mod.isEnabled
                  ? "bg-slate-900/80 border-slate-700/80"
                  : "bg-slate-950/40 border-slate-800/40 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <span className="p-2.5 rounded-xl bg-slate-800 shrink-0">
                    {getModuleIcon(mod.iconName)}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-sm">{mod.name}</h3>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {mod.phase}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {mod.description}
                    </p>
                    <div className="mt-2 text-[11px] text-emerald-400 font-medium">
                      {mod.metrics.label}: <strong>{mod.metrics.value}</strong>
                    </div>
                  </div>
                </div>

                {/* Toggle switch button */}
                <button
                  onClick={() => toggleModule(mod.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                    mod.isEnabled
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/50"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-400"
                  }`}
                >
                  {mod.isEnabled ? "ENABLED" : "DISABLED"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Rationale Callout */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Strategic Platform Architecture Summary:
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          &quot;The key is not to build a website just for crop advisory. Build a service platform that can support multiple service categories. Notice that Animal Healthcare is simply another service module, not a separate website. Your database is generic: think in terms of users (Farmer, Livestock Farmer, Pet Owner, Expert, Veterinarian, Admin) and services (Agri Consultation, Veterinary Consultation, Video, Field Visit, Prescription). The consultation and prescription engine stays the same.&quot;
        </p>
      </div>
    </div>
  );
}
