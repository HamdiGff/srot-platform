"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { SrotLogo } from "./SrotLogo";
import { RoleSwitcherModal } from "./RoleSwitcherModal";
import { EmergencySosModal } from "./EmergencySosModal";
import { DosageCalculatorModal } from "@/components/features/DosageCalculatorModal";
import {
  CalendarCheck,
  AlertTriangle,
  Menu,
  X,
  LayoutDashboard,
  ChevronDown,
  Calculator,
  PhoneCall,
  Sparkles,
  ArrowRight,
  Wheat,
  Milk,
  Egg,
  Fish,
  HeartHandshake,
  MessageSquare,
  BookOpen,
  CloudSun,
  FlaskConical,
  Package,
  FileSpreadsheet,
  GraduationCap,
  ShoppingBag,
  MapPin,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

type ActiveDropdown = "services" | "community" | "ecosystem" | null;

export function Navbar() {
  const pathname = usePathname();
  const { currentRole, currentUser, openRoleModal } = useUserStore();
  const { language, setLanguage, toggleLanguage } = useLanguageStore();
  const isBn = language === "bn";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);

  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-hide upper utility strip on scroll down (reveals smoothly when back at the top)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic portal link and label based on active user persona
  const portalPath =
    currentRole === "admin"
      ? "/admin"
      : currentRole.startsWith("expert_") || currentRole === "veterinarian"
      ? "/expert-portal"
      : "/farmer-portal";

  const portalLabel = isBn
    ? currentRole === "admin"
      ? "অ্যাডমিন"
      : currentRole.startsWith("expert_") || currentRole === "veterinarian"
      ? "ডেস্ক"
      : currentRole === "pet_owner"
      ? "পেট"
      : "পোর্টাল"
    : currentRole === "admin"
    ? "Admin"
    : currentRole.startsWith("expert_") || currentRole === "veterinarian"
    ? "Desk"
    : currentRole === "pet_owner"
    ? "Pet"
    : "Portal";

  return (
    <>
      <header ref={navRef} className="sticky top-0 z-40 w-full transition-all duration-300">
        {/* TIER 1: Upper Status Bar (Auto-hides smoothly when scrolling down) */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden bg-[#04080e]/95 backdrop-blur-md border-b border-white/[0.05] ${
            isScrolled
              ? "max-h-0 opacity-0 py-0 border-b-0 -translate-y-2 pointer-events-none"
              : "max-h-12 opacity-100 py-1.5 translate-y-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
            {/* Left: Live Tele-health Network Status */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-400 text-[11px] sm:text-xs">
                {isBn ? (
                  <>
                    <strong className="text-emerald-400 font-semibold mr-1.5">
                      লাইভ নেটওয়ার্ক:
                    </strong>
                    ১৪২ জন নিবন্ধিত কৃষিবিদ ও ভেটেরিনারি সার্জন সক্রিয়
                  </>
                ) : (
                  <>
                    <strong className="text-emerald-400 font-semibold mr-1.5">
                      Live Network:
                    </strong>
                    142 Certified Agronomists & Veterinarians Online
                  </>
                )}
              </span>

              {/* Bangladesh Government Krishi Call Center direct chip */}
              <a
                href="tel:16123"
                className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-[10px] text-slate-300 font-medium transition"
                title={isBn ? "কৃষি কল সেন্টার হটলাইন" : "Govt Krishi Call Center"}
              >
                <PhoneCall className="w-2.5 h-2.5 text-emerald-400" />
                <span>{isBn ? "কৃষি কল সেন্টার: ১৬১২৩" : "Krishi Hotline: 16123"}</span>
              </a>
            </div>

            {/* Right: Emergency Hotline & Persona Profile Switcher */}
            <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 transition font-semibold"
                title={isBn ? "জরুরি হটলাইন" : "24/7 Emergency SOS"}
              >
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>{isBn ? "জরুরি হটলাইন" : "24/7 SOS"}</span>
              </button>

              <span className="text-slate-700 hidden sm:inline">•</span>

              {/* Persona Switcher Trigger */}
              <button
                onClick={openRoleModal}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition"
                title={isBn ? "ইউজার রোল পরিবর্তন করুন" : "Switch User Persona"}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-4 h-4 rounded-full object-cover border border-emerald-500/40"
                />
                <span className="text-slate-300 font-medium text-[11px] truncate max-w-[80px] sm:max-w-none">
                  {currentUser.name.split(" ")[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* TIER 2: Main Master Navigation Bar (Spacious, Dropdown-Organized) */}
        <div className="w-full bg-[#070c14]/92 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-18">
              {/* Left: Brand Identity */}
              <SrotLogo size="md" />

              {/* Center: Clean Grouped Dropdowns & Direct Links */}
              <nav className="hidden lg:flex items-center gap-1.5">
                {/* 1. SECTOR SERVICES DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === "services" ? null : "services")
                    }
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      activeDropdown === "services" || pathname.startsWith("/services")
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{isBn ? "সেবাসমূহ" : "Services"}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === "services" ? "rotate-180 text-emerald-400" : "text-slate-500"
                      }`}
                    />
                  </button>

                  {/* Flyout Menu for Services */}
                  {activeDropdown === "services" && (
                    <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[#090f19]/98 border border-white/[0.08] shadow-2xl p-3 grid gap-1 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {isBn ? "কৃষি ও প্রাণিসম্পদ খাত" : "Core Sectors & Services"}
                      </div>

                      <Link
                        href="/services/crop-disease"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                          <Wheat className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white group-hover:text-emerald-300 block">
                            {isBn ? "ফসলের রোগ ও স্প্রে প্রোটোকল" : "Crop Disease & Diagnostics"}
                          </strong>
                          <span className="text-[10px] text-slate-400 leading-tight block">
                            {isBn ? "ধান, গম, পাট, ভুট্টা ও সবজির রোগ" : "Fungal, bacterial & pest triage"}
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/services/cattle-health"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                          <Milk className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white group-hover:text-cyan-300 block">
                            {isBn ? "ডেইরি ও বোভাইন মেডিসিন" : "Dairy & Cattle Medicine"}
                          </strong>
                          <span className="text-[10px] text-slate-400 leading-tight block">
                            {isBn ? "ল্যাম্পি স্কিন (LSD), ম্যাসটাইটিস, দুধ বৃদ্ধি" : "Mastitis, LSD & lactation rations"}
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/services/poultry-health"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                          <Egg className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white group-hover:text-amber-300 block">
                            {isBn ? "পোল্ট্রি ও মুরগি ফ্লক স্বাস্থ্য" : "Poultry & Flock Health"}
                          </strong>
                          <span className="text-[10px] text-slate-400 leading-tight block">
                            {isBn ? "ব্রয়লার, লেয়ার, গামবোরো ও ভ্যাকসিন" : "Broiler FCR, Gumboro & biosecurity"}
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/services/fisheries"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                          <Fish className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white group-hover:text-blue-300 block">
                            {isBn ? "মৎস্য ও অ্যাকুয়াকালচার" : "Fisheries & Pond Management"}
                          </strong>
                          <span className="text-[10px] text-slate-400 leading-tight block">
                            {isBn ? "অক্সিজেন ক্র্যাশ, অ্যামোনিয়া ও ফুলকা পচা" : "DO crash, ammonia & fingerling triage"}
                          </span>
                        </div>
                      </Link>

                      <div className="pt-2 border-t border-white/[0.06] mt-1">
                        <Link
                          href="/services"
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-xs text-emerald-400 font-bold transition"
                        >
                          <span>{isBn ? "সকল সেবা ক্যাটালগ দেখুন" : "View All Services Catalog"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. KNOWLEDGE & COMMUNITY DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === "community" ? null : "community")
                    }
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      activeDropdown === "community" ||
                      pathname === "/community" ||
                      pathname.startsWith("/knowledge")
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{isBn ? "জ্ঞান ও প্রশ্নোত্তর" : "Knowledge & Q&A"}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === "community" ? "rotate-180 text-emerald-400" : "text-slate-500"
                      }`}
                    />
                  </button>

                  {/* Flyout Menu for Knowledge & Community */}
                  {activeDropdown === "community" && (
                    <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[#090f19]/98 border border-white/[0.08] shadow-2xl p-3 grid gap-1 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {isBn ? "উন্মুক্ত জ্ঞান ও প্রশ্নোত্তর" : "Open Learning & Community"}
                      </div>

                      <Link
                        href="/community"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center gap-1.5">
                            <span>{isBn ? "কমিউনিটি ফোরাম (Q&A)" : "Ask Community Q&A"}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                              FREE
                            </span>
                          </strong>
                          <span className="text-[10px] text-slate-400 leading-tight block">
                            {isBn ? "কৃষি স্ট্যাক ওভারফ্লো • বিনামূল্যে প্রশ্ন করুন" : "Agri Stack Overflow • 8,500+ solved"}
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/knowledge"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white group-hover:text-cyan-300 block">
                            {isBn ? "বিজ্ঞানসম্মত প্রটোকল জ্ঞানকোষ" : "Protocols & Knowledge Hub"}
                          </strong>
                          <span className="text-[10px] text-slate-400 leading-tight block">
                            {isBn ? "সরকারি অনুমোদিত রোগ দমন নির্দেশিকা" : "Peer-reviewed agro-vet field guides"}
                          </span>
                        </div>
                      </Link>

                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          setIsCalculatorOpen(true);
                        }}
                        className="w-full text-left flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                          <Calculator className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white group-hover:text-amber-300 block">
                            {isBn ? "ওষুধ ও সারের ডোজ ক্যালকুলেটর" : "Dosage Calculator Tool"}
                          </strong>
                          <span className="text-[10px] text-slate-400 leading-tight block">
                            {isBn ? "ওজন ও আয়তনভিত্তিক নির্ভুল মাত্রা" : "Titrated per bodyweight & bigha area"}
                          </span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. ECOSYSTEM & UPCOMING ROADMAP DROPDOWN (NEW FEATURE SPACE!) */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === "ecosystem" ? null : "ecosystem")
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      activeDropdown === "ecosystem"
                        ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{isBn ? "ইকোসিস্টেম ও প্যাকেজ" : "Ecosystem & Roadmap"}</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950">
                      NEW
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === "ecosystem" ? "rotate-180 text-emerald-400" : "text-slate-500"
                      }`}
                    />
                  </button>

                  {/* Flyout Menu for Upcoming Roadmap Modules */}
                  {activeDropdown === "ecosystem" && (
                    <div className="absolute top-full left-0 mt-2 w-84 rounded-2xl bg-[#090f19]/98 border border-white/[0.08] shadow-2xl p-3 grid gap-1.5 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-2 py-1 flex items-center justify-between text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        <span>{isBn ? "ব্লুপ্রিন্ট ও ভবিষ্যৎ ফিচারসমূহ" : "Blueprint Modules & Roadmap"}</span>
                        <span className="text-emerald-400 font-mono">v1.0</span>
                      </div>

                      <Link
                        href="/farmer-portal#packages"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center gap-1.5">
                            <span>{isBn ? "খামার হেলথ প্যাকেজ" : "Farm Health Packages"}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                              ৳১৯৯ / ৳৪৯৯
                            </span>
                          </strong>
                          <span className="text-[10px] text-slate-400 leading-tight block">
                            {isBn ? "মাসিক আনলিমিটেড ট্রায়াজ ও ডাক্তার সাপোর্ট" : "Monthly unlimited advisory & alerts (Step 4)"}
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/farmer-portal#records"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                          <FileSpreadsheet className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white group-hover:text-cyan-300 flex items-center gap-1.5">
                            <span>{isBn ? "খামার ও পশুর স্বাস্থ্য রেকর্ড" : "Farm & Animal Health Records"}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400">
                              Step 5
                            </span>
                          </strong>
                          <span className="text-[10px] text-slate-400 leading-tight block">
                            {isBn ? "ফসল সাইকেল, ক্যাটল ইয়ার ট্যাগ ও ভ্যাকসিন ট্র্যাকার" : "Ear tag IDs, vaccine schedule & crop logs"}
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/services/field-visits"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white group-hover:text-purple-300 flex items-center gap-1.5">
                            <span>{isBn ? "ফিল্ড সার্ভিস ও অন-সাইট ভিজিট" : "Field Services & Home Visits"}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-400">
                              Step 6
                            </span>
                          </strong>
                          <span className="text-[10px] text-slate-400 leading-tight block">
                            {isBn ? "ভেটেরিনারি ভিজিট, কৃত্রিম প্রজনন ও মাটি পরীক্ষা" : "Farm visit, AI service & soil testing"}
                          </span>
                        </div>
                      </Link>

                      <Link
                        href="/knowledge#academy"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/[0.04] transition group"
                      >
                        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1.5">
                            <span>{isBn ? "লার্নিং একাডেমি ও ওয়েবিনার" : "Learning Academy & Webinars"}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400">
                              Step 7
                            </span>
                          </strong>
                          <span className="text-[10px] text-slate-400 leading-tight block">
                            {isBn ? "বিশেষজ্ঞদের পেইড প্রশিক্ষণ কোর্স ও সার্টিফিকেট" : "Paid agro-vet video courses (70/30 share)"}
                          </span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                {/* 4. DIRECT LINK: EXPERTS & VETS */}
                <Link
                  href="/experts"
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    pathname === "/experts" || pathname.startsWith("/experts/")
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {isBn ? "বিশেষজ্ঞ ও ডাক্তার" : "Experts & Vets"}
                </Link>

                {/* 5. DIRECT LINK: FEATURES & TOUR */}
                <Link
                  href="/features"
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                    pathname === "/features"
                      ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isBn ? "ফিচারসমূহ" : "Features"}</span>
                </Link>
              </nav>

              {/* Right: Master Control Actions (Streamlined, Not Crammed) */}
              <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
                {/* 1. Language Toggle */}
                <div
                  className="inline-flex items-center p-0.5 rounded-lg bg-slate-900 border border-white/[0.08]"
                  title={isBn ? "Switch Language" : "Toggle Language"}
                >
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                      !isBn
                        ? "bg-emerald-500 text-slate-950 shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("bn")}
                    className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                      isBn
                        ? "bg-emerald-500 text-slate-950 shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    বাং
                  </button>
                </div>

                {/* 2. Compact Dosage Calculator Icon Button */}
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] hover:border-emerald-500/30 text-emerald-400 transition"
                  title={isBn ? "ওষুধ ও সারের ডোজ ক্যালকুলেটর" : "Agro-Vet Dosage Calculator"}
                  aria-label="Dosage Calculator"
                >
                  <Calculator className="w-4 h-4" />
                </button>

                {/* 3. Dedicated User Role Portal */}
                <Link
                  href={portalPath}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] hover:border-emerald-500/30 text-slate-300 hover:text-white text-xs font-semibold transition"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{portalLabel}</span>
                </Link>

                {/* 4. Primary High-Conversion CTA */}
                <Link
                  href="/consult"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-extrabold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-slate-950" />
                  <span>{isBn ? "পরামর্শ নিন" : "Book Advisory"}</span>
                </Link>
              </div>

              {/* Mobile Right Controls: Language Button + Drawer Trigger */}
              <div className="flex md:hidden items-center gap-2">
                <button
                  onClick={toggleLanguage}
                  className="px-2 py-1 rounded-md bg-slate-900 text-emerald-400 text-[11px] font-bold border border-white/[0.08]"
                  title="Switch Language"
                >
                  {isBn ? "EN" : "বাংলা"}
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-white/[0.08]"
                  aria-label="Toggle navigation menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-white/[0.08] bg-[#070c14]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
            {/* Quick Links */}
            <div className="space-y-1">
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-900 transition"
              >
                <span>{isBn ? "সেবাসমূহ ও খাত" : "Services & Sectors"}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>

              <Link
                href="/community"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold text-emerald-300 hover:bg-slate-900 transition"
              >
                <span className="flex items-center gap-1.5">
                  <span>{isBn ? "কমিউনিটি ফোরাম (Q&A)" : "Community Q&A"}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    FREE
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>

              <Link
                href="/experts"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-900 transition"
              >
                <span>{isBn ? "বিশেষজ্ঞ ও ডাক্তার" : "Experts & Vets"}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>

              <Link
                href="/knowledge"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-900 transition"
              >
                <span>{isBn ? "বিজ্ঞানসম্মত জ্ঞানকোষ" : "Knowledge Hub"}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>

              <Link
                href="/features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-bold text-cyan-300 hover:bg-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>{isBn ? "প্ল্যাটফর্ম ফিচারসমূহ" : "Platform Features & Tour"}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </div>

            {/* Upcoming Roadmap Modules */}
            <div className="pt-2 border-t border-white/[0.06] space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 px-3 block">
                {isBn ? "ইকোসিস্টেম ফিচারসমূহ" : "Ecosystem Modules"}
              </span>

              <Link
                href="/farmer-portal#packages"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isBn ? "খামার হেলথ প্যাকেজ (৳১৯৯/৳৪৯৯)" : "Farm Health Packages"}</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                  NEW
                </span>
              </Link>

              <Link
                href="/farmer-portal#records"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-900 transition"
              >
                <span className="flex items-center gap-2">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isBn ? "খামার ও পশুর রেকর্ড" : "Farm & Animal Records"}</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 font-mono">
                  Step 5
                </span>
              </Link>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCalculatorOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-slate-900 transition"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? "ডোজ ক্যালকুলেটর" : "Dosage Calculator"}</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsEmergencyModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-amber-300 hover:bg-slate-900 transition"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>{isBn ? "জরুরি হটলাইন (২৪/৭)" : "24/7 Emergency SOS Hotline"}</span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
              <Link
                href={portalPath}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-slate-200 text-xs font-semibold border border-white/[0.08]"
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                <span>{portalLabel}</span>
              </Link>

              <Link
                href="/consult"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-extrabold shadow-md"
              >
                <CalendarCheck className="w-4 h-4 text-slate-950" />
                <span>{isBn ? "পরামর্শ বুকিং" : "Book Advisory"}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <RoleSwitcherModal />
      <EmergencySosModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
      <DosageCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </>
  );
}
