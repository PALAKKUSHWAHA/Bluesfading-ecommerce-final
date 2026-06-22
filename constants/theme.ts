import { Colors as AppColors } from './colors';

/** Legacy theme colors for Expo template components */
export const Colors = {
  light: {
    text: AppColors.text,
    background: AppColors.background,
    tint: AppColors.primary,
    icon: AppColors.textSecondary,
    tabIconDefault: AppColors.textLight,
    tabIconSelected: AppColors.primary,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: AppColors.accent,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: AppColors.accent,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 24,
  full: 999,
};

export const Typography = {
  h1: { fontSize: 32, fontWeight: '700' as const, color: AppColors.text },
  h2: { fontSize: 24, fontWeight: '700' as const, color: AppColors.text },
  h3: { fontSize: 20, fontWeight: '600' as const, color: AppColors.text },
  body: { fontSize: 16, fontWeight: '400' as const, color: AppColors.text },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, color: AppColors.textSecondary },
  caption: { fontSize: 12, fontWeight: '400' as const, color: AppColors.textLight },
  price: { fontSize: 18, fontWeight: '700' as const, color: AppColors.accent }, // Accent is dark midnight blue
};

export const Shadows = {
  card: {
    shadowColor: AppColors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  button: {
    shadowColor: AppColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
};
