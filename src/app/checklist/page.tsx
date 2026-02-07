'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  MapPin,
  User,
  Activity,
  CheckCircle2,
  Stethoscope,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageContainer from '@/components/layout/PageContainer';
import VoiceInputFAB from '@/components/checklist/VoiceInputFAB';
import { startMatching } from '@/lib/api';
import { cn } from '@/lib/utils';
import type { KTASLevel, KTASCategory, GeminiPatientExtraction } from '@/types';

const KTAS_CATEGORIES: KTASCategory[] = [
  {
    level: 1,
    name: '소생',
    description: '즉각적인 처치가 필요하며, 생명이나 사지를 위협하는 상태',
    symptoms: ['심장마비', '무호흡', '의식 불능'],
    priority: '1순위',
  },
  {
    level: 2,
    name: '긴급',
    description:
      '생명 혹은 사지·신체 기능에 잠재적 위협이 있어, 빠른 치료가 필요한 경우',
    symptoms: ['심근경색', '뇌출혈', '뇌경색'],
    priority: '2순위',
  },
  {
    level: 3,
    name: '응급',
    description:
      '치료가 필요한 상태. 진행될 수도 있는 잠재적 가능성을 고려해야 하는 경우',
    symptoms: ['호흡곤란(산소포화도 90% 이상)', '출혈을 동반한 설사'],
    priority: '3순위',
  },
  {
    level: 4,
    name: '준응급',
    description:
      '환자의 나이, 통증, 악화, 합병증을 고려할 때 1~2시간 내 처치나 재평가를 시행하면 되는 상태',
    symptoms: ['38도 이상 발열을 동반한 장염', '복통을 동반한 요로감염'],
    priority: '4순위',
  },
  {
    level: 5,
    name: '비응급',
    description:
      '긴급하지만 응급이 아닌 상태, 만성적인 문제로 인한 것. 또는 악화 가능성이 낮은 상태',
    symptoms: ['감기', '장염', '설사', '열상(상처)'],
    priority: '5순위',
  },
];

const AGE_RANGES = [
  '10대 미만',
  '10대',
  '20대',
  '30대',
  '40대',
  '50대',
  '60대',
  '70대 이상',
] as const;

const EMERGENCY_CATEGORIES = [
  { value: '외상', label: '외상' },
  { value: '심장', label: '심장' },
  { value: '신경', label: '신경' },
  { value: '호흡기', label: '호흡기' },
  { value: '소화기', label: '소화기' },
  { value: '중독', label: '중독' },
  { value: '화상', label: '화상' },
  { value: '기타', label: '기타' },
] as const;

const SYMPTOMS_BY_CATEGORY: Record<string, string[]> = {
  외상: ['골절', '출혈', '열상', '타박상', '관통상', '탈구'],
  심장: ['흉통', '호흡곤란', '부정맥', '실신', '청색증'],
  신경: ['두통', '어지러움', '마비', '경련', '의식저하'],
  호흡기: ['호흡곤란', '천식발작', '기침', '객혈', '질식'],
  소화기: ['복통', '구토', '토혈', '하혈', '설사'],
  중독: ['약물중독', '가스중독', '식중독', '음독', '알코올'],
  화상: ['열화상', '화학화상', '전기화상', '흡입화상'],
  기타: ['발열', '알레르기', '탈수', '저체온', '기타'],
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function PatientChecklist() {
  const router = useRouter();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [selectedKTAS, setSelectedKTAS] = useState<KTASLevel | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [sex, setSex] = useState<'male' | 'female' | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [symptom, setSymptom] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVoiceExtraction = useCallback((data: GeminiPatientExtraction) => {
    if (data.age) setAge(data.age);
    if (data.sex) setSex(data.sex);
    if (data.category) {
      setCategory(data.category);
      if (data.symptom) {
        setSymptom(data.symptom);
      } else {
        setSymptom(null);
      }
    }
    if (data.grade) setSelectedKTAS(data.grade);
    if (data.remarks) setNotes(data.remarks);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=ko`,
            { headers: { 'User-Agent': 'EmergencyAICall/1.0' } }
          )
            .then((res) => res.json())
            .then(
              (data: {
                display_name?: string;
                address?: {
                  road?: string;
                  suburb?: string;
                  borough?: string;
                  city_district?: string;
                  city?: string;
                };
              }) => {
                const a = data.address;
                if (a) {
                  const parts = [
                    a.city,
                    a.city_district ?? a.borough,
                    a.suburb,
                    a.road,
                  ].filter(Boolean);
                  setAddress(parts.join(' ') || data.display_name || null);
                }
              }
            )
            .catch(() => {});
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  const handleSubmit = async () => {
    setErrorMessage(null);

    if (!selectedKTAS) {
      setErrorMessage('KTAS 등급을 선택해주세요.');
      return;
    }

    if (!location) {
      setErrorMessage(
        '위치 정보를 가져올 수 없습니다. 위치 권한을 허용해주세요.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await startMatching({
        age: age ?? '알 수 없음',
        sex: sex ?? 'male',
        category: category ?? '기타',
        symptom: symptom ?? '미입력',
        remarks: notes || '없음',
        grade: selectedKTAS,
        lat: location.lat,
        lng: location.lng,
      });

      if (result.success) {
        router.push(`/dashboard/${result.channel}`);
      } else {
        setErrorMessage(result.message || '매칭 시작에 실패했습니다.');
      }
    } catch (err) {
      console.error('Emergency request failed:', err);
      setErrorMessage('서버 연결에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer size="md" className="space-y-8 py-8">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
          응급 환자 정보 입력
        </h1>
        <p className="text-muted-foreground">
          환자 정보를 입력하면 AI가 주변 5개 병원에 동시에 전화를 겁니다.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="text-primary h-5 w-5" />
              현재 위치
            </CardTitle>
          </CardHeader>
          <CardContent>
            {location ? (
              <div className="bg-secondary/50 flex items-center gap-3 rounded-lg p-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--color-success)]" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-foreground text-sm font-medium">
                    {address ?? '위치 확인됨'}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/50 flex items-center gap-3 rounded-lg p-3">
                <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                <span className="text-muted-foreground text-sm">
                  위치 정보를 가져오는 중...
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="text-primary h-5 w-5" />
              환자 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <span className="text-foreground text-sm font-medium">
                  나이
                </span>
                <div className="flex flex-wrap gap-2">
                  {AGE_RANGES.map((range) => (
                    <Button
                      key={range}
                      type="button"
                      variant={age === range ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAge(range)}
                      className="px-3"
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-foreground text-sm font-medium">
                  성별
                </span>
                <div className="flex gap-2">
                  {(['male', 'female'] as const).map((g) => (
                    <Button
                      key={g}
                      type="button"
                      variant={sex === g ? 'default' : 'outline'}
                      onClick={() => setSex(g)}
                      className="flex-1"
                    >
                      {g === 'male' ? '남성' : '여성'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Stethoscope className="text-primary h-5 w-5" />
              응급 카테고리
            </CardTitle>
            <CardDescription>
              환자의 응급 상황 유형을 선택해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {EMERGENCY_CATEGORIES.map((cat) => (
                <Button
                  key={cat.value}
                  type="button"
                  variant={category === cat.value ? 'default' : 'outline'}
                  onClick={() => {
                    setCategory(cat.value);
                    setSymptom(null); // reset symptom when category changes
                  }}
                  className="px-4 py-2"
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {category && SYMPTOMS_BY_CATEGORY[category] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2 pt-2"
              >
                <span className="text-foreground text-sm font-medium">
                  증상 선택
                </span>
                <div className="flex flex-wrap gap-2">
                  {SYMPTOMS_BY_CATEGORY[category].map((s) => (
                    <Badge
                      key={s}
                      variant={symptom === s ? 'default' : 'secondary'}
                      className={cn(
                        'cursor-pointer px-3 py-1.5 text-sm transition-all',
                        symptom === s && 'ring-primary ring-2 ring-offset-1'
                      )}
                      onClick={() => setSymptom(symptom === s ? null : s)}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">추가 정보 (선택)</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="기타 참고 사항을 입력해주세요..."
              rows={3}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="text-destructive h-5 w-5" />
              KTAS 응급도 분류
            </CardTitle>
            <CardDescription>
              환자의 상태에 가장 가까운 등급을 선택해주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {KTAS_CATEGORIES.map((ktasItem) => (
                <motion.button
                  key={ktasItem.level}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedKTAS(ktasItem.level)}
                  className={cn(
                    'w-full rounded-xl border-2 p-4 text-left transition-all duration-200',
                    selectedKTAS === ktasItem.level
                      ? 'border-primary bg-primary/5 ring-primary ring-1'
                      : 'border-border hover:border-primary/50 hover:bg-accent/50'
                  )}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant={
                            ktasItem.level <= 2
                              ? 'critical'
                              : ktasItem.level <= 3
                                ? 'urgent'
                                : 'warning'
                          }
                          className="px-2 py-0.5 text-sm"
                        >
                          KTAS {ktasItem.level}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {ktasItem.priority}
                        </Badge>
                        <span className="text-foreground font-semibold">
                          {ktasItem.name}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {ktasItem.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {ktasItem.symptoms.map((s) => (
                          <Badge
                            key={s}
                            variant="secondary"
                            className="bg-secondary/50 text-secondary-foreground text-xs font-normal"
                          >
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedKTAS === ktasItem.level && (
                      <CheckCircle2 className="text-primary animate-in zoom-in h-6 w-6 shrink-0 duration-300" />
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </CardContent>
        </Card>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-[var(--color-critical)]/20 bg-[var(--color-critical)]/5 p-3 text-sm font-medium text-[var(--color-critical)]"
          >
            {errorMessage}
          </motion.div>
        )}

        <div className="sticky bottom-4 pt-4">
          <Button
            type="button"
            variant="critical"
            size="lg"
            className="h-12 w-full text-base font-bold shadow-lg shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:shadow-red-500/30 sm:h-14 sm:text-lg"
            onClick={handleSubmit}
            disabled={!selectedKTAS || !category || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>처리 중...</span>
              </div>
            ) : (
              'AI 병원 전화 시작'
            )}
          </Button>
        </div>
      </div>

      <VoiceInputFAB onExtraction={handleVoiceExtraction} />
    </PageContainer>
  );
}
