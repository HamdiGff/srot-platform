"use client";

import React, { useState } from "react";
import { CommunityQuestion, CommunitySector } from "@/data/mockCommunity";
import { useLanguageStore } from "@/lib/store/languageStore";
import { useUserStore } from "@/lib/store/userStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import {
  X,
  HelpCircle,
  Upload,
  CheckCircle2,
  Sparkles,
  Wheat,
  Milk,
  Egg,
  Fish,
  HeartHandshake,
  AlertCircle,
  MapPin,
  Camera,
} from "lucide-react";

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitQuestion: (newQuestion: CommunityQuestion) => void;
}

export function AskQuestionModal({
  isOpen,
  onClose,
  onSubmitQuestion,
}: AskQuestionModalProps) {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const { currentUser, currentRole } = useUserStore();
  const { addQuestion } = useCommunityStore();

  const defaultSector: CommunitySector =
    currentRole === "pet_owner"
      ? "pets"
      : currentRole === "livestock_farmer"
      ? "dairy"
      : "crops";

  const [sector, setSector] = useState<CommunitySector>(defaultSector);
  const [cropOrAnimal, setCropOrAnimal] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [division, setDivision] = useState("Rangpur");
  const [district, setDistrict] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [sampleImageIndex, setSampleImageIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const samplePhotoPresets = [
    {
      name: isBn ? "পাতার বাদামী দাগ / ব্লাস্ট" : "Foliar Blast / Spots",
      url: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: isBn ? "গবাদিপশুর ত্বক / ক্ষত" : "Cattle Skin / Lesion",
      url: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: isBn ? "মুরগির ঝিঁমুনি / ড্রপিংস" : "Poultry Huddle / Stool",
      url: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&auto=format&fit=crop&q=80",
    },
    {
      name: isBn ? "পুকুরের পানি / মাছের ফুলকা" : "Pond Water / Fish Gills",
      url: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&auto=format&fit=crop&q=80",
    },
  ];

  const bangladeshDivisions = [
    { id: "Rangpur", bn: "রংপুর বিভাগ", en: "Rangpur Division" },
    { id: "Rajshahi", bn: "রাজশাহী বিভাগ", en: "Rajshahi Division" },
    { id: "Dhaka", bn: "ঢাকা বিভাগ", en: "Dhaka Division" },
    { id: "Mymensingh", bn: "ময়মনসিংহ বিভাগ", en: "Mymensingh Division" },
    { id: "Chittagong", bn: "চট্টগ্রাম বিভাগ", en: "Chittagong Division" },
    { id: "Khulna", bn: "খুলনা বিভাগ", en: "Khulna Division" },
    { id: "Barisal", bn: "বরিশাল বিভাগ", en: "Barisal Division" },
    { id: "Sylhet", bn: "সিলেট বিভাগ", en: "Sylhet Division" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const attachedImages: string[] = [];
    if (sampleImageIndex !== null) {
      attachedImages.push(samplePhotoPresets[sampleImageIndex].url);
    } else {
      attachedImages.push(
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80"
      );
    }

    const roleMapping: "farmer" | "dairy_farmer" | "poultry_farmer" | "fish_farmer" | "pet_owner" =
      currentRole === "pet_owner"
        ? "pet_owner"
        : currentRole === "livestock_farmer"
        ? "dairy_farmer"
        : "farmer";

    const createdQuestion = addQuestion({
      title,
      titleEn: title,
      description,
      descriptionEn: description,
      sector,
      cropOrAnimal: cropOrAnimal || (isBn ? "সাধারণ ফসল/প্রাণী" : "General Specimen"),
      cropOrAnimalEn: cropOrAnimal || "General Specimen",
      authorName: currentUser.name,
      authorLocation: currentUser.location || (isBn ? `${division}, বাংলাদেশ` : `${division}, Bangladesh`),
      authorLocationEn: currentUser.location || `${division}, Bangladesh`,
      authorAvatar: currentUser.avatar,
      authorRole: roleMapping,
      images: attachedImages,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      onSubmitQuestion(createdQuestion);
      setIsSubmitted(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090f19] border border-emerald-500/30 p-6 sm:p-8 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {isBn ? "আপনার প্রশ্ন সফলভাবে পোস্ট হয়েছে!" : "Question Posted Successfully!"}
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              {isBn
                ? "আমাদের নিবন্ধিত কৃষিবিদ ও ভেটেরিনারি সার্জনরা দ্রুত আপনার প্রশ্নটি পর্যালোচনা করে উত্তর দেবেন।"
                : "Council-certified agronomists & vets will review your submission and post verified recommendations."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{isBn ? "উন্মুক্ত কৃষি প্রশ্নোত্তর ফোরাম" : "Free Community Q&A"}</span>
              </div>
              <h2 className="text-xl font-black text-white">
                {isBn ? "ফসলের রোগ বা পশুর সমস্যা সম্পর্কে জিজ্ঞাসা করুন" : "Ask About a Crop or Animal Condition"}
              </h2>
              <p className="text-xs text-slate-400">
                {isBn
                  ? "বিনামূল্যে প্রশ্ন করুন। বাংলাদেশের সরকারি সার্টিফাইড বিশেষজ্ঞ ও অভিজ্ঞ খামারিরা উত্তর দেবেন।"
                  : "Post for free. Certified agronomists, vets, and experienced growers answer publicly."}
              </p>
            </div>

            {/* 1. Sector Choice */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                {isBn ? "১. কোন ক্যাটাগরির সমস্যা? *" : "1. Choose Sector *"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {[
                  {
                    id: "crops",
                    label: isBn ? "মাঠফসল" : "Crops",
                    icon: <Wheat className="w-4 h-4" />,
                  },
                  {
                    id: "dairy",
                    label: isBn ? "ডেইরি/গরু" : "Dairy",
                    icon: <Milk className="w-4 h-4" />,
                  },
                  {
                    id: "poultry",
                    label: isBn ? "পোল্ট্রি" : "Poultry",
                    icon: <Egg className="w-4 h-4" />,
                  },
                  {
                    id: "fisheries",
                    label: isBn ? "মৎস্য" : "Fisheries",
                    icon: <Fish className="w-4 h-4" />,
                  },
                  {
                    id: "pets",
                    label: isBn ? "পোষা প্রাণী" : "Pets",
                    icon: <HeartHandshake className="w-4 h-4" />,
                  },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setSector(item.id as CommunitySector)}
                    className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border text-center transition font-semibold ${
                      sector === item.id
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md"
                        : "bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Crop/Breed Name & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {isBn ? "২. জাত বা প্রজাতি (ঐচ্ছিক)" : "2. Variety / Breed (Optional)"}
                </label>
                <input
                  type="text"
                  placeholder={
                    isBn
                      ? "যেমন: ব্রি ধান-২৮, ফ্রিজিয়ান গাভী, সোনালি মুরগি"
                      : "e.g. BRRI-28, Friesian Cow, Tilapia"
                  }
                  value={cropOrAnimal}
                  onChange={(e) => setCropOrAnimal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.08] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {isBn ? "৩. আপনার বিভাগ *" : "3. Your Division *"}
                </label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.08] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                >
                  {bangladeshDivisions.map((div) => (
                    <option key={div.id} value={div.id}>
                      {isBn ? div.bn : div.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Title */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {isBn ? "৪. মূল সমস্যা সংক্ষেপে লিখুন (শিরোনাম) *" : "4. Question Title *"}
              </label>
              <input
                type="text"
                required
                placeholder={
                  isBn
                    ? "যেমন: বোরো ধানের শীষ বের হওয়ার মুখে গোড়ায় কালো দাগ ও শুকিয়ে যাওয়া..."
                    : "e.g. Panicles turning brown and chalky before full emergence..."
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* 4. Detailed Description */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {isBn
                  ? "৫. বিস্তারিত লক্ষণ, স্থায়িত্ব ও পূর্বে কী স্প্রে/ওষুধ দিয়েছেন? *"
                  : "5. Symptoms, Duration & Past Treatments *"}
              </label>
              <textarea
                required
                rows={3}
                placeholder={
                  isBn
                    ? "লক্ষণগুলো কয়দিন ধরে দেখা যাচ্ছে? জমির বা খামারের অবস্থা কেমন? কোনো সার বা অ্যান্টিবায়োটিক প্রয়োগ করেছেন কি না বিস্তারিত লিখুন..."
                    : "Describe duration, weather conditions, severity, and any sprays or supplements already tried..."
                }
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-slate-200 text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            {/* 5. Attached Photo Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>{isBn ? "৬. আক্রান্ত অংশ বা লক্ষণের ছবি যুক্ত করুন" : "6. Attach Diagnostic Photo"}</span>
                <span className="text-[11px] text-emerald-400 font-normal">
                  {isBn ? "ছবি দিলে দ্রুত সঠিক উত্তর মেলে" : "Photos increase accuracy by 95%"}
                </span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {samplePhotoPresets.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() =>
                      setSampleImageIndex(sampleImageIndex === idx ? null : idx)
                    }
                    className={`relative rounded-xl overflow-hidden border p-1 text-left transition ${
                      sampleImageIndex === idx
                        ? "border-emerald-400 ring-2 ring-emerald-500/50 bg-emerald-950/40"
                        : "border-white/[0.08] bg-slate-900 hover:border-slate-700"
                    }`}
                  >
                    <div className="h-16 w-full rounded-lg overflow-hidden mb-1">
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] text-slate-300 font-medium line-clamp-1 block px-1">
                      {preset.name}
                    </span>
                    {sampleImageIndex === idx && (
                      <span className="absolute top-2 right-2 bg-emerald-500 text-slate-950 p-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgent Prescription Checkbox */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3 text-xs">
              <input
                type="checkbox"
                id="urgent-check"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
              />
              <label htmlFor="urgent-check" className="cursor-pointer">
                <strong className="text-amber-300 block font-bold mb-0.5">
                  {isBn
                    ? "জরুরি অবস্থা? সরাসরি চিকিৎসকের অফিসিয়াল প্রেসক্রিপশন চান?"
                    : "High Urgency? Request priority verified prescription"}
                </strong>
                <span className="text-slate-300 text-[11px]">
                  {isBn
                    ? "টিক চিহ্ন দিলে প্রশ্নটি তাৎক্ষণিকভাবে অন-ডিউটি বিশেষজ্ঞদের ডেস্কে পাঠানো হবে।"
                    : "Routes this alert directly to on-duty agronomists & vets for expedited triage."}
                </span>
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                {isBn ? "বাতিল" : "Cancel"}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-extrabold hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/25 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isBn ? "বিনামূল্যে প্রশ্ন পোস্ট করুন" : "Publish Question (Free)"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
