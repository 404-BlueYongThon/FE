import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '실시간 병원 매칭',
  description:
    'AI가 주변 병원에 동시 전화를 걸어 실시간으로 수용 가능한 병원을 찾고 있습니다. 응급 환자 이송 현황을 확인하세요.',
  openGraph: {
    title: '실시간 병원 매칭 | Emergency AI Call',
    description:
      'AI가 주변 병원에 동시 전화를 걸어 실시간으로 수용 가능한 병원을 찾고 있습니다.',
    url: '/dashboard',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
