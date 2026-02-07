'use client';

import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, CheckCircle, Clock, Wifi, Activity } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { Badge } from '@/components/ui/badge';
import PageContainer from '@/components/layout/PageContainer';
import type { Hospital, CallStatus } from '@/types';

const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: '서울대학교병원',
    address: '서울특별시 종로구 대학로 101',
    phone: '02-2072-2114',
    distance: 1.2,
    specialization: ['권역응급의료센터', '외상센터'],
  },
  {
    id: 'h2',
    name: '세브란스병원',
    address: '서울특별시 서대문구 연세로 50-1',
    phone: '02-2228-0114',
    distance: 3.5,
    specialization: ['지역응급의료센터'],
  },
  {
    id: 'h3',
    name: '삼성서울병원',
    address: '서울특별시 강남구 일원로 81',
    phone: '02-3410-2114',
    distance: 5.8,
    specialization: ['권역응급의료센터'],
  },
  {
    id: 'h4',
    name: '서울아산병원',
    address: '서울특별시 송파구 올림픽로43길 88',
    phone: '02-3010-3114',
    distance: 8.2,
    specialization: ['지역응급의료센터'],
  },
  {
    id: 'h5',
    name: '고려대학교의료원',
    address: '서울특별시 성북구 고려대로 73',
    phone: '02-920-5114',
    distance: 4.1,
    specialization: ['지역응급의료센터'],
  },
];

interface DashboardPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  React.use(params);

  const [statuses, setStatuses] = useState<Record<string, CallStatus>>({});
  const [isConnected] = useState(true);
  const [simulationStarted, setSimulationStarted] = useState(false);

  useEffect(() => {
    const initialStatuses: Record<string, CallStatus> = {};
    MOCK_HOSPITALS.forEach((h) => {
      initialStatuses[h.id] = {
        hospitalId: h.id,
        status: 'pending',
        timestamp: new Date().toISOString(),
      };
    });
    setStatuses(initialStatuses);
    setSimulationStarted(true);
  }, []);

  useEffect(() => {
    if (!simulationStarted) return;

    const updateStatus = (id: string, status: CallStatus['status'], message?: string) => {
      setStatuses((prev) => ({
        ...prev,
        [id]: {
          hospitalId: id,
          status,
          message,
          timestamp: new Date().toISOString(),
        },
      }));
    };

    const timeline = [
      setTimeout(() => updateStatus('h1', 'calling'), 1000),
      setTimeout(() => updateStatus('h2', 'calling'), 2000),
      setTimeout(() => {
        updateStatus('h3', 'calling');
        updateStatus('h4', 'calling');
        updateStatus('h5', 'calling');
      }, 3000),
      setTimeout(() => updateStatus('h3', 'rejected', '병상이 부족합니다'), 4000),
      setTimeout(() => updateStatus('h5', 'timeout', '응답 없음'), 5000),
      setTimeout(() => {
        updateStatus('h1', 'approved', '수용 가능합니다. 즉시 이송해주세요.');
        updateStatus('h2', 'rejected', '다른 병원 수용으로 취소됨');
        updateStatus('h4', 'rejected', '다른 병원 수용으로 취소됨');
      }, 6000),
    ];

    return () => {
      for (const timer of timeline) {
        clearTimeout(timer);
      }
    };
  }, [simulationStarted]);

  const approvedHospital = useMemo(() => {
    const approvedStatus = Object.values(statuses).find((s) => s.status === 'approved');
    if (!approvedStatus) return null;
    return MOCK_HOSPITALS.find((h) => h.id === approvedStatus.hospitalId) || null;
  }, [statuses]);

  return (
    <PageContainer size="lg" className="min-h-screen space-y-8 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              실시간 병원 매칭
            </h1>
            <Badge variant="outline" className="animate-pulse border-primary text-primary">
              <Activity className="mr-1 h-3 w-3" />
              AI 작동 중
            </Badge>
          </div>
          <p className="text-muted-foreground">
            AI가 최적의 병원을 찾아 동시에 연락하고 있습니다.
          </p>
        </div>
        
        <div className="flex items-center gap-3 rounded-full border bg-card px-4 py-2 shadow-sm">
          <div className={`relative flex h-3 w-3 items-center justify-center`}>
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {isConnected ? '시스템 정상 가동' : '연결 불안정'}
          </span>
          <Wifi className={`h-4 w-4 ${isConnected ? 'text-emerald-500' : 'text-amber-500'}`} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {approvedHospital && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="w-full"
          >
            <Card className="relative overflow-hidden border-2 border-[var(--color-success)] bg-gradient-to-br from-[var(--color-success)]/10 to-background shadow-xl">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[var(--color-success)]/20 blur-3xl" />
              <CardContent className="p-8">
                <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[var(--color-success)] shadow-lg shadow-[var(--color-success)]/30"
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
                      <h2 className="text-3xl font-bold text-foreground">
                        {approvedHospital.name}
                      </h2>
                      <p className="text-xl text-[var(--color-success)] font-medium">
                        수용 가능합니다. 즉시 이송해주세요.
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-wrap justify-center gap-4 pt-2 text-muted-foreground md:justify-start"
                    >
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {approvedHospital.address}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-4 w-4" />
                        {approvedHospital.phone}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {approvedHospital.distance}km
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {MOCK_HOSPITALS.map((hospital, index) => {
            const status = statuses[hospital.id];
            const isCalling = status?.status === 'calling';
            const isApproved = status?.status === 'approved';
            const isRejected = status?.status === 'rejected';
            const isTimeout = status?.status === 'timeout';

            return (
              <motion.div
                key={hospital.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`h-full transition-all duration-300 ${
                    isCalling ? 'border-[var(--color-info)] ring-2 ring-[var(--color-info)]/20 animate-pulse-ring' : ''
                  } ${
                    isApproved ? 'border-[var(--color-success)] bg-[var(--color-success)]/5' : ''
                  } ${
                    (isRejected || isTimeout) ? 'opacity-60 grayscale-[0.5]' : ''
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          {hospital.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {hospital.distance}km
                        </CardDescription>
                      </div>
                      {hospital.specialization && (
                        <Badge variant="secondary" className="text-xs">
                          {hospital.specialization[0]}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">{hospital.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0" />
                        <span>{hospital.phone}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      {status ? (
                        <div className="space-y-2">
                          <StatusIndicator
                            status={status.status}
                            label={getStatusLabel(status.status)}
                            showIcon
                            className="w-full justify-center py-3"
                          />
                          {status.message && (
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="text-center text-xs font-medium text-muted-foreground"
                            >
                              {status.message}
                            </motion.p>
                          )}
                        </div>
                      ) : (
                        <div className="flex h-10 items-center justify-center gap-2 rounded-lg bg-muted text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          대기 중...
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </PageContainer>
  );
}

function getStatusLabel(status: CallStatus['status']): string {
  switch (status) {
    case 'pending':
      return '대기 중';
    case 'calling':
      return '전화 연결 중...';
    case 'approved':
      return '수락됨';
    case 'rejected':
      return '거절됨';
    case 'timeout':
      return '응답 없음';
    default:
      return status;
  }
}
