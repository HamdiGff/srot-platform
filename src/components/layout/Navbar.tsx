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
  ShieldCheck,
  Languages,
  PhoneCall,
  Sparkles,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { currentRole, currentUser, openRoleModal } = useUserStore();
  const { language, toggleLanguage } = useLanguageStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Auto-hide upper section of header on scroll down (reveals when returning to top)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic portal link based on active persona
  const portalPath =
    currentRole === "admin"
      ? "/admin"
      : currentRole.startsWith("expert_") || currentRole === "veterinarian"
      ? "/expert-portal"
      : "/farmer-portal";

  const portalLabel =
    language === "bn"
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
      label: language === "bn" ? "সেবাসমূহ" : "Services",
      href: "/services",
    },
    {
      label: language === "bn" ? "বিশেষজ্ঞ ও চিকিৎসক" : "Experts & Vets",
      href: "/experts",
    },
    {
      label: language === "bn" ? "জ্ঞানকোষ" : "Knowledge Hub",
      href: "/knowledge",
    },
    {
      label: language === "bn" ? "লাইভ চেম্বার" : "Consultation Room",
      href: "/consult/consult-agri-101",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b12]/90 backdrop-blur-xl transition-all duration-300">
        {/* UPPER SECTION: Bangladesh Krishi Helpline & Tele-Health Network */}
        {/* Auto-hides with smooth slide-up and fade-out when user scrolls down */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden bg-gradient-to-r from-emerald-950/80 via-[#0a141a] to-cyan-950/80 border-b border-white/[0.06] ${
            isScrolled
              ? "max-h-0 opacity-0 py-0 border-b-0 -translate-y-2 pointer-events-none"
              : "max-h-14 opacity-100 py-1.5 translate-y-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-bold text-emerald-300 hidden sm:inline">
                {language === "bn" ? "বাংলাদেশ কৃষি ও ভেটেরিনারি নেটওয়ার্ক:" : "SROT BD Tele-Health:"}
              </span>
              <span className="text-slate-300 text-[11px] sm:text-xs">
                {language === "bn"
                  ? "১৪২ জন নিবন্ধিত কৃষিবিদ ও ভেটেরিনারি সার্জন লাইভ"
                  : "142 Council Agronomists & Vets Online"}
              </span>

              {/* Bangladesh Government Krishi Call Center Direct Chip */}
              <a
                href="tel:16123"
                className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-[10px] text-red-300 font-bold hover:bg-red-500/25 transition"
                title="Bangladesh Krishi Call Centre"
              >
                <PhoneCall className="w-2.5 h-2.5" />
                <span>কৃষি কল সেন্টার: ১৬১২৩</span>
              </a>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-slate-800 transition font-bold"
                aria-label="Switch Language"
              >
                <Languages className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === "bn" ? "English" : "বাংলা"}</span>
              </button>

              {/* Dosage Calc Button */}
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white transition px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === "bn" ? "ডোজ ক্যালকুলেটর" : "Dosage Calc"}</span>
              </button>

              {/* SOS Helpline */}
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 animate-pulse"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{language === "bn" ? "জরুরি হটলাইন" : "24/7 SOS"}</span>
              </button>

              <span className="text-slate-700 hidden sm:inline">|</span>

              {/* Persona Switcher Trigger */}
              <button
                onClick={openRoleModal}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span className="text-emerald-400 font-bold text-[11px] truncate max-w-[90px] sm:max-w-none">
                  {currentUser.name.split(" ")[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Main Header Navigation Bar (Always docked) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <SrotLogo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-2xl border border-white/[0.06] backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 shadow-inner"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Quick Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language switcher visible even when top bar is collapsed */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-bold transition hover:border-emerald-500/40"
                title="Switch Language"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{language === "bn" ? "EN" : "বাংলা"}</span>
              </button>

              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition hover-glow-emerald"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>{language === "bn" ? "ডোজ ক্যালক" : "Dosage Calc"}</span>
              </button>

              <Link
                href={portalPath}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-bold transition hover:border-emerald-500/50 hover:-translate-y-0.5"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>{portalLabel}</span>
              </Link>

              <Link
                href="/consult"
                className="btn-shimmer relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white text-xs font-extrabold transition shadow-lg shadow-emerald-950/60 hover:shadow-emerald-900/80 hover:scale-[1.03] active:scale-[0.98]"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{language === "bn" ? "পরামর্শ ও প্রেসক্রিপশন" : "Book Advisory & Rx"}</span>
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 text-emerald-400 text-xs font-bold border border-slate-800"
              >
                {language === "bn" ? "EN" : "বাংলা"}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-[#070b12]/98 px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900 transition"
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCalculatorOpen(true);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-emerald-400 hover:bg-slate-900 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{language === "bn" ? "ডোজ ক্যালকুলেটর খুলুন" : "Open Dosage Calculator"}</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsEmergencyModalOpen(true);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-amber-400 hover:bg-slate-900 flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{language === "bn" ? "জরুরি হটলাইন (২৪/৭)" : "24/7 SOS Helpline"}</span>
            </button>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
              <Link
                href={portalPath}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-bold border border-slate-700"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>{portalLabel}</span>
              </Link>

              <Link
                href="/consult"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold shadow-lg"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{language === "bn" ? "পরামর্শ বুক করুন" : "Book Advisory Consultation"}</span>
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
