"use client";

import React from "react";
import Link from "next/link";
import { SrotLogo } from "./SrotLogo";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  Wheat,
  Milk,
  HeartHandshake,
  ShieldCheck,
  PhoneCall,
  Mail,
  MapPin,
  Lock,
  ArrowRight,
  CreditCard,
} from "lucide-react";

export function Footer() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  return (
    <footer className="w-full bg-[#04070b] border-t border-slate-800/80 text-slate-400 text-sm">
      {/* Top Banner: Emergency Hotline & Biosecurity */}
      <div className="border-b border-white/[0.05] bg-[#070b12] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <PhoneCall className="w-4 h-4 animate-pulse" />
            </span>
            <span className="text-slate-300">
              {isBn ? "বাংলাদেশ জরুরি কৃষি ও ভেটেরিনারি হটলাইন:" : "Bangladesh Agro-Vet Emergency Helplines:"}
            </span>
            <a
              href="tel:16123"
              className="font-mono font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 hover:bg-red-500/20 transition"
            >
              ১৬১২৩ (কৃষি কল সেন্টার)
            </a>
            <a
              href="tel:333"
              className="font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 hover:bg-cyan-500/20 transition"
            >
              ৩৩৩ (সরকারি সেবা)
            </a>
            <span className="text-slate-400 font-mono hidden sm:inline">
              | SROT: 09612-776823
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-pink-400 font-bold">
              বিকাশ (bKash)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-orange-400 font-bold">
              নগদ (Nagad)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-purple-400 font-bold">
              রকেট (Rocket)
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <SrotLogo size="lg" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {isBn
                ? "এসআরওটি (উৎস) বাংলাদেশের ডিজিটাল কৃষি ও প্রাণিসম্পদ স্বাস্থ্য প্ল্যাটফর্ম। ফসল চাষি, ডেইরি খামারি ও পোষা প্রাণীর অভিভাবকদের জন্য আধুনিক বৈজ্ঞানিক পরামর্শ, দ্রুত ভিজ্যুয়াল ট্রায়াজ ও কিউআর কোডযুক্ত ডিজিটাল প্রেসক্রিপশন প্রদান।"
                : "SROT is Bangladesh's premier digital agriculture and animal healthcare service platform. Connecting grain producers, dairy farmers, and pet parents with council-accredited specialists."}
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {isBn ? "অনুমোদিত জাতীয় নির্দেশিকা" : "National Standards Compliance"}
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isBn
                  ? "কৃষি সম্প্রসারণ অধিদপ্তর (DAE), প্রাণিসম্পদ অধিদপ্তর (DLS), এবং বাংলাদেশ ভেটেরিনারি কাউন্সিল (BVC) নির্দেশিকা অনুসারে চিকিৎসাসেবা নিশ্চিত করা হয়।"
                  : "All clinical procedures and withholding intervals adhere to DAE, DLS, BVC, and FAO standards."}
              </p>
            </div>
          </div>

          {/* Agriculture Advisory */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Wheat className="w-4 h-4 text-emerald-400" />
              {isBn ? "কৃষি সেবা" : "Agriculture"}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/crop-disease" className="hover:text-emerald-400 transition">
                  {isBn ? "ফসলের রোগ নির্ণয় (ব্লাস্ট/ধসা)" : "Crop Disease Diagnosis"}
                </Link>
              </li>
              <li>
                <Link href="/services/fertilizer-advice" className="hover:text-emerald-400 transition">
                  {isBn ? "মাটির পিএইচ ও সার প্রয়োগ" : "Soil Health & Fertilizer"}
                </Link>
              </li>
              <li>
                <Link href="/services/pest-management" className="hover:text-emerald-400 transition">
                  {isBn ? "আইপিএম বালাই দমন (মাজরা/বিপিএইচ)" : "Integrated Pest Management"}
                </Link>
              </li>
              <li>
                <Link href="/services/field-visits" className="hover:text-emerald-400 transition">
                  {isBn ? "মাঠে কৃষিবিদ পরিদর্শন" : "Agronomist Field Inspection"}
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-emerald-400 transition">
                  {isBn ? "উদ্ভিদ রোগতত্ত্ব জ্ঞানকোষ" : "Crop Pathology Library"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Animal Healthcare */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Milk className="w-4 h-4 text-cyan-400" />
              {isBn ? "প্রাণিসম্পদ ও পেট কেয়ার" : "Animal Health & Pets"}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/cattle-health" className="hover:text-cyan-400 transition">
                  {isBn ? "ডেইরি গাভী ও ওলান পাকা চিকিৎসা" : "Dairy Cattle & Bovine Care"}
                </Link>
              </li>
              <li>
                <Link href="/services/poultry-health" className="hover:text-cyan-400 transition">
                  {isBn ? "পোল্ট্রি ব্রয়লার ও লেয়ার বায়োসিকিউরিটি" : "Poultry Flock Biosecurity"}
                </Link>
              </li>
              <li>
                <Link href="/services/goat-sheep" className="hover:text-cyan-400 transition">
                  {isBn ? "ব্ল্যাক বেঙ্গল ছাগল ও পিপিআর টিকা" : "Goat & Sheep Healthcare"}
                </Link>
              </li>
              <li>
                <Link href="/services/fisheries" className="hover:text-cyan-400 transition">
                  {isBn ? "পুকুরের মাছ ও ঘের ব্যবস্থাপনা" : "Aquaculture & Pond Quality"}
                </Link>
              </li>
              <li>
                <Link href="/services/pet-services" className="hover:text-amber-400 font-semibold transition">
                  {isBn ? "২৪/৭ পোষা বিড়াল-কুকুর টেলি-ভেটেরিনারি" : "24/7 Pet Tele-Vet (Dogs/Cats)"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Tools */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {isBn ? "প্ল্যাটফর্ম ও ড্যাশবোর্ড" : "Platform & Tools"}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/consult" className="hover:text-white transition">
                  {isBn ? "পরামর্শ বুক করুন" : "Book Consultation"}
                </Link>
              </li>
              <li>
                <Link href="/consult/consult-agri-101" className="hover:text-white transition">
                  {isBn ? "লাইভ কনসালটেশন চেম্বার" : "Live Consultation Room"}
                </Link>
              </li>
              <li>
                <Link href="/farmer-portal" className="hover:text-white transition">
                  {isBn ? "কৃষক ও খামারি পোর্টাল" : "Farmer / Producer Dashboard"}
                </Link>
              </li>
              <li>
                <Link href="/expert-portal" className="hover:text-white transition">
                  {isBn ? "চিকিৎসক ও বিশেষজ্ঞ ডেস্ক" : "Practitioner Clinician Desk"}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition">
                  {isBn ? "অ্যাডমিন মডিউলার প্যানেল" : "Admin Modular Orchestrator"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © 2026 SROT Platform Bangladesh. Universal Agricultural & Veterinary Telehealth Network.
          </p>
          <div className="flex items-center gap-6">
            <span>{isBn ? "ক্লিনিকাল স্ট্যান্ডার্ডস" : "Clinical Standards"}</span>
            <span>{isBn ? "গোপনীয়তা নীতি" : "Privacy Policy"}</span>
            <span>{isBn ? "ব্যবহারের শর্তাবলী" : "Terms of Advisory"}</span>
            <span className="text-emerald-400 font-mono">v3.4 BD Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
