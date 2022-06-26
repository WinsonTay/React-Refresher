import React, { useState } from "react";
import ExpensesFilter from "./ExpenseFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import Card from "../UI/Card";
import "./Expenses.css";
const Expenses = (props) => {
  const [selectedYear, setSelectedYear] = useState("2020");
  const filterChangedHandler = (payload) => {
    setSelectedYear(payload);
  };
  const filterExpenses = props.items.filter(
    (i) => i.date.getFullYear() === +selectedYear
  );
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={selectedYear}
          onFilterChange={filterChangedHandler}
        />
        <ExpensesChart  expenses={filterExpenses} />
        <ExpensesList items={filterExpenses} />
      </Card>
    </div>
  );
};
export default Expenses;
