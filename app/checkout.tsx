import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/hooks/useAppContext';

type PaymentMethod = 'upi' | 'gpay' | 'phonepe' | 'paytm' | 'card';

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'upi', label: 'UPI / Instant Bank Transfer', icon: 'swap-horizontal-outline' },
  { id: 'gpay', label: 'Google Pay', icon: 'logo-google' },
  { id: 'phonepe', label: 'PhonePe', icon: 'phone-portrait-outline' },
  { id: 'paytm', label: 'Paytm Wallet', icon: 'wallet-outline' },
  { id: 'card', label: 'Credit / Debit Card', icon: 'card-outline' },
];

interface ShippingOption {
  id: 'standard' | 'express' | 'same-day';
  label: string;
  price: number;
  eta: string;
}

export default function CheckoutScreen() {
  const router = useRouter();
  const {
    cart,
    cartTotal,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    addOrder,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [shippingOption, setShippingOption] = useState<'standard' | 'express' | 'same-day'>('standard');
  const [couponInput, setCouponInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponError, setCouponError] = useState('');
  
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  // Shipping details
  const shippingRates: Record<typeof shippingOption, number> = {
    standard: cartTotal > 75 ? 0 : 5.99,
    express: 15.00,
    'same-day': 25.00,
  };

  const shippingOptionsList: ShippingOption[] = [
    { id: 'standard', label: 'Standard Delivery', price: cartTotal > 75 ? 0 : 5.99, eta: '3-5 Business Days' },
    { id: 'express', label: 'Express Delivery', price: 15.00, eta: '1-2 Days' },
    { id: 'same-day', label: 'Same Day Delivery', price: 25.00, eta: 'Today (Within 12 hours)' },
  ];

  const shippingCost = shippingRates[shippingOption];

  // Discount calculation
  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountPercent) {
      return (cartTotal * appliedCoupon.discountPercent) / 100;
    }
    if (appliedCoupon.discountFlat) {
      return Math.min(appliedCoupon.discountFlat, cartTotal);
    }
    return 0;
  }, [appliedCoupon, cartTotal]);

  const subtotal = cartTotal;
  const finalTotal = subtotal + shippingCost - discountAmount;

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    setCouponError('');
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponError('');
  };

  const handlePlaceOrder = () => {
    if (!address.fullName || !address.street || !address.city || !address.zip || !address.phone) {
      Alert.alert('Missing Details', 'Please fill in all mandatory shipping address fields.');
      return;
    }

    setIsProcessing(true);

    // Simulate real gateway latency
    setTimeout(() => {
      setIsProcessing(false);

      const createdOrder = addOrder({
        items: cart,
        subtotal,
        shipping: shippingCost,
        discount: discountAmount,
        total: finalTotal,
        couponCode: appliedCoupon?.code,
        paymentMethod: PAYMENT_OPTIONS.find(o => o.id === paymentMethod)?.label || paymentMethod,
        address,
      });

      clearCart();
      removeCoupon();

      Alert.alert(
        'Payment Successful',
        `Your order of $${finalTotal.toFixed(2)} has been placed. Tap OK to track your shipment.`,
        [
          {
            text: 'OK',
            onPress: () => {
              router.replace(`/orders/tracking?orderId=${createdOrder.id}`);
            },
          },
        ]
      );
    }, 1800);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Checkout"
        showBack
        onBack={() => router.back()}
      />

      {isProcessing ? (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.processingText}>Processing Payment...</Text>
          <Text style={styles.processingSubtext}>Please do not refresh or press back</Text>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            
            {/* Shipping Address */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Shipping Address</Text>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name *"
                  placeholderTextColor={Colors.textLight}
                  value={address.fullName}
                  onChangeText={(v) => setAddress({ ...address, fullName: v })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Street Address *"
                  placeholderTextColor={Colors.textLight}
                  value={address.street}
                  onChangeText={(v) => setAddress({ ...address, street: v })}
                />
                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="City *"
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
                    placeholder="ZIP Code *"
                    placeholderTextColor={Colors.textLight}
                    keyboardType="number-pad"
                    value={address.zip}
                    onChangeText={(v) => setAddress({ ...address, zip: v })}
                  />
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Phone *"
                    placeholderTextColor={Colors.textLight}
                    keyboardType="phone-pad"
                    value={address.phone}
                    onChangeText={(v) => setAddress({ ...address, phone: v })}
                  />
                </View>
              </View>
            </View>

            {/* Shipping Options */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Delivery Option</Text>
              <View style={styles.shippingGroup}>
                {shippingOptionsList.map((opt) => (
                  <Pressable
                    key={opt.id}
                    style={[
                      styles.shippingCard,
                      shippingOption === opt.id && styles.shippingCardActive,
                    ]}
                    onPress={() => setShippingOption(opt.id)}>
                    <View style={styles.shippingMeta}>
                      <Text style={styles.shippingLabel}>{opt.label}</Text>
                      <Text style={styles.shippingEta}>{opt.eta}</Text>
                    </View>
                    <Text style={styles.shippingPrice}>
                      {opt.price === 0 ? 'FREE' : `$${opt.price.toFixed(2)}`}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Coupons Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Offers & Coupons</Text>
              <View style={styles.couponContainer}>
                {appliedCoupon ? (
                  <View style={styles.appliedCouponRow}>
                    <View style={styles.couponBadge}>
                      <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                      <Text style={styles.couponBadgeText}>{appliedCoupon.code} Applied</Text>
                    </View>
                    <Pressable onPress={handleRemoveCoupon} hitSlop={8}>
                      <Text style={styles.removeCouponText}>Remove</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.couponFormRow}>
                    <TextInput
                      style={styles.couponInput}
                      placeholder="Enter Promo Code (e.g. WELCOME10)"
                      placeholderTextColor={Colors.textLight}
                      autoCapitalize="characters"
                      value={couponInput}
                      onChangeText={setCouponInput}
                    />
                    <Pressable style={styles.applyBtn} onPress={handleApplyCoupon}>
                      <Text style={styles.applyBtnText}>Apply</Text>
                    </Pressable>
                  </View>
                )}
                {couponError ? <Text style={styles.errorText}>{couponError}</Text> : null}
                <Text style={styles.couponHint}>Try: WELCOME10 (10% Off), SUMMER20 (20% Off)</Text>
              </View>
            </View>

            {/* Payment Method */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Payment Gateway</Text>
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
                    size={22}
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

            {/* Order Items Summary */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Review Cart Items</Text>
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
                  <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                </View>
                {discountAmount > 0 && (
                  <View style={styles.summaryRow}>
                    <Text style={[styles.summaryLabel, { color: Colors.success }]}>Promo Discount</Text>
                    <Text style={[styles.summaryValue, { color: Colors.success }]}>-${discountAmount.toFixed(2)}</Text>
                  </View>
                )}
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Shipping Fee</Text>
                  <Text style={styles.summaryValue}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total Payable</Text>
                  <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <CustomButton
              title={`Pay & Secure Checkout · $${finalTotal.toFixed(2)}`}
              onPress={handlePlaceOrder}
              variant="accent"
              size="lg"
              fullWidth
              icon="shield-checkmark-outline"
            />
          </View>
        </>
      )}
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
    paddingBottom: Spacing.xl,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  processingText: {
    ...Typography.h2,
    marginTop: Spacing.md,
    color: Colors.text,
  },
  processingSubtext: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    fontSize: 16,
    marginBottom: Spacing.sm,
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
    paddingVertical: Spacing.sm + 2,
    fontSize: 14,
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
  shippingGroup: {
    gap: Spacing.sm,
  },
  shippingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  shippingCardActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(31, 60, 136, 0.04)',
  },
  shippingMeta: {
    flex: 1,
  },
  shippingLabel: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.text,
  },
  shippingEta: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  shippingPrice: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.primary,
  },
  couponContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.card,
  },
  couponFormRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 13,
    backgroundColor: Colors.background,
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
  applyBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 13,
  },
  appliedCouponRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  couponBadgeText: {
    ...Typography.bodySmall,
    color: Colors.success,
    fontWeight: '700',
  },
  removeCouponText: {
    ...Typography.bodySmall,
    color: Colors.error,
    fontWeight: '600',
  },
  errorText: {
    color: Colors.error,
    fontSize: 11,
    fontWeight: '600',
    marginTop: Spacing.xs,
  },
  couponHint: {
    ...Typography.caption,
    color: Colors.textLight,
    marginTop: Spacing.xs,
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
    ...Typography.bodySmall,
    flex: 1,
    marginLeft: Spacing.md,
    fontWeight: '500',
  },
  paymentLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  radio: {
    width: 20,
    height: 20,
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
    width: 10,
    height: 10,
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
    width: 44,
    height: 44,
    borderRadius: BorderRadius.sm,
  },
  summaryInfo: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  summaryName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  summaryQty: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  summaryPrice: {
    fontSize: 13,
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
    color: Colors.textSecondary,
  },
  summaryValue: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.text,
  },
  totalLabel: {
    ...Typography.body,
    fontWeight: '700',
  },
  totalValue: {
    ...Typography.price,
    fontSize: 18,
  },
  footer: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
