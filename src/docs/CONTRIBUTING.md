# Contributing Guide

## Development Setup

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm 9+

### Getting Started

```bash
# Clone the repository
git clone <repo-url>

# Navigate to project
cd ideathon-next

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure Conventions

### Directory Layout

```
src/
├── app/
│   ├── api/              # API route handlers (Next.js Route Handlers)
│   │   └── [endpoint]/
│   │       └── route.ts  # POST handler
│   ├── globals.css       # Global styles, Tailwind config, animations
│   ├── layout.tsx        # Root layout (server component)
│   └── page.tsx          # Main SPA entry (client component)
├── components/
│   ├── layout/           # Layout components (Sidebar, Header, RightSidebar)
│   ├── pages/            # Page components (one per tab)
│   ├── providers/        # Context providers (AppProvider, ToastProvider)
│   ├── shared/           # Shared components (PaperPreviewDrawer)
│   └── ui/               # Reusable UI primitives (Button, Card, etc.)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, types, constants, mock data
└── docs/                 # Project documentation
```

---

## File Naming Conventions

### Components

- **PascalCase** for component files: `ResearchFeed.tsx`, `PaperPreviewDrawer.tsx`
- **One component per file** — default export
- **Co-locate related files** — no separate folders for component styles/types

### Utilities & Helpers

- **camelCase** for utility files: `utils.ts`, `constants.ts`, `data.ts`
- **camelCase** for hooks: `useToast.tsx`, `useMediaQuery.ts`

### Types

- Types go in `src/lib/types.ts`
- One file for all shared TypeScript interfaces
- Use `export interface` for all types

### API Routes

- **kebab-case** directory names: `generate-insights/`, `chat-assistant/`
- File must be named `route.ts`
- Export named function matching HTTP method: `export async function POST()`

---

## Coding Conventions

### TypeScript

- Strict mode is enabled in `tsconfig.json`
- Use typed props for all components
- Prefer `interface` over `type` for object shapes
- Use `@/*` path alias for imports from `src/`

```typescript
// Good
import { Paper } from "@/lib/types";
import { Button } from "@/components/ui";

// Avoid
import { Paper } from "../../lib/types";
```

### Component Patterns

```typescript
// Component file structure
"use client"; // Only if interactive

import React from "react";
import { cn } from "@/lib/utils";
// Other imports

interface MyComponentProps {
  // Props with types
}

export default function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // Hooks at top
  // Handlers
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Styling

- Use Tailwind CSS utility classes exclusively
- Use `cn()` helper for conditional classes
- Use design tokens from `src/lib/constants.ts` when needed
- No CSS modules, no inline styles (except dynamic values)

```typescript
// Good — cn() helper
<button className={cn(
  "px-4 py-2 rounded-full",
  isActive && "bg-black text-white",
  className
)} />

// Good — Design tokens
<div style={{ color: COLORS.violet[500] }} />

// Avoid — Inline styles for static values
<div style={{ padding: "16px" }} />
```

### State Management

- Use `AppProvider` context for shared state
- Use local `useState` for component-specific state
- Use `useCallback` for handlers passed to children
- Never put large objects in context that change frequently

### Imports Order

```typescript
// 1. React/Next.js
import React, { useState } from "react";

// 2. External libraries
import { Sparkles } from "lucide-react";
import { AreaChart } from "recharts";

// 3. Internal — UI components
import { Button, Card } from "@/components/ui";

// 4. Internal — Layout/page components
import Sidebar from "@/components/layout/Sidebar";

// 5. Internal — Hooks
import { useApp } from "@/components/providers/AppProvider";

// 6. Internal — Utilities
import { cn } from "@/lib/utils";
import { Paper } from "@/lib/types";
```

---

## Accessibility Standards

### Required Practices

1. **ARIA Labels**: All interactive elements must have accessible labels
   ```tsx
   <button aria-label="Close dialog">X</button>
   <input aria-label="Search papers" />
   ```

2. **Semantic HTML**: Use proper HTML elements
   ```tsx
   <nav aria-label="Main navigation">...</nav>
   <header role="banner">...</header>
   <main>...</main>
   ```

3. **Focus Management**: Modals must trap focus and return focus on close
   ```tsx
   // Modal uses useEscapeKey and focus trap in useEffect
   ```

4. **Screen Reader Announcements**: Use `announceToScreenReader()` for dynamic updates
   ```typescript
   import { announceToScreenReader } from "@/lib/utils";
   announceToScreenReader("Paper saved to library");
   ```

5. **Keyboard Navigation**: All interactive elements must be keyboard accessible
   ```tsx
   <Card
     onClick={handleClick}
     // Card automatically adds:
     // role="button", tabIndex={0}, onKeyDown for Enter/Space
   />
   ```

6. **Color Contrast**: Text must meet WCAG AA contrast ratios
   - Primary text (#1A1A1A) on white: 16.75:1 ✓
   - Secondary text (#52525B) on white: 7.43:1 ✓

---

## Pull Request Guidelines

### Before Submitting

1. Run `npm run lint` and fix all errors
2. Run `npm run build` to verify no build errors
3. Test all tab navigation works
4. Test all interactive features in affected pages
5. Verify accessibility (keyboard nav, screen reader)

### PR Description Template

```markdown
## What
Brief description of changes.

## Why
Context for why this change is needed.

## Changes
- Change 1
- Change 2

## Testing
- [ ] All tabs render correctly
- [ ] Interactive features work
- [ ] No console errors
- [ ] Build passes
- [ ] Lint passes
```

### Code Review Checklist

- [ ] TypeScript types are correct
- [ ] No `any` types used
- [ ] Components use proper ARIA attributes
- [ ] No hardcoded values — use constants/tokens
- [ ] State updates are efficient (no unnecessary re-renders)
- [ ] New features have proper error handling
- [ ] Code follows existing patterns in the codebase

---

## Adding New Features

### New Page/Tab

1. Create component in `src/components/pages/NewPage.tsx`
2. Add tab ID to `AppProvider` state
3. Add conditional render in `page.tsx`
4. Add navigation item in `Sidebar.tsx`
5. Update `src/lib/types.ts` if new types are needed
6. Add mock data to `src/lib/data.ts` if needed

### New API Route

1. Create `src/app/api/new-endpoint/route.ts`
2. Export `POST` function
3. Use `NextRequest` and `NextResponse`
4. Return mock data
5. Document in `src/docs/API_REFERENCE.md`

### New UI Component

1. Create in `src/components/ui/NewComponent.tsx`
2. Define props interface
3. Add default export
4. Export from `src/components/ui/index.ts`
5. Document in `src/docs/COMPONENT_GUIDE.md`

### New Custom Hook

1. Create in `src/hooks/useNewHook.ts`
2. Export from `src/hooks/index.ts`
3. Document in `src/docs/COMPONENT_GUIDE.md`
