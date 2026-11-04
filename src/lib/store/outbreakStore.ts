import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface OutbreakAlert {
  id: string;
  division: string;
  district: string;
  disease: string;
  target: string;
  severity: "Critical" | "Warning" | "Advisory";
  activeSpecialists: number;
  broadcastDate: string;
  emergencyProtocol: string;
  headlineBn: string;
  headlineEn: string;
}

interface OutbreakState {
  outbreaks: OutbreakAlert[];
  addOutbreak: (outbreak: Omit<OutbreakAlert, "id">) => OutbreakAlert;
  removeOutbreak: (id: string) => void;
  getOutbreaksByDivision: (division: string) => OutbreakAlert[];
  resetOutbreaksToInitial: () => void;
}

export const INITIAL_OUTBREAKS: OutbreakAlert[] = [
  {
    id: "ob-1",
    division: "Rangpur",
    district: "Dinajpur & Rangpur Sadar",
    disease: "Boro Rice Foliar & Neck Blast Alert (Pyricularia oryzae)",
    target: "Rice Paddy (BRRI Dhan-28 / 29)",
    severity: "Critical",
    activeSpecialists: 34,
    broadcastDate: "Today at 08:30 AM",
    emergencyProtocol: "Halt urea top-dressing immediately; spray Tricyclazole 75% WP @ 0.6g/L.",
    headlineBn: "রংপুর বিভাগ: বোরো ধানের পাতা ও শীষ ব্লাস্ট রোগের তীব্র প্রাদুর্ভাব সতর্কতা",
    headlineEn: "Rangpur Division: Critical Rice Blast Epidemic Alert — Halt Urea Immediately",
  },
  {
    id: "ob-2",
    division: "Rajshahi",
    district: "Sirajganj & Pabna Dairy Corridor",
    disease: "Lumpy Skin Disease (LSD) Vector Surge",
    target: "Dairy Cattle & Calves",
    severity: "Warning",
    activeSpecialists: 28,
    broadcastDate: "Yesterday at 04:00 PM",
    emergencyProtocol: "Mosquito netting around sheds; isolate febrile animals; goat pox vaccine.",
    headlineBn: "রাজশাহী ও পাবনা ডেইরি জোন: ল্যাম্পি স্কিন ডিজিজ (LSD) মশা বাহিত সংক্রমণ সতর্কতা",
    headlineEn: "Rajshahi & Pabna Dairy Corridor: Lumpy Skin Disease (LSD) Vector Surge Alert",
  },
  {
    id: "ob-3",
    division: "Mymensingh",
    district: "Muktagacha & Trishal Intensive Ponds",
    disease: "Dissolved Oxygen (DO) Crash & Pangas Hypoxia",
    target: "Commercial Aquaculture Ponds",
    severity: "Critical",
    activeSpecialists: 19,
    broadcastDate: "2 Days ago",
    emergencyProtocol: "Deploy paddle aerators immediately; sodium percarbonate @ 250g/decimal.",
    headlineBn: "ময়মনসিংহ: পাঙ্গাশ ও কার্প মাছের পুকুরে তীব্র অক্সিজেন ঘাটতি সতর্কতা",
    headlineEn: "Mymensingh Aquaculture: Dissolved Oxygen Crash Alert — Activate Aerators",
  },
];

export const useOutbreakStore = create<OutbreakState>()(
  persist(
    (set, get) => ({
      outbreaks: INITIAL_OUTBREAKS,

      addOutbreak: (outbreakInput) => {
        const newOutbreak: OutbreakAlert = {
          ...outbreakInput,
          id: `ob-${Date.now()}`,
        };
        set((state) => ({
          outbreaks: [newOutbreak, ...state.outbreaks],
        }));
        return newOutbreak;
      },

      removeOutbreak: (id: string) => {
        set((state) => ({
          outbreaks: state.outbreaks.filter((o) => o.id !== id),
        }));
      },

      getOutbreaksByDivision: (division: string) => {
        if (!division || division.toLowerCase() === "all") return get().outbreaks;
        return get().outbreaks.filter((o) => o.division.toLowerCase() === division.toLowerCase());
      },

      resetOutbreaksToInitial: () => {
        set({ outbreaks: INITIAL_OUTBREAKS });
      },
    }),
    {
      name: "srot-outbreak-storage-v1",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : (null as any))),
    }
  )
);
