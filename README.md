# Semantic Workspace

**Academic Research Platform** — Discover, collaborate, and publish research papers with AI-powered semantic understanding.

---

## Overview

Semantic Workspace is a frontend-only academic research platform built with Next.js 15 App Router and React 19. It provides a unified interface for researchers to discover papers, manage workspaces, collaborate with peers, and publish research — all powered by AI semantic search and mock API endpoints.

### Purpose

To create a modern, clean, and highly functional research management tool that simulates a production-grade academic platform without requiring a backend, database, or authentication system.

### Vision

A comprehensive scholarly environment where researchers can semantically navigate vast paper libraries, collaborate in real-time, track research trends, and publish with AI-assisted peer review — bridging the gap between discovery and publication.

---

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js (App Router) | 15.3.4 |
| UI Library | React | 19.0.1 |
| Language | TypeScript | ~5.8.2 |
| Styling | Tailwind CSS (PostCSS plugin) | 4.1.14 |
| Charts | Recharts | 3.9.2 |
| Icons | Lucide React | 0.546.0 |
| Fonts | Inter, JetBrains Mono, Playfair Display | Google Fonts |
| Linting | ESLint (eslint-config-next) | 9.0.0 |
| Package Manager | npm | — |

---

## Folder Structure

```
ideathon-next/
├── public/                          # Static assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze-draft/       # POST /api/analyze-draft
│   │   │   ├── chat-assistant/      # POST /api/chat-assistant
│   │   │   ├── generate-insights/   # POST /api/generate-insights
│   │   │   ├── search/              # POST /api/search
│   │   │   └── summarize/           # POST /api/summarize
│   │   ├── globals.css              # Tailwind config, animations, design tokens
│   │   ├── layout.tsx               # Root layout (ToastProvider)
│   │   └── page.tsx                 # Main SPA entry (tab switching)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx           # Top search bar, notifications, profile
│   │   │   ├── RightSidebar.tsx     # AI tips, suggestions, timeline, deadlines
│   │   │   └── Sidebar.tsx          # Left navigation with sections
│   │   ├── pages/
│   │   │   ├── AISearch.tsx         # AI Semantic Search page
│   │   │   ├── CollaborativeResearch.tsx  # Team collaboration with chat
│   │   │   ├── CollectionsView.tsx  # Paper collection management
│   │   │   ├── DiscoverPapers.tsx   # Paper discovery with filters
│   │   │   ├── FollowingResearchers.tsx   # Researcher directory + DM
│   │   │   ├── MyWorkspace.tsx      # Projects, notes, tasks, analytics
│   │   │   ├── NotificationsView.tsx      # Notification center
│   │   │   ├── ProfileView.tsx      # User profile + edit
│   │   │   ├── PublishPaper.tsx     # Paper submission + AI review
│   │   │   ├── ResearchFeed.tsx     # Social feed with discussions
│   │   │   ├── SavedPapers.tsx      # Saved library with annotations
│   │   │   └── TrendingTopics.tsx   # Research trends + charts
│   │   ├── providers/
│   │   │   ├── AppProvider.tsx      # Global state (Context + useState)
│   │   │   └── ToastProvider.tsx    # Toast notification system
│   │   ├── shared/
│   │   │   └── PaperPreviewDrawer.tsx  # Paper detail slide-over drawer
│   │   └── ui/
│   │       ├── Avatar.tsx           # User avatar component
│   │       ├── Badge.tsx            # Status badges
│   │       ├── Button.tsx           # Button with variants
│   │       ├── Card.tsx             # Card container
│   │       ├── EmptyState.tsx       # Empty state placeholder
│   │       ├── index.ts             # UI barrel export
│   │       ├── Input.tsx            # Form input with label/error
│   │       ├── LoadingState.tsx     # Loading spinner
│   │       ├── Modal.tsx            # Modal dialog
│   │       ├── PageHeader.tsx       # Page header with title/description
│   │       └── Tag.tsx              # Tag/chip component
│   ├── hooks/
│   │   ├── index.ts                 # Hooks barrel export
│   │   ├── useClickOutside.ts       # Click outside detection
│   │   ├── useEscapeKey.ts          # Escape key handler
│   │   ├── useMediaQuery.ts         # Responsive media queries
│   │   └── useToast.tsx             # Toast hook
│   ├── lib/
│   │   ├── constants.ts             # Colors, spacing, radii, shadows, user data
│   │   ├── data.ts                  # Mock data (papers, projects, etc.)
│   │   ├── types.ts                 # TypeScript interfaces
│   │   └── utils.ts                 # Utility functions (format, clipboard, etc.)
│   └── docs/                        # Project documentation
├── next.config.ts                   # Next.js config (Unsplash images)
├── package.json
├── postcss.config.mjs               # PostCSS with Tailwind
├── tsconfig.json                    # TypeScript config with @/* path alias
└── README.md
```

---

## Architecture Overview

Semantic Workspace operates as a **Single Page Application (SPA)** using tab-based navigation. All pages are rendered conditionally within a single `page.tsx` file based on the `activeTab` state from `AppProvider`.

```
┌─────────────────────────────────────────────────────────────┐
│                      AppProvider (Context)                    │
│  ┌───────────┬────────────────────────────┬──────────────┐  │
│  │  Sidebar  │         Header             │ RightSidebar │  │
│  │  (Nav)    │  (Search + Notifications)   │  (AI Tips)   │  │
│  │           ├────────────────────────────┤              │  │
│  │           │      Page Content           │              │  │
│  │           │  (Tab-based rendering)      │              │  │
│  │           │                             │              │  │
│  └───────────┴────────────────────────────┴──────────────┘  │
│                   PaperPreviewDrawer (Overlay)               │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **No Router**: Uses `activeTab` state instead of Next.js file-based routing for instant tab switching
2. **No Auth**: All data is mock; the current user is hardcoded as "Dr. Alex Rivera"
3. **No Database**: All state lives in React Context with initial data from `src/lib/data.ts`
4. **Mock AI**: 5 API routes return pre-defined responses; no real AI integration
5. **Client Components**: All page and layout components are `"use client"`

---

## Feature List

| Feature | Status | Description |
|---------|--------|-------------|
| Research Feed | ✅ Complete | Social-style feed with discussion posts, likes, comments |
| Discover Papers | ✅ Complete | Search, filter by tags, sort by citations/year, cite papers |
| AI Semantic Search | ✅ Complete | Natural language queries, concept graph, search modes |
| Workspace Management | ✅ Complete | Projects, notes, tasks, analytics charts |
| Collaborative Research | ✅ Complete | Team chat, Kanban board, LaTeX timeline, datasets |
| Saved Papers | ✅ Complete | Personal library, reading status, annotations, BibTeX |
| Collections | ✅ Complete | Folder management, pinning, sharing, AI summaries |
| Following Researchers | ✅ Complete | Directory, follow/unfollow, direct messaging |
| Trending Topics | ✅ Complete | Citation charts, AI trajectory analysis |
| Notifications | ✅ Complete | Filtered notifications, mark read, invite actions |
| Profile | ✅ Complete | Editable profile, publications, projects, metrics |
| Publish Papers | ✅ Complete | Draft form, AI pre-review, submission pipeline |
| Paper Preview Drawer | ✅ Complete | Slide-over with AI summary, contributions, methodology |
| Toast Notifications | ✅ Complete | Success/error/info/warning toasts |
| Global Search | ✅ Complete | Header search bar that navigates to Discover |

---

## UI Components Catalog

### Primitives (`src/components/ui/`)

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `size`, `children`, `...props` | Primary/secondary/ghost/danger buttons |
| `Card` | `children`, `hover`, `onClick`, `className` | Card container with optional hover/click |
| `Badge` | `variant`, `size`, `pulse`, `children` | Status badges (success, warning, error, info, violet) |
| `Tag` | `children`, `onClick`, `active` | Interactive or static tag chips |
| `Input` | `label`, `error`, `icon`, `...props` | Form input with label, error, icon support |
| `Avatar` | `src`, `alt`, `size`, `showBorder` | User avatar images (xs/sm/md/lg/xl) |
| `Modal` | `isOpen`, `onClose`, `title`, `size`, `children` | Modal dialog with focus trap |
| `PageHeader` | `title`, `description`, `action`, `icon` | Page header with optional action slot |
| `EmptyState` | `icon`, `title`, `description`, `action` | Empty state placeholder |
| `LoadingState` | `message`, `fullScreen` | Loading spinner with optional fullscreen |

### Layout (`src/components/layout/`)

| Component | Description |
|-----------|-------------|
| `Sidebar` | Left navigation with Main, Workspace, Social sections; user profile footer |
| `Header` | Top bar with global search, notification bell, profile link |
| `RightSidebar` | AI cognitive tip, department suggestions, activity timeline, conference deadlines |

### Shared (`src/components/shared/`)

| Component | Description |
|-----------|-------------|
| `PaperPreviewDrawer` | Right-side slide-over showing paper details + AI summary |

---

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-900` | `#111827` | Headings, emphasis |
| `primary-500` | `#6B7280` | Body text secondary |
| `primary-300` | `#D1D5DB` | Borders |
| `violet-500` | `#8B5CF6` | AI features, accents |
| `emerald-500` | `#10B981` | Success states |
| `amber-500` | `#F59E0B` | Saved/bookmarked |
| `red-500` | `#EF4444` | Danger, errors |
| `blue-500` | `#3B82F6` | Info states |
| `surface` | `#FFFFFF` | Backgrounds |
| `surface-muted` | `#F9F9FB` | Subtle backgrounds |

### Typography

| Font | Weight | Usage |
|------|--------|-------|
| Inter | 400–700 | Body text, UI |
| JetBrains Mono | 400–600 | Code, labels, badges |
| Playfair Display | 400–900 | Serif accent (available) |

### Spacing Scale

| Token | Value |
|-------|-------|
| `xs` | `0.25rem` (4px) |
| `sm` | `0.5rem` (8px) |
| `md` | `0.75rem` (12px) |
| `lg` | `1rem` (16px) |
| `xl` | `1.5rem` (24px) |
| `2xl` | `2rem` (32px) |
| `3xl` | `3rem` (48px) |

---

## Installation & Scripts

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## Coding Standards

- **TypeScript**: Strict mode enabled; all components use typed props
- **Component Style**: Functional components only; `"use client"` directive on all interactive components
- **Styling**: Tailwind CSS utility classes; no CSS modules
- **State Management**: React Context via `AppProvider`; `useState` + `useCallback` for handlers
- **File Naming**: PascalCase for components (`ResearchFeed.tsx`), camelCase for utilities (`utils.ts`)
- **Path Aliases**: `@/*` maps to `./src/*`
- **Accessibility**: ARIA labels on interactive elements; focus management in modals; screen reader announcements via `announceToScreenReader()`
- **No Comments**: Code is self-documenting; no inline comments

---

## Future Roadmap

1. **Clerk Authentication** — User registration, login, session management
2. **PostgreSQL + Prisma** — Database for persistent paper, project, and user data
3. **Backend API** — RESTful endpoints replacing mock API routes
4. **RBAC System** — Role-based access (admin, researcher, viewer)
5. **Real-time Collaboration** — WebSocket-based live editing and chat
6. **Real AI Integration** — Gemini/OpenAI for search, summarization, and review
7. **File Storage** — S3/R2 for PDF uploads and document management
8. **Analytics Dashboard** — Usage metrics, citation tracking, impact scores
9. **Payment Integration** — Subscription tiers for premium features
10. **Mobile Responsive** — Adaptive layouts for tablet and mobile
