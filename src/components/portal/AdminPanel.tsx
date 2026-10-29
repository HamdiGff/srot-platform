"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useModuleStore } from "@/lib/store/moduleStore";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Sliders,
  ShieldCheck,
  Radio,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Edit2,
  Layers,
  Wheat,
  Milk,
  HeartHandshake,
  BookOpen,
  Store,
  DollarSign,
  Activity,
  Send,
  X,
  FileCheck2,
} from "lucide-react";

export function AdminPanel() {
  const { modules, toggleModule, resetToDefaults } = useModuleStore();
  const { currentUser, getAllUsers, adminUpdateUser } = useUserStore();
  const { consultations } = useConsultationStore();
  const { questions, deleteQuestion } = useCommunityStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const allUsers = getAllUsers();
  const [userSearch, setUserSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"modules" | "users" | "outbreaks" | "community">("modules");

  // Regional Outbreak Broadcast State
  const [outbreaks, setOutbreaks] = useState([
    {
      id: "ob-1",
      division: "Rangpur",
      district: "Dinajpur & Rangpur Sadar",
      disease: "Boro Rice Foliar & Neck Blast Alert",
      severity: "Critical",
      activeSpecialists: 34,
    },
    {
      id: "ob-2",
      division: "Rajshahi",
      district: "Sirajganj & Pabna Dairy Corridor",
      disease: "Lumpy Skin Disease (LSD) Vector Surge",
      severity: "Warning",
      activeSpecialists: 28,
    },
    {
      id: "ob-3",
      division: "Mymensingh",
      district: "Muktagacha & Trishal",
      disease: "Acute Bovine Mastitis & High Bulk Somatic Surge",
      severity: "Critical",
      activeSpecialists: 42,
    },
  ]);

  const [isNewOutbreakModalOpen, setIsNewOutbreakModalOpen] = useState(false);
  const [newDivision, setNewDivision] = useState("Rangpur");
  const [newDistricts, setNewDistricts] = useState("");
  const [newDisease, setNewDisease] = useState("");
  const [newSeverity, setNewSeverity] = useState("Critical");

  const handleBroadcastOutbreak = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDisease.trim() || !newDistricts.trim()) return;

    setOutbreaks([
      {
        id: `ob-${Date.now()}`,
        division: newDivision,
        district: newDistricts,
        disease: newDisease,
        severity: newSeverity,
        activeSpecialists: 25,
      },
      ...outbreaks,
    ]);

    setNewDistricts("");
    setNewDisease("");
    setIsNewOutbreakModalOpen(false);
  };

  const handleDeleteOutbreak = (id: string) => {
    setOutbreaks(outbreaks.filter((o) => o.id !== id));
  };

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.phone.includes(userSearch) ||
      u.location.toLowerCase().includes(userSearch.toLowerCase())
  );

  const totalPlatformFees = consultations.reduce((sum, c) => sum + Math.round((c.feePaid || 300) * 0.3), 0);

  return (
    <div className="w-full space-y-6">
      {/* 1. Admin Command Console Header */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-slate-900 to-[#0c0514] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-500/60 shadow-lg shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                <span>PLATFORM DIRECTOR & GOVERNANCE CONSOLE</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400">All 7 Service Sectors Active</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
            <p className="text-xs text-slate-300 mt-0.5">{currentUser.location}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/[0.08] text-xs font-bold transition shadow-sm"
          >
            Reset Default Architecture
          </button>
        </div>
      </div>

      {/* 2. Platform Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Platform Fee (30%)</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5 block">
            {formatCurrency(totalPlatformFees)}
          </span>
          <span className="text-[10px] text-slate-400">bKash/Nagad Revenue</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Total Consultations</span>
          <span className="text-xl sm:text-2xl font-black text-purple-300 font-mono mt-0.5 block">
            {consultations.length} Cases
          </span>
          <span className="text-[10px] text-purple-400 font-medium">BVC & DAE Ground Truth</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Registered Personas</span>
          <span className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5 block">
            {allUsers.length} Users
          </span>
          <span className="text-[10px] text-cyan-400 font-medium">Across 7 Disciplines</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Active Outbreaks</span>
          <span className="text-xl sm:text-2xl font-black text-red-400 font-mono mt-0.5 block">
            {outbreaks.length} Clusters
          </span>
          <span className="text-[10px] text-red-300 font-medium">8-Division Radar</span>
        </div>
      </div>

      {/* 3. Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-white/[0.08] overflow-x-auto">
        {[
          { id: "modules", label: isBn ? "সিস্টেম মডিউল কন্ট্রোল" : "System Modules Switchboard", icon: Sliders },
          { id: "users", label: isBn ? "ব্যবহারকারী ও ডাক্তার গভর্ন্যান্স" : "User & Persona Governance", icon: Users },
          { id: "outbreaks", label: isBn ? "প্রাদুর্ভাব ব্রডকাস্টার" : "Outbreak Radar Broadcaster", icon: Radio },
          { id: "community", label: isBn ? "কমিউনিটি মডারেশন" : "Community Moderation", icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: System Modules Switchboard */}
      {activeTab === "modules" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="text-sm sm:text-base font-black text-white">
              {isBn ? "প্ল্যাটফর্ম ফিচার মডিউল অন/অফ সুইচবোর্ড" : "Modular Phase Deployment & Feature Isolation"}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {modules.filter((m) => m.isEnabled).length} / {modules.length} Modules Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                  mod.isEnabled
                    ? "bg-slate-950/70 border-emerald-500/30"
                    : "bg-slate-950/30 border-white/[0.04] opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300">
                      {mod.phase}
                    </span>
                    <button
                      onClick={() => toggleModule(mod.key)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                        mod.isEnabled
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-slate-900 text-slate-500 border border-white/[0.08]"
                      }`}
                    >
                      {mod.isEnabled ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{mod.isEnabled ? "Active" : "Disabled"}</span>
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-2.5">{mod.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{mod.description}</p>
                </div>

                <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-500">
                  <span>Routing: /{mod.id}</span>
                  <span className="text-emerald-400 font-mono">Status: Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: User & Persona Governance */}
      {activeTab === "users" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <h3 className="text-sm sm:text-base font-black text-white">
              {isBn ? "৭টি রোল পার্সোনা ডিরেক্টরি ও অ্যাক্টিভেশন" : "All Registered Users Across 7 Roles"}
            </h3>
            <input
              type="text"
              placeholder="Search user by name, role, phone..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-purple-500 w-full sm:w-64"
            />
          </div>

          <div className="space-y-2.5">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/[0.1] shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-bold text-white">{user.name}</strong>
                      <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 text-[10px] font-mono font-bold">
                        {user.role}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      Phone: {user.phone} • {user.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                    {user.registeredEntities?.length || 0} Entities
                  </span>
                  <button
                    onClick={() => {
                      const newName = prompt("Edit User Name:", user.name);
                      if (newName) {
                        adminUpdateUser(user.id, { name: newName });
                      }
                    }}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Outbreak Broadcaster */}
      {activeTab === "outbreaks" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-400" />
              <span>{isBn ? "জাতীয় রোগ প্রাদুর্ভাব সম্প্রচার কেন্দ্র" : "National Outbreak Surveillance Alert Broadcaster"}</span>
            </h3>

            <button
              onClick={() => setIsNewOutbreakModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold hover:bg-red-500/30 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Broadcast New Outbreak Alert</span>
            </button>
          </div>

          <div className="space-y-3">
            {outbreaks.map((ob) => (
              <div
                key={ob.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-red-500/30 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-300 text-[10px] font-bold font-mono">
                      {ob.division.toUpperCase()} DIVISION
                    </span>
                    <span className="text-xs text-slate-400">{ob.district}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{ob.disease}</h4>
                  <span className="text-[11px] text-emerald-400 font-mono mt-0.5 block">
                    {ob.activeSpecialists} Specialists Online
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteOutbreak(ob.id)}
                  className="p-2 rounded-xl text-slate-500 hover:text-red-400 transition"
                  title="Remove Outbreak Alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Community Moderation */}
      {activeTab === "community" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="text-sm sm:text-base font-black text-white">
              {isBn ? "কমিউনিটি পোস্ট মডারেশন ও তদারকি" : "Community Threads Moderation & Clean-up"}
            </h3>
            <span className="text-xs text-slate-400 font-mono">{questions.length} Total Threads</span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {questions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.05] flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-purple-400">
                    <span>{q.sector.toUpperCase()}</span>
                    <span>•</span>
                    <span>Author: {q.authorName}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mt-0.5">{q.title}</h4>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {q.answers.length} Answers • {q.upvotes} Upvotes
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/community"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Delete this post across the platform?")) {
                        deleteQuestion(q.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Outbreak Modal */}
      {isNewOutbreakModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-red-500/30 p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-400" />
                <span>Broadcast Regional Outbreak Warning</span>
              </h3>
              <button onClick={() => setIsNewOutbreakModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleBroadcastOutbreak} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Division (বিভাগ):</label>
                <select
                  value={newDivision}
                  onChange={(e) => setNewDivision(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Rangpur">Rangpur (রংপুর)</option>
                  <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                  <option value="Dhaka">Dhaka (ঢাকা)</option>
                  <option value="Mymensingh">Mymensingh (ময়মনসিংহ)</option>
                  <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                  <option value="Khulna">Khulna (খুলনা)</option>
                  <option value="Sylhet">Sylhet (সিলেট)</option>
                  <option value="Barisal">Barisal (বরিশাল)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Affected Districts (জেলাসমূহ):</label>
                <input
                  type="text"
                  placeholder="e.g. Bogura Sadar & Sherpur"
                  value={newDistricts}
                  onChange={(e) => setNewDistricts(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Disease & Pathogen Name:</label>
                <input
                  type="text"
                  placeholder="e.g. Boro Rice Brown Planthopper (BPH) Outbreak"
                  value={newDisease}
                  onChange={(e) => setNewDisease(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewOutbreakModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold"
                >
                  Broadcast Alert Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
