export interface IslamicDate {
  hijriYear: number;
  hijriMonth: number;
  hijriDay: number;
  monthName: string;
  dayName: string;
  formattedDate: string;
}

export interface GregorianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  formattedDate: string;
}

export interface CalendarDay {
  gregorianDate: GregorianDate;
  islamicDate: IslamicDate;
  isToday: boolean;
  isWeekend: boolean;
  fastingRecords: FastingRecord[];
  fastingPlans: FastingPlan[];
  islamicEvents: IslamicEvent[];
  prayerTimes?: PrayerTimes;
}

export interface IslamicEvent {
  id: string;
  name: string;
  description: string;
  type: 'holiday' | 'special_day' | 'recommended_fast' | 'prohibited_fast';
  priority: Priority;
  source: string;
  isVerified: boolean;
}

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  imsak: string;
  midnight: string;
}

export interface CalendarPreferences {
  primaryCalendar: 'gregorian' | 'hijri';
  madhab: 'hanafi' | 'shafii' | 'maliki' | 'hanbali';
  calculationMethod: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    timezone: string;
  };
  language: 'id' | 'ar' | 'en';
}