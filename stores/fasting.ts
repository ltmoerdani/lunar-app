import { create } from 'zustand';
import { FastingRecord, FastingPlan, FastingStats, TodayAnalysis, FastingOpportunity, FastingType, FastingStatus } from '@/types/fasting';

interface FastingState {
  // State
  records: FastingRecord[];
  plans: FastingPlan[];
  stats: FastingStats | null;
  todayAnalysis: TodayAnalysis | null;
  opportunities: FastingOpportunity[];
  isLoading: boolean;
  error: string | null;

  // Actions
  addRecord: (record: Omit<FastingRecord, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateRecord: (id: string, updates: Partial<FastingRecord>) => void;
  deleteRecord: (id: string) => void;
  addPlan: (plan: Omit<FastingPlan, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePlan: (id: string, updates: Partial<FastingPlan>) => void;
  deletePlan: (id: string) => void;
  commitTodayPlan: (type: FastingType, niat: string) => void;
  startFasting: (planId: string) => void;
  completeFasting: (recordId: string, notes?: string, spiritualReflection?: string) => void;
  emergencyBreak: (recordId: string, reason: string) => void;
  cancelPlan: (planId: string) => void;
  loadTodayAnalysis: () => void;
  loadOpportunities: () => void;
  calculateStats: () => void;
}

export const useFastingStore = create<FastingState>((set, get) => ({
  // Initial state
  records: [],
  plans: [],
  stats: null,
  todayAnalysis: null,
  opportunities: [],
  isLoading: false,
  error: null,

  // Actions
  addRecord: (recordData) => {
    const newRecord: FastingRecord = {
      ...recordData,
      id: `record_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      records: [...state.records, newRecord],
    }));
    get().calculateStats();
  },

  updateRecord: (id, updates) => {
    set((state) => ({
      records: state.records.map((record) =>
        record.id === id
          ? { ...record, ...updates, updatedAt: new Date().toISOString() }
          : record
      ),
    }));
    get().calculateStats();
  },

  deleteRecord: (id) => {
    set((state) => ({
      records: state.records.filter((record) => record.id !== id),
    }));
    get().calculateStats();
  },

  addPlan: (planData) => {
    const newPlan: FastingPlan = {
      ...planData,
      id: `plan_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      plans: [...state.plans, newPlan],
    }));
  },

  updatePlan: (id, updates) => {
    set((state) => ({
      plans: state.plans.map((plan) =>
        plan.id === id
          ? { ...plan, ...updates, updatedAt: new Date().toISOString() }
          : plan
      ),
    }));
  },

  deletePlan: (id) => {
    set((state) => ({
      plans: state.plans.filter((plan) => plan.id !== id),
    }));
  },

  commitTodayPlan: (type, niat) => {
    const today = new Date().toISOString().split('T')[0];
    get().addRecord({
      date: today,
      type,
      status: FastingStatus.COMMITTED,
      niat,
    });
  },

  startFasting: (planId) => {
    const plan = get().plans.find(p => p.id === planId);
    if (plan) {
      get().addRecord({
        date: plan.date,
        type: plan.type,
        status: FastingStatus.ACTIVE,
        niat: plan.niat,
        startTime: new Date().toISOString(),
      });
      get().deletePlan(planId);
    }
  },

  completeFasting: (recordId, notes, spiritualReflection) => {
    get().updateRecord(recordId, {
      status: FastingStatus.COMPLETED,
      endTime: new Date().toISOString(),
      notes,
      spiritualReflection,
    });
  },

  emergencyBreak: (recordId, reason) => {
    get().updateRecord(recordId, {
      status: FastingStatus.EMERGENCY_BREAK,
      endTime: new Date().toISOString(),
      notes: `Emergency break: ${reason}`,
    });
  },

  cancelPlan: (planId) => {
    get().updatePlan(planId, {
      isCommitted: false,
    });
  },

  loadTodayAnalysis: () => {
    const today = new Date().toISOString().split('T')[0];
    // Mock analysis - in real app, this would be calculated based on user patterns
    const mockAnalysis: TodayAnalysis = {
      date: today,
      isOptimal: true,
      scheduleIntensity: 'light',
      energyLevel: 90,
      successProbability: 95,
      conflicts: [],
      recommendations: [
        'Perfect untuk qadha + bonus Senin!',
        'Last chance weekend prep sebelum busy week.'
      ],
      availableTypes: [FastingType.QADHA_RAMADAN, FastingType.SUNNAH_SENIN_KAMIS],
    };
    
    set({ todayAnalysis: mockAnalysis });
  },

  loadOpportunities: () => {
    // Mock opportunities - in real app, this would be calculated
    const mockOpportunities: FastingOpportunity[] = [
      {
        date: '2024-11-14',
        types: [FastingType.SUNNAH_SENIN_KAMIS],
        priority: 'medium' as const,
        successRate: 95,
        conflicts: [],
        hijriDate: '21 ربيع الأول 1446',
        description: 'Puasa Reguler - Selasa'
      },
      {
        date: '2024-11-16',
        types: [FastingType.SUNNAH_AYYAMUL_BIDH],
        priority: 'high' as const,
        successRate: 98,
        conflicts: [],
        specialEvent: 'Ayyamul Bidh',
        hijriDate: '23 ربيع الأول 1446',
        description: 'Ayyamul Bidh - Kamis'
      }
    ];
    
    set({ opportunities: mockOpportunities });
  },

  calculateStats: () => {
    const { records } = get();
    const completedRecords = records.filter(r => r.status === FastingStatus.COMPLETED);
    
    // Calculate current streak
    let currentStreak = 0;
    const sortedRecords = [...completedRecords].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Mock stats calculation
    const stats: FastingStats = {
      totalCompleted: completedRecords.length,
      currentStreak: 2, // mock
      bestStreak: 6, // mock
      monthlyCompleted: 8,
      monthlyTarget: 12,
      qadhaRemaining: 2,
      nazarRemaining: 0,
      consistencyScore: 85,
      averageDifficulty: 3.2,
      successRate: 92,
    };
    
    set({ stats });
  },
}));