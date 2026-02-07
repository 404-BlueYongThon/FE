import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Emergency AI Call - AI 기반 응급 병원 자동 연결';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1A56DB 0%, #1E3A5F 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 28,
            background: 'rgba(255, 255, 255, 0.15)',
            marginBottom: 40,
          }}
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="28" y="8" width="16" height="56" rx="4" fill="white" />
            <rect x="8" y="28" width="56" height="16" rx="4" fill="white" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          Emergency AI Call
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: 800,
          }}
        >
          AI 기반 응급 병원 자동 연결 시스템
        </div>
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 40,
          }}
        >
          {['골든타임 사수', '동시 5개 병원', 'AI 자동 전화'].map((text) => (
            <div
              key={text}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 999,
                padding: '12px 24px',
                fontSize: 20,
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              {text}
            </div>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 18,
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          404_found | Chungramthon 2026
        </div>
      </div>
    ),
    { ...size }
  );
}
