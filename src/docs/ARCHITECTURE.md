# Architecture Documentation

## System Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                          Next.js 15 App Router                           │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                         Root Layout                                │  │
│  │  ┌──────────────────────────────────────────────────────────────┐  │  │
│  │  │                     ToastProvider                             │  │  │
│  │  │  ┌────────────────────────────────────────────────────────┐  │  │  │
│  │  │  │                  AppProvider (Context)                  │  │  │  │
│  │  │  │                                                        │  │  │  │
│  │  │  │  State: activeTab, papers, projects, notes, tasks,     │  │  │  │
│  │  │  │         collections, researchers, feedItems,            │  │  │  │
│  │  │  │         notifications, activeProject, previewPaper      │  │  │  │
│  │  │  │                                                        │  │  │  │
│  │  │  │  ┌──────────────────────────────────────────────────┐  │  │  │  │
│  │  │  │  │              AppContent (page.tsx)                │  │  │  │  │
│  │  │  │  │                                                  │  │  │  │  │
│  │  │  │  │  ┌──────────┐  ┌────────────────┐  ┌──────────┐ │  │  │  │  │
│  │  │  │  │  │ Sidebar  │  │   Header +     │  │  Right   │ │  │  │  │  │
│  │  │  │  │  │          │  │   Main Content  │  │ Sidebar  │ │  │  │  │  │
│  │  │  │  │  │          │  │   (Tab Router)  │  │          │ │  │  │  │  │
│  │  │  │  │  └──────────┘  └────────────────┘  └──────────┘ │  │  │  │  │
│  │  │  │  │                                                  │  │  │  │  │
│  │  │  │  │  PaperPreviewDrawer (conditional overlay)        │  │  │  │  │
│  │  │  │  └──────────────────────────────────────────────────┘  │  │  │  │
│  │  │  └────────────────────────────────────────────────────────┘  │  │  │
│  │  └──────────────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                       API Routes (Mock)                             │  │
│  │  /api/search  /api/summarize  /api/generate-insights              │  │
│  │  /api/analyze-draft  /api/chat-assistant                          │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Tab Navigation Flow

```
User Click (Sidebar/Header)
    │
    ▼
setActiveTab(tabId)  ──────►  AppProvider.activeTab
                                    │
                                    ▼
                              AppContent renders
                              matching page component
                                    │
                                    ▼
                              Page component reads
                              state from useApp()
```

### Paper Action Flow

```
User Action (Save/Bookmark/Cite)
    │
    ▼
Page Component calls
handleToggleSave(paperId)
    │
    ▼
AppProvider.updatePapers()
    │
    ├──► Updates papers[].saved
    └──► Updates collections[0].papersCount
```

### API Request Flow

```
Page Component
    │
    ▼
fetch("/api/endpoint", { method: "POST", body: ... })
    │
    ▼
Next.js API Route
    │
    ▼
Mock data processing
    │
    ▼
NextResponse.json(data)
    │
    ▼
Component updates state
with response
```

### AI Search Data Flow

```
AISearch.tsx
    │
    ├──► POST /api/search
    │         │
    │         ▼
    │    Returns: { papers, reasoning, confidenceScore,
    │               suggestedPrompts, graph }
    │         │
    │         ▼
    │    setResult(data)
    │         │
    │         ▼
    │    Render: Reasoning Panel + Papers + Concept Graph
    │
    ├──► POST /api/summarize (via PaperPreviewDrawer)
    │         │
    │         ▼
    │    Returns: { summary, contributions,
    │               methodology, limitations }
    │
    └──► POST /api/generate-insights (via TrendingTopics)
              │
              ▼
         Returns: { insight, trajectory,
                    primaryResearchers }
```

---

## State Management Architecture

### AppProvider Context Structure

```typescript
interface AppState {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Global Search
  globalSearchValue: string;
  setGlobalSearchValue: (val: string) => void;

  // Data Collections
  papers: Paper[];
  projects: Project[];
  notes: Note[];
  tasks: Task[];
  collections: Collection[];
  researchers: Researcher[];
  feedItems: FeedItem[];
  notifications: NotificationItem[];

  // Active Selections
  activeProject: Project | null;
  setActiveProject: (proj: Project | null) => void;
  previewPaper: Paper | null;
  setPreviewPaper: (paper: Paper | null) => void;

  // Actions
  handleToggleSave: (paperId: string) => void;
  handleToggleBookmark: (paperId: string) => void;
  handleToggleTaskStatus: (taskId: string) => void;
  handleAddNote: (title: string, content: string) => void;
  handleAddProject: (name: string, description: string) => void;
  handleAddCollection: (...) => void;
  handleDeleteCollection: (id: string) => void;
  handleAddFeedPost: (title: string, content: string) => void;
  handleToggleFollow: (id: string) => void;
  handleMarkAllRead: () => void;
  handleMarkRead: (id: string) => void;
  handleClearNotification: (id: string) => void;
  handleAddPaperToCollection: (paperId: string, collectionId: string) => void;
  handleGlobalSearchKeyPress: (e: React.KeyboardEvent) => void;
  handlePublishPaper: (paper: Paper) => void;
  handleAddNotification: (sender: string, content: string) => void;

  // Computed
  unreadNotificationsCount: number;
}
```

### Provider Tree

```
<html>
  <body>
    <ToastProvider>          ← Toast notifications (separate context)
      <AppProvider>          ← Global app state
        <AppContent />       ← Main UI
      </AppProvider>
    </ToastProvider>
  </body>
</html>
```

---

## API Routes

All routes are POST-only, located under `src/app/api/`.

| Route | Request Body | Response |
|-------|-------------|----------|
| `/api/search` | `{ query, mode }` | `{ papers[], reasoning, confidenceScore, suggestedPrompts[], graph }` |
| `/api/summarize` | `{ title, abstract }` | `{ summary, contributions[], methodology, limitations }` |
| `/api/generate-insights` | `{ topic }` | `{ insight, trajectory, primaryResearchers[] }` |
| `/api/analyze-draft` | `{ title, abstract, venue, authors }` | `{ predictedScore, titleReview, executiveCritique, suggestedKeywords[], peerQuestions[], clarityRating }` |
| `/api/chat-assistant` | `{ messages[] }` | `{ reply }` |

All routes use mock data and return hardcoded responses based on keyword matching.

---

## Component Hierarchy

```
RootLayout (layout.tsx)
└── ToastProvider
    └── Home (page.tsx)
        └── AppProvider
            └── AppContent
                ├── Sidebar
                │   ├── NavSection × 3
                │   │   └── NavItemButton × N
                │   └── User Profile Footer
                │
                ├── Header
                │   ├── Global Search Input
                │   ├── Notification Bell
                │   └── Profile Link
                │
                ├── Main Content Area
                │   ├── ResearchFeed
                │   ├── DiscoverPapers
                │   ├── AISearch
                │   ├── MyWorkspace
                │   │   ├── Modal (Note)
                │   │   └── Modal (Project)
                │   ├── CollaborativeResearch
                │   ├── SavedPapers
                │   ├── CollectionsView
                │   ├── PublishPaper
                │   ├── FollowingResearchers
                │   ├── TrendingTopics
                │   ├── NotificationsView
                │   └── ProfileView
                │
                ├── RightSidebar
                │   ├── AI Cognitive Tip
                │   ├── Department Suggestions
                │   ├── Activity Timeline
                │   └── Conference Deadlines
                │
                └── PaperPreviewDrawer (conditional)
```

---

## Routing Structure

This project does **not** use Next.js file-based routing for navigation. Instead:

- `src/app/layout.tsx` — Root layout (server component, wraps with ToastProvider)
- `src/app/page.tsx` — Single page entry point (`"use client"`, wraps with AppProvider)
- `src/app/api/*/route.ts` — API routes only

All page navigation is handled via `activeTab` state in `AppProvider`, with conditional rendering in `AppContent`:

```tsx
{activeTab === "feed" && <ResearchFeed />}
{activeTab === "discover" && <DiscoverPapers />}
// ... etc
```

This design was chosen to:
1. Avoid layout remounts on navigation
2. Preserve component state across tab switches
3. Enable instant tab switching without loading states
4. Simplify shared state access across all pages
