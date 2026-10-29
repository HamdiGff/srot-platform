export interface HealthPackage {
  id: string;
  name: {
    bn: string;
    en: string;
  };
  subtitle: {
    bn: string;
    en: string;
  };
  monthlyPrice: number;
  annualPrice: number;
  isPopular?: boolean;
  colorScheme: "emerald" | "cyan" | "purple";
  targetFarmers: {
    bn: string;
    en: string;
  };
  features: {
    bn: string;
    en: string;
    highlight?: boolean;
  }[];
  consultationsIncluded: number;
  unlimitedChat: boolean;
  videoChamber: boolean;
  emergencyPass: boolean;
  recordTracking: "basic" | "full" | "enterprise";
}

export const FARM_PACKAGES: HealthPackage[] = [
  {
    id: "basic",
    name: {
      bn: "বেসিক খামার হেলথ",
      en: "Basic Farm Health",
    },
    subtitle: {
      bn: "ক্ষুদ্র ও প্রান্তিক খামারির নির্ভরযোগ্য ডিজিটাল স্বাস্থ্য সুরক্ষা",
      en: "Essential digital advisory for smallholders & family farms",
    },
    monthlyPrice: 199,
    annualPrice: 1990,
    colorScheme: "cyan",
    targetFarmers: {
      bn: "১-৫টি গরু, ১-৩ বিঘা জমি অথবা ছোট পুকুরের খামারিদের জন্য",
      en: "Ideal for 1-5 cattle, 1-3 bigha crop land or home ponds",
    },
    consultationsIncluded: 2,
    unlimitedChat: false,
    videoChamber: false,
    emergencyPass: false,
    recordTracking: "basic",
    features: [
      {
        bn: "মাসে ২টি বিশেষজ্ঞ ডাক্তার বা কৃষিবিদ কনসালটেশন (ডিজিটাল প্রেসক্রিপশন সহ)",
        en: "2 Certified Specialist consultations/month with digital prescription",
        highlight: true,
      },
      {
        bn: "উপজেলা ভিত্তিক ফসল ও গবাদিপশু মহামারী/পোকামাকড় সতর্কবার্তা (SMS Alert)",
        en: "Upazila-specific outbreak & pest warning SMS alerts",
      },
      {
        bn: "স্বয়ংক্রিয় ডিজিটাল ভ্যাকসিনেশন ও কৃমিনাশক রিমাইন্ডার",
        en: "Automated digital vaccination & deworming schedule reminders",
      },
      {
        bn: "বেসিক খামার রেকর্ড কিপিং (২টি ফসল চক্র অথবা ১০টি পশুর প্রোফাইল)",
        en: "Basic farm record logging (up to 2 crop cycles or 10 animals)",
      },
      {
        bn: "বিনামূল্যে ওপেন কমিউনিটি ফোরাম ও লাইভ জ্ঞানকোষ এক্সেস",
        en: "Free lifetime community Q&A and verified protocol encyclopedia",
      },
    ],
  },
  {
    id: "premium",
    name: {
      bn: "প্রিমিয়াম খামার কেয়ার",
      en: "Premium Farm Care",
    },
    subtitle: {
      bn: "বাণিজ্যিক ও ক্রমবর্ধমান খামারের সম্পূর্ণ চিকিৎসা ও সার্বক্ষণিক সাপোর্ট",
      en: "Complete medical advisory & priority care for commercial farms",
    },
    monthlyPrice: 499,
    annualPrice: 4990,
    isPopular: true,
    colorScheme: "emerald",
    targetFarmers: {
      bn: "৫-২০টি গরু, বাণিজ্যিক লেয়ার/ব্রয়লার শেড অথবা বাণিজ্যিক মৎস্য চাষের জন্য",
      en: "Tailored for dairy sheds, poultry broiler/layers & commercial aqua",
    },
    consultationsIncluded: 5,
    unlimitedChat: true,
    videoChamber: true,
    emergencyPass: true,
    recordTracking: "full",
    features: [
      {
        bn: "বিশেষজ্ঞদের সাথে আনলিমিটেড ডায়াগনস্টিক চ্যাট ও ফটো ট্রায়াজ",
        en: "Unlimited AI + specialist diagnostic chat & photo triage",
        highlight: true,
      },
      {
        bn: "মাসে ১টি নির্ধারিত এইচডি ভিডিও চেম্বার ভিজিট (বিএসসি/এমএস বিশেষজ্ঞ সার্জন)",
        en: "1 Monthly scheduled HD Video Chamber consultation (Govt/BVC Specialist)",
        highlight: true,
      },
      {
        bn: "জরুরি কেসে ফাস্ট-ট্র্যাক প্রায়োরিটি কিউ (১০ মিনিটের মধ্যে ট্রায়াজ কল)",
        en: "Fast-track priority queue (under 10 min specialist triage)",
        highlight: true,
      },
      {
        bn: "ফুল ফার্ম রেকর্ড ট্র্যাকিং (ইয়ার-ট্যাগ আইডি, দুধের রেকর্ড, ফসল স্প্রে ডায়েরি)",
        en: "Full farm record tracking (Cattle ear-tags, milk logs, crop spray cycle)",
      },
      {
        bn: "২৪/৭ ইমার্জেন্সি হটলাইন প্রায়োরিটি পাস",
        en: "24/7 direct doctor emergency hotline VIP pass",
      },
      {
        bn: "মাঠ ভিজিট ও কৃত্রিম প্রজনন (AI) বুকিংয়ে ১৫% সরাসরি ছাড়",
        en: "15% flat discount on veterinary field visits & AI services",
      },
    ],
  },
  {
    id: "commercial",
    name: {
      bn: "এন্টারপ্রাইজ / এগ্রো ফার্ম কো-অপ",
      en: "Enterprise & Farm Co-op",
    },
    subtitle: {
      bn: "বৃহৎ ডেইরি খামার, ফিডমিল ক্লাস্টার ও বাণিজ্যিক হ্যাচারির সার্বক্ষণিক সমাধান",
      en: "Dedicated veterinary agronomist desk for large agro ventures",
    },
    monthlyPrice: 1499,
    annualPrice: 14990,
    colorScheme: "purple",
    targetFarmers: {
      bn: "২০+ গরু, ৫,০০০+ পোল্ট্রি বা বৃহৎ হ্যাচারি ও সমবায় ক্লাস্টারের জন্য",
      en: "For 20+ cattle herds, 5,000+ birds, hatcheries & agro cooperatives",
    },
    consultationsIncluded: 15,
    unlimitedChat: true,
    videoChamber: true,
    emergencyPass: true,
    recordTracking: "enterprise",
    features: [
      {
        bn: "ডেডিকেটেড ফার্ম একাউন্ট কনসালটেন্ট (লাইভ হোয়াটসঅ্যাপ ও টেলি-রাউন্ডস)",
        en: "Dedicated Farm Agro-Vet Account Manager (Direct WhatsApp & tele-rounds)",
        highlight: true,
      },
      {
        bn: "মাসে ৪টি নির্ধারিত এইচডি ভিডিও চেম্বার + আনলিমিটেড টিম কনসাল্টেশন",
        en: "4 Monthly HD Video Chambers + unlimited team consultations",
      },
      {
        bn: "মাটি পরীক্ষা ও পানি প্যারামিটার ল্যাব রিপোর্ট সমন্বয় ও স্পেশাল প্রেসক্রিপশন",
        en: "Soil testing & water parameter lab diagnostics coordination",
      },
      {
        bn: "আনলিমিটেড ক্যাটল ইয়ার-ট্যাগ ডিজিটাল হেলথ কার্ড ও বায়োসিকিউরিটি অডিট",
        en: "Unlimited herd ear-tag digital cards & biosecurity protocols",
      },
      {
        bn: "পশুসম্পদ অধিদপ্তর ও কৃষি সম্প্রসারণ অধিদপ্তর এক্সপোর্ট কমপ্লায়েন্স রিপোর্ট",
        en: "Official DLS / DAE export compliance & food safety certification assist",
      },
    ],
  },
];
