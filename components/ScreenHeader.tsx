import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/colors';
import { Spacing, Typography } from '@/constants/theme';

interface ScreenHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  badge?: number;
}

export default function ScreenHeader({
  title,
  showBack = false,
  onBack,
  showLogo = false,
  rightIcon,
  onRightPress,
  badge,
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
      <View style={styles.left}>
        {showBack && onBack && (
          <Pressable onPress={onBack} style={styles.iconButton} hitSlop={8}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </Pressable>
        )}
        {showLogo && (
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Bluesfading</Text>
            <View style={styles.logoAccent} />
          </View>
        )}
        {title && !showLogo && (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
      {rightIcon && onRightPress && (
        <Pressable onPress={onRightPress} style={styles.iconButton} hitSlop={8}>
          <Ionicons name={rightIcon} size={24} color={Colors.primary} />
          {badge !== undefined && badge > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.background,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  logoAccent: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
    marginLeft: 4,
    marginTop: -8,
  },
  title: {
    ...Typography.h3,
    marginLeft: Spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.white,
  },
});
