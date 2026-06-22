import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CustomButton from '@/components/CustomButton';
import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/hooks/useAppContext';

interface TrackingStep {
  status: 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const TRACKING_STEPS: TrackingStep[] = [
  {
    status: 'confirmed',
    title: 'Order Confirmed',
    description: 'Your payment was successful and order is verified.',
    icon: 'checkmark-circle-outline',
  },
  {
    status: 'packed',
    title: 'Packed & Prepared',
    description: 'Items have been quality checked and wrapped.',
    icon: 'cube-outline',
  },
  {
    status: 'shipped',
    title: 'Shipped (In Transit)',
    description: 'Package left our Delhi warehouse via Delhivery Express.',
    icon: 'airplane-outline',
  },
  {
    status: 'out_for_delivery',
    title: 'Out for Delivery',
    description: 'Our delivery agent is heading to your location.',
    icon: 'bicycle-outline',
  },
  {
    status: 'delivered',
    title: 'Delivered',
    description: 'Package handed over and order successfully fulfilled.',
    icon: 'home-outline',
  },
];

export default function OrderTrackingScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const router = useRouter();
  const { orders } = useApp();

  const order = useMemo(() => {
    return orders.find((o) => o.id === orderId);
  }, [orders, orderId]);

  if (!order) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Track Order" showBack onBack={() => router.replace('/(tabs)')} />
        <View style={styles.notFoundContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={Colors.error} />
          <Text style={styles.notFound}>Order not found or has been processed.</Text>
          <CustomButton
            title="Return to Home"
            onPress={() => router.replace('/(tabs)')}
            variant="primary"
            style={styles.notFoundBtn}
          />
        </View>
      </View>
    );
  }

  // Get active step index (mocked as shipped for demo, or based on order state)
  const activeStepIndex = 2; // 'shipped' is index 2

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Track Order"
        showBack
        onBack={() => router.replace('/(tabs)')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Estimated Date Card */}
        <View style={styles.etaCard}>
          <View style={styles.etaMeta}>
            <Text style={styles.etaLabel}>Estimated Delivery</Text>
            <Text style={styles.etaDate}>Thursday, 25th June</Text>
          </View>
          <View style={styles.etaBadge}>
            <Text style={styles.etaBadgeText}>In Transit</Text>
          </View>
        </View>

        {/* Tracking Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipment Status</Text>
          <View style={styles.timelineContainer}>
            {TRACKING_STEPS.map((step, index) => {
              const isCompleted = index < activeStepIndex;
              const isActive = index === activeStepIndex;
              const isPending = index > activeStepIndex;

              return (
                <View key={step.status} style={styles.timelineRow}>
                  {/* Left Column (Indicator) */}
                  <View style={styles.indicatorColumn}>
                    <View
                      style={[
                        styles.indicatorDot,
                        isCompleted && styles.dotCompleted,
                        isActive && styles.dotActive,
                        isPending && styles.dotPending,
                      ]}
                    >
                      {isCompleted ? (
                        <Ionicons name="checkmark" size={14} color={Colors.white} />
                      ) : (
                        <View
                          style={[
                            styles.innerDot,
                            isActive && styles.innerDotActive,
                            isPending && styles.innerDotPending,
                          ]}
                        />
                      )}
                    </View>
                    {index < TRACKING_STEPS.length - 1 && (
                      <View
                        style={[
                          styles.indicatorLine,
                          isCompleted && styles.lineCompleted,
                        ]}
                      />
                    )}
                  </View>

                  {/* Right Column (Meta) */}
                  <View style={styles.timelineMeta}>
                    <View style={styles.titleRow}>
                      <Ionicons
                        name={step.icon}
                        size={18}
                        color={isActive ? Colors.primary : Colors.textSecondary}
                        style={styles.stepIcon}
                      />
                      <Text
                        style={[
                          styles.stepTitle,
                          isActive && styles.stepTitleActive,
                          isPending && styles.stepTitlePending,
                        ]}
                      >
                        {step.title}
                      </Text>
                    </View>
                    <Text style={styles.stepDesc}>{step.description}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Order Details Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Order ID</Text>
              <Text style={styles.metaValue}>{order.id}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Payment Mode</Text>
              <Text style={styles.metaValue}>{order.paymentMethod}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Date Placed</Text>
              <Text style={styles.metaValue}>{order.date}</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.shipToTitle}>Shipping Address</Text>
            <Text style={styles.addressText}>{order.address.fullName}</Text>
            <Text style={styles.addressText}>{order.address.street}</Text>
            <Text style={styles.addressText}>
              {order.address.city}, {order.address.state} - {order.address.zip}
            </Text>
            <Text style={styles.addressText}>Phone: {order.address.phone}</Text>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Charge</Text>
              <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View style={styles.footer}>
        <CustomButton
          title="Continue Shopping"
          onPress={() => router.replace('/(tabs)')}
          variant="primary"
          size="lg"
          fullWidth
          icon="cart-outline"
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
    paddingBottom: Spacing.xl,
  },
  etaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  etaMeta: {
    flex: 1,
  },
  etaLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  etaDate: {
    ...Typography.h2,
    fontSize: 20,
    marginTop: 2,
  },
  etaBadge: {
    backgroundColor: 'rgba(31, 60, 136, 0.08)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  etaBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    fontSize: 16,
    marginBottom: Spacing.sm,
  },
  timelineContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.card,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 70,
  },
  indicatorColumn: {
    alignItems: 'center',
    width: 30,
  },
  indicatorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  dotCompleted: {
    backgroundColor: Colors.success,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  dotPending: {
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  innerDotActive: {
    backgroundColor: Colors.primary,
  },
  innerDotPending: {
    backgroundColor: Colors.textLight,
  },
  indicatorLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginVertical: 2,
  },
  lineCompleted: {
    backgroundColor: Colors.success,
  },
  timelineMeta: {
    flex: 1,
    paddingLeft: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepIcon: {
    marginRight: 6,
  },
  stepTitle: {
    ...Typography.bodySmall,
    fontWeight: '700',
    color: Colors.text,
  },
  stepTitleActive: {
    color: Colors.primary,
    fontSize: 15,
  },
  stepTitlePending: {
    color: Colors.textLight,
  },
  stepDesc: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.card,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  metaLabel: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  metaValue: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  shipToTitle: {
    ...Typography.bodySmall,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  addressText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    marginTop: Spacing.xxl,
  },
  notFound: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginVertical: Spacing.md,
  },
  notFoundBtn: {
    marginTop: Spacing.md,
  },
});
