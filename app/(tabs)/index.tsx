import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import BannerCarousel from '@/components/BannerCarousel';
import CategoryCard from '@/components/CategoryCard';
import HighlightCard from '@/components/HighlightCard';
import ProductCard from '@/components/ProductCard';
import ScreenHeader from '@/components/ScreenHeader';
import SearchBar from '@/components/SearchBar';
import SearchSuggestions from '@/components/SearchSuggestions';
import FilterModal, { FilterState } from '@/components/FilterModal';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { banners } from '@/data/banners';
import { categories } from '@/data/categories';
import { collections } from '@/data/collections';
import { inspirations } from '@/data/inspirations';
import { products, getProductById } from '@/data/products';
import { useApp } from '@/hooks/useAppContext';
import { Product } from '@/types';

const INITIAL_FILTERS: FilterState = {
  categories: [],
  minPrice: '',
  maxPrice: '',
  rating: null,
  newArrivals: false,
  bestSellers: false,
  trending: false,
  sortBy: 'default',
};

export default function HomeScreen() {
  const router = useRouter();
  const { searchQuery, setSearchQuery, addToRecentSearches, recentlyViewed } = useApp();

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({ ...INITIAL_FILTERS });
  const [searchFocused, setSearchFocused] = useState(false);

  // Compute active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeFilters.categories.length > 0) count++;
    if (activeFilters.minPrice) count++;
    if (activeFilters.maxPrice) count++;
    if (activeFilters.rating) count++;
    if (activeFilters.newArrivals) count++;
    if (activeFilters.bestSellers) count++;
    if (activeFilters.trending) count++;
    if (activeFilters.sortBy !== 'default') count++;
    return count;
  }, [activeFilters]);

  // Combined Search & Advanced Filtration logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search Query filter
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.replace(/-/g, ' ').includes(query)
      );
    }

    // Category filter
    if (activeFilters.categories.length > 0) {
      result = result.filter((p) => activeFilters.categories.includes(p.category));
    }

    // Price filters
    if (activeFilters.minPrice) {
      const min = parseFloat(activeFilters.minPrice);
      if (!isNaN(min)) {
        result = result.filter((p) => p.price >= min);
      }
    }
    if (activeFilters.maxPrice) {
      const max = parseFloat(activeFilters.maxPrice);
      if (!isNaN(max)) {
        result = result.filter((p) => p.price <= max);
      }
    }

    // Rating filter
    if (activeFilters.rating) {
      result = result.filter((p) => p.rating >= activeFilters.rating!);
    }

    // New arrivals, Best sellers, Trending flags
    if (activeFilters.newArrivals) {
      result = result.filter((p) => p.isNew);
    }
    if (activeFilters.trending) {
      result = result.filter((p) => p.trending);
    }
    if (activeFilters.bestSellers) {
      result = result.filter((p) => p.rating >= 4.8);
    }

    // Sorting
    switch (activeFilters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.rating - a.rating); // Proxy for popularity
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, activeFilters]);

  // Static homepage components extracted for visual layout structure
  const highlights = useMemo(() => products.filter((p) => p.isHighlight), []);
  const trending = useMemo(() => products.filter((p) => p.trending), []);
  const newArrivals = useMemo(() => products.filter((p) => p.isNew), []);
  const bestSellers = useMemo(() => products.filter((p) => p.rating >= 4.8).slice(0, 4), []);
  const customerFavorites = useMemo(() => products.filter((p) => p.rating >= 4.7).slice(4, 8), []);

  const recentlyViewedProducts = useMemo(() => {
    return recentlyViewed
      .map((id) => getProductById(id))
      .filter((p): p is Product => !!p);
  }, [recentlyViewed]);

  const isBrowsingFiltersOrSearch = searchQuery.trim().length > 0 || activeFiltersCount > 0;

  const navigateToProduct = (id: string) => {
    if (searchQuery) addToRecentSearches(searchQuery);
    router.push(`/product/${id}`);
  };

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters({ ...INITIAL_FILTERS });
  };

  const handleSelectSuggestion = (query: string) => {
    setSearchQuery(query);
    addToRecentSearches(query);
    setSearchFocused(false);
  };

  const handleSelectSuggestedProduct = (product: Product) => {
    addToRecentSearches(searchQuery);
    setSearchFocused(false);
    router.push(`/product/${product.id}`);
  };

  const renderSection = (title: string, data: Product[]) => (
    <View style={styles.section}>
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
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}>
        
        {/* Search & Filter Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              if (text.length > 0) setSearchFocused(true);
            }}
            onFocus={() => setSearchFocused(true)}
            onFilterPress={() => setIsFilterVisible(true)}
            hasActiveFilters={activeFiltersCount > 0}
          />
        </View>

        {/* Live Search Suggestions Overlay */}
        {searchFocused && (
          <View style={styles.suggestionsContainer}>
            <View style={styles.suggestionsHeader}>
              <Text style={styles.suggestionsTitle}>Search Assistant</Text>
              <Pressable onPress={() => setSearchFocused(false)}>
                <Text style={styles.closeSuggestions}>Close</Text>
              </Pressable>
            </View>
            <SearchSuggestions
              query={searchQuery}
              onSelectSuggestion={handleSelectSuggestion}
              onSelectProduct={handleSelectSuggestedProduct}
            />
          </View>
        )}

        {/* Filter Badges Row */}
        {activeFiltersCount > 0 && (
          <View style={styles.activeFilterRow}>
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFiltersCount} Filters Active</Text>
            </View>
            <Pressable onPress={handleClearFilters} style={styles.clearFiltersBtn}>
              <Ionicons name="trash-outline" size={14} color={Colors.error} />
              <Text style={styles.clearFiltersText}>Clear</Text>
            </Pressable>
          </View>
        )}

        {/* Conditional Browsing / Search Results Grid View */}
        {isBrowsingFiltersOrSearch ? (
          <View style={styles.section}>
            <View style={styles.resultsHeader}>
              <Text style={styles.sectionTitle}>Found Items ({filteredProducts.length})</Text>
              <Pressable onPress={handleClearFilters} style={styles.resetFiltersBtn}>
                <Text style={styles.resetFiltersText}>Reset Filters</Text>
              </Pressable>
            </View>
            
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
              <View style={styles.noResultsBlock}>
                <Ionicons name="funnel-outline" size={48} color={Colors.textLight} />
                <Text style={styles.noResults}>
                  No home décor matches. Try resetting filters or search query.
                </Text>
              </View>
            )}
          </View>
        ) : (
          /* Default Redesigned Vertical Hierarchy */
          <>
            {/* 1. Hero Banner Carousel */}
            <View style={styles.bannerContainer}>
              <BannerCarousel banners={banners} />
            </View>

            {/* 3. Shop by Category */}
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
                    onPress={() => router.push(`/category/${cat.id}`)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Highlights of the Day */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Highlights of the Day</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}>
                {highlights.map((product) => (
                  <HighlightCard
                    key={product.id}
                    product={product}
                    onPress={() => navigateToProduct(product.id)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* 4. Trending Products */}
            {renderSection('Trending Products', trending)}

            {/* 5. New Arrivals */}
            {renderSection('New Arrivals', newArrivals)}

            {/* 6. Aesthetic Collections */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Aesthetic Collections</Text>
              <View style={styles.collectionsContainer}>
                {collections.slice(0, 4).map((col) => (
                  <Pressable
                    key={col.id}
                    style={styles.collectionCard}
                    onPress={() => router.push(`/collection/${col.id}`)}
                  >
                    <Image source={{ uri: col.imageUrl }} style={styles.collectionImage} />
                    <View style={styles.collectionOverlay}>
                      <Text style={styles.collectionName}>{col.name}</Text>
                      <Text style={styles.collectionCount}>{col.productIds.length} items</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* 7. Best Sellers */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Best Sellers</Text>
              <View style={styles.grid}>
                {bestSellers.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={() => navigateToProduct(product.id)}
                  />
                ))}
              </View>
            </View>

            {/* 8. Room Inspiration Pinterest Gallery */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Room Inspiration Gallery</Text>
              <View style={styles.inspirationsContainer}>
                {inspirations.map((ins) => (
                  <Pressable
                    key={ins.id}
                    style={styles.inspirationCard}
                    onPress={() => router.push(`/inspiration/${ins.id}`)}
                  >
                    <Image source={{ uri: ins.imageUrl }} style={styles.inspirationImage} />
                    <View style={styles.inspirationOverlay}>
                      <Text style={styles.inspirationName}>{ins.title}</Text>
                      <Text style={styles.inspirationLink}>Shop the look →</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* 9. Special Offers & Promo Banners */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Special Offers</Text>
              <View style={styles.offerCard}>
                <Ionicons name="gift-outline" size={24} color={Colors.accent} />
                <View style={styles.offerMeta}>
                  <Text style={styles.offerTitle}>Flat 20% OFF Summer Sale</Text>
                  <Text style={styles.offerDesc}>Use Coupon Code: SUMMER20 at checkout</Text>
                </View>
              </View>
            </View>

            {/* 10. Customer Favorites */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Customer Favorites</Text>
              <View style={styles.grid}>
                {customerFavorites.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={() => navigateToProduct(product.id)}
                  />
                ))}
              </View>
            </View>

            {/* 11. Recently Viewed */}
            {recentlyViewedProducts.length > 0 &&
              renderSection('Recently Viewed Products', recentlyViewedProducts)}
          </>
        )}
      </ScrollView>

      {/* Advanced Filters Modal Sheet */}
      <FilterModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        currentFilters={activeFilters}
        onApply={handleApplyFilters}
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
    paddingBottom: Spacing.xl * 2, // Extra padding for Floating Cart
  },
  searchContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  suggestionsContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  suggestionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  suggestionsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  closeSuggestions: {
    fontSize: 12,
    color: Colors.accent,
    fontWeight: '600',
  },
  activeFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
  },
  filterBadge: {
    backgroundColor: 'rgba(31, 60, 136, 0.08)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs - 2,
    borderRadius: BorderRadius.full,
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  clearFiltersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clearFiltersText: {
    fontSize: 12,
    color: Colors.error,
    fontWeight: '600',
  },
  bannerContainer: {
    paddingHorizontal: Spacing.md,
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
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
  collectionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
    justifyContent: 'space-between',
  },
  collectionCard: {
    width: '47%',
    height: 120,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.card,
  },
  collectionImage: {
    width: '100%',
    height: '100%',
  },
  collectionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 26, 46, 0.45)',
    justifyContent: 'flex-end',
    padding: Spacing.sm,
  },
  collectionName: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  collectionCount: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    marginTop: 2,
  },
  inspirationsContainer: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  inspirationCard: {
    height: 200,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    ...Shadows.card,
  },
  inspirationImage: {
    width: '100%',
    height: '100%',
  },
  inspirationOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: Spacing.md,
  },
  inspirationName: {
    ...Typography.h3,
    color: Colors.white,
    fontSize: 16,
  },
  inspirationLink: {
    color: Colors.accentLight,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    gap: Spacing.md,
    ...Shadows.card,
  },
  offerMeta: {
    flex: 1,
  },
  offerTitle: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.text,
  },
  offerDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: Spacing.md,
    marginBottom: Spacing.sm,
  },
  resetFiltersBtn: {
    paddingVertical: 4,
  },
  resetFiltersText: {
    fontSize: 12,
    color: Colors.accent,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  noResultsBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.sm,
  },
  noResults: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
});
