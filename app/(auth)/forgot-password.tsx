import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { ChevronLeft, Mail, Lock, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Animation values
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(50);
  const iconScale = useSharedValue(0.8);
  const iconOpacity = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);

  useEffect(() => {
    // Entrance animations
    cardOpacity.value = withTiming(1, { duration: 800 });
    cardTranslateY.value = withTiming(0, { duration: 800 });
    iconOpacity.value = withTiming(1, { duration: 1000 });
    iconScale.value = withTiming(1, { duration: 1000 });

    // Pulse animation for waiting state
    if (currentStep === 2) {
      pulseAnimation.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        true
      );
    }
  }, [currentStep]);

  useEffect(() => {
    // Resend timer
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const validateEmail = (email) => {
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

  const validatePasswords = () => {
    if (!newPassword) {
      setPasswordError('Password baru harus diisi');
      return false;
    } else if (newPassword.length < 6) {
      setPasswordError('Password minimal 6 karakter');
      return false;
    } else if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi password tidak cocok');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSendReset = async () => {
    if (!validateEmail(email)) return;

    setIsLoading(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
      setResendTimer(60); // 60 seconds cooldown
    }, 2000);
  };

  const handleResendEmail = () => {
    if (resendTimer === 0) {
      setResendTimer(60);
      // Simulate resending email
      console.log('Resending email...');
    }
  };

  const handleResetPassword = async () => {
    if (!validatePasswords()) return;

    setIsLoading(true);
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(4);
      
      // Auto redirect after 3 seconds
      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 3000);
    }, 2000);
  };

  // Animated styles
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
    transform: [{ scale: iconScale.value }],
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnimation.value }],
  }));

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
        <Mail size={48} color="#d4af37" />
      </Animated.View>
      
      <Text style={styles.stepTitle}>Lupa Password?</Text>
      <Text style={styles.stepSubtitle}>
        Masukkan email Anda dan kami akan mengirimkan link untuk reset password
      </Text>

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

      <TouchableOpacity
        style={[styles.primaryButton, isLoading && styles.primaryButtonDisabled]}
        onPress={handleSendReset}
        disabled={isLoading}
      >
        <LinearGradient
          colors={['#26A69A', '#00897B']}
          style={styles.primaryButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingSpinner} />
              <Text style={styles.primaryButtonText}>Mengirim...</Text>
            </View>
          ) : (
            <Text style={styles.primaryButtonText}>KIRIM LINK RESET</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Animated.View style={[styles.iconContainer, iconAnimatedStyle, pulseAnimatedStyle]}>
        <CheckCircle size={48} color="#4CAF50" />
      </Animated.View>
      
      <Text style={styles.stepTitle}>Email Terkirim!</Text>
      <Text style={styles.stepSubtitle}>
        Kami telah mengirimkan link reset password ke{'\n'}
        <Text style={styles.emailHighlight}>{email}</Text>
      </Text>

      <View style={styles.instructionContainer}>
        <Text style={styles.instructionTitle}>Langkah selanjutnya:</Text>
        <Text style={styles.instructionText}>
          1. Buka email Anda{'\n'}
          2. Klik link reset password{'\n'}
          3. Buat password baru{'\n'}
          4. Login dengan password baru
        </Text>
      </View>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Tidak menerima email?</Text>
        <TouchableOpacity
          style={[styles.resendButton, resendTimer > 0 && styles.resendButtonDisabled]}
          onPress={handleResendEmail}
          disabled={resendTimer > 0}
        >
          <Text style={[styles.resendButtonText, resendTimer > 0 && styles.resendButtonTextDisabled]}>
            {resendTimer > 0 ? `Kirim ulang (${resendTimer}s)` : 'Kirim ulang'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => setCurrentStep(3)}
      >
        <Text style={styles.secondaryButtonText}>Sudah reset? Lanjut login</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
        <Lock size={48} color="#d4af37" />
      </Animated.View>
      
      <Text style={styles.stepTitle}>Password Baru</Text>
      <Text style={styles.stepSubtitle}>
        Buat password baru yang kuat dan mudah diingat
      </Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#8F9BB3" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Password Baru"
            placeholderTextColor="#8F9BB3"
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              if (passwordError) validatePasswords();
            }}
            secureTextEntry
            autoComplete="password"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#8F9BB3" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Konfirmasi Password Baru"
            placeholderTextColor="#8F9BB3"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (passwordError) validatePasswords();
            }}
            onBlur={validatePasswords}
            secureTextEntry
          />
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, isLoading && styles.primaryButtonDisabled]}
        onPress={handleResetPassword}
        disabled={isLoading}
      >
        <LinearGradient
          colors={['#26A69A', '#00897B']}
          style={styles.primaryButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingSpinner} />
              <Text style={styles.primaryButtonText}>Menyimpan...</Text>
            </View>
          ) : (
            <Text style={styles.primaryButtonText}>SIMPAN PASSWORD</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
        <CheckCircle size={64} color="#4CAF50" />
      </Animated.View>
      
      <Text style={styles.stepTitle}>Berhasil!</Text>
      <Text style={styles.stepSubtitle}>
        Password Anda telah berhasil diubah.{'\n'}
        Anda akan diarahkan ke halaman login.
      </Text>

      <View style={styles.successContainer}>
        <View style={styles.countdownContainer}>
          <Clock size={20} color="#d4af37" />
          <Text style={styles.countdownText}>Redirect otomatis dalam 3 detik</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.replace('/(auth)/login')}
      >
        <LinearGradient
          colors={['#26A69A', '#00897B']}
          style={styles.primaryButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.primaryButtonText}>LOGIN SEKARANG</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#1a365d', '#2d5a87', '#26A69A']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Reset Password</Text>
          <Text style={styles.headerSubtitle}>Pulihkan akses ke akun Anda</Text>
        </View>
      </View>

      {/* Form */}
      <Animated.View style={[styles.formContainer, cardAnimatedStyle]}>
        <View style={styles.formCard}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </View>
      </Animated.View>

      {/* Footer */}
      {currentStep !== 4 && (
        <View style={styles.footer}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Ingat password Anda? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Kembali ke login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#E8F5E8',
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
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.1,
    shadowRadius: 45,
    elevation: 20,
    alignItems: 'center',
  },
  stepContainer: {
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#E8F5E8',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.8,
    lineHeight: 24,
  },
  emailHighlight: {
    color: '#d4af37',
    fontFamily: 'Poppins-SemiBold',
  },
  inputContainer: {
    width: '100%',
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
  errorText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#F44336',
    marginTop: 4,
    marginLeft: 16,
    textAlign: 'left',
    width: '100%',
  },
  primaryButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonGradient: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
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
  instructionContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  instructionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#E8F5E8',
    lineHeight: 20,
    opacity: 0.8,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resendText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#E8F5E8',
    marginBottom: 8,
    opacity: 0.8,
  },
  resendButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#d4af37',
  },
  resendButtonTextDisabled: {
    color: '#8F9BB3',
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#FFFFFF',
  },
  successContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  countdownText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#d4af37',
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#d4af37',
  },
});