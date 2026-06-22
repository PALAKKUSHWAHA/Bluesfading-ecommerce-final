import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { categories } from '@/data/categories';

export interface FilterState {
  categories: string[];
  minPrice: string;
  maxPrice: string;
  rating: number | null;
  newArrivals: boolean;
  bestSellers: boolean;
  trending: boolean;
  sortBy: 'default' | 'price-low' | 'price-high' | 'rating' | 'popular' | 'newest';
}

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

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  currentFilters: FilterState;
  onApply: (filters: FilterState) => void;
}

export default function FilterModal({
  visible,
  onClose,
  currentFilters,
  onApply,
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>({ ...currentFilters });

  const toggleCategory = (catId: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(catId)
        ? prev.categories.filter((id) => id !== catId)
        : [...prev.categories, catId],
    }));
  };

  const handleReset = () => {
    setFilters({ ...INITIAL_FILTERS });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const ratingOptions = [4.5, 4.0, 3.5, 3.0];
  const sortOptions: { id: FilterState['sortBy']; label: string }[] = [
    { id: 'default', label: 'Recommended' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'newest', label: 'Newest First' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={onClose} hitSlop={8} style={styles.headerBtn}>
              <Ionicons name="close" size={24} color={Colors.text} />
            </Pressable>
            <Text style={styles.headerTitle}>Filters & Sort</Text>
            <Pressable onPress={handleReset} hitSlop={8} style={styles.headerBtn}>
              <Text style={styles.resetText}>Reset</Text>
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* Sort Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.sortGrid}>
                {sortOptions.map((opt) => (
                  <Pressable
                    key={opt.id}
                    style={[
                      styles.sortOption,
                      filters.sortBy === opt.id && styles.sortOptionActive,
                    ]}
                    onPress={() => setFilters({ ...filters, sortBy: opt.id })}>
                    <Text
                      style={[
                        styles.sortLabel,
                        filters.sortBy === opt.id && styles.sortLabelActive,
                      ]}>
                      {opt.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <View style={styles.chipGrid}>
                {categories.map((cat) => {
                  const isSelected = filters.categories.includes(cat.id);
                  return (
                    <Pressable
                      key={cat.id}
                      style={[
                        styles.chip,
                        isSelected && styles.chipActive,
                      ]}
                      onPress={() => toggleCategory(cat.id)}>
                      <Text
                        style={[
                          styles.chipLabel,
                          isSelected && styles.chipLabelActive,
                        ]}>
                        {cat.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Price Range */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <View style={styles.priceRow}>
                <TextInput
                  style={styles.priceInput}
                  placeholder="Min ($)"
                  placeholderTextColor={Colors.textLight}
                  keyboardType="numeric"
                  value={filters.minPrice}
                  onChangeText={(v) => setFilters({ ...filters, minPrice: v })}
                />
                <View style={styles.priceSeparator} />
                <TextInput
                  style={styles.priceInput}
                  placeholder="Max ($)"
                  placeholderTextColor={Colors.textLight}
                  keyboardType="numeric"
                  value={filters.maxPrice}
                  onChangeText={(v) => setFilters({ ...filters, maxPrice: v })}
                />
              </View>
            </View>

            {/* Rating Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Minimum Rating</Text>
              <View style={styles.chipGrid}>
                {ratingOptions.map((val) => {
                  const isSelected = filters.rating === val;
                  return (
                    <Pressable
                      key={val}
                      style={[
                        styles.chip,
                        isSelected && styles.chipActive,
                      ]}
                      onPress={() =>
                        setFilters({
                          ...filters,
                          rating: isSelected ? null : val,
                        })
                      }>
                      <Ionicons
                        name="star"
                        size={14}
                        color={isSelected ? Colors.white : Colors.accent}
                        style={styles.starIcon}
                      />
                      <Text
                        style={[
                          styles.chipLabel,
                          isSelected && styles.chipLabelActive,
                        ]}>
                        {val}+ Stars
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Status Flags */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Collections & Status</Text>
              <View style={styles.flagRow}>
                <Pressable
                  style={[
                    styles.flagButton,
                    filters.newArrivals && styles.flagButtonActive,
                  ]}
                  onPress={() =>
                    setFilters({ ...filters, newArrivals: !filters.newArrivals })
                  }>
                  <Text
                    style={[
                      styles.flagLabel,
                      filters.newArrivals && styles.flagLabelActive,
                    ]}>
                    ✨ New Arrivals
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.flagButton,
                    filters.trending && styles.flagButtonActive,
                  ]}
                  onPress={() =>
                    setFilters({ ...filters, trending: !filters.trending })
                  }>
                  <Text
                    style={[
                      styles.flagLabel,
                      filters.trending && styles.flagLabelActive,
                    ]}>
                    🔥 Trending
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.flagButton,
                    filters.bestSellers && styles.flagButtonActive,
                  ]}
                  onPress={() =>
                    setFilters({ ...filters, bestSellers: !filters.bestSellers })
                  }>
                  <Text
                    style={[
                      styles.flagLabel,
                      filters.bestSellers && styles.flagLabelActive,
                    ]}>
                    🏆 Best Sellers
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            <CustomButton
              title="Apply Filters"
              onPress={handleApply}
              variant="primary"
              size="lg"
              fullWidth
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 46, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    height: '80%',
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
  },
  headerTitle: {
    ...Typography.h3,
    fontSize: 18,
  },
  headerBtn: {
    minWidth: 50,
    alignItems: 'center',
  },
  resetText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  sortGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  sortOption: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  sortOptionActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  sortLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  sortLabelActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm - 2,
    paddingHorizontal: Spacing.md - 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipLabel: {
    ...Typography.caption,
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  chipLabelActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  starIcon: {
    marginRight: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 14,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  priceSeparator: {
    width: 10,
    height: 1,
    backgroundColor: Colors.textLight,
  },
  flagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  flagButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  flagButtonActive: {
    backgroundColor: 'rgba(31, 60, 136, 0.08)',
    borderColor: Colors.primary,
  },
  flagLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  flagLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
