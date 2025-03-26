import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Checkbox } from "@/components/ui/Checkbox";

type Task = {
  id: string;
  title: string;
  dueDate: string;
  isToday: boolean;
};

const tasks: Task[] = [
  { id: "1", title: "Do dishes", dueDate: "due by 3:30pm", isToday: true },
  { id: "2", title: "Clean living room", dueDate: "due by 8:00pm", isToday: true },
  { id: "3", title: "Take dog to vet", dueDate: "Tomorrow", isToday: false },
  { id: "4", title: "Take out trash", dueDate: "In two days", isToday: false },
  { id: "5", title: "Buy new sofa", dueDate: "No due date", isToday: false },
];

export default function ChoresScreen() {
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const renderTask = (task: Task) => (
    <View key={task.id} style={[styles.taskCard, !task.isToday && styles.upcomingTask]}>
      <View style={styles.taskLeft}>
        <Checkbox
          checked={completedTasks[task.id] || false}
          onPress={() => toggleTask(task.id)}
          color="#FFCB77"
        />
        <View>
          <ThemedText style={styles.taskTitle}>{task.title}</ThemedText>
          <View style={styles.dueDateContainer}>
            <Ionicons name="calendar" size={14} color="#687076" />
            <ThemedText style={styles.dueDate}>{task.dueDate}</ThemedText>
          </View>
        </View>
      </View>
      {task.isToday && (
        <View style={styles.avatar} />
      )}
    </View>
  );

  const todayTasks = tasks.filter(task => task.isToday);
  const upcomingTasks = tasks.filter(task => !task.isToday);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText type="title">Chores</ThemedText>
          <Pressable style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FFCB77" />
          </Pressable>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Today's Tasks
          </ThemedText>
          {todayTasks.map(renderTask)}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Upcoming Tasks
          </ThemedText>
          {upcomingTasks.map(renderTask)}
        </View>

        <Pressable style={styles.showCompletedButton}>
          <ThemedText style={styles.showCompletedText}>
            Show Completed Tasks
          </ThemedText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF9EF",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFF9EF",
    borderRadius: 12,
    marginBottom: 12,
  },
  upcomingTask: {
    backgroundColor: "transparent",
    padding: 12,
  },
  taskLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  taskTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dueDate: {
    fontSize: 14,
    color: "#687076",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E1E1E1",
  },
  showCompletedButton: {
    alignItems: "center",
    paddingVertical: 16,
  },
  showCompletedText: {
    color: "#687076",
  },
});
