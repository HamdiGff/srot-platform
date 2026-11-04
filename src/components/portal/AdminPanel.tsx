"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useModuleStore } from "@/lib/store/moduleStore";
import { useUserStore } from "@/lib/store/userStore";
import { useOrderStore, OrderRecord, PaymentStatus } from "@/lib/store/orderStore";
import { useOutbreakStore, OutbreakAlert } from "@/lib/store/outbreakStore";
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
  DollarSign,
  Activity,
  Send,
  X,
  FileCheck2,
  Award,
  Clock,
  TrendingUp,
  Receipt,
  UserCheck,
  UserX,
  Search,
  Filter,
  Flame,
  Bell,
  RefreshCw,
  Cpu,
  Check,
  Ban,
  RotateCcw,
} from "lucide-react";

export function AdminPanel() {
  const { modules, toggleModule, resetToDefaults } = useModuleStore();
  const { currentUser, getAllUsers, adminUpdateUser } = useUserStore();
  const { orders, updatePaymentStatus } = useOrderStore();
  const { outbreaks, addOutbreak, removeOutbreak } = useOutbreakStore();
  const { consultations } = useConsultationStore();
  const { questions, deleteQuestion } = useCommunityStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const allUsers = getAllUsers();
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [trxSearch, setTrxSearch] = useState("");
  const [trxFilter, setTrxFilter] = useState<"all" | "pending_verification" | "verified" | "flagged" | "refunded">("all");
  const [activeTab, setActiveTab] = useState<"telemetry" | "transactions" | "modules" | "users" | "outbreaks" | "community">("telemetry");

  // New Outbreak Modal State
  const [isNewOutbreakModalOpen, setIsNewOutbreakModalOpen] = useState(false);
  const [newDivision, setNewDivision] = useState("Rangpur");
  const [newDistricts, setNewDistricts] = useState("");
  const [newDisease, setNewDisease] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newSeverity, setNewSeverity] = useState<"Critical" | "Warning" | "Advisory">("Critical");
  const [newProtocol, setNewProtocol] = useState("");

  // Edit User Modal State
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editRole, setEditRole] = useState("");

  // Handle Broadcast New Outbreak (Connected to Global Store!)
  const handleBroadcastOutbreak = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDisease.trim() || !newDistricts.trim()) return;

    addOutbreak({
      division: newDivision,
      district: newDistricts,
      disease: newDisease,
      target: newTarget || "Field Crops & Livestock",
      severity: newSeverity,
      activeSpecialists: 30,
      broadcastDate: "Just now (Live Alert)",
      emergencyProtocol: newProtocol || "Contact on-call SROT specialist immediately.",
      headlineBn: `${newDivision} বিভাগ: ${newDisease} প্রাদুর্ভাব সতর্কতা`,
      headlineEn: `${newDivision} Division: ${newDisease} Outbreak Alert`,
    });

    setNewDistricts("");
    setNewDisease("");
    setNewTarget("");
    setNewProtocol("");
    setIsNewOutbreakModalOpen(false);
  };

  const handleDeleteOutbreak = (id: string) => {
    removeOutbreak(id);
  };

  // Open Edit User Modal
  const handleStartEditUser = (user: any) => {
    setEditingUserId(user.id);
    setEditName(user.name);
    setEditPhone(user.phone);
    setEditLocation(user.location);
    setEditRole(user.role);
  };

  // Save User Edit
  const handleSaveUserEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserId) return;

    adminUpdateUser(editingUserId, {
      name: editName,
      phone: editPhone,
      location: editLocation,
      role: editRole as any,
    });
    setEditingUserId(null);
  };

  // Filtered Users
  const filteredUsers = allUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.phone.includes(userSearch) ||
      u.location.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Filtered Transactions
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(trxSearch.toLowerCase()) ||
      o.transactionId.toLowerCase().includes(trxSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(trxSearch.toLowerCase()) ||
      o.customerPhone.includes(trxSearch) ||
      o.providerOrExpert.name.toLowerCase().includes(trxSearch.toLowerCase());
    const matchesFilter = trxFilter === "all" || o.paymentStatus === trxFilter;
    return matchesSearch && matchesFilter;
  });

  // Financial Calculations
  const totalGrossGMV = orders.reduce((sum, o) => sum + o.amount, 0);
  const verifiedOrders = orders.filter((o) => o.paymentStatus === "verified");
  const verifiedGMV = verifiedOrders.reduce((sum, o) => sum + o.amount, 0);
  const pendingOrders = orders.filter((o) => o.paymentStatus === "pending_verification");
  const pendingGMV = pendingOrders.reduce((sum, o) => sum + o.amount, 0);
  const doctorPayout70 = Math.round(verifiedGMV * 0.7);
  const srotPlatformRevenue30 = Math.round(verifiedGMV * 0.3);

  return (
    <div className="w-full space-y-6">
      {/* 1. PLATFORM DIRECTOR & SYSTEM GOVERNANCE CONSOLE HEADER */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-purple-500/25 bg-gradient-to-r from-purple-950/40 via-slate-900 to-[#0c0514] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-500/60 shadow-lg"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                <span>PLATFORM DIRECTOR & GOVERNANCE CONSOLE</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                ● 100% Systems Operational (Turbopack Engine)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
            <p className="text-xs text-purple-200/80 font-mono mt-0.5">
              Role: System Administrator & Chief Governance Officer • SROT Cloud Hub
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>DAE, BVC, DoF & DLS Regulatory Ground Truth Enforced</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsNewOutbreakModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black transition shadow-lg shadow-red-600/25"
          >
            <Radio className="w-4 h-4" />
            <span>{isBn ? "জরুরি প্রাদুর্ভাব জারি করুন" : "Broadcast Alert"}</span>
          </button>

          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-white/[0.08] text-xs font-bold transition shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* 2. PLATFORM TELEMETRY KPI METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/25 text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">
            {isBn ? "অনুমোদিত প্ল্যাটফর্ম ফি (৩০%)" : "Verified SROT Revenue (30%)"}
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5 block">
            {formatCurrency(srotPlatformRevenue30)}
          </span>
          <span className="text-[10px] text-emerald-300/80 font-mono">Verified GMV: {formatCurrency(verifiedGMV)}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/25 text-center">
          <span className="text-[11px] uppercase font-bold text-amber-300 block font-mono">
            {isBn ? "যাচাই প্রক্রিয়াধীন লেনদেন" : "Pending TrxID Audit"}
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono mt-0.5 block">
            {formatCurrency(pendingGMV)}
          </span>
          <span className="text-[10px] text-amber-300 font-medium">
            {pendingOrders.length} Transactions Awaiting Review
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">
            {isBn ? "মোট আদেশ ও লেনদেন" : "Total Platform Orders"}
          </span>
          <span className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5 block">
            {orders.length} Orders
          </span>
          <span className="text-[10px] text-cyan-400 font-medium">Gross: {formatCurrency(totalGrossGMV)}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-red-500/25 text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">
            {isBn ? "সক্রিয় প্রাদুর্ভাব ক্লাস্টার" : "Active Outbreaks"}
          </span>
          <span className="text-xl sm:text-2xl font-black text-rose-400 font-mono mt-0.5 block">
            {outbreaks.length} Clusters
          </span>
          <span className="text-[10px] text-rose-300 font-medium">Global Reactive Push Active</span>
        </div>
      </div>

      {/* 3. MULTI-TAB COMMAND SWITCHER */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-white/[0.08] overflow-x-auto">
        {[
          {
            id: "telemetry",
            label: isBn ? "কমান্ড টেলিমেট্রি" : "Command Telemetry",
            icon: Activity,
          },
          {
            id: "transactions",
            label: isBn ? "পেমেন্ট লেনদেন ও TrxID যাচাই" : "Payments & TrxID Verification",
            icon: Receipt,
            count: pendingOrders.length,
          },
          {
            id: "modules",
            label: isBn ? "সিস্টেম মডিউল সুইচবোর্ড" : "Modules Switchboard",
            icon: Sliders,
          },
          {
            id: "users",
            label: isBn ? "ব্যবহারকারী ও ডাক্তার গভর্ন্যান্স" : "User Governance",
            icon: Users,
            count: allUsers.length,
          },
          {
            id: "outbreaks",
            label: isBn ? "৮-বিভাগীয় রোগ প্রাদুর্ভাব ব্রডকাস্টার" : "Outbreak Broadcaster",
            icon: Radio,
            count: outbreaks.length,
          },
          {
            id: "community",
            label: isBn ? "কমিউনিটি ফোরাম মডারেশন" : "Community Moderation",
            icon: ShieldCheck,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-black"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {typeof tab.count === "number" && tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? "bg-slate-950 text-purple-300" : "bg-white/[0.08] text-slate-300"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: COMMAND TELEMETRY & FINANCIAL ENGINE */}
      {/* ========================================================================= */}
      {activeTab === "telemetry" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span>{isBn ? "প্ল্যাটফর্ম ফাইন্যান্সিয়াল ও এসএলএ পারফরম্যান্স মেট্রিক্স" : "SROT Financial Settlement & SLA Health Radar"}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn
                  ? "৭টি সেবায় রাজস্ব বন্টন (৭০% ডাক্তার / ৩০% প্ল্যাটফর্ম) এবং ক্লিনিক্যাল মান নিয়ন্ত্রণ রিপোর্ট।"
                  : "Real-time fee distribution, verified revenue settlements, and national clinical quality assurance."}
              </p>
            </div>

            <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              Audit Status: 100% Balanced
            </span>
          </div>

          {/* Financial Architecture Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Total Platform Gross GMV
              </span>
              <span className="text-3xl font-black text-white font-mono block">
                {formatCurrency(totalGrossGMV)}
              </span>
              <div className="pt-2 border-t border-white/[0.06] text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Verified Settlements:</span>
                  <span className="text-emerald-400 font-mono">{formatCurrency(verifiedGMV)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending Audit Queue:</span>
                  <span className="text-amber-400 font-mono">{formatCurrency(pendingGMV)}</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/25 space-y-2">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                Clinician Disbursements (70%)
              </span>
              <span className="text-3xl font-black text-emerald-300 font-mono block">
                {formatCurrency(doctorPayout70)}
              </span>
              <div className="pt-2 border-t border-white/[0.06] text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Attending Doctors:</span>
                  <span className="text-emerald-400 font-mono">142 Licensed</span>
                </div>
                <div className="flex justify-between">
                  <span>Disbursement Rails:</span>
                  <span className="text-white">bKash, Nagad & Rocket</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/25 space-y-2">
              <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider block">
                SROT Net Operating Margin (30%)
              </span>
              <span className="text-3xl font-black text-purple-300 font-mono block">
                {formatCurrency(srotPlatformRevenue30)}
              </span>
              <div className="pt-2 border-t border-white/[0.06] text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>AI Inference Cost:</span>
                  <span className="text-white font-mono">4.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cold-Chain & WebRTC:</span>
                  <span className="text-white font-mono">6.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PAYMENTS & TrxID VERIFICATION SWITCHBOARD (CRUCIAL UPDATE!) */}
      {/* ========================================================================= */}
      {activeTab === "transactions" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? "পেমেন্ট লেনদেন ও TrxID নিরীক্ষা সুইচবোর্ড" : "Financial Transactions & TrxID Audit Console"}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn
                  ? "গ্রাহকের বিকাশ, নগদ বা রকেট লেনদেন নম্বর যাচাই করুন এবং অনুমোদন বা ফ্ল্যাগ করুন।"
                  : "Audit customer transaction IDs against mobile wallet statements. Verify, flag, or refund payments in real-time."}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search TrxID, order #, client..."
                  value={trxSearch}
                  onChange={(e) => setTrxSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-purple-500 w-48 sm:w-60"
                />
              </div>

              <select
                value={trxFilter}
                onChange={(e) => setTrxFilter(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Statuses ({orders.length})</option>
                <option value="pending_verification">Pending Audit ({pendingOrders.length})</option>
                <option value="verified">Verified ({verifiedOrders.length})</option>
                <option value="flagged">Flagged / Disputed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredOrders.length === 0 ? (
              <div className="p-10 text-center rounded-2xl bg-slate-950/50 border border-white/[0.05] text-slate-400 text-xs">
                No transactions matched your audit filter.
              </div>
            ) : (
              filteredOrders.map((order) => {
                const isVerified = order.paymentStatus === "verified";
                const isPending = order.paymentStatus === "pending_verification";
                const isFlagged = order.paymentStatus === "flagged";
                const isRefunded = order.paymentStatus === "refunded";

                return (
                  <div
                    key={order.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/[0.06] hover:border-purple-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-400">{order.orderNumber}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.06] text-slate-300">
                          {order.type.replace("_", " ")}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-[11px] font-mono text-slate-400">{formatDate(order.createdAt)}</span>

                        {/* Status Badge */}
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono flex items-center gap-1 ${
                            isVerified
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : isPending
                              ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse"
                              : isFlagged
                              ? "bg-red-500/15 text-red-300 border border-red-500/30"
                              : "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                          }`}
                        >
                          ● {order.paymentStatus.replace("_", " ")}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white">{order.title}</h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                        <span>
                          Customer: <strong className="text-white">{order.customerName}</strong>
                        </span>
                        <span>•</span>
                        <span className="font-mono text-cyan-300">{order.customerPhone}</span>
                        <span>•</span>
                        <span>Location: {order.customerLocation}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                        <span>
                          Gateway: <strong className="text-white">{order.paymentMethod}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          TrxID: <strong className="text-pink-400 font-mono tracking-wider">{order.transactionId}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Provider: <strong className="text-slate-200">{order.providerOrExpert.name}</strong>
                        </span>
                      </div>

                      {order.adminVerificationNotes && (
                        <div className="text-[11px] text-amber-300 font-mono bg-black/40 p-2 rounded-xl border border-white/[0.04]">
                          Admin Audit Note: &quot;{order.adminVerificationNotes}&quot;
                        </div>
                      )}
                    </div>

                    {/* Admin Action Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                      <div className="text-left sm:text-right">
                        <span className="text-base sm:text-lg font-black text-white font-mono block">
                          {formatCurrency(order.amount)}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono block">
                          Doctor: {formatCurrency(Math.round(order.amount * 0.7))} (70%)
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {isPending && (
                          <button
                            onClick={() => updatePaymentStatus(order.id, "verified", "Approved by Admin on statement reconciliation")}
                            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition flex items-center gap-1 shadow-md shadow-emerald-500/20"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Verify TrxID</span>
                          </button>
                        )}

                        {!isFlagged && (
                          <button
                            onClick={() => {
                              const reason = prompt("Enter reason for flagging payment:", "Mismatched bKash TrxID");
                              if (reason) updatePaymentStatus(order.id, "flagged", reason);
                            }}
                            className="px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-white/[0.08] text-xs font-bold transition flex items-center gap-1"
                            title="Flag Fraud / Disputed"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>Flag</span>
                          </button>
                        )}

                        {!isRefunded && (
                          <button
                            onClick={() => {
                              if (confirm(`Issue full refund of ${formatCurrency(order.amount)} to ${order.customerPhone}?`)) {
                                updatePaymentStatus(order.id, "refunded", "Refund processed via bKash/Nagad");
                              }
                            }}
                            className="px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 border border-white/[0.08] text-xs font-bold transition flex items-center gap-1"
                            title="Issue Refund"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Refund</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SYSTEM MODULES SWITCHBOARD */}
      {/* ========================================================================= */}
      {activeTab === "modules" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>{isBn ? "প্ল্যাটফর্ম ফিচার মডিউল অন/অফ সুইচবোর্ড" : "Modular Phase Deployment & Feature Isolation"}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn
                  ? "যেকোনো মডিউল তাৎক্ষণিক সক্রিয় বা নিষ্ক্রিয় করুন। পরিবর্তনগুলো লাইভ স্টোরে সিঙ্ক হয়।"
                  : "Dynamically mount or isolate services across the client application in real-time."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {modules.filter((m) => m.isEnabled).length} / {modules.length} Modules Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                  mod.isEnabled
                    ? "bg-slate-950/80 border-emerald-500/30 shadow-md shadow-emerald-500/5"
                    : "bg-slate-950/40 border-white/[0.05] opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300">
                      {mod.phase}
                    </span>
                    <button
                      onClick={() => toggleModule(mod.key)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        mod.isEnabled
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-slate-900 text-slate-500 border border-white/[0.08]"
                      }`}
                    >
                      {mod.isEnabled ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Disabled</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-white mt-3">{mod.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{mod.description}</p>
                </div>

                <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Endpoint: /{mod.id}</span>
                  <span className={mod.isEnabled ? "text-emerald-400" : "text-slate-600"}>
                    {mod.isEnabled ? "Ready" : "Offline"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: USER & PERSONA GOVERNANCE */}
      {/* ========================================================================= */}
      {activeTab === "users" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>{isBn ? "৭টি রোল পার্সোনা ডিরেক্টরি ও ব্যবহারকারী নিয়ন্ত্রণ" : "Persona Governance Across 7 Roles"}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn
                  ? "কৃষক, ডাক্তার ও টেকনিশিয়ান প্রোফাইল পর্যালোচনা, সম্পাদনা এবং লাইসেন্স অনুমোদন করুন।"
                  : "Manage user credentials, verify council licenses, and edit role permissions."}
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search user, phone, district..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-purple-500 w-48 sm:w-60"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Roles</option>
                <option value="farmer">Crop Farmer</option>
                <option value="livestock_farmer">Dairy Farmer</option>
                <option value="pet_owner">Pet Parent</option>
                <option value="expert_agronomist">Agronomist</option>
                <option value="veterinarian">Veterinarian</option>
                <option value="field_vendor">Field Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredUsers.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-950/50 border border-white/[0.05] text-slate-400 text-xs">
                No users matched your query.
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] hover:border-purple-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/[0.1] shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-sm font-bold text-white truncate">{user.name}</strong>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                          {user.role}
                        </span>
                        {(user.role === "expert_agronomist" || user.role === "veterinarian") && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>Verified Clinician</span>
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="font-mono text-cyan-300">{user.phone}</span>
                        <span>•</span>
                        <span>{user.location}</span>
                        {user.registeredEntities && user.registeredEntities.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-400 font-mono font-semibold">
                              {user.registeredEntities.length} Entities (Plots/Cows)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleStartEditUser(user)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/[0.08] text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>Edit User</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: 8-DIVISION OUTBREAK BROADCASTER (CONNECTED TO GLOBAL STORE!) */}
      {/* ========================================================================= */}
      {activeTab === "outbreaks" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-400" />
                <span>{isBn ? "জাতীয় রোগ প্রাদুর্ভাব সম্প্রচার কেন্দ্র (৮টি বিভাগ)" : "National 8-Division Disease Outbreak Broadcaster"}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn
                  ? "যে কোনো বিভাগে জরুরি সতর্কতা জারি করুন। এটি ওয়েবসাইটের জাতীয় ব্যানার ও কৃষক পোর্টালে লাইভ প্রদর্শিত হয়।"
                  : "Deploy immediate emergency advisories that push to the live national banner across the entire site."}
              </p>
            </div>

            <button
              onClick={() => setIsNewOutbreakModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black transition shadow-lg shadow-red-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast New Regional Outbreak</span>
            </button>
          </div>

          <div className="space-y-3.5">
            {outbreaks.map((ob) => (
              <div
                key={ob.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-red-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-black font-mono tracking-wider border border-red-500/30">
                      {ob.division.toUpperCase()} DIVISION
                    </span>
                    <span className="text-xs text-slate-300 font-bold">{ob.district}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[10px] text-slate-400 font-mono">{ob.broadcastDate}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white">{ob.disease}</h3>

                  <div className="text-xs text-amber-300/90 font-mono">
                    Target Sector: <strong>{ob.target}</strong>
                  </div>

                  <p className="text-xs text-slate-300 italic bg-black/40 p-2.5 rounded-xl border border-white/[0.04]">
                    🚨 Protocol: &quot;{ob.emergencyProtocol}&quot;
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 block">
                      {ob.activeSpecialists} Specialists Online
                    </span>
                    <span className="text-[10px] text-slate-400">Mobilized on Ground</span>
                  </div>

                  <button
                    onClick={() => handleDeleteOutbreak(ob.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
                    title="Resolve and Revoke Alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: COMMUNITY FORUM MODERATION */}
      {/* ========================================================================= */}
      {activeTab === "community" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>{isBn ? "কমিউনিটি ফোরাম ও প্রশ্নোত্তর মডারেশন" : "Community Forum Moderation Desk"}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn
                  ? "কৃষক ও বিশেষজ্ঞদের আলোচনা তদারকি করুন এবং অনুপযুক্ত পোস্ট প্ল্যাটফর্ম থেকে সরান।"
                  : "Supervise public farmer questions, verify factual expert replies, and purge spam."}
              </p>
            </div>

            <span className="text-xs font-mono text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              {questions.length} Total Public Threads
            </span>
          </div>

          <div className="space-y-3">
            {questions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] hover:border-purple-500/20 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-purple-300">
                    <span className="px-2 py-0.5 rounded bg-purple-500/15 uppercase font-bold">
                      {q.sector}
                    </span>
                    <span>•</span>
                    <span>Author: {q.authorName}</span>
                    <span>•</span>
                    <span className="text-slate-500">{formatDate(q.createdAt)}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-0.5">{q.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{q.description || q.descriptionEn}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                    <span>
                      Replies: <strong className="text-white">{q.answers.length}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Upvotes: <strong className="text-white">{q.upvotes}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/community?sector=${q.sector}`}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold"
                  >
                    View Thread
                  </Link>

                  <button
                    onClick={() => {
                      if (confirm("Delete this post across the platform?")) {
                        deleteQuestion(q.id);
                      }
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
                    title="Delete Thread"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: BROADCAST NEW OUTBREAK MODAL */}
      {/* ========================================================================= */}
      {isNewOutbreakModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#090f19] border border-red-500/40 p-6 sm:p-7 space-y-4 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-400" />
                <span>Broadcast Regional Disease Outbreak</span>
              </h3>
              <button onClick={() => setIsNewOutbreakModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleBroadcastOutbreak} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Division (বিভাগ):</label>
                  <select
                    value={newDivision}
                    onChange={(e) => setNewDivision(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Rangpur">Rangpur (রংপুর)</option>
                    <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                    <option value="Mymensingh">Mymensingh (ময়মনসিংহ)</option>
                    <option value="Dhaka">Dhaka (ঢাকা)</option>
                    <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                    <option value="Khulna">Khulna (খুলনা)</option>
                    <option value="Barisal">Barisal (বরিশাল)</option>
                    <option value="Sylhet">Sylhet (সিলেট)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Severity Level:</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Critical">Critical (লাল সতর্কতা)</option>
                    <option value="Warning">Warning (হলুদ সতর্কতা)</option>
                    <option value="Advisory">Advisory (সাধারণ নির্দেশনা)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Target Districts & Upazilas:</label>
                <input
                  type="text"
                  value={newDistricts}
                  onChange={(e) => setNewDistricts(e.target.value)}
                  placeholder="e.g., Dinajpur Sadar, Birganj, Kaharole"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Pest / Pathogen Name:</label>
                <input
                  type="text"
                  value={newDisease}
                  onChange={(e) => setNewDisease(e.target.value)}
                  placeholder="e.g., Boro Rice Neck Blast (Pyricularia oryzae)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Target Sector / Species:</label>
                <input
                  type="text"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="e.g., Boro Rice (BRRI-28), Dairy Cattle, Tilapia Ponds"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Immediate Emergency Protocol:</label>
                <textarea
                  value={newProtocol}
                  onChange={(e) => setNewProtocol(e.target.value)}
                  placeholder="e.g., Halt all urea application; keep 5cm standing water; spray Tricyclazole 75% WP @ 0.6g/L."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewOutbreakModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black shadow-lg shadow-red-600/30"
                >
                  Broadcast Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: EDIT USER GOVERNANCE MODAL */}
      {/* ========================================================================= */}
      {editingUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-purple-500/30 p-6 space-y-4 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-purple-400" />
                <span>Edit User Account & Role</span>
              </h3>
              <button onClick={() => setEditingUserId(null)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveUserEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">User Full Name:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">User Role Persona:</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="farmer">Crop Farmer (আবাদি কৃষক)</option>
                  <option value="livestock_farmer">Dairy Farmer (ডেইরি খামারি)</option>
                  <option value="pet_owner">Pet Parent (পোষা প্রাণী অভিভাবক)</option>
                  <option value="expert_agronomist">Agronomist (কৃষি বিশেষজ্ঞ)</option>
                  <option value="veterinarian">Veterinarian (ভেটেরিনারি সার্জন)</option>
                  <option value="field_vendor">Field Vendor (মাঠ টেকনিশিয়ান)</option>
                  <option value="admin">System Admin (প্ল্যাটফর্ম পরিচালক)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Contact Phone:</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-purple-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">District & Upazila Location:</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUserId(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
