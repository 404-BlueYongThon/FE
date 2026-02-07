# CLAUDE.md — Emergency AI Call Frontend Development Guide

> This document provides guidelines for AI coding assistants when writing, reviewing, or modifying code in the Emergency AI Call Frontend project.
> **All comments, commit messages, and documentation must be written in English.**

---

## Project Overview

**Emergency AI Call** is a real-time emergency medical coordination system that uses AI to automatically call multiple hospitals simultaneously to find available beds for emergency patients, reducing the time paramedics spend making individual phone calls.

- **Problem**: In Korea, emergency patients face rejection from hospitals due to financial reasons, leading to "ambulance circling" and missed golden hour treatment time
- **Solution**: AI-powered parallel calling system that contacts 5 hospitals simultaneously, automatically routing patients to the first accepting hospital
- **Context**: Hackathon project for 청룡톤 2026 (Chungramthon 2026)
- **Theme**: "For me and the people around me" - inspired by real stories of families who experienced this problem

---

## Tech Stack

| Technology    | Version | Purpose                                |
| ------------- | ------- | -------------------------------------- |
| Next.js       | 16.1    | App Router, Turbopack                  |
| React         | 19.2    | UI Library                             |
| TypeScript    | 5.9     | Type Safety                            |
| Tailwind CSS  | 4.1     | @theme API-based styling (v4)          |
| shadcn/ui     | latest  | UI Components (Tailwind v4 compatible) |
| Framer Motion | 12      | Animation                              |
| pnpm          | 10+     | Package Manager                        |

---

## Project Structure

```
FE/
├── app/                         # Next.js App Router
│   ├── checklist/              # Patient checklist page
│   │   └── page.tsx
│   ├── dashboard/              # Hospital status dashboard
│   │   └── [id]/
│   │       └── page.tsx
│   ├── layout.tsx              # Root layout (ThemeProvider + Header + Footer + BottomNav)
│   ├── page.tsx                # Landing page
│   └── globals.css             # Tailwind v4 design tokens + view transitions
├── components/                  # React components
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx          # Sticky header with nav + theme toggle
│   │   ├── Footer.tsx          # Desktop-only footer
│   │   ├── BottomNav.tsx       # Mobile-only bottom navigation
│   │   ├── PageTransition.tsx  # Framer Motion page transitions
│   │   └── PageContainer.tsx   # Responsive max-width container
│   ├── theme/                  # Theme system
│   │   ├── ThemeProvider.tsx   # next-themes provider
│   │   └── ThemeToggle.tsx     # Ripple circle-expand dark mode toggle
│   └── ui/                     # shadcn/ui base components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── status-indicator.tsx
├── hooks/                       # Custom React hooks
│   ├── use-emergency-request.ts
│   └── use-hospital-status.ts
├── lib/                         # Utilities
│   ├── utils.ts                # cn() className helper
│   └── env.ts                  # Environment URL helpers
├── types/                       # TypeScript types
│   └── index.ts                # Core type definitions
└── public/                      # Static assets
```

---

## Coding Conventions

### TypeScript

- `strict: true` is required
- `any` is forbidden → use `unknown`
- `as any`, `@ts-ignore`, `@ts-expect-error` are strictly forbidden
- `interface` → Public API, `type` → Internal use
- Use type-only imports: `import type { Type } from '...'`

### React Components

```typescript
// ✅ Function declaration + default export
export default function PatientChecklist() {
  return <div>...</div>;
}

// ❌ Arrow function component
const PatientChecklist = () => { ... };
```

- Server Components by default, use `'use client'` only when necessary
- Define Props types in the same file as the component
- Component files use PascalCase: `PatientChecklist.tsx`

### Naming

| Target              | Rule             | Example                    |
| ------------------- | ---------------- | -------------------------- |
| File (Component)    | PascalCase       | `PatientChecklist.tsx`    |
| File (Hook)        | kebab-case       | `use-emergency-request.ts` |
| Variable/Function   | camelCase        | `submitRequest`, `isLoading` |
| Constant           | UPPER_SNAKE_CASE | `KTAS_CATEGORIES`       |
| Type/Interface      | PascalCase       | `PatientData`, `KTASLevel`  |

### Import Order

```typescript
// 1. React/Next.js
import { useState } from 'react';
import Link from 'next/link';

// 2. External libraries
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

// 3. Project internal (absolute paths @/*)
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 4. Types (type-only import, always last)
import type { PatientData, KTASLevel } from '@/types';
```

---

## UI/UX Guidelines for Emergency Applications

### Color Semantics

| Color       | Purpose                          | Usage                      |
| ----------- | -------------------------------- | -------------------------- |
| Critical    | Life-threatening, emergency        | Rejected, KTAS 1, errors |
| Urgent      | Immediate action required          | KTAS 2, calling in progress |
| Success     | Approved, safe, completed        | Hospital accepted          |
| Info        | Information, neutral status       | Pending, processing       |
| Warning     | Caution, attention needed        | Timeout, KTAS 3-5         |

### Accessibility Requirements

- **Touch Targets**: Minimum 44x44px for all interactive elements
- **Contrast Ratio**: Minimum 4.5:1 for text (WCAG 2.2)
- **Large Text**: Minimum 16px for body text, 18px for headers
- **Error Indication**: Use both color AND icon/shape for status (accessible to colorblind users)

### High-Stress Design Principles

1. **One-Tap Actions**: Critical actions should be single taps
2. **Progressive Disclosure**: Show only essential information first
3. **Clear Hierarchy**: Priority should be visually obvious
4. **No Scrollbars**: Keep all information visible on one screen when possible

---

## Anti-Patterns

### TypeScript

- `as any`, `@ts-ignore`, `@ts-expect-error` — Strictly forbidden
- Empty catch blocks `catch(e) {}` — Error handling is required

### React

- Overuse of `useEffect` — Calculate derived state during rendering
- Inline styles — Use Tailwind CSS
- Skipping `'use client'` when using hooks (useState, etc.)

### UI/UX

- Small touch targets (< 44x44px) — Accessibility violation
- Color-only status indicators — Not accessible to colorblind users
- Dense information layout — Bad for high-stress emergency situations

---

## Common Commands

```bash
# Development server
pnpm dev

# Build
pnpm build

# Lint
pnpm lint

# Type check
pnpm type-check

# Format
pnpm format
```

---

## Storytelling for Presentation

When presenting to judges:

1. **Hook**: Start with the real story - team member's family member experienced this
2. **Problem**: Explain "golden hour" loss due to hospital rejections
3. **Solution**: Show how AI parallel calling reduces time from minutes to seconds
4. **Impact**: Emphasize "for me and the people around me"
5. **Demo**: Live demonstration of the checklist → dashboard flow

Key talking points:
- Korea's emergency care crisis (inspirational story: 중증외상센터 webtoon/drama)
- Real-world impact (team member's personal experience)
- Technical innovation (parallel AI calling with Twilio)
- Accessibility-first design (large touch targets, high contrast)

---

## Reference Materials

### AgentGram Reference Project

This project follows coding conventions and patterns from [AgentGram](https://github.com/agentgram/agentgram):
- Project structure and organization
- TypeScript/React best practices
- Tailwind CSS v4 design system
- shadcn/ui component library setup

### Emergency Medical Research

- **KTAS (Korean Triage and Acuity Scale)**: Patient severity classification
- **Golden Hour**: First 60 minutes after traumatic injury
- **PulsePoint**: Real-time EMS dashboard patterns
- **NEMSIS v3.5.1**: National EMS information system standards
