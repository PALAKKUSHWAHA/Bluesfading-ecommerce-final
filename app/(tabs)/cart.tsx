import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import EmptyStatePremium from '@/components/EmptyStatePremium';
import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/hooks/useAppContext';

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateCartQuantity, removeFromCart, cartTotal } = useApp();

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Cart" />
        <EmptyStatePremium
          icon="bag-outline"
          title="Your Cart is Empty"
          message="Discover premium, aesthetic home décor items and fill your home with style."
          actionLabel="Start Shopping"
          onAction={() => router.push('/(tabs)')}
        />
      </View>
    );
  }

  const shipping = cartTotal > 75 ? 0 : 5.99;
  const total = cartTotal + shipping;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Cart" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {cart.map((item) => (
          <View key={item.product.id} style={styles.cartItem}>
            <Pressable onPress={() => router.push(`/product/${item.product.id}`)}>
              <Image
                source={{ uri: item.product.imageUrl }}
                style={styles.itemImage}
                contentFit="cover"
              />
            </Pressable>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.itemPrice}>
                ${item.product.price.toFixed(2)}
              </Text>
              <View style={styles.quantityRow}>
                <Pressable
                  style={styles.qtyButton}
                  onPress={() =>
                    updateCartQuantity(item.product.id, item.quantity - 1)
                  }>
                  <Ionicons name="remove" size={18} color={Colors.primary} />
                </Pressable>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <Pressable
                  style={styles.qtyButton}
                  onPress={() =>
                    updateCartQuantity(item.product.id, item.quantity + 1)
                  }>
                  <Ionicons name="add" size={18} color={Colors.primary} />
                </Pressable>
              </View>
            </View>
            <Pressable
              onPress={() => removeFromCart(item.product.id)}
              hitSlop={8}
              style={styles.removeButton}>
              <Ionicons name="trash-outline" size={20} color={Colors.error} />
            </Pressable>
          </View>
        ))}

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${cartTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </Text>
          </View>
          {shipping > 0 && (
            <Text style={styles.freeShippingHint}>
              Add ${(75 - cartTotal).toFixed(2)} more for free shipping
            </Text>
          )}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title={`Checkout · $${total.toFixed(2)}`}
          onPress={() => router.push('/checkout')}
          variant="primary"
          size="lg"
          fullWidth
          icon="card-outline"
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
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
    ...Shadows.card,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
  },
  itemInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  itemName: {
    ...Typography.bodySmall,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  itemPrice: {
    ...Typography.price,
    fontSize: 16,
    marginBottom: Spacing.sm,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  qtyText: {
    ...Typography.body,
    fontWeight: '600',
    marginHorizontal: Spacing.md,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: Spacing.sm,
  },
  summary: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  summaryTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    ...Typography.bodySmall,
  },
  summaryValue: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  freeShippingHint: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  totalLabel: {
    ...Typography.body,
    fontWeight: '700',
  },
  totalValue: {
    ...Typography.price,
    fontSize: 20,
  },
  footer: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
