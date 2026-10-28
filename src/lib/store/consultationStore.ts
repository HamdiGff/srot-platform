import { create } from "zustand";
import { ConsultationRecord, INITIAL_CONSULTATIONS, PrescriptionRecord } from "@/data/mockConsultations";
import { ConsultationChannel, ServiceCategory } from "@/data/mockServices";

interface NewConsultationInput {
  category: ServiceCategory;
  serviceId: string;
  serviceName: string;
  channel: ConsultationChannel;
  farmerOrOwner: {
    id: string;
    name: string;
    role: "farmer" | "livestock_farmer" | "pet_owner";
    phone: string;
    location: string;
    subjectName: string;
    subjectAgeOrStage: string;
    areaOrHerdSize: string;
  };
  expert: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    regNumber: string;
  };
  symptomsDescription: string;
  uploadedPhotos: string[];
  scheduledDateTime: string;
  feePaid: number;
}

interface ConsultationState {
  consultations: ConsultationRecord[];
  addConsultation: (input: NewConsultationInput) => ConsultationRecord;
  updateStatus: (id: string, status: ConsultationRecord["status"]) => void;
  attachPrescription: (id: string, prescription: PrescriptionRecord) => void;
  getById: (id: string) => ConsultationRecord | undefined;
  getByUserRole: (role: string) => ConsultationRecord[];
}

export const useConsultationStore = create<ConsultationState>((set, get) => ({
  consultations: INITIAL_CONSULTATIONS,

  addConsultation: (input: NewConsultationInput) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = input.category === "agri" ? "AG" : input.category === "veterinary" ? "VT" : "PT";
    const caseNumber = `SROT-${prefix}-2026-${randomSuffix}`;
    const newId = `consult-${Date.now()}`;

    const newRecord: ConsultationRecord = {
      id: newId,
      caseNumber,
      category: input.category,
      serviceId: input.serviceId,
      serviceName: input.serviceName,
      channel: input.channel,
      status: "pending_review",
      feePaid: input.feePaid,
      createdAt: new Date().toISOString(),
      scheduledDateTime: input.scheduledDateTime || new Date().toISOString(),
      farmerOrOwner: input.farmerOrOwner,
      expert: input.expert,
      symptomsDescription: input.symptomsDescription,
      uploadedPhotos: input.uploadedPhotos.length > 0
        ? input.uploadedPhotos
        : ["https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80"],
    };

    set((state) => ({
      consultations: [newRecord, ...state.consultations],
    }));

    return newRecord;
  },

  updateStatus: (id, status) => {
    set((state) => ({
      consultations: state.consultations.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    }));
  },

  attachPrescription: (id, prescription) => {
    set((state) => ({
      consultations: state.consultations.map((c) =>
        c.id === id ? { ...c, status: "completed", prescription } : c
      ),
    }));
  },

  getById: (id) => {
    return get().consultations.find((c) => c.id === id || c.caseNumber === id);
  },

  getByUserRole: (role) => {
    const all = get().consultations;
    if (role === "admin") return all;
    if (role === "expert_agronomist") {
      return all.filter((c) => c.category === "agri");
    }
    if (role === "veterinarian") {
      return all.filter((c) => c.category === "veterinary" || c.category === "pet");
    }
    if (role === "pet_owner") {
      return all.filter((c) => c.category === "pet");
    }
    if (role === "livestock_farmer") {
      return all.filter((c) => c.category === "veterinary");
    }
    return all.filter((c) => c.category === "agri");
  },
}));
