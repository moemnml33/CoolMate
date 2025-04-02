import { ThemedText } from "@/components/ThemedText";
import { chores, colors } from "@/data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Checkbox } from "@/components/ui/Checkbox";
import { useTaskContext } from "@/contexts/TaskContext";
import { AddTaskModal } from "@/components/tasks/AddTaskModal";

export default function ChoresScreen() {
  const { completedTasks, toggleTask } = useTaskContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [localTasks, setLocalTasks] = useState(chores.tasks);

  const handleAddTask = (newTask: {
    title: string;
    description?: string;
    assignedTo: string;
    dueDate: string;
  }) => {
    const taskWithId = {
      ...newTask,
      id: Date.now().toString(),
      isToday: newTask.dueDate.includes("due by"),
    };

    setLocalTasks((prev) => [...prev, taskWithId]);
  };

  const renderTask = (task: (typeof chores.tasks)[0]) => (
    <View
      key={task.id}
      style={[styles.taskCard, !task.isToday && styles.upcomingTask]}>
      <View style={styles.taskLeft}>
        <Checkbox
          checked={completedTasks[task.id] || false}
          onPress={() => toggleTask(task.id)}
          color={colors.chores}
        />
        <View>
          <ThemedText style={styles.taskTitle}>{task.title}</ThemedText>
          <View style={styles.dueDateContainer}>
            <Ionicons name="calendar" size={14} color="#687076" />
            <ThemedText style={styles.dueDate}>{task.dueDate}</ThemedText>
          </View>
        </View>
      </View>
      {task.isToday && <View style={styles.avatar} />}
    </View>
  );

  const todayTasks = localTasks.filter((task) => task.isToday);
  const upcomingTasks = localTasks.filter((task) => !task.isToday);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AddTaskModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAdd={handleAddTask}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText type="title">Chores</ThemedText>
          <Pressable 
            style={styles.addButton}
            onPress={() => setIsModalVisible(true)}>
            <Ionicons name="add" size={24} color={colors.chores} />
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
