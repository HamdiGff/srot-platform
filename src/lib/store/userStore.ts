import { create } from "zustand";

export type UserRole =
  | "farmer"
  | "livestock_farmer"
  | "pet_owner"
  | "expert_agronomist"
  | "veterinarian"
  | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  roleLabel: string;
  avatar: string;
  location: string;
  registeredEntities: {
    id: string;
    name: string;
    type: "crop" | "livestock" | "pet";
    details: string;
    icon: string;
  }[];
}

const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  farmer: {
    id: "usr-farmer-01",
    name: "Tariqul Islam",
    email: "tariqul.farmer@srotagro.com",
    phone: "+1 (555) 382-9014",
    role: "farmer",
    roleLabel: "Grain & Cash Crop Farmer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    location: "Greenfield Delta, Plot B-4 (5.2 Acres)",
    registeredEntities: [
      { id: "e1", name: "Aman Rice Paddy", type: "crop", details: "BRRI Dhan-28 • 5.2 Acres • Tillering Stage", icon: "Wheat" },
      { id: "e2", name: "Winter Maize Plot", type: "crop", details: "Pioneer Hybrid • 3 Acres • Pre-sowing", icon: "Sprout" },
    ],
  },
  livestock_farmer: {
    id: "usr-farmer-02",
    name: "Marcus Holloway",
    email: "marcus.dairy@srotvet.com",
    phone: "+1 (555) 819-3201",
    role: "livestock_farmer",
    roleLabel: "Commercial Dairy & Livestock Producer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    location: "Valley Crest Dairy, Barn 2",
    registeredEntities: [
      { id: "e3", name: "Dairy Herd Alpha", type: "livestock", details: "28 Holstein Friesians • 640 L/day", icon: "Milk" },
      { id: "e4", name: "Boer Breeding Goats", type: "livestock", details: "45 Breeding Does & 2 Bucks", icon: "ShieldAlert" },
    ],
  },
  pet_owner: {
    id: "usr-pet-01",
    name: "Jessica Miller",
    email: "jessica.m@example.com",
    phone: "+1 (555) 749-1029",
    role: "pet_owner",
    roleLabel: "Companion Pet Parent",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    location: "Greenwood Suburbs, Apartment 4C",
    registeredEntities: [
      { id: "e5", name: "Max (Golden Retriever)", type: "pet", details: "3.5 yrs • 31.5 kg • Microchipped", icon: "HeartHandshake" },
      { id: "e6", name: "Cleo (British Shorthair)", type: "pet", details: "2 yrs • 4.2 kg • Indoor", icon: "Heart" },
    ],
  },
  expert_agronomist: {
    id: "exp-dr-ramesh-patel",
    name: "Dr. Ramesh Patel",
    email: "dr.ramesh@srot.org",
    phone: "+1 (555) 492-1084",
    role: "expert_agronomist",
    roleLabel: "Chief Agronomist & Plant Pathologist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    location: "Western Agricultural Research Station",
    registeredEntities: [
      { id: "e7", name: "Cereal Disease Desk", type: "crop", details: "Lic: AGR-REG-2014-8891 • 16 Yrs Exp", icon: "ShieldCheck" },
    ],
  },
  veterinarian: {
    id: "exp-dr-ananya-sen",
    name: "Dr. Ananya Sen, M.V.Sc.",
    email: "dr.ananya@srotvet.org",
    phone: "+1 (555) 671-8892",
    role: "veterinarian",
    roleLabel: "Senior Veterinary Surgeon",
    avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=200&q=80",
    location: "State Veterinary Hospital & Dairy Advisory",
    registeredEntities: [
      { id: "e8", name: "Clinical Bovine & Tele-Vet", type: "livestock", details: "Lic: VCI-REG-2012-7714 • 14 Yrs Exp", icon: "Stethoscope" },
    ],
  },
  admin: {
    id: "usr-admin-01",
    name: "SROT Platform Administrator",
    email: "admin@srotplatform.com",
    phone: "+1 (800) 555-SROT",
    role: "admin",
    roleLabel: "Modular Platform Director",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    location: "SROT Global Operations Hub",
    registeredEntities: [
      { id: "e9", name: "System Modules & Services", type: "crop", details: "All 5 Service Modules Active", icon: "Sliders" },
    ],
  },
};

interface UserState {
  currentRole: UserRole;
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  isRoleModalOpen: boolean;
  openRoleModal: () => void;
  closeRoleModal: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentRole: "farmer",
  currentUser: DEMO_PROFILES.farmer,
  switchRole: (role: UserRole) =>
    set({
      currentRole: role,
      currentUser: DEMO_PROFILES[role],
      isRoleModalOpen: false,
    }),
  isRoleModalOpen: false,
  openRoleModal: () => set({ isRoleModalOpen: true }),
  closeRoleModal: () => set({ isRoleModalOpen: false }),
}));
