import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CustomButton from '@/components/CustomButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';

interface EmptyStatePremiumProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyStatePremium({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStatePremiumProps) {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationContainer}>
        {/* Outer decorative ring */}
        <View style={styles.outerRing}>
          <View style={styles.innerRing}>
            <Ionicons name={icon} size={42} color={Colors.accent} />
          </View>
        </View>
        {/* Floating decorative sparkles */}
        <Ionicons name="sparkles" size={20} color={Colors.accentLight} style={styles.sparkleLeft} />
        <Ionicons name="sparkles" size={16} color={Colors.accentLight} style={styles.sparkleRight} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      {actionLabel && onAction && (
        <CustomButton
          title={actionLabel}
          onPress={onAction}
          variant="secondary"
          size="md"
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
    backgroundColor: Colors.background,
  },
  illustrationContainer: {
    position: 'relative',
    marginBottom: Spacing.lg,
  },
  outerRing: {
    width: 110,
    height: 110,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.03)',
  },
  innerRing: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 4,
  },
  sparkleLeft: {
    position: 'absolute',
    left: -10,
    top: 15,
  },
  sparkleRight: {
    position: 'absolute',
    right: -8,
    bottom: 25,
  },
  title: {
    ...Typography.h3,
    fontSize: 19,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  message: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  button: {
    minWidth: 180,
  },
});
