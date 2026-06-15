import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ScreenHeader from '@/components/ScreenHeader';
import { Colors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route?: string;
  onPress?: () => void;
}

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      icon: 'receipt-outline',
      label: 'My Orders',
      onPress: () =>
        Alert.alert('My Orders', 'Order history will be available soon.'),
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

  const handleMenuPress = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route as never);
    } else if (item.onPress) {
      item.onPress();
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Profile" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={Colors.white} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Guest Shopper</Text>
            <Text style={styles.userEmail}>guest@bluesfading.com</Text>
          </View>
          <View style={styles.memberBadge}>
            <Ionicons name="star" size={12} color={Colors.accent} />
            <Text style={styles.memberText}>Premium</Text>
          </View>
        </View>

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
    width: 64,
    height: 64,
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
