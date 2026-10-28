import { create } from "zustand";

export interface SystemModuleConfig {
  id: string;
  key: "agriAdvisory" | "livestockHealth" | "petServices" | "knowledgeHub" | "digitalPrescriptions" | "futureMarketplace";
  name: string;
  phase: "Phase 1" | "Phase 2" | "Phase 3";
  description: string;
  iconName: string;
  isEnabled: boolean;
  requiredRole?: string;
  metrics: {
    label: string;
    value: string;
  };
}

interface ModuleState {
  modules: SystemModuleConfig[];
  toggleModule: (key: SystemModuleConfig["key"]) => void;
  isModuleEnabled: (key: SystemModuleConfig["key"]) => boolean;
  resetToDefaults: () => void;
}

const DEFAULT_MODULES: SystemModuleConfig[] = [
  {
    id: "mod-1",
    key: "agriAdvisory",
    name: "Agriculture Advisory",
    phase: "Phase 1",
    description: "Crop disease diagnosis, fertilizer balancing, weed/pest management & on-field agronomist visits.",
    iconName: "Wheat",
    isEnabled: true,
    metrics: { label: "Cases Handled", value: "14,820+" },
  },
  {
    id: "mod-2",
    key: "knowledgeHub",
    name: "Knowledge Hub",
    phase: "Phase 1",
    description: "Scientific disease protocol library, pest alert bulletins, spray withholding guides, and video walkthroughs.",
    iconName: "BookOpen",
    isEnabled: true,
    metrics: { label: "Articles & Protocols", value: "340 Published" },
  },
  {
    id: "mod-3",
    key: "livestockHealth",
    name: "Animal Healthcare (Livestock & Aquaculture)",
    phase: "Phase 2",
    description: "Veterinary consultations for dairy cattle, commercial poultry flocks, goats/sheep, and fisheries.",
    iconName: "Milk",
    isEnabled: true,
    metrics: { label: "Registered Animals", value: "82,400+" },
  },
  {
    id: "mod-4",
    key: "petServices",
    name: "Companion Pet Healthcare",
    phase: "Phase 2",
    description: "24/7 video tele-vet triage, clinical nutrition plans, puppy/kitten vaccine timelines for dogs & cats.",
    iconName: "HeartHandshake",
    isEnabled: true,
    metrics: { label: "Active Pets", value: "6,920" },
  },
  {
    id: "mod-5",
    key: "digitalPrescriptions",
    name: "Digital Prescriptions & Rx Engine",
    phase: "Phase 2",
    description: "Cryptographically verified advisory notes and veterinary prescriptions with dosage and withholding rules.",
    iconName: "FileCheck2",
    isEnabled: true,
    metrics: { label: "Rx Issued", value: "9,410" },
  },
  {
    id: "mod-6",
    key: "futureMarketplace",
    name: "Input Marketplace & Logistics",
    phase: "Phase 3",
    description: "Pre-integrated directory and e-requisition for certified bio-fertilizers, vet medicines, and farm gear.",
    iconName: "Store",
    isEnabled: false,
    metrics: { label: "Preview Mode", value: "Coming Soon" },
  },
];

export const useModuleStore = create<ModuleState>((set, get) => ({
  modules: DEFAULT_MODULES,
  toggleModule: (key) =>
    set((state) => ({
      modules: state.modules.map((m) =>
        m.key === key ? { ...m, isEnabled: !m.isEnabled } : m
      ),
    })),
  isModuleEnabled: (key) => {
    const mod = get().modules.find((m) => m.key === key);
    return mod ? mod.isEnabled : true;
  },
  resetToDefaults: () => set({ modules: DEFAULT_MODULES }),
}));
