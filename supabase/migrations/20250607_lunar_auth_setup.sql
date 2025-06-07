-- Migration untuk setup tabel-tabel utama Lunar App
-- Menambahkan tabel profiles, user_preferences, dan fasting_records

-- 1. Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female')),
  location TEXT,
  timezone TEXT DEFAULT 'Asia/Jakarta',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  
  -- Theme & UI Preferences
  theme_mode TEXT DEFAULT 'light' CHECK (theme_mode IN ('light', 'dark', 'system')),
  language TEXT DEFAULT 'id' CHECK (language IN ('id', 'en', 'ar')),
  
  -- Islamic Calculation Preferences
  calculation_method TEXT DEFAULT 'kemenag' CHECK (calculation_method IN ('kemenag', 'nu', 'muhammadiyah', 'mabims')),
  madhab TEXT DEFAULT 'shafi' CHECK (madhab IN ('hanafi', 'shafi', 'maliki', 'hanbali')),
  
  -- Notification Preferences
  sahur_reminder BOOLEAN DEFAULT true,
  sahur_reminder_minutes INTEGER DEFAULT 30,
  iftar_reminder BOOLEAN DEFAULT true,
  iftar_reminder_minutes INTEGER DEFAULT 15,
  weekly_planning_reminder BOOLEAN DEFAULT true,
  achievement_notifications BOOLEAN DEFAULT true,
  
  -- Privacy Settings
  profile_visibility TEXT DEFAULT 'private' CHECK (profile_visibility IN ('public', 'friends', 'private')),
  share_achievements BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  UNIQUE(user_id)
);

-- 3. Fasting Types Table (Reference Data)
CREATE TABLE IF NOT EXISTS fasting_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name_id TEXT NOT NULL, -- Nama dalam Bahasa Indonesia
  name_en TEXT NOT NULL, -- Nama dalam Bahasa Inggris
  name_ar TEXT, -- Nama dalam Bahasa Arab
  category TEXT NOT NULL CHECK (category IN ('wajib', 'sunnah', 'qadha', 'nazar', 'kaffarah')),
  description_id TEXT,
  description_en TEXT,
  reward_points INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Fasting Records Table
CREATE TABLE IF NOT EXISTS fasting_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  fasting_type_id UUID REFERENCES fasting_types ON DELETE SET NULL,
  
  -- Date Information
  fasting_date DATE NOT NULL,
  hijri_date TEXT, -- Format: "1445-09-15"
  hijri_month_name TEXT,
  
  -- Fasting Details
  niat TEXT, -- Niat puasa dalam bahasa Arab/Indonesia
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'active', 'completed', 'broken', 'cancelled')),
  
  -- Timing
  sahur_time TIMESTAMP WITH TIME ZONE,
  sahur_completed BOOLEAN DEFAULT false,
  iftar_time TIMESTAMP WITH TIME ZONE,
  iftar_completed BOOLEAN DEFAULT false,
  
  -- Additional Information
  notes TEXT,
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
  weather_condition TEXT,
  location TEXT,
  
  -- Tracking
  reminder_sent BOOLEAN DEFAULT false,
  completion_percentage INTEGER DEFAULT 0,
  reward_points_earned INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  UNIQUE(user_id, fasting_date)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE fasting_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies untuk profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies untuk user_preferences
CREATE POLICY "Users can manage own preferences" ON user_preferences FOR ALL USING (auth.uid() = user_id);

-- RLS Policies untuk fasting_records
CREATE POLICY "Users can manage own fasting records" ON fasting_records FOR ALL USING (auth.uid() = user_id);

-- Public read untuk reference tables
CREATE POLICY "Public can read fasting types" ON fasting_types FOR SELECT TO authenticated USING (true);

-- Function untuk auto-create profile saat user register
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

-- Trigger untuk auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function untuk update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers untuk auto-update timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_preferences_updated_at BEFORE UPDATE ON user_preferences FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_fasting_records_updated_at BEFORE UPDATE ON fasting_records FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

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

-- Indexes untuk performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_fasting_records_user_date ON fasting_records(user_id, fasting_date);
CREATE INDEX IF NOT EXISTS idx_fasting_records_status ON fasting_records(status);
CREATE INDEX IF NOT EXISTS idx_fasting_types_code ON fasting_types(code);
CREATE INDEX IF NOT EXISTS idx_fasting_types_category ON fasting_types(category);
