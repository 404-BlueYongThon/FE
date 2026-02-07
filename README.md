<div align="center">

![404 Found Banner](./assets/banner.png)

**Emergency AI Call: Real-time Emergency Medical Coordination System**

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://emergency-ai-call.log8.kr)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](https://emergency-ai-call.log8.kr) | [Backend Repo](https://github.com/404-BlueYongThon/BE) | [Organization](https://github.com/404-BlueYongThon)

</div>

---

## Overview

Emergency AI Call은 응급 환자의 골든아워 확보를 위해 AI를 활용한 실시간 병원 매칭 시스템의 프론트엔드 인터페이스입니다. 응급대원이 현장에서 환자 정보를 신속하게 입력하고, 여러 병원에 동시에 전화를 걸어 수용 가능 여부를 실시간으로 확인하는 대시보드를 제공합니다.

This is the frontend interface for the Emergency AI Call system, designed to secure the "golden hour" for emergency patients. It provides a streamlined checklist for paramedics and a real-time dashboard to monitor parallel AI-powered hospital calls.

---

## Core Features

- **KTAS-based Patient Checklist**: 한국형 응급환자 분류도구(KTAS) 기준에 맞춘 체크리스트를 제공하며, Dropdown 대신 Chip 기반의 UI를 채택하여 긴박한 상황에서도 오조작 없는 빠른 선택이 가능합니다.
- **Real-time Hospital Matching Dashboard**: SSE(Server-Sent Events)를 통해 병원별 통화 상태(Calling, Ringing, In-progress, Accepted/Rejected)를 실시간으로 시각화합니다.
- **Voice-to-Form Auto-fill**: Web Speech API와 Gemini 2.5 Flash Lite를 결합하여, 대원의 음성을 2초 간격으로 분석하고 체크리스트 항목을 자동으로 채워주는 기능을 제공합니다.
- **Ripple Circle-expand Theme Toggle**: View Transitions API를 활용하여 부드러운 원형 확장 애니메이션과 함께 다크 모드 전환을 수행합니다.
- **Reverse Geocoding Location**: Nominatim API를 사용하여 현재 위치의 좌표를 실제 주소로 변환하여 화면에 표시합니다.

---

## Technical Decisions

- **Native fetch and EventSource over axios and TanStack Query**: 프로젝트의 네트워크 요구사항이 단일 POST 엔드포인트와 단일 SSE 스트림으로 명확하여, 추가적인 라이브러리 도입 없이 브라우저 표준 API만으로 구현했습니다. 이를 통해 번들 사이즈를 최소화하고 의존성을 줄였습니다.
- **SSE over WebSocket**: 서버에서 클라이언트로의 단방향 상태 업데이트가 주된 요구사항이므로, WebSocket보다 가볍고 자동 재연결을 기본 지원하는 SSE를 선택했습니다. HTTP/2 및 Cloudflare Tunnel 환경에서도 별도의 설정 없이 안정적으로 동작합니다.
- **sessionStorage for SSE timing gap**: 매칭 시작 요청 후 대시보드로 이동하는 과정에서 발생하는 SSE 연결 지연 문제를 해결하기 위해, POST 응답으로 받은 초기 병원 목록을 sessionStorage에 저장하여 즉시 렌더링하고 이후 SSE 스트림이 이를 덮어쓰도록 구현했습니다.
- **Gemini as client-side NLP**: 음성 텍스트 분석을 서버를 거치지 않고 클라이언트에서 Gemini 2.5 Flash Lite API를 통해 직접 수행합니다. 이를 통해 2초 이내의 빠른 피드백 루프를 구현하고 백엔드 서버의 부하를 방지했습니다.
- **Design token system for emergency color semantics**: shadcn/ui의 기본 테마 외에 응급 상황의 시급성을 나타내는 전용 시맨틱 컬러(--critical, --urgent, --success, --info, --warning)를 정의했습니다. 고대비 환경에서도 가독성을 유지하도록 라이트/다크 모드를 독립적으로 튜닝했습니다.
- **View Transitions API for theme toggle**: startViewTransition과 clip-path를 활용하여 테마 전환 시 시각적 피드백을 강화했습니다. 브라우저 미지원 환경이나 prefers-reduced-motion 설정 시에는 애니메이션 없이 즉시 전환되도록 폴백을 구현했습니다.
- **44px minimum touch targets**: 흔들리는 구급차 내부나 장갑을 착용한 상태에서도 정확한 조작이 가능하도록 모든 인터랙티브 요소에 대해 최소 44x44px의 터치 영역을 강제했습니다.
- **Tailwind CSS v4 @theme API**: tailwind.config.ts 대신 새로운 CSS-first 구성 방식을 채택했습니다. 디자인 토큰이 CSS 변수와 직접 매핑되어 런타임 테마 전환이 용이하며 설정 파일 관리가 단순화되었습니다.

---

## Tech Stack

| Category        | Technology            | Version | Purpose                                 |
| --------------- | --------------------- | ------- | --------------------------------------- |
| Framework       | Next.js               | 16.1    | App Router, Turbopack                   |
| Language        | TypeScript            | 5.9     | Strict mode development                 |
| UI Library      | React                 | 19.2    | use() hook, Server Components           |
| Styling         | Tailwind CSS          | 4.1     | @theme API, utility-first               |
| Components      | shadcn/ui + Radix UI  | latest  | Accessible UI primitives                |
| Animation       | Framer Motion         | 12      | Page and status transitions             |
| AI              | Gemini 2.5 Flash Lite | -       | Voice transcript extraction             |
| Icons           | Lucide React          | 0.563   | Consistent icon system                  |
| Theme           | next-themes           | 0.4     | Dark mode with View Transitions         |
| Package Manager | pnpm                  | 10+     | Fast, disk-efficient package management |

---

## Architecture

```
Browser (Checklist) ──POST /matching/start──▶ NestJS (EC2)
                                                   │
Browser (Dashboard) ◀──── SSE /sse/:channel ───────┘
                                                   │
                            NestJS ──POST /broadcast──▶ Python + Twilio (EC2)
                                                              │
                            NestJS ◀── callback (per-hospital) ┘
                                   │
                              SSE push to Dashboard
```

---

## Project Structure

```
src/
├── app/                         # Next.js App Router
│   ├── checklist/              # Patient checklist page
│   ├── dashboard/              # Hospital status dashboard
│   │   └── [id]/               # Dynamic route for matching session
│   ├── globals.css             # Tailwind v4 design tokens
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Landing page
├── components/                  # React components
│   ├── checklist/              # Checklist specific components
│   ├── layout/                 # Header, Footer, Navigation
│   ├── theme/                  # ThemeProvider and Toggle
│   └── ui/                     # shadcn/ui base components
├── hooks/                       # Custom React hooks
│   ├── use-emergency-request.ts
│   ├── use-hospital-status.ts
│   └── use-speech-recognition.ts
├── lib/                         # Utilities and API clients
│   ├── api.ts                  # Fetch-based API client
│   ├── env.ts                  # Environment variable helpers
│   ├── gemini.ts               # Gemini API integration
│   └── utils.ts                # Tailwind merge helper
└── types/                       # TypeScript definitions
    └── index.ts                # Core domain types
```

---

## Getting Started

### Prerequisites

- Node.js >= 22
- pnpm >= 10

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/404-BlueYongThon/FE.git
   cd FE
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Environment Setup:
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=https://node-api.log8.kr
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. Run development server:
   ```bash
   pnpm dev
   ```

---

## Commands

- `pnpm dev`: Start development server with Turbopack
- `pnpm build`: Build for production
- `pnpm lint`: Run ESLint for code quality
- `pnpm type-check`: Run TypeScript compiler for type validation

---

## Team

| Name   | Role              | GitHub                                           |
| ------ | ----------------- | ------------------------------------------------ |
| 김덕환 | Full Stack        | [@sweetheart](https://github.com/sweetheart)     |
| 정현승 | Backend and Infra | [@cau20232907](https://github.com/cau20232907)   |
| 김대준 | AI and Algorithm  | [@maximum-0000](https://github.com/maximum-0000) |
| 최대영 | Backend           | [@meojun](https://github.com/meojun)             |

---

## Acknowledgments

- 중앙대학교 청룡톤 2026 (Chungramthon)
- UMC CAU (University MakeUs Challenge)
- GDG On Campus CAU

---

<div align="center">

[emergency-ai-call.log8.kr](https://emergency-ai-call.log8.kr) | [404 BlueYongThon](https://github.com/404-BlueYongThon)

</div>
