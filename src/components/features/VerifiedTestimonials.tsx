import React from "react";
import { Star, ShieldCheck, Wheat, Milk, HeartHandshake, Quote } from "lucide-react";

export function VerifiedTestimonials() {
  const testimonials = [
    {
      name: "Tariqul Islam",
      role: "Commercial Rice Producer (5.2 Acres)",
      category: "agri",
      sectorLabel: "Grain Farming",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      headline: "Saved 5 acres of tillering paddy from devastating neck blast.",
      text: "Within 20 minutes of submitting photos of my spindle lesions, Dr. Ramesh diagnosed foliar blast and calculated the exact Tricyclazole dosage with silica amendment. Yield loss was completely prevented.",
      metric: "Saved ~$3,800 in Potential Crop Loss",
    },
    {
      name: "Marcus Holloway",
      role: "Dairy Herd Manager (28 Holstein Cows)",
      category: "veterinary",
      sectorLabel: "Dairy & Livestock",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      headline: "Brought bulk tank somatic cell count from 420k down to 180k.",
      text: "Dr. Ananya guided us over video through California Mastitis Tests right in our parlor. Her intramammary prescription with clear 72-hour milk withholding prevented a whole-herd antibiotic contamination penalty.",
      metric: "Daily Milk Yield +2.4 L per Cow",
    },
    {
      name: "Jessica Miller",
      role: "Golden Retriever Parent ('Max')",
      category: "pet",
      sectorLabel: "Companion Pet Care",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      headline: "Late night emergency triage without an agonizing ER wait.",
      text: "Max broke into severe paw licking and groin hives on a Sunday night. Dr. Elena got on HD video in 8 minutes, confirmed atopic allergy flare, and sent a weight-titrated prescription straight to my phone.",
      metric: "Treated in 8 Mins from Home",
    },
  ];

  return (
    <div className="srot-glass-card rounded-3xl p-6 sm:p-10 border border-white/[0.08] shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Client Outcomes
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
          Stories from Fields, Barns & Living Rooms
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Read verified feedback from producers and pet parents who rely on SROT.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              {/* Sector Tag & Rating */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {t.sectorLabel}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <h4 className="font-bold text-white text-sm mb-2 leading-snug">
                &ldquo;{t.headline}&rdquo;
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.text}
              </p>
            </div>

            {/* Author info & Metric Pill */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">{t.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-slate-400 block">{t.role}</span>
                </div>
              </div>

              <div className="mt-3 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-center text-[11px] font-semibold text-emerald-300">
                {t.metric}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
