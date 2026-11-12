"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguageStore } from "@/lib/store/languageStore";
import { HOME_COPY } from "./homeCopy";
import { StreamLine } from "./Pictograms";

export function SrotWordmark({ className = "" }: { className?: string }) {
  const language = useLanguageStore((state) => state.language);
  const brand = HOME_COPY[language].brand;

  return (
    <Link
      href="/"
      aria-label={brand}
      className={`relative inline-flex flex-col items-start rounded-md pb-1.5 text-[1.75rem] font-extrabold leading-none text-current ${className}`}
    >
      <span>{brand}</span>
      <StreamLine className="absolute bottom-0 left-0 h-2 w-full text-paddy" />
    </Link>
  );
}

export function HomeHeader() {
  const { language, setLanguage } = useLanguageStore();
  const copy = HOME_COPY[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { label: copy.nav.services, href: "/services" },
    { label: copy.nav.experts, href: "/experts" },
    { label: copy.nav.community, href: "/community" },
    { label: copy.nav.guides, href: "/knowledge" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-bund bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <SrotWordmark className="text-ink" />

        <nav aria-label={copy.navLabel} className="ml-8 hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[1.0625rem] font-medium text-ink hover:bg-seedling-soft"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div
            role="group"
            aria-label={copy.languageLabel}
            className="flex items-center rounded-full border border-bund bg-white p-0.5 text-[0.9375rem] font-semibold"
          >
            <button
              type="button"
              lang="bn"
              aria-pressed={language === "bn"}
              onClick={() => setLanguage("bn")}
              className={`min-h-10 rounded-full px-3 ${
                language === "bn" ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              lang="en"
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
              className={`min-h-10 rounded-full px-3 ${
                language === "en" ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              English
            </button>
          </div>

          <Link
            href="/portal"
            className="hidden rounded-full px-3.5 py-2 text-[1.0625rem] font-medium text-ink hover:bg-seedling-soft lg:inline-flex"
          >
            {copy.account}
          </Link>

          <Link
            href="/consult"
            className="hidden min-h-11 items-center rounded-full bg-paddy px-5 text-[1.0625rem] font-semibold text-white hover:bg-paddy-dark sm:inline-flex"
          >
            {copy.cta}
          </Link>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="srot-home-menu"
            aria-label={isMenuOpen ? copy.menuClose : copy.menuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-bund bg-white text-ink md:hidden"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="srot-home-menu"
          aria-label={copy.navLabel}
          className="border-t border-bund bg-paper px-4 pb-5 pt-2 md:hidden"
        >
          <ul>
            {[...links, { label: copy.account, href: "/portal" }].map((link) => (
              <li key={link.href} className="border-b border-bund">
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex min-h-13 items-center text-lg font-medium text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/consult"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 flex min-h-13 items-center justify-center rounded-full bg-paddy text-lg font-semibold text-white"
          >
            {copy.cta}
          </Link>
        </nav>
      )}
    </header>
  );
}
