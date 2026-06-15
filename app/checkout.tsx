import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/hooks/useAppContext';

type PaymentMethod = 'card' | 'paypal' | 'apple';

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: 'card', label: 'Credit / Debit Card', icon: 'card-outline' },
  { id: 'paypal', label: 'PayPal', icon: 'logo-paypal' },
  { id: 'apple', label: 'Apple Pay', icon: 'logo-apple' },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const shipping = cartTotal > 75 ? 0 : 5.99;
  const total = cartTotal + shipping;

  const handlePlaceOrder = () => {
    if (!address.fullName || !address.street || !address.city) {
      Alert.alert('Missing Information', 'Please fill in your shipping address.');
      return;
    }
    Alert.alert(
      'Order Placed!',
      `Thank you for your order of $${total.toFixed(2)}. Your décor is on its way!`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            router.replace('/(tabs)');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Checkout"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Shipping Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={Colors.textLight}
              value={address.fullName}
              onChangeText={(v) => setAddress({ ...address, fullName: v })}
            />
            <TextInput
              style={styles.input}
              placeholder="Street Address"
              placeholderTextColor={Colors.textLight}
              value={address.street}
              onChangeText={(v) => setAddress({ ...address, street: v })}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="City"
                placeholderTextColor={Colors.textLight}
                value={address.city}
                onChangeText={(v) => setAddress({ ...address, city: v })}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="State"
                placeholderTextColor={Colors.textLight}
                value={address.state}
                onChangeText={(v) => setAddress({ ...address, state: v })}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="ZIP Code"
                placeholderTextColor={Colors.textLight}
                keyboardType="number-pad"
                value={address.zip}
                onChangeText={(v) => setAddress({ ...address, zip: v })}
              />
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Phone"
                placeholderTextColor={Colors.textLight}
                keyboardType="phone-pad"
                value={address.phone}
                onChangeText={(v) => setAddress({ ...address, phone: v })}
              />
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {PAYMENT_OPTIONS.map((option) => (
            <Pressable
              key={option.id}
              style={[
                styles.paymentOption,
                paymentMethod === option.id && styles.paymentOptionActive,
              ]}
              onPress={() => setPaymentMethod(option.id)}>
              <Ionicons
                name={option.icon}
                size={24}
                color={
                  paymentMethod === option.id ? Colors.primary : Colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.paymentLabel,
                  paymentMethod === option.id && styles.paymentLabelActive,
                ]}>
                {option.label}
              </Text>
              <View
                style={[
                  styles.radio,
                  paymentMethod === option.id && styles.radioActive,
                ]}>
                {paymentMethod === option.id && <View style={styles.radioInner} />}
              </View>
            </Pressable>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            {cart.map((item) => (
              <View key={item.product.id} style={styles.summaryItem}>
                <Image
                  source={{ uri: item.product.imageUrl }}
                  style={styles.summaryImage}
                  contentFit="cover"
                />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryName} numberOfLines={1}>
                    {item.product.name}
                  </Text>
                  <Text style={styles.summaryQty}>Qty: {item.quantity}</Text>
                </View>
                <Text style={styles.summaryPrice}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
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
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton
          title={`Place Order · $${total.toFixed(2)}`}
          onPress={handlePlaceOrder}
          variant="accent"
          size="lg"
          fullWidth
          icon="checkmark-circle-outline"
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
    padding: Spacing.md,
    paddingBottom: Spacing.md,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  form: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.card,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
    fontSize: 15,
    color: Colors.text,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.background,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  halfInput: {
    flex: 1,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  paymentOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(31, 60, 136, 0.04)',
  },
  paymentLabel: {
    ...Typography.body,
    flex: 1,
    marginLeft: Spacing.md,
    fontWeight: '500',
  },
  paymentLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.card,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  summaryImage: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
  },
  summaryInfo: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  summaryName: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  summaryQty: {
    ...Typography.caption,
  },
  summaryPrice: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  summaryLabel: {
    ...Typography.bodySmall,
  },
  summaryValue: {
    ...Typography.bodySmall,
    fontWeight: '600',
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
