"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import { usePrescriptionStore, PrescriptionItem } from "@/lib/store/prescriptionStore";
import { useConsultationStore } from "@/lib/store/consultationStore";
import { generatePrescriptionPdfFromItem } from "@/lib/prescriptionGenerator";
import { audioFeedback } from "@/lib/audioFeedback";
import { formatDate } from "@/lib/utils";
import { UserProfile } from "@/lib/store/userStore";
import { CustomerChatHistoryModal } from "./CustomerChatHistoryModal";
import {
  FileText,
  Plus,
  Edit3,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ShieldCheck,
  Search,
  Trash2,
  History,
  Link as LinkIcon,
  Filter,
  Check,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  MessageSquare,
  Video,
  User,
  HeartHandshake,
} from "lucide-react";

export interface PrescriptionStudioManagerProps {
  council: "DAE" | "BVC";
  mode?: "specialist" | "customer";
  specialistId?: string;
  specialistName?: string;
  specialistTitle?: string;
  specialistAvatar?: string;
  specialistRegNumber?: string;
  customerUser?: UserProfile;
  defaultCategory?: "agri" | "veterinary" | "pet" | "poultry" | "fisheries";
}

interface ClinicalPreset {
  label: string;
  diagnosis: string;
  pathogen: string;
  severity: "Mild" | "Moderate" | "Severe" | "Critical";
  medications: {
    item: string;
    activeIngredient: string;
    dosage: string;
    frequencyAndDuration: string;
    withholdingSafetyPeriod: string;
  }[];
  treatmentSteps: string;
  preventiveAdvice: string;
}

const CLINICAL_PRESETS: Record<"agri" | "veterinary" | "pet", ClinicalPreset[]> = {
  agri: [
    {
      label: "🌾 Rice Foliar Blast (Tricyclazole)",
      diagnosis: "Foliar Blast (Pyricularia oryzae)",
      pathogen: "Fungal Blast Spores triggered by morning mist & excess nitrogen top-dressing",
      severity: "Moderate",
      medications: [
        {
          item: "Tricyclazole 75% WP",
          activeIngredient: "Tricyclazole (Melanin inhibitor)",
          dosage: "0.6 g / Liter clean water (120 g / acre)",
          frequencyAndDuration: "Single spray; repeat after 10 days if lesions expand",
          withholdingSafetyPeriod: "21 Days Pre-Harvest Statutory Safety",
        },
        {
          item: "Muriate of Potash (MOP)",
          activeIngredient: "Potassium Chloride (K2O 60%)",
          dosage: "5 kg / bigha soil application",
          frequencyAndDuration: "One-time booster to strengthen silica epidermis",
          withholdingSafetyPeriod: "0 Days (Nutritional amendment)",
        },
      ],
      treatmentSteps:
        "Halt all further urea top-dressing immediately.\nMaintain 2-3 cm standing water in paddy; do not let field crack.\nSpray during late afternoon using hollow cone nozzle directing at upper and lower leaf surfaces.",
      preventiveAdvice: "Treat seedbed with Carbendazim 2g/kg seed before transplanting; maintain 4:2:1 balanced N-P-K.",
    },
    {
      label: "🐛 Stem Borer & Leaf Folder (Coragen)",
      diagnosis: "Yellow Stem Borer & Leaf Folder Infestation (Scirpophaga incertulas)",
      pathogen: "Lepidopteran larvae boring into tillers causing deadhearts and whiteheads",
      severity: "Severe",
      medications: [
        {
          item: "Chlorantraniliprole 18.5% SC (Coragen)",
          activeIngredient: "Chlorantraniliprole (Ryanodine receptor modulator)",
          dosage: "0.4 ml / Liter of water (80 ml / acre)",
          frequencyAndDuration: "One foliar spray at early larva emergence",
          withholdingSafetyPeriod: "14 Days Pre-Harvest Safety",
        },
      ],
      treatmentSteps:
        "Erect bamboo T-perches (30 per acre) for predatory insectivorous birds.\nSpray during early morning or sunset when caterpillars are active.",
      preventiveAdvice: "Clip rice seedling leaf tips prior to transplanting to eliminate stem borer egg masses.",
    },
    {
      label: "🍂 Sheath Blight (Hexaconazole)",
      diagnosis: "Rice Sheath Blight (Rhizoctonia solani)",
      pathogen: "Soil-borne fungal sclerotia floating on water surface attacking leaf sheaths",
      severity: "Moderate",
      medications: [
        {
          item: "Hexaconazole 5% EC (Contaf)",
          activeIngredient: "Hexaconazole (Sterol demethylation inhibitor)",
          dosage: "1.5 ml / Liter water (300 ml / acre)",
          frequencyAndDuration: "Spray directed at the lower stem & water line; repeat after 12 days if needed",
          withholdingSafetyPeriod: "14 Days Pre-Harvest",
        },
      ],
      treatmentSteps:
        "Drain standing water from field for 3 days to lower canopy relative humidity.\nDirect spray wand towards lower tillers near water line.",
      preventiveAdvice: "Avoid dense plant spacing; allow adequate air circulation between rows.",
    },
    {
      label: "🧪 Zinc & Micronutrient Deficiency",
      diagnosis: "Khaira Disease / Acute Zinc & Sulfur Micronutrient Deficiency",
      pathogen: "Physiological zinc fixation in continuously submerged waterlogged calcareous soil",
      severity: "Mild",
      medications: [
        {
          item: "Zinc Sulphate Heptahydrate (21% Zn + 10% S)",
          activeIngredient: "Zinc Sulphate Monohydrate / Heptahydrate",
          dosage: "5 g / Liter water as foliar spray or 5 kg / acre soil application",
          frequencyAndDuration: "Two foliar sprays at 10-day intervals",
          withholdingSafetyPeriod: "0 Days (Essential micronutrient)",
        },
      ],
      treatmentSteps:
        "Drain field water for 48 hours to aerate root zone.\nApply foliar zinc spray mixed with 2g/L urea to facilitate rapid stomatal absorption.",
      preventiveAdvice: "Incorporate zinc sulphate into basal soil dose during final land preparation.",
    },
  ],
  veterinary: [
    {
      label: "🥛 Acute Bovine Mastitis (Ceftiofur + Cloxacillin)",
      diagnosis: "Acute Clinical Bovine Mastitis with Fibrinous Clots",
      pathogen: "Streptococcus uberis / Staphylococcus aureus environmental teat canal colonization",
      severity: "Severe",
      medications: [
        {
          item: "Ceftiofur Sodium 1g IM Injection",
          activeIngredient: "Ceftiofur Sodium (3rd Gen Cephalosporin)",
          dosage: "1g deep intramuscular injection every 24 hours",
          frequencyAndDuration: "Once daily for 3 consecutive days",
          withholdingSafetyPeriod: "Milk Withholding: 72 Hours (3 Days) • Meat: 4 Days",
        },
        {
          item: "Cloxacillin Intramammary Infusion Tube",
          activeIngredient: "Cloxacillin Sodium (Anti-Staphylococcal penicillin)",
          dosage: "1 tube (10ml) infused into affected quarter after stripping",
          frequencyAndDuration: "Once every 12 hours for 3 doses",
          withholdingSafetyPeriod: "Milk Withholding: 72 Hours from last infusion",
        },
        {
          item: "Meloxicam 20mg/ml NSAID",
          activeIngredient: "Meloxicam",
          dosage: "15 ml slow IM or SC",
          frequencyAndDuration: "Once daily for 2 days for udder inflammation and pyrexia",
          withholdingSafetyPeriod: "Milk: 5 Days • Meat: 15 Days",
        },
      ],
      treatmentSteps:
        "Milk out affected quarter completely into disinfectant bucket (do not feed to calves).\nDip teat in 1% povidone iodine barrier teat dip after each milking.\nApply cool ice packs to swollen quarter for 10 minutes prior to milking.",
      preventiveAdvice: "Clean and dry bedding daily; change straw in resting stalls every 48 hours.",
    },
    {
      label: "🌡️ Milk Fever / Hypocalcemia (Calcium Borogluconate)",
      diagnosis: "Post-Parturient Hypocalcemia (Milk Fever / Downer Cow Syndrome)",
      pathogen: "Acute drop in blood ionized calcium concentration following sudden onset of heavy lactation",
      severity: "Critical",
      medications: [
        {
          item: "Calcium Borogluconate 25% + Magnesium & Phosphorus (Cal-Bor)",
          activeIngredient: "Calcium Borogluconate 250mg/ml",
          dosage: "450 ml slow intravenous infusion at body temperature",
          frequencyAndDuration: "Immediate IV infusion over 15 minutes; follow with 450ml SC if needed",
          withholdingSafetyPeriod: "0 Days (Mineral electrolyte replacement)",
        },
      ],
      treatmentSteps:
        "Warm infusion bottle to cow's body temperature (38°C) before administration.\nAdminister via jugular vein with slow drip while monitoring cardiac rhythm.\nProp cow up into sternal recumbency with straw bales.",
      preventiveAdvice: "Administer oral anionic salts and calcium bolus 12 hours prior to and immediately after calving.",
    },
    {
      label: "🐄 Foot & Mouth Disease (FMD Supportive Protocol)",
      diagnosis: "Foot and Mouth Disease (FMD) Oral & Coronary Vesicular Lesions",
      pathogen: "Aphthovirus (Picornaviridae) causing painful lingual vesicles and lameness",
      severity: "Severe",
      medications: [
        {
          item: "Potassium Permanganate 1:1000 Antiseptic Wash",
          activeIngredient: "Potassium Permanganate (KMnO4)",
          dosage: "1 g in 10 Liters lukewarm water for mouth and hoof flush",
          frequencyAndDuration: "Mouth and hoof wash twice daily for 5 days",
          withholdingSafetyPeriod: "0 Days (Topical external antiseptic)",
        },
        {
          item: "Oxytetracycline LA 200mg/ml Injection",
          activeIngredient: "Oxytetracycline Long-Acting",
          dosage: "1 ml per 10 kg body weight deep IM",
          frequencyAndDuration: "Single dose; repeat after 72 hours to prevent secondary bacterial sepsis",
          withholdingSafetyPeriod: "Meat: 28 Days • Milk: 7 Days",
        },
      ],
      treatmentSteps:
        "Strict quarantine of infected cattle away from healthy herd.\nProvide soft lukewarm rice gruel (khichuri/mash) because mouth blisters prevent chewing roughage.\nKeep pen floor dry and disinfect with 4% sodium carbonate.",
      preventiveAdvice: "Vaccinate all cattle bi-annually with trivalent FMD vaccine (O, A, Asia-1).",
    },
    {
      label: "🪱 Broad-Spectrum Deworming (Albendazole Bolus)",
      diagnosis: "Gastrointestinal Nematodiasis & Liver Fluke (Fascioliasis)",
      pathogen: "Mixed Fasciola gigantica & Haemonchus contortus internal parasitic burden",
      severity: "Mild",
      medications: [
        {
          item: "Albendazole 2.5g Bolus",
          activeIngredient: "Albendazole (Benzimidazole anthelmintic)",
          dosage: "1 bolus (2.5g) orally per 250 kg body weight",
          frequencyAndDuration: "Single oral administration in early morning before feeding",
          withholdingSafetyPeriod: "Meat: 14 Days • Milk Withholding: 72 Hours (3 Days)",
        },
      ],
      treatmentSteps:
        "Dose early in the morning when rumen is relatively empty.\nRepeat deworming every 3-4 months in rotational grazing areas.",
      preventiveAdvice: "Avoid grazing near marshy snail-infested canals during early morning dew.",
    },
  ],
  pet: [
    {
      label: "🐕 Canine Atopic Dermatitis (Apoquel)",
      diagnosis: "Canine Atopic Dermatitis & Environmental Allergen Flare",
      pathogen: "Type I IgE hypersensitivity reaction to airborne pollens, dust mites and grasses",
      severity: "Moderate",
      medications: [
        {
          item: "Oclacitinib (Apoquel) 16mg Tablets",
          activeIngredient: "Oclacitinib Maleate (Janus Kinase JAK-1 inhibitor)",
          dosage: "1 tablet (16mg) orally twice daily for 7 days, then once daily maintenance",
          frequencyAndDuration: "Twice daily for 7 days, then once daily for 14 days",
          withholdingSafetyPeriod: "N/A (Companion pet approved)",
        },
        {
          item: "Chlorhexidine 4% Medicated Antiseptic Shampoo",
          activeIngredient: "Chlorhexidine Gluconate 4%",
          dosage: "Lather over damp coat, leave for 10 minutes before rinsing",
          frequencyAndDuration: "Twice weekly for 3 weeks",
          withholdingSafetyPeriod: "N/A (Topical)",
        },
      ],
      treatmentSteps:
        "Fit soft Elizabethan cone collar for 48 hours to break the itch-scratch trauma cycle.\nWipe paws and lower abdomen with damp hypoallergenic washcloth after outdoor walks.\nAvoid foods containing artificial red dyes or poultry by-products during elimination trial.",
      preventiveAdvice: "Supplement daily diet with high-potency Omega-3 fish oil to fortify epidermal skin barrier.",
    },
    {
      label: "👂 Malassezia Otitis Externa (Posatex)",
      diagnosis: "Bilateral Malassezia Otitis Externa (Yeast Ear Infection)",
      pathogen: "Secondary Malassezia pachydermatis yeast and bacterial overgrowth in ear canal",
      severity: "Moderate",
      medications: [
        {
          item: "Posatex Otic Ear Suspension",
          activeIngredient: "Orbifloxacin + Posaconazole + Mometasone Furoate",
          dosage: "6-8 drops instilled into each affected ear canal",
          frequencyAndDuration: "Once daily for 7 consecutive days",
          withholdingSafetyPeriod: "N/A (Topical otic suspension)",
        },
      ],
      treatmentSteps:
        "Gently clean external ear canal with ear flush solution 15 minutes before administering medication.\nMassage the base of the ear for 30 seconds after instillation to disperse drops deep into horizontal canal.\nDo not use cotton swabs (Q-tips) inside the ear canal.",
      preventiveAdvice: "Dry ears thoroughly after swimming, bathing, or rainy weather walks.",
    },
    {
      label: "🐾 Tick & Flea Prevention (Nexgard / Bravecto)",
      diagnosis: "Ectoparasitic Flea & Brown Dog Tick (Rhipicephalus sanguineus) Infestation",
      pathogen: "Active tick and flea attachment posing risk of Tick-Borne Babesiosis",
      severity: "Mild",
      medications: [
        {
          item: "Afoxolaner (Nexgard) Chewable Tablet (25-50 kg)",
          activeIngredient: "Afoxolaner (Isoxazoline GABA chloride channel blocker)",
          dosage: "1 chewable beef-flavored tablet orally with or without food",
          frequencyAndDuration: "Once every 30 days for sustained systemic protection",
          withholdingSafetyPeriod: "N/A (Companion animal)",
        },
      ],
      treatmentSteps:
        "Inspect paws, groin, and ears daily for ticks.\nWash pet bedding in hot water (60°C) to eradicate flea larvae and pupae in home environment.",
      preventiveAdvice: "Maintain year-round monthly tick prevention, especially during monsoon and pre-winter seasons.",
    },
    {
      label: "🐈 Feline URI & Viral Core Regimen",
      diagnosis: "Feline Upper Respiratory Infection (URI) / Cat Flu Complex",
      pathogen: "Feline Herpesvirus-1 (FHV-1) with secondary Chlamydia / Bordetella rhinitis",
      severity: "Moderate",
      medications: [
        {
          item: "Doxycycline Monohydrate 50mg Tablets",
          activeIngredient: "Doxycycline Monohydrate",
          dosage: "5 mg / kg body weight orally with food followed by 5ml water syringe",
          frequencyAndDuration: "Once daily for 10-14 days",
          withholdingSafetyPeriod: "N/A (Feline companion)",
        },
        {
          item: "L-Lysine Viral Immune Paste (500mg/dose)",
          activeIngredient: "L-Lysine Amino Acid Supplement",
          dosage: "1 pump (250mg) mixed into wet food twice daily",
          frequencyAndDuration: "Twice daily for 30 days",
          withholdingSafetyPeriod: "N/A (Nutritional supplement)",
        },
      ],
      treatmentSteps:
        "Warm wet food slightly before offering; cats with congested noses refuse unheated food due to anosmia.\nPlace cat in steamy bathroom for 15 minutes twice daily to loosen nasal and ocular crusts.\nAlways follow Doxycycline tablets with water syringe to prevent feline esophageal stricture.",
      preventiveAdvice: "Ensure booster vaccination with FVRCP (Nobivac Tricat) annually.",
    },
  ],
};

export function PrescriptionStudioManager({
  council,
  mode = "specialist",
  specialistId = "exp-default",
  specialistName = "Dr. Specialist, Certified Clinician",
  specialistTitle = "Clinical Specialist",
  specialistAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  specialistRegNumber = "REG-2026-0001",
  customerUser,
  defaultCategory = "agri",
}: PrescriptionStudioManagerProps) {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const isCustomer = mode === "customer";

  const {
    prescriptions,
    createPrescription,
    updatePrescription,
    assignPrescription,
    deletePrescription,
  } = usePrescriptionStore();

  const { consultations } = useConsultationStore();

  // Mode: "repository" | "create" | "revise"
  const [viewMode, setViewMode] = useState<"repository" | "create" | "revise">("repository");
  const [editingRxId, setEditingRxId] = useState<string | null>(null);

  // Search & Filter in repository
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "revised">("all");

  // Selected Chat Modal Case
  const [activeChatCase, setActiveChatCase] = useState<any | null>(null);

  const getValidRole = (r?: string): "farmer" | "livestock_farmer" | "pet_owner" => {
    if (r === "farmer" || r === "livestock_farmer" || r === "pet_owner") return r;
    return council === "DAE" ? "farmer" : defaultCategory === "pet" ? "pet_owner" : "livestock_farmer";
  };

  // Form State
  const [selectedCaseId, setSelectedCaseId] = useState("");
  const [patientName, setPatientName] = useState(
    isCustomer && customerUser ? customerUser.name : ""
  );
  const [patientRole, setPatientRole] = useState<"farmer" | "livestock_farmer" | "pet_owner">(
    getValidRole(customerUser?.role)
  );
  const [patientLocation, setPatientLocation] = useState(
    isCustomer && customerUser?.location ? customerUser.location : ""
  );
  const [subjectName, setSubjectName] = useState("");
  const [category, setCategory] = useState<"agri" | "veterinary" | "pet" | "poultry" | "fisheries">(defaultCategory);

  // Clinician Authority in customer mode
  const [prescriberType, setPrescriberType] = useState<"tele_specialist" | "upazila_officer" | "private_clinic" | "self_managed">("tele_specialist");
  const [customDoctorName, setCustomDoctorName] = useState("");
  const [customDoctorTitle, setCustomDoctorTitle] = useState("");

  const [diagnosisTitle, setDiagnosisTitle] = useState("");
  const [pathogenOrCause, setPathogenOrCause] = useState("");
  const [severity, setSeverity] = useState<"Mild" | "Moderate" | "Severe" | "Critical">("Moderate");

  // Dynamic Medications Array
  const [medications, setMedications] = useState<
    {
      item: string;
      activeIngredient: string;
      dosage: string;
      frequencyAndDuration: string;
      withholdingSafetyPeriod: string;
    }[]
  >([
    {
      item: "",
      activeIngredient: "",
      dosage: "",
      frequencyAndDuration: "",
      withholdingSafetyPeriod: "",
    },
  ]);

  const [treatmentSteps, setTreatmentSteps] = useState<string>("");
  const [preventiveAdvice, setPreventiveAdvice] = useState<string>("");
  const [followUpDate, setFollowUpDate] = useState<string>("");
  const [revisionNote, setRevisionNote] = useState<string>("");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Relevant consultations
  const availableConsultations = consultations.filter((c) => {
    if (isCustomer && customerUser) {
      return (
        c.farmerOrOwner.id === customerUser.id ||
        c.farmerOrOwner.name.toLowerCase().includes(customerUser.name.toLowerCase()) ||
        c.category === defaultCategory
      );
    }
    return council === "DAE" ? c.category === "agri" : c.category === "veterinary" || c.category === "pet";
  });

  // Filtered prescriptions list
  const filteredPrescriptions = prescriptions
    .filter((rx) => {
      if (isCustomer && customerUser) {
        const matchesUser =
          rx.patientOrFarmer.id === customerUser.id ||
          rx.patientOrFarmer.name.toLowerCase().includes(customerUser.name.toLowerCase());
        const matchesCategory =
          council === "DAE" ? rx.category === "agri" : rx.category === defaultCategory;
        return matchesUser || matchesCategory;
      }
      return council === "DAE" ? rx.category === "agri" : rx.category !== "agri";
    })
    .filter((rx) => {
      if (statusFilter === "all") return true;
      return rx.status === statusFilter;
    })
    .filter((rx) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        rx.id.toLowerCase().includes(q) ||
        rx.diagnosisTitle.toLowerCase().includes(q) ||
        rx.patientOrFarmer.name.toLowerCase().includes(q) ||
        rx.patientOrFarmer.subjectName.toLowerCase().includes(q) ||
        rx.specialist.name.toLowerCase().includes(q)
      );
    });

  // Load a case's details into the prescription form
  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    if (!caseId) return;

    const matchedCase = consultations.find((c) => c.id === caseId);
    if (matchedCase) {
      setPatientName(matchedCase.farmerOrOwner.name);
      setPatientRole(matchedCase.farmerOrOwner.role);
      setPatientLocation(matchedCase.farmerOrOwner.location);
      setSubjectName(matchedCase.farmerOrOwner.subjectName);
      setCategory(matchedCase.category);

      if (!diagnosisTitle && matchedCase.serviceName) {
        setDiagnosisTitle(matchedCase.serviceName);
      }
      if (!pathogenOrCause && matchedCase.symptomsDescription) {
        setPathogenOrCause(matchedCase.symptomsDescription.slice(0, 100));
      }
    }
  };

  // Apply a clinical preset
  const handleApplyPreset = (preset: ClinicalPreset) => {
    setDiagnosisTitle(preset.diagnosis);
    setPathogenOrCause(preset.pathogen);
    setSeverity(preset.severity);
    setMedications(preset.medications);
    setTreatmentSteps(preset.treatmentSteps);
    setPreventiveAdvice(preset.preventiveAdvice);
    setFollowUpDate(new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0]);
    audioFeedback.playMessageSent();
    showToast(`Template loaded: ${preset.diagnosis}`);
  };

  // Open "Create New"
  const startCreateNew = () => {
    setEditingRxId(null);
    setSelectedCaseId("");
    setPatientName(isCustomer && customerUser ? customerUser.name : "");
    setPatientRole(getValidRole(customerUser?.role));
    setPatientLocation(isCustomer && customerUser?.location ? customerUser.location : "");
    
    // Default subject to user's first registered entity if available
    const firstEntity = customerUser?.registeredEntities?.[0]?.name;
    setSubjectName(firstEntity || "");

    setCategory(defaultCategory);
    setDiagnosisTitle("");
    setPathogenOrCause("");
    setSeverity("Moderate");
    setMedications([
      {
        item: "",
        activeIngredient: "",
        dosage: "",
        frequencyAndDuration: "",
        withholdingSafetyPeriod:
          council === "DAE"
            ? "14 Days Pre-Harvest Safety"
            : defaultCategory === "pet"
            ? "N/A (Companion pet approved)"
            : "72 Hours Milk Withholding",
      },
    ]);
    setTreatmentSteps("");
    setPreventiveAdvice("");
    setFollowUpDate(new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0]);
    setRevisionNote("");
    setViewMode("create");
  };

  // Open "Edit / Revise"
  const startRevise = (rx: PrescriptionItem) => {
    setEditingRxId(rx.id);
    setSelectedCaseId(rx.caseId || "");
    setPatientName(rx.patientOrFarmer.name);
    setPatientRole(rx.patientOrFarmer.role);
    setPatientLocation(rx.patientOrFarmer.location);
    setSubjectName(rx.patientOrFarmer.subjectName);
    setCategory(rx.category);
    setDiagnosisTitle(rx.diagnosisTitle);
    setPathogenOrCause(rx.pathogenOrCause);
    setSeverity(rx.severity);
    setMedications(
      rx.medicationsOrSprays.length > 0
        ? rx.medicationsOrSprays
        : [
            {
              item: "",
              activeIngredient: "",
              dosage: "",
              frequencyAndDuration: "",
              withholdingSafetyPeriod: "",
            },
          ]
    );
    setTreatmentSteps(rx.treatmentSteps.join("\n"));
    setPreventiveAdvice(rx.preventiveAdvice);
    setFollowUpDate(rx.followUpDate);
    setRevisionNote("");
    setViewMode("revise");
  };

  // Add medication row
  const addMedicationRow = () => {
    setMedications((prev) => [
      ...prev,
      {
        item: "",
        activeIngredient: "",
        dosage: "",
        frequencyAndDuration: "",
        withholdingSafetyPeriod:
          council === "DAE"
            ? "14 Days Pre-Harvest"
            : defaultCategory === "pet"
            ? "N/A"
            : "72 Hours Milk Withholding",
      },
    ]);
  };

  // Remove medication row
  const removeMedicationRow = (index: number) => {
    if (medications.length <= 1) return;
    setMedications((prev) => prev.filter((_, i) => i !== index));
  };

  // Update specific medication field
  const updateMedicationField = (index: number, field: string, val: string) => {
    setMedications((prev) =>
      prev.map((med, i) => (i === index ? { ...med, [field]: val } : med))
    );
  };

  // Submit Handler: Create or Update
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!diagnosisTitle.trim()) {
      alert("Please enter a Primary Clinical Diagnosis.");
      return;
    }

    const stepsArray = treatmentSteps
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const validMedications = medications.filter((m) => m.item.trim().length > 0);
    if (validMedications.length === 0) {
      alert("Please provide at least one medication or spray item.");
      return;
    }

    // Determine specialist attribution
    let finalSpecialist = {
      id: specialistId,
      name: specialistName,
      title: specialistTitle,
      avatar: specialistAvatar,
      regNumber: specialistRegNumber,
      council,
    };

    if (isCustomer && prescriberType !== "tele_specialist") {
      finalSpecialist = {
        id: `spec-ext-${Date.now().toString().slice(-4)}`,
        name: customDoctorName.trim() || (isBn ? "উপজেলা সম্প্রসারণ কর্মকর্তা / পশু চিকিৎসক" : "Upazila Extension Specialist"),
        title: customDoctorTitle.trim() || (council === "DAE" ? "Upazila Agriculture Officer" : "Upazila Livestock Officer"),
        avatar: specialistAvatar,
        regNumber: `${council}-EXT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        council,
      };
    }

    if (viewMode === "create") {
      // Create Brand New Prescription
      const newRx = createPrescription({
        caseId: selectedCaseId || undefined,
        category,
        patientOrFarmer: {
          id: customerUser?.id || `usr-farmer-${Date.now().toString().slice(-4)}`,
          name: patientName.trim() || (isBn ? "নিবন্ধিত সেবাগ্রহীতা" : "Registered Beneficiary"),
          role: patientRole,
          phone: customerUser?.phone,
          location: patientLocation.trim() || (isBn ? "বাংলাদেশ" : "Bangladesh"),
          subjectName: subjectName.trim() || (defaultCategory === "agri" ? "BRRI Dhan-28 Paddy" : defaultCategory === "pet" ? "Max (Golden Retriever)" : "Holstein Cow Tag #88"),
        },
        specialist: finalSpecialist,
        diagnosisTitle: diagnosisTitle.trim(),
        pathogenOrCause: pathogenOrCause.trim() || "Clinical inspection verified",
        severity,
        treatmentSteps:
          stepsArray.length > 0
            ? stepsArray
            : ["Administer recommended formulation as per labeled statutory intervals."],
        medicationsOrSprays: validMedications,
        preventiveAdvice:
          preventiveAdvice.trim() ||
          "Follow council bio-security guidelines and store chemicals safely away from food/feed.",
        followUpDate: followUpDate || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      });

      audioFeedback.playMessageSent();
      showToast(`Prescription #${newRx.id} successfully created and certified!`);
      setViewMode("repository");
    } else if (viewMode === "revise" && editingRxId) {
      // Update / Revise Existing Prescription
      const updated = updatePrescription(editingRxId, {
        diagnosisTitle: diagnosisTitle.trim(),
        pathogenOrCause: pathogenOrCause.trim(),
        severity,
        treatmentSteps: stepsArray,
        medicationsOrSprays: validMedications,
        preventiveAdvice: preventiveAdvice.trim(),
        followUpDate,
        revisionNote: revisionNote.trim() || (isCustomer ? "Dosage/medication regimen updated by customer record." : "Dosage calibrated based on clinical telemetry review."),
        authorName: isCustomer && customerUser ? customerUser.name : specialistName,
      });

      if (updated) {
        audioFeedback.playMessageSent();
        showToast(`Prescription #${editingRxId} revised to Revision ${updated.revisionCount}!`);
      }
      setViewMode("repository");
    }
  };

  const sectorPresets = CLINICAL_PRESETS[defaultCategory === "pet" ? "pet" : defaultCategory === "veterinary" ? "veterinary" : "agri"] || CLINICAL_PRESETS.agri;

  return (
    <div className="srot-glass-card rounded-3xl p-6 sm:p-8 border border-white/[0.08] bg-slate-950/80 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-300 font-bold text-xs flex items-center justify-between animate-fade-in shadow-xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-teal-400 font-black text-sm">×</button>
        </div>
      )}

      {/* Main Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <FileText className={`w-5 h-5 ${council === "DAE" ? "text-emerald-400" : defaultCategory === "pet" ? "text-pink-400" : "text-cyan-400"}`} />
            <h2 className="text-base sm:text-lg font-black text-white">
              {isCustomer ? (
                council === "DAE" ? (
                  isBn ? "ডিএই ফসল প্রেসক্রিপশন ও কৃষি রাসায়নিক লগ স্টুডিও" : "DAE Crop Prescriptions & Chemical Treatment Studio"
                ) : defaultCategory === "pet" ? (
                  isBn ? "স্মল-অ্যানিমেল পেট প্রেসক্রিপশন ও মেডিকেল রেজিমেন স্টুডিও" : "Pet Care Prescription Studio & Clinical Regimens"
                ) : (
                  isBn ? "বিভিসি প্রাণিসম্পদ প্রেসক্রিপশন ও স্বাস্থ্য রেজিস্টার স্টুডিও" : "BVC Livestock Prescription Studio & Withholding Log"
                )
              ) : (
                isBn
                  ? `${council} ডিজিটাল প্রেসক্রিপশন স্টুডিও ও রিভিশন কন্ট্রোল`
                  : `${council} Digital Prescription Studio & Revision Engine`
              )}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isCustomer
              ? isBn
                ? "আপনার সকল সার্টিফাইড প্রেসক্রিপশন দেখুন, নতুন প্রেসক্রিপশন বা চিকিৎসা রেকর্ড তৈরি করুন এবং ভেরিফায়েড পিডিএফ ডাউনলোড করুন।"
                : "Manage your verified prescriptions, create new treatment/medication records, and download certified PDFs anytime."
              : isBn
              ? "অফিসিয়াল প্রেসক্রিপশন তৈরি করুন, পুরাতন প্রেসক্রিপশন সংশোধন করুন এবং কেস অ্যাসাইন করুন।"
              : "Author unlimited prescriptions, issue revisions with audit notes, and download certified PDFs with DAE/BVC seals."}
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 self-start md:self-auto p-1 rounded-2xl bg-slate-900 border border-white/[0.08] text-xs font-bold">
          <button
            type="button"
            onClick={() => setViewMode("repository")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              viewMode === "repository"
                ? "bg-slate-800 text-teal-300 font-black shadow-md border border-teal-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>{isBn ? "প্রেসক্রিপশন তালিকা" : "Repository"}</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-950/40 text-[10px]">
              {filteredPrescriptions.length}
            </span>
          </button>

          <button
            type="button"
            onClick={startCreateNew}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
              viewMode === "create"
                ? "bg-teal-500 text-slate-950 font-black shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>
              {isCustomer
                ? isBn
                  ? "নতুন প্রেসক্রিপশন তৈরি করুন"
                  : "+ Create / Log Prescription"
                : isBn
                ? "নতুন চিকিৎসাপত্র"
                : "Write New Rx"}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. REPOSITORY TAB: LIST ALL AUTHORED PRESCRIPTIONS WITH REVISION BADGES */}
      {/* ========================================================================= */}
      {viewMode === "repository" && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isBn
                    ? "প্রেসক্রিপশন নম্বর, রোগী, রোগ বা ওষুধ দিয়ে খুঁজুন..."
                    : "Search by Rx ID, beneficiary, diagnosis, or drug..."
                }
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-semibold">{isBn ? "ফিল্টার:" : "Filter:"}</span>
              {(["all", "active", "revised"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                    statusFilter === status
                      ? "bg-slate-800 text-teal-400 border border-teal-500/30"
                      : "bg-slate-950 text-slate-400 hover:text-white border border-white/[0.04]"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Prescriptions List */}
          {filteredPrescriptions.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-dashed border-white/[0.1] text-center space-y-2">
              <FileText className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400 font-bold">
                {isBn ? "কোনো প্রেসক্রিপশন পাওয়া যায়নি।" : "No prescriptions match your search criteria."}
              </p>
              <button
                onClick={startCreateNew}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-500 text-slate-950 text-xs font-bold transition hover:bg-teal-400"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>
                  {isCustomer
                    ? isBn
                      ? "নতুন প্রেসক্রিপশন তৈরি করুন"
                      : "Create Your First Prescription"
                    : isBn
                    ? "প্রথম চিকিৎসাপত্রটি লিখুন"
                    : "Write Your First Prescription"}
                </span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredPrescriptions.map((rx) => {
                const isRevised = rx.revisionCount > 1;
                const linkedConsultation = consultations.find((c) => c.id === rx.caseId);

                return (
                  <div
                    key={rx.id}
                    className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-white/[0.06] hover:border-teal-500/30 transition space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-xs text-teal-400">{rx.id}</span>
                        {rx.caseId && (
                          <span className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono text-slate-400 border border-white/[0.06]">
                            Case: {rx.caseId}
                          </span>
                        )}
                        {isRevised ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center gap-1">
                            <RefreshCw className="w-2.5 h-2.5" />
                            <span>Rev {rx.revisionCount}</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                            Original (Rev 1)
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 font-mono text-[10px] border border-white/[0.04]">
                          {rx.specialist.council} Accredited
                        </span>
                      </div>

                      <div className="text-left sm:text-right text-[11px] text-slate-400">
                        <span>Issued: {formatDate(rx.prescribedAt)}</span>
                        {rx.updatedAt && (
                          <span className="block text-[10px] text-amber-400/90 font-mono">
                            Last Updated: {formatDate(rx.updatedAt)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Beneficiary & Subject</span>
                        <span className="text-white font-bold">{rx.patientOrFarmer.name}</span>
                        <span className="text-[11px] text-teal-300 font-semibold block font-mono">
                          {rx.patientOrFarmer.subjectName}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {rx.patientOrFarmer.location}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Attending Clinician</span>
                        <span className="text-white font-bold">{rx.specialist.name}</span>
                        <span className="text-[11px] text-slate-400 block">{rx.specialist.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{rx.specialist.regNumber}</span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Diagnosis & Rx Protocol</span>
                        <span className="text-white font-bold block">{rx.diagnosisTitle}</span>
                        <span className="text-teal-300 font-mono text-[11px] block truncate">
                          {rx.medicationsOrSprays[0]?.item || "Clinical Protocol"}
                        </span>
                        <span className="text-[10px] text-amber-300/90 block">
                          Severity: <strong>{rx.severity}</strong> • {rx.medicationsOrSprays.length} drug formulations
                        </span>
                      </div>
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-2 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="text-[11px] text-slate-400 font-mono">
                        Withholding Safety: <strong className="text-amber-400">{rx.medicationsOrSprays[0]?.withholdingSafetyPeriod || "Standard statutory guidelines"}</strong>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        {/* Chat History if linked */}
                        {linkedConsultation && (
                          <button
                            type="button"
                            onClick={() => setActiveChatCase(linkedConsultation)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{isBn ? "চ্যাট হিস্ট্রি" : "Chat History"}</span>
                          </button>
                        )}

                        {/* Live Chamber link if linked */}
                        {rx.caseId && (
                          <Link
                            href={`/consult/${rx.caseId}`}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-purple-500/30 text-xs font-semibold transition"
                          >
                            <Video className="w-3.5 h-3.5 text-purple-400" />
                            <span>{isBn ? "চেম্বার" : "Chamber"}</span>
                          </Link>
                        )}

                        {/* Download PDF */}
                        <button
                          type="button"
                          onClick={() => generatePrescriptionPdfFromItem(rx)}
                          className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/[0.1] text-xs font-semibold transition shadow-sm"
                          title="Download Cryptographically Signed PDF"
                        >
                          <Download className="w-3.5 h-3.5 text-teal-400" />
                          <span>PDF</span>
                        </button>

                        {/* Revise / Update Prescription */}
                        <button
                          type="button"
                          onClick={() => startRevise(rx)}
                          className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500 text-teal-300 hover:text-slate-950 border border-teal-500/30 text-xs font-bold transition shadow-sm"
                          title="Update formulations, dosages, or advice"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{isBn ? "রিভাইস / আপডেট করুন" : "Revise / Update"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FORM TAB: AUTHOR NEW OR REVISE/UPDATE EXISTING PRESCRIPTION */}
      {/* ========================================================================= */}
      {(viewMode === "create" || viewMode === "revise") && (
        <form onSubmit={handleSubmit} className="space-y-5 text-xs animate-in fade-in">
          {/* Header Banner depending on Mode */}
          <div
            className={`p-3.5 rounded-2xl border flex items-center justify-between ${
              viewMode === "revise"
                ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                : "bg-teal-500/10 border-teal-500/30 text-teal-300"
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              {viewMode === "revise" ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                  <span>
                    {isBn ? "প্রেসক্রিপশন রিভিশন মোড: " : "Revising Prescription: "}
                    <strong className="underline">{editingRxId}</strong>
                  </span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-teal-400" />
                  <span>
                    {isCustomer
                      ? isBn
                        ? "নতুন প্রেসক্রিপশন ও চিকিৎসা রেকর্ড তৈরি করুন"
                        : "Author & Record New Digital Prescription"
                      : isBn
                      ? "নতুন অফিসিয়াল চিকিৎসাপত্র তৈরি করুন"
                      : "Authoring New Official Prescription"}
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setViewMode("repository")}
              className="text-[11px] underline hover:text-white"
            >
              {isBn ? "বাতিল করুন" : "Cancel"}
            </button>
          </div>

          {/* Quick Clinical 1-Click Presets */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-teal-500/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-teal-300 flex items-center gap-1.5 font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>{isBn ? "দ্রুত প্রেসক্রিপশন টেমপ্লেট (এক-ক্লিকে পূরণ):" : "1-Click Clinical Templates & Recommended Formulations:"}</span>
              </span>
              <span className="text-[10px] text-slate-400">Click to auto-fill drugs & safety intervals</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sectorPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-teal-500/10 border border-white/[0.08] hover:border-teal-500/40 text-left transition flex items-start gap-2 group"
                >
                  <span className="text-teal-400 text-xs font-bold shrink-0 mt-0.5">✦</span>
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-bold text-white group-hover:text-teal-300 text-xs block truncate">
                      {preset.label}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {preset.medications[0]?.item} • Withholding: {preset.medications[0]?.withholdingSafetyPeriod}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section A: Case & Beneficiary Linkage */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">
              1. Beneficiary, Target Crop/Animal & Authority
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Assign to Consultation Ticket (Optional)
                </label>
                <select
                  value={selectedCaseId}
                  onChange={(e) => handleSelectCase(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="">-- Standalone Prescription (No Ticket Linked) --</option>
                  {availableConsultations.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.caseNumber} • {c.farmerOrOwner.name} ({c.farmerOrOwner.subjectName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Patient / Beneficiary Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Md. Abdul Alim"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Target Crop / Animal Specimen</label>
                {customerUser?.registeredEntities && customerUser.registeredEntities.length > 0 ? (
                  <div className="space-y-1.5">
                    <select
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="">-- Select from your Registered Items --</option>
                      {customerUser.registeredEntities.map((ent) => (
                        <option key={ent.id} value={ent.name}>
                          {ent.name} {ent.details ? `(${ent.details})` : ""}
                        </option>
                      ))}
                      <option value="custom">-- Custom Crop / Animal --</option>
                    </select>
                    {subjectName === "custom" && (
                      <input
                        type="text"
                        onChange={(e) => setSubjectName(e.target.value)}
                        placeholder="Type custom crop or animal..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white text-xs mt-1"
                        autoFocus
                      />
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="e.g. BRRI Dhan-28 (Boro) or Golden Retriever Max"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                    required
                  />
                )}
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Location / Upazila</label>
                <input
                  type="text"
                  value={patientLocation}
                  onChange={(e) => setPatientLocation(e.target.value)}
                  placeholder="e.g. Dinajpur Sadar, Rangpur"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Prescribing Authority</label>
                <select
                  value={prescriberType}
                  onChange={(e) => setPrescriberType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="tele_specialist">SROT Tele-Specialist ({specialistName})</option>
                  <option value="upazila_officer">Upazila Agriculture / Livestock Officer</option>
                  <option value="private_clinic">Private Diagnostic Clinic / Hospital</option>
                  <option value="self_managed">Self-Administered Field Care Plan</option>
                </select>
              </div>
            </div>

            {prescriberType !== "tele_specialist" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-white/[0.04]">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Prescribing Clinician / Clinic Name</label>
                  <input
                    type="text"
                    value={customDoctorName}
                    onChange={(e) => setCustomDoctorName(e.target.value)}
                    placeholder="e.g. Upazila Agriculture Extension Office, Dinajpur"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Title / Designation</label>
                  <input
                    type="text"
                    value={customDoctorTitle}
                    onChange={(e) => setCustomDoctorTitle(e.target.value)}
                    placeholder="e.g. Senior Upazila Extension Officer"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section B: Clinical Diagnosis & Severity */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">
              2. Clinical Pathology & Severity Assessment
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-slate-400 font-semibold block mb-1">Primary Clinical Diagnosis</label>
                <input
                  type="text"
                  value={diagnosisTitle}
                  onChange={(e) => setDiagnosisTitle(e.target.value)}
                  placeholder="e.g. Acute Bovine Mastitis or Rice Leaf Blast"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500 font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Clinical Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500 font-bold"
                >
                  <option value="Mild">Mild Risk</option>
                  <option value="Moderate">Moderate Risk</option>
                  <option value="Severe">Severe (Action Needed)</option>
                  <option value="Critical">Critical Emergency</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1">Pathogen / Etiological Cause</label>
              <input
                type="text"
                value={pathogenOrCause}
                onChange={(e) => setPathogenOrCause(e.target.value)}
                placeholder="e.g. Streptococcus uberis / Pyricularia oryzae fungal spores"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Section C: Dynamic Multi-Drug Prescribing Array */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">
                  3. Calibrated Medications, Sprays & Withholding Safety Schedule
                </h3>
                <p className="text-[11px] text-slate-400">
                  Add chemical formulations, doses, application frequencies, and statutory withdrawal periods.
                </p>
              </div>

              <button
                type="button"
                onClick={addMedicationRow}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 font-bold transition border border-teal-500/30"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Drug</span>
              </button>
            </div>

            <div className="space-y-3">
              {medications.map((med, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl bg-slate-950 border border-white/[0.08] space-y-2 relative"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.04]">
                    <span className="text-[10px] font-mono font-bold text-teal-400">
                      Medication #{index + 1}
                    </span>
                    {medications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicationRow(index)}
                        className="text-slate-500 hover:text-red-400 transition"
                        title="Remove drug"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-0.5">Drug / Spray Item Name</label>
                      <input
                        type="text"
                        value={med.item}
                        onChange={(e) => updateMedicationField(index, "item", e.target.value)}
                        placeholder="e.g. Tricyclazole 75% WP or Ceftiofur Sodium 1g"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white focus:outline-none focus:border-teal-500 font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-0.5">Active Chemical Ingredient</label>
                      <input
                        type="text"
                        value={med.activeIngredient}
                        onChange={(e) => updateMedicationField(index, "activeIngredient", e.target.value)}
                        placeholder="e.g. Tricyclazole (Melanin inhibitor) or Ceftiofur"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white focus:outline-none focus:border-teal-500 font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-0.5">Calibrated Dosage</label>
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => updateMedicationField(index, "dosage", e.target.value)}
                        placeholder="e.g. 0.6g / L water or 1 tablet twice daily"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white focus:outline-none focus:border-teal-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-0.5">Frequency & Duration</label>
                      <input
                        type="text"
                        value={med.frequencyAndDuration}
                        onChange={(e) => updateMedicationField(index, "frequencyAndDuration", e.target.value)}
                        placeholder="e.g. Once daily for 3 days"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-amber-300 font-bold block mb-0.5">
                        Statutory Withholding Safety
                      </label>
                      <input
                        type="text"
                        value={med.withholdingSafetyPeriod}
                        onChange={(e) => updateMedicationField(index, "withholdingSafetyPeriod", e.target.value)}
                        placeholder="e.g. 21 Days Pre-Harvest or 72 Hours Milk"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-300 focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section D: Treatment Steps & Biosecurity Advice */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/[0.08] space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">
              4. Treatment Steps, Biosecurity & Follow-up Schedule
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Specific Treatment Steps (One instruction per line)
                </label>
                <textarea
                  value={treatmentSteps}
                  onChange={(e) => setTreatmentSteps(e.target.value)}
                  rows={3}
                  placeholder="Halt all urea top-dressing immediately.&#10;Maintain 2-3 cm standing water in paddy.&#10;Spray in late afternoon."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Preventive Biosecurity Advice</label>
                <textarea
                  value={preventiveAdvice}
                  onChange={(e) => setPreventiveAdvice(e.target.value)}
                  rows={3}
                  placeholder="Treat seedbed with Carbendazim 2g/kg seed before transplanting. Dip teat in 1% povidone iodine."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Follow-Up Clinical Date</label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/[0.1] text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              {viewMode === "revise" && (
                <div>
                  <label className="text-amber-300 font-bold block mb-1">
                    Required Revision Audit Reason (Version Control)
                  </label>
                  <input
                    type="text"
                    value={revisionNote}
                    onChange={(e) => setRevisionNote(e.target.value)}
                    placeholder="e.g. Switched antibiotic dosage following temperature spike"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-200 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Submit & Cancel Controls */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setViewMode("repository")}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition font-bold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-slate-950 font-black transition shadow-lg ${
                viewMode === "revise"
                  ? "bg-amber-400 hover:bg-amber-300 shadow-amber-500/20"
                  : "bg-teal-400 hover:bg-teal-300 shadow-teal-500/20"
              }`}
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>
                {viewMode === "revise"
                  ? isBn
                    ? "সংশোধিত প্রেসক্রিপশন সংরক্ষণ করুন"
                    : "Save Certified Revision"
                  : isBn
                  ? "প্রেসক্রিপশন তৈরি ও স্বাক্ষর করুন"
                  : "Certify & Save Prescription"}
              </span>
            </button>
          </div>
        </form>
      )}

      {/* Reusable Customer Chat History Modal */}
      <CustomerChatHistoryModal
        consultation={activeChatCase}
        isOpen={!!activeChatCase}
        onClose={() => setActiveChatCase(null)}
      />
    </div>
  );
}
