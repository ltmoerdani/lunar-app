import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { AuthUser, AuthState, LoginFormData, RegisterFormData, ForgotPasswordFormData, AuthError } from '@/types/auth';

interface AuthStore extends AuthState {
  // Actions
  signIn: (data: LoginFormData) => Promise<{ success: boolean; error?: AuthError }>;
  signUp: (data: RegisterFormData) => Promise<{ success: boolean; error?: AuthError }>;
  signOut: () => Promise<void>;
  resetPassword: (data: ForgotPasswordFormData) => Promise<{ success: boolean; error?: AuthError }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: AuthError }>;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isLoading: true,
      isAuthenticated: false,

      // Initialize auth state
      initialize: async () => {
        try {
          set({ isLoading: true });
          
          // Get initial session
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Error getting session:', error);
            set({ user: null, isAuthenticated: false, isLoading: false });
            return;
          }

          if (session?.user) {
            set({ 
              user: session.user as AuthUser, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }

          // Listen for auth changes
          supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
              set({ 
                user: session.user as AuthUser, 
                isAuthenticated: true, 
                isLoading: false 
              });
            } else {
              set({ user: null, isAuthenticated: false, isLoading: false });
            }
          });
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      // Sign in with email and password
      signIn: async (data: LoginFormData) => {
        try {
          set({ isLoading: true });
          
          const { data: authData, error } = await supabase.auth.signInWithPassword({
            email: data.email.trim().toLowerCase(),
            password: data.password,
          });

          if (error) {
            set({ isLoading: false });
            return { 
              success: false, 
              error: { 
                message: error.message,
                field: error.message.includes('email') ? 'email' : 'password'
              } 
            };
          }

          if (authData.user) {
            set({ 
              user: authData.user as AuthUser, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return { success: true };
          }

          set({ isLoading: false });
          return { success: false, error: { message: 'Login failed' } };
        } catch (error) {
          console.error('Sign in error:', error);
          set({ isLoading: false });
          return { 
            success: false, 
            error: { message: 'An unexpected error occurred' } 
          };
        }
      },

      // Sign up with email and password
      signUp: async (data: RegisterFormData) => {
        try {
          set({ isLoading: true });

          const { data: authData, error } = await supabase.auth.signUp({
            email: data.email.trim().toLowerCase(),
            password: data.password,
            options: {
              data: {
                full_name: data.fullName.trim(),
              },
            },
          });

          if (error) {
            set({ isLoading: false });
            return { 
              success: false, 
              error: { 
                message: error.message,
                field: error.message.includes('email') ? 'email' : 'password'
              } 
            };
          }

          set({ isLoading: false });
          
          // Check if email confirmation is required
          if (authData.user && !authData.session) {
            return { 
              success: true, 
              error: { 
                message: 'Please check your email to confirm your account before signing in.' 
              } 
            };
          }

          return { success: true };
        } catch (error) {
          console.error('Sign up error:', error);
          set({ isLoading: false });
          return { 
            success: false, 
            error: { message: 'An unexpected error occurred' } 
          };
        }
      },

      // Sign out
      signOut: async () => {
        try {
          set({ isLoading: true });
          await supabase.auth.signOut();
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          console.error('Sign out error:', error);
          set({ isLoading: false });
        }
      },

      // Reset password
      resetPassword: async (data: ForgotPasswordFormData) => {
        try {
          set({ isLoading: true });
          
          const { error } = await supabase.auth.resetPasswordForEmail(
            data.email.trim().toLowerCase(),
            {
              redirectTo: `${window.location.origin}/reset-password`,
            }
          );

          set({ isLoading: false });

          if (error) {
            return { 
              success: false, 
              error: { message: error.message } 
            };
          }

          return { success: true };
        } catch (error) {
          console.error('Reset password error:', error);
          set({ isLoading: false });
          return { 
            success: false, 
            error: { message: 'An unexpected error occurred' } 
          };
        }
      },

      // Sign in with Google
      signInWithGoogle: async () => {
        try {
          set({ isLoading: true });
          
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });

          if (error) {
            set({ isLoading: false });
            return { 
              success: false, 
              error: { message: error.message } 
            };
          }

          // OAuth will redirect, so we don't set loading to false here
          return { success: true };
        } catch (error) {
          console.error('Google sign in error:', error);
          set({ isLoading: false });
          return { 
            success: false, 
            error: { message: 'An unexpected error occurred' } 
          };
        }
      },

      // Utility actions
      setUser: (user: AuthUser | null) => {
        set({ user, isAuthenticated: !!user });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'lunar-auth-storage',
      storage: {
        getItem: async (name: string) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name: string, value: unknown) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name: string) => {
          await AsyncStorage.removeItem(name);
        },
      },
      // Only persist essential data
      partialize: (state: AuthStore) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);