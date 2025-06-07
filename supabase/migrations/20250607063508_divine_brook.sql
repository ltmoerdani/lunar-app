/*
  # Authentication and User Management Tables

  1. New Tables
    - `profiles` - User profile information extending auth.users
    - `user_preferences` - User app preferences and Islamic settings
    
  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    
  3. Functions & Triggers
    - Auto-create profile on user registration
    - Auto-update timestamps
*/

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text NOT NULL,
  avatar_url text,
  phone text,
  date_of_birth date,
  gender text CHECK (gender IN ('male', 'female')),
  location text,
  timezone text DEFAULT 'Asia/Jakarta',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create user preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  
  -- Theme & UI Preferences
  theme_mode text DEFAULT 'light' CHECK (theme_mode IN ('light', 'dark', 'system')),
  language text DEFAULT 'id' CHECK (language IN ('id', 'en', 'ar')),
  
  -- Islamic Calculation Preferences
  calculation_method text DEFAULT 'kemenag' CHECK (calculation_method IN ('kemenag', 'nu', 'muhammadiyah', 'mabims')),
  madhab text DEFAULT 'shafi' CHECK (madhab IN ('hanafi', 'shafi', 'maliki', 'hanbali')),
  
  -- Notification Preferences
  sahur_reminder boolean DEFAULT true,
  sahur_reminder_minutes integer DEFAULT 30,
  iftar_reminder boolean DEFAULT true,
  iftar_reminder_minutes integer DEFAULT 15,
  weekly_planning_reminder boolean DEFAULT true,
  achievement_notifications boolean DEFAULT true,
  
  -- Privacy Settings
  profile_visibility text DEFAULT 'private' CHECK (profile_visibility IN ('public', 'friends', 'private')),
  share_achievements boolean DEFAULT false,
  
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Policies for user_preferences
CREATE POLICY "Users can manage own preferences" ON user_preferences FOR ALL USING (auth.uid() = user_id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'));
  
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for auto-updating timestamps
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_preferences_updated_at 
  BEFORE UPDATE ON user_preferences 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();