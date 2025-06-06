import { create } from 'zustand';
import { CalendarDay, IslamicDate, GregorianDate, CalendarPreferences } from '@/types/calendar';
import dayjs from 'dayjs';

interface CalendarState {
  currentDate: string;
  selectedDate: string;
  viewMode: 'month' | 'week' | 'day';
  calendarDays: CalendarDay[];
  preferences: CalendarPreferences;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentDate: (date: string) => void;
  setSelectedDate: (date: string) => void;
  setViewMode: (mode: 'month' | 'week' | 'day') => void;
  loadCalendarDays: (startDate: string, endDate: string) => void;
  updatePreferences: (preferences: Partial<CalendarPreferences>) => void;
  convertToHijri: (gregorianDate: string) => IslamicDate;
  convertToGregorian: (islamicDate: IslamicDate) => GregorianDate;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: dayjs().format('YYYY-MM-DD'),
  selectedDate: dayjs().format('YYYY-MM-DD'),
  viewMode: 'month',
  calendarDays: [],
  preferences: {
    primaryCalendar: 'gregorian',
    madhab: 'shafii',
    calculationMethod: 'MWL',
    location: {
      latitude: -6.2088,
      longitude: 106.8456,
      city: 'Jakarta',
      country: 'Indonesia',
      timezone: 'Asia/Jakarta',
    },
    language: 'id',
  },
  isLoading: false,
  error: null,

  setCurrentDate: (date) => set({ currentDate: date }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setViewMode: (mode) => set({ viewMode: mode }),

  updatePreferences: (newPreferences) => {
    set((state) => ({
      preferences: { ...state.preferences, ...newPreferences },
    }));
  },

  convertToHijri: (gregorianDate) => {
    // Mock conversion - in real app, use proper hijri conversion library
    const date = dayjs(gregorianDate);
    return {
      hijriYear: 1446,
      hijriMonth: 3,
      hijriDay: date.date(),
      monthName: 'ربيع الأول',
      dayName: 'الاثنين',
      formattedDate: `${date.date()} ربيع الأول 1446`,
    };
  },

  convertToGregorian: (islamicDate) => {
    // Mock conversion
    return {
      year: 2024,
      month: 11,
      day: islamicDate.hijriDay,
      monthName: 'November',
      dayName: 'Monday',
      formattedDate: `${islamicDate.hijriDay} November 2024`,
    };
  },

  loadCalendarDays: (startDate, endDate) => {
    set({ isLoading: true });
    
    // Mock calendar generation
    const days: CalendarDay[] = [];
    let current = dayjs(startDate);
    const end = dayjs(endDate);
    
    while (current.isBefore(end) || current.isSame(end)) {
      const dateStr = current.format('YYYY-MM-DD');
      const day: CalendarDay = {
        gregorianDate: {
          year: current.year(),
          month: current.month() + 1,
          day: current.date(),
          monthName: current.format('MMMM'),
          dayName: current.format('dddd'),
          formattedDate: current.format('DD MMMM YYYY'),
        },
        islamicDate: get().convertToHijri(dateStr),
        isToday: current.isSame(dayjs(), 'day'),
        isWeekend: current.day() === 0 || current.day() === 6,
        fastingRecords: [],
        fastingPlans: [],
        islamicEvents: [],
      };
      
      days.push(day);
      current = current.add(1, 'day');
    }
    
    set({ calendarDays: days, isLoading: false });
  },
}));