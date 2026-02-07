# 404 Found: Emergency AI Call System (Frontend)

![404 Found Banner](./assets/banner.png)

[![Vercel](https://img.shields.io/badge/Deployed-Vercel-success)](https://emergency-ai-call.log8.kr)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

> 응급 환자를 위한 병원을, AI가 찾아드립니다

응급대원이 직관적으로 환자 정보를 입력하고 AI 병원 매칭 과정을 실시간으로 확인할 수 있는 웹 인터페이스입니다.

---

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js | 14.x |
| **Language** | TypeScript | 5.0+ |
| **Styling** | Tailwind CSS | 3.x |
| **UI Components** | Shadcn/ui | - |
| **State Management** | Zustand | 4.x |
| **Server State** | TanStack Query | 5.x |
| **Form** | React Hook Form | 7.x |
| **Real-time** | Socket.io Client | 4.x |
| **Maps** | Kakao Maps API | - |
| **Deployment** | Vercel | - |

---

## Features

### 1. Smart Checklist

- KTAS (한국형 응급환자 분류도구) 기반 체크리스트
- 단계별 입력 가이드 (환자 정보 → 증상 → 특이사항)
- 실시간 유효성 검증
- 자동 저장 (세션 유지)

### 2. Real-time Call Status

- 여러 병원 동시 전화 현황 (라이브 업데이트)
- 병원별 응답 상태 표시 (통화 중 / 수용 가능 / 수용 불가 / 무응답)
- 지도 기반 병원 위치 표시
- 거리/중증도 우선순위 정렬

### 3. Instant Match Notification

- 병원 승인 즉시 알림 (Push + 음성)
- 병원 정보 표시 (주소, 전화번호, 거리)
- 내비게이션 연동 (Google Maps / Kakao Navi)
- 응급실 도착 예상 시간

### 4. History & Analytics

- 과거 응급 요청 기록
- 평균 매칭 시간 통계
- 병원별 수용률 차트
- 월간/주간 리포트

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn or pnpm

### Installation

```bash
# 1. Clone repository
git clone https://github.com/404-BlueYongThon/FE.git
cd FE

# 2. Install dependencies
npm install
# or
yarn install
# or
pnpm install

# 3. Environment setup
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Run development server
npm run dev
# or
yarn dev
# or
pnpm dev

# 5. Open browser
open http://localhost:3000
```

### Environment Variables

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

## Project Structure

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
│   │
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
│   │
│   ├── hooks/                 # Custom hooks
│   │   ├── useEmergency.ts
│   │   ├── useHospitals.ts
│   │   └── useSocket.ts
│   │
│   ├── lib/                   # Utilities
│   │   ├── api.ts            # API client
│   │   ├── validators.ts     # Form validation
│   │   └── constants.ts      # App constants
│   │
│   ├── types/                 # TypeScript types
│   │   ├── emergency.ts
│   │   └── hospital.ts
│   │
│   └── styles/                # Global styles
│       └── globals.css
│
├── public/                    # Static assets
│   ├── images/
│   └── icons/
│
├── .env.example              # Environment variables
├── next.config.js            # Next.js config
├── tailwind.config.ts        # Tailwind config
└── package.json
```

---

## Development

### Build

```bash
# Production build
npm run build

# Start production server
npm run start

# Type check
npm run type-check
```

### Test

```bash
# Unit tests
npm run test

# E2E tests (Playwright)
npm run test:e2e

# Coverage
npm run test:cov
```

### Linting

```bash
# ESLint
npm run lint

# Prettier
npm run format
```

---

## Deployment

### Vercel (Automatic)

```bash
# 1. Push to main/dev branch
git push origin main

# 2. Vercel automatically deploys
# Preview: https://fe-xxx.vercel.app
# Production: https://emergency-ai-call.log8.kr
```

### Manual Deployment

```bash
# 1. Build
npm run build

# 2. Deploy to Vercel
npx vercel --prod

# 3. Set environment variables in Vercel Dashboard
```

---

## Performance

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| First Contentful Paint | < 1.5s | 1.2s | ✅ |
| Largest Contentful Paint | < 2.5s | 2.1s | ✅ |
| Time to Interactive | < 3.0s | 2.7s | ✅ |
| Cumulative Layout Shift | < 0.1 | 0.05 | ✅ |
| Lighthouse Score | > 90 | 95 | ✅ |

---

## UI/UX Design Principles

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

## Contributing

### Branch Strategy

- `main`: Production-ready code
- `dev`: Development integration
- `feature/<description>`: Feature branches

### Commit Convention

```
feat: Add new feature
fix: Bug fix
docs: Documentation updates
style: Styling updates
refactor: Code refactoring
test: Test updates
chore: Build/tooling changes
```

### Pull Request

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

## Team

| Name | Role | GitHub |
|------|------|--------|
| 김덕환 | Full Stack & Frontend Lead | [@sweetheart](https://github.com/sweetheart) |
| 김대준 | Backend & Infra | [@cau20232907](https://github.com/cau20232907) |
| 정현승 | Backend API | [@maximum-0000](https://github.com/maximum-0000) |
| 최대영 | AI & Algorithm | [@meojun](https://github.com/meojun) |

---

## License

MIT License - see [LICENSE](LICENSE) file

---

## Contact

- **Website**: [emergency-ai-call.log8.kr](https://emergency-ai-call.log8.kr)
- **Email**: sachi009955@gmail.com
- **Backend Repo**: [@404-BlueYongThon/BE](https://github.com/404-BlueYongThon/BE)
- **Organization**: [@404-BlueYongThon](https://github.com/404-BlueYongThon)

---

## Acknowledgments

- **중앙대학교 청룡톤 2026**
- **Vercel** - Amazing deployment platform
- **Shadcn** - Beautiful component library
- **Next.js Team** - For the best React framework
