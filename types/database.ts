/**
 * Database type definitions for Supabase tables
 */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          avatar_url: string | null;
          phone: string | null;
          date_of_birth: string | null;
          gender: 'male' | 'female' | null;
          location: string | null;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          avatar_url?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          gender?: 'male' | 'female' | null;
          location?: string | null;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          avatar_url?: string | null;
          phone?: string | null;
          date_of_birth?: string | null;
          gender?: 'male' | 'female' | null;
          location?: string | null;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_preferences: {
        Row: {
          id: string;
          user_id: string;
          theme_mode: 'light' | 'dark' | 'system';
          language: 'id' | 'en' | 'ar';
          calculation_method: 'kemenag' | 'nu' | 'muhammadiyah' | 'mabims';
          madhab: 'hanafi' | 'shafi' | 'maliki' | 'hanbali';
          sahur_reminder: boolean;
          sahur_reminder_minutes: number;
          iftar_reminder: boolean;
          iftar_reminder_minutes: number;
          weekly_planning_reminder: boolean;
          achievement_notifications: boolean;
          profile_visibility: 'public' | 'friends' | 'private';
          share_achievements: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          theme_mode?: 'light' | 'dark' | 'system';
          language?: 'id' | 'en' | 'ar';
          calculation_method?: 'kemenag' | 'nu' | 'muhammadiyah' | 'mabims';
          madhab?: 'hanafi' | 'shafi' | 'maliki' | 'hanbali';
          sahur_reminder?: boolean;
          sahur_reminder_minutes?: number;
          iftar_reminder?: boolean;
          iftar_reminder_minutes?: number;
          weekly_planning_reminder?: boolean;
          achievement_notifications?: boolean;
          profile_visibility?: 'public' | 'friends' | 'private';
          share_achievements?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          theme_mode?: 'light' | 'dark' | 'system';
          language?: 'id' | 'en' | 'ar';
          calculation_method?: 'kemenag' | 'nu' | 'muhammadiyah' | 'mabims';
          madhab?: 'hanafi' | 'shafi' | 'maliki' | 'hanbali';
          sahur_reminder?: boolean;
          sahur_reminder_minutes?: number;
          iftar_reminder?: boolean;
          iftar_reminder_minutes?: number;
          weekly_planning_reminder?: boolean;
          achievement_notifications?: boolean;
          profile_visibility?: 'public' | 'friends' | 'private';
          share_achievements?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      fasting_types: {
        Row: {
          id: string;
          code: string;
          name_id: string;
          name_en: string;
          name_ar: string | null;
          category: 'wajib' | 'sunnah' | 'qadha' | 'nazar' | 'kaffarah';
          description_id: string | null;
          description_en: string | null;
          reward_points: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name_id: string;
          name_en: string;
          name_ar?: string | null;
          category: 'wajib' | 'sunnah' | 'qadha' | 'nazar' | 'kaffarah';
          description_id?: string | null;
          description_en?: string | null;
          reward_points?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          name_id?: string;
          name_en?: string;
          name_ar?: string | null;
          category?: 'wajib' | 'sunnah' | 'qadha' | 'nazar' | 'kaffarah';
          description_id?: string | null;
          description_en?: string | null;
          reward_points?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      fasting_records: {
        Row: {
          id: string;
          user_id: string;
          fasting_type_id: string | null;
          fasting_date: string;
          hijri_date: string | null;
          hijri_month_name: string | null;
          niat: string | null;
          status: 'planned' | 'active' | 'completed' | 'broken' | 'cancelled';
          sahur_time: string | null;
          sahur_completed: boolean;
          iftar_time: string | null;
          iftar_completed: boolean;
          notes: string | null;
          difficulty_level: number | null;
          weather_condition: string | null;
          location: string | null;
          reminder_sent: boolean;
          completion_percentage: number;
          reward_points_earned: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          fasting_type_id?: string | null;
          fasting_date: string;
          hijri_date?: string | null;
          hijri_month_name?: string | null;
          niat?: string | null;
          status?: 'planned' | 'active' | 'completed' | 'broken' | 'cancelled';
          sahur_time?: string | null;
          sahur_completed?: boolean;
          iftar_time?: string | null;
          iftar_completed?: boolean;
          notes?: string | null;
          difficulty_level?: number | null;
          weather_condition?: string | null;
          location?: string | null;
          reminder_sent?: boolean;
          completion_percentage?: number;
          reward_points_earned?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          fasting_type_id?: string | null;
          fasting_date?: string;
          hijri_date?: string | null;
          hijri_month_name?: string | null;
          niat?: string | null;
          status?: 'planned' | 'active' | 'completed' | 'broken' | 'cancelled';
          sahur_time?: string | null;
          sahur_completed?: boolean;
          iftar_time?: string | null;
          iftar_completed?: boolean;
          notes?: string | null;
          difficulty_level?: number | null;
          weather_condition?: string | null;
          location?: string | null;
          reminder_sent?: boolean;
          completion_percentage?: number;
          reward_points_earned?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      fasting_plans: {
        Row: {
          id: string;
          user_id: string;
          fasting_type_id: string | null;
          title: string;
          description: string | null;
          start_date: string;
          end_date: string | null;
          is_recurring: boolean;
          recurrence_pattern: string | null;
          recurrence_days: number[] | null;
          target_days: number | null;
          current_progress: number;
          status: 'active' | 'paused' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          fasting_type_id?: string | null;
          title: string;
          description?: string | null;
          start_date: string;
          end_date?: string | null;
          is_recurring?: boolean;
          recurrence_pattern?: string | null;
          recurrence_days?: number[] | null;
          target_days?: number | null;
          current_progress?: number;
          status?: 'active' | 'paused' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          fasting_type_id?: string | null;
          title?: string;
          description?: string | null;
          start_date?: string;
          end_date?: string | null;
          is_recurring?: boolean;
          recurrence_pattern?: string | null;
          recurrence_days?: number[] | null;
          target_days?: number | null;
          current_progress?: number;
          status?: 'active' | 'paused' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
      };
      islamic_events: {
        Row: {
          id: string;
          name_id: string;
          name_en: string;
          name_ar: string | null;
          description_id: string | null;
          description_en: string | null;
          hijri_month: number;
          hijri_day: number;
          event_type: 'religious' | 'fasting' | 'celebration' | 'historical';
          is_fasting_recommended: boolean;
          is_celebration: boolean;
          reward_multiplier: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name_id: string;
          name_en: string;
          name_ar?: string | null;
          description_id?: string | null;
          description_en?: string | null;
          hijri_month: number;
          hijri_day: number;
          event_type: 'religious' | 'fasting' | 'celebration' | 'historical';
          is_fasting_recommended?: boolean;
          is_celebration?: boolean;
          reward_multiplier?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name_id?: string;
          name_en?: string;
          name_ar?: string | null;
          description_id?: string | null;
          description_en?: string | null;
          hijri_month?: number;
          hijri_day?: number;
          event_type?: 'religious' | 'fasting' | 'celebration' | 'historical';
          is_fasting_recommended?: boolean;
          is_celebration?: boolean;
          reward_multiplier?: number;
          created_at?: string;
        };
      };
      prayer_times: {
        Row: {
          id: string;
          location_name: string;
          latitude: number;
          longitude: number;
          timezone: string;
          prayer_date: string;
          fajr_time: string;
          sunrise_time: string;
          dhuhr_time: string;
          asr_time: string;
          maghrib_time: string;
          isha_time: string;
          calculation_method: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          location_name: string;
          latitude: number;
          longitude: number;
          timezone: string;
          prayer_date: string;
          fajr_time: string;
          sunrise_time: string;
          dhuhr_time: string;
          asr_time: string;
          maghrib_time: string;
          isha_time: string;
          calculation_method: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          location_name?: string;
          latitude?: number;
          longitude?: number;
          timezone?: string;
          prayer_date?: string;
          fajr_time?: string;
          sunrise_time?: string;
          dhuhr_time?: string;
          asr_time?: string;
          maghrib_time?: string;
          isha_time?: string;
          calculation_method?: string;
          created_at?: string;
        };
      };
      user_statistics: {
        Row: {
          id: string;
          user_id: string;
          total_fasting_days: number;
          current_streak: number;
          longest_streak: number;
          ramadan_completed: number;
          sunnah_fasting_count: number;
          qadha_completed: number;
          total_reward_points: number;
          current_level: number;
          points_to_next_level: number;
          statistics_year: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_fasting_days?: number;
          current_streak?: number;
          longest_streak?: number;
          ramadan_completed?: number;
          sunnah_fasting_count?: number;
          qadha_completed?: number;
          total_reward_points?: number;
          current_level?: number;
          points_to_next_level?: number;
          statistics_year: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_fasting_days?: number;
          current_streak?: number;
          longest_streak?: number;
          ramadan_completed?: number;
          sunnah_fasting_count?: number;
          qadha_completed?: number;
          total_reward_points?: number;
          current_level?: number;
          points_to_next_level?: number;
          statistics_year?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          code: string;
          title_id: string;
          title_en: string;
          description_id: string | null;
          description_en: string | null;
          achievement_type: 'streak' | 'total_days' | 'special_days' | 'consistency';
          target_value: number;
          reward_points: number;
          icon_name: string | null;
          badge_color: string;
          rarity: 'common' | 'rare' | 'epic' | 'legendary';
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          title_id: string;
          title_en: string;
          description_id?: string | null;
          description_en?: string | null;
          achievement_type: 'streak' | 'total_days' | 'special_days' | 'consistency';
          target_value: number;
          reward_points?: number;
          icon_name?: string | null;
          badge_color?: string;
          rarity?: 'common' | 'rare' | 'epic' | 'legendary';
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          code?: string;
          title_id?: string;
          title_en?: string;
          description_id?: string | null;
          description_en?: string | null;
          achievement_type?: 'streak' | 'total_days' | 'special_days' | 'consistency';
          target_value?: number;
          reward_points?: number;
          icon_name?: string | null;
          badge_color?: string;
          rarity?: 'common' | 'rare' | 'epic' | 'legendary';
          is_active?: boolean;
          created_at?: string;
        };
      };
      user_achievements: {
        Row: {
          id: string;
          user_id: string;
          achievement_id: string;
          achieved_at: string;
          progress_value: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          achievement_id: string;
          achieved_at?: string;
          progress_value: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          achievement_id?: string;
          achieved_at?: string;
          progress_value?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}