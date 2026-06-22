import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';

import ProductCard from '@/components/ProductCard';
import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { getCollectionById } from '@/data/collections';
import { getProductById } from '@/data/products';

export default function CollectionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const collection = getCollectionById(id ?? '');

  const collectionProducts = useMemo(() => {
    if (!collection) return [];
    return collection.productIds
      .map((pid) => getProductById(pid))
      .filter((p): p is NonNullable<typeof p> => !!p);
  }, [collection]);

  if (!collection) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Collection" showBack onBack={() => router.back()} />
        <Text style={styles.notFound}>Collection not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={collection.name}
        showBack
        onBack={() => router.back()}
      />

      <FlatList
        data={collectionProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerSection}>
            <Image
              source={{ uri: collection.imageUrl }}
              style={styles.bannerImage}
              contentFit="cover"
            />
            <View style={styles.overlay}>
              <Text style={styles.bannerTitle}>{collection.name}</Text>
              <Text style={styles.bannerDescription}>{collection.description}</Text>
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Curated Décor ({collectionProducts.length})</Text>
            </View>
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
  listContent: {
    paddingBottom: Spacing.xl,
  },
  headerSection: {
    marginBottom: Spacing.md,
    backgroundColor: Colors.white,
    ...Shadows.card,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 180,
  },
  overlay: {
    padding: Spacing.md,
    backgroundColor: Colors.white,
  },
  bannerTitle: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  bannerDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  sectionTitle: {
    ...Typography.h3,
    fontSize: 16,
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
