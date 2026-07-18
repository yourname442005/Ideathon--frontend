# Component Guide

## UI Primitives (`src/components/ui/`)

### Button

**File:** `src/components/ui/Button.tsx`

Renders a button element with variant and size options.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `children` | `React.ReactNode` | — | Button content |
| `className` | `string` | — | Additional CSS classes |
| `...props` | `ButtonHTMLAttributes<HTMLButtonElement>` | — | Native button props |

**Variants:**
- `primary`: Black background, white text, hover to zinc-800
- `secondary`: White background, zinc-700 text, border, hover to zinc-50
- `ghost`: Transparent, text zinc-600, hover bg zinc-100
- `danger`: Red-600 background, white text

**Accessibility:**
- `focus-visible:ring-2` for keyboard navigation
- `disabled:opacity-40` for disabled state
- All sizes use `rounded-full` (pill shape)

---

### Card

**File:** `src/components/ui/Card.tsx`

Generic card container with optional hover and click behavior.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Card content |
| `className` | `string` | — | Additional CSS classes |
| `hover` | `boolean` | `false` | Enable hover shadow/border effect |
| `onClick` | `() => void` | — | Click handler; adds cursor-pointer and role="button" |

**Accessibility:**
- When `onClick` is provided: `role="button"`, `tabIndex={0}`, keyboard Enter/Space support
- `rounded-2xl` border radius

---

### Badge

**File:** `src/components/ui/Badge.tsx`

Small status indicator with variant colors.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'violet'` | `'default'` | Color variant |
| `size` | `'sm' \| 'md'` | `'sm'` | Badge size |
| `pulse` | `boolean` | — | Show animated pulse dot |
| `children` | `React.ReactNode` | — | Badge text |
| `className` | `string` | — | Additional CSS classes |

**Variant Colors:**
- `default`: zinc-100 bg, zinc-600 text
- `success`: emerald-50 bg, emerald-700 text
- `warning`: amber-50 bg, amber-700 text
- `error`: red-50 bg, red-700 text
- `info`: blue-50 bg, blue-700 text
- `violet`: violet-50 bg, violet-700 text

---

### Tag

**File:** `src/components/ui/Tag.tsx`

Interactive or static tag chip.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Tag text |
| `onClick` | `() => void` | — | Makes tag a button if provided |
| `active` | `boolean` | — | Active state (black bg, white text) |
| `className` | `string` | — | Additional CSS classes |

**Behavior:**
- Renders `<button>` if `onClick` is provided, `<span>` otherwise
- Active: black background, white text
- Inactive: zinc-100 bg, zinc-600 text, border

---

### Input

**File:** `src/components/ui/Input.tsx`

Form input with optional label, error message, and leading icon. Uses `React.forwardRef`.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text above input |
| `error` | `string` | — | Error message below input |
| `icon` | `React.ReactNode` | — | Leading icon element |
| `className` | `string` | — | Additional CSS classes |
| `id` | `string` | — | Input id (auto-generated from label if omitted) |
| `...props` | `InputHTMLAttributes<HTMLInputElement>` | — | Native input props |

**Accessibility:**
- `label` linked via `htmlFor={inputId}`
- Error text uses `text-red-600` and `text-[10px]`
- Icon positioned absolutely with `left-3`

---

### Avatar

**File:** `src/components/ui/Avatar.tsx`

Circular user avatar image.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Alt text |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size |
| `className` | `string` | — | Additional CSS classes |
| `showBorder` | `boolean` | `true` | Show border ring |

**Sizes:**
- `xs`: 24x24px (`h-6 w-6`)
- `sm`: 32x32px (`h-8 w-8`)
- `md`: 40x40px (`h-10 w-10`)
- `lg`: 48x48px (`h-12 w-12`)
- `xl`: 96x96px (`h-24 w-24`)

---

### Modal

**File:** `src/components/ui/Modal.tsx`

Accessible modal dialog with overlay, focus trap, and escape key support.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | Controls visibility |
| `onClose` | `() => void` | — | Close handler |
| `title` | `string` | — | Modal title (optional) |
| `children` | `React.ReactNode` | — | Modal content |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Max width |

**Accessibility:**
- `role="dialog"`, `aria-modal="true"`, `aria-label={title}`
- Focus trap: Tab cycles through focusable elements
- Escape key closes via `useEscapeKey` hook
- Click overlay to close
- `body.style.overflow = 'hidden'` when open
- Auto-focuses first focusable element on open

---

### PageHeader

**File:** `src/components/ui/PageHeader.tsx`

Standard page header with title, description, icon, and optional action.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Page title |
| `description` | `string` | — | Subtitle text |
| `action` | `React.ReactNode` | — | Right-aligned action (e.g., button) |
| `icon` | `React.ReactNode` | — | Icon before title |
| `className` | `string` | — | Additional CSS classes |

---

### EmptyState

**File:** `src/components/ui/EmptyState.tsx`

Placeholder displayed when no data is available.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `LucideIcon` | — | Lucide icon component |
| `title` | `string` | — | Empty state title |
| `description` | `string` | — | Description text |
| `action` | `React.ReactNode` | — | Optional action button |
| `className` | `string` | — | Additional CSS classes |

---

### LoadingState

**File:** `src/components/ui/LoadingState.tsx`

Loading indicator with optional fullscreen mode.

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | `'Loading...'` | Loading message |
| `className` | `string` | — | Additional CSS classes |
| `fullScreen` | `boolean` | `false` | Fullscreen overlay mode |

---

## Layout Components (`src/components/layout/`)

### Sidebar

**File:** `src/components/layout/Sidebar.tsx`

Left navigation panel with three sections and user profile.

**Sections:**
1. **Main**: Research Feed, Discover Papers, AI Semantic Search
2. **Workspace**: My Workspace, Collaborative Research, Publish Papers, Saved Papers, Collections
3. **Social**: Following Researchers, Trending Topics, Notifications, Profile

**Features:**
- Active tab highlighting (black bg, white text)
- Badge indicators (AI badge on search, count badges on saved/collections)
- Notification dot (animated pulse) for unread notifications
- User profile footer with avatar, name, institution
- `aria-label="Main navigation"` on `<aside>`

**Data Source:** `useApp()` for `activeTab`, `papers`, `collections`, `unreadNotificationsCount`

---

### Header

**File:** `src/components/layout/Header.tsx`

Top navigation bar with global search and user controls.

**Features:**
- Global search input (480px width, with search icon)
- Enter key navigates to Discover tab
- Notification bell with unread dot
- Profile button with avatar and name
- `role="banner"` on `<header>`

**Data Source:** `useApp()` for `globalSearchValue`, `setGlobalSearchValue`, `handleGlobalSearchKeyPress`, `unreadNotificationsCount`

---

### RightSidebar

**File:** `src/components/layout/RightSidebar.tsx`

Right-side information panel with AI tips and activity.

**Sections:**
1. **AI Cognitive Tip** — Violet card with semantic search suggestion
2. **Department Suggestions** — Researcher follow cards (shows researchers[2+])
3. **Activity Timeline** — Chronological activity with dot indicators
4. **Conference Deadlines** — Upcoming submission deadlines

**Visibility:** Hidden on screens < `lg` (1024px) via `hidden lg:flex`

---

## Page Components (`src/components/pages/`)

### ResearchFeed

**File:** `src/components/pages/ResearchFeed.tsx`

Social-style feed displaying discussion posts from the research network.

**Features:**
- New discussion publisher (title + content form)
- Feed items with author info, action, timestamp
- "Verified Peer" badge on each post
- Linked publication cards with AI Summary and Save buttons
- Like, Comment, Share actions
- Comment thread display

**State:** `newTitle`, `newContent`, `showPublisher` (local); `feedItems`, `papers` (global)

**API Calls:** None (local state only)

---

### DiscoverPapers

**File:** `src/components/pages/DiscoverPapers.tsx`

Paper discovery with search, filtering, sorting, and citation tools.

**Features:**
- Full-text search (title, abstract, authors)
- Tag-based filtering (dynamic tag list from all papers)
- Sort by citations or publication year
- AI Summary button per paper
- Save/Unsave toggle
- Copy APA citation
- Add to Collection dropdown
- AI Suggested Reading list card

**State:** `searchQuery`, `selectedTag`, `sortBy`, `copiedId`, `showAddToCol` (local)

**API Calls:** None (local state only)

---

### AISearch

**File:** `src/components/pages/AISearch.tsx`

AI-powered semantic search with concept graph visualization.

**Features:**
- Natural language search input
- Voice input simulation (mic button)
- Three search modes: Semantic Mapping, Deep AI Reasoning, Research Graph Only
- AI Reasoning & Mapping Panel with confidence score
- Primary Scholarly Matches with paper cards
- SVG Concept Graph (interactive nodes)
- Suggested Follow-ups

**State:** `query`, `searchMode`, `isSearching`, `result`, `micActive` (local)

**API Calls:** `POST /api/search` on form submit and initial load

---

### MyWorkspace

**File:** `src/components/pages/MyWorkspace.tsx`

Research workspace with projects, notes, tasks, and analytics.

**Features:**
- Analytics grid (4 stat cards: citations, saved papers, completed milestones, collaborators)
- Recharts AreaChart (workspace growth over time)
- Tabbed interface: Active Projects, Research Notes, Tasks & Pipelines
- Project cards with progress, members, last active
- Note cards with title, content, author, timestamp
- Task list with checkboxes, status, due dates, assignees
- Create Note modal
- Create Project modal

**State:** `activeTab`, `showNoteModal`, `noteTitle`, `noteContent`, `showProjModal`, `projName`, `projDesc` (local)

**API Calls:** None

---

### CollaborativeResearch

**File:** `src/components/pages/CollaborativeResearch.tsx`

Team collaboration with chat, Kanban board, and shared resources.

**Features:**
- Project switcher dropdown
- Sub-navigation: Task Pipeline Kanban, LaTeX Version & Edits, Shared Datasets & Weights
- 3-column Kanban board (Todo, In Progress, Done)
- LaTeX version timeline with diff logs
- Dataset/model file cards with download buttons
- Invite external peer reviewer form
- Live workspace chat with AI assistant

**State:** `messages`, `chatInput`, `isAiReplying`, `inviteEmail`, `inviteSuccess`, `activeBoardTab` (local)

**API Calls:** `POST /api/chat-assistant` for AI replies in chat

---

### SavedPapers

**File:** `src/components/pages/SavedPapers.tsx`

Personal paper library with reading tracking and annotations.

**Features:**
- Library search (title, author filter)
- Reading status selector (Unread/Reading/Completed)
- Personal research annotations (add/edit/save)
- Export BibTeX citation
- AI Summary button
- Remove from library

**State:** `search`, `readingStatus`, `paperNotes`, `activeNotePaperId`, `activeNoteText`, `copiedId` (local)

**API Calls:** None

---

### CollectionsView

**File:** `src/components/pages/CollectionsView.tsx`

Paper collection/folder management with AI insights.

**Features:**
- Collection grid with color-coded folders
- Pin and share indicators
- Create collection form (name, description, color, pin, share)
- Delete collection
- AI Summarize Folder button per collection
- AI Cognitive Collection Summary panel (insight, trajectory, researchers)

**State:** `showAddForm`, `name`, `description`, `isPinned`, `isShared`, `color`, `selectedColSummary`, `aiSummary`, `loadingSummary` (local)

**API Calls:** `POST /api/generate-insights` for collection summaries

---

### PublishPaper

**File:** `src/components/pages/PublishPaper.tsx`

Paper submission with AI pre-review and pipeline tracking.

**Features:**
- Draft & AI Review tab / Submissions Pipeline tab
- Full manuscript form (title, abstract, venue, co-authors, tags, PDF upload)
- Drag & drop PDF upload
- AI Cognitive Review panel (predicted score, title review, executive critique, peer questions, keywords)
- Policy acceptance checkbox
- Submission pipeline with status badges (Draft/Peer Review/Accepted/Published)
- AI Peer Score per submission

**State:** `activeTab`, form fields, `aiReview`, `isAnalyzing`, `pipelinePapers`, `isSubmitting`, `submitSuccess` (local)

**API Calls:** `POST /api/analyze-draft` for AI pre-review

---

### FollowingResearchers

**File:** `src/components/pages/FollowingResearchers.tsx`

Researcher directory with follow/unfollow and direct messaging.

**Features:**
- Directory search (name, field, institution)
- Researcher cards with avatar, bio, followers, publications
- Follow/Unfollow toggle
- Direct Message chat sidebar
- Message delivery confirmation

**State:** `search`, `activeChat`, `chatMessage`, `chatLog` (local)

**API Calls:** None

---

### TrendingTopics

**File:** `src/components/pages/TrendingTopics.tsx`

Research trend analytics with charts and AI analysis.

**Features:**
- Recharts BarChart (citation growth by topic)
- Interactive topic list (click to select)
- AI Trajectory Analyst sidebar
- Keyword clusters display
- Topic-specific AI insights

**State:** `selectedTopic`, `aiInsight`, `loadingInsight` (local)

**API Calls:** `POST /api/generate-insights` for topic-specific insights

---

### NotificationsView

**File:** `src/components/pages/NotificationsView.tsx`

Notification center with filtering and actions.

**Features:**
- All/Unread filter tabs
- Categorized notification icons (mention, invite, paper_update, comment)
- Mark All Read button
- Mark individual read
- Clear/delete notification
- Accept/Decline workspace invites

**State:** `filter` (local)

**API Calls:** None

---

### ProfileView

**File:** `src/components/pages/ProfileView.tsx`

User profile with editable bio and impact metrics.

**Features:**
- Cover image + avatar header
- "Verified Scholar" badge
- Edit profile mode (name, title, institution, location, bio, interests)
- Add/remove research interests
- Publications list (linked from global state)
- Projects list (linked from global state)
- Scholarly Impact Score (H-Index, Citations)
- Co-Authors & Peer Affiliation sidebar

**State:** `isEditing`, `name`, `title`, `institution`, `location`, `bio`, `interests`, `newInterest`, `savedSuccess` (local)

**API Calls:** None

---

## Shared Components (`src/components/shared/`)

### PaperPreviewDrawer

**File:** `src/components/shared/PaperPreviewDrawer.tsx`

Slide-over drawer showing paper details and AI summary.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `paper` | `Paper \| null` | Paper to display |
| `onClose` | `() => void` | Close handler |

**Features:**
- Right-side fixed panel (max-w-lg)
- Paper metadata (tags, title, authors, citations, DOI)
- Copy DOI button
- Full abstract display
- AI Analysis Console (Gemini 3.5)
  - Loading state with skeleton animation
  - Synthesis summary
  - Key contributions list
  - Methodology breakdown
  - Known gaps & limitations

**API Calls:** `POST /api/summarize` on paper change (via `useEffect`)

---

## Custom Hooks (`src/hooks/`)

### useToast

**File:** `src/hooks/useToast.tsx`

Access toast notification functions from `ToastProvider`.

**Returns:** `{ addToast(message, type?), removeToast(id) }`

**Usage:**
```tsx
const { addToast } = useToast();
addToast("Paper saved!", "success");
```

---

### useMediaQuery

**File:** `src/hooks/useMediaQuery.ts`

Responsive media query matching.

**Parameters:** `query: string` (CSS media query)
**Returns:** `boolean` (whether query matches)

---

### useEscapeKey

**File:** `src/hooks/useEscapeKey.ts`

Register a handler for the Escape key.

**Parameters:** `handler: () => void`

---

### useClickOutside

**File:** `src/hooks/useClickOutside.ts`

Detect clicks outside a referenced element.

**Parameters:**
- `ref: RefObject<T | null>`
- `handler: () => void`
