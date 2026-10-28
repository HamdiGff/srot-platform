"use client";

import React, { useEffect, useRef } from "react";
import { useUserStore, UserRole } from "@/lib/store/userStore";
import { User, Wheat, Milk, HeartHandshake, ShieldCheck, Stethoscope, Sliders, X, Check } from "lucide-react";

export function RoleSwitcherModal() {
  const { isRoleModalOpen, closeRoleModal, currentRole, switchRole } = useUserStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isRoleModalOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isRoleModalOpen]);

  if (!isRoleModalOpen) return null;

  const roles: {
    role: UserRole;
    title: string;
    description: string;
    badge: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      role: "farmer",
      title: "Crop Farmer (Tariqul Islam)",
      description: "Owns 5.2 acres of rice paddy and maize. Submits leaf blight photos, books agronomist visits, downloads spray prescriptions.",
      badge: "Agriculture Producer",
      icon: <Wheat className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/30 hover:border-emerald-500 bg-emerald-950/20",
    },
    {
      role: "livestock_farmer",
      title: "Livestock Producer (Marcus Holloway)",
      description: "Manages 28 dairy cattle and 45 goats. Checks milk drop symptoms, mastitis CMT scoring, and herd biosecurity protocols.",
      badge: "Animal Healthcare",
      icon: <Milk className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/30 hover:border-cyan-500 bg-cyan-950/20",
    },
    {
      role: "pet_owner",
      title: "Companion Pet Parent (Jessica Miller)",
      description: "Cares for Golden Retriever 'Max' and cat 'Cleo'. Books 24/7 tele-vet video consultations for allergies and weight diets.",
      badge: "Pet Healthcare",
      icon: <HeartHandshake className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/30 hover:border-amber-500 bg-amber-950/20",
    },
    {
      role: "expert_agronomist",
      title: "Agronomist & Plant Doctor (Dr. Ramesh Patel)",
      description: "Certified plant pathologist. Reviews farmer photo submissions, diagnoses rice blast/blight, and issues digital chemical/bio spray advisories.",
      badge: "Expert Consultant",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/30 hover:border-emerald-500 bg-emerald-950/20",
    },
    {
      role: "veterinarian",
      title: "Veterinary Clinician (Dr. Ananya Sen)",
      description: "Bovine & small animal vet. Conducts live video calls, prescribes antibiotics with strict milk/meat withholding periods.",
      badge: "Licensed Veterinarian",
      icon: <Stethoscope className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/30 hover:border-cyan-500 bg-cyan-950/20",
    },
    {
      role: "admin",
      title: "Platform Administrator",
      description: "Controls modular system toggles (enable/disable Animal Health, Pet Care, Marketplace preview) and monitors platform-wide KPIs.",
      badge: "System Controller",
      icon: <Sliders className="w-5 h-5 text-purple-400" />,
      color: "border-purple-500/30 hover:border-purple-500 bg-purple-950/20",
    },
  ];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="role-modal-title"
      onCancel={(e) => {
        e.preventDefault();
        closeRoleModal();
      }}
      className="fixed inset-0 m-auto z-50 p-0 rounded-2xl bg-slate-900 text-slate-100 border border-slate-700/80 shadow-2xl max-w-2xl w-[94vw] backdrop:bg-black/75"
    >
      <div className="p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <User className="w-5 h-5" />
              </span>
              <h2 id="role-modal-title" className="text-xl font-bold text-white">
                Switch Platform Persona
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Experience the SROT service platform from the perspective of different users in the ecosystem.
            </p>
          </div>
          <button
            onClick={closeRoleModal}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Close role modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 max-h-[65vh] overflow-y-auto pr-1">
          {roles.map((item) => {
            const isSelected = currentRole === item.role;
            return (
              <button
                key={item.role}
                onClick={() => switchRole(item.role)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-500/40"
                    : item.color
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-md bg-slate-800/80">
                        {item.icon}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                        {item.badge}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Click to switch</span>
                  <span className="font-medium text-emerald-400">Switch &rarr;</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Active Role: <strong className="text-emerald-400">{currentRole.toUpperCase().replace("_", " ")}</strong></span>
          <button
            onClick={closeRoleModal}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    </dialog>
  );
}
