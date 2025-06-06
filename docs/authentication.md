# Authentication Flow - Lunar App

## Overview
Aplikasi Lunar sekarang menggunakan authentication flow yang proper dengan state management menggunakan Zustand dan persistent storage. **Navigation error "Attempted to navigate before mounting Root Layout" telah berhasil diperbaiki.**

## Flow Architecture

```
Splash Screen → Auth Layout → Login/Register/Forgot Password → Main App (Tabs)
```

## ✅ Fixed Issues

### Navigation Error Resolution
- **Problem**: "Attempted to navigate before mounting the Root Layout component"
- **Solution**: Implemented proper timing controls and navigation state validation
- **Implementation**: 
  - Added `appReady` state to control when navigation starts
  - Used `requestAnimationFrame` for proper timing
  - Added navigation state checks with `useRootNavigationState`
  - Separated navigation logic into `RootLayoutNavigator` component

### Key Improvements
1. **Timing Control**: Navigation only starts after app is fully mounted
2. **State Validation**: Checks navigation state before attempting routing
3. **Error Handling**: Graceful fallback with retry mechanisms
4. **Performance**: Uses `requestAnimationFrame` for optimal timing

## Authentication States

### 1. New Users
```
Splash → Register → Main App
```

### 2. Returning Users  
```
Splash → Login → Main App
```

### 3. Password Recovery
```
Login → Forgot Password → Login → Main App
```

## Key Components

### 1. Authentication Store (`stores/auth.ts`)
- **State Management**: Zustand dengan TypeScript
- **Persistence**: AsyncStorage untuk menyimpan session
- **Mock Authentication**: Data user test untuk development
- **Actions**: Login, Register, Reset Password, Logout

### 2. Navigation Guard (`hooks/useProtectedRoute.ts`)
- **Route Protection**: Otomatis redirect berdasarkan auth status
- **Segmen Detection**: Mendeteksi user berada di auth atau tabs group
- **Seamless Navigation**: Tidak perlu manual navigation di setiap screen

### 3. Root Layout (`app/_layout.tsx`)
- **Authentication Integration**: Menggunakan useProtectedRoute hook
- **Splash Control**: Custom splash screen sebelum auth check
- **Provider Setup**: UI Kitten, Tanstack Query, Gesture Handler

## Test Credentials

Untuk testing authentication flow, gunakan credentials berikut:

### User 1
- **Email**: `user@lunar.app`
- **Password**: `password123`

### User 2 (Admin)
- **Email**: `admin@lunar.app`  
- **Password**: `admin123`

## Screen Features

### Login Screen
- ✅ **Auto-filled credentials** untuk testing
- ✅ **Real-time validation** untuk email dan password
- ✅ **Error handling** dengan UI feedback
- ✅ **Test credentials display** untuk development
- ✅ **Loading states** saat proses login
- ✅ **Social login placeholders** (Google, Apple)

### Register Screen  
- ✅ **Multi-step registration** dengan progress indicator
- ✅ **Form validation** real-time
- ✅ **Madhab selection** untuk personalisasi
- ✅ **Terms acceptance** checkbox
- ✅ **Integrated dengan auth store**

### Forgot Password Screen
- ✅ **Email validation** untuk reset password  
- ✅ **Step-by-step flow** dengan visual feedback
- ✅ **Resend functionality** dengan cooldown timer
- ✅ **Mock email sending** untuk development

## State Persistence

Authentication state di-persist menggunakan AsyncStorage dengan partializing untuk optimasi:

```typescript
// Hanya data penting yang di-persist
partialize: (state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  hasCompletedOnboarding: state.hasCompletedOnboarding,
})
```

## Navigation Flow Logic

```typescript
if (isAuthenticated) {
  // User sudah login → redirect ke tabs jika masih di auth
  if (inAuthGroup) {
    router.replace('/(tabs)');
  }
} else {
  // User belum login → redirect ke login jika tidak di auth
  if (!inAuthGroup) {
    router.replace('/(auth)/login');
  }
}
```

## Best Practices Implemented

1. **Single Responsibility**: Setiap screen fokus pada tugasnya
2. **State Management**: Zustand untuk global auth state  
3. **Type Safety**: TypeScript interfaces untuk User dan Form data
4. **Error Handling**: Proper error display dan user feedback
5. **Loading States**: UI feedback saat async operations
6. **Validation**: Real-time form validation dengan error messages
7. **Accessibility**: Proper labeling dan keyboard navigation
8. **Security**: Password visibility toggle, secure text entry

## Next Steps

1. **Real API Integration**: Ganti mock authentication dengan real backend
2. **Token Management**: Implement JWT token refresh logic
3. **Biometric Auth**: Face ID/Touch ID integration
4. **Social Login**: Implement Google/Apple sign-in
5. **Email Verification**: Real email verification flow
6. **Profile Management**: User profile editing dan preferences

## Testing

Untuk menguji authentication flow:

1. **Install dependencies**: `npm install`
2. **Start development server**: `npm run dev`  
3. **Test login** dengan credentials yang disediakan
4. **Verify navigation** antar screens
5. **Test persistence** dengan restart aplikasi

Authentication flow sekarang sudah robust dan siap untuk development lebih lanjut!
