import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import CustomButton from '@/components/CustomButton';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
        }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.brandContainer}>
          <Text style={styles.appName}>Bluesfading</Text>
          <View style={styles.accentLine} />
          <Text style={styles.tagline}>
            Transform Your Space, Express Your Style
          </Text>
        </View>
        <CustomButton
          title="Explore Collection"
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
    backgroundColor: Colors.primary,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(31, 60, 136, 0.72)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl + 16,
  },
  brandContainer: {
    marginBottom: Spacing.xxl,
  },
  appName: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: -1,
    marginBottom: Spacing.sm,
  },
  accentLine: {
    width: 60,
    height: 3,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.md,
  },
  tagline: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 26,
    fontSize: 17,
  },
  button: {
    borderRadius: BorderRadius.xl,
  },
});
