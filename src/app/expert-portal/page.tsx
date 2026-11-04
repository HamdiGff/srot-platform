"use client";

import React from "react";
import { useUserStore } from "@/lib/store/userStore";
import { PortalRoleBar } from "@/components/portal/PortalRoleBar";
import { AgronomistPanel } from "@/components/portal/AgronomistPanel";
import { VeterinarianPanel } from "@/components/portal/VeterinarianPanel";
import { FieldVendorPanel } from "@/components/portal/FieldVendorPanel";

export default function ExpertPortalPage() {
  const { currentRole } = useUserStore();

  return (
    <div className="w-full srot-glow-mesh py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <PortalRoleBar />
      <main className="w-full">
        {currentRole === "veterinarian" ? (
          <VeterinarianPanel />
        ) : currentRole === "field_vendor" ? (
          <FieldVendorPanel />
        ) : (
          <AgronomistPanel />
        )}
      </main>
    </div>
  );
}
