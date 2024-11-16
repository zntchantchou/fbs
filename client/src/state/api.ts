import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/redux";
export interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface User {
  name: string;
  email: string;
}
export interface NewProduct {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage: number;
  date: string;
}
export interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage: number;
  date: string;
}
export interface ExpenseSummary {
  purchaseSummaryId: string;
  totalExpenses: number;
  changePercentage: number;
  date: string;
}

export interface ExpenseByCategory {
  expenseByCategoryId: string;
  expenseSummaryId: string;
  category: string;
  amount: number;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategory: ExpenseByCategorySummary[];
}

export interface ExpenseByCategorySummary {
  expenseByCategoryId: string;
  category: string;
  amount: string;
  date: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) headers.set("token", token);
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => ({
        url: "/dashboard",
      }),
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => ({
        url: "/expenses",
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetDashboardMetricsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = api;
