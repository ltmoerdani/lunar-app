/**
 * Custom hooks for database operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth';
import * as db from '@/services/database';

// Profile hooks
export function useUserProfile() {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => user ? db.getUserProfile(user.id) : null,
    enabled: !!user,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: (updates: Parameters<typeof db.updateUserProfile>[1]) =>
      user ? db.updateUserProfile(user.id, updates) : Promise.reject('No user'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
    },
  });
}

// Preferences hooks
export function useUserPreferences() {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['preferences', user?.id],
    queryFn: () => user ? db.getUserPreferences(user.id) : null,
    enabled: !!user,
  });
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: (updates: Parameters<typeof db.updateUserPreferences>[1]) =>
      user ? db.updateUserPreferences(user.id, updates) : Promise.reject('No user'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences', user?.id] });
    },
  });
}

// Fasting records hooks
export function useFastingRecords(startDate?: string, endDate?: string) {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['fasting-records', user?.id, startDate, endDate],
    queryFn: () => user ? db.getUserFastingRecords(user.id, startDate, endDate) : [],
    enabled: !!user,
  });
}

export function useCreateFastingRecord() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: (recordData: Omit<Parameters<typeof db.createFastingRecord>[0], 'user_id'>) =>
      user ? db.createFastingRecord({ ...recordData, user_id: user.id }) : Promise.reject('No user'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fasting-records', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['user-statistics', user?.id] });
    },
  });
}

export function useUpdateFastingRecord() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: ({ recordId, updates }: { recordId: string; updates: Parameters<typeof db.updateFastingRecord>[1] }) =>
      db.updateFastingRecord(recordId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fasting-records', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['user-statistics', user?.id] });
    },
  });
}

// Fasting plans hooks
export function useFastingPlans() {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['fasting-plans', user?.id],
    queryFn: () => user ? db.getUserFastingPlans(user.id) : [],
    enabled: !!user,
  });
}

export function useCreateFastingPlan() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: (planData: Omit<Parameters<typeof db.createFastingPlan>[0], 'user_id'>) =>
      user ? db.createFastingPlan({ ...planData, user_id: user.id }) : Promise.reject('No user'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fasting-plans', user?.id] });
    },
  });
}

// Reference data hooks
export function useFastingTypes() {
  return useQuery({
    queryKey: ['fasting-types'],
    queryFn: db.getFastingTypes,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useIslamicEvents() {
  return useQuery({
    queryKey: ['islamic-events'],
    queryFn: db.getIslamicEvents,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: db.getAchievements,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

// User statistics hooks
export function useUserStatistics(year: number = new Date().getFullYear()) {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['user-statistics', user?.id, year],
    queryFn: () => user ? db.getUserStatistics(user.id, year) : null,
    enabled: !!user,
  });
}

// User achievements hooks
export function useUserAchievements() {
  const { user } = useAuthStore();
  
  return useQuery({
    queryKey: ['user-achievements', user?.id],
    queryFn: () => user ? db.getUserAchievements(user.id) : [],
    enabled: !!user,
  });
}