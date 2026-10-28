import React from "react";
import Link from "next/link";
import { PlatformService } from "@/data/mockServices";
import { formatCurrency } from "@/lib/utils";
import {
  Wheat,
  Sprout,
  Bug,
  MapPin,
  Milk,
  Egg,
  ShieldAlert,
  Waves,
  HeartHandshake,
  Apple,
  Video,
  Phone,
  Camera,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface ServiceCardProps {
  service: PlatformService;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Wheat":
        return <Wheat className="w-6 h-6 text-emerald-400" />;
      case "Sprout":
        return <Sprout className="w-6 h-6 text-emerald-400" />;
      case "Bug":
        return <Bug className="w-6 h-6 text-emerald-400" />;
      case "MapPin":
        return <MapPin className="w-6 h-6 text-emerald-400" />;
      case "Milk":
        return <Milk className="w-6 h-6 text-cyan-400" />;
      case "Egg":
        return <Egg className="w-6 h-6 text-cyan-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6 text-cyan-400" />;
      case "Waves":
        return <Waves className="w-6 h-6 text-cyan-400" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-6 h-6 text-amber-400" />;
      case "Apple":
        return <Apple className="w-6 h-6 text-amber-400" />;
      default:
        return <Sprout className="w-6 h-6 text-emerald-400" />;
    }
  };

  const getCategoryColor = (cat: string) => {
    if (cat === "agri") return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
    if (cat === "veterinary") return "border-cyan-500/20 bg-cyan-500/10 text-cyan-400";
    return "border-amber-500/20 bg-amber-500/10 text-amber-400";
  };

  return (
    <div className="srot-glass-card srot-glass-card-hover rounded-2xl p-6 flex flex-col justify-between group border border-slate-800">
      <div>
        {/* Header badges */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
              {getIcon(service.iconName)}
            </span>
            <span
              className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getCategoryColor(
                service.category
              )}`}
            >
              {service.categoryLabel}
            </span>
          </div>

          <span className="text-[11px] font-bold text-slate-400 bg-slate-800/70 px-2.5 py-0.5 rounded-full border border-slate-700/50">
            {service.badge}
          </span>
        </div>

        {/* Title & short tagline */}
        <Link href={`/services/${service.slug}`} className="block group-hover:text-emerald-400 transition">
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition line-clamp-1">
            {service.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
          {service.shortTagline}
        </p>

        {/* Feature bullets */}
        <div className="mt-4 pt-3 border-t border-slate-800/70 space-y-1.5">
          {service.highlightPoints.slice(0, 2).map((point, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{point}</span>
            </div>
          ))}
        </div>

        {/* Supported Channels & Response Time */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Channels:</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              {service.supportedChannels.includes("video") && (
                <span title="Video Consultation" className="p-1 rounded bg-slate-800 text-cyan-400">
                  <Video className="w-3 h-3" />
                </span>
              )}
              {service.supportedChannels.includes("audio") && (
                <span title="Voice Call" className="p-1 rounded bg-slate-800 text-emerald-400">
                  <Phone className="w-3 h-3" />
                </span>
              )}
              {service.supportedChannels.includes("photo_instant") && (
                <span title="Photo Instant Diagnosis" className="p-1 rounded bg-slate-800 text-amber-400">
                  <Camera className="w-3 h-3" />
                </span>
              )}
              {service.supportedChannels.includes("field_visit") && (
                <span title="On-Field Inspection" className="p-1 rounded bg-slate-800 text-purple-400">
                  <MapPin className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{service.avgResponseTime}</span>
          </div>
        </div>
      </div>

      {/* Footer & CTAs */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase text-slate-400 block font-medium">Consultation from</span>
          <span className="text-base font-extrabold text-white">
            {formatCurrency(service.baseFee)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/services/${service.slug}`}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
          >
            Details
          </Link>
          <Link
            href={`/consult?service=${service.id}`}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-md shadow-emerald-950/60"
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
