"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  Calendar,
  Wheat,
  Milk,
  HeartHandshake,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Droplets,
  AlertTriangle,
  FileCheck2,
  Fish,
} from "lucide-react";

interface ScheduleItem {
  stage: string;
  stageBn: string;
  threat: string;
  threatBn: string;
  action: string;
  actionBn: string;
  timing: string;
  timingBn: string;
  urgency: "high" | "medium" | "preventive";
  dosageSummary: string;
}

interface SectorSchedule {
  name: string;
  nameBn: string;
  category: "agri" | "livestock" | "pet";
  iconName: string;
  seasonContext: string;
  seasonContextBn: string;
  schedule: ScheduleItem[];
  expertType: string;
  expertTypeBn: string;
  consultQuery: string;
}

const SCHEDULES: Record<string, SectorSchedule> = {
  rice: {
    name: "Bangladesh Boro & Aman Rice",
    nameBn: "বোরো ও আমন ধান (BRRI জাতসমূহ)",
    category: "agri",
    iconName: "wheat",
    seasonContext: "Active Tillering to Panicle Emergence Stage in Bangladesh",
    seasonContextBn: "কুশি গজানো থেকে থোড় আসার গুরুত্বপূর্ণ পর্যায়",
    expertType: "BRRI-Accredited Cereal Agronomist",
    expertTypeBn: "ধান গবেষণা ও রোগ বিশেষজ্ঞ",
    consultQuery: "crop-disease",
    schedule: [
      {
        stage: "Seedling & Nursery (বীজতলা পর্যায়)",
        stageBn: "বীজতলা ও চারা পর্যায় (০-২৫ দিন)",
        threat: "Damping Off & Thrips (পাউডার ব্লাইট ও চারা পোকা)",
        threatBn: "বীজতলার পচা রোগ ও থ্রিপস পোকা",
        action: "Seed treatment with Carbendazim (Autostin 50 WDG @ 2g/kg seed).",
        actionBn: "বীজ শোধন: প্রতি কেজি ধানের বীজে ২ গ্রাম অটোস্টিন/কার্বেনডাজিম মিশিয়ে শুকিয়ে ফেলুন।",
        timing: "Before Sowing",
        timingBn: "বীজ বপনের পূর্বে",
        urgency: "preventive",
        dosageSummary: "Carbendazim 50% WDG @ 2.0 g/kg seed",
      },
      {
        stage: "Active Tillering (কুশি বৃদ্ধি পর্যায়)",
        stageBn: "কুশি বৃদ্ধি পর্যায় (৩০-৪৫ দিন)",
        threat: "Stem Borer & Leaf Folder (মাজরা পোকা ও পাতা মোড়ানো পোকা)",
        threatBn: "হলুদ মাজরা পোকা ও পাতা মোড়ানো পোকার আক্রমণ",
        action: "Perching (ডালপালা পোতা); Apply Virtako 40WG @ 1.5g/10L if dead heart > 5%.",
        actionBn: "জমিতে পার্চিং (প্রতি বিঘায় ৮-১০টি বাঁশের কঞ্চি পোতা); মাজরা বেশি হলে ভিরতাকো বা কার্বোফিউরান প্রয়োগ।",
        timing: "Next 5-7 Days",
        timingBn: "আগামী ৫-৭ দিনের মধ্যে",
        urgency: "high",
        dosageSummary: "Virtako 40WG @ 75g/acre or Cartap 4G @ 4kg/bigha",
      },
      {
        stage: "Panicle & Booting (থোড় ও শিষ বের হওয়া)",
        stageBn: "থোড় ও শিষ বের হওয়ার পর্যায় (৫০-৬৫ দিন)",
        threat: "Neck Blast & Sheath Blight (শীষ ব্লাস্ট ও খোলপচা)",
        threatBn: "ঘাড় ব্লাস্ট (Pyricularia oryzae) ও খোলপচা রোগ",
        action: "Spray Tricyclazole (Trooper 75 WP @ 0.8g/L) or Nativo 75 WG twice before panicle opens.",
        actionBn: "বিকেলে ট্রুপার বা নাটিভো স্প্রে করুন। প্রথমবার থোড় ফাটার আগে, দ্বিতীয়বার শিষ বের হলে।",
        timing: "Strict 10-day Window",
        timingBn: "১০ দিনের মধ্যে আবশ্যক",
        urgency: "high",
        dosageSummary: "Tricyclazole 75% WP @ 120 g/acre; 21d withholding",
      },
      {
        stage: "Milking & Grain Hardening (দুধ ও দানা শক্ত হওয়া)",
        stageBn: "দুধ ও দানা শক্ত হওয়া পর্যায় (৭০-৮৫ দিন)",
        threat: "Rice Gundhi Bug & Brown Planthopper (গান্ধী পোকা ও কারেন্ট পোকা)",
        threatBn: "গান্ধী পোকা ও বাদামি গাছফড়িং (কারেন্ট পোকা)",
        action: "Inspect base of hills. Drain excess standing water if BPH nymphs detected.",
        actionBn: "গোড়ায় কারেন্ট পোকা দেখলে ক্ষেতের পানি সরিয়ে দিন। প্রয়োজনে পাইমেট্রোজিন স্প্রে করুন।",
        timing: "Late Season Watch",
        timingBn: "দানা পরিপক্ক হওয়া পর্যন্ত",
        urgency: "medium",
        dosageSummary: "Pymetrozine 50% WDG @ 120 g/acre at plant base",
      },
    ],
  },
  cattle: {
    name: "Dairy Cattle Herd & Crossbreds",
    nameBn: "ডেইরি গাভী ও উন্নত ক্রস জাত",
    category: "livestock",
    iconName: "milk",
    seasonContext: "Holstein-Friesian Cross & Sahiwal Dairy Management BD",
    seasonContextBn: "উন্নত ফ্রিজিয়ান ক্রস গাভীর দুধ উৎপাদন ও স্বাস্থ্য সুরক্ষা",
    expertType: "Registered Veterinary Surgeon (BVC)",
    expertTypeBn: "নিবন্ধিত ভেটেরিনারি সার্জন",
    consultQuery: "veterinary-consultation",
    schedule: [
      {
        stage: "Early Lactation (বাচ্চা প্রসবের পর ০-৬০ দিন)",
        stageBn: "প্রসব পরবর্তী শুরুর দুধের পর্যায় (০-৬০ দিন)",
        threat: "Subclinical Mastitis & Milk Fever (ওলান পাকা ও ক্যালসিয়াম ঘাটতি)",
        threatBn: "লুক্কায়িত ওলান পাকা রোগ ও মিল্ক ফিভার",
        action: "Weekly California Mastitis Test (CMT); oral calcium borogluconate supplement.",
        actionBn: "প্রতি সপ্তাহে সিএমটি (CMT) টেস্ট করুন; প্রসবের পর নিয়মিত তরল ক্যালসিয়াম জেল খাওয়ান।",
        timing: "Continuous",
        timingBn: "নিয়মিত পর্যবেক্ষণ",
        urgency: "high",
        dosageSummary: "Oral Calcium Gel 300g BID + Intramammary Ceftiofur if CMT > 2+",
      },
      {
        stage: "Seasonal Disease Vaccine (খুরা রোগ প্রতিরোধ)",
        stageBn: "খুরা রোগ (FMD) ও বাদলা ভ্যাকসিনেশন",
        threat: "Foot and Mouth Disease (FMD) & Hemorrhagic Septicemia (HS)",
        threatBn: "খুরারোগ ও গলাফুলা (FMD & HS) মহামারি",
        action: "Administer quadrivalent FMD oil adjuvant vaccine subcutaneously.",
        actionBn: "বর্ষার পূর্বে এফএমডি (FMD) তেলযুক্ত টিকা চামড়ার নিচে দিন।",
        timing: "Pre-Monsoon & Bi-annual",
        timingBn: "বছরে দুইবার (৬ মাস অন্তর)",
        urgency: "high",
        dosageSummary: "FMD Inactivated Quadrivalent Vaccine 2 ml S/C per head",
      },
      {
        stage: "Deworming Cycle (নিয়মিত কৃমিনাশক)",
        stageBn: "লিভার ফ্লুক ও পেটের কৃমিনাশক চক্র",
        threat: "Fascioliasis (কলিজা কৃমি) & Paramphistomiasis from green grass",
        threatBn: "হালকা ভেজা ঘাস খাওয়ার কারণে কলিজা কৃমি ও বদহজম",
        action: "Oral Triclabendazole + Levamisole bolus on empty stomach.",
        actionBn: "সকালে খালি পেটে ট্রাইক্লাবেনডাজল বোলাস খাওয়ান। দুধের উইথহোল্ডিং মানুন।",
        timing: "Every 90-100 Days",
        timingBn: "প্রতি ৩ মাস পর পর",
        urgency: "medium",
        dosageSummary: "Triclabendazole 900mg + Levamisole 375mg per 100 kg weight",
      },
      {
        stage: "Dry Period & Teat Seal (দুধ দোহন বন্ধের সময়)",
        stageBn: "দুধ বন্ধের পর্যায় (প্রসবের ৬০ দিন পূর্বে)",
        threat: "Environmental Coliform Mastitis in Dry Udder",
        threatBn: "ওলানে বিষাক্ত ব্যাকটেরিয়া আক্রমণ ও শুকনো ওলান ফোলা",
        action: "Infuse long-acting dry cow cloxacillin into all 4 quarters.",
        actionBn: "দুধ দোহন বন্ধের দিন চার বাঁটেই ড্রাই-কাউ টিউব পুশ করে সিল করুন।",
        timing: "At Final Milking",
        timingBn: "শেষ দুধ দোহনের দিন",
        urgency: "preventive",
        dosageSummary: "Cloxacillin Benzathine 500 mg per quarter + bismuth subnitrate",
      },
    ],
  },
  goat: {
    name: "Black Bengal Goat Farming",
    nameBn: "ব্ল্যাক বেঙ্গল ছাগল ও ভেড়া পালন",
    category: "livestock",
    iconName: "milk",
    seasonContext: "Bangladesh National Black Bengal Biosecurity Protocol",
    seasonContextBn: "ব্ল্যাক বেঙ্গল ছাগলের পিপিআর ও ঠান্ডা লাগা প্রতিরোধ",
    expertType: "Small Ruminant Veterinarian",
    expertTypeBn: "ছাগল ও ভেড়া রোগ বিশেষজ্ঞ",
    consultQuery: "veterinary-consultation",
    schedule: [
      {
        stage: "PPR Vaccination (পিপিআর রোগ প্রতিরোধ)",
        stageBn: "পিপিআর ভ্যাকসিন (সবচেয়ে বিপজ্জনক ছাগল রোগ)",
        threat: "Peste des Petits Ruminants (ছাগলের মহামারি প্লেগ)",
        threatBn: "পিপিআর রোগ (চোখ-নাক দিয়ে পানি, পাতলা পায়খানা ও ঘা)",
        action: "Mandatory live attenuated PPR vaccine at 3 months age.",
        actionBn: "৩ মাস বয়সের পর ১ মিলি পিপিআর টিকা চামড়ার নিচে দিন। ৩ বছরের প্রতিরোধ ক্ষমতা দেয়।",
        timing: "At 3 Months Age",
        timingBn: "৩ মাস বয়সে প্রথম ডোজ",
        urgency: "high",
        dosageSummary: "PPR Homologous Live Vaccine 1 ml S/C per goat",
      },
      {
        stage: "Kid Cold & Pneumonia (বাচ্চার ঠান্ডা ও নিউমোনিয়া)",
        stageBn: "বাচ্চা ছাগলের নিউমোনিয়া ও পাতলা পায়খানা",
        threat: "Pasteurella multocida & Goat Enterotoxemia (ডায়রিয়া)",
        threatBn: "শীতকালে ঠান্ডা লেগে কাশি, নিউমোনিয়া ও পাতলা পায়খানা",
        action: "Keep floor dry with wooden slats; Tylosin/Tilmicosin if wheezing detected.",
        actionBn: "মাচা পদ্ধতিতে শুকনো রাখুন; শ্বাসকষ্ট দেখলে দ্রুত ভেটেরিনারি পরামর্শে অ্যান্টিবায়োটিক দিন।",
        timing: "Winter & Monsoon",
        timingBn: "শীতকাল ও বর্ষাকালে",
        urgency: "high",
        dosageSummary: "Tylosin 10mg/kg I/M or Oxytetracycline L.A.",
      },
      {
        stage: "FAMACHA Deworming (কৃমি পর্যবেক্ষণ)",
        stageBn: "চোখের পাতা দেখে রক্তস্বল্পতা ও কৃমিনাশক",
        threat: "Haemonchus contortus (বার্বার পোল কৃমি)",
        threatBn: "রক্তখেকো কৃমির কারণে ছাগলের গলায় পানি নামা (বটল জ)",
        action: "Check lower eyelid color. If pale white (Grade 4-5), administer Albendazole.",
        actionBn: "চোখের ভেতরের পাতা সাদা হলে অবিলম্বে অ্যালবেনডাজল বা আইভারমেকটিন ইনজেকশন দিন।",
        timing: "Monthly Check",
        timingBn: "প্রতি মাসে একবার পরীক্ষা",
        urgency: "medium",
        dosageSummary: "Albendazole suspension @ 7.5 mg/kg or Ivermectin 1% @ 0.2 mg/kg S/C",
      },
      {
        stage: "Mineral Salt Block (খনিজ লবণ ও পুষ্টি)",
        stageBn: "খনিজ লবণের ব্লক ও ভিটামিন",
        threat: "Mineral Deficiency, Pica (মাটি খাওয়া) & Slow Weight Gain",
        threatBn: "খনিজ ঘাটতি, ছাগলের মাটি খাওয়া ও কম ওজন বৃদ্ধি",
        action: "Hang trace mineral salt lick blocks in all goat sheds.",
        actionBn: "শেডে খনিজ লবণের ইট (মিনারেল ব্লক) ঝুলিয়ে দিন যাতে পছন্দমতো চাটতে পারে।",
        timing: "Always Available",
        timingBn: "সারাবছর শেডে রাখা",
        urgency: "preventive",
        dosageSummary: "Mineral lick block with Zinc, Copper, Cobalt, and Selenium",
      },
    ],
  },
  fisheries: {
    name: "Pond Aquaculture & Fish Gher",
    nameBn: "পুকুরের মাছ চাষ ও ঘের কালচার",
    category: "livestock",
    iconName: "fish",
    seasonContext: "Carp, Pangas, Tilapia & Shrimp Pond Chemistry BD",
    seasonContextBn: "রুই, কাতলা, পাঙ্গাশ, তেলাপিয়া ও চিংড়ি ঘের ব্যবস্থাপনা",
    expertType: "Aquaculture & Fish Health Specialist",
    expertTypeBn: "মৎস্য বিশেষজ্ঞ ও জলজ রোগতত্ত্ববিদ",
    consultQuery: "veterinary-consultation",
    schedule: [
      {
        stage: "Winter Epizootic Ulcerative Syndrome (মাছের ক্ষতরোগ)",
        stageBn: "শীতকালীন মাছের ক্ষতরোগ (EUS)",
        threat: "Aphanomyces invadans fungal ulcers & fin rot",
        threatBn: "শীতকালে মাছের গায়ে লাল দাগ, ক্ষতরোগ ও লেজ-পাখনা পচা",
        action: "Apply Agricultural Lime @ 1 kg/decimal + Potassium Permanganate (KMNO4).",
        actionBn: "প্রতি শতাংশে ১ কেজি চুন গুলিয়ে দিন এবং ১০০-১৫০ গ্রাম পটাশ ছিটান।",
        timing: "Pre-Winter (কার্তিক-অগ্রহায়ণ)",
        timingBn: "শীতের শুরুতে",
        urgency: "high",
        dosageSummary: "CaCO3 @ 1.0 kg/dec + KMnO4 @ 150g/dec dissolved in water",
      },
      {
        stage: "Early Morning Oxygen Crash (ভোরে মাছের খাবি খাওয়া)",
        stageBn: "ভোরে অক্সিজেনের ঘাটতি ও মাছের খাবি খাওয়া",
        threat: "Dissolved Oxygen (DO) crash < 3.0 mg/L in densely stocked ponds",
        threatBn: "ঘন মেঘলা দিনে বা অতিরিক্ত ঘনত্বে পানিতে অক্সিজেনের মারাত্মক ঘাটতি",
        action: "Activate aerator / splash water; broadcast sodium percarbonate oxygen tablets.",
        actionBn: "পুকুরে পানি ছিটান বা সাঁতার কাটুন; দ্রুত অক্সিট্যাব/অক্সিজেন ট্যাবলেট ছিটিয়ে দিন।",
        timing: "Cloudy / Humid Nights",
        timingBn: "মেঘলা রাত ও ভোরবেলায়",
        urgency: "high",
        dosageSummary: "Sodium Percarbonate granules @ 200-300 g/decimal immediately",
      },
      {
        stage: "Toxic Gas & Bottom Sludge (পুকুরের তলায় বিষাক্ত গ্যাস)",
        stageBn: "পুকুরের তলদেশে বিষাক্ত গ্যাস (অ্যামোনিয়া ও হাইড্রোজেন সালফাইড)",
        threat: "Unionized Ammonia (NH3) & Black Bottom Sludge",
        threatBn: "অতিরিক্ত ফিডের অপচয়ে তলায় কালো কাদা ও ঝাঁঝালো গ্যাস সৃষ্টি",
        action: "Apply high-grade Zeolite powder @ 1.5 kg/decimal + probiotic bacteria.",
        actionBn: "জিওলাইট পাউডার প্রতি শতকে দেড় কেজি ও প্রোবায়োটিক ছিটিয়ে গ্যাস দূর করুন।",
        timing: "Every 45-60 Days",
        timingBn: "দেড়-দুই মাস পর পর",
        urgency: "medium",
        dosageSummary: "Granular Zeolite 1.5 kg/decimal evenly across pond bottom",
      },
      {
        stage: "Bi-Monthly Health Sampling (নিয়মিত মাছের স্বাস্থ্য পরীক্ষা)",
        stageBn: "জাল টেনে মাছের বৃদ্ধি ও পরজীবী পরীক্ষা",
        threat: "Argulus (Fish Lice / মাছের উকুন) & Gill Flukes",
        threatBn: "মাছের উকুন (আরগুলাস) ও ফুলকা পচা পরজীবী",
        action: "Net sample 20-30 fish; check gills for bright red color and free of parasites.",
        actionBn: "জাল টেনে মাছের ওজন ও ফুলকা পরীক্ষা করুন। উকুন থাকলে আইভারমেকটিন বা সাইপারমেথ্রিন দিন।",
        timing: "Bi-weekly",
        timingBn: "মাসে দুইবার",
        urgency: "preventive",
        dosageSummary: "Salt dip (2% saline bath) for juveniles or Emamectin benzoate feed mix",
      },
    ],
  },
  canine: {
    name: "Companion Pets in Bangladesh",
    nameBn: "পোষা বিড়াল ও কুকুর (Companion Pets)",
    category: "pet",
    iconName: "heart",
    seasonContext: "Urban Pet Vaccination & Parasite Prophylaxis (Dhaka/Chittagong)",
    seasonContextBn: "পোষা প্রাণীর ভ্যাকসিন, কৃমি ও চামড়ার রোগ প্রতিরোধ",
    expertType: "Small Animal Tele-Vet (BVC Registered)",
    expertTypeBn: "ভেটেরিনারি সার্জন (ছোট প্রাণী)",
    consultQuery: "pet-telehealth",
    schedule: [
      {
        stage: "Parvovirus & Core DHPP (পারভোভাইরাস ভ্যাকসিন)",
        stageBn: "ক্যানাইন পারভো ও ক্যাট প্যানলিউকোপেনিয়া",
        threat: "Canine Parvo (CPV) & Feline Distemper (মারাত্মক ডায়রিয়া ও বমি)",
        threatBn: "অল্প বয়সী কুকুরের রক্ত আমাশয় ও বিড়ালের সংক্রামক জ্বর",
        action: "Core combination vaccine (DHPPi/FVRCP) starting at 6-8 weeks age.",
        actionBn: "৬-৮ সপ্তাহ বয়সে প্রথম ডোজ দিন। কোনোভাবেই টিকা শেষ না হওয়া পর্যন্ত বাইরে নিবেন না।",
        timing: "6-8 Weeks + Booster",
        timingBn: "৬-৮ সপ্তাহ বয়সে",
        urgency: "high",
        dosageSummary: "DHPP 1.0 ml S/C + Booster shot after 21 days",
      },
      {
        stage: "Mandatory Rabies Vaccine (জলাতঙ্ক টিকা)",
        stageBn: "বাধ্যতামূলক জলাতঙ্ক (Rabies) টিকা",
        threat: "Rabies Virus (মানুষ ও প্রাণীর উভয়ের জন্য প্রাণঘাতী)",
        threatBn: "জলাতঙ্ক রোগ সংক্রমণ ও প্রতিরোধ",
        action: "Administer inactivated rabies vaccine at 12-16 weeks; official QR certificate.",
        actionBn: "৩-৪ মাস বয়সে জলাতঙ্ক টিকা দিন। প্রতি বছর একবার বুস্টার ডোজ দেওয়া আবশ্যক।",
        timing: "At 3 Months + Annual",
        timingBn: "৩ মাসে প্রথম, এরপর প্রতি বছর",
        urgency: "high",
        dosageSummary: "Inactivated Rabies 1 ml S/C; verifiable digital vaccination card",
      },
      {
        stage: "Skin Allergy & Ticks (চামড়ার অ্যালার্জি ও উকুন)",
        stageBn: "উষ্ণ আবহাওয়ায় উকুন, এঁটেল পোকা ও চুলকানি",
        threat: "Flea & Tick-borne Anemia, Demodex Mange & Ringworm",
        threatBn: "চামড়ায় ঘা, চুলকানি, লোম ওঠা ও টিক ফিভার",
        action: "Monthly topical spot-on (Fipronil) or oral chewable (Bravecto/Nexgard).",
        actionBn: "ঘাড়ের পেছনের চামড়ায় স্পট-অন দিন অথবা চিকিৎসকের পরামর্শে চিবোনো ট্যাবলেট খাওয়ান।",
        timing: "Monthly in Summer",
        timingBn: "গরম ও বর্ষার মৌসুমে প্রতি মাসে",
        urgency: "medium",
        dosageSummary: "Weight-titrated oral isoxazoline or Fipronil 0.67 ml - 2.68 ml spot-on",
      },
      {
        stage: "Routine Deworming (নিয়মিত কৃমিনাশক)",
        stageBn: "নিয়মিত পেটের কৃমিনাশক টেবলেট",
        threat: "Roundworms, Hookworms & Tapeworms",
        threatBn: "পেট ফোলা, বমি ও ওজন কমে যাওয়া",
        action: "Administer broad-spectrum Praziquantel + Pyrantel pamoate tablet per 10 kg weight.",
        actionBn: "প্রতি ১০ কেজি ওজনের জন্য ১টি ড্রোন্টাল প্লাস বা সমমানের কৃমিনাশক ট্যাবলেট খাওয়ান।",
        timing: "Every 90 Days",
        timingBn: "প্রতি ৩ মাস পর পর",
        urgency: "preventive",
        dosageSummary: "Praziquantel 50mg + Pyrantel 144mg per 10 kg body mass",
      },
    ],
  },
};

export function CropLivestockCalendar() {
  const { language } = useLanguageStore();
  const [selectedKey, setSelectedKey] = useState<string>("rice");
  const isBn = language === "bn";
  const current = SCHEDULES[selectedKey];

  return (
    <div className="srot-glass-card hover-glow-emerald rounded-3xl p-6 sm:p-10 border border-slate-800 bg-gradient-to-b from-slate-900/85 via-[#071018] to-slate-950 shadow-2xl relative overflow-hidden group">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all" />

      {/* Title & Selector Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Calendar className="w-4 h-4" />
            <span>
              {isBn
                ? "বাংলাদেশের ফসল ও প্রাণিসম্পদ স্বাস্থ্য সময়সূচি"
                : "Bangladesh Agro & Animal Health Schedule"}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {isBn
              ? "মৌসুমভিত্তিক বালাইনাশক স্প্রে ও টিকা প্রদানের প্রটোকল"
              : "Seasonal Spray Windows & Animal Vaccination Protocols"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {isBn
              ? "আপনার ফসল বা প্রাণী নির্বাচন করে বৃদ্ধির পর্যায়ভিত্তিক রোগজীবাণুর ঝুঁকি, অনুমোদিত রাসায়নিক/জৈব বালাইনাশকের সঠিক ডোজ এবং প্রি-হার্ভেস্ট সেফটি নিয়ম জানুন।"
              : "Select your crop or livestock to view stage-by-stage clinical alerts, highest risk pathogens, chemical/biological dosages, and statutory withholding periods."}
          </p>
        </div>

        {/* Entity Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {[
            { key: "rice", label: isBn ? "🌾 বোরো/আমন ধান" : "🌾 Paddy Rice" },
            { key: "cattle", label: isBn ? "🐄 ডেইরি গাভী" : "🐄 Dairy Cattle" },
            { key: "goat", label: isBn ? "🐐 ব্ল্যাক বেঙ্গল ছাগল" : "🐐 Black Bengal" },
            { key: "fisheries", label: isBn ? "🐟 পুকুরের মাছ/ঘের" : "🐟 Aquaculture" },
            { key: "canine", label: isBn ? "🐕 পোষা প্রাণী" : "🐕 Companion Pet" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedKey(item.key)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap ${
                selectedKey === item.key
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60 border border-emerald-400/40"
                  : "bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Selection Context Header */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/70 px-4 rounded-2xl border border-slate-800/80 my-6">
        <div className="flex items-center gap-2 text-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white text-sm">
            {isBn ? current.nameBn : current.name}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-mono text-[11px]">
            {isBn ? current.seasonContextBn : current.seasonContext}
          </span>
        </div>

        <Link
          href={`/consult?service=${current.consultQuery}`}
          className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition hover:translate-x-0.5"
        >
          <span>{isBn ? `পরামর্শ নিন (${current.expertTypeBn})` : `Consult a ${current.expertType}`}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Timeline Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {current.schedule.map((step, idx) => {
          const urgencyColor =
            step.urgency === "high"
              ? "border-red-500/40 bg-red-950/20 text-red-400"
              : step.urgency === "medium"
              ? "border-amber-500/40 bg-amber-950/20 text-amber-400"
              : "border-emerald-500/40 bg-emerald-950/20 text-emerald-400";

          return (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    STAGE 0{idx + 1}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${urgencyColor}`}
                  >
                    {isBn
                      ? step.urgency === "high"
                        ? "উচ্চ ঝুঁকি"
                        : step.urgency === "medium"
                        ? "মাঝারি ঝুঁকি"
                        : "প্রতিরোধক"
                      : step.urgency === "high"
                      ? "High Risk"
                      : step.urgency === "medium"
                      ? "Moderate Risk"
                      : "Preventive"}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                  {isBn ? step.stageBn : step.stage}
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-red-400/90 block font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {isBn ? "প্রধান রোগ / পোকার আক্রমণ:" : "Critical Pathogen / Threat:"}
                    </span>
                    <p className="text-slate-300 font-medium text-[11px] mt-0.5">
                      {isBn ? step.threatBn : step.threat}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-emerald-400/90 block font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {isBn ? "প্রয়োজনীয় ব্যবস্থা / প্রটোকল:" : "Prescribed Action / Protocol:"}
                    </span>
                    <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                      {isBn ? step.actionBn : step.action}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timing & Dosage Footprint */}
              <div className="pt-3 mt-3 border-t border-slate-800/80 text-[11px] space-y-1">
                <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{isBn ? "সময়সূচি:" : "TIMING:"}</span>
                  </span>
                  <span className="text-white font-medium">
                    {isBn ? step.timingBn : step.timing}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono bg-slate-950 p-1.5 rounded-lg border border-slate-800 truncate">
                  <span className="text-emerald-400">Rx:</span> {step.dosageSummary}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Legal & Triage Disclaimer */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-emerald-400" />
          <span>
            {isBn
              ? "সকল স্প্রে উইন্ডো ও ভ্যাকসিনেশন প্রটোকল বাংলাদেশ কৃষি গবেষণা পরিষদ (BARC), বিআরআরআই এবং ডিএলএস গাইডলাইন অনুযায়ী প্রস্তুত।"
              : "All spray windows and vaccine schedules adhere to BRRI, BARI, DLS, and FAO clinical standards."}
          </span>
        </div>
        <Link
          href={`/consult?service=${current.consultQuery}`}
          className="btn-shimmer px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition text-xs shrink-0 flex items-center gap-1"
        >
          <span>{isBn ? "প্রেসক্রিপশন নিন" : "Book Protocol Consultation"}</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
