"use client";

import React, { useState } from "react";
import { PLATFORM_EXPERTS } from "@/data/mockExperts";
import { ExpertCard } from "@/components/cards/ExpertCard";
import { ShieldCheck, Search, Users, Wheat, Milk, HeartHandshake } from "lucide-react";

export default function ExpertsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExperts = PLATFORM_EXPERTS.filter((exp) => {
    const matchesCat = selectedCategory === "all" || exp.primaryCategory === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      exp.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full srot-glow-mesh py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Accredited Practitioner Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Plant Pathologists, Agronomists & Veterinarians
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          Every practitioner on SROT is certified and verified by national agricultural and veterinary councils. Book direct one-on-one video appointments or rapid photo reviews.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="srot-glass-card rounded-2xl p-4 border border-slate-800 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by doctor name, specialty, or language..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All Practitioners" },
            { id: "agri", label: "Crop Pathologists", icon: <Wheat className="w-3.5 h-3.5" /> },
            { id: "veterinary", label: "Livestock & Herd Vets", icon: <Milk className="w-3.5 h-3.5" /> },
            { id: "pet", label: "Companion Pet Vets", icon: <HeartHandshake className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                selectedCategory === tab.id
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950/60"
                  : "bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredExperts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400">
          <p className="text-sm">No specialists found matching &quot;{searchQuery}&quot;.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-3 px-4 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
