"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Milk,
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
  X,
  Activity,
  Clock,
  Heart,
  Droplets,
} from "lucide-react";

export function DairyFarmerPanel() {
  const { currentUser, updateProfile, addEntity, updateEntity, deleteEntity } = useUserStore();
  const { getByUserRole } = useConsultationStore();
  const { getQuestionsByAuthor, deleteQuestion } = useCommunityStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const consultations = getByUserRole("livestock_farmer", currentUser.id);
  const myQuestions = getQuestionsByAuthor(currentUser.name);

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);

  // New Cattle Entity Modal State
  const [isAddCowModalOpen, setIsAddCowModalOpen] = useState(false);
  const [tagNumber, setTagNumber] = useState("");
  const [breed, setBreed] = useState("Holstein Friesian Cross (HF-75%)");
  const [lactationStage, setLactationStage] = useState("2nd Lactation • Day 85");
  const [dailyYield, setDailyYield] = useState("24 Liters/day");

  // Editing Entity State
  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [editEntityDetails, setEditEntityDetails] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, location });
    setIsProfileModalOpen(false);
  };

  const handleAddCow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagNumber.trim()) return;
    addEntity({
      name: `Cattle Ear-Tag #${tagNumber.trim().toUpperCase()}`,
      type: "livestock",
      details: `${breed} • ${lactationStage} • Yield: ${dailyYield}`,
      icon: "Milk",
    });
    setTagNumber("");
    setIsAddCowModalOpen(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Dairy Producer Overview Strip */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-[#040911] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cyan-500/60 shadow-lg shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {currentUser.roleLabel}
              </span>
              <span className="text-[11px] font-mono text-slate-400">ID: {currentUser.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentUser.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
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
            <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isBn ? "ডেইরি প্রোফাইল সম্পাদনা" : "Edit Dairy Profile"}</span>
          </button>

          <Link
            href="/consult?category=veterinary"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-black transition shadow-md shadow-cyan-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>{isBn ? "ভেটেরিনারি সার্জন (৳৩০০)" : "Book Tele-Vet (৳300)"}</span>
          </Link>
        </div>
      </div>

      {/* 2. Herd Key Performance Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Total Herd</span>
          <span className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5 block">28 Heads</span>
          <span className="text-[10px] text-cyan-400 font-medium">Holstein & Sahiwal</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Daily Parlor Yield</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5 block">640 Liters</span>
          <span className="text-[10px] text-slate-400 font-medium">Avg 22.8 L / cow</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">Somatic Cell Count</span>
          <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono mt-0.5 block">180K /ml</span>
          <span className="text-[10px] text-emerald-400 font-medium">Grade A Safe Milk</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
          <span className="text-[11px] uppercase font-bold text-slate-400 block font-mono">AI Breeding Due</span>
          <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-0.5 block">3 Cows</span>
          <span className="text-[10px] text-amber-300 font-medium">Standing Heat Window</span>
        </div>
      </div>

      {/* 3. Statutory Milk & Meat Withholding Tracker (MANDATORY FOOD SAFETY) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-slate-950 border border-amber-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>{isBn ? "বাধ্যতামূলক দুধ ও মাংস প্রত্যাহার অ্যালার্ট (Withholding Interval)" : "Active Statutory Milk Withdrawal Timer"}</span>
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
            BVC COMPLIANT
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {isBn
            ? "গাভী #HF-108-কে অ্যান্টিবায়োটিক ইনজেকশন দেওয়া হয়েছে। আগামী ৪৮ ঘণ্টা এর দুধ মিল্ক ভিটা বা খোলা বাজারে বিক্রয় সম্পূর্ণ নিষিদ্ধ।"
            : "Cow #HF-108 received Ceftiofur sodium for acute mastitis. Milk from this animal must NOT be sold or pooled for the next 48 hours to protect consumers from antibiotic residue."}
        </p>
      </div>

      {/* 4. Registered Animals & Ear-Tag Registry (EDITABLE) */}
      <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Milk className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm sm:text-base font-black text-white">
              {isBn ? "নিবন্ধিত গবাদিপশু ও কানের ট্যাগ রেজিস্ট্রি" : "Registered Cattle & Ear-Tag Dossier"}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold font-mono">
              {currentUser.registeredEntities?.length || 0} Listed
            </span>
          </div>

          <button
            onClick={() => setIsAddCowModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isBn ? "নতুন পশু নথিভুক্ত করুন" : "Add Cattle Ear-Tag"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(currentUser.registeredEntities || []).map((ent) => {
            const isEditing = editingEntityId === ent.id;
            return (
              <div
                key={ent.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.06] hover:border-cyan-500/30 transition flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <Milk className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-white">{ent.name}</h3>
                        <span className="text-[10px] uppercase font-mono text-cyan-400 tracking-wider">
                          DLS Microchipped / Ear-Tagged
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          if (isEditing) {
                            updateEntity(ent.id, { details: editEntityDetails });
                            setEditingEntityId(null);
                          } else {
                            setEditingEntityId(ent.id);
                            setEditEntityDetails(ent.details);
                          }
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-cyan-400 transition"
                      >
                        {isEditing ? <Save className="w-3.5 h-3.5 text-cyan-400" /> : <Edit2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(isBn ? "নথিটি মুছে ফেলতে চান?" : "Delete record?")) {
                            deleteEntity(ent.id);
                          }
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-400 transition"
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
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/40 text-white text-xs"
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 mt-2 font-mono leading-relaxed">
                      {ent.details}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/[0.04] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-cyan-400" />
                    <span>Lactation: Active Stage</span>
                  </span>
                  <Link
                    href={`/consult?category=veterinary`}
                    className="text-cyan-400 hover:text-cyan-300 font-bold"
                  >
                    Clinical Triage &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Veterinary Consultations & Chamber Pass */}
      <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-black text-white">
              {isBn ? "ভেটেরিনারি টেলি-মেডিসিন ও লাইভ চেম্বার হিস্ট্রি" : "Veterinary Tele-Health Consultations & Prescriptions"}
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
                    <span className="text-xs font-mono font-bold text-cyan-400">{c.caseNumber}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">{formatDate(c.createdAt)}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-300 font-semibold">{c.serviceName}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white mt-1">
                    Doctor: {c.expert.name} ({c.expert.title})
                  </h3>
                  {c.prescription && (
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-cyan-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Rx: {c.prescription.diagnosisTitle}</span>
                      <span className="text-amber-400 font-mono font-bold">
                        ⚠️ Withholding: {c.prescription.medicationsOrSprays[0]?.withholdingSafetyPeriod}
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
            {isBn ? "এখনও কোনো কনসালটেশন রেকর্ড নেই।" : "No consultations recorded yet."}
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-cyan-500/30 p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-cyan-400" />
                <span>{isBn ? "ডেইরি প্রোফাইল সম্পাদনা" : "Edit Dairy Profile"}</span>
              </h3>
              <button onClick={() => setIsProfileModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Farmer / Producer Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Mobile Number:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Dairy Location & Shed Address:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
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
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Cow Modal */}
      {isAddCowModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-cyan-500/30 p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>{isBn ? "নতুন গাভী / বকনা নথিভুক্ত করুন" : "Register Cattle Ear-Tag"}</span>
              </h3>
              <button onClick={() => setIsAddCowModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleAddCow} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Ear-Tag ID / নাম:</label>
                <input
                  type="text"
                  placeholder="e.g. HF-204 বা লাল বাহাদুর"
                  value={tagNumber}
                  onChange={(e) => setTagNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Breed (জাত):</label>
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Lactation Stage / বয়স:</label>
                <input
                  type="text"
                  value={lactationStage}
                  onChange={(e) => setLactationStage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Daily Milk Yield (দৈনিক দুধ):</label>
                <input
                  type="text"
                  value={dailyYield}
                  onChange={(e) => setDailyYield(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCowModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold"
                >
                  Save Cattle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
