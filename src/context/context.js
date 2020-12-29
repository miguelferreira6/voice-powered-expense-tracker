import React, { useReducer, createContext } from "react";

import contextReducer from "./contextReducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  [
    {
      amount: 75,
      category: "House",
      type: "Expense",
      date: "2021-01-05",
      id: "0fd2314c-8057-4fd8-9d12-a2a0afaeeeb9",
    },
    {
      amount: 55,
      category: "Travel",
      type: "Expense",
      date: "2021-01-04",
      id: "de06ee77-aa07-4eb0-8aaf-335aebc3b142",
    },
    {
      amount: 50,
      category: "Business",
      type: "Income",
      date: "2021-01-05",
      id: "d8c577cb-d4df-4020-966f-50c2d4af6495",
    },
    {
      amount: 100,
      category: "Salary",
      type: "Income",
      date: "2021-01-04",
      id: "93bcf36d-2868-4ed3-bc13-c5dcc7d6d162",
    },
  ],
];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  // Action Creators

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const balance = transactions.reduce((acc, currVal) => {
    return currVal.type === "Expense"
      ? acc - currVal.amount
      : acc + currVal.amount;
  }, 0);

  return (
    <ExpenseTrackerContext.Provider
      value={{
        deleteTransaction,
        addTransaction,
        transactions,
        balance,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
