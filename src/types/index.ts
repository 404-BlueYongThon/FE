export type KTASLevel = 1 | 2 | 3 | 4 | 5;

export interface KTASCategory {
  level: KTASLevel;
  name: string;
  description: string;
  symptoms: string[];
  priority: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance?: number;
  specialization?: string[];
}

export interface CallStatus {
  hospitalId: string;
  status: 'pending' | 'calling' | 'approved' | 'rejected' | 'timeout';
  timestamp: string;
  message?: string;
}


