"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatCurrency } from "@/lib/utils";
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
} from "lucide-react";

interface WorkOrder {
  id: string;
  orderNumber: string;
  clientName: string;
  clientPhone: string;
  location: string;
  serviceType: string;
  scheduledTime: string;
  fee: number;
  status: "Pending" | "En Route" | "On Site" | "Completed";
  notes?: string;
}

export function FieldVendorPanel() {
  const { currentUser, updateProfile } = useUserStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [orders, setOrders] = useState<WorkOrder[]>([
    {
      id: "wo-101",
      orderNumber: "WO-SROT-2026-901",
      clientName: "Tariqul Islam (তারিকুল ইসলাম)",
      clientPhone: "01712-345601",
      location: "Sherpur Upazila, Bogura (5.2 Acres Rice)",
      serviceType: "Mobile Soil Lab N-P-K & pH Core Extraction",
      scheduledTime: "Today at 02:00 PM (Emergency Dispatch)",
      fee: 850,
      status: "On Site",
      notes: "Farmer noticed sudden yellowing in tillering stage.",
    },
    {
      id: "wo-102",
      orderNumber: "WO-SROT-2026-902",
      clientName: "Khandaker Rafiq (খন্দকার রফিক)",
      clientPhone: "01812-345602",
      location: "Shahjadpur Dairy Corridor, Sirajganj",
      serviceType: "Doorstep Artificial Insemination (AI) - 100% Holstein Straw",
      scheduledTime: "Today at 04:30 PM",
      fee: 1200,
      status: "En Route",
      notes: "Standing heat confirmed via mucous string test.",
    },
    {
      id: "wo-103",
      orderNumber: "WO-SROT-2026-903",
      clientName: "Al-Amin Hossain (আল-আমিন)",
      clientPhone: "01755-998811",
      location: "Bogura Sadar Dairy Cluster",
      serviceType: "Bovine California Mastitis (CMT) On-Site Screening",
      scheduledTime: "Completed Today at 10:00 AM",
      fee: 500,
      status: "Completed",
      notes: "Quarters 1 & 2 scored Negative; Quarter 3 scored Trace.",
    },
  ]);

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, location });
    setIsProfileModalOpen(false);
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: WorkOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const totalCompletedEarnings = orders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + o.fee, 0);

  return (
    <div className="w-full space-y-6">
      {/* 1. Technician Unit Header Strip */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-amber-500/20 bg-gradient-to-r from-amber-950/40 via-slate-900 to-[#100a02] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/60 shadow-lg shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>DLS & SRDI CERTIFIED FIELD TECHNICIAN</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400">Status: On-Duty (Active Dispatch)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentUser.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentUser.phone}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition shadow-sm"
          >
            <Edit2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBn ? "কভারেজ এরিয়া সম্পাদনা" : "Edit Service Area"}</span>
          </button>
        </div>
      </div>

      {/* 2. Dispatch Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Completed Today</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5 block">
            {formatCurrency(totalCompletedEarnings)}
          </span>
          <span className="text-[10px] text-slate-400">Cash / bKash Collected</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Active Work Orders</span>
          <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-0.5 block">
            {orders.filter((o) => o.status !== "Completed").length} Jobs
          </span>
          <span className="text-[10px] text-amber-300 font-medium">Under 2-4h SLA</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Cryo-Tank Inventory</span>
          <span className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5 block">16 Straws</span>
          <span className="text-[10px] text-cyan-400 font-medium">-196°C Liquid N2 Safe</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Soil Lab Reagents</span>
          <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono mt-0.5 block">45 Tests</span>
          <span className="text-[10px] text-emerald-400 font-medium">N-P-K & pH Strips</span>
        </div>
      </div>

      {/* 3. Doorstep Work Orders Queue & Action Controls */}
      <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm sm:text-base font-black text-white">
              {isBn ? "মাঠ পর্যায়ের ওয়ার্ক অর্ডার ও জরুরি কল কিউ" : "Doorstep Dispatch & Field Service Work Orders"}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold font-mono">
              {orders.length} Dispatches
            </span>
          </div>

          <Link
            href="/services/field-visits"
            className="text-xs text-amber-400 hover:text-amber-300 font-bold"
          >
            {isBn ? "ফিল্ড ভিজিট ক্যাটালগ &rarr;" : "View Full Catalog &rarr;"}
          </Link>
        </div>

        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400">{order.orderNumber}</span>
                  <span className="text-slate-600">•</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono ${
                      order.status === "Completed"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : order.status === "On Site"
                        ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 animate-pulse"
                        : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-1">{order.serviceType}</h3>
                <p className="text-xs text-slate-300">
                  Client: <strong className="text-white">{order.clientName}</strong> • Phone:{" "}
                  <span className="font-mono text-cyan-300">{order.clientPhone}</span>
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{order.location}</span>
                </p>
                {order.notes && (
                  <p className="text-[11px] text-slate-400 italic mt-1 font-mono">
                    Note: &quot;{order.notes}&quot;
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-base font-black text-white font-mono block">
                    {formatCurrency(order.fee)}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">{order.scheduledTime}</span>
                </div>

                {order.status !== "Completed" && (
                  <div className="flex items-center gap-1.5">
                    {order.status === "Pending" && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, "En Route")}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-bold"
                      >
                        Start En Route
                      </button>
                    )}
                    {order.status === "En Route" && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, "On Site")}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold"
                      >
                        Mark Arrived On Site
                      </button>
                    )}
                    {order.status === "On Site" && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, "Completed")}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black shadow-md flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Complete Job & Collect {formatCurrency(order.fee)}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-amber-500/30 p-6 space-y-4 text-slate-100">
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
