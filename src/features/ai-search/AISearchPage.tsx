"use client";

import React, { useState, useEffect } from "react";
import { Search, Mic, Sparkles, Network, ArrowUpRight, HelpCircle, RefreshCw } from "lucide-react";
import { Paper } from "@/lib/types";
import { useApp } from "@/components/providers/AppProvider";

interface SearchResult {
  papers: Paper[];
  reasoning: string;
  confidenceScore: number;
  suggestedPrompts: string[];
  graph: {
    nodes: Array<{ id: string; group: number; val: number }>;
    links: Array<{ source: string; target: string; value: number }>;
  };
}

export default function AISearch() {
  const { setPreviewPaper, handleToggleSave } = useApp();
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState<"semantic" | "deep" | "mapping">("semantic");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [micActive, setMicActive] = useState(false);

  const initialPrompts = [
    "Parameter-efficient fine-tuning comparison of LoRA and traditional RLHF",
    "How does RAG coordinate parametric memory and knowledge databases?",
    "Show structural connections between Graph Neural Networks and Transformers",
  ];

  const triggerSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery, mode: searchMode }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      // Search failed silently
    } finally {
      setIsSearching(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch(query);
  };

  const handleSuggestionClick = (prompt: string) => {
    setQuery(prompt);
    triggerSearch(prompt);
  };

  const toggleMic = () => {
    setMicActive(!micActive);
    if (!micActive) {
      setTimeout(() => {
        setQuery("Retrieval augmented generation memory optimization");
        setMicActive(false);
      }, 2500);
    }
  };

  useEffect(() => {
    triggerSearch("Attention self self-attention transformers and fine-tuning");
  }, []);

  return (
    <div className="space-y-6" id="ai-search-root">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">AI Semantic Search</h1>
        <p className="text-sm text-zinc-500">
          Query using natural intent. Our system maps concepts, builds knowledge pathways, and explains relationships.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="relative rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-xs focus-within:border-zinc-300 focus-within:ring-2 focus-within:ring-zinc-100 transition-all">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4F4F5] text-zinc-600">
              <Sparkles className={`h-5 w-5 text-zinc-800 ${isSearching ? "animate-spin" : ""}`} />
            </div>
            <input
              type="text"
              placeholder="Enter a concept, thesis, or question (e.g., 'How can low-rank updates reduce alignment drift?')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-zinc-900 placeholder-[#A1A1AA] focus:outline-none"
              required
            />
            <div className="flex items-center gap-1.5 pr-2">
              <button
                type="button"
                onClick={toggleMic}
                className={`p-2 rounded-lg transition cursor-pointer ${
                  micActive ? "bg-red-50 text-red-600 animate-pulse" : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
                }`}
                title={micActive ? "Listening..." : "Voice Input (simulate)"}
              >
                <Mic className="h-4.5 w-4.5" />
              </button>
              <button
                type="submit"
                disabled={isSearching}
                className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 cursor-pointer"
              >
                {isSearching ? "Reasoning..." : "Search"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {[
              { id: "semantic", label: "Semantic Mapping" },
              { id: "deep", label: "Deep AI Reasoning" },
              { id: "mapping", label: "Research Graph Only" },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSearchMode(mode.id as "semantic" | "deep" | "mapping")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition cursor-pointer ${
                  searchMode === mode.id
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-white text-[#52525B] border-[#E5E7EB] hover:bg-[#F1F5F9] hover:text-[#000000]"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span>Gemini-3.5-Flash Active</span>
          </div>
        </div>
      </form>

      {!query && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Suggested Queries</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {initialPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(prompt)}
                className="flex flex-col text-left rounded-2xl border border-[#E5E7EB] bg-white p-4 hover:border-zinc-300 hover:shadow-xs transition group cursor-pointer"
              >
                <p className="text-xs font-medium text-zinc-700 line-clamp-3 mb-2 flex-1 leading-relaxed">
                  &quot;{prompt}&quot;
                </p>
                <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 group-hover:text-zinc-900 transition">
                  <span>Initialize</span>
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isSearching && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white py-16 text-center">
          <RefreshCw className="h-8 w-8 text-zinc-400 animate-spin mb-3" />
          <h3 className="text-sm font-semibold text-zinc-900">Constructing Semantics</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm leading-relaxed">
            Fetching scholarly citations, aligning multi-dimensional parameter nodes, and querying Gemini for reasoning context...
          </p>
        </div>
      )}

      {!isSearching && result && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9F9FB] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-semibold text-zinc-900">AI Reasoning &amp; Mapping Panel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-500">ALIGNMENT SCORE:</span>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-bold font-mono text-emerald-700">
                    {result.confidenceScore}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#52525B] leading-relaxed font-sans">
                {result.reasoning}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-900 border-b border-[#E5E7EB] pb-2">
                Primary Scholarly Matches ({result.papers.length})
              </h3>

              {result.papers.map((paper) => (
                <div
                  key={paper.id}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-5 transition hover:border-zinc-300 hover:shadow-xs"
                >
                  <div className="flex flex-wrap gap-1 mb-2">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#F4F4F5] px-2.5 py-0.5 text-[10px] font-mono text-[#52525B]"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-zinc-400 font-mono ml-auto">
                      {paper.journal} • {paper.year}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-zinc-900 leading-snug hover:text-black cursor-pointer">
                    {paper.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 mb-3">{paper.authors} ({paper.institution})</p>

                  <p className="text-xs text-[#52525B] leading-relaxed line-clamp-2 mb-4">
                    {paper.abstract}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3">
                    <span className="text-xs font-mono text-zinc-400">
                      Citations: <strong className="text-zinc-600">{paper.citations.toLocaleString()}</strong>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewPaper(paper)}
                        className="flex items-center gap-1 rounded-full bg-black text-white hover:bg-zinc-800 px-3.5 py-1 text-xs font-medium transition cursor-pointer"
                      >
                        <Sparkles className="h-3 w-3 text-amber-500" />
                        AI Summary
                      </button>
                      <button
                        onClick={() => handleToggleSave(paper.id)}
                        className={`rounded-full px-3.5 py-1 text-xs font-medium border transition cursor-pointer ${
                          paper.saved
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : "bg-white border-[#E5E7EB] text-[#52525B] hover:bg-[#F1F5F9] hover:text-[#000000]"
                        }`}
                      >
                        {paper.saved ? "Saved" : "Save Paper"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Network className="h-4 w-4 text-zinc-700" />
                  <span className="text-sm font-semibold text-zinc-900">Concept Graph</span>
                </div>
                <span title="Connected concepts based on similarity mapping">
                  <HelpCircle className="h-3.5 w-3.5 text-zinc-400 hover:text-zinc-600 cursor-help" />
                </span>
              </div>

              <div className="relative flex items-center justify-center rounded-xl bg-[#F9F9FB] p-2 border border-[#E5E7EB] h-56 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <line x1="100" y1="100" x2="50" y2="60" stroke="#E4E4E7" strokeWidth="1.5" />
                  <line x1="100" y1="100" x2="150" y2="60" stroke="#E4E4E7" strokeWidth="1.5" />
                  <line x1="100" y1="100" x2="100" y2="160" stroke="#E4E4E7" strokeWidth="1.5" />
                  <line x1="50" y1="60" x2="30" y2="120" stroke="#E4E4E7" strokeWidth="1" />
                  <line x1="150" y1="60" x2="170" y2="120" stroke="#E4E4E7" strokeWidth="1" />

                  <circle cx="100" cy="100" r="14" fill="#18181B" className="cursor-pointer" />
                  <text x="100" y="103" fontSize="6" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">QUERY</text>

                  <g className="cursor-pointer group" onClick={() => handleSuggestionClick("Self Attention mechanism Transformer")}>
                    <circle cx="50" cy="60" r="10" fill="#3B82F6" />
                    <text x="50" y="76" fontSize="6" fill="#4B5563" textAnchor="middle" fontWeight="semibold">Attention</text>
                  </g>

                  <g className="cursor-pointer" onClick={() => handleSuggestionClick("Direct Preference Optimization reward model")}>
                    <circle cx="150" cy="60" r="9" fill="#8B5CF6" />
                    <text x="150" y="76" fontSize="6" fill="#4B5563" textAnchor="middle" fontWeight="semibold">Alignment</text>
                  </g>

                  <g className="cursor-pointer" onClick={() => handleSuggestionClick("Retrieval Augmented Generation for Large Language Models")}>
                    <circle cx="100" cy="160" r="11" fill="#10B981" />
                    <text x="100" y="177" fontSize="6" fill="#4B5563" textAnchor="middle" fontWeight="semibold">RAG Store</text>
                  </g>

                  <circle cx="30" cy="120" r="6" fill="#F59E0B" />
                  <circle cx="170" cy="120" r="6" fill="#EC4899" />
                </svg>

                <div className="absolute bottom-2 left-2 flex gap-1.5 text-[8px] font-mono text-zinc-400">
                  <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> NLP</span>
                  <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span> Policy</span>
                  <span className="flex items-center gap-0.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Database</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 space-y-3">
              <h4 className="text-xs font-semibold text-zinc-900">Suggested Follow-ups</h4>
              <div className="space-y-2">
                {result.suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(prompt)}
                    className="w-full text-left rounded-xl border border-[#E5E7EB] p-2.5 text-xs text-[#52525B] hover:bg-[#F9F9FB] hover:text-[#000000] hover:border-zinc-300 transition cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
