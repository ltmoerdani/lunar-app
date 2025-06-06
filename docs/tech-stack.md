# Arsitektur Teknis Aplikasi Lunar - UI Kitten Complete Stack

## **Overview Arsitektur**

Aplikasi Lunar dibangun dengan filosofi **"Mobile-First, Cross-Platform"** menggunakan React Native untuk mencapai konsistensi experience di iOS dan Android sambil memaksimalkan development efficiency dengan UI Kitten sebagai foundation design system.

## **Frontend Architecture**

### **Core Framework:**
- **React Native 0.74.6** - Production-ready untuk performance optimal
- **Expo SDK 51.0.0** - Managed workflow untuk development speed
- **TypeScript 5.8.3** - Type safety dan better developer experience
- **Metro Bundler** - Optimized bundling untuk React Native

### **UI Framework & Design System:**

**UI Kitten Stack:**
- **@ui-kitten/components 5.3.1** - Complete component library
- **@ui-kitten/eva-icons 5.3.1** - Eva icons integration (FIXED)
- **@eva-design/eva 2.2.0** - Eva Design System tokens
- **react-native-svg 15.1.0** - Vector graphics support
- **lucide-react-native 0.475.0** - Modern icon library

**Mengapa UI Kitten:**
- **Eva Design System**: Foundation yang dibangun berdasarkan riset UX
- **TypeScript Native**: Built-in TypeScript support tanpa configuration tambahan
- **Enterprise Grade**: Mature library dengan production-ready components
- **Theming Power**: JSON-based theming yang sangat fleksible
- **Accessibility**: Built-in accessibility features yang comprehensive
- **Performance**: Bundle size yang optimal dengan tree shaking
- **Documentation**: Dokumentasi yang lengkap dengan live examples
- **Icon Integration**: Properly configured EVA Icons dengan IconRegistry

**Icon Configuration (RESOLVED):**
- **EVA Icons Pack**: Registered dengan IconRegistry di root layout
- **Lucide Icons**: Modern icon library untuk icon tambahan
- **Icon Fallback**: Graceful fallback untuk missing icons
- **Type Safety**: TypeScript support untuk icon names

### **Resolved Issues:**
- ✅ **NPM Install Errors**: Fixed package version conflicts
- ✅ **Babel Configuration**: Removed deprecated expo-router/babel plugin
- ✅ **Plugin Configuration**: Removed problematic expo-web-browser plugin  
- ✅ **UI Kitten Icons**: Properly configured IconRegistry dengan EvaIconsPack
- ✅ **Metro Bundler**: Successfully building dan serving aplikasi
- ✅ **Development Server**: Running stable di localhost:8081

### **Design System Architecture:**

**Theme Structure:**
- **Eva Light Theme** - Base theme untuk mode terang
- **Eva Dark Theme** - Base theme untuk mode gelap
- **Custom Islamic Theme** - Kustomisasi warna dan typography Islamic
- **Component Customizations** - Override komponen sesuai brand Lunar

**Color System:**
- **Primary Palette**: Teal/turquoise untuk ketenangan spiritual
- **Secondary Palette**: Gold/amber untuk kemewahan Islamic art
- **Success Palette**: Green untuk achievement dan completion
- **Warning Palette**: Orange untuk reminder dan alerts
- **Danger Palette**: Red untuk errors dan critical actions
- **Info Palette**: Blue untuk informational content

**Typography System:**
- **Heading Fonts**: Poppins Bold untuk headers yang strong
- **Body Fonts**: Poppins Regular untuk readability optimal
- **Caption Fonts**: Poppins Medium untuk subtle text
- **Arabic Support**: Fonts yang mendukung teks Arab dan Latin

### **Animation & Interaction:**

**Animation Stack:**
- **react-native-reanimated 3.10.0** - High-performance animations 60fps
- **react-native-gesture-handler 2.16.0** - Native gesture recognition
- **expo-blur 13.0.2** - Native blur effects
- **expo-linear-gradient 13.0.2** - Gradient components

**UI Components (IMPLEMENTED):**
- **FocusCard Component**: Main dashboard card dengan blur effects
- **OpportunityCarousel**: Swipeable content carousel
- **QuickActions**: Fast action buttons dengan haptic feedback
- **StatusCards**: Information cards dengan animations

### **State Management Architecture:**

**Zustand + TanStack Query Stack:**
- **zustand 4.4.7** - Lightweight global state management
- **@tanstack/react-query 5.0.0** - Server state dan caching management (UPDATED)
- **@react-native-async-storage/async-storage 2.1.0** - Local storage solution
- **immer** - Immutable state updates yang safe

**Current Implementation:**
- **Authentication State**: User login, profile, dan session management
- **Calendar State**: Hijri/Gregorian calendar data dan events (stores/calendar.ts)
- **Fasting State**: Fasting records, planning, dan progress tracking (stores/fasting.ts)
- **UI State**: Theme preferences, navigation state, modal states
- **Sync State**: Offline/online synchronization status

### **Navigation Architecture:**

**Expo Router Stack (CURRENT):**
- **expo-router 3.5.15** - File-based routing system (FIXED VERSION)
- **react-native-gesture-handler 2.16.0** - Native gesture recognition
- **react-native-screens 3.29.0** - Native screen components
- **react-native-safe-area-context 4.8.2** - Safe area handling

**Navigation Implementation:**
- **Tab Navigation**: Main app sections (Today, Calendar, Planning, Progress, More)
- **Stack Navigation**: Hierarchical screen flow dengan expo-router
- **File-based Routing**: Organized dalam app/ directory structure
- **Type Safety**: TypeScript support untuk navigation params

**Current Tab Structure:**
- **Today (index.tsx)**: Dashboard utama dengan overview
- **Calendar**: Islamic calendar dan date management
- **Planning**: Fasting planning dan scheduling
- **Progress**: Achievement tracking dan analytics
- **More**: Settings, profile, dan additional features

### **Calendar & Date Management:**

**Date Management Stack:**
- **dayjs 1.11.10** - Lightweight date manipulation library
- **expo-system-ui 3.0.4** - System UI integration
- **expo-status-bar 1.12.1** - Status bar management
- **Custom Islamic Calendar Engine** - Local Hijri calculations

**Current Implementation:**
- **Dual Calendar System**: Hijri dan Gregorian side-by-side
- **Islamic Events Integration**: Built-in Islamic holidays detection
- **Type Definitions**: Comprehensive types dalam types/calendar.ts
- **Store Management**: Calendar state dalam stores/calendar.ts

**Fasting Management Features:**
- **Fasting Records**: Individual fasting tracking
- **Planning System**: Future fasting scheduling
- **Progress Analytics**: Achievement dan statistics tracking
- **Type Safety**: Fasting types dalam types/fasting.ts

## **Backend Architecture**

### **Database Design:**

**Supabase PostgreSQL Schema:**

**Users Management:**
- **users table**: Profile data, preferences, dan authentication info
- **user_preferences table**: App settings, notification preferences
- **user_locations table**: Location history untuk prayer times

**Fasting Management:**
- **fasting_records table**: Individual fasting entries
- **fasting_plans table**: Future fasting planning
- **fasting_types table**: Categories (wajib, sunnah, qadha, nazar)
- **fasting_progress table**: Achievement tracking dan statistics

**Islamic Calendar:**
- **islamic_events table**: Islamic holidays dan important dates
- **prayer_times table**: Prayer times berdasarkan location
- **hijri_calendar table**: Hijri date conversions dan metadata

**Community Features:**
- **user_achievements table**: Badge system dan milestones
- **community_challenges table**: Group fasting challenges
- **user_stats table**: Aggregated statistics untuk analytics

### **Backend Services:**

**Supabase Complete Stack:**
- **Supabase Database**: PostgreSQL dengan real-time subscriptions
- **Supabase Auth**: Authentication dengan social login support
- **Supabase Storage**: File storage untuk user avatars dan exports
- **Supabase Edge Functions**: Custom business logic dan calculations
- **Supabase Realtime**: Live updates untuk community features

**API Integration Services:**
- **Islamic Calendar APIs**: Multiple sources untuk akurasi maksimal
- **Prayer Times APIs**: Calculation services dengan fallback options
- **Location Services**: Geolocation untuk prayer times accuracy
- **Push Notification Service**: FCM integration untuk reminders

### **Islamic Calendar Engine:**

**Multi-Source Integration:**
- **Kemenag API**: Indonesian official Islamic calendar
- **NU API**: Nahdlatul Ulama calculations
- **Muhammadiyah API**: Muhammadiyah calculations
- **MABIMS API**: Southeast Asian consensus dates
- **Custom Engine**: Local calculation fallback

**Calculation Strategy:**
- **Astronomical Calculations**: Moon phase calculations
- **Geographic Adjustments**: Location-based date adjustments
- **Consensus Algorithm**: Multi-source verification
- **Confidence Scoring**: Reliability assessment untuk each date

## **External Integrations**

### **Calendar Sync Integration:**

**External Calendar Stack:**
- **react-native-calendar-events** - iOS Calendar access
- **Google Calendar API** - Google Calendar synchronization
- **Microsoft Graph API** - Outlook calendar integration
- **CalDAV Protocol** - Generic calendar server support

**Sync Capabilities:**
- **Bidirectional Sync**: Import/export fasting events
- **Conflict Resolution**: Handle overlapping events
- **Privacy Controls**: User-controlled sync permissions
- **Offline Sync**: Queue changes untuk online sync

### **Notification System:**

**Push Notification Stack:**
- **@react-native-firebase/messaging** - FCM untuk Android
- **expo-notifications** - Expo managed notifications
- **react-native-push-notification** - Local notification scheduling
- **@react-native-async-storage/async-storage** - Notification preferences

**Notification Types:**
- **Fasting Reminders**: Pre-dawn sahur reminders
- **Breaking Fast**: Maghrib time notifications
- **Planning Alerts**: Weekly/monthly planning reminders
- **Achievement Notifications**: Milestone celebrations
- **Community Updates**: Group challenge notifications

### **Analytics & Monitoring:**

**Analytics Stack:**
- **@react-native-firebase/analytics** - User behavior tracking
- **@react-native-firebase/crashlytics** - Crash reporting dan analysis
- **react-native-flipper** - Development debugging tools
- **expo-dev-client** - Development environment tools

**Monitoring Capabilities:**
- **Performance Metrics**: App performance tracking
- **User Engagement**: Feature usage analytics
- **Error Tracking**: Crash dan error monitoring
- **Custom Events**: Islamic-specific event tracking

## **Development Tools & Quality**

### **Code Quality Stack:**

**Development Tools:**
- **ESLint + Prettier** - Code formatting dan linting
- **TypeScript 5.8.3** - Static type checking dan IntelliSense
- **Babel 7.25.2** - JavaScript transpilation (FIXED CONFIG)
- **Metro Config** - React Native bundler configuration

**Build Configuration (RESOLVED):**
- **babel.config.js**: Cleaned up configuration (removed deprecated plugins)
- **metro.config.js**: Optimized bundling configuration
- **tsconfig.json**: Strict TypeScript configuration
- **app.json**: Proper Expo configuration (removed problematic plugins)

**Development Environment:**
- **Expo CLI**: Development server dan build tools
- **Metro Bundler**: Fast refresh dan hot reloading
- **TypeScript**: Comprehensive type definitions
- **ESLint**: Code quality enforcement

### **Build & Deployment:**

**Expo Managed Workflow:**
- **Expo SDK 51.0.0** - Managed development environment
- **expo-constants 16.0.1** - Environment constants access
- **expo-linking 6.3.1** - Deep linking support
- **expo-web-browser 13.0.3** - In-app browser functionality

**Font & Asset Management:**
- **expo-font 12.0.5** - Custom font loading (FIXED VERSION)
- **expo-splash-screen 0.27.4** - Splash screen management (FIXED VERSION)
- **@expo-google-fonts/poppins 0.4.0** - Google Fonts integration
- **@expo/vector-icons 14.0.0** - Icon library integration

**Development Scripts:**
```json
{
  "dev": "EXPO_NO_TELEMETRY=1 npx expo start",
  "build:web": "npx expo export --platform web", 
  "lint": "npx expo lint"
}
```

**Environment Configuration:**
- **Development**: Expo Go untuk quick testing
- **Web Preview**: localhost:8081 untuk browser testing
- **Production Build**: EAS Build untuk app store deployment

### **Performance Optimization:**

**Performance Stack:**
- **Flipper Performance** - Performance profiling tools
- **@react-native-community/netinfo** - Network status monitoring
- **react-native-fast-image** - Optimized image loading
- **react-native-mmkv** - High-performance storage solution

**Optimization Strategies:**
- **Bundle Analysis**: Regular bundle size monitoring
- **Image Optimization**: WebP format dengan lazy loading
- **Memory Management**: Prevent memory leaks
- **Battery Optimization**: Minimize background processing
- **Network Optimization**: Request caching dan compression

## **Security & Privacy**

### **Data Security:**

**Security Stack:**
- **react-native-keychain** - Secure credential storage
- **crypto-js** - Client-side encryption utilities
- **react-native-sensitive-info** - Sensitive data protection
- **SSL Pinning** - API communication security

**Security Measures:**
- **Data Encryption**: End-to-end encryption untuk sensitive data
- **Secure Storage**: Biometric-protected local storage
- **API Security**: JWT token management dengan refresh logic
- **Privacy Controls**: Granular privacy settings untuk users

### **Authentication System:**

**Auth Implementation:**
- **Supabase Auth** - Email/password authentication
- **Google Sign-In** - Social authentication option
- **Apple Sign-In** - iOS native authentication
- **Biometric Auth** - Face ID/Touch ID support
- **Two-Factor Auth** - Optional 2FA untuk enhanced security

## **Offline Capabilities**

### **Offline-First Architecture:**

**Data Persistence:**
- **react-native-mmkv** - High-performance key-value storage
- **WatermelonDB** - Local SQLite database untuk complex data
- **@react-native-async-storage/async-storage** - Simple data storage
- **react-query offline** - Offline mutation queue

**Sync Strategy:**
- **Optimistic Updates** - Immediate UI updates
- **Background Sync** - Automatic sync saat app active
- **Conflict Resolution** - Smart merge untuk data conflicts
- **Incremental Sync** - Bandwidth-efficient data updates

## **AI & Machine Learning**

### **Pattern Recognition:**

**ML Stack:**
- **TensorFlow Lite** - On-device machine learning
- **React Native ML Kit** - Google ML services integration
- **Custom Models** - Fasting pattern recognition
- **Local Processing** - Privacy-preserving analysis

**AI Features:**
- **Smart Recommendations** - Personalized fasting suggestions
- **Pattern Analysis** - User behavior insights
- **Predictive Planning** - Automatic schedule optimization
- **Achievement Prediction** - Goal completion forecasting

## **Islamic Features Integration**

### **Islamic Calendar Engine:**

**Calculation Libraries:**
- **astronomical-algorithms** - Accurate moon calculations
- **hijri-js** - Hijri date conversion utilities
- **Custom Calculation Engine** - Local fallback calculations
- **Multi-Madhab Support** - Different calculation methods

### **Prayer Times Integration:**

**Prayer Calculation:**
- **PrayTimes.js** - Prayer times calculation library
- **Adhan.js** - Islamic prayer times dan qibla
- **Location-based Calculation** - GPS-accurate prayer times
- **Manual Adjustments** - User-customizable offsets

## **File Structure Organization**

**Project Architecture:**
```
src/
├── components/           # UI Kitten-based reusable components
│   ├── calendar/        # Calendar-specific components
│   ├── forms/           # Form components dengan validation
│   ├── islamic/         # Islamic-themed components
│   └── ui/              # Base UI components
├── screens/             # Screen components dengan UI Kitten layouts
│   ├── auth/            # Authentication flow screens
│   ├── calendar/        # Calendar view screens
│   ├── planning/        # Fasting planning screens
│   ├── progress/        # Progress tracking screens
│   └── settings/        # App settings screens
├── services/            # Business logic dan external services
│   ├── api/             # Supabase API interactions
│   ├── calendar/        # Islamic calendar services
│   ├── notifications/   # Push notification management
│   └── sync/            # Data synchronization logic
├── stores/              # Zustand state management
│   ├── auth.ts          # Authentication state
│   ├── calendar.ts      # Calendar data management
│   ├── fasting.ts       # Fasting records state
│   └── preferences.ts   # User preferences state
├── utils/               # Utility functions dan helpers
│   ├── dates/           # Date manipulation utilities
│   ├── islamic/         # Islamic calculation helpers
│   ├── validation/      # Form validation schemas
│   └── constants/       # App constants dan configurations
├── hooks/               # Custom React hooks
│   ├── useCalendar.ts   # Calendar logic hook
│   ├── useFasting.ts    # Fasting management hook
│   ├── useTheme.ts      # UI Kitten theme management
│   └── useSync.ts       # Data synchronization hook
├── types/               # TypeScript type definitions
│   ├── api.ts           # API response types
│   ├── calendar.ts      # Calendar-related types
│   ├── fasting.ts       # Fasting data types
│   └── ui.ts            # UI component prop types
├── config/              # App configuration files
│   ├── theme.ts         # UI Kitten theme customization
│   ├── navigation.ts    # Navigation configuration
│   ├── eva-theme.json   # Eva Design System customization
│   └── constants.ts     # Global app constants
└── assets/              # Static assets
    ├── icons/           # Custom icon assets
    ├── images/          # Image assets
    ├── fonts/           # Custom fonts
    └── animations/      # Lottie animation files
```

## **Performance Considerations**

### **UI Kitten Optimizations:**

**Bundle Optimization:**
- **Tree Shaking**: Import only required UI Kitten components
- **Eva Theme Optimization**: Load only necessary theme variants
- **Icon Optimization**: Use eva-icons selectively
- **Component Lazy Loading**: Dynamic imports untuk large screens

**Runtime Performance:**
- **Memoization**: React.memo untuk expensive components
- **Virtual Lists**: Efficient rendering untuk large datasets
- **Image Caching**: Smart caching strategy untuk calendar images
- **Animation Performance**: 60fps animations dengan reanimated

### **Caching Strategy:**

**Multi-Level Caching:**
- **Component Cache**: UI Kitten component instance caching
- **Data Cache**: React Query automatic caching
- **Image Cache**: Fast Image dengan LRU cache
- **Prayer Times Cache**: 6-month pre-calculated cache
- **Islamic Events Cache**: Annual event data caching

## **Testing Strategy**

### **Comprehensive Testing:**

**Unit Testing:**
- **Component Testing**: UI Kitten component behavior
- **Business Logic Testing**: Islamic calculation accuracy
- **State Management Testing**: Zustand store functionality
- **Utility Function Testing**: Date dan calendar utilities

**Integration Testing:**
- **API Integration**: Supabase service integration
- **Calendar Sync**: External calendar integration
- **Notification System**: Push notification delivery
- **Offline Functionality**: Sync behavior testing

**End-to-End Testing:**
- **User Flows**: Critical path automation
- **Cross-Platform**: iOS dan Android consistency
- **Performance Testing**: Load time dan memory usage
- **Accessibility Testing**: Screen reader compatibility

## **Monitoring & Analytics**

### **Production Monitoring:**

**Key Metrics:**
- **App Performance**: Startup time, screen load times
- **Feature Adoption**: UI Kitten component usage
- **User Engagement**: Daily/monthly active users
- **Fasting Success**: Completion rates dan streak tracking
- **Error Rates**: Crash rates dan API failures
- **Prayer Times Accuracy**: User feedback pada calculation accuracy

**Business Intelligence:**
- **User Behavior Analytics**: Feature usage patterns
- **Islamic Calendar Usage**: Most viewed dates dan events
- **Community Engagement**: Social features adoption
- **Conversion Funnel**: User onboarding success rates

Arsitektur dengan UI Kitten ini memberikan foundation yang solid untuk aplikasi Lunar dengan **enterprise-grade quality**, **excellent developer experience**, dan **optimal user experience** yang sesuai dengan kebutuhan spiritual user Muslim modern.

## **Current Implementation Status**

### **✅ Successfully Implemented & Configured:**

**Core Infrastructure:**
- ✅ **React Native 0.74.6** - Production-ready framework
- ✅ **Expo SDK 51.0.0** - Managed workflow dengan full configuration
- ✅ **TypeScript 5.8.3** - Strict typing dengan comprehensive definitions
- ✅ **Metro Bundler** - Successfully building semua components

**UI & Design System:**
- ✅ **UI Kitten 5.3.1** - Complete component library integration
- ✅ **EVA Icons Pack** - Properly registered dengan IconRegistry
- ✅ **Eva Design System** - Custom theme implementation (config/theme.ts)
- ✅ **Lucide Icons** - Modern icon library untuk additional icons

**State Management:**
- ✅ **Zustand Stores** - Calendar dan Fasting state management
- ✅ **TanStack Query 5.0.0** - Server state management
- ✅ **TypeScript Types** - Comprehensive type definitions (types/)

**Navigation & Routing:**
- ✅ **Expo Router 3.5.15** - File-based routing dengan tabs
- ✅ **Tab Navigation** - 5 main sections (Today, Calendar, Planning, Progress, More)
- ✅ **Type Safety** - Navigation dengan TypeScript support

**Development Environment:**
- ✅ **Development Server** - Running stable di localhost:8081  
- ✅ **Hot Reload** - Fast refresh untuk development efficiency
- ✅ **Bundle Configuration** - Optimized Metro dan Babel setup
- ✅ **Font Loading** - Google Fonts (Poppins) integration

### **🔧 Configuration Files Status:**

**Build Configuration:**
- ✅ **package.json** - All dependencies properly versioned
- ✅ **babel.config.js** - Cleaned configuration (removed deprecated plugins)
- ✅ **app.json** - Proper Expo configuration (removed problematic plugins)
- ✅ **tsconfig.json** - TypeScript dengan path aliases
- ✅ **metro.config.js** - Metro bundler optimization

**Application Structure:**
- ✅ **app/_layout.tsx** - Root layout dengan UI Kitten + IconRegistry
- ✅ **app/(tabs)/_layout.tsx** - Tab navigation configuration  
- ✅ **components/ui/** - Reusable UI components (FocusCard, etc.)
- ✅ **stores/** - Zustand state management
- ✅ **types/** - TypeScript type definitions
- ✅ **hooks/** - Custom React hooks
- ✅ **config/** - Theme dan configuration files

### **🚀 Ready for Next Phase:**

**Implementation Priority:**
1. **Backend Integration** - Connect ke Supabase untuk data persistence
2. **Islamic Calendar Engine** - Implement Hijri calendar calculations
3. **Prayer Times Service** - Location-based prayer times calculation
4. **Notification System** - Push notifications untuk reminders
5. **Offline Functionality** - Data persistence dan sync capabilities

**Development Advantages:**
- **Solid Foundation** - All core infrastructure properly configured
- **Type Safety** - Comprehensive TypeScript implementation
- **Modern Architecture** - Best practices dengan UI Kitten + Expo Router
- **Performance Optimized** - Bundle optimization dan caching strategy
- **Developer Experience** - Hot reload, debugging tools, dan error handling

Aplikasi Lunar sekarang memiliki **foundation yang solid** dan **siap untuk development** fitur-fitur utama dengan confidence tinggi pada architecture dan configuration yang telah tested dan proven.