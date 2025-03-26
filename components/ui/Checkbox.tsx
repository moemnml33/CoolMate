import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type CheckboxProps = {
  checked: boolean;
  onPress: () => void;
  color?: string;
};

export function Checkbox({ checked, onPress, color = "#FE6D73" }: CheckboxProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View 
        style={[
          styles.checkbox, 
          { borderColor: color },
          checked && { backgroundColor: color }
        ]}
      >
        {checked && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
}); 