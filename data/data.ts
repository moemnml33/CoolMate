export const user = {
  name: "Alex",
  household: "The Smith Family",
};

export const expenses = {
  balances: {
    youOwe: 413.50,
    youAreOwed: 55.60,
  },
  shared: [
    {
      id: "1",
      title: "Rent Bill",
      amount: "1200",
      dueDate: "3 days",
      paidCount: "2/3",
    },
    {
      id: "2",
      title: "Electricity Bill",
      amount: "300",
      dueDate: "one month",
      paidCount: "0/3",
    },
  ],
  pending: [
    {
      id: "1",
      title: "Pizza night",
      amount: "13.50",
      ownerInfo: "You owe Jessica",
    },
    {
      id: "2",
      title: "Gas",
      amount: "55.60",
      ownerInfo: "Mark owes you",
    },
  ],
};

export const chores = {
  tasks: [
    { id: "1", title: "Do dishes", dueDate: "due by 3:30pm", isToday: true },
    { id: "2", title: "Clean living room", dueDate: "due by 8:00pm", isToday: true },
    { id: "3", title: "Take dog to vet", dueDate: "Tomorrow", isToday: false },
    { id: "4", title: "Take out trash", dueDate: "In two days", isToday: false },
    { id: "5", title: "Buy new sofa", dueDate: "No due date", isToday: false },
  ],
};

export const groceries = {
  items: [
    "Tomatoes",
    "Eggs",
    "Cereal",
    "Milk",
    "Lettuce",
    "Ground beef",
    "Chicken wings",
    "Toilet paper",
    "Sprite",
  ],
};

export const notes = {
  items: [
    { id: "1", text: "Buy milk and eggs" },
    { id: "2", text: "Schedule dentist appointment" },
    { id: "3", text: "Pay electricity bill" },
    { id: "4", text: "Call mom" },
  ],
};

export const overview = [
  {
    id: "1",
    text: "You have 3 chores to do today",
    icon: "clipboard-check",
    type: "chores",
  },
  {
    id: "2",
    text: "You have 2 expenses to log",
    icon: "cash",
    type: "expenses",
  },
  {
    id: "3",
    text: "You have 1 grocery item to buy",
    icon: "bag",
    type: "groceries",
  },
];

export const colors = {
  expenses: "#17C3B2",
  chores: "#FFCB77",
  groceries: "#FE6D73",
  notes: "#227C9D",
  stickyNotes: [
    "#FBF8CC", "#FDE4CF", "#FFCFD2", "#F1C0E8", "#CFBAF0",
    "#A3C4F3", "#90DBF4", "#8EECF5", "#98F5E1", "#B9FBC0",
  ],
};

export const icons = {
  chores: "clipboard-check",
  expenses: "cash",
  groceries: "bag",
  notes: "pushpin",
}; 