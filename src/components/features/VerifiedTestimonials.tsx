"use client";

import React from "react";
import { useLanguageStore } from "@/lib/store/languageStore";
import { Star, ShieldCheck, Wheat, Milk, HeartHandshake, Quote } from "lucide-react";

export function VerifiedTestimonials() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const testimonials = [
    {
      name: isBn ? "তরিকুল ইসলাম" : "Tariqul Islam",
      role: isBn ? "বাণিজ্যিক বোরো ধান চাষি (৫.২ একর • ময়মনসিংহ)" : "Commercial Rice Producer (5.2 Acres • Mymensingh)",
      category: "agri",
      sectorLabel: isBn ? "ধান ও শস্য চাষ" : "Grain Farming BD",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      headline: isBn
        ? "বিঘা প্রতি ধানের ব্লাস্ট রোগ থেকে ৫ একর ফসল সম্পূর্ণ রক্ষা পেয়েছি।"
        : "Saved 5.2 acres of tillering paddy from devastating neck blast.",
      text: isBn
        ? "ধানের পাতায় মাকু আকৃতির চোখা দাগ দেখে ছবি তুলে পাঠিয়েছিলাম। ১৫ মিনিটের মধ্যে কৃষিবিদ ড. তরিকুল সঠিক ছত্রাকনাশকের মাত্রা ও জমিতে পানি রাখার নিয়ম পাঠান। ব্লাস্টের ক্ষতি থেকে শতভাগ ফসল বেঁচে গেছে।"
        : "Within 20 minutes of submitting photos of my spindle lesions, Dr. Tariqul diagnosed foliar blast and calculated the exact Tricyclazole dosage with water management. Yield loss was completely prevented.",
      metric: isBn ? "সম্ভাব্য ৩,৫০,০০০ টাকার ফসলের ক্ষতি রোধ" : "Saved ~৳3,50,000 in Crop Loss",
    },
    {
      name: isBn ? "আখতারুজ্জামান" : "Akhtaruzzaman",
      role: isBn ? "ডেইরি খামারি (২৮টি ফ্রিজিয়ান ক্রস গাভী • সিরাজগঞ্জ)" : "Dairy Herd Manager (28 Crossbred Cows • Sirajganj)",
      category: "veterinary",
      sectorLabel: isBn ? "ডেইরি ও দুগ্ধ খামার" : "Dairy & Livestock BD",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      headline: isBn
        ? "ভিডিও কলে ওলান পরীক্ষা ও ৭২ ঘণ্টার সঠিক উইথহোল্ডিং মেনে চিকিৎসা।"
        : "Guided us through California Mastitis Tests right in our parlor.",
      text: isBn
        ? "গাভীর ওলান ফুলে দুধ ছানা হয়ে যাচ্ছিল। ভেটেরিনারি সার্জন ডা. অনন্যা সেন ভিডিওতে ওলানের অবস্থা পর্যবেক্ষণ করে অ্যান্টিবায়োটিক ইনফিউশনের সঠিক প্রেসক্রিপশন দেন। গাভী সুস্থ হয়ে দুধ উৎপাদন স্বাভাবিক হয়েছে।"
        : "Dr. Ananya guided us over video through California Mastitis Tests right in our parlor. Her intramammary prescription with clear 72-hour milk withholding prevented a whole-herd contamination penalty.",
      metric: isBn ? "দৈনিক দুধ উৎপাদন গাভী প্রতি +২.৪ লিটার বৃদ্ধি" : "Daily Milk Yield +2.4 L per Cow",
    },
    {
      name: isBn ? "নাবিলা ফারহিন" : "Nabila Farhin",
      role: isBn ? "গোল্ডেন রিট্রিভার পোষ্য অভিভাবক (ধানমন্ডি, ঢাকা)" : "Golden Retriever Parent ('Max' • Dhanmondi, Dhaka)",
      category: "pet",
      sectorLabel: isBn ? "পোষা প্রাণী স্বাস্থ্যসেবা" : "Companion Pet Care BD",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      headline: isBn
        ? "রবিবার রাতে তীব্র অ্যালার্জি চুলকানিতে ৮ মিনিটে জরুরি ভিডিও কনসালটেশন।"
        : "Late night emergency triage without an agonizing ER wait in Dhaka.",
      text: isBn
        ? "রাতে আমার কুকুরের সারা শরীরে লালচে চুলকানি ও অস্থিরতা শুরু হয়। ডা. ফারহানা হক মাত্র ৮ মিনিটের মধ্যে লাইভ কলে এসে অ্যালার্জি নিশ্চিত করেন এবং সঠিক মাত্রার ওষুধের প্রেসক্রিপশন ফোনে পাঠান।"
        : "Max broke into severe paw licking and groin hives on a Sunday night. Dr. Farhana got on HD video in 8 minutes, confirmed atopic allergy flare, and sent a weight-titrated prescription straight to my phone.",
      metric: isBn ? "ঘরে বসেই ৮ মিনিটে চিকিৎসা সম্পন্ন" : "Treated in 8 Mins from Home",
    },
  ];

  return (
    <div className="srot-glass-card hover-glow-amber rounded-3xl p-6 sm:p-10 border border-white/[0.08] shadow-2xl relative overflow-hidden group">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          {isBn ? "প্রকৃত গ্রাহক মূল্যায়ন ও ফলাফল" : "Verified Client Outcomes"}
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
          {isBn ? "বাংলাদেশের মাঠ, খামার ও গৃহকোণের বাস্তব অভিজ্ঞতা" : "Stories from Bangladesh Fields, Barns & Homes"}
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          {isBn
            ? "জানুন কীভাবে দেশের কৃষক ও খামারিরা এসআরওটি প্ল্যাটফর্ম ব্যবহার করে ক্ষতির হাত থেকে রক্ষা পাচ্ছেন।"
            : "Read verified feedback from producers and pet parents across Bangladesh who rely on SROT."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10"
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
