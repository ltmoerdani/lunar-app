import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;

  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  completeOnboarding: () => void;
}

// Mock users database untuk development
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'user@lunar.app',
    password: 'password123',
    name: 'Test User',
    avatar: undefined,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'admin@lunar.app',
    password: 'admin123',
    name: 'Admin User',
    avatar: undefined,
    createdAt: new Date().toISOString(),
  },
];

// Simulasi login delay
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 1500));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      hasCompletedOnboarding: false,

      // Login action
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          await simulateNetworkDelay();
          
          // Find user in mock database
          const foundUser = mockUsers.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
          );
          
          if (foundUser) {
            const { password: _, ...userData } = foundUser;
            set({ 
              user: userData, 
              isAuthenticated: true, 
              isLoading: false 
            });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { 
              success: false, 
              error: 'Email atau password tidak valid' 
            };
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ isLoading: false });
          return { 
            success: false, 
            error: 'Terjadi kesalahan saat login' 
          };
        }
      },

      // Register action
      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        
        try {
          await simulateNetworkDelay();
          
          // Check if user already exists
          const existingUser = mockUsers.find(
            u => u.email.toLowerCase() === email.toLowerCase()
          );
          
          if (existingUser) {
            set({ isLoading: false });
            return { 
              success: false, 
              error: 'Email sudah terdaftar' 
            };
          }
          
          // Create new user
          const newUser: User = {
            id: Date.now().toString(),
            email: email.toLowerCase(),
            name,
            createdAt: new Date().toISOString(),
          };
          
          // Add to mock database
          mockUsers.push({ ...newUser, password });
          
          set({ 
            user: newUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          return { success: true };
        } catch (error) {
          console.error('Register error:', error);
          set({ isLoading: false });
          return { 
            success: false, 
            error: 'Terjadi kesalahan saat registrasi' 
          };
        }
      },

      // Reset password action
      resetPassword: async (email: string) => {
        set({ isLoading: true });
        
        try {
          await simulateNetworkDelay();
          
          const foundUser = mockUsers.find(
            u => u.email.toLowerCase() === email.toLowerCase()
          );
          
          if (foundUser) {
            // Dalam implementasi nyata, kirim email reset password
            set({ isLoading: false });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { 
              success: false, 
              error: 'Email tidak ditemukan' 
            };
          }
        } catch (error) {
          console.error('Reset password error:', error);
          set({ isLoading: false });
          return { 
            success: false, 
            error: 'Terjadi kesalahan saat reset password' 
          };
        }
      },

      // Logout action
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          hasCompletedOnboarding: false
        });
      },

      // Utility actions
      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
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
      // Hanya persist data penting, tidak termasuk loading states
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        // Include functions as undefined to satisfy AuthState type
        isLoading: false,
        login: undefined as any,
        register: undefined as any,
        logout: undefined as any,
        resetPassword: undefined as any,
        setUser: undefined as any,
        setLoading: undefined as any,
        completeOnboarding: undefined as any,
      }),
    }
  )
);
