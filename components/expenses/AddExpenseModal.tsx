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
  Platform,
} from "react-native";
import { BottomSheetModal } from "@/components/ui/BottomSheetModal";
import { colors } from "@/data/data";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.9;

type AddExpenseModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (expense: Omit<Expense, "id">) => void;
  onEdit?: (expense: Expense) => void;
  initialExpense?: Expense;
};

export function AddExpenseModal({
  isVisible,
  onClose,
  onAdd,
  onEdit,
  initialExpense,
}: AddExpenseModalProps) {
  const [amount, setAmount] = useState(initialExpense?.amount || "");
  const [title, setTitle] = useState(initialExpense?.title || "");
  const [paidTo, setPaidTo] = useState(initialExpense?.paidTo || "");
  const [paidBy, setPaidBy] = useState<string[]>(initialExpense?.paidBy || []);
  const [dueDate, setDueDate] = useState(() => {
    if (initialExpense?.dueDate) {
      const parts = initialExpense.dueDate.split("/");
      if (parts.length === 3) {
        const [month, day, year] = parts;
        return new Date(Number(year), Number(month) - 1, Number(day));
      }
    }
    return new Date();
  });
  const [frequency, setFrequency] = useState<Expense["frequency"]>(
    initialExpense?.frequency || "once"
  );

  const [showPaidToModal, setShowPaidToModal] = useState(false);
  const [showPaidByModal, setShowPaidByModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date()); // For iOS

  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

  useEffect(() => {
    if (initialExpense) {
      setAmount(initialExpense.amount);
      setTitle(initialExpense.title);
      setPaidTo(initialExpense.paidTo || "");
      setPaidBy(initialExpense.paidBy || []);
      if (initialExpense.dueDate) {
        const parts = initialExpense.dueDate.split("/");
        if (parts.length === 3) {
          const [month, day, year] = parts;
          setDueDate(new Date(Number(year), Number(month) - 1, Number(day)));
        }
      }
      setFrequency(initialExpense.frequency || "once");
    }
  }, [initialExpense]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isVisible) {
      setAmount("");
      setTitle("");
      setPaidTo("");
      setPaidBy([]);
      setDueDate(new Date());
      setFrequency("once");
    }
  }, [isVisible]);

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

    if (initialExpense && onEdit) {
      onEdit({
        ...initialExpense,
        amount,
        title,
        paidTo,
        paidBy,
        dueDate: dueDate.toLocaleDateString(),
        frequency,
      });
    } else {
      onAdd({
        title,
        amount,
        paidTo,
        paidBy,
        dueDate: dueDate.toLocaleDateString(),
        frequency,
        type: "shared",
        paidCount: `0/${paidBy.length}`,
      });
    }

    // Reset form
    setAmount("");
    setTitle("");
    setPaidTo("");
    setPaidBy([]);
    setDueDate(new Date());
    setFrequency("once");
    onClose();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dueDate;

    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      if (Platform.OS === "ios") {
        setTempDate(currentDate);
      } else {
        setDueDate(currentDate);
      }
    }
  };

  const handleIOSDateConfirm = () => {
    setDueDate(tempDate);
    setShowDatePicker(false);
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
    <BottomSheetModal
      isVisible={isVisible}
      onClose={onClose}
      title="Add an expense"
      onFinish={handleFinish}
      finishButtonColor={colors.expenses}>
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
                  style={frequency === f && styles.frequencyOptionSelectedText}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

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

      {Platform.OS === "ios" ? (
        <Modal visible={showDatePicker} animationType="slide" transparent>
          <View style={styles.datePickerModal}>
            <View style={styles.datePickerContent}>
              <View style={styles.datePickerHeader}>
                <Pressable onPress={() => setShowDatePicker(false)}>
                  <ThemedText style={styles.datePickerButton}>
                    Cancel
                  </ThemedText>
                </Pressable>
                <Pressable onPress={handleIOSDateConfirm}>
                  <ThemedText style={styles.datePickerButton}>Done</ThemedText>
                </Pressable>
              </View>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                style={styles.datePickerIOS}
              />
            </View>
          </View>
        </Modal>
      ) : (
        showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            onChange={handleDateChange}
          />
        )
      )}
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
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
  datePickerModal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  datePickerContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  datePickerButton: {
    color: "#17C3B2",
    fontSize: 16,
    fontWeight: "600",
  },
  datePickerIOS: {
    height: 200,
  },
});
