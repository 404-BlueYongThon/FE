import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '환자 정보 입력',
  description:
    '응급 환자의 KTAS 등급과 상태를 입력하면 AI가 최적의 병원을 찾아드립니다. 위치 기반 주변 병원 자동 매칭.',
  openGraph: {
    title: '환자 정보 입력 | Emergency AI Call',
    description:
      '응급 환자의 KTAS 등급과 상태를 입력하면 AI가 최적의 병원을 찾아드립니다.',
    url: '/checklist',
  },
};

export default function ChecklistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
