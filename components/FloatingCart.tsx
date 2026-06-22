import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing } from '@/constants/theme';
import { useApp } from '@/hooks/useAppContext';

export default function FloatingCart() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartItemCount } = useApp();
  
  const scale = useSharedValue(1);

  // Animate whenever the cart size changes
  useEffect(() => {
    if (cartItemCount > 0) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 10 }),
        withSpring(1.0, { damping: 10 })
      );
    }
  }, [cartItemCount, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Hide on cart screen itself to prevent redundancy, or if cart is empty
  const isCartScreen = pathname.includes('/cart');
  if (cartItemCount === 0 || isCartScreen) {
    return null;
  }

  return (
    <Animated.View style={[styles.floatingWrapper, animatedStyle]}>
      <Pressable
        style={styles.cartButton}
        onPress={() => router.push('/(tabs)/cart')}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
      >
        <Ionicons name="bag-handle" size={24} color={Colors.white} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartItemCount}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    zIndex: 999,
  },
  cartButton: {
    width: 58,
    height: 58,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.button,
    elevation: 8,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Colors.accent,
    minWidth: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
});
