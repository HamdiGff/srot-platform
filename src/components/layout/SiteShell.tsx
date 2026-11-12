"use client";

import React, { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "@/lib/store/languageStore";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeFooter } from "@/components/home/HomeFooter";

/**
 * Chooses the page chrome.
 * The homepage uses the new light header and footer. Every other page keeps
 * the existing dark Navbar and Footer until it is migrated to the light theme.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const language = useLanguageStore((state) => state.language);

  // Keep <html lang> in step with the language switch (screen readers, fonts, SEO)
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  if (pathname === "/") {
    return (
      <div className="srot-home flex min-h-screen w-full flex-1 flex-col">
        <HomeHeader />
        <main className="w-full flex-1">{children}</main>
        <HomeFooter />
      </div>
    );
  }

  return (
    <>
      <div className="vercel-beam-top" aria-hidden="true" />
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main className="flex-1 w-full">{children}</main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
