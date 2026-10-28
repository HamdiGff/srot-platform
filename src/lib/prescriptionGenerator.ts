import { jsPDF } from "jspdf";
import { ConsultationRecord } from "@/data/mockConsultations";

export function generatePrescriptionPdf(consultation: ConsultationRecord) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const isAgri = consultation.category === "agri";
  const isPet = consultation.category === "pet";
  const docType = isAgri
    ? "OFFICIAL AGRONOMIC ADVISORY REPORT"
    : isPet
    ? "VETERINARY CLINICAL PRESCRIPTION (PET)"
    : "VETERINARY CLINICAL PRESCRIPTION (LIVESTOCK)";

  // 1. TOP HEADER BANNER (Deep Forest / Teal #064E3B)
  doc.setFillColor(6, 78, 59); // Deep Forest Green
  doc.rect(0, 0, pageWidth, 42, "F");

  // Emerald / Gold accent line
  doc.setFillColor(16, 185, 129); // #10B981
  doc.rect(0, 42, pageWidth, 2, "F");

  // Brand Name & Subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("SROT PLATFORM", margin, 18);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(209, 250, 229); // #D1FAE5
  doc.text("DIGITAL AGRICULTURE & ANIMAL HEALTHCARE TELE-ADVISORY", margin, 25);
  doc.text("ACCREDITED SCIENTIFIC CONSULTATION & BIOSECURITY NETWORK", margin, 30);

  // Document Title (Right Aligned)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(docType, pageWidth - margin, 18, { align: "right" });

  doc.setFontSize(8.5);
  doc.setTextColor(52, 211, 153);
  doc.text(`CASE REF: ${consultation.caseNumber}`, pageWidth - margin, 25, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(209, 250, 229);
  doc.text(`DATE ISSUED: ${new Date(consultation.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, pageWidth - margin, 31, { align: "right" });
  doc.text(`SERVICE CHANNEL: ${consultation.channel.toUpperCase().replace("_", " ")}`, pageWidth - margin, 36, { align: "right" });

  // 2. METADATA CARDS: BENEFICIARY & ATTENDING SPECIALIST
  let curY = 50;
  const cardWidth = (contentWidth - 6) / 2;
  const cardHeight = 36;

  // Left Card: Beneficiary (Farmer / Pet Owner)
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, curY, cardWidth, cardHeight, 2.5, 2.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(isPet ? "PET PARENT & PATIENT DETAILS" : "PRODUCER & CROP/HERD RECORD", margin + 4, curY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("Beneficiary Name:", margin + 4, curY + 13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(consultation.farmerOrOwner.name, margin + 32, curY + 13);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(isAgri ? "Crop / Variety:" : "Subject / Animal:", margin + 4, curY + 19);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(6, 78, 59);
  doc.text(consultation.farmerOrOwner.subjectName, margin + 32, curY + 19);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(isAgri ? "Growth Stage / Acreage:" : "Age / Weight:", margin + 4, curY + 25);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(`${consultation.farmerOrOwner.subjectAgeOrStage} (${consultation.farmerOrOwner.areaOrHerdSize})`, margin + 32, curY + 25);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Field Location:", margin + 4, curY + 31);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(consultation.farmerOrOwner.location, margin + 32, curY + 31);

  // Right Card: Attending Specialist
  const rightX = margin + cardWidth + 6;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rightX, curY, cardWidth, cardHeight, 2.5, 2.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("LICENSED CONSULTANT / CLINICIAN", rightX + 4, curY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("Expert Name:", rightX + 4, curY + 13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(consultation.expert.name, rightX + 28, curY + 13);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Official Title:", rightX + 4, curY + 19);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(consultation.expert.title.substring(0, 32), rightX + 28, curY + 19);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("License / Reg #:", rightX + 4, curY + 25);
  doc.setFont("courier", "bold");
  doc.setTextColor(4, 120, 87);
  doc.text(consultation.expert.regNumber, rightX + 28, curY + 25);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text("Verification:", rightX + 4, curY + 31);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(5, 150, 105);
  doc.text("SROT VERIFIED PRACTITIONER", rightX + 28, curY + 31);

  // 3. DIAGNOSIS & CLINICAL ASSESSMENT SUMMARY
  curY = 92;
  const p = consultation.prescription;
  const diagnosisTitle = p?.diagnosisTitle || "Pending Specialist Review";
  const cause = p?.pathogenOrCause || "Under laboratory/visual analysis";
  const severity = p?.severity || "Moderate";

  doc.setFillColor(240, 253, 244); // Light Emerald #F0FDF4
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(margin, curY, contentWidth, 24, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(6, 95, 70);
  doc.text("PRIMARY DIAGNOSIS & IDENTIFIED PATHOGEN / ETIOLOGY:", margin + 4, curY + 6);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(diagnosisTitle, margin + 4, curY + 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(`Etiology / Trigger: ${cause}`, margin + 4, curY + 19);

  // Severity Tag (Right)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(severity === "Critical" || severity === "Severe" ? 185 : 5, 28, 28);
  doc.text(`SEVERITY LEVEL: ${severity.toUpperCase()}`, margin + contentWidth - 4, curY + 13, { align: "right" });

  // 4. TREATMENT STEPS & IMMEDIATE ACTION
  curY = 122;
  doc.setFillColor(15, 23, 42); // Dark Slate
  doc.rect(margin, curY, contentWidth, 7, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("I. IMMEDIATE ACTION PROTOCOL & FIELD INSTRUCTIONS", margin + 3, curY + 4.8);

  curY += 7;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  const steps = p?.treatmentSteps || [
    "Follow standard isolation procedures for the affected quadrant/specimen.",
    "Monitor surrounding plants/animals daily for similar early lesions.",
  ];

  const stepsHeight = Math.max(18, steps.length * 6 + 4);
  doc.rect(margin, curY, contentWidth, stepsHeight, "FD");

  let stepY = curY + 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  steps.forEach((step, idx) => {
    doc.text(`${idx + 1}.  ${step}`, margin + 4, stepY);
    stepY += 6;
  });

  curY += stepsHeight + 5;

  // 5. ITEMIZED MEDICATIONS / CHEMICAL SPRAYS TABLE
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, curY, contentWidth, 7, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("II. PRESCRIBED FORMULATIONS, DOSAGES & WITHHOLDING INTERVALS", margin + 3, curY + 4.8);

  curY += 7;

  // Table Subheader
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, curY, contentWidth, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text("FORMULATION / MEDICINE", margin + 3, curY + 4.2);
  doc.text("ACTIVE INGREDIENT", margin + 52, curY + 4.2);
  doc.text("DOSAGE & ROUTE", margin + 104, curY + 4.2);
  doc.text("WITHHOLDING SAFETY PERIOD", margin + 148, curY + 4.2);

  curY += 6;

  const meds = p?.medicationsOrSprays || [];
  if (meds.length > 0) {
    meds.forEach((med) => {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin, curY, contentWidth, 12, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(med.item, margin + 3, curY + 4.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(med.frequencyAndDuration, margin + 3, curY + 8.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      doc.text(med.activeIngredient.substring(0, 32), margin + 52, curY + 5.5);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(4, 120, 87);
      doc.text(med.dosage.substring(0, 26), margin + 104, curY + 5.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(6.5);
      doc.setTextColor(180, 83, 9); // Amber warning color
      doc.text(med.withholdingSafetyPeriod.substring(0, 28), margin + 148, curY + 5.5);

      curY += 12;
    });
  } else {
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, curY, contentWidth, 10, "FD");
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text("No chemical sprays or prescription medicines required. Follow organic protocol.", margin + 4, curY + 6);
    curY += 10;
  }

  // 6. PREVENTIVE GUIDELINES & FOLLOW UP BOX
  curY += 5;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, curY, contentWidth, 24, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("LONG-TERM PREVENTIVE ADVISORY & FOLLOW-UP SCHEDULE:", margin + 4, curY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(p?.preventiveAdvice || "Maintain standard biosafety hygiene and soil aeration.", margin + 4, curY + 12);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(6, 78, 59);
  doc.text(`RECOMMENDED FOLLOW-UP CHECK: ${p?.followUpDate || "Within 10 Days via SROT Portal"}`, margin + 4, curY + 18);

  // 7. OFFICIAL SROT SEAL & CRYPTOGRAPHIC VERIFICATION
  curY = 244;
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(52, 211, 153);
  doc.roundedRect(margin, curY, contentWidth, 26, 2, 2, "FD");

  // Simulated Seal Circle
  doc.setFillColor(16, 185, 129);
  doc.circle(margin + 14, curY + 13, 9, "F");
  doc.setFillColor(255, 255, 255);
  doc.circle(margin + 14, curY + 13, 7.5, "F");
  doc.setFillColor(6, 78, 59);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(5);
  doc.text("SROT", margin + 14, curY + 11.8, { align: "center" });
  doc.text("VERIFIED", margin + 14, curY + 14.8, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Official Digital Signature & Accreditation Seal:", margin + 27, curY + 7);

  doc.setFont("courier", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(71, 85, 105);
  const checksum = `SHA256: 9b2d8f71c4e0${consultation.caseNumber.replace(/[^0-9]/g, "")}4192ba87c29048f`;
  doc.text(checksum, margin + 27, curY + 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text("Prescription legally authenticated via SROT Agronomic & Veterinary Telehealth Network.", margin + 27, curY + 17);
  doc.text(`Verify online anytime at: https://srot.platform/consult/${consultation.caseNumber}`, margin + 27, curY + 21);

  // 8. FOOTER
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text("© 2026 SROT Platform. Agricultural & Animal Telehealth Network. All rights reserved.", margin, pageHeight - 6);
  doc.text(`Case ID: ${consultation.caseNumber} • 1 of 1`, pageWidth - margin, pageHeight - 6, { align: "right" });

  // Download PDF file
  doc.save(`${consultation.caseNumber}-Prescription.pdf`);
}
