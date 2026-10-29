"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CommunityQuestion } from "@/data/mockCommunity";
import { useLanguageStore } from "@/lib/store/languageStore";
import {
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Wheat,
  Milk,
  HeartHandshake,
  Fish,
  Egg,
} from "lucide-react";

interface QuestionCardProps {
  question: CommunityQuestion;
  onOpenDetails: (q: CommunityQuestion) => void;
}

export function QuestionCard({ question, onOpenDetails }: QuestionCardProps) {
  const { language } = useLanguageStore();
  const isBn = language === "bn";
  const [upvotes, setUpvotes] = useState(question.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasUpvoted) {
      setUpvotes((v) => v - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes((v) => v + 1);
      setHasUpvoted(true);
    }
  };

  const sectorMeta = {
    crops: {
      label: isBn ? "মাঠফসল ও কৃষি" : "Agronomy & Crops",
      icon: <Wheat className="w-3.5 h-3.5 text-emerald-400" />,
      color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    },
    dairy: {
      label: isBn ? "ডেইরি ও গবাদিপশু" : "Dairy & Cattle",
      icon: <Milk className="w-3.5 h-3.5 text-cyan-400" />,
      color: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    },
    poultry: {
      label: isBn ? "পোল্ট্রি ও মুরগি" : "Poultry Farming",
      icon: <Egg className="w-3.5 h-3.5 text-amber-400" />,
      color: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    },
    fisheries: {
      label: isBn ? "মৎস্য ও পুকুর" : "Fisheries & Pond",
      icon: <Fish className="w-3.5 h-3.5 text-blue-400" />,
      color: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    },
    pets: {
      label: isBn ? "পোষা প্রাণী" : "Companion Pets",
      icon: <HeartHandshake className="w-3.5 h-3.5 text-pink-400" />,
      color: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    },
  };

  const activeSector = sectorMeta[question.sector];
  const acceptedAnswer = question.answers.find((a) => a.isAccepted) || question.answers[0];

  return (
    <article
      onClick={() => onOpenDetails(question)}
      className="group relative rounded-2xl bg-[#090f19]/80 border border-white/[0.07] hover:border-emerald-500/40 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-950/20 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Sector pill, crop name, time, solved badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${activeSector.color}`}
            >
              {activeSector.icon}
              <span>{activeSector.label}</span>
            </span>

            <span className="text-[11px] font-medium text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md border border-white/[0.05]">
              {isBn ? question.cropOrAnimal : question.cropOrAnimalEn}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {question.isSolved && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>{isBn ? "সমাধানকৃত" : "Solved"}</span>
              </span>
            )}
            <span className="text-slate-400 text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{isBn ? question.createdAt : question.createdAtEn}</span>
            </span>
          </div>
        </div>

        {/* Question Title */}
        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 mb-2 leading-snug">
          {isBn ? question.title : question.titleEn}
        </h3>

        {/* Description snippet */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {isBn ? question.description : question.descriptionEn}
        </p>

        {/* Attached image preview thumbnails if available */}
        {question.images && question.images.length > 0 && (
          <div className="flex items-center gap-2 mb-4 overflow-hidden rounded-xl">
            {question.images.map((img, idx) => (
              <div
                key={idx}
                className="relative h-18 w-24 rounded-lg overflow-hidden border border-white/[0.08] shrink-0"
              >
                <img
                  src={img}
                  alt="Crop/Animal Condition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
            {question.images.length > 2 && (
              <span className="text-[11px] text-slate-400 font-mono">
                +{question.images.length - 2} photos
              </span>
            )}
          </div>
        )}

        {/* Verified Expert Answer Callout Banner (If answered) */}
        {acceptedAnswer && acceptedAnswer.isVerifiedExpert && (
          <div className="mb-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/25 p-3 text-xs">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <img
                  src={acceptedAnswer.authorAvatar}
                  alt={acceptedAnswer.authorName}
                  className="w-5 h-5 rounded-full object-cover border border-emerald-400/50"
                />
                <span className="font-bold text-emerald-300 text-[11px] truncate">
                  {acceptedAnswer.authorName}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {isBn ? "স্বীকৃত বিশেষজ্ঞ" : "Verified"}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {acceptedAnswer.registrationBadge}
              </span>
            </div>

            <p className="text-[11px] text-slate-300 line-clamp-2 italic">
              &quot;{isBn ? acceptedAnswer.content : acceptedAnswer.contentEn}&quot;
            </p>
          </div>
        )}
      </div>

      {/* Bottom Footer: Author info on left, actions on right */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3 text-xs">
        {/* Author badge */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={question.authorAvatar}
            alt={question.authorName}
            className="w-6 h-6 rounded-full object-cover border border-slate-700 shrink-0"
          />
          <div className="min-w-0">
            <span className="text-slate-200 font-semibold text-xs truncate block">
              {question.authorName}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1 truncate">
              <MapPin className="w-2.5 h-2.5 text-slate-500 shrink-0" />
              <span className="truncate">
                {isBn ? question.authorLocation : question.authorLocationEn}
              </span>
            </span>
          </div>
        </div>

        {/* Engagement Stats & CTA */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Helpful Upvote Button */}
          <button
            onClick={handleUpvote}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
              hasUpvoted
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border-white/[0.06]"
            }`}
            title={isBn ? "সহায়ক উত্তর মনে হলে ভোট দিন" : "Upvote as helpful"}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? "text-emerald-400" : ""}`} />
            <span>{upvotes}</span>
          </button>

          {/* Answer Count */}
          <span className="inline-flex items-center gap-1 text-slate-400 text-xs px-2 py-1 rounded-lg bg-slate-900/60 border border-white/[0.06]">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>{question.answers.length}</span>
          </span>

          {/* View Details arrow */}
          <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
