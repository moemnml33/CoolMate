import { ThemedText } from "@/components/ThemedText";
import { colors, householdMembers } from "@/data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Keyboard,
} from "react-native";
import { BottomSheetModal } from "@/components/ui/BottomSheetModal";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.9;

type AddTaskModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (task: {
    title: string;
    description?: string;
    assignedTo: string;
    dueDate: string;
  }) => void;
};

export function AddTaskModal({ isVisible, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [frequency, setFrequency] = useState<
    "once" | "daily" | "weekly" | "monthly"
  >("once");

  const [showAssigneeModal, setShowAssigneeModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

  const handleFinish = () => {
    const missingFields = [];
    if (!title) missingFields.push("Title");
    if (!assignedTo) missingFields.push("Assign to");

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
      description,
      assignedTo,
      dueDate: formatDueDate(dueDate),
    });

    // Reset form
    setTitle("");
    setDescription("");
    setAssignedTo("");
    setDueDate(new Date());
    setFrequency("once");
    onClose();
  };

  const formatDueDate = (date: Date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return `due by ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    return `in ${Math.ceil(
      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )} days`;
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
      title="Add a task"
      onFinish={handleFinish}
      finishButtonColor={colors.chores}>
      <View style={styles.form}>
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
          <ThemedText style={styles.label}>Description</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Enter") {
                Keyboard.dismiss();
              }
            }}
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Assign to</ThemedText>
          <Pressable
            style={styles.selectInput}
            onPress={() => setShowAssigneeModal(true)}>
            <ThemedText
              style={assignedTo ? styles.selectedText : styles.placeholderText}>
              {assignedTo || "(Name)"}
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
              {formatDueDate(dueDate)}
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

      {/* Selection Modal */}
      <Modal visible={showAssigneeModal} animationType="slide" transparent>
        <View style={styles.selectionModal}>
          <View style={styles.selectionContent}>
            <ThemedText type="subtitle" style={styles.selectionTitle}>
              Select assignee
            </ThemedText>
            {householdMembers.map((member) => (
              <Pressable
                key={member}
                style={styles.selectionItem}
                onPress={() => {
                  setAssignedTo(member);
                  setShowAssigneeModal(false);
                }}>
                <ThemedText>{member}</ThemedText>
              </Pressable>
            ))}
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
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
  selectedText: {
    color: "#000",
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
    backgroundColor: colors.chores,
  },
  frequencyOptionSelectedText: {
    color: "white",
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
    color: colors.chores,
    fontSize: 16,
    fontWeight: "600",
  },
  datePickerIOS: {
    height: 200,
  },
});
