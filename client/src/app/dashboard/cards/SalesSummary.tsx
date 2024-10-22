import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function SalesSummary() {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];
  const totalValueSum =
    salesData?.reduce((prev, curr) => prev + curr.totalValue, 0) || 0;
  const averageChangePercentage =
    salesData.reduce((prev, curr, _, arr) => {
      return prev + curr.changePercentage! / arr.length;
    }, 0) || 0;
  const [timeframe, setTimeframe] = useState("weekly");
  if (isError) {
    return <div className="m-5"> Failed to fetch data</div>;
  }

  const highestValueData = salesData.reduce((prev, curr) => {
    return prev.totalValue > curr.totalValue ? prev : curr;
  }, salesData[0]);

  const highestValueDate =
    highestValueData && highestValueData.date
      ? new Date(highestValueData.date).toLocaleDateString("en", {
          month: "numeric",
          day: "numeric",
          year: "2-digit",
        })
      : "N/A";

  const header = (
    <div>
      <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Sales Summary</h2>
      <hr />
    </div>
  );
  const chart = (
    <ResponsiveContainer width="100%" height={350} className="px-7">
      <BarChart
        data={salesData}
        margin={{ top: 0, right: 0, bottom: 0, left: -25 }}
      >
        <CartesianGrid strokeDasharray="" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
        />
        <YAxis
          tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}m`}
          tick={{ fontSize: 12, dx: -1 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          formatter={(value: number) => [`$${value.toLocaleString("en")}`]}
        />
        <Bar
          dataKey="totalValue"
          fill="#3182ce"
          barSize={10}
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
  const content = (
    <div className="row-span-3 xl:row-span-6 bg-white rounded-2xl shadow-md flex flex-col justify-between">
      {header}
      <div>
        <div className="flex items-center justify-between mb-6 pt-3 px-7">
          <div className="text-lg font-medium">
            <p className="text-xs text-gray-400">Value</p>
            <span className="text-2xl font-extrabold">
              $
              {(totalValueSum / 1000000).toLocaleString("en", {
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-green-500 text-sm ml-2">
              <TrendingUp className="inline w-4 h-4 mr-1" />
              {averageChangePercentage.toFixed(2)} %
            </span>
          </div>
          <select
            className="shadow-sm border border-gray-300 bg-white h-6"
            value={timeframe}
            onChange={(e) => {
              setTimeframe(e.target.value);
            }}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        {chart}
      </div>
      <div>
        <hr />
        <div className="flex justify-between items-center mt-6 text-sm px-6 mb-4">
          <p>{salesData.length || 0} days</p>
          <p className="text-sm">
            {" "}
            Highest Sales Date:
            <span className="font-bold"> {highestValueDate}</span>
          </p>
        </div>
      </div>
    </div>
  );

  const loader = <div>Loading...</div>;
  return isLoading ? loader : content;
}

export default SalesSummary;
