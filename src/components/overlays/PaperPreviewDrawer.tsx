"use client";

import React, { useEffect, useState } from "react";
import { X, Sparkles, BookOpen, Copy, Check } from "lucide-react";
import { Paper } from "@/lib/types";
import { copyToClipboard, announceToScreenReader } from "@/lib/utils";

interface PaperPreviewDrawerProps {
  paper: Paper | null;
  onClose: () => void;
}

interface SummaryData {
  summary: string;
  contributions: string[];
  methodology: string;
  limitations: string;
}

export default function PaperPreviewDrawer({ paper, onClose }: PaperPreviewDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!paper) {
      setSummaryData(null);
      return;
    }

    const fetchSummary = async () => {
      setLoading(true);
      setSummaryData(null);
      try {
        const response = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: paper.title, abstract: paper.abstract }),
        });
        const data = await response.json();
        setSummaryData(data);
      } catch {
        setSummaryData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [paper]);

  if (!paper) return null;

  const handleCopyDOI = async () => {
    await copyToClipboard(paper.doi);
    setCopied(true);
    announceToScreenReader("DOI copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg border-l border-zinc-200 bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-250">
      <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4.5 w-4.5 text-zinc-700" />
          <span className="text-xs font-bold font-mono text-zinc-900">PAPER RESEARCH CONSOLE</span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-950 transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {paper.tags.map((tag) => (
              <span key={tag} className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-mono text-zinc-500">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-base font-bold text-zinc-900 leading-snug tracking-tight">
            {paper.title}
          </h2>
          <p className="text-xs font-semibold text-zinc-600">
            {paper.authors} — <span className="text-zinc-400 italic">{paper.institution}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-b border-zinc-100 py-3.5 text-xs font-mono text-zinc-500">
          <div>
            <span>Citations Index:</span>
            <strong className="text-zinc-900 ml-1.5">{paper.citations.toLocaleString()}</strong>
          </div>
          <div>
            <span>Published:</span>
            <strong className="text-zinc-900 ml-1.5">{paper.journal || "NeurIPS"} ({paper.year})</strong>
          </div>
          <div className="col-span-2 flex items-center justify-between">
            <span>Digital DOI: <strong className="text-zinc-900 select-all ml-1.5">{paper.doi}</strong></span>
            <button
              onClick={handleCopyDOI}
              className="text-[10px] font-bold text-zinc-500 hover:text-zinc-900 transition flex items-center gap-1"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider font-mono">Original Abstract</h4>
          <p className="text-xs text-zinc-600 leading-relaxed font-sans whitespace-pre-line">
            {paper.abstract}
          </p>
        </div>

        <div className="border-t border-zinc-150 pt-5 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-violet-600 animate-pulse" />
            <span className="text-xs font-bold font-mono text-zinc-900">AI ANALYSIS CONSOLE (GEMINI 3.5)</span>
          </div>

          {loading ? (
            <div className="space-y-4 bg-violet-50/40 border border-violet-100 rounded-xl p-5">
              <div className="flex items-center gap-2.5 text-xs text-zinc-500 font-mono">
                <Sparkles className="h-4 w-4 text-violet-500 animate-spin" />
                <span>Gemini analyzing theoretical models and methodology limiters...</span>
              </div>
              <div className="space-y-2">
                <div className="h-2.5 bg-zinc-100 rounded w-full animate-pulse"></div>
                <div className="h-2.5 bg-zinc-100 rounded w-5/6 animate-pulse"></div>
                <div className="h-2.5 bg-zinc-100 rounded w-4/5 animate-pulse"></div>
              </div>
            </div>
          ) : (
            summaryData && (
              <div className="space-y-4 bg-violet-50/30 border border-violet-100/50 rounded-xl p-5 text-xs leading-relaxed text-zinc-700">
                <div className="space-y-1">
                  <h5 className="font-bold text-violet-900 font-mono uppercase text-[10px]">Synthesis</h5>
                  <p className="font-sans leading-relaxed">{summaryData.summary}</p>
                </div>

                <div className="space-y-1.5 border-t border-violet-100/50 pt-3">
                  <h5 className="font-bold text-violet-900 font-mono uppercase text-[10px]">Key Contributions</h5>
                  <ul className="list-disc pl-4 space-y-1 font-sans">
                    {summaryData.contributions.map((con, idx) => (
                      <li key={idx}>{con}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1 border-t border-violet-100/50 pt-3">
                  <h5 className="font-bold text-violet-900 font-mono uppercase text-[10px]">Methodology Breakdown</h5>
                  <p className="font-sans leading-relaxed">{summaryData.methodology}</p>
                </div>

                <div className="space-y-1 border-t border-violet-100/50 pt-3">
                  <h5 className="font-bold text-violet-900 font-mono uppercase text-[10px]">Known Gaps &amp; Limitations</h5>
                  <p className="font-sans leading-relaxed">{summaryData.limitations}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
