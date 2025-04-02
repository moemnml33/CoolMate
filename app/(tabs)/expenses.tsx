import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ExpenseCard } from "@/components/expenses/ExpenseCard";
import { expenses, colors, Expense } from "@/data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { AddExpenseModal } from "@/components/expenses/AddExpenseModal";
import { ExpenseDetailsModal } from "@/components/expenses/ExpenseDetailsModal";

export default function ExpensesScreen() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [localExpenses, setLocalExpenses] = useState(expenses);

  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now().toString(),
    };

    setLocalExpenses((prev) => ({
      ...prev,
      shared: [...prev.shared, expenseWithId],
    }));
  };

  const handleDeleteExpense = (id: string) => {
    setLocalExpenses((prev) => ({
      ...prev,
      shared: prev.shared.filter((expense) => expense.id !== id),
      pending: prev.pending.filter((expense) => expense.id !== id),
    }));
  };

  const handleExpensePress = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDetailsModalVisible(true);
  };

  const handleMarkAsPaid = () => {
    if (!selectedExpense) return;
    handleDeleteExpense(selectedExpense.id);
    setIsDetailsModalVisible(false);
    setSelectedExpense(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
    setIsEditing(false);
    setSelectedExpense(null);
  };

  const handleEditPress = () => {
    setIsDetailsModalVisible(false);
    setIsEditing(true);
    setIsAddModalVisible(true);
  };

  const handleEditExpense = (updatedExpense: Expense) => {
    setLocalExpenses((prev) => ({
      ...prev,
      shared: prev.shared.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      ),
      pending: prev.pending.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      ),
    }));
    handleCloseAddModal();
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AddExpenseModal
        isVisible={isAddModalVisible}
        onClose={handleCloseAddModal}
        onAdd={handleAddExpense}
        onEdit={handleEditExpense}
        initialExpense={
          isEditing && selectedExpense ? selectedExpense : undefined
        }
      />
      {selectedExpense && (
        <ExpenseDetailsModal
          expense={selectedExpense}
          isVisible={isDetailsModalVisible}
          onClose={() => {
            setIsDetailsModalVisible(false);
            setSelectedExpense(null);
          }}
          onEdit={handleEditPress}
          onMarkAsPaid={handleMarkAsPaid}
        />
      )}
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText type="title">Expenses</ThemedText>
          <Pressable
            style={styles.addButton}
            onPress={() => setIsAddModalVisible(true)}>
            <Ionicons name="add" size={24} color={colors.expenses} />
          </Pressable>
        </View>

        <View style={styles.balanceContainer}>
          <View
            style={[styles.balanceCard, { backgroundColor: colors.expenses }]}>
            <ThemedText style={[styles.balanceLabel, { color: "white" }]}>
              You owe
            </ThemedText>
            <ThemedText type="subtitle" style={{ color: "white" }}>
              ${localExpenses.balances.youOwe}
            </ThemedText>
          </View>
          <View
            style={[styles.balanceCard, { backgroundColor: colors.expenses }]}>
            <ThemedText style={[styles.balanceLabel, { color: "white" }]}>
              You are owed
            </ThemedText>
            <ThemedText type="subtitle" style={{ color: "white" }}>
              ${localExpenses.balances.youAreOwed}
            </ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Shared Expenses
          </ThemedText>
          {localExpenses.shared.map((expense) => (
            <ExpenseCard
              key={expense.id}
              {...expense}
              type="shared"
              onPress={() => handleExpensePress(expense)}
              onDelete={handleDeleteExpense}
            />
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Pending Payments
          </ThemedText>
          {localExpenses.pending.map((expense) => (
            <ExpenseCard
              key={expense.id}
              {...expense}
              type="pending"
              onPress={() => handleExpensePress(expense)}
              onDelete={handleDeleteExpense}
            />
          ))}
        </View>

        <Pressable style={styles.resolvedButton}>
          <ThemedText style={styles.resolvedButtonText}>
            Show Resolved Payments
          </ThemedText>
        </Pressable>
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
    backgroundColor: "#E8F8F7",
    justifyContent: "center",
    alignItems: "center",
  },
  balanceContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  balanceCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    gap: 4,
  },
  balanceLabel: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  resolvedButton: {
    alignItems: "center",
    paddingVertical: 16,
  },
  resolvedButtonText: {
    color: "#687076",
  },
});
