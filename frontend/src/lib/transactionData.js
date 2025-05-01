

export const transactions = [
  {
    id: "tx1",
    date: "2025-05-01",
    description: "Salary Deposit",
    amount: 3200.0,
    type: "income",
    category: "Salary",
    status: "completed",
    userId: "1" // John Smith
  },
  {
    id: "tx2",
    date: "2025-04-30",
    description: "Grocery Store",
    amount: 124.5,
    type: "expense",
    category: "Groceries",
    status: "completed",
    userId: "1" // John Smith
  },
  {
    id: "tx3",
    date: "2025-04-28",
    description: "Electric Bill",
    amount: 87.32,
    type: "expense",
    category: "Utilities",
    status: "completed",
    userId: "1" // John Smith
  },
  {
    id: "tx4",
    date: "2025-04-27",
    description: "Freelance Project",
    amount: 750.0,
    type: "income",
    category: "Freelance",
    status: "completed",
    userId: "2" // Sara Johnson
  },
  {
    id: "tx5",
    date: "2025-04-25",
    description: "Restaurant Dinner",
    amount: 68.25,
    type: "expense",
    category: "Dining",
    status: "completed",
    userId: "2" // Sara Johnson
  },
  {
    id: "tx6",
    date: "2025-04-22",
    description: "Online Subscription",
    amount: 14.99,
    type: "expense",
    category: "Entertainment",
    status: "completed",
    userId: "2" // Sara Johnson
  },
  {
    id: "tx7",
    date: "2025-04-20",
    description: "Car Insurance",
    amount: 145.0,
    type: "expense",
    category: "Insurance",
    status: "completed",
    userId: "3" // Alex Wong
  },
  {
    id: "tx8",
    date: "2025-04-18",
    description: "Investment Dividend",
    amount: 32.15,
    type: "income",
    category: "Investment",
    status: "completed",
    userId: "3" // Alex Wong
  },
  {
    id: "tx9",
    date: "2025-05-03",
    description: "Internet Service",
    amount: 59.99,
    type: "expense",
    category: "Utilities",
    status: "pending",
    userId: "3" // Alex Wong
  },
];

export const getBalance = (userId) => {
  return transactions
    .filter(transaction => transaction.userId === userId)
    .reduce((total, transaction) => {
      if (transaction.type === "income") {
        return total + transaction.amount;
      } else {
        return total - transaction.amount;
      }
    }, 0);
};

export const getIncomeTotal = (userId) => {
  return transactions
    .filter(t => t.type === "income" && t.userId === userId)
    .reduce((total, t) => total + t.amount, 0);
};

export const getExpenseTotal = (userId) => {
  return transactions
    .filter(t => t.type === "expense" && t.userId === userId)
    .reduce((total, t) => total + t.amount, 0);
};

export const addTransaction = (transaction) => {
  const newTransaction = {
    ...transaction,
    id: `tx${transactions.length + 1}`,
  };
  
  transactions.unshift(newTransaction); // Add to beginning of array
  return newTransaction;
};
