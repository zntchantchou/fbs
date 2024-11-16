import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthStateTypes {
  token: string | null;
}

export const initialState: AuthStateTypes = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
