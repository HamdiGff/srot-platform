"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PLATFORM_SERVICES, PlatformService, ServiceCategory, ConsultationChannel } from "@/data/mockServices";
import { PLATFORM_EXPERTS, PlatformExpert } from "@/data/mockExperts";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useUserStore } from "@/lib/store/userStore";
import { formatCurrency } from "@/lib/utils";
import {
  Wheat,
  Milk,
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

  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(
    initialCategory || (currentRole === "pet_owner" ? "pet" : currentRole === "livestock_farmer" ? "veterinary" : "agri")
  );

  // Pick initial service or default to first in category
  const servicesInCategory = PLATFORM_SERVICES.filter((s) => s.category === selectedCategory);
  const [selectedService, setSelectedService] = useState<PlatformService>(
    PLATFORM_SERVICES.find((s) => s.id === initialServiceId) || servicesInCategory[0] || PLATFORM_SERVICES[0]
  );

  const [selectedChannel, setSelectedChannel] = useState<ConsultationChannel>(
    selectedService.supportedChannels[0] || "photo_instant"
  );

  // Subject details form
  const [subjectName, setSubjectName] = useState(
    currentUser.registeredEntities[0]?.name || (selectedCategory === "agri" ? "Rice Paddy (Swarna)" : selectedCategory === "pet" ? "Max (Golden Retriever)" : "Dairy Cow #12")
  );
  const [subjectAgeOrStage, setSubjectAgeOrStage] = useState(
    selectedCategory === "agri" ? "Active Tillering (45 Days)" : selectedCategory === "pet" ? "3 Years (30 kg)" : "4 Years, 2nd Lactation"
  );
  const [areaOrHerdSize, setAreaOrHerdSize] = useState(
    selectedCategory === "agri" ? "4.5 Acres" : selectedCategory === "pet" ? "1 Pet" : "15 Dairy Cows"
  );
  const [symptomsDescription, setSymptomsDescription] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
  ]);

  // Pick expert
  const compatibleExperts = PLATFORM_EXPERTS.filter(
    (e) => e.primaryCategory === selectedCategory || e.serviceIds.includes(selectedService.id)
  );
  const [selectedExpert, setSelectedExpert] = useState<PlatformExpert>(
    PLATFORM_EXPERTS.find((e) => e.id === initialExpertId) || compatibleExperts[0] || PLATFORM_EXPERTS[0]
  );

  const [preferredSlot, setPreferredSlot] = useState("Today - Next Available Priority Slot");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category switch helper
  const handleCategoryChange = (cat: ServiceCategory) => {
    setSelectedCategory(cat);
    const newServices = PLATFORM_SERVICES.filter((s) => s.category === cat);
    if (newServices.length > 0) {
      setSelectedService(newServices[0]);
      setSelectedChannel(newServices[0].supportedChannels[0] || "photo_instant");
    }
    const newExperts = PLATFORM_EXPERTS.filter((e) => e.primaryCategory === cat);
    if (newExperts.length > 0) {
      setSelectedExpert(newExperts[0]);
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
      const demoSample = selectedCategory === "agri"
        ? "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80"
        : selectedCategory === "pet"
        ? "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80"
        : "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80";
      setUploadedPhotos([...uploadedPhotos, demoSample]);
    }
  };

  const handleSubmitBooking = () => {
    setIsSubmitting(true);

    const clientRole =
      selectedCategory === "pet"
        ? "pet_owner"
        : selectedCategory === "veterinary"
        ? "livestock_farmer"
        : "farmer";

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
      symptomsDescription: symptomsDescription || "Rapid visual triage requested for leaf/skin lesions and abnormal symptoms.",
      uploadedPhotos,
      scheduledDateTime: new Date().toISOString(),
      feePaid: selectedExpert.feePerConsultation || selectedService.baseFee,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/consult/${newRecord.id}`);
    }, 600);
  };

  return (
    <div className="w-full max-w-4xl mx-auto srot-glass-card rounded-3xl border border-slate-800 p-6 md:p-10 shadow-2xl">
      {/* Step Indicators */}
      <div className="flex items-center justify-between pb-8 mb-8 border-b border-slate-800">
        {[
          { num: 1, label: "Category & Service" },
          { num: 2, label: "Channel" },
          { num: 3, label: "Issue Details & Photos" },
          { num: 4, label: "Specialist & Review" },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
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

      {/* ================= STEP 1: CATEGORY & SERVICE ================= */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Choose Service Category
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              SROT supports multiple sectors under one unified consultation engine.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: "agri" as ServiceCategory,
                label: "Agriculture Advisory",
                sub: "Crop diseases, fertilizer, IPM & field visits",
                icon: <Wheat className="w-5 h-5 text-emerald-400" />,
                activeBorder: "border-emerald-500 bg-emerald-950/30 text-white",
              },
              {
                id: "veterinary" as ServiceCategory,
                label: "Animal Healthcare",
                sub: "Cattle, dairy, poultry, goat, fisheries",
                icon: <Milk className="w-5 h-5 text-cyan-400" />,
                activeBorder: "border-cyan-500 bg-cyan-950/30 text-white",
              },
              {
                id: "pet" as ServiceCategory,
                label: "Companion Pet Services",
                sub: "Dogs, cats, clinical nutrition & tele-vet",
                icon: <HeartHandshake className="w-5 h-5 text-amber-400" />,
                activeBorder: "border-amber-500 bg-amber-950/30 text-white",
              },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedCategory === cat.id
                    ? `${cat.activeBorder} ring-2 ring-emerald-500/30`
                    : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-slate-800">{cat.icon}</span>
                  <span className="font-bold text-sm">{cat.label}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{cat.sub}</p>
              </button>
            ))}
          </div>

          {/* Service Cards in Category */}
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
              Select Specific Advisory Service:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {servicesInCategory.map((svc) => (
                <div
                  key={svc.id}
                  onClick={() => handleServiceSelect(svc)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedService.id === svc.id
                      ? "border-emerald-400 bg-emerald-950/30 ring-2 ring-emerald-500/30"
                      : "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
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

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {svc.avgResponseTime}
                    </span>
                    {selectedService.id === svc.id ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    ) : (
                      <span className="text-slate-500">Click to select</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-950/50"
            >
              <span>Continue to Channel Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: CHANNEL SELECTION ================= */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Choose Consultation Format
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select how you want our specialist to examine your crop, herd, or pet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: "photo_instant" as ConsultationChannel,
                title: "Instant Photo & Triage Review",
                sub: "Upload clear photos and symptoms. Agronomist or vet responds within 25 minutes with verified prescription.",
                icon: <Camera className="w-6 h-6 text-amber-400" />,
                badge: "Fastest (Under 25 mins)",
                supported: selectedService.supportedChannels.includes("photo_instant"),
              },
              {
                id: "video" as ConsultationChannel,
                title: "Live HD Video Consultation",
                sub: "Face-to-face video consultation. Walk the expert through your field, barn, or pet's behavior in real time.",
                icon: <Video className="w-6 h-6 text-cyan-400" />,
                badge: "Most Thorough",
                supported: selectedService.supportedChannels.includes("video"),
              },
              {
                id: "audio" as ConsultationChannel,
                title: "Direct Voice Call",
                sub: "High-clarity phone conversation with an accredited specialist for quick advice and dosage clarification.",
                icon: <Phone className="w-6 h-6 text-emerald-400" />,
                badge: "Low Bandwidth Safe",
                supported: selectedService.supportedChannels.includes("audio"),
              },
              {
                id: "field_visit" as ConsultationChannel,
                title: "On-Site Physical Field Visit",
                sub: "An accredited field agronomist or veterinarian arrives at your farm coordinates with testing tools.",
                icon: <MapPin className="w-6 h-6 text-purple-400" />,
                badge: "Commercial Plots",
                supported: selectedService.supportedChannels.includes("field_visit"),
              },
            ].map((ch) => {
              const isSelected = selectedChannel === ch.id;
              if (!ch.supported) {
                return (
                  <div
                    key={ch.id}
                    className="p-5 rounded-2xl border border-slate-800/40 bg-slate-900/20 opacity-50 cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="p-2.5 rounded-xl bg-slate-800">{ch.icon}</span>
                      <div>
                        <h4 className="font-bold text-slate-400 text-sm">{ch.title}</h4>
                        <span className="text-[10px] text-slate-500">Not supported for this specific service</span>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-950/30 ring-2 ring-emerald-500/30"
                      : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="p-2.5 rounded-xl bg-slate-800/90">{ch.icon}</span>
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {ch.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-base">{ch.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ch.sub}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Channel Mode</span>
                    {isSelected ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Selected
                      </span>
                    ) : (
                      <span className="text-slate-500">Choose Format</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-400 hover:text-white transition text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-950/50"
            >
              <span>Next: Describe Issue & Photos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: ISSUE DETAILS & PHOTO UPLOAD ================= */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {selectedCategory === "agri"
                ? "Crop Variety & Symptom Details"
                : selectedCategory === "pet"
                ? "Pet Profile & Health Concerns"
                : "Livestock & Herd Health Details"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Providing clear details and photos allows our specialists to diagnose accurately.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {selectedCategory === "agri"
                  ? "Crop / Seed Variety"
                  : selectedCategory === "pet"
                  ? "Pet Name & Breed"
                  : "Animal / Breed"}
              </label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="e.g. Rice Paddy Swarna, or Max Retriever"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {selectedCategory === "agri"
                  ? "Growth Stage (Days / Phase)"
                  : "Age & Weight / Lactation"}
              </label>
              <input
                type="text"
                value={subjectAgeOrStage}
                onChange={(e) => setSubjectAgeOrStage(e.target.value)}
                placeholder="e.g. Tillering (45 days) or 3 yrs (28 kg)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {selectedCategory === "agri"
                  ? "Acreage / Farm Area"
                  : selectedCategory === "pet"
                  ? "Number of Pets"
                  : "Herd / Flock Size"}
              </label>
              <input
                type="text"
                value={areaOrHerdSize}
                onChange={(e) => setAreaOrHerdSize(e.target.value)}
                placeholder="e.g. 5.2 Acres or 25 Cows"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Describe Observed Symptoms & Timeline:
            </label>
            <textarea
              rows={3}
              value={symptomsDescription}
              onChange={(e) => setSymptomsDescription(e.target.value)}
              placeholder="Describe when the issue began, appearance of lesions/discoloration, changes in appetite, temperature, or recent spray applications..."
              className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          {/* Photo upload zone */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Diagnostic Photos (Leaves, Roots, Lesions, Stool, or Udder):
            </label>
            <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center hover:border-emerald-500/60 transition bg-slate-900/40">
              <Upload className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-xs text-slate-300 font-semibold">
                Click to attach high-resolution photo or drag and drop
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                PNG, JPG or WEBP up to 15MB. Close-up photos give 98% diagnosis confidence.
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
                className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 cursor-pointer transition border border-slate-700"
              >
                Browse Image
              </label>
            </div>

            {/* Uploaded photos list */}
            {uploadedPhotos.length > 0 && (
              <div className="mt-3 flex items-center gap-3">
                {uploadedPhotos.map((img, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-emerald-500/40">
                    <img src={img} alt="Uploaded sample" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 right-0 bg-emerald-600 text-white text-[9px] px-1 rounded-tl">
                      #{i + 1}
                    </span>
                  </div>
                ))}
                <span className="text-xs text-emerald-400 font-medium">
                  {uploadedPhotos.length} photo(s) ready for analysis
                </span>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-400 hover:text-white transition text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-950/50"
            >
              <span>Next: Select Specialist & Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: SPECIALIST & FINAL REVIEW ================= */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Confirm Specialist & Review Case
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select your attending practitioner and confirm consultation dispatch.
            </p>
          </div>

          {/* Specialist Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">
              Select Attending Specialist:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {compatibleExperts.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExpert(exp)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedExpert.id === exp.id
                      ? "border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-500/30"
                      : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
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
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        ★ {exp.rating} ({exp.consultationCount}+ cases)
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

          {/* Summary Box */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Consultation Ticket Summary:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Advisory Service:</span>
                <span className="font-bold text-white">{selectedService.name}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Format & Channel:</span>
                <span className="font-bold text-emerald-400 capitalize">
                  {selectedChannel.replace("_", " ")}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Beneficiary / Subject:</span>
                <span className="font-bold text-white">
                  {subjectName} ({subjectAgeOrStage})
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Practitioner:</span>
                <span className="font-bold text-white">{selectedExpert.name}</span>
                <span className="text-[10px] text-slate-400 block font-mono">{selectedExpert.registrationNumber}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-medium">
                Official Tele-Consultation Fee:
              </span>
              <span className="text-lg font-extrabold text-white">
                {formatCurrency(selectedExpert.feePerConsultation)}
              </span>
            </div>
          </div>

          {/* Navigation & Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-400 hover:text-white transition text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleSubmitBooking}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm transition shadow-xl shadow-emerald-950/60 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating SROT Case Ticket...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm & Enter Consultation Room &rarr;</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
