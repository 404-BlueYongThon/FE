'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, User, Activity, CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageContainer from '@/components/layout/PageContainer';
import { cn } from '@/lib/utils';
import { KTASLevel, KTASCategory } from '@/types';

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
    description: '생명 혹은 사지·신체 기능에 잠재적 위협이 있어, 빠른 치료가 필요한 경우',
    symptoms: ['심근경색', '뇌출혈', '뇌경색'],
    priority: '2순위',
  },
  {
    level: 3,
    name: '응급',
    description: '치료가 필요한 상태. 진행될 수도 있는 잠재적 가능성을 고려해야 하는 경우',
    symptoms: ['호흡곤란(산소포화도 90% 이상)', '출혈을 동반한 설사'],
    priority: '3순위',
  },
  {
    level: 4,
    name: '준응급',
    description: '환자의 나이, 통증, 악화, 합병증을 고려할 때 1~2시간 내 처치나 재평가를 시행하면 되는 상태',
    symptoms: ['38도 이상 발열을 동반한 장염', '복통을 동반한 요로감염'],
    priority: '4순위',
  },
  {
    level: 5,
    name: '비응급',
    description: '긴급하지만 응급이 아닌 상태, 만성적인 문제로 인한 것. 또는 악화 가능성이 낮은 상태',
    symptoms: ['감기', '장염', '설사', '열상(상처)'],
    priority: '5순위',
  },
];

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
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedKTAS, setSelectedKTAS] = useState<KTASLevel | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async () => {
    if (!selectedKTAS) {
      alert('KTAS 등급을 선택해주세요.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/dashboard/mock-123');
    }, 1500);
  };

  return (
    <PageContainer size="md" className="py-8 space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
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
              <MapPin className="h-5 w-5 text-primary" />
              현재 위치
            </CardTitle>
          </CardHeader>
          <CardContent>
            {location ? (
              <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">위치 확인됨</span>
                  <span className="text-xs text-muted-foreground">
                    위도: {location.lat.toFixed(6)}, 경도: {location.lng.toFixed(6)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span className="text-sm text-muted-foreground">위치 정보를 가져오는 중...</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-primary" />
              환자 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-medium text-foreground">
                  나이
                </label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  placeholder="나이 입력"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-foreground">성별</span>
                <div className="flex gap-2">
                  {['male', 'female', 'other'].map((g) => (
                    <Button
                      key={g}
                      type="button"
                      variant={gender === g ? 'default' : 'outline'}
                      onClick={() => setGender(g as typeof gender)}
                      className="flex-1"
                    >
                      {g === 'male' ? '남성' : g === 'female' ? '여성' : '기타'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium text-foreground">
                추가 정보 (선택)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="기타 참고 사항을 입력해주세요..."
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-destructive" />
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
              {KTAS_CATEGORIES.map((category) => (
                <motion.button
                  key={category.level}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    setSelectedKTAS(category.level);
                    if (category.symptoms.length > 0 && !symptoms.includes(category.symptoms[0])) {
                      toggleSymptom(category.symptoms[0]);
                    }
                  }}
                  className={cn(
                    "w-full rounded-xl border-2 p-4 text-left transition-all duration-200",
                    selectedKTAS === category.level
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  )}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant={
                            category.level <= 2
                              ? 'critical'
                              : category.level <= 3
                                ? 'urgent'
                                : 'warning'
                          }
                          className="px-2 py-0.5 text-sm"
                        >
                          KTAS {category.level}
                        </Badge>
                        <Badge variant="outline" className="text-xs font-normal">
                          {category.priority}
                        </Badge>
                        <span className="font-semibold text-foreground">
                          {category.name}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {category.symptoms.map((symptom) => (
                          <Badge 
                            key={symptom} 
                            variant="secondary" 
                            className="text-xs font-normal bg-secondary/50 text-secondary-foreground"
                          >
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedKTAS === category.level && (
                      <CheckCircle2 className="h-6 w-6 text-primary shrink-0 animate-in zoom-in duration-300" />
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </CardContent>
        </Card>

        {symptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border bg-card shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">선택된 증상</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors px-3 py-1"
                      onClick={() => toggleSymptom(symptom)}
                    >
                      {symptom} ×
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="sticky bottom-4 pt-4">
          <Button
            type="button"
            variant="critical"
            size="lg"
            className="w-full h-12 text-base font-bold shadow-lg shadow-red-500/20 transition-all hover:shadow-red-500/30 hover:-translate-y-0.5 sm:h-14 sm:text-lg"
            onClick={handleSubmit}
            disabled={!selectedKTAS || isSubmitting}
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
    </PageContainer>
  );
}
