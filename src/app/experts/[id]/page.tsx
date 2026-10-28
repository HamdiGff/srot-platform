import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PLATFORM_EXPERTS } from "@/data/mockExperts";
import { formatCurrency } from "@/lib/utils";
import {
  ShieldCheck,
  Star,
  Clock,
  Video,
  Phone,
  Camera,
  MapPin,
  CalendarCheck,
  GraduationCap,
  Globe,
  Award,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

interface ExpertDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PLATFORM_EXPERTS.map((e) => ({ id: e.id }));
}

export default async function ExpertDetailPage({ params }: ExpertDetailPageProps) {
  const { id } = await params;
  const expert = PLATFORM_EXPERTS.find((e) => e.id === id);

  if (!expert) {
    notFound();
  }

  const isAgri = expert.primaryCategory === "agri";
  const isPet = expert.primaryCategory === "pet";

  return (
    <div className="w-full srot-glow-mesh py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <span>/</span>
        <Link href="/experts" className="hover:text-emerald-400">Experts</Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{expert.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Profile & Bio */}
        <div className="lg:col-span-2 space-y-8">
          {/* Top Profile Card */}
          <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-2 border-slate-700/80 shadow-xl"
              />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {expert.categoryBadge}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{expert.rating}</span>
                    <span className="text-slate-400 font-normal">({expert.reviewCount} Reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                  <span>{expert.name}</span>
                  <span title="Council Verified">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </span>
                </h1>

                <p className="text-sm font-medium text-slate-300">{expert.title}</p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="font-mono bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                    Reg: {expert.registrationNumber}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {expert.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-800/80 text-center">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-lg font-bold text-white block">{expert.experienceYears}+ Yrs</span>
                <span className="text-[10px] uppercase text-slate-400">Clinical Field Exp</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-lg font-bold text-emerald-400 block">{expert.consultationCount}+</span>
                <span className="text-[10px] uppercase text-slate-400">Consultations Solved</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-lg font-bold text-cyan-400 block">99.4%</span>
                <span className="text-[10px] uppercase text-slate-400">Satisfaction Score</span>
              </div>
            </div>
          </div>

          {/* Full Biography */}
          <div className="srot-glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white">Clinical & Field Biography</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{expert.bio}</p>

            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Academic Credentials</span>
                  <span className="text-slate-400">{expert.qualification}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Globe className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Consultation Languages</span>
                  <span className="text-slate-400">{expert.languages.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="srot-glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
            <h2 className="text-lg font-bold text-white mb-4">Areas of Specialty & Research:</h2>
            <div className="flex flex-wrap gap-2">
              {expert.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200"
                >
                  ✓ {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Consultation Booking Box */}
        <div className="srot-glass-card rounded-3xl p-6 border border-emerald-500/30 self-start shadow-2xl space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Official Session Rate
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">
                {formatCurrency(expert.feePerConsultation)}
              </span>
              <span className="text-xs text-slate-400">/ case advisory</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Availability:</span>
              <span className="text-emerald-400 font-bold">
                {expert.availableToday ? "Available Today" : "Next Day Slot"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Earliest Slot:</span>
              <span className="text-white font-semibold">{expert.nextSlotTime}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-semibold text-slate-300 block">Consultation Modes Supported:</span>
            <div className="grid grid-cols-2 gap-2">
              {expert.supportedChannels.map((ch) => (
                <div
                  key={ch}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5 capitalize"
                >
                  {ch === "video" && <Video className="w-3.5 h-3.5 text-cyan-400" />}
                  {ch === "audio" && <Phone className="w-3.5 h-3.5 text-emerald-400" />}
                  {ch === "photo_instant" && <Camera className="w-3.5 h-3.5 text-amber-400" />}
                  {ch === "field_visit" && <MapPin className="w-3.5 h-3.5 text-purple-400" />}
                  {ch.replace("_", " ")}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <Link
              href={`/consult?expert=${expert.id}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm transition shadow-lg shadow-emerald-950/60"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Appointment with {expert.name.split(" ")[0]}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
