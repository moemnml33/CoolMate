import { ThemedText } from "@/components/ThemedText";
import { Checkbox } from "@/components/ui/Checkbox";
import { useTaskContext } from "@/contexts/TaskContext";
import { colors } from "@/data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export default function GroceriesScreen() {
  const {
    checkedGroceries,
    toggleGroceryItem,
    clearGroceryList,
    markAllGroceries,
    groceryItems,
    addGroceryItem,
  } = useTaskContext();
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    addGroceryItem(newItem.trim());
    setNewItem("");
  };

  const handleClearList = () => {
    Alert.alert(
      "Clear Grocery List",
      "Are you sure you want to clear the entire grocery list?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: clearGroceryList,
          style: "destructive",
        },
      ]
    );
  };

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
            style={[styles.actionButton, styles.clearButton]}
            onPress={handleClearList}
          >
            <ThemedText style={{ color: colors.groceries }}>
              Clear list
            </ThemedText>
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.markAllButton]}
            onPress={markAllGroceries}
          >
            <ThemedText style={{ color: "white" }}>Mark as complete</ThemedText>
          </Pressable>
        </View>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Shopping List
        </ThemedText>

        <View style={styles.list}>
          <View style={styles.groceryItem}>
            <View style={[styles.checkbox, { borderColor: "#CED4DA" }]} />
            <TextInput
              style={styles.input}
              placeholder="Add new..."
              value={newItem}
              onChangeText={setNewItem}
              onSubmitEditing={handleAddItem}
              returnKeyType="done"
              placeholderTextColor="#ADB5BD"
            />
          </View>

          {groceryItems.map((item) => (
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
  list: {
    backgroundColor: "white",
    borderRadius: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#212529",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
  },
  groceryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E9ECEF",
  },
  groceryText: {
    fontSize: 16,
  },
});
