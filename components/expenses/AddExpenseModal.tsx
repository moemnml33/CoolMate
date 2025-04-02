import { ThemedText } from "@/components/ThemedText";
import { Expense, householdMembers } from "@/data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Alert,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.9;

type AddExpenseModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (expense: Omit<Expense, "id">) => void;
};

export function AddExpenseModal({
  isVisible,
  onClose,
  onAdd,
}: AddExpenseModalProps) {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [paidTo, setPaidTo] = useState("");
  const [paidBy, setPaidBy] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState(new Date());
  const [frequency, setFrequency] = useState<Expense["frequency"]>("once");

  const [showPaidToModal, setShowPaidToModal] = useState(false);
  const [showPaidByModal, setShowPaidByModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

  const handleFinish = () => {
    const missingFields = [];
    if (!amount) missingFields.push("Amount");
    if (!title) missingFields.push("Title");
    if (!paidTo) missingFields.push("Paid to");
    if (paidBy.length === 0) missingFields.push("Paid by");

    if (missingFields.length > 0) {
      Alert.alert(
        "Missing Information",
        `Please fill in the following fields:\n${missingFields.join("\n")}`,
        [{ text: "OK" }]
      );
      return;
    }

    onAdd({
      title,
      amount,
      paidTo,
      paidBy,
      dueDate: dueDate.toLocaleDateString(),
      frequency,
      type: "shared",
      paidCount: `0/${paidBy.length}`, // Dynamic count based on selected people
    });

    // Reset form
    setAmount("");
    setTitle("");
    setPaidTo("");
    setPaidBy([]);
    setDueDate(new Date());
    setFrequency("once");
    onClose();
  };

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isVisible ? 0 : MODAL_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Animated.View style={[styles.modal, { transform: [{ translateY }] }]}>
        <View style={styles.thumb} />

        <View style={styles.header}>
          <Pressable onPress={onClose}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <ThemedText type="title">Add an expense</ThemedText>
          <Pressable onPress={handleFinish}>
            <ThemedText style={styles.finishButton}>Finish</ThemedText>
          </Pressable>
        </View>

        <View style={styles.form}>
          <View style={styles.amountContainer}>
            <ThemedText style={styles.currencySymbol}>$</ThemedText>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Title</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Paid to</ThemedText>
            <Pressable
              style={styles.selectInput}
              onPress={() => setShowPaidToModal(true)}>
              <ThemedText
                style={paidTo ? styles.selectedText : styles.placeholderText}>
                {paidTo || "(Name)"}
              </ThemedText>
              <Ionicons name="chevron-down" size={20} color="#999" />
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Paid by</ThemedText>
            <Pressable
              style={styles.selectInput}
              onPress={() => setShowPaidByModal(true)}>
              <ThemedText
                style={
                  paidBy.length ? styles.selectedText : styles.placeholderText
                }>
                {paidBy.length ? paidBy.join(", ") : "(Name(s))"}
              </ThemedText>
              <Ionicons name="add" size={20} color="#999" />
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Due by</ThemedText>
            <Pressable
              style={styles.selectInput}
              onPress={() => setShowDatePicker(true)}>
              <ThemedText style={styles.selectedText}>
                {dueDate.toLocaleDateString()}
              </ThemedText>
              <Ionicons name="calendar" size={20} color="#999" />
            </Pressable>
          </View>

          <View style={styles.frequencyContainer}>
            <ThemedText style={styles.label}>Frequency</ThemedText>
            <View style={styles.frequencyOptions}>
              {(["once", "daily", "weekly", "monthly"] as const).map((f) => (
                <Pressable
                  key={f}
                  style={[
                    styles.frequencyOption,
                    frequency === f && styles.frequencyOptionSelected,
                  ]}
                  onPress={() => setFrequency(f)}>
                  <ThemedText
                    style={
                      frequency === f && styles.frequencyOptionSelectedText
                    }>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Selection Modals */}
      <Modal visible={showPaidToModal} animationType="slide" transparent>
        <View style={styles.selectionModal}>
          <View style={styles.selectionContent}>
            <ThemedText type="subtitle" style={styles.selectionTitle}>
              Select who was paid
            </ThemedText>
            {householdMembers.map((member) => (
              <Pressable
                key={member}
                style={styles.selectionItem}
                onPress={() => {
                  setPaidTo(member);
                  setShowPaidToModal(false);
                }}>
                <ThemedText>{member}</ThemedText>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={showPaidByModal} animationType="slide" transparent>
        <View style={styles.selectionModal}>
          <View style={styles.selectionContent}>
            <ThemedText type="subtitle" style={styles.selectionTitle}>
              Select who paid
            </ThemedText>
            {householdMembers.map((member) => (
              <Pressable
                key={member}
                style={[
                  styles.selectionItem,
                  paidBy.includes(member) && styles.selectionItemSelected,
                ]}
                onPress={() => {
                  setPaidBy((prev) =>
                    prev.includes(member)
                      ? prev.filter((m) => m !== member)
                      : [...prev, member]
                  );
                }}>
                <ThemedText>{member}</ThemedText>
              </Pressable>
            ))}
            <Pressable
              style={styles.doneButton}
              onPress={() => setShowPaidByModal(false)}>
              <ThemedText style={styles.doneButtonText}>Done</ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) setDueDate(date);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: MODAL_HEIGHT,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  thumb: {
    width: 40,
    height: 4,
    backgroundColor: "#DDD",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  finishButton: {
    color: "#17C3B2",
    fontSize: 16,
    fontWeight: "600",
  },
  form: {
    gap: 24,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginBottom: 8,
  },
  currencySymbol: {
    fontSize: 32,
    color: "#999",
  },
  amountInput: {
    fontSize: 32,
    minWidth: 100,
    textAlign: "center",
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: "#687076",
  },
  input: {
    height: 48,
    borderRadius: 8,
    backgroundColor: "#F1F3F5",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  selectInput: {
    height: 48,
    borderRadius: 8,
    backgroundColor: "#F1F3F5",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholderText: {
    color: "#999",
    fontSize: 16,
  },
  frequencyContainer: {
    gap: 8,
  },
  frequencyOptions: {
    flexDirection: "row",
    gap: 8,
  },
  frequencyOption: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F3F5",
    alignItems: "center",
    justifyContent: "center",
  },
  frequencyOptionSelected: {
    backgroundColor: "#17C3B2",
  },
  selectedText: {
    color: "#000",
    fontSize: 16,
  },
  selectionModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  selectionContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  selectionTitle: {
    marginBottom: 16,
  },
  selectionItem: {
    padding: 12,
    borderRadius: 8,
  },
  selectionItemSelected: {
    backgroundColor: "#E8F8F7",
  },
  doneButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#17C3B2",
    borderRadius: 8,
    alignItems: "center",
  },
  doneButtonText: {
    color: "white",
    fontWeight: "600",
  },
  frequencyOptionSelectedText: {
    color: "white",
  },
});
