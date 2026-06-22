import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    Alert.alert(
      'Reset Link Sent',
      `A password recovery link has been dispatched to ${email}.`,
      [
        {
          text: 'OK',
          onPress: () => router.replace('/(auth)/login'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader showBack onBack={() => router.back()} />

      <View style={styles.content}>
        <View style={styles.logoBlock}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your email to receive recovery instructions</Text>
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
            onChangeText={setEmail}
          />

          <CustomButton
            title="Send Reset Instructions"
            onPress={handleResetPassword}
            variant="primary"
            size="lg"
            fullWidth
            style={styles.resetBtn}
          />
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
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
  },
  subtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
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
  resetBtn: {
    marginTop: Spacing.xs,
  },
});
