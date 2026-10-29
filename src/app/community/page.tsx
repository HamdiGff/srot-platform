"use client";

import React, { useState } from "react";
import {
  MOCK_COMMUNITY_QUESTIONS,
  CommunityQuestion,
  CommunitySector,
} from "@/data/mockCommunity";
import { QuestionCard } from "@/components/community/QuestionCard";
import { AskQuestionModal } from "@/components/community/AskQuestionModal";
import { QuestionDetailModal } from "@/components/community/QuestionDetailModal";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  Search,
  PlusCircle,
  HelpCircle,
  Wheat,
  Milk,
  Egg,
  Fish,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Users,
  MessageSquare,
  Sparkles,
  MapPin,
  Filter,
} from "lucide-react";

export default function CommunityPage() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [questions, setQuestions] = useState<CommunityQuestion[]>(
    MOCK_COMMUNITY_QUESTIONS
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<CommunitySector | "all">("all");
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [expertOnly, setExpertOnly] = useState(false);

  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<CommunityQuestion | null>(null);

  // Filter logic
  const filteredQuestions = questions.filter((q) => {
    // Sector filter
    if (selectedSector !== "all" && q.sector !== selectedSector) return false;

    // Division filter
    if (selectedDivision !== "all" && !q.authorLocation.includes(selectedDivision) && !q.authorLocationEn.includes(selectedDivision)) {
      return false;
    }

    // Expert answered only
    if (expertOnly && !q.hasExpertAnswer) return false;

    // Search query
    if (searchQuery.trim()) {
      const qLower = searchQuery.toLowerCase();
      const matchBn =
        q.title.toLowerCase().includes(qLower) ||
        q.description.toLowerCase().includes(qLower) ||
        q.cropOrAnimal.toLowerCase().includes(qLower);
      const matchEn =
        q.titleEn.toLowerCase().includes(qLower) ||
        q.descriptionEn.toLowerCase().includes(qLower) ||
        q.cropOrAnimalEn.toLowerCase().includes(qLower);
      return matchBn || matchEn;
    }

    return true;
  });

  const handleAddNewQuestion = (newQ: CommunityQuestion) => {
    setQuestions([newQ, ...questions]);
  };

  const bangladeshDivisions = [
    { id: "all", bn: "সকল বিভাগ", en: "All Divisions" },
    { id: "Rangpur", bn: "রংপুর বিভাগ", en: "Rangpur" },
    { id: "Rajshahi", bn: "রাজশাহী বিভাগ", en: "Rajshahi" },
    { id: "Dhaka", bn: "ঢাকা বিভাগ", en: "Dhaka" },
    { id: "Mymensingh", bn: "ময়মনসিংহ বিভাগ", en: "Mymensingh" },
    { id: "Chittagong", bn: "চট্টগ্রাম বিভাগ", en: "Chittagong" },
    { id: "Khulna", bn: "খুলনা বিভাগ", en: "Khulna" },
    { id: "Barisal", bn: "বরিশাল বিভাগ", en: "Barisal" },
    { id: "Sylhet", bn: "সিলেট বিভাগ", en: "Sylhet" },
  ];

  return (
    <div className="min-h-screen w-full srot-grid-pattern srot-ambient-glow pb-24 text-slate-100">
      {/* 1. Community Hero Header */}
      <section className="relative pt-8 pb-12 md:pt-14 md:pb-16 border-b border-white/[0.06] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>
                  {isBn
                    ? "উন্মুক্ত কৃষি ও ভেটেরিনারি প্রশ্নোত্তর ফোরাম"
                    : "Open Agriculture & Veterinary Community Q&A"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {isBn
                  ? "ফসলের রোগ ও পশুর সমস্যায় প্রশ্ন করুন, বিশেষজ্ঞ সমাধান নিন"
                  : "Ask Crop & Animal Health Questions, Get Certified Solutions"}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isBn
                  ? "বাংলাদেশের কৃষক, ডেইরি, পোল্ট্রি ও মৎস্য চাষিদের জন্য সরকারি নিবন্ধিত কৃষিবিদ ও ভেটেরিনারি চিকিৎসকদের উন্মুক্ত প্রশ্নোত্তর সেবা — সম্পূর্ণ বিনামূল্যে।"
                  : "Free, open community Q&A connecting Bangladesh grain growers, dairy producers, and fish farmers with council-certified agronomists & vets."}
              </p>
            </div>

            {/* Floating 'Ask Question' Button */}
            <div className="shrink-0">
              <button
                onClick={() => setIsAskModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <PlusCircle className="w-5 h-5 text-slate-950" />
                <span>{isBn ? "প্রশ্ন করুন (বিনামূল্যে)" : "Ask a Question (Free)"}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/[0.06]">
            {[
              {
                label: isBn ? "সমাধানকৃত প্রশ্ন" : "Solved Questions",
                val: "৮,৫৪০+",
                icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
              },
              {
                label: isBn ? "সক্রিয় সরকারি বিশেষজ্ঞ" : "Certified Specialists",
                val: "১৪২ জন",
                icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />,
              },
              {
                label: isBn ? "দৈনিক প্রশ্নোত্তর বিনিময়" : "Daily Consults",
                val: "১,২০০+",
                icon: <MessageSquare className="w-4 h-4 text-amber-400" />,
              },
              {
                label: isBn ? "অ্যাক্সেস ফি" : "Access Fee",
                val: isBn ? "১০০% বিনামূল্যে" : "100% Free",
                icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/[0.05] flex items-center gap-3"
              >
                <div className="p-2 rounded-xl bg-slate-800/80 shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <span className="text-base font-extrabold text-white block">
                    {stat.val}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Filters Toolbar */}
      <section className="sticky top-16 z-30 bg-[#060a12]/95 backdrop-blur-xl border-b border-white/[0.07] py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Top Search + Division Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={
                  isBn
                    ? "ফসলের নাম বা রোগ লিখে খুঁজুন (যেমন: ব্লাস্ট, ল্যাম্পি স্কিন, চুনের পায়খানা, অ্যামোনিয়া...)"
                    : "Search symptoms, crops, or diseases (e.g. Blast, LSD, Gumboro, Ammonia)..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/[0.08] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Division Selector */}
            <div className="w-full sm:w-auto flex items-center gap-2 shrink-0">
              <div className="relative w-full sm:w-48">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-400" />
                <select
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/[0.08] text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {bangladeshDivisions.map((div) => (
                    <option key={div.id} value={div.id}>
                      {isBn ? div.bn : div.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Expert Answered Only Checkbox */}
              <button
                onClick={() => setExpertOnly(!expertOnly)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition shrink-0 ${
                  expertOnly
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "bg-slate-900 text-slate-400 border-white/[0.08] hover:text-white"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {isBn ? "শুধুমাত্র বিশেষজ্ঞের উত্তর" : "Expert Answered"}
                </span>
                <span className="sm:hidden">{isBn ? "বিশেষজ্ঞ" : "Expert"}</span>
              </button>
            </div>
          </div>

          {/* Bottom Sector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {[
              { id: "all", label: isBn ? "সকল প্রশ্ন" : "All Topics", icon: null },
              {
                id: "crops",
                label: isBn ? "মাঠফসল ও কৃষি" : "Crops & Agronomy",
                icon: <Wheat className="w-3.5 h-3.5 text-emerald-400" />,
              },
              {
                id: "dairy",
                label: isBn ? "ডেইরি ও গবাদিপশু" : "Dairy & Cattle",
                icon: <Milk className="w-3.5 h-3.5 text-cyan-400" />,
              },
              {
                id: "poultry",
                label: isBn ? "পোল্ট্রি ও মুরগি" : "Poultry Farming",
                icon: <Egg className="w-3.5 h-3.5 text-amber-400" />,
              },
              {
                id: "fisheries",
                label: isBn ? "মৎস্য ও পুকুর" : "Fisheries & Pond",
                icon: <Fish className="w-3.5 h-3.5 text-blue-400" />,
              },
              {
                id: "pets",
                label: isBn ? "পোষা প্রাণী" : "Pets",
                icon: <HeartHandshake className="w-3.5 h-3.5 text-pink-400" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSector(tab.id as CommunitySector | "all")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                  selectedSector === tab.id
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                    : "bg-slate-900/60 text-slate-400 hover:text-white border border-white/[0.05]"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Questions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <span>{isBn ? "সাম্প্রতিক প্রশ্নোত্তর" : "Recent Community Discussions"}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-mono">
              {filteredQuestions.length}
            </span>
          </h2>

          <span className="text-xs text-slate-400">
            {isBn ? "লাইভ আপডেট হচ্ছে" : "Updated in real-time"}
          </span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="rounded-3xl bg-slate-900/40 border border-white/[0.08] p-12 text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">
              {isBn ? "কোনো প্রশ্ন পাওয়া যায়নি" : "No Questions Found"}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {isBn
                ? "আপনার অনুসন্ধানের সাথে মিল রেখে কোনো প্রশ্ন মেলেনি। আপনি প্রথম ব্যক্তি হিসেবে নতুন প্রশ্ন পোস্ট করতে পারেন।"
                : "No community questions match your current search or filter criteria. Be the first to ask!"}
            </p>
            <button
              onClick={() => setIsAskModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
            >
              {isBn ? "নতুন প্রশ্ন করুন" : "Ask a New Question"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onOpenDetails={(q) => setActiveQuestion(q)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Global Modals for Community */}
      <AskQuestionModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
        onSubmitQuestion={handleAddNewQuestion}
      />

      <QuestionDetailModal
        question={activeQuestion}
        onClose={() => setActiveQuestion(null)}
      />
    </div>
  );
}
