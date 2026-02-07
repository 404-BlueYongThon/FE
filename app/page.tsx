'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Activity, Shield, Clock, Phone, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
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

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <PageContainer size="md" className="py-12 pb-safe sm:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20"
        >
          <motion.div variants={itemVariants} className="text-center space-y-8">
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 animate-pulse-ring rounded-full bg-critical/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-critical shadow-lg shadow-critical/30">
                <Activity className="h-10 w-10 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                Emergency AI Call
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed">
                AI가 동시에 주변 병원들에게 전화를 걸어,
                <br className="hidden sm:block" />
                응급 환자를 위한 <span className="text-foreground font-semibold">최적의 병원</span>을 찾아드립니다
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-2 backdrop-blur-sm border border-border/50">
                <Shield className="h-4 w-4 text-primary" />
                <span>골든타임 내 치료</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-4 py-2 backdrop-blur-sm border border-border/50">
                <Clock className="h-4 w-4 text-urgent" />
                <span>동시 5개 병원 연결</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
              <CardContent className="p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">문제 상황</h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        한국에서는 외과 응급환자를 받지 않으려는 경향이 있습니다.
                        응급대원이 환자를 체크하여 구급차에 싣고 이동하며
                        주변 병원부터 차례대로 전화를 돌리지만,
                      </p>
                      <div className="rounded-lg bg-destructive/5 p-4 border border-destructive/10">
                        <p className="font-medium text-destructive">
                          &ldquo;병동이 없어요, 의사가 다 수술중이에요...&rdquo;
                        </p>
                      </div>
                      <p>
                        병원은 갖가지 핑계를 대며 거절합니다.
                        그 결과, 구급차가 뺑뺑이를 돌게 되고,
                        <span className="text-destructive font-semibold"> 환자를 살리지 못한 채 골든타임이 지나갑니다.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-info/20 bg-info/5 backdrop-blur-sm shadow-sm">
              <CardContent className="p-8 sm:p-10">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">우리의 해결책</h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        AI가 병원 5곳에 <strong className="text-info">동시에</strong> 전화를 걸어
                        가능 여부를 확인합니다. 하나라도 수락이 떨어지면,
                        나머지 전화는 자동으로 끊기고 해당 병원으로 안내합니다.
                      </p>
                      <ul className="grid gap-3 sm:grid-cols-2 pt-2">
                        {[
                          "병원 거절 사유 최소화 (AI가 핑계를 파악)",
                          "평균 대기 시간 5분 → 30초로 단축",
                          "응급대원의 업무 부담 감소",
                          "환자 생존율 향상"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-info shrink-0" />
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

          <motion.div variants={itemVariants} className="text-center space-y-6 pb-10">
            <Link href="/checklist" className="inline-block w-full sm:w-auto">
              <Button 
                variant="critical" 
                size="lg" 
                className="h-16 w-full sm:w-auto text-xl px-12 rounded-2xl shadow-xl shadow-critical/20 hover:shadow-critical/30 transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="mr-2 h-6 w-6 animate-pulse" />
                응급 환자 등록하기
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              위치 정보를 가져오고, 환자 상태를 입력하세요
            </p>
          </motion.div>
        </motion.div>
      </PageContainer>
    </main>
  );
}
