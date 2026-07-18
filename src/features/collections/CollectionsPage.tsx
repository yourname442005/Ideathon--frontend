"use client";

import React, { useState } from "react";
import { Folder, Pin, Share2, Sparkles, Plus, Trash2 } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

interface AICollectionSummary {
  insight: string;
  trajectory: string;
  primaryResearchers: string[];
}

export default function CollectionsView() {
  const { collections, papers, handleAddCollection, handleDeleteCollection } = useApp();

  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [color, setColor] = useState("#3B82F6");

  const [selectedColSummary, setSelectedColSummary] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<AICollectionSummary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const colors = [
    { value: "#3B82F6", label: "Blue" },
    { value: "#8B5CF6", label: "Purple" },
    { value: "#10B981", label: "Emerald" },
    { value: "#F59E0B", label: "Amber" },
    { value: "#EF4444", label: "Red" },
    { value: "#18181B", label: "Slate" },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    handleAddCollection(name, description, isPinned, isShared, color);
    setName("");
    setDescription("");
    setIsPinned(false);
    setIsShared(false);
    setShowAddForm(false);
  };

  const handleRequestAISummary = async (col: typeof collections[0]) => {
    setSelectedColSummary(col.name);
    setLoadingSummary(true);
    setAiSummary(null);
    try {
      const response = await fetch("/api/generate-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: col.name }),
      });
      const data = await response.json();
      setAiSummary(data);
    } catch (err) {
      console.error("Failed to load collection summaries:", err);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="space-y-6" id="collections-view-root">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Collections</h1>
          <p className="text-sm text-zinc-500">Group citations into structured folders, pin key files, and generate AI insights.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Create Collection
        </button>
      </div>

      {/* Creation Drawer Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-2xl border border-[#E5E7EB] bg-[#F9F9FB] p-5 shadow-xs space-y-4"
        >
          <h3 className="text-sm font-semibold text-zinc-900">Configure New Collection Folder</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-600">Collection Name</label>
              <input
                type="text"
                placeholder="e.g. Parameter-Efficient LLM Adaptations"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs focus:border-zinc-350 focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-600">Folder Accent Color</label>
              <div className="flex gap-2 h-9 items-center">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    style={{ backgroundColor: c.value }}
                    className={`h-6 w-6 rounded-full border transition cursor-pointer ${
                      color === c.value ? "ring-2 ring-zinc-950 ring-offset-2 border-white" : "border-transparent"
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-600">Description</label>
            <input
              type="text"
              placeholder="Thesis background, bibliography parameters, and core nodes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs focus:border-zinc-350 focus:outline-none"
            />
          </div>

          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2 text-xs font-medium text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={() => setIsPinned(!isPinned)}
                className="h-4 w-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
              />
              Pin to Top Bar
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isShared}
                onChange={() => setIsShared(!isShared)}
                className="h-4 w-4 rounded border-zinc-300 text-zinc-950 focus:ring-zinc-950"
              />
              Share with Institution Team
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-full border border-[#E5E7EB] px-4 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-black px-4 py-1.5 text-xs text-white hover:bg-zinc-800 cursor-pointer"
            >
              Save Folder
            </button>
          </div>
        </form>
      )}

      {/* Grid of Folders */}
      <div className="grid gap-4 sm:grid-cols-3">
        {collections.map((col) => {
          // Highlight accent
          const folderColor = col.color || "#3B82F6";

          return (
            <div
              key={col.id}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-4 space-y-3 hover:border-zinc-300 hover:shadow-xs transition relative group"
            >
              <div className="flex items-center justify-between">
                <Folder style={{ color: folderColor }} className="h-6 w-6 fill-current" />
                <div className="flex items-center gap-1.5">
                  {col.isPinned && <span title="Pinned"><Pin className="h-3.5 w-3.5 text-zinc-400 rotate-45" /></span>}
                  {col.isShared && <span title="Shared Folder"><Share2 className="h-3.5 w-3.5 text-zinc-400" /></span>}
                  <button
                    onClick={() => handleDeleteCollection(col.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 transition cursor-pointer"
                    title="Delete Collection"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#1A1A1A]">{col.name}</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-2 leading-relaxed">
                  {col.description || "No description logged for this folder node."}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3 text-[11px] font-mono text-zinc-400">
                <span>{col.papersCount} Publications</span>
                <button
                  onClick={() => handleRequestAISummary(col)}
                  className="flex items-center gap-1.5 text-black font-semibold hover:text-zinc-600 transition cursor-pointer"
                >
                  <Sparkles className="h-3 w-3 text-amber-500" />
                  Summarize Folder
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI summaries sidebar insights */}
      {selectedColSummary && (
        <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9F9FB] p-5 space-y-4 transition-all">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-[#1A1A1A]" />
              <span className="text-xs font-semibold text-zinc-900 font-mono">
                AI COGNITIVE COLLECTION SUMMARY: {selectedColSummary}
              </span>
            </div>
            <button
              onClick={() => setSelectedColSummary(null)}
              className="text-xs font-semibold text-zinc-400 hover:text-black cursor-pointer"
            >
              Dismiss
            </button>
          </div>

          {loadingSummary ? (
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-black animate-ping"></span>
              <span>Gemini calculating cluster trajectories and top researchers...</span>
            </div>
          ) : (
            aiSummary && (
              <div className="space-y-3 text-xs leading-relaxed text-[#52525B]">
                <p>
                  <strong className="text-[#1A1A1A] font-mono">Growth Insight:</strong> {aiSummary.insight}
                </p>
                <p>
                  <strong className="text-[#1A1A1A] font-mono">Subject Trajectory:</strong> {aiSummary.trajectory}
                </p>
                <div>
                  <strong className="text-[#1A1A1A] font-mono">Primary Scholar Nodes:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {aiSummary.primaryResearchers.map((res, idx) => (
                      <span key={idx} className="rounded-full bg-[#F4F4F5] px-2.5 py-0.5 text-[10px] font-medium text-[#52525B] border border-[#E5E7EB]">
                        {res}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
