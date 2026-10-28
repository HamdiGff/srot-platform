# SROT Platform — Digital Agriculture & Animal Healthcare Platform

> **A Unified, Modular Service Platform for Crop Advisory, Livestock Healthcare & Companion Pet Services**

Built from scratch using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Zustand**, and **jsPDF**.

---

## 🏗️ Architectural Philosophy: The Modular Service Platform

Instead of building a narrow "crop advisory website" and having to rebuild when expanding into livestock or pet care, **SROT is architected from Day 1 as a generic service platform**:

```
SROT Platform
│
├── 🌾 Agriculture Advisory (Phase 1)
│     ├── Crop Disease Diagnosis & Treatment
│     ├── Fertilizer & Soil Nutrition Planning
│     ├── Integrated Pest Management (IPM)
│     └── On-Site Agronomist Field Visits
│
├── 🐄 Animal Healthcare (Phase 2)
│     ├── Cattle & Bovine Medicine (Mastitis, Nutrition)
│     ├── Poultry Flock Health & Biosecurity
│     ├── Goat & Sheep Small Ruminant Care
│     └── Aquaculture & Pond Water Chemistry
│
├── 🐕 Companion Pet Healthcare (Phase 2)
│     ├── 24/7 Small Animal Video Tele-Vet (Dogs, Cats)
│     ├── Dermatology & Allergy Triage
│     └── Clinical Prescription Diets & Weight Management
│
├── 📚 Knowledge Hub (Phase 1)
│     ├── Pathogen Diagnostic Protocols
│     ├── Spray Withholding & Milk Safety Intervals
│     └── California Mastitis Test (CMT) & Field Guides
│
├── 👤 Generic Unified Profiles & Multi-Persona System
│     ├── Farmer (Acreage & Grain Crops)
│     ├── Livestock Producer (Dairy & Herds)
│     ├── Pet Parent (Dogs, Cats, Companion Animals)
│     ├── Expert Plant Pathologist & Agronomist
│     ├── Licensed Veterinary Surgeon
│     └── Platform Administrator
│
└── 🛒 Future Input Marketplace & Logistics (Phase 3 Plug-in)
      ├── Certified Bio-Pesticides & Fertilizers
      ├── Veterinary Pharmaceuticals & Feed Additives
      └── Soil Sensor Kits
```

### Why This Database & Flow is Generic

- **No Rigid Tables**: The system does not lock entities into "farmers" only. The database schema understands **Users**, **Entities** (Crops, Dairy Herds, Dogs/Cats), **Services**, **Practitioners**, and **Consultations**.
- **Identical Consultation Booking Flow**:
  1. Select Category (Agri / Livestock / Pet Care)
  2. Choose Service & Channel (Photo Instant Triage, HD Video, Voice Call, On-Field Visit)
  3. Upload Symptom Details & High-Resolution Photos
  4. Pick Accredited Agronomist or Veterinarian
  5. Enter Live Consultation Room & Receive Official Verifiable PDF Prescription.

---

## 🚀 Key Features Built in This Project

1. **Unified Consultation Booking Engine** (`/consult`)
   - 4-step wizard with real-time sector switching, photo uploads, channel selection, and practitioner matching.
2. **Interactive Consultation Room** (`/consult/[id]`)
   - Encrypted room with simulated live video feed, real-time message stream, and instant prescription generation.
3. **Official Digital Prescription & Advisory PDF Generator** (`src/lib/prescriptionGenerator.ts`)
   - Generates authentic, downloadable A4 PDF documents with case reference numbers, attending specialist license details, clinical diagnosis, severity level, dosage protocols, and safety withholding intervals.
4. **Interactive Persona Switcher** (Accessible anywhere from the top header)
   - Switch with one click between:
     - **Tariqul Islam** (Rice Farmer, 5.2 Acres)
     - **Marcus Holloway** (Dairy Farmer, 28 Cows)
     - **Jessica Miller** (Pet Parent, Golden Retriever Max)
     - **Dr. Ramesh Patel** (Chief Plant Pathologist)
     - **Dr. Ananya Sen** (Senior Veterinary Surgeon)
     - **Platform Admin** (System Controller)
5. **Admin Modular Orchestrator** (`/admin`)
   - Toggle individual modules (Agriculture, Animal Health, Pet Care, Marketplace) on or off in real time to observe the modular architecture in action.
6. **Farmer / Pet Owner Dashboard** (`/farmer-portal`)
   - Manage registered crops, herds, and pets; review active cases; download past official Rx files.
7. **Practitioner & Clinician Desk** (`/expert-portal`)
   - Incoming triage queue; review photos; write and issue signed digital prescriptions.
8. **Scientific Knowledge Hub** (`/knowledge` & `/knowledge/[slug]`)
   - Peer-reviewed protocols for Rice Blast, Bovine Mastitis CMT screening, and Canine Allergy Triage.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with custom earth-emerald & slate theme
- **Icons**: Lucide React
- **State Management**: Zustand (Local store & persistence across personas)
- **Document Generation**: jsPDF (Vector PDF advisory reports & prescriptions)
- **Accessibility**: Follows Modern Web Guidance for dialog focus management and scroll containment.

---

## 💻 Getting Started

To run the development server:

```bash
cd C:\Users\hamdi\.gemini\antigravity\scratch\srot-platform
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

To verify the production build:

```bash
npm run build
npm run start
```
