"use client";

import React from "react";
import {
  Rss,
  Compass,
  Sparkles,
  Layers,
  Users2,
  Bookmark,
  FolderHeart,
  TrendingUp,
  Bell,
  UserCircle,
  Award,
  LucideIcon,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { AVATARS, USER } from "@/lib/constants";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  count?: number;
  showDot?: boolean;
}

function NavItemButton({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
        active ? "bg-black text-white shadow-xs" : "text-[#52525B] hover:bg-[#F1F5F9] hover:text-black"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{item.label}</span>
      </span>
      {item.badge && (
        <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${active ? "bg-zinc-800 text-white" : "bg-violet-50 text-violet-700"}`}>
          {item.badge}
        </span>
      )}
      {item.count !== undefined && !item.showDot && (
        <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${active ? "bg-zinc-800 text-white" : "bg-zinc-100 text-[#52525B]"}`}>
          {item.count}
        </span>
      )}
      {item.showDot && item.count !== undefined && item.count > 0 && (
        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" aria-label={`${item.count} unread`} />
      )}
    </button>
  );
}

function NavSection({ title, items, activeTab, onNav }: {
  title: string;
  items: NavItem[];
  activeTab: string;
  onNav: (id: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <p className="px-2 text-[10px] font-bold font-mono text-zinc-400 uppercase tracking-widest">{title}</p>
      {items.map((item) => (
        <NavItemButton
          key={item.id}
          item={item}
          active={activeTab === item.id}
          onClick={() => onNav(item.id)}
        />
      ))}
    </div>
  );
}

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    setPreviewPaper,
    papers,
    collections,
    unreadNotificationsCount,
  } = useApp();

  const handleNav = (id: string) => {
    setActiveTab(id);
    setPreviewPaper(null);
  };

  const mainItems: NavItem[] = [
    { id: "feed", label: "Research Feed", icon: Rss },
    { id: "discover", label: "Discover Papers", icon: Compass },
    { id: "ai-search", label: "AI Semantic Search", icon: Sparkles, badge: "AI" },
  ];

  const workspaceItems: NavItem[] = [
    { id: "workspace", label: "My Workspace", icon: Layers },
    { id: "collab", label: "Collaborative Research", icon: Users2 },
    { id: "publish", label: "Publish Papers", icon: Award },
    { id: "saved", label: "Saved Papers", icon: Bookmark, count: papers.filter((p) => p.saved).length },
    { id: "collections", label: "Collections", icon: FolderHeart, count: collections.length },
  ];

  const socialItems: NavItem[] = [
    { id: "researchers", label: "Following Researchers", icon: Users2 },
    { id: "trending", label: "Trending Topics", icon: TrendingUp },
    { id: "notifications", label: "Notifications", icon: Bell, count: unreadNotificationsCount, showDot: true },
    { id: "profile", label: "Profile", icon: UserCircle },
  ];

  return (
    <aside className="w-64 border-r border-[#E5E7EB] bg-[#F9F9FB] flex flex-col justify-between h-full select-none shrink-0" role="navigation" aria-label="Main navigation">
      <div className="space-y-6 p-5">
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black text-white font-mono font-bold text-sm tracking-tighter" aria-hidden="true">
            S
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold font-mono tracking-tight text-zinc-900 block leading-none">SEMANTIC</span>
            <span className="text-[10px] text-zinc-400 font-semibold block leading-none uppercase tracking-widest">Workspace</span>
          </div>
        </div>

        <div className="space-y-5">
          <NavSection title="Main" items={mainItems} activeTab={activeTab} onNav={handleNav} />
          <NavSection title="Workspace" items={workspaceItems} activeTab={activeTab} onNav={handleNav} />
          <NavSection title="Social" items={socialItems} activeTab={activeTab} onNav={handleNav} />
        </div>
      </div>

      <div className="p-4 border-t border-[#E5E7EB] flex items-center gap-3">
        <img
          src={AVATARS.currentUser}
          alt={`${USER.name} avatar`}
          className="h-9 w-9 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold text-zinc-900 block leading-tight truncate">{USER.name}</span>
          <span className="text-[10px] font-mono text-zinc-400 block leading-tight truncate">{USER.shortInstitution}</span>
        </div>
      </div>
    </aside>
  );
}
