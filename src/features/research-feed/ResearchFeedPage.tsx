"use client";

import React, { useState } from "react";
import { ThumbsUp, MessageSquare, Sparkles, Send, Share2, Bookmark } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

export default function ResearchFeed() {
  const { feedItems, papers, handleToggleSave, setPreviewPaper, handleAddFeedPost } = useApp();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showPublisher, setShowPublisher] = useState(false);

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    handleAddFeedPost(newTitle, newContent);
    setNewTitle("");
    setNewContent("");
    setShowPublisher(false);
  };

  return (
    <div className="space-y-6" id="research-feed-root">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Research Feed</h1>
          <p className="text-sm text-zinc-500">Real-time discussion notes and active publications from your academic network.</p>
        </div>
        <button
          onClick={() => setShowPublisher(!showPublisher)}
          className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 cursor-pointer"
          id="btn-new-discussion"
        >
          <Sparkles className="h-4 w-4 text-amber-400" />
          Share Discussion
        </button>
      </div>

      {showPublisher && (
        <form
          onSubmit={handleSubmitPost}
          className="rounded-2xl border border-[#E5E7EB] bg-[#F9F9FB] p-5 shadow-xs transition-all"
        >
          <h3 className="text-sm font-medium text-zinc-900 mb-3">Publish New Discussion Note</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Topic or Paper Title (e.g. Analysis of PEFT on 70B parameter models)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-zinc-300 focus:outline-none"
              required
            />
            <textarea
              placeholder="What insights or questions would you like to share with fellow researchers?"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm placeholder-zinc-400 focus:border-zinc-300 focus:outline-none"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPublisher(false)}
                className="rounded-full border border-[#E5E7EB] px-4 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full bg-black px-4 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                Publish
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {feedItems.map((item) => {
          const associatedPaper = papers.find((p) => p.id === item.paperId);

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-shadow hover:shadow-xs"
              id={`feed-item-${item.id}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                     src={item.author.avatar}
                     alt={item.author.name}
                     className="h-10 w-10 rounded-full object-cover border border-[#E5E7EB]"
                     referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#1A1A1A]">{item.author.name}</span>
                      <span className="text-xs text-zinc-400 font-mono">({item.author.institution})</span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      {item.action} • {item.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[11px] font-mono text-[#52525B]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Verified Peer
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-base font-semibold text-[#1A1A1A] tracking-tight leading-snug">
                  {item.title}
                </h2>
                <p className="text-sm text-[#52525B] leading-relaxed whitespace-pre-line">
                  {item.content}
                </p>
              </div>

              {associatedPaper && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-[#F9F9FB] p-3">
                  <div className="space-y-1 max-w-[80%]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Linked Publication</span>
                    <h4 className="text-xs font-semibold text-zinc-800 line-clamp-1">{associatedPaper.title}</h4>
                    <p className="text-[11px] text-zinc-500">{associatedPaper.authors} ({associatedPaper.year})</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setPreviewPaper(associatedPaper)}
                      className="flex items-center gap-1 rounded-lg bg-white border border-[#E5E7EB] px-2.5 py-1 text-xs text-[#52525B] hover:bg-zinc-100 cursor-pointer"
                      title="Read Abstract and Summarize"
                    >
                      <Sparkles className="h-3 w-3 text-violet-500" />
                      AI Summary
                    </button>
                    <button
                      onClick={() => handleToggleSave(associatedPaper.id)}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        associatedPaper.saved
                          ? "bg-amber-50 border-amber-200 text-amber-600"
                          : "bg-white border-[#E5E7EB] text-zinc-400 hover:text-zinc-600"
                      }`}
                      title={associatedPaper.saved ? "Saved in Library" : "Save Paper"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-5 flex items-center justify-between border-t border-[#E5E7EB] pt-3 text-xs text-[#52525B]">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 hover:text-black transition cursor-pointer">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{item.likes} Likes</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-black transition cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    <span>{item.comments.length} Comments</span>
                  </button>
                </div>
                <button className="flex items-center gap-1 hover:text-black transition cursor-pointer">
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share Citation</span>
                </button>
              </div>

              {item.comments.length > 0 && (
                <div className="mt-4 space-y-3 bg-[#F9F9FB] rounded-xl p-3 border border-[#E5E7EB]">
                  {item.comments.map((comment, idx) => (
                    <div key={idx} className="flex gap-2.5 text-xs text-[#52525B]">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="h-6 w-6 rounded-full object-cover border border-[#E5E7EB]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 bg-white border border-[#E5E7EB] rounded-xl p-2.5">
                        <span className="font-semibold text-[#1A1A1A] block mb-0.5">{comment.author}</span>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
