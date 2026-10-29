export interface FieldService {
  id: string;
  name: {
    en: string;
    bn: string;
  };
  category: "veterinary" | "artificial_insemination" | "soil_testing" | "fisheries" | "poultry";
  tagline: {
    en: string;
    bn: string;
  };
  description: {
    en: string;
    bn: string;
  };
  baseFee: number;
  travelFee: number;
  expectedArrival: {
    en: string;
    bn: string;
  };
  badge: {
    en: string;
    bn: string;
  };
  colorScheme: "emerald" | "cyan" | "purple" | "blue" | "amber";
  coverageArea: {
    en: string;
    bn: string;
  };
  equipmentIncluded: {
    en: string;
    bn: string;
  }[];
  procedureSteps: {
    en: string;
    bn: string;
  }[];
}

export const FIELD_SERVICES_CATALOG: FieldService[] = [
  {
    id: "fs-vet-doorstep",
    name: {
      en: "Emergency Veterinary Farm Visit",
      bn: "জরুরি পশু খামার ও গাভী চিকিৎসা পরিদর্শন",
    },
    category: "veterinary",
    tagline: {
      en: "On-site clinical treatment for severe bovine emergencies, dystocia & acute downer cows.",
      bn: "গাভীর প্রসব জটিলতা, ওলান পাকা ও আশঙ্কাজনক রোগের অন-সাইট সরাসরি চিকিৎসা।",
    },
    description: {
      en: "When a cow stops standing, experiences difficult labor, or contracts severe mastitis, an accredited BVC Veterinary Surgeon visits your shed directly with sterile surgical kits, emergency IV fluids, and injectables.",
      bn: "গাভী শুয়ে পড়লে, প্রসব জটিলতা দেখা দিলে বা তীব্র ওলান ফোলা রোগে রেজিস্টার্ড ভেটেরিনারি সার্জন সরাসরি আপনার খামারে এসে স্যালাইন, ইনজেকশন ও প্রয়োজনীয় জরুরি চিকিৎসা প্রদান করেন।",
    },
    baseFee: 1500,
    travelFee: 250,
    expectedArrival: {
      en: "Within 2-4 Hours (Priority Dispatch)",
      bn: "২-৪ ঘণ্টার মধ্যে (জরুরি অগ্রাধিকার)",
    },
    badge: {
      en: "24/7 Emergency Dispatch",
      bn: "২৪/৭ জরুরি মাঠ সেবা",
    },
    colorScheme: "cyan",
    coverageArea: {
      en: "All Upazilas of Bogura, Sirajganj, Pabna, Rajshahi, Rangpur & Dhaka Division",
      bn: "বগুড়া, সিরাজগঞ্জ, পাবনা, রাজশাহী, রংপুর ও ঢাকা বিভাগের সকল উপজেলা",
    },
    equipmentIncluded: [
      { en: "Emergency IV drip stands & Ringer's Lactate fluids", bn: "জরুরি স্যালাইন ও ইনফিউশন সেট" },
      { en: "Sterile obstetrical ropes & dystocia extraction tools", bn: "প্রসব সহায়তা যন্ত্রপাতি ও জীবাণুমুক্ত কিট" },
      { en: "Calibrated digital clinical thermometer & stethoscope", bn: "ডিজিটাল ক্লিনিক্যাল থার্মোমিটার ও স্টেথোস্কোপ" },
      { en: "BVC certified printed physical prescription with QR", bn: "কিউআর কোডসহ অন-সাইট অফিসিয়াল প্রেসক্রিপশন" },
    ],
    procedureSteps: [
      { en: "Physical examination & vital temperature check", bn: "শারীরিক তাপমাত্রা ও নাড়ি পরীক্ষা" },
      { en: "Targeted intravenous infusion & supportive therapy", bn: "শিরায় স্যালাইন ও প্রয়োজনীয় অ্যান্টিবায়োটিক প্রয়োগ" },
      { en: "Immediate pain relief & lactation safety assessment", bn: "ব্যথানাশক প্রয়োগ ও দুধের উইথহোল্ডিং নির্দেশনা" },
    ],
  },
  {
    id: "fs-ai-insemination",
    name: {
      en: "Pedigree Artificial Insemination (AI) Service",
      bn: "উন্নত জাতের সিমেন ও কৃত্রিম প্রজনন (AI) সেবা",
    },
    category: "artificial_insemination",
    tagline: {
      en: "Certified semen straws (100% Sahiwal, 75% Friesian) with doorstep liquid nitrogen catheter dispatch.",
      bn: "১০০% শাহিওয়াল ও ৭৫% ফ্রিজিয়ান সিমেনসহ সার্টিফাইড টেকনিশিয়ান দ্বারা কৃত্রিম প্রজনন।",
    },
    description: {
      en: "Maximize dairy genetics and calf productivity. Certified AI technicians arrive at your farm with deep-frozen semen tanks, sterile catheters, and thaw monitors to inseminate cows at the exact ovulation peak.",
      bn: "উচ্চ দুধ উৎপাদনশীল বাছুর পেতে সরকার ও ব্র্যাক অনুমোদিত উচ্চমানের সিমেন স্ট্র নিয়ে দক্ষ টেকনিশিয়ান খামারে এসে সঠিক হিটে কৃত্রিম প্রজনন সম্পন্ন করেন।",
    },
    baseFee: 850,
    travelFee: 150,
    expectedArrival: {
      en: "Scheduled during heat window (6-12 hrs)",
      bn: "হিটের সঠিক সময়ে (৬-১২ ঘণ্টার মধ্যে)",
    },
    badge: {
      en: "Guaranteed Pedigree Semen",
      bn: "প্রমাণিত জাতের সিমেন",
    },
    colorScheme: "emerald",
    coverageArea: {
      en: "Nationwide Dairy Clusters (DLS Approved)",
      bn: "সারাদেশের প্রধান ডেইরি ক্লাস্টারসমূহ",
    },
    equipmentIncluded: [
      { en: "Liquid Nitrogen (-196°C) cryo-storage container", bn: "তরল নাইট্রোজেন ক্রায়ো কনটেইনার (-১৯৬° সে.)" },
      { en: "Sterile disposable AI sheath & French straw thawer", bn: "জীবাণুমুক্ত ডিসপোজেবল এআই শিথ ও স্ট্র থয়ার" },
      { en: "DLS official insemination certificate with bull ID", bn: "ষাঁড়ের আইডি নম্বরসহ সরকারি এআই সার্টিফিকেট" },
    ],
    procedureSteps: [
      { en: "Recto-vaginal palpation to verify uterine readiness", bn: "জরায়ুর অবস্থান ও হিট লক্ষণ পরীক্ষা" },
      { en: "Precision 37°C controlled semen thawing", bn: "৩৭ ডিগ্রি তাপমাত্রায় নির্ভুল সিমেন থোয়িং" },
      { en: "Deep cervical deposition & post-AI record logging", bn: "জরায়ুমুখে ডিপ সিমেন স্থাপন ও ডিজিটাল লগ" },
    ],
  },
  {
    id: "fs-soil-testing",
    name: {
      en: "Core Soil Testing & Lab Nutrient Analysis",
      bn: "মাটি পরীক্ষা, পিএইচ ও বৈজ্ঞানিক সার মাত্রা বিশ্লেষণ",
    },
    category: "soil_testing",
    tagline: {
      en: "In-field composite soil core collection with complete NPK, micronutrient & pH lab report.",
      bn: "জমি থেকে নমুনা সংগ্রহ এবং নাইট্রোজেন, ফসফরাস, পটাশ, জিংক ও পিএইচ ল্যাব রিপোর্ট।",
    },
    description: {
      en: "Stop wasting money on excessive urea or DAP. Our soil agronomist visits your plot with core augers, collects GPS-tagged samples, tests electrical conductivity, and issues a calibrated fertilizer plan tailored to your crop.",
      bn: "অপ্রয়োজনীয় সার কিনে খরচ নষ্ট বন্ধ করুন। কৃষিবিদ আপনার জমি থেকে মাটির কোর নমুনা সংগ্রহ করে ল্যাব পরীক্ষার মাধ্যমে বিঘাপ্রতি সুষম সার প্রয়োগের প্রেসক্রিপশন তৈরি করে দেন।",
    },
    baseFee: 1200,
    travelFee: 200,
    expectedArrival: {
      en: "Sample Collection within 48 hrs • Report in 5 days",
      bn: "৪৮ ঘণ্টার মধ্যে নমুনা সংগ্রহ • ৫ দিনে ল্যাব রিপোর্ট",
    },
    badge: {
      en: "Save up to 35% on Fertilizers",
      bn: "সারের খরচ ৩৫% সাশ্রয়",
    },
    colorScheme: "purple",
    coverageArea: {
      en: "All Agro-Ecological Zones of Bangladesh",
      bn: "বাংলাদেশের সকল কৃষি অঞ্চল",
    },
    equipmentIncluded: [
      { en: "Stainless steel hydraulic soil core auger (0-15cm)", bn: "স্টেইনলেস স্টিল কোর আগার (০-১৫ সেমি)" },
      { en: "Digital portable pH & Electrical Conductivity meter", bn: "ডিজিটাল পোর্টেবল পিএইচ ও ইসি মিটার" },
      { en: "SRDI accredited lab testing protocol", bn: "মৃত্তিকা সম্পদ উন্নয়ন ইনস্টিটিউট মানসম্পন্ন রিপোর্ট" },
    ],
    procedureSteps: [
      { en: "Zigzag sampling across 8-10 points per bigha", bn: "বিঘাপ্রতি ৮-১০টি বিন্দু থেকে জিগজ্যাগ নমুনা সংগ্রহ" },
      { en: "Homogenization & composite quartering", bn: "নমুনা মিশ্রণ ও ল্যাব প্রক্রিয়াকরণ" },
      { en: "Crop-specific fertilizer prescription issuance", bn: "ফসলভিত্তিক সুষম সার নির্দেশিকা প্রদান" },
    ],
  },
  {
    id: "fs-fisheries-audit",
    name: {
      en: "Fisheries Water Quality & Pond Biosecurity Audit",
      bn: "পুকুরের পানি পরীক্ষা, অক্সিজেন ও মৎস্য স্বাস্থ্য অডিট",
    },
    category: "fisheries",
    tagline: {
      en: "Instant on-site DO, pH, Ammonia & Alkalinity titration with fingerling gill microscopic check.",
      bn: "পুকুরে দ্রবীভূত অক্সিজেন (DO), অ্যামোনিয়া ও পিএইচ পরিমাপ এবং মাছের ফুলকা রোগ পরীক্ষা।",
    },
    description: {
      en: "Prevent sudden morning fish mortality. An aquaculture specialist brings digital optical DO meters and spectrophotometers to your pond, checks water layers, diagnoses gill rot, and optimizes aerator positioning.",
      bn: "ভোরে মাছ ভেসে ওঠা বা আকস্মিক মড়ক রোধ করুন। মৎস্য বিশেষজ্ঞ সরাসরি আপনার পুকুরে এসে ডিজিটাল মিটারের মাধ্যমে দ্রবীভূত অক্সিজেন, অ্যামোনিয়া গ্যাস ও মাছের মাইক্রোস্কোপিক স্বাস্থ্য পরীক্ষা করেন।",
    },
    baseFee: 1200,
    travelFee: 200,
    expectedArrival: {
      en: "Scheduled 24-48 hrs (Dawn audit available)",
      bn: "২৪-৪৮ ঘণ্টার মধ্যে (ভোরবেলার অডিট সুবিধা)",
    },
    badge: {
      en: "Zero Mortality Water Protocol",
      bn: "মড়ক প্রতিরোধ প্রোটোকল",
    },
    colorScheme: "blue",
    coverageArea: {
      en: "Mymensingh, Bogura, Natore, Khulna, Satkhira & Barishal Aqua Hubs",
      bn: "ময়মনসিংহ, বগুড়া, নাটোর, খুলনা, সাতক্ষীরা ও বরিশাল মৎস্য অঞ্চল",
    },
    equipmentIncluded: [
      { en: "Optical Dissolved Oxygen (DO) probe meter", bn: "অপটিক্যাল দ্রবীভূত অক্সিজেন (DO) সেন্সর" },
      { en: "Multiparameter chemical titration kit for NH3 & NO2", bn: "অ্যামোনিয়া ও নাইট্রাইট টাইট্রেশন কিট" },
      { en: "Field microscope for fingerling gill parasite scan", bn: "মাছের ফুলকা ও প্যারাসাইট ফিল্ড মাইক্রোস্কোপ" },
    ],
    procedureSteps: [
      { en: "Surface, middle and bottom water DO measurement", bn: "পুকুরের ওপর, মাঝ ও তলদেশের অক্সিজেন পরিমাপ" },
      { en: "Toxic ammonia and alkalinity titration", bn: "বিষাক্ত অ্যামোনিয়া গ্যাস ও ক্ষারত্ব নিরূপণ" },
      { en: "Lime, zeolite & oxygen tablet prescription", bn: "চুন, জিওলাইট ও অক্সিজেন ট্যাবলেট প্রয়োগের মাত্রা নির্ধারণ" },
    ],
  },
  {
    id: "fs-poultry-necropsy",
    name: {
      en: "Poultry Shed Audit & On-Site Necropsy (Post-Mortem)",
      bn: "পোল্ট্রি শেড বায়োসিকিউরিটি অডিট ও পোস্টমর্টেম ডায়াগনোসিস",
    },
    category: "poultry",
    tagline: {
      en: "On-site bird necropsy to accurately diagnose Gumboro, Ranikhet, Coccidiosis & Mycoplasma.",
      bn: "খামারে মৃত মুরগির পোস্টমর্টেম করে গামবোরো, রানীক্ষেত ও কক্সিডিওসিস রোগ দ্রুত নির্ণয়।",
    },
    description: {
      en: "Do not guess why broilers or layers are dying. A poultry veterinary officer visits your shed, performs anatomical post-mortems on sample mortalities, tests water lines, and certifies strict biosecurity quarantine measures.",
      bn: "অযথা অ্যান্টিবায়োটিক প্রয়োগ বন্ধ করুন। পোল্ট্রি চিকিৎসক খামারে এসে মৃত মুরগির পোস্টমর্টেম করে সুনির্দিষ্ট রোগ চিহ্নিত করেন এবং শেডের জীবাণুনাশক স্প্রে ও তাপমাত্রা নিয়ন্ত্রণ নিশ্চিত করেন।",
    },
    baseFee: 1800,
    travelFee: 250,
    expectedArrival: {
      en: "Same day dispatch for high flock mortality",
      bn: "অস্বাভাবিক মৃত্যুতে একই দিনে সেবা প্রদান",
    },
    badge: {
      en: "Accurate Necropsy Diagnosis",
      bn: "নিখুঁত পোস্টমর্টেম নির্ণয়",
    },
    colorScheme: "amber",
    coverageArea: {
      en: "Gazipur, Narsingdi, Kishoreganj, Tangail, Bogura & Chattogram",
      bn: "গাজীপুর, নরসিংদী, কিশোরগঞ্জ, টাঙ্গাইল, বগুড়া ও চট্টগ্রাম পোল্ট্রি হাব",
    },
    equipmentIncluded: [
      { en: "Surgical post-mortem kit & pathological dissection tray", bn: "পোস্টমর্টেম সার্জিক্যাল কিট ও ডিসেকশন ট্রে" },
      { en: "Rapid lateral-flow viral antigen test strips", bn: "ভাইরাল অ্যান্টিজেন র্যাপিড টেস্ট স্ট্রিপ" },
      { en: "Water line ATP bio-luminescence hygiene checker", bn: "পানি লাইনের জীবাণু ঘনত্ব পরিমাপক" },
    ],
    procedureSteps: [
      { en: "Gross pathological lesion examination (Bursa, Proventriculus)", bn: "বার্সা ও প্রোভেন্ট্রিকুলাস অঙ্গের ক্ষত পরীক্ষা" },
      { en: "Flock-wide antibiotic sensitivity guidance", bn: "সঠিক অ্যান্টিবায়োটিক ও ইলেক্ট্রোলাইট নির্ধারণ" },
      { en: "Footbath and spray biosecurity protocol lockdown", bn: "শেডের ফুটবাথ ও জীবাণুনাশক স্প্রে পুনর্গঠন" },
    ],
  },
];
