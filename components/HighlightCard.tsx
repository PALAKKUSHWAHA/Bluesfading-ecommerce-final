import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import RatingStars from '@/components/RatingStars';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/hooks/useAppContext';
import { getProductImageSource, hasDiscount, Product } from '@/types';

interface HighlightCardProps {
  product: Product;
  onPress: () => void;
}

export default function HighlightCard({ product, onPress }: HighlightCardProps) {
  const { isInWishlist, toggleWishlist } = useApp();
  const wishlisted = isInWishlist(product.id);
  const onSale = hasDiscount(product);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <View style={styles.imageContainer}>
        <Image
          source={getProductImageSource(product)}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>FLAT 50% OFF</Text>
        </View>
        <Pressable
          style={styles.wishlistButton}
          onPress={() => toggleWishlist(product)}
          hitSlop={8}>
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={22}
            color={wishlisted ? Colors.error : Colors.white}
          />
        </Pressable>
      </View>

      <View style={styles.info}>
        <View style={styles.highlightTag}>
          <Ionicons name="flash" size={12} color={Colors.accent} />
          <Text style={styles.highlightTagText}>Highlight of the Day</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <RatingStars rating={product.rating} size={14} />
        <View style={styles.priceRow}>
          <Text style={styles.salePrice}>${product.price.toFixed(2)}</Text>
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
    width: 280,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginRight: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.accent,
    ...Shadows.card,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.sm,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 0.6,
  },
  wishlistButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    padding: Spacing.md,
  },
  highlightTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.xs,
  },
  highlightTagText: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    ...Typography.body,
    fontWeight: '700',
    marginBottom: Spacing.xs,
    lineHeight: 22,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  salePrice: {
    ...Typography.price,
    fontSize: 20,
    color: Colors.primary,
  },
  originalPrice: {
    ...Typography.bodySmall,
    textDecorationLine: 'line-through',
    color: Colors.textLight,
  },
});
