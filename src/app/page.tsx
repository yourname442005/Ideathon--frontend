"use client";

import React from "react";
import { AppProvider, useApp } from "@/components/providers/AppProvider";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import RightSidebar from "@/components/layout/RightSidebar";
import PaperPreviewDrawer from "@/components/overlays/PaperPreviewDrawer";

import { ResearchFeedPage } from "@/features/research-feed";
import { DiscoverPapersPage } from "@/features/discover-papers";
import { AISearchPage } from "@/features/ai-search";
import { WorkspacePage } from "@/features/workspace";
import { CollaborativeResearchPage } from "@/features/collaborative-research";
import { SavedPapersPage } from "@/features/saved-papers";
import { CollectionsPage } from "@/features/collections";
import { PublishPaperPage } from "@/features/publish-paper";
import { ResearchersPage } from "@/features/researchers";
import { TrendingTopicsPage } from "@/features/trending-topics";
import { NotificationsPage } from "@/features/notifications";
import { ProfilePage } from "@/features/profile";

function AppContent() {
  const { activeTab, previewPaper, setPreviewPaper } = useApp();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-[#1A1A1A]" id="main-app-container">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
        <Header />

        <main className="flex-1 flex overflow-hidden" role="main">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === "feed" && <ResearchFeedPage />}
            {activeTab === "discover" && <DiscoverPapersPage />}
            {activeTab === "ai-search" && <AISearchPage />}
            {activeTab === "workspace" && <WorkspacePage />}
            {activeTab === "collab" && <CollaborativeResearchPage />}
            {activeTab === "saved" && <SavedPapersPage />}
            {activeTab === "collections" && <CollectionsPage />}
            {activeTab === "publish" && <PublishPaperPage />}
            {activeTab === "researchers" && <ResearchersPage />}
            {activeTab === "trending" && <TrendingTopicsPage />}
            {activeTab === "notifications" && <NotificationsPage />}
            {activeTab === "profile" && <ProfilePage />}
          </div>

          <RightSidebar />
        </main>
      </div>

      {previewPaper && (
        <PaperPreviewDrawer
          paper={previewPaper}
          onClose={() => setPreviewPaper(null)}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
