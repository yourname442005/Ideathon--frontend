"use client";

import React, { useState } from "react";
import { Search, UserCheck, UserPlus, MessageSquare, Building2, BookOpen, Users, Sparkles, Send } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { Researcher } from "@/lib/types";

export default function FollowingResearchers() {
  const { researchers, handleToggleFollow } = useApp();

  const [search, setSearch] = useState("");
  const [activeChat, setActiveChat] = useState<Researcher | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState<Record<string, string[]>>({});

  const filtered = researchers.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.field.toLowerCase().includes(search.toLowerCase()) ||
      r.institution.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChat || !chatMessage.trim()) return;

    setChatLog((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), chatMessage],
    }));
    setChatMessage("");
  };

  return (
    <div className="space-y-6" id="following-researchers-root">
      {/* Page Header */}
      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Research Directory</h1>
        <p className="text-sm text-zinc-500">Connect with principal investigators, monitor active publications, and chat directly.</p>
      </div>

      {/* Directory Search toolbar */}
      <div className="relative">
        <Search className="absolute top-3.5 left-4 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Filter directory by investigator name, university department, or subject field..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-[#E5E7EB] bg-white pl-10 pr-4 py-3 text-sm placeholder-zinc-450 transition focus:border-zinc-300 focus:outline-none"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Grid (2/3 width) */}
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-4 flex flex-col justify-between hover:border-zinc-300 hover:shadow-xs transition"
              id={`researcher-card-${r.id}`}
            >
              <div className="space-y-3">
                {/* Author Info block */}
                <div className="flex gap-3 items-start">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="h-12 w-12 rounded-full object-cover border border-[#E5E7EB]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900">{r.name}</h3>
                    <p className="text-[11px] text-zinc-500 font-mono flex items-center gap-1 mt-0.5">
                      <Building2 className="h-3 w-3" />
                      {r.institution}
                    </p>
                  </div>
                </div>

                {/* Meta details */}
                <div className="space-y-2">
                  <span className="rounded-full bg-[#F4F4F5] border border-[#E5E7EB] px-2.5 py-0.5 text-[10px] font-mono text-zinc-500">
                    {r.field}
                  </span>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-1.5 line-clamp-2">
                    {r.bio || "Active publishing author collaborating on sequence adaptation bounds."}
                  </p>
                </div>

                {/* Metrics Row */}
                <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-400 pt-1">
                  <span className="flex items-center gap-1 text-zinc-600">
                    <Users className="h-3.5 w-3.5" />
                    <strong>{r.followers.toLocaleString()}</strong> followers
                  </span>
                  <span className="flex items-center gap-1 text-zinc-600">
                    <BookOpen className="h-3.5 w-3.5" />
                    <strong>{r.publications}</strong> publications
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex gap-2">
                <button
                  onClick={() => handleToggleFollow(r.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    r.isFollowing
                      ? "bg-[#F4F4F5] text-zinc-700 hover:bg-zinc-200"
                      : "bg-black text-white hover:bg-zinc-850"
                  }`}
                >
                  {r.isFollowing ? (
                    <>
                      <UserCheck className="h-3.5 w-3.5" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3.5 w-3.5" />
                      <span>Follow</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveChat(r)}
                  className="rounded-full border border-[#E5E7EB] bg-white p-2.5 text-zinc-600 hover:bg-[#F4F4F5] transition cursor-pointer"
                  title="Direct Message"
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Messaging Chat Sandbox Drawer (1/3 width) */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 flex flex-col h-[400px]">
          <div className="border-b border-[#E5E7EB] pb-3 flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-900 font-mono">Scholarly Direct Messenger</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>

          {activeChat ? (
            <div className="flex-1 flex flex-col justify-between mt-3 h-full">
              <div className="space-y-3">
                <div className="flex gap-2 items-center bg-[#F9F9FB] border border-[#E5E7EB] p-2 rounded-xl">
                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="h-8 w-8 rounded-full object-cover border border-[#E5E7EB]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-900">{activeChat.name}</h4>
                    <span className="text-[10px] font-mono text-zinc-400 block">{activeChat.institution}</span>
                  </div>
                </div>

                <div className="space-y-2 h-44 overflow-y-auto pr-1">
                  <p className="text-[10px] text-zinc-400 italic font-mono text-center mb-2">
                    Message channel established securely.
                  </p>
                  {(chatLog[activeChat.id] || []).map((msg, i) => (
                    <div key={i} className="flex flex-col items-end">
                      <div className="bg-black text-white rounded-xl p-2.5 text-xs max-w-full">
                        {msg}
                      </div>
                      <span className="text-[8px] font-mono text-zinc-400 mt-0.5">Delivered</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSendMessage} className="mt-2 flex gap-1.5 border-t border-[#E5E7EB] pt-2">
                <input
                  type="text"
                  placeholder={`Send message to ${activeChat.name.split(" ")[1]}...`}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 rounded-full border border-[#E5E7EB] px-3.5 py-1.5 text-xs focus:outline-none"
                />
                <button type="submit" className="p-2 rounded-full bg-black text-white hover:bg-zinc-800 cursor-pointer">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-zinc-450 p-4">
              <MessageSquare className="h-8 w-8 text-zinc-300 mb-2" />
              <p className="text-xs font-medium text-zinc-700">No active conversation.</p>
              <p className="text-[10px] text-zinc-400 max-w-xs mt-1 leading-relaxed">
                Click the message button on any investigator card in the directory to establish a chat channel.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
