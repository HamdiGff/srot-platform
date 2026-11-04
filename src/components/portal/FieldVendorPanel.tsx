"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Truck,
  MapPin,
  Phone,
  Edit2,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Briefcase,
  Layers,
  X,
  Droplet,
  Flame,
  Check,
  Plus,
  Search,
  Filter,
  DollarSign,
  Wallet,
  ArrowRight,
  TrendingUp,
  Receipt,
  FlaskConical,
  Snowflake,
  Send,
  Loader2,
  Navigation,
} from "lucide-react";

interface WorkOrder {
  id: string;
  orderNumber: string;
  clientName: string;
  clientPhone: string;
  location: string;
  serviceType: string;
  category: "soil" | "ai" | "vet_screening" | "vaccine";
  scheduledTime: string;
  fee: number;
  status: "Pending" | "En Route" | "On Site" | "Completed";
  notes?: string;
  paymentMethod: "Cash on Delivery" | "bKash Digital";
}

interface SemenStraw {
  id: string;
  breed: string;
  bullId: string;
  pedigree: string;
  strawsCount: number;
  canisterSlot: string;
  temperature: string;
  pricePerStraw: number;
}

interface ReagentKit {
  id: string;
  testName: string;
  testsRemaining: number;
  status: "Sufficient" | "Low" | "Critical";
  reagentLot: string;
  shelfLife: string;
}

export function FieldVendorPanel() {
  const { currentUser, updateProfile } = useUserStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  // Active Workspace Sub-Tab
  const [activeTab, setActiveTab] = useState<"orders" | "cryo" | "soil_lab" | "wallet">("orders");

  // Orders State
  const [orders, setOrders] = useState<WorkOrder[]>([
    {
      id: "wo-101",
      orderNumber: "WO-SROT-2026-901",
      clientName: "Tariqul Islam (তারিকুল ইসলাম)",
      clientPhone: "01712-345601",
      location: "Sherpur Upazila, Bogura (5.2 Acres Rice)",
      serviceType: "Mobile Soil Lab N-P-K & pH Core Extraction",
      category: "soil",
      scheduledTime: "Today at 02:00 PM (Emergency Dispatch)",
      fee: 850,
      status: "On Site",
      notes: "Farmer noticed sudden yellowing in tillering stage. Core soil sampling needed at 15cm depth.",
      paymentMethod: "Cash on Delivery",
    },
    {
      id: "wo-102",
      orderNumber: "WO-SROT-2026-902",
      clientName: "Khandaker Rafiq (খন্দকার রফিক)",
      clientPhone: "01812-345602",
      location: "Shahjadpur Dairy Corridor, Sirajganj",
      serviceType: "Doorstep Artificial Insemination (AI) - 100% Holstein Friesian",
      category: "ai",
      scheduledTime: "Today at 04:30 PM",
      fee: 1200,
      status: "En Route",
      notes: "Standing heat confirmed via clear mucous string. Thawing at 37°C required.",
      paymentMethod: "bKash Digital",
    },
    {
      id: "wo-103",
      orderNumber: "WO-SROT-2026-903",
      clientName: "Al-Amin Hossain (আল-আমিন)",
      clientPhone: "01755-998811",
      location: "Bogura Sadar Dairy Cluster",
      serviceType: "Bovine California Mastitis (CMT) On-Site Screening",
      category: "vet_screening",
      scheduledTime: "Today at 10:00 AM",
      fee: 500,
      status: "Completed",
      notes: "Quarters 1 & 2 scored Negative; Quarter 3 scored Trace. Disinfected with iodine dip.",
      paymentMethod: "Cash on Delivery",
    },
    {
      id: "wo-104",
      orderNumber: "WO-SROT-2026-904",
      clientName: "Begum Rokeya (রোকেয়া বেগম)",
      clientPhone: "01911-223344",
      location: "Gabtali Upazila, Bogura",
      serviceType: "Goat Peste des Petits Ruminants (PPR) Cold-Chain Vaccination",
      category: "vaccine",
      scheduledTime: "Tomorrow at 09:30 AM",
      fee: 450,
      status: "Pending",
      notes: "12 Black Bengal female goats to be vaccinated before monsoon humidity surge.",
      paymentMethod: "Cash on Delivery",
    },
  ]);

  // Semen Straws Inventory State
  const [straws, setStraws] = useState<SemenStraw[]>([
    {
      id: "st-1",
      breed: "100% Holstein Friesian (US Pedigree)",
      bullId: "HF-USA-TITAN-409",
      pedigree: "+3,400 L/lactation maternal yield, 4.1% fat",
      strawsCount: 8,
      canisterSlot: "Canister 1 • Rack A",
      temperature: "-196°C Liquid N2",
      pricePerStraw: 1200,
    },
    {
      id: "st-2",
      breed: "75% Sahiwal Cross (High Heat Tolerance)",
      bullId: "SAH-SAVAR-902",
      pedigree: "Tropical tick resistant, +2,200 L yield, 4.8% fat",
      strawsCount: 6,
      canisterSlot: "Canister 1 • Rack B",
      temperature: "-196°C Liquid N2",
      pricePerStraw: 950,
    },
    {
      id: "st-3",
      breed: "Red Chittagong Cattle (RCC Heritage Pure)",
      bullId: "RCC-CHOTTO-112",
      pedigree: "Native disease resilient, high fertility longevity",
      strawsCount: 4,
      canisterSlot: "Canister 2 • Rack A",
      temperature: "-196°C Liquid N2",
      pricePerStraw: 800,
    },
  ]);

  // Reagent Kit Inventory State
  const [reagents, setReagents] = useState<ReagentKit[]>([
    {
      id: "rg-1",
      testName: "Soil Available Nitrate (NO3-N) Reagent A & B",
      testsRemaining: 38,
      status: "Sufficient",
      reagentLot: "SRDI-BOG-2026-08",
      shelfLife: "Dec 2026",
    },
    {
      id: "rg-2",
      testName: "Soil Olsen Phosphorus (PO4-P) Molybdate Blue",
      testsRemaining: 24,
      status: "Sufficient",
      reagentLot: "SRDI-BOG-2026-11",
      shelfLife: "Nov 2026",
    },
    {
      id: "rg-3",
      testName: "Available Potassium (K) Turbidity Reagent",
      testsRemaining: 9,
      status: "Low",
      reagentLot: "SRDI-BOG-2026-03",
      shelfLife: "Aug 2026",
    },
    {
      id: "rg-4",
      testName: "Calibrated pH Indicator Solution & Strips (pH 4.0 - 9.0)",
      testsRemaining: 45,
      status: "Sufficient",
      reagentLot: "SRDI-BOG-2026-14",
      shelfLife: "Jan 2027",
    },
  ]);

  // Order Filter & Search
  const [orderFilter, setOrderFilter] = useState<"All" | "Pending" | "En Route" | "On Site" | "Completed">("All");

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);

  // New Work Order Modal State
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newServiceType, setNewServiceType] = useState("Doorstep Artificial Insemination (AI) - 100% Holstein Straw");
  const [newCategory, setNewCategory] = useState<WorkOrder["category"]>("ai");
  const [newFee, setNewFee] = useState(1200);
  const [newScheduledTime, setNewScheduledTime] = useState("Today at 05:00 PM");
  const [newNotes, setNewNotes] = useState("");

  // Payout / Withdrawal State
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(2000);
  const [withdrawWallet, setWithdrawWallet] = useState("01712-345601");
  const [withdrawProvider, setWithdrawProvider] = useState<"bKash" | "Nagad">("bKash");
  const [isProcessingWithdraw, setIsProcessingWithdraw] = useState(false);
  const [withdrawnTotal, setWithdrawnTotal] = useState(4500);

  // Save Profile Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, location });
    setIsProfileModalOpen(false);
  };

  // Status Lifecycle Progression Handler
  const handleUpdateOrderStatus = (orderId: string, nextStatus: WorkOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  // Create New Work Order Handler
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newClientPhone.trim()) return;

    const newOrder: WorkOrder = {
      id: `wo-${Date.now()}`,
      orderNumber: `WO-SROT-2026-${Math.floor(100 + Math.random() * 900)}`,
      clientName: newClientName,
      clientPhone: newClientPhone,
      location: newLocation || currentUser.location,
      serviceType: newServiceType,
      category: newCategory,
      scheduledTime: newScheduledTime,
      fee: Number(newFee) || 800,
      status: "Pending",
      notes: newNotes,
      paymentMethod: "Cash on Delivery",
    };

    setOrders([newOrder, ...orders]);
    setNewClientName("");
    setNewClientPhone("");
    setNewLocation("");
    setNewNotes("");
    setIsNewOrderModalOpen(false);
  };

  // Restock Straws Handler
  const handleRestockStraws = (strawId: string) => {
    setStraws((prev) =>
      prev.map((s) => (s.id === strawId ? { ...s, strawsCount: s.strawsCount + 5 } : s))
    );
  };

  // Log Straw Insemination Handler
  const handleUseStraw = (strawId: string) => {
    setStraws((prev) =>
      prev.map((s) => (s.id === strawId && s.strawsCount > 0 ? { ...s, strawsCount: s.strawsCount - 1 } : s))
    );
  };

  // Reorder Reagent Kit Handler
  const handleReorderReagent = (reagentId: string) => {
    setReagents((prev) =>
      prev.map((r) => (r.id === reagentId ? { ...r, testsRemaining: r.testsRemaining + 25, status: "Sufficient" } : r))
    );
  };

  // Handle Wallet Withdrawal
  const handleExecuteWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingWithdraw(true);
    setTimeout(() => {
      setWithdrawnTotal((prev) => prev + Number(withdrawAmount));
      setIsProcessingWithdraw(false);
      setIsWithdrawModalOpen(false);
    }, 1200);
  };

  // Calculations
  const completedOrders = orders.filter((o) => o.status === "Completed");
  const totalCompletedGross = completedOrders.reduce((sum, o) => sum + o.fee, 0);
  const techEarnings75 = Math.round(totalCompletedGross * 0.75);
  const availableBalance = Math.max(0, techEarnings75 + 3200 - withdrawnTotal);
  const totalStrawCount = straws.reduce((sum, s) => sum + s.strawsCount, 0);
  const totalSoilTests = reagents.reduce((sum, r) => sum + r.testsRemaining, 0);

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "All") return true;
    return o.status === orderFilter;
  });

  return (
    <div className="w-full space-y-6">
      {/* 1. TECHNICIAN COMMAND STRIP & PROFILE */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-slate-900 to-[#100a02] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/60 shadow-lg"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>DLS & SRDI CERTIFIED FIELD TECHNICIAN</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                ● Live GPS Active (Radio On)
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
            <p className="text-xs text-amber-200/80 font-mono mt-0.5">
              Registration: DLS-PARAVET-2022-771 • Mobile Lab Unit #04
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{currentUser.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-mono">{currentUser.phone}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsNewOrderModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black transition shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>{isBn ? "নতুন ফিল্ড অর্ডার তৈরি করুন" : "+ Walk-In Work Order"}</span>
          </button>

          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition shadow-sm"
          >
            <Edit2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBn ? "কভারেজ জোন" : "Service Radius"}</span>
          </button>
        </div>
      </div>

      {/* 2. OPERATIONAL TELEMETRY METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">
            {isBn ? "আজকের মোট কালেকশন" : "Today's Gross Collections"}
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5 block">
            {formatCurrency(totalCompletedGross)}
          </span>
          <span className="text-[10px] text-slate-400">Cash & bKash Reconciled</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">
            {isBn ? "চলতি ফিল্ড জব" : "Active Dispatches"}
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-0.5 block">
            {orders.filter((o) => o.status !== "Completed").length} Jobs
          </span>
          <span className="text-[10px] text-amber-300 font-medium">Under 2-4h Response SLA</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">
            {isBn ? "ক্রায়ো-ট্যাংক সিমেন স্ট্রো" : "Cryo-Tank Semen Straws"}
          </span>
          <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono mt-0.5 block">
            {totalStrawCount} Straws
          </span>
          <span className="text-[10px] text-cyan-400 font-medium">-196°C Liquid N2 Safe</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">
            {isBn ? "মাটি পরীক্ষা রিএজেন্ট কিট" : "Soil Lab Reagents"}
          </span>
          <span className="text-xl sm:text-2xl font-black text-purple-300 font-mono mt-0.5 block">
            {totalSoilTests} Tests
          </span>
          <span className="text-[10px] text-purple-400 font-medium">N-P-K & pH Buffer Strips</span>
        </div>
      </div>

      {/* 3. MULTI-TAB WORKSPACE SWITCHER */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-white/[0.08] overflow-x-auto">
        {[
          {
            id: "orders",
            label: isBn ? "ফিল্ড ওয়ার্ক অর্ডার কিউ" : "Work Orders Dispatch Queue",
            icon: Briefcase,
            count: orders.length,
          },
          {
            id: "cryo",
            label: isBn ? "ক্রায়ো-ক্যানিস্টার ও সিমেন স্ট্রো" : "Cryo-Canister Semen Inventory",
            icon: Snowflake,
            count: totalStrawCount,
          },
          {
            id: "soil_lab",
            label: isBn ? "মোবাইল সয়েল ল্যাব ও রিএজেন্ট" : "Mobile Soil Lab Reagents",
            icon: FlaskConical,
            count: totalSoilTests,
          },
          {
            id: "wallet",
            label: isBn ? "ফিল্ড কালেকশন ও কমিশন লেজার" : "Collections Ledger & Wallet",
            icon: Wallet,
            count: null,
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
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 font-black"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? "bg-slate-950 text-amber-300" : "bg-white/[0.08] text-slate-300"
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
      {/* TAB 1: WORK ORDERS DISPATCH QUEUE */}
      {/* ========================================================================= */}
      {activeTab === "orders" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>{isBn ? "জরুরি ফিল্ড সার্ভিস ও অন-সাইট ভিজিট কিউ" : "Emergency On-Site Dispatch Queue"}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn
                  ? "কৃষকের খামারে পৌঁছে স্ট্যাটাস আপডেট করুন এবং সম্পন্ন হলে নগদ বা বিকাশ সংগ্রহ নিশ্চিত করুন।"
                  : "Track door-to-door dispatches, transition work stages, and collect fees on-site."}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-white/[0.08] overflow-x-auto">
              {(["All", "Pending", "En Route", "On Site", "Completed"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setOrderFilter(filter)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    orderFilter === filter
                      ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3.5">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-950/50 border border-white/[0.05] text-slate-400 text-xs">
                {isBn ? "এই ক্যাটাগরিতে কোনো ওয়ার্ক অর্ডার নেই।" : "No work orders matching this filter."}
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] hover:border-amber-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">{order.orderNumber}</span>
                      <span className="text-slate-600">•</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono ${
                          order.status === "Completed"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : order.status === "On Site"
                            ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 animate-pulse"
                            : order.status === "En Route"
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            : "bg-slate-800 text-slate-300 border border-white/[0.08]"
                        }`}
                      >
                        ● {order.status}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 font-mono">
                        {order.paymentMethod}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white">{order.serviceType}</h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                      <span>
                        Farmer: <strong className="text-white">{order.clientName}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-cyan-400" />
                        <a href={`tel:${order.clientPhone}`} className="font-mono text-cyan-300 hover:underline">
                          {order.clientPhone}
                        </a>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{order.location}</span>
                    </p>

                    {order.notes && (
                      <div className="p-2 rounded-xl bg-black/40 border border-white/[0.04] text-[11px] text-slate-300 italic font-mono mt-1">
                        📋 Note: &quot;{order.notes}&quot;
                      </div>
                    )}
                  </div>

                  {/* Actions & Lifecycle Progress */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                    <div className="text-left sm:text-right">
                      <span className="text-base sm:text-lg font-black text-white font-mono block">
                        {formatCurrency(order.fee)}
                      </span>
                      <span className="text-[10px] text-amber-300/80 block font-mono">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {order.scheduledTime}
                      </span>
                    </div>

                    {order.status !== "Completed" ? (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {order.status === "Pending" && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "En Route")}
                            className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5"
                          >
                            <Navigation className="w-3.5 h-3.5 text-amber-400" />
                            <span>Start En Route</span>
                          </button>
                        )}

                        {order.status === "En Route" && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "On Site")}
                            className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition flex items-center gap-1.5"
                          >
                            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Arrived On Site</span>
                          </button>
                        )}

                        {order.status === "On Site" && (
                          <button
                            onClick={() => handleUpdateOrderStatus(order.id, "Completed")}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition"
                          >
                            <Check className="w-4 h-4 text-slate-950" />
                            <span>Complete & Collect {formatCurrency(order.fee)}</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Receipt Settled</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CRYO-CANISTER SEMEN INVENTORY */}
      {/* ========================================================================= */}
      {activeTab === "cryo" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Snowflake className="w-4 h-4 text-cyan-400" />
                <span>{isBn ? "তরল নাইট্রোজেন (-১৯৬° সে.) ক্রায়ো-ক্যানিস্টার ও সিমেন স্ট্রো স্টক" : "-196°C Liquid N2 Cryo-Canister Semen Inventory"}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn
                  ? "উন্নত জাতের পেডিগ্রি সিমেন স্ট্রো ট্র্যাকিং এবং অন-সাইট কৃত্রিম প্রজনন (AI) রেকর্ড।"
                  : "Track high-yield bovine genetics, batch lineage, thawing logs, and straw counts."}
              </p>
            </div>

            <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Liquid N2 Level: 85% (Safe)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {straws.map((straw) => (
              <div
                key={straw.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.08] hover:border-cyan-500/30 transition flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      {straw.canisterSlot}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {straw.temperature}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-2.5">{straw.breed}</h3>
                  <p className="text-xs font-mono text-amber-400 mt-0.5">Bull: {straw.bullId}</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{straw.pedigree}</p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Available Stock:</span>
                    <span className="font-mono font-black text-lg text-cyan-300">
                      {straw.strawsCount} Straws
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Farmer Insemination Fee:</span>
                    <span className="font-mono font-bold text-white">
                      {formatCurrency(straw.pricePerStraw)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleUseStraw(straw.id)}
                      disabled={straw.strawsCount === 0}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/40 text-xs font-bold transition disabled:opacity-40"
                    >
                      Log Used (AI)
                    </button>
                    <button
                      onClick={() => handleRestockStraws(straw.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition"
                    >
                      + Restock 5
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MOBILE SOIL LAB REAGENTS */}
      {/* ========================================================================= */}
      {activeTab === "soil_lab" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-purple-400" />
                <span>{isBn ? "মোবাইল সয়েল টেস্টিং কিট ও এন-পি-কে রিএজেন্ট কনজুমেবলস" : "Mobile Soil Lab Reagent Consumables"}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn
                  ? "মাটির নাইট্রোজেন, ফসফরাস, পটাশিয়াম ও পিএইচ টেস্ট কিটের বর্তমান মজুত পর্যবেক্ষণ।"
                  : "Ground truth soil chemistry reagents calibrated according to SRDI laboratory standards."}
              </p>
            </div>

            <Link
              href="/tools/soil-interpreter"
              className="text-xs text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
            >
              <span>{isBn ? "সয়েল ইন্টারপ্রেটার টুল &rarr;" : "Open Soil Interpreter &rarr;"}</span>
            </Link>
          </div>

          <div className="space-y-3">
            {reagents.map((reagent) => (
              <div
                key={reagent.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        reagent.status === "Sufficient"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {reagent.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Lot: {reagent.reagentLot}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 font-mono">Exp: {reagent.shelfLife}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-1">{reagent.testName}</h3>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-lg font-black font-mono text-purple-300 block">
                      {reagent.testsRemaining} Tests Left
                    </span>
                    <span className="text-[10px] text-slate-400">Ready for Extraction</span>
                  </div>

                  <button
                    onClick={() => handleReorderReagent(reagent.id)}
                    className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/30 text-xs font-bold transition"
                  >
                    + Restock 25
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: COLLECTIONS LEDGER & WALLET */}
      {/* ========================================================================= */}
      {activeTab === "wallet" && (
        <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? "ফিল্ড টেকনিশিয়ান কমিশন ও কালেকশন লেজার" : "Technician Collections Ledger & 75/25 Split"}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn
                  ? "মাঠ পর্যায়ের নগদ এবং ডিজিটাল পেমেন্ট রিকনসিলিয়েশন ও পার্সোনাল ওয়ালেট উত্তোলন।"
                  : "Transparent audit log for on-site cash collections and real-time technician payout."}
              </p>
            </div>

            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              disabled={availableBalance < 500}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition shadow-md shadow-emerald-500/20 disabled:opacity-50"
            >
              Withdraw to bKash / Nagad
            </button>
          </div>

          {/* Revenue Split Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.08]">
              <span className="text-[11px] text-slate-400 font-mono uppercase block">Gross Field GMV</span>
              <span className="text-2xl font-black text-white font-mono mt-1 block">
                {formatCurrency(totalCompletedGross)}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">100% Client Paid</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20">
              <span className="text-[11px] text-emerald-400 font-mono uppercase block">Technician Share (75%)</span>
              <span className="text-2xl font-black text-emerald-300 font-mono mt-1 block">
                {formatCurrency(techEarnings75)}
              </span>
              <span className="text-[11px] text-emerald-400/80 mt-1 block">Your Net Commission</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/[0.08]">
              <span className="text-[11px] text-cyan-400 font-mono uppercase block">Available Balance</span>
              <span className="text-2xl font-black text-cyan-300 font-mono mt-1 block">
                {formatCurrency(availableBalance)}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">Ready for Instant Cashout</span>
            </div>
          </div>

          {/* Detailed Receipts Table */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Settled Field Invoices
            </span>
            <div className="space-y-2">
              {completedOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.05] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-white">{order.orderNumber}</strong>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300">{order.clientName}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                      {order.serviceType} • {order.paymentMethod}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-white block">
                      {formatCurrency(order.fee)}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      Net: {formatCurrency(Math.round(order.fee * 0.75))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: NEW WORK ORDER MODAL */}
      {/* ========================================================================= */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#090f19] border border-amber-500/30 p-6 sm:p-7 space-y-4 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>{isBn ? "নতুন ফিল্ড ভিজিট ও ওয়ার্ক অর্ডার নথিভুক্তকরণ" : "Create Walk-In / Call-In Work Order"}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isBn ? "কৃষকের খামারে অন-সাইট সেবার জন্য তথ্য পূরণ করুন।" : "Log a direct farm visit requested via phone call or field encounter."}
                </p>
              </div>
              <button
                onClick={() => setIsNewOrderModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Farmer Full Name:</label>
                  <input
                    type="text"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g., Md. Rahim Sheikh"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-amber-500 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Farmer Contact Phone:</label>
                  <input
                    type="text"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    placeholder="017XX-XXXXXX"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-amber-500 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Farm Location / Village & Upazila:</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g., Shibganj Upazila, Bogura (Plot #12)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-amber-500 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Service Type:</label>
                  <select
                    value={newServiceType}
                    onChange={(e) => {
                      setNewServiceType(e.target.value);
                      if (e.target.value.includes("AI")) {
                        setNewCategory("ai");
                        setNewFee(1200);
                      } else if (e.target.value.includes("Soil")) {
                        setNewCategory("soil");
                        setNewFee(850);
                      } else if (e.target.value.includes("Mastitis")) {
                        setNewCategory("vet_screening");
                        setNewFee(500);
                      } else {
                        setNewCategory("vaccine");
                        setNewFee(450);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="Doorstep Artificial Insemination (AI) - 100% Holstein Straw">
                      Doorstep Artificial Insemination (AI) - Holstein
                    </option>
                    <option value="Mobile Soil Lab N-P-K & pH Core Extraction">
                      Mobile Soil Lab N-P-K & pH Test
                    </option>
                    <option value="Bovine California Mastitis (CMT) On-Site Screening">
                      Bovine Mastitis (CMT) Screening
                    </option>
                    <option value="Goat PPR / Cattle FMD Cold-Chain Vaccine Dispatch">
                      Cold-Chain Livestock Vaccination
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Scheduled Fee (৳ BDT):</label>
                  <input
                    type="number"
                    value={newFee}
                    onChange={(e) => setNewFee(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-amber-500 text-xs font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Field Observation / Clinical Notes:</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g., Cow in standing heat since 6 AM; soil plot showing nitrogen chlorosis..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black shadow-lg"
                >
                  Create Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: WITHDRAWAL / WALLET CASHOUT MODAL */}
      {/* ========================================================================= */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-emerald-500/30 p-6 space-y-4 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span>Withdraw Field Commission</span>
              </h3>
              <button onClick={() => setIsWithdrawModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleExecuteWithdrawal} className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                Available to withdraw: <strong className="font-mono text-white">{formatCurrency(availableBalance)}</strong>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Payment Gateway:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWithdrawProvider("bKash")}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      withdrawProvider === "bKash"
                        ? "bg-pink-600/30 border-pink-500 text-pink-200"
                        : "bg-slate-950 border-white/[0.08] text-slate-400"
                    }`}
                  >
                    bKash Wallet
                  </button>
                  <button
                    type="button"
                    onClick={() => setWithdrawProvider("Nagad")}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      withdrawProvider === "Nagad"
                        ? "bg-orange-600/30 border-orange-500 text-orange-200"
                        : "bg-slate-950 border-white/[0.08] text-slate-400"
                    }`}
                  >
                    Nagad Wallet
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Mobile Wallet Number:</label>
                <input
                  type="text"
                  value={withdrawWallet}
                  onChange={(e) => setWithdrawWallet(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Withdraw Amount (৳):</label>
                <input
                  type="number"
                  max={availableBalance}
                  min={500}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500 font-mono text-base font-bold"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessingWithdraw || withdrawAmount > availableBalance}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-lg flex items-center gap-1.5"
                >
                  {isProcessingWithdraw ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Confirm Cashout</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: PROFILE / COVERAGE RADIUS EDIT MODAL */}
      {/* ========================================================================= */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-amber-500/30 p-6 space-y-4 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-amber-400" />
                <span>{isBn ? "কভারেজ এলাকা ও যোগাযোগ সম্পাদনা" : "Edit Field Tech Coverage"}</span>
              </h3>
              <button onClick={() => setIsProfileModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Technician Full Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Dispatch Phone Hotline:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Assigned Districts & Upazilas:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold"
                >
                  Save Coverage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
