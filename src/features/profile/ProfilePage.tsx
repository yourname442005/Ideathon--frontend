"use client";

import React, { useState } from "react";
import { Edit3, Building2, MapPin, Award, Check } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

export default function ProfileView() {
  const { papers, projects } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Dr. Alex Rivera");
  const [title, setTitle] = useState("Principal Research Lead");
  const [institution, setInstitution] = useState("Stanford University AI Labs");
  const [location, setLocation] = useState("Palo Alto, CA");
  const [bio, setBio] = useState(
    "Principal investigator focused on sequence transduction optimization models, parameter-efficient adapters, and direct alignment of human preferences."
  );
  const [interests, setInterests] = useState(["Transformers", "NLP", "PEFT adapters", "Direct Preference Optimization"]);
  const [newInterest, setNewInterest] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddInterest = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newInterest.trim()) {
      e.preventDefault();
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (idx: number) => {
    setInterests(interests.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6" id="profile-view-root">
      {/* Cover Image & Profile Header card */}
      <div className="relative rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs">
        {/* Cover Image placeholder */}
        <div className="h-32 bg-gradient-to-r from-zinc-900 to-black relative">
          <div className="absolute inset-0 bg-radial-to-t from-black/10 to-transparent"></div>
        </div>

        {/* Profile Details Block */}
        <div className="px-6 pb-6 relative">
          {/* Avatar overlap */}
          <div className="absolute -top-12 left-6 h-24 w-24 rounded-full border-4 border-white bg-zinc-100 overflow-hidden shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
              alt={name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Action Row */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-xs font-semibold text-zinc-750 hover:bg-[#F4F4F5] cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Core Info */}
          <div className="mt-4 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-zinc-900 tracking-tight">{name}</h1>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[9px] font-mono text-blue-700 font-bold uppercase">
                  Verified Scholar
                </span>
              </div>
              <p className="text-xs font-medium text-zinc-500">{title} @ {institution}</p>
              <div className="flex flex-wrap gap-4 text-[11px] font-mono text-zinc-400 pt-1.5">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  {institution}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {location}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed max-w-2xl">{bio}</p>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-700 font-semibold flex items-center gap-2">
          <Check className="h-4 w-4" /> Profile updates synchronized successfully!
        </div>
      )}

      {/* Main Grid: Edit form vs. Analytics Stats & Publications */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {isEditing ? (
            <form onSubmit={handleSave} className="rounded-2xl border border-[#E5E7EB] bg-[#F9F9FB] p-5 space-y-4">
              <h3 className="text-sm font-semibold text-zinc-900 border-b border-[#E5E7EB] pb-2">Modify Scholarly Bio</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-600">Full Scholar Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs focus:border-zinc-350 focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-600">Department Role / Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs focus:border-zinc-350 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-600">Institution Affiliation</label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs focus:border-zinc-350 focus:outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-zinc-600">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs focus:border-zinc-350 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-zinc-600">Scholar Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-xs focus:border-zinc-350 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-zinc-600 block">Edit Research Interests (Press enter to add)</label>
                <div className="flex flex-wrap gap-1.5 p-2 border border-[#E5E7EB] rounded-lg bg-white">
                  {interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-[#F4F4F5] border border-[#E5E7EB] px-2.5 py-0.5 text-[10px] font-mono text-zinc-700 flex items-center gap-1"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(idx)}
                        className="text-red-500 hover:text-red-700 font-bold ml-1 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Add tag..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={handleAddInterest}
                    className="bg-transparent focus:outline-none text-[10px] font-mono min-w-[100px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-full border border-[#E5E7EB] px-4 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 cursor-pointer"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-black px-4 py-1.5 text-xs text-white hover:bg-zinc-850 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Linked Publications list */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-900 border-b border-[#E5E7EB] pb-2">
                  My Active Co-Authored Publications ({papers.slice(0, 3).length})
                </h3>
                <div className="space-y-3">
                  {papers.slice(0, 3).map((paper) => (
                    <div key={paper.id} className="rounded-2xl border border-[#E5E7EB] bg-white p-4 space-y-2 hover:shadow-xs transition">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span>CO-AUTHORED • {paper.year}</span>
                        <span>DOI: {paper.doi}</span>
                      </div>
                      <h4 className="text-xs font-bold text-zinc-950">{paper.title}</h4>
                      <p className="text-[11px] text-zinc-500">Published in: {paper.journal || "International NeurIPS Core"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Linked Projects */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-zinc-900 border-b border-[#E5E7EB] pb-2">
                  My Collaborative Nodes ({projects.length})
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {projects.map((proj) => (
                    <div key={proj.id} className="rounded-2xl border border-[#E5E7EB] bg-white p-4 space-y-2 hover:shadow-xs transition">
                      <h4 className="text-xs font-bold text-zinc-900">{proj.name}</h4>
                      <p className="text-[11px] text-zinc-500 line-clamp-2">{proj.description}</p>
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
                        <span>Milestone: {proj.progress}%</span>
                        <span>{proj.members.length} peers</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column Metrics (1/3 width) */}
        <div className="space-y-6">
          {/* Metrics card */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 space-y-4">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">Scholarly Impact Score</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-[#F9F9FB] p-3 text-center border border-[#E5E7EB]">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">H-INDEX</span>
                <p className="text-2xl font-bold text-zinc-900 mt-0.5">38</p>
              </div>
              <div className="rounded-xl bg-[#F9F9FB] p-3 text-center border border-[#E5E7EB]">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">CITATIONS</span>
                <p className="text-2xl font-bold text-zinc-900 mt-0.5">14,240</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase block font-medium">Research Fields</span>
              <div className="flex flex-wrap gap-1.5">
                {interests.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#F4F4F5] border border-[#E5E7EB] px-2.5 py-0.5 text-[10px] font-mono text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Connected Scholar references */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 space-y-3">
            <h4 className="text-xs font-semibold text-zinc-900">Co-Authors & Peer Affiliation</h4>
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                  className="h-8 w-8 rounded-full object-cover border border-[#E5E7EB]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="text-xs font-bold text-zinc-900">Dr. Sarah Chen</h5>
                  <span className="text-[10px] font-mono text-zinc-400">Stanford AI Labs PI</span>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
                  className="h-8 w-8 rounded-full object-cover border border-[#E5E7EB]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="text-xs font-bold text-zinc-900">Dr. James Vance</h5>
                  <span className="text-[10px] font-mono text-zinc-400">MIT Department Lead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
