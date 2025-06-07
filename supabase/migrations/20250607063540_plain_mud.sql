/*
  # Islamic Calendar and Events Tables

  1. New Tables
    - `islamic_events` - Important Islamic dates and events
    - `prayer_times` - Prayer times by location and date
    
  2. Security
    - Public read access for all users
*/

-- Create Islamic events table
CREATE TABLE IF NOT EXISTS islamic_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Event Details
  name_id text NOT NULL,
  name_en text NOT NULL,
  name_ar text,
  description_id text,
  description_en text,
  
  -- Date Information
  hijri_month integer NOT NULL CHECK (hijri_month BETWEEN 1 AND 12),
  hijri_day integer NOT NULL CHECK (hijri_day BETWEEN 1 AND 30),
  
  -- Event Attributes
  event_type text NOT NULL CHECK (event_type IN ('religious', 'fasting', 'celebration', 'historical')),
  is_fasting_recommended boolean DEFAULT false,
  is_celebration boolean DEFAULT false,
  reward_multiplier numeric DEFAULT 1.0,
  
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create prayer times table
CREATE TABLE IF NOT EXISTS prayer_times (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Location
  location_name text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  timezone text NOT NULL,
  
  -- Date
  prayer_date date NOT NULL,
  
  -- Prayer Times
  fajr_time time NOT NULL,
  sunrise_time time NOT NULL,
  dhuhr_time time NOT NULL,
  asr_time time NOT NULL,
  maghrib_time time NOT NULL,
  isha_time time NOT NULL,
  
  -- Calculation Method
  calculation_method text NOT NULL,
  
  created_at timestamptz DEFAULT now() NOT NULL,
  
  UNIQUE(location_name, prayer_date, calculation_method)
);

-- Insert major Islamic events
INSERT INTO islamic_events (name_id, name_en, name_ar, hijri_month, hijri_day, event_type, is_fasting_recommended) VALUES
('Maulid Nabi', 'Prophet''s Birthday', 'المولد النبوي', 3, 12, 'religious', false),
('Isra Miraj', 'Isra and Miraj', 'الإسراء والمعراج', 7, 27, 'religious', true),
('Nuzulul Quran', 'Revelation of Quran', 'نزول القرآن', 9, 17, 'religious', true),
('Lailatul Qadr', 'Night of Power', 'ليلة القدر', 9, 27, 'religious', false),
('Idul Fitri', 'Eid al-Fitr', 'عيد الفطر', 10, 1, 'celebration', false),
('Hari Arafah', 'Day of Arafah', 'يوم عرفة', 12, 9, 'religious', true),
('Idul Adha', 'Eid al-Adha', 'عيد الأضحى', 12, 10, 'celebration', false)
ON CONFLICT DO NOTHING;

-- Public read policies
CREATE POLICY "Public can read islamic events" ON islamic_events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Public can read prayer times" ON prayer_times FOR SELECT TO authenticated USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_prayer_times_location_date ON prayer_times(location_name, prayer_date);
CREATE INDEX IF NOT EXISTS idx_islamic_events_date ON islamic_events(hijri_month, hijri_day);