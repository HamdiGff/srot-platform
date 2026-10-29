"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CommunityQuestion, CommunityAnswer } from "@/data/mockCommunity";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  X,
  ThumbsUp,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Stethoscope,
  Send,
  CalendarCheck,
  PhoneCall,
  Sparkles,
  AlertTriangle,
  Award,
} from "lucide-react";

interface QuestionDetailModalProps {
  question: CommunityQuestion | null;
  onClose: () => void;
  onAddAnswer?: (questionId: string, answer: CommunityAnswer) => void;
}

export function QuestionDetailModal({
  question,
  onClose,
  onAddAnswer,
}: QuestionDetailModalProps) {
  const { language } = useLanguageStore();
  const isBn = language === "bn";

  const [newAnswerText, setNewAnswerText] = useState("");
  const [localAnswers, setLocalAnswers] = useState<CommunityAnswer[]>(
    question?.answers || []
  );
  const [upvotedAnswers, setUpvotedAnswers] = useState<{ [id: string]: boolean }>({});

  if (!question) return null;

  const handleToggleAnswerUpvote = (ansId: string) => {
    setUpvotedAnswers((prev) => {
      const isCurrentlyUpvoted = !!prev[ansId];
      setLocalAnswers((answers) =>
        answers.map((a) =>
          a.id === ansId
            ? { ...a, upvotes: a.upvotes + (isCurrentlyUpvoted ? -1 : 1) }
            : a
        )
      );
      return { ...prev, [ansId]: !isCurrentlyUpvoted };
    });
  };

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswerText.trim()) return;

    const newAnswer: CommunityAnswer = {
      id: `ans-${Date.now()}`,
      authorId: "current-user",
      authorName: isBn ? "ডা. মো. আরিফুল হক, ডিভিএম" : "Dr. Ariful Haque, D.V.M.",
      authorTitle: isBn
        ? "ভেটেরিনারি সার্জন (অনুমোদিত প্র্যাকটিশনার)"
        : "Veterinary Surgeon & Consultant",
      authorAvatar:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
      isVerifiedExpert: true,
      registrationBadge: "BVC Reg #VET-9182",
      createdAt: isBn ? "এইমাত্র" : "Just now",
      createdAtEn: "Just now",
      content: newAnswerText,
      contentEn: newAnswerText,
      upvotes: 1,
      isAccepted: false,
      consultationFee: 200,
    };

    const updated = [newAnswer, ...localAnswers];
    setLocalAnswers(updated);
    setNewAnswerText("");
    if (onAddAnswer) {
      onAddAnswer(question.id, newAnswer);
    }
  };

  const primaryExpert = localAnswers.find((a) => a.isVerifiedExpert) || localAnswers[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090f19] border border-white/[0.08] p-5 sm:p-8 shadow-2xl text-slate-100 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08] transition"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Question Meta Bar */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {isBn ? question.cropOrAnimal : question.cropOrAnimalEn}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{isBn ? question.authorLocation : question.authorLocationEn}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{isBn ? question.createdAt : question.createdAtEn}</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {isBn ? question.title : question.titleEn}
          </h1>

          {/* Author snippet */}
          <div className="flex items-center gap-3 pt-1">
            <img
              src={question.authorAvatar}
              alt={question.authorName}
              className="w-8 h-8 rounded-full object-cover border border-emerald-500/40"
            />
            <div>
              <span className="text-xs font-bold text-slate-200 block">
                {question.authorName}
              </span>
              <span className="text-[10px] text-slate-400">
                {isBn ? "কৃষক ও খামারি সদস্য" : "Verified SROT Member"}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Detailed Question Description */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/[0.06] text-sm text-slate-200 leading-relaxed">
          {isBn ? question.description : question.descriptionEn}
        </div>

        {/* 3. Photo Gallery if images present */}
        {question.images && question.images.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {isBn ? "সংযুক্ত মাঠচিত্র ও আলামত:" : "Attached Field Photos:"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.images.map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden border border-white/[0.08] h-56 bg-black/40"
                >
                  <img
                    src={img}
                    alt="Problem attachment"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Conversion Bridge: Book 1-on-1 Consultation & Rx */}
        {primaryExpert && (
          <div className="rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#0b1717] to-teal-950/80 border border-emerald-500/30 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <strong className="text-sm font-bold text-white block">
                  {isBn
                    ? "আপনার খামারেও কি একই সমস্যা? সরাসরি ডাক্তারের পরামর্শ নিন"
                    : "Facing similar symptoms? Consult with a verified specialist"}
                </strong>
                <p className="text-xs text-slate-300">
                  {isBn
                    ? "ডিজিটাল প্রেসক্রিপশন ও ওষুধের সঠিক ডোজ পেতে এখনই ভিডিও চেম্বারে যুক্ত হন। ফি: মাত্র ৳১৫০"
                    : "Get an official QR-verified Rx & custom treatment schedule. Fee: ৳150"}
                </p>
              </div>
            </div>

            <Link
              href="/consult"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs hover:from-emerald-400 hover:to-teal-400 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-slate-950" />
              <span>{isBn ? "পরামর্শ বুক করুন (৳১৫০)" : "Book Consultation (৳150)"}</span>
            </Link>
          </div>
        )}

        {/* 5. Answers Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>{isBn ? "বিশেষজ্ঞ ও সম্প্রদায় প্রদত্ত উত্তর" : "Answers & Recommendations"}</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-400 font-mono">
                {localAnswers.length}
              </span>
            </h3>
          </div>

          <div className="space-y-4">
            {localAnswers.map((answer) => {
              const isUpvoted = !!upvotedAnswers[answer.id];
              return (
                <div
                  key={answer.id}
                  className={`rounded-2xl border p-5 space-y-3 transition ${
                    answer.isAccepted
                      ? "bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-950/20"
                      : "bg-slate-900/60 border-white/[0.06]"
                  }`}
                >
                  {/* Answer Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={answer.authorAvatar}
                        alt={answer.authorName}
                        className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {answer.authorName}
                          </span>
                          {answer.isVerifiedExpert && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              <span>{isBn ? "স্বীকৃত বিশেষজ্ঞ" : "Certified Specialist"}</span>
                            </span>
                          )}
                          {answer.isAccepted && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">
                              <Award className="w-3 h-3 text-cyan-400" />
                              <span>{isBn ? "গৃহীত সমাধান" : "Accepted Solution"}</span>
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400">{answer.authorTitle}</p>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono">
                      {answer.registrationBadge}
                    </span>
                  </div>

                  {/* Answer Body */}
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {isBn ? answer.content : answer.contentEn}
                  </p>

                  {/* Clinical Treatment / Spray Schedule Box if provided */}
                  {answer.clinicalAction && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-1 text-xs">
                      <strong className="text-emerald-300 flex items-center gap-1.5 font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isBn ? "প্রস্তাবিত ব্যবস্থাপনা ও স্প্রে প্রোটোকল:" : "Clinical Action Protocol:"}</span>
                      </strong>
                      <p className="text-slate-200 text-xs leading-relaxed">
                        {isBn ? answer.clinicalAction : answer.clinicalActionEn}
                      </p>
                    </div>
                  )}

                  {/* Answer Actions */}
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-white/[0.05]">
                    <button
                      onClick={() => handleToggleAnswerUpvote(answer.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition border ${
                        isUpvoted
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : "bg-slate-900 text-slate-400 hover:text-white border-white/[0.06]"
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? "text-emerald-400" : ""}`} />
                      <span>{isBn ? "সহায়ক উত্তর" : "Helpful"} ({answer.upvotes})</span>
                    </button>

                    {answer.isVerifiedExpert && answer.consultationFee && (
                      <Link
                        href="/consult"
                        className="text-emerald-400 hover:text-emerald-300 font-bold transition flex items-center gap-1"
                      >
                        <span>{isBn ? "এই ডাক্তারের প্রেসক্রিপশন নিন (৳১৫০) →" : "Get Rx from this Doctor (৳150) →"}</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Post Your Answer Box */}
        <form onSubmit={handlePostAnswer} className="space-y-3 pt-3 border-t border-white/[0.08]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {isBn ? "আপনার মতামত বা সমাধান লিখুন:" : "Write an Answer / Clinical Note:"}
          </h4>
          <textarea
            rows={3}
            placeholder={
              isBn
                ? "রোগের সঠিক নাম, প্রস্তাবিত উপাদান বা প্রতিকার উল্লেখ করে বিস্তারিত লিখুন..."
                : "Provide diagnosis rationale, chemical actives, and cultural management..."
            }
            value={newAnswerText}
            onChange={(e) => setNewAnswerText(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-emerald-500/30 transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isBn ? "উত্তর প্রকাশ করুন" : "Submit Answer"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
