import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';
import { CATEGORY_CARD_SIZE } from '@/constants/layout';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
  selected?: boolean;
}

export default function CategoryCard({
  category,
  onPress,
  selected = false,
}: CategoryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}>
      <View style={[styles.imageWrapper, selected && styles.imageWrapperSelected]}>
        <Image
          source={{ uri: category.imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      </View>
      <Text
        style={[styles.name, selected && styles.nameSelected]}
        numberOfLines={2}>
        {category.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: CATEGORY_CARD_SIZE + 16,
    marginRight: Spacing.md,
  },
  selected: {
    opacity: 1,
  },
  pressed: {
    opacity: 0.8,
  },
  imageWrapper: {
    width: CATEGORY_CARD_SIZE,
    height: CATEGORY_CARD_SIZE,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  imageWrapperSelected: {
    borderColor: Colors.accent,
    borderWidth: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    ...Typography.caption,
    textAlign: 'center',
    marginTop: Spacing.sm,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  nameSelected: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
