import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function PurchaseSummary() {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];
  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  const header = (
    <div key="header">
      <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Purchase Summary</h2>
      <hr />
    </div>
  );

  const body = (
    <div className="mb-4 px-7 mt-7" key="body">
      <p className="text-xs text-gray-400"> Purchased</p>
      <div className="flex items-center">
        <p className="text-2xl font-bold">
          {lastDataPoint
            ? numeral(lastDataPoint.totalPurchased).format("$0.00")
            : "0"}
        </p>
        {lastDataPoint && (
          <p
            className={`text-sm ${
              lastDataPoint.changePercentage! >= 0
                ? "text-green-500"
                : "text-red-500"
            } flex ml-3`}
          >
            {lastDataPoint.changePercentage! >= 0 ? (
              <TrendingUp className="w-5 h-5 mr-1" />
            ) : (
              <TrendingDown className="w-5 h-5 mr-1" />
            )}
            {Math.abs(lastDataPoint.changePercentage!)}%
          </p>
        )}
      </div>
      <ResponsiveContainer width="100%" height={200} className="p-2">
        <AreaChart
          data={purchaseData}
          margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
        >
          <XAxis dataKey="date" tick={false} axisLine={false}></XAxis>
          <YAxis tickLine={false} tick={false} axisLine={false}></YAxis>
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString("en")}`]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            }}
          ></Tooltip>
          <Area
            type="linear"
            dataKey="totalPurchased"
            stroke="#8884d8"
            fill="#8884d8"
            dot={true}
          ></Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
  return (
    <div className="flex flex-col justify-between shadow-md rounded-2xl row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white">
      {isLoading ? <div>Loading</div> : [header, body]}
    </div>
  );
}

export default PurchaseSummary;
