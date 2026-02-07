# 404 Found: Emergency AI Call System (Frontend)

<div align="center">

![404 Found Logo](https://via.placeholder.com/400x100/4A90E2/FFFFFF?text=404+Found)

**응급 환자를 위한 AI 병원 매칭 시스템 - Frontend**

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-success)](https://emergency-ai-call.log8.kr)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

[🌐 Live Demo](https://emergency-ai-call.log8.kr) | [📺 발표 자료](./PRESENTATION.md) | [🔧 Backend Repo](https://github.com/404-BlueYongThon/BE)

</div>

---

## 🎨 Frontend Overview

404 Found의 사용자 인터페이스를 담당하는 Next.js 14 기반 프론트엔드입니다.  
응급대원이 직관적으로 환자 정보를 입력하고, AI 병원 매칭 과정을 실시간으로 확인할 수 있습니다.

---

## ✨ Key Features

### 1. 📋 Smart Checklist UI
- KTAS (한국형 응급환자 분류도구) 기반 체크리스트
- 단계별 입력 가이드 (환자 정보 → 증상 → 특이사항)
- 실시간 유효성 검증
- 자동 저장 (새로고침해도 안전)

### 2. 📞 Real-time Call Status
- 여러 병원 동시 전화 현황 (라이브 업데이트)
- 병원별 응답 상태 표시
  - ⏳ 통화 중
  - ✅ 수용 가능
  - ❌ 수용 불가
  - 📴 무응답
- 지도 기반 병원 위치 표시
- 거리/중증도 우선순위 정렬

### 3. 🎯 Instant Match Notification
- 병원 승인 즉시 알림 (Push + 음성)
- 병원 정보 표시 (주소, 전화번호, 거리)
- 내비게이션 연동 (Google Maps / Kakao Navi)
- 응급실 도착 예상 시간

### 4. 📊 History & Analytics
- 과거 응급 요청 기록
- 평균 매칭 시간 통계
- 병원별 수용률 차트
- 월간/주간 리포트

---

## 🛠️ Tech Stack

### Core
- **Next.js 14** - App Router + Server Components
- **TypeScript 5.0** - Type-safe development
- **React 18** - Modern hooks + Suspense

### Styling
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Accessible component library
- **Framer Motion** - Smooth animations

### State Management
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state & caching
- **React Hook Form** - Form validation

### Real-time
- **Socket.io Client** - WebSocket for live updates
- **Server-Sent Events (SSE)** - Backend status streaming

### Maps & Location
- **Kakao Maps API** - Hospital location display
- **Geolocation API** - Current location detection

### Build & Deploy
- **Vercel** - Automatic deployment
- **ESLint + Prettier** - Code quality
- **Husky** - Git hooks

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│         Next.js 14 (App Router)             │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────┐  ┌────────────────────┐  │
│  │   Pages     │  │   Components       │  │
│  ├─────────────┤  ├────────────────────┤  │
│  │ /           │  │ - ChecklistForm    │  │
│  │ /emergency  │  │ - HospitalMap      │  │
│  │ /status     │  │ - CallStatus       │  │
│  │ /history    │  │ - MatchResult      │  │
│  └─────────────┘  └────────────────────┘  │
│                                             │
│  ┌─────────────┐  ┌────────────────────┐  │
│  │   Hooks     │  │   Utils            │  │
│  ├─────────────┤  ├────────────────────┤  │
│  │ useEmergency│  │ - API client       │  │
│  │ useHospitals│  │ - Validators       │  │
│  │ useSocket   │  │ - Formatters       │  │
│  └─────────────┘  └────────────────────┘  │
│                                             │
└─────────────┬───────────────────────────────┘
              │ HTTPS + WebSocket
┌─────────────▼───────────────────────────────┐
│          Backend (NestJS)                    │
│     https://api.emergency-ai-call.log8.kr   │
└──────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
FE/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (home)/
│   │   │   └── page.tsx       # Landing page
│   │   ├── emergency/
│   │   │   └── page.tsx       # Emergency request
│   │   ├── status/
│   │   │   └── page.tsx       # Real-time status
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── checklist/
│   │   │   ├── PatientInfo.tsx
│   │   │   ├── Symptoms.tsx
│   │   │   └── Remarks.tsx
│   │   ├── hospital/
│   │   │   ├── HospitalMap.tsx
│   │   │   ├── CallStatus.tsx
│   │   │   └── MatchResult.tsx
│   │   └── ui/                # Shadcn components
│   ├── hooks/                 # Custom hooks
│   │   ├── useEmergency.ts
│   │   ├── useHospitals.ts
│   │   └── useSocket.ts
│   ├── lib/                   # Utilities
│   │   ├── api.ts            # API client
│   │   ├── validators.ts     # Form validation
│   │   └── constants.ts      # App constants
│   ├── types/                 # TypeScript types
│   │   ├── emergency.ts
│   │   └── hospital.ts
│   └── styles/                # Global styles
│       └── globals.css
├── public/                    # Static assets
│   ├── images/
│   └── icons/
├── .env.example              # Environment variables
├── next.config.js            # Next.js config
├── tailwind.config.ts        # Tailwind config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18
npm or yarn or pnpm
```

### Installation

**1. Clone Repository**
```bash
git clone https://github.com/404-BlueYongThon/FE.git
cd FE
```

**2. Install Dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

**3. Environment Setup**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.emergency-ai-call.log8.kr
NEXT_PUBLIC_KAKAO_MAP_KEY=your_kakao_api_key
NEXT_PUBLIC_SOCKET_URL=wss://api.emergency-ai-call.log8.kr
```

**4. Run Development Server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

**5. Open Browser**
```
http://localhost:3000
```

---

## 🎨 UI/UX Design Principles

### 1. Accessibility First
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader friendly
- High contrast mode

### 2. Mobile Responsive
- Mobile-first design
- Touch-friendly buttons (min 44x44px)
- Optimized for emergency vehicle tablets

### 3. Performance
- Server Components for fast initial load
- Image optimization (Next.js Image)
- Code splitting & lazy loading
- < 3s First Contentful Paint

### 4. Error Handling
- Graceful degradation
- Offline mode support (Service Worker)
- Retry mechanism for failed requests
- User-friendly error messages

---

## 📊 Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | **1.2s** ✅ |
| Largest Contentful Paint | < 2.5s | **2.1s** ✅ |
| Time to Interactive | < 3.0s | **2.7s** ✅ |
| Cumulative Layout Shift | < 0.1 | **0.05** ✅ |
| Lighthouse Score | > 90 | **95** ✅ |

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests (Playwright)
npm run test:e2e

# Type check
npm run type-check

# Lint
npm run lint
```

---

## 📦 Build & Deploy

### Local Build
```bash
npm run build
npm run start
```

### Vercel Deploy (Automatic)
```bash
# Push to main/dev branch
git push origin main

# Vercel automatically deploys
# Preview: https://fe-xxx.vercel.app
# Production: https://emergency-ai-call.log8.kr
```

---

## 🌐 Environment Variables

```env
# API
NEXT_PUBLIC_API_URL=https://api.emergency-ai-call.log8.kr
NEXT_PUBLIC_SOCKET_URL=wss://api.emergency-ai-call.log8.kr

# Maps
NEXT_PUBLIC_KAKAO_MAP_KEY=your_kakao_api_key

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry (Optional)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file

---

## 👥 Team

- **김덕환** - Full Stack & Frontend Lead
- **김대준** - Backend & Infra
- **정현승** - Backend API
- **최대영** - AI & Algorithm

---

## 🙏 Acknowledgments

- **중앙대학교 청룡톤 2026**
- **Vercel** - Amazing deployment platform
- **Shadcn** - Beautiful component library
- **Next.js Team** - For the best React framework

---

## 📞 Contact

- 🌐 Website: [emergency-ai-call.log8.kr](https://emergency-ai-call.log8.kr)
- 📧 Email: sachi009955@gmail.com
- 🐙 GitHub: [@404-BlueYongThon](https://github.com/404-BlueYongThon)

---

<div align="center">

**Made with ❤️ by 404 BlueYongThon**

*작고 귀여운 서비스로 소중한 생명을 지킵니다*

[⬆ Back to top](#404-found-emergency-ai-call-system-frontend)

</div>
