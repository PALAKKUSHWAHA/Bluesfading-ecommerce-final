import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/theme';

interface SkeletonLoaderProps {
  style?: ViewStyle;
}

export function Skeleton({ style }: SkeletonLoaderProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 850 }),
        withTiming(0.3, { duration: 850 })
      ),
      -1, // Infinite repeat
      true // Reverse direction
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.skeleton, style, animatedStyle]} />;
}

export function ProductSkeleton() {
  return (
    <View style={styles.productCard}>
      <Skeleton style={styles.productImage} />
      <Skeleton style={styles.productTitle} />
      <Skeleton style={styles.productCategory} />
      <Skeleton style={styles.productPrice} />
    </View>
  );
}

export function CategorySkeleton() {
  return (
    <View style={styles.categoryCard}>
      <Skeleton style={styles.categoryCircle} />
      <Skeleton style={styles.categoryLabel} />
    </View>
  );
}

export function HomeSkeleton() {
  return (
    <View style={styles.container}>
      <Skeleton style={styles.banner} />
      <View style={styles.section}>
        <Skeleton style={styles.sectionTitle} />
        <View style={styles.row}>
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
          <CategorySkeleton />
        </View>
      </View>
      <View style={styles.section}>
        <Skeleton style={styles.sectionTitle} />
        <View style={styles.row}>
          <ProductSkeleton />
          <ProductSkeleton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E0E0E0',
    borderRadius: BorderRadius.md,
  },
  container: {
    padding: Spacing.md,
    gap: Spacing.lg,
  },
  banner: {
    width: '100%',
    height: 160,
    borderRadius: BorderRadius.lg,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    width: '40%',
    height: 20,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
  productCard: {
    width: '47%',
    gap: Spacing.xs,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: BorderRadius.lg,
  },
  productTitle: {
    width: '90%',
    height: 16,
  },
  productCategory: {
    width: '60%',
    height: 12,
  },
  productPrice: {
    width: '40%',
    height: 18,
    marginTop: 4,
  },
  categoryCard: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
  },
  categoryLabel: {
    width: 50,
    height: 10,
  },
});
