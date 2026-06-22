import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import RatingStars from '@/components/RatingStars';
import { Colors } from '@/constants/colors';
import { PRODUCT_CARD_WIDTH } from '@/constants/layout';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/hooks/useAppContext';
import { getProductImageSource, hasDiscount, Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  width?: number;
}

export default function ProductCard({
  product,
  onPress,
  width = PRODUCT_CARD_WIDTH,
}: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useApp();
  const wishlisted = isInWishlist(product.id);
  const onSale = hasDiscount(product);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { width },
        pressed && styles.pressed,
      ]}>
      <View style={[styles.imageContainer, { height: width * 1.25 }]}>
        <Image
          source={getProductImageSource(product)}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <Pressable
          style={styles.wishlistButton}
          onPress={() => toggleWishlist(product)}
          hitSlop={8}>
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={20}
            color={wishlisted ? Colors.error : Colors.white}
          />
        </Pressable>
        {product.isHighlight && onSale && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>50% OFF</Text>
          </View>
        )}
        {product.isNew && !product.isHighlight && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.ratingRow}>
          <RatingStars rating={product.rating} size={12} showValue />
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {onSale && product.originalPrice != null && (
            <Text style={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl, // 24px rounded corners
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.97 }],
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: 'rgba(28, 43, 72, 0.05)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishlistButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(28, 43, 72, 0.45)', // Midnight Blue transparent backdrop
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.accent,
    letterSpacing: 0.5,
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.accent,
    letterSpacing: 0.4,
  },
  info: {
    padding: Spacing.md - 2,
  },
  name: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.accent, // Midnight Blue text
    marginBottom: Spacing.xs,
    lineHeight: 18,
  },
  ratingRow: {
    marginBottom: Spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  price: {
    ...Typography.price,
    fontSize: 16,
    color: Colors.accent, // Midnight Blue price
  },
  originalPrice: {
    ...Typography.caption,
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
});
