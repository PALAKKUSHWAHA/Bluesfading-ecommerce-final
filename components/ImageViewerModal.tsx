import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ImageViewerModalProps {
  visible: boolean;
  onClose: () => void;
  images: any[]; // Supports both remote {uri: string} or local require() sources
  initialIndex?: number;
}

export default function ImageViewerModal({
  visible,
  onClose,
  images,
  initialIndex = 0,
}: ImageViewerModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [zoomScale, setZoomScale] = useState(1);

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.5, 1));
  };

  const handleScroll = (event: any) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / SCREEN_WIDTH);
    setActiveIndex(index);
    // Reset zoom when swiping between images
    setZoomScale(1);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <Pressable onPress={onClose} hitSlop={12} style={styles.closeBtn}>
            <Ionicons name="close" size={26} color={Colors.white} />
          </Pressable>
          <Text style={styles.paginationText}>
            {activeIndex + 1} / {images.length}
          </Text>
          <View style={styles.zoomControls}>
            <Pressable onPress={handleZoomOut} disabled={zoomScale === 1} style={styles.controlBtn}>
              <Ionicons
                name="remove-circle-outline"
                size={24}
                color={zoomScale === 1 ? 'rgba(255,255,255,0.3)' : Colors.white}
              />
            </Pressable>
            <Text style={styles.zoomText}>{zoomScale.toFixed(1)}x</Text>
            <Pressable onPress={handleZoomIn} disabled={zoomScale === 3} style={styles.controlBtn}>
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={zoomScale === 3 ? 'rgba(255,255,255,0.3)' : Colors.white}
              />
            </Pressable>
          </View>
        </View>

        {/* Swipeable image list */}
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          initialScrollIndex={initialIndex}
          renderItem={({ item }) => (
            <View style={styles.imageWrapper}>
              <Image
                source={item}
                style={[
                  styles.image,
                  { transform: [{ scale: zoomScale }] }
                ]}
                contentFit="contain"
              />
            </View>
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  closeBtn: {
    padding: Spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: BorderRadius.full,
  },
  paginationText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: '600',
  },
  zoomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  controlBtn: {
    padding: 2,
  },
  zoomText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    minWidth: 28,
    textAlign: 'center',
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
  },
});
