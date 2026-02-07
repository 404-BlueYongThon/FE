'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  Activity,
  Shield,
  Clock,
  Phone,
  Zap,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
    },
  },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Emergency AI Call',
  description:
    'AI가 동시에 5개 병원에 전화하여 응급 환자를 위한 최적의 병원을 찾아드립니다.',
  url: 'https://emergency-ai-call.log8.kr',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
  author: {
    '@type': 'Organization',
    name: '404_found',
    url: 'https://github.com/404-BlueYongThon',
  },
};

export default function Home() {
  return (
    <main className="bg-background text-foreground selection:bg-primary/20 min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <div className="from-primary/10 via-background to-background fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]" />

      <PageContainer size="md" className="pb-safe py-12 sm:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20"
        >
          <motion.div variants={itemVariants} className="space-y-8 text-center">
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
              <div className="animate-pulse-ring bg-critical/20 absolute inset-0 rounded-full" />
              <div className="bg-critical shadow-critical/30 relative flex h-20 w-20 items-center justify-center rounded-full shadow-lg">
                <Activity className="h-10 w-10 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="from-foreground to-muted-foreground bg-gradient-to-br bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
                Emergency AI Call
              </h1>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
                AI가 동시에 주변 병원들에게 전화를 걸어,
                <br className="hidden sm:block" />
                응급 환자를 위한{' '}
                <span className="text-foreground font-semibold">
                  최적의 병원
                </span>
                을 찾아드립니다
              </p>
            </div>

            <div className="text-muted-foreground flex flex-wrap justify-center gap-3 text-sm font-medium sm:gap-6">
              <div className="bg-secondary/50 border-border/50 flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
                <Shield className="text-primary h-4 w-4" />
                <span>골든타임 내 치료</span>
              </div>
              <div className="bg-secondary/50 border-border/50 flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
                <Clock className="text-urgent h-4 w-4" />
                <span>동시 5개 병원 연결</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-border/50 bg-card/50 overflow-hidden shadow-sm backdrop-blur-sm">
              <CardContent className="p-8 sm:p-10">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:gap-10">
                  <div className="bg-destructive/10 text-destructive flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">문제 상황</h2>
                    <div className="text-muted-foreground space-y-4 leading-relaxed">
                      <p>
                        한국에서는 외과 응급환자를 받지 않으려는 경향이
                        있습니다. 응급대원이 환자를 체크하여 구급차에 싣고
                        이동하며 주변 병원부터 차례대로 전화를 돌리지만,
                      </p>
                      <div className="bg-destructive/5 border-destructive/10 rounded-lg border p-4">
                        <p className="text-destructive font-medium">
                          &ldquo;병동이 없어요, 의사가 다 수술중이에요...&rdquo;
                        </p>
                      </div>
                      <p>
                        병원은 갖가지 핑계를 대며 거절합니다. 그 결과, 구급차가
                        뺑뺑이를 돌게 되고,
                        <span className="text-destructive font-semibold">
                          {' '}
                          환자를 살리지 못한 채 골든타임이 지나갑니다.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-info/20 bg-info/5 overflow-hidden shadow-sm backdrop-blur-sm">
              <CardContent className="p-8 sm:p-10">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:gap-10">
                  <div className="bg-info/10 text-info flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-foreground text-2xl font-bold">
                      우리의 해결책
                    </h2>
                    <div className="text-muted-foreground space-y-4 leading-relaxed">
                      <p>
                        AI가 병원 5곳에{' '}
                        <strong className="text-info">동시에</strong> 전화를
                        걸어 가능 여부를 확인합니다. 하나라도 수락이 떨어지면,
                        즉시 해당 병원으로 안내합니다.
                      </p>
                      <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                        {[
                          'AI 음성 통화로 병원과 직접 소통',
                          '동시 통화로 대기 시간 대폭 단축',
                          '응급대원의 업무 부담 감소',
                          '환자 생존율 향상',
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle2 className="text-info h-4 w-4 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-6 pb-10 text-center"
          >
            <Link href="/checklist" className="inline-block w-full sm:w-auto">
              <Button
                variant="critical"
                size="lg"
                className="shadow-critical/20 hover:shadow-critical/30 h-16 w-full rounded-2xl px-12 text-xl shadow-xl transition-all hover:scale-105 active:scale-95 sm:w-auto"
              >
                <Phone className="mr-2 h-6 w-6 animate-pulse" />
                응급 환자 등록하기
              </Button>
            </Link>
            <p className="text-muted-foreground text-sm">
              위치 정보를 가져오고, 환자 상태를 입력하세요
            </p>
          </motion.div>
        </motion.div>
      </PageContainer>
    </main>
  );
}
