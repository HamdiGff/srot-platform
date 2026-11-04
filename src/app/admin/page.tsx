"use client";

import React from "react";
import { AdminPanel } from "@/components/portal/AdminPanel";
import { PortalRoleBar } from "@/components/portal/PortalRoleBar";

export default function AdminModularDashboardPage() {
  return (
    <div className="w-full srot-glow-mesh py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <PortalRoleBar />
      <main className="w-full">
        <AdminPanel />
      </main>
    </div>
  );
}
