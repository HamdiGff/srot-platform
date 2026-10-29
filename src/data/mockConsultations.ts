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
    subjectName: string; // e.g. "Paddy (Swarna Variety)", "Holstein Cow #12", "Milo (Golden Retriever)"
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
  // 1. Agriculture Completed Consultation (Rice Blast)
  {
    id: "consult-agri-101",
    caseNumber: "SROT-AG-2026-8819",
    category: "agri",
    serviceId: "svc-crop-disease",
    serviceName: "Crop Disease Diagnosis & Treatment",
    channel: "photo_instant",
    status: "completed",
    feePaid: 15,
    createdAt: "2026-10-27T09:14:00Z",
    scheduledDateTime: "2026-10-27T09:35:00Z",
    farmerOrOwner: {
      id: "usr-farmer-01",
      name: "Tariqul Islam",
      role: "farmer",
      phone: "+1 (555) 382-9014",
      location: "East Agro District, Plot B-4",
      subjectName: "Rice Paddy (BRRI Dhan-28)",
      subjectAgeOrStage: "Active Tillering (52 Days)",
      areaOrHerdSize: "5.2 Acres",
    },
    expert: {
      id: "exp-dr-ramesh-patel",
      name: "Dr. Ramesh Patel",
      title: "Chief Plant Pathologist & IPM Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      regNumber: "AGR-REG-2014-8891",
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
          dosage: "5 kg / acre as soil application",
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
        senderName: "Tariqul Islam (Farmer)",
        senderRole: "farmer",
        text: "Hello Dr. Ramesh, my Boro rice crop has spindle-shaped diamond spots appearing on lower leaves after morning mist. Please check the photos attached.",
        timestamp: "2026-10-27T09:14:00Z",
      },
      {
        id: "m-agri-2",
        senderId: "exp-dr-ramesh-patel",
        senderName: "Dr. Ramesh Patel (Plant Pathologist)",
        senderRole: "expert_agronomist",
        text: "I inspected your photos, Tariqul. This is classical Pyricularia oryzae (Leaf Blast) triggered by the high humidity and heavy urea application. Stop all urea top-dressing immediately.",
        timestamp: "2026-10-27T09:22:00Z",
      },
      {
        id: "m-agri-3",
        senderId: "usr-farmer-01",
        senderName: "Tariqul Islam (Farmer)",
        senderRole: "farmer",
        text: "Understood Doctor. What fungicide should I spray and what is the exact water ratio for my 5.2 acres?",
        timestamp: "2026-10-27T09:28:00Z",
      },
      {
        id: "m-agri-4",
        senderId: "exp-dr-ramesh-patel",
        senderName: "Dr. Ramesh Patel (Plant Pathologist)",
        senderRole: "expert_agronomist",
        text: "I have calibrated the spray protocol and issued your signed digital prescription below. Spray Tricyclazole 75% WP @ 0.6g/L water in the late afternoon. Maintain shallow standing water (2-3 cm).",
        timestamp: "2026-10-27T09:42:00Z",
      },
    ],
  },

  // 2. Animal Healthcare Completed Consultation (Dairy Bovine Mastitis)
  {
    id: "consult-vet-202",
    caseNumber: "SROT-VT-2026-4421",
    category: "veterinary",
    serviceId: "svc-cattle-health",
    serviceName: "Cattle & Bovine Medicine",
    channel: "video",
    status: "completed",
    feePaid: 22,
    createdAt: "2026-10-26T14:30:00Z",
    scheduledDateTime: "2026-10-26T15:00:00Z",
    farmerOrOwner: {
      id: "usr-farmer-02",
      name: "Marcus Holloway",
      role: "livestock_farmer",
      phone: "+1 (555) 819-3201",
      location: "Valley Crest Dairy Farm, Barn 2",
      subjectName: "Holstein Friesian Cow #42 ('Belle')",
      subjectAgeOrStage: "5 Years, 3rd Lactation (Month 2)",
      areaOrHerdSize: "28 Dairy Cows",
    },
    expert: {
      id: "exp-dr-ananya-sen",
      name: "Dr. Ananya Sen, M.V.Sc.",
      title: "Senior Veterinary Surgeon & Dairy Health Specialist",
      avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=400&q=80",
      regNumber: "VCI-REG-2012-7714",
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
        senderName: "Marcus Holloway (Dairy Farmer)",
        senderRole: "livestock_farmer",
        text: "Dr. Ananya, my dairy cow Belle #42 has a swollen right rear quarter and yellow clots in the milk. Fever is 103.4°F.",
        timestamp: "2026-10-26T14:30:00Z",
      },
      {
        id: "m-vet-2",
        senderId: "exp-dr-ananya-sen",
        senderName: "Dr. Ananya Sen (Veterinary Surgeon)",
        senderRole: "veterinarian",
        text: "Hello Marcus. The symptoms indicate Acute Bovine Mastitis. Do not feed this milk to nursing calves. Strip out the affected quarter every 3 hours.",
        timestamp: "2026-10-26T14:45:00Z",
      },
      {
        id: "m-vet-3",
        senderId: "usr-farmer-02",
        senderName: "Marcus Holloway (Dairy Farmer)",
        senderRole: "livestock_farmer",
        text: "Can I administer Ceftiofur IM myself, and what is the milk withholding time?",
        timestamp: "2026-10-26T15:10:00Z",
      },
      {
        id: "m-vet-4",
        senderId: "exp-dr-ananya-sen",
        senderName: "Dr. Ananya Sen (Veterinary Surgeon)",
        senderRole: "veterinarian",
        text: "Yes, inject Ceftiofur Sodium 1g IM daily for 3 days. Strict 72-hour milk withholding period applies. I have signed your official BVC digital prescription below.",
        timestamp: "2026-10-26T15:25:00Z",
      },
    ],
  },

  // 3. Companion Pet Consultation (Dog Allergic Dermatitis)
  {
    id: "consult-pet-303",
    caseNumber: "SROT-PT-2026-9902",
    category: "pet",
    serviceId: "svc-pet-services",
    serviceName: "Companion Pet Tele-Vet & Wellness",
    channel: "video",
    status: "completed",
    feePaid: 25,
    createdAt: "2026-10-28T11:00:00Z",
    scheduledDateTime: "2026-10-28T11:15:00Z",
    farmerOrOwner: {
      id: "usr-pet-01",
      name: "Jessica Miller",
      role: "pet_owner",
      phone: "+1 (555) 749-1029",
      location: "Greenwood Suburb, Apt 4C",
      subjectName: "Max (Golden Retriever)",
      subjectAgeOrStage: "3.5 Years Old (Male, Neutered)",
      areaOrHerdSize: "31.5 kg (Body Condition Score 5/9)",
    },
    expert: {
      id: "exp-dr-elena-rostova",
      name: "Dr. Elena Rostova, D.V.M.",
      title: "Small Animal Clinician & Pet Tele-Medicine Director",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      regNumber: "RCVS-PET-882194",
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
        senderName: "Jessica Miller (Pet Parent)",
        senderRole: "pet_owner",
        text: "Dr. Elena, my Golden Retriever Max (31.5 kg) has been licking his paws raw and scratching his ears constantly since walking at the park.",
        timestamp: "2026-10-28T11:00:00Z",
      },
      {
        id: "m-pet-2",
        senderId: "exp-dr-elena-rostova",
        senderName: "Dr. Elena Rostova (Small Animal Vet)",
        senderRole: "veterinarian",
        text: "Hello Jessica! This is acute Canine Atopic Dermatitis with secondary otitis from grass pollen allergens. Has he had any vomiting or diarrhea?",
        timestamp: "2026-10-28T11:12:00Z",
      },
      {
        id: "m-pet-3",
        senderId: "usr-pet-01",
        senderName: "Jessica Miller (Pet Parent)",
        senderRole: "pet_owner",
        text: "No gastrointestinal signs, just intense itching. Can we start Apoquel?",
        timestamp: "2026-10-28T11:22:00Z",
      },
      {
        id: "m-pet-4",
        senderId: "exp-dr-elena-rostova",
        senderName: "Dr. Elena Rostova (Small Animal Vet)",
        senderRole: "veterinarian",
        text: "Yes, I have calculated Max's exact weight dosage (16mg Apoquel) with Posatex ear drops. Full prescription is attached below. Keep a cone on him for 48 hours.",
        timestamp: "2026-10-28T11:40:00Z",
      },
    ],
  },

  // 4. Live Pending Case (Awaiting Agronomist Review)
  {
    id: "consult-agri-104",
    caseNumber: "SROT-AG-2026-9104",
    category: "agri",
    serviceId: "svc-fertilizer-advice",
    serviceName: "Fertilizer & Soil Nutrition Planning",
    channel: "photo_instant",
    status: "pending_review",
    feePaid: 18,
    createdAt: "2026-10-29T00:50:00Z",
    scheduledDateTime: "2026-10-29T02:00:00Z",
    farmerOrOwner: {
      id: "usr-farmer-03",
      name: "Harish Chandra",
      role: "farmer",
      phone: "+1 (555) 902-8812",
      location: "Northern Canal Valley, Plot C",
      subjectName: "Maize / Corn (Pioneer Hybrid)",
      subjectAgeOrStage: "Knee-High V6 Vegetative Stage",
      areaOrHerdSize: "8 Acres",
    },
    expert: {
      id: "exp-sarah-jenkins",
      name: "Engr. Sarah Jenkins, M.Sc.",
      title: "Senior Agronomist & Soil Nutrition Planner",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      regNumber: "AGR-SC-2018-4420",
    },
    symptomsDescription: "Lower leaves showing classic V-shaped yellowing starting from the tip and moving down the midrib. Growth seems stunted compared to adjacent field.",
    uploadedPhotos: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80"
    ],
    messages: [
      {
        id: "m-pending-1",
        senderId: "usr-farmer-03",
        senderName: "Harish Chandra (Farmer)",
        senderRole: "farmer",
        text: "Hello Engr. Sarah, our knee-high maize crop has V-shaped chlorosis on lower leaves. We applied DAP 3 weeks ago. Please suggest a corrective foliar spray.",
        timestamp: "2026-10-29T00:50:00Z",
      },
    ],
  }
];
