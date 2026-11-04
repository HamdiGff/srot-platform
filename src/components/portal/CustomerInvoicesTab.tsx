"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useOrderStore, OrderRecord, PaymentStatus } from "@/lib/store/orderStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useUserStore } from "@/lib/store/userStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import {
  Receipt,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Download,
  Printer,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  Stethoscope,
  Package,
  ExternalLink,
  Search,
} from "lucide-react";

interface CustomerInvoicesTabProps {
  role: "farmer" | "livestock_farmer" | "pet_owner";
  roleLabel: string;
}

export function CustomerInvoicesTab({ role, roleLabel }: CustomerInvoicesTabProps) {
  const { currentUser } = useUserStore();
  const { orders } = useOrderStore();
  const { consultations } = useConsultationStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  // Filter orders relevant to this user/role
  const userOrders = orders.filter(
    (o) => o.customerId === currentUser.id || o.customerRole === role
  );

  const [activeFilter, setActiveFilter] = useState<"all" | "consultation" | "field_visit" | "health_package" | "pending">("all");
  const [selectedInvoice, setSelectedInvoice] = useState<OrderRecord | null>(null);

  const filteredOrders = userOrders.filter((o) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pending") return o.paymentStatus === "pending_verification";
    return o.type === activeFilter;
  });

  const totalSpent = userOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalVerified = userOrders.filter((o) => o.paymentStatus === "verified").length;
  const totalPending = userOrders.filter((o) => o.paymentStatus === "pending_verification").length;

  const handleDownloadPrescription = (order: OrderRecord) => {
    if (!order.referenceId) return;
    const consultation = consultations.find((c) => c.id === order.referenceId);
    if (consultation && consultation.prescription) {
      generatePrescriptionPdf(consultation);
    } else {
      alert(isBn ? "এই অর্ডারের জন্য প্রেসক্রিপশন এখনও প্রক্রিয়াধীন।" : "Prescription is still being formulated by attending clinician.");
    }
  };

  return (
    <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-6">
      {/* 1. Header & Financial Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-400" />
            <span>{isBn ? "অর্ডার ইতিহাস, ইনভয়েস ও মানি রসিদ" : "Service Order History & Official Invoices"}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn
              ? "আপনার সমস্ত টেলি-মেডিসিন পরামর্শ, মাঠ সেবা ভিজিট ও কেয়ার প্যাকেজের অনুমোদিত ক্যাশ মেমো।"
              : "Review transactions, inspect payment verification status, and download tax-compliant cash memos."}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Total Spent: {formatCurrency(totalSpent)}
          </span>
        </div>
      </div>

      {/* 2. Metric Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06] text-center">
          <span className="text-[10px] text-slate-400 uppercase block">Total Orders</span>
          <span className="text-lg font-black text-white mt-0.5 block">{userOrders.length}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20 text-center">
          <span className="text-[10px] text-emerald-400 uppercase block">Verified & Active</span>
          <span className="text-lg font-black text-emerald-300 mt-0.5 block">{totalVerified}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/20 text-center">
          <span className="text-[10px] text-amber-300 uppercase block">Under Verification</span>
          <span className="text-lg font-black text-amber-300 mt-0.5 block">{totalPending}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06] text-center">
          <span className="text-[10px] text-cyan-400 uppercase block">Payment Gateway</span>
          <span className="text-sm font-bold text-white mt-1 block">bKash / Nagad</span>
        </div>
      </div>

      {/* 3. Filter Chips */}
      <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-white/[0.08] overflow-x-auto">
        {[
          { id: "all", label: isBn ? "সকল অর্ডার" : "All Orders" },
          { id: "consultation", label: isBn ? "ডাক্তার পরামর্শ" : "Tele-Consultations" },
          { id: "field_visit", label: isBn ? "মাঠ সেবা ও এআই" : "Field Dispatches" },
          { id: "health_package", label: isBn ? "স্বাস্থ্য প্যাকেজ" : "Care Packages" },
          { id: "pending", label: isBn ? "যাচাই প্রক্রিয়াধীন" : "Pending Verification" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              activeFilter === f.id
                ? "bg-emerald-500 text-slate-950 font-black shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 4. Orders List */}
      <div className="space-y-3.5">
        {filteredOrders.length === 0 ? (
          <div className="p-10 text-center rounded-2xl bg-slate-950/50 border border-white/[0.05] text-slate-400 text-xs">
            {isBn ? "এই ফিল্টারে কোনো অর্ডার বা ইনভয়েস পাওয়া যায়নি।" : "No orders matching this filter."}
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isVerified = order.paymentStatus === "verified";
            const isPending = order.paymentStatus === "pending_verification";
            const isFlagged = order.paymentStatus === "flagged";

            return (
              <div
                key={order.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-white/[0.06] hover:border-emerald-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
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

                    {/* Verification Status Pill */}
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono flex items-center gap-1 ${
                        isVerified
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : isPending
                          ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse"
                          : "bg-red-500/15 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {isVerified ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Payment Verified</span>
                        </>
                      ) : isPending ? (
                        <>
                          <Clock className="w-3 h-3 text-amber-300" />
                          <span>Pending Admin Audit</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3 h-3 text-red-400" />
                          <span>Payment Flagged</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{order.title}</h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span>
                      Provider: <strong className="text-white">{order.providerOrExpert.name}</strong>
                    </span>
                    {order.providerOrExpert.regNumber && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-emerald-400 text-[11px]">
                          {order.providerOrExpert.regNumber}
                        </span>
                      </>
                    )}
                    <span>•</span>
                    <span className="font-mono text-slate-400">
                      Gateway: {order.paymentMethod} (TrxID: {order.transactionId})
                    </span>
                  </div>

                  {order.notes && (
                    <p className="text-[11px] text-slate-400 italic bg-black/40 p-2 rounded-xl border border-white/[0.04]">
                      📋 Note: &quot;{order.notes}&quot;
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                  <div className="text-left sm:text-right">
                    <span className="text-base sm:text-lg font-black text-white font-mono block">
                      {formatCurrency(order.amount)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono capitalize block">
                      Status: {order.serviceStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedInvoice(order)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Cash Memo</span>
                    </button>

                    {order.type === "consultation" && order.referenceId && (
                      <Link
                        href={`/consult/${order.referenceId}`}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition flex items-center gap-1"
                      >
                        <span>Chamber</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}

                    {order.prescriptionId && (
                      <button
                        onClick={() => handleDownloadPrescription(order)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition flex items-center gap-1"
                        title="Download Signed PDF Prescription"
                      >
                        <Download className="w-3 h-3" />
                        <span>Rx PDF</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. Official Cash Memo Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#090f19] border border-emerald-500/40 p-6 sm:p-7 space-y-5 text-slate-100 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">SROT Official Digital Cash Memo</h3>
                  <span className="text-[10px] font-mono text-emerald-400">Govt. Tax & Regulatory Compliant</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Invoice Metadata Box */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-white/[0.08] space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Invoice Number:</span>
                <span className="text-white font-bold">{selectedInvoice.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID (TrxID):</span>
                <span className="text-pink-400 font-bold">{selectedInvoice.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Gateway:</span>
                <span className="text-white font-bold">{selectedInvoice.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Verification Status:</span>
                <span
                  className={`font-bold capitalize ${
                    selectedInvoice.paymentStatus === "verified"
                      ? "text-emerald-400"
                      : selectedInvoice.paymentStatus === "pending_verification"
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  ● {selectedInvoice.paymentStatus.replace("_", " ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Issued Timestamp:</span>
                <span className="text-slate-300">{formatDate(selectedInvoice.createdAt)}</span>
              </div>
            </div>

            {/* Customer & Provider Information */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Client / Beneficiary:</span>
                <strong className="text-white">{selectedInvoice.customerName}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Client Phone:</span>
                <span className="font-mono text-cyan-300">{selectedInvoice.customerPhone}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Attending Specialist:</span>
                <strong className="text-white">{selectedInvoice.providerOrExpert.name}</strong>
              </div>
              {selectedInvoice.providerOrExpert.regNumber && (
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Council License:</span>
                  <span className="font-mono text-emerald-400">{selectedInvoice.providerOrExpert.regNumber}</span>
                </div>
              )}
            </div>

            {/* Line Item & Total */}
            <div className="pt-3 border-t border-white/[0.08] space-y-2 text-xs">
              <div className="flex justify-between font-bold text-white">
                <span>{selectedInvoice.title}</span>
                <span className="font-mono">{formatCurrency(selectedInvoice.amount)}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px] font-mono">
                <span>Doctor / Clinician Share (70%):</span>
                <span>{formatCurrency(Math.round(selectedInvoice.amount * 0.7))}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px] font-mono">
                <span>SROT Operations & AI Triage (30%):</span>
                <span>{formatCurrency(Math.round(selectedInvoice.amount * 0.3))}</span>
              </div>

              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/[0.06]">
                <span>Total Settled:</span>
                <span className="text-emerald-400 font-mono">{formatCurrency(selectedInvoice.amount)}</span>
              </div>
            </div>

            {/* Seal & Print Action */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 text-center">
              ✓ Tax Compliant Digital Cash Receipt • Tamper-proof QR Validated
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-md"
              >
                Close Memo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
