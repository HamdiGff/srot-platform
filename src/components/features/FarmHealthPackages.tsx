"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import { FARM_PACKAGES, HealthPackage } from "@/data/mockPackages";
import {
  ShieldCheck,
  Check,
  Sparkles,
  PhoneCall,
  Video,
  MessageSquare,
  FileSpreadsheet,
  AlertTriangle,
  Clock,
  ArrowRight,
  HelpCircle,
  X,
  CreditCard,
  QrCode,
  Building,
  Wheat,
  Milk,
  Egg,
  Fish,
  Users,
} from "lucide-react";

type SectorFilter = "all" | "dairy" | "crop" | "poultry" | "fisheries";

export function FarmHealthPackages() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedSector, setSelectedSector] = useState<SectorFilter>("all");
  const [activePackage, setActivePackage] = useState<HealthPackage | null>(null);

  // Modal checkout state
  const [checkoutStep, setCheckoutStep] = useState<"form" | "payment" | "otp" | "success">("form");
  const [farmName, setFarmName] = useState("");
  const [district, setDistrict] = useState("বগুড়া / Bogura");
  const [paymentProvider, setPaymentProvider] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [mobileNumber, setMobileNumber] = useState("01712-345678");
  const [otpCode, setOtpCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [membershipId, setMembershipId] = useState("");

  const handleOpenSubscribe = (pkg: HealthPackage) => {
    setActivePackage(pkg);
    setCheckoutStep("form");
    setFarmName("");
  };

  const handleConfirmForm = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("payment");
  };

  const handleSendOtp = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep("otp");
    }, 700);
  };

  const handleVerifyOtp = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = `SROT-FH-${Math.floor(1000 + Math.random() * 9000)}`;
      setMembershipId(generatedId);
      setCheckoutStep("success");
    }, 1000);
  };

  // Sector benefit text mapping
  const sectorHighlights: Record<SectorFilter, { title: { bn: string; en: string }; desc: { bn: string; en: string }; icon: React.ElementType }> = {
    all: {
      title: {
        bn: "সার্বিক খামার স্বাস্থ্য সুরক্ষা",
        en: "Comprehensive Multi-Sector Protection",
      },
      desc: {
        bn: "ফসল, ডেইরি, পোল্ট্রি ও মৎস্য খামারের জন্য মাসিক সার্বক্ষণিক চিকিৎসা ও বিশেষজ্ঞ মনিটরিং।",
        en: "Continuous health surveillance and triage for mixed livestock and agricultural farms.",
      },
      icon: ShieldCheck,
    },
    dairy: {
      title: {
        bn: "ডেইরি ও বোভাইন বিশেষজ্ঞ প্রোটেকশন",
        en: "Dairy & Bovine Specialist Protection",
      },
      desc: {
        bn: "ল্যাম্পি স্কিন (LSD), ওলান ফোলা/ম্যাসটাইটিস এবং দুগ্ধ উৎপাদন বৃদ্ধির বিশেষায়িত ট্রায়াজ ও ভ্যাকসিন ক্যালেন্ডার।",
        en: "Dedicated LSD, mastitis triage, lactation nutrition and AI cycle tracking.",
      },
      icon: Milk,
    },
    crop: {
      title: {
        bn: "ফসলের রোগ ও স্প্রে প্রোটোকল কেয়ার",
        en: "Crop Disease & Spray Advisory Care",
      },
      desc: {
        bn: "বোরো ও আমনে ব্লাস্ট, পোকার আক্রমণ ও আবহাওয়াভিত্তিক রোগ পূর্বাভাস সরাসরি মোবাইলে SMS মাধ্যমে।",
        en: "Rice neck blast, pest outbreak forecasting, and calibrated fertilizer-fungicide spray schedules.",
      },
      icon: Wheat,
    },
    poultry: {
      title: {
        bn: "পোল্ট্রি ফ্লক ও বায়োসিকিউরিটি কেয়ার",
        en: "Poultry Flock & Biosecurity Care",
      },
      desc: {
        bn: "ব্রয়লার ও লেয়ার খামারে গামবোরো, রানীক্ষেত ও ব্রুডিং ব্যবস্থাপনার দিনভিত্তিক ভ্যাকসিন নোটিফিকেশন।",
        en: "Broiler FCR optimization, Gumboro/Newcastle vaccine schedule alerts, and daily mortality triage.",
      },
      icon: Egg,
    },
    fisheries: {
      title: {
        bn: "মৎস্য ও অ্যাকুয়াকালচার মনিটরিং",
        en: "Fisheries & Aqua Health Monitoring",
      },
      desc: {
        bn: "ভোরে অক্সিজেনের সংকট, ফুলকা পচা ও অ্যামোনিয়া গ্যাসের তাৎক্ষণিক ডায়াগনোসিস ও সমাধান।",
        en: "Dissolved oxygen crashes, ammonia spike alerts, and fingerling mortality triage.",
      },
      icon: Fish,
    },
  };

  const currentSectorInfo = sectorHighlights[selectedSector];

  return (
    <section id="packages" className="py-20 bg-[#060b13] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? "খামার হেলথ সাবস্ক্রিপশন প্যাকেজ" : "Farm Health Subscription Packages"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {isBn ? (
              <>
                প্রতিটি খামারের জন্য{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  নিয়মিত স্বাস্থ্য সুরক্ষা
                </span>
              </>
            ) : (
              <>
                Continuous Protection with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Farm Health Plans
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            {isBn
              ? "জরুরি রোগের সময় ছোটাছুটি নয়—মাত্র ৳১৯৯ ও ৳৪৯৯ তে মাসজুড়ে বিশেষজ্ঞ ডাক্তারদের নিবিড় পরামর্শ, ভ্যাকসিন রিমাইন্ডার এবং ডিজিটাল প্রেসক্রিপশন সুবিধা।"
              : "No panic during farm outbreaks. Starting from ৳199 & ৳499/month, secure round-the-clock agro-vet consultations, outbreak alerts, and digital health records."}
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-slate-900/90 border border-white/[0.08] shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                billingCycle === "monthly"
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {isBn ? "মাসিক বিলিং" : "Monthly Billing"}
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>{isBn ? "বাৎসরিক বিলিং" : "Annual Billing"}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-400 text-slate-950">
                {isBn ? "১৭% ছাড়" : "17% OFF"}
              </span>
            </button>
          </div>
        </div>

        {/* Sector Filter Chips */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {(
            [
              { id: "all", labelBn: "সার্বিক খামার", labelEn: "All Sectors", icon: Users },
              { id: "dairy", labelBn: "গবাদিপশু ও ডেইরি", labelEn: "Dairy & Cattle", icon: Milk },
              { id: "crop", labelBn: "ফসল ও শস্য", labelEn: "Crop Farming", icon: Wheat },
              { id: "poultry", labelBn: "পোল্ট্রি ও মুরগি", labelEn: "Poultry Farms", icon: Egg },
              { id: "fisheries", labelBn: "মৎস্য ও অ্যাকুয়া", labelEn: "Fisheries & Aqua", icon: Fish },
            ] as const
          ).map((sector) => {
            const Icon = sector.icon;
            const isSelected = selectedSector === sector.id;
            return (
              <button
                key={sector.id}
                onClick={() => setSelectedSector(sector.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                  isSelected
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-sm"
                    : "bg-slate-900/60 border-white/[0.06] text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{isBn ? sector.labelBn : sector.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Sector Context Highlight Banner */}
        <div className="mb-12 max-w-4xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 border border-emerald-500/20 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <currentSectorInfo.icon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>{isBn ? currentSectorInfo.title.bn : currentSectorInfo.title.en}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                {isBn ? "প্রস্তাবিত প্যাকেজ" : "Included"}
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {isBn ? currentSectorInfo.desc.bn : currentSectorInfo.desc.en}
            </p>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {FARM_PACKAGES.map((pkg) => {
            const isAnnual = billingCycle === "annual";
            const price = isAnnual ? pkg.annualPrice : pkg.monthlyPrice;
            const savings = isAnnual ? pkg.monthlyPrice * 12 - pkg.annualPrice : 0;

            const cardBorder = pkg.isPopular
              ? "border-emerald-500/60 shadow-2xl shadow-emerald-500/20 ring-1 ring-emerald-500/50"
              : "border-white/[0.08] hover:border-white/[0.18]";

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl bg-gradient-to-b from-slate-900/95 to-[#0b1320]/95 border p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${cardBorder}`}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black tracking-wider uppercase shadow-lg">
                    {isBn ? "সবচেয়ে জনপ্রিয় ও প্রস্তাবিত" : "Most Popular Choice"}
                  </div>
                )}

                <div>
                  {/* Plan Name & Subtitle */}
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-white">{isBn ? pkg.name.bn : pkg.name.en}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {isBn ? pkg.subtitle.bn : pkg.subtitle.en}
                    </p>
                  </div>

                  {/* Pricing Display */}
                  <div className="py-4 border-y border-white/[0.06] mb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-white">৳{price.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {isAnnual ? (isBn ? "/বাৎসরিক" : "/year") : isBn ? "/মাস" : "/month"}
                      </span>
                    </div>

                    {isAnnual && (
                      <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                        {isBn ? `বাৎসরিক সাশ্রয় ৳${savings.toLocaleString()}` : `Save ৳${savings.toLocaleString()} annually`}
                      </p>
                    )}

                    <div className="mt-3 text-[11px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                      {isBn ? pkg.targetFarmers.bn : pkg.targetFarmers.en}
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3.5 mb-8">
                    <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                      {isBn ? "প্যাকেজের প্রধান সুবিধাসমূহ:" : "What's Included:"}
                    </div>

                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <div
                          className={`p-1 rounded-full shrink-0 mt-0.5 ${
                            feat.highlight
                              ? "bg-emerald-500 text-slate-950 font-bold"
                              : "bg-emerald-500/15 text-emerald-400"
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className={feat.highlight ? "text-white font-bold" : "text-slate-300"}>
                          {isBn ? feat.bn : feat.en}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => handleOpenSubscribe(pkg)}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                    pkg.isPopular
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/25 hover:shadow-emerald-500/40"
                      : "bg-slate-800/90 hover:bg-slate-700 text-white border border-white/[0.08]"
                  }`}
                >
                  <span>{isBn ? "প্যাকেজ শুরু করুন" : "Subscribe Now"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="rounded-3xl bg-slate-900/60 border border-white/[0.06] p-6 sm:p-8 backdrop-blur-md mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {isBn ? "প্যাকেজ তুলনামূলক পর্যালোচনা" : "Compare Health Plans"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {isBn
                ? "আপনার খামারের আকার ও চাহিদা অনুযায়ী সঠিক প্যাকেজ বেছে নিন"
                : "Choose the exact tier that fits your herd size and budget"}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-bold">{isBn ? "ফিচার ও সুবিধা" : "Feature"}</th>
                  <th className="py-3 px-4 font-bold text-center text-cyan-400">
                    {isBn ? "বেসিক (৳১৯৯)" : "Basic (৳199)"}
                  </th>
                  <th className="py-3 px-4 font-bold text-center text-emerald-400">
                    {isBn ? "প্রিমিয়াম (৳৪৯৯)" : "Premium (৳499)"}
                  </th>
                  <th className="py-3 px-4 font-bold text-center text-purple-400">
                    {isBn ? "এন্টারপ্রাইজ (৳১,৪৯৯)" : "Enterprise (৳1,499)"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">
                    {isBn ? "মাসিক বিশেষজ্ঞ কনসালটেশন কোটা" : "Monthly Consultation Quota"}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-cyan-300">২টি / 2</td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-400">৫টি / 5</td>
                  <td className="py-3.5 px-4 text-center font-bold text-purple-300">১৫টি / 15</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">
                    {isBn ? "এইচডি ভিডিও চেম্বার ভিজিট" : "HD Video Chamber Visits"}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500">—</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">মাসে ১টি / 1 mo</td>
                  <td className="py-3.5 px-4 text-center text-purple-400 font-bold">মাসে ৪টি / 4 mo</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">
                    {isBn ? "ডায়াগনস্টিক চ্যাট ও ফটো আপলোড" : "Diagnostic Chat & Photo Upload"}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-300">কনসালটেশন চলাকালীন</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">আনলিমিটেড</td>
                  <td className="py-3.5 px-4 text-center text-purple-400 font-bold">আনলিমিটেড + হোয়াটসঅ্যাপ</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">
                    {isBn ? "মহামারী ও আবহাওয়া SMS অ্যালার্ট" : "Outbreak & SMS Warning Alerts"}
                  </td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">
                    <Check className="w-4 h-4 mx-auto" />
                  </td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">
                    <Check className="w-4 h-4 mx-auto" />
                  </td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">
                    <Check className="w-4 h-4 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">
                    {isBn ? "ডিজিটাল প্রেসক্রিপশন লাইব্রেরি" : "Permanent Digital Rx Archive"}
                  </td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">
                    <Check className="w-4 h-4 mx-auto" />
                  </td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">
                    <Check className="w-4 h-4 mx-auto" />
                  </td>
                  <td className="py-3.5 px-4 text-center text-emerald-400">
                    <Check className="w-4 h-4 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">
                    {isBn ? "খামার রেকর্ড কিপিং (Cattle/Crop)" : "Farm Record Tracking"}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-300">বেসিক (১০ পশু)</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">সম্পূর্ণ ক্যাটল ট্যাগিং</td>
                  <td className="py-3.5 px-4 text-center text-purple-400 font-bold">মাল্টি-ফার্ম এন্টারপ্রাইজ</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">
                    {isBn ? "মাঠ সেবা ও অন-সাইট ভিজিটে ছাড়" : "Field Visit & AI Discount"}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-500">—</td>
                  <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">১৫% ডিসকাউন্ট</td>
                  <td className="py-3.5 px-4 text-center text-purple-400 font-bold">২৫% ডিসকাউন্ট + অগ্রাধিকার</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "সাধারণ প্রশ্নোত্তর" : "Frequently Asked Questions"}</span>
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                qBn: "প্যাকেজের টাকা কীভাবে পরিশোধ করব?",
                qEn: "How do I make the payment for the package?",
                aBn: "আপনি বিকাশ, নগদ বা রকেটের মাধ্যমে খুব সহজেই কয়েক সেকেন্ডে পেমেন্ট করতে পারেন। প্যাকেজ সাথে সাথে সক্রিয় হয়ে যাবে।",
                aEn: "You can instantly pay via bKash, Nagad, or Rocket. Your subscription activates immediately upon OTP verification.",
              },
              {
                qBn: "মাসে ২টি কনসালটেশন কোটা শেষ হয়ে গেলে কী হবে?",
                qEn: "What happens if I exhaust my 2 monthly consultations?",
                aBn: "প্যাকেজ মেম্বাররা অতিরিক্ত যেকোনো সাধারণ বা জরুরি কনসালটেশন বুক করতে পারবেন বিশেষ ২০% ডিসকাউন্টে সরাসরি ড্যাশবোর্ড থেকে।",
                aEn: "Package members can book additional consultations at an exclusive 20% discount directly through the portal.",
              },
              {
                qBn: "জরুরি অসুস্থতায় কীভাবে দ্রুত সেবা পাব?",
                qEn: "How do I get emergency support during critical sickness?",
                aBn: "প্রিমিয়াম প্যাকেজধারীরা ২৪/৭ জরুরি হটলাইন পাস পাবেন, যা সরাসরি দায়িত্বরত বিএসসি/এমএস বিশেষজ্ঞের সাথে ১০ মিনিটের ভেতর যুক্ত করে দেয়।",
                aEn: "Premium holders get 24/7 SOS hotline pass connecting directly to an active veterinary officer in under 10 minutes.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl bg-slate-900/60 border border-white/[0.06] p-4 text-xs transition open:bg-slate-900/90"
              >
                <summary className="font-bold text-white cursor-pointer list-none flex items-center justify-between">
                  <span>{isBn ? faq.qBn : faq.qEn}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-2.5 text-slate-300 leading-relaxed pt-2 border-t border-white/[0.04]">
                  {isBn ? faq.aBn : faq.aEn}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CHECKOUT MODAL: 4-STEP BKASH / NAGAD SUBSCRIPTION SIMULATION */}
      {/* ========================================================================= */}
      {activePackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#090f19] border border-emerald-500/30 shadow-2xl p-6 sm:p-8 text-slate-200">
            {/* Close Button */}
            <button
              onClick={() => setActivePackage(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {isBn ? activePackage.name.bn : activePackage.name.en}
                </h3>
                <p className="text-xs text-slate-400">
                  {isBn
                    ? billingCycle === "annual"
                      ? `বাৎসরিক বিলিং • ৳${activePackage.annualPrice.toLocaleString()}`
                      : `মাসিক বিলিং • ৳${activePackage.monthlyPrice.toLocaleString()}`
                    : billingCycle === "annual"
                    ? `Annual Plan • ৳${activePackage.annualPrice.toLocaleString()}`
                    : `Monthly Plan • ৳${activePackage.monthlyPrice.toLocaleString()}`}
                </p>
              </div>
            </div>

            {/* STEP 1: Farm Registration Form */}
            {checkoutStep === "form" && (
              <form onSubmit={handleConfirmForm} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isBn ? "খামারের নাম বা আবেদনকারী" : "Farm / Farmer Name"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBn ? "যেমন: রূপালী ডেইরি ফার্ম / হাজী আব্দুল করিম" : "e.g. Rupali Agro Farm"}
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      {isBn ? "খামারের ধরণ" : "Farm Sector"}
                    </label>
                    <select className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-emerald-500">
                      <option>{isBn ? "গবাদিপশু ও ডেইরি" : "Dairy & Cattle"}</option>
                      <option>{isBn ? "ফসল ও সবজি চাষ" : "Crops & Vegetables"}</option>
                      <option>{isBn ? "পোল্ট্রি ব্রয়লার/লেয়ার" : "Poultry Broiler/Layer"}</option>
                      <option>{isBn ? "মৎস্য ও অ্যাকুয়াকালচার" : "Fisheries & Aqua"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      {isBn ? "জেলা ও উপজেলা" : "District / Upazila"}
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  <span className="font-bold">✓ {isBn ? "সুবিধা নিশ্চিতকরণ:" : "Included quota:"}</span>{" "}
                  {isBn
                    ? `এই প্যাকেজে প্রতি মাসে ${activePackage.consultationsIncluded}টি বিশেষজ্ঞ ডাক্তার কনসালটেশন অন্তর্ভুক্ত থাকবে।`
                    : `${activePackage.consultationsIncluded} specialist doctor consultations per month are included.`}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition flex items-center justify-center gap-2"
                >
                  <span>{isBn ? "পেমেন্ট ধাপে এগিয়ে যান" : "Proceed to Payment"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: Payment Provider Selection */}
            {checkoutStep === "payment" && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300">
                  {isBn ? "পেমেন্ট মেথড নির্বাচন করুন:" : "Select Payment Gateway:"}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "bkash", label: "বিকাশ (bKash)", color: "border-pink-500/60 text-pink-400 bg-pink-500/10" },
                    { id: "nagad", label: "নগদ (Nagad)", color: "border-orange-500/60 text-orange-400 bg-orange-500/10" },
                    { id: "rocket", label: "রকেট (Rocket)", color: "border-purple-500/60 text-purple-400 bg-purple-500/10" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentProvider(p.id as any)}
                      className={`p-3 rounded-2xl border text-center text-xs font-bold transition ${
                        paymentProvider === p.id ? p.color : "border-white/[0.08] bg-slate-900 text-slate-400"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {paymentProvider.toUpperCase()} {isBn ? "মোবাইল নম্বর" : "Mobile Wallet Number"}
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/[0.08] text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-400">
                    <span>{isBn ? "সাবস্ক্রিপশন ফি:" : "Subscription Fee:"}</span>
                    <span className="font-bold text-white">
                      ৳
                      {billingCycle === "annual"
                        ? activePackage.annualPrice.toLocaleString()
                        : activePackage.monthlyPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{isBn ? "গেটওয়ে চার্জ (০%):" : "Gateway Charge (0%):"}</span>
                    <span className="text-emerald-400 font-bold">৳০.০০ (ফ্রি)</span>
                  </div>
                  <div className="pt-2 border-t border-white/[0.06] flex justify-between font-black text-white">
                    <span>{isBn ? "সর্বমোট প্রদেয়:" : "Total Payable:"}</span>
                    <span className="text-emerald-400">
                      ৳
                      {billingCycle === "annual"
                        ? activePackage.annualPrice.toLocaleString()
                        : activePackage.monthlyPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("form")}
                    className="w-1/3 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                  >
                    {isBn ? "পেছনে" : "Back"}
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isProcessing}
                    className="w-2/3 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition disabled:opacity-50"
                  >
                    {isProcessing ? (isBn ? "যাচাই হচ্ছে..." : "Sending OTP...") : isBn ? "ওটিপি (OTP) পাঠান" : "Send OTP"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: OTP Verification Simulation */}
            {checkoutStep === "otp" && (
              <div className="space-y-4 text-center">
                <div className="p-3 rounded-2xl bg-slate-900 border border-white/[0.08]">
                  <p className="text-xs text-slate-300">
                    {isBn
                      ? `${mobileNumber} নম্বরে একটি ৪-সংখ্যার ওটিপি কোড পাঠানো হয়েছে:`
                      : `A 4-digit verification OTP was sent to ${mobileNumber}:`}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-mono mt-1 font-bold">
                    {isBn ? "ডেমো কোড: ১২৩৪" : "Demo Code: 1234"}
                  </p>
                </div>

                <input
                  type="text"
                  maxLength={4}
                  placeholder="••••"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-36 mx-auto text-center tracking-[0.5em] text-2xl font-mono py-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-400 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg disabled:opacity-50"
                >
                  {isProcessing
                    ? isBn
                      ? "প্যাকেজ সক্রিয় হচ্ছে..."
                      : "Activating Subscription..."
                    : isBn
                    ? "যাচাই ও প্যাকেজ সক্রিয় করুন"
                    : "Verify & Activate Package"}
                </button>
              </div>
            )}

            {/* STEP 4: Success State */}
            {checkoutStep === "success" && (
              <div className="space-y-5 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div>
                  <h4 className="text-xl font-black text-white">
                    {isBn ? "অভিনন্দন! প্যাকেজ সক্রিয় হয়েছে" : "Congratulations! Package Active"}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {isBn
                      ? `${farmName || "আপনার খামার"} এর হেলথ মেম্বারশিপ সফলভাবে সক্রিয় করা হয়েছে।`
                      : `Your farm health subscription is now active.`}
                  </p>
                </div>

                {/* Digital Member Pass */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0e1726] border border-emerald-500/30 text-left space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-mono">
                    <span>SROT HEALTH PASS</span>
                    <span className="text-emerald-400 font-bold">ACTIVE</span>
                  </div>
                  <div className="text-base font-black text-white">{farmName || "স্রোত নিবন্ধিত খামার"}</div>
                  <div className="text-xs text-slate-300">
                    {isBn ? activePackage.name.bn : activePackage.name.en} • {district}
                  </div>
                  <div className="pt-2 border-t border-white/[0.06] flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">{membershipId}</span>
                    <span className="text-emerald-300 font-bold">
                      {isBn
                        ? `${activePackage.consultationsIncluded}টি কনসালটেশন বরাদ্দ`
                        : `${activePackage.consultationsIncluded} consults allocated`}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/farmer-portal"
                    onClick={() => setActivePackage(null)}
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition flex items-center justify-center gap-2"
                  >
                    <span>{isBn ? "ফার্মার ড্যাশবোর্ডে যান" : "Go to Farmer Portal"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
