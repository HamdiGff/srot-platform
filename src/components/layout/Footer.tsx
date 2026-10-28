import React from "react";
import Link from "next/link";
import { SrotLogo } from "./SrotLogo";
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
} from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#04070b] border-t border-slate-800/80 text-slate-400 text-sm">
      {/* Top Banner: Emergency Hotline & Biosecurity */}
      <div className="border-b border-white/[0.05] bg-[#070b12] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <PhoneCall className="w-4 h-4 animate-pulse" />
            </span>
            <span className="text-slate-300">
              24/7 Agro-Veterinary Emergency Hotline:{" "}
              <strong className="text-white font-mono">1800-SROT-SOS</strong> (Toll-Free)
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Council Accredited
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-cyan-400" /> 256-Bit Encrypted Records
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
              SROT is a digital agriculture and animal healthcare service platform. Providing crop farmers, commercial livestock producers, and companion pet owners with accredited scientific advisory, rapid visual triage, and verifiable digital prescriptions.
            </p>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Modular Architecture Architecture
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Services exist as independent plug-in modules across Phase 1 (Crops & Knowledge), Phase 2 (Livestock & Pet Tele-Vet), and Phase 3 (Marketplace & Inputs).
              </p>
            </div>
          </div>

          {/* Agriculture Advisory */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Wheat className="w-4 h-4 text-emerald-400" /> Agriculture
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/crop-disease" className="hover:text-emerald-400 transition">
                  Crop Disease Diagnosis
                </Link>
              </li>
              <li>
                <Link href="/services/fertilizer-advice" className="hover:text-emerald-400 transition">
                  Fertilizer & Soil Nutrition
                </Link>
              </li>
              <li>
                <Link href="/services/pest-management" className="hover:text-emerald-400 transition">
                  Integrated Pest Management
                </Link>
              </li>
              <li>
                <Link href="/services/field-visits" className="hover:text-emerald-400 transition">
                  Agronomist Field Inspection
                </Link>
              </li>
              <li>
                <Link href="/knowledge" className="hover:text-emerald-400 transition">
                  Crop Pathology Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Animal Healthcare */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Milk className="w-4 h-4 text-cyan-400" /> Animal Health & Pets
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services/cattle-health" className="hover:text-cyan-400 transition">
                  Dairy Cattle & Bovine Care
                </Link>
              </li>
              <li>
                <Link href="/services/poultry-health" className="hover:text-cyan-400 transition">
                  Poultry Flock Biosecurity
                </Link>
              </li>
              <li>
                <Link href="/services/goat-sheep" className="hover:text-cyan-400 transition">
                  Goat & Sheep Healthcare
                </Link>
              </li>
              <li>
                <Link href="/services/fisheries" className="hover:text-cyan-400 transition">
                  Aquaculture & Pond Quality
                </Link>
              </li>
              <li>
                <Link href="/services/pet-services" className="hover:text-amber-400 font-semibold transition">
                  24/7 Pet Tele-Vet (Dogs/Cats)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Tools */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform & Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/consult" className="hover:text-white transition">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link href="/consult/consult-agri-101" className="hover:text-white transition">
                  Live Consultation Room
                </Link>
              </li>
              <li>
                <Link href="/farmer-portal" className="hover:text-white transition">
                  Farmer / Producer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/expert-portal" className="hover:text-white transition">
                  Practitioner Clinician Desk
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition">
                  Admin Modular Orchestrator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-14 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SROT Platform. Universal Agricultural & Veterinary Telehealth Network.</p>
          <div className="flex items-center gap-6">
            <span>Clinical Standards</span>
            <span>Privacy Policy</span>
            <span>Terms of Advisory</span>
            <span className="text-emerald-400 font-mono">v2.5 Modular Core</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
