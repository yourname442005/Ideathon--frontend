"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import {
  Paper,
  Project,
  Note,
  Task,
  Collection,
  Researcher,
  FeedItem,
  NotificationItem,
  ChatMessage,
} from "@/lib/types";
import {
  INITIAL_PAPERS,
  INITIAL_PROJECTS,
  INITIAL_NOTES,
  INITIAL_TASKS,
  INITIAL_COLLECTIONS,
  INITIAL_RESEARCHERS,
  INITIAL_FEED,
  INITIAL_NOTIFICATIONS,
} from "@/lib/data";

interface AppState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  globalSearchValue: string;
  setGlobalSearchValue: (val: string) => void;
  papers: Paper[];
  projects: Project[];
  notes: Note[];
  tasks: Task[];
  collections: Collection[];
  researchers: Researcher[];
  feedItems: FeedItem[];
  notifications: NotificationItem[];
  activeProject: Project | null;
  setActiveProject: (proj: Project | null) => void;
  previewPaper: Paper | null;
  setPreviewPaper: (paper: Paper | null) => void;
  handleToggleSave: (paperId: string) => void;
  handleToggleBookmark: (paperId: string) => void;
  handleToggleTaskStatus: (taskId: string) => void;
  handleAddNote: (title: string, content: string) => void;
  handleAddProject: (name: string, description: string) => void;
  handleAddCollection: (
    name: string,
    description: string,
    isPinned: boolean,
    isShared: boolean,
    color: string
  ) => void;
  handleDeleteCollection: (id: string) => void;
  handleAddFeedPost: (title: string, content: string) => void;
  handleToggleFollow: (id: string) => void;
  handleMarkAllRead: () => void;
  handleMarkRead: (id: string) => void;
  handleClearNotification: (id: string) => void;
  handleAddPaperToCollection: (paperId: string, collectionId: string) => void;
  handleGlobalSearchKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handlePublishPaper: (paper: Paper) => void;
  handleAddNotification: (sender: string, content: string) => void;
  unreadNotificationsCount: number;
}

const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<string>("feed");
  const [globalSearchValue, setGlobalSearchValue] = useState("");
  const [papers, setPapers] = useState<Paper[]>(INITIAL_PAPERS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [researchers, setResearchers] = useState<Researcher[]>(INITIAL_RESEARCHERS);
  const [feedItems, setFeedItems] = useState<FeedItem[]>(INITIAL_FEED);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [previewPaper, setPreviewPaper] = useState<Paper | null>(null);

  const handleToggleSave = useCallback((paperId: string) => {
    setPapers((prev) =>
      prev.map((p) => {
        if (p.id === paperId) {
          const isSaving = !p.saved;
          if (isSaving) {
            setCollections((colls) =>
              colls.map((c, idx) => (idx === 0 ? { ...c, papersCount: c.papersCount + 1 } : c))
            );
          } else {
            setCollections((colls) =>
              colls.map((c, idx) => (idx === 0 ? { ...c, papersCount: Math.max(0, c.papersCount - 1) } : c))
            );
          }
          return { ...p, saved: isSaving };
        }
        return p;
      })
    );
  }, []);

  const handleToggleBookmark = useCallback((paperId: string) => {
    setPapers((prev) =>
      prev.map((p) => (p.id === paperId ? { ...p, bookmarked: !p.bookmarked } : p))
    );
  }, []);

  const handleToggleTaskStatus = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: t.status === "done" ? "todo" : "done" }
          : t
      )
    );
  }, []);

  const handleAddNote = useCallback((title: string, content: string) => {
    const newNote: Note = {
      id: `note_${Date.now()}`,
      title,
      content,
      author: "You (Principal PI)",
      updatedAt: "Just now",
    };
    setNotes((prev) => [newNote, ...prev]);
  }, []);

  const handleAddProject = useCallback((name: string, description: string) => {
    const newProj: Project = {
      id: `pj_${Date.now()}`,
      name,
      description,
      progress: 0,
      members: ["You"],
      papersCount: 0,
      tasksCount: 0,
      lastActive: "Just now",
    };
    setProjects((prev) => [...prev, newProj]);
  }, []);

  const handleAddCollection = useCallback(
    (name: string, description: string, isPinned: boolean, isShared: boolean, color: string) => {
      const newCol: Collection = {
        id: `col_${Date.now()}`,
        name,
        description,
        papersCount: 0,
        isPinned,
        isShared,
        color,
      };
      setCollections((prev) => [...prev, newCol]);
    },
    []
  );

  const handleDeleteCollection = useCallback((id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleAddFeedPost = useCallback((title: string, content: string) => {
    const newPost: FeedItem = {
      id: `f_${Date.now()}`,
      author: {
        name: "You (Principal PI)",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        institution: "Stanford University",
      },
      action: "published a workspace discussion note",
      time: "Just now",
      title,
      content,
      likes: 0,
      comments: [],
    };
    setFeedItems((prev) => [newPost, ...prev]);
  }, []);

  const handleToggleFollow = useCallback((id: string) => {
    setResearchers((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFollowing: !r.isFollowing } : r))
    );
  }, []);

  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const handleMarkRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const handleClearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handlePublishPaper = useCallback((paper: Paper) => {
    setPapers((prev) => [paper, ...prev]);
  }, []);

  const handleAddNotification = useCallback((sender: string, content: string) => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      type: "mention",
      sender,
      content,
      time: "Just now",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const handleAddPaperToCollection = useCallback((paperId: string, collectionId: string) => {
    setCollections((prev) =>
      prev.map((c) => (c.id === collectionId ? { ...c, papersCount: c.papersCount + 1 } : c))
    );
  }, []);

  const handleGlobalSearchKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && globalSearchValue.trim()) {
        setActiveTab("discover");
      }
    },
    [globalSearchValue]
  );

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        globalSearchValue,
        setGlobalSearchValue,
        papers,
        projects,
        notes,
        tasks,
        collections,
        researchers,
        feedItems,
        notifications,
        activeProject,
        setActiveProject,
        previewPaper,
        setPreviewPaper,
        handleToggleSave,
        handleToggleBookmark,
        handleToggleTaskStatus,
        handleAddNote,
        handleAddProject,
        handleAddCollection,
        handleDeleteCollection,
        handleAddFeedPost,
        handleToggleFollow,
        handleMarkAllRead,
        handleMarkRead,
        handleClearNotification,
        handleAddPaperToCollection,
        handleGlobalSearchKeyPress,
        handlePublishPaper,
        handleAddNotification,
        unreadNotificationsCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
