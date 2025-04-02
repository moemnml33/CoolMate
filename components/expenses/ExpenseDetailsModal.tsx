import { ThemedText } from "@/components/ThemedText";
import { Expense, colors } from "@/data/data";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { BottomSheetModal } from "@/components/ui/BottomSheetModal";

type ExpenseDetailsModalProps = {
  expense: Expense;
  isVisible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onMarkAsPaid: () => void;
};

export function ExpenseDetailsModal({
  expense,
  isVisible,
  onClose,
  onEdit,
  onMarkAsPaid,
}: ExpenseDetailsModalProps) {
  return (
    <BottomSheetModal
      isVisible={isVisible}
      onClose={onClose}
      title={expense.title}
      rightIcon={{
        name: "create-outline",
        onPress: onEdit,
      }}>
      <View style={styles.container}>
        <ThemedText style={styles.amount}>${expense.amount}</ThemedText>

        <View style={styles.participants}>
          <View style={styles.participant}>
            <View style={styles.avatar} />
            <ThemedText>You</ThemedText>
          </View>
          <View style={styles.arrow}>
            <ThemedText style={styles.arrowText}>{">>"}</ThemedText>
          </View>
          <View style={styles.participant}>
            <View style={styles.avatar} />
            <ThemedText>Jessica</ThemedText>
          </View>
        </View>

        <View style={styles.dueDate}>
          <ThemedText style={styles.label}>
            Due Date: {expense.dueDate || "N/A"}
          </ThemedText>
        </View>

        <Pressable style={styles.markAsPaidButton} onPress={onMarkAsPaid}>
          <ThemedText style={styles.markAsPaidText}>Mark as Paid</ThemedText>
        </Pressable>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>Created by: You</ThemedText>
          <ThemedText style={styles.footerText}>
            Created on: 11/12/23
          </ThemedText>
        </View>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 24,
    paddingVertical: 24,
  },
  amount: {
    fontSize: 32,
    fontWeight: "600",
    minHeight: 40,
    lineHeight: 40,
  },
  participants: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  participant: {
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E1E1E1",
  },
  arrow: {
    justifyContent: "center",
  },
  arrowText: {
    fontSize: 20,
    color: "#687076",
  },
  dueDate: {
    marginTop: 16,
  },
  label: {
    color: "#687076",
  },
  markAsPaidButton: {
    width: "100%",
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  markAsPaidText: {
    color: colors.expenses,
    fontWeight: "600",
  },
  footer: {
    marginTop: 24,
    gap: 4,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#687076",
  },
});
