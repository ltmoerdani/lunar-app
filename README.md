# Lunar Islamic Fasting App

A comprehensive React Native application for Islamic fasting management with Supabase backend.

## Features

### Authentication
- Email/password authentication with Supabase Auth
- User registration with profile creation
- Password recovery functionality
- Automatic profile and preferences setup

### Fasting Management
- Multiple fasting types (Ramadan, Sunnah, Qadha, Nazar)
- Fasting planning and scheduling
- Progress tracking and statistics
- Achievement system with badges

### Islamic Calendar
- Hijri calendar integration
- Islamic events and important dates
- Prayer times by location
- Dual calendar system (Gregorian + Hijri)

### User Experience
- Personalized preferences
- Multi-language support (Indonesian, English, Arabic)
- Different madhab calculations
- Notification system for reminders

## Database Schema

The application uses Supabase PostgreSQL with the following main tables:

### Core Tables
- `profiles` - User profile information
- `user_preferences` - App settings and Islamic preferences
- `fasting_types` - Reference table for fasting categories
- `fasting_records` - Individual fasting entries
- `fasting_plans` - Future fasting schedules

### Islamic Features
- `islamic_events` - Important Islamic dates
- `prayer_times` - Location-based prayer schedules
- `achievements` - Badge system
- `user_achievements` - User's earned badges
- `user_statistics` - Progress tracking

## Security

- Row Level Security (RLS) enabled on all user tables
- Automatic profile creation on user registration
- Secure data access policies
- User data isolation

## Setup Instructions

1. **Database Setup**
   ```bash
   # Run migrations in Supabase
   # Execute files in supabase/migrations/ in order
   ```

2. **Environment Variables**
   ```bash
   # Update .env with your Supabase credentials
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## API Usage

### Authentication
```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
  options: {
    data: { full_name: 'User Name' }
  }
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});
```

### Database Operations
```typescript
// Create fasting record
const record = await createFastingRecord({
  user_id: userId,
  fasting_type_id: typeId,
  fasting_date: '2024-01-15',
  niat: 'Nawaitu shauma...',
  status: 'planned'
});

// Get user statistics
const stats = await getUserStatistics(userId, 2024);
```

## Key Features Implementation

### Automatic Profile Creation
- Triggers automatically create user profile and preferences on registration
- Ensures data consistency and proper initialization

### Islamic Calendar Integration
- Support for multiple calculation methods
- Hijri date conversion and display
- Islamic events and special days

### Achievement System
- Automatic badge awarding based on fasting patterns
- Progress tracking and milestone celebrations
- Gamification elements for user engagement

### Multi-language Support
- Indonesian, English, and Arabic language support
- Islamic terminology in appropriate languages
- Cultural sensitivity in UI/UX design

## Development

### Database Hooks
Use the provided custom hooks for database operations:

```typescript
// Get user profile
const { data: profile } = useUserProfile();

// Create fasting record
const createRecord = useCreateFastingRecord();

// Get fasting types
const { data: fastingTypes } = useFastingTypes();
```

### Type Safety
All database operations are fully typed with TypeScript interfaces generated from the Supabase schema.

## Contributing

1. Follow the existing code structure
2. Maintain type safety with TypeScript
3. Use the provided database hooks
4. Follow Islamic cultural guidelines
5. Test authentication and database operations

## License

This project is designed for Islamic community use with respect for Islamic values and practices.