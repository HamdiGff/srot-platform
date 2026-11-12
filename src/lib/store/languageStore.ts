import { create } from "zustand";

export type Language = "bn" | "en";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "bn", // Bangla first; visitors can switch to English
  setLanguage: (language) => set({ language }),
  toggleLanguage: () =>
    set((state) => ({ language: state.language === "en" ? "bn" : "en" })),
}));
