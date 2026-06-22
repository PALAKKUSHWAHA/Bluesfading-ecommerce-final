import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import FloatingCart from '@/components/FloatingCart';
import { Colors } from '@/constants/colors';
import { AppProvider } from '@/hooks/useAppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="category/[id]" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="collection/[id]" />
        <Stack.Screen name="inspiration/[id]" />
        <Stack.Screen name="orders/tracking" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/signup" />
        <Stack.Screen name="(auth)/forgot-password" />
        <Stack.Screen
          name="checkout"
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </Stack>
      <FloatingCart />
      <StatusBar style="dark" />
    </AppProvider>
  );
}
