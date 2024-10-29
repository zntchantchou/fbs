"use client";

import {
  ExpenseByCategorySummary,
  useGetExpensesByCategoryQuery,
} from "@/state/api";
import { useMemo, useState } from "react";
import Header from "../(components)/Header";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem;
};

function Expenses() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();
  const expenses = useMemo(() => expensesData ?? [], [expensesData]);
  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered = expenses.filter((data: ExpenseByCategorySummary) => {
      const matchesCategory =
        selectedCategory === "all" || data.category === selectedCategory;
      const formattedDate = parseDate(data.date);
      const matchesDate =
        !startDate ||
        !endDate ||
        (formattedDate >= startDate && formattedDate <= endDate);
      return matchesDate && matchesCategory;
    });
    const total: AggregatedData = filtered.reduce(
      (prev: AggregatedData, curr: ExpenseByCategorySummary) => {
        const amount = parseInt(curr.amount);
        if (!prev[curr.category]) {
          prev[curr.category] = {
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            name: curr.category,
            amount: 0,
          };
        }
        prev[curr.category].amount += amount;
        return prev;
      },
      {}
    );
    return Object.values(total);
  }, [expenses, selectedCategory, startDate, endDate]);
  const classNames = {
    label: "block text-sm font-medium text-gray-700",
    select:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:border-indigo-500 sm:text-sm rounded-sm",
  };
  if (isLoading) {
    return <div className="py-4"> Loading... </div>;
  }

  if (isError || !expenses) {
    return (
      <div className="text-center py-4 text-red-500">
        Failed to fetch expenses by category...
      </div>
    );
  }
  return (
    <div>
      <div className="mb-5">
        <Header name="expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:z-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by category and date
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                name="category"
                id="category"
                className={classNames.select}
                defaultValue="all"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>
            {/* START DATE */}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start date
              </label>
              <input
                name="start-date"
                id="start-date"
                type="date"
                className={classNames.select}
                defaultValue="all"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {/* END DATE */}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                Start date
              </label>
              <input
                name="end-date"
                id="end-date"
                type="date"
                className={classNames.select}
                defaultValue="all"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* PIE CHART */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedData.map(
                  (item: AggregatedDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? "rgb(29, 78, 216)" : item.color
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
