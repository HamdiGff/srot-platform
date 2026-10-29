"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatCurrency } from "@/lib/utils";
import { generatePrescriptionPdf } from "@/lib/prescriptionGenerator";
import { INITIAL_CONSULTATIONS } from "@/data/mockConsultations";
import {
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Wheat,
  Milk,
  Egg,
  Fish,
  HeartHandshake,
  MessageSquare,
  Package,
  FileSpreadsheet,
  QrCode,
  DollarSign,
  Download,
  CalendarCheck,
  PhoneCall,
  Activity,
  Layers,
  ArrowRight,
  CheckCircle2,
  Check,
  ExternalLink,
  Wallet,
  Clock,
  Droplet,
  ChevronRight,
  TrendingUp,
  Cpu,
  CloudSun,
  Calculator,
  Compass,
  FileText,
  BadgePercent,
  Receipt,
  Users,
} from "lucide-react";

export default function FeaturesPage() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [activeSectorDemo, setActiveSectorDemo] = useState<"crop" | "dairy" | "poultry" | "aqua">("dairy");

  return (
    <div className="min-h-screen bg-[#05080d] text-slate-100 srot-ambient-glow pb-24 selection:bg-emerald-500 selection:text-black">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER: EXECUTIVE PLATFORM TOUR */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-20 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold tracking-wider uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? "প্ল্যাটফর্ম ব্লুপ্রিন্ট ও ফিচার পোর্টফোলিও" : "SROT Platform Feature Portfolio & Architecture"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
            {isBn ? (
              <>
                বাংলাদেশের প্রথম সমন্বিত{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  ডিজিটাল কৃষি ও প্রাণিসম্পদ
                </span>{" "}
                ইকোসিস্টেম
              </>
            ) : (
              <>
                Bangladesh’s Unified{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Digital Agriculture & Animal Health
                </span>{" "}
                Ecosystem
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {isBn
              ? "জ্ঞান প্রথম, সেবা দ্বিতীয়, বাণিজ্য তৃতীয়। প্রান্তিক খামারি থেকে বাণিজ্যিক খামার—সকলের জন্য উন্মুক্ত জ্ঞানকোষ, বিশেষজ্ঞ ডাক্তার পরামর্শ, ডিজিটাল ইয়ার-ট্যাগ এবং ৭০/৩০ রেভিনিউ মডেল।"
              : "Knowledge First, Service Second, Commerce Third. Explore all deployed modules, clinical triage engines, farm health records, and the automated 70/30 revenue architecture."}
          </p>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">5 Live</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Core Modules Deployed</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">70 / 30</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Doctor / Platform Split</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">4 Sectors</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Agri, Dairy, Poultry, Aqua</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-md">
              <span className="text-xl sm:text-2xl font-black text-purple-400 font-mono">BDT (৳)</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">bKash, Nagad, Rocket</span>
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="#live-features"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>{isBn ? "ফিচারসমূহ পর্যালোচনা করুন ↓" : "Explore Deployed Features ↓"}</span>
            </a>
            <Link
              href="/consult"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-white/[0.1] font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "কনসালটেশন ইঞ্জিন পরীক্ষা করুন" : "Try Consultation Engine"}</span>
            </Link>
            <Link
              href="/farmer-portal"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-white/[0.1] font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              <span>{isBn ? "ফার্মার পোর্টাল ও রেকর্ডস" : "Open Farmer Portal"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE BUSINESS STRATEGY: "KNOWLEDGE FIRST" FLYWHEEL */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.06]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            {isBn ? "বিজনেস মডেল ও রূপরেখা" : "Strategic Engagement Philosophy"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
            {isBn ? "কেন এই মডেল বাংলাদেশে শতভাগ সফল?" : "The SROT Growth Flywheel"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            {isBn
              ? "প্রান্তিক খামারিরা শুরুতে কোনো অ্যাপে টাকা দিতে চান না। তাই জ্ঞান সম্পূর্ণ ফ্রি দিয়ে বিশ্বাস অর্জন করা হয়, এরপর জরুরি পরামর্শ ও সেবায় রেভিনিউ তৈরি হয়।"
              : "In developing agro-economies, upfront barriers destroy adoption. SROT lowers acquisition costs with free knowledge, then converts high-intent users into paid consultations and recurring subscriptions."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            {
              step: "01",
              title: isBn ? "উন্মুক্ত জ্ঞান ও প্রশ্নোত্তর" : "Free Knowledge & Q&A",
              desc: isBn ? "ফ্রি নিবন্ধ, বালাই দমন গাইড ও ওপেন কমিউনিটি ফোরাম যা দ্রুত ব্যবহারকারী আকর্ষণ করে।" : "Zero-friction user acquisition via articles, disease libraries, and free open forum.",
              tag: "FREE",
              tagColor: "bg-emerald-500/20 text-emerald-300",
            },
            {
              step: "02",
              title: isBn ? "পেইড কনসালটেশন" : "Specialist Triage",
              desc: isBn ? "ফসলের রোগ বা পশুর অসুখে ৳১৫০-৳৩৫০ দিয়ে বিশেষজ্ঞ পরামর্শ গ্রহণ।" : "Paid 1-on-1 tele-advisory (৳150 - ৳350) with automated 70/30 commission split.",
              tag: "৳150 - ৳350",
              tagColor: "bg-cyan-500/20 text-cyan-300",
            },
            {
              step: "03",
              title: isBn ? "মাসিক সাবস্ক্রিপশন" : "Health Subscriptions",
              desc: isBn ? "৳১৯৯ বেসিক ও ৳৪৯৯ প্রিমিয়াম প্যাকেজের মাধ্যমে সার্বক্ষণিক ডাক্তার ও জরুরি হটলাইন।" : "Recurring monthly care plans (৳199 / ৳499) providing steady ARR cash flow.",
              tag: "৳199 / ৳499 mo",
              tagColor: "bg-amber-500/20 text-amber-300",
            },
            {
              step: "04",
              title: isBn ? "খামার ও পশুর স্বাস্থ্য কার্ড" : "Digital Farm Records",
              desc: isBn ? "ইয়ার-ট্যাগ আইডি, ভ্যাকসিন ক্যালেন্ডার ও স্প্রে সাইকেল ট্র্যাকিং যা খামারিকে প্ল্যাটফর্মে ধরে রাখে।" : "Ear-Tag IDs, crop cycles & vaccine calendars lock in retention and long-term lifetime value.",
              tag: "RETENTION",
              tagColor: "bg-purple-500/20 text-purple-300",
            },
            {
              step: "05",
              title: isBn ? "মাঠ সেবা ও একাডেমি" : "Field Visits & Academy",
              desc: isBn ? "অন-সাইট পরিদর্শন, কৃত্রিম প্রজনন (AI) ও বিশেষজ্ঞদের পেইড ভিডিও ট্রেনিং কোর্স।" : "Doorstep vet visits, artificial insemination, and paid masterclasses (Steps 6 & 7).",
              tag: "HIGH-TICKET",
              tagColor: "bg-emerald-500/20 text-emerald-300",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d15] border border-white/[0.08] hover:border-emerald-500/30 transition-all space-y-3 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-slate-500">{item.step}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mt-2">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE DEPLOYED FEATURES BREAKDOWN (MODULES 1 TO 5) */}
      {/* ========================================================================= */}
      <section id="live-features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{isBn ? "লাইভ ফিচারসমূহের বিস্তারিত বিবরণ" : "Detailed Live Modules & Capabilities"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {isBn ? "প্ল্যাটফর্মে বর্তমানে সক্রিয় ফিচারসমূহ" : "What is Live & Fully Operational Today"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            {isBn
              ? "প্রতিটি ফিচার সরাসরি ব্রাউজারে টেস্ট করার জন্য প্রস্তুত। নিচে প্রতিটি সেকশন বিস্তারিত দেখুন।"
              : "Every single capability listed below is functional in live production. Inspect each module and test directly."}
          </p>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* MODULE 1: 4-SECTOR CONSULTATION ENGINE */}
        {/* --------------------------------------------------------------------- */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0b1320] to-slate-900/90 border border-emerald-500/30 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                <span>MODULE 01 • TELE-ADVISORY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isBn ? "৪-খাতভিত্তিক বিশেষজ্ঞ কনসালটেশন ইঞ্জিন" : "Multi-Sector Expert Consultation & Booking Engine"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {isBn
                  ? "সাধারণ পরামর্শ নয়—ফসল, ডেইরি, পোল্ট্রি এবং মৎস্য চাষের জন্য সুনির্দিষ্ট ক্লিনিক্যাল ইনটেক ফর্ম। লক্ষণ, মৃত্যুর সংখ্যা, পানির গুণমান এবং ছবি আপলোড করে মুহূর্তেই বিশেষজ্ঞের সাথে যুক্ত হওয়া যায়।"
                  : "Purpose-built intake workflows for Crops, Dairy, Poultry, Fisheries, and Pets. Captures daily bird mortality, milk drops, dissolved oxygen, and pest photos with transparent BDT pricing."}
              </p>
            </div>

            <Link
              href="/consult"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition flex items-center gap-2 self-start lg:self-auto shadow-lg shadow-emerald-500/20 shrink-0"
            >
              <span>{isBn ? "কনসালটেশন বুকিং দেখুন →" : "Try Booking Engine →"}</span>
            </Link>
          </div>

          {/* Sector Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-2">
              <div className="p-2 w-fit rounded-xl bg-emerald-500/10 text-emerald-400">
                <Wheat className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">{isBn ? "ফসল ও উদ্ভিদ রোগতত্ত্ব" : "Crops & Agronomy"}</h4>
              <p className="text-xs text-slate-400">
                {isBn
                  ? "ধান, গম, পাট ও সবজির রোগ। বৃদ্ধির পর্যায় ও বিঘাভিত্তিক সার-কীটনাশক স্প্রে নির্দেশিকা।"
                  : "Crop variety, tillering stages, Acreage (Bigha), and calibrated spray regimens."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-2">
              <div className="p-2 w-fit rounded-xl bg-cyan-500/10 text-cyan-400">
                <Milk className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">{isBn ? "ডেইরি ও বোভাইন মেডিসিন" : "Dairy & Cattle Medicine"}</h4>
              <p className="text-xs text-slate-400">
                {isBn
                  ? "দৈনিক দুধ উৎপাদনের ঘাটতি, লাম্পি স্কিন (LSD), ম্যাসটাইটিস এবং খাদ্য উইথহোল্ডিং হিসাব।"
                  : "Daily milk yield loss, rectal temperature, LSD triage, and milk withholding."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-2">
              <div className="p-2 w-fit rounded-xl bg-amber-500/10 text-amber-400">
                <Egg className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">{isBn ? "পোল্ট্রি ফ্লক ও বায়োসিকিউরিটি" : "Poultry Flock Health"}</h4>
              <p className="text-xs text-slate-400">
                {isBn
                  ? "দৈনিক মৃত্যুর সংখ্যা, ব্রয়লার/লেয়ার বয়স, মলের রঙ এবং গামবোরো-রানীক্ষেত ভ্যাকসিনেশন।"
                  : "Daily mortality count, bird age in days, dropping colors, and FCR optimization."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-2">
              <div className="p-2 w-fit rounded-xl bg-blue-500/10 text-blue-400">
                <Fish className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">{isBn ? "মৎস্য ও অ্যাকুয়াকালচার" : "Fisheries & Aqua"}</h4>
              <p className="text-xs text-slate-400">
                {isBn
                  ? "পুকুরের শতাংশ আয়তন, সকালে মাছ ভেসে ওঠার লক্ষণ, ফুলকা পচা ও অ্যামোনিয়া গ্যাস নিয়ন্ত্রণ।"
                  : "Pond decimals, water appearance, morning gasping, and dissolved oxygen crashes."}
              </p>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* MODULE 2: 70/30 FINANCIAL ENGINE & DOCTOR WALLET */}
        {/* --------------------------------------------------------------------- */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0d121c] to-slate-900/90 border border-cyan-500/30 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                <span>MODULE 02 • FINANCIAL INFRASTRUCTURE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isBn ? "৭০/৩০ রেভিনিউ মডেল ও বিশেষজ্ঞ ওয়ালেট" : "70/30 Revenue Engine & Expert Wallet"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {isBn
                  ? "প্রতিটি কনসালটেশনে ৭০% অর্থ সরাসরি চিকিৎসকের ওয়ালেটে জমা হয় এবং ৩০% প্ল্যাটফর্ম কমিশন থাকে। চিকিৎসকরা বিকাশ, নগদ বা ব্যাংকে টাকা উইথড্র করতে পারেন এবং খামারিরা পান ভেরিফায়েড মানি রসিদ।"
                  : "Automated 70% doctor net / 30% SROT platform split on every consultation. Includes doctor cashout modal to bKash/Nagad and downloadable BVC-certified payment receipts for farmers."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/expert-portal"
                className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-lg shadow-cyan-950/60 shrink-0"
              >
                <Wallet className="w-4 h-4" />
                <span>{isBn ? "ডাক্তার ওয়ালেট খুলুন" : "Open Doctor Wallet"}</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isBn ? "স্বয়ংক্রিয় ফি বিভাজন" : "Transparent Fee Split"}
              </span>
              <div className="text-2xl font-black text-white font-mono">
                70% <span className="text-sm font-normal text-emerald-400">Doctor</span> / 30% <span className="text-sm font-normal text-cyan-400">SROT</span>
              </div>
              <p className="text-xs text-slate-400">
                {isBn
                  ? "৳৩০০ ফি হলে ডাক্তার পান ৳২১০ এবং স্রোতের রাজস্ব ৳৯০। কোনো লুকানো চার্জ নেই।"
                  : "For a ৳300 consultation, the specialist gets ৳210 and SROT earns ৳90 platform revenue."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isBn ? "উইথড্রয়াল গেটওয়ে" : "Mobile Payouts"}
              </span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                bKash • Nagad
              </div>
              <p className="text-xs text-slate-400">
                {isBn
                  ? "২৪ ঘণ্টার মধ্যে সরাসরি ডাক্তারের বিকাশ বা নগদ ব্যক্তিগত নম্বরে টাকা পৌঁছে যায়।"
                  : "Specialists can request cashouts directly to their bKash, Nagad, or Bank accounts with 1 click."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isBn ? "ডিজিটাল মানি রসিদ" : "Official Invoices"}
              </span>
              <div className="text-2xl font-black text-purple-400 font-mono">
                BVC & DAE Verified
              </div>
              <p className="text-xs text-slate-400">
                {isBn
                  ? "কৃষক ও ডেইরি খামারিদের প্রতিটি খরচের জন্য কিউআর টোকেনসহ বৈধ ক্যাশ মেমো।"
                  : "Downloadable cash vouchers with cryptographic tokens and clinical council credentials."}
              </p>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* MODULE 3: ASK COMMUNITY Q&A HUB */}
        {/* --------------------------------------------------------------------- */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0a141b] to-slate-900/90 border border-emerald-500/30 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                <span>MODULE 03 • COMMUNITY ACQUISITION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isBn ? "উন্মুক্ত প্রশ্নোত্তর ফোরাম (Agri Stack Overflow)" : "Ask Community Q&A Hub (Agri Stack Overflow)"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {isBn
                  ? "১০০% ফ্রি ওপেন ফোরাম। কৃষকরা যেকোনো ফসল ও পশুর রোগের ছবি আপলোড করে প্রশ্ন করেন। বিশেষজ্ঞরা উত্তর দেন এবং প্রতিটি উত্তর থেকে সরাসরি ৳১৫০ দিয়ে ওই ডাক্তারকে প্রাইভেট বুক করার সুযোগ থাকে।"
                  : "100% Free public Q&A where farmers post real field photos. Certified specialists provide verified answers, each with a direct ৳150 1-click booking bridge to convert readers into paying clients."}
              </p>
            </div>

            <Link
              href="/community"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition flex items-center gap-2 self-start lg:self-auto shadow-lg shadow-emerald-500/20 shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isBn ? "কমিউনিটি ফোরাম দেখুন →" : "Visit Community Hub →"}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.04]">
              <strong className="text-white block font-bold mb-1">✓ {isBn ? "বিনামূল্যে ছবি আপলোড" : "Free Photo Uploads"}</strong>
              <span className="text-slate-400">
                {isBn ? "ধানের ব্লাস্ট, ক্ষুরারোগ বা সরিষার পোকার ছবি তুলে যেকোনো কৃষক প্রশ্ন করতে পারেন।" : "Farmers attach smartphone photos of diseased leaves or cattle lesions freely."}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.04]">
              <strong className="text-white block font-bold mb-1">✓ {isBn ? "ভেরিফায়েড বিশেষজ্ঞ উত্তর" : "Certified Doctor Answers"}</strong>
              <span className="text-slate-400">
                {isBn ? "বিএআরআই, বিআরআরআই ও বিভিসি সার্টিফাইড চিকিৎসকদের গ্রিন ব্যাজ উত্তর।" : "BVC/DAE registered veterinarians and pathologists provide verified badges."}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.04]">
              <strong className="text-white block font-bold mb-1">✓ {isBn ? "কনভার্সন ব্রিজ (৳১৫০ বুকিং)" : "Direct Conversion Bridge"}</strong>
              <span className="text-slate-400">
                {isBn ? "পাবলিক উত্তর পছন্দ হলে মাত্র ৳১৫০ দিয়ে সাথে সাথে ব্যক্তিগত টেলি-চেম্বার বুকিং।" : "One click connects farmers directly to a private video or chat session with that expert."}
              </span>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* MODULE 4: FARM HEALTH SUBSCRIPTION PACKAGES */}
        {/* --------------------------------------------------------------------- */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0b141f] to-slate-900/90 border border-amber-500/30 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                <span>MODULE 04 • RECURRING REVENUE (ARR)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isBn ? "খামার হেলথ সাবস্ক্রিপশন প্যাকেজ" : "Farm Health Subscription Packages"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {isBn
                  ? "টেলিকম ও স্বাস্থ্যবীমার মতো মাসিক রিকারিং মডেল। মাত্র ৳১৯৯ (বেসিক) ও ৳৪৯৯ (প্রিমিয়াম) সাবস্ক্রিপশনে কৃষকরা পান মাসিক কনসালটেশন কোটা, উপজেলাভিত্তিক SMS অ্যালার্ট এবং সার্বক্ষণিক ইমার্জেন্সি সাপোর্ট।"
                  : "Predictable recurring cash flow modeled after human tele-health memberships. Farmers subscribe to Basic (৳199/mo) or Premium (৳499/mo) with automated bKash/Nagad renewals."}
              </p>
            </div>

            <Link
              href="/farmer-portal#packages"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm transition flex items-center gap-2 self-start lg:self-auto shadow-lg shadow-amber-500/20 shrink-0"
            >
              <Package className="w-4 h-4" />
              <span>{isBn ? "প্যাকেজসমূহ দেখুন →" : "View Packages →"}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white text-base">{isBn ? "বেসিক খামার হেলথ" : "Basic Farm Health"}</h4>
                <span className="text-cyan-400 font-mono font-black text-lg">৳199 / mo</span>
              </div>
              <p className="text-xs text-slate-400">{isBn ? "১-৫টি গরু বা ১-৩ বিঘা জমির প্রান্তিক খামারিদের জন্য" : "Essential digital advisory for smallholders & family farms"}</p>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-white/[0.04]">
                <li className="flex items-center gap-2">✓ {isBn ? "মাসে ২টি বিশেষজ্ঞ ডাক্তার কনসালটেশন" : "2 Certified Specialist consultations included"}</li>
                <li className="flex items-center gap-2">✓ {isBn ? "উপজেলাভিত্তিক মহামারী ও বালাই সতর্কতা SMS" : "Upazila-specific pest & outbreak warning SMS alerts"}</li>
                <li className="flex items-center gap-2">✓ {isBn ? "ডিজিটাল ভ্যাকসিনেশন ও কৃমিনাশক রিমাইন্ডার" : "Automated digital vaccination reminders"}</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/80 border border-emerald-500/50 ring-1 ring-emerald-500/30 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white text-base">{isBn ? "প্রিমিয়াম খামার কেয়ার" : "Premium Farm Care (Most Popular)"}</h4>
                <span className="text-emerald-400 font-mono font-black text-lg">৳499 / mo</span>
              </div>
              <p className="text-xs text-slate-400">{isBn ? "বাণিজ্যিক ডেইরি, পোল্ট্রি শেড ও মৎস্য খামারের জন্য" : "Complete priority care for commercial dairy & poultry sheds"}</p>
              <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-white/[0.04]">
                <li className="flex items-center gap-2">✓ {isBn ? "আনলিমিটেড এআই ও ডায়াগনস্টিক চ্যাট ট্রায়াজ" : "Unlimited AI + doctor diagnostic chat triage"}</li>
                <li className="flex items-center gap-2">✓ {isBn ? "মাসে ১টি নির্ধারিত এইচডি ভিডিও চেম্বার ভিজিট" : "1 Monthly scheduled HD Video Chamber visit"}</li>
                <li className="flex items-center gap-2">✓ {isBn ? "১০ মিনিটের মধ্যে ফাস্ট-ট্র্যাক ইমার্জেন্সি কিউ" : "Under 10-minute fast-track emergency doctor triage"}</li>
                <li className="flex items-center gap-2">✓ {isBn ? "মাঠ সেবা ও কৃত্রিম প্রজননে ১৫% সরাসরি ছাড়" : "15% flat discount on field visits & AI services"}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* MODULE 5: FARM MANAGEMENT & ANIMAL HEALTH RECORDS */}
        {/* --------------------------------------------------------------------- */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0d1424] to-slate-900/90 border border-purple-500/30 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-1">
                <span>MODULE 05 • LIVESTOCK & CROP LEDGER</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isBn ? "খামার ব্যবস্থাপনা ও পশুর ডিজিটাল স্বাস্থ্য কার্ড" : "Farm Management & Animal Health Records"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {isBn
                  ? "গবাদিপশুর ডিজিটাল ইয়ার-ট্যাগ আইডি (যেমন BD-DAIRY-108), ক্লিকযোগ্য কিউআর পাস, দৈনিক দুধ উৎপাদনের হিসাব, ফসল বৃদ্ধির প্রগ্রেস বার, এবং প্রাণিসম্পদ অধিদপ্তরের (DLS) মানসম্মত ভ্যাকসিন মাস্টার ক্যালেন্ডার।"
                  : "Verifiable cattle ear-tag tracking (e.g. BD-DAIRY-108), clickable QR passes, daily milk yield graphs, crop cycle progress bars, and national vaccination master calendars."}
              </p>
            </div>

            <Link
              href="/farmer-portal#records"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs sm:text-sm transition flex items-center gap-2 self-start lg:self-auto shadow-lg shadow-purple-950/60 shrink-0"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{isBn ? "রেকর্ডস ড্যাশবোর্ড দেখুন →" : "View Farm Records →"}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-2">
              <span className="p-2 w-fit rounded-xl bg-cyan-500/10 text-cyan-400 block">
                <QrCode className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-white text-sm">{isBn ? "ডিজিটাল ইয়ার-ট্যাগ ও কিউআর" : "Ear-Tags & QR Passes"}</h4>
              <p className="text-xs text-slate-400">
                {isBn ? "প্রতিটি গরুর স্বতন্ত্র ট্যাগ আইডি, জাত, বয়স, ওজন ও বিভিসি কমপ্লায়েন্স সনদ।" : "Official cattle ear-tag IDs, breed, weight, and BVC digital compliance pass."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-2">
              <span className="p-2 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 block">
                <Wheat className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-white text-sm">{isBn ? "ফসল চক্র ও স্প্রে ডায়েরি" : "Crop Growth & Sprays"}</h4>
              <p className="text-xs text-slate-400">
                {isBn ? "বপন থেকে কর্তন পর্যন্ত প্রগ্রেস বার এবং খাদ্য নিরাপত্তার উইথহোল্ডিং সতর্কবার্তা।" : "Acreage in Bigha, tillering progress bars, and pre-harvest withholding warnings."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-2">
              <span className="p-2 w-fit rounded-xl bg-amber-500/10 text-amber-400 block">
                <Activity className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-white text-sm">{isBn ? "ভ্যাকসিনেশন মাস্টার ক্যালেন্ডার" : "Vaccination Calendar"}</h4>
              <p className="text-xs text-slate-400">
                {isBn ? "এলএসডি, খুরা ও তড়কা টিকার শিডিউল এবং ডাক্তার কর্তৃক প্রয়োগ নিশ্চিতকরণ বাটন।" : "Tracks LSD, FMD & Anthrax vaccines with one-click 'Mark Administered'."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-2">
              <span className="p-2 w-fit rounded-xl bg-purple-500/10 text-purple-400 block">
                <TrendingUp className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-white text-sm">{isBn ? "আয়-ব্যয় ও ফলন অ্যানালিটিক্স" : "Farm Financial Analytics"}</h4>
              <p className="text-xs text-slate-400">
                {isBn ? "মাসিক ইনপুট ব্যয় (৳৩৮,৪০০) বনাম রাজস্ব (৳৭২,৬০০) এবং +৪৫.৬% মার্জিন ট্র্যাকিং।" : "Monthly input expenses vs milk/crop revenues with +45.6% ROI calculations."}
              </p>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* MODULE 6 & 7: DIGITAL RX & PRECISION AGRO TOOLS */}
        {/* --------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Digital Prescriptions */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/[0.08] space-y-4 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                <span>CLINICAL DOCUMENTATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isBn ? "যাচাইযোগ্য ডিজিটাল প্রেসক্রিপশন ইঞ্জিন (PDF)" : "Verifiable Digital Prescription PDF Engine"}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {isBn
                  ? "প্রতিটি কনসালটেশন শেষে প্রিন্টযোগ্য এ৪ সাইজের সাইনড প্রেসক্রিপশন তৈরি হয়। এতে বাংলাদেশ ভেটেরিনারি কাউন্সিলের রেজিস্ট্রেশন নম্বর, কিউআর টোকেন, ডোজের মাত্রা এবং উইথহোল্ডিং মেয়াদ স্পষ্টভাবে লিপিবদ্ধ থাকে।"
                  : "Generates signed A4 PDF prescriptions complete with BVC doctor registration numbers, drug formulations, weight-based doses, and food safety withholding days."}
              </p>
            </div>

            <button
              onClick={() => generatePrescriptionPdf(INITIAL_CONSULTATIONS[0])}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 border border-white/[0.08]"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "নমুনা প্রেসক্রিপশন ডাউনলোড (PDF)" : "Download Sample Prescription (PDF)"}</span>
            </button>
          </div>

          {/* Precision Agro Tools */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/[0.08] space-y-4 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                <span>DECISION SUPPORT TOOLS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isBn ? "বুদ্ধিমান কৃষি ও ভেট ক্যালকুলেটর" : "Intelligent Diagnostic & Dosage Calculators"}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {isBn
                  ? "ওষুধ ও সারের ডোজ ক্যালকুলেটর (পশুর ওজন বা জমির বিঘা অনুসারে), এআই উপসর্গ স্ক্যানার এবং উপজেলাভিত্তিক কৃষি আবহাওয়া পূর্বাভাস ও মহামারী সতর্কতা ব্যানার।"
                  : "Precision medicine and fertilizer titration based on cattle bodyweight (kg) or field acreage, AI symptom scan simulation, and localized weather radars."}
              </p>
            </div>

            <Link
              href="/#calculator"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center justify-center gap-2 border border-white/[0.08]"
            >
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span>{isBn ? "হোমপেজের টুলস দেখুন" : "Explore Precision Tools on Homepage"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BUSINESS & MONETIZATION MODEL: FINANCIAL PROJECTIONS */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            {isBn ? "রেভিনিউ প্রক্ষেপণ ও লাভজনকতা" : "Financial Projection & Unit Economics"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
            {isBn ? "প্ল্যাটফর্মের আয় কীভাবে তৈরি হয়?" : "How the Platform Generates Revenue"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            {isBn
              ? "স্রোত প্ল্যাটফর্মের প্রতিটি পেইড সেবায় সরাসরি কমিশন ও রিকারিং ক্যাশ ফ্লো থাকে।"
              : "Clear unit economics with a multi-layered monetization model starting from year one."}
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900/60 border border-white/[0.08] overflow-hidden backdrop-blur-md mb-8">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-white/[0.08]">
              <tr>
                <th className="py-3.5 px-4 font-bold">{isBn ? "রেভিনিউ স্ট্রিম" : "Revenue Stream"}</th>
                <th className="py-3.5 px-4 font-bold">{isBn ? "কীভাবে কাজ করে" : "How It Works"}</th>
                <th className="py-3.5 px-4 font-bold text-center">{isBn ? "গড় ফি" : "Price Point"}</th>
                <th className="py-3.5 px-4 font-bold text-right text-emerald-400">{isBn ? "স্রোতের শেয়ার" : "Platform Share"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-slate-300">
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">{isBn ? "১. কনসালটেশন কমিশন" : "1. Consultation Commissions"}</td>
                <td className="py-3.5 px-4">{isBn ? "প্রতিটি ভিডিও/কল/চ্যাট সেশন থেকে ৩০% কমিশন" : "Charged on every completed doctor tele-consultation"}</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-white">৳150 – ৳350</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">30% (৳45 - ৳105)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">{isBn ? "২. খামার হেলথ প্যাকেজ" : "2. Farm Health Subscriptions"}</td>
                <td className="py-3.5 px-4">{isBn ? "ডেইরি ও শস্য খামারির মাসিক রিকারিং সাবস্ক্রিপশন" : "Monthly recurring health memberships for livestock & crops"}</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-white">৳199 – ৳499 / mo</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">100% Platform ARR</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">{isBn ? "৩. মাঠ সেবা ও অন-সাইট ভিজিট" : "3. Field Visits & AI (Step 6)"}</td>
                <td className="py-3.5 px-4">{isBn ? "ডাক্তারের খামার ভিজিট ও কৃত্রিম প্রজনন বুকিং ফি" : "Doorstep veterinary visits & Artificial Insemination"}</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-white">৳1,000 – ৳1,500</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">20% - 25%</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-white">{isBn ? "৪. লার্নিং একাডেমি কোর্স" : "4. Academy Masterclasses (Step 7)"}</td>
                <td className="py-3.5 px-4">{isBn ? "বিশেষজ্ঞদের ভিডিও কোর্স ও লাইভ ওয়েবিনার ফি" : "Paid video courses & live poultry/dairy masterclasses"}</td>
                <td className="py-3.5 px-4 text-center font-mono font-bold text-white">৳500 – ৳1,500</td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">30% Split</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Realistic Year 1 Run-Rate Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-black text-white">{isBn ? "১ম বছরের প্রাথমিক মাসিক রাজস্ব লক্ষ্যমাত্রা" : "Year 1 Early Monthly Run-Rate Estimate"}</h4>
            <p className="text-xs text-slate-300 mt-1">
              {isBn
                ? "১,৫০০ কনসালটেশন (৳১,১২,৫০০) + ৪০০ বেসিক সাবস্ক্রিপশন (৳৭৯,৬০০) + ১৫০ প্রিমিয়াম সাবস্ক্রিপশন (৳৭৪,৮৫০)"
                : "1,500 Consultations (৳112,500) + 400 Basic Plans (৳79,600) + 150 Premium Plans (৳74,850)"}
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">৳266,950</span>
            <span className="text-xs text-slate-400 block">{isBn ? "প্রতি মাসে প্রক্ষেপিত রাজস্ব" : "Estimated Monthly Net SROT Run-Rate"}</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ROADMAP: FUTURE EXPANSION (STEPS 6 TO 10) */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            {isBn ? "ভবিষ্যৎ সম্প্রসারণ রোডম্যাপ" : "Product Expansion Roadmap"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
            {isBn ? "পরবর্তী ধাপসমূহ (Steps 6 - 10)" : "Upcoming Phases from the Blueprint"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            {isBn
              ? "স্রোত প্ল্যাটফর্ম ধাপে ধাপে তৈরি হচ্ছে। ১ থেকে ৫ সম্পন্ন হওয়ার পর পরবর্তী মাইলফলকসমূহ:"
              : "The platform is architected modularly. Following the completion of Steps 1-5, the next scheduled phases are:"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              step: "Step 06",
              title: isBn ? "মাঠ সেবা ও অন-সাইট ভিজিট" : "Field Services & Doorstep Visits",
              desc: isBn ? "জরুরি খামার পরিদর্শন, কৃত্রিম প্রজনন (AI) টেকনিশিয়ান বুকিং এবং মাটি পরীক্ষার ল্যাব স্যাম্পল কালেকশন।" : "Doorstep veterinary visits, Artificial Insemination (AI) requests, and soil lab diagnostics.",
              status: "NEXT IN LINE",
              color: "text-amber-400 border-amber-500/30",
            },
            {
              step: "Step 07",
              title: isBn ? "লার্নিং একাডেমি ও প্রশিক্ষণ" : "Learning Academy & Webinars",
              desc: isBn ? "পোল্ট্রি, ডেইরি ও বায়োফ্লক চাষে বিশ্ববিদ্যালয় অধ্যাপকদের পেইড ভিডিও মাস্টারক্লাস ও সনদ।" : "Paid agro-vet video courses, certification masterclasses, and ticketed live webinars.",
              status: "PLANNED",
              color: "text-cyan-400 border-cyan-500/30",
            },
            {
              step: "Step 08",
              title: isBn ? "যাচাইকৃত এগ্রো মার্কেটপ্লেস" : "Verified Inputs Marketplace",
              desc: isBn ? "অনুমোদিত বীজ, খাদ্য, বালাইনাশক ও আধুনিক কৃষি যন্ত্রপাতি সরাসরি খামারির কাছে সরবরাহ।" : "Direct-from-manufacturer certified seeds, fertilizers, feeds, and farm machinery.",
              status: "PLANNED",
              color: "text-purple-400 border-purple-500/30",
            },
            {
              step: "Step 09",
              title: isBn ? "কর্পোরেট সংগ্রহ ও বীমা" : "Corporate Procurement & Insurance",
              desc: isBn ? "ফুড প্রসেসিং কোম্পানির সাথে খামারিদের চুক্তিভিত্তিক চাষ এবং গবাদিপশু মাইক্রো-ইন্সুরেন্স।" : "Contract farming linkages with agro-processing giants and micro-insurance referrals.",
              status: "PLANNED",
              color: "text-blue-400 border-blue-500/30",
            },
            {
              step: "Step 10",
              title: isBn ? "আইওটি ও প্রিসিশন ড্রোন স্প্রে" : "IoT Sensors & Drone Spraying",
              desc: isBn ? "মাটির আর্দ্রতা সেন্সর ও বড় জমিতে ড্রোন দিয়ে বালাইনাশক স্প্রে বুকিং সুবিধা।" : "Autonomous field moisture telemetry and large-acreage precision drone spraying booking.",
              status: "VISION",
              color: "text-emerald-400 border-emerald-500/30",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.06] hover:border-white/[0.15] transition space-y-2.5"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono font-bold text-white">{item.step}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.color}`}>
                  {item.status}
                </span>
              </div>
              <h4 className="font-bold text-white text-sm">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FINAL CLIENT CTA: DIRECT INTERACTIVE DEMO LINKS */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-[#0a141e] to-teal-950/60 border border-emerald-500/30 shadow-2xl space-y-4">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            READY TO DEMO ANY MODULE
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {isBn ? "লাইভ প্ল্যাটফর্ম নিজেই পরীক্ষা করুন" : "Experience the Live Platform in Action"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {isBn
              ? "সরাসরি ব্রাউজারে ঢুকে কনসালটেশন বুকিং, কমিউনিটি ফোরাম, ডাক্তার ওয়ালেট বা ফার্মার রেকর্ডস ড্যাশবোর্ড ঘুরে দেখুন।"
              : "Test the intake forms, explore community Q&A, review the doctor payout wallet, or test animal ear-tag generation."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm transition shadow-lg shadow-emerald-500/25"
            >
              {isBn ? "মূল হোমপেজে যান" : "Go to Main Homepage"}
            </Link>
            <Link
              href="/farmer-portal"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-white/[0.1] font-bold text-xs sm:text-sm transition"
            >
              {isBn ? "ফার্মার পোর্টাল" : "Farmer Portal (Records)"}
            </Link>
            <Link
              href="/expert-portal"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-white/[0.1] font-bold text-xs sm:text-sm transition"
            >
              {isBn ? "ডাক্তার পোর্টাল (ওয়ালেট)" : "Doctor Portal (Wallet)"}
            </Link>
            <Link
              href="/community"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-white/[0.1] font-bold text-xs sm:text-sm transition"
            >
              {isBn ? "কমিউনিটি ফোরাম" : "Ask Community Q&A"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
