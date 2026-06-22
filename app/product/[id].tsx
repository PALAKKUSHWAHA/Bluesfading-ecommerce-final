import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState, useMemo } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';

import CustomButton from '@/components/CustomButton';
import RatingStars from '@/components/RatingStars';
import ScreenHeader from '@/components/ScreenHeader';
import ImageViewerModal from '@/components/ImageViewerModal';
import ProductCard from '@/components/ProductCard';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { getCategoryName } from '@/data/categories';
import { getProductById, products } from '@/data/products';
import { getReviewsByProductId, getRatingStats } from '@/data/reviews';
import { useApp } from '@/hooks/useAppContext';
import { getProductImageSource, hasDiscount, Product } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = getProductById(id ?? '');
  const { isInWishlist, toggleWishlist, addToCart, addToRecentlyViewed } = useApp();
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isViewerVisible, setIsViewerVisible] = useState(false);

  // Animations
  const cartScale = useSharedValue(1);
  const wishlistScale = useSharedValue(1);

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product, addToRecentlyViewed]);

  const reviews = useMemo(() => {
    return product ? getReviewsByProductId(product.id) : [];
  }, [product]);

  const ratingStats = useMemo(() => {
    return getRatingStats(reviews);
  }, [reviews]);

  if (!product) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Product" showBack onBack={() => router.back()} />
        <Text style={styles.notFound}>Product not found</Text>
      </View>
    );
  }

  const images = product.images?.filter(Boolean) ?? [];
  const galleryImages = images.length > 0 
    ? images.map(img => ({ uri: img })) 
    : [getProductImageSource(product)];

  const hasGallery = galleryImages.length > 1;
  const wishlisted = isInWishlist(product.id);
  const onSale = hasDiscount(product);

  // Recommendations logic
  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const frequentlyBought = products
    .filter((p) => p.id !== product.id)
    .slice(0, 2); // Quick complementary mock items

  const youMayAlsoLike = products
    .filter((p) => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  const handleBuyNow = () => {
    addToCart(product, 1);
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    // Pulse animation
    cartScale.value = withSequence(
      withSpring(1.2),
      withSpring(1.0)
    );
    addToCart(product, 1);
    Alert.alert('Added to Cart', `${product.name} has been added to your cart.`);
  };

  const handleToggleWishlist = () => {
    wishlistScale.value = withSequence(
      withSpring(1.3),
      withSpring(1.0)
    );
    toggleWishlist(product);
  };

  const animatedCartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartScale.value }],
  }));

  const animatedWishlistStyle = useAnimatedStyle(() => ({
    transform: [{ scale: wishlistScale.value }],
  }));

  const renderRecommendationRow = (title: string, data: Product[]) => {
    if (data.length === 0) return null;
    return (
      <View style={styles.recommendationSection}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <View style={styles.horizontalCard}>
              <ProductCard
                product={item}
                onPress={() => {
                  setActiveImageIndex(0);
                  router.push(`/product/${item.id}`);
                }}
                width={150}
              />
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader showBack onBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Image gallery */}
        <View style={styles.gallery}>
          <Pressable onPress={() => setIsViewerVisible(true)}>
            <Image
              source={galleryImages[activeImageIndex]}
              style={styles.mainImage}
              contentFit="cover"
              transition={200}
            />
          </Pressable>
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
              {galleryImages.map((src, index) => (
                <Pressable key={index} onPress={() => setActiveImageIndex(index)}>
                  <Image
                    source={src}
                    style={[
                      styles.thumbnail,
                      index === activeImageIndex && styles.thumbnailActive,
                    ]}
                    contentFit="cover"
                  />
                </Pressable>
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

          <View style={styles.divider} />

          {/* Rating Distribution & Reviews Section */}
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          
          {/* Stats Summary */}
          <View style={styles.reviewsSummaryRow}>
            <View style={styles.avgRatingBlock}>
              <Text style={styles.avgRatingText}>{ratingStats.average}</Text>
              <RatingStars rating={ratingStats.average} size={16} />
              <Text style={styles.totalReviewsText}>{ratingStats.count} Reviews</Text>
            </View>
            <View style={styles.distributionBlock}>
              {ratingStats.distribution.map((percent, index) => {
                const starNum = 5 - index;
                return (
                  <View key={starNum} style={styles.distRow}>
                    <Text style={styles.distLabel}>{starNum} ★</Text>
                    <View style={styles.progressBarBg}>
                      <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
                    </View>
                    <Text style={styles.distPercent}>{percent}%</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Reviews List */}
          <View style={styles.reviewsList}>
            {reviews.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUser}>{rev.userName}</Text>
                  <Text style={styles.reviewDate}>{rev.date}</Text>
                </View>
                <View style={styles.reviewStarsRow}>
                  <RatingStars rating={rev.rating} size={12} />
                </View>
                <Text style={styles.reviewComment}>{rev.comment}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Recommendations rows */}
          {renderRecommendationRow('Similar Products', similarProducts)}
          {renderRecommendationRow('Frequently Bought Together', frequentlyBought)}
          {renderRecommendationRow('You May Also Like', youMayAlsoLike)}

        </View>
      </ScrollView>

      {/* Footer controls */}
      <View style={styles.footer}>
        <Animated.View style={[styles.wishlistBtnWrapper, animatedWishlistStyle]}>
          <CustomButton
            title={wishlisted ? 'Wishlisted' : 'Wishlist'}
            onPress={handleToggleWishlist}
            variant={wishlisted ? 'secondary' : 'outline'}
            size="md"
            icon={wishlisted ? 'heart' : 'heart-outline'}
          />
        </Animated.View>
        <View style={styles.actionButtons}>
          <Animated.View style={[styles.flexButton, animatedCartStyle]}>
            <CustomButton
              title="Add to Cart"
              onPress={handleAddToCart}
              variant="secondary"
              size="md"
              icon="bag-add-outline"
              fullWidth
            />
          </Animated.View>
          <View style={styles.flexButton}>
            <CustomButton
              title="Buy Now"
              onPress={handleBuyNow}
              variant="accent"
              size="md"
              icon="flash-outline"
              fullWidth
            />
          </View>
        </View>
      </View>

      {/* Full screen image viewer */}
      <ImageViewerModal
        visible={isViewerVisible}
        onClose={() => setIsViewerVisible(false)}
        images={galleryImages}
        initialIndex={activeImageIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
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
    marginVertical: Spacing.lg,
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
  reviewsSummaryRow: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avgRatingBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    paddingRight: Spacing.sm,
  },
  avgRatingText: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.text,
  },
  totalReviewsText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  distributionBlock: {
    flex: 1,
    paddingLeft: Spacing.md,
    gap: 4,
  },
  distRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
    width: 24,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    marginHorizontal: Spacing.xs,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 3,
  },
  distPercent: {
    fontSize: 11,
    color: Colors.textLight,
    width: 28,
    textAlign: 'right',
  },
  reviewsList: {
    gap: Spacing.md,
  },
  reviewCard: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  reviewUser: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.text,
  },
  reviewDate: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  reviewStarsRow: {
    marginBottom: Spacing.xs,
  },
  reviewComment: {
    ...Typography.bodySmall,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  recommendationSection: {
    marginTop: Spacing.md,
  },
  horizontalList: {
    paddingTop: Spacing.sm,
    gap: Spacing.md,
  },
  horizontalCard: {
    marginRight: Spacing.sm,
  },
  footer: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  wishlistBtnWrapper: {
    marginBottom: Spacing.sm,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  flexButton: {
    flex: 1,
  },
  notFound: {
    ...Typography.body,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});
