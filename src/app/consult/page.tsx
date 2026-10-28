import React, { Suspense } from "react";
import { ConsultationBookingEngine } from "@/components/consultation/ConsultationBookingEngine";
import { ServiceCategory } from "@/data/mockServices";
import { Sparkles } from "lucide-react";

interface ConsultPageProps {
  searchParams: Promise<{
    service?: string;
    expert?: string;
    category?: string;
  }>;
}

export const instant = false;

export default async function ConsultPage({ searchParams }: ConsultPageProps) {
  const params = await searchParams;
  const initialServiceId = params.service;
  const initialExpertId = params.expert;
  const initialCategory = (params.category as ServiceCategory) || "agri";

  return (
    <div className="w-full srot-glow-mesh py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Unified Advisory Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Book Tele-Advisory & Clinical Consultation
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          One standardized booking workflow across Crop Disease, Fertilizer Advice, Bovine Medicine, and Companion Pet Healthcare.
        </p>
      </div>

      {/* Booking Engine */}
      <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading booking engine...</div>}>
        <ConsultationBookingEngine
          initialServiceId={initialServiceId}
          initialExpertId={initialExpertId}
          initialCategory={initialCategory}
        />
      </Suspense>
    </div>
  );
}
