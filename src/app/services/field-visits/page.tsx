"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store/languageStore";
import { FIELD_SERVICES_CATALOG, FieldService } from "@/data/mockFieldServices";
import { formatCurrency } from "@/lib/utils";
import {
  MapPin,
  Clock,
  ShieldCheck,
  PhoneCall,
  CalendarCheck,
  CheckCircle2,
  Check,
  X,
  ArrowRight,
  Sparkles,
  Milk,
  Wheat,
  Egg,
  Fish,
  Activity,
  AlertTriangle,
  CreditCard,
  Building,
  UserCheck,
  ChevronRight,
  HelpCircle,
  Truck,
} from "lucide-react";

type ServiceCategoryFilter = "all" | "veterinary" | "artificial_insemination" | "soil_testing" | "fisheries" | "poultry";

export default function FieldVisitsPage() {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [activeCategory, setActiveCategory] = useState<ServiceCategoryFilter>("all");
  const [selectedService, setSelectedService] = useState<FieldService | null>(null);

  // Booking Modal State
  const [bookingStep, setBookingStep] = useState<"address" | "schedule" | "payment" | "confirmed">("address");
  const [farmName, setFarmName] = useState("");
  const [district, setDistrict] = useState("Bogura");
  const [upazila, setUpazila] = useState("Sherpur");
  const [villageAddress, setVillageAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("01712-889900");
  const [preferredSlot, setPreferredSlot] = useState("Urgent Priority Dispatch (Under 2-4 hrs)");
  const [animalCountOrAcreage, setAnimalCountOrAcreage] = useState("2 Cows");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "cash_on_visit">("bkash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRefId, setBookingRefId] = useState("");

  const filteredServices =
    activeCategory === "all"
      ? FIELD_SERVICES_CATALOG
      : FIELD_SERVICES_CATALOG.filter((s) => s.category === activeCategory);

  const handleOpenBooking = (service: FieldService) => {
    setSelectedService(service);
    setBookingStep("address");
    setFarmName("");
    setVillageAddress("");
  };

  const handleNextToSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep("schedule");
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStep("payment");
  };

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `SROT-FIELD-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRefId(generatedId);
      setBookingStep("confirmed");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#05080d] text-slate-100 srot-ambient-glow pb-24 selection:bg-emerald-500 selection:text-black">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-bold tracking-wider uppercase">
            <Truck className="w-3.5 h-3.5" />
            <span>{isBn ? "মাঠ সেবা ও অন-সাইট ভিজিট (Step 6)" : "Field Services & Doorstep Visits (Step 6)"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl mx-auto leading-tight">
            {isBn ? (
              <>
                বিশেষজ্ঞ পশু চিকিৎসক ও কৃষিবিদ{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">
                  সরাসরি আপনার খামারে
                </span>
              </>
            ) : (
              <>
                Veterinarians & Agronomists{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">
                  Directly at Your Farm
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? "জরুরি গাভী প্রসব জটিলতা, উন্নত জাতের কৃত্রিম প্রজনন (AI), মাটির কোর নিউট্রিয়েন্ট টেস্ট কিংবা পুকুরের পানি বিশ্লেষণ—সার্টিফাইড বিশেষজ্ঞ দল সরাসরি আপনার খামারে উপস্থিত হবে।"
              : "When tele-advisory isn't enough. Book emergency veterinary doorstep visits, Artificial Insemination (AI), laboratory soil testing, and pond biosecurity audits across Bangladesh."}
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-300">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "জরুরি সাড়া: ২-৪ ঘণ্টার ভেতর" : "Emergency Arrival: 2-4 Hours"}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{isBn ? "বাংলাদেশ ভেটেরিনারি কাউন্সিল অনুমোদিত" : "BVC & DAE Council Certified"}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-300">
              <CreditCard className="w-4 h-4 text-purple-400" />
              <span>{isBn ? "বিকাশ অথবা খামারে ক্যাশ পেমেন্ট" : "bKash, Nagad or Pay on Doorstep"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY FILTER TABS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {[
            { id: "all", labelEn: "All Field Services", labelBn: "সকল মাঠ সেবা", icon: Sparkles },
            { id: "veterinary", labelEn: "Emergency Vet Visit", labelBn: "জরুরি পশু চিকিৎসা", icon: Milk },
            { id: "artificial_insemination", labelEn: "Artificial Insemination (AI)", labelBn: "কৃত্রিম প্রজনন (AI)", icon: Activity },
            { id: "soil_testing", labelEn: "Soil Lab Testing", labelBn: "মাটি পরীক্ষা ও সার", icon: Wheat },
            { id: "fisheries", labelEn: "Fisheries Pond Audit", labelBn: "পুকুর ও মাছের অডিট", icon: Fish },
            { id: "poultry", labelEn: "Poultry Necropsy Audit", labelBn: "পোল্ট্রি পোস্টমর্টেম", icon: Egg },
          ].map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ServiceCategoryFilter)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition ${
                  isSelected
                    ? "bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-md shadow-purple-950/40"
                    : "bg-slate-900/60 border-white/[0.06] text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-purple-400" : "text-slate-400"}`} />
                <span>{isBn ? cat.labelBn : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FIELD SERVICES CATALOG GRID */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const totalFee = service.baseFee + service.travelFee;

            return (
              <div
                key={service.id}
                className="rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0a101b] border border-white/[0.08] hover:border-purple-500/40 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl space-y-6"
              >
                <div className="space-y-4">
                  {/* Badge & Arrival Notice */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {isBn ? service.badge.bn : service.badge.en}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{isBn ? service.expectedArrival.bn : service.expectedArrival.en}</span>
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg font-black text-white leading-snug">
                      {isBn ? service.name.bn : service.name.en}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {isBn ? service.tagline.bn : service.tagline.en}
                    </p>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">
                        {isBn ? "মোট সার্ভিস চার্জ" : "Total On-Site Fee"}
                      </span>
                      <span className="text-2xl font-black text-white font-mono">
                        ৳{totalFee.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-right text-[11px] text-slate-400">
                      <div>{isBn ? `সার্ভিস: ৳${service.baseFee}` : `Service: ৳${service.baseFee}`}</div>
                      <div className="text-purple-400">{isBn ? `যাতায়াত: ৳${service.travelFee}` : `Travel: ৳${service.travelFee}`}</div>
                    </div>
                  </div>

                  {/* Included Equipment Kit */}
                  <div className="space-y-2 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      {isBn ? "অন্তর্ভুক্ত যন্ত্রপাতি ও সাপোর্ট:" : "Equipment & Diagnostics Carried:"}
                    </span>
                    {service.equipmentIncluded.map((eq, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[11px]">{isBn ? eq.bn : eq.en}</span>
                      </div>
                    ))}
                  </div>

                  {/* Coverage Area */}
                  <div className="p-2.5 rounded-xl bg-slate-950/50 border border-white/[0.04] text-[11px] text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{isBn ? service.coverageArea.bn : service.coverageArea.en}</span>
                  </div>
                </div>

                {/* Booking Trigger Button */}
                <button
                  onClick={() => handleOpenBooking(service)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-purple-950/50"
                >
                  <span>{isBn ? "খামার ভিজিট বুক করুন" : "Book On-Site Farm Visit"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FAQ ACCORDION FOR FIELD SERVICES */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/[0.06]">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <span>{isBn ? "মাঠ সেবা সংক্রান্ত সাধারণ প্রশ্নোত্তর" : "Frequently Asked Questions About Field Visits"}</span>
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          {[
            {
              qBn: "জরুরি গাভী অসুস্থতায় চিকিৎসক কত দ্রুত পৌঁছাবেন?",
              qEn: "How quickly does the emergency veterinary officer arrive?",
              aBn: "জরুরি অগ্রাধিকার ভিত্তিতে বুকিং সম্পন্ন হলে আমাদের নিকটস্থ উপজেলা ভেটেরিনারি সার্জন ২ থেকে ৪ ঘণ্টার মধ্যে খামারে উপস্থিত হন।",
              aEn: "Upon dispatch confirmation, our on-call Veterinary Surgeon arrives at your doorstep within 2 to 4 hours.",
            },
            {
              qBn: "কৃত্রিম প্রজননের (AI) সিমেন কি সরকারি ও প্রত্যয়িত?",
              qEn: "Are Artificial Insemination semen straws officially certified?",
              aBn: "হ্যাঁ, প্রতিটি সিমেন স্ট্র সরকার অনুমোদিত ব্রিড রেজিস্ট্রি নম্বরযুক্ত (১০০% শাহিওয়াল বা ৭৫% হলস্টাইন ফ্রিজিয়ান) এবং লিকুইড নাইট্রোজেনে সুরক্ষিত রাখা হয়।",
              aEn: "Yes, every straw carries an official DLS bull ID tag (100% Sahiwal, 75% Friesian) cryo-stored at -196°C.",
            },
            {
              qBn: "মাটি পরীক্ষার ফলাফল পেতে কতদিন সময় লাগে?",
              qEn: "How long does it take to receive soil nutrient testing lab results?",
              aBn: "কৃষিবিদ ৪৮ ঘণ্টার মধ্যে জমি থেকে নমুনা সংগ্রহ করেন এবং পরবর্তী ৫ কর্মদিবসের মধ্যে পূর্ণাঙ্গ এনপিকে সার প্রেসক্রিপশন অ্যাপে জমা দেন।",
              aEn: "Soil core samples are collected in 48 hours, and certified lab nutrient prescriptions are issued within 5 days.",
            },
            {
              qBn: "আমি কি ভিজিটের পর সরাসরি নগদ টাকা পরিশোধ করতে পারি?",
              qEn: "Can I pay in cash after the officer completes the visit?",
              aBn: "হ্যাঁ, আপনি চাইলে বিকাশ, নগদ বা রকেটের মাধ্যমে অগ্রিম পরিশোধ করতে পারেন অথবা খামারে সেবা পাওয়ার পর সরাসরি ক্যাশ দিতে পারেন।",
              aEn: "Yes. You can pay online via bKash/Nagad or choose 'Pay on Doorstep' in cash once the service is complete.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group rounded-2xl bg-slate-900/60 border border-white/[0.06] p-4 transition open:bg-slate-900/90"
            >
              <summary className="font-bold text-white cursor-pointer list-none flex items-center justify-between">
                <span>{isBn ? faq.qBn : faq.qEn}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <p className="mt-2.5 text-slate-300 leading-relaxed pt-2 border-t border-white/[0.04]">
                {isBn ? faq.aBn : faq.aEn}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE 4-STEP BOOKING MODAL */}
      {/* ========================================================================= */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#090f19] border border-purple-500/40 p-6 sm:p-8 text-slate-200 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
              <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {isBn ? selectedService.name.bn : selectedService.name.en}
                </h3>
                <p className="text-xs text-slate-400">
                  {isBn ? "অন-সাইট খামার সেবা বুকিং" : "Doorstep Farm Booking Service"} • ৳
                  {(selectedService.baseFee + selectedService.travelFee).toLocaleString()}
                </p>
              </div>
            </div>

            {/* STEP 1: Address & Location */}
            {bookingStep === "address" && (
              <form onSubmit={handleNextToSchedule} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? "খামারের নাম বা আবেদনকারী" : "Farm / Owner Name"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBn ? "যেমন: রূপালী ডেইরি ফার্ম / হাজী আব্দুল করিম" : "e.g. Rupali Agro Farm"}
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      {isBn ? "জেলা" : "District"}
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-purple-500"
                    >
                      <option>Bogura</option>
                      <option>Sirajganj</option>
                      <option>Pabna</option>
                      <option>Gazipur</option>
                      <option>Mymensingh</option>
                      <option>Rajshahi</option>
                      <option>Dhaka</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      {isBn ? "উপজেলা" : "Upazila"}
                    </label>
                    <input
                      type="text"
                      required
                      value={upazila}
                      onChange={(e) => setUpazila(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? "গ্রাম / পাড়া ও খামারের বিস্তারিত ঠিকানা" : "Village / Road & Farm Landmark"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isBn ? "যেমন: শেরপুর ডেইরি মোড়, বটতলার পূর্ব পাশে" : "e.g. East of Dairy Cooperative, Sherpur"}
                    value={villageAddress}
                    onChange={(e) => setVillageAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? "যোগাযোগের মোবাইল নম্বর" : "Mobile Phone Number"}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-emerald-400 font-mono font-bold focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 mt-2"
                >
                  <span>{isBn ? "শিডিউল ও সময় নির্ধারণ করুন" : "Proceed to Schedule Slot"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: Slot & Animal/Plot info */}
            {bookingStep === "schedule" && (
              <form onSubmit={handleNextToPayment} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? "পছন্দনীয় সেবা সময়" : "Preferred Arrival Slot"}
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: "urgent", label: isBn ? "জরুরি অগ্রাধিকার ডিসপ্যাচ (২-৪ ঘণ্টার মধ্যে)" : "Urgent Priority Dispatch (Under 2-4 hrs)" },
                      { id: "morning", label: isBn ? "আগামীকাল সকাল (৯টা - ১২টা)" : "Tomorrow Morning (9:00 AM - 12:00 PM)" },
                      { id: "afternoon", label: isBn ? "আগামীকাল বিকেল (২টা - ৫টা)" : "Tomorrow Afternoon (2:00 PM - 5:00 PM)" },
                    ].map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setPreferredSlot(slot.label)}
                        className={`w-full p-3 rounded-xl border text-left font-bold transition flex items-center justify-between ${
                          preferredSlot === slot.label
                            ? "bg-purple-500/15 border-purple-500/40 text-purple-300"
                            : "bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white"
                        }`}
                      >
                        <span>{slot.label}</span>
                        {preferredSlot === slot.label && <Check className="w-4 h-4 text-purple-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    {isBn ? "পশুর সংখ্যা অথবা জমির আয়তন" : "Animal Count or Land Acreage"}
                  </label>
                  <input
                    type="text"
                    required
                    value={animalCountOrAcreage}
                    onChange={(e) => setAnimalCountOrAcreage(e.target.value)}
                    placeholder="e.g. 2 Cows / 3 Bigha Plot / 500 Broilers"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.1] text-white focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingStep("address")}
                    className="w-1/3 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                  >
                    {isBn ? "পেছনে" : "Back"}
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black transition flex items-center justify-center gap-2"
                  >
                    <span>{isBn ? "পেমেন্ট ধাপে যান" : "Go to Payment"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Payment Selection */}
            {bookingStep === "payment" && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-2">
                    {isBn ? "পেমেন্ট পদ্ধতি নির্বাচন করুন" : "Select Payment Mode"}
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: "bkash", label: "বিকাশ (bKash)", badge: "Instant" },
                      { id: "nagad", label: "নগদ (Nagad)", badge: "Instant" },
                      { id: "cash_on_visit", label: "ক্যাশ অন ভিজিট", badge: "On Doorstep" },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-3 rounded-2xl border text-center transition ${
                          paymentMethod === pm.id
                            ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                            : "bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white"
                        }`}
                      >
                        <strong className="block text-xs text-white">{pm.label}</strong>
                        <span className="text-[10px] text-emerald-400 block mt-0.5">{pm.badge}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>{isBn ? "ভিজিট ও কনসালটেশন চার্জ:" : "Visit & Clinical Fee:"}</span>
                    <span className="font-bold text-white">৳{selectedService.baseFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{isBn ? "যাতায়াত ও কিট খরচ:" : "Travel & Kit Allowance:"}</span>
                    <span className="font-bold text-purple-400">৳{selectedService.travelFee.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-white/[0.06] flex justify-between font-black text-sm text-white">
                    <span>{isBn ? "সর্বমোট প্রদেয়:" : "Total Payable:"}</span>
                    <span className="text-emerald-400 font-mono">
                      ৳{(selectedService.baseFee + selectedService.travelFee).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingStep("schedule")}
                    className="w-1/3 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                  >
                    {isBn ? "পেছনে" : "Back"}
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    disabled={isSubmitting}
                    className="w-2/3 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition disabled:opacity-50"
                  >
                    {isSubmitting
                      ? isBn
                        ? "নিবন্ধন হচ্ছে..."
                        : "Dispatching Officer..."
                      : isBn
                      ? "ভিজিট নিশ্চিত করুন"
                      : "Confirm & Book Visit"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Confirmed State */}
            {bookingStep === "confirmed" && (
              <div className="space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div>
                  <h4 className="text-xl font-black text-white">
                    {isBn ? "খামার পরিদর্শন সফলভাবে নিশ্চিত হয়েছে!" : "Field Visit Dispatched & Confirmed!"}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {isBn
                      ? `${farmName || "আপনার খামার"} এ বিশেষজ্ঞ কর্মকর্তা নির্ধারিত সময়ে উপস্থিত হবেন।`
                      : `A certified field officer has been assigned to your farm.`}
                  </p>
                </div>

                {/* Dispatch Details Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0c1626] border border-purple-500/30 text-left space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono text-slate-400">
                    <span>DISPATCH VOUCHER</span>
                    <span className="text-emerald-400 font-bold">CONFIRMED</span>
                  </div>
                  <div className="text-base font-black text-white">{selectedService.name.en}</div>
                  <div className="text-slate-300">
                    {district}, {upazila} • {preferredSlot}
                  </div>
                  <div className="pt-2 border-t border-white/[0.06] flex justify-between items-center text-[11px]">
                    <span className="text-slate-400 font-mono">{bookingRefId}</span>
                    <span className="text-purple-300 font-bold">
                      {isBn ? "অ্যাসাইন্ড অফিসার: ডা. কামরুল হাসান (BVC 4810)" : "Officer: Dr. Kamrul Hasan (BVC 4810)"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link
                    href="/farmer-portal"
                    onClick={() => setSelectedService(null)}
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs transition flex items-center justify-center gap-2"
                  >
                    <span>{isBn ? "ফার্মার ড্যাশবোর্ডে ট্র্যাক করুন" : "Track in Farmer Dashboard"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
