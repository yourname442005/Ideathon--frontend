# State Management Documentation

## Architecture

State management in Semantic Workspace uses **React Context API** with `useState` and `useCallback` hooks. There are two context providers:

1. **AppProvider** — Global application state
2. **ToastProvider** — Toast notification state (separate context)

---

## AppProvider

**File:** `src/components/providers/AppProvider.tsx`

### Context Structure

```typescript
interface AppState {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Search
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

  // Actions (15 handlers)
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

  // Computed Values
  unreadNotificationsCount: number;
}
```

### State Slices

#### Navigation State

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `activeTab` | `string` | `"feed"` | Current active tab ID |

#### Search State

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `globalSearchValue` | `string` | `""` | Global search input value |

#### Data Collections

| State | Type | Initial Source | Description |
|-------|------|---------------|-------------|
| `papers` | `Paper[]` | `INITIAL_PAPERS` | All papers in the system |
| `projects` | `Project[]` | `INITIAL_PROJECTS` | Research projects |
| `notes` | `Note[]` | `INITIAL_NOTES` | Research notes |
| `tasks` | `Task[]` | `INITIAL_TASKS` | Project tasks |
| `collections` | `Collection[]` | `INITIAL_COLLECTIONS` | Paper collections |
| `researchers` | `Researcher[]` | `INITIAL_RESEARCHERS` | Researchers directory |
| `feedItems` | `FeedItem[]` | `INITIAL_FEED` | Discussion feed posts |
| `notifications` | `NotificationItem[]` | `INITIAL_NOTIFICATIONS` | User notifications |

#### Active Selections

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `activeProject` | `Project \| null` | `null` | Currently selected project in collab view |
| `previewPaper` | `Paper \| null` | `null` | Paper shown in preview drawer |

#### Computed Values

| Value | Type | Description |
|-------|------|-------------|
| `unreadNotificationsCount` | `number` | Count of `notifications` where `read === false` |

---

## Handler Functions

### Paper Actions

#### `handleToggleSave(paperId: string)`
Toggles the `saved` property of a paper. When saving, increments the first collection's `papersCount`. When unsaving, decrements it.

```typescript
const handleToggleSave = useCallback((paperId: string) => {
  setPapers((prev) =>
    prev.map((p) => {
      if (p.id === paperId) {
        const isSaving = !p.saved;
        // Update collection count
        setCollections((colls) =>
          colls.map((c, idx) => 
            idx === 0 
              ? { ...c, papersCount: Math.max(0, c.papersCount + (isSaving ? 1 : -1)) }
              : c
          )
        );
        return { ...p, saved: isSaving };
      }
      return p;
    })
  );
}, []);
```

#### `handleToggleBookmark(paperId: string)`
Toggles the `bookmarked` property of a paper.

```typescript
const handleToggleBookmark = useCallback((paperId: string) => {
  setPapers((prev) =>
    prev.map((p) => (p.id === paperId ? { ...p, bookmarked: !p.bookmarked } : p))
  );
}, []);
```

#### `handlePublishPaper(paper: Paper)`
Adds a new paper to the beginning of the papers array.

```typescript
const handlePublishPaper = useCallback((paper: Paper) => {
  setPapers((prev) => [paper, ...prev]);
}, []);
```

### Task Actions

#### `handleToggleTaskStatus(taskId: string)`
Toggles task status between `"done"` and `"todo"`.

```typescript
const handleToggleTaskStatus = useCallback((taskId: string) => {
  setTasks((prev) =>
    prev.map((t) =>
      t.id === taskId
        ? { ...t, status: t.status === "done" ? "todo" : "done" }
        : t
    )
  );
}, []);
```

### Note Actions

#### `handleAddNote(title: string, content: string)`
Creates a new note with auto-generated ID and current timestamp.

```typescript
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
```

### Project Actions

#### `handleAddProject(name: string, description: string)`
Creates a new project with auto-generated ID and default values.

```typescript
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
```

### Collection Actions

#### `handleAddCollection(name, description, isPinned, isShared, color)`
Creates a new collection with auto-generated ID.

#### `handleDeleteCollection(id: string)`
Removes a collection by ID from the collections array.

#### `handleAddPaperToCollection(paperId: string, collectionId: string)`
Increments the `papersCount` of the specified collection.

### Feed Actions

#### `handleAddFeedPost(title: string, content: string)`
Creates a new feed item with the current user as author.

```typescript
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
```

### Researcher Actions

#### `handleToggleFollow(id: string)`
Toggles the `isFollowing` property of a researcher.

### Notification Actions

#### `handleMarkAllRead()`
Sets all notifications' `read` property to `true`.

#### `handleMarkRead(id: string)`
Sets a specific notification's `read` property to `true`.

#### `handleClearNotification(id: string)`
Removes a notification by ID from the notifications array.

#### `handleAddNotification(sender: string, content: string)`
Creates a new notification with type `"mention"` and `read: false`.

### Search Actions

#### `handleGlobalSearchKeyPress(e: React.KeyboardEvent)`
On Enter key press with non-empty search value, navigates to the `"discover"` tab.

---

## ToastProvider

**File:** `src/components/providers/ToastProvider.tsx`

### Context Structure

```typescript
interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';
```

### State

| State | Type | Initial | Description |
|-------|------|---------|-------------|
| `toasts` | `Toast[]` | `[]` | Active toast notifications |

### Handlers

#### `addToast(message: string, type: ToastType = 'info')`
Creates a toast with auto-generated ID and auto-removes after 4000ms.

#### `removeToast(id: string)`
Immediately removes a toast by ID.

### Usage

```typescript
import { useToast } from "@/hooks/useToast";

const { addToast } = useToast();
addToast("Paper saved successfully!", "success");
addToast("Upload failed", "error");
```

---

## Data Flow Diagram

```
AppProvider (Context)
    │
    ├── State: papers, projects, notes, tasks, collections, researchers, feedItems, notifications
    │
    ├── Actions: handleToggleSave, handleAddNote, handleAddProject, etc.
    │
    └── Children Components
         │
         ├── Sidebar ← reads activeTab, unreadNotificationsCount
         ├── Header ← reads/writes globalSearchValue
         ├── RightSidebar ← reads researchers
         ├── Page Components ← read/write relevant state
         │   ├── ResearchFeed ← feedItems, papers
         │   ├── DiscoverPapers ← papers, collections
         │   ├── AISearch ← (API calls, local state)
         │   ├── MyWorkspace ← projects, notes, tasks
         │   ├── CollaborativeResearch ← projects
         │   ├── SavedPapers ← papers (filtered)
         │   ├── CollectionsView ← collections
         │   ├── PublishPaper ← projects
         │   ├── FollowingResearchers ← researchers
         │   ├── TrendingTopics ← (API calls, local state)
         │   ├── NotificationsView ← notifications
         │   └── ProfileView ← papers, projects
         └── PaperPreviewDrawer ← reads previewPaper, writes null
```

---

## Future State Management Improvements

### Current Limitations

1. **No persistence** — All state resets on page reload
2. **No optimistic updates** — State updates are synchronous
3. **No caching** — API calls always fetch fresh data
4. **Large context object** — Entire state re-renders all consumers
5. **No middleware** — No logging, devtools, or time-travel debugging

### Recommended Improvements

1. **Zustand or Jotai** — Replace Context with atomic state management
2. **SWR or React Query** — Add data fetching, caching, and revalidation
3. **localStorage persistence** — Persist papers, collections, notes
4. **State splitting** — Separate contexts for papers, UI state, notifications
5. **Optimistic updates** — Update UI immediately, rollback on error
6. **DevTools integration** — Redux DevTools or Zustand DevTools

### Migration Path

```
Current:  AppProvider (single Context)
          ↓
Phase 1:  Split into PapersContext, UIContext, NotificationsContext
          ↓
Phase 2:  Replace with Zustand stores
          ↓
Phase 3:  Add React Query for API state
          ↓
Phase 4:  Add persistence middleware
```
