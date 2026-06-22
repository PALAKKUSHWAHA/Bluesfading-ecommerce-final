import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import EmptyStatePremium from '@/components/EmptyStatePremium';
import ProductCard from '@/components/ProductCard';
import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/theme';
import { getProductById } from '@/data/products';
import { useApp } from '@/hooks/useAppContext';

export default function WishlistScreen() {
  const router = useRouter();
  const { wishlist } = useApp();

  const wishlistProducts = wishlist
    .map((id) => getProductById(id))
    .filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Wishlist" />
        <EmptyStatePremium
          icon="heart-outline"
          title="Your Wishlist is Empty"
          message="Save your favorite aesthetic home décor items and view them anytime."
          actionLabel="Explore Collections"
          onAction={() => router.push('/(tabs)')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Wishlist" />
      <FlatList
        data={wishlistProducts}
        numColumns={2}
        keyExtractor={(item) => item!.id}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            product={item!}
            onPress={() => router.push(`/product/${item!.id}`)}
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
  list: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
  },
});
