import { ThemedText } from "@/components/ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      backgroundColor: "#17C3B2",
    },
    {
      title: "Chores",
      icon: "clipboard-check",
      iconLib: MaterialCommunityIcons,
      onPress: () => router.navigate("/chores"),
      backgroundColor: "#FFCB77",
    },
    {
      title: "Groceries",
      icon: "bag",
      iconLib: Ionicons,
      onPress: () => router.navigate("/groceries"),
      backgroundColor: "#FE6D73",
    },
    {
      title: "Notes",
      icon: "pushpin",
      iconLib: AntDesign,
      onPress: () => router.navigate("/groceries"),
      backgroundColor: "#227C9D",
    },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header Section: Greeting & Profile Icon */}

      <ScrollView>
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
        <ThemedText type="subtitle" style={styles.subtitles}>
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
        <View>
          <ThemedText type="subtitle" style={styles.subtitles}>
            Sticky Notes
          </ThemedText>
          <Text>Coming soon...</Text>
        </View>
        <View>
          <ThemedText type="subtitle" style={styles.subtitles}>
            Overview
          </ThemedText>
          <Text>Coming soon...</Text>
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
  subtitles: { paddingLeft: "4%", paddingTop: "3%" },
});
