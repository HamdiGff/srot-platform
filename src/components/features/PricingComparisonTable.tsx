import React from "react";
import { Check, X, ShieldCheck, Zap } from "lucide-react";

export function PricingComparisonTable() {
  const comparisonRows = [
    {
      feature: "Response & Diagnosis Turnaround",
      traditional: "2 to 5 Days (waiting for field agents or travelling to town)",
      srot: "Under 20 Minutes (Instant visual triage & video visit)",
      srotHighlight: true,
    },
    {
      feature: "Practitioner Credentials",
      traditional: "Local chemical sales agent / Uncertified shopkeeper",
      srot: "Ph.D. Plant Pathologists & Council-Registered Veterinarians",
      srotHighlight: true,
    },
    {
      feature: "Biosecurity & Infection Control",
      traditional: "High Risk (transporting sick animals spreads viral pathogens)",
      srot: "Zero Transmission Risk (Remote HD video examination)",
      srotHighlight: true,
    },
    {
      feature: "Prescription Integrity & Legality",
      traditional: "Verbal recommendation or handwritten note",
      srot: "Cryptographically Signed A4 PDF with strict withholding dates",
      srotHighlight: true,
    },
    {
      feature: "Scope of Care",
      traditional: "Fragmented (must find separate dealers and animal doctors)",
      srot: "Unified Platform (Crops, Livestock, Dairy & Companion Pets)",
      srotHighlight: true,
    },
    {
      feature: "Cost Transparency",
      traditional: "Unpredictable markups + expensive travel and lost farm days",
      srot: "Flat Transparent Fee from $15 with 100% Satisfaction Guarantee",
      srotHighlight: true,
    },
  ];

  return (
    <div className="srot-glass-card rounded-3xl p-6 sm:p-10 border border-white/[0.08] shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          The SROT Advantage
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Why Producers & Pet Owners Choose SROT
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Comparing traditional fragmented veterinary and agricultural advice with SROT Tele-Health.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="py-4 px-4 font-bold text-slate-400 uppercase text-[11px] w-1/3">
                Key Comparison Metric
              </th>
              <th className="py-4 px-4 font-bold text-slate-400 uppercase text-[11px] w-1/3">
                Traditional Agricultural / Vet Visit
              </th>
              <th className="py-4 px-4 font-bold text-emerald-400 uppercase text-[11px] w-1/3 bg-emerald-950/20 rounded-t-xl border-t border-x border-emerald-500/30">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" /> SROT Digital Platform
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {comparisonRows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-900/40 transition">
                <td className="py-4 px-4 font-semibold text-white">
                  {row.feature}
                </td>
                <td className="py-4 px-4 text-slate-400">
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{row.traditional}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-slate-200 bg-emerald-950/15 border-x border-emerald-500/20">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-medium text-emerald-200">{row.srot}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
