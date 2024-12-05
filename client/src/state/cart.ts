import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./api";

export interface CartStateTypes {
  items: { quantity: number; product: Product; productId: string }[];
  totalNewItems: number;
}

export const initialState: CartStateTypes = {
  items: [],
  totalNewItems: 0,
};
export const totalItemsPriceSelector = createSelector(
  (state) => state.cart.items,
  (items) =>
    items && items.length
      ? items.reduce((a, b) => {
          return a + b.quantity * b.product.price;
        }, 0)
      : 0
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const addedProduct = action.payload;
      const productIndex = state.items.findIndex(
        (item) => item.productId === addedProduct.id
      );

      if (productIndex !== -1) {
        const existingProduct = state.items[productIndex];
        if (existingProduct.quantity >= 10) return;
        const updatedItem = {
          ...existingProduct,
          quantity: existingProduct.quantity + 1,
        };
        state.items[productIndex] = updatedItem;
        state.totalNewItems += 1;
        return;
      }
      state.items = [
        ...state.items,
        { quantity: 1, product: action.payload, productId: action.payload.id },
      ];
      state.totalNewItems += 1;
    },
    setNewItemsToZero: (state) => {
      state.totalNewItems = 0;
    },
    setItemQuantity: (
      state,
      { payload }: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      console.log("setItemQuantity");
      console.log("productId", payload.productId);
      console.log("Quantity", payload.quantity);
      const productIndex = state.items.findIndex(
        (item) => item.productId === payload.productId
      );
      if (productIndex > -1) {
        console.log("Can update Item");
        const updatedItems = [...state.items];
        updatedItems[productIndex].quantity = payload.quantity;
        state.items = updatedItems;
      }
    },
    deleteCartItem: (state, action: PayloadAction<string>) => {
      state.items = [...state.items].filter(
        (item) => item.productId !== action.payload
      );
    },
  },
});

export const {
  addItemToCart,
  setNewItemsToZero,
  deleteCartItem,
  setItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
