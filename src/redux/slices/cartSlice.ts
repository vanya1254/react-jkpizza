import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type CartItemType = {
  id: number;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
};

interface CartSliceState {
  items: CartItemType[];
  totalPrice: number;
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
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

      state.totalPrice = state.items.reduce(
        (sum, item) => item.price * item.count + sum,
        0
      );
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const cartItemByIdSelector = (id: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const { setTotalPrice, minusItem, removeItem, addToItems, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
