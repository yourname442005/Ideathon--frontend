"use client";

import React, { useState } from "react";
import { Bell, CheckCheck, Trash2, MailOpen, UserPlus, FileText, Calendar, AlertCircle } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

export default function NotificationsView() {
  const { notifications, handleMarkAllRead, handleMarkRead, handleClearNotification } = useApp();

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayed = notifications.filter((n) => filter === "all" || !n.read);

  return (
    <div className="space-y-6" id="notifications-view-root">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Research Notifications</h1>
          <p className="text-sm text-zinc-500">Monitor department mentions, workspace invites, and citation index alerts.</p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 cursor-pointer"
          >
            <CheckCheck className="h-4 w-4" />
            Mark All Read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[#E5E7EB] pb-2">
        <button
          onClick={() => setFilter("all")}
          className={`relative pb-2 px-3 text-xs font-semibold transition cursor-pointer ${
            filter === "all" ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-650"
          }`}
        >
          All Notifications ({notifications.length})
          {filter === "all" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`relative pb-2 px-3 text-xs font-semibold transition cursor-pointer ${
            filter === "unread" ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-650"
          }`}
        >
          Unread ({unreadCount})
          {filter === "unread" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {displayed.length > 0 ? (
          displayed.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border p-4 flex items-start gap-4 transition-all ${
                item.read ? "bg-white border-[#E5E7EB]" : "bg-[#F9F9FB] border-[#E5E7EB] shadow-xs"
              }`}
            >
              {/* Categorized Icon Indicators */}
              <div className="shrink-0 mt-0.5">
                {item.type === "mention" && (
                  <div className="h-8 w-8 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center border border-violet-100">
                    <FileText className="h-4 w-4" />
                  </div>
                )}
                {item.type === "invite" && (
                  <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                    <UserPlus className="h-4 w-4" />
                  </div>
                )}
                {item.type === "paper_update" && (
                  <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                    <Calendar className="h-4 w-4" />
                  </div>
                )}
                {item.type === "comment" && (
                  <div className="h-8 w-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Notification Body */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-zinc-900">{item.sender}</span>
                  <span className="text-[10px] font-mono text-zinc-400">{item.time}</span>
                </div>
                <p className="text-xs text-zinc-600">{item.content}</p>

                {/* Accept invite mock actions */}
                {item.type === "invite" && (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleClearNotification(item.id)}
                      className="rounded-full bg-black text-white px-4 py-1 text-[10px] font-semibold hover:bg-zinc-850 cursor-pointer"
                    >
                      Accept Workspace Invite
                    </button>
                    <button
                      onClick={() => handleClearNotification(item.id)}
                      className="rounded-full border border-[#E5E7EB] bg-white text-zinc-650 px-4 py-1 text-[10px] hover:bg-zinc-50 cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons (Mark Read / Clear) */}
              <div className="flex items-center gap-1 shrink-0 self-center">
                {!item.read && (
                  <button
                    onClick={() => handleMarkRead(item.id)}
                    className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 transition cursor-pointer"
                    title="Mark Read"
                  >
                    <MailOpen className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => handleClearNotification(item.id)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-zinc-400 hover:text-red-600 transition cursor-pointer"
                  title="Clear Notification"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white py-16 text-center">
            <Bell className="h-10 w-10 text-zinc-300 mb-3" />
            <h3 className="text-sm font-semibold text-zinc-900">No notifications found</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Your academic network is fully sync&apos;d. Check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
