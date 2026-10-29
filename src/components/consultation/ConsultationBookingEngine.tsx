"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PLATFORM_SERVICES,
  PlatformService,
  ServiceCategory,
  ConsultationChannel,
} from "@/data/mockServices";
import { PLATFORM_EXPERTS, PlatformExpert } from "@/data/mockExperts";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useUserStore } from "@/lib/store/userStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatCurrency } from "@/lib/utils";
import {
  Wheat,
  Milk,
  Egg,
  Fish,
  HeartHandshake,
  Video,
  Phone,
  Camera,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  Upload,
  AlertCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BadgeDollarSign,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

interface ConsultationBookingEngineProps {
  initialServiceId?: string;
  initialExpertId?: string;
  initialCategory?: ServiceCategory;
}

export function ConsultationBookingEngine({
  initialServiceId,
  initialExpertId,
  initialCategory = "agri",
}: ConsultationBookingEngineProps) {
  const router = useRouter();
  const { currentUser, currentRole } = useUserStore();
  const { addConsultation } = useConsultationStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const expertFromParam = initialExpertId
    ? PLATFORM_EXPERTS.find((e) => e.id === initialExpertId)
    : null;

  const initialResolvedCategory: ServiceCategory = expertFromParam
    ? expertFromParam.primaryCategory
    : initialCategory ||
      (currentRole === "pet_owner"
        ? "pet"
        : currentRole === "livestock_farmer"
        ? "veterinary"
        : "agri");

  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(initialResolvedCategory);
  const [isEmergencyTriage, setIsEmergencyTriage] = useState<boolean>(false);

  // Filter services by active category
  const servicesInCategory = PLATFORM_SERVICES.filter(
    (s) => s.category === initialResolvedCategory
  );
  const [selectedService, setSelectedService] = useState<PlatformService>(
    PLATFORM_SERVICES.find((s) => s.id === initialServiceId) ||
      (expertFromParam
        ? servicesInCategory.find((s) => expertFromParam.serviceIds.includes(s.id))
        : undefined) ||
      servicesInCategory[0] ||
      PLATFORM_SERVICES[0]
  );

  const [selectedChannel, setSelectedChannel] = useState<ConsultationChannel>(
    selectedService.supportedChannels[0] || "photo_instant"
  );

  // Sector-Specific Clinical Intake States
  // General / Subject
  const [subjectName, setSubjectName] = useState(
    selectedCategory === "agri"
      ? "ব্রি ধান-২৮ (Boro Rice)"
      : selectedCategory === "veterinary"
      ? "হোলস্টাইন ফ্রিজিয়ান সংকর গাভী"
      : selectedCategory === "poultry"
      ? "সোনালি ব্রয়লার মুরগি (Sonali)"
      : selectedCategory === "fisheries"
      ? "পাঙ্গাশ ও কার্প মিশ্র চাষ"
      : "পার্সিয়ান বিড়াল (Cat)"
  );
  const [subjectAgeOrStage, setSubjectAgeOrStage] = useState(
    selectedCategory === "agri"
      ? "কুশি থেকে শীষ বের হওয়ার পর্যায় (৪৫ দিন)"
      : selectedCategory === "veterinary"
      ? "৪ বছর বয়স, ২য় ল্যাকটেশন (৩৫০ কেজি)"
      : selectedCategory === "poultry"
      ? "বয়স ২২ দিন (৩,০০০ মুরগি)"
      : selectedCategory === "fisheries"
      ? "পুকুরের বয়স ৩ মাস (৮,০০০ পোনা)"
      : "১ বছর (৩.৫ কেজি)"
  );
  const [areaOrHerdSize, setAreaOrHerdSize] = useState(
    selectedCategory === "agri"
      ? "৪ বিঘা (১.৩ একর)"
      : selectedCategory === "veterinary"
      ? "১২টি ডেইরি গাভী"
      : selectedCategory === "poultry"
      ? "৩,০০০ ব্রয়লার ফ্লক"
      : selectedCategory === "fisheries"
      ? "১.৫ একর পুকুর (৫০ শতক)"
      : "১টি পোষা প্রাণী"
  );

  // Sector Specific Clinical Flags
  const [poultryMortalityToday, setPoultryMortalityToday] = useState("২৫টি");
  const [fishWaterCondition, setFishWaterCondition] = useState("গাঢ় সবুজ শৈবাল ও ভোরে খাবি খাওয়া");
  const [dairyMilkLoss, setDairyMilkLoss] = useState("১৮ লিটার থেকে ৯ লিটারে নেমেছে");

  const [symptomsDescription, setSymptomsDescription] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
  ]);

  // Expert selection
  const compatibleExperts = PLATFORM_EXPERTS.filter(
    (e) =>
      e.primaryCategory === selectedCategory ||
      e.serviceIds.includes(selectedService.id)
  );
  const [selectedExpert, setSelectedExpert] = useState<PlatformExpert>(
    PLATFORM_EXPERTS.find((e) => e.id === initialExpertId) ||
      compatibleExperts[0] ||
      PLATFORM_EXPERTS[0]
  );

  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category switch helper
  const handleCategoryChange = (cat: ServiceCategory) => {
    setSelectedCategory(cat);
    const newServices = PLATFORM_SERVICES.filter((s) => s.category === cat);
    if (newServices.length > 0) {
      setSelectedService(newServices[0]);
      setSelectedChannel(newServices[0].supportedChannels[0] || "photo_instant");
    }
    const newExperts = PLATFORM_EXPERTS.filter(
      (e) => e.primaryCategory === cat || (cat === "veterinary" && e.primaryCategory === "veterinary")
    );
    if (newExperts.length > 0) {
      setSelectedExpert(newExperts[0]);
    }

    // Default presets
    if (cat === "agri") {
      setSubjectName("ব্রি ধান-২৮ (Boro Rice)");
      setSubjectAgeOrStage("শীষ বের হওয়ার পর্যায় (৪৫ দিন)");
      setAreaOrHerdSize("৪ বিঘা (১.৩ একর)");
    } else if (cat === "veterinary") {
      setSubjectName("হোলস্টাইন ফ্রিজিয়ান সংকর গাভী");
      setSubjectAgeOrStage("৪ বছর বয়স, ২য় ল্যাকটেশন");
      setAreaOrHerdSize("১২টি ডেইরি গাভী");
    } else if (cat === "poultry") {
      setSubjectName("সোনালি ব্রয়লার মুরগি (Sonali)");
      setSubjectAgeOrStage("বয়স ২২ দিন");
      setAreaOrHerdSize("৩,০০০ মুরগি");
    } else if (cat === "fisheries") {
      setSubjectName("পাঙ্গাশ ও কার্প মিশ্র চাষ");
      setSubjectAgeOrStage("পুকুরের বয়স ৩ মাস");
      setAreaOrHerdSize("১.৫ একর পুকুর (৫০ শতক)");
    } else {
      setSubjectName("পার্সিয়ান বিড়াল (Cat)");
      setSubjectAgeOrStage("১ বছর (৩.৫ কেজি)");
      setAreaOrHerdSize("১টি পোষা প্রাণী");
    }
  };

  const handleServiceSelect = (svc: PlatformService) => {
    setSelectedService(svc);
    if (!svc.supportedChannels.includes(selectedChannel)) {
      setSelectedChannel(svc.supportedChannels[0]);
    }
  };

  const handlePhotoUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const demoSample =
        selectedCategory === "agri"
          ? "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80"
          : selectedCategory === "poultry"
          ? "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80"
          : selectedCategory === "fisheries"
          ? "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80"
          : selectedCategory === "pet"
          ? "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80"
          : "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80";
      setUploadedPhotos([...uploadedPhotos, demoSample]);
    }
  };

  // Fee calculation & 70/30 commission split
  const channelMultiplier =
    selectedChannel === "field_visit"
      ? 6
      : selectedChannel === "video"
      ? 1.5
      : selectedChannel === "audio"
      ? 1.2
      : 1;

  const totalFee = Math.round((selectedExpert.feePerConsultation || selectedService.baseFee) * channelMultiplier);
  const expertShare = Math.round(totalFee * 0.7); // 70% to Specialist
  const srotShare = totalFee - expertShare; // 30% to SROT Platform

  const handleSubmitBooking = () => {
    setIsSubmitting(true);

    const clientRole =
      selectedCategory === "pet"
        ? "pet_owner"
        : selectedCategory === "poultry"
        ? "farmer"
        : selectedCategory === "fisheries"
        ? "farmer"
        : selectedCategory === "veterinary"
        ? "livestock_farmer"
        : "farmer";

    const detailedSymptomSummary = `${symptomsDescription || "Rapid visual triage requested."}${
      selectedCategory === "poultry" ? ` | দৈনিক মৃত্যু: ${poultryMortalityToday}` : ""
    }${selectedCategory === "fisheries" ? ` | পানির অবস্থা: ${fishWaterCondition}` : ""}${
      selectedCategory === "veterinary" ? ` | দুধ হ্রাস: ${dairyMilkLoss}` : ""
    }`;

    const newRecord = addConsultation({
      category: selectedCategory,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      channel: selectedChannel,
      farmerOrOwner: {
        id: currentUser.id,
        name: currentUser.name,
        role: clientRole,
        phone: currentUser.phone,
        location: currentUser.location,
        subjectName,
        subjectAgeOrStage,
        areaOrHerdSize,
      },
      expert: {
        id: selectedExpert.id,
        name: selectedExpert.name,
        title: selectedExpert.title,
        avatar: selectedExpert.avatar,
        regNumber: selectedExpert.registrationNumber,
      },
      symptomsDescription: detailedSymptomSummary,
      uploadedPhotos,
      scheduledDateTime: new Date().toISOString(),
      feePaid: totalFee,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/consult/${newRecord.id}`);
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto srot-glass-card rounded-3xl border border-white/[0.08] p-5 sm:p-8 md:p-10 shadow-2xl text-slate-100">
      {/* 4-Step Progress Indicator */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
        {[
          { num: 1, label: isBn ? "১. সেক্টর ও সেবা" : "1. Sector & Service" },
          { num: 2, label: isBn ? "২. মাধ্যম নির্বাচন" : "2. Channel Medium" },
          { num: 3, label: isBn ? "৩. লক্ষণ ও আলামত" : "3. Intake & Photos" },
          { num: 4, label: isBn ? "৪. বিশেষজ্ঞ ও ফি" : "4. Specialist & Fee" },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <span
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                step === s.num
                  ? "bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20"
                  : step > s.num
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {step > s.num ? "✓" : s.num}
            </span>
            <span className="hidden sm:inline text-xs font-semibold text-slate-300">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Optional Pre-Selected Specialist Header Banner */}
      {expertFromParam && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-emerald-950/70 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <img
              src={expertFromParam.avatar}
              alt={expertFromParam.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-400 shadow-md shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {isBn ? "নির্ধারিত বিশেষজ্ঞ" : "Pre-Selected Clinician"}
                </span>
                <span className="text-xs font-bold text-white">{expertFromParam.name}</span>
              </div>
              <p className="text-[11px] text-slate-300">{expertFromParam.title}</p>
              <p className="text-[10px] text-emerald-400 font-mono">
                {expertFromParam.councilName} • Reg: {expertFromParam.registrationNumber}
              </p>
            </div>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-white/[0.08] shrink-0">
            <span className="text-sm font-black text-white block font-mono">
              {formatCurrency(expertFromParam.feePerConsultation)}
            </span>
            <span className="text-[10px] text-slate-400">{isBn ? "সরাসরি সেশন ফি" : "Direct Advisory Fee"}</span>
          </div>
        </div>
      )}

      {/* ================= STEP 1: 4-SECTOR SELECTION ================= */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              {isBn ? "পরামর্শের সেক্টর ও সেবা নির্বাচন করুন" : "Choose Agriculture or Livestock Sector"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isBn
                ? "এসআরওটি (উৎস) বাংলাদেশের ৪টি প্রধান কৃষি ও প্রাণিসম্পদ সেক্টরে বিশেষায়িত বিশেষজ্ঞ পরামর্শ প্রদান করে।"
                : "SROT supports certified agronomy, bovine medicine, poultry, and fisheries under one unified engine."}
            </p>
          </div>

          {/* 4 Primary Sectors + Companion Pet */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              {
                id: "agri" as ServiceCategory,
                label: isBn ? "মাঠফসল ও কৃষি" : "Crops & Agronomy",
                sub: isBn ? "ধান, পাট, গম, ভুট্টা, সবজি" : "Grain, vegetable & cash crops",
                icon: <Wheat className="w-5 h-5 text-emerald-400" />,
                activeBorder: "border-emerald-500 bg-emerald-950/40 text-emerald-300",
              },
              {
                id: "veterinary" as ServiceCategory,
                label: isBn ? "ডেইরি ও গবাদিপশু" : "Dairy & Cattle",
                sub: isBn ? "গাভী, ষাঁড়, মহিষ, ছাগল" : "Cattle, dairy herd & goats",
                icon: <Milk className="w-5 h-5 text-cyan-400" />,
                activeBorder: "border-cyan-500 bg-cyan-950/40 text-cyan-300",
              },
              {
                id: "poultry" as ServiceCategory,
                label: isBn ? "পোল্ট্রি ও মুরগি" : "Poultry Farming",
                sub: isBn ? "ব্রয়লার, লেয়ার, সোনালি, হাঁস" : "Commercial broiler & layers",
                icon: <Egg className="w-5 h-5 text-amber-400" />,
                activeBorder: "border-amber-500 bg-amber-950/40 text-amber-300",
              },
              {
                id: "fisheries" as ServiceCategory,
                label: isBn ? "মৎস্য ও পুকুর" : "Fisheries & Pond",
                sub: isBn ? "পাঙ্গাশ, কার্প, তেলাপিয়া, চিংড়ি" : "Carp, pangas & biofloc ponds",
                icon: <Fish className="w-5 h-5 text-blue-400" />,
                activeBorder: "border-blue-500 bg-blue-950/40 text-blue-300",
              },
              {
                id: "pet" as ServiceCategory,
                label: isBn ? "পোষা প্রাণী" : "Companion Pets",
                sub: isBn ? "কুকুর, বিড়াল ও পাখি" : "Dogs, cats & small animals",
                icon: <HeartHandshake className="w-5 h-5 text-pink-400" />,
                activeBorder: "border-pink-500 bg-pink-950/40 text-pink-300",
              },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                  selectedCategory === cat.id
                    ? `${cat.activeBorder} ring-2 ring-emerald-500/30`
                    : "border-white/[0.08] bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-800/80 w-fit mb-2">
                  {cat.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xs line-clamp-1">{cat.label}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">
                    {cat.sub}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Specific Services */}
          <div className="pt-4 border-t border-white/[0.08]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              {isBn ? "নির্দিষ্ট সেবা নির্বাচন করুন:" : "Select Specific Advisory Service:"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {servicesInCategory.map((svc) => (
                <div
                  key={svc.id}
                  onClick={() => handleServiceSelect(svc)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    selectedService.id === svc.id
                      ? "border-emerald-400 bg-emerald-950/30 ring-2 ring-emerald-500/25"
                      : "border-white/[0.08] bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {svc.badge}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {formatCurrency(svc.baseFee)}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{svc.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {svc.shortTagline}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {svc.avgResponseTime}
                    </span>
                    {selectedService.id === svc.id ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    ) : (
                      <span className="text-slate-500">Click to choose</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Forward Action */}
          <div className="flex justify-end pt-4 border-t border-white/[0.08]">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-400"
            >
              <span>{isBn ? "পরবর্তী: মাধ্যম নির্বাচন" : "Next: Choose Channel"}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: CHANNEL SELECTION ================= */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              {isBn ? "পরামর্শের মাধ্যম বেছে নিন" : "Select Consultation Format & Medium"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isBn
                ? "আপনার সুবিধা অনুযায়ী চ্যাট, সরাসরি অডিও কল, লাইভ ভিডিও চেম্বার বা অন-সাইট পরিদর্শন বেছে নিন।"
                : "Choose text triage, direct phone call, live video chamber, or an accredited on-site farm visit."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: "photo_instant" as ConsultationChannel,
                title: isBn ? "ছবি ও মেসেজ ট্রায়াজ (Instant Chat)" : "Photo & Diagnostic Chat",
                sub: isBn
                  ? "আক্রান্ত পাতা, মল বা ক্ষতের ছবি আপলোড করুন। ২৫ মিনিটে ডিজিটাল প্রেসক্রিপশন প্রদান।"
                  : "Upload photos & symptoms. Agronomist or vet responds within 25 mins with verified Rx.",
                icon: <Camera className="w-6 h-6 text-amber-400" />,
                feeMultiplier: 1,
                badge: isBn ? "দ্রুততম (২৫ মিনিট)" : "Fastest (25 mins)",
                supported: selectedService.supportedChannels.includes("photo_instant"),
              },
              {
                id: "audio" as ConsultationChannel,
                title: isBn ? "সরাসরি অডিও কল (Voice Call)" : "Direct Phone Consultation",
                sub: isBn
                  ? "কম্পিউটার বা ফোনের সাধারণ নেটওয়ার্কেই সরাসরি রেজিস্টার্ড ডাক্তারের সাথে কথা বলুন।"
                  : "High-clarity phone conversation with accredited specialist for dosage and symptom intake.",
                icon: <Phone className="w-6 h-6 text-emerald-400" />,
                feeMultiplier: 1.2,
                badge: isBn ? "কম খরচে কথা বলুন" : "Voice Call",
                supported: selectedService.supportedChannels.includes("audio"),
              },
              {
                id: "video" as ConsultationChannel,
                title: isBn ? "লাইভ এইচডি ভিডিও চেম্বার (Video)" : "Live HD Video Chamber",
                sub: isBn
                  ? "ভিডিও কলে সরাসরি মাঠের ফসল, গাভীর ওলান বা মুরগির শেড লাইভ প্রদর্শন করুন।"
                  : "Face-to-face video consultation. Walk the expert through your field, barn, or flock live.",
                icon: <Video className="w-6 h-6 text-cyan-400" />,
                feeMultiplier: 1.5,
                badge: isBn ? "সর্বোচ্চ নির্ভুলতা" : "Most Thorough",
                supported: selectedService.supportedChannels.includes("video"),
              },
              {
                id: "field_visit" as ConsultationChannel,
                title: isBn ? "অন-সাইট খামার পরিদর্শন (Farm Visit)" : "On-Site Physical Farm Visit",
                sub: isBn
                  ? "সরকারি অনুমোদিত কৃষিবিদ বা ভেটেরিনারি সার্জন সরাসরি আপনার খামার ঠিকানায় উপস্থিত হবেন।"
                  : "An accredited field practitioner arrives at your farm coordinates with physical testing kit.",
                icon: <MapPin className="w-6 h-6 text-purple-400" />,
                feeMultiplier: 6,
                badge: isBn ? "বাণিজ্যিক প্লট ও খামার" : "On-Site Visit",
                supported: selectedService.supportedChannels.includes("field_visit"),
              },
            ].map((ch) => {
              const isSelected = selectedChannel === ch.id;
              if (!ch.supported) {
                return (
                  <div
                    key={ch.id}
                    className="p-5 rounded-2xl border border-white/[0.04] bg-slate-900/20 opacity-50 cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2.5 rounded-xl bg-slate-800">{ch.icon}</span>
                      <div>
                        <h4 className="font-bold text-slate-400 text-sm">{ch.title}</h4>
                        <span className="text-[10px] text-slate-500">
                          {isBn ? "এই সেবার জন্য প্রযোজ্য নয়" : "Not supported for this service"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-950/30 ring-2 ring-emerald-500/25"
                      : "border-white/[0.08] bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="p-2.5 rounded-xl bg-slate-800/90">{ch.icon}</span>
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {ch.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{ch.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ch.sub}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      {isBn ? "ফি প্রাক্কলন:" : "Estimated Fee:"}
                    </span>
                    {isSelected ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Selected
                      </span>
                    ) : (
                      <span className="text-slate-400 font-bold">
                        {formatCurrency(Math.round(selectedService.baseFee * ch.feeMultiplier))}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-400 hover:text-white transition text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isBn ? "পূর্ববর্তী" : "Back"}</span>
            </button>

            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-400"
            >
              <span>{isBn ? "পরবর্তী: লক্ষণ ও বিবরণ" : "Next: Symptoms & Photos"}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: SECTOR-SPECIFIC INTAKE & PHOTOS ================= */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              {isBn ? "খামার ও লক্ষণের বিস্তারিত বিবরণ দিন" : "Subject Intake & Field Symptoms"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isBn
                ? "সঠিক তথ্য ও স্পষ্ট ছবি দিলে চিকিৎসকরা ১০০% নির্ভুল ব্যবস্থাপত্র প্রদান করতে পারেন।"
                : "Clear details and close-up photographs allow specialists to prescribe exact active molecules."}
            </p>
          </div>

          {/* 3 Core Fields Adapted per Sector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {selectedCategory === "agri"
                  ? isBn ? "ফসলের জাত / বীজ *" : "Crop / Variety *"
                  : selectedCategory === "poultry"
                  ? isBn ? "পোল্ট্রি স্ট্রেন / জাত *" : "Poultry Strain *"
                  : selectedCategory === "fisheries"
                  ? isBn ? "মাছের প্রজাতি *" : "Fish Species *"
                  : selectedCategory === "pet"
                  ? isBn ? "পোষা প্রাণীর জাত *" : "Pet Breed *"
                  : isBn ? "গবাদিপশুর জাত *" : "Cattle Breed *"}
              </label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {selectedCategory === "agri"
                  ? isBn ? "বৃদ্ধির ধাপ (দিন) *" : "Growth Stage (Days) *"
                  : selectedCategory === "poultry"
                  ? isBn ? "ফ্লকের বয়স (দিন) *" : "Flock Age (Days) *"
                  : selectedCategory === "fisheries"
                  ? isBn ? "পুকুর স্টকিং বয়স *" : "Pond Stocking Age *"
                  : isBn ? "বয়স ও ওজন *" : "Age & Weight *"}
              </label>
              <input
                type="text"
                value={subjectAgeOrStage}
                onChange={(e) => setSubjectAgeOrStage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {selectedCategory === "agri"
                  ? isBn ? "জমির আয়তন *" : "Acreage / Bigha *"
                  : selectedCategory === "poultry"
                  ? isBn ? "মোট মুরগির সংখ্যা *" : "Total Flock Count *"
                  : selectedCategory === "fisheries"
                  ? isBn ? "পুকুরের আয়তন (শতক) *" : "Pond Size (Decimals) *"
                  : isBn ? "খামারের পশুর সংখ্যা *" : "Herd Count *"}
              </label>
              <input
                type="text"
                value={areaOrHerdSize}
                onChange={(e) => setAreaOrHerdSize(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Sector-Specific Vital Parameters */}
          {selectedCategory === "poultry" && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-amber-300 mb-1">
                  {isBn ? "আজকের দৈনিক মৃত্যুর সংখ্যা (Daily Mortality) *" : "Daily Mortality Count *"}
                </label>
                <input
                  type="text"
                  value={poultryMortalityToday}
                  onChange={(e) => setPoultryMortalityToday(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-xs"
                />
              </div>
              <div>
                <span className="block font-bold text-amber-300 mb-1">
                  {isBn ? "মলমূত্র ও শ্বাসকষ্টের ধরন" : "Dropping Color & Breathing"}
                </span>
                <span className="text-[11px] text-slate-300 block">
                  {isBn
                    ? "সাদা চুনা, রক্তামাশা বা ঘড়ঘড় শব্দ হলে নিচের বক্সে লিখে দিন।"
                    : "Specify chalky white, bloody stools, or snicking noises below."}
                </span>
              </div>
            </div>
          )}

          {selectedCategory === "fisheries" && (
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/25 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-blue-300 mb-1">
                  {isBn ? "পানির রং ও মাছের আচরণ *" : "Water Appearance & Behavior *"}
                </label>
                <input
                  type="text"
                  value={fishWaterCondition}
                  onChange={(e) => setFishWaterCondition(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-xs"
                />
              </div>
              <div>
                <span className="block font-bold text-blue-300 mb-1">
                  {isBn ? "অক্সিজেন ও গ্যাস সতর্কতা" : "Dissolved Oxygen & Gas Check"}
                </span>
                <span className="text-[11px] text-slate-300 block">
                  {isBn
                    ? "ভোরে ভেসে বাতাস খাওয়া বা তলদেশে কালো কাদা থাকলে উল্লেখ করুন।"
                    : "Note if gasping surfaces at dawn or toxic hydrogen sulfide smells."}
                </span>
              </div>
            </div>
          )}

          {selectedCategory === "veterinary" && (
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-cyan-300 mb-1">
                  {isBn ? "দুধ উৎপাদন হ্রাস বা জ্বর *" : "Milk Yield Loss / Body Fever *"}
                </label>
                <input
                  type="text"
                  value={dairyMilkLoss}
                  onChange={(e) => setDairyMilkLoss(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/[0.08] text-white text-xs"
                />
              </div>
              <div>
                <span className="block font-bold text-cyan-300 mb-1">
                  {isBn ? "ল্যাম্পি স্কিন বা ম্যাসটাইটিস" : "LSD & Mastitis Signs"}
                </span>
                <span className="text-[11px] text-slate-300 block">
                  {isBn
                    ? "ত্বকে মার্বেলের মতো গোটা বা ওলান শক্ত লালচে হলে উল্লেখ করুন।"
                    : "Mention hard quarter swelling, milk flakes, or skin nodules."}
                </span>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {isBn
                ? "লক্ষণ শুরুর সময় ও ইতিপূর্বে কী ওষুধ/স্প্রে দিয়েছেন? *"
                : "Observed Symptoms & Prior Treatments *"}
            </label>
            <textarea
              rows={3}
              value={symptomsDescription}
              onChange={(e) => setSymptomsDescription(e.target.value)}
              placeholder={
                isBn
                  ? "কয়দিন ধরে রোগ দেখা যাচ্ছে? ক্ষত বা দাগের রঙ কেমন? কোনো সার বা অ্যান্টিবায়োটিক ব্যবহার করেছেন কি না লিখুন..."
                  : "Detail onset duration, lesion appearance, appetite, or recent chemical treatments..."
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-white text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          {/* Photos */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {isBn ? "আক্রান্ত অংশ বা লক্ষণের ছবি সংযুক্ত করুন:" : "Attach Close-Up Photos:"}
            </label>
            <div className="border-2 border-dashed border-white/[0.1] rounded-2xl p-5 text-center hover:border-emerald-500/50 transition bg-slate-900/40">
              <Upload className="w-7 h-7 text-emerald-400 mx-auto mb-1.5" />
              <p className="text-xs text-slate-300 font-semibold">
                {isBn ? "ছবি যুক্ত করতে ক্লিক করুন" : "Click to attach photo or drag and drop"}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUploadSim}
                className="hidden"
                id="photo-upload-input"
              />
              <label
                htmlFor="photo-upload-input"
                className="inline-block mt-2.5 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer transition border border-white/[0.08]"
              >
                {isBn ? "ছবি সিলেক্ট করুন" : "Browse Files"}
              </label>
            </div>

            {uploadedPhotos.length > 0 && (
              <div className="mt-3 flex items-center gap-3">
                {uploadedPhotos.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-16 h-16 rounded-xl overflow-hidden border border-emerald-500/40"
                  >
                    <img src={img} alt="Specimen" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 right-0 bg-emerald-600 text-slate-950 text-[9px] font-bold px-1 rounded-tl">
                      #{i + 1}
                    </span>
                  </div>
                ))}
                <span className="text-xs text-emerald-400 font-semibold">
                  {uploadedPhotos.length} {isBn ? "টি ছবি প্রস্তুত" : "photo(s) attached"}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-400 hover:text-white transition text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isBn ? "পূর্ববর্তী" : "Back"}</span>
            </button>

            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-400"
            >
              <span>{isBn ? "পরবর্তী: ডাক্তার নির্বাচন ও ফি" : "Next: Specialist & Pricing"}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: SPECIALIST & REVENUE COMMISSION SPLIT ================= */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              {isBn ? "অনুমোদিত বিশেষজ্ঞ নির্বাচন ও ফি পর্যালোচনা" : "Confirm Specialist & Payout Breakdown"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isBn
                ? "এসআরওটি প্ল্যাটফর্মে ৭০% ফি সরাসরি চিকিৎসকের ওয়ালেটে জমা হয় এবং ৩০% প্ল্যাটফর্ম ব্যবস্থাপনায় ব্যয় হয়।"
                : "70% of fees go directly to the attending doctor, and 30% supports SROT tele-health operations."}
            </p>
          </div>

          {/* Expert selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-slate-300">
              {isBn ? "আপনার চিকিৎসক বেছে নিন:" : "Select Attending Specialist:"}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {compatibleExperts.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExpert(exp)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    selectedExpert.id === exp.id
                      ? "border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-500/25"
                      : "border-white/[0.08] bg-slate-900/50 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={exp.avatar}
                      alt={exp.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="font-bold text-white text-xs">{exp.name}</h4>
                      <p className="text-[11px] text-slate-400">{exp.title}</p>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        ★ {exp.rating} ({exp.consultationCount}+ {isBn ? "পরামর্শ" : "cases"})
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-white block">
                      {formatCurrency(exp.feePerConsultation)}
                    </span>
                    {selectedExpert.id === exp.id ? (
                      <span className="text-[11px] font-bold text-emerald-400">Selected</span>
                    ) : (
                      <span className="text-[10px] text-slate-500">Pick</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown Box (70% Doctor / 30% SROT) */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a1219] to-slate-900 border border-emerald-500/25 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <BadgeDollarSign className="w-4 h-4" />
                <span>{isBn ? "স্বচ্ছ ফি ও কমিশন কাঠামো (Revenue Split):" : "Transparent Revenue Breakdown (70/30):"}</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                {isBn ? "সরকারি নীতিমালা অনুসারী" : "Council Compliant"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.05]">
                <span className="text-slate-400 text-[11px] block">
                  {isBn ? "মোট কনসাল্টেশন ফি" : "Total Case Fee"}
                </span>
                <span className="text-lg font-black text-white">{formatCurrency(totalFee)}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
                <span className="text-emerald-300 text-[11px] block">
                  {isBn ? "চিকিৎসক পাবেন (৭০%)" : "Doctor Earning (70%)"}
                </span>
                <span className="text-lg font-black text-emerald-400">{formatCurrency(expertShare)}</span>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20">
                <span className="text-cyan-300 text-[11px] block">
                  {isBn ? "এসআরওটি প্ল্যাটফর্ম ফি (৩০%)" : "SROT Platform Fee (30%)"}
                </span>
                <span className="text-lg font-black text-cyan-400">{formatCurrency(srotShare)}</span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isBn ? "অফিসিয়াল কিউআর প্রেসক্রিপশন" : "Official QR Prescription"}</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isBn ? "৪৮ ঘণ্টা ফ্রি ফলো-আপ চ্যাট" : "48h Free Follow-Up"}</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isBn ? "ডোজ ক্যালকুলেটর ভেরিফিকেশন" : "Dosage Verified"}</span>
              </span>
            </div>
          </div>

          {/* Payment Method Selector (bKash / Nagad / Rocket) */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              {isBn ? "পেমেন্ট মাধ্যম বেছে নিন:" : "Select Instant Payment Gateway:"}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "bkash", name: "বিকাশ (bKash)", color: "border-pink-500 text-pink-400" },
                { id: "nagad", name: "নগদ (Nagad)", color: "border-orange-500 text-orange-400" },
                { id: "rocket", name: "রকেট (Rocket)", color: "border-purple-500 text-purple-400" },
              ].map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPaymentMethod(p.id as any)}
                  className={`p-3 rounded-xl border text-center font-bold text-xs transition ${
                    paymentMethod === p.id
                      ? `${p.color} bg-white/[0.04] ring-2 ring-emerald-500/30`
                      : "border-white/[0.08] bg-slate-900/40 text-slate-400 hover:text-white"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation & Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-400 hover:text-white transition text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isBn ? "পূর্ববর্তী" : "Back"}</span>
            </button>

            <button
              onClick={handleSubmitBooking}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition shadow-xl shadow-emerald-500/25 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{isBn ? "পেমেন্ট প্রসেস ও চেম্বার তৈরি হচ্ছে..." : "Processing & Entering Room..."}</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>
                    {isBn
                      ? `ফি প্রদান করুন (${formatCurrency(totalFee)}) ও চেম্বারে প্রবেশ করুন →`
                      : `Pay ${formatCurrency(totalFee)} & Enter Consultation Room →`}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
