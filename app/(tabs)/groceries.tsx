import { ThemedText } from "@/components/ThemedText";
import { groceries, colors } from "@/data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Checkbox } from "@/components/ui/Checkbox";
import { useTaskContext } from "@/contexts/TaskContext";

export default function GroceriesScreen() {
  const { checkedGroceries, toggleGroceryItem, clearGroceryList, markAllGroceries } = useTaskContext();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText type="title">Groceries</ThemedText>
          <Pressable style={styles.addButton}>
            <Ionicons name="add" size={24} color={colors.groceries} />
          </Pressable>
        </View>

        <View style={styles.actionButtons}>
          <Pressable 
            style={[styles.actionButton, styles.markAllButton]} 
            onPress={markAllGroceries}
          >
            <ThemedText style={{ color: "white" }}>Mark all complete</ThemedText>
          </Pressable>
          <Pressable 
            style={[styles.actionButton, styles.clearButton]} 
            onPress={clearGroceryList}
          >
            <ThemedText style={{ color: colors.groceries }}>Clear list</ThemedText>
          </Pressable>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Shopping List
          </ThemedText>
          {groceries.items.map((item) => (
            <View key={item} style={styles.groceryItem}>
              <Checkbox
                checked={checkedGroceries[item] || false}
                onPress={() => toggleGroceryItem(item)}
                color={colors.groceries}
              />
              <ThemedText style={styles.groceryText}>{item}</ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF0F1", // Lighter shade of #FE6D73
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#FFF0F1", // Light pink background
  },
  markAllButton: {
    backgroundColor: "#FE6D73", // Main groceries color
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  groceryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
  },
  groceryText: {
    fontSize: 16,
  },
});
