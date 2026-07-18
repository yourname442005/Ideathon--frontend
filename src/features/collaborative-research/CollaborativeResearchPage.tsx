"use client";

import React, { useState, useEffect, useRef } from "react";
import { Users, Sparkles, Send, ShieldCheck, Download } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { ChatMessage } from "@/lib/types";

export default function CollaborativeResearch() {
  const { projects, activeProject, setActiveProject } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m1", sender: "Dr. Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", role: "team", content: "Did we manage to run the LoRA comparison with Rank=8 and Rank=16? I suspect Rank=16 causes slight gradient saturation on the DPO task.", timestamp: "10:14 AM" },
    { id: "m2", sender: "ResearchAI", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", role: "ai", content: "Empirical benchmarks verify that Rank=8 with Alpha=16 yields identical convergence stability while reducing memory overhead by 42%.", timestamp: "10:15 AM" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiReplying, setIsAiReplying] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [activeBoardTab, setActiveBoardTab] = useState<"board" | "timeline" | "datasets">("board");
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `m_user_${Date.now()}`,
      sender: "You (Principal PI)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      role: "user",
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const promptToSend = chatInput;
    setChatInput("");

    // If query references AI or 'ai' or starts with '@ai' or is just a general message, trigger Gemini assistant
    setIsAiReplying(true);
    try {
      const response = await fetch("/api/chat-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: `m_ai_${Date.now()}`,
        sender: "ResearchAI Workspace Assistant",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
        role: "ai",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      // AI assistant failed silently
    } finally {
      setIsAiReplying(false);
    }
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviteSuccess(true);
    setInviteEmail("");
    setTimeout(() => setInviteSuccess(false), 3000);
  };

  const currentProject = activeProject || projects[0] || {
    id: "p_temp",
    name: "Collaborative Workspace Nodes",
    description: "Multi-institutional academic project targeting Parameter-Efficient Large Language Model adaptations.",
    progress: 74,
    members: ["Dr. Sarah Chen", "Dr. James Vance", "You"],
  };

  return (
    <div className="space-y-6" id="collaborative-research-root">
      {/* Collab Header / Project Switcher */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#F4F4F5] text-[#52525B] text-[10px] font-mono px-2.5 py-0.5 border border-[#E5E7EB]">
              Shared Workspace
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">{currentProject.name}</h1>
          </div>
          <p className="text-xs text-zinc-500 mt-1 max-w-xl">{currentProject.description}</p>
        </div>

        {/* Project Dropdown Select */}
        <div className="relative">
          <select
            onChange={(e) => {
              const selected = projects.find((p) => p.id === e.target.value);
              if (selected) setActiveProject(selected);
            }}
            value={currentProject.id}
            className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-semibold text-zinc-700 focus:outline-none cursor-pointer"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                Switch to: {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Collaboration Boards (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sub Navigation */}
          <div className="flex gap-2 border-b border-[#E5E7EB]">
            {[
              { id: "board", label: "Task Pipeline Kanban" },
              { id: "timeline", label: "LaTeX Version & Edits" },
              { id: "datasets", label: "Shared Datasets & Weights" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveBoardTab(tab.id as any)}
                className={`pb-2.5 px-3.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  activeBoardTab === tab.id
                    ? "text-zinc-900 border-black"
                    : "text-zinc-450 border-transparent hover:text-zinc-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Kanban Task Board */}
          {activeBoardTab === "board" && (
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Column 1: Todo */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9F9FB] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[11px] font-mono font-bold text-[#52525B] uppercase tracking-wider">Plan & Backlog</span>
                  <span className="rounded-full bg-[#E5E7EB] text-zinc-600 px-1.5 py-0.2 text-[9px] font-mono">1</span>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 space-y-2 hover:shadow-xs transition">
                  <h4 className="text-xs font-bold text-zinc-900">Incorporate Multi-hop pathways in GNN evaluation</h4>
                  <p className="text-[11px] text-zinc-500">Formulate matrix bounds for graph lookup latency.</p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB] text-[10px] font-mono text-zinc-400">
                    <span className="rounded bg-[#F4F4F5] px-1.5 py-0.2">Dr. Vance</span>
                    <span>Due July 20</span>
                  </div>
                </div>
              </div>

              {/* Column 2: In Progress */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9F9FB] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[11px] font-mono font-bold text-[#52525B] uppercase tracking-wider">In Progress</span>
                  <span className="rounded-full bg-[#E5E7EB] text-zinc-600 px-1.5 py-0.2 text-[9px] font-mono">1</span>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 space-y-2 hover:shadow-xs transition">
                  <h4 className="text-xs font-bold text-zinc-900">Run Rank=8 LoRA Adapter convergence sweeps</h4>
                  <p className="text-[11px] text-zinc-500">Fine-tune on the LLaMA-3 architecture weights.</p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB] text-[10px] font-mono text-zinc-400">
                    <span className="rounded bg-violet-50 text-violet-700 px-1.5 py-0.2">Dr. Sarah</span>
                    <span>Due July 17</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Completed */}
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9F9FB] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                  <span className="text-[11px] font-mono font-bold text-[#52525B] uppercase tracking-wider">Done & Verified</span>
                  <span className="rounded-full bg-[#E5E7EB] text-zinc-600 px-1.5 py-0.2 text-[9px] font-mono">2</span>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 space-y-1 opacity-75">
                  <h4 className="text-xs font-bold text-zinc-900 line-through">DPO policy alignment reward checks</h4>
                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-emerald-600 font-medium">
                    <span>COMPLETED</span>
                  </div>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 space-y-1 opacity-75">
                  <h4 className="text-xs font-bold text-zinc-900 line-through">Draft methodology for NeurIPS review</h4>
                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-emerald-600 font-medium">
                    <span>COMPLETED</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: LaTeX timeline edits */}
          {activeBoardTab === "timeline" && (
            <div className="rounded-2xl border border-[#E5E7EB] bg-white divide-y divide-[#E5E7EB]">
              <div className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono rounded bg-emerald-50 text-emerald-700 border border-emerald-150 px-1.5 py-0.2">v2.1 Draft Approved</span>
                  <h4 className="text-xs font-bold text-zinc-900">Manuscript section 4: Empirical evaluations of LoRA adaptation rates</h4>
                  <p className="text-[11px] text-zinc-500">Merged by Dr. Sarah Chen • 3 hours ago</p>
                </div>
                <button className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[11px] text-zinc-600 hover:bg-zinc-50 font-mono cursor-pointer">
                  Diff Log
                </button>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono rounded bg-amber-50 text-amber-700 border border-amber-150 px-1.5 py-0.2">v2.0 Draft Under Review</span>
                  <h4 className="text-xs font-bold text-zinc-900">Equations formatting: Aligning reward projections across sequence states</h4>
                  <p className="text-[11px] text-zinc-500">Merged by Dr. James Vance • Yesterday</p>
                </div>
                <button className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[11px] text-zinc-600 hover:bg-zinc-50 font-mono cursor-pointer">
                  Diff Log
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Datasets */}
          {activeBoardTab === "datasets" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400">DATASET CSV</span>
                  <span className="text-xs text-zinc-500 font-mono">1.2 GB</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">lora_gradient_sweeps_R8_R16.csv</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Raw optimization data, gradient convergence timelines, loss values.</p>
                </div>
                <div className="flex justify-between items-center border-t border-[#E5E7EB] pt-2.5">
                  <span className="text-[10px] font-mono text-zinc-400">READ/WRITE</span>
                  <button className="flex items-center gap-1 text-[11px] text-zinc-700 hover:text-black font-semibold cursor-pointer">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400">MODEL TENSOR</span>
                  <span className="text-xs text-zinc-500 font-mono">4.1 GB</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">dpo_adapted_weights_epoch5.safetensors</h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Frozen base LLaMA weights + converged adapters.</p>
                </div>
                <div className="flex justify-between items-center border-t border-[#E5E7EB] pt-2.5">
                  <span className="text-[10px] font-mono text-zinc-400">READ ONLY</span>
                  <button className="flex items-center gap-1 text-[11px] text-zinc-700 hover:text-black font-semibold cursor-pointer">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Workspace Invitation form */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9F9FB] p-5">
            <h3 className="text-sm font-semibold text-zinc-900">Invite External Peer Reviewer</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Send a verified invitation to collaborate on this paper workspace node.</p>
            <form onSubmit={handleInvite} className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="colleague@institution.edu"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs focus:border-zinc-350 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 cursor-pointer"
              >
                Send Invite
              </button>
            </form>
            {inviteSuccess && (
              <p className="text-xs text-emerald-600 font-mono mt-2 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Invitation link dispatched to institutional inbox.
              </p>
            )}
          </div>
        </div>

        {/* Live Workspace Chat Sidebar & AI Assistant (1/3 width) */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white flex flex-col h-[520px]">
          {/* Sidebar Chat Header */}
          <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-zinc-700" />
              <span className="text-sm font-semibold text-zinc-900">Research Workspace Chat</span>
            </div>
            <span className="rounded bg-emerald-50 text-emerald-700 text-[9px] font-mono px-2 py-0.5 font-bold uppercase">
              Live
            </span>
          </div>

          {/* Scrolling Messages container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="h-5.5 w-5.5 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className={`text-[11px] font-semibold ${msg.role === "ai" ? "text-violet-700 font-mono" : "text-zinc-800"}`}>
                    {msg.sender}
                  </span>
                  <span className="text-[9px] text-zinc-400 font-mono ml-auto">{msg.timestamp}</span>
                </div>
                <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                  msg.role === "ai"
                    ? "bg-violet-50/50 text-violet-950 border border-violet-100 font-mono"
                    : msg.role === "user"
                    ? "bg-zinc-100 text-zinc-900"
                    : "bg-[#F9F9FB] text-zinc-800 border border-[#E5E7EB]"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isAiReplying && (
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                <Sparkles className="h-3.5 w-3.5 animate-spin text-violet-500" />
                <span>ResearchAI formulating thesis...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendChat} className="p-3 border-t border-[#E5E7EB] flex gap-2">
            <input
              type="text"
              placeholder="Ask pipeline assistant or chat..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 rounded-full border border-[#E5E7EB] px-4 py-2 text-xs focus:border-zinc-300 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-black text-white hover:bg-zinc-800 transition cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
