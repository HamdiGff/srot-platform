import { ServiceCategory } from "./mockServices";

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  badge: string;
  author: string;
  authorRole: string;
  publishDate: string;
  readTime: string;
  summary: string;
  tags: string[];
  symptomsOrIndicators: string[];
  immediateActionChecklist: string[];
  detailedContent: string[];
  featuredImage: string;
}

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "kb-01",
    slug: "identifying-rice-blast-early",
    title: "How to Detect & Stop Rice Blast (Pyricularia oryzae) Before Grain Loss",
    category: "agri",
    categoryLabel: "Crop Disease",
    badge: "Field Protocol",
    author: "Dr. Ramesh Patel",
    authorRole: "Chief Plant Pathologist",
    publishDate: "October 24, 2026",
    readTime: "4 min read",
    summary: "Foliar blast can decimate 40-70% of paddy yield if unchecked during tillering and panicle initiation. Learn to identify spindle lesions and execute calibrated triazole sprays.",
    tags: ["Rice / Paddy", "Fungal Disease", "Foliar Spray", "Yield Protection"],
    symptomsOrIndicators: [
      "Spindle-shaped eye lesions with grayish center and brown margins on leaves",
      "Blackish rotting at the nodal collar (collar rot stage)",
      "Whitish or blank panicles unable to fill grain during flowering (neck blast)"
    ],
    immediateActionChecklist: [
      "Suspend chemical Nitrogen (Urea) top-dressing immediately.",
      "Check irrigation water depth: keep 3-5 cm constant water layer to mitigate humidity microclimate spikes.",
      "Apply protective Tricyclazole (75% WP) or Azoxystrobin + Difenoconazole early morning or late afternoon.",
      "Avoid handling wet plants to prevent spreading fungal conidia across adjacent bunds."
    ],
    detailedContent: [
      "Blast fungus overwinters in crop stubble and wild grass borders. When relative humidity exceeds 85% paired with night temperatures around 20-24°C, spore release multiplies exponentially.",
      "Over-fertilizing with nitrogen causes thin, tender cell walls that the fungal appressorium easily penetrates. Balancing nitrogen with potassium (MOP) strengthens leaf silica cells into physical armor against spore penetration.",
      "Consult our plant pathologists on SROT with clear leaf photos if lesions appear on more than 3% of the canopy."
    ],
    featuredImage: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kb-02",
    slug: "bovine-mastitis-detection-california-mastitis-test",
    title: "Bovine Mastitis Early Screening: The 3-Minute CMT Field Protocol",
    category: "veterinary",
    categoryLabel: "Animal Healthcare",
    badge: "Veterinary Protocol",
    author: "Dr. Ananya Sen, M.V.Sc.",
    authorRole: "Senior Veterinary Surgeon",
    publishDate: "October 21, 2026",
    readTime: "5 min read",
    summary: "Subclinical mastitis robs up to 2 liters of milk per cow daily without visible udder swelling. Learn how to conduct weekly California Mastitis Tests (CMT) right on your dairy parlor floor.",
    tags: ["Dairy Cattle", "Mastitis", "Milk Quality", "Herd Health"],
    symptomsOrIndicators: [
      "No visible swelling yet, but sudden drop in daily milk fat and overall liters",
      "Milk clots or gelatinous flakes in the fore-stripping cup",
      "Cow flinches or kicks when milker touches specific teat quarters",
      "High bulk-tank somatic cell counts (>250,000 cells/ml)"
    ],
    immediateActionChecklist: [
      "Fore-strip 2 streams of milk from each quarter into the four CMT paddle wells.",
      "Add equal volume of CMT purple reagent and swirl horizontally for 15 seconds.",
      "Observe for gel formation or slime thickening (Scores: Negative, Trace, 1, 2, or 3).",
      "Isolate cows scoring 2 or 3 and milk them last to prevent teat-to-teat bacterial transmission."
    ],
    detailedContent: [
      "Environmental bacteria (Streptococcus uberis, E. coli) thrive in damp cubicles and dirty straw bedding. Post-milking, teat sphincters remain open for 30 minutes; dipping teats into 0.5% chlorhexidine or iodine barrier dip is mandatory.",
      "Never administer arbitrary intramammary tubes without veterinary sensitivity testing. Misusing antibiotics drives antimicrobial resistance and incurs costly milk dumping penalties.",
      "Through SROT's tele-vet consult, transmit video of the stripped milk and CMT paddle for rapid prescription."
    ],
    featuredImage: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kb-03",
    slug: "canine-itch-allergies-flea-triage",
    title: "Why Is My Dog Itching? Triage Guide: Fleas vs. Food vs. Environmental Allergies",
    category: "pet",
    categoryLabel: "Pet Healthcare",
    badge: "Pet Care Guide",
    author: "Dr. Elena Rostova, D.V.M.",
    authorRole: "Companion Pet Tele-Vet Director",
    publishDate: "October 18, 2026",
    readTime: "4 min read",
    summary: "Pruritus (itching) is the #1 reason pet parents seek veterinary help. Discover how to differentiate flea allergy dermatitis from atopy and food sensitivities.",
    tags: ["Dogs", "Allergies", "Dermatology", "Tele-Vet"],
    symptomsOrIndicators: [
      "Chewing at base of the tail and inner thighs (classic Flea Allergy pattern)",
      "Licking paws, rubbing face and red ear canals (classic Atopic / Pollen pattern)",
      "Chronic soft stool or gas combined with non-seasonal year-round itching (Food Intolerance)",
      "Moist, red, foul-smelling 'hot spots' appearing within a few hours"
    ],
    immediateActionChecklist: [
      "Perform a flea comb test over a wet white paper towel (flea dirt turns rust red with water).",
      "Wipe paws and muzzle with unscented pet wipes immediately after grass walks.",
      "Do NOT administer human OTC antihistamines or ibuprofen without veterinarian weight calculations.",
      "Book a quick video consult with our small animal clinicians for targeted JAK inhibitors or cytopoint advice."
    ],
    detailedContent: [
      "Dogs rarely sneeze during allergic reactions; instead, their skin barrier becomes inflamed. Secondary yeast (Malassezia) or bacterial infections frequently take hold in inflamed skin folds.",
      "Medicated bathing with Chlorhexidine + Ketoconazole shampoos requires a strict 10-minute contact time before rinsing to allow the active agents to penetrate hair follicles.",
      "SROT pet tele-medicine connects you in minutes to certified veterinarians who formulate customized weight-based prescriptions sent straight to your device."
    ],
    featuredImage: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kb-04",
    slug: "poultry-heat-stress-broiler-protection",
    title: "Combating Poultry Heat Stress: Ventilation & Electrolyte Protocols",
    category: "veterinary",
    categoryLabel: "Animal Healthcare",
    badge: "Commercial Broiler",
    author: "Dr. Tariq Mansoor, Ph.D.",
    authorRole: "Avian Epidemiologist",
    publishDate: "October 15, 2026",
    readTime: "3 min read",
    summary: "Birds lack sweat glands and depend purely on panting for evaporative cooling. When house temperatures cross 30°C, respiratory alkalosis and mortality spike.",
    tags: ["Poultry", "Broilers", "Heat Stress", "FCR Optimization"],
    symptomsOrIndicators: [
      "Rapid open-beak panting with wings held away from the body",
      "Complete drop in feed intake while water consumption surges by 200%",
      "Pale breast meat and watery white/greenish droppings",
      "Sudden mortality during peak afternoon hours (1:00 PM – 4:30 PM)"
    ],
    immediateActionChecklist: [
      "Withdraw feed 3 hours before peak daily temperatures to reduce bird metabolic heat production.",
      "Add potassium chloride and sodium bicarbonate electrolytes to drinking water.",
      "Check evaporative cooling pad water pump pressure and clean clogged nozzles.",
      "Run roof sprinkler systems to drop ambient metal roofing temperature by 4-6°C."
    ],
    detailedContent: [
      "Panting causes excessive loss of carbon dioxide, disrupting blood acid-base equilibrium. Supplying vitamin C (500mg/L) and betaine stabilizes gut integrity and cellular water retention.",
      "Night feeding allows broilers to regain daily caloric intake in cool hours without elevating day heat loads.",
      "SROT avian specialists can audit your shed airflow dynamics through our remote video consultation."
    ],
    featuredImage: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80",
  }
];
