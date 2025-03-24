import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function GroceriesScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ThemedView style={styles.themedView}>
        <ThemedText type="title" style={styles.titleContainer}>
          Calendar
        </ThemedText>
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
