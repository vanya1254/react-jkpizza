import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cartItems: [],
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const { setItems, setCartItems } = itemsSlice.actions;

export default itemsSlice.reducer;
