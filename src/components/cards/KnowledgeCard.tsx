import React from "react";
import Link from "next/link";
import { KnowledgeArticle } from "@/data/mockKnowledge";
import { BookOpen, Clock, CheckCircle2, ArrowRight } from "lucide-react";

interface KnowledgeCardProps {
  article: KnowledgeArticle;
}

export function KnowledgeCard({ article }: KnowledgeCardProps) {
  const isAgri = article.category === "agri";
  const isPet = article.category === "pet";

  const getCategoryBadgeClass = () => {
    if (isAgri) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (isPet) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
  };

  return (
    <div className="srot-glass-card srot-glass-card-hover rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group">
      <div>
        {/* Featured Image */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <span
            className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border backdrop-blur-md ${getCategoryBadgeClass()}`}
          >
            {article.categoryLabel}
          </span>
          <span className="absolute bottom-3 right-3 text-[10px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-md flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            {article.readTime}
          </span>
        </div>

        {/* Content body */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>By {article.author}</span>
            <span>•</span>
            <span>{article.publishDate}</span>
          </div>

          <Link href={`/knowledge/${article.slug}`} className="block group-hover:text-emerald-400 transition">
            <h3 className="font-bold text-white text-base leading-snug line-clamp-2">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>

          {/* Quick Symptoms Preview */}
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Key Diagnostic Indicators:
            </span>
            <div className="space-y-1">
              {article.symptomsOrIndicators.slice(0, 2).map((sym, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{sym}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 pt-0">
        <Link
          href={`/knowledge/${article.slug}`}
          className="flex items-center justify-between w-full px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700/60"
        >
          <span>Read Protocol & Spray Guide</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
        </Link>
      </div>
    </div>
  );
}
