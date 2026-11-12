"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Phone, Plus } from "lucide-react";
import { PLATFORM_EXPERTS, type PlatformExpert } from "@/data/mockExperts";
import type { ServiceCategory } from "@/data/mockServices";
import { useLanguageStore } from "@/lib/store/languageStore";
import { formatCurrency } from "@/lib/utils";
import { HOME_COPY, localDigits } from "./homeCopy";
import { CategoryPictogram } from "./Pictograms";

/** Each category is a "plot" with its own land colour. Crops is the main one. */
const TILE_STYLE: Record<ServiceCategory, string> = {
  agri: "bg-paddy text-white hover:bg-paddy-dark",
  veterinary: "bg-seedling text-ink hover:brightness-[0.96]",
  poultry: "bg-mustard text-ink hover:brightness-[0.96]",
  fisheries: "bg-pond text-ink hover:brightness-[0.96]",
  pet: "bg-straw text-ink hover:brightness-[0.96]",
};

const CATEGORY_ORDER: ServiceCategory[] = ["agri", "veterinary", "poultry", "fisheries", "pet"];

/** One expert per category, in the same order as the tiles above. */
const FEATURED_EXPERTS: PlatformExpert[] = CATEGORY_ORDER.map((category) =>
  PLATFORM_EXPERTS.find((expert) => expert.primaryCategory === category)
).filter((expert): expert is PlatformExpert => Boolean(expert));

const LOWEST_FEE = Math.min(...PLATFORM_EXPERTS.map((expert) => expert.feePerConsultation));

const sectionShell = "mx-auto max-w-6xl px-4 sm:px-6";
const sectionTitle = "text-[1.75rem] font-bold leading-[1.25] sm:text-[2.125rem]";

export function HomeContent() {
  const language = useLanguageStore((state) => state.language);
  const copy = HOME_COPY[language];
  const money = (amount: number) => localDigits(formatCurrency(amount), language);

  return (
    <>
      {/* 1. Hero: the first screen is the first step of booking */}
      <section className={`${sectionShell} pb-14 pt-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-24 lg:pt-16`}>
        <div className="lg:col-span-6">
          <h1 className="text-[2.25rem] font-extrabold leading-[1.22] sm:text-[3rem] lg:text-[3.75rem] lg:leading-[1.18]">
            {copy.hero.title}
          </h1>
          <p className="mt-5 max-w-[34rem] text-[1.1875rem] leading-[1.7] text-ink-soft">{copy.hero.body}</p>
        </div>

        <nav aria-labelledby="srot-chooser-title" className="mt-9 lg:col-span-6 lg:mt-0">
          <h2 id="srot-chooser-title" className="text-xl font-bold sm:text-2xl">
            {copy.chooser.title}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {copy.tiles.map((tile) => {
              const isMain = tile.category === "agri";
              return (
                <li key={tile.category} className={isMain ? "col-span-2" : ""}>
                  <Link
                    href={`/consult?category=${tile.category}`}
                    className={`group relative flex h-full min-h-36 flex-col overflow-hidden rounded-2xl p-4 transition-[filter,background-color,transform] duration-150 active:scale-[0.985] sm:min-h-40 sm:p-5 ${TILE_STYLE[tile.category]}`}
                  >
                    <span className={`block font-bold leading-[1.25] ${isMain ? "text-[2rem]" : "text-[1.5rem]"}`}>
                      {tile.label}
                    </span>
                    <span
                      className={`mt-1 block text-base leading-[1.45] ${
                        isMain ? "max-w-[60%] text-white/90" : "max-w-[9.5rem] text-ink/80"
                      }`}
                    >
                      {tile.examples}
                    </span>
                    <CategoryPictogram
                      category={tile.category}
                      className={`pointer-events-none absolute transition-transform duration-200 group-hover:-translate-y-1 ${
                        isMain
                          ? "-bottom-2 right-3 h-32 w-32 sm:h-36 sm:w-36"
                          : "-bottom-1 right-1 h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-ink-soft">{copy.chooser.feeNote(money(LOWEST_FEE))}</p>
        </nav>
      </section>

      {/* 2. How it works: a real three-step sequence */}
      <section className="border-y border-bund bg-white">
        <div className={`${sectionShell} py-14 lg:py-20`}>
          <h2 className={sectionTitle}>{copy.steps.title}</h2>
          <ol className="relative mt-10 grid gap-9 before:absolute before:bottom-6 before:left-[1.4rem] before:top-6 before:w-[3px] before:rounded-full before:bg-seedling md:grid-cols-3 md:gap-10 md:before:bottom-auto md:before:left-0 md:before:right-0 md:before:top-[1.4rem] md:before:h-[3px] md:before:w-auto">
            {copy.steps.items.map((step, index) => (
              <li key={step.title} className="relative grid grid-cols-[3rem_1fr] gap-x-4 md:block">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-mustard text-[1.375rem] font-extrabold leading-none text-ink ring-[6px] ring-white">
                  {localDigits(index + 1, language)}
                </span>
                <div className="md:mt-5">
                  <h3 className="text-[1.375rem] font-bold leading-[1.3]">{step.title}</h3>
                  <p className="mt-2 max-w-[22rem] text-ink-soft">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Experts: a plain directory, read from the experts data */}
      <section className={`${sectionShell} py-14 lg:py-20`}>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <h2 className={sectionTitle}>{copy.experts.title}</h2>
            <p className="mt-2 text-ink-soft">{copy.experts.body}</p>
          </div>
          <Link
            href="/experts"
            className="inline-flex min-h-11 items-center gap-1 font-semibold text-paddy underline underline-offset-4 hover:text-paddy-dark"
          >
            {copy.experts.seeAll}
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 overflow-hidden rounded-2xl border border-bund bg-white">
          {FEATURED_EXPERTS.map((expert) => (
            <li
              key={expert.id}
              className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-b border-bund p-4 last:border-b-0 sm:p-5 md:grid-cols-[3.5rem_minmax(0,1fr)_auto] md:gap-x-6"
            >
              <span className="block h-14 w-14 overflow-hidden rounded-full bg-seedling-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={expert.avatar}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                  className="h-full w-full object-cover"
                />
              </span>
              <div className="min-w-0">
                <p className="text-[1.1875rem] font-bold leading-[1.3]">{expert.name}</p>
                <p className="text-ink-soft">
                  {copy.experts.roles[expert.primaryCategory] ?? expert.categoryBadge}
                  <span className="hidden sm:inline">, {expert.location}</span>
                </p>
              </div>
              <div className="col-span-2 flex items-center justify-between gap-4 md:col-span-1 md:gap-6">
                <p className="leading-[1.5] md:text-right">
                  <span className="block font-bold">
                    {copy.experts.fee} {money(expert.feePerConsultation)}
                  </span>
                  {expert.availableToday && (
                    <span className="flex items-center gap-1.5 text-paddy md:justify-end">
                      <span className="h-2 w-2 rounded-full bg-paddy" aria-hidden="true" />
                      {copy.experts.availableToday}
                    </span>
                  )}
                </p>
                <Link
                  href={`/consult?expert=${expert.id}&category=${expert.primaryCategory}`}
                  aria-label={`${copy.cta}: ${expert.name}`}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border-2 border-paddy px-5 font-semibold text-paddy hover:bg-paddy hover:text-white"
                >
                  {copy.cta}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Everything else the site offers, as links instead of widgets */}
      <section className="border-t border-bund">
        <div className={`${sectionShell} grid gap-x-14 gap-y-14 py-14 lg:grid-cols-2 lg:py-20`}>
          <div>
            <h2 className={sectionTitle}>{copy.more.title}</h2>
            <ul className="mt-6 border-t border-bund">
              {copy.more.items.map((item) => (
                <li key={item.href} className="border-b border-bund">
                  <Link href={item.href} className="group flex items-center gap-4 py-4">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[1.1875rem] font-bold leading-[1.35] group-hover:text-paddy">
                        {item.title}
                      </span>
                      <span className="block text-ink-soft">{item.body}</span>
                    </span>
                    <ChevronRight
                      className="h-6 w-6 shrink-0 text-paddy transition-transform duration-150 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={sectionTitle}>{copy.faq.title}</h2>
            <div className="mt-6 border-t border-bund">
              {copy.faq.items.map((item) => (
                <details key={item.q} className="border-b border-bund">
                  <summary className="flex min-h-14 cursor-pointer items-center gap-4 py-3 text-[1.1875rem] font-bold leading-[1.35]">
                    <span className="flex-1">{item.q}</span>
                    <Plus
                      className="srot-faq-plus h-6 w-6 shrink-0 text-paddy transition-transform duration-150"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="max-w-[34rem] pb-5 text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing action and the public hotlines */}
      <section className="srot-on-dark bg-paddy-deep text-white">
        <div className={`${sectionShell} flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between lg:py-16`}>
          <div>
            <h2 className="max-w-xl text-[2rem] font-extrabold leading-[1.25] sm:text-[2.5rem]">
              {copy.closing.title}
            </h2>
            <Link
              href="/consult"
              className="mt-6 inline-flex min-h-14 items-center rounded-full bg-mustard px-8 text-xl font-bold text-ink hover:brightness-95"
            >
              {copy.cta}
            </Link>
          </div>

          <div className="lg:text-right">
            <p className="text-white/80">{copy.closing.urgent}</p>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="tel:16123" className="inline-flex min-h-11 items-center gap-2.5 text-xl font-bold">
                  <Phone className="h-5 w-5 text-mustard" aria-hidden="true" />
                  {copy.closing.krishi} {localDigits(16123, language)}
                </a>
              </li>
              <li>
                <a href="tel:333" className="inline-flex min-h-11 items-center gap-2.5 text-xl font-bold">
                  <Phone className="h-5 w-5 text-mustard" aria-hidden="true" />
                  {copy.closing.national} {localDigits(333, language)}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
