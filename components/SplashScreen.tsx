import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { shadowPresets } from '@/utils/shadows';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: Readonly<SplashScreenProps>) {
  const [loadingMessage, setLoadingMessage] = useState('');
  
  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const progressValue = useSharedValue(0);
  const messageOpacity = useSharedValue(0);

  // Loading messages - memoized to prevent useEffect dependency issues
  const loadingMessages = useMemo(() => [
    'Preparing your fasting journey...',
    'Loading Islamic calendar...',
    'Setting up your dashboard...',
    'Almost ready...',
  ], []);

  useEffect(() => {
    // Helper function to handle completion animation
    const handleCompletion = () => {
      logoOpacity.value = withTiming(0, { duration: 500 });
      messageOpacity.value = withTiming(0, { duration: 500 });
      setTimeout(() => onFinish(), 500);
    };

    // Helper function to cycle through messages
    const cycleMessages = () => {
      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length) {
          runOnJS(setLoadingMessage)(loadingMessages[messageIndex]);
          progressValue.value = withTiming((messageIndex + 1) / loadingMessages.length, { duration: 400 });
          messageIndex++;
        } else {
          clearInterval(messageInterval);
          setTimeout(handleCompletion, 800);
        }
      }, 600);
      return messageInterval;
    };

    // Phase 1: Logo appearance (0-1s)
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withTiming(1, { duration: 800 });

    // Phase 2: Loading messages (1-3s)
    const messageTimer = setTimeout(() => {
      messageOpacity.value = withTiming(1, { duration: 500 });
      const messageInterval = cycleMessages();
      
      // Store interval for cleanup
      return () => clearInterval(messageInterval);
    }, 1000);

    return () => {
      clearTimeout(messageTimer);
    };
  }, [loadingMessages, logoOpacity, logoScale, messageOpacity, onFinish, progressValue]);

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progressValue.value, [0, 1], [0, 100])}%`,
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Main content */}
      <View style={styles.content}>
        {/* Logo section */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={styles.iconContainer}>
            <Text style={styles.moonIcon}>🌙</Text>
          </View>
          
          <Text style={styles.appName}>LUNAR</Text>
          <Text style={styles.tagline}>Smart Fasting Companion</Text>
        </Animated.View>

        {/* Loading section */}
        <View style={styles.loadingContainer}>
          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <Animated.View style={[styles.progressFill, progressStyle]} />
            </View>
          </View>

          {/* Loading message */}
          <Animated.View style={[styles.messageContainer, messageAnimatedStyle]}>
            <Text style={styles.loadingMessage}>{loadingMessage}</Text>
          </Animated.View>
        </View>

        {/* Bottom quote */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>
            "And fasting is better for you, if you only knew"
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8FFFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    ...shadowPresets.medium,
  },
  moonIcon: {
    fontSize: 32,
    textAlign: 'center',
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#757575',
    textAlign: 'center',
  },
  loadingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressContainer: {
    width: '80%',
    marginBottom: 24,
  },
  progressTrack: {
    height: 2,
    backgroundColor: '#F5F5F5',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#52C4A0',
    borderRadius: 1,
  },
  messageContainer: {
    minHeight: 40,
    justifyContent: 'center',
  },
  loadingMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9E9E9E',
    textAlign: 'center',
    lineHeight: 20,
  },
  quoteContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  quote: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#BDBDBD',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});