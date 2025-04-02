import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.9;

type BottomSheetModalProps = {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  onFinish?: () => void;
  finishButtonColor?: string;
  rightIcon?: {
    name: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
  children: React.ReactNode;
};

export function BottomSheetModal({
  isVisible,
  onClose,
  title,
  onFinish,
  finishButtonColor = "#17C3B2",
  rightIcon,
  children,
}: BottomSheetModalProps) {
  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isVisible ? 0 : MODAL_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Animated.View style={[styles.modal, { transform: [{ translateY }] }]}>
        <View style={styles.thumb} />

        <View style={styles.header}>
          <Pressable onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <ThemedText type="title">{title}</ThemedText>
          {rightIcon ? (
            <Pressable onPress={rightIcon.onPress}>
              <Ionicons
                name={rightIcon.name}
                size={24}
                color={finishButtonColor}
              />
            </Pressable>
          ) : onFinish ? (
            <Pressable onPress={onFinish}>
              <ThemedText
                style={[styles.finishButton, { color: finishButtonColor }]}>
                Finish
              </ThemedText>
            </Pressable>
          ) : (
            <View style={{ width: 24 }} />
          )}
        </View>

        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: MODAL_HEIGHT,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  thumb: {
    width: 40,
    height: 4,
    backgroundColor: "#DDD",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  finishButton: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    minHeight: MODAL_HEIGHT - 100,
  },
});
