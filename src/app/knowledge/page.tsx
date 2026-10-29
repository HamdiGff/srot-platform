"use client";

import React, { useState } from "react";
import { KNOWLEDGE_ARTICLES } from "@/data/mockKnowledge";
import { KnowledgeCard } from "@/components/cards/KnowledgeCard";
import { useLanguageStore } from "@/lib/store/languageStore";
import { BookOpen, Search, Wheat, Milk, HeartHandshake, Sparkles } from "lucide-react";

export default function KnowledgeHubPage() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = KNOWLEDGE_ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === "all" || art.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full srot-glow-mesh py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isBn ? "বিজ্ঞানসম্মত জ্ঞানকোষ ও প্রোটোকল" : "Scientific Knowledge Repository"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {isBn ? "কৃষি ও ভেটেরিনারি বিজ্ঞান জ্ঞানভাণ্ডার" : "Agro-Veterinary Knowledge Hub"}
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          {isBn
            ? "বিএআরআই, বিআরআরআই ও বাংলাদেশ ভেটেরিনারি কাউন্সিল অনুমোদিত বিশেষজ্ঞদের দ্বারা রচিত মাঠ প্রোটোকল, রোগ দমন গাইড এবং জরুরি চিকিৎসা নির্দেশিকা।"
            : "Peer-reviewed field protocols, disease identification guides, and emergency outbreak management written by accredited agronomists and veterinary clinicians."}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="srot-glass-card rounded-2xl p-4 border border-slate-800 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isBn
                ? "ধানের ব্লাস্ট, ওলান পাকা সিএমটি, মুরগির হিট স্ট্রেস অনুসন্ধান করুন..."
                : "Search crop blast, mastitis CMT, poultry heat stress, pet itch..."
            }
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: isBn ? "সকল প্রোটোকল" : "All Protocols" },
            { id: "agri", label: isBn ? "ফসল ও বালাই" : "Crop Diseases", icon: <Wheat className="w-3.5 h-3.5" /> },
            { id: "veterinary", label: isBn ? "ডেইরি ও গবাদিপশু" : "Livestock Veterinary", icon: <Milk className="w-3.5 h-3.5" /> },
            { id: "pet", label: isBn ? "পোষা প্রাণী" : "Companion Pet Health", icon: <HeartHandshake className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                selectedCategory === tab.id
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60"
                  : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <KnowledgeCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400">
          <p className="text-sm">
            {isBn ? `"${searchQuery}" এর সাথে মিলে এমন কোনো প্রোটোকল পাওয়া যায়নি।` : `No protocols found matching "${searchQuery}".`}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-950/60"
          >
            {isBn ? "ফিল্টার রিসেট করুন" : "Clear Filters"}
          </button>
        </div>
      )}
    </div>
  );
}
