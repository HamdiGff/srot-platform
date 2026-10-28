import React, { Suspense } from "react";
import { ConsultationRoomClient } from "./ConsultationRoomClient";
import { INITIAL_CONSULTATIONS } from "@/data/mockConsultations";

interface ConsultationPageProps {
  params: Promise<{ id: string }>;
}

export const instant = false;

export function generateStaticParams() {
  return INITIAL_CONSULTATIONS.map((c) => ({ id: c.id }));
}

export default async function ConsultationPage({ params }: ConsultationPageProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading consultation room...</div>}>
      <ConsultationRoomClient consultationId={id} />
    </Suspense>
  );
}
