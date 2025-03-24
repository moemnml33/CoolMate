import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ThemedView style={styles.themedView}>
        <ThemedText type="title">Home</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  themedView: { backgroundColor: "transparent" },
  titleContainer: {},
});
