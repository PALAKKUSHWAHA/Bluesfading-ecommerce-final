import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing } from '@/constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  hasActiveFilters?: boolean;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search décor, posters, art...',
  onFilterPress,
  onFocus,
  onBlur,
  hasActiveFilters = false,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color={Colors.textLight} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textLight}
        returnKeyType="search"
        autoCorrect={false}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} hitSlop={8} style={styles.clearBtn}>
          <Ionicons name="close-circle" size={20} color={Colors.textLight} />
        </Pressable>
      )}
      {onFilterPress && (
        <Pressable 
          onPress={onFilterPress} 
          hitSlop={8} 
          style={[styles.filterBtn, hasActiveFilters && styles.filterBtnActive]}
        >
          <Ionicons 
            name="options-outline" 
            size={20} 
            color={hasActiveFilters ? Colors.white : Colors.primary} 
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    paddingLeft: Spacing.md,
    paddingRight: Spacing.xs,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  searchIcon: {
    marginRight: Spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    paddingVertical: Spacing.sm,
  },
  clearBtn: {
    paddingHorizontal: Spacing.xs,
  },
  filterBtn: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    marginLeft: Spacing.xs,
  },
  filterBtnActive: {
    backgroundColor: Colors.primary,
  },
});
