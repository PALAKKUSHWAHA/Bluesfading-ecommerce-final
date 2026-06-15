import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BannerCarousel from '@/components/BannerCarousel';
import CategoryCard from '@/components/CategoryCard';
import HighlightCard from '@/components/HighlightCard';
import ProductCard from '@/components/ProductCard';
import ScreenHeader from '@/components/ScreenHeader';
import SearchBar from '@/components/SearchBar';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { banners } from '@/data/banners';
import { categories } from '@/data/categories';
import {
  getFeaturedProducts,
  getHighlightProducts,
  getNewArrivals,
  getTrendingProducts,
  searchProducts,
} from '@/data/products';
import { useApp } from '@/hooks/useAppContext';

export default function HomeScreen() {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useApp();

  const filteredProducts = useMemo(
    () => searchProducts(searchQuery),
    [searchQuery]
  );

  const featured = useMemo(() => getFeaturedProducts(), []);
  const highlights = useMemo(() => getHighlightProducts(), []);
  const trending = useMemo(() => getTrendingProducts(), []);
  const newArrivals = useMemo(() => getNewArrivals(), []);

  const isSearching = searchQuery.trim().length > 0;

  const navigateToProduct = (id: string) => router.push(`/product/${id}`);
  const navigateToCategory = (id: string) => router.push(`/category/${id}`);

  const renderSection = (title: string, data: typeof featured) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
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
              onPress={() => navigateToProduct(item.id)}
              width={160}
            />
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        showLogo
        rightIcon="person-circle-outline"
        onRightPress={() => router.push('/(tabs)/profile')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchContainer}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>

        {isSearching ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Results ({filteredProducts.length})
            </Text>
            <View style={styles.grid}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => navigateToProduct(product.id)}
                />
              ))}
            </View>
            {filteredProducts.length === 0 && (
              <Text style={styles.noResults}>
                No products found for &quot;{searchQuery}&quot;
              </Text>
            )}
          </View>
        ) : (
          <>
            <View style={styles.bannerContainer}>
              <BannerCarousel banners={banners} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shop by Category</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}>
                {categories.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    onPress={() => navigateToCategory(cat.id)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Highlights of the Day — Flat 50% Off */}
            <View style={styles.section}>
              <View style={styles.highlightHeader}>
                <View style={styles.highlightTitleBlock}>
                  <Text style={styles.highlightTitle}>Highlights of the Day</Text>
                  <Text style={styles.highlightSubtitle}>Flat 50% off — limited time</Text>
                </View>
                <View style={styles.dealBadge}>
                  <Text style={styles.dealBadgeText}>50% OFF</Text>
                </View>
              </View>
              <FlatList
                data={highlights}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.horizontalList}
                renderItem={({ item }) => (
                  <HighlightCard
                    product={item}
                    onPress={() => navigateToProduct(item.id)}
                  />
                )}
              />
            </View>

            {renderSection('Featured', featured)}
            {renderSection('Trending Now', trending)}
            {renderSection('New Arrivals', newArrivals)}
          </>
        )}
      </ScrollView>
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
  searchContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  bannerContainer: {
    paddingHorizontal: Spacing.md,
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.h3,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  highlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  highlightTitleBlock: {
    flex: 1,
  },
  highlightTitle: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  highlightSubtitle: {
    ...Typography.bodySmall,
    color: Colors.accent,
    fontWeight: '600',
  },
  dealBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.xs,
  },
  dealBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  categoryList: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  horizontalList: {
    paddingHorizontal: Spacing.md,
  },
  horizontalCard: {
    marginRight: Spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  noResults: {
    ...Typography.bodySmall,
    textAlign: 'center',
    paddingVertical: Spacing.xl,
  },
});
