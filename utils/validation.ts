import { LoginFormData, RegisterFormData, ForgotPasswordFormData, AuthError } from '@/types/auth';

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email.trim()) {
    return 'Email is required';
  }
  
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return 'Password must contain at least one special character (@$!%*?&)';
  }
  
  return null;
};

export const validateLoginForm = (data: LoginFormData): AuthError[] => {
  const errors: AuthError[] = [];
  
  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.push({ message: emailError, field: 'email' });
  }
  
  if (!data.password) {
    errors.push({ message: 'Password is required', field: 'password' });
  }
  
  return errors;
};

export const validateRegisterForm = (data: RegisterFormData): AuthError[] => {
  const errors: AuthError[] = [];
  
  if (!data.fullName.trim()) {
    errors.push({ message: 'Full name is required', field: 'fullName' });
  }
  
  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.push({ message: emailError, field: 'email' });
  }
  
  const passwordError = validatePassword(data.password);
  if (passwordError) {
    errors.push({ message: passwordError, field: 'password' });
  }
  
  if (data.password !== data.confirmPassword) {
    errors.push({ message: 'Passwords do not match', field: 'confirmPassword' });
  }
  
  if (!data.acceptTerms) {
    errors.push({ message: 'You must accept the terms and conditions', field: 'acceptTerms' });
  }
  
  return errors;
};

export const validateForgotPasswordForm = (data: ForgotPasswordFormData): AuthError[] => {
  const errors: AuthError[] = [];
  
  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.push({ message: emailError, field: 'email' });
  }
  
  return errors;
};