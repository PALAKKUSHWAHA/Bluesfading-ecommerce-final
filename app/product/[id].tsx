import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import RatingStars from '@/components/RatingStars';
import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { getCategoryName } from '@/data/categories';
import { getProductById } from '@/data/products';
import { useApp } from '@/hooks/useAppContext';
import { getProductImageSource, hasDiscount } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = getProductById(id ?? '');
  const { isInWishlist, toggleWishlist, addToCart } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Product" showBack onBack={() => router.back()} />
        <Text style={styles.notFound}>Product not found</Text>
      </View>
    );
  }

  const images = product.images?.filter(Boolean) ?? [];
  const hasGallery = images.length > 1;
  const wishlisted = isInWishlist(product.id);
  const onSale = hasDiscount(product);

  const handleBuyNow = () => {
    addToCart(product, 1);
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    Alert.alert('Added to Cart', `${product.name} has been added to your cart.`);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader showBack onBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Image gallery */}
        <View style={styles.gallery}>
          <Image
            source={getProductImageSource(product)}
            style={styles.mainImage}
            contentFit="cover"
            transition={200}
          />
          {onSale && (
            <View style={styles.saleBanner}>
              <Text style={styles.saleBannerText}>
                FLAT {product.discountPercent}% OFF — Highlight of the Day
              </Text>
            </View>
          )}
          {hasGallery && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnails}>
              {images.map((uri, index) => (
                <Image
                  key={index}
                  source={{ uri }}
                  style={[
                    styles.thumbnail,
                    index === activeImageIndex && styles.thumbnailActive,
                  ]}
                  contentFit="cover"
                  onTouchEnd={() => setActiveImageIndex(index)}
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.category}>
            {getCategoryName(product.category)}
          </Text>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.ratingRow}>
            <RatingStars rating={product.rating} size={18} />
            <Text style={styles.ratingText}>({product.rating})</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {onSale && product.originalPrice != null && (
              <>
                <Text style={styles.originalPrice}>
                  ${product.originalPrice.toFixed(2)}
                </Text>
                <View style={styles.saveBadge}>
                  <Text style={styles.saveBadgeText}>
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Text>
                </View>
              </>
            )}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Features</Text>
          {product.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={18} color={Colors.accent} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title={wishlisted ? 'Wishlisted' : 'Wishlist'}
          onPress={() => toggleWishlist(product)}
          variant={wishlisted ? 'secondary' : 'outline'}
          size="md"
          icon={wishlisted ? 'heart' : 'heart-outline'}
          style={styles.wishlistBtn}
        />
        <View style={styles.actionButtons}>
          <CustomButton
            title="Add to Cart"
            onPress={handleAddToCart}
            variant="secondary"
            size="md"
            icon="bag-add-outline"
            style={styles.cartBtn}
          />
          <CustomButton
            title="Buy Now"
            onPress={handleBuyNow}
            variant="accent"
            size="md"
            icon="flash-outline"
            style={styles.buyBtn}
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
  scrollContent: {
    paddingBottom: Spacing.md,
  },
  gallery: {
    backgroundColor: Colors.white,
    position: 'relative',
  },
  saleBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  saleBannerText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  mainImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.85,
  },
  thumbnails: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailActive: {
    borderColor: Colors.accent,
  },
  details: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    marginTop: Spacing.sm,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    ...Shadows.card,
  },
  category: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  name: {
    ...Typography.h2,
    marginBottom: Spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  ratingText: {
    ...Typography.bodySmall,
    marginLeft: Spacing.sm,
  },
  price: {
    ...Typography.price,
    fontSize: 28,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  originalPrice: {
    ...Typography.body,
    textDecorationLine: 'line-through',
    color: Colors.textLight,
  },
  saveBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  saveBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    fontSize: 17,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  description: {
    ...Typography.bodySmall,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featureText: {
    ...Typography.bodySmall,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  footer: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  wishlistBtn: {
    marginBottom: Spacing.sm,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  cartBtn: {
    flex: 1,
  },
  buyBtn: {
    flex: 1,
  },
  notFound: {
    ...Typography.body,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});
