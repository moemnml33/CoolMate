import { ThemedText } from "@/components/ThemedText";
import { user } from "@/data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const DRAWER_WIDTH = Dimensions.get("window").width * 0.75;

type ProfileDrawerProps = {
  isVisible: boolean;
  onClose: () => void;
};

export function ProfileDrawer({ isVisible, onClose }: ProfileDrawerProps) {
  const translateX = React.useRef(new Animated.Value(DRAWER_WIDTH)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isVisible ? 0 : DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <BlurView intensity={20} style={StyleSheet.absoluteFill}>
        <Pressable style={styles.backdrop} onPress={onClose} />
      </BlurView>
      
      <Animated.View 
        style={[
          styles.drawer,
          { transform: [{ translateX }] }
        ]}
      >
        <View style={styles.header}>
          <View style={styles.profileImage} />
          <ThemedText type="title" style={styles.name}>{user.name}</ThemedText>
          <ThemedText style={styles.household}>{user.household}</ThemedText>
        </View>

        <View style={styles.menuItems}>
          <Pressable style={styles.menuItem}>
            <Ionicons name="person" size={24} color="#687076" />
            <ThemedText style={styles.menuText}>Edit your profile</ThemedText>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="home" size={24} color="#687076" />
            <ThemedText style={styles.menuText}>Edit your household</ThemedText>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="time" size={24} color="#687076" />
            <ThemedText style={styles.menuText}>View household activity</ThemedText>
          </Pressable>

          <View style={styles.separator} />

          <Pressable style={styles.menuItem}>
            <Ionicons name="settings" size={24} color="#687076" />
            <ThemedText style={styles.menuText}>Settings</ThemedText>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: "white",
    paddingTop: 60,
    elevation: 9999,
  },
  header: {
    alignItems: "center",
    paddingBottom: 32,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E1E1E1",
    marginBottom: 16,
  },
  name: {
    marginBottom: 4,
  },
  household: {
    color: "#687076",
    fontSize: 14,
  },
  menuItems: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 12,
  },
  menuText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
}); 