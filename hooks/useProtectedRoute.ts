import { useEffect } from 'react';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { useAuthStore } from '@/stores/auth';

/**
 * Hook to manage navigation guard based on authentication state
 * Follows pattern: Splash → Auth → Tabs
 */
export function useProtectedRoute() {
  const { isAuthenticated, isLoading, initialize } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  // Initialize auth on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Wait for navigation state to be ready
    if (!navigationState?.key || navigationState.stale) {
      return;
    }
    
    // Skip navigation while auth is loading
    if (isLoading) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (isAuthenticated) {
      // User is authenticated, redirect to main app if in auth pages
      if (inAuthGroup || segments.length === 0) {
        router.replace('/(tabs)');
      }
    } else {
      // User is not authenticated, redirect to login if not in auth pages
      if (!inAuthGroup || segments.length === 0) {
        router.replace('/(auth)/login');
      }
    }
  }, [isAuthenticated, segments, isLoading, router, navigationState?.key, navigationState?.stale]);
}