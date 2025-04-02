import React, { createContext, useContext, useState } from 'react';
import { groceries, chores, expenses } from '@/data/data';

type TaskContextType = {
  completedTasks: { [key: string]: boolean };
  checkedGroceries: { [key: string]: boolean };
  toggleTask: (taskId: string) => void;
  toggleGroceryItem: (item: string) => void;
  clearGroceryList: () => void;
  markAllGroceries: () => void;
  groceryItems: string[];
  addGroceryItem: (item: string) => void;
  recentGroceries: string[];
  recentChores: typeof chores.tasks;
  recentExpenses: typeof expenses.shared;
  addChore: (task: typeof chores.tasks[0]) => void;
  addExpense: (expense: typeof expenses.shared[0]) => void;
  removeExpense: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});
  const [checkedGroceries, setCheckedGroceries] = useState<{ [key: string]: boolean }>({});
  const [groceryItems, setGroceryItems] = useState<string[]>(groceries.items);
  
  const [recentGroceries, setRecentGroceries] = useState<string[]>(groceries.items.slice(0, 3));
  const [recentChores, setRecentChores] = useState(chores.tasks.slice(0, 3));
  const [recentExpenses, setRecentExpenses] = useState(expenses.shared.slice(0, 3));

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
    setGroceryItems([]);
    setRecentGroceries([]);
  };

  const markAllGroceries = () => {
    const allChecked = groceryItems.reduce((acc, item) => ({
      ...acc,
      [item]: true
    }), {});
    setCheckedGroceries(allChecked);
  };

  const addGroceryItem = (item: string) => {
    setGroceryItems(prev => [item, ...prev]);
    setRecentGroceries(prev => [item, ...prev].slice(0, 3));
    setCheckedGroceries(prev => ({
      ...prev,
      [item]: false
    }));
  };

  const addChore = (task: typeof chores.tasks[0]) => {
    setRecentChores(prev => [task, ...prev].slice(0, 3));
  };

  const addExpense = (expense: typeof expenses.shared[0]) => {
    setRecentExpenses(prev => [expense, ...prev].slice(0, 3));
  };

  const removeExpense = (id: string) => {
    setRecentExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return (
    <TaskContext.Provider value={{
      completedTasks,
      checkedGroceries,
      toggleTask,
      toggleGroceryItem,
      clearGroceryList,
      markAllGroceries,
      groceryItems,
      addGroceryItem,
      recentGroceries,
      recentChores,
      recentExpenses,
      addChore,
      addExpense,
      removeExpense,
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