"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatDate } from "@/lib/utils";
import {
  HeartHandshake,
  MapPin,
  Phone,
  Edit2,
  Plus,
  Trash2,
  Save,
  CalendarCheck,
  FileText,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  X,
  Heart,
  Activity,
  Calculator,
} from "lucide-react";

export function PetParentPanel() {
  const { currentUser, updateProfile, addEntity, updateEntity, deleteEntity } = useUserStore();
  const { getByUserRole } = useConsultationStore();
  const { getQuestionsByAuthor, deleteQuestion } = useCommunityStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const consultations = getByUserRole("pet_owner", currentUser.id);
  const myQuestions = getQuestionsByAuthor(currentUser.name);

  // Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState(currentUser.location);

  // New Pet Entity Modal State
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);
  const [petName, setPetName] = useState("");
  const [speciesBreed, setSpeciesBreed] = useState("Dog • Golden Retriever");
  const [ageWeight, setAgeWeight] = useState("2.5 yrs • 28 kg");
  const [vaccineStatus, setVaccineStatus] = useState("Rabies & DHPP Valid");

  // Editing Entity State
  const [editingEntityId, setEditingEntityId] = useState<string | null>(null);
  const [editEntityDetails, setEditEntityDetails] = useState("");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, location });
    setIsProfileModalOpen(false);
  };

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim()) return;
    addEntity({
      name: petName.trim(),
      type: "pet",
      details: `${speciesBreed} • ${ageWeight} • ${vaccineStatus}`,
      icon: "HeartHandshake",
    });
    setPetName("");
    setIsAddPetModalOpen(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Pet Parent Header Strip */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-7 border border-pink-500/20 bg-gradient-to-r from-pink-950/30 via-slate-900 to-[#0d0912] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-pink-500/60 shadow-lg shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30">
                {currentUser.roleLabel}
              </span>
              <span className="text-[11px] font-mono text-slate-400">Passport #{currentUser.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
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
            <Edit2 className="w-3.5 h-3.5 text-pink-400" />
            <span>{isBn ? "প্রোফাইল সম্পাদনা" : "Edit Parent Profile"}</span>
          </button>

          <Link
            href="/consult?category=pet"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-slate-950 text-xs font-black transition shadow-md shadow-pink-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>{isBn ? "পেট কনসালটেশন (৳২০০)" : "Book Pet Tele-Vet (৳200)"}</span>
          </Link>
        </div>
      </div>

      {/* 2. Registered Companion Pets & Vaccine Passports (EDITABLE) */}
      <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400" />
            <h2 className="text-sm sm:text-base font-black text-white">
              {isBn ? "পোষা প্রাণীর পাসপোর্ট ও ভ্যাকসিনেশন ট্র্যাকার" : "Registered Pets & Health Passports"}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold font-mono">
              {currentUser.registeredEntities?.length || 0} Pets
            </span>
          </div>

          <button
            onClick={() => setIsAddPetModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 text-pink-300 border border-pink-500/30 text-xs font-bold transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isBn ? "নতুন পেট যুক্ত করুন" : "Add Pet"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(currentUser.registeredEntities || []).map((pet) => {
            const isEditing = editingEntityId === pet.id;
            return (
              <div
                key={pet.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-white/[0.06] hover:border-pink-500/30 transition flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
                        <HeartHandshake className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-white">{pet.name}</h3>
                        <span className="text-[10px] uppercase font-mono text-pink-400 tracking-wider">
                          Verified Companion Pet
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          if (isEditing) {
                            updateEntity(pet.id, { details: editEntityDetails });
                            setEditingEntityId(null);
                          } else {
                            setEditingEntityId(pet.id);
                            setEditEntityDetails(pet.details);
                          }
                        }}
                        className="p-1 rounded-lg text-slate-400 hover:text-pink-400 transition"
                      >
                        {isEditing ? <Save className="w-3.5 h-3.5 text-pink-400" /> : <Edit2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(isBn ? "পেট প্রোফাইল মুছে ফেলতে চান?" : "Delete pet profile?")) {
                            deleteEntity(pet.id);
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
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-pink-500/40 text-white text-xs"
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 mt-2 font-mono leading-relaxed">
                      {pet.details}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/[0.04] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    <span>Rabies Vaccine: Active</span>
                  </span>
                  <Link
                    href={`/consult?category=pet`}
                    className="text-pink-400 hover:text-pink-300 font-bold"
                  >
                    Consult Doctor &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Pet Prescriptions & Chamber History */}
      <div className="srot-glass-card rounded-2xl p-6 border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-pink-400" />
            <h2 className="text-sm sm:text-base font-black text-white">
              {isBn ? "পেট প্রেসক্রিপশন ও ক্লিনিকাল হিস্ট্রি" : "Veterinary Prescriptions & Dosage Guidelines"}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {consultations.length} Cases
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
                    <span className="text-xs font-mono font-bold text-pink-400">{c.caseNumber}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400">{formatDate(c.createdAt)}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-300 font-semibold">{c.serviceName}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white mt-1">
                    Clinician: {c.expert.name} ({c.expert.title})
                  </h3>
                  {c.prescription && (
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-pink-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
                      <span>Rx: {c.prescription.diagnosisTitle}</span>
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
            {isBn ? "এখনও কোনো কনসালটেশন রেকর্ড নেই।" : "No pet consultations booked yet."}
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-pink-500/30 p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-pink-400" />
                <span>{isBn ? "পেট অভিভাবক প্রোফাইল" : "Edit Pet Parent Profile"}</span>
              </h3>
              <button onClick={() => setIsProfileModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Guardian Full Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Contact Phone:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Home Address (City/Area):</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
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
                  className="px-5 py-2 rounded-xl bg-pink-500 text-slate-950 font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Pet Modal */}
      {isAddPetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#090f19] border border-pink-500/30 p-6 space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-pink-400" />
                <span>{isBn ? "নতুন পেট পাসপোর্ট নিবন্ধন" : "Register New Pet"}</span>
              </h3>
              <button onClick={() => setIsAddPetModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleAddPet} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Pet Name (নাম):</label>
                <input
                  type="text"
                  placeholder="e.g. Leo / ক্লিও"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Species & Breed (প্রজাতি ও জাত):</label>
                <input
                  type="text"
                  value={speciesBreed}
                  onChange={(e) => setSpeciesBreed(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Age & Body Weight:</label>
                <input
                  type="text"
                  value={ageWeight}
                  onChange={(e) => setAgeWeight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Vaccine Status:</label>
                <input
                  type="text"
                  value={vaccineStatus}
                  onChange={(e) => setVaccineStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-pink-500"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPetModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-500 text-slate-950 font-bold"
                >
                  Save Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
