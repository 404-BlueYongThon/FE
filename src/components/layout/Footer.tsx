import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="hidden border-t md:block">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-critical">
                <Activity className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-bold">Emergency AI Call</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI that saves lives by connecting emergency patients to hospitals
              in seconds, not minutes.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">About</h3>
            <p className="text-sm text-muted-foreground">
              Built for Chungramthon 2026. Inspired by real stories of families
              who lost precious golden hour time.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Tech Stack</h3>
            <p className="text-sm text-muted-foreground">
              Next.js 16 / React 19 / TypeScript / Tailwind CSS v4 / NestJS /
              Twilio AI
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          &copy; 2026 Team 404. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
