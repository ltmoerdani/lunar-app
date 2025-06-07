/**
 * Database service functions for Supabase operations
 */

import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

type Tables = Database['public']['Tables'];

// Profile operations
export async function createUserProfile(userId: string, profileData: Partial<Tables['profiles']['Insert']>) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      ...profileData,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateUserProfile(userId: string, updates: Tables['profiles']['Update']) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// User preferences operations
export async function getUserPreferences(userId: string) {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateUserPreferences(userId: string, updates: Tables['user_preferences']['Update']) {
  const { data, error } = await supabase
    .from('user_preferences')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Fasting records operations
export async function createFastingRecord(recordData: Tables['fasting_records']['Insert']) {
  const { data, error } = await supabase
    .from('fasting_records')
    .insert(recordData)
    .select(`
      *,
      fasting_types (*)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserFastingRecords(userId: string, startDate?: string, endDate?: string) {
  let query = supabase
    .from('fasting_records')
    .select(`
      *,
      fasting_types (*)
    `)
    .eq('user_id', userId)
    .order('fasting_date', { ascending: false });

  if (startDate) {
    query = query.gte('fasting_date', startDate);
  }
  if (endDate) {
    query = query.lte('fasting_date', endDate);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function updateFastingRecord(recordId: string, updates: Tables['fasting_records']['Update']) {
  const { data, error } = await supabase
    .from('fasting_records')
    .update(updates)
    .eq('id', recordId)
    .select(`
      *,
      fasting_types (*)
    `)
    .single();

  if (error) throw error;
  return data;
}

// Fasting plans operations
export async function createFastingPlan(planData: Tables['fasting_plans']['Insert']) {
  const { data, error } = await supabase
    .from('fasting_plans')
    .insert(planData)
    .select(`
      *,
      fasting_types (*)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserFastingPlans(userId: string) {
  const { data, error } = await supabase
    .from('fasting_plans')
    .select(`
      *,
      fasting_types (*)
    `)
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('start_date', { ascending: true });

  if (error) throw error;
  return data || [];
}

// Reference data operations
export async function getFastingTypes() {
  const { data, error } = await supabase
    .from('fasting_types')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getIslamicEvents() {
  const { data, error } = await supabase
    .from('islamic_events')
    .select('*')
    .order('hijri_month', { ascending: true })
    .order('hijri_day', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getAchievements() {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('is_active', true)
    .order('rarity', { ascending: true });

  if (error) throw error;
  return data || [];
}

// User statistics operations
export async function getUserStatistics(userId: string, year: number) {
  const { data, error } = await supabase
    .from('user_statistics')
    .select('*')
    .eq('user_id', userId)
    .eq('statistics_year', year)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function updateUserStatistics(userId: string, year: number, updates: Tables['user_statistics']['Update']) {
  const { data, error } = await supabase
    .from('user_statistics')
    .upsert({
      user_id: userId,
      statistics_year: year,
      ...updates,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// User achievements operations
export async function getUserAchievements(userId: string) {
  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievements (*)
    `)
    .eq('user_id', userId)
    .order('achieved_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function awardAchievement(userId: string, achievementId: string, progressValue: number) {
  const { data, error } = await supabase
    .from('user_achievements')
    .insert({
      user_id: userId,
      achievement_id: achievementId,
      progress_value: progressValue,
    })
    .select(`
      *,
      achievements (*)
    `)
    .single();

  if (error) throw error;
  return data;
}