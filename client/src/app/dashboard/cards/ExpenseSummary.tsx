import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from "@/state/api";
import { TrendingUp } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const colors = ["#00C49F", "#0088FE", "#FFBB28"];
type ExpensesTotal = {
  [category: string]: number;
};
function ExpenseSummary() {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  const header = (
    <div key="header">
      <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Expense Summary</h2>
      <hr />
    </div>
  );

  const expenseByCategorySummary = dashboardMetrics?.expenseByCategory || [];

  const expenseSums = expenseByCategorySummary.reduce(
    (prev: ExpensesTotal, curr: ExpenseByCategorySummary) => {
      const category = curr.category + " Expenses";
      const amount = parseInt(curr.amount, 10);
      if (!prev[category]) {
        prev[category] = 0;
      }
      prev[category] += amount;
      return prev;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({ name, value })
  );

  const totalExpenses = expenseCategories.reduce(
    (prev, category: { value: number }) => prev + category.value,
    0
  );
  const formattedTotalExpenses = totalExpenses.toFixed(2);
  const expenseSummary = dashboardMetrics?.expenseSummary[0];
  const content = (
    <div className="md:flex items-center pr-7" key="content">
      <div className="relative basis-1/2">
        <ResponsiveContainer aspect={1.5}>
          <PieChart>
            <Pie
              data={expenseCategories}
              innerRadius={50}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
            >
              {expenseCategories.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
          <span className="font-bold text-xl">${formattedTotalExpenses}</span>
        </div>
      </div>
      {/* LABELS */}
      <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
        {expenseCategories.map((entry, index) => {
          return (
            <li key={`legend-${index}`} className="flex items-center text-xs">
              <span
                className="mr-2 w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></span>
              {entry.name}
            </li>
          );
        })}
      </ul>
    </div>
  );

  const footer = (
    <div key="footer">
      <hr />
      {expenseSummary && expenseSummary.totalExpenses && (
        <div className="mt-3 flex justify-between px-7 mb-4">
          <div className="pt-2">
            <p className="text-sm">
              Average:{" "}
              <span className="font-semibold">
                {expenseSummary.totalExpenses.toFixed(2)}
              </span>
            </p>
          </div>
          <span className="flex items-center mt-2">
            <TrendingUp className="mr-2 text-green-500" /> 30%
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="row-span-3 sm:col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl flex flex-col">
      {isLoading ? <div>Loading...</div> : [header, content, footer]}
    </div>
  );
}

export default ExpenseSummary;
