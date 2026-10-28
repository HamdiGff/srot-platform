import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KNOWLEDGE_ARTICLES } from "@/data/mockKnowledge";
import { PLATFORM_EXPERTS } from "@/data/mockExperts";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  Share2,
} from "lucide-react";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return KNOWLEDGE_ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function KnowledgeArticlePage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = KNOWLEDGE_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedExpert = PLATFORM_EXPERTS.find(
    (e) => e.name.toLowerCase().includes(article.author.toLowerCase().split(" ")[1] || "")
  ) || PLATFORM_EXPERTS[0];

  return (
    <div className="w-full srot-glow-mesh py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-400">Home</Link>
        <span>/</span>
        <Link href="/knowledge" className="hover:text-emerald-400">Knowledge Hub</Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Article Header */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {article.categoryLabel}
          </span>
          <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-0.5 rounded-full border border-slate-700">
            {article.badge}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1 ml-auto">
            <Clock className="w-3.5 h-3.5" /> {article.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 pt-2 text-xs text-slate-300 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">
              {article.author.split(" ")[1]?.charAt(0) || "D"}
            </div>
            <div>
              <span className="font-bold text-white block">{article.author}</span>
              <span className="text-slate-400 text-[11px]">{article.authorRole}</span>
            </div>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Published {article.publishDate}</span>
        </div>
      </div>

      {/* Featured Banner Image */}
      <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden mb-10 border border-slate-800">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Diagnostic Checklist Box */}
      <div className="srot-glass-card rounded-2xl p-6 border border-emerald-500/30 bg-emerald-950/20 mb-8 space-y-3">
        <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-emerald-400" />
          Primary Diagnostic Indicators & Symptoms
        </h3>
        <p className="text-xs text-slate-300">
          Inspect your field or animal for the following clinical signs:
        </p>
        <ul className="space-y-2 text-xs text-slate-200 pt-2">
          {article.symptomsOrIndicators.map((sym, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{sym}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Immediate Action Protocol Box */}
      <div className="srot-glass-card rounded-2xl p-6 border border-slate-800 mb-10 space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Immediate Action Protocol (First 24 Hours)
        </h3>
        <div className="space-y-2 text-xs text-slate-300">
          {article.immediateActionChecklist.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* In-Depth Article Content */}
      <div className="prose prose-invert max-w-none space-y-4 text-sm text-slate-300 leading-relaxed mb-12">
        {article.detailedContent.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Related Specialist Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={relatedExpert.avatar}
            alt={relatedExpert.name}
            className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
          />
          <div>
            <h4 className="font-bold text-white text-sm">Need help applying this protocol?</h4>
            <p className="text-xs text-slate-400">
              Consult with {relatedExpert.name} ({relatedExpert.title})
            </p>
          </div>
        </div>

        <Link
          href={`/consult?expert=${relatedExpert.id}`}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-950/60"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Book Consultation &rarr;</span>
        </Link>
      </div>
    </div>
  );
}
