import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { Eye, EyeOff, Mail, Lock, Star } from 'lucide-react-native';
import { useAuthStore } from '@/stores/auth';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('user@lunar.app'); // Default untuk testing
  const [password, setPassword] = useState('password123'); // Default untuk testing
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  // Generate stars data with unique IDs
  const starsData = React.useMemo(() => 
    Array.from({ length: 20 }, (_, index) => ({
      id: `star-${Math.random().toString(36).substr(2, 9)}-${index}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
    })), []
  );

  // Animation values
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(50);
  const cardOpacity = useSharedValue(0);
  const starsOpacity = useSharedValue(0);
  const moonGlow = useSharedValue(0);

  // Get time-based gradient
  const getTimeBasedGradient = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 6) {
      return ['#1a365d', '#2d5a87', '#ff7f50']; // Dawn
    } else if (hour >= 6 && hour < 16) {
      return ['#1e40af', '#3b82f6', '#60a5fa']; // Day
    } else if (hour >= 16 && hour < 19) {
      return ['#7c2d12', '#dc2626', '#f97316']; // Sunset
    } else {
      return ['#1a365d', '#1e3a8a', '#312e81']; // Night
    }
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) {
      return 'Selamat Pagi, Mujahid Puasa';
    } else if (hour >= 11 && hour < 15) {
      return 'Selamat Siang, Semangat Puasa';
    } else if (hour >= 15 && hour < 18) {
      return 'Selamat Sore, Hampir Berbuka';
    } else {
      return 'Selamat Malam, Persiapan Sahur';
    }
  };

  useEffect(() => {
    // Entrance animations
    logoOpacity.value = withTiming(1, { duration: 1000 });
    logoScale.value = withTiming(1, { duration: 1000 });
    
    cardTranslateY.value = withTiming(0, { duration: 800 });
    cardOpacity.value = withTiming(1, { duration: 800 });
    
    starsOpacity.value = withTiming(1, { duration: 1200 });
    
    // Continuous animations
    moonGlow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0.6, { duration: 2000 })
      ),
      -1,
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email harus diisi');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Format email tidak valid');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password harus diisi');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password minimal 6 karakter');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoginError('');
    
    // Use auth store login method
    const result = await login(email, password);
    
    if (!result.success) {
      setLoginError(result.error || 'Login gagal');
    }
    // Navigation akan dihandle otomatis oleh useProtectedRoute hook
  };

  const handleGoogleLogin = () => {
    // Implement Google login
    console.log('Google login pressed');
  };

  const handleAppleLogin = () => {
    // Implement Apple login (iOS only)
    if (Platform.OS === 'ios') {
      console.log('Apple login pressed');
    }
  };

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const starsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: starsOpacity.value,
  }));

  const moonGlowStyle = useAnimatedStyle(() => ({
    opacity: moonGlow.value,
  }));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={getTimeBasedGradient()}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Animated Stars */}
      <Animated.View style={[styles.starsContainer, starsAnimatedStyle]}>
        {starsData.map((star) => (
          <View
            key={star.id}
            style={[
              styles.star,
              {
                left: `${star.left}%`,
                top: `${star.top}%`,
              },
            ]}
          >
            <Star size={4} color="#d4af37" fill="#d4af37" />
          </View>
        ))}
      </Animated.View>

      {/* Header Section */}
      <View style={styles.header}>
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          {/* Moon with glow */}
          <View style={styles.moonContainer}>
            <Animated.View style={[styles.moonGlow, moonGlowStyle]} />
            <Text style={styles.moonIcon}>🌙</Text>
          </View>
          
          <Text style={styles.appName}>LUNAR</Text>
          <Text style={styles.tagline}>Smart Fasting Companion</Text>
          
          <Text style={styles.greeting}>{getTimeBasedGreeting()}</Text>
          <Text style={styles.subtitle}>Lanjutkan perjalanan spiritual Anda</Text>
        </Animated.View>
      </View>

      {/* Form Section */}
      <Animated.View style={[styles.formContainer, cardAnimatedStyle]}>
        <View style={styles.formCard}>
          {/* Email Field */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Mail size={20} color="#8F9BB3" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="Email"
                placeholderTextColor="#8F9BB3"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) validateEmail(text);
                }}
                onBlur={() => validateEmail(email)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Password Field */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#8F9BB3" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, passwordError ? styles.inputError : null]}
                placeholder="Password"
                placeholderTextColor="#8F9BB3"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (passwordError) validatePassword(text);
                }}
                onBlur={() => validatePassword(password)}
                secureTextEntry={!showPassword}
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#8F9BB3" />
                ) : (
                  <Eye size={20} color="#8F9BB3" />
                )}
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Login Error Display */}
          {loginError ? (
            <View style={styles.loginErrorContainer}>
              <Text style={styles.loginErrorText}>{loginError}</Text>
            </View>
          ) : null}

          {/* Test Credentials Info */}
          <View style={styles.testCredentialsContainer}>
            <Text style={styles.testCredentialsTitle}>🧪 Akun Test:</Text>
            <Text style={styles.testCredentialsText}>Email: user@lunar.app</Text>
            <Text style={styles.testCredentialsText}>Password: password123</Text>
            <Text style={styles.testCredentialsSubtext}>
              Atau email: admin@lunar.app dengan password: admin123
            </Text>
          </View>

          {/* Remember Me & Forgot Password */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Ingat saya</Text>
            </TouchableOpacity>
            
            <Link href="/(auth)/forgot-password" asChild>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Lupa password?</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <LinearGradient
              colors={['#26A69A', '#00897B']}
              style={styles.loginButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <View style={styles.loadingSpinner} />
                  <Text style={styles.loginButtonText}>Masuk...</Text>
                </View>
              ) : (
                <Text style={styles.loginButtonText}>MASUK</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>atau masuk dengan</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Text style={styles.googleIcon}>🔴</Text>
            <Text style={styles.socialButtonText}>Masuk dengan Google</Text>
          </TouchableOpacity>

          {Platform.OS === 'ios' && (
            <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin}>
              <Text style={styles.appleIcon}>🍎</Text>
              <Text style={styles.socialButtonText}>Masuk dengan Apple</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Belum punya akun? </Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Daftar sekarang</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.linksContainer}>
          <TouchableOpacity>
            <Text style={styles.linkText}>Syarat & Ketentuan</Text>
          </TouchableOpacity>
          <Text style={styles.linkSeparator}>|</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Kebijakan Privasi</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.islamicNote}>🕌 Dibangun dengan nilai-nilai Islami</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  starsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  star: {
    position: 'absolute',
  },
  header: {
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  moonContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  moonGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#d4af37',
    top: -25,
    left: -25,
    shadowColor: '#d4af37',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
  },
  moonIcon: {
    fontSize: 30,
    textAlign: 'center',
  },
  appName: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#E8F5E8',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  greeting: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#E8F5E8',
    textAlign: 'center',
    opacity: 0.8,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.1,
    shadowRadius: 45,
    elevation: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#1A2138',
  },
  inputError: {
    borderColor: '#F44336',
    borderWidth: 2,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#F44336',
    marginTop: 4,
    marginLeft: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#26A69A',
    borderColor: '#26A69A',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  rememberText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  forgotText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#d4af37',
  },
  loginButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonGradient: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopColor: 'transparent',
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    marginHorizontal: 16,
    opacity: 0.7,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    height: 56,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  googleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  appleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#1A2138',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  registerLink: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#d4af37',
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  linkText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.6,
  },
  linkSeparator: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.6,
    marginHorizontal: 8,
  },
  islamicNote: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#d4af37',
    textAlign: 'center',
    opacity: 0.8,
  },
  loginErrorContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderColor: 'rgba(244, 67, 54, 0.3)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  loginErrorText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FF5252',
    textAlign: 'center',
  },
  testCredentialsContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(76, 175, 80, 0.3)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  testCredentialsTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  testCredentialsText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  testCredentialsSubtext: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.7,
    marginTop: 4,
  },
});