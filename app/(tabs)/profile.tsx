import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ScreenHeader from '@/components/ScreenHeader';
import CustomButton from '@/components/CustomButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { useApp } from '@/hooks/useAppContext';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route?: string;
  onPress?: () => void;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, orders } = useApp();

  const menuItems = useMemo((): MenuItem[] => {
    return [
      {
        icon: 'receipt-outline',
        label: `My Orders (${orders.length})`,
        onPress: () => {
          if (orders.length > 0) {
            router.push(`/orders/tracking?orderId=${orders[0].id}`);
          } else {
            Alert.alert('Orders', 'You have not placed any orders yet.');
          }
        },
      },
      {
        icon: 'heart-outline',
        label: 'Wishlist',
        route: '/(tabs)/wishlist',
      },
      {
        icon: 'location-outline',
        label: 'Saved Addresses',
        onPress: () =>
          Alert.alert('Saved Addresses', 'Address management coming soon.'),
      },
      {
        icon: 'mail-outline',
        label: 'Contact Us',
        onPress: () =>
          Alert.alert('Contact Us', 'Email us at hello@bluesfading.com'),
      },
      {
        icon: 'information-circle-outline',
        label: 'About Bluesfading',
        onPress: () =>
          Alert.alert(
            'About Bluesfading',
            'Bluesfading is a premium room décor and aesthetic shopping app. We curate beautiful wall posters, canvas paintings, dreamcatchers, and more to help you transform your space.'
          ),
      },
    ];
  }, [orders, router]);

  const handleMenuPress = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route as never);
    } else if (item.onPress) {
      item.onPress();
    }
  };

  // If user is not logged in, show Auth Gate
  if (!user) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Account Profile" />
        <View style={styles.authGate}>
          <View style={styles.gateIconBg}>
            <Ionicons name="lock-closed" size={32} color={Colors.accent} />
          </View>
          <Text style={styles.gateTitle}>Unlock Premium Experience</Text>
          <Text style={styles.gateMessage}>
            Log in to preserve your cart, track orders, and get personalized room preview suggestions.
          </Text>
          <CustomButton
            title="Log In / Register"
            onPress={() => router.push('/(auth)/login')}
            variant="primary"
            size="lg"
            style={styles.gateBtn}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Profile" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* User profile card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={36} color={Colors.white} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.username}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
          <View style={styles.memberBadge}>
            <Ionicons name="star" size={12} color={Colors.accent} />
            <Text style={styles.memberText}>Premium</Text>
          </View>
        </View>

        {/* Menu list options */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast,
                pressed && styles.menuItemPressed,
              ]}
              onPress={() => handleMenuPress(item)}>
              <View style={styles.menuIconWrapper}>
                <Ionicons name={item.icon} size={22} color={Colors.primary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textLight}
              />
            </Pressable>
          ))}
        </View>

        {/* Sign Out Action */}
        <CustomButton
          title="Sign Out"
          onPress={() => {
            logout();
            Alert.alert('Logged Out', 'You have been signed out successfully.');
          }}
          variant="outline"
          size="md"
          icon="log-out-outline"
          style={styles.logoutBtn}
        />

        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>Bluesfading</Text>
          <Text style={styles.aboutText}>
            Curating premium room décor since 2024. Transform your space with
            our handpicked collection of aesthetic wall art and accessories.
          </Text>
        </View>
      </ScrollView>
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
  authGate: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    backgroundColor: Colors.background,
  },
  gateIconBg: {
    width: 76,
    height: 76,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  gateTitle: {
    ...Typography.h2,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: Spacing.xs,
  },
  gateMessage: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
  gateBtn: {
    minWidth: 200,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  userName: {
    ...Typography.h3,
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  userEmail: {
    ...Typography.bodySmall,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  memberText: {
    ...Typography.caption,
    fontWeight: '700',
    color: Colors.accent,
  },
  menuSection: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemPressed: {
    backgroundColor: Colors.background,
  },
  menuIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuLabel: {
    ...Typography.body,
    flex: 1,
    fontWeight: '500',
  },
  logoutBtn: {
    marginBottom: Spacing.lg,
  },
  aboutCard: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
  },
  aboutTitle: {
    ...Typography.h3,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  aboutText: {
    ...Typography.bodySmall,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 22,
  },
});
