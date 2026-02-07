# 프로젝트 개요 및 컨셉 (PROJECT.md)

## 1. 팀 소개
*   팀명: 404_found
*   팀 구성: 기획, 디자인, 프론트엔드, 백엔드, AI 엔지니어링 등 다학제적 협업 팀

## 2. 프로젝트명
*   Emergency AI Call (응급 AI 콜)

## 3. 문제 정의 (Problem)
### 한국 응급의료 시스템의 구조적 문제
*   현재 한국의 응급의료 체계는 구급대원이 환자를 이송하기 전, 수용 가능한 병원을 찾기 위해 일일이 전화를 돌려야 하는 아날로그 방식에 의존하고 있습니다.

### 구급차 뺑뺑이 현상 (Ambulance Circling)
*   병원의 거절로 인해 구급차가 도로 위에서 시간을 허비하는 '구급차 뺑뺑이' 현상이 심화되고 있습니다. 이는 환자의 골든타임을 놓치게 만드는 치명적인 원인이 됩니다.

### 골든타임 초과로 인한 생명 위협
*   중증 외상이나 심정지 환자에게 1분 1초는 생사와 직결됩니다. 하지만 병원 선정에만 평균 10~20분이 소요되는 것이 현실입니다.

### 병원들의 응급환자 거절 실태
*   병상 부족, 전문의 부재, 장비 점검 등 다양한 사유로 환자 수용을 거절하지만, 구급대원은 전화를 걸기 전까지 해당 병원의 실시간 상황을 정확히 알기 어렵습니다.

### 실제 사례 및 영감
*   팀원의 가족이 실제 응급 상황에서 여러 병원으로부터 거절당하며 겪었던 긴박하고 무력했던 경험에서 시작되었습니다. 드라마 '중증외상센터'나 웹툰에서 묘사되는 현실적인 응급실의 한계를 기술로 해결하고자 합니다.

### 통계적 근거 (참고 가능한 데이터)
*   보건복지부 통계에 따르면 응급실 재이송 사유 중 '전문의 부재'와 '병상 부족'이 가장 높은 비중을 차지하며, 이 과정에서 소요되는 시간이 매년 증가하고 있습니다.

## 4. 해결책 (Solution)
### AI 기반 병렬 전화 시스템
*   구급대원이 환자의 상태(KTAS 등)를 입력하면, AI가 사전에 학습된 데이터를 바탕으로 인근 5개 병원에 동시에 전화를 겁니다.

### 즉각적인 병원 확정 및 이송
*   AI가 병원 행정 담당자와 자연어로 대화하며 수용 가능 여부를 확인합니다. 가장 먼저 수용 의사를 밝힌 병원이 확정되는 즉시 나머지 병원과의 통화는 자동으로 종료되며, 구급대원에게 즉각 알림이 전송됩니다.

### Twilio AI를 활용한 자연어 대화
*   단순한 ARS가 아닌, Twilio AI를 활용하여 실제 사람과 대화하듯 병원 측의 거절 사유를 파악하고 수용 가능 여부를 체크합니다.

### 시간 단축 효과
*   기존의 순차적 전화 방식(평균 5분 이상)에서 병렬 처리 방식(30초 이내)으로 획기적인 시간 단축을 실현합니다.

## 5. 기술 스택
*   Frontend: Next.js 16 / React 19 / TypeScript / Tailwind CSS v4 / Framer Motion / shadcn/ui
*   Backend: NestJS / AWS Docker
*   AI: Python/C++ / Twilio (Parallel AI Calling)
*   특징: 반응형 디자인, 다크모드(Ripple Transition), 접근성 최적화 (44px 터치 타겟, WCAG 2.2 준수)

### 프론트엔드 기술 디테일 (Frontend Technical Details)
*   **SEO 최적화**: Open Graph / Twitter Card 메타태그, JSON-LD 구조화 데이터(schema.org WebApplication), 페이지별 동적 메타데이터, 동적 OG 이미지 자동 생성 (Next.js Edge Runtime)
*   **AEO (Answer Engine Optimization)**: 구조화 데이터를 통한 AI 검색 엔진 대응 — Google SGE, Bing Chat 등에서 서비스 정보를 정확히 파싱할 수 있도록 schema.org 마크업 적용
*   **PWA (Progressive Web App)**: Web App Manifest, 홈 화면 추가 지원, standalone 모드, 포트레이트 고정
*   **검색 엔진 크롤링**: robots.txt (전체 허용 + 크롤 딜레이), sitemap.xml (동적 생성, 페이지별 우선순위)
*   **디자인 시스템**: Tailwind CSS v4 @theme API 기반 커스텀 디자인 토큰, 라이트/다크 모드 시맨틱 컬러 (응급 상황별 색상: Critical/Urgent/Success/Info/Warning)
*   **테마 전환 애니메이션**: View Transitions API 기반 양방향 리플 서클 익스팬드 효과 (라이트→다크: 원 확장, 다크→라이트: 원 수축)
*   **접근성**: WCAG 2.2 AA 준수, 최소 44px 터치 타겟, 4.5:1 명암비, 색상+아이콘 이중 상태 표시
*   **성능**: Turbopack 빌드, 정적 생성(SSG) + 동적 렌더링 혼합, Edge Runtime OG 이미지

## 6. 서비스 흐름 (User Flow)
1.  랜딩 페이지: 서비스의 목적과 긴급 호출 버튼 제공
2.  환자 정보 입력: KTAS 분류 및 환자 상태(의식, 호흡 등) 체크리스트 작성
3.  AI 병원 전화 대시보드: 5개 병원에 대한 실시간 통화 상태 및 응답 현황 모니터링
4.  병원 확정: 수용 가능 병원 매칭 완료 및 이송 경로 안내

## 7. 차별점 & 임팩트
### 기존 시스템과의 차별점
*   기존의 국가 응급의료 정보망(NEDIS)은 데이터 업데이트 지연 문제가 있으나, 본 서비스는 실시간 '전화'를 AI가 대신함으로써 가장 정확한 현장 정보를 얻습니다.

### 병렬 연결의 효율성
*   1:1 순차 연결이 아닌 1:N 병렬 연결을 통해 성공 확률을 높이고 시간을 단축합니다.

### 데이터 기반 피드백
*   AI가 수집한 병원별 거절 사유를 실시간으로 파악하여 향후 응급의료 정책 수립이나 병원 운영 효율화에 기여할 수 있습니다.

### 업무 부담 감소 및 생존율 향상
*   구급대원은 전화 업무 대신 환자 처치에 집중할 수 있으며, 이는 곧 환자의 생존율 향상으로 이어집니다.

## 8. 프론트엔드 구현 현황 (Implementation Status)

### 완료된 페이지
| 페이지 | 경로 | 설명 | 렌더링 방식 |
|--------|------|------|-------------|
| 랜딩 페이지 | `/` | 서비스 소개 + 응급 호출 CTA | SSG (정적) |
| 환자 체크리스트 | `/checklist` | KTAS 1-5 분류 + 환자 정보 입력 | SSG (정적) |
| 병원 대시보드 | `/dashboard/[id]` | 5개 병원 실시간 통화 시뮬레이션 | SSR (동적) |

### 완료된 인프라
| 항목 | 파일 | 설명 |
|------|------|------|
| SEO 메타데이터 | `app/layout.tsx` | OG, Twitter Card, keywords, robots, metadataBase |
| 페이지별 메타데이터 | `app/*/layout.tsx` | 각 페이지 title, description, OG 설정 |
| 동적 OG 이미지 | `app/opengraph-image.tsx` | Edge Runtime 자동 생성 (1200x630) |
| JSON-LD 구조화 데이터 | `app/page.tsx` | schema.org WebApplication 마크업 |
| PWA 매니페스트 | `public/manifest.json` | 홈 화면 추가, standalone 모드 |
| 로봇 설정 | `public/robots.txt` | 크롤링 허용 + sitemap 연결 |
| 사이트맵 | `app/sitemap.ts` | 동적 생성, 페이지별 우선순위 |
| 디자인 시스템 | `app/globals.css` | 라이트/다크 모드 토큰 + 응급 시맨틱 컬러 |
| UI 컴포넌트 | `components/ui/*` | shadcn/ui 기반 응급 의료 특화 변형 |
| 테마 토글 | `components/theme/*` | 양방향 리플 View Transition 애니메이션 |
| 반응형 레이아웃 | `components/layout/*` | Header, Footer, BottomNav, PageTransition |

## 9. 향후 계획
*   실제 병원 정보 시스템(HIS) API 연동을 통한 데이터 정교화
*   GPS 기반 최적 경로 및 실시간 교통 상황 반영 병원 추천
*   병원용 수용 현황 실시간 관리 대시보드 보급
*   다국어 지원을 통한 국내 거주 외국인 및 관광객 응급 상황 대응
*   Service Worker 기반 오프라인 지원 (네트워크 불안정 지역 대응)
*   실시간 WebSocket 기반 병원 응답 스트리밍
