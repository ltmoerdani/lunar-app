import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Link, router } from 'expo-router';
import { 
  Layout, 
  Text, 
  Input, 
  Button, 
  Icon,
  Spinner,
  CheckBox
} from '@ui-kitten/components';
import { shadowPresets } from '@/utils/shadows';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useAuthStore } from '@/stores/auth';
import { validateRegisterForm } from '@/utils/validation';
import { RegisterFormData } from '@/types/auth';

// Icon components for UI Kitten
const EmailIcon = (props: any) => <Icon {...props} name="email" />;
const LockIcon = (props: any) => <Icon {...props} name="lock" />;
const PersonIcon = (props: any) => <Icon {...props} name="person" />;
const EyeIcon = (props: any) => <Icon {...props} name="eye" />;
const EyeOffIcon = (props: any) => <Icon {...props} name="eye-off" />;
const ArrowBackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

export default function RegisterScreen() {
  const { signUp, isLoading } = useAuthStore();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Animation values
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(30);

  React.useEffect(() => {
    // Entrance animations
    cardOpacity.value = withTiming(1, { duration: 600 });
    cardTranslateY.value = withTiming(0, { duration: 600 });
  }, [cardOpacity, cardTranslateY]);

  const updateFormData = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field as string]: '' }));
    }
  };

  const handleRegister = async () => {
    // Validate form
    const validationErrors = validateRegisterForm(formData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(error => {
        if (error.field) {
          errorMap[error.field] = error.message;
        }
      });
      setErrors(errorMap);
      return;
    }

    // Clear previous errors
    setErrors({});

    // Attempt registration
    const result = await signUp(formData);
    
    if (!result.success && result.error) {
      if (result.error.field) {
        setErrors({ [result.error.field]: result.error.message });
      } else {
        Alert.alert('Registration Error', result.error.message);
      }
    } else {
      // Registration successful
      setRegisterSuccess(true);
      Alert.alert(
        'Registration Successful',
        'Please check your email to verify your account before signing in.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(auth)/login'),
          },
        ]
      );
    }
  };

  // Toggle password visibility
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Animated styles
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  if (registerSuccess) {
    return (
      <Layout style={styles.container}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle} category="h5">
            Registration Successful!
          </Text>
          <Text style={styles.successMessage} category="s1" appearance="hint">
            Please check your email to verify your account before signing in.
          </Text>
          <Button
            style={styles.successButton}
            onPress={() => router.replace('/(auth)/login')}
            status="primary"
          >
            Go to Login
          </Button>
        </View>
      </Layout>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Layout style={styles.layout}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowBackIcon style={styles.backIcon} />
          </TouchableOpacity>
          
          <View style={styles.iconContainer}>
            <Text style={styles.moonIcon}>🌙</Text>
          </View>
          
          <Text style={styles.appName} category="h1">Join LUNAR</Text>
          <Text style={styles.subtitle} category="s1" appearance="hint">
            Start your spiritual fasting journey today
          </Text>
        </View>

        {/* Form */}
        <Animated.View style={[styles.formContainer, cardAnimatedStyle]}>
          <Layout style={styles.formCard}>
            {/* Full Name Field */}
            <View style={styles.inputContainer}>
              <Input
                placeholder="Enter your full name"
                value={formData.fullName}
                onChangeText={(text) => updateFormData('fullName', text)}
                autoCapitalize="words"
                autoComplete="name"
                disabled={isLoading}
                accessoryLeft={PersonIcon}
                status={errors.fullName ? 'danger' : 'basic'}
                caption={errors.fullName}
                style={styles.input}
              />
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Input
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) => updateFormData('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                disabled={isLoading}
                accessoryLeft={EmailIcon}
                status={errors.email ? 'danger' : 'basic'}
                caption={errors.email}
                style={styles.input}
              />
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <Input
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(text) => updateFormData('password', text)}
                secureTextEntry={!showPassword}
                autoComplete="password-new"
                disabled={isLoading}
                accessoryLeft={LockIcon}
                accessoryRight={(props) => (
                  <TouchableOpacity onPress={toggleShowPassword}>
                    {showPassword ? <EyeOffIcon {...props} /> : <EyeIcon {...props} />}
                  </TouchableOpacity>
                )}
                status={errors.password ? 'danger' : 'basic'}
                caption={errors.password}
                style={styles.input}
              />
            </View>

            {/* Confirm Password Field */}
            <View style={styles.inputContainer}>
              <Input
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(text) => updateFormData('confirmPassword', text)}
                secureTextEntry={!showConfirmPassword}
                autoComplete="password-new"
                disabled={isLoading}
                accessoryLeft={LockIcon}
                accessoryRight={(props) => (
                  <TouchableOpacity onPress={toggleShowConfirmPassword}>
                    {showConfirmPassword ? <EyeOffIcon {...props} /> : <EyeIcon {...props} />}
                  </TouchableOpacity>
                )}
                status={errors.confirmPassword ? 'danger' : 'basic'}
                caption={errors.confirmPassword}
                style={styles.input}
              />
            </View>

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
              <CheckBox
                checked={formData.acceptTerms}
                onChange={(checked) => updateFormData('acceptTerms', checked)}
                disabled={isLoading}
                status={errors.acceptTerms ? 'danger' : 'primary'}
              >
                <Text style={styles.termsText} category="c1">
                  I agree to the{' '}
                  <Text style={styles.linkText} status="info">Terms of Service</Text>
                  {' '}and{' '}
                  <Text style={styles.linkText} status="info">Privacy Policy</Text>
                </Text>
              </CheckBox>
              {errors.acceptTerms && (
                <Text style={styles.errorText} status="danger">
                  {errors.acceptTerms}
                </Text>
              )}
            </View>

            {/* Register Button */}
            <Button
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={isLoading}
              accessoryLeft={isLoading ? <Spinner size="small" status="control" /> : undefined}
              status="primary"
              size="large"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Layout>
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText} category="s1" appearance="hint">
              Already have an account?{' '}
            </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity disabled={isLoading}>
                <Text style={styles.loginLink} status="info">
                  Sign in
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  layout: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 60,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8FFFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...shadowPresets.medium,
  },
  moonIcon: {
    fontSize: 24,
    textAlign: 'center',
  },
  appName: {
    fontFamily: 'Poppins-Bold',
    color: '#212121',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  formCard: {
    borderRadius: 16,
    padding: 24,
    ...shadowPresets.large,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 4,
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginLeft: 8,
  },
  linkText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 32,
  },
  registerButton: {
    marginBottom: 24,
    borderRadius: 12,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'Poppins-Regular',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successIcon: {
    fontSize: 48,
    marginBottom: 24,
  },
  successTitle: {
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
  },
  successButton: {
    paddingHorizontal: 32,
    borderRadius: 12,
  },
});
