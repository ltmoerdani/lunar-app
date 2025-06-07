/**
 * Supabase connection test utility
 * Tests database connectivity and basic operations
 */

import { supabase } from './supabase';

export async function testSupabaseConnection(): Promise<boolean> {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('fasting_types')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }

    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
}

export async function testUserOperations(userId: string): Promise<boolean> {
  try {
    // Test user profile operations
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Profile test error:', profileError);
      return false;
    }

    // Test user preferences
    const { data: preferences, error: preferencesError } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (preferencesError && preferencesError.code !== 'PGRST116') {
      console.error('Preferences test error:', preferencesError);
      return false;
    }

    console.log('User operations test successful');
    return true;
  } catch (error) {
    console.error('User operations test failed:', error);
    return false;
  }
}

export async function getFastingTypes() {
  try {
    const { data, error } = await supabase
      .from('fasting_types')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true });

    if (error) {
      console.error('Error fetching fasting types:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch fasting types:', error);
    return [];
  }
}

export async function getIslamicEvents() {
  try {
    const { data, error } = await supabase
      .from('islamic_events')
      .select('*')
      .order('hijri_month', { ascending: true })
      .order('hijri_day', { ascending: true });

    if (error) {
      console.error('Error fetching Islamic events:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch Islamic events:', error);
    return [];
  }
}