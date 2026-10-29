"use client";

import React, { useState } from "react";
import { PLATFORM_EXPERTS } from "@/data/mockExperts";
import { ExpertCard } from "@/components/cards/ExpertCard";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  ShieldCheck,
  Search,
  Users,
  Wheat,
  Milk,
  Egg,
  Fish,
  HeartHandshake,
  CheckCircle,
  Clock,
  Sparkles,
  MapPin,
  Filter,
} from "lucide-react";

export default function ExpertsPage() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [onlyAvailableToday, setOnlyAvailableToday] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const divisions = ["all", "Dhaka", "Rajshahi", "Mymensingh", "Chittagong", "Rangpur", "Khulna"];

  const filteredExperts = PLATFORM_EXPERTS.filter((exp) => {
    const matchesCat = selectedCategory === "all" || exp.primaryCategory === selectedCategory;
    const matchesDiv = selectedDivision === "all" || exp.division.toLowerCase() === selectedDivision.toLowerCase();
    const matchesAvailability = !onlyAvailableToday || exp.availableToday;
    const matchesSearch =
      searchQuery.trim() === "" ||
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      exp.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesDiv && matchesAvailability && matchesSearch;
  });

  return (
    <div className="w-full srot-glow-mesh py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header & Trust Telemetry */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {isBn
                ? "বিভিসি, ডিএই ও ডিওএফ কাউন্সিল যাচাইকৃত চিকিৎসকমণ্ডলী"
                : "BVC, DAE & DoF Accredited Practitioner Directory"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {isBn
              ? "কাউন্সিল-নিবন্ধিত উদ্ভিদ রোগতত্ত্ববিদ ও পশু চিকিৎসক"
              : "Plant Pathologists, Agronomists & Veterinarians"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {isBn
              ? "এসআরওটি প্ল্যাটফর্মের প্রতিটি চিকিৎসক বাংলাদেশ ভেটেরিনারি কাউন্সিল (BVC) কিংবা কৃষি সম্প্রসারণ অধিদপ্তর (DAE) দ্বারা যাচাইকৃত। সরাসরি ভিডিও অ্যাপয়েন্টমেন্ট বা দ্রুত ফটো ট্রায়াজ বুক করুন।"
              : "Every practitioner on SROT holds a verifiable government council registration number. Connect within 15 minutes for one-on-one video examinations or instant diagnostic photo reviews."}
          </p>
        </div>

        {/* Live Practitioner Strip */}
        <div className="flex items-center gap-3 bg-slate-900/80 border border-white/[0.08] p-3 rounded-2xl shrink-0">
          <div className="flex -space-x-2">
            {PLATFORM_EXPERTS.slice(0, 4).map((e) => (
              <img
                key={e.id}
                src={e.avatar}
                alt={e.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-slate-900"
              />
            ))}
          </div>
          <div className="text-xs">
            <span className="text-white font-black block">140+ {isBn ? "বিশেষজ্ঞ সক্রিয়" : "Specialists Online"}</span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isBn ? "গড় সাড়া: < ১৫ মিনিট" : "Avg Response: < 15 Min"}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="srot-glass-card rounded-2xl p-4 sm:p-5 border border-white/[0.08] space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isBn
                  ? "চিকিৎসকের নাম, রোগ/স্পেশালিটি, বা রেজিস্ট্রেশন নম্বর দিয়ে খুঁজুন..."
                  : "Search doctor name, disease specialty, BVC/DAE registration number..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/[0.1] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-medium"
            />
          </div>

          {/* Division Selector & Available Today Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-white/[0.1] text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900">
                  {isBn ? "সকল বিভাগ (All Divisions)" : "All Divisions"}
                </option>
                <option value="Dhaka" className="bg-slate-900">Dhaka (ঢাকা)</option>
                <option value="Rajshahi" className="bg-slate-900">Rajshahi (রাজশাহী)</option>
                <option value="Mymensingh" className="bg-slate-900">Mymensingh (ময়মনসিংহ)</option>
                <option value="Chittagong" className="bg-slate-900">Chattogram (চট্টগ্রাম)</option>
                <option value="Rangpur" className="bg-slate-900">Rangpur (রংপুর)</option>
                <option value="Khulna" className="bg-slate-900">Khulna (খুলনা)</option>
              </select>
            </div>

            <button
              onClick={() => setOnlyAvailableToday(!onlyAvailableToday)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition border ${
                onlyAvailableToday
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-900 text-slate-400 border-white/[0.08] hover:text-white"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isBn ? "আজকে উপলব্ধ" : "Available Today"}</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-white/[0.06] pt-3">
          {[
            { id: "all", label: isBn ? "সকল বিশেষজ্ঞ" : "All Practitioners" },
            { id: "agri", label: isBn ? "উদ্ভিদ ও ফসল রোগ" : "Crop Pathologists", icon: <Wheat className="w-3.5 h-3.5" /> },
            { id: "veterinary", label: isBn ? "ডেইরি ও বোভাইন সার্জন" : "Dairy & Bovine Vets", icon: <Milk className="w-3.5 h-3.5" /> },
            { id: "poultry", label: isBn ? "পোল্ট্রি ও মুরগি বিশেষজ্ঞ" : "Poultry Specialists", icon: <Egg className="w-3.5 h-3.5" /> },
            { id: "fisheries", label: isBn ? "মৎস্য ও অ্যাকুয়াকালচার" : "Aquaculture Experts", icon: <Fish className="w-3.5 h-3.5" /> },
            { id: "pet", label: isBn ? "পোষা প্রাণী চিকিৎসক" : "Companion Pet Vets", icon: <HeartHandshake className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === tab.id
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/60"
                  : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/[0.06]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Verified Practitioners */}
      {filteredExperts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-white/[0.08] text-slate-400 space-y-3">
          <p className="text-sm">
            {isBn
              ? `"${searchQuery}" এর সাথে মিলে এমন কোনো বিশেষজ্ঞ পাওয়া যায়নি।`
              : `No verified specialists found matching "${searchQuery}".`}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedDivision("all");
              setOnlyAvailableToday(false);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition"
          >
            {isBn ? "ফিল্টার রিসেট করুন" : "Reset All Filters"}
          </button>
        </div>
      )}
    </div>
  );
}
