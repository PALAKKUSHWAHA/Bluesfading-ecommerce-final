import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';

import CustomButton from '@/components/CustomButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const GRID_ITEMS_LEFT = [
  { id: '1', source: require('@/assets/products/blue-collage.jpg'), height: 240 },
  { id: '2', source: { uri: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80' }, height: 160 },
  { id: '3', source: { uri: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80' }, height: 210 },
  { id: '4', source: require('@/assets/products/moonlight-mischief-highlight.png'), height: 170 },
];

const GRID_ITEMS_RIGHT = [
  { id: '5', source: require('@/assets/products/spirited-away-highlight.png'), height: 180 },
  { id: '6', source: { uri: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80' }, height: 250 },
  { id: '7', source: { uri: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80' }, height: 150 },
  { id: '8', source: { uri: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80' }, height: 220 },
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 1. Staggered Masonry Grid Background */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridScrollContent}
        style={styles.gridScroll}>
        <View style={styles.gridContainer}>
          {/* Left Column */}
          <View style={styles.column}>
            {GRID_ITEMS_LEFT.map((item) => (
              <View key={item.id} style={[styles.gridCard, { height: item.height }]}>
                <Image source={item.source} style={styles.gridImage} contentFit="cover" />
              </View>
            ))}
          </View>
          {/* Right Column */}
          <View style={styles.column}>
            {GRID_ITEMS_RIGHT.map((item) => (
              <View key={item.id} style={[styles.gridCard, { height: item.height }]}>
                <Image source={item.source} style={styles.gridImage} contentFit="cover" />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 2. Bottom Sheet containing Brand Title & Explore button */}
      <View style={styles.overlaySheet}>
        <View style={styles.brandContainer}>
          <Text style={styles.appName}>Bluesfading</Text>
          <View style={styles.accentLine} />
          <Text style={styles.tagline}>
            Aesthetic home decor & curated inspiration for your ideal space.
          </Text>
        </View>

        <CustomButton
          title="Explore Now"
          onPress={() => router.replace('/(tabs)')}
          variant="accent"
          size="lg"
          icon="arrow-forward"
          fullWidth
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gridScroll: {
    flex: 1,
  },
  gridScrollContent: {
    paddingTop: Spacing.xl,
    paddingBottom: SCREEN_HEIGHT * 0.45,
  },
  gridContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  column: {
    flex: 1,
    gap: Spacing.md,
  },
  gridCard: {
    borderRadius: BorderRadius.xl, // 24px rounded corners
    overflow: 'hidden',
    backgroundColor: Colors.card,
    ...Shadows.card,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  overlaySheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(232, 236, 239, 0.94)', // Platinum translucent background
    borderTopLeftRadius: BorderRadius.xl + 4,
    borderTopRightRadius: BorderRadius.xl + 4,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    borderTopWidth: 1.5,
    borderTopColor: Colors.border,
    ...Shadows.card,
  },
  brandContainer: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  appName: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.accent, // Midnight Blue app name
    letterSpacing: -1,
    marginBottom: Spacing.xs,
  },
  accentLine: {
    width: 50,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
  },
  tagline: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 15,
  },
  button: {
    borderRadius: BorderRadius.xl,
  },
});
