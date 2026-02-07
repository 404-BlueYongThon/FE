# Emergency AI Call

> AI 기반 응급 병원 자동 연결 시스템

**Emergency AI Call**은 AI가 동시에 여러 병원에 전화하여 응급 환자를 위한 최적의 병원을 찾아주는 시스템입니다.

## Problem

한국에서는 응급환자 발생 시, 구급대원이 병원에 일일이 전화를 돌려야 합니다.
병원의 거절로 구급차가 뺑뺑이를 돌게 되고, **골든타임이 지나가 환자를 살리지 못하는 사례**가 반복됩니다.

## Solution

AI가 **5개 병원에 동시 전화**를 걸어 수용 가능 여부를 확인합니다.
가장 먼저 수락한 병원이 확정되면 나머지 전화는 자동 종료됩니다.

- 평균 대기 시간 **5분 → 30초** 단축
- 응급대원의 전화 업무 부담 제거
- 환자 생존율 향상

## Tech Stack

| Technology    | Version | Purpose                      |
|---------------|---------|------------------------------|
| Next.js       | 16.1    | App Router, Turbopack        |
| React         | 19.2    | UI Library                   |
| TypeScript    | 5.9     | Type Safety                  |
| Tailwind CSS  | 4.1     | Styling (@theme API, v4)     |
| shadcn/ui     | latest  | UI Components                |
| Framer Motion | 12      | Animation                    |
| pnpm          | 10+     | Package Manager              |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Lint & type check
pnpm lint
pnpm type-check
```

## Project Structure

```
app/
  page.tsx                  # Landing page
  checklist/page.tsx        # Patient info + KTAS classification
  dashboard/[id]/page.tsx   # Real-time hospital matching dashboard
  sitemap.ts                # Dynamic sitemap generation
  layout.tsx                # Root layout (SEO, theme, navigation)

components/
  layout/                   # Header, Footer, BottomNav, PageTransition
  theme/                    # ThemeProvider, ThemeToggle (ripple animation)
  ui/                       # shadcn/ui components (button, card, badge, status-indicator)

public/
  manifest.json             # PWA configuration
  robots.txt                # Search engine crawling rules
  icon.svg                  # App icon (medical cross + signal)
```

## Features

- **KTAS Classification**: Korean Triage and Acuity Scale (1-5) severity input
- **Real-time Dashboard**: Simulated parallel hospital calling with live status updates
- **Dark Mode**: Bidirectional ripple circle-expand theme toggle animation
- **PWA Ready**: Web app manifest, SEO optimized, mobile-first responsive design
- **Accessibility**: 44px touch targets, high contrast, WCAG 2.2 compliant

## Team

**404_found** - Built for [Chungramthon 2026](https://github.com/404-BlueYongThon)

## License

This project was created for a hackathon and is not licensed for commercial use.
