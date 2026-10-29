import { ConsultationChannel } from "./mockServices";

export interface PlatformExpert {
  id: string;
  name: string;
  title: string;
  primaryCategory: "agri" | "veterinary" | "poultry" | "fisheries" | "pet";
  categoryBadge: string;
  qualification: string;
  registrationNumber: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationCount: number;
  specialties: string[];
  languages: string[];
  feePerConsultation: number;
  availableToday: boolean;
  nextSlotTime: string;
  supportedChannels: ConsultationChannel[];
  avatar: string;
  location: string;
  bio: string;
  serviceIds: string[];
}

export const PLATFORM_EXPERTS: PlatformExpert[] = [
  // 1. Senior Plant Pathologist
  {
    id: "exp-dr-ramesh-patel",
    name: "Dr. Ramesh Patel",
    title: "Chief Plant Pathologist & IPM Specialist",
    primaryCategory: "agri",
    categoryBadge: "Plant Doctor",
    qualification: "Ph.D. Plant Pathology, M.Sc. Agronomy",
    registrationNumber: "AGR-REG-2014-8891",
    experienceYears: 16,
    rating: 4.96,
    reviewCount: 428,
    consultationCount: 2150,
    specialties: ["Cereal Rust & Blast", "Horticultural Fungal Blights", "Bio-pesticides", "Seed Pathology"],
    languages: ["English", "Hindi", "Gujarati"],
    feePerConsultation: 200,
    availableToday: true,
    nextSlotTime: "Today at 02:30 PM",
    supportedChannels: ["photo_instant", "video", "audio", "field_visit"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    location: "Agricultural Research Center, Western Zone",
    bio: "Over 16 years leading disease management programs across rice, wheat, cotton, and high-value greenhouse vegetables. Specializes in biological disease containment that minimizes chemical residue.",
    serviceIds: ["svc-crop-disease", "svc-pest-management", "svc-field-visits"],
  },

  // 2. Soil Scientist & Nutritionist
  {
    id: "exp-sarah-jenkins",
    name: "Engr. Sarah Jenkins, M.Sc.",
    title: "Senior Agronomist & Soil Nutrition Planner",
    primaryCategory: "agri",
    categoryBadge: "Soil Agronomist",
    qualification: "M.Sc. Soil Chemistry & Precision Agriculture",
    registrationNumber: "AGR-SC-2018-4420",
    experienceYears: 11,
    rating: 4.92,
    reviewCount: 312,
    consultationCount: 1640,
    specialties: ["Fertigation Optimization", "Soil Salinity Reclamation", "Drip Chemistry", "Micronutrient Deficiencies"],
    languages: ["English", "Spanish"],
    feePerConsultation: 200,
    availableToday: true,
    nextSlotTime: "Today at 03:00 PM",
    supportedChannels: ["photo_instant", "video", "audio"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    location: "Precision Agro Lab & Field Station",
    bio: "Pioneered computerized leaf-tissue diagnostic charts. Helps commercial growers cut chemical fertilizer spending by 25-30% while hitting record harvest protein contents.",
    serviceIds: ["svc-fertilizer-advice", "svc-field-visits"],
  },

  // 3. Livestock & Bovine Veterinarian
  {
    id: "exp-dr-ananya-sen",
    name: "Dr. Ananya Sen, M.V.Sc.",
    title: "Senior Veterinary Surgeon & Dairy Health Specialist",
    primaryCategory: "veterinary",
    categoryBadge: "Livestock Vet",
    qualification: "B.V.Sc. & A.H., M.V.Sc. Animal Reproduction & Gynecology",
    registrationNumber: "VCI-REG-2012-7714",
    experienceYears: 14,
    rating: 4.98,
    reviewCount: 560,
    consultationCount: 3200,
    specialties: ["Bovine Mastitis Control", "Artificial Insemination Timing", "Total Mixed Ration (TMR)", "Calf Health"],
    languages: ["English", "Hindi", "Bengali"],
    feePerConsultation: 300,
    availableToday: true,
    nextSlotTime: "Today at 02:00 PM",
    supportedChannels: ["video", "photo_instant", "audio", "field_visit"],
    avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=400&q=80",
    location: "State Veterinary Hospital & Dairy Council",
    bio: "Specializes in modern dairy herd medicine and herd reproductive synchronization. Has guided over 800 dairy farmers in eradicating subclinical mastitis and boosting daily milk yield.",
    serviceIds: ["svc-cattle-health", "svc-goat-sheep"],
  },

  // 4. Poultry & Avian Specialist
  {
    id: "exp-dr-tariq-mansoor",
    name: "Dr. Tariq Mansoor, Ph.D.",
    title: "Avian Epidemiologist & Poultry Health Consultant",
    primaryCategory: "poultry",
    categoryBadge: "Poultry Vet",
    qualification: "D.V.M., Ph.D. Avian Medicine & Biosecurity",
    registrationNumber: "VCI-AV-2016-1092",
    experienceYears: 12,
    rating: 4.89,
    reviewCount: 245,
    consultationCount: 1180,
    specialties: ["Broiler FCR Optimization", "Coccidiosis Management", "Newcastle & IBD Protocols", "Hatchery Sanitation"],
    languages: ["English", "Urdu", "Arabic"],
    feePerConsultation: 250,
    availableToday: false,
    nextSlotTime: "Tomorrow at 09:30 AM",
    supportedChannels: ["video", "photo_instant", "audio"],
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    location: "Avian Diagnostic Lab & Commercial Poultry Advisory",
    bio: "Technical advisor to commercial broiler and layer operations. Expert in rapid flock lesion triage via photograph/video to halt sudden mortality spikes.",
    serviceIds: ["svc-poultry-health"],
  },

  // 5. Companion Pet Veterinarian (Dog & Cat Specialist)
  {
    id: "exp-dr-elena-rostova",
    name: "Dr. Elena Rostova, D.V.M.",
    title: "Small Animal Clinician & Pet Tele-Medicine Director",
    primaryCategory: "pet",
    categoryBadge: "Companion Pet Vet",
    qualification: "D.V.M., Member Royal College of Vet Surgeons (MRCVS)",
    registrationNumber: "RCVS-PET-882194",
    experienceYears: 9,
    rating: 4.99,
    reviewCount: 680,
    consultationCount: 4100,
    specialties: ["Canine & Feline Dermatology", "Puppy Vaccine Protocols", "Emergency Triage", "Senior Pet Mobility"],
    languages: ["English", "French", "Russian"],
    feePerConsultation: 350,
    availableToday: true,
    nextSlotTime: "Available in 10 mins",
    supportedChannels: ["video", "photo_instant", "audio"],
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    location: "Metropolitan Small Animal Tele-Clinic",
    bio: "Passionate companion animal advocate. Delivers empathetic, calm tele-vet care with precise weight-calculated prescriptions for dogs, cats, rabbits, and small pets.",
    serviceIds: ["svc-pet-services", "svc-pet-nutrition"],
  },

  // 6. Aquaculture & Fisheries Biologist
  {
    id: "exp-dr-subhash-barman",
    name: "Dr. Subhash Barman, Ph.D.",
    title: "Aquaculture Biologist & Fish Disease Specialist",
    primaryCategory: "fisheries",
    categoryBadge: "Aquaculture Expert",
    qualification: "Ph.D. Aquatic Animal Health, M.F.Sc. Aquaculture",
    registrationNumber: "AQUA-IND-2015-3091",
    experienceYears: 15,
    rating: 4.91,
    reviewCount: 198,
    consultationCount: 940,
    specialties: ["Pond Water Quality Chemistry", "Bacterial Epizootic Ulcerative Syndrome", "Shrimp Biofloc", "Carp Hatcheries"],
    languages: ["English", "Hindi", "Odia"],
    feePerConsultation: 250,
    availableToday: true,
    nextSlotTime: "Today at 04:15 PM",
    supportedChannels: ["video", "photo_instant", "audio"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    location: "Inland Fisheries Research Institute",
    bio: "Helps commercial fish and shrimp farmers diagnose oxygen crashes, plankton imbalances, and parasitic gill infections via high-definition camera analysis.",
    serviceIds: ["svc-fisheries"],
  }
];
