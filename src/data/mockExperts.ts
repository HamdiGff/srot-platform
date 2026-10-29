import { ConsultationChannel } from "./mockServices";

export interface PlatformExpert {
  id: string;
  name: string;
  title: string;
  primaryCategory: "agri" | "veterinary" | "poultry" | "fisheries" | "pet";
  categoryBadge: string;
  qualification: string;
  registrationNumber: string;
  councilName: string;
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
  division: string;
  location: string;
  bio: string;
  serviceIds: string[];
}

export const PLATFORM_EXPERTS: PlatformExpert[] = [
  // 1. Senior Plant Pathologist (Gazipur / National Hub)
  {
    id: "exp-dr-ramesh-patel",
    name: "Dr. S. M. Tanvir Ahmed, Ph.D.",
    title: "Chief Plant Pathologist & Rice IPM Specialist",
    primaryCategory: "agri",
    categoryBadge: "Plant Pathologist",
    qualification: "Ph.D. Plant Pathology (BAU), M.Sc. Agronomy (BSMRAU)",
    registrationNumber: "DAE-AGR-2015-8891",
    councilName: "Department of Agricultural Extension (DAE)",
    experienceYears: 16,
    rating: 4.96,
    reviewCount: 428,
    consultationCount: 2150,
    specialties: ["Rice Blast & Sheath Blight", "Fungal Blights & IPM", "Bio-fungicides", "Seed Pathology"],
    languages: ["Bangla (বাংলা)", "English"],
    feePerConsultation: 200,
    availableToday: true,
    nextSlotTime: "Today at 02:30 PM",
    supportedChannels: ["photo_instant", "video", "audio", "field_visit"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    division: "Dhaka",
    location: "BARI Regional Agro Complex, Gazipur",
    bio: "Over 16 years leading pest and disease eradication across Boro/Aman rice, maize, and high-value vegetables. Expert in biological IPM protocols that minimize pesticide residues for export-grade compliance.",
    serviceIds: ["svc-crop-disease", "svc-pest-management", "svc-field-visits"],
  },

  // 2. Soil Scientist & Nutritionist (Bogura / Northern Hub)
  {
    id: "exp-sarah-jenkins",
    name: "Engr. Kazi Monirul Islam, M.Sc.",
    title: "Senior Agronomist & Soil Nutrition Director",
    primaryCategory: "agri",
    categoryBadge: "Soil Agronomist",
    qualification: "M.Sc. Soil Science (BAU Mymensingh), Precision Agriculture Fellow",
    registrationNumber: "DAE-SOIL-2016-4420",
    councilName: "Soil Resource Development Institute (SRDI)",
    experienceYears: 11,
    rating: 4.92,
    reviewCount: 312,
    consultationCount: 1640,
    specialties: ["Precision N-P-K Titration", "Soil Salinity Reclamation", "Zinc & Boron Deficiencies", "Organic Composting"],
    languages: ["Bangla (বাংলা)", "English"],
    feePerConsultation: 200,
    availableToday: true,
    nextSlotTime: "Today at 03:00 PM",
    supportedChannels: ["photo_instant", "video", "audio"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    division: "Rajshahi",
    location: "SRDI Regional Research Station, Bogura",
    bio: "Pioneered computerized soil-fertility mapping across northern districts. Has assisted over 1,600 growers in cutting chemical fertilizer costs by 25-30% while maintaining peak grain protein.",
    serviceIds: ["svc-fertilizer-advice", "svc-field-visits"],
  },

  // 3. Livestock & Bovine Veterinary Surgeon (Mymensingh / Sirajganj Dairy Belt)
  {
    id: "exp-dr-ananya-sen",
    name: "Dr. Mahfuzur Rahman, M.V.Sc.",
    title: "Senior Veterinary Surgeon & Bovine Medicine Specialist",
    primaryCategory: "veterinary",
    categoryBadge: "Livestock Vet",
    qualification: "D.V.M. (BAU), M.V.Sc. Animal Reproduction & Surgery",
    registrationNumber: "BVC-VET-2014-7714",
    councilName: "Bangladesh Veterinary Council (BVC)",
    experienceYears: 14,
    rating: 4.98,
    reviewCount: 560,
    consultationCount: 3200,
    specialties: ["Bovine Mastitis (CMT Scoring)", "Artificial Insemination (AI)", "Lumpy Skin Disease (LSD)", "Lactation Rations"],
    languages: ["Bangla (বাংলা)", "English"],
    feePerConsultation: 300,
    availableToday: true,
    nextSlotTime: "Today at 02:00 PM",
    supportedChannels: ["video", "photo_instant", "audio", "field_visit"],
    avatar: "https://images.unsplash.com/photo-1594824813568-7c8fa0747185?auto=format&fit=crop&w=400&q=80",
    division: "Mymensingh",
    location: "Veterinary Teaching Hospital, BAU Campus, Mymensingh",
    bio: "Specializes in high-yielding dairy crossbred health, subclinical mastitis prevention, and reproductive timing. Strict advocate of statutory milk withholding intervals to eliminate antimicrobial residue.",
    serviceIds: ["svc-cattle-health", "svc-goat-sheep"],
  },

  // 4. Poultry & Avian Health Specialist (Gazipur Commercial Flock Hub)
  {
    id: "exp-dr-tariq-mansoor",
    name: "Dr. Tariqul Hasan, D.V.M., Ph.D.",
    title: "Avian Epidemiologist & Commercial Flock Consultant",
    primaryCategory: "poultry",
    categoryBadge: "Poultry Vet",
    qualification: "D.V.M. (SAU Dhaka), Ph.D. Avian Pathology & Biosecurity",
    registrationNumber: "BVC-PLT-2015-1092",
    councilName: "Bangladesh Veterinary Council (BVC)",
    experienceYears: 12,
    rating: 4.89,
    reviewCount: 245,
    consultationCount: 1180,
    specialties: ["Broiler FCR Optimization", "Gumboro & Newcastle Biosecurity", "Coccidiosis Control", "Hatchery Sanitation"],
    languages: ["Bangla (বাংলা)", "English"],
    feePerConsultation: 250,
    availableToday: true,
    nextSlotTime: "Today at 04:30 PM",
    supportedChannels: ["video", "photo_instant", "audio"],
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    division: "Dhaka",
    location: "BLRI Avian Health Center, Savar, Dhaka",
    bio: "Technical advisor to commercial broiler and Sonali layer farms in Gazipur and Tangail. Delivers rapid visual flock triage via high-definition photo/video to contain mortality spikes.",
    serviceIds: ["svc-poultry-health"],
  },

  // 5. Companion Pet Veterinarian (Dhaka Metropolitan)
  {
    id: "exp-dr-elena-rostova",
    name: "Dr. Nusrat Jahan, D.V.M.",
    title: "Small Animal Clinician & Pet Tele-Health Director",
    primaryCategory: "pet",
    categoryBadge: "Companion Pet Vet",
    qualification: "D.V.M. (CVASU), Advanced Certified in Canine Dermatology & Soft Tissue Surgery",
    registrationNumber: "BVC-PET-2018-9104",
    councilName: "Bangladesh Veterinary Council (BVC)",
    experienceYears: 9,
    rating: 4.99,
    reviewCount: 680,
    consultationCount: 4100,
    specialties: ["Canine & Feline Dermatology", "Puppy/Kitten Vaccines", "Emergency Pet Triage", "Weight-Titrated Rx"],
    languages: ["Bangla (বাংলা)", "English"],
    feePerConsultation: 300,
    availableToday: true,
    nextSlotTime: "Available in 10 mins",
    supportedChannels: ["video", "photo_instant", "audio"],
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    division: "Dhaka",
    location: "Central Companion Animal Hospital, Dhanmondi, Dhaka",
    bio: "Empathetic companion animal clinician providing dedicated video and photo triage for dogs, cats, rabbits, and exotic birds across Dhaka and major divisional hubs.",
    serviceIds: ["svc-pet-services", "svc-pet-nutrition"],
  },

  // 6. Aquaculture & Fisheries Biologist (Mymensingh & Coastal Belt)
  {
    id: "exp-dr-subhash-barman",
    name: "Dr. Subhash Chandra Das, Ph.D.",
    title: "Chief Aquaculture Biologist & Water Chemistry Specialist",
    primaryCategory: "fisheries",
    categoryBadge: "Aquaculture Expert",
    qualification: "Ph.D. Aquatic Animal Health, M.Sc. Aquaculture (BFRI Mymensingh)",
    registrationNumber: "DOF-AQUA-2014-3091",
    councilName: "Department of Fisheries (DoF)",
    experienceYears: 15,
    rating: 4.91,
    reviewCount: 198,
    consultationCount: 940,
    specialties: ["Dissolved Oxygen (DO) Crash Reversal", "Ammonia & Nitrite Toxicity", "EUS & Gill Rot Triage", "Biofloc & Nursery Rearing"],
    languages: ["Bangla (বাংলা)", "English"],
    feePerConsultation: 250,
    availableToday: true,
    nextSlotTime: "Today at 05:15 PM",
    supportedChannels: ["video", "photo_instant", "audio"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    division: "Mymensingh",
    location: "Bangladesh Fisheries Research Institute (BFRI), Mymensingh",
    bio: "Assists commercial Pangas, Tilapia, and Shrimp farmers in solving water parameter crashes, phytoplankton die-offs, and bacterial fin/gill rot via instant photo and water test report review.",
    serviceIds: ["svc-fisheries"],
  }
];
