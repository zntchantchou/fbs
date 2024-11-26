import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/app/redux";
import { ImageListType } from "react-images-uploading";
export interface Product {
  id: string;
  category: string;
  description: string;
  name: string;
  price: number;
  rating?: number;
  model: string;
  brand: string;
  pictures: ProductPicture[];
  stockQuantity: number;
}

export interface ProductPicture {
  id: string;
  index: number;
  productId: string;
  url: string;
  filename: string;
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
    getProductById: build.query<Product, string>({
      query: (productId) => ({
        url: "/products/" + productId,
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
    editProduct: build.mutation<
      Product,
      { updatedProduct: FormData; productId: string }
    >({
      query: ({ updatedProduct, productId }) => {
        return {
          method: "PATCH",
          url: "products/" + productId,
          body: updatedProduct,
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useEditProductMutation,
  useGetCategoriesQuery,
  useCreateProductMutation,
} = api;
