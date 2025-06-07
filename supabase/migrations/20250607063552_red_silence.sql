/*
  # User Progress and Achievements Tables

  1. New Tables
    - `user_statistics` - User fasting statistics and progress
    - `achievements` - Available achievements and badges
    - `user_achievements` - User's earned achievements
    
  2. Security
    - Enable RLS on user-specific tables
    - Public read for achievements reference
*/

-- Create user statistics table
CREATE TABLE IF NOT EXISTS user_statistics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  
  -- Fasting Statistics
  total_fasting_days integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  
  -- Monthly/Yearly Breakdown
  ramadan_completed integer DEFAULT 0,
  sunnah_fasting_count integer DEFAULT 0,
  qadha_completed integer DEFAULT 0,
  
  -- Points & Rewards
  total_reward_points integer DEFAULT 0,
  current_level integer DEFAULT 1,
  points_to_next_level integer DEFAULT 100,
  
  -- Yearly Progress
  statistics_year integer NOT NULL,
  
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  
  UNIQUE(user_id, statistics_year)
);

-- Create achievements reference table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Achievement Details
  code text UNIQUE NOT NULL,
  title_id text NOT NULL,
  title_en text NOT NULL,
  description_id text,
  description_en text,
  
  -- Achievement Criteria
  achievement_type text NOT NULL CHECK (achievement_type IN ('streak', 'total_days', 'special_days', 'consistency')),
  target_value integer NOT NULL,
  reward_points integer DEFAULT 0,
  
  -- Display
  icon_name text,
  badge_color text DEFAULT '#52C4A0',
  rarity text DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create user achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  achievement_id uuid REFERENCES achievements ON DELETE CASCADE NOT NULL,
  
  achieved_at timestamptz DEFAULT now() NOT NULL,
  progress_value integer NOT NULL,
  
  UNIQUE(user_id, achievement_id)
);

-- Insert sample achievements
INSERT INTO achievements (code, title_id, title_en, achievement_type, target_value, reward_points, rarity) VALUES
('first_fast', 'Puasa Pertama', 'First Fast', 'total_days', 1, 10, 'common'),
('week_streak', 'Konsisten Seminggu', 'One Week Streak', 'streak', 7, 50, 'common'),
('month_streak', 'Konsisten Sebulan', 'One Month Streak', 'streak', 30, 200, 'rare'),
('ramadan_complete', 'Penakluk Ramadan', 'Ramadan Conqueror', 'special_days', 30, 500, 'epic'),
('senin_kamis_master', 'Master Senin Kamis', 'Monday Thursday Master', 'consistency', 50, 300, 'rare')
ON CONFLICT (code) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE user_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Policies for user_statistics
CREATE POLICY "Users can view own statistics" ON user_statistics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own statistics" ON user_statistics FOR ALL USING (auth.uid() = user_id);

-- Policies for user_achievements
CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert user achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read for achievements reference
CREATE POLICY "Public can read achievements" ON achievements FOR SELECT TO authenticated USING (true);

-- Add update trigger
CREATE TRIGGER update_user_statistics_updated_at 
  BEFORE UPDATE ON user_statistics 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_statistics_user_year ON user_statistics(user_id, statistics_year);