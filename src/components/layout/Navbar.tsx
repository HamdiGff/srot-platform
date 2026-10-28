"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/lib/store/userStore";
import { SrotLogo } from "./SrotLogo";
import { RoleSwitcherModal } from "./RoleSwitcherModal";
import { EmergencySosModal } from "./EmergencySosModal";
import {
  CalendarCheck,
  AlertTriangle,
  Menu,
  X,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  PhoneCall,
  Search,
  ShieldCheck,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { currentRole, currentUser, openRoleModal } = useUserStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  // Dynamic portal link based on active persona
  const portalPath =
    currentRole === "admin"
      ? "/admin"
      : currentRole.startsWith("expert_") || currentRole === "veterinarian"
      ? "/expert-portal"
      : "/farmer-portal";

  const portalLabel =
    currentRole === "admin"
      ? "Admin Panel"
      : currentRole.startsWith("expert_") || currentRole === "veterinarian"
      ? "Clinician Desk"
      : currentRole === "pet_owner"
      ? "Pet Portal"
      : "Farmer Portal";

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Experts & Vets", href: "/experts" },
    { label: "Knowledge Hub", href: "/knowledge" },
    { label: "Consultation Room", href: "/consult/consult-agri-101" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b12]/85 backdrop-blur-xl">
        {/* Top Ticker & Persona Bar */}
        <div className="bg-gradient-to-r from-emerald-950/70 via-[#0a111a] to-cyan-950/70 border-b border-white/[0.06] px-4 py-1.5 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold text-emerald-300 hidden sm:inline">
                SROT Tele-Health Network:
              </span>
              <span className="text-slate-300 text-[11px] sm:text-xs">
                142 Agronomists & Veterinary Surgeons On Duty
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] sm:text-xs">
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>24/7 SOS Helpline</span>
              </button>

              <span className="text-slate-700 hidden sm:inline">|</span>

              <button
                onClick={openRoleModal}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span className="text-slate-400 text-[10px] hidden sm:inline">Active:</span>
                <span className="text-emerald-400 font-bold text-[11px]">
                  {currentUser.name.split(" ")[0]} ({currentUser.roleLabel.split(" ")[0]})
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <SrotLogo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-white/[0.06] backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? "text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 shadow-inner"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Quick Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={portalPath}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-bold transition hover:border-emerald-500/40"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>{portalLabel}</span>
              </Link>

              <Link
                href="/consult"
                className="relative group overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white text-xs font-extrabold transition shadow-lg shadow-emerald-950/60 hover:shadow-emerald-900/80 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <CalendarCheck className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Book Advisory & Rx</span>
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center gap-2">
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

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-[#070b12]/98 px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
              >
                {link.label}
              </Link>
            ))}

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
                <span>Book Advisory Consultation</span>
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
    </>
  );
}
