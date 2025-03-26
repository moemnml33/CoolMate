import React, { createContext, useContext, useState } from 'react';
import { groceries } from '@/data/data';

type TaskContextType = {
  completedTasks: { [key: string]: boolean };
  checkedGroceries: { [key: string]: boolean };
  toggleTask: (taskId: string) => void;
  toggleGroceryItem: (item: string) => void;
  clearGroceryList: () => void;
  markAllGroceries: () => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});
  const [checkedGroceries, setCheckedGroceries] = useState<{ [key: string]: boolean }>({});

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleGroceryItem = (item: string) => {
    setCheckedGroceries(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const clearGroceryList = () => {
    setCheckedGroceries({});
  };

  const markAllGroceries = () => {
    const allChecked = groceries.items.reduce((acc, item) => ({
      ...acc,
      [item]: true
    }), {});
    setCheckedGroceries(allChecked);
  };

  return (
    <TaskContext.Provider value={{
      completedTasks,
      checkedGroceries,
      toggleTask,
      toggleGroceryItem,
      clearGroceryList,
      markAllGroceries
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}; 