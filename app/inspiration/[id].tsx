import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import ProductCard from '@/components/ProductCard';
import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { getInspirationById, ProductTag } from '@/data/inspirations';
import { getProductById } from '@/data/products';
import { Product } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_WIDTH * 1.1; // Portrait ratio

export default function InspirationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const inspiration = getInspirationById(id ?? '');
  const [selectedTag, setSelectedTag] = useState<ProductTag | null>(null);

  const taggedProducts = useMemo(() => {
    if (!inspiration) return [];
    return inspiration.tags
      .map((tag) => getProductById(tag.productId))
      .filter((p): p is NonNullable<typeof p> => !!p);
  }, [inspiration]);

  const selectedProduct = useMemo(() => {
    if (!selectedTag) return null;
    return getProductById(selectedTag.productId) || null;
  }, [selectedTag]);

  if (!inspiration) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Inspiration" showBack onBack={() => router.back()} />
        <Text style={styles.notFound}>Inspiration not found</Text>
      </View>
    );
  }

  const handleTagPress = (tag: ProductTag) => {
    if (selectedTag && selectedTag.productId === tag.productId) {
      setSelectedTag(null); // Toggle off
    } else {
      setSelectedTag(tag);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Shop the Look" showBack onBack={() => router.back()} />

      <FlatList
        data={taggedProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>{inspiration.title}</Text>
            <Text style={styles.description}>{inspiration.description}</Text>

            {/* Interactive tag image container */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: inspiration.imageUrl }}
                style={styles.roomImage}
                contentFit="cover"
              />
              
              {/* Render Pins */}
              {inspiration.tags.map((tag) => {
                const isActive = selectedTag?.productId === tag.productId;
                return (
                  <Pressable
                    key={tag.productId}
                    onPress={() => handleTagPress(tag)}
                    style={[
                      styles.pinDot,
                      { left: `${tag.x}%`, top: `${tag.y}%` },
                      isActive && styles.pinDotActive,
                    ]}
                  >
                    <Ionicons name="pricetag" size={12} color={Colors.white} />
                  </Pressable>
                );
              })}

              {/* Tag Info Card Overlay */}
              {selectedProduct && selectedTag && (
                <Pressable
                  style={[
                    styles.infoCard,
                    {
                      left: selectedTag.x > 50 ? undefined : '5%',
                      right: selectedTag.x > 50 ? '5%' : undefined,
                      top: selectedTag.y > 60 ? '15%' : '65%',
                    },
                  ]}
                  onPress={() => router.push(`/product/${selectedProduct.id}`)}
                >
                  <Image source={{ uri: selectedProduct.imageUrl }} style={styles.cardImage} />
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardName} numberOfLines={1}>
                      {selectedProduct.name}
                    </Text>
                    <Text style={styles.cardPrice}>
                      ${selectedProduct.price.toFixed(2)}
                    </Text>
                    <Text style={styles.cardView}>View Details →</Text>
                  </View>
                </Pressable>
              )}
            </View>

            <Text style={styles.sectionTitle}>Featured Items</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/product/${item.id}`)}
          />
        )}
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
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  title: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  roomImage: {
    width: '100%',
    height: '100%',
  },
  pinDot: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    borderWidth: 2.5,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -14, // Center aligning
    marginTop: -14,
    ...Shadows.button,
  },
  pinDotActive: {
    backgroundColor: Colors.accent,
    transform: [{ scale: 1.2 }],
  },
  infoCard: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.55,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadows.card,
  },
  cardImage: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  cardPrice: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
    marginVertical: 2,
  },
  cardView: {
    fontSize: 10,
    color: Colors.accent,
    fontWeight: '700',
  },
  sectionTitle: {
    ...Typography.h3,
    fontSize: 18,
    marginBottom: Spacing.sm,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  notFound: {
    ...Typography.body,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});
