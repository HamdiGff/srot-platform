"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Wheat,
  Milk,
  HeartHandshake,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Droplets,
  AlertTriangle,
  FileCheck2,
} from "lucide-react";

interface ScheduleItem {
  stage: string;
  threat: string;
  action: string;
  timing: string;
  urgency: "high" | "medium" | "preventive";
  dosageSummary: string;
}

interface SectorSchedule {
  name: string;
  category: "agri" | "livestock" | "pet";
  iconName: string;
  seasonContext: string;
  schedule: ScheduleItem[];
  expertType: string;
  consultQuery: string;
}

const SCHEDULES: Record<string, SectorSchedule> = {
  rice: {
    name: "Paddy Rice (Kharif / Wet Season)",
    category: "agri",
    iconName: "wheat",
    seasonContext: "Active Monsoon / Tillering to Panicle Emergence Stage",
    expertType: "Cereal Crop Agronomist",
    consultQuery: "crop-disease",
    schedule: [
      {
        stage: "Nursery / Seedling (0 - 20 DAT)",
        threat: "Damping Off & Thrips (Stenchaetothrips biformis)",
        action: "Seed priming with Carbendazim 2g/kg; monitor yellow leaf tips.",
        timing: "Pre-transplanting",
        urgency: "preventive",
        dosageSummary: "Carbendazim 50% WP @ 2.0 g/kg seed",
      },
      {
        stage: "Active Tillering (25 - 45 DAT)",
        threat: "Stem Borer & Leaf Folder (Cnaphalocrocis medinalis)",
        action: "Deploy pheromone traps (5/acre); apply Chlorantraniliprole 0.4% GR if >1 larva/hill.",
        timing: "Within next 5-7 days",
        urgency: "high",
        dosageSummary: "Chlorantraniliprole 18.5% SC @ 60 ml/acre in 200L water",
      },
      {
        stage: "Panicle Initiation & Booting (50 - 70 DAT)",
        threat: "Sheath Blight & Rice Blast (Pyricularia oryzae)",
        action: "Foliar spray of Tricyclazole or Azoxystrobin + Difenoconazole before boot splits.",
        timing: "Strict 14-day window",
        urgency: "high",
        dosageSummary: "Tricyclazole 75% WP @ 120 g/acre; 21d withholding",
      },
      {
        stage: "Milking & Grain Filling (75 - 95 DAT)",
        threat: "Rice Gundhi Bug & False Smut",
        action: "Malathion 5% dust or Propiconazole 25% EC at evening milking stage.",
        timing: "Late season",
        urgency: "medium",
        dosageSummary: "Propiconazole 25% EC @ 200 ml/acre",
      },
    ],
  },
  cattle: {
    name: "Dairy Cattle Herd (Lactation & Calving)",
    category: "livestock",
    iconName: "milk",
    seasonContext: "Peak Milk Production & Heat Stress Management Protocol",
    expertType: "Bovine Veterinary Specialist",
    consultQuery: "veterinary-consultation",
    schedule: [
      {
        stage: "Early Lactation (0 - 60 Days Post-Calving)",
        threat: "Ketosis, Hypocalcemia (Milk Fever) & Subclinical Mastitis",
        action: "Daily California Mastitis Test (CMT) testing; supplement calcium borogluconate & anionic salts.",
        timing: "Immediate / Continuous",
        urgency: "high",
        dosageSummary: "Oral Calcium Gel 300g BID + Intramammary Ceftiofur if CMT > 2+",
      },
      {
        stage: "Mid Lactation (60 - 150 Days)",
        threat: "Tick-Borne Theileriosis & Babesiosis Hemoparasites",
        action: "Buparvaquone screening and pour-on Flumethrin 1% application along dorsal line.",
        timing: "Every 28-30 days",
        urgency: "medium",
        dosageSummary: "Flumethrin 1% pour-on @ 1 ml / 10 kg bodyweight",
      },
      {
        stage: "Dry Cow Period (60 Days Prior to Calving)",
        threat: "Environmental Mastitis (E. coli, Strep. uberis) in Non-Milking Quarters",
        action: "Dry cow antibiotic therapy with intramammary infusion + internal teat sealant.",
        timing: "At final dry-off milking",
        urgency: "preventive",
        dosageSummary: "Cloxacillin Benzathine 500 mg per quarter + bismuth subnitrate seal",
      },
      {
        stage: "Annual Herd Biosecurity Booster",
        threat: "Foot & Mouth Disease (FMD) & Hemorrhagic Septicemia (HS)",
        action: "Bi-annual oil adjuvant FMD vaccination; pre-monsoon HS/BQ bacterin injection.",
        timing: "Pre-Monsoon Season",
        urgency: "high",
        dosageSummary: "FMD Oil Adjuvant Vaccine 2 ml S/C per adult head",
      },
    ],
  },
  poultry: {
    name: "Commercial Broiler Flock (6-Week Cycle)",
    category: "livestock",
    iconName: "milk",
    seasonContext: "Standard 42-Day Broiler Growth & Biosecurity Regimen",
    expertType: "Avian Veterinarian & Nutritionist",
    consultQuery: "poultry-healthcare",
    schedule: [
      {
        stage: "Day 1 - 7 (Brooding Phase)",
        threat: "Early Chick Mortality & Omphalitis (Yolk Sac Infection)",
        action: "Electrolytes + probiotic in drinking water; Mareks & Newcastle B1 spray at hatchery.",
        timing: "Day 1-4",
        urgency: "preventive",
        dosageSummary: "Multi-strain water-soluble probiotic + Enrofloxacin 10% (if yolk infected)",
      },
      {
        stage: "Day 12 - 14 (Intermediate Phase)",
        threat: "Infectious Bursal Disease (Gumboro / IBD)",
        action: "Live intermediate strain vaccine via chlorinated-free drinking water with skim milk dye.",
        timing: "Strict Day 14 ocular/water",
        urgency: "high",
        dosageSummary: "IBD Intermediate Plus Strain, 1 dose per chick in clean water",
      },
      {
        stage: "Day 21 - 28 (Finisher Growth)",
        threat: "Cecal & Intestinal Coccidiosis (Eimeria tenella)",
        action: "Amprolium or Toltrazuril pulse dosing; check litter moisture < 25%.",
        timing: "Day 21-24",
        urgency: "high",
        dosageSummary: "Toltrazuril 2.5% @ 7 mg/kg bodyweight in drinking water for 2 consecutive days",
      },
      {
        stage: "Day 35 - 42 (Pre-Harvest)",
        threat: "Sudden Death Syndrome (Flip-Over) & Heat Prostration",
        action: "Withdraw all coccidiostats and antibiotics 7 days prior to slaughter; add Vitamin C in water.",
        timing: "Final week",
        urgency: "preventive",
        dosageSummary: "Strict 7-day antibiotic withdrawal; Vitamin C 100g/1000L",
      },
    ],
  },
  canine: {
    name: "Companion Dog & Puppy Healthcare",
    category: "pet",
    iconName: "heart",
    seasonContext: "Core Puppy Immunization & Senior Parasite Prophylaxis",
    expertType: "Small Animal Tele-Vet",
    consultQuery: "pet-telehealth",
    schedule: [
      {
        stage: "6 - 8 Weeks (Puppy Starter)",
        threat: "Canine Parvovirus (CPV) & Distemper Virus (CDV)",
        action: "DHPP core combination vaccine (Distemper, Hepatitis, Parvo, Parainfluenza).",
        timing: "Initial shot at 6-8 weeks",
        urgency: "high",
        dosageSummary: "DHPP 1.0 ml S/C + Pyrantel pamoate dewormer @ 5 mg/kg",
      },
      {
        stage: "10 - 12 Weeks (Booster 1)",
        threat: "Leptospirosis, Parvo Booster & Roundworm",
        action: "DHPP + L4 booster; broad-spectrum Fenbendazole suspension.",
        timing: "3-4 weeks after 1st shot",
        urgency: "high",
        dosageSummary: "DHPP + Leptospira bacterin 1 ml S/C + Fenbendazole 50 mg/kg",
      },
      {
        stage: "16 Weeks & Annual (Rabies Core)",
        threat: "Rabies Virus & Bordetella Bronchiseptica",
        action: "Mandatory statutory Rabies vaccine; issuance of official municipal vaccination certificate.",
        timing: "At 16 weeks + annual booster",
        urgency: "high",
        dosageSummary: "Inactivated Rabies 1 ml S/C; verifiable QR tagged certificate",
      },
      {
        stage: "Monthly Year-Round Wellness",
        threat: "Heartworm (Dirofilaria) & Flea/Tick Dermatitis",
        action: "Monthly chewable isoxazoline (Fluralaner or Afoxolaner) + Moxidectin preventative.",
        timing: "Every 30-35 days",
        urgency: "preventive",
        dosageSummary: "Weight-specific chewable titrated to exact dog body mass (e.g. 20-40 kg)",
      },
    ],
  },
};

export function CropLivestockCalendar() {
  const [selectedKey, setSelectedKey] = useState<string>("rice");
  const current = SCHEDULES[selectedKey];

  return (
    <div className="srot-glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 bg-gradient-to-b from-slate-900/80 via-[#071018] to-slate-950 shadow-2xl relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Selector Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Calendar className="w-4 h-4" />
            <span>Interactive Seasonal Protocol Planner</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Crop Spray Windows & Animal Vaccination Schedules
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Select your crop or animal to view stage-by-stage clinical alerts, highest risk pathogens, chemical/biological dosages, and statutory withdrawal periods.
          </p>
        </div>

        {/* Entity Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 self-start lg:self-auto">
          {[
            { key: "rice", label: "🌾 Paddy Rice", cat: "agri" },
            { key: "cattle", label: "🐄 Dairy Herd", cat: "livestock" },
            { key: "poultry", label: "🐔 Broiler Flock", cat: "livestock" },
            { key: "canine", label: "🐕 Pet Canine", cat: "pet" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedKey(item.key)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 whitespace-nowrap ${
                selectedKey === item.key
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/60 border border-emerald-400/40"
                  : "bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Selection Context Header */}
      <div className="py-4 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/60 px-4 rounded-2xl border border-slate-800/80 my-6">
        <div className="flex items-center gap-2 text-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">{current.name}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-mono text-[11px]">{current.seasonContext}</span>
        </div>

        <Link
          href={`/consult?service=${current.consultQuery}`}
          className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition"
        >
          <span>Consult a {current.expertType}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Timeline Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {current.schedule.map((step, idx) => {
          const urgencyColor =
            step.urgency === "high"
              ? "border-red-500/40 bg-red-950/20 text-red-400"
              : step.urgency === "medium"
              ? "border-amber-500/40 bg-amber-950/20 text-amber-400"
              : "border-emerald-500/40 bg-emerald-950/20 text-emerald-400";

          return (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    STAGE 0{idx + 1}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${urgencyColor}`}
                  >
                    {step.urgency === "high" ? "High Risk" : step.urgency === "medium" ? "Moderate Risk" : "Preventive"}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                  {step.stage}
                </h4>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-red-400/90 block font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Critical Pathogen / Threat:
                    </span>
                    <p className="text-slate-300 font-medium text-[11px] mt-0.5">
                      {step.threat}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-emerald-400/90 block font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Prescribed Action / Protocol:
                    </span>
                    <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                      {step.action}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timing & Dosage Footprint */}
              <div className="pt-3 mt-3 border-t border-slate-800/80 text-[11px] space-y-1">
                <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>TIMING:</span>
                  </span>
                  <span className="text-white font-medium">{step.timing}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono bg-slate-950 p-1.5 rounded-lg border border-slate-800 truncate">
                  <span className="text-emerald-400">Rx:</span> {step.dosageSummary}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Legal & Triage Disclaimer */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-emerald-400" />
          <span>All spray windows and vaccine schedules adhere to ICAR, FAO, and RCVS clinical standards.</span>
        </div>
        <Link
          href={`/consult?service=${current.consultQuery}`}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition text-xs shrink-0"
        >
          Book Protocol Consultation &rarr;
        </Link>
      </div>
    </div>
  );
}
