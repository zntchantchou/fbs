import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./api";
import { useSelector } from "react-redux";

export interface CartStateTypes {
  items: { product: Product; productId: string }[];
  totalNewItems: number;
}

export const initialState: CartStateTypes = {
  items: [],
  totalNewItems: 0,
};

export const productIdsInWishlistSelector = createSelector(
  (state) => state.wishlist.items,
  (items) => items.map((i) => i.productId)
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<Product>) => {
      console.log("addItemToWishlist");
      const addedProduct = action.payload;
      const productIndex = state.items.findIndex(
        (item) => item.productId === addedProduct.id
      );

      console.log("addItemToWishlist index", productIndex);
      if (productIndex !== -1) {
        console.log("Item exists");
        state.items = [...state.items].filter(
          (item) => item.productId !== action.payload.id
        );
        state.totalNewItems -= 1;
        return;
      }
      console.log("Item does not exist");
      state.items = [
        ...state.items,
        { productId: action.payload.id, product: action.payload },
      ];
      state.totalNewItems += 1;
      return;
    },
    setNewItemsToZero: (state) => {
      state.totalNewItems = 0;
    },
    deleteItemFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = [...state.items].filter(
        (item) => item.productId !== action.payload
      );
    },
  },
});

export const { addItemToWishlist, setNewItemsToZero, deleteItemFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
