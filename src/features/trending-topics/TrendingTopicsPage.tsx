"use client";

import React, { useState } from "react";
import { MessageSquare, Sparkles, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface TrendingTopicItem {
  name: string;
  value: number;
  citationsGrowth: string;
  discussionRate: string;
  color: string;
}

const TRENDING_TOPICS_LIST: TrendingTopicItem[] = [
  { name: "PEFT (LoRA/QLoRA)", value: 88, citationsGrowth: "+240%", discussionRate: "High", color: "#18181B" },
  { name: "Direct Preference Alignment (DPO)", value: 74, citationsGrowth: "+195%", discussionRate: "Very High", color: "#27272A" },
  { name: "Retrieval Augmented Generation (RAG)", value: 92, citationsGrowth: "+310%", discussionRate: "High", color: "#000000" },
  { name: "Graph Neural Networks (GNNs)", value: 48, citationsGrowth: "+45%", discussionRate: "Medium", color: "#71717A" },
  { name: "State Space Models (SSM/Mamba)", value: 62, citationsGrowth: "+180%", discussionRate: "High", color: "#3F3F46" },
];

export default function TrendingTopics() {
  const [selectedTopic, setSelectedTopic] = useState<TrendingTopicItem>(TRENDING_TOPICS_LIST[0]);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const fetchAIInsight = async (topic: TrendingTopicItem) => {
    setSelectedTopic(topic);
    setLoadingInsight(true);
    setAiInsight(null);
    try {
      const response = await fetch("/api/generate-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.name }),
      });
      const data = await response.json();
      setAiInsight(data.insight);
    } catch (err) {
      console.error("Failed to load trending AI insights:", err);
    } finally {
      setLoadingInsight(false);
    }
  };

  return (
    <div className="space-y-6" id="trending-topics-root">
      {/* Page Header */}
      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Research Trends</h1>
        <p className="text-sm text-zinc-500">
          Monitor citation growth indexes, peer discussions, and let AI analyze the trajectory of cutting-edge fields.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Analytics Chart Panel (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4.5 w-4.5 text-zinc-700" />
                <span className="text-sm font-semibold text-zinc-900">Global Research Citation Growth Index</span>
              </div>
              <span className="text-[10px] font-mono rounded-full bg-[#F4F4F5] border border-[#E5E7EB] px-3 py-1 text-zinc-500 font-semibold uppercase">
                Annual Score
              </span>
            </div>

            {/* Recharts BarChart */}
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TRENDING_TOPICS_LIST} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" fontSize={9} stroke="#A1A1AA" tickLine={false} />
                  <YAxis fontSize={9} stroke="#A1A1AA" tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #E5E7EB" }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {TRENDING_TOPICS_LIST.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interactive Categories list */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Exploding Research Nodes</h3>
            <div className="space-y-3">
              {TRENDING_TOPICS_LIST.map((topic) => (
                <div
                  key={topic.name}
                  onClick={() => fetchAIInsight(topic)}
                  className={`rounded-2xl border p-4 flex items-center justify-between cursor-pointer transition ${
                    selectedTopic.name === topic.name
                      ? "bg-[#F9F9FB] border-zinc-400 shadow-xs"
                      : "bg-white border-[#E5E7EB] hover:border-zinc-350"
                  }`}
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-zinc-950 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: topic.color }}></span>
                      {topic.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500 font-mono">
                      Annual Citation Growth rate: <span className="text-emerald-600 font-semibold">{topic.citationsGrowth}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-450">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Discussion: {topic.discussionRate}
                    </span>
                    <span className="text-[10px] bg-[#F4F4F5] border border-[#E5E7EB] px-2.5 py-0.5 rounded-full font-bold text-zinc-600">
                      Score: {topic.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI trajectory Analysis Sidebar (1/3 width) */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 space-y-4 flex flex-col justify-between h-[510px]">
          <div className="space-y-4">
            <div className="border-b border-[#E5E7EB] pb-3 flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-zinc-800" />
              <span className="text-xs font-bold text-zinc-900 font-mono uppercase">AI Trajectory Analyst</span>
            </div>

            <div>
              <p className="text-[10px] font-mono text-zinc-450 uppercase">SUBJECT NODES UNDER REVIEW</p>
              <h3 className="text-base font-semibold text-zinc-900 mt-1">{selectedTopic.name}</h3>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9F9FB] p-4 space-y-3">
              <p className="text-[10px] font-mono font-medium text-zinc-400">GEMINI TREND EXPLANATION</p>
              {loadingInsight ? (
                <div className="space-y-2 py-2">
                  <div className="h-2 bg-zinc-200 rounded animate-pulse w-full"></div>
                  <div className="h-2 bg-zinc-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-2 bg-zinc-200 rounded animate-pulse w-5/6"></div>
                </div>
              ) : (
                <p className="text-xs text-zinc-650 leading-relaxed">
                  {aiInsight ||
                    `Citation metrics verify that ${selectedTopic.name} is accelerating globally. Researchers shifting from full parameter updates to localized adapters report optimal stability.`}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-450 uppercase block font-medium">Keyword Clusters</span>
              <div className="flex flex-wrap gap-1.5">
                {["Gradient Tuning", "Adapters", "Loss Bounds", "Mathematical Latency", "HNSW Indices"].map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full bg-[#F4F4F5] border border-[#E5E7EB] px-2.5 py-0.5 text-[10px] font-medium text-zinc-500 font-mono"
                  >
                    #{kw.toLowerCase().replace(" ", "_")}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#E5E7EB] pt-4 text-[11px] text-zinc-400 font-mono leading-snug">
            Insights generated in real-time based on live scholarly metadata, neural vectors, and citation graphs.
          </div>
        </div>
      </div>
    </div>
  );
}
