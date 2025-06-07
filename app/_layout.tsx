import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from '@/hooks/useFonts';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { lunarLightTheme, customMapping } from '@/config/theme';
import { SplashScreen } from '@/components/SplashScreen';
import * as ExpoSplashScreen from 'expo-splash-screen';

// Create a client
const queryClient = new QueryClient();

// Prevent splash screen from auto-hiding
ExpoSplashScreen.preventAutoHideAsync();

function RootLayoutNavigator() {
  useProtectedRoute(); // Handle authentication flow
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ApplicationProvider
          {...eva.light}
          theme={{ ...eva.light, ...lunarLightTheme }}
          customMapping={customMapping}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="auth/callback" />
            <Stack.Screen name="reset-password" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="dark" />
        </ApplicationProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  
  const [fontsLoaded, fontError] = useFonts();
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const handleSplashFinish = () => {
    setShowCustomSplash(false);
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (showCustomSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <IconRegistry icons={EvaIconsPack} />
        <RootLayoutNavigator />
      </>
    </QueryClientProvider>
  );
}