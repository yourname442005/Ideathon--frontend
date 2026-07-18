# Design System

## Color Palette

### Primary (Neutral Scale)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `primary-50` | `#F9FAFB` | 249, 250, 251 | Lightest background |
| `primary-100` | `#F3F4F6` | 243, 244, 246 | Muted backgrounds |
| `primary-200` | `#E5E7EB` | 229, 231, 235 | Borders, dividers |
| `primary-300` | `#D1D5DB` | 209, 213, 219 | Strong borders |
| `primary-400` | `#9CA3AF` | 156, 163, 175 | Placeholder text |
| `primary-500` | `#6B7280` | 107, 114, 128 | Secondary text |
| `primary-600` | `#4B5563` | 75, 85, 99 | — |
| `primary-700` | `#374151` | 55, 65, 81 | — |
| `primary-800` | `#1F2937` | 31, 41, 55 | — |
| `primary-900` | `#111827` | 17, 24, 39 | Headings, emphasis |
| `primary-950` | `#030712` | 3, 7, 18 | Darkest black |

### Surface

| Token | Hex | Usage |
|-------|-----|-------|
| `surface` | `#FFFFFF` | Main background |
| `surface-muted` | `#F9F9FB` | Subtle backgrounds, cards |
| `surface-subtle` | `#F4F4F5` | Input backgrounds, tags |
| `surface-dim` | `#F1F5F9` | Hover states |

### Border

| Token | Hex | Usage |
|-------|-----|-------|
| `border` | `#E5E7EB` | Default border |
| `border-strong` | `#D1D5DB` | Emphasized border |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `text-primary` | `#1A1A1A` | Headings, primary text |
| `text-secondary` | `#52525B` | Body text |
| `text-muted` | `#A1A1AA` | Labels, placeholders |

### Violet (AI/Accent)

| Token | Hex | Usage |
|-------|-----|-------|
| `violet-50` | `#F5F3FF` | AI feature backgrounds |
| `violet-100` | `#EDE9FE` | AI borders |
| `violet-200` | `#DDD6FE` | — |
| `violet-500` | `#8B5CF6` | AI icons, accents |
| `violet-600` | `#7C3AED` | — |
| `violet-700` | `#6D28D9` | AI text |
| `violet-900` | `#4C1D95` | — |

### Emerald (Success)

| Token | Hex | Usage |
|-------|-----|-------|
| `emerald-50` | `#ECFDF5` | Success backgrounds |
| `emerald-100` | `#D1FAE5` | Success borders |
| `emerald-200` | `#A7F3D0` | — |
| `emerald-500` | `#10B981` | Success icons |
| `emerald-600` | `#059669` | Success text |
| `emerald-700` | `#047857` | — |

### Amber (Warning/Saved)

| Token | Hex | Usage |
|-------|-----|-------|
| `amber-50` | `#FFFBEB` | Warning backgrounds |
| `amber-100` | `#FEF3C7` | Warning borders |
| `amber-200` | `#FDE68A` | — |
| `amber-500` | `#F59E0B` | Warning icons, saved state |
| `amber-600` | `#D97706` | — |
| `amber-700` | `#B45309` | — |

### Red (Danger/Error)

| Token | Hex | Usage |
|-------|-----|-------|
| `red-50` | `#FEF2F2` | Error backgrounds |
| `red-100` | `#FEE2E2` | Error borders |
| `red-200` | `#FECACA` | — |
| `red-500` | `#EF4444` | Error icons, delete buttons |
| `red-600` | `#DC2626` | Error text |
| `red-700` | `#B91C1C` | — |

### Blue (Info)

| Token | Hex | Usage |
|-------|-----|-------|
| `blue-50` | `#EFF6FF` | Info backgrounds |
| `blue-100` | `#DBEAFE` | Info borders |
| `blue-200` | `#BFDBFE` | — |
| `blue-500` | `#3B82F6` | Info icons |
| `blue-600` | `#2563EB` | — |
| `blue-700` | `#1D4ED8` | Info text |

---

## Typography Scale

### Font Families

| Family | CSS Variable | Usage |
|--------|-------------|-------|
| Inter | `--font-sans` | Body text, UI elements |
| JetBrains Mono | `--font-mono` | Code, labels, badges, stats |
| Playfair Display | `--font-serif` | Serif accent (available, rarely used) |

### Font Sizes (Tailwind)

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-[9px]` | 9px | — | Micro labels |
| `text-[10px]` | 10px | — | Small labels, badges |
| `text-[11px]` | 11px | — | Secondary labels |
| `text-xs` | 12px | 16px | Small body, captions |
| `text-sm` | 14px | 20px | Body text, form inputs |
| `text-base` | 16px | 24px | Default body |
| `text-lg` | 18px | 28px | — |
| `text-xl` | 20px | 28px | Section titles |
| `text-2xl` | 24px | 32px | Page titles |

### Font Weights

| Class | Weight | Usage |
|-------|--------|-------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Emphasized text |
| `font-semibold` | 600 | Headings, labels |
| `font-bold` | 700 | Strong emphasis, titles |

### Typography Patterns

```
Page Title:     text-2xl font-semibold tracking-tight text-zinc-900
Section Title:  text-sm font-semibold text-zinc-900
Card Title:     text-xs font-bold text-zinc-900
Body Text:      text-xs text-zinc-600 leading-relaxed
Caption:        text-[10px] font-mono text-zinc-400 uppercase tracking-wider
Badge:          text-[10px] font-mono font-semibold
Link:           text-xs font-semibold text-zinc-700 hover:text-black
```

---

## Spacing System

### Design Tokens

| Token | Tailwind | Value | Usage |
|-------|----------|-------|-------|
| `xs` | `p-1` / `gap-1` | 4px | Tight spacing |
| `sm` | `p-2` / `gap-2` | 8px | Small spacing |
| `md` | `p-3` / `gap-3` | 12px | Default spacing |
| `lg` | `p-4` / `gap-4` | 16px | Medium spacing |
| `xl` | `p-6` / `gap-6` | 24px | Large spacing |
| `2xl` | `p-8` / `gap-8` | 32px | Section spacing |
| `3xl` | `p-12` | 48px | Page padding |

### Layout Spacing

```
Page Content Padding:    p-6 (24px)
Section Gap:             space-y-6 (24px vertical)
Card Padding:            p-5 (20px)
Card Inner Gap:          space-y-3 to space-y-4 (12-16px)
Grid Gap:                gap-4 (16px)
Flex Gap:                gap-2 to gap-4 (8-16px)
Sidebar Padding:         p-5 (20px)
Header Padding:          px-6 (24px horizontal)
```

---

## Border Radius Tokens

| Token | Tailwind | Value | Usage |
|-------|----------|-------|-------|
| `sm` | `rounded-lg` | 0.375rem (6px) | Inputs, small elements |
| `md` | `rounded-xl` | 0.5rem (8px) | Buttons, tags |
| `lg` | `rounded-2xl` | 0.75rem (12px) | Cards, containers |
| `xl` | `rounded-2xl` | 1rem (16px) | Modals |
| `2xl` | `rounded-2xl` | 1.25rem (20px) | Large cards |
| `full` | `rounded-full` | 9999px | Pills, avatars, badges |

### Component Radii

```
Cards:          rounded-2xl
Buttons:        rounded-full (pill)
Badges:         rounded-full
Tags:           rounded-full
Inputs:         rounded-lg
Modals:         rounded-2xl
Avatars:        rounded-full
Toast:          rounded-xl
Kanban Cards:   rounded-xl
```

---

## Shadow Tokens

| Token | Tailwind | Value |
|-------|----------|-------|
| `xs` | `shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `sm` | `shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `md` | `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `lg` | `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |

### Shadow Usage

```
Cards (default):    border only (no shadow)
Cards (hover):      hover:shadow-xs
Modals:             shadow-lg
Toasts:             shadow-lg
Dropdowns:          shadow-md
Right Sidebar:      none (border only)
Drawer:             shadow-2xl
```

---

## Animation Catalog

### Keyframes (defined in `globals.css`)

| Animation | From | To | Duration |
|-----------|------|----|----------|
| `fade-in` | opacity: 0, translateY(4px) | opacity: 1, translateY(0) | 0.2s |
| `fade-in-up` | opacity: 0, translateY(8px) | opacity: 1, translateY(0) | 0.3s |
| `slide-in-from-right` | translateX(100%) | translateX(0) | 0.25s |
| `slide-in-from-left` | translateX(-100%) | translateX(0) | 0.25s |
| `scale-in` | opacity: 0, scale(0.95) | opacity: 1, scale(1) | 0.15s |
| `pulse-subtle` | opacity: 1 | opacity: 0.7 | 2s infinite |

### Animation Classes

| Class | Usage |
|-------|-------|
| `animate-fade-in` | General entrance |
| `animate-fade-in-up` | Card/post entrance |
| `animate-slide-in-from-right` | Drawer, toast entrance |
| `animate-slide-in-from-left` | Sidebar entrance |
| `animate-scale-in` | Modal entrance |
| `animate-pulse-subtle` | Loading states |
| `animate-spin` | Loading spinners (Tailwind) |
| `animate-pulse` | Badge dots, status indicators |

### Transition Speeds

| Token | Value | Usage |
|-------|-------|-------|
| `fast` | `150ms ease` | Micro-interactions |
| `normal` | `200ms ease` | Hover states, toggles |
| `slow` | `300ms ease` | Page transitions |

---

## Component Variants

### Button Variants

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | black | white | none | zinc-800 |
| `secondary` | white | zinc-700 | zinc-200 | zinc-50 |
| `ghost` | transparent | zinc-600 | none | zinc-100 |
| `danger` | red-600 | white | none | red-700 |

### Badge Variants

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| `default` | zinc-100 | zinc-600 | zinc-200 |
| `success` | emerald-50 | emerald-700 | emerald-200 |
| `warning` | amber-50 | amber-700 | amber-200 |
| `error` | red-50 | red-700 | red-200 |
| `info` | blue-50 | blue-700 | blue-200 |
| `violet` | violet-50 | violet-700 | violet-200 |

### Card Hover States

```
Default:      border border-zinc-200 bg-white
Hover:        hover:border-zinc-300 hover:shadow-xs
Active Tab:   bg-black text-white (Sidebar)
Inactive:     text-zinc-500 hover:bg-zinc-50
```

### Input States

```
Default:      border-zinc-200 bg-white
Focus:        border-zinc-400 ring-2 ring-zinc-100
Error:        border-red-300 ring-red-100
Disabled:     opacity-50 cursor-not-allowed
```

### Toast Variants

| Type | Background | Border | Text |
|------|-----------|--------|------|
| `success` | emerald-50 | emerald-200 | emerald-800 |
| `error` | red-50 | red-200 | red-800 |
| `warning` | amber-50 | amber-200 | amber-800 |
| `info` | white | zinc-200 | zinc-800 |
