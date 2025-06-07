/*
  # Fasting Management Tables

  1. New Tables
    - `fasting_types` - Reference table for different types of fasting
    - `fasting_records` - Individual fasting records per user
    - `fasting_plans` - Future fasting plans and goals
    
  2. Security
    - Enable RLS on user-specific tables
    - Public read access for reference tables
*/

-- Create fasting types reference table
CREATE TABLE IF NOT EXISTS fasting_types (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text UNIQUE NOT NULL,
  name_id text NOT NULL, -- Indonesian name
  name_en text NOT NULL, -- English name
  name_ar text, -- Arabic name
  category text NOT NULL CHECK (category IN ('wajib', 'sunnah', 'qadha', 'nazar', 'kaffarah')),
  description_id text,
  description_en text,
  reward_points integer DEFAULT 1,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create fasting records table
CREATE TABLE IF NOT EXISTS fasting_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  fasting_type_id uuid REFERENCES fasting_types ON DELETE SET NULL,
  
  -- Date Information
  fasting_date date NOT NULL,
  hijri_date text, -- Format: "1445-09-15"
  hijri_month_name text,
  
  -- Fasting Details
  niat text, -- Intention in Arabic/Indonesian
  status text DEFAULT 'planned' CHECK (status IN ('planned', 'active', 'completed', 'broken', 'cancelled')),
  
  -- Timing
  sahur_time timestamptz,
  sahur_completed boolean DEFAULT false,
  iftar_time timestamptz,
  iftar_completed boolean DEFAULT false,
  
  -- Additional Information
  notes text,
  difficulty_level integer CHECK (difficulty_level BETWEEN 1 AND 5),
  weather_condition text,
  location text,
  
  -- Tracking
  reminder_sent boolean DEFAULT false,
  completion_percentage integer DEFAULT 0,
  reward_points_earned integer DEFAULT 0,
  
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  
  UNIQUE(user_id, fasting_date)
);

-- Create fasting plans table
CREATE TABLE IF NOT EXISTS fasting_plans (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  fasting_type_id uuid REFERENCES fasting_types ON DELETE SET NULL,
  
  -- Plan Details
  title text NOT NULL,
  description text,
  
  -- Date Range
  start_date date NOT NULL,
  end_date date,
  
  -- Recurrence Pattern
  is_recurring boolean DEFAULT false,
  recurrence_pattern text, -- 'weekly', 'monthly', 'custom'
  recurrence_days integer[], -- [1,4] for Monday-Thursday
  
  -- Goal Setting
  target_days integer,
  current_progress integer DEFAULT 0,
  
  -- Status
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled')),
  
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Insert default fasting types
INSERT INTO fasting_types (code, name_id, name_en, name_ar, category, reward_points) VALUES
('ramadan', 'Puasa Ramadan', 'Ramadan Fasting', 'صوم رمضان', 'wajib', 10),
('qadha_ramadan', 'Qadha Ramadan', 'Qadha Ramadan', 'قضاء رمضان', 'qadha', 10),
('senin_kamis', 'Puasa Senin Kamis', 'Monday Thursday Fasting', 'صوم الاثنين والخميس', 'sunnah', 5),
('ayyamul_bidh', 'Puasa Ayyamul Bidh', 'White Days Fasting', 'صوم الأيام البيض', 'sunnah', 5),
('asyura', 'Puasa Asyura', 'Ashura Fasting', 'صوم عاشوراء', 'sunnah', 8),
('arafah', 'Puasa Arafah', 'Arafah Fasting', 'صوم عرفة', 'sunnah', 10),
('syawal', 'Puasa Syawal', 'Shawwal Fasting', 'صوم شوال', 'sunnah', 7),
('nazar', 'Puasa Nazar', 'Vow Fasting', 'صوم النذر', 'nazar', 8)
ON CONFLICT (code) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE fasting_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE fasting_plans ENABLE ROW LEVEL SECURITY;

-- Policies for fasting_records
CREATE POLICY "Users can manage own fasting records" ON fasting_records FOR ALL USING (auth.uid() = user_id);

-- Policies for fasting_plans
CREATE POLICY "Users can manage own fasting plans" ON fasting_plans FOR ALL USING (auth.uid() = user_id);

-- Public read for reference tables
CREATE POLICY "Public can read fasting types" ON fasting_types FOR SELECT TO authenticated USING (true);

-- Add update triggers
CREATE TRIGGER update_fasting_records_updated_at 
  BEFORE UPDATE ON fasting_records 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_fasting_plans_updated_at 
  BEFORE UPDATE ON fasting_plans 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_fasting_records_user_date ON fasting_records(user_id, fasting_date);
CREATE INDEX IF NOT EXISTS idx_fasting_records_status ON fasting_records(status);
CREATE INDEX IF NOT EXISTS idx_fasting_plans_user_id ON fasting_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_fasting_plans_dates ON fasting_plans(start_date, end_date);