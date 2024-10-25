"use client";
import PopularProducts from "@/app/dashboard/cards/PopularProducts";
import PurchaseSummary from "@/app/dashboard/cards/PurchaseSummary";
import SalesSummary from "@/app/dashboard/cards/SalesSummary";
import ExpenseSummary from "@/app/dashboard/cards/ExpenseSummary";
import StatCard from "./cards/Stats";
import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <PopularProducts />
      <SalesSummary />
      <PurchaseSummary />
      <ExpenseSummary />
      <StatCard
        title="Customer and expenses"
        primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
        details={[
          {
            title: "Customer Growth",
            amount: "200.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Expenses",
            amount: "10.00",
            changePercentage: -32,
            IconComponent: TrendingDown,
          },
        ]}
        dateRange="17 - 22 October 2024"
      />
      <StatCard
        title="Dues and pending orders"
        primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        details={[
          {
            title: "Dues",
            amount: "250.00",
            changePercentage: 39,
            IconComponent: TrendingUp,
          },
          {
            title: "Pending Orders",
            amount: "10.00",
            changePercentage: -49,
            IconComponent: TrendingDown,
          },
        ]}
        dateRange="17 - 22 October 2024"
      />
      <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
        details={[
          {
            title: "Sales",
            amount: "1000.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Discount",
            amount: "16.00",
            changePercentage: -32,
            IconComponent: TrendingDown,
          },
        ]}
        dateRange="17 - 22 October 2024"
      />
    </div>
  );
}
