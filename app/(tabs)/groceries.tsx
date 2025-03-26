import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Checkbox } from "@/components/ui/Checkbox";

const groceryItems = [
  "Tomatoes",
  "Eggs",
  "Cereal",
  "Milk",
  "Lettuce",
  "Ground beef",
  "Chicken wings",
  "Toilet paper",
  "Sprite",
];

export default function GroceriesScreen() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const clearList = () => {
    setCheckedItems({});
  };

  const markAllComplete = () => {
    const allChecked = groceryItems.reduce((acc, item) => ({
      ...acc,
      [item]: true
    }), {});
    setCheckedItems(allChecked);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText type="title">Groceries</ThemedText>
          <Pressable style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FE6D73" />
          </Pressable>
        </View>

        <View style={styles.actionButtons}>
          <Pressable 
            style={[styles.actionButton, styles.markAllButton]} 
            onPress={markAllComplete}
          >
            <ThemedText style={{ color: "white" }}>Mark all complete</ThemedText>
          </Pressable>
          <Pressable 
            style={[styles.actionButton, styles.clearButton]} 
            onPress={clearList}
          >
            <ThemedText style={{ color: "#FE6D73" }}>Clear list</ThemedText>
          </Pressable>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Shopping List
          </ThemedText>
          {groceryItems.map((item) => (
            <View key={item} style={styles.groceryItem}>
              <Checkbox
                checked={checkedItems[item] || false}
                onPress={() => toggleItem(item)}
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
