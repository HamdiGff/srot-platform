import { create } from "zustand";

export type Language = "bn" | "en";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "bn", // Default to Bangla for Bangladesh users!
  setLanguage: (language) => set({ language }),
  toggleLanguage: () =>
    set((state) => ({ language: state.language === "bn" ? "en" : "bn" })),
}));
