"use client";

import React from "react";
import { Bell, Search } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { AVATARS, USER } from "@/lib/constants";

export default function Header() {
  const {
    globalSearchValue,
    setGlobalSearchValue,
    handleGlobalSearchKeyPress,
    setActiveTab,
    unreadNotificationsCount,
  } = useApp();

  return (
    <header className="h-16 border-b border-[#E5E7EB] bg-white flex items-center justify-between px-6 shrink-0 z-10" role="banner">
      <div className="relative w-96">
        <Search className="absolute top-2.5 left-3 h-4 w-4 text-[#A1A1AA]" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search library, discover papers... (Press Enter)"
          value={globalSearchValue}
          onChange={(e) => setGlobalSearchValue(e.target.value)}
          onKeyDown={handleGlobalSearchKeyPress}
          className="w-full rounded-lg border border-[#E5E7EB] bg-[#F4F4F5] pl-9 pr-4 py-1.5 text-xs text-[#1A1A1A] placeholder-[#A1A1AA] transition focus:border-zinc-300 focus:bg-white focus:outline-none"
          aria-label="Search library and discover papers"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveTab("notifications")}
          className="relative p-2 rounded-lg hover:bg-[#F1F5F9] text-[#52525B] hover:text-black transition"
          aria-label={`Notifications${unreadNotificationsCount > 0 ? ` (${unreadNotificationsCount} unread)` : ''}`}
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className="flex items-center gap-2.5 hover:opacity-85 transition text-left"
          aria-label="View researcher profile"
        >
          <img
            src={AVATARS.currentUser}
            alt={`${USER.name} avatar`}
            className="h-8 w-8 rounded-full object-cover border border-[#E5E7EB]"
            referrerPolicy="no-referrer"
          />
          <div className="hidden sm:block">
            <span className="text-xs font-bold text-zinc-900 block leading-none">Dr. Rivera</span>
            <span className="text-[9px] text-zinc-400 font-mono block leading-none mt-1">{USER.roleShort}</span>
          </div>
        </button>
      </div>
    </header>
  );
}
