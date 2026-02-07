import type { Metadata, Viewport } from 'next';
import ThemeProvider from '@/components/theme/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import PageTransition from '@/components/layout/PageTransition';
import './globals.css';

const BASE_URL = 'https://emergency-ai-call.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Emergency AI Call - 응급 병원 자동 연결 시스템',
    template: '%s | Emergency AI Call',
  },
  description:
    'AI가 동시에 5개 병원에 전화하여 응급 환자를 위한 최적의 병원을 찾아드립니다. 골든타임 내 치료를 위한 AI 병렬 전화 시스템.',
  keywords: [
    '응급의료',
    '골든타임',
    'AI 전화',
    '병원 자동 연결',
    '응급환자',
    '구급차 뺑뺑이',
    'KTAS',
    '응급실',
    'emergency call',
    'hospital matching',
    'AI healthcare',
    'parallel calling',
    'emergency medical',
    'golden hour',
    '404_found',
  ],
  authors: [{ name: '404_found' }],
  creator: '404_found',
  publisher: '404_found',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    siteName: 'Emergency AI Call',
    title: 'Emergency AI Call - 응급 병원 자동 연결 시스템',
    description:
      'AI가 동시에 5개 병원에 전화하여 응급 환자를 위한 최적의 병원을 찾아드립니다. 골든타임 내 치료를 위한 AI 병렬 전화 시스템.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Emergency AI Call - AI 기반 응급 병원 자동 연결',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency AI Call - 응급 병원 자동 연결 시스템',
    description:
      'AI가 동시에 5개 병원에 전화하여 골든타임 내 최적의 병원을 찾아드립니다.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  category: 'medical',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#141e2e' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1 pb-20 md:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
