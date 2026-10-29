"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { currentRole, currentUser, openRoleModal } = useUserStore();
  const { language, setLanguage, toggleLanguage } = useLanguageStore();
  const isBn = language === "bn";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      ? "অ্যাডমিন প্যানেল"
      : currentRole.startsWith("expert_") || currentRole === "veterinarian"
      ? "বিশেষজ্ঞ ডেস্ক"
      : currentRole === "pet_owner"
      ? "পেট পোর্টাল"
      : "কৃষক পোর্টাল"
    : currentRole === "admin"
    ? "Admin Panel"
    : currentRole.startsWith("expert_") || currentRole === "veterinarian"
    ? "Clinician Desk"
    : currentRole === "pet_owner"
    ? "Pet Portal"
    : "Farmer Portal";

  const navLinks = [
    {
      label: isBn ? "সেবাসমূহ" : "Services",
      href: "/services",
    },
    {
      label: isBn ? "বিশেষজ্ঞ ও ডাক্তার" : "Experts & Vets",
      href: "/experts",
    },
    {
      label: isBn ? "কমিউনিটি ফোরাম" : "Community Q&A",
      href: "/community",
    },
    {
      label: isBn ? "জ্ঞানকোষ" : "Knowledge Hub",
      href: "/knowledge",
    },
    {
      label: isBn ? "লাইভ চেম্বার" : "Live Chamber",
      href: "/consult/consult-agri-101",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
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
              {/* Emergency Hotline Trigger */}
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 transition font-semibold"
                title={isBn ? "জরুরি হটলাইন" : "24/7 Emergency SOS"}
              >
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>{isBn ? "জরুরি হটলাইন" : "24/7 SOS"}</span>
              </button>

              <span className="text-slate-700 hidden sm:inline">•</span>

              {/* Persona Switcher Dropdown Trigger */}
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

        {/* TIER 2: Main Master Navigation Bar (Always Pinned, Glassmorphic) */}
        <div className="w-full bg-[#070c14]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-18">
              {/* Left: Brand Identity */}
              <SrotLogo size="md" />

              {/* Center: Desktop Navigation Links (Clean, No Bulky Boxes) */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 ${
                        isActive
                          ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-sm"
                          : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Right: Master Control Actions */}
              <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
                {/* 1. Language Toggle Segmented Pill */}
                <div
                  className="inline-flex items-center p-0.5 rounded-lg bg-slate-900 border border-white/[0.08]"
                  title={isBn ? "ভাষা পরিবর্তন করুন" : "Toggle Language"}
                >
                  <button
                    onClick={() => setLanguage("bn")}
                    className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                      isBn
                        ? "bg-emerald-500 text-slate-950 shadow-sm"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    বাংলা
                  </button>
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
                </div>

                {/* 2. Dosage Calculator Modal Trigger */}
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] hover:border-emerald-500/30 text-slate-300 hover:text-white text-xs font-medium transition"
                  title={isBn ? "ওষুধ ও সারের ডোজ ক্যালকুলেটর" : "Agro-Vet Dosage Calculator"}
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden xl:inline">
                    {isBn ? "ডোজ ক্যালকুলেটর" : "Dosage Calc"}
                  </span>
                </button>

                {/* 3. User Role Dedicated Portal Link */}
                <Link
                  href={portalPath}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] hover:border-emerald-500/30 text-slate-300 hover:text-white text-xs font-medium transition"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{portalLabel}</span>
                </Link>

                {/* 4. Primary CTA: Book Consultation */}
                <Link
                  href="/consult"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-extrabold shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-slate-950" />
                  <span>{isBn ? "পরামর্শ বুকিং" : "Book Advisory"}</span>
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
          <div className="md:hidden border-b border-white/[0.08] bg-[#070c14]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
            {/* Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-900 transition"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </Link>
              ))}
            </div>

            {/* Quick Tools */}
            <div className="pt-2 border-t border-white/[0.06] space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCalculatorOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-slate-900 transition"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>
                  {isBn ? "ওষুধ ও সারের ডোজ ক্যালকুলেটর" : "Agro-Vet Dosage Calculator"}
                </span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsEmergencyModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-amber-300 hover:bg-slate-900 transition"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>{isBn ? "জরুরি হটলাইন (২৪/৭)" : "24/7 Emergency SOS Hotline"}</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openRoleModal();
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-slate-900 transition"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span>
                  {isBn ? "ইউজার প্রোফাইল: " : "Current Profile: "}
                  <strong className="text-emerald-400">{currentUser.name}</strong>
                </span>
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
