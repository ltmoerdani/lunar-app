import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const moonGlow = useSharedValue(0);
  const progressValue = useSharedValue(0);
  const messageOpacity = useSharedValue(0);
  const backgroundOpacity = useSharedValue(0);

  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) {
      return {
        greeting: '🌅 Subuh barokah, semangat sahur!',
        message: '🌙 Menyiapkan niat puasa hari ini...'
      };
    } else if (hour >= 11 && hour < 15) {
      return {
        greeting: '☀️ Semangat menjalani puasa!',
        message: '💪 Setengah perjalanan telah dilalui'
      };
    } else if (hour >= 15 && hour < 18) {
      return {
        greeting: '🌇 Sebentar lagi maghrib!',
        message: '🤲 Menyiapkan doa berbuka puasa...'
      };
    } else {
      return {
        greeting: '🌙 Alhamdulillah puasa hari ini',
        message: '📅 Menyiapkan planning puasa besok...'
      };
    }
  };

  // Loading messages for different phases
  const loadingMessages = [
    '🌙 Menyiapkan kalender puasa Hijriah...',
    '📅 Memuat jadwal puasa sunnah...',
    '⭐ Menganalisa opportunity Ayyamul Bidh...',
    '🤲 Menyiapkan guidance puasa personal...',
    '🎯 Memuat planning puasa optimal...',
    '📊 Memuat progress puasa Anda...',
    '✨ Siap memulai journey puasa cerdas'
  ];

  // Personal messages (mock - in real app would be based on user data)
  const personalMessages = [
    '🌙 Selamat datang kembali, mujahid puasa',
    '🔥 Streak puasa: 2 hari masya Allah!',
    '💪 Menyiapkan planning optimal...'
  ];

  useEffect(() => {
    // Phase 1: Logo appearance (0-1.5s)
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withTiming(1, { duration: 800 });
    moonGlow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.6, { duration: 1500 })
      ),
      -1,
      true
    );

    // Phase 2: Loading messages (1.5-4s)
    const messageTimer = setTimeout(() => {
      setCurrentPhase(1);
      messageOpacity.value = withTiming(1, { duration: 500 });
      
      // Cycle through loading messages
      let messageIndex = 0;
      const messageInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length) {
          runOnJS(setLoadingMessage)(loadingMessages[messageIndex]);
          progressValue.value = withTiming((messageIndex + 1) / loadingMessages.length, { duration: 400 });
          messageIndex++;
        } else {
          clearInterval(messageInterval);
          // Phase 3: Personal messages
          setTimeout(() => {
            setCurrentPhase(2);
            let personalIndex = 0;
            const personalInterval = setInterval(() => {
              if (personalIndex < personalMessages.length) {
                runOnJS(setLoadingMessage)(personalMessages[personalIndex]);
                personalIndex++;
              } else {
                clearInterval(personalInterval);
                // Final phase: Completion
                setTimeout(() => {
                  const timeGreeting = getTimeBasedGreeting();
                  runOnJS(setLoadingMessage)(timeGreeting.greeting);
                  setTimeout(() => {
                    runOnJS(setLoadingMessage)('🤲 Barakallahu fiikum');
                    setTimeout(() => {
                      backgroundOpacity.value = withTiming(0, { duration: 800 });
                      logoOpacity.value = withTiming(0, { duration: 800 });
                      messageOpacity.value = withTiming(0, { duration: 800 });
                      setTimeout(() => {
                        onFinish();
                      }, 800);
                    }, 1000);
                  }, 800);
                }, 800);
              }
            }, 800);
          }, 500);
        }
      }, 600);
    }, 1500);

    return () => {
      clearTimeout(messageTimer);
    };
  }, []);

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const moonGlowStyle = useAnimatedStyle(() => ({
    opacity: moonGlow.value,
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progressValue.value, [0, 1], [0, 100])}%`,
  }));

  const messageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: messageOpacity.value,
  }));

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a4a5c', '#26A69A', '#4a90b8']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Islamic geometric pattern overlay */}
      <Animated.View style={[styles.patternOverlay, backgroundAnimatedStyle]}>
        <View style={styles.geometricPattern} />
      </Animated.View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Logo section */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          {/* Moon with glow effect */}
          <View style={styles.moonContainer}>
            <Animated.View style={[styles.moonGlow, moonGlowStyle]} />
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

        {/* Spiritual quote */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>
            "وَأَن تَصُومُوا خَيْرٌ لَّكُمْ إِن كُنتُمْ تَعْلَمُونَ"
          </Text>
          <Text style={styles.quoteTranslation}>
            "Dan berpuasa itu lebih baik bagimu jika kamu mengetahui"
          </Text>
        </View>
      </View>

      {/* Floating particles effect */}
      <View style={styles.particlesContainer}>
        {[...Array(6)].map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                left: `${20 + index * 12}%`,
                animationDelay: `${index * 0.5}s`,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  patternOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.1,
  },
  geometricPattern: {
    flex: 1,
    backgroundColor: 'transparent',
    // Add subtle Islamic geometric pattern here if needed
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  moonContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  moonGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d4af37',
    top: -35,
    left: -35,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  moonIcon: {
    fontSize: 50,
    textAlign: 'center',
  },
  appName: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#E8F5E8',
    textAlign: 'center',
    opacity: 0.9,
  },
  loadingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressContainer: {
    width: '80%',
    marginBottom: 30,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#d4af37',
    borderRadius: 2,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  messageContainer: {
    minHeight: 50,
    justifyContent: 'center',
  },
  loadingMessage: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.95,
  },
  quoteContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  quote: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#d4af37',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
  },
  quoteTranslation: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#E8F5E8',
    textAlign: 'center',
    opacity: 0.8,
    fontStyle: 'italic',
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#d4af37',
    borderRadius: 2,
    opacity: 0.6,
    top: '20%',
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
});