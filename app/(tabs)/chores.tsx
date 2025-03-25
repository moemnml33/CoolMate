import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function ChoresScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.themedView}>
        <ThemedText type="title" style={styles.titleContainer}>
          Chores
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flex: 1,
  },
  themedView: { backgroundColor: "transparent" },
  titleContainer: {},
});
