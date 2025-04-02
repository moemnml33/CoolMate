import { ThemedText } from "@/components/ThemedText";
import { colors } from "@/data/data";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { BottomSheetModal } from "@/components/ui/BottomSheetModal";
import Ionicons from "@expo/vector-icons/Ionicons";

type AddNoteModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (note: { text: string }) => void;
};

export function AddNoteModal({ isVisible, onClose, onAdd }: AddNoteModalProps) {
  const [text, setText] = useState("");

  const handleFinish = () => {
    if (!text.trim()) return;
    onAdd({ text: text.trim() });
    setText("");
    onClose();
  };

  return (
    <BottomSheetModal
      isVisible={isVisible}
      onClose={onClose}
      title="Add a sticky note"
      onFinish={handleFinish}
      finishButtonColor={colors.notes}>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Note</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#ADB5BD"
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={4}
          />
        </View>

        <Pressable style={styles.attachButton}>
          <Ionicons name="attach" size={20} color="#687076" />
          <ThemedText style={styles.attachText}>Attach file</ThemedText>
        </Pressable>
      </View>
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
    color: "#687076",
  },
  input: {
    backgroundColor: "#F1F3F5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F1F3F5",
  },
  attachText: {
    color: "#687076",
  },
}); 