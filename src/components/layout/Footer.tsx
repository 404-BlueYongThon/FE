import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="hidden border-t md:block">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-critical flex h-7 w-7 items-center justify-center rounded-lg">
                <Activity className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-bold">Emergency AI Call</span>
            </div>
            <p className="text-muted-foreground text-sm">
              AI가 응급 환자를 몇 분이 아닌 몇 초 만에 병원과 연결하여 생명을
              살립니다.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">소개</h3>
            <p className="text-muted-foreground text-sm">
              청룡톤 2026 출품작. 골든타임을 놓쳐 소중한 사람을 잃은 실제
              이야기에서 영감을 받았습니다.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">기술 스택</h3>
            <p className="text-muted-foreground text-sm">
              Next.js 16 / React 19 / TypeScript / Tailwind CSS v4 / NestJS /
              Python / AWS EC2 / Twilio AI
            </p>
          </div>
        </div>
        <div className="text-muted-foreground mt-8 border-t pt-6 text-center text-xs">
          &copy; 2026 Team 404. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
