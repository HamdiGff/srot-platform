import type { ServiceCategory } from "@/data/mockServices";
import type { Language } from "@/lib/store/languageStore";

/**
 * All homepage wording lives here, in Bangla and English.
 * Keep it plain: say what the visitor can do, in words a farmer would use.
 * Do not add numbers or claims here unless they are true for the live service.
 */

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** Shows numbers in Bangla digits when the page is in Bangla. */
export function localDigits(value: string | number, language: Language) {
  const text = String(value);
  if (language !== "bn") return text;
  return text.replace(/\d/g, (digit) => BN_DIGITS[Number(digit)]);
}

export interface CategoryTile {
  category: ServiceCategory;
  label: string;
  examples: string;
}

export interface HomeCopy {
  brand: string;
  nav: { services: string; experts: string; community: string; guides: string };
  account: string;
  cta: string;
  menuOpen: string;
  menuClose: string;
  languageLabel: string;
  navLabel: string;
  sentenceEnd: string;
  hero: { title: string; body: string };
  chooser: { title: string; feeNote: (fee: string) => string };
  tiles: CategoryTile[];
  steps: { title: string; items: { title: string; body: string }[] };
  experts: {
    title: string;
    body: string;
    seeAll: string;
    fee: string;
    availableToday: string;
    roles: Record<ServiceCategory, string | null>;
  };
  more: { title: string; items: { title: string; body: string; href: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  closing: { title: string; urgent: string; krishi: string; national: string };
  footer: {
    about: string;
    groups: { title: string; links: { label: string; href: string }[] }[];
    contact: string;
    rights: string;
  };
}

const bn: HomeCopy = {
  brand: "স্রোত",
  nav: { services: "সেবা", experts: "বিশেষজ্ঞ", community: "প্রশ্নোত্তর", guides: "গাইড" },
  account: "আমার পাতা",
  cta: "পরামর্শ নিন",
  menuOpen: "মেনু খুলুন",
  menuClose: "মেনু বন্ধ করুন",
  languageLabel: "ভাষা",
  navLabel: "প্রধান মেনু",
  sentenceEnd: "।",
  hero: {
    title: "ফসল বা পশুপাখি অসুস্থ? ফোনেই বিশেষজ্ঞকে দেখান।",
    body: "ছবি পাঠান বা কল করুন। কৃষিবিদ বা পশু চিকিৎসক সমস্যা দেখে পরামর্শ আর লিখিত প্রেসক্রিপশন দেবেন।",
  },
  chooser: {
    title: "কোনটির জন্য পরামর্শ চান?",
    feeNote: (fee) => `পরামর্শ ফি ${fee} থেকে। টাকা দেওয়ার আগেই ফি দেখতে পাবেন।`,
  },
  tiles: [
    { category: "agri", label: "ফসল", examples: "ধান, সবজি, ফল, ভুট্টা" },
    { category: "veterinary", label: "গরু-ছাগল", examples: "গাভি, ষাঁড়, ছাগল, ভেড়া" },
    { category: "poultry", label: "হাঁস-মুরগি", examples: "ব্রয়লার, লেয়ার, হাঁস" },
    { category: "fisheries", label: "মাছ", examples: "পুকুর, ঘের, চিংড়ি" },
    { category: "pet", label: "পোষা প্রাণী", examples: "কুকুর, বিড়াল" },
  ],
  steps: {
    title: "যেভাবে পরামর্শ পাবেন",
    items: [
      {
        title: "সমস্যা জানান",
        body: "আক্রান্ত ফসল বা প্রাণীর ছবি তুলুন। কী হয়েছে আর কবে থেকে, দুই লাইনে লিখুন।",
      },
      {
        title: "বিশেষজ্ঞের সঙ্গে কথা বলুন",
        body: "ভিডিও কল, অডিও কল বা শুধু ছবি পাঠিয়ে। আপনার নেটে যেটা চলে সেটাই বেছে নিন।",
      },
      {
        title: "প্রেসক্রিপশন নিন",
        body: "কোন ওষুধ, কতটুকু, কত দিন, সব লেখা থাকবে। ফোনে রেখে দোকানে দেখান।",
      },
    ],
  },
  experts: {
    title: "যাঁরা পরামর্শ দেন",
    body: "পছন্দের বিশেষজ্ঞ বেছে নিয়ে সরাসরি বুক করুন।",
    seeAll: "সব বিশেষজ্ঞ দেখুন",
    fee: "ফি",
    availableToday: "আজ সময় আছে",
    roles: {
      agri: "কৃষিবিদ",
      veterinary: "পশু চিকিৎসক",
      poultry: "পোলট্রি চিকিৎসক",
      fisheries: "মৎস্য বিশেষজ্ঞ",
      pet: "পোষা প্রাণীর চিকিৎসক",
    },
  },
  more: {
    title: "আরও যা করতে পারেন",
    items: [
      {
        title: "মাঠে বা খামারে লোক ডাকুন",
        body: "মাটি পরীক্ষা, কৃত্রিম প্রজনন বা জরুরি চিকিৎসার জন্য।",
        href: "/services/field-visits",
      },
      {
        title: "অন্য খামারিদের প্রশ্ন করুন",
        body: "প্রশ্ন লিখুন, খামারি ও বিশেষজ্ঞরা উত্তর দেবেন।",
        href: "/community",
      },
      {
        title: "রোগ ও পরিচর্যার গাইড পড়ুন",
        body: "ফসল ও প্রাণীর সাধারণ রোগ, লক্ষণ আর করণীয়।",
        href: "/knowledge",
      },
      {
        title: "হিসাবের টুল ব্যবহার করুন",
        body: "ওষুধের মাত্রা, আবহাওয়া, মাটি আর ফসলের ক্যালেন্ডার।",
        href: "/features",
      },
    ],
  },
  faq: {
    title: "সাধারণ প্রশ্ন",
    items: [
      {
        q: "ফি কীভাবে দেব?",
        a: "বিকাশ, নগদ বা রকেটে। বুক করার সময় ফি দেখানো হয়, তারপর টাকা দেন।",
      },
      {
        q: "নেট দুর্বল হলে কি পরামর্শ নেওয়া যাবে?",
        a: "যাবে। ভিডিও না চললে অডিও কল করুন, অথবা শুধু ছবি পাঠিয়ে লিখিত পরামর্শ নিন।",
      },
      {
        q: "প্রেসক্রিপশনে কী কী থাকে?",
        a: "বিশেষজ্ঞের নাম ও নিবন্ধন নম্বর, ওষুধের নাম, মাত্রা, কত দিন চলবে, আর ফসল তোলা বা দুধ বিক্রির আগে কত দিন অপেক্ষা করতে হবে।",
      },
      {
        q: "কাউকে সরাসরি খামারে আনা যাবে?",
        a: "যাবে। সেবা তালিকার ‘মাঠ সেবা’ থেকে মাটি পরীক্ষা, কৃত্রিম প্রজনন বা চিকিৎসার জন্য ভিজিট বুক করুন।",
      },
    ],
  },
  closing: {
    title: "সমস্যা ছোট থাকতেই দেখিয়ে নিন",
    urgent: "জরুরি হলে ফোন করুন",
    krishi: "কৃষি কল সেন্টার",
    national: "জাতীয় হেল্পলাইন",
  },
  footer: {
    about: "ফসল, গবাদিপশু, হাঁস-মুরগি, মাছ ও পোষা প্রাণীর জন্য অনলাইন পরামর্শ।",
    groups: [
      {
        title: "সেবা",
        links: [
          { label: "ফসলের রোগ", href: "/services/crop-disease" },
          { label: "গরু-ছাগলের চিকিৎসা", href: "/services/cattle-health" },
          { label: "হাঁস-মুরগি", href: "/services/poultry-health" },
          { label: "মাছ চাষ", href: "/services/fisheries" },
          { label: "পোষা প্রাণী", href: "/services/pet-services" },
        ],
      },
      {
        title: "জানুন",
        links: [
          { label: "বিশেষজ্ঞ", href: "/experts" },
          { label: "প্রশ্নোত্তর", href: "/community" },
          { label: "গাইড", href: "/knowledge" },
          { label: "মাঠ সেবা", href: "/services/field-visits" },
        ],
      },
      {
        title: "অ্যাকাউন্ট",
        links: [
          { label: "আমার পাতা", href: "/portal" },
          { label: "পরামর্শ নিন", href: "/consult" },
        ],
      },
    ],
    contact: "যোগাযোগ",
    rights: "সর্বস্বত্ব সংরক্ষিত।",
  },
};

const en: HomeCopy = {
  brand: "SROT",
  nav: { services: "Services", experts: "Experts", community: "Q&A", guides: "Guides" },
  account: "My account",
  cta: "Get advice",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  languageLabel: "Language",
  navLabel: "Main menu",
  sentenceEnd: ".",
  hero: {
    title: "Sick crop or animal? Show it to a specialist from your phone.",
    body: "Send a photo or make a call. An agronomist or vet looks at the problem, then gives you advice and a written prescription.",
  },
  chooser: {
    title: "What do you need help with?",
    feeNote: (fee) => `Fees start at ${fee}. You see the fee before you pay.`,
  },
  tiles: [
    { category: "agri", label: "Crops", examples: "Rice, vegetables, fruit, maize" },
    { category: "veterinary", label: "Cattle & goats", examples: "Cows, bulls, goats, sheep" },
    { category: "poultry", label: "Poultry", examples: "Broilers, layers, ducks" },
    { category: "fisheries", label: "Fish", examples: "Ponds, ghers, shrimp" },
    { category: "pet", label: "Pets", examples: "Dogs, cats" },
  ],
  steps: {
    title: "How it works",
    items: [
      {
        title: "Tell us the problem",
        body: "Take a photo of the affected crop or animal. Write what happened and since when, in a line or two.",
      },
      {
        title: "Talk to a specialist",
        body: "By video call, audio call or photos only. Pick whichever your connection can handle.",
      },
      {
        title: "Get your prescription",
        body: "Which medicine, how much and for how long, all written down. Keep it on your phone and show it at the shop.",
      },
    ],
  },
  experts: {
    title: "Who you will talk to",
    body: "Pick a specialist and book directly.",
    seeAll: "See all experts",
    fee: "Fee",
    availableToday: "Available today",
    roles: { agri: null, veterinary: null, poultry: null, fisheries: null, pet: null },
  },
  more: {
    title: "More you can do",
    items: [
      {
        title: "Call someone to your farm",
        body: "For soil testing, artificial insemination or urgent treatment.",
        href: "/services/field-visits",
      },
      {
        title: "Ask other farmers",
        body: "Post a question. Farmers and experts answer.",
        href: "/community",
      },
      {
        title: "Read disease and care guides",
        body: "Common crop and animal diseases, the signs and what to do.",
        href: "/knowledge",
      },
      {
        title: "Use the farm tools",
        body: "Medicine dosage, weather, soil and crop calendar.",
        href: "/features",
      },
    ],
  },
  faq: {
    title: "Common questions",
    items: [
      {
        q: "How do I pay?",
        a: "By bKash, Nagad or Rocket. The fee is shown while you book, before you pay.",
      },
      {
        q: "Can I use it on a weak connection?",
        a: "Yes. If video does not work, use an audio call, or send photos and get written advice.",
      },
      {
        q: "What is on the prescription?",
        a: "The specialist's name and registration number, the medicine, the dose, how long to use it, and how long to wait before harvest or selling milk.",
      },
      {
        q: "Can someone come to my farm?",
        a: "Yes. Under Services, open Field services to book a visit for soil testing, artificial insemination or treatment.",
      },
    ],
  },
  closing: {
    title: "Get it looked at while the problem is still small",
    urgent: "Urgent? Call",
    krishi: "Krishi Call Centre",
    national: "National helpline",
  },
  footer: {
    about: "Online advice for crops, livestock, poultry, fish and pets.",
    groups: [
      {
        title: "Services",
        links: [
          { label: "Crop disease", href: "/services/crop-disease" },
          { label: "Cattle & goat care", href: "/services/cattle-health" },
          { label: "Poultry", href: "/services/poultry-health" },
          { label: "Fish farming", href: "/services/fisheries" },
          { label: "Pets", href: "/services/pet-services" },
        ],
      },
      {
        title: "Learn",
        links: [
          { label: "Experts", href: "/experts" },
          { label: "Q&A", href: "/community" },
          { label: "Guides", href: "/knowledge" },
          { label: "Field services", href: "/services/field-visits" },
        ],
      },
      {
        title: "Account",
        links: [
          { label: "My account", href: "/portal" },
          { label: "Get advice", href: "/consult" },
        ],
      },
    ],
    contact: "Contact",
    rights: "All rights reserved.",
  },
};

export const HOME_COPY: Record<Language, HomeCopy> = { bn, en };
