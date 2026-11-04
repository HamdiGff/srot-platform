"use client";

import React from "react";
import { useUserStore } from "@/lib/store/userStore";
import { PortalRoleBar } from "@/components/portal/PortalRoleBar";
import { CropFarmerPanel } from "@/components/portal/CropFarmerPanel";
import { DairyFarmerPanel } from "@/components/portal/DairyFarmerPanel";
import { PetParentPanel } from "@/components/portal/PetParentPanel";

export default function FarmerPortalPage() {
  const { currentRole } = useUserStore();

  return (
    <div className="w-full srot-glow-mesh py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <PortalRoleBar />
      <main className="w-full">
        {currentRole === "livestock_farmer" ? (
          <DairyFarmerPanel />
        ) : currentRole === "pet_owner" ? (
          <PetParentPanel />
        ) : (
          <CropFarmerPanel />
        )}
      </main>
    </div>
  );
}
