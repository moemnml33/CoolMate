import { ThemedText } from "@/components/ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const STICKYNOTESCOLORS = [
  "#FBF8CC",
  "#FDE4CF",
  "#FFCFD2",
  "#F1C0E8",
  "#CFBAF0",
  "#A3C4F3",
  "#90DBF4",
  "#8EECF5",
  "#98F5E1",
  "#B9FBC0",
];

const stickyNotes = [
  { id: "1", text: "Buy milk and eggs" },
  { id: "2", text: "Schedule dentist appointment" },
  { id: "3", text: "Pay electricity bill" },
  { id: "4", text: "Call mom" },
];

const icons = {
  chores: "clipboard-check",
  expenses: "cash",
  groceries: "bag",
  notes: "pushpin",
};

const buttonsColors = {
  expenses: "#17C3B2",
  chores: "#FFCB77",
  groceries: "#FE6D73",
  notes: "#227C9D",
};

const todaysOverview = [
  {
    id: "1",
    text: "You have 3 chores to do today",
    icon: icons.chores,
    type: "chores",
  },
  {
    id: "2",
    text: "You have 2 expenses to log",
    icon: icons.expenses,
    type: "expenses",
  },
  {
    id: "3",
    text: "You have 1 grocery item to buy",
    icon: icons.groceries,
    type: "groceries",
  },
];

const user = {
  name: "Alex",
  household: "The Smith Family",
};

export default function HomeScreen() {
  const router = useRouter();
  const width = Dimensions.get("window").width;

  const quickActionButtons = [
    {
      title: "Expenses",
      icon: "cash",
      iconLib: Ionicons,
      onPress: () => router.navigate("/expenses"),
      backgroundColor: buttonsColors.expenses,
    },
    {
      title: "Chores",
      icon: "clipboard-check",
      iconLib: MaterialCommunityIcons,
      onPress: () => router.navigate("/chores"),
      backgroundColor: buttonsColors.chores,
    },
    {
      title: "Groceries",
      icon: "bag",
      iconLib: Ionicons,
      onPress: () => router.navigate("/groceries"),
      backgroundColor: buttonsColors.groceries,
    },
    {
      title: "Notes",
      icon: "pushpin",
      iconLib: AntDesign,
      onPress: () => router.navigate("/groceries"),
      backgroundColor: buttonsColors.notes,
    },
  ];

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case icons.chores:
        return (
          <MaterialCommunityIcons
            name="clipboard-check"
            size={24}
            color="white"
          />
        );
      case icons.expenses:
        return <Ionicons name="cash" size={24} color="white" />;
      case icons.groceries:
        return <Ionicons name="bag" size={24} color="white" />;
      default:
        return null;
    }
  };

  const renderQuickActionItem = ({ item, index }) => (
    <View style={{ alignItems: "center" }}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: item.backgroundColor },
          pressed && styles.buttonPressed,
        ]}
        onPress={item.onPress}
      >
        <item.iconLib name={item.icon as any} size={24} color="white" />
      </Pressable>
      <Text style={{ paddingTop: 4 }}>{item.title}</Text>
    </View>
  );

  const renderOverviewItem = ({ item }) => (
    <View style={styles.overviewItem}>
      <View
        style={[
          styles.overviewIconContainer,
          {
            backgroundColor:
              buttonsColors[item.type as keyof typeof buttonsColors],
          },
        ]}
      >
        {getIconComponent(item.icon)}
      </View>
      <Text style={styles.overviewText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View>
            <ThemedText type="subtitle">Hi, {user.name} 👋</ThemedText>
            <Text style={styles.householdText}>{user.household}</Text>
          </View>
          <Pressable>
            <Ionicons name="person-circle" size={44} />
          </Pressable>
        </View>

        <View style={styles.container}>
          <ThemedText type="subtitle" style={styles.subtitles}>
            Quick Actions
          </ThemedText>
          <FlatList
            data={quickActionButtons}
            renderItem={renderQuickActionItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContainer}
          />
        </View>
        <View style={styles.container}>
          <ThemedText type="subtitle" style={styles.subtitles}>
            Sticky Notes
          </ThemedText>
          <Carousel
            mode={"horizontal-stack"}
            modeConfig={{
              snapDirection: "left",
              stackInterval: 18,
            }}
            autoPlayInterval={2000}
            pagingEnabled={true}
            snapEnabled={true}
            loop={true}
            width={width}
            height={width / 2}
            autoPlay={false}
            data={stickyNotes}
            renderItem={({ index, item }) => (
              <View style={styles.carouselItemContainer}>
                <View
                  style={[
                    styles.stickyNote,
                    {
                      backgroundColor:
                        STICKYNOTESCOLORS[index % STICKYNOTESCOLORS.length],
                    },
                  ]}
                >
                  <Text style={styles.noteText}>{item.text}</Text>
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.container}>
          <ThemedText type="subtitle" style={styles.subtitles}>
            Today's Overview
          </ThemedText>
          <FlatList
            data={todaysOverview}
            renderItem={renderOverviewItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.overviewContainer}
            ItemSeparatorComponent={() => (
              <View style={styles.overviewSeparator} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: "4%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: "2%",
    paddingBottom: "3%",
    borderBottomColor: "#DDD",
  },
  householdText: {
    paddingTop: 4,
    fontSize: 14,
    color: "#666",
  },
  quickActionsContainer: {
    justifyContent: "space-around",
    width: "100%",
    alignSelf: "center",
    marginTop: "2%",
    paddingVertical: "4%",
    backgroundColor: "white",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  button: {
    padding: 16,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  subtitles: {
    paddingVertical: "3%",
  },
  carouselItemContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  stickyNote: {
    width: "70%",
    height: "85%",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "center",
  },
  noteText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  overviewContainer: {
    padding: "3%",
    backgroundColor: "white",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  overviewItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "3%",
  },
  overviewSeparator: {
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  overviewIconContainer: {
    borderRadius: 50,
    padding: 10,
    marginRight: 15,
  },
  overviewText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
});
