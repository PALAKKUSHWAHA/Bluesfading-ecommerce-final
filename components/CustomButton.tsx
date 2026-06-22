import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}: CustomButtonProps) {
  const variantStyles = {
    primary: { bg: Colors.primary, text: Colors.accent, border: Colors.primary },
    secondary: { bg: Colors.primaryLight, text: Colors.accent, border: Colors.primaryLight },
    outline: { bg: 'transparent', text: Colors.accent, border: Colors.accent },
    accent: { bg: Colors.accent, text: Colors.white, border: Colors.accent },
    ghost: { bg: 'transparent', text: Colors.accent, border: 'transparent' },
  };

  const sizeStyles = {
    sm: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, fontSize: 14 },
    md: { paddingVertical: Spacing.md - 2, paddingHorizontal: Spacing.lg, fontSize: 16 },
    lg: { paddingVertical: Spacing.md + 2, paddingHorizontal: Spacing.xl, fontSize: 18 },
  };

  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed
            ? (variant === 'primary' ? Colors.primaryLight : Colors.primary)
            : v.bg,
          borderColor: pressed
            ? (variant === 'primary' ? Colors.primaryLight : Colors.primary)
            : v.border,
          paddingVertical: s.paddingVertical,
          paddingHorizontal: s.paddingHorizontal,
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: disabled ? 0.5 : 1,
        },
        (variant === 'primary' || variant === 'accent') && Shadows.button,
        fullWidth && styles.fullWidth,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={v.text} />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={s.fontSize + 2}
              color={v.text}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, { color: v.text, fontSize: s.fontSize }, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.xl, // Round corners to 24px
    borderWidth: 1.5,
  },
  fullWidth: {
    width: '100%',
  },
  icon: {
    marginRight: Spacing.sm,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
