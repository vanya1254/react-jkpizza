import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import filter from "./slices/filterSlice";
import items from "./slices/itemsSlice";
import cart from "./slices/cartSlice";

export const store = configureStore({
  reducer: { filter, items, cart },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
