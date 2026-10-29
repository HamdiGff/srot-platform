export interface VaccinationRecord {
  id: string;
  name: {
    en: string;
    bn: string;
  };
  dueDate: string;
  status: "completed" | "upcoming" | "overdue";
  administeredBy?: string;
  notes: {
    en: string;
    bn: string;
  };
}

export interface AnimalHealthCard {
  id: string;
  tagNumber: string;
  name: string;
  species: "cattle" | "goat" | "sheep" | "poultry" | "fisheries" | "pet";
  speciesLabel: {
    en: string;
    bn: string;
  };
  breed: string;
  gender: "Female" | "Male";
  age: string;
  weightKg: number;
  healthStatus: "healthy" | "treatment" | "lactating" | "quarantine";
  healthStatusLabel: {
    en: string;
    bn: string;
  };
  avatarUrl: string;
  dailyYieldLiters?: number;
  vaccinations: VaccinationRecord[];
  recentPrescriptionId?: string;
  recentDiagnosis?: {
    en: string;
    bn: string;
  };
}

export interface CropCycleRecord {
  id: string;
  plotName: {
    en: string;
    bn: string;
  };
  cropName: {
    en: string;
    bn: string;
  };
  variety: string;
  acreageBigha: number;
  sowingDate: string;
  growthStage: {
    en: string;
    bn: string;
  };
  progressPercentage: number;
  targetHarvestDate: string;
  expectedYieldMounds: number;
  nextScheduledSpray: {
    chemical: string;
    targetDisease: {
      en: string;
      bn: string;
    };
    scheduledDate: string;
    withholdingDays: number;
  };
}

export interface FarmFinancialSummary {
  totalAcreageBigha: number;
  totalLivestockCount: number;
  monthlyInputExpense: number;
  monthlyProductionRevenue: number;
  netMargin: number;
  currency: string;
}

export const MOCK_ANIMALS: AnimalHealthCard[] = [
  {
    id: "cow-101",
    tagNumber: "BD-DAIRY-108",
    name: "Shundori (সুন্দরী)",
    species: "cattle",
    speciesLabel: {
      en: "Dairy Cow",
      bn: "দুগ্ধবতী গাভী",
    },
    breed: "Holstein Friesian Cross (75%)",
    gender: "Female",
    age: "3 Years 2 Months",
    weightKg: 420,
    healthStatus: "lactating",
    healthStatusLabel: {
      en: "Lactating & Healthy",
      bn: "দুগ্ধবতী ও সুস্থ",
    },
    avatarUrl: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=400&q=80",
    dailyYieldLiters: 19.5,
    recentPrescriptionId: "RX-2026-8910",
    recentDiagnosis: {
      en: "Subclinical Mastitis Recovery - Treated with Cefquinome Infusion",
      bn: "ম্যাসটাইটিস নিরাময় সম্পন্ন - সেফকুইনম ইনফিউশন সম্পন্ন",
    },
    vaccinations: [
      {
        id: "v-1",
        name: {
          en: "Lumpy Skin Disease (LSD) Goat Pox Vaccine",
          bn: "লাম্পি স্কিন ডিজিজ (LSD) ভ্যাকসিন",
        },
        dueDate: "15 Nov 2026",
        status: "upcoming",
        notes: {
          en: "Annual booster dose recommended before mosquito breeding peak",
          bn: "মশার প্রজনন বৃদ্ধির আগেই বার্ষিক বুস্টার ডোজ সম্পন্ন করুন",
        },
      },
      {
        id: "v-2",
        name: {
          en: "Foot and Mouth Disease (FMD Quadrivalent)",
          bn: "খুরা রোগ (FMD) ৪-ভ্যালেন্ট ভ্যাকসিন",
        },
        dueDate: "10 Oct 2026",
        status: "completed",
        administeredBy: "Dr. Ananya Sen, D.V.M. (BVC 4109)",
        notes: {
          en: "Administered subcutaneous behind the neck. Zero side effects noted.",
          bn: "ঘাড়ের চামড়ার নিচে পুশ করা হয়েছে। কোনো পার্শ্বপ্রতিক্রিয়া নেই।",
        },
      },
      {
        id: "v-3",
        name: {
          en: "Anthrax Spore Vaccine",
          bn: "তড়কা (Anthrax) স্পোর ভ্যাকসিন",
        },
        dueDate: "05 Jan 2027",
        status: "upcoming",
        notes: {
          en: "Pre-flood seasonal prophylactic inoculation",
          bn: "বন্যা মৌসুমের পূর্ব সতর্কতামূলক টিকা",
        },
      },
    ],
  },
  {
    id: "cow-102",
    tagNumber: "BD-DAIRY-114",
    name: "Lal Badshah (লাল বাদশা)",
    species: "cattle",
    speciesLabel: {
      en: "Breeding Bull",
      bn: "প্রজনন ষাঁড়",
    },
    breed: "Red Chittagong Cattle (RCC)",
    gender: "Male",
    age: "2 Years 6 Months",
    weightKg: 380,
    healthStatus: "healthy",
    healthStatusLabel: {
      en: "Prime Condition",
      bn: "চমৎকার স্বাস্থ্য",
    },
    avatarUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=400&q=80",
    vaccinations: [
      {
        id: "v-4",
        name: {
          en: "Black Quarter (BQ) Vaccine",
          bn: "বাদলা (BQ) ভ্যাকসিন",
        },
        dueDate: "20 Dec 2026",
        status: "upcoming",
        notes: {
          en: "Deep intramuscular inoculation schedule",
          bn: "গভীর মাংসে প্রয়োগযোগ্য নির্ধারিত টিকা",
        },
      },
      {
        id: "v-5",
        name: {
          en: "Broad Spectrum Deworming (Triclabendazole)",
          bn: "লিভার ফ্লুক ও কৃমিনাশক ডোজ",
        },
        dueDate: "01 Oct 2026",
        status: "completed",
        administeredBy: "Veterinary Field Assistant, Bogura",
        notes: {
          en: "Administered with molasses bolus. Fecal egg count now zero.",
          bn: "মোলাসেসের সাথে সেবন করানো হয়েছে। কৃমিমুক্ত নিশ্চিত।",
        },
      },
    ],
  },
  {
    id: "goat-201",
    tagNumber: "BD-CAP-045",
    name: "Kalo Manik (কালো মানিক)",
    species: "goat",
    speciesLabel: {
      en: "Black Bengal Goat",
      bn: "ব্ল্যাক বেঙ্গল ছাগল",
    },
    breed: "Pure Black Bengal",
    gender: "Female",
    age: "1 Year 4 Months",
    weightKg: 24,
    healthStatus: "healthy",
    healthStatusLabel: {
      en: "Pregnant (1st Trimester)",
      bn: "গর্ভবতী (১ম ত্রৈমাসিক)",
    },
    avatarUrl: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=400&q=80",
    vaccinations: [
      {
        id: "v-6",
        name: {
          en: "PPR (Peste des Petits Ruminants) Vaccine",
          bn: "পিপিআর (PPR) ভাইরাস ভ্যাকসিন",
        },
        dueDate: "14 Sep 2026",
        status: "completed",
        administeredBy: "Upazila Livestock Hospital, Sherpur",
        notes: {
          en: "Lifetime immunity dose completed with DLS ear notch verification.",
          bn: "ডিএলএস প্রত্যয়িত আজীবন প্রতিরোধক টিকা সম্পন্ন।",
        },
      },
    ],
  },
];

export const MOCK_CROPS: CropCycleRecord[] = [
  {
    id: "crop-01",
    plotName: {
      en: "North Field Plot A (North Boro Sector)",
      bn: "উত্তর মাঠ প্লট এ (বোরো ধান)",
    },
    cropName: {
      en: "Boro Rice",
      bn: "বোরো ধান",
    },
    variety: "BRRI dhan-28 High Yield",
    acreageBigha: 2.5,
    sowingDate: "20 Dec 2025",
    growthStage: {
      en: "Tillering & Panicle Initiation (কুশি গজানো)",
      bn: "কুশি গজানো ও থোর আসা পর্যায়",
    },
    progressPercentage: 55,
    targetHarvestDate: "25 Apr 2026",
    expectedYieldMounds: 52,
    nextScheduledSpray: {
      chemical: "Tricyclazole 75% WP + Silica Foliar Fertilizer",
      targetDisease: {
        en: "Neck Blast & Brown Spot Prevention",
        bn: "শীষ ব্লাস্ট ও বাদামি দাগ রোগ প্রতিরোধ",
      },
      scheduledDate: "05 Nov 2026",
      withholdingDays: 21,
    },
  },
  {
    id: "crop-02",
    plotName: {
      en: "South Homestead Plot B (Winter Mustard)",
      bn: "দক্ষিণ ভিটা প্লট বি (বারি সরিষা-১৪)",
    },
    cropName: {
      en: "Mustard Cash Crop",
      bn: "সরিষা আবাদ",
    },
    variety: "BARI Sarisha-14 (Short Duration)",
    acreageBigha: 1.2,
    sowingDate: "05 Nov 2025",
    growthStage: {
      en: "Flowering & Pod Formation (ফুল ও শুঁটি)",
      bn: "ফুল ও দানা গঠনের পর্যায়",
    },
    progressPercentage: 70,
    targetHarvestDate: "10 Feb 2026",
    expectedYieldMounds: 8.5,
    nextScheduledSpray: {
      chemical: "Imidacloprid 20% SL (Targeted Micro-dose)",
      targetDisease: {
        en: "Mustard Aphid (জাবপোকা) Control",
        bn: "সরিষার জাবপোকা দমন",
      },
      scheduledDate: "12 Nov 2026",
      withholdingDays: 14,
    },
  },
];

export const MOCK_FARM_FINANCES: FarmFinancialSummary = {
  totalAcreageBigha: 3.7,
  totalLivestockCount: 7,
  monthlyInputExpense: 38400,
  monthlyProductionRevenue: 72600,
  netMargin: 34200,
  currency: "BDT (৳)",
};
