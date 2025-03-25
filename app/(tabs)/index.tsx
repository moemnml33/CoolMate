import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const user = {
    name: "Alex",
    household: "The Smith Family",
  };

  const quickActionButtons = [
    {
      title: "Expenses",
      icon: "cash",
      iconLib: Ionicons,
      onPress: () => router.navigate("/expenses"),
      backgroundColor: "#007AFF",
    },
    {
      title: "Chores",
      icon: "clipboard-check",
      iconLib: MaterialCommunityIcons,
      onPress: () => router.navigate("/chores"),
      backgroundColor: "#000FFF",
    },
    {
      title: "Groceries",
      icon: "bag",
      iconLib: Ionicons,
      onPress: () => router.navigate("/groceries"),
      backgroundColor: "#0F0F0F",
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header Section: Greeting & Profile Icon */}
      <View style={styles.headerContainer}>
        <View>
          <ThemedText type="subtitle">Hi, {user.name} 👋</ThemedText>
          <Text style={styles.householdText}>{user.household}</Text>
        </View>

        {/* <Pressable onPress={() => router.navigate("/user")}> */}
        <Pressable>
          <Ionicons name="person-circle" size={44} />
        </Pressable>
      </View>

      <ScrollView>
        <ThemedText
          type="subtitle"
          style={{ paddingLeft: "4%", paddingTop: "3%" }}
        >
          Quick Actions
        </ThemedText>
        <View style={styles.quickActionsContainer}>
          {quickActionButtons.map(
            (
              { title, icon, iconLib: IconLib, onPress, backgroundColor },
              index
            ) => (
              <View key={index} style={{ alignItems: "center" }}>
                <Pressable
                  key={index}
                  style={({ pressed }) => [
                    styles.button,
                    { backgroundColor },
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={onPress}
                >
                  <IconLib name={icon as any} size={24} color="white" />
                </Pressable>
                <Text style={{ paddingTop: 4 }}>{title}</Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: "2%",
    paddingBottom: "3%",
    borderBottomColor: "#DDD",
    // borderBottomWidth: 1,
    // backgroundColor: "white",
  },
  householdText: {
    paddingTop: 4,
    fontSize: 14,
    color: "#666",
  },
  quickActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
    alignSelf: "center",
    marginTop: "2%",
    paddingVertical: 10,
    // backgroundColor: "white",
    // borderRadius: 18,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
  },
  button: {
    padding: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
