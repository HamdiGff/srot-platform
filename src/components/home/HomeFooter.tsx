"use client";

import React from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import { HOME_COPY, localDigits } from "./homeCopy";
import { SrotWordmark } from "./HomeHeader";

const YEAR = new Date().getFullYear();
const SUPPORT_EMAIL = "support@srot.org";

export function HomeFooter() {
  const language = useLanguageStore((state) => state.language);
  const copy = HOME_COPY[language];

  return (
    <footer className="border-t border-bund bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <SrotWordmark className="text-ink" />
          <p className="mt-4 max-w-sm text-ink-soft">{copy.footer.about}</p>
          <p className="mt-4">
            <span className="text-ink-soft">{copy.footer.contact}: </span>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-ink underline underline-offset-4">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
          {copy.footer.groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-base font-bold text-ink">{group.title}</h2>
              <ul className="mt-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-10 items-center text-ink-soft hover:text-ink hover:underline hover:underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-bund">
        <p className="mx-auto max-w-6xl px-4 py-5 text-[0.9375rem] text-ink-soft sm:px-6">
          © {localDigits(YEAR, language)} {copy.brand}{copy.sentenceEnd} {copy.footer.rights}
        </p>
      </div>
    </footer>
  );
}
