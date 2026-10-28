import React from "react";
import Link from "next/link";
import { PlatformExpert } from "@/data/mockExperts";
import { formatCurrency } from "@/lib/utils";
import { Star, ShieldCheck, Video, Phone, Camera, MapPin, Calendar, Clock, ArrowRight } from "lucide-react";

interface ExpertCardProps {
  expert: PlatformExpert;
}

export function ExpertCard({ expert }: ExpertCardProps) {
  const isAgri = expert.primaryCategory === "agri";
  const isPet = expert.primaryCategory === "pet";

  const getCategoryColor = () => {
    if (isAgri) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (isPet) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
  };

  return (
    <div className="srot-glass-card srot-glass-card-hover rounded-2xl p-5 flex flex-col justify-between border border-slate-800">
      <div>
        {/* Top bar with badge and rating */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryColor()}`}
          >
            {expert.categoryBadge}
          </span>

          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full text-amber-300 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{expert.rating}</span>
            <span className="text-[10px] text-slate-400 font-normal">({expert.reviewCount})</span>
          </div>
        </div>

        {/* Profile info */}
        <div className="flex items-start gap-3.5">
          <div className="relative shrink-0">
            <img
              src={expert.avatar}
              alt={expert.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-700/80 shadow-md"
            />
            {expert.availableToday && (
              <span
                title="Available today"
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[9px] text-white"
              >
                ✓
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-white text-base truncate">{expert.name}</h3>
              <span title="SROT Verified">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium line-clamp-1">{expert.title}</p>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{expert.registrationNumber}</p>
          </div>
        </div>

        {/* Experience & Consultations count */}
        <div className="grid grid-cols-2 gap-2 mt-4 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60 text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Experience</span>
            <span className="text-xs font-bold text-slate-200">{expert.experienceYears}+ Years</span>
          </div>
          <div className="border-l border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Consultations</span>
            <span className="text-xs font-bold text-slate-200">{expert.consultationCount}+ Cases</span>
          </div>
        </div>

        {/* Specialties tags */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {expert.specialties.slice(0, 3).map((spec, i) => (
            <span
              key={i}
              className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Next Available Slot */}
        <div className="mt-3.5 flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[11px]">Next: <strong className="text-slate-200">{expert.nextSlotTime}</strong></span>
        </div>
      </div>

      {/* Footer fee and book button */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase text-slate-400 block font-medium">Session Fee</span>
          <span className="text-base font-extrabold text-white">
            {formatCurrency(expert.feePerConsultation)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/experts/${expert.id}`}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
          >
            Profile
          </Link>
          <Link
            href={`/consult?expert=${expert.id}`}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-md shadow-emerald-950/60"
          >
            <span>Consult</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
