"use client";

import React, { useState } from "react";
import { Folder, Plus, Calendar, Users } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "@/components/providers/AppProvider";
import { Modal } from "@/components/ui";

const ANALYTICS_DATA = [
  { name: "Jan", Citations: 4500, Papers: 12 },
  { name: "Feb", Citations: 4800, Papers: 15 },
  { name: "Mar", Citations: 5900, Papers: 18 },
  { name: "Apr", Citations: 6200, Papers: 19 },
  { name: "May", Citations: 7400, Papers: 22 },
  { name: "Jun", Citations: 8900, Papers: 25 },
  { name: "Jul", Citations: 10400, Papers: 30 },
];

export default function MyWorkspace() {
  const { projects, notes, tasks, papers, handleToggleTaskStatus, handleAddNote, handleAddProject } = useApp();

  const [activeTab, setActiveTab] = useState<"projects" | "notes" | "tasks">("projects");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const [showProjModal, setShowProjModal] = useState(false);
  const [projName, setProjName] = useState("");
  const [projDesc, setProjDesc] = useState("");

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    handleAddNote(noteTitle, noteContent);
    setNoteTitle("");
    setNoteContent("");
    setShowNoteModal(false);
  };

  const handleAddProjSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim() || !projDesc.trim()) return;
    handleAddProject(projName, projDesc);
    setProjName("");
    setProjDesc("");
    setShowProjModal(false);
  };

  return (
    <div className="space-y-6" id="my-workspace-root">
      {/* Top Banner Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Research Workspace</h1>
          <p className="text-sm text-zinc-500">Track collaborative projects, task statuses, publications, and workspace analytics.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowProjModal(true)}
            className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 cursor-pointer"
          >
            <Folder className="h-3.5 w-3.5" />
            New Project
          </button>
          <button
            onClick={() => setShowNoteModal(true)}
            className="flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            New Note
          </button>
        </div>
      </div>

      {/* Analytics Grid Section */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
          <p className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400">Total Library Citations</p>
          <p className="text-2xl font-bold font-mono text-zinc-900 mt-1">145,150</p>
          <span className="text-[10px] text-emerald-600 font-mono font-medium mt-1 inline-block">↑ 12% vs last month</span>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
          <p className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400">Saved Papers</p>
          <p className="text-2xl font-bold font-mono text-zinc-900 mt-1">
            {papers.filter((p) => p.saved).length}
          </p>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 inline-block">Across {projects.length} research nodes</span>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
          <p className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400">Completed Milestones</p>
          <p className="text-2xl font-bold font-mono text-zinc-900 mt-1">
            {tasks.filter((t) => t.status === "done").length} / {tasks.length}
          </p>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 inline-block">Active pipelines running</span>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
          <p className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400">Collaborating Authors</p>
          <p className="text-2xl font-bold font-mono text-zinc-900 mt-1">14</p>
          <span className="text-[10px] text-emerald-600 font-mono font-medium mt-1 inline-block">↑ 2 new invitations accepted</span>
        </div>
      </div>

      {/* Analytics Chart Row */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Workspace Growth & Impact Tracking</h3>
          <p className="text-xs text-zinc-500">Aggregate impact score based on connected citation indexes over the year.</p>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCitations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#18181B" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#18181B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" fontSize={10} fontFamily="monospace" stroke="#A1A1AA" tickLine={false} />
              <YAxis fontSize={10} fontFamily="monospace" stroke="#A1A1AA" tickLine={false} />
              <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #E5E7EB" }} />
              <Area type="monotone" dataKey="Citations" stroke="#000000" strokeWidth={1.5} fillOpacity={1} fill="url(#colorCitations)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Tabs Segment */}
      <div className="space-y-4">
        {/* Tab Headers */}
        <div className="flex border-b border-[#E5E7EB]">
          {[
            { id: "projects", label: "Active Projects", count: projects.length },
            { id: "notes", label: "Research Notes", count: notes.length },
            { id: "tasks", label: "Tasks & Pipelines", count: tasks.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative pb-3 px-4 text-xs font-semibold transition cursor-pointer ${
                activeTab === tab.id
                  ? "text-zinc-900"
                  : "text-zinc-400 hover:text-zinc-650"
              }`}
            >
              <span className="flex items-center gap-1.5">
                {tab.label}
                <span className={`rounded-full px-2 py-0.2 text-[10px] font-mono ${
                  activeTab === tab.id ? "bg-black text-white" : "bg-zinc-100 text-zinc-500"
                }`}>
                  {tab.count}
                </span>
              </span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        {activeTab === "projects" && (
          <div className="grid gap-4 sm:grid-cols-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-4 hover:shadow-xs hover:border-zinc-300 transition flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-450">ACTIVE PROJECT</span>
                    <span className="text-[11px] font-mono font-bold text-zinc-700">{proj.progress}%</span>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900">{proj.name}</h3>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{proj.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{proj.members.length} collaborators</span>
                  </div>
                  <span>Active {proj.lastActive}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-4 space-y-3 hover:border-zinc-300 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-450">LATEST LOG</span>
                  <span className="text-[10px] text-zinc-400 font-mono">{note.updatedAt}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">{note.title}</h4>
                  <p className="text-xs text-zinc-600 mt-1 line-clamp-3 leading-relaxed whitespace-pre-line">
                    {note.content}
                  </p>
                </div>
                <div className="border-t border-[#E5E7EB] pt-2 text-[10px] text-zinc-400 font-mono">
                  By {note.author}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white divide-y divide-[#E5E7EB]">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3.5 hover:bg-zinc-50 transition">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.status === "done"}
                    onChange={() => handleToggleTaskStatus(task.id)}
                    className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-950 cursor-pointer"
                  />
                  <div>
                    <span className={`text-xs font-medium text-zinc-800 ${task.status === "done" ? "line-through text-zinc-400" : ""}`}>
                      {task.title}
                    </span>
                    <span className="ml-2 rounded-full bg-zinc-100 px-1.5 py-0.2 text-[9px] font-mono text-zinc-500">
                      Project node {task.projectId}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400">
                  <div className="flex items-center gap-1 text-zinc-500">
                    <Calendar className="h-3 w-3" />
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <span className="rounded bg-zinc-50 border border-[#E5E7EB] px-2 py-0.5 text-zinc-600 font-medium">
                    {task.assignee}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showNoteModal} onClose={() => setShowNoteModal(false)} title="Create New Workspace Note">
        <form onSubmit={handleAddNoteSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Note Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-xs focus:border-zinc-400 focus:outline-none"
            required
            aria-label="Note title"
          />
          <textarea
            placeholder="Log equations, methodologies, summaries..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-xs focus:border-zinc-400 focus:outline-none"
            required
            aria-label="Note content"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowNoteModal(false)}
              className="rounded-full border border-[#E5E7EB] px-4 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-black px-4 py-1.5 text-xs text-white hover:bg-zinc-800 cursor-pointer"
            >
              Save Note
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showProjModal} onClose={() => setShowProjModal(false)} title="Create Collaborative Node">
        <form onSubmit={handleAddProjSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Project Node Name"
            value={projName}
            onChange={(e) => setProjName(e.target.value)}
            className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-xs focus:border-zinc-400 focus:outline-none"
            required
            aria-label="Project name"
          />
          <textarea
            placeholder="Project focus, literature guidelines, objectives..."
            value={projDesc}
            onChange={(e) => setProjDesc(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-xs focus:border-zinc-400 focus:outline-none"
            required
            aria-label="Project description"
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowProjModal(false)}
              className="rounded-full border border-[#E5E7EB] px-4 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-black px-4 py-1.5 text-xs text-white hover:bg-zinc-800 cursor-pointer"
            >
              Initialize Project
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
