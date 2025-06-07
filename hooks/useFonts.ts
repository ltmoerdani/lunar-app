import { useFonts as useExpoFonts } from 'expo-font';
import { 
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

export function useFonts() {
  const [fontsLoaded, fontError] = useExpoFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  return [fontsLoaded, fontError];
}