"use client";

import React, { useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  Wallet,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Building2,
  CheckCircle2,
  Clock,
  Download,
  X,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface PayoutTransaction {
  id: string;
  caseNumber: string;
  clientName: string;
  subject: string;
  channel: string;
  totalFee: number;
  doctorShare: number; // 70%
  srotShare: number;   // 30%
  date: string;
  status: "settled" | "pending";
}

export function ExpertEarningsWallet() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [availableBalance, setAvailableBalance] = useState(14350);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("5000");
  const [withdrawMethod, setWithdrawMethod] = useState<"bkash" | "nagad" | "bank">("bkash");
  const [accountNumber, setAccountNumber] = useState("01712-345678");
  const [isWithdrawSuccess, setIsWithdrawSuccess] = useState(false);

  // Realistic mock consultation ledger with 70/30 commission split
  const [transactions, setTransactions] = useState<PayoutTransaction[]>([
    {
      id: "tx-901",
      caseNumber: "CASE-AGRI-101",
      clientName: "Md. Tariqul Islam (দিনাজপুর)",
      subject: "Aman Rice (BRRI-28) Leaf Blast",
      channel: "Live Video",
      totalFee: 350,
      doctorShare: 245, // 70%
      srotShare: 105,   // 30%
      date: "2026-10-29T10:15:00Z",
      status: "settled",
    },
    {
      id: "tx-902",
      caseNumber: "CASE-VET-202",
      clientName: "Al-Hajj Khorshed Alam (পাবনা)",
      subject: "Friesian Cow Lumpy Skin Disease (LSD)",
      channel: "Direct Audio Call",
      totalFee: 250,
      doctorShare: 175,
      srotShare: 75,
      date: "2026-10-28T16:40:00Z",
      status: "settled",
    },
    {
      id: "tx-903",
      caseNumber: "CASE-PLT-303",
      clientName: "Kamrul Hasan Sumon (ময়মনসিংহ)",
      subject: "Sonali Broiler Gumboro (IBD) Mortality",
      channel: "Photo Review + Chat",
      totalFee: 200,
      doctorShare: 140,
      srotShare: 60,
      date: "2026-10-28T12:00:00Z",
      status: "settled",
    },
    {
      id: "tx-904",
      caseNumber: "CASE-FSH-404",
      clientName: "Abdul Motaleb (ত্রিশাল)",
      subject: "Pangas & Carp Dawn Dissolved Oxygen Crash",
      channel: "Live Video",
      totalFee: 300,
      doctorShare: 210,
      srotShare: 90,
      date: "2026-10-27T08:30:00Z",
      status: "settled",
    },
    {
      id: "tx-905",
      caseNumber: "CASE-PET-505",
      clientName: "Mehjabin Chowdhury (ঢাকা)",
      subject: "Persian Cat Severe Otic Pruritus",
      channel: "Live Video",
      totalFee: 350,
      doctorShare: 245,
      srotShare: 105,
      date: "2026-10-26T18:20:00Z",
      status: "settled",
    },
  ]);

  const totalGrossBilling = transactions.reduce((acc, t) => acc + t.totalFee, 0) + 18400;
  const totalDoctorEarnings = Math.round(totalGrossBilling * 0.7);
  const totalSrotCommission = totalGrossBilling - totalDoctorEarnings;

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(withdrawAmount) || 0;
    if (amountNum <= 0 || amountNum > availableBalance) return;

    setAvailableBalance((prev) => prev - amountNum);
    setIsWithdrawSuccess(true);
    setTimeout(() => {
      setIsWithdrawSuccess(false);
      setIsWithdrawModalOpen(false);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Summary Cards */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-1">
            <Wallet className="w-3.5 h-3.5" />
            <span>{isBn ? "চিকিৎসক ও বিশেষজ্ঞ আর্নিং ওয়ালেট" : "Specialist Earnings & Commission Wallet"}</span>
          </div>
          <h2 className="text-xl font-black text-white">
            {isBn ? "পরামর্শ আয় ও ৭০/৩০ কমিশন লেজার" : "Consultation Income & 70/30 Commission Ledger"}
          </h2>
          <p className="text-xs text-slate-400">
            {isBn
              ? "প্রতিটি সফল কনসাল্টেশনের ৭০% ফি তাৎক্ষণিকভাবে আপনার ওয়ালেটে জমা হয়। সরাসরি বিকাশ বা ব্যাংকে উত্তোলনযোগ্য।"
              : "70% of every completed consultation is credited immediately to your balance, withdrawable via bKash/Bank."}
          </p>
        </div>

        {/* Withdraw CTA */}
        <button
          onClick={() => setIsWithdrawModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-400 shrink-0"
        >
          <ArrowUpRight className="w-4 h-4 text-slate-950" />
          <span>{isBn ? "টাকা উত্তোলন করুন (Withdraw)" : "Withdraw Earnings"}</span>
        </button>
      </div>

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Available Balance */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900/80 border border-emerald-500/30">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            {isBn ? "উত্তোলনযোগ্য ব্যালেন্স" : "Available Balance"}
          </span>
          <span className="text-2xl font-black text-white block">
            {formatCurrency(availableBalance)}
          </span>
          <span className="text-[10px] text-emerald-300/80 mt-1 block">
            {isBn ? "✓ তাৎক্ষণিক উত্তোলনযোগ্য" : "✓ Ready for instant payout"}
          </span>
        </div>

        {/* Card 2: 70% Doctor Net */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            {isBn ? "চিকিৎসকের নিট আয় (৭০%)" : "Doctor Net Income (70%)"}
          </span>
          <span className="text-2xl font-black text-emerald-400 block">
            {formatCurrency(totalDoctorEarnings)}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {isBn ? "চলতি মাসে ৭৪টি পরামর্শ" : "74 cases settled this month"}
          </span>
        </div>

        {/* Card 3: 30% SROT Fee */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            {isBn ? "প্ল্যাটফর্ম শেয়ার (৩০%)" : "SROT Platform Fee (30%)"}
          </span>
          <span className="text-2xl font-black text-cyan-400 block">
            {formatCurrency(totalSrotCommission)}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {isBn ? "সার্ভার, কিউআর ও সাপোর্ট ফি" : "Tele-health infrastructure & SMS"}
          </span>
        </div>

        {/* Card 4: Gross Transacted */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/[0.06]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            {isBn ? "মোট গ্রস লেনদেন মান" : "Total Gross GMV"}
          </span>
          <span className="text-2xl font-black text-white block">
            {formatCurrency(totalGrossBilling)}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {isBn ? "১০০% ভেরিফাইড রোগী ফিস" : "100% verified farmer billings"}
          </span>
        </div>
      </div>

      {/* 2. Detailed Transparent Transaction Table */}
      <div className="rounded-2xl bg-[#090f19] border border-white/[0.08] overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {isBn ? "সাম্প্রতিক কনসাল্টেশন ও নিষ্পত্তি বিবরণী" : "Recent Consultation Settlements"}
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {isBn ? "অটো-স্প্লিট: ৭০% ডক্টর / ৩০% প্ল্যাটফর্ম" : "Auto-Split: 70% Doctor / 30% SROT"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-white/[0.06] text-[11px] font-bold">
              <tr>
                <th className="py-3 px-4">{isBn ? "কেস আইডি" : "Case ID"}</th>
                <th className="py-3 px-4">{isBn ? "রোগী / খামারি ও বিষয়" : "Client & Subject"}</th>
                <th className="py-3 px-4">{isBn ? "পরামর্শ মাধ্যম" : "Channel"}</th>
                <th className="py-3 px-4 text-right">{isBn ? "মোট ফি" : "Total Fee"}</th>
                <th className="py-3 px-4 text-right text-emerald-400">{isBn ? "আপনার আয় (৭০%)" : "Your Share (70%)"}</th>
                <th className="py-3 px-4 text-right text-cyan-400">{isBn ? "এসআরওটি (৩০%)" : "SROT (30%)"}</th>
                <th className="py-3 px-4 text-center">{isBn ? "স্ট্যাটাস" : "Status"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-4 font-mono font-bold text-white text-[11px]">
                    {tx.caseNumber}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-white block">{tx.clientName}</span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">{tx.subject}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 border border-white/[0.05]">
                      {tx.channel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-white font-mono">
                    {formatCurrency(tx.totalFee)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-400 font-mono">
                    +{formatCurrency(tx.doctorShare)}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-cyan-300 font-mono">
                    {formatCurrency(tx.srotShare)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>{isBn ? "নিষ্পন্ন" : "Settled"}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Withdraw Earnings Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090f19] border border-emerald-500/30 p-6 shadow-2xl text-slate-100">
            <button
              onClick={() => setIsWithdrawModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {isWithdrawSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {isBn ? "উত্তোলন সফলভাবে সম্পন্ন হয়েছে!" : "Payout Processed Successfully!"}
                </h3>
                <p className="text-xs text-slate-300">
                  {isBn
                    ? `৳${withdrawAmount} আপনার ${withdrawMethod.toUpperCase()} নম্বরে সফলভাবে পাঠানো হয়েছে।`
                    : `৳${withdrawAmount} dispatched to your ${withdrawMethod.toUpperCase()} wallet.`}
                </p>
                <span className="text-[10px] text-slate-500 font-mono block">
                  TxID: SROT-PAY-{Date.now().toString().slice(-6)}
                </span>
              </div>
            ) : (
              <form onSubmit={handleWithdrawSubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-white">
                    {isBn ? "পরামর্শ আয় উত্তোলন করুন" : "Withdraw Specialist Earnings"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isBn
                      ? `বর্তমান উত্তোলনযোগ্য ব্যালেন্স: ${formatCurrency(availableBalance)}`
                      : `Current Available Balance: ${formatCurrency(availableBalance)}`}
                  </p>
                </div>

                {/* Method selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isBn ? "উত্তোলনের মাধ্যম নির্বাচন করুন:" : "Select Payout Method:"}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "bkash", name: "বিকাশ (bKash)" },
                      { id: "nagad", name: "নগদ (Nagad)" },
                      { id: "bank", name: "ব্যাংক (Bank)" },
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setWithdrawMethod(m.id as any)}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition ${
                          withdrawMethod === m.id
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                            : "bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white"
                        }`}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isBn ? "উত্তোলনের পরিমাণ (টাকা):" : "Withdrawal Amount (BDT):"}
                  </label>
                  <input
                    type="number"
                    min="500"
                    max={availableBalance}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>{isBn ? "সর্বনিম্ন: ৳৫০০" : "Minimum: ৳500"}</span>
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount(availableBalance.toString())}
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      {isBn ? "সম্পূর্ণ টাকা (Max)" : "Withdraw All"}
                    </button>
                  </div>
                </div>

                {/* Account / Mobile number */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {withdrawMethod === "bank"
                      ? isBn ? "ব্যাংক একাউন্ট নম্বর ও শাখার নাম:" : "Bank Account & Routing:"
                      : isBn ? "ওয়ালেট মোবাইল নম্বর:" : "Wallet Mobile Number:"}
                  </label>
                  <input
                    type="text"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="017XX-XXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWithdrawModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    {isBn ? "বাতিল" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/25"
                  >
                    {isBn ? "উত্তোলন নিশ্চিত করুন" : "Confirm Payout"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
