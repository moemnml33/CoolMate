import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ExpenseCard } from "@/components/expenses/ExpenseCard";
import { expenses, colors } from "@/data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function ExpensesScreen() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText type="title">Expenses</ThemedText>
          <Pressable style={styles.addButton}>
            <Ionicons name="add" size={24} color={colors.expenses} />
          </Pressable>
        </View>

        <View style={styles.balanceContainer}>
          <View style={[styles.balanceCard, { backgroundColor: colors.expenses }]}>
            <ThemedText style={[styles.balanceLabel, { color: "white" }]}>You owe</ThemedText>
            <ThemedText type="subtitle" style={{ color: "white" }}>${expenses.balances.youOwe}</ThemedText>
          </View>
          <View style={[styles.balanceCard, { backgroundColor: colors.expenses }]}>
            <ThemedText style={[styles.balanceLabel, { color: "white" }]}>You are owed</ThemedText>
            <ThemedText type="subtitle" style={{ color: "white" }}>${expenses.balances.youAreOwed}</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Shared Expenses
          </ThemedText>
          {expenses.shared.map(expense => (
            <ExpenseCard
              key={expense.id}
              type="shared"
              title={expense.title}
              amount={expense.amount}
              dueDate={expense.dueDate}
              paidCount={expense.paidCount}
            />
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Pending Payments
          </ThemedText>
          {expenses.pending.map(expense => (
            <ExpenseCard
              key={expense.id}
              type="pending"
              title={expense.title}
              amount={expense.amount}
              ownerInfo={expense.ownerInfo}
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
