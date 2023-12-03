import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CartItemType, CartSliceState } from "./types";

import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

const { cartItems, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  items: cartItems,
  totalPrice: totalPrice,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addToItems(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { setTotalPrice, minusItem, removeItem, addToItems, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
