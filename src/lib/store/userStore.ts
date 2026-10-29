import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserRole =
  | "farmer"
  | "livestock_farmer"
  | "pet_owner"
  | "expert_agronomist"
  | "veterinarian"
  | "field_vendor"
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
  district?: string;
  registeredEntities: {
    id: string;
    name: string;
    type: "crop" | "livestock" | "pet" | "service";
    details: string;
    icon: string;
  }[];
  isCustomAccount?: boolean;
  pin?: string;
}

export const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  farmer: {
    id: "usr-farmer-01",
    name: "Tariqul Islam (তারিকুল ইসলাম)",
    email: "tariqul.farmer@srotagro.com",
    phone: "01712345601",
    role: "farmer",
    roleLabel: "Crop Farmer (আবাদি ফসল খামারি)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    location: "Sherpur Upazila, Bogura (5.2 Acres Rice & Maize)",
    district: "Bogura",
    registeredEntities: [
      { id: "e1", name: "Aman Rice Paddy", type: "crop", details: "BRRI Dhan-28 • 5.2 Acres • Tillering Stage", icon: "Wheat" },
      { id: "e2", name: "Winter Maize Plot", type: "crop", details: "Pioneer Hybrid • 3 Acres • Pre-sowing", icon: "Sprout" },
    ],
  },
  livestock_farmer: {
    id: "usr-farmer-02",
    name: "Khandaker Rafiq (খন্দকার রফিক)",
    email: "rafiq.dairy@srotvet.com",
    phone: "01812345602",
    role: "livestock_farmer",
    roleLabel: "Dairy & Livestock Producer (ডেইরি খামারি)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    location: "Shahjadpur Dairy Corridor, Sirajganj",
    district: "Sirajganj",
    registeredEntities: [
      { id: "e3", name: "Dairy Herd Alpha", type: "livestock", details: "28 Holstein Friesians • 640 L/day", icon: "Milk" },
      { id: "e4", name: "Boer Breeding Goats", type: "livestock", details: "45 Breeding Does & 2 Bucks", icon: "ShieldAlert" },
    ],
  },
  pet_owner: {
    id: "usr-pet-01",
    name: "Sadia Afrin (সাদিয়া আফরিন)",
    email: "sadia.afrin@gmail.com",
    phone: "01912345603",
    role: "pet_owner",
    roleLabel: "Companion Pet Parent (পোষা প্রাণীর অভিভাবক)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    location: "Dhanmondi, Dhaka",
    district: "Dhaka",
    registeredEntities: [
      { id: "e5", name: "Max (Golden Retriever)", type: "pet", details: "3.5 yrs • 31.5 kg • Vaccinated & Microchipped", icon: "HeartHandshake" },
      { id: "e6", name: "Cleo (British Shorthair)", type: "pet", details: "2 yrs • 4.2 kg • Indoor Dewormed", icon: "Heart" },
    ],
  },
  expert_agronomist: {
    id: "exp-dr-ramesh-patel",
    name: "Dr. S. M. Tanvir Ahmed, Ph.D. (কৃষিবিদ ড. তানভীর)",
    email: "dr.tanvir@srot.org",
    phone: "01799887701",
    role: "expert_agronomist",
    roleLabel: "Chief Agronomist & IPM Specialist (উদ্ভিদ রোগতত্ত্ববিদ)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    location: "BARI Regional Agro Complex, Gazipur",
    district: "Gazipur",
    registeredEntities: [
      { id: "e7", name: "Cereal Disease Desk", type: "crop", details: "Lic: DAE-AGR-2015-8891 • 16 Yrs Exp", icon: "ShieldCheck" },
    ],
  },
  veterinarian: {
    id: "exp-dr-ananya-sen",
    name: "Dr. Mahfuzur Rahman, M.V.Sc. (ডা. মাহফুজুর রহমান)",
    email: "dr.mahfuz@srotvet.org",
    phone: "01799887702",
    role: "veterinarian",
    roleLabel: "Senior Veterinary Surgeon (রেজিস্টার্ড ভেটেরিনারি সার্জন)",
    avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=200&q=80",
    location: "Veterinary Teaching Hospital, BAU Campus, Mymensingh",
    district: "Mymensingh",
    registeredEntities: [
      { id: "e8", name: "Clinical Bovine & Tele-Vet", type: "livestock", details: "Lic: BVC-VET-2014-7714 • 14 Yrs Exp", icon: "Stethoscope" },
    ],
  },
  field_vendor: {
    id: "vnd-paravet-01",
    name: "Kamal Hossain (কামাল হোসেন - প্যারাভেট)",
    email: "kamal.paravet@srotfield.com",
    phone: "01612345604",
    role: "field_vendor",
    roleLabel: "Field Paravet & Soil Technician (মাঠ পর্যায়ের টেকনিশিয়ান)",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    location: "Sherpur & Bogura Sadar Zone",
    district: "Bogura",
    registeredEntities: [
      { id: "e9", name: "Doorstep AI & Soil Testing Unit", type: "service", details: "DLS Certified AI Technician • Portable NPK Lab", icon: "Briefcase" },
    ],
  },
  admin: {
    id: "usr-admin-01",
    name: "SROT Platform Administrator",
    email: "admin@srotplatform.com",
    phone: "01700000000",
    role: "admin",
    roleLabel: "Platform Director (সিস্টেম অ্যাডমিন)",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    location: "SROT Digital Operations Centre, Dhaka",
    district: "Dhaka",
    registeredEntities: [
      { id: "e10", name: "System Modules & Governance", type: "crop", details: "All 5 Service Modules Active", icon: "Sliders" },
    ],
  },
};

export interface RegisterUserData {
  name: string;
  phone: string;
  role: UserRole;
  district: string;
  pin: string;
  farmOrPetDetail?: string;
  registrationNumber?: string;
}

interface UserState {
  currentRole: UserRole;
  currentUser: UserProfile;
  registeredUsers: UserProfile[];
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalTab: "signin" | "register" | "demo";

  // Actions
  switchRole: (role: UserRole) => void;
  openAuthModal: (tab?: "signin" | "register" | "demo") => void;
  closeAuthModal: () => void;
  // Backward compatibility alias for openRoleModal / closeRoleModal
  openRoleModal: () => void;
  closeRoleModal: () => void;
  isRoleModalOpen: boolean;

  registerAccount: (data: RegisterUserData) => { success: boolean; message: string; user?: UserProfile };
  loginWithPhone: (phone: string, pin: string) => { success: boolean; message: string };
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentRole: "farmer",
      currentUser: DEMO_PROFILES.farmer,
      registeredUsers: [],
      isAuthenticated: true,
      isAuthModalOpen: false,
      authModalTab: "demo",
      isRoleModalOpen: false,

      openAuthModal: (tab = "demo") =>
        set({ isAuthModalOpen: true, isRoleModalOpen: true, authModalTab: tab }),

      closeAuthModal: () =>
        set({ isAuthModalOpen: false, isRoleModalOpen: false }),

      openRoleModal: () =>
        set({ isAuthModalOpen: true, isRoleModalOpen: true, authModalTab: "demo" }),

      closeRoleModal: () =>
        set({ isAuthModalOpen: false, isRoleModalOpen: false }),

      switchRole: (role: UserRole) => {
        const demoUser = DEMO_PROFILES[role] || DEMO_PROFILES.farmer;
        set({
          currentRole: role,
          currentUser: demoUser,
          isAuthenticated: true,
          isAuthModalOpen: false,
          isRoleModalOpen: false,
        });
      },

      registerAccount: (data: RegisterUserData) => {
        const cleanPhone = data.phone.trim().replace(/\D/g, "");
        if (cleanPhone.length < 11) {
          return { success: false, message: "Please enter a valid 11-digit mobile number (01XXXXXXXXX)" };
        }
        if (!data.name.trim()) {
          return { success: false, message: "Please enter your full name" };
        }
        if (!data.pin || data.pin.length < 4) {
          return { success: false, message: "PIN / Password must be at least 4 digits" };
        }

        // Determine role label
        const roleLabels: Record<UserRole, string> = {
          farmer: "Crop Farmer (আবাদি ফসল খামারি)",
          livestock_farmer: "Dairy & Livestock Producer (ডেইরি খামারি)",
          pet_owner: "Companion Pet Parent (পোষা প্রাণীর অভিভাবক)",
          expert_agronomist: "Registered Agronomist (উদ্ভিদ বিশেষজ্ঞ)",
          veterinarian: "Licensed Veterinarian (ভেটেরিনারি সার্জন)",
          field_vendor: "Field Service Technician (মাঠ পর্যায়ের টেকনিশিয়ান)",
          admin: "Platform Administrator",
        };

        const avatarPresets: Record<UserRole, string> = {
          farmer: "https://images.unsplash.com/photo-1592417817098-8f3d69102456?auto=format&fit=crop&w=200&q=80",
          livestock_farmer: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=200&q=80",
          pet_owner: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
          expert_agronomist: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80",
          veterinarian: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
          field_vendor: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
          admin: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        };

        const newUserId = `usr-${data.role}-${Date.now().toString(36)}`;
        const entityDetails = data.farmOrPetDetail || (
          data.role === "farmer" ? "Rice & Cash Crops" :
          data.role === "livestock_farmer" ? "Dairy Cattle Herd" :
          data.role === "pet_owner" ? "Pet Dog / Cat" :
          data.role === "expert_agronomist" || data.role === "veterinarian" ? `Reg #${data.registrationNumber || "BVC-2026-REG"}` :
          "Doorstep Field Service Unit"
        );

        const newUser: UserProfile = {
          id: newUserId,
          name: data.name.trim(),
          email: `${cleanPhone}@srotplatform.com`,
          phone: cleanPhone,
          role: data.role,
          roleLabel: roleLabels[data.role],
          avatar: avatarPresets[data.role],
          location: `${data.district || "Dhaka"}, Bangladesh`,
          district: data.district || "Dhaka",
          registeredEntities: [
            {
              id: `ent-${Date.now()}`,
              name: data.role === "pet_owner" ? "My Registered Pet" : "Registered Farm Asset",
              type: data.role === "pet_owner" ? "pet" : data.role === "livestock_farmer" ? "livestock" : "crop",
              details: entityDetails,
              icon: data.role === "pet_owner" ? "HeartHandshake" : data.role === "livestock_farmer" ? "Milk" : "Wheat",
            },
          ],
          isCustomAccount: true,
          pin: data.pin,
        };

        set((state) => ({
          registeredUsers: [newUser, ...state.registeredUsers.filter((u) => u.phone !== cleanPhone)],
          currentUser: newUser,
          currentRole: data.role,
          isAuthenticated: true,
          isAuthModalOpen: false,
          isRoleModalOpen: false,
        }));

        return { success: true, message: "Account created successfully! Welcome to SROT.", user: newUser };
      },

      loginWithPhone: (phoneInput: string, pinInput: string) => {
        const cleanPhone = phoneInput.trim().replace(/\D/g, "");
        const allUsers = [...get().registeredUsers, ...Object.values(DEMO_PROFILES)];

        // Search for matching user
        const matched = allUsers.find(
          (u) => u.phone.replace(/\D/g, "") === cleanPhone || u.phone === phoneInput.trim()
        );

        if (!matched) {
          // If demo quick login attempted
          return {
            success: false,
            message: "No account found with this phone number. Please create an account or select a Demo persona.",
          };
        }

        if (matched.pin && matched.pin !== pinInput.trim()) {
          return { success: false, message: "Incorrect PIN/password. Please try again." };
        }

        set({
          currentUser: matched,
          currentRole: matched.role,
          isAuthenticated: true,
          isAuthModalOpen: false,
          isRoleModalOpen: false,
        });

        return { success: true, message: `Welcome back, ${matched.name}!` };
      },

      logout: () => {
        set({
          currentUser: DEMO_PROFILES.farmer,
          currentRole: "farmer",
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "srot_user_store_v2",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
