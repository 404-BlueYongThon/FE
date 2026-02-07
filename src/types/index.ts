export type KTASLevel = 1 | 2 | 3 | 4 | 5;

export interface KTASCategory {
  level: KTASLevel;
  name: string;
  description: string;
  symptoms: string[];
  priority: string;
}

// --- API Request/Response Types (aligned with BE DTOs) ---

/** POST /matching/start request body */
export interface StartMatchingRequest {
  age: string;
  sex: string;
  category: string;
  symptom: string;
  remarks: string;
  grade: number;
  lat: number;
  lng: number;
}

/** POST /matching/start response */
export interface StartMatchingResponse {
  success: boolean;
  message: string;
  patientId: number;
  channel: string;
  hospitals?: Array<{
    hospitalId: number;
    hospitalName: string;
    hospitalNumber: string;
  }>;
}

// --- SSE Event Types ---

export type SSEEventStatus =
  | 'connected'
  | 'calling'
  | 'ringing'
  | 'in-progress'
  | 'accepted'
  | 'rejected'
  | 'no_answer'
  | 'all_rejected'
  | 'AI_SERVER_ERROR';

export interface SSEEvent {
  message: string;
  hospitalId?: number;
  hospitalName?: string;
  hospitalNumber?: string;
  status: SSEEventStatus;
}

// --- UI Display Types ---

export type CallDisplayStatus =
  | 'pending'
  | 'calling'
  | 'ringing'
  | 'in-progress'
  | 'accepted'
  | 'rejected'
  | 'no_answer'
  | 'all_rejected'
  | 'error';

export interface HospitalCallStatus {
  hospitalId: number;
  hospitalName?: string;
  hospitalNumber?: string;
  status: CallDisplayStatus;
  message?: string;
  timestamp: string;
}

// --- Gemini AI Extraction Types ---

export interface GeminiPatientExtraction {
  age: string | null;
  sex: 'male' | 'female' | null;
  category: string | null;
  symptom: string | null;
  grade: KTASLevel | null;
  remarks: string | null;
}

// --- DB Entity Types (from Prisma schema, for reference) ---

export interface Hospital {
  id: number;
  name: string;
  number: string;
  latitude: number;
  longitude: number;
  distance?: number;
}
