"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CommunityQuestion, CommunityAnswer } from "@/data/mockCommunity";
import { useLanguageStore } from "@/lib/store/languageStore";
import { useUserStore } from "@/lib/store/userStore";
import { useCommunityStore } from "@/lib/store/communityStore";
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
  Edit2,
  Trash2,
  Check,
  Save,
} from "lucide-react";

interface QuestionDetailModalProps {
  question: CommunityQuestion | null;
  onClose: () => void;
  onAddAnswer?: (questionId: string, answer: CommunityAnswer) => void;
  onDeleteQuestion?: (questionId: string) => void;
  onUpdateQuestion?: (questionId: string, updates: Partial<CommunityQuestion>) => void;
}

export function QuestionDetailModal({
  question,
  onClose,
  onAddAnswer,
  onDeleteQuestion,
  onUpdateQuestion,
}: QuestionDetailModalProps) {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const { currentUser, currentRole } = useUserStore();
  const {
    addAnswer,
    updateQuestion,
    deleteQuestion,
    acceptAnswer,
    deleteAnswer,
    upvoteAnswer,
  } = useCommunityStore();

  const [newAnswerText, setNewAnswerText] = useState("");
  const [newClinicalAction, setNewClinicalAction] = useState("");
  const [localAnswers, setLocalAnswers] = useState<CommunityAnswer[]>(
    question?.answers || []
  );

  // Edit question state
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [editTitle, setEditTitle] = useState(question?.title || "");
  const [editDesc, setEditDesc] = useState(question?.description || "");

  if (!question) return null;

  const isAuthor = currentUser.name === question.authorName || currentUser.id === (question as any).authorId;
  const isAdmin = currentRole === "admin";
  const canEditQuestion = isAuthor || isAdmin;
  const isExpert = currentRole === "expert_agronomist" || currentRole === "veterinarian";

  const handleToggleAnswerUpvote = (ansId: string) => {
    upvoteAnswer(question.id, ansId);
    setLocalAnswers((prev) =>
      prev.map((a) => (a.id === ansId ? { ...a, upvotes: a.upvotes + 1 } : a))
    );
  };

  const handleSaveQuestionEdit = () => {
    if (!editTitle.trim() || !editDesc.trim()) return;
    const updates = {
      title: editTitle.trim(),
      titleEn: editTitle.trim(),
      description: editDesc.trim(),
      descriptionEn: editDesc.trim(),
    };
    updateQuestion(question.id, updates);
    if (onUpdateQuestion) {
      onUpdateQuestion(question.id, updates);
    }
    setIsEditingQuestion(false);
  };

  const handleDeletePost = () => {
    if (confirm(isBn ? "আপনি কি নিশ্চিতভাবে এই পোস্টটি মুছে ফেলতে চান?" : "Are you sure you want to delete this community post?")) {
      deleteQuestion(question.id);
      if (onDeleteQuestion) {
        onDeleteQuestion(question.id);
      }
      onClose();
    }
  };

  const handleAcceptSolution = (ansId: string) => {
    acceptAnswer(question.id, ansId);
    setLocalAnswers((prev) =>
      prev.map((a) => ({
        ...a,
        isAccepted: a.id === ansId ? !a.isAccepted : a.isAccepted,
      }))
    );
  };

  const handleDeleteAnswer = (ansId: string) => {
    deleteAnswer(question.id, ansId);
    setLocalAnswers((prev) => prev.filter((a) => a.id !== ansId));
  };

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswerText.trim()) return;

    const registrationBadge =
      currentRole === "veterinarian"
        ? "BVC Reg #VET-2014-7714"
        : currentRole === "expert_agronomist"
        ? "DAE Reg #AGR-2015-8891"
        : undefined;

    const clinicalActionText = newClinicalAction.trim() || undefined;

    addAnswer(question.id, {
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorTitle: currentUser.roleLabel,
      authorAvatar: currentUser.avatar,
      isVerifiedExpert: isExpert,
      registrationBadge,
      content: newAnswerText.trim(),
      clinicalAction: clinicalActionText,
    });

    const newAnswer: CommunityAnswer = {
      id: `ans-${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorTitle: currentUser.roleLabel,
      authorAvatar: currentUser.avatar,
      isVerifiedExpert: isExpert,
      registrationBadge,
      createdAt: isBn ? "এইমাত্র" : "Just now",
      createdAtEn: "Just now",
      content: newAnswerText.trim(),
      contentEn: newAnswerText.trim(),
      clinicalAction: clinicalActionText,
      clinicalActionEn: clinicalActionText,
      upvotes: 0,
      isAccepted: false,
    };

    setLocalAnswers([newAnswer, ...localAnswers]);
    setNewAnswerText("");
    setNewClinicalAction("");
    if (onAddAnswer) {
      onAddAnswer(question.id, newAnswer);
    }
  };

  const primaryExpert = localAnswers.find((a) => a.isVerifiedExpert) || localAnswers[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#090f19] border border-white/[0.08] p-5 sm:p-8 shadow-2xl text-slate-100 space-y-6">
        {/* Close & Action Buttons */}
        <div className="absolute top-5 right-5 flex items-center gap-2">
          {canEditQuestion && !isEditingQuestion && (
            <button
              onClick={() => setIsEditingQuestion(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 bg-slate-900 border border-white/[0.08] transition flex items-center gap-1.5 text-xs font-semibold"
              title="Edit Post"
            >
              <Edit2 className="w-4 h-4" />
              <span className="hidden sm:inline">{isBn ? "এডিট" : "Edit Post"}</span>
            </button>
          )}

          {canEditQuestion && (
            <button
              onClick={handleDeletePost}
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 bg-slate-900 border border-white/[0.08] transition"
              title="Delete Post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-white/[0.08] transition"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Question Meta Bar */}
        <div className="space-y-3 pr-24">
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

          {/* Title - Edit Mode vs Display Mode */}
          {isEditingQuestion ? (
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-emerald-400 block">
                {isBn ? "পোস্ট শিরোনাম সম্পাদনা করুন:" : "Edit Post Title:"}
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-emerald-500/40 text-white font-bold text-sm focus:outline-none focus:border-emerald-400"
              />
              <label className="text-xs font-bold text-emerald-400 block">
                {isBn ? "বিস্তারিত বিবরণ সম্পাদনা করুন:" : "Edit Description:"}
              </label>
              <textarea
                rows={4}
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-emerald-500/40 text-white text-xs focus:outline-none focus:border-emerald-400"
              />
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => setIsEditingQuestion(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  {isBn ? "বাতিল" : "Cancel"}
                </button>
                <button
                  onClick={handleSaveQuestionEdit}
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isBn ? "সংরক্ষণ করুন" : "Save Changes"}</span>
                </button>
              </div>
            </div>
          ) : (
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {isBn ? question.title : question.titleEn}
            </h1>
          )}

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

        {/* 2. Question Description & Attached Images */}
        {!isEditingQuestion && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-white/[0.06] space-y-4">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {isBn ? question.description : question.descriptionEn}
            </p>

            {question.images && question.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {question.images.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="relative h-44 rounded-xl overflow-hidden border border-white/[0.08] group"
                  >
                    <img
                      src={imgUrl}
                      alt={`Specimen ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-emerald-300">
                      FOV #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Official Verified Expert Banner */}
        {primaryExpert && primaryExpert.isVerifiedExpert && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-teal-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={primaryExpert.authorAvatar}
                alt={primaryExpert.authorName}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-400/80 shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-white">{primaryExpert.authorName}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-300">{primaryExpert.authorTitle}</p>
                <span className="text-[10px] font-mono text-emerald-400">
                  {primaryExpert.registrationBadge || "Government Accredited Practitioner"}
                </span>
              </div>
            </div>

            <Link
              href="/consult"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition shadow-md shadow-emerald-500/20 shrink-0"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-slate-950" />
              <span>{isBn ? "ব্যক্তিগত পরামর্শ নিন (৳২০০) →" : "Book Private Consult (৳200) →"}</span>
            </Link>
          </div>
        )}

        {/* 4. Responses / Answers Stream */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>{isBn ? "বিশেষজ্ঞ ও সহচাষীদের উত্তর" : "Answers & Clinical Feedback"}</span>
              <span className="px-2 py-0.5 rounded-full bg-white/[0.08] text-xs font-mono text-slate-300">
                {localAnswers.length}
              </span>
            </h3>
            <span className="text-[11px] text-slate-400">
              {isBn ? "বিভিসি ও ডিএই কাউন্সিল মানদণ্ড অনুসরণীয়" : "BVC & DAE Clinical Standards"}
            </span>
          </div>

          <div className="space-y-4">
            {localAnswers.map((answer) => {
              const isAnsAuthor = currentUser.name === answer.authorName;
              return (
                <div
                  key={answer.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    answer.isAccepted
                      ? "bg-emerald-950/30 border-emerald-500/60 shadow-lg shadow-emerald-950/40"
                      : answer.isVerifiedExpert
                      ? "bg-slate-950/80 border-emerald-500/30"
                      : "bg-slate-950/50 border-white/[0.05]"
                  } space-y-3`}
                >
                  {/* Answer Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={answer.authorAvatar}
                        alt={answer.authorName}
                        className="w-9 h-9 rounded-xl object-cover border border-white/[0.1]"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-xs font-bold text-white">{answer.authorName}</strong>
                          {answer.isVerifiedExpert && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                              <ShieldCheck className="w-3 h-3" />
                              {answer.registrationBadge || "Certified Doctor"}
                            </span>
                          )}
                          {answer.isAccepted && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3" />
                              {isBn ? "যাচাইকৃত সমাধান" : "Accepted Solution"}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 block">{answer.authorTitle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 font-mono">
                        {isBn ? answer.createdAt : answer.createdAtEn}
                      </span>
                      {(isAuthor || isAdmin) && (
                        <button
                          onClick={() => handleAcceptSolution(answer.id)}
                          className={`p-1.5 rounded-lg border text-xs font-semibold transition ${
                            answer.isAccepted
                              ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                              : "bg-slate-900 text-slate-400 hover:text-white border-white/[0.08]"
                          }`}
                          title={isBn ? "যাচাইকৃত সমাধান হিসেবে চিহ্নিত করুন" : "Mark as Accepted Solution"}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {(isAnsAuthor || isAdmin) && (
                        <button
                          onClick={() => handleDeleteAnswer(answer.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition"
                          title="Delete Answer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Answer Content */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {isBn ? answer.content : answer.contentEn}
                  </p>

                  {/* Clinical Action Box */}
                  {answer.clinicalAction && (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/20 border border-emerald-500/25 space-y-1">
                      <strong className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
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
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition border bg-slate-900 text-slate-400 hover:text-white border-white/[0.06]"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isBn ? "সহায়ক উত্তর" : "Helpful"} ({answer.upvotes})</span>
                    </button>

                    {answer.isVerifiedExpert && (
                      <Link
                        href="/consult"
                        className="text-emerald-400 hover:text-emerald-300 font-bold transition flex items-center gap-1"
                      >
                        <span>{isBn ? "এই ডাক্তারের প্রেসক্রিপশন নিন (৳২০০) →" : "Consult this Specialist (৳200) →"}</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Post Your Answer Box (Role-Adaptive) */}
        <form onSubmit={handlePostAnswer} className="space-y-3 pt-3 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span>{isBn ? "আপনার মতামত বা সমাধান লিখুন:" : "Write an Answer / Clinical Note:"}</span>
              {isExpert && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  {isBn ? "বিশেষজ্ঞ মোড সক্রিয়" : "Specialist Mode Active"}
                </span>
              )}
            </h4>
            <span className="text-[11px] text-slate-400">
              {isBn ? "লগইন:" : "Posting as:"} <strong className="text-white">{currentUser.name}</strong> ({currentUser.roleLabel})
            </span>
          </div>

          <textarea
            rows={3}
            placeholder={
              isExpert
                ? (isBn ? "ডায়াগনোসিস, প্যাথোজেন ও প্রস্তাবিত ওষুধ/ডোজ উল্লেখ করুন..." : "Provide clinical diagnosis, active chemical, dosage, and withholding interval...")
                : (isBn ? "আপনার বাস্তবিক অভিজ্ঞতা বা কার্যকর পরামর্শ লিখুন..." : "Share your practical field experience or peer advice...")
            }
            value={newAnswerText}
            onChange={(e) => setNewAnswerText(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            required
          />

          {isExpert && (
            <div>
              <label className="text-[11px] font-bold text-emerald-400 block mb-1">
                {isBn ? "জরুরি চিকিৎসা / স্প্রে নির্দেশিকা (Clinical Protocol):" : "Official Prescription / Spray Instructions:"}
              </label>
              <input
                type="text"
                placeholder={isBn ? "যেমন: ট্রাইসাইক্লাজল ৭৫% ডব্লিউপি ০.৬ গ্রাম/লিটার হারে স্প্রে করুন..." : "e.g., Spray Tricyclazole 75% WP @ 0.6g/L water late afternoon..."}
                value={newClinicalAction}
                onChange={(e) => setNewClinicalAction(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-emerald-500/30 text-slate-200 text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 shadow-md ${
                isExpert
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/20"
                  : "bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isExpert
                  ? (isBn ? "অনুমোদিত মেডিকেল উত্তর প্রকাশ করুন" : "Submit Verified Medical Answer")
                  : (isBn ? "উত্তর প্রকাশ করুন" : "Submit Answer")}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
