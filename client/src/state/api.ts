import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/redux";
import { ImageListType } from "react-images-uploading";
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
  stockQuantity: number;
  category: string;
  pictures: ImageListType;
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

export interface Category {
  id: string;
  name: string;
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
  tagTypes: ["Products", "Categories"],
  reducerPath: "api",
  endpoints: (build) => ({
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),
    getCategories: build.query<Category[], string | void>({
      query: () => ({
        url: "/categories",
      }),
      providesTags: ["Categories"],
    }),
    createProduct: build.mutation<Product, FormData>({
      query: (newProduct) => {
        return {
          url: "/products",
          method: "POST",
          body: newProduct,
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
} = api;
