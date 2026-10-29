import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  ConsultationRecord,
  INITIAL_CONSULTATIONS,
  PrescriptionRecord,
  ChatMessage,
} from "@/data/mockConsultations";
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

export interface SendMessageInput {
  text: string;
  senderId: string;
  senderName: string;
  senderRole:
    | "farmer"
    | "livestock_farmer"
    | "pet_owner"
    | "expert_agronomist"
    | "veterinarian"
    | "field_vendor"
    | "admin"
    | "system";
  attachments?: string[];
}

interface ConsultationState {
  consultations: ConsultationRecord[];
  addConsultation: (input: NewConsultationInput) => ConsultationRecord;
  updateStatus: (id: string, status: ConsultationRecord["status"]) => void;
  attachPrescription: (id: string, prescription: PrescriptionRecord) => void;
  sendMessage: (consultationId: string, message: SendMessageInput) => void;
  getById: (id: string) => ConsultationRecord | undefined;
  getByUserRole: (role: string, userId?: string) => ConsultationRecord[];
  resetConsultationsToInitial: () => void;
}

export const useConsultationStore = create<ConsultationState>()(
  persist(
    (set, get) => ({
      consultations: INITIAL_CONSULTATIONS,

      addConsultation: (input: NewConsultationInput) => {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const prefix = input.category === "agri" ? "AG" : input.category === "veterinary" ? "VT" : "PT";
        const caseNumber = `SROT-${prefix}-2026-${randomSuffix}`;
        const newId = `consult-${Date.now()}`;
        const now = new Date().toISOString();

        const initialMessages: ChatMessage[] = [
          {
            id: `msg-${Date.now()}-sys`,
            senderId: "system",
            senderName: "SROT Triage Engine",
            senderRole: "system",
            text: `Consultation ticket #${caseNumber} initialized. Direct encrypted channel established with ${input.expert.name}.`,
            timestamp: now,
          },
          {
            id: `msg-${Date.now()}-client`,
            senderId: input.farmerOrOwner.id,
            senderName: input.farmerOrOwner.name,
            senderRole: input.farmerOrOwner.role,
            text: input.symptomsDescription,
            timestamp: now,
            attachments: input.uploadedPhotos.length > 0 ? input.uploadedPhotos : undefined,
          },
          {
            id: `msg-${Date.now()}-doc-auto`,
            senderId: input.expert.id,
            senderName: input.expert.name,
            senderRole: input.category === "agri" ? "expert_agronomist" : "veterinarian",
            text: `Hello ${input.farmerOrOwner.name}! I have received your case for ${input.farmerOrOwner.subjectName} and am reviewing the clinical intake details now.`,
            timestamp: new Date(Date.now() + 1500).toISOString(),
          },
        ];

        const newRecord: ConsultationRecord = {
          id: newId,
          caseNumber,
          category: input.category,
          serviceId: input.serviceId,
          serviceName: input.serviceName,
          channel: input.channel,
          status: "pending_review",
          feePaid: input.feePaid,
          createdAt: now,
          scheduledDateTime: input.scheduledDateTime || now,
          farmerOrOwner: input.farmerOrOwner,
          expert: input.expert,
          symptomsDescription: input.symptomsDescription,
          uploadedPhotos:
            input.uploadedPhotos.length > 0
              ? input.uploadedPhotos
              : ["https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80"],
          messages: initialMessages,
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
        const now = new Date().toISOString();
        set((state) => ({
          consultations: state.consultations.map((c) => {
            if (c.id !== id) return c;
            const updatedMessages: ChatMessage[] = [
              ...(c.messages || []),
              {
                id: `msg-rx-${Date.now()}`,
                senderId: "system",
                senderName: "SROT Prescription Verification",
                senderRole: "system",
                text: `📋 Official Digital Prescription (Rx: ${prescription.diagnosisTitle}) has been authorized and issued by ${c.expert.name}. Printable PDF and certified dosage plan are ready below.`,
                timestamp: now,
              },
            ];
            return {
              ...c,
              status: "completed",
              prescription,
              messages: updatedMessages,
            };
          }),
        }));
      },

      sendMessage: (consultationId: string, messageInput: SendMessageInput) => {
        const newMsg: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          senderId: messageInput.senderId,
          senderName: messageInput.senderName,
          senderRole: messageInput.senderRole,
          text: messageInput.text,
          timestamp: new Date().toISOString(),
          attachments: messageInput.attachments,
        };

        set((state) => ({
          consultations: state.consultations.map((c) => {
            if (c.id !== consultationId) return c;
            return {
              ...c,
              messages: [...(c.messages || []), newMsg],
              status: c.status === "pending_review" ? "in_progress" : c.status,
            };
          }),
        }));
      },

      getById: (id) => {
        return get().consultations.find((c) => c.id === id || c.caseNumber === id);
      },

      getByUserRole: (role, userId) => {
        const all = get().consultations;
        if (role === "admin") return all;

        // If specific user ID provided, match directly
        if (userId) {
          const directUserMatches = all.filter(
            (c) => c.farmerOrOwner.id === userId || c.expert.id === userId
          );
          if (directUserMatches.length > 0) return directUserMatches;
        }

        // Role-based discipline fallback
        if (role === "expert_agronomist") {
          return all.filter((c) => c.category === "agri" || c.expert.id === "exp-dr-ramesh-patel");
        }
        if (role === "veterinarian") {
          return all.filter(
            (c) =>
              c.category === "veterinary" ||
              c.category === "pet" ||
              c.expert.id === "exp-dr-ananya-sen"
          );
        }
        if (role === "pet_owner") {
          return all.filter((c) => c.category === "pet" || c.farmerOrOwner.id === "usr-pet-01");
        }
        if (role === "livestock_farmer") {
          return all.filter(
            (c) => c.category === "veterinary" || c.farmerOrOwner.id === "usr-farmer-02"
          );
        }
        return all.filter((c) => c.category === "agri" || c.farmerOrOwner.id === "usr-farmer-01");
      },

      resetConsultationsToInitial: () => {
        set({ consultations: INITIAL_CONSULTATIONS });
      },
    }),
    {
      name: "srot_consultation_store_v2",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
