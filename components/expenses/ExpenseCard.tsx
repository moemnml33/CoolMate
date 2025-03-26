import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, View } from "react-native";

type ExpenseCardProps = {
  title: string;
  amount: string;
  dueDate?: string;
  paidCount?: string;
  ownerInfo?: string;
  type: "shared" | "pending";
};

export function ExpenseCard({
  title,
  amount,
  dueDate,
  paidCount,
  ownerInfo,
  type,
}: ExpenseCardProps) {
  const [paid, total] = (paidCount || "").split("/").map(Number);

  const renderProgressBars = () => {
    return Array.from({ length: total || 0 }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.progressBar,
          index < paid ? styles.progressBarFilled : styles.progressBarEmpty,
          index !== total - 1 && styles.progressBarMargin,
        ]}
      />
    ));
  };

  return (
    <ThemedView style={styles.card}>
      <View style={styles.mainContent}>
        <View style={styles.titleRow}>
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: "#17C3B2" }}>${amount}</ThemedText>
        </View>
        
        {type === "shared" && (
          <>
            <View style={styles.progressBarContainer}>
              {renderProgressBars()}
            </View>
            <View style={styles.detailsRow}>
              <View style={styles.dueDate}>
                <Ionicons name="calendar" size={16} color="#17C3B2" />
                <ThemedText style={styles.smallText}>
                  due in {dueDate}
                </ThemedText>
              </View>
              <ThemedText style={styles.smallText}>{paidCount} paid</ThemedText>
            </View>
          </>
        )}

        {type === "pending" && ownerInfo && (
          <View style={styles.detailsRow}>
            <View style={styles.ownerInfo}>
              <Ionicons name="time" size={16} color="#17C3B2" />
              <ThemedText style={styles.smallText}>{ownerInfo}</ThemedText>
            </View>
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "white",
  },
  mainContent: {
    gap: 8,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dueDate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  smallText: {
    fontSize: 14,
    color: "#687076",
  },
  progressBarContainer: {
    flexDirection: "row",
    height: 2,
    marginVertical: 8,
  },
  progressBar: {
    flex: 1,
    height: "100%",
    borderRadius: 1,
  },
  progressBarFilled: {
    backgroundColor: "#17C3B2",
  },
  progressBarEmpty: {
    backgroundColor: "#E8F8F7",
  },
  progressBarMargin: {
    marginRight: 4,
  },
}); 