export type ServiceCategory = "agri" | "veterinary" | "pet";

export type ConsultationChannel = "video" | "audio" | "photo_instant" | "field_visit";

export interface PlatformService {
  id: string;
  slug: string;
  name: string;
  shortTagline: string;
  description: string;
  category: ServiceCategory;
  categoryLabel: string;
  badge: string;
  iconName: string;
  supportedChannels: ConsultationChannel[];
  avgResponseTime: string;
  baseFee: number;
  highlightPoints: string[];
  commonIssuesCovered: string[];
  bannerImage: string;
  isPopular?: boolean;
}

export const PLATFORM_SERVICES: PlatformService[] = [
  // ===================== AGRICULTURE ADVISORY =====================
  {
    id: "svc-crop-disease",
    slug: "crop-disease",
    name: "Crop Disease Diagnosis & Treatment",
    shortTagline: "AI + Certified Agronomist rapid fungal, bacterial & viral leaf diagnosis.",
    description: "Submit high-resolution photographs of diseased leaves, roots, stems, or fruits. Certified plant pathologists pinpoint the exact pathogen strain and prescribe safe chemical/biological treatments with strict spray schedules.",
    category: "agri",
    categoryLabel: "Agriculture Advisory",
    badge: "Most Requested",
    iconName: "Wheat",
    supportedChannels: ["photo_instant", "video", "field_visit"],
    avgResponseTime: "Within 25 mins",
    baseFee: 15,
    highlightPoints: [
      "Pathogen identification with microscopic visual comparison",
      "Biological fungicide & organic spray alternatives",
      "Stage-specific pre-harvest withholding safety intervals",
      "Instant downloadable digital spray prescription"
    ],
    commonIssuesCovered: [
      "Late & Early Blight in Solanaceous crops",
      "Rice Blast & Bacterial Panicle Blight",
      "Powdery Mildew & Rust in Cereals / Pulses",
      "Root Rot, Anthracnose & Citrus Greening"
    ],
    bannerImage: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
  },
  {
    id: "svc-fertilizer-advice",
    slug: "fertilizer-advice",
    name: "Fertilizer & Soil Nutrition Planning",
    shortTagline: "Custom N-P-K & micronutrient regimens based on your crop growth stage.",
    description: "Maximize crop yield without wasting costly fertilizer. Upload your soil test report or describe soil texture, pH, and crop variety to receive scientific basal and top-dressing dosages.",
    category: "agri",
    categoryLabel: "Agriculture Advisory",
    badge: "Yield Optimizer",
    iconName: "Sprout",
    supportedChannels: ["photo_instant", "video", "audio"],
    avgResponseTime: "Under 1 hour",
    baseFee: 18,
    highlightPoints: [
      "Balanced primary N-P-K, secondary (Ca-Mg-S), and micronutrient plans",
      "Fertigation scheduling for drip and sprinkler setups",
      "Soil salinity, acidity, and organic carbon remediation",
      "Reduction of input expenditure by up to 28%"
    ],
    commonIssuesCovered: [
      "Nitrogen deficiency chlorosis vs. iron deficiency",
      "Phosphorus lockout in alkaline soils",
      "Zinc & Boron deficiency fruit dropping",
      "Excessive vegetative growth management"
    ],
    bannerImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
  },
  {
    id: "svc-pest-management",
    slug: "pest-management",
    name: "Integrated Pest & Weed Management (IPM)",
    shortTagline: "Ecologically balanced pest control protecting beneficial pollinators.",
    description: "Combat resistant bollworms, aphids, stem borers, and invasive weeds. Get targeted insecticide dosage, pheromone trap deployment strategies, and bio-control predator recommendations.",
    category: "agri",
    categoryLabel: "Agriculture Advisory",
    badge: "Eco-Safe",
    iconName: "Bug",
    supportedChannels: ["photo_instant", "video", "audio"],
    avgResponseTime: "Under 45 mins",
    baseFee: 16,
    highlightPoints: [
      "Threshold calculations (Economic Injury Level)",
      "Targeted pesticide selection avoiding pesticide resistance",
      "Pheromone trap placement & sticky trap density",
      "Pollinator safety and post-spray re-entry intervals"
    ],
    commonIssuesCovered: [
      "Fall Armyworm & Pink Bollworm infestations",
      "Whiteflies, Thrips & Aphid virus vectors",
      "Stem & Shoot Borers in Rice, Maize, and Brinjal",
      "Noxious and Herbicide-Resistant Weed Control"
    ],
    bannerImage: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a49?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
  },
  {
    id: "svc-field-visits",
    slug: "field-visits",
    name: "On-Site Agronomist Field Inspection",
    shortTagline: "Book an accredited agronomist to visit your farm acreage in person.",
    description: "For large commercial plots, high-density orchards, or stubborn acreage-wide yield crashes. An accredited field agronomist comes directly to your acreage with pH meters, soil probes, and diagnostic tools.",
    category: "agri",
    categoryLabel: "Agriculture Advisory",
    badge: "In-Person Field Visit",
    iconName: "MapPin",
    supportedChannels: ["field_visit"],
    avgResponseTime: "Scheduled 24-48 hrs",
    baseFee: 65,
    highlightPoints: [
      "Physical canopy inspection, root health digging & soil core sampling",
      "GPS geotagged farm health audit report",
      "Irrigation uniformity and emitter flow rate check",
      "Hands-on demonstration for farm workers"
    ],
    commonIssuesCovered: [
      "Large-scale unexplained crop wilting or yellowing",
      "New orchard setup, row orientation & spacing advice",
      "Saline intrusion and drainage basin overhaul",
      "Multi-acre greenhouse environment optimization"
    ],
    bannerImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
  },

  // ===================== ANIMAL HEALTHCARE (LIVESTOCK) =====================
  {
    id: "svc-cattle-health",
    slug: "cattle-health",
    name: "Cattle & Bovine Medicine",
    shortTagline: "Dairy & beef herd health, reproductive fertility, mastitis & milk yield.",
    description: "Connect with licensed livestock veterinarians for dairy cow, bull, and buffalo health. Get rapid advice on mastitis detection, calf diarrhea, artificial insemination timing, and balanced dry-matter feed rations.",
    category: "veterinary",
    categoryLabel: "Animal Healthcare",
    badge: "Dairy Specialists",
    iconName: "Milk",
    supportedChannels: ["video", "photo_instant", "audio", "field_visit"],
    avgResponseTime: "Under 20 mins",
    baseFee: 22,
    highlightPoints: [
      "Subclinical and clinical Mastitis CMT scoring & intramammary protocols",
      "Total Mixed Ration (TMR) silage & mineral block formulation",
      "Post-calving metabolic disorders (Milk Fever, Ketosis)",
      "Strict antibiotic residue and milk withholding timeline calculation"
    ],
    commonIssuesCovered: [
      "Lumpy Skin Disease (LSD) lesions and supportive therapy",
      "Bovine Mastitis & sudden milk drop syndrome",
      "Bloat (ruminal tympany) emergency management",
      "Foot and Mouth Disease (FMD) biosecurity protocols"
    ],
    bannerImage: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
  },
  {
    id: "svc-poultry-health",
    slug: "poultry-health",
    name: "Poultry & Avian Disease Control",
    shortTagline: "Broiler FCR optimization, layer egg production & flock mortality control.",
    description: "Rapid clinical guidance for commercial broiler farms, layer cages, and backyard poultry. Manage respiratory distress, coccidiosis, brooding temperatures, and water sanitation.",
    category: "veterinary",
    categoryLabel: "Animal Healthcare",
    badge: "Flock Health",
    iconName: "Egg",
    supportedChannels: ["video", "photo_instant", "audio"],
    avgResponseTime: "Within 30 mins",
    baseFee: 20,
    highlightPoints: [
      "Post-mortem lesion photo analysis and autopsy interpretation",
      "Drinking water chlorination and gut-health probiotic programs",
      "Newcastle (Ranikhet) & IBD (Gumboro) vaccination schedules",
      "Feed Conversion Ratio (FCR) troubleshooting"
    ],
    commonIssuesCovered: [
      "Bloody droppings and Eimeria coccidiosis",
      "Chronic Respiratory Disease (CRD) & Mycoplasma",
      "Sudden drop in egg shell quality & laying percentage",
      "Heat stress mortality prevention in hot seasons"
    ],
    bannerImage: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
  },
  {
    id: "svc-goat-sheep",
    slug: "goat-sheep",
    name: "Goat & Sheep Healthcare",
    shortTagline: "Small ruminant parasite control (FAMACHA), kid rearing & PPR prevention.",
    description: "Expert veterinary advice for Boer, Barbari, Black Bengal, and wool sheep. Control gastrointestinal nematodes, contagious ecthyma, and respiratory pneumonia.",
    category: "veterinary",
    categoryLabel: "Animal Healthcare",
    badge: "Small Ruminant",
    iconName: "ShieldAlert",
    supportedChannels: ["video", "audio", "photo_instant"],
    avgResponseTime: "Under 40 mins",
    baseFee: 18,
    highlightPoints: [
      "FAMACHA eye conjunctiva score interpretation for targeted deworming",
      "Peste des Petits Ruminants (PPR) early symptom mitigation",
      "Creep feed formulation for kid/lamb rapid weight gain",
      "Hoof rot trimming and footbath disinfection protocols"
    ],
    commonIssuesCovered: [
      "Haemonchus contortus (barber's pole worm) severe anemia",
      "Enterotoxemia (pulpy kidney disease) vaccination",
      "Goat pox & contagious pustular dermatitis",
      "Pregnancy toxemia (ketosis in twin-bearing does)"
    ],
    bannerImage: "https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
  },
  {
    id: "svc-fisheries",
    slug: "fisheries",
    name: "Aquaculture & Fisheries Management",
    shortTagline: "Pond dissolved oxygen, ammonia toxicity, fingerling mortality & feed FCR.",
    description: "Scientific water testing and fish pathology for freshwater carp, tilapia, pangasius, and shrimp ponds. Solve gill rot, dropsy, and sudden algae blooms.",
    category: "veterinary",
    categoryLabel: "Animal Healthcare",
    badge: "Aquaculture",
    iconName: "Waves",
    supportedChannels: ["video", "audio", "photo_instant"],
    avgResponseTime: "Within 45 mins",
    baseFee: 22,
    highlightPoints: [
      "Water pH, alkalinity, and unionized ammonia (NH3) rectification",
      "Plankton bloom crash and emergency oxygen aeration methods",
      "Biofloc C:N ratio calculations and probiotic inoculations",
      "Fry & fingerling prophylactic quarantine protocols"
    ],
    commonIssuesCovered: [
      "Gill rot & Columnaris bacterial epizootics",
      "Argulus (fish lice) and Ich white spot protozoa",
      "Early morning surfacing due to oxygen asphyxiation",
      "Black gill disease and soft shell in shrimp aquaculture"
    ],
    bannerImage: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
  },

  // ===================== PET HEALTHCARE & COMPANION ANIMALS =====================
  {
    id: "svc-pet-services",
    slug: "pet-services",
    name: "Companion Pet Tele-Vet & Wellness",
    shortTagline: "Licensed small-animal vets for dogs, cats, rabbits & companion pets.",
    description: "Consult qualified veterinary surgeons from the comfort of home. Discuss vomiting, itching, allergies, diet transitions, puppy vaccination charts, and behavioral anxieties with zero waiting room stress.",
    category: "pet",
    categoryLabel: "Pet Healthcare",
    badge: "24/7 Pet Tele-Vet",
    iconName: "HeartHandshake",
    supportedChannels: ["video", "photo_instant", "audio"],
    avgResponseTime: "Immediate (Under 15 mins)",
    baseFee: 25,
    highlightPoints: [
      "Face-to-face HD video consultation with board-certified small animal vets",
      "Dermatology & allergy triage with clear photo assessment",
      "Puppy/kitten tailored core & non-core vaccine timelines",
      "Prescription with verified dosage calculated by body weight (kg)"
    ],
    commonIssuesCovered: [
      "Flea/Tick infestation, hot spots & allergic dermatitis",
      "Canine Gastroenteritis, diet change diarrhea & vomiting",
      "Feline Lower Urinary Tract Disease (FLUTD) early warning",
      "Senior pet arthritis mobility & joint nutrition supplements"
    ],
    bannerImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
  },
  {
    id: "svc-pet-nutrition",
    slug: "pet-nutrition",
    name: "Pet Diet, Weight & Prescription Nutrition",
    shortTagline: "Tailored meal planning, raw diet safety & clinical medical diet selection.",
    description: "Customized canine and feline dietary formulations for renal disease, obesity, diabetes, and food allergies. Avoid costly trial-and-error with commercial kibble or balanced homemade meals.",
    category: "pet",
    categoryLabel: "Pet Healthcare",
    badge: "Clinical Nutrition",
    iconName: "Apple",
    supportedChannels: ["video", "photo_instant"],
    avgResponseTime: "Under 1 hour",
    baseFee: 20,
    highlightPoints: [
      "Caloric intake calculations based on ideal Body Condition Score (BCS)",
      "Hypoallergenic novel protein elimination diet plans",
      "Homemade diet mineral & taurine balance verification",
      "Renal & hepatic therapeutic food guidelines"
    ],
    commonIssuesCovered: [
      "Canine obesity and low-impact weight management",
      "Food intolerance recurrent ear infections",
      "Diabetes mellitus carbohydrate titration",
      "Urinary crystal prevention through moisture-rich feeding"
    ],
    bannerImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
  }
];
