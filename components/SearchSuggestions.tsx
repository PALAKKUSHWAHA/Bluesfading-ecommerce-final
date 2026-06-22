import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { products } from '@/data/products';
import { useApp } from '@/hooks/useAppContext';
import { Product } from '@/types';

interface SearchSuggestionsProps {
  query: string;
  onSelectSuggestion: (query: string) => void;
  onSelectProduct: (product: Product) => void;
}

export default function SearchSuggestions({
  query,
  onSelectSuggestion,
  onSelectProduct,
}: SearchSuggestionsProps) {
  const {
    recentSearches,
    removeFromRecentSearches,
    clearRecentSearches,
  } = useApp();

  const trimmedQuery = query.trim().toLowerCase();

  // Find matching products
  const suggestions = trimmedQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmedQuery) ||
          p.category.toLowerCase().includes(trimmedQuery)
      )
    : [];

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return <Text>{text}</Text>;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text style={styles.textRegular}>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={styles.textHighlight}>
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  // If query is empty, show recent searches
  if (!trimmedQuery) {
    if (recentSearches.length === 0) return null;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recent Searches</Text>
          <Pressable onPress={clearRecentSearches} hitSlop={8}>
            <Text style={styles.clearAll}>Clear All</Text>
          </Pressable>
        </View>
        <FlatList
          data={recentSearches}
          keyExtractor={(item) => item}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.recentItem}>
              <Pressable
                style={styles.recentClickable}
                onPress={() => onSelectSuggestion(item)}>
                <Ionicons name="time-outline" size={18} color={Colors.textLight} />
                <Text style={styles.recentText}>{item}</Text>
              </Pressable>
              <Pressable
                onPress={() => removeFromRecentSearches(item)}
                hitSlop={8}
                style={styles.removeItem}>
                <Ionicons name="close" size={16} color={Colors.textLight} />
              </Pressable>
            </View>
          )}
        />
      </View>
    );
  }

  // If query is present, show matching suggestions
  if (suggestions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noMatches}>No matches found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Suggestions</Text>
      <FlatList
        data={suggestions.slice(0, 8)}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <Pressable
            style={styles.suggestionItem}
            onPress={() => {
              onSelectProduct(item);
            }}>
            <Ionicons name="search-outline" size={18} color={Colors.textLight} />
            <View style={styles.suggestionTextContainer}>
              {highlightText(item.name, trimmedQuery)}
              <Text style={styles.suggestionCategory}>in {item.category.replace(/-/g, ' ')}</Text>
            </View>
            <Ionicons name="arrow-forward" size={16} color={Colors.textLight} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clearAll: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: '600',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  recentClickable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.sm,
  },
  recentText: {
    ...Typography.bodySmall,
    color: Colors.text,
  },
  removeItem: {
    padding: Spacing.xs,
  },
  noMatches: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingVertical: Spacing.md,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md - 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  suggestionTextContainer: {
    flex: 1,
  },
  textRegular: {
    ...Typography.bodySmall,
    color: Colors.text,
  },
  textHighlight: {
    fontWeight: '700',
    color: Colors.primary,
  },
  suggestionCategory: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
