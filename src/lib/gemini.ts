import { getGeminiApiKey } from '@/lib/env';
import type { GeminiPatientExtraction } from '@/types';

const GEMINI_API_BASE =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';

const VALID_AGE_RANGES = [
  '10대 미만',
  '10대',
  '20대',
  '30대',
  '40대',
  '50대',
  '60대',
  '70대 이상',
] as const;

const VALID_CATEGORIES = [
  '외상',
  '심장',
  '신경',
  '호흡기',
  '소화기',
  '중독',
  '화상',
  '기타',
] as const;

const SYMPTOMS_BY_CATEGORY: Record<string, readonly string[]> = {
  외상: ['골절', '출혈', '열상', '타박상', '관통상', '탈구'],
  심장: ['흉통', '호흡곤란', '부정맥', '실신', '청색증'],
  신경: ['두통', '어지러움', '마비', '경련', '의식저하'],
  호흡기: ['호흡곤란', '천식발작', '기침', '객혈', '질식'],
  소화기: ['복통', '구토', '토혈', '하혈', '설사'],
  중독: ['약물중독', '가스중독', '식중독', '음독', '알코올'],
  화상: ['열화상', '화학화상', '전기화상', '흡입화상'],
  기타: ['발열', '알레르기', '탈수', '저체온', '기타'],
};

const SYSTEM_PROMPT = `You are an emergency medical triage assistant. Extract structured patient data from Korean speech transcripts.

RULES:
- Output ONLY valid JSON, no markdown, no explanation.
- Use null for any field you cannot determine from the transcript.
- age must be one of: ${VALID_AGE_RANGES.join(', ')}
- sex must be "male" or "female"
- category must be one of: ${VALID_CATEGORIES.join(', ')}
- symptom must be a valid symptom for the chosen category:
${Object.entries(SYMPTOMS_BY_CATEGORY)
  .map(([cat, syms]) => `  ${cat}: ${syms.join(', ')}`)
  .join('\n')}
- grade must be 1-5 (KTAS level): 1=소생(심장마비,무호흡,의식불능), 2=긴급(심근경색,뇌출혈,뇌경색), 3=응급(호흡곤란,출혈동반설사), 4=준응급(발열장염,요로감염), 5=비응급(감기,장염,열상)
- remarks: any additional context from the transcript (injuries, consciousness, bleeding, etc). Keep it under 50 characters.

OUTPUT FORMAT:
{"age":string|null,"sex":"male"|"female"|null,"category":string|null,"symptom":string|null,"grade":number|null,"remarks":string|null}`;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export async function extractPatientData(
  transcript: string
): Promise<GeminiPatientExtraction> {
  const apiKey = getGeminiApiKey();

  const response = await fetch(`${GEMINI_API_BASE}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\nTRANSCRIPT:\n${transcript}` }],
        },
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 256,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data: GeminiResponse = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Empty Gemini response');
  }

  const parsed: GeminiPatientExtraction = JSON.parse(text);
  return validateExtraction(parsed);
}

function validateExtraction(
  raw: GeminiPatientExtraction
): GeminiPatientExtraction {
  const validated: GeminiPatientExtraction = {
    age: null,
    sex: null,
    category: null,
    symptom: null,
    grade: null,
    remarks: null,
  };

  if (raw.age && (VALID_AGE_RANGES as readonly string[]).includes(raw.age)) {
    validated.age = raw.age;
  }

  if (raw.sex === 'male' || raw.sex === 'female') {
    validated.sex = raw.sex;
  }

  if (
    raw.category &&
    (VALID_CATEGORIES as readonly string[]).includes(raw.category)
  ) {
    validated.category = raw.category;
  }

  if (raw.category && raw.symptom) {
    const validSymptoms = SYMPTOMS_BY_CATEGORY[raw.category];
    if (validSymptoms?.includes(raw.symptom)) {
      validated.symptom = raw.symptom;
    }
  }

  if (raw.grade && raw.grade >= 1 && raw.grade <= 5) {
    validated.grade = raw.grade as GeminiPatientExtraction['grade'];
  }

  if (raw.remarks && typeof raw.remarks === 'string') {
    validated.remarks = raw.remarks.slice(0, 50);
  }

  return validated;
}
