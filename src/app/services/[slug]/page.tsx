import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PLATFORM_SERVICES } from "@/data/mockServices";
import { PLATFORM_EXPERTS } from "@/data/mockExperts";
import { formatCurrency } from "@/lib/utils";
import {
  Wheat,
  Milk,
  HeartHandshake,
  CheckCircle2,
  Clock,
  Video,
  Phone,
  Camera,
  MapPin,
  CalendarCheck,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PLATFORM_SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = PLATFORM_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const assignedExperts = PLATFORM_EXPERTS.filter(
    (e) => e.serviceIds.includes(service.id) || e.primaryCategory === service.category
  );

  const isAgri = service.category === "agri";
  const isPet = service.category === "pet";

  return (
    <div className="w-full srot-glow-mesh py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-emerald-400">Services</Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{service.name}</span>
      </nav>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {service.categoryLabel}
            </span>
            <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              {service.badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {service.name}
          </h1>

          <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
            {service.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Response: <strong className="text-white">{service.avgResponseTime}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Official Digital Prescription Included</span>
            </div>
          </div>
        </div>

        {/* Booking Card Box */}
        <div className="srot-glass-card rounded-3xl p-6 border border-emerald-500/30 flex flex-col justify-between shadow-2xl self-start">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Advisory & Consultation Fee
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">
                {formatCurrency(service.baseFee)}
              </span>
              <span className="text-xs text-slate-400">/ verified case</span>
            </div>

            <div className="mt-5 space-y-2 pt-4 border-t border-slate-800 text-xs">
              <span className="font-semibold text-slate-300 block">Available Channels:</span>
              <div className="grid grid-cols-2 gap-2">
                {service.supportedChannels.map((ch) => (
                  <span
                    key={ch}
                    className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 capitalize flex items-center gap-1.5 text-[11px]"
                  >
                    {ch === "video" && <Video className="w-3.5 h-3.5 text-cyan-400" />}
                    {ch === "audio" && <Phone className="w-3.5 h-3.5 text-emerald-400" />}
                    {ch === "photo_instant" && <Camera className="w-3.5 h-3.5 text-amber-400" />}
                    {ch === "field_visit" && <MapPin className="w-3.5 h-3.5 text-purple-400" />}
                    {ch.replace("_", " ")}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Link
              href={`/consult?service=${service.id}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm transition shadow-lg shadow-emerald-950/60"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Consultation for This Service</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Details Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Highlight Points */}
          <div className="srot-glass-card rounded-2xl p-6 border border-slate-800">
            <h2 className="text-lg font-bold text-white mb-4">
              Scientific Methodologies & What You Receive:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.highlightPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Issues Covered */}
          <div className="srot-glass-card rounded-2xl p-6 border border-slate-800">
            <h2 className="text-lg font-bold text-white mb-4">
              Common Pathogens & Conditions Handled:
            </h2>
            <ul className="space-y-2 text-xs text-slate-300">
              {service.commonIssuesCovered.map((issue, idx) => (
                <li key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consultation Preparation Checklist */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
            <h3 className="text-sm font-bold text-emerald-300 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-400" />
              What to Prepare Before Booking:
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAgri
                ? "Capture clear close-up photos of both top and bottom leaf surfaces in natural daylight. Note down crop variety, sowing date, previous spray chemicals, and acreage."
                : isPet
                ? "Keep pet weight (kg), vaccination history book, and recent food brand handy. Photograph skin redness, lesions, or ear canal clearly."
                : "Note down daily milk output records, lactation month, cow rectal temperature, and somatic cell count or CMT test results if available."}
            </p>
          </div>
        </div>

        {/* Assigned Specialists Sidebar */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Accredited Practitioners for This Service:
          </h3>
          {assignedExperts.slice(0, 2).map((exp) => (
            <div key={exp.id} className="srot-glass-card rounded-2xl p-4 border border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={exp.avatar}
                  alt={exp.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-white text-xs">{exp.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{exp.title}</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    ★ {exp.rating} ({exp.consultationCount}+ cases)
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {exp.bio}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white">{formatCurrency(exp.feePerConsultation)}</span>
                <Link
                  href={`/consult?service=${service.id}&expert=${exp.id}`}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                >
                  Consult Now &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
