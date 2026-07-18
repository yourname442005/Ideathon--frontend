# Features Documentation

## 1. Research Feed

**File:** `src/components/pages/ResearchFeed.tsx`
**Tab ID:** `feed`
**Status:** ✅ Complete

### Purpose
A social-style feed where researchers share discussion notes, paper insights, and collaborate on topics.

### Screens/Components
- **Feed List** — Scrollable list of discussion posts
- **New Discussion Publisher** — Form to create new posts (title + content)
- **Feed Item Card** — Author info, action description, timestamp, "Verified Peer" badge
- **Linked Publication Card** — Associated paper with AI Summary and Save buttons
- **Comment Thread** — Nested comments under posts
- **Action Bar** — Like, Comment, Share Citation buttons

### Data Source
- `feedItems` from `AppProvider` (initialized from `INITIAL_FEED` in `data.ts`)
- `papers` from `AppProvider` for linked publications

### Interactions
- Toggle discussion publisher form
- Submit new discussion post → adds to `feedItems`
- Save/Unsave linked paper → updates `papers[].saved`
- Open PaperPreviewDrawer for AI Summary

### Future Improvements
- Real-time updates via WebSockets
- Rich text editor for posts
- Image/file attachments
- Comment threading with replies
- Like/unlike toggle with count

---

## 2. Discover Papers

**File:** `src/components/pages/DiscoverPapers.tsx`
**Tab ID:** `discover`
**Status:** ✅ Complete

### Purpose
Browse, search, and filter the paper library with citation metrics and AI tools.

### Screens/Components
- **Search Bar** — Full-text search across title, abstract, authors
- **Sort Controls** — Sort by Most Cited or Publication Year
- **Tag Filter** — Dynamic tag pills from all papers
- **Paper Card** — Title, authors, institution, abstract preview, tags, citations, DOI
- **Action Buttons** — AI Summary, Save/Unsave, Copy APA Citation, Add to Collection
- **Collection Dropdown** — Select collection to add paper to
- **AI Suggested Reading** — Recommended paper card

### Data Source
- `papers` from `AppProvider`
- `collections` from `AppProvider` for collection dropdown

### Interactions
- Filter papers by text search and tag
- Sort papers by citations or year
- Copy APA citation to clipboard
- Save/unsave papers
- Add papers to collections
- Open PaperPreviewDrawer for AI Summary

### Future Improvements
- Pagination or infinite scroll
- Advanced filters (year range, journal, institution)
- Citation export (RIS, EndNote)
- Paper comparison view
- Related papers suggestions

---

## 3. AI Semantic Search

**File:** `src/components/pages/AISearch.tsx`
**Tab ID:** `ai-search`
**Status:** ✅ Complete

### Purpose
Natural language semantic search powered by AI with concept graph visualization.

### Screens/Components
- **Search Input** — Large input with Sparkles icon and voice mic button
- **Search Mode Selector** — Semantic Mapping, Deep AI Reasoning, Research Graph Only
- **AI Status Indicator** — "Gemini-3.5-Flash Active" green dot
- **Suggested Queries** — 3 pre-built query cards
- **Loading State** — "Constructing Semantics" with animated spinner
- **AI Reasoning Panel** — Confidence score + reasoning text
- **Paper Results** — Matched papers with tags, abstract, citations
- **Concept Graph** — SVG visualization with interactive nodes (Attention, Alignment, RAG Store)
- **Suggested Follow-ups** — Clickable follow-up queries

### Data Source
- API: `POST /api/search` → returns papers, reasoning, confidenceScore, suggestedPrompts, graph

### Interactions
- Submit search query → calls API
- Click suggested query → populates and searches
- Toggle search mode
- Voice input simulation (mic button)
- Click concept graph nodes → trigger new search
- Save/unsave papers from results
- Open PaperPreviewDrawer for AI Summary

### Future Improvements
- Real AI integration (Gemini/OpenAI)
- Interactive force-directed graph (D3.js)
- Search history
- Saved searches
- Search result ranking feedback

---

## 4. Workspace Management

**File:** `src/components/pages/MyWorkspace.tsx`
**Tab ID:** `workspace`
**Status:** ✅ Complete

### Purpose
Manage research projects, notes, and tasks with analytics.

### Screens/Components
- **Analytics Grid** — 4 stat cards (Total Citations, Saved Papers, Completed Milestones, Collaborating Authors)
- **Growth Chart** — Recharts AreaChart showing citations over time
- **Tabbed Interface** — Active Projects, Research Notes, Tasks & Pipelines
- **Project Cards** — Name, description, progress %, members, last active
- **Note Cards** — Title, content preview, author, timestamp
- **Task List** — Checkbox, title, status badge, due date, assignee
- **Create Note Modal** — Title + content form
- **Create Project Modal** — Name + description form

### Data Source
- `projects`, `notes`, `tasks`, `papers` from `AppProvider`
- Hardcoded `ANALYTICS_DATA` for chart

### Interactions
- Switch between Projects/Notes/Tasks tabs
- Toggle task completion status
- Create new notes (adds to `notes`)
- Create new projects (adds to `projects`)
- View project details

### Future Improvements
- Drag-and-drop task reordering
- Task assignment to other members
- Due date picker
- Project file attachments
- Time tracking per task

---

## 5. Collaborative Research

**File:** `src/components/pages/CollaborativeResearch.tsx`
**Tab ID:** `collab`
**Status:** ✅ Complete

### Purpose
Real-time team collaboration with chat, Kanban boards, and shared resources.

### Screens/Components
- **Project Switcher** — Dropdown to switch between projects
- **Sub-Navigation** — Task Pipeline Kanban, LaTeX Version & Edits, Shared Datasets
- **Kanban Board** — 3 columns (Todo, In Progress, Done) with task cards
- **LaTeX Timeline** — Version history with status badges (Approved/Under Review)
- **Dataset Cards** — File name, size, permissions, download button
- **Invite Form** — Email input for external peer reviewer
- **Live Chat** — Message list with AI assistant responses
- **Chat Input** — Text input with send button

### Data Source
- `projects`, `activeProject` from `AppProvider`
- API: `POST /api/chat-assistant` for AI replies

### Interactions
- Switch between projects
- Switch sub-tabs (Kanban/LaTeX/Datasets)
- Send chat messages → triggers AI response
- Invite external reviewers
- Download datasets (mock)

### Future Improvements
- WebSocket real-time chat
- Drag-and-drop Kanban cards
- Real-time collaborative editing (CRDT)
- File upload/download from cloud storage
- Video call integration

---

## 6. Saved Papers

**File:** `src/components/pages/SavedPapers.tsx`
**Tab ID:** `saved`
**Status:** ✅ Complete

### Purpose
Personal paper library with reading tracking and annotations.

### Screens/Components
- **Library Header** — Title + publication count badge
- **Search Bar** — Filter by title, tag, or author
- **Paper Card** — Tags, journal, year, title, authors, reading status
- **Reading Status Selector** — Unread/Reading/Completed dropdown
- **Annotation Section** — Add/edit personal research notes per paper
- **Action Bar** — Export BibTeX, AI Summary, Remove from library

### Data Source
- `papers` filtered by `saved === true` from `AppProvider`

### Interactions
- Search saved papers
- Change reading status
- Add/edit annotations per paper
- Copy BibTeX citation
- Remove paper from library
- Open PaperPreviewDrawer for AI Summary

### Future Improvements
- Reading progress tracking
- Highlight management
- Export annotations
- Reading list organization
- Import from external libraries (Zotero, Mendeley)

---

## 7. Collections

**File:** `src/components/pages/CollectionsView.tsx`
**Tab ID:** `collections`
**Status:** ✅ Complete

### Purpose
Organize papers into themed folders with AI-powered insights.

### Screens/Components
- **Collection Grid** — Color-coded folder cards with pin/share indicators
- **Create Collection Form** — Name, description, color picker, pin, share checkboxes
- **Collection Card** — Folder icon, name, description, paper count, AI Summarize button
- **AI Summary Panel** — Growth insight, subject trajectory, primary researchers
- **Delete Button** — Remove collection (appears on hover)

### Data Source
- `collections` from `AppProvider`
- API: `POST /api/generate-insights` for AI summaries

### Interactions
- Create new collections
- Delete collections
- Request AI summary per collection
- View AI insights (insight text, trajectory, researchers)

### Future Improvements
- Drag papers into collections
- Nested sub-collections
- Collection sharing with permissions
- Export collection as bibliography
- Collection analytics (citation counts, reading status)

---

## 8. Following Researchers

**File:** `src/components/pages/FollowingResearchers.tsx`
**Tab ID:** `researchers`
**Status:** ✅ Complete

### Purpose
Discover and connect with researchers in the field.

### Screens/Components
- **Directory Search** — Filter by name, field, institution
- **Researcher Card** — Avatar, name, institution, field, bio, followers, publications
- **Follow/Unfollow Button** — Toggle follow status
- **Direct Message Button** — Opens chat sidebar
- **Chat Sidebar** — Message history, input, delivery confirmation

### Data Source
- `researchers` from `AppProvider` (initialized from `INITIAL_RESEARCHERS`)

### Interactions
- Search researchers
- Follow/unfollow researchers
- Send direct messages (local state only)

### Future Improvements
- Researcher profile pages
- Publication feeds per researcher
- Collaboration history
- Research group creation
- Recommendation engine

---

## 9. Trending Topics

**File:** `src/components/pages/TrendingTopics.tsx`
**Tab ID:** `trending`
**Status:** ✅ Complete

### Purpose
Monitor research trends with citation analytics and AI analysis.

### Screens/Components
- **Citation Chart** — Recharts BarChart showing topic citation growth
- **Topic List** — Interactive cards with citation growth %, discussion rate, score
- **AI Trajectory Analyst** — Sidebar with selected topic insight
- **Keyword Clusters** — Related keyword tags

### Data Source
- Hardcoded `TRENDING_TOPICS_LIST` with topic data
- API: `POST /api/generate-insights` for topic-specific insights

### Interactions
- Click topic to select and fetch AI insight
- View citation growth chart
- Read AI trajectory analysis

### Future Improvements
- Real-time citation data from APIs (Semantic Scholar, OpenAlex)
- Trend predictions
- Custom topic tracking
- Citation alert notifications
- Comparative trend analysis

---

## 10. Notifications

**File:** `src/components/pages/NotificationsView.tsx`
**Tab ID:** `notifications`
**Status:** ✅ Complete

### Purpose
Centralized notification center for mentions, invites, and updates.

### Screens/Components
- **Filter Tabs** — All / Unread
- **Notification Card** — Type icon, sender, content, timestamp
- **Type Icons** — Mention (FileText), Invite (UserPlus), Paper Update (Calendar), Comment (AlertCircle)
- **Accept/Decline Buttons** — For workspace invites
- **Mark Read Button** — Per notification
- **Mark All Read Button** — Global action
- **Clear Button** — Delete notification

### Data Source
- `notifications` from `AppProvider` (initialized from `INITIAL_NOTIFICATIONS`)

### Interactions
- Filter by all/unread
- Mark individual notifications as read
- Mark all as read
- Clear/delete notifications
- Accept/decline workspace invites

### Future Improvements
- Push notifications
- Notification preferences
- Email digest
- Real-time notifications via WebSocket
- Notification grouping

---

## 11. Profile

**File:** `src/components/pages/ProfileView.tsx`
**Tab ID:** `profile`
**Status:** ✅ Complete

### Purpose
View and edit researcher profile with publications and metrics.

### Screens/Components
- **Cover Image** — Gradient banner
- **Avatar** — Large profile picture
- **"Verified Scholar" Badge** — Blue verification badge
- **Profile Info** — Name, title, institution, location, bio
- **Edit Mode** — Form to update all profile fields
- **Research Interests** — Editable tag list
- **Publications List** — Linked papers from global state
- **Projects List** — Linked projects from global state
- **Impact Score** — H-Index, Citations count
- **Co-Authors Sidebar** — Connected researchers

### Data Source
- `papers`, `projects` from `AppProvider`
- Local state for editable profile fields

### Interactions
- Toggle edit mode
- Update profile fields
- Add/remove research interests
- View publications and projects

### Future Improvements
- Profile picture upload
- Social links (Google Scholar, ORCID, GitHub)
- Publication statistics charts
- Collaboration network graph
- Profile visibility settings

---

## 12. Publish Papers

**File:** `src/components/pages/PublishPaper.tsx`
**Tab ID:** `publish`
**Status:** ✅ Complete

### Purpose
Submit research papers with AI-assisted pre-review and pipeline tracking.

### Screens/Components
- **Tab Switcher** — Draft & AI Review / Submissions Pipeline
- **Manuscript Form** — Title, venue, co-authors, abstract, tags, PDF upload
- **Co-Authors Input** — Tag-style input with add/remove
- **Tag Input** — Keyword tags with add/remove
- **PDF Upload** — Drag & drop zone with file validation
- **Policy Checkbox** — Academic integrity verification
- **AI Pre-Review Panel** — Predicted score, title review, executive critique, peer questions, keywords
- **Submission Pipeline** — Status badges, AI peer scores, view/download actions

### Data Source
- `projects` from `AppProvider` for project alignment
- API: `POST /api/analyze-draft` for AI pre-review

### Interactions
- Fill manuscript form
- Add/remove co-authors and tags
- Upload PDF via drag & drop or file picker
- Run AI Cognitive Review → calls API
- Submit paper → adds to papers, feed, notifications
- View submission pipeline

### Future Improvements
- Real PDF parsing
- Plagiarism detection
- LaTeX source upload
- Version management
- Co-author invitation workflow
- Reviewer assignment system

---

## 13. Paper Preview Drawer

**File:** `src/components/shared/PaperPreviewDrawer.tsx`
**Trigger:** Any "AI Summary" button
**Status:** ✅ Complete

### Purpose
Slide-over panel showing detailed paper information and AI-generated summary.

### Screens/Components
- **Drawer Header** — "PAPER RESEARCH CONSOLE" title with close button
- **Paper Metadata** — Tags, title, authors, institution
- **Citation Grid** — Citations count, publication, DOI with copy button
- **Abstract Section** — Full paper abstract
- **AI Analysis Console** — Loading state + summary results
  - Synthesis paragraph
  - Key Contributions list
  - Methodology Breakdown
  - Known Gaps & Limitations

### Data Source
- API: `POST /api/summarize` → returns summary, contributions, methodology, limitations

### Interactions
- Open via "AI Summary" button on any paper card
- Close via X button or Escape key
- Copy DOI to clipboard
- View AI-generated analysis

### Future Improvements
- Full paper PDF viewer
- Highlight and annotate
- Related papers sidebar
- Citation network visualization
- Export summary
