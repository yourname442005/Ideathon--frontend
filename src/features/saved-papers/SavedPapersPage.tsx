"use client";

import React, { useState } from "react";
import { BookOpen, Search, Sparkles, Trash2, FileText, Check, Copy } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { formatBibTeX, copyToClipboard, announceToScreenReader } from "@/lib/utils";

export default function SavedPapers() {
  const { papers, handleToggleSave, setPreviewPaper } = useApp();

  const [search, setSearch] = useState("");
  const [readingStatus, setReadingStatus] = useState<Record<string, "unread" | "reading" | "done">>({});
  const [paperNotes, setPaperNotes] = useState<Record<string, string>>({});
  const [activeNotePaperId, setActiveNotePaperId] = useState<string | null>(null);
  const [activeNoteText, setActiveNoteText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const savedPapers = papers.filter((p) => p.saved);

  const handleStatusChange = (paperId: string, status: "unread" | "reading" | "done") => {
    setReadingStatus((prev) => ({ ...prev, [paperId]: status }));
  };

  const handleNoteSave = (paperId: string) => {
    setPaperNotes((prev) => ({ ...prev, [paperId]: activeNoteText }));
    setActiveNotePaperId(null);
    setActiveNoteText("");
  };

  const handleCopyBibtex = async (paper: typeof papers[0]) => {
    const citation = formatBibTeX(paper);
    await copyToClipboard(citation);
    setCopiedId(paper.id);
    announceToScreenReader("BibTeX citation copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = savedPapers.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.authors.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6" id="saved-papers-root">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Saved Library</h1>
          <p className="text-sm text-zinc-500">Your curated academic database. Organize documents, log annotations, and request AI summaries.</p>
        </div>
        <span className="rounded-full bg-[#F4F4F5] px-3.5 py-1 text-xs font-mono font-semibold text-zinc-700 border border-[#E5E7EB]">
          {savedPapers.length} Publications
        </span>
      </div>

      {/* Library Toolbar */}
      <div className="relative">
        <Search className="absolute top-3 left-3 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Filter library by title, tag, or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-[#E5E7EB] bg-[#F4F4F5] pl-9 pr-4 py-2.5 text-sm placeholder-zinc-400 transition focus:border-zinc-300 focus:bg-white focus:outline-none"
        />
      </div>

      {/* Grid of Saved Papers */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((paper) => {
            const currentStatus = readingStatus[paper.id] || "unread";
            const noteText = paperNotes[paper.id] || "";

            return (
              <div
                key={paper.id}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-5 hover:border-zinc-350 hover:shadow-xs transition space-y-4"
              >
                {/* Paper header line */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {paper.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#F4F4F5] px-2.5 py-0.5 text-[10px] font-mono text-[#52525B]"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-zinc-400 font-mono">
                      {paper.journal} • {paper.year}
                    </span>
                  </div>

                  {/* Reading Status Selector dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">Status:</span>
                    <select
                      value={currentStatus}
                      onChange={(e) => handleStatusChange(paper.id, e.target.value as any)}
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold focus:outline-none cursor-pointer ${
                        currentStatus === "done"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : currentStatus === "reading"
                          ? "bg-blue-50 border-blue-200 text-blue-700"
                          : "bg-zinc-50 border-[#E5E7EB] text-[#52525B]"
                      }`}
                    >
                      <option value="unread">Unread</option>
                      <option value="reading">Reading</option>
                      <option value="done">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Paper Content */}
                <div>
                  <h3 className="text-sm font-bold text-[#1A1A1A] tracking-tight leading-snug">{paper.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{paper.authors} — {paper.institution}</p>
                </div>

                {/* Personal Annotation Section */}
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9F9FB] p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-700">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5 text-zinc-500" />
                      Personal Research Annotations
                    </span>
                    {activeNotePaperId !== paper.id && (
                      <button
                        onClick={() => { setActiveNotePaperId(paper.id); setActiveNoteText(noteText); }}
                        className="text-zinc-500 hover:text-black text-xs font-semibold cursor-pointer"
                      >
                        {noteText ? "Edit Log" : "+ Add Annotation"}
                      </button>
                    )}
                  </div>

                  {activeNotePaperId === paper.id ? (
                    <div className="space-y-2">
                      <textarea
                        defaultValue={noteText}
                        onChange={(e) => setActiveNoteText(e.target.value)}
                        rows={3}
                        placeholder="Log methodology insights, formulas, experimental gaps or reference questions..."
                        className="w-full rounded-lg border border-[#E5E7EB] bg-white p-2 text-xs placeholder-zinc-400 focus:outline-none"
                        aria-label={`Add annotation for ${paper.title}`}
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => { setActiveNotePaperId(null); setActiveNoteText(""); }}
                          className="rounded-full px-3 py-1 text-[10px] border border-[#E5E7EB] text-[#52525B] hover:bg-[#F1F5F9] cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleNoteSave(paper.id)}
                          className="rounded-full bg-black text-white px-3.5 py-1 text-[10px] hover:bg-zinc-800 cursor-pointer"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[11px] text-[#52525B] italic whitespace-pre-line leading-relaxed">
                      {noteText || "No annotations logged for this citation yet."}
                    </p>
                  )}
                </div>

                {/* Paper Footer / Quick Controls */}
                <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3">
                  <button
                    onClick={() => handleCopyBibtex(paper)}
                    className="flex items-center gap-1 text-[11px] text-[#52525B] hover:text-black transition cursor-pointer"
                  >
                    {copiedId === paper.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="font-mono text-[10px]">BibTeX Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="font-mono text-[10px]">Export BibTeX</span>
                      </>
                    )}
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setPreviewPaper(paper)}
                      className="flex items-center gap-1 rounded-full bg-black text-white hover:bg-zinc-800 px-3.5 py-1 text-xs font-medium transition cursor-pointer"
                    >
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      AI Summary
                    </button>
                    <button
                      onClick={() => handleToggleSave(paper.id)}
                      className="flex items-center gap-1 rounded-full text-red-600 hover:bg-red-50 px-3 py-1 text-xs font-medium transition cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white py-16 text-center">
            <BookOpen className="h-10 w-10 text-zinc-300 mb-3" />
            <h3 className="text-sm font-semibold text-zinc-900">Your Scholarly Library is Empty</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm leading-relaxed">
              Discover cutting-edge research in the &quot;Discover Papers&quot; tab, then click &quot;Save Paper&quot; to populate your local database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
