# Future Roadmap

## Phase 1: Authentication (Clerk Integration)

### Clerk Authentication

**Priority:** High
**Estimated Effort:** 2-3 weeks

#### Features
- User registration (email/password, Google, GitHub SSO)
- Login/logout flow
- Session management
- User profile from Clerk metadata
- Protected routes

#### Implementation

```typescript
// src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}

// Protected page
import { auth } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  // ...
}
```

#### Files to Modify
- `src/app/layout.tsx` — Wrap with `ClerkProvider`
- `src/components/layout/Sidebar.tsx` — Show user from Clerk
- `src/components/layout/Header.tsx` — User avatar from Clerk
- `src/components/pages/ProfileView.tsx` — Editable Clerk metadata
- New: `src/app/sign-in/[[...sign-in]]/page.tsx`
- New: `src/app/sign-up/[[...sign-up]]/page.tsx`
- New: `src/middleware.ts` — Route protection

---

## Phase 2: Backend API Integration

### RESTful API

**Priority:** High
**Estimated Effort:** 4-6 weeks

#### Architecture

```
Frontend (Next.js) → Backend API (Node.js/Express or NestJS) → Database (PostgreSQL)
```

#### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/papers` | List papers with pagination |
| GET | `/api/papers/:id` | Get paper details |
| POST | `/api/papers` | Create paper |
| PUT | `/api/papers/:id` | Update paper |
| DELETE | `/api/papers/:id` | Delete paper |
| GET | `/api/papers/search` | Search papers |
| POST | `/api/papers/:id/summarize` | AI summary |
| GET | `/api/projects` | List projects |
| POST | `/api/projects` | Create project |
| GET | `/api/collections` | List collections |
| POST | `/api/collections` | Create collection |
| GET | `/api/feed` | Get feed items |
| POST | `/api/feed` | Create feed post |
| GET | `/api/researchers` | List researchers |
| POST | `/api/researchers/:id/follow` | Follow researcher |
| GET | `/api/notifications` | List notifications |
| PUT | `/api/notifications/:id/read` | Mark as read |
| POST | `/api/ai/search` | AI semantic search |
| POST | `/api/ai/chat` | AI chat assistant |
| POST | `/api/ai/analyze` | AI draft analysis |
| POST | `/api/ai/insights` | AI topic insights |

#### Files to Create
- `src/lib/api.ts` — API client with fetch wrapper
- `src/hooks/useApi.ts` — React Query hooks
- `src/types/api.ts` — API response types

---

## Phase 3: Database Integration

### PostgreSQL + Prisma

**Priority:** High
**Estimated Effort:** 3-4 weeks

#### Schema Design

```prisma
// prisma/schema.prisma
model User {
  id            String    @id @default(cuid())
  clerkId       String    @unique
  name          String
  email         String    @unique
  avatar        String?
  institution   String?
  role          String    @default("researcher")
  bio           String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  papers        Paper[]
  projects      Project[]
  collections   Collection[]
  notes         Note[]
  tasks         Task[]
  feedPosts     FeedItem[]
  notifications Notification[]
  following     Follow[]
  followers     Follow[]
}

model Paper {
  id            String    @id @default(cuid())
  title         String
  authors       String
  institution   String
  year          String
  journal       String?
  abstract      String
  citations     Int       @default(0)
  tags          String[]
  pdfUrl        String?
  doi           String
  saved         Boolean   @default(false)
  bookmarked    Boolean   @default(false)
  authorId      String
  author        User      @relation(fields: [authorId], references: [id])
  collections   Collection[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Project {
  id            String    @id @default(cuid())
  name          String
  description   String
  progress      Int       @default(0)
  papersCount   Int       @default(0)
  tasksCount    Int       @default(0)
  authorId      String
  author        User      @relation(fields: [authorId], references: [id])
  members       ProjectMember[]
  tasks         Task[]
  notes         Note[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Collection {
  id            String    @id @default(cuid())
  name          String
  description   String?
  papersCount   Int       @default(0)
  isShared      Boolean   @default(false)
  isPinned      Boolean   @default(false)
  color         String?
  authorId      String
  author        User      @relation(fields: [authorId], references: [id])
  papers        Paper[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Task {
  id            String    @id @default(cuid())
  title         String
  status        String    @default("todo")
  assignee      String
  dueDate       String
  projectId     String
  project       Project   @relation(fields: [projectId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Note {
  id            String    @id @default(cuid())
  title         String
  content       String
  author        String
  projectId     String?
  project       Project?  @relation(fields: [projectId], references: [id])
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model FeedItem {
  id            String    @id @default(cuid())
  action        String
  title         String
  content       String
  likes         Int       @default(0)
  authorId      String
  author        User      @relation(fields: [authorId], references: [id])
  paperId       String?
  comments      Comment[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Comment {
  id            String    @id @default(cuid())
  content       String
  author        String
  feedItemId    String
  feedItem      FeedItem  @relation(fields: [feedItemId], references: [id])
  createdAt     DateTime  @default(now())
}

model Notification {
  id            String    @id @default(cuid())
  type          String
  sender        String
  content       String
  read          Boolean   @default(false)
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  createdAt     DateTime  @default(now())
}

model Researcher {
  id            String    @id @default(cuid())
  name          String
  avatar        String?
  institution   String
  field         String
  followers     Int       @default(0)
  publications  Int       @default(0)
  bio           String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Follow {
  id            String    @id @default(cuid())
  followerId    String
  follower      User      @relation(fields: [followerId], references: [id])
  followingId   String
  following     User      @relation(fields: [followingId], references: [id])
  createdAt     DateTime  @default(now())
  
  @@unique([followerId, followingId])
}
```

#### Files to Create
- `prisma/schema.prisma` — Database schema
- `prisma/seed.ts` — Seed data
- `src/lib/db.ts` — Prisma client singleton
- `src/app/api/` — All API routes rewritten with Prisma

---

## Phase 4: RBAC System

### Role-Based Access Control

**Priority:** Medium
**Estimated Effort:** 2-3 weeks

#### Roles

| Role | Permissions |
|------|------------|
| `admin` | Full access, manage users, manage all content |
| `researcher` | Create/edit own papers, projects, collections; follow others |
| `viewer` | Read-only access to public content |

#### Implementation

```typescript
// src/lib/rbac.ts
export type Role = "admin" | "researcher" | "viewer";

export const permissions = {
  admin: ["*"],
  researcher: [
    "papers:create",
    "papers:read",
    "papers:update",
    "papers:delete:own",
    "projects:create",
    "projects:read",
    "projects:update",
    "projects:delete:own",
    "collections:create",
    "collections:read",
    "collections:update",
    "collections:delete:own",
    "feed:create",
    "feed:read",
    "researchers:follow",
    "notifications:read",
  ],
  viewer: [
    "papers:read",
    "projects:read",
    "collections:read",
    "feed:read",
    "researchers:read",
  ],
} as const;

export function hasPermission(role: Role, permission: string): boolean {
  const rolePermissions = permissions[role] || [];
  if (rolePermissions.includes("*")) return true;
  return rolePermissions.includes(permission);
}
```

---

## Phase 5: Real-Time Features

### WebSocket Integration

**Priority:** Medium
**Estimated Effort:** 3-4 weeks

#### Features
- Real-time collaborative chat (Socket.io or Pusher)
- Live cursor positions in collaborative editing
- Real-time notification delivery
- Live paper citation updates
- Presence indicators (who's online)

#### Architecture

```
Client ←→ WebSocket Server ←→ PostgreSQL
              ↕
         Redis (pub/sub)
```

---

## Phase 6: Analytics Dashboard

### Research Analytics

**Priority:** Medium
**Estimated Effort:** 2-3 weeks

#### Features
- Citation tracking over time (Semantic Scholar API, OpenAlex)
- H-index calculation
- Reading statistics (papers read, time spent)
- Collaboration network graph
- Export analytics as PDF/CSV

#### APIs to Integrate
- **Semantic Scholar API** — Free citation data
- **OpenAlex API** — Free academic metadata
- **CrossRef API** — DOI metadata

---

## Phase 7: Payment Integration

### Subscription Tiers

**Priority:** Low
**Estimated Effort:** 2-3 weeks

#### Tiers

| Tier | Price | Features |
|------|-------|----------|
| Free | $0/mo | 10 papers, 2 projects, basic search |
| Pro | $19/mo | Unlimited papers, AI search, analytics |
| Team | $49/mo | Team collaboration, shared workspaces, RBAC |

#### Implementation
- **Stripe** for payment processing
- **Clerk** for subscription management
- Feature gating based on subscription tier

---

## Phase 8: Mobile Responsive

### Adaptive Layouts

**Priority:** Medium
**Estimated Effort:** 2-3 weeks

#### Breakpoints

| Breakpoint | Layout |
|------------|--------|
| `< 640px` | Mobile: Bottom tab navigation, single column |
| `640-1024px` | Tablet: Collapsible sidebar, two columns |
| `> 1024px` | Desktop: Full three-column layout (current) |

#### Changes
- Convert `Sidebar` to bottom navigation on mobile
- Stack `RightSidebar` content below main content on tablet
- Make `PaperPreviewDrawer` full-screen on mobile
- Responsive grid layouts (1 → 2 → 3 columns)

---

## Implementation Timeline

| Phase | Weeks | Priority |
|-------|-------|----------|
| Phase 1: Clerk Auth | 2-3 | High |
| Phase 2: Backend API | 4-6 | High |
| Phase 3: Database | 3-4 | High |
| Phase 4: RBAC | 2-3 | Medium |
| Phase 5: Real-Time | 3-4 | Medium |
| Phase 6: Analytics | 2-3 | Medium |
| Phase 7: Payment | 2-3 | Low |
| Phase 8: Mobile | 2-3 | Medium |
| **Total** | **20-29 weeks** | — |

---

## Technology Recommendations

| Category | Recommended | Alternative |
|----------|-------------|-------------|
| Auth | Clerk | NextAuth.js, Auth0 |
| Database | PostgreSQL + Prisma | Supabase, PlanetScale |
| ORM | Prisma | Drizzle, TypeORM |
| API | REST (Express/NestJS) | tRPC, GraphQL |
| Real-Time | Socket.io | Pusher, Ably, Liveblocks |
| State | Zustand + React Query | Jotai, Redux Toolkit |
| Payments | Stripe | Lemon Squeezy |
| Hosting | Vercel + Railway | AWS, DigitalOcean |
| File Storage | Cloudflare R2 | AWS S3, Supabase Storage |
