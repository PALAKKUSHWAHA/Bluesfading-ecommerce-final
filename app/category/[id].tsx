import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ProductCard from '@/components/ProductCard';
import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { getCategoryName } from '@/data/categories';
import {
  getProductsByCategory,
  sortProducts,
} from '@/data/products';
import { SortOption } from '@/types';

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Top Rated', value: 'rating' },
];

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [sort, setSort] = useState<SortOption>('default');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const categoryName = getCategoryName(id ?? '');
  const products = useMemo(() => {
    const items = getProductsByCategory(id ?? '');
    return sortProducts(items, sort);
  }, [id, sort]);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label ?? 'Default';

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={categoryName}
        showBack
        onBack={() => router.back()}
      />

      <View style={styles.filterBar}>
        <Text style={styles.resultCount}>
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </Text>
        <Pressable
          style={styles.sortButton}
          onPress={() => setShowSortMenu(!showSortMenu)}>
          <Text style={styles.sortText}>{currentSortLabel}</Text>
          <Text style={styles.sortIcon}>▼</Text>
        </Pressable>
      </View>

      {showSortMenu && (
        <View style={styles.sortMenu}>
          {SORT_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              style={[
                styles.sortOption,
                sort === option.value && styles.sortOptionActive,
              ]}
              onPress={() => {
                setSort(option.value);
                setShowSortMenu(false);
              }}>
              <Text
                style={[
                  styles.sortOptionText,
                  sort === option.value && styles.sortOptionTextActive,
                ]}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No products in this category yet.</Text>
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
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  resultCount: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sortText: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: Spacing.xs,
  },
  sortIcon: {
    fontSize: 10,
    color: Colors.primary,
  },
  sortMenu: {
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  sortOption: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sortOptionActive: {
    backgroundColor: Colors.background,
  },
  sortOptionText: {
    ...Typography.bodySmall,
  },
  sortOptionTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
  },
  empty: {
    ...Typography.bodySmall,
    textAlign: 'center',
    paddingVertical: Spacing.xxl,
  },
});
