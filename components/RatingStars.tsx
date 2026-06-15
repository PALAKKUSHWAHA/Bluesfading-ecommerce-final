import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';
import { Spacing, Typography } from '@/constants/theme';

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export default function RatingStars({
  rating,
  size = 14,
  showValue = true,
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }).map((_, i) => {
        let iconName: keyof typeof Ionicons.glyphMap = 'star-outline';
        if (i < fullStars) iconName = 'star';
        else if (i === fullStars && hasHalf) iconName = 'star-half';

        return (
          <Ionicons
            key={i}
            name={iconName}
            size={size}
            color={Colors.accent}
            style={styles.star}
          />
        );
      })}
      {showValue && (
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 1,
  },
  ratingText: {
    ...Typography.caption,
    marginLeft: Spacing.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
