"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { AVATARS } from "@/lib/constants";

export default function RightSidebar() {
  const { researchers, handleToggleFollow, setActiveTab } = useApp();

  return (
    <aside className="hidden lg:flex w-80 border-l border-[#E5E7EB] bg-[#F9F9FB] flex-col p-5 space-y-6 overflow-y-auto select-none shrink-0">
      <div className="rounded-2xl bg-violet-50/50 border border-violet-100 p-4 space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-violet-900 font-mono">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span>AI COGNITIVE TIP</span>
        </div>
        <p className="text-[11px] text-[#52525B] leading-relaxed font-sans">
          We&apos;ve mapped 3 new citations connecting <span className="font-semibold text-violet-900">LoRA</span> with loss alignment gradients in your &quot;PEFT&quot; project folder. Run a concept mapping query to visualize connections.
        </p>
        <button
          onClick={() => setActiveTab("ai-search")}
          className="flex items-center gap-1 text-[10px] font-bold text-violet-700 hover:text-violet-900 font-mono transition"
        >
          <span>Initialize Semantic Search</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        <h4 className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider">Department Suggestions</h4>
        <div className="space-y-3">
          {researchers.slice(2).map((res) => (
            <div key={res.id} className="flex gap-2.5 items-center bg-white border border-[#E5E7EB] p-2.5 rounded-xl">
              <img
                src={res.avatar}
                alt={res.name}
                className="h-8 w-8 rounded-full object-cover border border-[#E5E7EB]"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-[#1A1A1A] truncate leading-snug">{res.name}</h5>
                <span className="text-[10px] text-zinc-400 block truncate font-mono">{res.institution}</span>
              </div>
              <button
                onClick={() => handleToggleFollow(res.id)}
                className="rounded-full bg-black hover:bg-zinc-800 text-white text-[10px] font-bold px-2.5 py-1 font-sans shrink-0 transition"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider">Department Activity Timeline</h4>
        <div className="space-y-3 pl-1.5 border-l border-[#E5E7EB]">
          <div className="relative pl-4">
            <div className="absolute left-[-5.5px] top-1.5 h-2 w-2 rounded-full bg-black ring-4 ring-white"></div>
            <span className="text-[9px] font-mono text-zinc-400 uppercase block">10:14 AM</span>
            <p className="text-[11px] text-[#52525B] font-sans leading-snug">
              <strong className="text-[#1A1A1A]">Dr. Sarah Chen</strong> finalized adapter convergence Sweeps.
            </p>
          </div>
          <div className="relative pl-4">
            <div className="absolute left-[-5.5px] top-1.5 h-2 w-2 rounded-full bg-zinc-400 ring-4 ring-white"></div>
            <span className="text-[9px] font-mono text-zinc-400 uppercase block">Yesterday</span>
            <p className="text-[11px] text-[#52525B] font-sans leading-snug">
              <strong className="text-[#1A1A1A]">You</strong> saved Direct Preference Optimization to Saved Papers.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-wider">Conference Deadlines</h4>
        <div className="rounded-2xl border border-[#E5E7EB] p-3 bg-white space-y-2 text-[11px]">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#1A1A1A]">NeurIPS 2026</span>
            <span className="rounded bg-red-50 text-red-600 px-1.5 py-0.2 font-bold font-mono text-[9px]">IN 6 DAYS</span>
          </div>
          <p className="text-[10px] text-zinc-400 font-mono">Submission task: PEFT Gradient Adaptations</p>
        </div>
      </div>
    </aside>
  );
}
