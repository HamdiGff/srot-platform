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
  FileText,
  BadgeDollarSign,
  MessageSquare,
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

  const sampleReviews = [
    {
      author: "Md. Tariqul Islam",
      role: "Paddy Farmer (Dinajpur)",
      rating: 5,
      date: "3 days ago",
      comment:
        "ব্লাস্ট রোগের সঠিক ওষুধ ও পানির মাত্রা খুব সুন্দর করে বুঝিয়ে দিয়েছেন। ৭ দিনের মধ্যে নতুন কুশি বের হয়েছে। প্রেসক্রিপশনের কিউআর কোড স্ক্যান করে স্থানীয় ডিলারের কাছ থেকে খাঁটি ওষুধ পেয়েছি।",
    },
    {
      author: "Kader Mollah",
      role: "Dairy Farm Owner (Sirajganj)",
      rating: 5,
      date: "1 week ago",
      comment:
        "ম্যাসটাইটিস আক্রান্ত গাভীর ভিডিও কলে তাৎক্ষণিক চিকিৎসা দিয়েছেন। সবচেয়ে বড় কথা দুধের উইথহোল্ডিং টাইম (৭২ ঘণ্টা) কঠোরভাবে অনুসরণের পরামর্শ দিয়েছেন। গাভী এখন সুস্থ।",
    },
    {
      author: "Raihan Kabir",
      role: "Pet Parent (Dhanmondi, Dhaka)",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Extremely empathetic and thorough tele-vet examination for my dog Max. Digital prescription was accepted right away at local pharmacy. Highly recommended!",
    },
  ];

  return (
    <div className="w-full srot-glow-mesh py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <span>/</span>
        <Link href="/experts" className="hover:text-emerald-400">Practitioner Directory</Link>
        <span>/</span>
        <span className="text-white font-semibold">{expert.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Profile, Bio & Accreditation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Profile Card */}
          <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative shrink-0">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-2 border-emerald-500/50 shadow-2xl"
                />
                {expert.availableToday && (
                  <span
                    title="Available for live tele-consultation"
                    className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] shadow-md border-2 border-slate-950 flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                    ONLINE
                  </span>
                )}
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {expert.categoryBadge}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{expert.rating}</span>
                    <span className="text-slate-400 font-normal">({expert.reviewCount} Verified Reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                  <span>{expert.name}</span>
                  <span title="Council Verified Practitioner">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </span>
                </h1>

                <p className="text-sm font-semibold text-slate-200">{expert.title}</p>

                {/* Council Verification Pill */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <div className="px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{expert.councilName}</span>
                    <span className="text-white font-bold">• Reg: {expert.registrationNumber}</span>
                  </div>

                  <span className="flex items-center gap-1 text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-white/[0.06] text-[11px]">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    <span>{expert.location} ({expert.division})</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-white/[0.08] text-center">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04]">
                <span className="text-lg font-bold text-white block">{expert.experienceYears}+ Yrs</span>
                <span className="text-[10px] uppercase text-slate-400">Clinical Field Exp</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04]">
                <span className="text-lg font-bold text-emerald-400 block">{expert.consultationCount}+</span>
                <span className="text-[10px] uppercase text-slate-400">Cases Successfully Treated</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.04]">
                <span className="text-lg font-bold text-cyan-400 block">99.4%</span>
                <span className="text-[10px] uppercase text-slate-400">Client Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Full Biography & Qualifications */}
          <div className="srot-glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Practitioner Profile & Field Research</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{expert.bio}</p>

            <div className="pt-4 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <GraduationCap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Accredited Degrees</span>
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

          {/* Specialties & Treatments */}
          <div className="srot-glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
            <h2 className="text-base font-bold text-white uppercase tracking-wider mb-4">
              Core Clinical & Pathological Specialties:
            </h2>
            <div className="flex flex-wrap gap-2">
              {expert.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-white/[0.08] text-xs font-semibold text-slate-200 flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{spec}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Authentic Client & Farmer Testimonials */}
          <div className="srot-glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Verified Case Reviews</span>
            </h2>

            <div className="space-y-3">
              {sampleReviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.04] space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white">{rev.author}</span>
                      <span className="text-[11px] text-slate-400 ml-2">({rev.role})</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{rev.comment}</p>
                  <span className="text-[10px] text-slate-500 block">{rev.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Instant Consultation Booking Box */}
        <div className="srot-glass-card rounded-3xl p-6 border border-emerald-500/30 self-start shadow-2xl space-y-6 bg-gradient-to-b from-[#09111c] to-[#04080e]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Official Session Advisory Rate
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono">
                {formatCurrency(expert.feePerConsultation)}
              </span>
              <span className="text-xs text-slate-400">/ verified case session</span>
            </div>
          </div>

          {/* Earliest Slot & Availability */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.08] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Live Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {expert.availableToday ? "Available for Triage Today" : "Scheduled Slot Booking"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Earliest Slot:</span>
              <span className="text-white font-semibold">{expert.nextSlotTime}</span>
            </div>
          </div>

          {/* Supported Consultation Channels */}
          <div className="space-y-2 text-xs">
            <span className="font-semibold text-slate-300 block">Supported Channels:</span>
            <div className="grid grid-cols-2 gap-2">
              {expert.supportedChannels.map((ch) => (
                <div
                  key={ch}
                  className="p-2 rounded-xl bg-slate-900 border border-white/[0.06] text-[11px] text-slate-300 flex items-center gap-1.5 capitalize font-medium"
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

          {/* Payout & Transparency Guarantee */}
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <BadgeDollarSign className="w-4 h-4" />
              <span>Transparent Fee Guarantee</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              70% goes directly to {expert.name.split(" ")[0]}, with 30% supporting rural bandwidth infrastructure. Includes 48-hour free follow-up review.
            </p>
          </div>

          {/* Direct One-Click Booking CTA */}
          <div className="pt-2">
            <Link
              href={`/consult?expert=${expert.id}`}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm transition shadow-xl shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              <CalendarCheck className="w-4 h-4 text-slate-950" />
              <span>Book Appointment with {expert.name.split(" ")[1] || expert.name}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
