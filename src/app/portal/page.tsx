"use client";

import React from "react";
import { useUserStore } from "@/lib/store/userStore";
import { useLanguageStore } from "@/lib/store/languageStore";
import { PortalRoleBar } from "@/components/portal/PortalRoleBar";
import { CropFarmerPanel } from "@/components/portal/CropFarmerPanel";
import { DairyFarmerPanel } from "@/components/portal/DairyFarmerPanel";
import { PetParentPanel } from "@/components/portal/PetParentPanel";
import { AgronomistPanel } from "@/components/portal/AgronomistPanel";
import { VeterinarianPanel } from "@/components/portal/VeterinarianPanel";
import { FieldVendorPanel } from "@/components/portal/FieldVendorPanel";
import { AdminPanel } from "@/components/portal/AdminPanel";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function UnifiedPortalPage() {
  const { currentRole, currentUser } = useUserStore();
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  return (
    <div className="w-full srot-glow-mesh py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* 1. Universal Role Persona Switcher (Allows instant testing of all 7 portals) */}
      <PortalRoleBar />

      {/* 2. Dynamically Rendered Dedicated Portal for the Active Persona */}
      <main className="w-full transition-all duration-300">
        {currentRole === "farmer" && <CropFarmerPanel />}
        {currentRole === "livestock_farmer" && <DairyFarmerPanel />}
        {currentRole === "pet_owner" && <PetParentPanel />}
        {currentRole === "expert_agronomist" && <AgronomistPanel />}
        {currentRole === "veterinarian" && <VeterinarianPanel />}
        {currentRole === "field_vendor" && <FieldVendorPanel />}
        {currentRole === "admin" && <AdminPanel />}
      </main>
    </div>
  );
}
