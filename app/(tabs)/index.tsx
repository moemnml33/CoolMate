import { ThemedText } from "@/components/ThemedText";
import {
  user,
  overview,
  notes,
  colors,
  icons,
  chores,
  groceries,
} from "@/data/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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
import { useTaskContext } from "@/contexts/TaskContext";
import { useProfileDrawer } from "@/contexts/ProfileDrawerContext";

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

const pendingPayments = [
  {
    id: "1",
    description: "Spotify",
    amount: "$9.99",
    dueDate: "Apr 15",
  },
  {
    id: "2",
    description: "Netflix",
    amount: "$15.49",
    dueDate: "Apr 20",
  },
  {
    id: "3",
    description: "Internet Bill",
    amount: "$69.99",
    dueDate: "Apr 25",
  },
];

const groceryItems = [
  { id: "1", item: "Milk", quantity: "1 gallon", category: "Dairy" },
  { id: "2", item: "Bread", quantity: "1 loaf", category: "Bakery" },
  { id: "3", item: "Eggs", quantity: "1 dozen", category: "Dairy" },
];

export default function HomeScreen() {
  const router = useRouter();
  const width = Dimensions.get("window").width;
  const {
    completedTasks,
    checkedGroceries,
    recentGroceries,
    recentChores,
    recentExpenses,
    groceryItems,
  } = useTaskContext();
  const { showDrawer } = useProfileDrawer();

  // Calculate actual counts
  const todayChoresCount = recentChores.filter(
    (task) => task.isToday && !completedTasks[task.id]
  ).length;

  const uncheckedGroceriesCount = groceryItems.filter(
    (item) => !checkedGroceries[item]
  ).length;

  const todaysOverview = [
    {
      id: "1",
      text: `You have ${todayChoresCount} chores to do today`,
      icon: icons.chores,
      type: "chores",
    },
    {
      id: "2",
      text: `You have ${recentExpenses.length} expenses to log`,
      icon: icons.expenses,
      type: "expenses",
    },
    {
      id: "3",
      text: `You have ${uncheckedGroceriesCount} grocery items to buy`,
      icon: icons.groceries,
      type: "groceries",
    },
  ];

  const quickActionButtons = [
    {
      title: "Expenses",
      icon: icons.expenses,
      iconLib: Ionicons,
      onPress: () => router.navigate("/expenses"),
      backgroundColor: colors.expenses,
    },
    {
      title: "Groceries",
      icon: icons.groceries,
      iconLib: Ionicons,
      onPress: () => router.navigate("/groceries"),
      backgroundColor: colors.groceries,
    },
    {
      title: "Chores",
      icon: icons.chores,
      iconLib: MaterialCommunityIcons,
      onPress: () => router.navigate("/chores"),
      backgroundColor: colors.chores,
    },
    {
      title: "Notes",
      icon: icons.notes,
      iconLib: AntDesign,
      onPress: () => router.navigate("/groceries"),
      backgroundColor: colors.notes,
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

  const renderQuickActionItem = ({ item }: any) => (
    <View style={{ alignItems: "center" }}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: item.backgroundColor },
          pressed && styles.buttonPressed,
        ]}
        onPress={item.onPress}>
        <item.iconLib name={item.icon as any} size={24} color="white" />
      </Pressable>
      <Text style={{ paddingTop: 4 }}>{item.title}</Text>
    </View>
  );

  const renderOverviewItem = ({ item }: any) => (
    <View style={styles.overviewItem}>
      <View
        style={[
          styles.overviewIconContainer,
          {
            backgroundColor:
              buttonsColors[item.type as keyof typeof buttonsColors],
          },
        ]}>
        {getIconComponent(item.icon)}
      </View>
      <ThemedText style={styles.overviewText}>{item.text}</ThemedText>
    </View>
  );

  const renderPaymentItem = ({ item }: any) => (
    <View style={styles.widgetItem}>
      <View style={styles.widgetItemLeft}>
        <Text style={styles.widgetItemDescription}>{item.description}</Text>
        <Text style={styles.widgetItemSubtext}>Due: {item.dueDate}</Text>
      </View>
      <Text style={styles.widgetItemAmount}>{item.amount}</Text>
    </View>
  );

  const renderGroceryItem = ({ item }: { item: string }) => (
    <View style={styles.widgetItem}>
      <View style={styles.widgetItemLeft}>
        <Text style={styles.widgetItemDescription}>{item}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View>
            <ThemedText type="title">Hi {user.name}</ThemedText>
            <ThemedText style={styles.householdText}>
              {user.household}
            </ThemedText>
          </View>
          <Pressable onPress={showDrawer}>
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
            data={notes.items}
            renderItem={({ index, item }) => (
              <View style={styles.carouselItemContainer}>
                <View
                  style={[
                    styles.stickyNote,
                    {
                      backgroundColor:
                        STICKYNOTESCOLORS[index % STICKYNOTESCOLORS.length],
                    },
                  ]}>
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
        <View style={styles.twoWidgetsContainer}>
          <View style={styles.halfWidget}>
            <ThemedText type="subtitle" style={styles.subtitles}>
              Pending Payments
            </ThemedText>
            <View style={styles.widgetContentContainer}>
              <FlatList
                data={pendingPayments}
                renderItem={renderPaymentItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View style={styles.overviewSeparator} />
                )}
              />
            </View>
          </View>
          <View style={styles.halfWidget}>
            <ThemedText type="subtitle" style={styles.subtitles}>
              Grocery Items
            </ThemedText>
            <View style={styles.widgetContentContainer}>
              <FlatList
                data={recentGroceries}
                renderItem={renderGroceryItem}
                keyExtractor={(item) => item}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View style={styles.overviewSeparator} />
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {
    marginBottom: "10%",
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
    paddingBottom: "2%",
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
    marginTop: "1%",
    paddingVertical: "3%",
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
    paddingVertical: "4%",
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
    paddingVertical: "2%",
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
    flex: 1,
  },
  twoWidgetsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "4%",
    paddingVertical: "4%",
  },
  halfWidget: {
    width: "48%",
  },
  widgetContentContainer: {
    backgroundColor: "white",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    padding: "4%",
    marginTop: "3%",
  },
  widgetItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "4%",
    paddingHorizontal: "4%",
  },
  widgetItemLeft: {
    flex: 1,
  },
  widgetItemDescription: {
    fontSize: 14,
    fontWeight: "bold",
  },
  widgetItemSubtext: {
    fontSize: 12,
    color: "#666",
  },
  widgetItemAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
