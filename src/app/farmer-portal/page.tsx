"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/userStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { ConsultationCard } from "@/components/cards/ConsultationCard";
import {
  Wheat,
  Milk,
  HeartHandshake,
  Plus,
  CalendarCheck,
  AlertTriangle,
  FileCheck2,
  MapPin,
  Phone,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function FarmerPortalPage() {
  const { currentUser, currentRole, openRoleModal } = useUserStore();
  const { getByUserRole } = useConsultationStore();

  const userConsultations = getByUserRole(currentRole);

  const [entities, setEntities] = useState(currentUser.registeredEntities);
  const [isAddingEntity, setIsAddingEntity] = useState(false);
  const [newEntityName, setNewEntityName] = useState("");
  const [newEntityDetails, setNewEntityDetails] = useState("");

  const handleAddEntity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntityName.trim()) return;

    const newEnt = {
      id: `ent-${Date.now()}`,
      name: newEntityName,
      type: (currentRole === "pet_owner" ? "pet" : currentRole === "livestock_farmer" ? "livestock" : "crop") as any,
      details: newEntityDetails || "Registered profile on SROT Platform",
      icon: currentRole === "pet_owner" ? "HeartHandshake" : currentRole === "livestock_farmer" ? "Milk" : "Wheat",
    };

    setEntities([...entities, newEnt]);
    setNewEntityName("");
    setNewEntityDetails("");
    setIsAddingEntity(false);
  };

  const isPetOwner = currentRole === "pet_owner";
  const isLivestock = currentRole === "livestock_farmer";

  return (
    <div className="w-full srot-glow-mesh py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Profile Overview Header */}
      <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-700 shadow-xl"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {currentUser.roleLabel}
              </span>
              <button
                onClick={openRoleModal}
                className="text-xs text-slate-400 hover:text-white underline underline-offset-2 transition"
              >
                Switch Role Persona
              </button>
            </div>
            <h1 className="text-2xl font-black text-white">{currentUser.name}</h1>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentUser.location}</span>
              <span>•</span>
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.phone}</span>
            </p>
          </div>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/consult"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-950/60"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book New Consultation</span>
          </Link>
        </div>
      </div>

      {/* Registered Assets / Farms / Pets section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">
              {isPetOwner ? "My Registered Pets" : isLivestock ? "My Registered Herds & Livestock" : "My Registered Crops & Farm Plots"}
            </h2>
            <p className="text-xs text-slate-400">
              Profiles linked to your SROT tele-advisory account.
            </p>
          </div>

          <button
            onClick={() => setIsAddingEntity(!isAddingEntity)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-semibold transition"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isPetOwner ? "Add Pet" : "Add Farm Plot / Herd"}</span>
          </button>
        </div>

        {/* Add Entity Form Toggle */}
        {isAddingEntity && (
          <form
            onSubmit={handleAddEntity}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 mb-4 space-y-3"
          >
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Register New {isPetOwner ? "Pet" : isLivestock ? "Herd" : "Crop Field"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                placeholder={isPetOwner ? "Pet Name & Breed (e.g. Bella, French Bulldog)" : "Plot Name & Crop (e.g. South Paddy Plot C, 4 Acres)"}
                value={newEntityName}
                onChange={(e) => setNewEntityName(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                required
              />
              <input
                type="text"
                placeholder="Details (e.g. Age, Sowing Date, Acreage, Microchip ID)"
                value={newEntityDetails}
                onChange={(e) => setNewEntityDetails(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingEntity(false)}
                className="px-3 py-1.5 rounded-lg text-slate-400 text-xs hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
              >
                Save Profile
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entities.map((ent) => (
            <div
              key={ent.id}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-slate-800 text-emerald-400">
                  {ent.type === "pet" ? (
                    <HeartHandshake className="w-5 h-5 text-amber-400" />
                  ) : ent.type === "livestock" ? (
                    <Milk className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <Wheat className="w-5 h-5 text-emerald-400" />
                  )}
                </span>
                <div>
                  <h4 className="font-bold text-white text-xs">{ent.name}</h4>
                  <p className="text-[11px] text-slate-400">{ent.details}</p>
                </div>
              </div>

              <Link
                href={`/consult?category=${ent.type === "pet" ? "pet" : ent.type === "livestock" ? "veterinary" : "agri"}`}
                className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300"
              >
                Consult &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Consultations & Rx History */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">
            Consultation Cases & Prescriptions ({userConsultations.length})
          </h2>
          <p className="text-xs text-slate-400">
            Real-time status, live triage room passes, and downloadable official prescriptions.
          </p>
        </div>

        {userConsultations.length > 0 ? (
          <div className="space-y-4">
            {userConsultations.map((c) => (
              <ConsultationCard key={c.id} consultation={c} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
            <p className="text-sm">No consultations found for this persona.</p>
            <Link
              href="/consult"
              className="inline-block mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              Book First Consultation
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
