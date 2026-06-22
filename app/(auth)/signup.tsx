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

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useApp();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (!email.includes('@')) {
      setError('Invalid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    signup(username, email);
    router.replace('/(tabs)/profile');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader showBack onBack={() => router.back()} />

      <View style={styles.content}>
        <View style={styles.logoBlock}>
          <Text style={styles.title}>Join Us</Text>
          <Text style={styles.subtitle}>Create an account to save your favorites</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="choose a username..."
            placeholderTextColor={Colors.textLight}
            value={username}
            onChangeText={(v) => {
              setUsername(v);
              setError('');
            }}
          />

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
          <TextInput
            style={styles.input}
            placeholder="create a strong password..."
            placeholderTextColor={Colors.textLight}
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={(v) => {
              setPassword(v);
              setError('');
            }}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <CustomButton
            title="Create Account"
            onPress={handleSignup}
            variant="accent"
            size="lg"
            fullWidth
            style={styles.signupBtn}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Pressable onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.loginLink}>Log In</Text>
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
    fontSize: 32,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
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
  errorText: {
    color: Colors.error,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  signupBtn: {
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
  loginLink: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '700',
  },
});
