"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal, Sparkles, Bookmark, Copy, Check, Plus, FolderPlus } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { formatAPA, copyToClipboard, announceToScreenReader } from "@/lib/utils";

export default function DiscoverPapers() {
  const { papers, collections, handleToggleSave, setPreviewPaper, handleAddPaperToCollection } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"citations" | "year">("citations");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddToCol, setShowAddToCol] = useState<string | null>(null);

  const allTags = ["All", ...Array.from(new Set(papers.flatMap((p) => p.tags)))];

  const handleCopyCitation = async (paper: typeof papers[0]) => {
    const citation = formatAPA(paper);
    await copyToClipboard(citation);
    setCopiedId(paper.id);
    announceToScreenReader("APA citation copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPapers = papers
    .filter((paper) => {
      const matchQuery =
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTag = selectedTag === "All" || paper.tags.includes(selectedTag);
      return matchQuery && matchTag;
    })
    .sort((a, b) => {
      if (sortBy === "citations") return b.citations - a.citations;
      if (sortBy === "year") return parseInt(b.year) - parseInt(a.year);
      return 0;
    });

  return (
    <div className="space-y-6" id="discover-papers-root">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Discover Papers</h1>
        <p className="text-sm text-zinc-500">
          Discover cutting-edge publications, inspect citation metrics, and instantly generate AI summaries.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search titles, authors, journals, or concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#E5E7EB] bg-[#F4F4F5] pl-9 pr-4 py-2.5 text-sm placeholder-zinc-400 transition focus:border-zinc-300 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-[#E5E7EB] px-3.5 py-2 text-xs font-medium text-zinc-600 bg-white">
            <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "citations" | "year")}
              className="bg-transparent font-semibold text-zinc-900 focus:outline-none cursor-pointer"
            >
              <option value="citations">Most Cited</option>
              <option value="year">Publication Year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 border-b border-[#E5E7EB] pb-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
              selectedTag === tag
                ? "bg-black text-white shadow-sm"
                : "text-[#52525B] hover:bg-[#F1F5F9] hover:text-[#000000]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredPapers.length > 0 ? (
          filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-xs sm:flex-row"
            >
              <div className="space-y-3 max-w-4/5">
                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#F4F4F5] px-2.5 py-0.5 text-[10px] font-mono font-medium text-[#52525B]"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-xs text-zinc-400 font-mono self-center">
                    {paper.journal} • {paper.year}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[#1A1A1A] tracking-tight leading-snug group-hover:text-black transition">
                    {paper.title}
                  </h3>
                  <p className="text-xs font-medium text-zinc-500 mt-1">
                    {paper.authors} — <span className="text-zinc-400 italic">{paper.institution}</span>
                  </p>
                </div>

                <p className="text-xs text-[#52525B] leading-relaxed line-clamp-3">
                  {paper.abstract}
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-500">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-zinc-700">{paper.citations.toLocaleString()}</span>
                    <span>Citations</span>
                  </div>
                  <div>
                    <span>DOI:</span>
                    <span className="ml-1 text-zinc-400 select-all">{paper.doi}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-row gap-2 border-t border-[#E5E7EB] pt-3 sm:mt-0 sm:flex-col sm:border-none sm:pt-0 sm:pl-4 sm:justify-start sm:items-end shrink-0">
                <button
                  onClick={() => setPreviewPaper(paper)}
                  className="flex w-full items-center justify-center gap-1 rounded-full bg-black text-white hover:bg-zinc-800 transition px-3.5 py-1.5 text-xs font-medium sm:w-auto cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  AI Summary
                </button>

                <button
                  onClick={() => handleToggleSave(paper.id)}
                  className={`flex w-full items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium border transition sm:w-auto cursor-pointer ${
                    paper.saved
                      ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                      : "bg-white border-[#E5E7EB] text-[#52525B] hover:bg-[#F1F5F9] hover:text-[#000000]"
                  }`}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${paper.saved ? "fill-amber-500" : ""}`} />
                  <span>{paper.saved ? "Saved" : "Save"}</span>
                </button>

                <button
                  onClick={() => handleCopyCitation(paper)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-white border border-[#E5E7EB] text-[#52525B] hover:bg-[#F1F5F9] hover:text-[#000000] transition px-3.5 py-1.5 text-xs font-medium sm:w-auto cursor-pointer"
                  title="Copy APA Citation"
                >
                  {copiedId === paper.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Cite</span>
                    </>
                  )}
                </button>

                <div className="relative w-full sm:w-auto">
                  <button
                    onClick={() => setShowAddToCol(showAddToCol === paper.id ? null : paper.id)}
                    className="flex w-full items-center justify-center gap-1 rounded-full bg-white border border-[#E5E7EB] text-[#52525B] hover:bg-[#F1F5F9] hover:text-[#000000] transition px-3.5 py-1.5 text-xs font-medium cursor-pointer"
                    title="Add to Collection"
                  >
                    <FolderPlus className="h-3.5 w-3.5" />
                    <span>Collect</span>
                  </button>

                  {showAddToCol === paper.id && (
                    <div className="absolute right-0 bottom-full z-10 mb-1 w-48 rounded-xl border border-[#E5E7EB] bg-white p-1.5 shadow-md text-left">
                      <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        Choose Collection
                      </p>
                      {collections.map((col) => (
                        <button
                          key={col.id}
                          onClick={() => {
                            handleAddPaperToCollection(paper.id, col.id);
                            setShowAddToCol(null);
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                        >
                          <span>{col.name}</span>
                          <Plus className="h-3 w-3 text-zinc-400" />
                        </button>
                      ))}
                      {collections.length === 0 && (
                        <p className="px-2 py-1 text-xs text-zinc-400">No collections found.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white py-12 text-center">
            <SlidersHorizontal className="h-8 w-8 text-zinc-300 mb-3" />
            <h3 className="text-sm font-semibold text-zinc-900">No papers found</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-md">
              Try adjusting your query, selecting a different topic category tab, or removing search keywords.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9F9FB] p-5">
        <div className="flex gap-4 sm:items-center">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white">
            <Sparkles className="h-5 w-5 text-amber-300" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-zinc-900">AI Suggested Reading list</h4>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Based on your following researchers and workspace progress: we recommend reviewing{" "}
              <span className="font-semibold text-zinc-800">&quot;Direct Preference Optimization&quot;</span> by Stanford University.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
