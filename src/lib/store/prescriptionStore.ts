import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useConsultationStore } from "./consultationStore";
import { useOrderStore } from "./orderStore";

export interface PrescriptionItem {
  id: string; // e.g. "RX-DAE-2026-101"
  caseId?: string; // Linked consultation case ID e.g. "consult-agri-101"
  orderId?: string; // Linked order ID
  category: "agri" | "veterinary" | "pet" | "poultry" | "fisheries";
  patientOrFarmer: {
    id: string;
    name: string;
    role: "farmer" | "livestock_farmer" | "pet_owner";
    phone?: string;
    location: string;
    subjectName: string; // e.g. "BRRI Dhan-28 Paddy"
    varietyOrBreed?: string;
  };
  specialist: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    regNumber: string;
    council: "DAE" | "BVC" | "DoF";
  };
  diagnosisTitle: string;
  pathogenOrCause: string;
  severity: "Mild" | "Moderate" | "Severe" | "Critical";
  treatmentSteps: string[];
  medicationsOrSprays: {
    item: string;
    activeIngredient: string;
    dosage: string;
    frequencyAndDuration: string;
    withholdingSafetyPeriod: string;
  }[];
  preventiveAdvice: string;
  followUpDate: string;
  prescribedAt: string;
  updatedAt?: string;
  revisionCount: number; // 1 = original, 2 = rev 1, etc.
  revisionNotes?: {
    timestamp: string;
    note: string;
    authorName: string;
  }[];
  status: "active" | "revised" | "completed" | "cancelled";
}

export interface CreatePrescriptionInput {
  caseId?: string;
  category: "agri" | "veterinary" | "pet" | "poultry" | "fisheries";
  patientOrFarmer: PrescriptionItem["patientOrFarmer"];
  specialist: PrescriptionItem["specialist"];
  diagnosisTitle: string;
  pathogenOrCause: string;
  severity: "Mild" | "Moderate" | "Severe" | "Critical";
  treatmentSteps: string[];
  medicationsOrSprays: PrescriptionItem["medicationsOrSprays"];
  preventiveAdvice: string;
  followUpDate: string;
}

export interface UpdatePrescriptionInput {
  diagnosisTitle?: string;
  pathogenOrCause?: string;
  severity?: "Mild" | "Moderate" | "Severe" | "Critical";
  treatmentSteps?: string[];
  medicationsOrSprays?: PrescriptionItem["medicationsOrSprays"];
  preventiveAdvice?: string;
  followUpDate?: string;
  status?: "active" | "revised" | "completed" | "cancelled";
  revisionNote?: string;
  authorName?: string;
}

const INITIAL_PRESCRIPTIONS: PrescriptionItem[] = [
  {
    id: "RX-DAE-2026-101",
    caseId: "consult-agri-101",
    category: "agri",
    patientOrFarmer: {
      id: "usr-farmer-01",
      name: "Md. Abdul Alim",
      role: "farmer",
      phone: "+880 1712-889901",
      location: "Dinajpur Sadar, Rangpur",
      subjectName: "BRRI Dhan-28 (Boro Paddy)",
      varietyOrBreed: "Tillering stage (45 Days)",
    },
    specialist: {
      id: "exp-dr-ramesh-patel",
      name: "Dr. S. M. Tanvir Ahmed, Ph.D.",
      title: "Chief Plant Pathologist & Rice IPM Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      regNumber: "DAE-AGR-2015-8891",
      council: "DAE",
    },
    diagnosisTitle: "Foliar Blast (Pyricularia oryzae)",
    pathogenOrCause: "Fungal Spores triggered by 88%+ humidity and high urea top-dressing",
    severity: "Moderate",
    treatmentSteps: [
      "Halt all further urea top-dressing immediately to slow down tender vegetative succulence.",
      "Maintain shallow standing water (2-3 cm) in the paddy field; do not let the field dry crack.",
      "Perform foliar spray during late afternoon using a hollow cone nozzle directed at both upper and lower leaf surfaces.",
    ],
    medicationsOrSprays: [
      {
        item: "Tricyclazole 75% WP",
        activeIngredient: "Tricyclazole (Systemic triazole melanin biosynthesis inhibitor)",
        dosage: "0.6 g per Liter of clean water (120 g / acre)",
        frequencyAndDuration: "Single spray; repeat after 10 days only if new lesions emerge on upper flag leaves.",
        withholdingSafetyPeriod: "21 Days prior to panicle emergence",
      },
      {
        item: "Muriate of Potash (MOP)",
        activeIngredient: "Potassium Chloride (K2O 60%)",
        dosage: "5 kg / bigha as soil application",
        frequencyAndDuration: "One-time booster to strengthen silica layer",
        withholdingSafetyPeriod: "0 Days (Nutritional amendment)",
      },
    ],
    preventiveAdvice: "Treat seedbed with Carbendazim 2g/kg seed before transplanting and follow DAE 4:2:1 balanced N-P-K recommendation.",
    followUpDate: "2026-11-06",
    prescribedAt: "2026-10-28T09:45:00.000Z",
    revisionCount: 1,
    status: "active",
  },
  {
    id: "RX-BVC-2026-202",
    caseId: "consult-vet-202",
    category: "veterinary",
    patientOrFarmer: {
      id: "usr-farmer-02",
      name: "Shahidul Islam",
      role: "livestock_farmer",
      phone: "+880 1819-445566",
      location: "Baghabari Milk Hub, Sirajganj",
      subjectName: "Crossbred Holstein Friesian Cow (Tag #88)",
      varietyOrBreed: "2nd Lactation • 420 kg",
    },
    specialist: {
      id: "exp-dr-ananya-sen",
      name: "Dr. Ananya Sen, D.V.M.",
      title: "Senior Bovine Surgeon & Theriogenologist",
      avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=200&q=80",
      regNumber: "BVC-VET-2018-4421",
      council: "BVC",
    },
    diagnosisTitle: "Acute Clinical Mastitis (Right Hind Quarter)",
    pathogenOrCause: "Environmental Streptococcus uberis / Staphylococcal infection",
    severity: "Severe",
    treatmentSteps: [
      "Completely strip out the affected quarter every 3 hours during daytime to evacuate bacterial toxins.",
      "Apply cold water hose or ice packs on swollen quarter for 15 minutes prior to milking.",
      "Discard all milk from this cow completely into disposal pit; strictly do NOT feed to calves.",
    ],
    medicationsOrSprays: [
      {
        item: "Ceftiofur Sodium Sterile Powder",
        activeIngredient: "Ceftiofur Sodium 1g",
        dosage: "1.1 to 2.2 mg/kg body weight Intramuscularly",
        frequencyAndDuration: "Once daily for 3 consecutive days",
        withholdingSafetyPeriod: "Milk withholding: 72 hrs post final injection. Meat: 4 days",
      },
      {
        item: "Meloxicam Injection 5mg/ml",
        activeIngredient: "Meloxicam (NSAID Anti-inflammatory)",
        dosage: "0.5 mg/kg body weight Subcutaneously",
        frequencyAndDuration: "Single initial injection for udder pain & endotoxic fever",
        withholdingSafetyPeriod: "Milk withholding: 120 hrs (5 days)",
      },
    ],
    preventiveAdvice: "Disinfect bedding stalls with hydrated lime weekly. Ensure milking machine vacuum pressure is calibrated to 42 kPa.",
    followUpDate: "2026-10-30",
    prescribedAt: "2026-10-27T14:30:00.000Z",
    revisionCount: 1,
    status: "active",
  },
  {
    id: "RX-BVC-2026-303",
    caseId: "consult-pet-303",
    category: "pet",
    patientOrFarmer: {
      id: "usr-pet-01",
      name: "Nusrat Jahan",
      role: "pet_owner",
      phone: "+880 1911-332211",
      location: "Gulshan-2, Dhaka",
      subjectName: "Golden Retriever (Max)",
      varietyOrBreed: "Male • 3.5 Years • 31.5 kg",
    },
    specialist: {
      id: "exp-dr-elena-rostova",
      name: "Dr. Farhana Haque, D.V.M.",
      title: "Chief Small Animal Clinician & Feline Specialist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      regNumber: "BVC-VET-2016-9912",
      council: "BVC",
    },
    diagnosisTitle: "Canine Atopic Dermatitis with Secondary Malassezia Otitis",
    pathogenOrCause: "Environmental seasonal pollen allergen flare with fungal ear colonization",
    severity: "Moderate",
    treatmentSteps: [
      "Wipe paws and lower abdomen with damp hypoallergenic washcloth after every outdoor walk.",
      "Fit soft Elizabethan cone collar for 48 hours to prevent self-mutilating skin trauma.",
      "Flush ears gently before administering otic drops; do not use Q-tips inside ear canal.",
    ],
    medicationsOrSprays: [
      {
        item: "Oclacitinib (Apoquel) 16mg Tablets",
        activeIngredient: "Oclacitinib Maleate (Janus Kinase JAK-1 inhibitor)",
        dosage: "1 tablet (16mg) orally with food",
        frequencyAndDuration: "Twice daily for 7 days, then reduce to once daily maintenance",
        withholdingSafetyPeriod: "N/A (Companion pet approved)",
      },
      {
        item: "Posatex Otic Ear Suspension",
        activeIngredient: "Orbifloxacin + Posaconazole + Mometasone Furoate",
        dosage: "6 drops into each affected ear canal",
        frequencyAndDuration: "Once daily for 7 consecutive days",
        withholdingSafetyPeriod: "N/A (Topical otic)",
      },
    ],
    preventiveAdvice: "Switch to high Omega-3 fish oil supplement to rebuild epidermal barrier strength.",
    followUpDate: "2026-11-08",
    prescribedAt: "2026-10-29T16:00:00.000Z",
    revisionCount: 1,
    status: "active",
  },
];

interface PrescriptionState {
  prescriptions: PrescriptionItem[];
  createPrescription: (input: CreatePrescriptionInput) => PrescriptionItem;
  updatePrescription: (id: string, input: UpdatePrescriptionInput) => PrescriptionItem | undefined;
  assignPrescription: (prescriptionId: string, caseId: string, patientOrFarmer?: PrescriptionItem["patientOrFarmer"]) => void;
  getById: (id: string) => PrescriptionItem | undefined;
  getBySpecialistId: (specialistId: string) => PrescriptionItem[];
  getByPatientId: (patientId: string) => PrescriptionItem[];
  getByCaseId: (caseId: string) => PrescriptionItem[];
  getAllPrescriptions: () => PrescriptionItem[];
  deletePrescription: (id: string) => void;
  resetPrescriptions: () => void;
}

export const usePrescriptionStore = create<PrescriptionState>()(
  persist(
    (set, get) => ({
      prescriptions: INITIAL_PRESCRIPTIONS,

      createPrescription: (input: CreatePrescriptionInput) => {
        const rand = Math.floor(1000 + Math.random() * 9000);
        const council = input.specialist.council || (input.category === "agri" ? "DAE" : "BVC");
        const newId = `RX-${council}-2026-${rand}`;
        const now = new Date().toISOString();

        const newItem: PrescriptionItem = {
          id: newId,
          caseId: input.caseId,
          category: input.category,
          patientOrFarmer: input.patientOrFarmer,
          specialist: {
            ...input.specialist,
            council,
          },
          diagnosisTitle: input.diagnosisTitle,
          pathogenOrCause: input.pathogenOrCause,
          severity: input.severity,
          treatmentSteps: input.treatmentSteps,
          medicationsOrSprays: input.medicationsOrSprays,
          preventiveAdvice: input.preventiveAdvice,
          followUpDate: input.followUpDate,
          prescribedAt: now,
          revisionCount: 1,
          status: "active",
          revisionNotes: [
            {
              timestamp: now,
              note: `Initial prescription authored by ${input.specialist.name} (${input.specialist.regNumber})`,
              authorName: input.specialist.name,
            },
          ],
        };

        set((state) => ({
          prescriptions: [newItem, ...state.prescriptions],
        }));

        // If linked to a consultation case, sync with consultationStore
        if (input.caseId) {
          try {
            const consultationStore = useConsultationStore.getState();
            consultationStore.attachPrescription(input.caseId, {
              diagnosisTitle: newItem.diagnosisTitle,
              pathogenOrCause: newItem.pathogenOrCause,
              severity: newItem.severity,
              treatmentSteps: newItem.treatmentSteps,
              medicationsOrSprays: newItem.medicationsOrSprays,
              preventiveAdvice: newItem.preventiveAdvice,
              followUpDate: newItem.followUpDate,
              prescribedAt: newItem.prescribedAt,
            });
          } catch (e) {
            console.error("Could not sync with consultationStore:", e);
          }
        }

        return newItem;
      },

      updatePrescription: (id: string, input: UpdatePrescriptionInput) => {
        const now = new Date().toISOString();
        let updatedItem: PrescriptionItem | undefined;

        set((state) => ({
          prescriptions: state.prescriptions.map((rx) => {
            if (rx.id !== id) return rx;

            const newRevCount = rx.revisionCount + 1;
            const newRevisionNote = {
              timestamp: now,
              note: input.revisionNote || `Prescription revised (Revision ${newRevCount}): Dosage & clinical guidance updated.`,
              authorName: input.authorName || rx.specialist.name,
            };

            updatedItem = {
              ...rx,
              diagnosisTitle: input.diagnosisTitle ?? rx.diagnosisTitle,
              pathogenOrCause: input.pathogenOrCause ?? rx.pathogenOrCause,
              severity: input.severity ?? rx.severity,
              treatmentSteps: input.treatmentSteps ?? rx.treatmentSteps,
              medicationsOrSprays: input.medicationsOrSprays ?? rx.medicationsOrSprays,
              preventiveAdvice: input.preventiveAdvice ?? rx.preventiveAdvice,
              followUpDate: input.followUpDate ?? rx.followUpDate,
              status: input.status ?? "revised",
              updatedAt: now,
              revisionCount: newRevCount,
              revisionNotes: [...(rx.revisionNotes || []), newRevisionNote],
            };

            return updatedItem;
          }),
        }));

        // If linked to a consultation, broadcast revision update to chat and store
        if (updatedItem && (updatedItem as PrescriptionItem).caseId) {
          const item = updatedItem as PrescriptionItem;
          try {
            const consultationStore = useConsultationStore.getState();
            consultationStore.attachPrescription(item.caseId!, {
              diagnosisTitle: item.diagnosisTitle,
              pathogenOrCause: item.pathogenOrCause,
              severity: item.severity,
              treatmentSteps: item.treatmentSteps,
              medicationsOrSprays: item.medicationsOrSprays,
              preventiveAdvice: item.preventiveAdvice,
              followUpDate: item.followUpDate,
              prescribedAt: item.prescribedAt,
            });

            // Send notification message in consultation chat
            consultationStore.sendMessage(item.caseId!, {
              text: `🔄 Prescription Updated (Rev ${item.revisionCount}): ${input.revisionNote || "Specialist has modified formulation dosages and safety intervals."} View and download the updated official Rx PDF below.`,
              senderId: item.specialist.id,
              senderName: item.specialist.name,
              senderRole: item.category === "agri" ? "expert_agronomist" : "veterinarian",
            });
          } catch (e) {
            console.error("Could not sync updated prescription with consultationStore:", e);
          }
        }

        return updatedItem;
      },

      assignPrescription: (prescriptionId: string, caseId: string, patientOrFarmer?: PrescriptionItem["patientOrFarmer"]) => {
        set((state) => ({
          prescriptions: state.prescriptions.map((rx) => {
            if (rx.id !== prescriptionId) return rx;
            return {
              ...rx,
              caseId,
              patientOrFarmer: patientOrFarmer || rx.patientOrFarmer,
              updatedAt: new Date().toISOString(),
            };
          }),
        }));

        // Attach in consultationStore
        const rx = get().getById(prescriptionId);
        if (rx) {
          try {
            const consultationStore = useConsultationStore.getState();
            consultationStore.attachPrescription(caseId, {
              diagnosisTitle: rx.diagnosisTitle,
              pathogenOrCause: rx.pathogenOrCause,
              severity: rx.severity,
              treatmentSteps: rx.treatmentSteps,
              medicationsOrSprays: rx.medicationsOrSprays,
              preventiveAdvice: rx.preventiveAdvice,
              followUpDate: rx.followUpDate,
              prescribedAt: rx.prescribedAt,
            });
          } catch (e) {
            console.error("Could not attach prescription to case:", e);
          }
        }
      },

      getById: (id: string) => {
        return get().prescriptions.find((p) => p.id === id);
      },

      getBySpecialistId: (specialistId: string) => {
        return get().prescriptions.filter((p) => p.specialist.id === specialistId || specialistId === "all");
      },

      getByPatientId: (patientId: string) => {
        return get().prescriptions.filter((p) => p.patientOrFarmer.id === patientId);
      },

      getByCaseId: (caseId: string) => {
        return get().prescriptions.filter((p) => p.caseId === caseId);
      },

      getAllPrescriptions: () => {
        return get().prescriptions;
      },

      deletePrescription: (id: string) => {
        set((state) => ({
          prescriptions: state.prescriptions.filter((p) => p.id !== id),
        }));
      },

      resetPrescriptions: () => {
        set({ prescriptions: INITIAL_PRESCRIPTIONS });
      },
    }),
    {
      name: "srot_prescription_store_v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
