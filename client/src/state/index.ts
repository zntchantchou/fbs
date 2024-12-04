import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  newCartItems: number;
}

export const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  newCartItems: 0,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    addCartItem: (state) => {
      console.log("addCartItem");
      state.newCartItems += 1;
    },
    emptyCart: (state) => {
      console.log("empty Cart");
      state.newCartItems = 0;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode, emptyCart, addCartItem } =
  globalSlice.actions;

export default globalSlice.reducer;
