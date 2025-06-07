import { useEffect, useRef } from 'react';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { useAuthStore } from '@/stores/auth';

/**
 * Hook untuk mengelola navigation guard berdasarkan authentication state
 * Mengikuti pattern: Splash → Auth → Tabs
 */
export function useProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Pastikan navigation state sudah ready dan router sudah mounted
    if (!navigationState?.key || navigationState.stale) {
      return;
    }
    
    // Skip navigation saat masih loading auth state
    if (isLoading) {
      return;
    }

    // Prevent multiple navigations
    if (hasNavigated.current) {
      return;
    }

    const performNavigation = () => {
      try {
        const inAuthGroup = segments[0] === '(auth)';

        if (isAuthenticated) {
          // User sudah login, pastikan tidak di auth pages
          if (inAuthGroup || segments.length === 0) {
            hasNavigated.current = true;
            router.replace('/(tabs)');
          }
        } else if (!inAuthGroup || segments.length === 0) {
          // User belum login, pastikan di auth pages
          hasNavigated.current = true;
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.warn('Navigation error in useProtectedRoute:', error);
        hasNavigated.current = false; // Reset flag on error
      }
    };

    // Use requestAnimationFrame to ensure navigation happens after render
    const rafId = requestAnimationFrame(() => {
      performNavigation();
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isAuthenticated, segments, isLoading, router, navigationState?.key, navigationState?.stale]);

  // Reset navigation flag when auth state changes
  useEffect(() => {
    hasNavigated.current = false;
  }, [isAuthenticated]);
}
