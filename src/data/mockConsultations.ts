import { ConsultationChannel, ServiceCategory } from "./mockServices";

export interface PrescriptionRecord {
  diagnosisTitle: string;
  pathogenOrCause: string;
  severity: "Mild" | "Moderate" | "Severe" | "Critical";
  treatmentSteps: string[];
  medicationsOrSprays: {
    item: string;
    activeIngredient: string;
    dosage: string;
    frequencyAndDuration: string;
    withholdingSafetyPeriod: string;
  }[];
  preventiveAdvice: string;
  followUpDate: string;
  prescribedAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole:
    | "farmer"
    | "livestock_farmer"
    | "pet_owner"
    | "expert_agronomist"
    | "veterinarian"
    | "field_vendor"
    | "admin"
    | "system";
  text: string;
  timestamp: string;
  attachments?: string[];
}

export interface ConsultationRecord {
  id: string;
  caseNumber: string;
  category: ServiceCategory;
  serviceId: string;
  serviceName: string;
  channel: ConsultationChannel;
  status: "pending_review" | "scheduled" | "in_progress" | "completed" | "cancelled";
  feePaid: number;
  createdAt: string;
  scheduledDateTime: string;
  farmerOrOwner: {
    id: string;
    name: string;
    role: "farmer" | "livestock_farmer" | "pet_owner";
    phone: string;
    location: string;
    subjectName: string;
    subjectAgeOrStage: string;
    areaOrHerdSize: string;
  };
  expert: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    regNumber: string;
  };
  symptomsDescription: string;
  uploadedPhotos: string[];
  prescription?: PrescriptionRecord;
  messages: ChatMessage[];
}

export const INITIAL_CONSULTATIONS: ConsultationRecord[] = [
  // 1. Agriculture Completed Consultation (Rice Blast in Dinajpur)
  {
    id: "consult-agri-101",
    caseNumber: "SROT-AG-2026-8819",
    category: "agri",
    serviceId: "svc-crop-disease",
    serviceName: "Crop Disease Diagnosis & Treatment",
    channel: "photo_instant",
    status: "completed",
    feePaid: 200,
    createdAt: "2026-10-27T09:14:00Z",
    scheduledDateTime: "2026-10-27T09:35:00Z",
    farmerOrOwner: {
      id: "usr-farmer-01",
      name: "Md. Tariqul Islam",
      role: "farmer",
      phone: "+880 1711-382901",
      location: "Dinajpur Sadar, Rangpur Division",
      subjectName: "Boro Rice (BRRI Dhan-28)",
      subjectAgeOrStage: "Active Tillering (52 Days)",
      areaOrHerdSize: "5.2 Bigha (1.7 Acres)",
    },
    expert: {
      id: "exp-dr-ramesh-patel",
      name: "Dr. S. M. Tanvir Ahmed, Ph.D.",
      title: "Chief Plant Pathologist & Rice IPM Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      regNumber: "DAE-AGR-2015-8891",
    },
    symptomsDescription: "Spindle-shaped diamond lesions with grayish-white centers and dark brown margins appearing rapidly on lower canopy leaves. Spreading after heavy morning mist.",
    uploadedPhotos: [
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80",
    ],
    prescription: {
      diagnosisTitle: "Foliar Blast (Pyricularia oryzae)",
      pathogenOrCause: "Fungal Spores triggered by 88%+ humidity and high urea top-dressing",
      severity: "Moderate",
      treatmentSteps: [
        "Halt all further urea top-dressing immediately to slow down tender vegetative succulence.",
        "Maintain shallow standing water (2-3 cm) in the paddy field; do not let the field dry crack.",
        "Perform foliar spray during late afternoon using a hollow cone nozzle directed at both upper and lower leaf surfaces."
      ],
      medicationsOrSprays: [
        {
          item: "Tricyclazole 75% WP",
          activeIngredient: "Tricyclazole (Systemic triazole melanin biosynthesis inhibitor)",
          dosage: "0.6 g per Liter of clean water (120 g / acre)",
          frequencyAndDuration: "Single spray; repeat after 10 days only if new lesions emerge on upper flag leaves.",
          withholdingSafetyPeriod: "21 Days prior to panicle emergence"
        },
        {
          item: "MOP (Muriate of Potash)",
          activeIngredient: "Potassium Chloride (K2O 60%)",
          dosage: "5 kg / bigha as soil application",
          frequencyAndDuration: "One-time booster to strengthen leaf cuticle silica layer",
          withholdingSafetyPeriod: "0 Days (Nutritional amendment)"
        }
      ],
      preventiveAdvice: "For subsequent seasons, treat seeds with Carbendazim 2g/kg seed before sowing and maintain balanced N-P-K (4:2:1 ratio).",
      followUpDate: "2026-11-05",
      prescribedAt: "2026-10-27T09:42:00Z"
    },
    messages: [
      {
        id: "m-agri-1",
        senderId: "usr-farmer-01",
        senderName: "Md. Tariqul Islam (Farmer)",
        senderRole: "farmer",
        text: "আসসালামু আলাইকুম স্যার। আমার ব্রি ধান-২৮ এ সকালে কুয়াশার পর থেকেই নিচের পাতায় বাদামি ও ধূসর হীরার মতো দাগ দেখা দিচ্ছে। দ্রুত ছড়িয়ে পড়ছে। ছবি পাঠিয়েছি।",
        timestamp: "2026-10-27T09:14:00Z",
      },
      {
        id: "m-agri-2",
        senderId: "exp-dr-ramesh-patel",
        senderName: "Dr. S. M. Tanvir Ahmed (Plant Pathologist)",
        senderRole: "expert_agronomist",
        text: "ওয়ালাইকুম আসসালাম তারিকুল সাহেব। আপনার ছবি দেখে নিশ্চিত হলাম এটি ধানের পাতা ব্লাস্ট (Pyricularia oryzae)। এখনই ইউরিয়া সার প্রয়োগ সম্পূর্ণ বন্ধ রাখুন।",
        timestamp: "2026-10-27T09:22:00Z",
      },
      {
        id: "m-agri-3",
        senderId: "usr-farmer-01",
        senderName: "Md. Tariqul Islam (Farmer)",
        senderRole: "farmer",
        text: "জী স্যার, বুঝলাম। ৫ বিঘা জমিতে কী ওষুধ কতটুকু পানিতে মিশিয়ে স্প্রে করতে হবে?",
        timestamp: "2026-10-27T09:28:00Z",
      },
      {
        id: "m-agri-4",
        senderId: "exp-dr-ramesh-patel",
        senderName: "Dr. S. M. Tanvir Ahmed (Plant Pathologist)",
        senderRole: "expert_agronomist",
        text: "আমি সঠিক মাত্রায় ট্রাইসাইক্লাজোল ৭৫% ডব্লিউপি প্রেসক্রিপশন তৈরি করে কিউআর সিলসহ নিচে যুক্ত করে দিয়েছি। বিকেলে রোদের তাপ কমলে প্রতি লিটার পানিতে ০.৬ গ্রাম হারে স্প্রে করবেন। জমিতে ২-৩ সেমি পানি ধরে রাখুন।",
        timestamp: "2026-10-27T09:42:00Z",
      },
    ],
  },

  // 2. Animal Healthcare Completed Consultation (Dairy Mastitis in Sirajganj)
  {
    id: "consult-vet-202",
    caseNumber: "SROT-VT-2026-4421",
    category: "veterinary",
    serviceId: "svc-cattle-health",
    serviceName: "Cattle & Bovine Medicine",
    channel: "video",
    status: "completed",
    feePaid: 300,
    createdAt: "2026-10-26T14:30:00Z",
    scheduledDateTime: "2026-10-26T15:00:00Z",
    farmerOrOwner: {
      id: "usr-farmer-02",
      name: "Kader Mollah",
      role: "livestock_farmer",
      phone: "+880 1819-320145",
      location: "Baghabari Dairy Belt, Shahjadpur, Sirajganj",
      subjectName: "Holstein Friesian Cross Cow #18 ('Shundori')",
      subjectAgeOrStage: "4.5 Years, 2nd Lactation (Day 40)",
      areaOrHerdSize: "14 Dairy Cows",
    },
    expert: {
      id: "exp-dr-ananya-sen",
      name: "Dr. Mahfuzur Rahman, M.V.Sc.",
      title: "Senior Veterinary Surgeon & Bovine Medicine Specialist",
      avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=400&q=80",
      regNumber: "BVC-VET-2014-7714",
    },
    symptomsDescription: "Right rear quarter swollen, hot to the touch. Milk has yellowish watery clots and somatic cell count is elevated. Cow shows mild fever (103.4°F) and restlessness during milking.",
    uploadedPhotos: [
      "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80"
    ],
    prescription: {
      diagnosisTitle: "Acute Clinical Mastitis (Right Hind Quarter)",
      pathogenOrCause: "Environmental Streptococcus uberis / Staphylococcal infection",
      severity: "Severe",
      treatmentSteps: [
        "Completely strip out the affected quarter every 3 hours during daytime to evacuate bacterial toxins.",
        "Apply cold water hose or ice packs on swollen quarter for 15 minutes prior to milking.",
        "Discard all milk from this cow completely into disposal pit; strictly do NOT feed to calves."
      ],
      medicationsOrSprays: [
        {
          item: "Ceftiofur Sodium Sterile Powder",
          activeIngredient: "Ceftiofur Sodium 1g",
          dosage: "1.1 to 2.2 mg/kg body weight Intramuscularly",
          frequencyAndDuration: "Once daily for 3 consecutive days",
          withholdingSafetyPeriod: "Milk withholding: 72 hrs post final injection. Meat: 4 days"
        },
        {
          item: "Meloxicam Injection 5mg/ml",
          activeIngredient: "Meloxicam (NSAID Anti-inflammatory)",
          dosage: "0.5 mg/kg body weight Subcutaneously",
          frequencyAndDuration: "Single initial injection for udder pain & endotoxic fever",
          withholdingSafetyPeriod: "Milk withholding: 120 hrs (5 days)"
        },
        {
          item: "Chlorhexidine Post-Milking Teat Dip",
          activeIngredient: "0.5% Chlorhexidine with Glycerin barrier",
          dosage: "Full teat immersion immediately post-milking",
          frequencyAndDuration: "Twice daily after every milking for entire herd",
          withholdingSafetyPeriod: "0 Days (Topical external barrier)"
        }
      ],
      preventiveAdvice: "Disinfect bedding stalls with hydrated lime weekly. Ensure milking machine vacuum pressure is calibrated to 42 kPa.",
      followUpDate: "2026-10-30",
      prescribedAt: "2026-10-26T15:25:00Z"
    },
    messages: [
      {
        id: "m-vet-1",
        senderId: "usr-farmer-02",
        senderName: "Kader Mollah (Dairy Farmer)",
        senderRole: "livestock_farmer",
        text: "ডাক্তার সাহেব, আমার ক্রস গাভীটির পেছনের ডান ওলান লাল হয়ে ফুলে গেছে, হাত দিলে প্রচণ্ড গরম এবং দুধের সাথে হলুদাভ ছানা বের হচ্ছে। গাভীর গায়ে ১০৩.৪° জ্বর।",
        timestamp: "2026-10-26T14:30:00Z",
      },
      {
        id: "m-vet-2",
        senderId: "exp-dr-ananya-sen",
        senderName: "Dr. Mahfuzur Rahman (Veterinary Surgeon)",
        senderRole: "veterinarian",
        text: "কাদের ভাই, এটি ক্লিনিকাল ম্যাসটাইটিস (ওলান পাকা)। আক্রান্ত ওলানের দুধ প্রতি ৩ ঘণ্টা পরপর চেপে বের করে ফেলে দিন। এই দুধ বাছুরকে ভুলেও খাওয়াবেন না।",
        timestamp: "2026-10-26T14:45:00Z",
      },
      {
        id: "m-vet-3",
        senderId: "usr-farmer-02",
        senderName: "Kader Mollah (Dairy Farmer)",
        senderRole: "livestock_farmer",
        text: "ইনজেকশন দেওয়ার পর কতদিন এই গাভীর দুধ বাজারে বিক্রি করা নিষেধ থাকবে?",
        timestamp: "2026-10-26T15:10:00Z",
      },
      {
        id: "m-vet-4",
        senderId: "exp-dr-ananya-sen",
        senderName: "Dr. Mahfuzur Rahman (Veterinary Surgeon)",
        senderRole: "veterinarian",
        text: "শেষ ইনজেকশনের পর ঠিক ৭২ ঘণ্টা (৩ দিন) দুধ বাজারে বিক্রি সম্পূর্ণ নিষিদ্ধ (Withholding Period)। আমি প্রেসক্রিপশনে সঠিক ডোজ ও সময় লিখে দিয়েছি।",
        timestamp: "2026-10-26T15:25:00Z",
      },
    ],
  },

  // 3. Companion Pet Consultation (Dog Allergic Dermatitis in Dhaka)
  {
    id: "consult-pet-303",
    caseNumber: "SROT-PT-2026-9902",
    category: "pet",
    serviceId: "svc-pet-services",
    serviceName: "Companion Pet Tele-Vet & Wellness",
    channel: "video",
    status: "completed",
    feePaid: 300,
    createdAt: "2026-10-28T11:00:00Z",
    scheduledDateTime: "2026-10-28T11:15:00Z",
    farmerOrOwner: {
      id: "usr-pet-01",
      name: "Raihan Kabir",
      role: "pet_owner",
      phone: "+880 1712-449102",
      location: "Road 8A, Dhanmondi, Dhaka",
      subjectName: "Max (Golden Retriever)",
      subjectAgeOrStage: "3.5 Years Old (Male, Neutered)",
      areaOrHerdSize: "31.5 kg (Body Condition Score 5/9)",
    },
    expert: {
      id: "exp-dr-elena-rostova",
      name: "Dr. Nusrat Jahan, D.V.M.",
      title: "Small Animal Clinician & Pet Tele-Health Director",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      regNumber: "BVC-PET-2018-9104",
    },
    symptomsDescription: "Intense paw licking, red inflamed groin area, and bilateral ear shaking. Scratching frequently during nighttime. Started after visiting outdoor park 4 days ago.",
    uploadedPhotos: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80"
    ],
    prescription: {
      diagnosisTitle: "Canine Atopic Dermatitis with Secondary Malassezia Otitis",
      pathogenOrCause: "Environmental seasonal pollen allergen flare with fungal ear colonization",
      severity: "Moderate",
      treatmentSteps: [
        "Wipe paws and lower abdomen with damp hypoallergenic washcloth after every outdoor walk.",
        "Fit soft Elizabethan cone collar for 48 hours to prevent self-mutilating skin trauma.",
        "Flush ears gently before administering otic drops; do not use Q-tips inside ear canal."
      ],
      medicationsOrSprays: [
        {
          item: "Oclacitinib (Apoquel) 16mg Tablets",
          activeIngredient: "Oclacitinib Maleate (Janus Kinase JAK-1 inhibitor)",
          dosage: "1 tablet (16mg) orally with food",
          frequencyAndDuration: "Twice daily for 7 days, then reduce to once daily maintenance",
          withholdingSafetyPeriod: "N/A (Companion pet approved)"
        },
        {
          item: "Posatex Otic Ear Suspension",
          activeIngredient: "Orbifloxacin + Posaconazole + Mometasone Furoate",
          dosage: "6 drops into each affected ear canal",
          frequencyAndDuration: "Once daily for 7 consecutive days",
          withholdingSafetyPeriod: "N/A (Topical otic)"
        },
        {
          item: "Chlorhexidine & Ketoconazole Shampoo",
          activeIngredient: "2% Chlorhexidine Gluconate + 1% Ketoconazole",
          dosage: "Full body lather, leave contact time 10 minutes before warm rinse",
          frequencyAndDuration: "Twice weekly for 2 weeks",
          withholdingSafetyPeriod: "N/A"
        }
      ],
      preventiveAdvice: "Switch to high Omega-3 (EPA/DHA 1500mg/day) fish oil supplement to rebuild epidermal barrier strength.",
      followUpDate: "2026-11-08",
      prescribedAt: "2026-10-28T11:40:00Z"
    },
    messages: [
      {
        id: "m-pet-1",
        senderId: "usr-pet-01",
        senderName: "Raihan Kabir (Pet Parent)",
        senderRole: "pet_owner",
        text: "Dr. Nusrat, Max has been non-stop licking his paws and scratching his belly since we visited the lake park. His ears are also red.",
        timestamp: "2026-10-28T11:00:00Z",
      },
      {
        id: "m-pet-2",
        senderId: "exp-dr-elena-rostova",
        senderName: "Dr. Nusrat Jahan (Pet Clinician)",
        senderRole: "veterinarian",
        text: "Hello Raihan! I reviewed the video feed and close-up photos. Max is experiencing an acute allergic flare with mild yeast proliferation in both ears. I have prepared his weight-calculated prescription.",
        timestamp: "2026-10-28T11:15:00Z",
      },
      {
        id: "m-pet-3",
        senderId: "usr-pet-01",
        senderName: "Raihan Kabir (Pet Parent)",
        senderRole: "pet_owner",
        text: "Thank you Dr. Nusrat! Can I get Apoquel from local pet pharmacies in Dhaka?",
        timestamp: "2026-10-28T11:25:00Z",
      },
      {
        id: "m-pet-4",
        senderId: "exp-dr-elena-rostova",
        senderName: "Dr. Nusrat Jahan (Pet Clinician)",
        senderRole: "veterinarian",
        text: "Yes, all licensed pet pharmacies in Dhanmondi, Gulshan, and Uttara accept SROT digital prescriptions with my BVC QR code seal. I've attached your downloadable PDF.",
        timestamp: "2026-10-28T11:40:00Z",
      },
    ],
  },

  // 4. Commercial Poultry Consultation (Gazipur Broiler Belt)
  {
    id: "consult-plt-404",
    caseNumber: "SROT-PL-2026-1184",
    category: "poultry",
    serviceId: "svc-poultry-health",
    serviceName: "Poultry & Flock Disease Management",
    channel: "photo_instant",
    status: "in_progress",
    feePaid: 250,
    createdAt: "2026-10-29T10:00:00Z",
    scheduledDateTime: "2026-10-29T10:15:00Z",
    farmerOrOwner: {
      id: "usr-farmer-03",
      name: "Rafiqul Alam",
      role: "farmer",
      phone: "+880 1914-552109",
      location: "Sreepur Broiler Zone, Gazipur",
      subjectName: "Cobb-500 Commercial Broiler",
      subjectAgeOrStage: "Age: 24 Days (Batch #6)",
      areaOrHerdSize: "3,500 Broiler Flock",
    },
    expert: {
      id: "exp-dr-tariq-mansoor",
      name: "Dr. Tariqul Hasan, D.V.M., Ph.D.",
      title: "Avian Epidemiologist & Commercial Flock Consultant",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
      regNumber: "BVC-PLT-2015-1092",
    },
    symptomsDescription: "Sudden spike in morning mortality (22 birds died today). Droppings show blood specks and mucus. Birds huddled near brooder lamps with ruffled feathers.",
    uploadedPhotos: [
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80"
    ],
    messages: [
      {
        id: "m-plt-1",
        senderId: "usr-farmer-03",
        senderName: "Rafiqul Alam (Poultry Farmer)",
        senderRole: "farmer",
        text: "ডাক্তার সাহেব, আজ সকালে হঠাৎ ২২টি ব্রয়লার মারা গেছে। পায়খানার সাথে রক্ত ও আমাশয় দেখা যাচ্ছে। বাকি পাখিগুলো ঝিমিয়ে ডানা ঝুলিয়ে রেখেছে। জরুরি পরামর্শ দরকার।",
        timestamp: "2026-10-29T10:00:00Z",
      },
      {
        id: "m-plt-2",
        senderId: "exp-dr-tariq-mansoor",
        senderName: "Dr. Tariqul Hasan (Avian Specialist)",
        senderRole: "veterinarian",
        text: "রফিকুল সাহেব, ২৪ দিনের বয়সে রক্ত আমাশয় ও হঠাৎ মৃত্যু কক্সিডিওসিস (Caecal Coccidiosis - Eimeria tenella) রোগের স্পষ্ট লক্ষণ। ভেজা লিটার অবিলম্বে সরিয়ে দিন। খাবার পাত্র ও পানির পাত্র পরিষ্কার করে টোল্ট্রাজুরিল পানির সাথে শুরু করতে হবে। আমি এখনই প্রেসক্রিপশন লিখছি।",
        timestamp: "2026-10-29T10:15:00Z",
      },
    ],
  },
];
