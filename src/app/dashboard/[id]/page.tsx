'use client';

import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import type { ComponentProps } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  PhoneCall,
  RotateCcw,
  Wifi,
  XCircle,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusIndicator } from '@/components/ui/status-indicator';
import PageContainer from '@/components/layout/PageContainer';
import { useHospitalStatus } from '@/hooks/use-hospital-status';
import type { CallDisplayStatus, HospitalCallStatus } from '@/types';

function useElapsedTime() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

interface DashboardPageProps {
  params: Promise<{
    id: string;
  }>;
}

type IndicatorStatus = NonNullable<
  ComponentProps<typeof StatusIndicator>['status']
>;

export default function DashboardPage({ params }: DashboardPageProps) {
  const { id } = React.use(params);
  const channel = id;
  const elapsed = useElapsedTime();
  const { statuses, isConnected, error, matchedHospital, allRejected } =
    useHospitalStatus(channel);

  const hospitalList = useMemo(() => {
    const list = Object.values(statuses);
    return list.sort((a, b) => a.hospitalId - b.hospitalId);
  }, [statuses]);

  const showWaiting =
    hospitalList.length === 0 && !matchedHospital && !allRejected;

  return (
    <PageContainer size="lg" className="min-h-screen space-y-8 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
              실시간 병원 매칭
            </h1>
            <Badge
              variant="outline"
              className="border-primary text-primary animate-pulse"
            >
              <Activity className="mr-1 h-3 w-3" />
              AI 작동 중
            </Badge>
          </div>
          <p className="text-muted-foreground">
            AI가 최적의 병원을 찾아 동시에 연락하고 있습니다.
          </p>
        </div>

        <div className="bg-card flex items-center gap-3 rounded-full border px-4 py-2 shadow-sm">
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                isConnected
                  ? 'bg-[var(--color-success)]'
                  : 'bg-[var(--color-warning)]'
              }`}
            />
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                isConnected
                  ? 'bg-[var(--color-success)]'
                  : 'bg-[var(--color-warning)]'
              }`}
            />
          </div>
          <span className="text-muted-foreground text-sm font-medium">
            {isConnected ? '시스템 정상 가동' : '연결 불안정'}
          </span>
          <Wifi
            className={`h-4 w-4 ${isConnected ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'}`}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full"
          >
            <Card className="border-2 border-[var(--color-critical)] bg-[var(--color-critical)]/5">
              <CardContent className="flex items-start gap-3 p-6">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-[var(--color-critical)]" />
                <div className="space-y-1">
                  <p className="text-foreground font-semibold">AI 서버 오류</p>
                  <p className="text-muted-foreground text-sm">{error}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showWaiting && !error && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full"
          >
            <Card className="border-border bg-card shadow-sm">
              <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
                <motion.div
                  animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    repeatDelay: 0.5,
                  }}
                >
                  <PhoneCall className="text-primary h-10 w-10" />
                </motion.div>
                <div className="space-y-1">
                  <p className="text-foreground text-base font-semibold">
                    AI가 병원 5곳에 동시 전화 중...
                  </p>
                  <p className="text-muted-foreground text-sm">
                    경과 시간: {elapsed}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {matchedHospital && (
          <motion.div
            key="matched"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.3 }}
            className="w-full"
          >
            <Card className="to-background relative overflow-hidden border-2 border-[var(--color-success)] bg-gradient-to-br from-[var(--color-success)]/10 shadow-xl">
              <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[var(--color-success)]/20 blur-3xl" />
              <CardContent className="p-8">
                <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[var(--color-success)] shadow-[var(--color-success)]/30 shadow-lg"
                  >
                    <CheckCircle className="h-12 w-12 text-white" />
                  </motion.div>

                  <div className="flex-1 space-y-2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Badge className="mb-2 bg-[var(--color-success)] hover:bg-[var(--color-success)]">
                        이송 확정
                      </Badge>
                      <h2 className="text-foreground text-3xl font-bold">
                        {matchedHospital.hospitalName ??
                          `병원 #${matchedHospital.hospitalId}`}
                      </h2>
                      <p className="text-xl font-medium text-[var(--color-success)]">
                        {matchedHospital.message ||
                          '수용 가능합니다. 즉시 이송해주세요.'}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-muted-foreground flex flex-wrap justify-center gap-4 pt-2 md:justify-start"
                    >
                      {matchedHospital.hospitalNumber ? (
                        <a
                          href={`tel:${matchedHospital.hospitalNumber}`}
                          className="text-foreground flex items-center gap-1.5 font-medium underline underline-offset-2"
                        >
                          <Phone className="h-4 w-4" />
                          {matchedHospital.hospitalNumber}
                        </a>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-4 w-4" />
                          전화번호 정보 없음
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        매칭 소요: {elapsed}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {allRejected && !matchedHospital && (
          <motion.div
            key="allRejected"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-full"
          >
            <Card className="border-2 border-[var(--color-warning)] bg-[var(--color-warning)]/5">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-warning)]" />
                  <div className="space-y-1">
                    <p className="text-foreground font-semibold">
                      모든 병원이 수용 불가
                    </p>
                    <p className="text-muted-foreground text-sm">
                      주변 병원에서 수용 가능한 병원을 찾지 못했습니다. 소요
                      시간: {elapsed}
                    </p>
                  </div>
                </div>
                <Link href="/checklist">
                  <Button variant="outline" className="w-full gap-2">
                    <RotateCcw className="h-4 w-4" />
                    다시 시도하기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {hospitalList.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {hospitalList.map((entry, index) => {
              const indicatorStatus = getIndicatorStatus(entry.status);
              const label = getStatusLabel(entry);

              const isCalling =
                entry.status === 'calling' || entry.status === 'ringing';
              const isInProgress = entry.status === 'in-progress';
              const isAccepted = entry.status === 'accepted';
              const isRejected = entry.status === 'rejected';
              const isNoAnswer = entry.status === 'no_answer';

              return (
                <motion.div
                  key={entry.hospitalId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Card
                    className={`h-full transition-all duration-300 ${
                      isCalling
                        ? 'animate-pulse-ring border-[var(--color-urgent)] ring-2 ring-[var(--color-urgent)]/20'
                        : ''
                    } ${isInProgress ? 'border-[var(--color-info)] ring-2 ring-[var(--color-info)]/20' : ''} ${isAccepted ? 'border-[var(--color-success)] bg-[var(--color-success)]/5' : ''} ${
                      isRejected || isNoAnswer
                        ? 'opacity-60 grayscale-[0.5]'
                        : ''
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">
                            {entry.hospitalName ?? `병원 #${entry.hospitalId}`}
                          </CardTitle>
                          {entry.hospitalNumber && (
                            <CardDescription className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5" />
                              <a
                                href={`tel:${entry.hospitalNumber}`}
                                className="underline underline-offset-2"
                              >
                                {entry.hospitalNumber}
                              </a>
                            </CardDescription>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="pt-2">
                        <div className="space-y-2">
                          <StatusIndicator
                            status={indicatorStatus}
                            label={label}
                            showIcon
                            className="w-full justify-center py-3"
                          />
                          {entry.message && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="text-muted-foreground text-center text-xs font-medium"
                            >
                              {entry.message}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </PageContainer>
  );
}

function getIndicatorStatus(status: CallDisplayStatus): IndicatorStatus {
  switch (status) {
    case 'pending':
      return 'pending';
    case 'calling':
      return 'calling';
    case 'ringing':
      return 'ringing';
    case 'in-progress':
      return 'in-progress';
    case 'accepted':
      return 'approved';
    case 'rejected':
      return 'rejected';
    case 'no_answer':
      return 'timeout';
    case 'all_rejected':
      return 'rejected';
    case 'error':
      return 'rejected';
  }
}

function getStatusLabel(entry: HospitalCallStatus): string {
  switch (entry.status) {
    case 'pending':
      return '대기 중';
    case 'calling':
      return '전화 거는 중...';
    case 'ringing':
      return '📞 전화 울리는 중...';
    case 'in-progress':
      return '🗣️ 안내 멘트 재생 중...';
    case 'accepted':
      return '수락됨';
    case 'rejected':
      return '거절됨';
    case 'no_answer':
      return '응답 없음';
    case 'all_rejected':
      return '모두 거절';
    case 'error':
      return '오류';
  }
}
