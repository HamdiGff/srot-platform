"use client";

import React from "react";
import Link from "next/link";
import { SrotLogo } from "./SrotLogo";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  Wheat,
  Milk,
  Egg,
  Fish,
  HeartHandshake,
  ShieldCheck,
  PhoneCall,
  Mail,
  MapPin,
  Lock,
  ArrowRight,
  Sparkles,
  Package,
  FileSpreadsheet,
  MessageSquare,
  CalendarCheck,
  FileText,
  Wallet,
  Compass,
  Calculator,
  FlaskConical,
  BookOpen,
  Activity,
  CheckCircle2,
  ExternalLink,
  QrCode,
  DollarSign,
} from "lucide-react";

export function Footer() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  return (
    <footer className="w-full bg-[#03060a] border-t border-white/[0.08] text-slate-400 text-sm relative overflow-hidden">
      {/* Top Banner: 24/7 Helplines & Supported Mobile Gateways */}
      <div className="border-b border-white/[0.06] bg-[#060a12]/90 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          {/* Emergency Helplines */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="p-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
            </span>
            <span className="text-slate-300 font-medium text-[11px] sm:text-xs">
              {isBn ? "জরুরি কৃষি ও ভেটেরিনারি হটলাইন:" : "Agro-Vet Emergency Helplines:"}
            </span>
            <a
              href="tel:16123"
              className="font-mono font-bold text-red-300 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/25 hover:bg-red-500/20 transition flex items-center gap-1"
            >
              <span>{isBn ? "১৬১২৩ (কৃষি কল সেন্টার)" : "16123 (Krishi Call Center)"}</span>
            </a>
            <a
              href="tel:333"
              className="font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/25 hover:bg-cyan-500/20 transition"
            >
              <span>{isBn ? "৩৩৩ (সরকারি সেবা)" : "333 (Govt Service)"}</span>
            </a>
            <span className="text-slate-500 hidden lg:inline">|</span>
            <span className="text-slate-400 font-mono text-[11px] hidden lg:inline">
              SROT Direct: 09612-776823
            </span>
          </div>

          {/* Secure Bangladesh Payment Partners */}
          <div className="flex items-center gap-3 text-[11px] font-semibold">
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider hidden sm:inline">
              {isBn ? "পেমেন্ট পার্টনার:" : "Payment Partners:"}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
              বিকাশ (bKash)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
              নগদ (Nagad)
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              রকেট (Rocket)
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid (5 Balanced Columns with Rich Icons) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Col 1: Brand, Identity & Council Compliance (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <SrotLogo size="md" />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {isBn
                ? "স্রোত (SROT) বাংলাদেশের সর্ববৃহৎ ডিজিটাল কৃষি ও পশু স্বাস্থ্য ইকোসিস্টেম। ক্ষুদ্র ও বাণিজ্যিক খামারিদের নিবন্ধিত বিশেষজ্ঞ কৃষিবিদ এবং ভেটেরিনারি সার্জনদের সাথে সরাসরি যুক্ত করে।"
                : "SROT is Bangladesh's premier digital agriculture and livestock health ecosystem. Connecting smallholders, commercial dairies, and poultry growers directly with accredited agronomists and veterinary surgeons."}
            </p>

            {/* National Compliance Seal */}
            <div className="p-3.5 rounded-2xl bg-[#080d16] border border-white/[0.08] text-xs space-y-1.5 max-w-sm">
              <span className="font-bold text-white flex items-center gap-1.5 text-[11px] text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>{isBn ? "অনুমোদিত জাতীয় নির্দেশিকা" : "Council Compliance & Standards"}</span>
              </span>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                {isBn
                  ? "সকল ক্লিনিক্যাল প্রেসক্রিপশন ও উইথহোল্ডিং মেয়াদ বাংলাদেশ ভেটেরিনারি কাউন্সিল (BVC) এবং কৃষি সম্প্রসারণ অধিদপ্তর (DAE) মানদণ্ড অনুসারে নিয়ন্ত্রিত।"
                  : "All tele-advisory prescriptions, ear-tag IDs, and withholding intervals adhere to BVC, DAE, DLS, and FAO food safety frameworks."}
              </p>
            </div>

            {/* Direct Location / Help Info */}
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Dhaka, Bangladesh</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-cyan-400" />
                <a href="mailto:support@srot.org" className="hover:text-white transition">
                  support@srot.org
                </a>
              </span>
            </div>
          </div>

          {/* Col 2: Core Sectors (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 border-b border-white/[0.06] pb-2">
              <Wheat className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isBn ? "কৃষি ও ফসল" : "Agri & Crops"}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/crop-disease" className="hover:text-emerald-300 transition flex items-center gap-2 group">
                  <Wheat className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
                  <span>{isBn ? "ফসলের রোগ নির্ণয়" : "Crop Disease Triage"}</span>
                </Link>
              </li>
              <li>
                <Link href="/services/fertilizer-advice" className="hover:text-emerald-300 transition flex items-center gap-2 group">
                  <FlaskConical className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
                  <span>{isBn ? "সার ও মাটির স্বাস্থ্য" : "Soil Health & Fertilizer"}</span>
                </Link>
              </li>
              <li>
                <Link href="/services/pest-management" className="hover:text-emerald-300 transition flex items-center gap-2 group">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
                  <span>{isBn ? "আইপিএম বালাই দমন" : "Integrated Pest Control"}</span>
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-emerald-300 transition flex items-center gap-2 group">
                  <BookOpen className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
                  <span>{isBn ? "উদ্ভিদ প্রটোকল জ্ঞানকোষ" : "Field Guides & Library"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Livestock, Poultry & Aqua (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 border-b border-white/[0.06] pb-2">
              <Milk className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isBn ? "প্রাণিসম্পদ ও মৎস্য" : "Livestock & Aqua"}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/cattle-health" className="hover:text-cyan-300 transition flex items-center gap-2 group">
                  <Milk className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                  <span>{isBn ? "ডেইরি ও বোভাইন কেয়ার" : "Dairy & Cattle Care"}</span>
                </Link>
              </li>
              <li>
                <Link href="/services/poultry-health" className="hover:text-cyan-300 transition flex items-center gap-2 group">
                  <Egg className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition" />
                  <span>{isBn ? "পোল্ট্রি ফ্লক বায়োসিকিউরিটি" : "Poultry & Flock Health"}</span>
                </Link>
              </li>
              <li>
                <Link href="/services/fisheries" className="hover:text-cyan-300 transition flex items-center gap-2 group">
                  <Fish className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition" />
                  <span>{isBn ? "মৎস্য ও পুকুর চাষ" : "Fisheries & Aqua DO"}</span>
                </Link>
              </li>
              <li>
                <Link href="/services/pet-services" className="hover:text-cyan-300 transition flex items-center gap-2 group">
                  <HeartHandshake className="w-3.5 h-3.5 text-slate-500 group-hover:text-pink-400 transition" />
                  <span>{isBn ? "পোষা প্রাণী টেলি-ভেটেরিনারি" : "24/7 Companion Pet"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Ecosystem & Subscriptions (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 border-b border-white/[0.06] pb-2">
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>{isBn ? "ইকোসিস্টেম" : "Ecosystem"}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/farmer-portal#packages" className="hover:text-amber-300 transition flex items-center gap-2 group">
                  <Package className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition" />
                  <span>{isBn ? "খামার হেলথ প্যাকেজ" : "Farm Health Packages"}</span>
                </Link>
              </li>
              <li>
                <Link href="/farmer-portal#records" className="hover:text-amber-300 transition flex items-center gap-2 group">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                  <span>{isBn ? "পশুর ইয়ার-ট্যাগ রেকর্ড" : "Ear-Tags & Records"}</span>
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-amber-300 transition flex items-center gap-2 group">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
                  <span className="flex items-center gap-1">
                    <span>{isBn ? "কমিউনিটি ফোরাম" : "Ask Community"}</span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      FREE
                    </span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/consult" className="hover:text-amber-300 transition flex items-center gap-2 group">
                  <CalendarCheck className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
                  <span>{isBn ? "পরামর্শ বুক করুন" : "Book Advisory Session"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Portals, Tools & Client Showcase (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 border-b border-white/[0.06] pb-2">
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>{isBn ? "পোর্টাল ও ট্যুর" : "Portals & Tour"}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {/* Highlighted Link for Client Feature Tour */}
              <li>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/40 text-emerald-300 font-bold transition w-full shadow-sm"
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{isBn ? "৭-পার্সোনা সমন্বিত পোর্টাল" : "Unified 7-Persona Portal Hub"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="hover:text-white transition flex items-center gap-2 group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition shrink-0" />
                  <span className="truncate">{isBn ? "ফিচার ট্যুর ও ব্লুপ্রিন্ট" : "Features & Client Tour"}</span>
                </Link>
              </li>
              <li>
                <Link href="/farmer-portal" className="hover:text-white transition flex items-center gap-2 group">
                  <Compass className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                  <span>{isBn ? "ফার্মার ড্যাশবোর্ড" : "Farmer Portal"}</span>
                </Link>
              </li>
              <li>
                <Link href="/expert-portal" className="hover:text-white transition flex items-center gap-2 group">
                  <Wallet className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
                  <span>{isBn ? "ডাক্তার ওয়ালেট (৭০/৩০)" : "Doctor Wallet (70/30)"}</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition flex items-center gap-2 group">
                  <Lock className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition" />
                  <span>{isBn ? "অ্যাডমিন অর্কেস্ট্রেটর" : "Admin Panel"}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row: Copyright, Legal & National Badge */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="text-center md:text-left text-[11px]">
            © 2026 SROT Platform Bangladesh. Universal Agricultural & Veterinary Telehealth Network.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <span className="hover:text-slate-200 transition">{isBn ? "ক্লিনিক্যাল নির্দেশিকা" : "Clinical Guidelines"}</span>
            <span>•</span>
            <span className="hover:text-slate-200 transition">{isBn ? "গোপনীয়তা নীতি" : "Privacy Policy"}</span>
            <span>•</span>
            <span className="hover:text-slate-200 transition">{isBn ? "ব্যবহারের শর্তাবলী" : "Terms of Service"}</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono font-bold">v3.5 BD Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
