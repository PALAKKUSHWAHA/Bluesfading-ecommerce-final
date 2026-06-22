import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/hooks/useAppContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Simple email pattern check
    if (!email.includes('@')) {
      setError('Invalid email address');
      return;
    }
    
    // Split the email prefix as username for mock login
    const username = email.split('@')[0];
    login(username, email);
    
    router.replace('/(tabs)/profile');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader showBack onBack={() => router.back()} />

      <View style={styles.content}>
        <View style={styles.logoBlock}>
          <Text style={styles.title}>BlueSfading</Text>
          <Text style={styles.subtitle}>Welcome back to aesthetic shopping</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="enter your email..."
            placeholderTextColor={Colors.textLight}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(v) => {
              setEmail(v);
              setError('');
            }}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="enter your password..."
              placeholderTextColor={Colors.textLight}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={(v) => {
                setPassword(v);
                setError('');
              }}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={Colors.textLight}
              />
            </Pressable>
          </View>

          <Pressable 
            onPress={() => router.push('/(auth)/forgot-password')} 
            style={styles.forgotPasswordBtn}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <CustomButton
            title="Log In"
            onPress={handleLogin}
            variant="primary"
            size="lg"
            fullWidth
            style={styles.loginBtn}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Pressable onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'center',
  },
  logoBlock: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 1,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    fontStyle: 'italic',
  },
  form: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  label: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 14,
    color: Colors.text,
    marginBottom: Spacing.md,
    backgroundColor: Colors.background,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
    marginBottom: Spacing.sm,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: Spacing.sm,
    fontSize: 14,
    color: Colors.text,
  },
  forgotPasswordBtn: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.md,
  },
  forgotPasswordText: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: '600',
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  loginBtn: {
    marginTop: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  footerText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  signUpLink: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '700',
  },
});
