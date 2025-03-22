import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

export default function CalendarScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ThemedView>
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
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {},
});
