"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Wheat,
  MapPin,
  Phone,
  Edit2,
  Plus,
  Trash2,
  Save,
  CalendarCheck,
  FileText,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Sprout,
  X,
  Droplet,
  Layers,
} from "lucide-react";

export function CropFarmerPanel() {
  const { currentUser, updateProfile, addEntity, updateEntity, deleteEntity } = useUserStore();
  const { getByUserRole } = useConsultationStore();
  const { getQuestionsByAuthor, deleteQuestion } = useCommunityStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const consultations = getByUserRole("farmer", currentUser.id);
  const myQuestions = getQuestionsByAuthor(currentUser.name);

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);
  const [district, setDistrict] = useState(currentUser.district || "Bogura");

  // New Crop Entity Modal State
  const [isAddPlotModalOpen, setIsAddPlotModalOpen] = useState(false);
  const [plotName, setPlotName] = useState("");
  const [cropVariety, setCropVariety] = useState("");
  const [acreage, setAcreage] = useState("3.5 Acres");
  const [growthStage, setGrowthStage] = useState("Tillering / কুশি পর্যায়");

  // Editing Entity State
  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [editEntityDetails, setEditEntityDetails] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      location,
      district,
    });
    setIsProfileModalOpen(false);
  };

  const handleAddPlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plotName.trim()) return;
    addEntity({
      name: plotName.trim(),
      type: "crop",
      details: `${cropVariety || "BRRI Rice"} • ${acreage} • ${growthStage}`,
      icon: "Wheat",
    });
    setPlotName("");
    setCropVariety("");
    setIsAddPlotModalOpen(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Executive Crop Farmer Profile Strip */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-[#050c14] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500/60 shadow-lg shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {currentUser.roleLabel}
              </span>
              <span className="text-[11px] font-mono text-slate-400">ID: {currentUser.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentUser.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentUser.phone}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition shadow-sm"
          >
            <Edit2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isBn ? "প্রোফাইল সম্পাদনা" : "Edit Farm Profile"}</span>
          </button>

          <Link
            href="/consult?category=agri"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black transition shadow-md shadow-emerald-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>{isBn ? "কৃষিবিদ বুকিং (৳২০০)" : "Book Agronomist (৳200)"}</span>
          </Link>
        </div>
      </div>

      {/* 2. Registered Crop Plots & Land Holdings (EDITABLE) */}
      <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Wheat className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-black text-white">
              {isBn ? "নিবন্ধিত জমির প্লট ও ফসলের বিবরণ" : "Registered Land Holdings & Crop Plots"}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono">
              {currentUser.registeredEntities?.length || 0} Plots
            </span>
          </div>

          <button
            onClick={() => setIsAddPlotModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isBn ? "নতুন প্লট যোগ করুন" : "Add Crop Plot"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(currentUser.registeredEntities || []).map((plot) => {
            const isEditing = editingEntityId === plot.id;
            return (
              <div
                key={plot.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.06] hover:border-emerald-500/30 transition flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <Sprout className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-white">{plot.name}</h3>
                        <span className="text-[10px] uppercase font-mono text-emerald-400 tracking-wider">
                          Active Season
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          if (isEditing) {
                            updateEntity(plot.id, { details: editEntityDetails });
                            setEditingEntityId(null);
                          } else {
                            setEditingEntityId(plot.id);
                            setEditEntityDetails(plot.details);
                          }
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-emerald-400 transition"
                        title={isEditing ? "Save Plot" : "Edit Plot"}
                      >
                        {isEditing ? <Save className="w-3.5 h-3.5 text-emerald-400" /> : <Edit2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(isBn ? "প্লটটি মুছে ফেলতে চান?" : "Delete this plot?")) {
                            deleteEntity(plot.id);
                          }
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-400 transition"
                        title="Delete Plot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="mt-2.5">
                      <input
                        type="text"
                        value={editEntityDetails}
                        onChange={(e) => setEditEntityDetails(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-white text-xs"
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 mt-2 font-mono leading-relaxed">
                      {plot.details}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/[0.04] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Droplet className="w-3 h-3 text-cyan-400" />
                    <span>Canopy Moisture: 84%</span>
                  </span>
                  <Link
                    href={`/consult?category=agri`}
                    className="text-emerald-400 hover:text-emerald-300 font-bold"
                  >
                    Diagnose &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Official Crop Prescriptions & Triage Chamber Records */}
      <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm sm:text-base font-black text-white">
              {isBn ? "ডিএই অনুমোদিত প্রেসক্রিপশন ও টেলি-কনসালটেশন হিস্ট্রি" : "DAE Digital Prescriptions & Advisory Records"}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {consultations.length} Consultations
          </span>
        </div>

        {consultations.length > 0 ? (
          <div className="space-y-3">
            {consultations.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400">{c.caseNumber}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">{formatDate(c.createdAt)}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-300 font-semibold">{c.serviceName}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white mt-1">
                    Attending: {c.expert.name} ({c.expert.title})
                  </h3>
                  {c.prescription && (
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Rx: {c.prescription.diagnosisTitle}</span>
                      <span className="text-amber-400 font-mono">
                        (Withholding: {c.prescription.medicationsOrSprays[0]?.withholdingSafetyPeriod})
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/consult/${c.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/[0.1] text-xs font-bold transition"
                  >
                    Chamber Pass &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-xl bg-slate-950/40 border border-white/[0.04] text-slate-400 text-xs">
            {isBn ? "এখনও কোনো কনসালটেশন রেকর্ড নেই।" : "No consultations booked yet."}
          </div>
        )}
      </div>

      {/* 4. My Community Questions & Agronomy Peer Q&A */}
      <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-black text-white">
              {isBn ? "আমার পোস্টকৃত কমিউনিটি প্রশ্ন ও সমাধানসমূহ" : "My Community Questions & Peer Inquiries"}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 text-xs font-mono font-bold">
              {myQuestions.length}
            </span>
          </div>

          <Link
            href="/community"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-bold"
          >
            {isBn ? "কমিউনিটি ফোরামে যান &rarr;" : "Open Krishi Community &rarr;"}
          </Link>
        </div>

        {myQuestions.length > 0 ? (
          <div className="space-y-3">
            {myQuestions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.05] flex items-start justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    {q.cropOrAnimal} • {q.createdAt}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">{q.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{q.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                    <span className="text-emerald-400 font-semibold">{q.answers.length} Answers</span>
                    <span>•</span>
                    <span>{q.upvotes} Upvotes</span>
                    {q.isSolved && (
                      <span className="text-cyan-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Solved
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/community"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm(isBn ? "পোস্টটি মুছে ফেলতে চান?" : "Delete post?")) {
                        deleteQuestion(q.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center rounded-xl bg-slate-950/40 border border-white/[0.04] text-slate-400 text-xs">
            {isBn
              ? "আপনি এখনও কোনো কমিউনিটি প্রশ্ন পোস্ট করেননি।"
              : "You haven't posted any community questions yet."}
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-emerald-500/30 p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? "খামারি প্রোফাইল সম্পাদনা" : "Edit Farm Profile"}</span>
              </h3>
              <button onClick={() => setIsProfileModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Full Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Phone Number:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">District (জেলা):</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Farm Location & Land Info:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Plot Modal */}
      {isAddPlotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-emerald-500/30 p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? "নতুন জমির প্লট যোগ করুন" : "Add New Crop Plot"}</span>
              </h3>
              <button onClick={() => setIsAddPlotModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleAddPlot} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Plot Identifier / Name:</label>
                <input
                  type="text"
                  placeholder="e.g. উত্তর মাঠের ধানী জমি (North Field)"
                  value={plotName}
                  onChange={(e) => setPlotName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Crop Variety (জাত):</label>
                <input
                  type="text"
                  placeholder="e.g. BRRI Dhan-28 / পাইওনিয়ার হাইব্রিড ভুট্টা"
                  value={cropVariety}
                  onChange={(e) => setCropVariety(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Plot Size / Acreage:</label>
                <input
                  type="text"
                  value={acreage}
                  onChange={(e) => setAcreage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Current Growth Stage:</label>
                <select
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Seedbed / বীজতলা">Seedbed / বীজতলা</option>
                  <option value="Tillering / কুশি পর্যায়">Tillering / কুশি পর্যায়</option>
                  <option value="Panicle Initiation / থোড় পর্যায়">Panicle Initiation / থোড় পর্যায়</option>
                  <option value="Flowering / ফুল ফোটার সময়">Flowering / ফুল ফোটার সময়</option>
                  <option value="Maturity & Harvest / পরিপক্ক ও কর্তন">Maturity & Harvest / পরিপক্ক ও কর্তন</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPlotModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold"
                >
                  Add Plot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
