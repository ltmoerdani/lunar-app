export interface FastingRecord {
  id: string;
  date: string;
  type: FastingType;
  status: FastingStatus;
  niat: string;
  startTime?: string;
  endTime?: string;
  notes?: string;
  difficulty?: number; // 1-5 scale
  spiritualReflection?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FastingPlan {
  id: string;
  date: string;
  type: FastingType;
  priority: Priority;
  niat: string;
  estimatedDifficulty: number;
  conflictScore: number;
  isCommitted: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum FastingType {
  QADHA_RAMADAN = 'qadha_ramadan',
  QADHA_OTHER = 'qadha_other',
  NAZAR = 'nazar',
  KAFARAT = 'kafarat',
  SUNNAH_SENIN_KAMIS = 'sunnah_senin_kamis',
  SUNNAH_AYYAMUL_BIDH = 'sunnah_ayyamul_bidh',
  SUNNAH_ASYURA = 'sunnah_asyura',
  SUNNAH_ARAFAH = 'sunnah_arafah',
  SUNNAH_TARWIYAH = 'sunnah_tarwiyah',
  SUNNAH_SYAWAL = 'sunnah_syawal',
  SUNNAH_MUHARRAM = 'sunnah_muharram',
  SUNNAH_SYABAN = 'sunnah_syaban',
  SUNNAH_DAUD = 'sunnah_daud',
  SUNNAH_OTHER = 'sunnah_other',
}

export enum FastingStatus {
  PLANNED = 'planned',
  COMMITTED = 'committed',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EMERGENCY_BREAK = 'emergency_break',
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export interface FastingStats {
  totalCompleted: number;
  currentStreak: number;
  bestStreak: number;
  monthlyCompleted: number;
  monthlyTarget: number;
  qadhaRemaining: number;
  nazarRemaining: number;
  consistencyScore: number; // percentage
  averageDifficulty: number;
  successRate: number; // percentage
}

export interface TodayAnalysis {
  date: string;
  isOptimal: boolean;
  scheduleIntensity: 'light' | 'medium' | 'heavy';
  energyLevel: number; // 1-100
  successProbability: number; // 1-100
  conflicts: string[];
  recommendations: string[];
  availableTypes: FastingType[];
}

export interface FastingOpportunity {
  date: string;
  types: FastingType[];
  priority: Priority;
  successRate: number;
  conflicts: string[];
  specialEvent?: string;
  hijriDate: string;
  description: string;
}